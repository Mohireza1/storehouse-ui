import { FaPlus, FaEdit, FaTrash, FaCheck, FaTimes, FaAngleDoubleRight, FaAngleRight, FaAngleLeft, FaAngleDoubleLeft } from 'react-icons/fa'
import './Footer.css'

const Footer = ({
    isEditMode,
    currentPosition = 1, totalFactors = 1,
    hasNext = false, hasPrev = false,
    goToFirst, goToLast, goToNext, goToPrev,
    onAdd, onEdit, onDelete, onConfirm, onCancel
}) => {
    return (
        <footer>
            <hr className="footer-hr" />
            <div className="footer-tablist">
                <div className="footer-tab">رکورد جاری</div>
                <div className="footer-tab">نمایش لیست</div>
            </div>
            <div className="footer-button-bar">
                <div className={`button-bar ${!isEditMode ? 'active' : 'inactive'}`}>
                    <button className="footer-btn" onClick={onAdd}>
                        <FaPlus className="footer-btn-icon" />
                        <span>اضافه</span>
                    </button>
                    <button className="footer-btn" onClick={onEdit}>
                        <FaEdit className="footer-btn-icon" />
                        <span>ویرایش</span>
                    </button>
                    <button className="footer-btn" onClick={onDelete}>
                        <FaTrash className="footer-btn-icon" />
                        <span>حذف</span>
                    </button>
                </div>

                <div className="factor-nav">
                    <button
                        className="nav-btn nav-btn-circular"
                        onClick={goToFirst}
                        disabled={!hasPrev}
                        title="اولین فاکتور"
                    >
                        <FaAngleDoubleRight />
                    </button>
                    <button
                        className="nav-btn nav-btn-circular"
                        onClick={goToPrev}
                        disabled={!hasPrev}
                        title="فاکتور قبلی"
                    >
                        <FaAngleRight />
                    </button>
                    <div className="nav-decorative">{currentPosition}</div>
                    <div className="nav-decorative">از {totalFactors}</div>
                    <button
                        className="nav-btn nav-btn-circular"
                        onClick={goToNext}
                        disabled={!hasNext}
                        title="فاکتور بعدی"
                    >
                        <FaAngleLeft />
                    </button>
                    <button
                        className="nav-btn nav-btn-circular"
                        onClick={goToLast}
                        disabled={!hasNext}
                        title="آخرین فاکتور"
                    >
                        <FaAngleDoubleLeft />
                    </button>
                </div>

                <div className={`button-bar ${isEditMode ? 'active' : 'inactive'}`}>
                    <button className="footer-btn" onClick={onConfirm}>
                        <FaCheck className="footer-btn-icon" />
                        <span>تایید</span>
                    </button>
                    <button className="footer-btn" onClick={onCancel}>
                        <FaTimes className="footer-btn-icon" />
                        <span>انصراف</span>
                    </button>
                </div>
            </div>
        </footer>
    )
}

export default Footer