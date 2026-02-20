import { useState, useCallback } from "react"
import { createEmptyRow } from "./factorUtils"
import { isRowComplete } from "./factorValidation"

const useFactorRows = (factorList, setFactorList, currentIndex) => {
    const currentFactor = factorList[currentIndex] || null
    const rows = currentFactor ? currentFactor.rows : [createEmptyRow()]
    const [selectedRowIndex, setSelectedRowIndex] = useState(0)

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
    }, [currentIndex, setFactorList])

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
    }, [currentIndex, setFactorList])

    const handleAddRow = useCallback(() => {
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
    }, [currentIndex, rows, setFactorList])

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
    }, [currentIndex, setFactorList])

    return {
        header,
        setHeader,
        rows,
        selectedRowIndex,
        setSelectedRowIndex,
        handleRowChange,
        handleAddRow,
        applyItemToRow
    }
}

export default useFactorRows
