import React from 'react';
import Logo from '../images/LogoWhite.svg'; // Adjust the path if necessary

export default function ApplicationLogo(props) {
    return (
        <img
            {...props}
            src={Logo}
            alt="Application Logo"
        />
    );
}
