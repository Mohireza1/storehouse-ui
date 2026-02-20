import { useState, useCallback, useMemo, useRef, useEffect } from "react"
import axios from "axios"

const API_URL = "http://localhost:3002/factors"

const createEmptyRow = () => ({
    productCode: "",
    technicalNumber: "",
    feature1: "", feature2: "", feature3: "", feature4: "",
    productName: "",
    productNameEn: "",
    delivererItem: "",
    delivererName: "",
    quantity: "",
    unitPrice: "",
    totalPrice: ""
})

const createEmptyHeader = () => ({
    anbar: '',
    anbarShobe: '',
    noeRasid: 'رسید انتقالی غیر همزمان',
    serialNumber: '',
    rasidMostaqim: false,
    shomareEjae: '',
    shomareInvoice: '',
    shomareDarkhast: '',
    shomareSand: '',
    kodHesab: '',
    tavhilGirandeh: '',
    naqd: true,
    mahalEghdam: ''
})

const deepCloneList = (list) =>
    list.map(f => ({
        ...f,
        header: { ...f.header },
        rows: f.rows.map(r => ({ ...r }))
    }))

const useFactors = () => {
    // Array of factors sorted by id
    const [factorList, setFactorList] = useState([])
    // Index into factorList
    const [currentIndex, setCurrentIndex] = useState(0)
    const [loading, setLoading] = useState(true)

    // Edit mode: 'none' | 'add' | 'edit'
    const [editMode, setEditMode] = useState('none')
    // Snapshot for cancel
    const snapshotRef = useRef(null)

    // ---- Fetch all factors on mount ----
    useEffect(() => {
        axios.get(API_URL)
            .then(res => {
                setFactorList(res.data)
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

    // Navigation
    const hasNext = currentIndex < factorList.length - 1
    const hasPrev = currentIndex > 0

    const goToFirst = useCallback(() => {
        setCurrentIndex(0)
    }, [])

    const goToLast = useCallback(() => {
        setCurrentIndex(prev => Math.max(factorList.length - 1, 0))
    }, [factorList.length])

    const goToNext = useCallback(() => {
        setCurrentIndex(prev => Math.min(prev + 1, factorList.length - 1))
    }, [factorList.length])

    const goToPrev = useCallback(() => {
        setCurrentIndex(prev => Math.max(prev - 1, 0))
    }, [])

    // Header data for the current factor
    const header = currentFactor ? currentFactor.header : {}

    const setHeader = useCallback((updater) => {
        setFactorList(prev => {
            const list = [...prev]
            const factor = list[currentIndex]
            if (!factor) return prev
            const newHeader = typeof updater === 'function'
                ? updater(factor.header)
                : updater
            list[currentIndex] = { ...factor, header: newHeader }
            return list
        })
    }, [currentIndex])

    // Rows for the current factor
    const rows = currentFactor ? currentFactor.rows : [createEmptyRow()]
    const [selectedRowIndex, setSelectedRowIndex] = useState(0)

    // Reset selected row when navigating to a different factor
    const navigateTo = useCallback((navigateFn) => {
        navigateFn()
        setSelectedRowIndex(0)
    }, [])

    const handleRowChange = useCallback((rowIndex, event) => {
        const { name, value } = event.target
        setFactorList(prev => {
            const list = [...prev]
            const factor = list[currentIndex]
            if (!factor) return prev
            list[currentIndex] = {
                ...factor,
                rows: factor.rows.map((row, i) => {
                    if (i !== rowIndex) return row
                    const updated = { ...row, [name]: value }
                    // Auto-calculate totalPrice
                    if (name === 'quantity' || name === 'unitPrice') {
                        const qty = parseFloat(name === 'quantity' ? value : updated.quantity) || 0
                        const price = parseFloat(name === 'unitPrice' ? value : updated.unitPrice) || 0
                        updated.totalPrice = qty && price ? String(qty * price) : ''
                    }
                    return updated
                })
            }
            return list
        })
    }, [currentIndex])

    const isRowComplete = useCallback((row) => {
        return row.productCode !== '' &&
            row.technicalNumber !== '' &&
            row.productName !== '' &&
            row.quantity !== '' &&
            row.unitPrice !== ''
    }, [])

    const handleAddRow = useCallback(() => {
        // Validate last row is complete before adding
        const lastRow = rows[rows.length - 1]
        if (lastRow && !isRowComplete(lastRow)) {
            alert('لطفاً ابتدا تمام فیلدهای ردیف فعلی را پر کنید.')
            return
        }
        setFactorList(prev => {
            const list = [...prev]
            const factor = list[currentIndex]
            if (!factor) return prev
            list[currentIndex] = {
                ...factor,
                rows: [...factor.rows, createEmptyRow()]
            }
            return list
        })
        setSelectedRowIndex(rows.length)
    }, [currentIndex, rows, isRowComplete])

    const applyItemToRow = useCallback((rowIndex, item) => {
        setFactorList(prev => {
            const list = [...prev]
            const factor = list[currentIndex]
            if (!factor) return prev
            list[currentIndex] = {
                ...factor,
                rows: factor.rows.map((row, i) =>
                    i === rowIndex
                        ? {
                            ...row,
                            productCode: item.productCode,
                            technicalNumber: item.technicalNumber,
                            feature1: item.feature1,
                            feature2: item.feature2,
                            feature3: item.feature3,
                            feature4: item.feature4
                        }
                        : row
                )
            }
            return list
        })
    }, [currentIndex])

    // ---- CRUD Operations ----

    // اضافه — create a new blank factor (local), will be POSTed on confirm
    const addFactor = useCallback(() => {
        snapshotRef.current = {
            factorList: deepCloneList(factorList),
            currentIndex
        }

        const newFactor = {
            header: createEmptyHeader(),
            rows: [createEmptyRow()]
        }

        setFactorList(prev => [...prev, newFactor])
        setCurrentIndex(factorList.length) // point to new last item
        setSelectedRowIndex(0)
        setEditMode('add')
    }, [factorList, currentIndex])

    // ویرایش — edit the current factor
    const editFactor = useCallback(() => {
        if (!currentFactor) return
        snapshotRef.current = {
            factorList: deepCloneList(factorList),
            currentIndex
        }
        setEditMode('edit')
    }, [factorList, currentIndex, currentFactor])

    // حذف — delete the current factor from the server
    const deleteFactor = useCallback(async () => {
        if (!currentFactor) return
        if (totalFactors <= 1) {
            alert('حداقل یک فاکتور باید وجود داشته باشد.')
            return
        }

        const confirmed = window.confirm('آیا از حذف این فاکتور اطمینان دارید؟')
        if (!confirmed) return

        try {
            await axios.delete(`${API_URL}/${currentFactor.id}`)

            setFactorList(prev => prev.filter(f => f.id !== currentFactor.id))

            // Navigate to next or previous
            setCurrentIndex(prev => {
                const newLength = factorList.length - 1
                if (prev >= newLength) return Math.max(newLength - 1, 0)
                return prev
            })
            setSelectedRowIndex(0)
        } catch (err) {
            console.error('خطا در حذف فاکتور:', err)
            alert('خطا در حذف فاکتور از سرور.')
        }
    }, [currentFactor, totalFactors, factorList.length])

    // Validation helpers
    const REQUIRED_HEADER_FIELDS = ['anbar', 'serialNumber', 'shomareInvoice', 'kodHesab', 'tavhilGirandeh']

    const validateFactor = useCallback(() => {
        const factor = factorList[currentIndex]
        if (!factor) return false

        // Check required header fields
        for (const field of REQUIRED_HEADER_FIELDS) {
            if (!factor.header[field] || String(factor.header[field]).trim() === '') {
                alert('لطفاً تمام فیلدهای اطلاعات فاکتور را پر کنید.')
                return false
            }
        }

        // Check all rows are complete
        for (let i = 0; i < factor.rows.length; i++) {
            if (!isRowComplete(factor.rows[i])) {
                alert(`لطفاً تمام فیلدهای ردیف ${i + 1} را پر کنید.`)
                return false
            }
        }

        return true
    }, [factorList, currentIndex, isRowComplete])

    // تایید — confirm/save changes to server
    const confirmEdit = useCallback(async () => {
        const factor = factorList[currentIndex]
        if (!factor) return

        if (!validateFactor()) return

        try {
            if (editMode === 'add') {
                // POST new factor to server
                const { id, ...body } = factor // remove temp id if any
                const res = await axios.post(API_URL, body)
                // Replace the local temp factor with the server response (which has a real id)
                setFactorList(prev => {
                    const list = [...prev]
                    list[currentIndex] = res.data
                    return list
                })
            } else if (editMode === 'edit') {
                // PUT updated factor to server
                await axios.put(`${API_URL}/${factor.id}`, factor)
            }
            snapshotRef.current = null
            setEditMode('none')
        } catch (err) {
            console.error('خطا در ذخیره فاکتور:', err)
            alert('خطا در ذخیره فاکتور در سرور.')
        }
    }, [factorList, currentIndex, editMode, validateFactor])

    // انصراف — cancel changes, restore snapshot
    const cancelEdit = useCallback(() => {
        if (snapshotRef.current) {
            setFactorList(snapshotRef.current.factorList)
            setCurrentIndex(snapshotRef.current.currentIndex)
            snapshotRef.current = null
        }
        setSelectedRowIndex(0)
        setEditMode('none')
    }, [])

    return {
        // Loading state
        loading,

        // Navigation
        currentId,
        currentPosition,
        totalFactors,
        hasNext,
        hasPrev,
        goToFirst: () => navigateTo(goToFirst),
        goToLast: () => navigateTo(goToLast),
        goToNext: () => navigateTo(goToNext),
        goToPrev: () => navigateTo(goToPrev),

        // Edit mode
        isEditMode,
        editMode,

        // CRUD
        addFactor,
        editFactor,
        deleteFactor,
        confirmEdit,
        cancelEdit,

        // Header
        header,
        setHeader,

        // Rows (compatible with useFieldRows interface)
        fieldRows: {
            rows,
            selectedRowIndex,
            setSelectedRowIndex,
            handleRowChange,
            handleAddRow,
            applyItemToRow
        }
    }
}

export default useFactors
