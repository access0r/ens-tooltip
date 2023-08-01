import React from 'react';

const Github = ({ github, styles }) => {
    return <div style={{ ...styles, fontSize: styles.size, lineHeight: `${styles.size}px` }}>{github}</div>;
};

export default Github;
