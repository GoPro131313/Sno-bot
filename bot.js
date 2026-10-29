
 // ==UserScript==
 // @name         Snow Rider Auto Input Tester
 // @namespace    snow-rider-autoplayer
 // @version      1.0
 // @description  Tests automatic keyboard input on the game page
 // @match        https://www.hoodamath.com/games/snowrider3d*
 // @grant        none
 // ==/UserScript==

 (() => {
   "use strict";

   const panel = document.createElement("div");
   panel.style.cssText = [
     "position:fixed", "z-index:2147483647",
     "top:12px", "right:12px",
     "background:#102238", "color:white",
     "padding:14px", "border-radius:12px",
     "font:14px system-ui", "box-shadow:0 3px 18px #0008"
   ].join(";");

   panel.innerHTML = `
     <b>Snow Rider Input Tester</b><br>
     <button id="sr-test">Test right input</button>
     <button id="sr-stop">Stop</button>
     <div id="sr-status">Idle</div>
   `;

   document.body.appendChild(panel);

   let running = false;
   let timer = null;

   function sendKey(key, type) {
     document.dispatchEvent(new KeyboardEvent(type, {
       key,
       code: key === "ArrowRight" ? "ArrowRight" : "ArrowLeft",
       bubbles: true,
       cancelable: true
     }));
   }

   function stop() {
     running = false;
     clearTimeout(timer);
     panel.querySelector("#sr-status").textContent = "Stopped";
   }

   panel.querySelector("#sr-test").onclick = () => {
     if (running) return;
     running = true;
     panel.querySelector("#sr-status").textContent =
       "Testing input; check whether the sled moves.";

     // A short input test only; this is not obstacle detection.
     sendKey("ArrowRight", "keydown");
     timer = setTimeout(() => {
       sendKey("ArrowRight", "keyup");
       running = false;
       panel.querySelector("#sr-status").textContent =
         "Test finished. Verify movement in the game.";
     }, 180);
   };

   panel.querySelector("#sr-stop").onclick = stop;
 })();
