import Toolbar from "./components/Toolbar"
import FactorInfo from "./components/FactorInfo"
import Field from "./components/Field"
import InfoFields from "./components/InfoFields"
import Footer from "./components/Footer"
import useFactors from "./hooks/useFactors"

const App = () => {
    const factors = useFactors()

    if (factors.loading) {
        return <div style={{ textAlign: 'center', padding: '2rem' }}>در حال بارگذاری...</div>
    }

    return (
        <div>
            <nav> <Toolbar /> </nav>
            <FactorInfo header={factors.header} setHeader={factors.setHeader} isEditMode={factors.isEditMode} />
            <Field fieldRows={factors.fieldRows} isEditMode={factors.isEditMode} />
            <InfoFields rows={factors.fieldRows.rows} selectedRowIndex={factors.fieldRows.selectedRowIndex} />
            <Footer
                isEditMode={factors.isEditMode}
                hasNext={factors.hasNext}
                hasPrev={factors.hasPrev}
                goToFirst={factors.goToFirst}
                goToLast={factors.goToLast}
                goToNext={factors.goToNext}
                goToPrev={factors.goToPrev}
                onAdd={factors.addFactor}
                onEdit={factors.editFactor}
                onDelete={factors.deleteFactor}
                onConfirm={factors.confirmEdit}
                onCancel={factors.cancelEdit}
            />
        </div>
    )
}

export default App