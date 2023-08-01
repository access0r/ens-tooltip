import React from 'react';

const Website = ({ url, styles }) => {
    return <div style = {
        {...styles, fontSize: styles.size, lineHeight: `${styles.size}px` } } > { url } < /div>;
};

export default Website;