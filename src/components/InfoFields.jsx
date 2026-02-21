import data from '../../db.json'
import './InfoFields.css'
import useRowSummary from '../hooks/useRowSummary'

const { featureLookup = {} } = data

const resolve = (code) => featureLookup[String(code)] || ''

const InfoFields = ({ rows, selectedRowIndex }) => {
    const selectedRow = rows[selectedRowIndex] || {}
    const { jamMeghdar } = useRowSummary(rows, selectedRowIndex)

    const vizhegi1 = resolve(selectedRow.feature1)
    const vizhegi2 = resolve(selectedRow.feature2)
    const vizhegi3 = resolve(selectedRow.feature3)
    const vizhegi4 = resolve(selectedRow.feature4)

    return (
        <div className="info-fields-container">
            <table className="info-fields-table">
                <tbody>
                    <tr>
                        <td className="if-label">ویژگی ۱:</td>
                        <td className="if-value">{vizhegi1}</td>
                        <td className="if-label">دهنده کالا :</td>
                        <td className="if-value"></td>
                        <td className="if-label">واحد کالا :</td>
                        <td className="if-value if-value-sm"></td>
                        <td className="if-label">جمع مبلغ :</td>
                        <td className="if-value if-value-num">ریال</td>
                    </tr>

                    <tr>
                        <td className="if-label">ویژگی ۲:</td>
                        <td className="if-value">{vizhegi2}</td>
                        <td className="if-label">تفصیلی ۲ :</td>
                        <td className="if-value"></td>
                        <td className="if-label">جمع مقدار :</td>
                        <td className="if-value if-value-num">{jamMeghdar}</td>
                        <td className="if-label">جمع اضافات :</td>
                        <td className="if-value if-value-num">ریال</td>
                    </tr>

                    <tr>
                        <td className="if-label">ویژگی ۳:</td>
                        <td className="if-value">{vizhegi3}</td>
                        <td className="if-label">تفصیلی ۳ :</td>
                        <td className="if-value"></td>
                        <td className="if-label">جمع ارز :</td>
                        <td className="if-value if-value-num"></td>
                        <td className="if-label">جمع قیمت‌تمام‌شده :</td>
                        <td className="if-value if-value-num">ریال</td>
                    </tr>

                    <tr>
                        <td className="if-label">ویژگی ۴:</td>
                        <td className="if-value">{vizhegi4}</td>
                        <td className="if-label">تفصیلی ۴ :</td>
                        <td className="if-value"></td>
                        <td className="if-label">جمع وزن (KG):</td>
                        <td className="if-value if-value-num"></td>
                        <td className="if-label">جمع کسورات :</td>
                        <td className="if-value if-value-num">ریال</td>
                    </tr>

                    <tr>
                        <td className="if-label">حساب مرتبط :</td>
                        <td className="if-value"></td>
                        <td colSpan={2}></td>
                        <td className="if-label">مالیات و عوارض VAT :</td>
                        <td className="if-value if-value-num"></td>
                        <td className="if-label">قابل پرداخت :</td>
                        <td className="if-value if-value-num">ریال</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default InfoFields
