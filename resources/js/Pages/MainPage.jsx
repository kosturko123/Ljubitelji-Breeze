import Sidebar from '@/Components/Sidebar';
import { MenuProvider } from '@/Contexts/MenuContext';
import "../styles/main.scss"
import "../styles/variables.scss"
import SearchBar from '@/Components/SearchBar';
import FriendList from '@/Components/FriendList';
import AuthenticatedMain from '@/Layouts/AuthenticatedMain';



export default function MainPage({auth}) {

    return ( 
        <MenuProvider>
            <AuthenticatedMain>
                <Sidebar auth = {auth}/>
                <SearchBar />
                <FriendList/>
            </AuthenticatedMain>  
        </MenuProvider>
    );
}
