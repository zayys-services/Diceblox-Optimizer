// ==UserScript==
// @name         Diceblox Optimizer with Improved UI
// @namespace    http://tampermonkey.net/
// @version      1.17
// @description  Optimizes Diceblox by improving UI and performance, and tracks performance issues.
// @author       @pantoviz
// @match        *://*.diceblox.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const version = "1.17";

    // Function to remove the loading screen
    const forceRemoveLoadingScreen = () => {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.remove();
        }
    };

    // Function to ensure chat is visible
    const ensureChatVisible = () => {
        const chatElement = document.querySelector('.chat-container');
        if (chatElement) {
            chatElement.style.visibility = 'visible';
            chatElement.style.display = 'flex';
        }
    };

    // Function to create top-right UI elements (info icon, Discord icon)
    const createUIElements = () => {
        const existingContainer = document.getElementById('ui-container');
        if (existingContainer) return; // Prevent duplicates

        // Create a container div for the UI
        const uiContainer = document.createElement('div');
        uiContainer.id = 'ui-container';
        uiContainer.style = `
            position: fixed;
            top: 10px;
            right: 10px;
            z-index: 9999;
            pointer-events: auto; /* Allow clicks on the UI */
        `;

        // Create info icon
        const infoIcon = document.createElement('span');
        infoIcon.innerHTML = 'ℹ️';
        infoIcon.style = `
            color: white;
            font-size: 24px;
            cursor: pointer;
            background-color: rgba(0, 0, 0, 0.7);
            padding: 5px;
            border-radius: 5px;
            pointer-events: auto; /* Allow clicks on info icon */
        `;

        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.style = `
            display: none;
            position: absolute;
            top: 40px;
            right: 10px;
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 10px;
            border-radius: 10px;
            text-align: center;
            z-index: 10000;
        `;
        tooltip.innerHTML = `
            <div>Made by @pantoviz on Discord</div>
            <img src="https://cdn-icons-png.flaticon.com/512/2111/2111370.png" alt="Discord" style="width: 24px; height: 24px; margin-top: 10px; cursor: pointer;" onclick="window.open('https://discord.gg/wWra66DV88', '_blank')">
        `;

        infoIcon.onmouseover = () => { tooltip.style.display = 'block'; };
        infoIcon.onmouseout = () => { setTimeout(() => { tooltip.style.display = 'none'; }, 1000); };
        tooltip.onmouseover = () => { tooltip.style.display = 'block'; };
        tooltip.onmouseout = () => { setTimeout(() => { tooltip.style.display = 'none'; }, 1000); };

        uiContainer.appendChild(infoIcon);
        uiContainer.appendChild(tooltip);
        document.body.appendChild(uiContainer);
    };

    // Function to track performance issues
    const trackPerformance = () => {
        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if (entry.duration > 100) { // Log tasks taking longer than 100ms
                    console.log(`Long task detected: ${entry.name} took ${entry.duration}ms`);
                }
            });
        });
        observer.observe({ entryTypes: ['longtask'] });
    };

    // Optimize page performance
    const optimizePagePerformance = () => {
        forceRemoveLoadingScreen();
        ensureChatVisible();
        createUIElements();
        trackPerformance();

        // Additional optimizations
        document.querySelectorAll('img').forEach(img => {
            img.loading = 'lazy';
        });

        document.querySelectorAll('*').forEach(el => {
            el.style.transition = 'none';
            el.style.animation = 'none';
        });

        // Remove unnecessary elements
        const unnecessaryElements = ['.ad-banner', '.popup'];
        unnecessaryElements.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => el.remove());
        });
    };

    // Run optimizations
    optimizePagePerformance();
})();
