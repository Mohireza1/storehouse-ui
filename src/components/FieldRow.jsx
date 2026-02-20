import { useState } from "react"

const SIMPLE_FIELDS = [
    "technicalNumber",
    "feature1", "feature2", "feature3", "feature4",
    "productName", "productNameEn",
    "delivererItem", "delivererName",
    "quantity", "unitPrice", "totalPrice"
]

const FieldRow = ({ rowNumber, values, onChange, onProductCodeMenu, onSelect, isSelected, isEditMode, onAddRow }) => {
    const [isEditingProductCode, setIsEditingProductCode] = useState(false)

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && isEditMode) {
            e.preventDefault()
            onAddRow()
        }
    }

    return (
        <div
            className={`field-row${isSelected ? " is-selected" : ""}`}
            onClick={onSelect}
        >
            <div className="decorative-cell"></div>

            <input value={rowNumber} readOnly className="field-cell-input" />

            <input
                name="productCode"
                value={values.productCode}
                onChange={onChange}
                onClick={isEditMode ? onProductCodeMenu : undefined}
                onDoubleClick={() => isEditMode && setIsEditingProductCode(true)}
                onBlur={() => setIsEditingProductCode(false)}
                readOnly={!isEditMode || !isEditingProductCode}
                className="field-cell-input"
                onKeyDown={handleKeyDown}
            />

            {SIMPLE_FIELDS.map((field) => (
                <input
                    key={field}
                    name={field}
                    value={values[field]}
                    onChange={onChange}
                    readOnly={!isEditMode || field === 'totalPrice'}
                    className="field-cell-input"
                    onKeyDown={handleKeyDown}
                />
            ))}
        </div>
    )
}

export default FieldRow
