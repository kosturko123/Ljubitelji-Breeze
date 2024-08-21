import Sidebar from '@/Components/Sidebar';
import { MenuProvider } from '@/Contexts/MenuContext';
import "../styles/main.scss"
import "../styles/variables.scss"

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <MenuProvider>

            <Sidebar/>

        </MenuProvider> 
    );
}
