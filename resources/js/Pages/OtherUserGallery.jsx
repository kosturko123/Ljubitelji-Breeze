import FriendList from '@/Components/FriendList';
import Sidebar from '@/Components/Sidebar';
import "../styles/main.scss"
import "../styles/variables.scss"
import React from 'react';
import { MenuProvider } from '@/Contexts/MenuContext';
import AuthenticatedMain from '@/Layouts/AuthenticatedMain';
import GalleryComponentOtherUsers from '@/Components/GalleryComponentOtherUsers';


const OtherUserGallery = ({auth}) => {
    return (
        <MenuProvider>
            <AuthenticatedMain className="flex min-h-screen">
                <Sidebar auth ={auth}  lassName="w-64 bg-gray-800 text-white p-4"/>
                <GalleryComponentOtherUsers className="flex-1 p-4 bg-white"/>
                <FriendList className="w-48 bg-gray-100 p-4"s/>
            </AuthenticatedMain>
        </MenuProvider>
    );
};

export default OtherUserGallery;