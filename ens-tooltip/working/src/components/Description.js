import React from 'react';

const Description = ({ description, styles }) => {
    return <div style = {
        {...styles, fontSize: styles.size, lineHeight: `${styles.size}px` } } > { description } < /div>;
};

export default Description;