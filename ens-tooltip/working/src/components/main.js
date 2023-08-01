import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import Tooltip from './Tooltip';
import config from './config.json';

const MyComponent = () => {
        const [ensData, setEnsData] = useState(null);
        const [tooltipData, setTooltipData] = useState(null);
        const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

        // Fetch ENS data
        const fetchENSData = async(ensName) => {
            const response = await fetch(`https://ensdata.net/${ensName}`);
            const data = await response.json();
            setEnsData(data);
        };

        // Highlight ENS names and attach hover event
        useEffect(() => {
            const highlightENSNames = () => {
                const ensNameRegex = /\b\w+\.eth\b/g;

                document.body.innerHTML = document.body.innerHTML.replace(ensNameRegex, (match) => {
                    return `<span class="ens-name" style="color: blue;">${match}</span>`;
                });

                const ensNames = document.getElementsByClassName('ens-name');
                for (let i = 0; i < ensNames.length; i++) {
                    ensNames[i].addEventListener('mouseover', async(e) => {
                        const data = await fetchENSData(ensNames[i].textContent);
                        setTooltipData(data);
                        setTooltipPosition({ x: e.pageX, y: e.pageY });
                    });

                    ensNames[i].addEventListener('mouseout', () => {
                        setTooltipData(null);
                    });
                }
            };

            highlightENSNames();
        }, []);

        return ( <
            div > {
                tooltipData && < Tooltip data = { tooltipData }
                config = { config }
                position = { tooltipPosition }
                />} <
                /div>
            );
        };

        export default MyComponent;