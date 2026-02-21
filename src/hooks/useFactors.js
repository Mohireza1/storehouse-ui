import { useState, useCallback, useRef, useEffect } from "react"
import { createEmptyHeader, createEmptyRow, deepCloneList } from "./factorUtils"
import { fetchFactors, postFactor, putFactor, deleteFactorById } from "../services/factorApi"
import { validateFactor } from "./factorValidation"
import useFactorRows from "./useFactorRows"

const useFactors = () => {
    const [factorList, setFactorList] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [loading, setLoading] = useState(true)
    const [editMode, setEditMode] = useState('none')
    const snapshotRef = useRef(null)

    useEffect(() => {
        fetchFactors()
            .then(data => {
                setFactorList(data)
                setCurrentIndex(0)
            })
            .catch(err => console.error('خطا در دریافت فاکتورها:', err))
            .finally(() => setLoading(false))
    }, [])

    const isEditMode = editMode !== 'none'
    const currentFactor = factorList[currentIndex] || null
    const currentId = currentFactor ? currentFactor.id : null
    const totalFactors = factorList.length
    const currentPosition = totalFactors > 0 ? currentIndex + 1 : 0

    const {
        header, setHeader,
        rows, selectedRowIndex, setSelectedRowIndex,
        handleRowChange, handleAddRow, applyItemToRow
    } = useFactorRows(factorList, setFactorList, currentIndex)

    const hasNext = currentIndex < factorList.length - 1
    const hasPrev = currentIndex > 0

    const navigateTo = useCallback((fn) => {
        fn()
        setSelectedRowIndex(0)
    }, [setSelectedRowIndex])

    const goToFirst = useCallback(() => setCurrentIndex(0), [])
    const goToLast = useCallback(() => setCurrentIndex(Math.max(factorList.length - 1, 0)), [factorList.length])
    const goToNext = useCallback(() => setCurrentIndex(i => Math.min(i + 1, factorList.length - 1)), [factorList.length])
    const goToPrev = useCallback(() => setCurrentIndex(i => Math.max(i - 1, 0)), [])

    const saveSnapshot = useCallback(() => {
        snapshotRef.current = { factorList: deepCloneList(factorList), currentIndex }
    }, [factorList, currentIndex])

    const restoreSnapshot = useCallback(() => {
        if (!snapshotRef.current) return
        setFactorList(snapshotRef.current.factorList)
        setCurrentIndex(snapshotRef.current.currentIndex)
        snapshotRef.current = null
    }, [])

    const addFactor = useCallback(() => {
        saveSnapshot()
        setFactorList(prev => [...prev, { header: createEmptyHeader(), rows: [createEmptyRow()] }])
        setCurrentIndex(factorList.length)
        setSelectedRowIndex(0)
        setEditMode('add')
    }, [saveSnapshot, factorList.length, setSelectedRowIndex])

    const editFactor = useCallback(() => {
        if (!currentFactor) return
        saveSnapshot()
        setEditMode('edit')
    }, [currentFactor, saveSnapshot])

    const deleteFactor = useCallback(async () => {
        if (!currentFactor) return
        if (totalFactors <= 1) { alert('حداقل یک فاکتور باید وجود داشته باشد.'); return }
        if (!window.confirm('آیا از حذف این فاکتور اطمینان دارید؟')) return

        try {
            await deleteFactorById(currentFactor.id)
            setFactorList(prev => prev.filter(f => f.id !== currentFactor.id))
            setCurrentIndex(i => {
                const newLen = factorList.length - 1
                return i >= newLen ? Math.max(newLen - 1, 0) : i
            })
            setSelectedRowIndex(0)
        } catch (err) {
            console.error('خطا در حذف فاکتور:', err)
            alert('خطا در حذف فاکتور از سرور.')
        }
    }, [currentFactor, totalFactors, factorList.length, setSelectedRowIndex])

    const confirmEdit = useCallback(async () => {
        const factor = factorList[currentIndex]
        if (!factor || !validateFactor(factor)) return

        try {
            if (editMode === 'add') {
                const saved = await postFactor(factor)
                setFactorList(prev => {
                    const list = [...prev]
                    list[currentIndex] = saved
                    return list
                })
            } else if (editMode === 'edit') {
                await putFactor(factor)
            }
            snapshotRef.current = null
            setEditMode('none')
        } catch (err) {
            console.error('خطا در ذخیره فاکتور:', err)
            alert('خطا در ذخیره فاکتور در سرور.')
        }
    }, [factorList, currentIndex, editMode])

    const cancelEdit = useCallback(() => {
        restoreSnapshot()
        setSelectedRowIndex(0)
        setEditMode('none')
    }, [restoreSnapshot, setSelectedRowIndex])

    return {
        loading,
        currentId, currentPosition, totalFactors,
        hasNext, hasPrev,
        goToFirst: () => navigateTo(goToFirst),
        goToLast: () => navigateTo(goToLast),
        goToNext: () => navigateTo(goToNext),
        goToPrev: () => navigateTo(goToPrev),
        isEditMode, editMode,
        addFactor, editFactor, deleteFactor, confirmEdit, cancelEdit,
        header, setHeader,
        fieldRows: {
            rows, selectedRowIndex, setSelectedRowIndex,
            handleRowChange, handleAddRow, applyItemToRow
        }
    }
}

export default useFactors
