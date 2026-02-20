import { useState } from "react"

const useProductCodeMenu = ({ setSelectedRowIndex, applyItemToRow }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [menuRowIndex, setMenuRowIndex] = useState(null)

    const openMenu = (rowIndex) => {
        setSelectedRowIndex(rowIndex)
        setMenuRowIndex(rowIndex)
        setIsMenuOpen(true)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    const selectItem = (item) => {
        if (menuRowIndex === null) return
        applyItemToRow(menuRowIndex, item)
        setIsMenuOpen(false)
    }

    return { isMenuOpen, openMenu, closeMenu, selectItem }
}

export default useProductCodeMenu
