const HEADERS = ["کد انبار", "نام انبار"]

const AnbarMenu = ({ items, isOpen, onSelect, onClose }) => {
    if (!isOpen) {
        return null
    }

    return (
        <div className="anbar-menu-overlay" onClick={onClose}>
            <div className="anbar-menu-modal" onClick={(e) => e.stopPropagation()} role="listbox" aria-label="انتخاب انبار">
                <div className="anbar-menu-header">
                    <span className="anbar-menu-title">انتخاب انبار</span>
                    <button type="button" className="anbar-menu-close-btn" onClick={onClose}>✕</button>
                </div>
                <div className="anbar-menu-grid-header">
                    {HEADERS.map((h, i) => (
                        <div key={i} className="anbar-menu-grid-header-cell">{h}</div>
                    ))}
                </div>
                <div className="anbar-menu-grid-body">
                    {items.map((item) => (
                        <div
                            key={item.code}
                            className="anbar-menu-grid-row"
                            onClick={() => onSelect(item)}
                            role="option"
                        >
                            <div className="anbar-menu-grid-cell">{item.code}</div>
                            <div className="anbar-menu-grid-cell">{item.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AnbarMenu
