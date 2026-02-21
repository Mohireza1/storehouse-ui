import FieldRow from "./FieldRow"
import FieldHeader from "./FieldHeader"
import ProductCodeMenu from "./ProductCodeMenu"
import useProductCodeMenu from "../hooks/useProductCodeMenu"
import data from "../../db.json"
import './Field.css'

const Field = ({ fieldRows, isEditMode }) => {
    const { productItems = [] } = data

    const {
        rows,
        selectedRowIndex,
        setSelectedRowIndex,
        handleRowChange,
        handleAddRow,
        applyItemToRow
    } = fieldRows

    const { isMenuOpen, openMenu, closeMenu, selectItem } = useProductCodeMenu({
        setSelectedRowIndex,
        applyItemToRow
    })

    return (
        <div className="field-wrapper">
            <button 
                type="button" 
                onClick={handleAddRow}
                disabled={!isEditMode}
                className="btn-add-row"
            >
                <span className="btn-icon">+</span>
                افزودن ردیف
            </button>
            <div className="field">
            <FieldHeader />
            <ProductCodeMenu
                items={productItems}
                isOpen={isMenuOpen && isEditMode}
                onSelect={selectItem}
                onClose={closeMenu}
            />
            <div className="field-rows">
                {rows.map((row, index) => (
                    <FieldRow
                        key={index}
                        rowNumber={index + 1}
                        values={row}
                        onChange={(event) => handleRowChange(index, event)}
                        onProductCodeMenu={() => openMenu(index)}
                        onSelect={() => setSelectedRowIndex(index)}
                        isEditMode={isEditMode}
                        isSelected={selectedRowIndex === index}
                        onAddRow={handleAddRow}
                    />
                ))}
            </div>
            </div>
        </div>
    )
}

export default Field