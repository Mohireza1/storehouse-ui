import { useState } from "react"

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

const useFieldRows = () => {
    const [rows, setRows] = useState([createEmptyRow()])
    const [selectedRowIndex, setSelectedRowIndex] = useState(0)

    const handleRowChange = (rowIndex, event) => {
        const { name, value } = event.target
        setRows((prev) =>
            prev.map((row, index) =>
                index === rowIndex ? { ...row, [name]: value } : row
            )
        )
    }

    const handleAddRow = () => {
        setRows((prev) => [...prev, createEmptyRow()])
        setSelectedRowIndex(rows.length)
    }

    const applyItemToRow = (rowIndex, item) => {
        setRows((prev) =>
            prev.map((row, index) =>
                index === rowIndex
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
        )
    }

    return {
        rows,
        selectedRowIndex,
        setSelectedRowIndex,
        handleRowChange,
        handleAddRow,
        applyItemToRow
    }
}

export default useFieldRows
