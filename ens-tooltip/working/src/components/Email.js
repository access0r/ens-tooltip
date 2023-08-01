import React from 'react';

const Email = ({ email, styles }) => {
    return <div style = {
        {...styles, fontSize: styles.size, lineHeight: `${styles.size}px` } } > { email } < /div>;
};

export default Email;