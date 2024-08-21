import Sidebar from '@/Components/Sidebar';
import { MenuProvider } from '@/Contexts/MenuContext';
import "../styles/main.scss"
import "../styles/variables.scss"
import SearchBar from '@/Components/SearchBar';
import FriendList from '@/Components/FriendList';




export default function MainPage({auth}) {

    const user = auth.user;
    console.log(user);

    return ( 
        <MenuProvider>
            
            <Sidebar auth = {auth}/>
            <SearchBar />
            <FriendList/>
            
        </MenuProvider>
    );
}
