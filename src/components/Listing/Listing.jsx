import React from 'react';
import './Listing.css';
const Listing = (props) => {
    // Access the argument using props
    const { movieTitle } = props;

    return (
        <div>
            <h2>{movieTitle}</h2>
            <p>Testing</p>
            {/* Additional rendering logic */}
        </div>
    );
};

export default Listing;