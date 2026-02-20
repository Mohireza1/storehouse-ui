import { useState } from 'react'
import { FaIdCard, FaCreditCard, FaMoneyBillWave, FaTrash, FaFileImport, FaBox, FaDollarSign, FaShare, FaRecycle, FaClipboardList, FaCog } from 'react-icons/fa'
import './Toolbar.css'

const items = [
    { id: 1, name: 'عوامل فاکتور', icon: FaCog },
    { id: 2, name: 'فراخوانی', icon: FaClipboardList },
    { id: 3, name: 'ابطال / احیا', icon: FaRecycle },
    { id: 4, name: 'ارجاع', icon: FaShare },
    { id: 5, name: 'ریالی نشده ها', icon: FaDollarSign },
    { id: 6, name: 'پایانه و باسکول', icon: FaBox },
    { id: 7, name: 'درج بین اسناد', icon: FaFileImport },
    { id: 8, name: 'سریال‌های حذف شده', icon: FaTrash },
    { id: 9, name: 'قیمت گذاری', icon: FaMoneyBillWave },
    { id: 10, name: 'پرداخت', icon: FaCreditCard },
    { id: 11, name: 'صدور کارت گارانتی', icon: FaIdCard }
]

const ToolbarItem = ({ item }) => {
    const Icon = item.icon
    return (
        <button className="toolbar-item">
            <div className="toolbar-icon"><Icon /></div>
            <div className="toolbar-name">{item.name}</div>
        </button>
    )
}

const Toolbar = () => {
    const tabs = ['ابزارهای عمومی', 'ابزارهای عملیاتی', 'فرم‌های مرتبط']
    const [active, setActive] = useState(1)

    return (
        <nav dir="rtl" lang="fa">
            <div className='tabs' role="tablist" aria-label="ابزارها">
                {tabs.map((t, i) => (
                    <button
                        key={t}
                        role="tab"
                        aria-selected={active === i}
                        className={"tab" + (active === i ? ' active' : '')}
                        onClick={() => setActive(i)}
                    >
                        {t}
                    </button>
                ))}
            </div>
            <div className="toolbar">
                {items.map(item => (
                    <ToolbarItem key={item.id} item={item} />
                ))}
            </div>
            <hr />
            <button className="misc_button">وضعیت: رسید موقت</button>
            <button className="misc_button">ساختار ارزی فعال</button>
        </nav>
    )
}

export default Toolbar