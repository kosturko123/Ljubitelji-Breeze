import React from 'react';
import "../styles/main.scss"
import "../styles/variables.scss"

const Gallery = ({ images }) => {

    return (
        <div className="gallery-container">
            <h1 className="gallery-title">Image Gallery</h1>
            <div className="gallery-grid">
                {images.map((image, index) => (
                    <div key={index} className="gallery-item">
                        <img src={image} alt={`Gallery image ${index + 1}`} className="gallery-image" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;