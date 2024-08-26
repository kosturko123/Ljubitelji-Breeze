import Checkbox from '@/Components/Checkbox';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';
import { Head, Link, useForm } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import React, { useState } from 'react';

const BreweryInfo = ({auth}) => {
    const [brewery, setBrewery] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    // Style
    const style = {
        container: {
            backgroundColor: '#ABE6C6',
            padding: '20px',
            borderRadius: '5px',
            textAlign: 'center',
        },
        align: {
            marginLeft: '15%',
            textAlign: 'left',
        }
    };

    const fetchBrewery = () => {
        setLoading(true);
        setError(null);
        const url = `https://api.openbrewerydb.org/v1/breweries/random?timestamp=${new Date().getTime()}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Greška u komunikaciji sa API-jem.');
                }
                return response.json();
            })
            .then(data => {
                setBrewery(data[0]);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    };

    return (
        <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Pretraga pivara</h2>}
        >
            <div className="flex items-center justify-center  bg-gray-100">
                <div className="w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl mt-8 px-8 py-6 bg-white shadow-md overflow-hidden sm:rounded-lg">
                    
            <Head title="Brewery" />
                    <div>
                        <Head title="Pivare"/>
                        <div className='flex justify-center mb-4'>
                            <ApplicationLogo/>
                        </div>
                        <h3>Informacije o pivari:</h3>
                        {loading && <p>Učitavanje...</p>}
                        {error && <p>Greška: {error}</p>}
                        {brewery && (
                        <div style={style.container}>
                            <h1>{brewery.name}</h1>
                            <div style={style.align}>
                                <p><strong>Tip pivare:</strong> {brewery.brewery_type}</p>
                                <p><strong>Sajt:</strong> <a href={brewery.website_url} target="_blank">{brewery.website_url}</a></p>
                                <p><strong>Adresa:</strong> {brewery.address_1}</p>
                                <p><strong>Grad:</strong> {brewery.city}</p>
                                <p><strong>Država:</strong> {brewery.country}</p>
                            </div>
                        </div>
                        )}
                    </div>
                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton className="ms-4" onClick={fetchBrewery}>
                            Pronadji pivaru
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default BreweryInfo;
