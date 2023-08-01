import React from 'react';

const Reddit = ({ reddit, styles }) => {
    return <div style = {
        {...styles, fontSize: styles.size, lineHeight: `${styles.size}px` } } > { reddit } < /div>;
};

export default Reddit;