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

export default function AddPost2({ auth }) {
    const [text, setText] = useState('');
    const [photo, setPhoto] = useState(null);

    const formData = new FormData();
    formData.append('text', text);
    formData.append('photo', photo);
    formData.append('id', auth.user.id)

    const handleImageChange = (e) => {
        setPhoto(e.target.files[0]);
    };
    const handlePostSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/addpost', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log('Success:', response.data);
            // Reset form fields
            setText('');
            setPhoto(null);
        } catch (error) {
            console.error('Error:', error);

            if (error.response) {
                console.log('Error Response:', error.response.data);
            } else if (error.request) {
                console.log('Error Request:', error.request);
            } else {
                console.log('Error Message:', error.message);
            }
        }
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dodavanje objave</h2>}
        >
            <Head title="AddPost" />
            <div className="flex items-center justify-center  bg-gray-100">
                <div className="w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl mt-8 px-8 py-6 bg-white shadow-md overflow-hidden sm:rounded-lg">
                    <div className='flex justify-center mb-4'>
                        <ApplicationLogo/>
                    </div>
                    <form onSubmit={handlePostSubmit}>
                        <div className="mt-4 h">
                            <InputLabel htmlFor="content" value="Tekst objave"/>
                            <TextArea
                                id="text"
                                name="text"
                                type="textarea"
                                rows="5"
                                value={text}
                                className="mt-1 block w-full h"
                                onChange={(e) => setText(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2 mt-5" htmlFor="image">
                                Zakačite fotografiju
                            </label>
                            <input
                                type="file"
                                id="photo"
                                name="photo"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                onChange={handleImageChange}
                                accept="image"
                                required
                            />
                        </div>
                        <div className="flex items-center justify-end mt-4">
                            <PrimaryButton className="ms-4" type="submit" >
                                Dodaj Objavu
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
