import React, { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import { Link, useForm, usePage } from '@inertiajs/react';


const UploadPictureForm = () => {
    const [user_image, setImage] = useState(null);
    const { post } = useForm();

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('user_image', user_image);

        //console.log(formData)
        /*
        post(route('profile.storePicture'), formData, {
            onSuccess: () => {
                console.log('Success');
                // Reset form fields
                setImage(null);
            },
            onError: (error) => {
                console.error('Error:', error);
            },
        });
        */

        try {
            const response = await axios.post(route('profile.storePicture'), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log('Success:', response.data);
            setImage(null);
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }

    };

    return (
        <div >
            <h2 >Profile Picture</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                        Upload Image
                    </label>
                    <input
                        type="file"
                        id="user_image"
                        name="user_image"
                        onChange={handleImageChange}
                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <PrimaryButton
                    type="submit"
                >
                    Upload
                </PrimaryButton>
            </form>
        </div>
    );
};

export default UploadPictureForm;