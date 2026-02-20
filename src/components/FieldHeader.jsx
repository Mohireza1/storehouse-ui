const HEADERS = [
    "ردیف", "کد کالا", "شماره فنی",
    "ویژگی ۱", "ویژگی ۲", "ویژگی ۳", "ویژگی ۴",
    "نام کالا", "نام انگلیسی کالا",
    "تحویل دهنده کالا", "نام تحویل دهنده",
    "مقدار", "بهای واحد", "مبلغ کل"
]

const FieldHeader = () => (
    <div className="field-header">
        <div className="decorative-cell"></div>
        {HEADERS.map((header, index) => (
            <div key={index} className="field-header-cell">{header}</div>
        ))}
    </div>
)

export default FieldHeader
