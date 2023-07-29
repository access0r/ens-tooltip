// Fetch the JSON file from the server
fetch('config.json')
    .then(response => response.json())
    .then(config => {
        // Use the config data
        highlightENSNames();
        addHoverEvent(config);
    });

// Function to highlight ENS names
function highlightENSNames() {
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
}

// Function to fetch ENS data
async function fetchENSData(ensName) {
    // Replace with a valid API endpoint
    const response = await fetch('https://ensdata.net/' + ensName);
    const data = await response.json();
    return data;
}

// Function to create a tooltip
function createTooltip(data, config) {
    var tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    Object.assign(tooltip.style, config.tooltip);

    if (data.avatar) {
        var avatar = document.createElement('img');
        avatar.src = data.avatar;
        avatar.width = 64;
        avatar.height = 64;
        tooltip.appendChild(avatar);
    }

    for (var key in data) {
        if (key === 'avatar') continue;

        var recordDiv = document.createElement('div');
        recordDiv.className = 'nameRecord';
        Object.assign(recordDiv.style, config.nameRecord);

        var titleDiv = document.createElement('div');
        titleDiv.className = 'dataTitle';
        titleDiv.id = key;
        titleDiv.textContent = key;
        Object.assign(titleDiv.style, config.dataTitle);

        var textSpan = document.createElement('span');
        textSpan.className = 'textRecord';

        var text = data[key];
        var a = document.createElement('a');
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
        } else if (key === 'email') {
            a.href = 'mailto:' + text;
        } else if (key === 'address') {
            a.href = 'https://etherscan.io/address/' + text;
        } else if (/^(http|https):\/\//.test(data[key])) {
            a.href = data[key];
            a.textContent = 'Link to ' + key;
        } else {
            textSpan.textContent = text;
        }

        if (a.href) {
            textSpan.appendChild(a);
        }

        recordDiv.appendChild(titleDiv);
        recordDiv.appendChild(textSpan);
        tooltip.appendChild(recordDiv);
    }

    document.body.appendChild(tooltip);
    return tooltip;
}

// Function to add a hover event to all ENS names
function addHoverEvent(config) {
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
}
