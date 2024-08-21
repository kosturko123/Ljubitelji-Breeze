import Sidebar from '@/Components/Sidebar';
import { MenuProvider } from '@/Contexts/MenuContext';
import "../styles/main.scss"
import "../styles/variables.scss"




export default function Welcome({ auth }) {

    return ( 
        <MenuProvider>
            <Sidebar/>
        </MenuProvider>
    );
}
