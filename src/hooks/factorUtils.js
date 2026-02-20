export const API_URL = "http://localhost:3002/factors"

export const createEmptyRow = () => ({
    productCode: "",
    technicalNumber: "",
    feature1: "", feature2: "", feature3: "", feature4: "",
    productName: "",
    productNameEn: "",
    delivererItem: "",
    delivererName: "",
    quantity: "",
    unitPrice: "",
    totalPrice: ""
})

export const createEmptyHeader = () => ({
    anbar: '',
    anbarShobe: '',
    noeRasid: 'رسید انتقالی غیر همزمان',
    serialNumber: '',
    rasidMostaqim: false,
    shomareEjae: '',
    shomareInvoice: '',
    shomareDarkhast: '',
    shomareSand: '',
    kodHesab: '',
    tavhilGirandeh: '',
    naqd: true,
    mahalEghdam: ''
})

export const deepCloneList = (list) =>
    list.map(f => ({
        ...f,
        header: { ...f.header },
        rows: f.rows.map(r => ({ ...r }))
    }))
