import data from '../../db.json'

const { featureLookup = {} } = data
const resolve = (code) => featureLookup[String(code)] || ''

const HEADERS = ["کد کالا", "شماره فنی", "ویژگی ۱", "ویژگی ۲", "ویژگی ۳", "ویژگی ۴"]

const ProductCodeMenu = ({ items, isOpen, onSelect, onClose }) => {
    if (!isOpen) {
        return null
    }

    return (
        <div className="pcm-overlay" onClick={onClose}>
            <div className="pcm-modal" onClick={(e) => e.stopPropagation()} role="listbox" aria-label="انتخاب کد کالا">
                <div className="pcm-header">
                    <span className="pcm-title">انتخاب کد کالا</span>
                    <button type="button" className="pcm-close-btn" onClick={onClose}>✕</button>
                </div>
                <div className="pcm-grid-header">
                    {HEADERS.map((h, i) => (
                        <div key={i} className="pcm-grid-header-cell">{h}</div>
                    ))}
                </div>
                <div className="pcm-grid-body">
                    {items.map((item) => (
                        <div
                            key={item.productCode}
                            className="pcm-grid-row"
                            onClick={() => onSelect(item)}
                            role="option"
                        >
                            <div className="pcm-grid-cell">{item.productCode}</div>
                            <div className="pcm-grid-cell">{item.technicalNumber}</div>
                            <div className="pcm-grid-cell">{resolve(item.feature1)}</div>
                            <div className="pcm-grid-cell">{resolve(item.feature2)}</div>
                            <div className="pcm-grid-cell">{resolve(item.feature3)}</div>
                            <div className="pcm-grid-cell">{resolve(item.feature4)}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductCodeMenu
