import Checkbox from '@/Components/Checkbox';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';
import { Head, Link, useForm } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import React, { useState } from 'react'

export default function AddPost2({auth}) {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', image);


    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
      };
 
    return (
        <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">AddPost</h2>}
        >
            <Head title="AddPost" />
            
            <div className="flex items-center justify-center  bg-gray-100">
            <div className="w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl mt-8 px-8 py-6 bg-white shadow-md overflow-hidden sm:rounded-lg">

            <div className='flex justify-center mb-4'>
                
                    <ApplicationLogo className="w-32 h-32 fill-current text-gray-500" />
                
            </div>
                
            <form >
                <div>
                    <InputLabel htmlFor="title" value="Title" />

                    <TextInput
                        id="title"
                        type="text"
                        name="title"
                        value={title}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="mt-4 h">
                    <InputLabel htmlFor="content" value="Content" />

                    <TextArea
                        id="content"
                        name="content"
                        type = "textarea"
                        rows = "5"
                        value = {content}
                        className="mt-1 block w-full h"
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>

            <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2 mt-5" htmlFor="image">
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleImageChange}
              accept="image/*"
              required
            />
          </div>
                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" type ="submit" >
                        Dodaj Objavu
                    </PrimaryButton>
                </div>
            </form>
            </div>
            </div>
        </AuthenticatedLayout>
    );
}
