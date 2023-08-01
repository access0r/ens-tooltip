import React from 'react';

const Telegram = ({ telegram, styles }) => {
    return <div style = {
        {...styles, fontSize: styles.size, lineHeight: `${styles.size}px` } } > { telegram } < /div>;
};

export default Telegram;