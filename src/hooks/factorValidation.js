const REQUIRED_HEADER_FIELDS = ['anbar', 'serialNumber', 'shomareInvoice', 'kodHesab', 'tavhilGirandeh']

export const isRowComplete = (row) =>
    row.productCode !== '' &&
    row.technicalNumber !== '' &&
    row.productName !== '' &&
    row.quantity !== '' &&
    row.unitPrice !== ''

export const validateFactor = (factor) => {
    if (!factor) return false

    for (const field of REQUIRED_HEADER_FIELDS) {
        if (!factor.header[field] || String(factor.header[field]).trim() === '') {
            alert('لطفاً تمام فیلدهای اطلاعات فاکتور را پر کنید.')
            return false
        }
    }

    for (let i = 0; i < factor.rows.length; i++) {
        if (!isRowComplete(factor.rows[i])) {
            alert(`لطفاً تمام فیلدهای ردیف ${i + 1} را پر کنید.`)
            return false
        }
    }

    return true
}
