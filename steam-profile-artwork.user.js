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
  let css = `
  .steamProfileArtworkContainer {
    background: #17222f;
    display: block;
    width: 100%;
    height: auto;
  }
  .steamProfileArtworkContainer > div {
    padding-left: 20px;
  }
  .buttonsContainer {
    display: flex;
    width: 100%;
    height: 60px;
    align-items: center;
  }

  input[type="text"].fieldInputSuccess {
    position: relative;
    box-shadow: none;
    background: rgb(20 45 11 / 18%);
    border: 1px solid #28432d;
  }
  .successFieldContainer {
    position: absolute;
    left: 0;
    top: 50%;
    line-height: 1;
    background: transparent;
    width: auto;
    height: 37px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #22830f;
    font-size: 16px;
    margin: -10px 0 0 10px;
  }
  `,
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
  const steamProfileArtworkContainer = document.createElement("div");
  steamProfileArtworkContainer.className = "steamProfileArtworkContainer";
  // Create Buttons
  steamProfileArtworkContainer.innerHTML = `
  <div class="pageTitle">Steam Profile Artwork Tool</div>
  <div class="buttonsContainer">
    <a id="blankTitleButton" class="btn_darkblue_white_innerfade btn_medium" style="margin: 2px">
    <span style="padding-left: 32px; padding-right: 32px;">Fill Blank Title</span>
    </a>
    <a id="longArtWorkButton" class="btn_darkblue_white_innerfade btn_medium" style="margin: 2px;">
    <span style="padding-left: 32px; padding-right: 32px;">Enable Long Artwork</span>
    </a>
  </div>`;
  // Grab mainContentsDiv element reference
  const mainContentsDiv = document.querySelector("#mainContents");
  // Insert the Buttons
  mainContentsDiv.parentNode.insertBefore(steamProfileArtworkContainer, mainContentsDiv);
  // Fill Blank Title Button
  const blankTitleCharacter = "⠀";
  const successFieldContainer = document.createElement("div");
  successFieldContainer.className = "successFieldContainer";
  successFieldContainer.innerHTML = `<span>✔ Blank Title Set</span>`;
  const titleFieldInput = document.querySelector(".titleField");
  const blankTitleButton = document.querySelector("#blankTitleButton");
  const parentDiv = titleFieldInput.parentNode;
  blankTitleButton.addEventListener("click", () => {
    titleFieldInput.value = blankTitleCharacter;
    titleFieldInput.classList.add("fieldInputSuccess");
    titleFieldInput.disabled = true;
    // titleFieldInput.parentNode.insertAfter(successFieldContainer, titleFieldInput);
    parentDiv.insertBefore(successFieldContainer, titleFieldInput.nextSibling);
  });
})();
