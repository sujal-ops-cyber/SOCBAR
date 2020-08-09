console.log('pp')

chrome.storage.local.get(['thumb', 'bar', 'width', 'radius'], function(data) {
    let theCSS = `html {
                --scrollbarBG: ${data.bar};
                --thumbBG: ${data.thumb};
                }
                body::-webkit-scrollbar {
                width: ${data.width}px;
                }
                body {
                scrollbar-width: thin;
                scrollbar-color: var(--thumbBG) var(--scrollbarBG);
                }
                body::-webkit-scrollbar-track {
                background: var(--scrollbarBG);
                }
                body::-webkit-scrollbar-thumb {
                background-color: var(--thumbBG) ;
                border-radius: ${data.radius}px;
                border: 3px solid var(--scrollbarBG);
                }`

    const css = document.createElement("style");
    css.innerHTML = theCSS;
    css.className= "socbar_custom_css";
    document.head.appendChild(css);
    console.log(css.isConnected);

  });
