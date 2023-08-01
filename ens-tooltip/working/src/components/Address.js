import React from 'react';

const Address = ({ address, styles }) => {
    return <div style = {
        {...styles, fontSize: styles.size, lineHeight: `${styles.size}px` } } > { address } < /div>;
};

export default Address;