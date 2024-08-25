import React from 'react';
import Gallery from './Gallery';
import {useEffect, useState } from 'react';
import axios from 'axios';

const GalleryPage = () => {
    // Sample array of image URLs
    const [images, setImages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch images from the backend
        const fetchImages = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:8000/api/getposts'); // Adjust the URL as needed
                setImages(prevImages => [...prevImages, ...response.data.data]);
                setTotalPages(response.data.last_page);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
            finally{
                setLoading(false);
            }
        };

        fetchImages();
    }, [currentPage]);

    const loadMore = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    return (
        <div>
            <Gallery images={images} />
        </div>
    );
};

export default GalleryPage;