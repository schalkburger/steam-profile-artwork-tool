// ==UserScript==
// @name         Steam Profile Artwork
// @namespace    https://greasyfork.org/users/776541
// @match       https://steamcommunity.com/sharedfiles/edititem/767/3/
// @grant       none
// @version     1.0
// @author      -
// @description  Steam Profile Artwork Tool
// ==/UserScript==

(function () {
  "use strict";
  // Inject Steam Profile Artwork Tool styles
  let css = ".buttonsContainer { background: #17222f; display: flex; width: 100%; height: 60px; align-items: center; padding-left: 20px }",
    head = document.head || document.getElementsByTagName("head")[0],
    style = document.createElement("style");
  head.appendChild(style);
  style.type = "text/css";
  if (style.styleSheet) {
    // This is required for IE8 and below.
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  // Create Steam Profile Artwork Tool Buttons Container
  const buttonsContainer = document.createElement("div");
  buttonsContainer.className = "buttonsContainer";
  // Create Fill Blank Title Button
  buttonsContainer.innerHTML = `<a id="blankTitleButton" class="btn_darkblue_white_innerfade btn_medium" style="margin: 2px;" onclick="window.parent.postMessage(['steamdownloaderButtonPressed', true], '*')">
  <span style="padding-left: 32px; padding-right: 32px;">
     Fill Blank Title
  </span>
</a>
<a id="longArtWorkButton" class="btn_darkblue_white_innerfade btn_medium" style="margin: 2px;" onclick="window.parent.postMessage(['steamdownloaderButtonPressed', true], '*')">
  <span style="padding-left: 32px; padding-right: 32px;">
     Enable Long Artwork
  </span>
</a>`;
  // grab mainContentsDiv element reference
  const mainContentsDiv = document.querySelector("#mainContents");
  // Insert the Buttons
  mainContentsDiv.parentNode.insertBefore(buttonsContainer, mainContentsDiv);
})();
