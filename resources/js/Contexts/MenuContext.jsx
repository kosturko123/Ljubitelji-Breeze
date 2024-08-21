import React, {useContext,useState} from 'react'

const MenuContext = React.createContext();
const MenuUpdateContext = React.createContext();

export function useMenu(){
    return useContext(MenuContext);
}

export function useMenuUpdate(){
    return useContext(MenuUpdateContext);
}

export function MenuProvider({children}){
    const[closeMenu, setCloseMenu] = useState(false);

    function handleCloseMenu(){
        setCloseMenu(!closeMenu);
    }

    return(
        <MenuContext.Provider value={closeMenu}>
            <MenuUpdateContext.Provider value={handleCloseMenu}>
                {children}
            </MenuUpdateContext.Provider>
        </MenuContext.Provider>
    )

}