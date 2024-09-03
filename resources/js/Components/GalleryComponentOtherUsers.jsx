import React, { useState, useEffect } from 'react';
import "../styles/main.scss"
import "../styles/variables.scss"
import axios from 'axios';


const GalleryComponentOtherUsers = () => {
    const [images, setImages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const path = window.location.pathname;
    const userId = path.split('/').pop();

    useEffect(() => {
        fetchImages(currentPage);
    }, [currentPage]);

    const fetchImages = async (page) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/users/${userId}/posts?page=${page}`);
            setImages(response.data.data); // assuming `data` contains the images array
            setTotalPages(response.data.last_page); // `last_page` is the number of total pages
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="gallery-container">
            <h2 className="gallery-title ">Image Gallery</h2>
            <div className="gallery-grid">
                {images.map((image, index) => (
                    <div key={index} className="gallery-item">
                        <a href={`/image/${image.id}`}>
                        <img 
                            src={`/uploads/${image.photo}`} 
                            alt={`Gallery image ${index + 1}`} 
                            className="gallery-image" 
                        />
                        </a>
                    </div>
                ))}
            </div>
            <div className="pagination mt-4">
                <button 
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>{currentPage} of {totalPages}</span>
                <button 
                    onClick={() => handlePageChange(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default GalleryComponentOtherUsers;