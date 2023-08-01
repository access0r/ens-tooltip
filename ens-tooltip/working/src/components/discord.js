import React from 'react';

const Discord = ({ discord, styles }) => {
    return <div style = {
        {...styles, fontSize: styles.size, lineHeight: `${styles.size}px` } } > { discord } < /div>;
};

export default Discord;