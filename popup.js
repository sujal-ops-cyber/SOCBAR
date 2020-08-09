let apply = document.getElementById("apply");
let reset = document.getElementById("reset");


window.addEventListener('DOMContentLoaded', (event) => {
  chrome.storage.local.get(['thumb', 'bar', 'width', 'radius'], function(data) {
    document.getElementById('thumb').value = data.thumb;
    document.getElementById('bar').value = data.bar;
    document.getElementById('width').value = data.width;
    document.getElementById('radius').value = data.radius;
  });
});


apply.onclick = function() {
  let thumb = document.getElementById('thumb').value;
  let bar = document.getElementById('bar').value;
  let width = document.getElementById('width').value;
  let radius = document.getElementById('radius').value;

  let theCSS = `html {
    --scrollbarBG: ${bar};
    --thumbBG: ${thumb};
    }
  body::-webkit-scrollbar {
  width: ${width}px;
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
  border-radius: ${radius}px;
  border: 3px solid var(--scrollbarBG);
  }`

  let theCode = `function lol() {
    const css = document.createElement("style");
    css.className= "socbar_custom_css";
    css.innerHTML = ${JSON.stringify(theCSS)};
    document.head.appendChild(css);
  }
  lol();`
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

    chrome.storage.local.set({thumb: thumb, bar: bar, width: width, radius: radius}, function() {
      console.log("pp");
    });

    chrome.tabs.executeScript(
        tabs[0].id,
        {code: theCode});
  });
};


reset.onclick = function() {
  document.getElementById('thumb').value = 0;
  document.getElementById('bar').value = 0;
  document.getElementById('width').value = "pp";
  document.getElementById('radius').value = "pp";

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

    chrome.storage.local.set({thumb: 0, bar: 0, width: "pp", radius: "pp"}, function() {
      console.log("pp");
    });

    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'Array.from(document.querySelectorAll(".probar_custom_css")).forEach(x=>x.remove());'});
  });
};
