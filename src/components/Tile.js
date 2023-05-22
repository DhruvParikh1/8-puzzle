import React from 'react';

const Tile = ({ number, onClick }) => {
    return (
        <div className={`tile ${number === null ? 'empty' : ''}`} onClick={onClick}>
            {number !== null && number}
        </div>
    );
};

export default Tile;
