import { useState, useEffect } from 'react'
import { FaPlus, FaEdit, FaTrash, FaCheck, FaTimes, FaAngleDoubleRight, FaAngleRight, FaAngleLeft, FaAngleDoubleLeft, FaFile, FaInfoCircle } from 'react-icons/fa'
import JDate from 'jalali-date'
import './Footer.css'

const toFarsi = (n) => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])
const padFa = (n) => toFarsi(String(n).padStart(2, '0'))

const useJalaliClock = () => {
    const [now, setNow] = useState(new Date())
    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 1000)
        return () => clearInterval(id)
    }, [])
    const jd = new JDate(now)
    const date = `${toFarsi(jd.getFullYear())}/${padFa(jd.getMonth() + 1)}/${padFa(jd.getDate())}`
    const time = `${padFa(now.getHours())}:${padFa(now.getMinutes())}:${padFa(now.getSeconds())}`
    return { date, time }
}

const Footer = ({
    isEditMode,
    hasNext = false, hasPrev = false,
    goToFirst, goToLast, goToNext, goToPrev,
    onAdd, onEdit, onDelete, onConfirm, onCancel
}) => {
    const { date, time } = useJalaliClock()
    const [activeTab, setActiveTab] = useState(0)
    const tabs = ['رکورد جاری', 'نمایش لیست']

    return (
        <footer>
            <hr className="footer-hr" />
            <div className="footer-tablist" role="tablist" aria-label="نمایش">
                {tabs.map((tab, i) => (
                    <button
                        key={i}
                        role="tab"
                        aria-selected={activeTab === i}
                        className={"footer-tab" + (activeTab === i ? ' active' : '')}
                        onClick={() => setActiveTab(i)}
                    >
                        {tab}
                    </button>
                ))}
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
                    <button
                        className="nav-btn nav-btn-decorative"
                        disabled
                        title="فاکتور"
                    >
                        <FaFile />
                    </button>
                    <button
                        className="nav-btn nav-btn-decorative"
                        disabled
                        title="فاکتور"
                    >
                        <FaFile />
                    </button>
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

            <hr className="footer-statusbar-hr" />
            <div className="footer-statusbar">
                <FaInfoCircle className="statusbar-icon" />
                <span className="statusbar-section">سیستم انبارداری</span>
                <span className="statusbar-section">نسخه ۱.۰.۰</span>
                <span className="statusbar-section">کاربر: مدیر سیستم</span>
                <div className="statusbar-datetime">
                    <span>{time}</span>
                    <span>{date}</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer