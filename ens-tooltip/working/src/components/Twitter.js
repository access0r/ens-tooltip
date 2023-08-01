import React from 'react';

const Twitter = ({ twitter, styles }) => {
    return <div style = {
        {...styles, fontSize: styles.size, lineHeight: `${styles.size}px` } } > { twitter } < /div>;
};

export default Twitter;