import React, { useEffect, useState } from 'react';

// CSS-in-JS object for the dynamic styles
const dynamicStyles = {
    '@font-face': {
        fontFamily: '\'Dank Mono\'',
        src: 'url(\'/DankMono-Regular.ttf\') format(\'truetype\')'
    }
};

// Function to highlight ENS names
const highlightENSNames = (text) => {
        const ensNameRegex = /\b\w+\.eth\b/g;
        const matches = text.match(ensNameRegex);

        if (matches) {
            return text.split(ensNameRegex).reduce((prev, current, i) => {
                    if (!i) {
                        return [current];
                    } else {
                        return [...prev, < span key = { i }
                            className = "ens-name" > { matches[i - 1] } < /span>, current];
                        }
                    }, []);
            }
            else {
                return text;
            }
        };

        // Function to fetch ENS data
        const fetchENSData = async(ensName) => {
            const response = await fetch('https://ensdata.net/' + ensName);
            const data = await response.json();
            return data;
        };

        // The component
        const MyComponent = () => {
            const [config, setConfig] = useState(null);
            const [tooltipData, setTooltipData] = useState(null);
            const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

            useEffect(() => {
                // Fetch the JSON file from the server
                fetch('/config.json')
                    .then(response => response.json())
                    .then(setConfig);
            }, []);

            useEffect(() => {
                if (!config) {
                    return;
                }

                // Add a hover event to all ENS names
                const onMouseOver = async(e) => {
                    const ensName = e.target.textContent;
                    const data = await fetchENSData(ensName);
                    setTooltipData(data);
                    setTooltipPosition({ x: e.pageX, y: e.pageY });
                };

                const onMouseMove = (e) => {
                    if (!tooltipData) {
                        return;
                    }

                    const rect = e.target.getBoundingClientRect();
                    if (e.clientX < rect.left - 50 || e.clientX > rect.right + 50 || e.clientY < rect.top - 50 || e.clientY > rect.bottom + 50) {
                        setTooltipData(null);
                    }
                };

                const ensNames = document.getElementsByClassName('ens-name');
                for (let i = 0; i < ensNames.length; i++) {
                    ensNames[i].addEventListener('mouseover', onMouseOver);
                    ensNames[i].addEventListener('mousemove', onMouseMove);
                }

                // Remove the event listeners on cleanup
                return () => {
                    for (let i = 0; i < ensNames.length; i++) {
                        ensNames[i].removeEventListener('mouseover', onMouseOver);
                        ensNames[i].removeEventListener('mousemove', onMouseMove);
                    }
                };
            }, [config, tooltipData]);

            const onClick = () => {
                setTooltipData(null);
            };

            // Render the component
            return ( <
                div onClick = { onClick } > { /* Add your dynamic styles */ } <
                style > { dynamicStyles } <
                /style>

                { /* Add your content here */ } <
                p > { highlightENSNames('ENS names to be highlighted') } < /p>

                { /* Render the tooltip */ } {
                    tooltipData && ( <
                        div className = "tooltip"
                        style = {
                            {...config.tooltip, left: tooltipPosition.x, top: tooltipPosition.y }
                        } > { /* Render the avatar */ } <
                        img src = { tooltipData.avatar }
                        alt = "avatar"
                        className = "avatar-img" / >

                        {
                            Object.keys(tooltipData).map((key) => {
                                if (key !== 'avatar' && config.displayOptions['show' + key.charAt(0).toUpperCase() + key.slice(1)]) {
                                    return ( <
                                        div key = { key }
                                        className = "nameRecord"
                                        style = { config.nameRecord } >
                                        <
                                        div className = "dataTitle"
                                        id = { key }
                                        style = { config.dataTitle } > { key } < /div> <
                                        span className = "textRecord" > { tooltipData[key] } < /span> < /
                                        div >
                                    );
                                }
                                return null;
                            })
                        } <
                        /div>
                    )
                } <
                /div>
            );
        };

        export default MyComponent;