import { useMemo } from "react"

const useRowSummary = (rows, selectedRowIndex) => {
    const selectedRow = rows[selectedRowIndex] || {}

    const jamMeghdar = useMemo(() => {
        const code = selectedRow.productCode
        if (!code && code !== 0) return ""

        const total = rows
            .filter((row) => String(row.productCode) === String(code))
            .reduce((sum, row) => {
                const qty = parseFloat(row.quantity) || 0
                return sum + qty
            }, 0)

        return total === 0 ? "" : total.toLocaleString("fa-IR")
    }, [rows, selectedRow.productCode])

    return { jamMeghdar }
}

export default useRowSummary
