import Sidebar from '@/Components/Sidebar';
import { MenuProvider } from '@/Contexts/MenuContext';
import "../styles/main.scss"
import "../styles/variables.scss"
import SearchBar from '@/Components/SearchBar';
import FriendList from '@/Components/FriendList';




export default function Welcome({ auth }) {

    return ( 
        <MenuProvider>
            <Sidebar/>
            <SearchBar/>
            <FriendList/>
        </MenuProvider>
    );
}
