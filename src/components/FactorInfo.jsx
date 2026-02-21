import { useState } from 'react'
import DatePicker from 'react-multi-date-picker'
import TimePicker from 'react-multi-date-picker/plugins/time_picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import AnbarMenu from './AnbarMenu'
import data from '../../db.json'
import './FactorInfo.css'

const JalaliDatePicker = ({ name, value, onChange, disabled }) => (
    <DatePicker
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
        value={value}
        onChange={(date) => !disabled && onChange(name, date)}
        inputClass={`input-field date-input${disabled ? ' disabled' : ''}`}
        placeholder="YYYY/MM/DD"
        disabled={disabled}
    />
)

const defaultHeader = {
    anbar: '',
    anbarShobe: '',
    noeRasid: 'رسید انتقالی غیر همزمان',
    tarikh: null,
    tarkhDarkhast: null,
    tarikhMiladi: null,
    tarikhMother: null,
    tarikhSarResid: null,
    saatSarResid: null,
    serialNumber: '',
    rasidMostaqim: false,
    shomareEjae: '',
    shomareInvoice: '',
    shomareDarkhast: '',
    shomareSand: '',
    kodHesab: '',
    tavhilGirandeh: '',
    holAqdamKharid: '',
    shKontrolKayfi: '',
    samanahModirian: '',
    barcodeField: '',
    hazeMali: '',
    hazaEmlkard: '',
    naqd: true,
    taviyehVojeh: '#000080',
    isCreditNote: false,
    mahalEghdam: ''
}

const FactorInfo = ({ header: externalHeader, setHeader: externalSetHeader, isEditMode = false }) => {
    const formData = { ...defaultHeader, ...externalHeader }
    const disabled = !isEditMode
    const [isAnbarMenuOpen, setIsAnbarMenuOpen] = useState(false)
    const { warehouses = [] } = data

    const handleAnbarSelect = (item) => {
        externalSetHeader((prev) => ({
            ...prev,
            anbar: item.code,
            anbarShobe: item.name,
        }))
        setIsAnbarMenuOpen(false)
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        externalSetHeader((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }))
    }

    const handleDateChange = (name, date) => {
        externalSetHeader((prev) => ({ ...prev, [name]: date }))
    }

    return (
        <div className="factor-info-container">
            <form className="factor-form">
                <table className="factor-table">
                    <tbody>
                        <tr>
                            <td className="fi-label">انبار:</td>
                            <td>
                                <input
                                    name="anbar"
                                    value={formData.anbar}
                                    onChange={handleChange}
                                    className="input-field"
                                    disabled={disabled}
                                    onClick={() => isEditMode && setIsAnbarMenuOpen(true)}
                                    readOnly={isEditMode}
                                    style={isEditMode ? { cursor: 'pointer' } : {}}
                                />
                                <AnbarMenu
                                    items={warehouses}
                                    isOpen={isAnbarMenuOpen && isEditMode}
                                    onSelect={handleAnbarSelect}
                                    onClose={() => setIsAnbarMenuOpen(false)}
                                />
                            </td>
                            <td colSpan={3} className="fi-autofill">
                                <div className="">{formData.anbarShobe || ''}</div>
                            </td>
                            <td className="fi-label">نوع رسید:</td>
                            <td>
                                <select
                                    name="noeRasid"
                                    value={formData.noeRasid}
                                    onChange={handleChange}
                                    className="input-field"
                                    disabled={disabled}
                                >
                                    <option>رسید انتقالی غیر همزمان</option>
                                    <option>رسید مستقیم</option>
                                    <option>رسید اجاعه</option>
                                </select>
                            </td>
                            <td className="fi-label">تاریخ رسید:</td>
                            <td>
                                <JalaliDatePicker
                                    name="tarikh"
                                    value={formData.tarikh}
                                    onChange={handleDateChange}
                                    disabled={disabled}
                                />
                                <DatePicker
                                    disableDayPicker
                                    format="HH:mm"
                                    calendar={persian}
                                    locale={persian_fa}
                                    plugins={[<TimePicker hideSeconds />]}
                                    value={formData.saatSarResid}
                                    onChange={(date) =>
                                        !disabled && externalSetHeader((prev) => ({
                                            ...prev,
                                            saatSarResid: date,
                                        }))
                                    }
                                    inputClass={`input-field time-input${disabled ? ' disabled' : ''}`}
                                    placeholder="--:--"
                                    disabled={disabled}
                                />
                            </td>
                            <td className="fi-label">شماره فاکتور:</td>
                            <td>
                                <input
                                    name="shomareInvoice"
                                    value={formData.shomareInvoice}
                                    onChange={handleChange}
                                    className="input-field"
                                    disabled={disabled}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td className="fi-label">سریال:</td>
                            <td>
                                <input
                                    name="serialNumber"
                                    value={formData.serialNumber}
                                    onChange={handleChange}
                                    className="input-field"
                                    disabled={disabled}
                                />
                            </td>
                            <td colSpan={3}>
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="rasidMostaqim"
                                        checked={formData.rasidMostaqim}
                                        onChange={handleChange}
                                        disabled={disabled}
                                    />
                                    رسید مستقیم
                                </label>
                            </td>
                            <td className="fi-label">شماره ارجاع:</td>
                            <td>
                                <input
                                    name="shomareEjae"
                                    value={formData.shomareEjae}
                                    onChange={handleChange}
                                    className="input-field"
                                    disabled={disabled}
                                />
                            </td>
                            <td className="fi-label">تاریخ درخواست:</td>
                            <td>
                                <JalaliDatePicker
                                    name="tarkhDarkhast"
                                    value={formData.tarkhDarkhast}
                                    onChange={handleDateChange}
                                    disabled={disabled}
                                />
                            </td>

                            <td className="fi-label">محل اقدام خرید</td>
                            <td>
                                <input
                                    name="mahalEghdam"
                                    value={formData.mahalEghdam}
                                    onChange={handleChange}
                                    className="input-field"
                                    disabled={disabled}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td className="fi-label">کد حساب:</td>
                            <td>
                                <input
                                    name="kodHesab"
                                    value={formData.kodHesab}
                                    onChange={handleChange}
                                    className="input-field"
                                    disabled={disabled}
                                />
                            </td>
                            <td colSpan={3} className="fi-autofill">
                                <div className="">انبار شعبه اراک</div>
                            </td>
                            <td className="fi-label">شماره درخواست:</td>
                            <td>
                                <input
                                    name="shomareDarkhast"
                                    value={formData.shomareDarkhast}
                                    onChange={handleChange}
                                    className="input-field"
                                    disabled={disabled}
                                />
                            </td>
                            <td className="fi-label">شماره سند:</td>
                            <td>
                                <input
                                    name="shomareSand"
                                    value={formData.shomareSand}
                                    onChange={handleChange}
                                    className="input-field"
                                    disabled={disabled}
                                />
                            </td>
                            <td className="fi-label">ش کنترل کیفی</td>
                            <td colSpan="2">
                                <select
                                    name="shKontrolKayfi"
                                    value={formData.shKontrolKayfi}
                                    onChange={handleChange}
                                    className="input-field"
                                    disabled={disabled}
                                >
                                    <option value="">ش کنترل کیفی</option>
                                </select>
                            </td>
                            <td colSpan="2"></td>
                        </tr>

                        <tr>
                            <td className="fi-label">تحویل گیرنده:</td>
                            <td>
                                <input
                                    name="tavhilGirandeh"
                                    value={formData.tavhilGirandeh}
                                    onChange={handleChange}
                                    className="input-field"
                                    disabled={disabled}
                                />
                            </td>
                            <td colSpan={3} className="fi-autofill">
                                <div className="">انبار شعبه اراک</div>
                            </td>

                            <td className="fi-label">تسویه وجه:
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="naqd"
                                        checked={formData.naqd}
                                        onChange={handleChange}
                                        disabled={disabled}
                                    />
                                    نقد
                                </label></td>
                            <td>
                                <select
                                    name="samanahModirian"
                                    value={formData.samanahModirian}
                                    onChange={handleChange}
                                    className="input-field"
                                    disabled={disabled}
                                >
                                    <option value="">سامانه مودیان</option>
                                </select>
                            </td>
                            <td className="fi-label">تاریخ میلادی:</td>
                            <td>
                                <DatePicker
                                    calendarPosition="bottom-right"
                                    name="tarikhMiladi"
                                    value={formData.tarikhMiladi}
                                    onChange={(date) => !disabled && handleDateChange('tarikhMiladi', date)}
                                    inputClass={`input-field date-input${disabled ? ' disabled' : ''}`}
                                    placeholder="YYYY/MM/DD"
                                    disabled={disabled}
                                />
                            </td>
                            <td className="fi-label">سامانه مودیان</td>
                            <td colSpan="2">
                                <select
                                    name="samanahModirian"
                                    value={formData.samanahModirian}
                                    onChange={handleChange}
                                    className="input-field"
                                    disabled={disabled}
                                >
                                    <option value="">سامانه مودیان</option>
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td className="fi-label">حوزه عملکرد:</td>
                            <td>
                                <select
                                    name="hazaEmlkard"
                                    value={formData.hazaEmlkard}
                                    onChange={handleChange}
                                    className="input-field"
                                    disabled={disabled}
                                >
                                    <option value="">انبار و فروش</option>
                                </select>
                            </td>
                            <td colSpan={2} className="fi-label">حوزه مالی:</td>
                            <td>                                <select
                                name="hazeMali"
                                value={formData.hazeMali}
                                onChange={handleChange}
                                className="input-field"
                                disabled={disabled}
                            >
                                <option value="">تکدانه</option>
                            </select></td>

                            <td className="fi-label">بارکد کالا:</td>
                            <td colSpan={3}>
                                <select
                                    name="barcodeField"
                                    value={formData.barcodeField}
                                    onChange={handleChange}
                                    className="input-field"
                                    disabled={disabled}
                                >
                                    <option value="">سامانه مودیان</option>
                                </select>
                            </td>
                            <td className="fi-label">تاریخ مؤثر:</td>
                            <td>
                                <div className="inline-row gap-sm">
                                    <JalaliDatePicker
                                        name="tarikhMother"
                                        value={formData.tarikhMother}
                                        onChange={handleDateChange}
                                        disabled={disabled}
                                    />
                                <input type="text" className="day-number" disabled={disabled}></input>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
            <hr/>
        </div>
    )
}

export default FactorInfo
