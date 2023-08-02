fetch('config.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(config => {
        // Use the config data
        console.log('Config:', config); // Logging the config for debugging purposes
        highlightENSNames();

        if (!config.hasOwnProperty('displayOptions')) {
            console.warn('Hover event not added. Config.displayOptions is missing.');
            return;
        }

        const showHover = config.displayOptions.showHover;
        if (showHover !== true) {
            console.warn('Hover event not added. Config.displayOptions.showHover must be set to true.');
            return;
        }

        addHoverEvent(config);
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });


function highlightENSNames() {
    try {
        var elements = document.getElementsByTagName('*');
        var ensNameRegex = /\b\w+\.eth\b/g;

        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];

            for (var j = 0; j < element.childNodes.length; j++) {
                var node = element.childNodes[j];

                if (node.nodeType === 3) {
                    var text = node.nodeValue;
                    var match = ensNameRegex.exec(text);

                    if (match) {
                        var span = document.createElement('span');
                        span.className = 'ens-name';
                        span.textContent = match[0];

                        var before = text.slice(0, match.index);
                        var after = text.slice(match.index + match[0].length);

                        if (before) {
                            element.insertBefore(document.createTextNode(before), node);
                        }

                        element.insertBefore(span, node);

                        if (after) {
                            element.insertBefore(document.createTextNode(after), node);
                        }

                        element.removeChild(node);
                    }
                }
            }
        }
    } catch (error) {
        console.error('There has been a problem with your highlightENSNames operation:', error);
    }
}


async function fetchENSData(ensName) {
    try {
        const response = await fetch('https://ensdata.net/' + ensName);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}


function createTooltip(data, config) {
    try {
        var tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        Object.assign(tooltip.style, config.tooltip);

        // Stop click events from propagating to the document
        tooltip.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        if (data.avatar && config.displayOptions.avatar !== false) {
            var avatar = document.createElement('img');
            avatar.src = data.avatar;
            avatar.width = 64;
            avatar.height = 64;
            tooltip.appendChild(avatar);
        }

        for (var key in data) {
            // Respect config.displayOptions - if a key is set to false, do not display it
            if (config.displayOptions && config.displayOptions[key] === false) continue;
            if (key === 'avatar') continue;

            var recordDiv = document.createElement('div');
            recordDiv.className = 'recordContainer';
            Object.assign(recordDiv.style, config.recordContainer);

            var titleDiv = document.createElement('div');
            titleDiv.className = 'dataTitle';
            titleDiv.id = key;
            titleDiv.textContent = key;
            Object.assign(titleDiv.style, config.dataTitle);

            var textSpan = document.createElement('span');
            textSpan.className = 'textRecord';

            var text = data[key];
            if (text) { // Add this check
                var a = document.createElement('a'); // Define 'a' here
                a.textContent = text;

                if (text.length > 43) {
                    text = text.substring(0, 43) + '...';
                    var longTextTooltip = document.createElement('div');
                    longTextTooltip.textContent = data[key];
                    longTextTooltip.style.display = 'none';
                    textSpan.appendChild(longTextTooltip);
                    textSpan.onmouseover = function() {
                        longTextTooltip.style.display = 'block';
                    }
                    textSpan.onmouseout = function() {
                        longTextTooltip.style.display = 'none';
                    }
                }
                if (key === 'twitter') {
                    a.href = 'https://twitter.com/' + text;
                } else if (key === 'reddit') {
                    a.href = 'https://reddit.com/user/' + text;
                } else if (key === 'telegram') {
                    a.href = 'https://t.me/' + text;
                } else if (key === 'discord') {
                    a.href = 'https://discord.com/user/' + text;
                } else if (key === 'github') {
                    a.href = 'https://github.com/' + text;
                } else if (key === 'website') {
                    a.href = text;
                } else if (key === 'email') {
                    a.href = 'mailto:' + text;
                } else if (key === 'address') {
                    a.href = 'https://etherscan.io/address/' + text;
                } else if (key === 'avatar') {
                    a.href = text;
                } else if (key === 'contentHash') {
                    a.href = 'ipfs://' + text;
                } else if (key === 'delegateHere') {
                    a.href = text;
                } else if (key === 'description') {
                    textSpan.textContent = text;
                } else if (key === 'ens') {
                    a.href = 'https://etherscan.io/address/' + text;
                } else if (key === 'ensPrimary') {
                    a.href = 'https://etherscan.io/address/' + text;
                } else if (key === 'ethEnsDelegate') {
                    a.href = text;
                } else if (key === 'header') {
                    a.href = text;
                } else if (key === 'headerUrl') {
                    a.href = text;
                } else if (key === 'human') {
                    textSpan.textContent = text;
                } else if (key === 'keywords') {
                    textSpan.textContent = text;
                } else if (key === 'notice') {
                    textSpan.textContent = text;
                } else if (key === 'poap') {
                    a.href = text;
                } else if (key === 'snapshot') {
                    a.href = text;
                } else if (key === 'themeAccentColors') {
                    textSpan.textContent = text;
                } else if (key === 'themePrimaryColor') {
                    textSpan.textContent = text;
                } else if (key === 'url') {
                    a.href = text;
                } else if (/^(http|https):\/\//.test(data[key])) {
                    a.href = data[key];
                    a.textContent = 'Link to ' + key;
                } else {
                    textSpan.textContent = text;
                }

                if (a.href) {
                    textSpan.appendChild(a);
                }
            }

            recordDiv.appendChild(titleDiv);
            recordDiv.appendChild(textSpan);
            tooltip.appendChild(recordDiv);
        }

        document.body.appendChild(tooltip);
        return tooltip;
    } catch (error) {
        console.error('There has been a problem with your createTooltip operation:', error);
    }
}


function addHoverEvent(config) {
    try {
        if (config.hasOwnProperty('displayOptions') && config.displayOptions.showHover === true) {
            var ensNames = document.getElementsByClassName('ens-name');
            var tooltip;

            for (var i = 0; i < ensNames.length; i++) {
                ensNames[i].addEventListener('mouseover', async function(e) {
                    if (!tooltip) {
                        var data = await fetchENSData(this.textContent);
                        tooltip = createTooltip(data, config);
                        tooltip.style.left = e.pageX + 'px';
                        tooltip.style.top = e.pageY + 'px';
                    }
                });

                ensNames[i].addEventListener('mousemove', function(e) {
                    if (tooltip) {
                        var rect = tooltip.getBoundingClientRect();
                        if (e.clientX < rect.left - 50 || e.clientX > rect.right + 50 || e.clientY < rect.top - 50 || e.clientY > rect.bottom + 50) {
                            tooltip.remove();
                            tooltip = null;
                        }
                    }
                });
            }


            document.addEventListener('click', function(e) {
                if (tooltip) {
                    tooltip.remove();
                    tooltip = null;
                }
            });
        }
    } catch (error) {
        console.error('There has been a problem with your addHoverEvent operation:', error);
    }
}
s
