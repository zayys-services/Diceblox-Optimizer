// ==UserScript==
// @name         Diceblox Optimizer with Auto Updates
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Loads the latest version of Diceblox Optimizer from a remote server.
// @author       @pantoviz
// @match        *://*.diceblox.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    const scriptUrl = 'https://raw.githubusercontent.com/zayys-services/Diceblox-Optimizer/refs/heads/main/auto-updates.js';
    
    // Function to load external script
    const loadExternalScript = (url) => {
        const script = document.createElement('script');
        script.src = url;
        script.type = 'text/javascript';
        script.onload = () => console.log(`Loaded: ${url}`);
        document.head.appendChild(script);
    };

    // Load the external script
    loadExternalScript(scriptUrl);
})();
