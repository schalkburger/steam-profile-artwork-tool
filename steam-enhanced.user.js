// ==UserScript==
// @name        Steam Enhanced
// @namespace   https://greasyfork.org/en/users/961305-darkharden
// @match       https://steamcommunity.com/*
// @include     /^https?:\/\/steamcommunity.com\/(id\/+[A-Za-z0-9$-_.+!*'(),]+|profiles\/7656119[0-9]{10})\/friends\/?$/
// @version     1.1.3
// @author      Schalk Burger <schalkb@gmail.com>
// @description  A collection of tools to enhance Steam.
// @license MIT
// ==/UserScript==

// TODO

// 1. Auto refresh Steam market when it doesn't load
// Code change
//  sdfsd

// 1. Upload Artwork & Enable Custom Uploads Buttons
// 2. Steam Profile Artwork Tool Buttons
// 3. Symbols & Characters
// 3. Steam Mass Comments Poster Vanilla
// 4. Steam Copy Avatar Frame Source
// 5. Steam Replace Avatar Frame Source
// 6. Reload Steam market function

(function () {
  "use strict";
  let version = GM_info.script.version;
  console.log(`Steam Enhanced Version ${version}`);
  // Inject Steam Profile Artwork Tool styles
  let css = `
  .steam-enhanced {
    padding: 10px 10px 10px 15px;
    border-radius: 10px;
    margin-bottom: 10px;
    position: fixed;
    top: 10px;
    right: 10px;
    background: #141414;
    opacity: 1;
    width: 100%;
    max-width: 150px;
    z-index: 600;
  }
  .steam-enhanced:hover {
    opacity: 1;
  }
  .steam-enhanced h4 {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .steam-enhanced h4 span {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAMAQMAAAC6HhTBAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAZQTFRFAAAAxcPCp77KdQAAAAJ0Uk5TAP9bkSK1AAAAGklEQVR4nGNgQAPMfxgYGH8AGR+AOAFdlgEAUsADSd64CbwAAAAASUVORK5CYII=);
    background-position: right center;
    background-repeat: no-repeat;
    width: 20px;
    height: 20px;
    display: inline-block;
    cursor: pointer;
  }
  .steam-enhanced h4 span.toggle {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAMAQMAAAC6HhTBAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAZQTFRFAAAAxcPCp77KdQAAAAJ0Uk5TAP9bkSK1AAAAGUlEQVR4nGNgQAcJQPyBgYHxBwMD8x8MWQBLKANJzkSRZQAAAABJRU5ErkJggg==);
  }
  .steam-enhanced a:hover {
    text-decoration: underline;
  }
  .steam-enhanced-container {
    padding: 10px 0 0 5px;
  }
  .steam-enhanced-container.hide {
    display: none;
  }
  .upload-artwork-link,
  .change-profile-theme {
    position: relative;
  }
  .upload-artwork-link:hover {
    text-decoration: underline;
  }
  .change-profile-theme-container {
    display: flex;
    flex-direction: column;
    border-top: 1px solid #7d7f7f;
    padding-top: 10px;
    margin-top: 10px;
  }
  .change-profile-theme {
    min-width: 150px;
    min-height: 20px;
    cursor: pointer;
    overflow: visible;
    z-index: 400;
    color: #fff;
    margin-top: 5px;
  }
  .change-profile-theme details {
    position: absolute;
    top: 0;
    left: 0;
  }
  .change-profile-theme details[open] {
    /* border-radius: 10px 0 10px 10px; */
    /* box-shadow: 1px 4px 4px 0px #000; */
  }
  .change-profile-theme details summary {
    user-select: none;
  }
  .preview-background {
    z-index: 300;
  }
  .preview-avatar-frame {
    z-index: 200;
  }
  .useful-links {
    z-index: 500;
  }
  .change-profile-theme .color-themes,
  .change-profile-theme .useful-links {
    display: flex;
    flex-direction: column;
    background-color: #141414;
    color: #fff;
    padding: 15px;
    padding-top: 5px;
    padding-left: 25px;
    margin-top: 10px;
    min-width: 130px;
    margin-left: -5px;
    border-radius: 8px;
    box-shadow: 1px 2px 4px 2px rgb(0 0 0 / 50%);
    border-top: 1px solid #202020;
  }
  .change-profile-theme .useful-links span {
    margin: 6px 0 4px 0;
    display: block;
  }
  .change-profile-theme .color-themes span {
    margin: 6px 0 4px 0;
    display: block;
  }
  .change-profile-theme .color-themes span:hover {
    text-decoration: underline;
  }
  #manage_friends .friends-comments-textarea {
    width: 100%;
  }
  #manage_friends.manage_friends_panel.manage {
    padding-bottom: 20px;
  }
  .friend_block_v2 .indicator {
    background-color: #1c4057;
  }
  #showSymbols {
    margin-left: 0;
  }
  #symbolsModal {
    position: fixed;
    top: 10px;
    right: 10px;
    background-color: #141414;
    color: #fff;
    padding: 15px;
    padding-top: 0;
    box-shadow: 0 0 12px #000000;
    width: 340px;
    height: calc(95vh);
    border: none;
    overflow: hidden;
    overflow-y: scroll;
    display: none;
    z-index: 700;
    cursor: auto;
  }
  #symbolsModal.show {
    display: block;
  }
  #symbolsModal.hide {
    display: none;
  }
  #symbolsModal #close {
    position: fixed;
    top: 20px;
    right: 34px;
    font-size: 18px;
    color: transparent;
    text-shadow: 0 0 0 white;
  }
  #symbolsModal a {
    color: #1a9fff;
    display: block;
  }
  .symbol-picker {
    position: relative;
  }
  .commentthread_entry_quotebox .commentthread_textarea {
    resize: vertical;
    min-height: 80px;
    padding: 5px;
  }
  .symbolsDialog {
    background-color: #3b3938;
    color: #fff;
    padding: 15px;
    padding-top: 0;
    box-shadow: 0 0 12px #000000;
    width: 500px;
    height: calc(50vh);
    border: none;
  }
  .subSectionTitle {
    padding-top: 10px;
    padding-bottom: 0px;
    margin-bottom: 10px;
    color: #fff;
    font-size: 18px;
  }
  .symbols-container {
    max-width: 590px;
    max-height: 500px;
    overflow: auto;
    background: none;
    position: relative;
    top: 0;
  }
  .symbols-container details {
    padding: 15px;
    transition: all 0.3s ease-out;
  }
  .symbols-container details[open] {
    padding: 15px;
    background: #141414;
  }
  .symbols-container summary {
    cursor: pointer;
  }
  .profileedit_ProfileBoxContent_3s6BB .symbols-container {
    left: 0;
    top: -32px;
  }
  .profileedit_ProfileBoxContent_3s6BB .symbols-container details[open] {
    background-color: rgba(0, 0, 0, 0.25);
  }
  .customtext_showcase + .symbols-container {
    left: 0;
    top: 10px;
  }
  .customtext_showcase + .symbols-container details[open] {
    background-color: transparent;
  }  .profile_content.has_profile_background {
    overflow: visible;
  }
  .profile_count_link {
    font-size: 12px;
    margin-bottom: 4px;
    min-height: 20px;
  }
  .active-theme span {
    color: #2e83c9;
  }
  .profile-autoreload-market {
    line-height: normal;
    display: flex;
    align-items: center;
  }
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
  }
  .alertBlankTitleSet,
  .alertCustomArtworkEnabled {
    position: relative;
    left: 0;
    top: 0;
    line-height: 1;
    background: transparent;
    width: auto;
    height: 37px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #22830f;
    font-size: 16px;
    margin: 15px 0 0 0px;
    opacity: 1;
  }
  .alertBlankTitleSet,
  .alertCustomArtworkEnabled.longWorkshopGuideEnabled {
    margin-top: 0;
  }
  .modifyArtworkInstructions blockquote {
    font-size: 14px;
    line-height: 1.6;
  }
  .modifyArtworkInstructions blockquote ol {
    font-size: 16px;
  }
  .modifyArtworkInstructions blockquote ol li {
    margin-bottom: 10px;
  }
  .modifyArtworkInstructions blockquote code {
    padding: 2px 4px;
    background: #1a1a1a;
  }
  .hexEditInstructionsVideo {
    background-image: url(https://store.akamai.steamstatic.com/public/images/v6/maincol_gradient_rule.png);
    background-repeat: no-repeat;
    background-position: top left;
    padding-top: 10px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
  }
  .hexEditInstructionsVideo details {
    margin-left: 5px;
    cursor: pointer;
  }
  .hexEditInstructionsVideo {
    font-size: 16px;
  }
  .embed-container {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
    max-width: 100%;
  }
  .embed-container iframe,
  .embed-container object,
  .embed-container embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .customArtworkButtons {
    display: flex;
    height: auto;
    min-height: 32px;
    justify-content: center;
    align-items: center;
    padding: 0 5px;
    font-size: 15px;
  }
  .customArtworkButtons details {
    font-size: 16px;
  }
  .customArtworkButtons details[open] {
    position: relative;
    top: 0;
  }
  .customArtworkButtons details[open] summary {
    position: relative;
    top: 0;
  }
  .customArtworkButtonsWrapper {
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 0;
    top: calc(100% + 2px);
    width: 100%;
    background: rgb(29 77 104);
    z-index: 400;
    padding-bottom: 10px;
  }
  .customArtworkButtonsWrapper a {
    min-width: 140px;
    position: relative;
    z-index: 400;
    padding: 2px 0;
  }
  .enable-custom-artwork-button {
    padding: 0 15px;
    line-height: 30px;
  }
  #mainContents .pageTitle {
    margin-bottom: 10px;
  }
  .blank-title-added {
    opacity: 0.5;
    pointer-events: none;
  }
  .switch {
    display: block;
    margin-left: 8px;
  }
  .switch input {
    display: none;
  }
  .switch label {
    display: block;
    width: 20px;
    height: 7px;
    padding: 3px;
    border-radius: 15px;
    border: 1px solid #ffffff;
    cursor: pointer;
    transition: 0.3s;
  }
  .switch label::after {
    content: "";
    display: inherit;
    width: 6px;
    height: 6px;
    border-radius: 12px;
    background: #ffffff;
    transition: 0.3s;
  }
  .switch input:checked ~ label {
    border-color: #ffffff;
    background: #343434;
  }
  .switch input:checked ~ label::after {
    translate: 14px 0;
    background: #ffffff;
  }
  .switch input:disabled ~ label {
    opacity: 0.5;
    cursor: not-allowed;
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

  //* ==========================================================================
  //* 1. Upload Artwork & Enable Custom Uploads Buttons
  //* ==========================================================================
  //* Upload custom artwork button to profile

  (function () {
    "use strict";
    function rafAsync() {
      return new Promise((resolve) => requestAnimationFrame(resolve));
    }
    async function checkElement(selector) {
      let querySelector = null;
      while (querySelector === null) {
        await rafAsync();
        querySelector = document.querySelector(selector);
      }
      return querySelector;
    }
    // Check if on profile page
    checkElement("#global_header").then((element) => {
      console.log("global_header");
      function setUploadArtworkButton() {
        const uploadArtworkURL = `https://steamcommunity.com/sharedfiles/edititem/767/3/`;
        const uploadCustomArtworkButtonContainer = document.createElement("div");
        uploadCustomArtworkButtonContainer.className = "steam-enhanced";
        // Get body classes
        const bodyClasses = Array.from(document.querySelectorAll("body"));
        let bodyClassesOutput = bodyClasses.flatMap((div, idx) => {
          let bodyClassesList = div.classList.value.split(" ");
          // console.log(bodyClassesList);
          let matches = bodyClassesList.filter((cls) => cls.includes("Theme"));
          return [matches];
        });
        // console.log("Body class array bodyClassesOutput:", bodyClassesOutput);
        const currentTheme = bodyClassesOutput[0].toString();
        // console.log("Body class theme:", bodyClassesOutput[0].toString());
        uploadCustomArtworkButtonContainer.setAttribute("data-panel", "{'maintainX':true,'bFocusRingRoot':true,'flow-children':'row'}");
        // Create Buttons
        uploadCustomArtworkButtonContainer.innerHTML = `
         <h4>Steam Enhanced <span id="steamEnhancedToggle"></span></h4>
         <div id="steamEnhancedContainer" class="steam-enhanced-container">
          <div class="profile_count_link">
            <a id="reloadPage">Reload Page</a>
          </div>
          <div class="profile_count_link profile-autoreload-market">
            <a id="#">Autoreload Market</a>
            <span class="switch">
              <input id="switch-rounded" type="checkbox" />
              <label for="switch-rounded"></label>
            </span>
          </div>
          <div class="profile_count_link">
            <a id="#">Autoclaim Stickers</a>
          </div>
          <div class="profile_count_link">
            <a id="#">Clean Comments</a>
          </div>
          <div class="profile_count_link">
            <a id="showSymbols">Symbols & Characters</a>
          </div>
          <div class="profile_count_link">
            <div class="change-profile-theme useful-links">
              <details>
                <summary>Useful Links</summary>
                <div class="useful-links">
                  <span><a href="https://steamstat.us/" target="_blank">Steam Status</a></span>
                  <span><a href="https://steamdb.info/sales/history/" target="_blank">Steam Sale Dates</a></span>
                </div>
              </details>
            </div>
          </div>
          <div class="profile_count_link change-profile-theme-container">
            <div class="profile_count_link">
            <a class="upload-artwork-link" href="https://steamcommunity.com/sharedfiles/edititem/767/3/"><span>Upload artwork</span></a>
            </div>
            <div class="change-profile-theme">
              <details>
                <summary>Preview Theme</summary>
                <div class="active-theme" style="display:none"><span>(${currentTheme})</span></div>
                <div class="color-themes">
                  <span class="change-theme" id="DefaultTheme">Default Theme</span>
                  <span class="change-theme" id="SummerTheme">Summer</span>
                  <span class="change-theme" id="MidnightTheme">Midnight</span>
                  <span class="change-theme" id="SteelTheme">Steel</span>
                  <span class="change-theme" id="CosmicTheme">Cosmic</span>
                  <span class="change-theme" id="DarkModeTheme">DarkMode</span>
                  <span class="change-theme" id="Steam3000Theme">Steam3000Theme</span>
                  <span class="change-theme" id="GameProfileTheme">GameProfileTheme</span>
                  <span class="change-theme" id="SteamDeckTheme">SteamDeckTheme</span>
                </div>
              </details>
            </div>
          </div>
          <div class="profile_count_link">
            <div class="change-profile-theme preview-background">
              <details>
                <summary>Preview Background</summary>
                <div class="color-themes">
                  <span class="change-theme" id="DefaultTheme">Background</span>
                </div>
              </details>
            </div>
          </div>
          <div class="profile_count_link">
            <div class="change-profile-theme preview-avatar-frame">
              <details>
                <summary>Preview Avatar Frame</summary>
                <div class="color-themes">
                  <span class="change-theme" id="DefaultTheme">Avatar Frame</span>
                </div>
              </details>
            </div>
          </div>
        </div>
        `;

        // #mainContents
        // const steamEnhancedContainer = document.getElementById("responsive_page_template_content");
        const steamEnhancedWrapper = document.getElementById("responsive_page_template_content") || document.getElementById("mainContents");
        if (steamEnhancedWrapper) {
          steamEnhancedWrapper.appendChild(uploadCustomArtworkButtonContainer);
        }

        // Reload Page Functionality
        const reloadPageButton = document.getElementById("reloadPage");
        reloadPageButton.addEventListener("click", function () {
          location.reload();
        });

        // Steam Enhanced Toggle
        const steamEnhancedToggle = document.getElementById("steamEnhancedToggle");
        const steamEnhancedContainer = document.getElementById("steamEnhancedContainer");
        steamEnhancedToggle.addEventListener("click", function () {
          console.log("steamEnhancedToggle clicked");
          steamEnhancedToggle.classList.toggle("toggle");
          steamEnhancedContainer.classList.toggle("hide");
        });

        // ========================================================================== //
        // Change profile theme button
        // ========================================================================== //
        // Change profile theme
        const bodyClass = document.querySelector("body.profile_page");
        const activeThemeSpan = document.querySelector(".active-theme span");
        const changeProfileThemeButtonsDetails = document.querySelector(".change-profile-theme details");
        const changeProfileThemeButtons = document.querySelectorAll(".change-theme");
        for (let i = 0; i < changeProfileThemeButtons.length; i++) {
          const changeProfileThemeButton = changeProfileThemeButtons[i];
          const changeProfileThemeButtonID = changeProfileThemeButton.id;
          const themeColorArray = ["DefaultTheme", "SummerTheme", "MidnightTheme", "SteelTheme", "CosmicTheme", "DarkModeTheme", "Steam3000Theme", "GameProfileTheme", "SteamDeckTheme"];
          changeProfileThemeButton.addEventListener("click", () => {
            console.log("Change theme to:", changeProfileThemeButtonID);
            bodyClass.classList.remove(...themeColorArray);
            bodyClass.classList.add(changeProfileThemeButtonID);
            activeThemeSpan.innerHTML = `<span>${changeProfileThemeButtonID}</span>`;
            // bodyClass.classList.replace("DarkModeTheme", changeProfileThemeButtonID)
            changeProfileThemeButtonsDetails.removeAttribute("open");
          });
        }
      }
      setTimeout(setUploadArtworkButton, 0);
    });

    // 3. Symbols & Characters
    checkElement("#global_header").then((element) => {
      function setCommentSymbolsPicker() {
        console.log("setCommentSymbolsPicker");
        const symbolsDialogDetails = document.createElement("div");
        symbolsDialogDetails.className = "symbols-container symbols-modal-container";
        symbolsDialogDetails.innerHTML = `
        <div id="symbolsModal" class="symbols-modal">
        <a id="close">×</a>
        <div class="subSection detailBox" id="2050699">
          <div class="subSectionTitle">Invisible Spacers</div>
          <div class="subSectionDesc">
            For those needing spacers for anything they are doing, but regular spaces (using the space bar) do not properly register. Simply copy and paste the space between the two " | " and use that for
            all your spacing needs:  |⠀⠀⠀⠀⠀⠀⠀⠀⠀|
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="subSection detailBox" id="1356403">
          <div class="subSectionTitle">Symbols & Fonts Websites</div>
          <div class="subSectionDesc">
              <a href="https://fsymbols.com/generators/" target="_blank">Font generator</a>
              <a href="https://text-art.top/" target="_blank">Text art</a>
              <a href="https://steam.tools/mosaticon/" target="_blank">Mosaticon</a>
            <div style="clear: both"></div>
          </div>
        </div>
        <div class="subSection detailBox" id="1356403">
          <div class="subSectionTitle">Animals &amp; Insects</div>
          <div class="subSectionDesc">
            🐸 🐢 🐍 🐲🐉 🙈 🙊 🙉🐒🦍🐶🐕🐩🐺🦊🐱🐈🦁🐯🐅🐆🐴🐎🦄🦓🐮🐂🐃🐄🐷🐖🐗🐽🐏🐑 🐐 🐪 🐫 🦒 🐘 🦏 🐭 🐁 🐀 🐹 🐰 🐇 🐿 🦔 🦇 🐻 🐨 🐼 🐾 🦃 🐔 🐓🐣 🐤 🐥 🐦 🐧 🦅 🦆 🦉🦕🦖 🐳🐋 🐬 🐟 🐠 🐡 🐡🐙 🐌
            🦈 🐚 🦀 🦐 🦑 🐌 🦋 🐛🐜 🐝 🐞 🦗 🕷 🕸 🦂
            <div style="clear: both"></div>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="subSection detailBox" id="1355840">
          <div class="subSectionTitle">Arrows</div>
          <div class="subSectionDesc">
            ➟ ➡ ➢ ➣ ➤ ➥ ➦ ➧ ➨ ➚ ➘ ➙ ➛ ➜ ➝ ➞ ➸ ➲ ➳ ➳ ➴ ➵ ➶ ➷ ➸ ➹ ➺ ➻ ➼ ➽ ← ↑ → ↓ ↔ ↕ ↖ ↗ ↘ ↙ ↚ ↛ ↜ ↝ ↞ ↟ ↠ ↡ ↢ ↣ ↤ ↥ ↦ ↧ ↨ ➫ ➬ ➩ ➪ ➭ ➮ ➯ ➱ ↩ ↪ ↫ ↬ ↭ ↮ ↯ ↰ ↱ ↲ ↳ ↴ ↵ ↶ ↷ ↸ ↹ ↺ ↻ ↼ ↽ ↾ ↿ ⇀ ⇁ ⇂ ⇃ ⇄ ⇅ ⇆ ⇇ ⇈ ⇉ ⇊
            ⇋ ⇌ ⇍ ⇎ ⇏ ⇐ ⇑ ⇒ ⇓ ⇔ ⇕ ⇖ ⇗ ⇘ ⇙ ⇚ ⇛ ⇜ ⇝ ⇞ ⇟ ⇠ ⇡ ⇢ ⇣ ⇫ ⇬ ⇭ ⇮ ⇯ ⇰ ⇱ ⇲ ⇳ ⇴ ⇵ ⇶ ⇷ ⇸ ⇹ ⇺ ⇻ ⇼ ⇽ ⇾ ⇿ ☇ ☈
            <div style="clear: both"></div>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="subSection detailBox" id="2050601">
          <div class="subSectionTitle">Chess Pieces</div>
          <div class="subSectionDesc">
            ♔ ♕ ♖ ♗ ♘ ♙ ♚ ♛ ♜ ♝ ♞ ♟
            <div style="clear: both"></div>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="subSection detailBox" id="2050598">
          <div class="subSectionTitle">Crosses</div>
          <div class="subSectionDesc">
            † ✞ ✛ ✙ ☩ † ☨ ✞ ✝ ☥ ☦✞ ✜✝✙ ✠
            <div style="clear: both"></div>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="subSection detailBox" id="2050526">
          <div class="subSectionTitle">Emergency &amp; Medicine</div>
          <div class="subSectionDesc">
            🚓 🚑 🚒 🏥 💉 💊
            <div style="clear: both"></div>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="subSection detailBox" id="1356343">
          <div class="subSectionTitle">Food</div>
          <div class="subSectionDesc">
            🍄🍏🍎🍐🍊🍋🍌🍉🍇🍓🍈🍒🍑🍍🥝🥑🍅🍆🥒🥕🌽🌶🥔🍠🌰🥜🍯🥐🍞🥖🧀🥚🍳🥓🥞🍤🍗🍖🍕🌭🍔🍟🥙🌮🌯🥗🥘🍝🍜🍲🍥🍣🍱🍛🍙🍚🍘🍢🍡🍧 🎂 🍰🍨🍦🍮🍭🍬🍫🍿🍩🍪🥛🍼☕🍵🍶🍺🍻🥂🍷🥃🍸🍹🍾🥄🍴🍽🔪
            <div style="clear: both"></div>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="subSection detailBox" id="1356328">
          <div class="subSectionTitle">Hands, Faces &amp; People</div>
          <div class="subSectionDesc">
            😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 🙂 🤗 🤩 🤔🤨 😐 😑 😶 🙄 😏 😣 😥😮 🤐 😯 😪 😫 😴😌 😛😜 😝 🤤 😒 😓 😔😕 🙃 🤑 😲 🙁 😖 😞 😟 😤 😢<br />😭😦 😧😨 😩 🤯😬 😰 😱😳🤪 😵 😡
            😠 🤬 😷 🤒 🤕 🤢 🤮 🤧 😇 🤠🤡 🤥 🤫 🤭 🧐 🤓 😈 👿 👹 👺 💀 👻 👽 🤖 💩 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👶 👦 👧 👨 👩 👴 <br />👵 👨‍⚕️ 👩‍⚕️ 👨‍🎓 👩‍🎓 👨‍⚖️ 👩‍⚖️👨‍🌾 👩‍🌾 👨‍🍳 👩‍🍳 👨‍🔧👩‍🔧👨‍🏭 👩‍🏭 👨‍💼 👩‍💼👨‍🔬 👩‍🔬 👨‍💻 👩‍💻 👨‍🎤👩‍🎤 👨‍🎨 👩‍🎨
            👨‍✈️ 👩‍✈️ 👨‍🚀 👩‍🚀 <br />👨‍🚒 👩‍🚒 👮 👮‍♂️ 👮‍♀️ 🕵 🕵️‍♂️ 🕵️‍♀️ 💂 💂‍♂️ 💂‍♀️ 👷 👷‍♂️ 👷‍♀️ 🤴 👸 👳👳‍♂️ 👳‍♀️ 👲 🧕 🧔 👱 <br />👱‍♂️👱‍♀️ 🤵 👰 🤰🤱 👼 🎅 🤶 🧙‍♀️ 🧙‍♂️ 🧚‍♀️ 🧚‍♂️ 🧛‍♀️ 🧛‍♂️ 🧜‍♀️ 🧜‍♂️ 🧝‍♀️ 🧝‍♂️ 🧞‍♀️ 🧞‍♂️🧟‍♀️ <br />🧟‍♂️🙍 🙍‍♂️ 🙍‍♀️ 🙎 🙎‍♂️ 🙎‍♀️ 🙅 🙅‍♂️ 🙅‍♀️ 🙆
            🙆‍♂️ 🙆‍♀️💁 💁‍♂️💁‍♀️ 🙋 🙋‍♂️ 🙋‍♀️ 🙇 🙇‍♂️<br />🙇‍♀️ 🤦 🤦‍♂️ 🤦‍♀️ 🤷 🤷‍♂️🤷‍♀️ 💆 💆‍♂️ 💆‍♀️💇 💇‍♂️ 💇‍♀️ 🤷🚶 🚶‍♂️ 🚶‍♀️ 🏃🏃‍♂️ 🏃‍♀️ 💃 🕺 👯👯‍♂️ <br />👯‍♀️ 🧖‍♀️ 🧖‍♂️ 🕴 🗣👤 👥 👫👬 👭💏 👨‍❤️‍💋‍👨 👩‍❤️‍💋‍👩 💑 👨‍❤️‍👨 👩‍❤️‍👩 👪 👨‍👩‍👦 👨‍👩‍👧 👨‍👩‍👧‍👦 👨‍👩‍👦‍👦 👨‍👩‍👧‍👧 👨‍👨‍👦 👨‍👨‍👧 👨‍👨‍👧‍👦 👨‍👨‍👦‍👦 <br />👨‍👨‍👧‍👧 👩‍👩‍👦 👩‍👩‍👧
            👩‍👩‍👧‍👦 👩‍👩‍👦‍👦 👩‍👩‍👧‍👧 👨‍👦 👨‍👦‍👦 👨‍👧 👨‍👧‍👦 👨‍👧‍👧 👩‍👦 👩‍👦‍👦 👩‍👧 👩‍👧‍👦 👩‍👧‍👧 🤳 💪 👈 👉 ☝ 👆 🖕 👇 ✌ 🤞 🖖 🤘 🖐 <br />✋ 👌 👍 👎 ✊ 👊🤛 🤜 🤚 👋 🤟 ✍ 👏 👐 🙌 🤲 🙏 🤝 💅 👂 👃 👣 👀 🧠 👅 👄 💋 👨‍🎤 <br />👩‍🎤 💃 🕺 👯‍♂️ 👯‍♀️
            <div style="clear: both"></div>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="subSection detailBox" id="2050605">
          <div class="subSectionTitle">Gender Signs</div>
          <div class="subSectionDesc">
            ♀ ♂ ⚢ ⚣ ⚤ ⚥ ☿ ♁ ⚧
            <div style="clear: both"></div>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="subSection detailBox" id="2050535">
          <div class="subSectionTitle">Geometric</div>
          <div class="subSectionDesc">
            ☐ Ↄ ■ □ ▢ ▣ ▤ ▥ ▦ ▧ ▨ ▩ ▪ ▫ ▬ ▭ ▮ ▯ ▰ ▱ ◆ ◇ ◈ ◉ ◊ ○ ◌ ◍ ◎ ● ◐ ◑ ◒ ◓ ◔ ◕ ◖ ◗ ◘ ◙ ◚ ◛ ◜ ◝ ◞ ◟ ◠ ◡ ▲▼△▽⊿ ◤ ◥ ◣ ◢ ◦ ◧ ◨ ◩ ◪ ◫ ◬ ◭ ◮ ◯ ⍁ ⍂ ⍃ ⍄ ⌷ ⌸ ⌹ ⌺ ⌻ ⌼ ⌿ ⍀ ⍅ ⍆ ⍇ ⍈ ⍉ ⍊ ⍋ ⍌ ⍍ ⍎ ⍏ ⍐ ⍑ ⍒ ⍓ ⍔
            <div style="clear: both"></div>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="subSection detailBox" id="2534949">
          <div class="subSectionTitle">Halloween</div>
          <div class="subSectionDesc">
            😨 😰 😱 🤡 😈 👿 👹 👺 💀 ☠️👻 👽 👾 🤖 🕵 👸 🧙 ⚱️⚰️⛓️🧙‍♀️🧙‍♂️ 🧚 🧚‍♀️ 🧚‍♂️ <br />
            🧛 🧛‍♀️ 🧛‍♂️ 🧜 🧜‍♀️ 🧜‍♂️ 🧝 🧝‍♀️ 🧝‍♂️ 🧞 🧞‍♀️ 🧞‍♂️ 🧟 🧟‍♀️ 🧟‍♂️ 🕴 💚🖤 🦄 🦇🦉 🕷️🕸️🥀 <br />
            🍫 🍬 🍭 🌃 🛸🌕 🌚 ⚡🎃 🔮🎭 🕯️🗡️<br /><br />
            <br />
            <div style="clear: both"></div>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="subSection detailBox" id="1356331">
          <div class="subSectionTitle">Hearts &amp; Love</div>
          <div class="subSectionDesc">
            ღ ♥ ♡ ❤ ➳♥ ❥ ❦ ❧ ❣ 💕 💔💘 💓 💔 💖 💗 💌🖤 💜 💙 💚 💛🧡 💞 💟 💝<br /><br />👰 💍 💒 🏩 💑 💏<br /><br /><br /><br />
            <div style="clear: both"></div>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="subSection detailBox" id="1355831">
          <div class="subSectionTitle">Letters</div>
          <div class="subSectionDesc">
            Ⓐ Ⓑ Ⓒ Ⓓ Ⓔ Ⓕ Ⓖ Ⓗ Ⓘ Ⓙ Ⓚ Ⓛ Ⓜ Ⓝ Ⓞ Ⓟ Ⓠ Ⓡ Ⓢ Ⓣ Ⓤ Ⓥ Ⓦ Ⓧ Ⓨ Ⓩ<br />ⓐ ⓑ ⓒ ⓓ ⓔ ⓕ ⓖ ⓗ ⓘ ⓙ ⓚ ⓛ ⓜ ⓝ ⓞ ⓟ ⓠ ⓡ ⓢ ⓣ ⓤ ⓥ ⓦ ⓧ ⓨ ⓩ<br /><br />₠ ₡ ₢ ₣ ₤ ₥ ₦ ₧ ₨ ₪ ₫ € ₭ ₮ ₯ ℀ ℁ ℂ ℄ ℅ ℆ ℇ ℈ ℉ ℊ ℋ ℌ ℍ ℎ ℏ ℐ ℑ ℒ ℓ ℔ ℕ №
            ℗ ℘ ℙ ℚ ℛ ℜ ℝ ℞ ℟ ℡ ™ ℣ ℤ ℥ Ω ℧ ℨ ℩ K Å ℬ ℭ ℮ ℯ ℰ ℱ Ⅎ ℳ ℴ ℵ ℶ ℷ ℸ<br /><br />𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫<br />𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ<br /><br />𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟<br />𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅<br /><br />𝒶𝒷𝒸𝒹𝑒𝒻𝑔𝒽𝒾𝒿𝓀𝓁𝓂𝓃𝑜𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏<br />𝒜𝐵𝒞𝒟𝐸𝐹𝒢𝐻𝐼𝒥𝒦𝐿𝑀𝒩𝒪𝒫𝒬𝑅𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵<br /><br />ᵃᵇᶜᵈᵉᶠᵍʰᶤʲᵏˡᵐᶰᵒᵖᵠʳˢᵗᵘᵛʷˣʸᶻ<br /><br />℃
            ℉ °∃ ∧ ∠ ∨ ∩ ⊂ ⊃ ∪ ⊥ ∀ Ξ Γ ɐ ə ɘ ε β ɟ ɥ ɯ ɔ и ๏ ɹ ʁ я ʌ ʍ λ ч ∞ Σ Π<br /><br />๖ۣۜA ๖ۣۜB ๖ۣۜC ๖ۣۜD ๖ۣۜE ๖ۣۜF ๖ۣۜG ๖ۣۜH ๖ۣۜI ๖ۣۜJ ๖ۣۜK ๖ۣۜL ๖ۣۜM ๖ۣۜN ๖ۣۜO ๖ۣۜP ๖ۣۜQ ๖ۣۜR ๖ۣۜS ๖ۣۜT ๖ۣۜU ๖ۣۜW ๖ۣۜV
            ๖ۣۜX ๖ۣۜY ๖ۣۜZ <br /><br />æ Æ ø Ø å Å ö Ö ä Ä ë Ê ï Î é É ß <br /><br />α в ¢ ∂ є f g н ι נ к ℓ м и σ ρ q я ѕ т υ ω ν χ у <br /><br />💤 | ᶠᵘᶜᵏᵧₒᵤ | Yᵒᵘ Oᶰˡʸ Lᶤᵛᵉ Oᶰᶜᵉ | ℓ٥ﻻ ﻉ√٥υ | ᶫᵒᵛᵉᵧₒᵤ<br /><br />🆕
            🆒 🆙 🆖 🆓 🔤 🔠 🔡 <br /><br />
            <div style="clear: both"></div>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="subSection detailBox" id="1355839">
          <div class="subSectionTitle">Lines, Bars &amp; Dashes</div>
          <div class="subSectionDesc">
            ▂▃▅▆█▆▅▃▂ <br /><br />ılı.lıllılı.ıllı..ılı.lıllılı.ıllı <br /><br />║▌│█║▌│ █║▌│█│║▌║ <br /><br />▂ ▃ ▄ ▅ ▆ ▇ █ █ ▇ ▆ ▅ ▄ ▃ ▂<br /><br />· ¨ … ¦ ┅ ┆ ┈ ┊ ╱ ╲ ╳ ¯ – —<br /><br />≡ ჻ ░ ▒ ▓ ▤ ▥ ▦ ▧
            ▨ ▩ █ ▌ ▐ ▀ ▄<br /><br />◠ ◡ ╭ ╮ ╯ ╰<br /><br />│ ┤ ╡ ╢ ╖ ╕ ╣ ║ ╝ ╜ ╛ ┐ └ ┴ ┬ ├ ─ ┼ ╞ ╟ ╚ ╔ ╩ ╦ ╠ ═ ╬ ╧ ╨ ╤ ╥ ╙ ╘ ╒ ╓ ╫ ╪ ┘ ┌<br /><br />
            ⊢ ⊣ ⊤ ⊥ ⊦ ⊧ ⊨ ⊩ ⊪ ⊫ ⊬ ⊭ ⊮ ⊯<br /><br />☰ ☱ ☲ ☳ ☴ ☵ ☶ ☷
            <div style="clear: both"></div>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="subSection detailBox" id="2050595">
          <div class="subSectionTitle">Marks, Signs &amp; Symbols</div>
          <div class="subSectionDesc">
            ☢️☣️ 🆗 🏧 🚮 🚰 ♿ 🚹 🚺 🚻 🚼 🚾 ▶️ ⏩ ◀️⏪ 🔼 ⏫ 🔽 ⏬ ⏹️ ⏏️ 🎦 🔅 🔆 📶 📳 📴 ♻️ #️⃣ 0️⃣ 1️⃣2️⃣ 3️⃣ 4️⃣ 5️⃣6️⃣ 7️⃣ 8️⃣ 9️⃣ 🔟 💯 🔠 🔡 🔢 🔣 🔤 🅰 🆎 🅱 🆑🆒 🆓🆕 🆖 🅾 🆗 🅿 🆘 🆙 🆚 🈁 🈂️ 🈷️ 🈶 🈯 🉐 🈹
            🈚 🈲 🉑 🈸 🈴 🈳 ㊗️ ㊙️ 🈺🈵 ◽ ◾ ⬛ ⬜ 🔶 🔷 🔸 🔹 🔺 🔻 💠 🔲 🔳 ⚪ ⚫ 🔴 🔵 <br /><br />🛐⚛️🕉️✡️☸️☯️✝️☦️☪️☮️🕎 🔯 ♈ ♉ ♊ ♋ ♌ ♍ ♎ ♏ ♐ ♑ ♒ ♓ ⛎ <br /><br />⚠️🚸 ⛔ 🚫 🚳 🚭 🚯 🚱
            🚷🔞 <br /><br />⬆️➡️↗️➡️↘️⬇️↙️⬅️↖️↩️↪️⤴️⤵️🔃🔄🔙🔚🔛 🔜 🔝 <br /><br />🔱📛 🔰⭕ ✅ ☑️✔️✖️❌❎➕➖➗➰➿〽️✳️✴️❇️❓❔❕ ❗ Ⓜ️<br />
            <div style="clear: both"></div>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="subSection detailBox" id="1355841">
          <div class="subSectionTitle">Miscellaneous Characters &amp; Symbols</div>
          <div class="subSectionDesc">
            유 웃 ۵ ∴ △ ∞ ｡ ™ ℠ © ℗ ® ™ ® ™ ✿ ❖ ∞ ზ ⧞ ⧝ ◎ ♣ ♥ ♦ ➸ ☫ ☬ ☭ ☮ ☯ ◎ ♣ ♥ ☼ ☾ ☽ ♦ ✚ ✪ ✣ ✤ ✥ ☠ 유 ℧ ℥ ۵ ≛ ∫ ∬ ∭ ∮ ∯ ∰ ∱∳ 〄 ∩ ∪ ⊗ ⊘ ≅ ≠ Ω ♨ ❢ ❣ ✐ ✎ ✏ ✆ ރ ▧ ▨ ▦ ▩ ۩ ஜ ஜ ๑۩۞۩๑ ஜ ஒ ண இஆ ௰ ௫&amp;➸ ๏̯͡๏
            【ツ】 ะ㋚ะ ๑㋡๑ ʚ㋞ɞ <br /><br />∎ − ∓ ∔ ∕ ∖ ∗ ∘ ∙ ∝ ∞ ∟ ∠ ∡ ∢ ∣ ∤ ∥ ∦ ∧ ∨ ∩ ∪ ∴ ∵ ∶ ∷ ∸ ∹ ∺ ∻ ∼ ∽ ∾ ∿ ≀ ≁ ≪ ≫ ≬ ≭ ≮ ≯ ≰ ≱ ≲ ≳ ≴ ≵ ≶ ≷ ≸ ≹ ≺ ≻ ≼ ≽ ≾ ≿ ⊀ ⊁ ⊂ ⊃ ⊄ ⊅ ⊆ ⊇ ⊈ ⊉ ⊊ ⊋ ⊌ ⊍ ⊎ ⊏ ⊐ ⊑ ⊒ ⊓ ⊔
            ⊕ ⊖ ⊗ ⊘ ⊙ ⊚ ⊛ ⊜ ⊝ ⊞ ⊟ ⊠ ⊡ ⊰ ⊱ ⊲ ⊳ ⊴ ⊵ ⊶ ⊷ ⊸ ⊹ ⊺ ⊻ ⊼ ⊽ ⊾ ⊿ ⋀ ⋁ ⋂ ⋃ ⋄ ⋅ ⋇ ⋈ ⋉ ⋊ ⋋ ⋌ ⋍ ⋎ ⋏ ⋐ ⋑ ⋒ ⋓ ⋔ ⋕ ⊾ ⋖ ⋗ ∀ ∃ ∄ ∅ ∈ ∉ ∏ ∑ ∓ ∝ ∟ ∠ ∡ ∢ ≃ ⋖ ⋗ ⋘ ⋙ ⋚ ⋛ ≦ ≧ ⋜ ⋝ ⋞ ⋟ ⋠ ⋡ ⋢ ⋣ ⋤ ⋥ ⋦ ⋧ ⋨ ⋩ ⋪ ⋫ ⋬ ⋭ ⋮ ⋯ ⋰
            ⋱ ⋲ ⋳ ⋴ ⋵ ⋶ ⋷ ⋸ ⋹ ⋺ ⋻ ⋼ ⋽ ⋾ ⋿ ⌀ ⌁ ⌂ ⌃ ⌄ ⌅ ⌆ ⌇ ⌈ ⌉ ⌊ ⌋ ⌌ ⌍ ⌎ ⌏ ⌐ ⌑ ⌒ ⌓ ⌔ ⌕ ⌖ ⌗ ⌘ ⌙ ⌜⌝ ⌞ ⌟ ⌠ ⌡ ⌢ ⌣ ⌤ ⌥ ⌨ ⟨ ⟩ ⌫ ⌬ ⌭ ⌮ ⌯ ⌰ ⌱ ⌲ ⌳ ⌴ ⌵ ⌶ ⌽ ⌾ ⍕ ⍖ ⍗ ⍘ ⍙ ⍚ ␋ ␢ ␣<br /><br />
            ☤ ⚛ ☊ ☋ ☌ ☍ ☓ ☖ ☗ ☘ ☙ ☟ ☠ ☡ ☢ ☣ ☤ ☥ ☦ ☧ ☨ ☩ ☪ ☫ ☬ ☭ ☸ ☼ ♃ ♄ ♅ ♇ ♨ ♰ ♱ ☫ ª ↀ ↁ ↂ ϡ ☤ ☥ ☦ ☧ ☨ ☩ ☪ ☫ ☬ ☭ ⁉ ⁈ ؟ ﹖ ¿ Ƹ̵̡Ӝ̵̨̄Ʒ [̲̅$̲̅(̲̅ιοο̲̅)̲̅$̲̅] 🏳 ๖ۣۜ ‡ ☮ ☪ ⚔ ✡ ☭ ✯ <br /><br />
            🎀 🎄 🎅 🎆 🎈 🎊 ⚔ 🎃 👻 🎁 🎉🔥💣👑🔥 🎆 🎭🔫 🏁 🚩🎌 🏴 🏳️‍🌈 🏴‍☠️ 💺🌠 ⛱️🏖️🎆 🎇 🎑 💴 💵💶 💷 🗿 🗾 🏔️🌋 🗻 🏕️🏜️🏝️🏞️🏟️🏛️🏗️🏘️🏚️🏠 🏡 🏢 🏣 🏤 🏥 🏦 🏨 🏩 🏪 🏫 🏬 🏭 🏯 🏰 💒 🗼 🗽 ⛪ 🕌 🕍 ⛩ 🕋
            ⛲ ⛺ 🌁 🌃 🏙️🌄 🌅 🌆 🌇 🌉 🌌🎠 🎡 🎢🎥 🎬 💣 👑 🔥 🎭 🔫 ⌚ ⌛☕ 🗯️💭💢♨️💤🌀<br /><br /><br /><br />
            <div style="clear: both"></div>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="subSection detailBox" id="2050555">
          <div class="subSectionTitle">Music</div>
          <div class="subSectionDesc">
            ♩ ♫ ♭ ♪ ♯ ♬ ♮ 🔇🔈 🔉 🔊 📢📣 📯 🔔 🔕 🎵 🎶 🎧🎼🎷 🎸 🎹 🎺 🎻 🥁
            <div style="clear: both"></div>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="subSection detailBox" id="1355832">
          <div class="subSectionTitle">Numbers</div>
          <div class="subSectionDesc">
            ⓵ ⓶ ⓷ ⓸ ⓹ ⓺ ⓻ ⓼ ⓽ ⓾ ⓫ ⓬ ⓭ ⓮ ⓯ ⓰ ⓱ ⓲ ⓳ ⓴<br /><br />① ② ③ ④ ⑤ ⑥ ⑦ ⑧ ⑨ ⑩ ⑪ ⑫ ⑬ ⑭ ⑮ ⑯ ⑰ ⑱ ⑲ ⑳<br /><br />
            ⒉ ⒊ ⒋ ⒌ ⒍ ⒎ ⒏ ⒐ ⒑ ⒒ ⒓ ⒔ ⒕ ⒖ ⒗ ⒘ ⒙ ⒚ ⒛ <br /><br />𝟢𝟣𝟤𝟥𝟦𝟧𝟨𝟩𝟪𝟫 <br /><br />𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡𝟘<br /><br />√ ∛ ∜ <br /><br />⅟ ½ ⅓ ⅕<br />⅙ ⅛ ⅔ ⅖<br />⅚ ⅜ ¾ ⅗<br />⅝ ⅞ ⅘<br />
            <div style="clear: both"></div>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="subSection detailBox" id="2436771">
          <div class="subSectionTitle">Plants</div>
          <div class="subSectionDesc">
            💐 🌸 💮 🌹 🥀 🌺 🌻 🌼 🌷 🌱🌲 🌳 🌴 🌵🌾 🌿 ☘🍀 🍁 🍂🍃 🍄 🌰
            <div style="clear: both"></div>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="subSection detailBox" id="1356327">
          <div class="subSectionTitle">Stars &amp; Circular Shapes</div>
          <div class="subSectionDesc">
            ✸✤ ✥✦✧ ◈ ★ ☆ ✩ ✫ ✬ ✭ ✮ ✯ ✰ 【★】 ✱ ✲ ✳ ❃ ❂ ❁ ❀ ✿ ✾ ✽ ✼ ✻ ✺ ✹ ✸ ✷ ❃ ❂ ❁ ❀ ✿ ✾ ✽ ✼ ✻ ✺ ✹ ✸ ✷ ✶ ✵ ✴ ❄ ❅ ❆ ❇ ❈ ❉ ❊ ❋ ✪ ⋆ 💫 🌠 ✨🌟
            <div style="clear: both"></div>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="subSection detailBox" id="1356354">
          <div class="subSectionTitle">Sports</div>
          <div class="subSectionDesc">
            🏆 🏁 ♕ ♛ ♔ ♚ 🏂 🏄 🏊 🎯 ⚽ ⚾ 🎾 🏀⚽ 🏈🏉 🎳 ⛳ 🎱 🎲 🎮 👾 ♖ ♗ ♘ ♙ ♜ ♝ ♞ ♟ 🃏 ♤ ♧ ♡ ♢ ♠ ♣ ♥ ♦🏅 🥇 🥈 🥉 🏒⛸ 🎿 🛷 🥌 🏹🧗‍♀️ 🧗‍♂️ 🧘‍♀️ 🧘‍♂️ 🕴 🏇 ⛷ 🏂 🏌 🏌️‍♂️ 🏌️‍♀️ 🏄 🏄‍♂️ 🏄‍♀️ 🚣 🚣‍♂️ 🚣‍♀️ 🏊 🏊‍♂️ 🏊‍♀️ ⛹ ⛹️‍♂️ ⛹️‍♀️ 🏋
            🏋️‍♂️ 🏋️‍♀️ 🚴 🚴‍♂️🚴‍♀️ 🚵 🚵‍♂️ 🚵‍♀️ 🤸 🤸‍♂️ 🤸‍♀️ 🤼 🤼‍♂️ 🤼‍♀️ 🤽 🤽‍♂️ 🤽‍♀️ 🤾 🤾‍♂️ 🤾‍♀️ 🤹 🤹‍♂️ 🤹‍♀️ 🎪🎫 🎾<br />🎳 🏏 🏑 🏒 🏓 🏸 🥊 🥋 ⛳🎣 🎽 🛷 🥌 🎯 🎱 🎮 🎰 🎲
            <div style="clear: both"></div>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="subSection detailBox" id="2436791">
          <div class="subSectionTitle">Transportation</div>
          <div class="subSectionDesc">
            🏎️🏍️🚂 🚃 🚄 🚅 🚆🚇 🚈 🚊 🚝 🚞 🚋 🚌 🚍🚎 🚐 🚑 🚒 🚓 🚔 🚕 🚖 🚗 🚘 🚚 🚛 <br />🚜🚲 🛴 🛵 🛥️⛵ 🚤 🚢 ✈️🛩️🛫 🛬 🚁 🚟 🚠 🚡 🚀 🛸 ⚓🚧🚦🚥🚨🚏 ⛽ 🛤️
            <div style="clear: both"></div>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="subSection detailBox" id="2050539">
          <div class="subSectionTitle">Weather &amp; Space</div>
          <div class="subSectionDesc">
            🌪️🌠🌈 🌂 ⚡ ❄🔥💧 🌊 🚀🌍 🌎 🌏🌐☔☂️🌡️🌬️⛄🌁🌂🏂🌨️☁️🌩️⛅🌫️⛆
            <div style="clear: both"></div>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="subSection detailBox" id="1356348">
          <div class="subSectionTitle">Work &amp; Office</div>
          <div class="subSectionDesc">
            📅 📆 🔧 🔨 🔩 🚪 🔑 🔐 🔏 🔒 🔓 🎬 🎥 📹 📼 📷 📡 📺 🔌 🔋 💡 🔦 ☎ ☏ 📞📟 ✂ ✃ ✄ 📌 📎 🔗 ✏ ✒ 🔎 🔍 📏 📐 🎨 💻 📠 📇 💾 💽 📀 💿 📊 📈 📉 📇 📠 💻 ✉ 📧 📨 📩 📮 📪 📫 📥 📤 📲 📱 📁 📂 📰 📄 📃
            📑 📜 📋 📝 📦 🎫 🔖 📖 📔 📒 📓 📕 📙 📗 📘 📚 💄 👓 👑 🎩 👒 🎓 👛 👜 👝 🎒 💼 🎽 👗 👔 👕 👚 👘 👙 👖 👠 👢 👞 👡 👟 🕛🕧🕐 🕜 🕑🕝 🕒 🕞 🕓🕟 🕔 🕠🕕 🕡 🕖🕢 🕗🕣 🕘 🕤 🕙 🕥 🕚 🕦 📫 📪📬
            📭
            <div style="clear: both"></div>
          </div>
        </div>
      </div>
        `;

        const symbolsDialogContainer = document.getElementById("responsive_page_template_content") || document.getElementById("mainContents");
        if (symbolsDialogContainer) {
          symbolsDialogContainer.appendChild(symbolsDialogDetails);
        }
        function setSymbolsCharactersModal() {
          const showButton = document.getElementById("showSymbols");
          const symbolsModal = document.getElementById("symbolsModal");
          const closeButton = document.getElementById("close");
          showButton.addEventListener("click", () => {
            symbolsModal.classList.add("show");
            symbolsModal.classList.remove("hide");
          });
          closeButton.addEventListener("click", () => {
            symbolsModal.classList.add("hide");
          });
        }
        // Reload page after 3 seconds
        setTimeout(setSymbolsCharactersModal, 1000);
      }
      setTimeout(setCommentSymbolsPicker, 1500);
    });
  })();

  //* ========================================================================== //
  //* 2. Steam Profile Artwork Tool Buttons
  //* =======================================================================

  (function () {
    "use strict";
    function rafAsync() {
      return new Promise((resolve) => requestAnimationFrame(resolve));
    }
    async function checkElement(selector) {
      let querySelector = null;
      while (querySelector === null) {
        await rafAsync();
        querySelector = document.querySelector(selector);
      }
      return querySelector;
    }
    // Check if
    checkElement(".createCollectionArrow").then((element) => {
      console.log(".createCollectionArrow exists");
      function setMainContents() {
        // Create Steam Profile Artwork Tool Buttons Container
        const steamProfileArtworkContainer = document.createElement("div");
        steamProfileArtworkContainer.className = "steamProfileArtworkContainer";
        // Create Buttons
        steamProfileArtworkContainer.innerHTML = `
  <div class="pageTitle">Steam Profile Artwork Tool</div>
  <div class="buttonsContainer">
    <a id="blankTitleButton" class="btn_darkblue_white_innerfade btn_medium" style="margin: 2px">
    <span style="padding-left: 16px; padding-right: 16px;">Enter Blank Title</span>
    </a>
    <div class="customArtworkButtons">
    <details>
        <summary class="btn_darkblue_white_innerfade btn_medium enable-custom-artwork-button">Enable Custom Uploads</summary>
        <div class="customArtworkButtonsWrapper">
          <a id="customArtworkButton" class="btn_medium" style="margin: 2px;">
          <span style="padding-left: 16px; padding-right: 16px;">Custom Artwork</span>
          </a>
          <a id="longScreenshotButton" class="btn_medium" style="margin: 2px;">
          <span style="padding-left: 16px; padding-right: 16px;">Screenshot</span>
          </a>
          <a id="longWorkshopButton" class="btn_medium" style="margin: 2px;">
          <span style="padding-left: 16px; padding-right: 16px;">Long Workshop</span>
          </a>
          <a id="longGuideButton" class="btn_medium" style="margin: 2px;">
          <span style="padding-left: 16px; padding-right: 16px;">Long Guide</span>
          </a>
        </div>
    </details>
  </div>
    <a id="resetButton" class="btn_darkblue_white_innerfade btn_medium" style="margin: 0 0 0 5px;background:#171a21">
    <span style="padding-left: 16px; padding-right: 14px;background:#171a21">Reset</span>
    </a>
  </div>`;
        // Grab mainContentsDiv element reference
        const mainContentsDiv = document.querySelector("#mainContents");
        // Insert the Buttons
        mainContentsDiv.parentNode.insertBefore(steamProfileArtworkContainer, mainContentsDiv);
      }
      setTimeout(setMainContents, 0);
    });
  })();

  (function () {
    "use strict";
    function rafAsync() {
      return new Promise((resolve) => requestAnimationFrame(resolve));
    }
    async function checkElement(selector) {
      let querySelector = null;
      while (querySelector === null) {
        await rafAsync();
        querySelector = document.querySelector(selector);
      }
      return querySelector;
    }
    // Check if
    checkElement("mainContents").then((element) => {
      console.log("mainContents exists");
      function setBlankTitleButton() {
        // ----------------------------
        // Fill Blank Title Button
        // ----------------------------
        const blankTitleCharacter = "⠀";
        const alertBlankTitleSet = document.createElement("div");
        alertBlankTitleSet.className = "alertBlankTitleSet";
        alertBlankTitleSet.innerHTML = `<span><i>✔</i> Blank Title Set</span>`;
        const titleFieldInput = document.querySelector(".titleField");
        const blankTitleButton = document.querySelector("#blankTitleButton");
        const titleFieldParent = titleFieldInput.parentNode;
        blankTitleButton.addEventListener("click", () => {
          blankTitleButton.classList.add("blank-title-added");
          titleFieldInput.value = blankTitleCharacter;
          titleFieldInput.classList.add("fieldInputSuccess");
          alertBlankTitleSet.classList.add("fadeIn");
          titleFieldParent.insertBefore(alertBlankTitleSet, titleFieldInput.nextSibling);
        });
      }
      setTimeout(setBlankTitleButton, 0);
    });
  })();

  // Custom artwork enabled notification
  const alertCustomArtworkEnabled = document.createElement("div");
  alertCustomArtworkEnabled.className = "alertCustomArtworkEnabled";
  alertCustomArtworkEnabled.innerHTML = `<span><i>✔</i> Upload Custom Artwork Enabled</span>`;
  // Long workshop enabled notification
  const alertLongWorkshopEnabled = document.createElement("div");
  alertLongWorkshopEnabled.className = "alertCustomArtworkEnabled longWorkshopEnabled";
  alertCustomArtworkEnabled.classList.add("longWorkshopEnabled");
  alertLongWorkshopEnabled.innerHTML = `<span><i>✔</i> Upload Long Workshop Enabled</span>`;
  // Long guide enabled notification
  const alertLongGuideEnabled = document.createElement("div");
  alertLongGuideEnabled.className = "alertCustomArtworkEnabled longGuideEnabled";
  alertCustomArtworkEnabled.classList.add("longGuideEnabled");
  alertLongGuideEnabled.innerHTML = `<span><i>✔</i> Upload Long Guide Enabled</span>`;
  // Long guide enabled notification
  const hexEditWebsite = document.createElement("div");
  hexEditWebsite.className = "modifyArtworkInstructions";
  hexEditWebsite.innerHTML = `<blockquote class="bb_blockquote">This method allows you to upload long workshop images without faking the heights.
  <br />This method works with all supported file types independently of size and frame count. <br />You are expected
  to apply the instructions below for all workshop images seperately. <div class="description">
      <ol>
          <li>Visit this site: <a href="https://hexed.it" target="_blank">https://hexed.it</a></li>
          <li>Click <b>"Open File"</b> and select your image</li>
          <li>Scroll to the very bottom of the page</li>
          <li>Replace the last byte of your file with <code>21</code></li>
          <li>Click <b>"Export"</b> and save your modified image</li>
          <li>Upload your artwork via the <b>"Choose File"</b> button below</li>
      </ol>
  </div>
  <div class="hexEditInstructionsVideo">
      <details>
          <summary>Video instructions</summary>
          <div class="embed-container"><iframe
                  src="https://www.dropbox.com/s/6ilvut3br5dnks3/HexEdit-Instructions.mp4?raw=1" allowfullscreen
                  style="border:0"></iframe></div>
      </details>
</blockquote>
</div>`;

  (function () {
    "use strict";
    function rafAsync() {
      return new Promise((resolve) => requestAnimationFrame(resolve));
    }
    async function checkElement(selector) {
      let querySelector = null;
      while (querySelector === null) {
        await rafAsync();
        querySelector = document.querySelector(selector);
      }
      return querySelector;
    }
    // Check if
    checkElement("#file").then((element) => {
      console.log("#file exists");
      function setFileUpload() {
        // Buttons selectors
        const fileUploadButton = document.querySelector("#file");
        const customArtworkButton = document.querySelector("#customArtworkButton");
        const longScreenshotButton = document.querySelector("#longScreenshotButton");
        const longWorkshopButton = document.querySelector("#longWorkshopButton");
        const longGuideButton = document.querySelector("#longGuideButton");
        const resetButton = document.querySelector("#resetButton");
        const selectArtworkTitle = document.querySelector(".detailBox:nth-of-type(2) .title");
        const fileUploadParent = fileUploadButton.parentNode;
        let details = [...document.querySelectorAll("details")];

        // Scroll functions
        function scrollToChooseFileButton() {
          document.querySelectorAll(".detailBox")[1].scrollIntoView({ behavior: "smooth", block: "start" });
        }
        function customArtworkUploadEnable() {
          console.log("Custom Artwork Upload Enabled");
          $J("#image_width").val(1000).attr("id", ""), $J("#image_height").val(1).attr("id", "");
          setTimeout(scrollToChooseFileButton, 0);
        }
        function customWorkshopUploadEnable() {
          console.log("Workshop Upload Enabled");
          $J("[name=consumer_app_id]").val(480);
          $J("[name=file_type]").val(0);
          $J("[name=visibility]").val(0);
          setTimeout(scrollToChooseFileButton, 0);
        }
        function longGuideUploadEnable() {
          console.log("Long guide Upload Enabled");
          $J("[name=consumer_app_id]").val(767);
          $J("[name=file_type]").val(9);
          $J("[name=visibility]").val(0);
          setTimeout(scrollToChooseFileButton, 0);
        }
        function longScreenshotUploadEnable() {
          console.log("Long screenshot Upload Enabled");
          $J("#image_width").val("1000");
          $J("#image_height").val("1");
          $J('[name="file_type"]').val("5");
          setTimeout(scrollToChooseFileButton, 0);
        }
        function resetUploads() {
          console.log("Resetting uploads");
          location.reload();
        }
        const agreeTermsInput = document.querySelector("#agree_terms");
        // Buttons event listeners
        customArtworkButton.addEventListener("click", () => {
          customArtworkUploadEnable();
          agreeTermsInput.checked = true;
          fileUploadParent.insertBefore(alertCustomArtworkEnabled, fileUploadButton.nextSibling);
          details[0].removeAttribute("open");
        });
        longScreenshotButton.addEventListener("click", () => {
          longScreenshotUploadEnable();
          agreeTermsInput.checked = true;
          fileUploadParent.insertBefore(alertCustomArtworkEnabled, fileUploadButton.nextSibling);
          details[0].removeAttribute("open");
        });
        longWorkshopButton.addEventListener("click", () => {
          customWorkshopUploadEnable();
          agreeTermsInput.checked = true;
          selectArtworkTitle.textContent = "Modify your artwork";
          fileUploadParent.insertBefore(alertLongWorkshopEnabled, fileUploadButton);
          fileUploadParent.insertBefore(hexEditWebsite, fileUploadButton);
          details[0].removeAttribute("open");
        });
        longGuideButton.addEventListener("click", () => {
          longGuideUploadEnable();
          agreeTermsInput.checked = true;
          selectArtworkTitle.textContent = "Modify your artwork";
          fileUploadParent.insertBefore(alertLongGuideEnabled, fileUploadButton);
          fileUploadParent.insertBefore(hexEditWebsite, fileUploadButton);
          details[0].removeAttribute("open");
        });
        resetButton.addEventListener("click", () => {
          resetUploads();
        });
        // Details open close functionality
        document.addEventListener("click", function (e) {
          if (!details.some((f) => f.contains(e.target))) {
            details.forEach((f) => f.removeAttribute("open"));
          } else {
            details.forEach((f) => (!f.contains(e.target) ? f.removeAttribute("open") : ""));
          }
        });
      }
      setTimeout(setFileUpload, 0);
    });
  })();

  //* ==========================================================================
  //* 3. Steam Mass Comments Poster Vanilla
  //* ==========================================================================

  (function () {
    "use strict";
    function rafAsync() {
      return new Promise((resolve) => requestAnimationFrame(resolve));
    }
    async function checkElement(selector) {
      let querySelector = null;
      while (querySelector === null) {
        await rafAsync();
        querySelector = document.querySelector(selector);
      }
      return querySelector;
    }
    // Check if
    checkElement("#manage_friends").then((element) => {
      console.log("#manage_friends exists");

      const postingDelay = 7; // Seconds in between posting profile comments
      const manageFriendsSelector = document.querySelector("#manage_friends > .row");
      const manageFriendsSelectorParent = document.querySelector("#manage_friends");

      const manageFriendsComments = document.createElement("div");
      manageFriendsComments.className = "friends-comments-textarea";
      manageFriendsComments.innerHTML = `<div class="row commentthread_entry" style="background-color: initial; padding-right: 24px;">
    <div class="commentthread_entry_quotebox">
        <textarea rows="3" class="commentthread_textarea" id="comment_textarea" placeholder="Add a comment" style="overflow: hidden; height: 20px;"></textarea>
    </div>
    <div class="commentthread_entry_submitlink" style="">
        <a class="btn_grey_black btn_small_thin" href="javascript:CCommentThread.FormattingHelpPopup('Profile');">
        <span>Formatting help</span>
        </a>
        <span class="emoticon_container">
        <span class="emoticon_button small" id="emoticonbtn">
        </span>
        </span>
        <span class="btn_green_white_innerfade btn_small" id="comment_submit">
        <span>Post Comments to Selected Friends</span>
        </span>
    </div>
  </div>
  <div class="row" id="log">
    <span id="log_head"></span>
    <span id="log_body"></span>
  </div>`;

      // ToggleManageFriends();

      manageFriendsSelectorParent.parentNode.appendChild(manageFriendsComments, manageFriendsSelectorParent);

      manageFriendsSelectorParent.insertBefore(manageFriendsComments, manageFriendsSelector);

      const commentSubmitButton = document.querySelector("#comment_submit");
      const commentTextarea = document.querySelector("#comment_textarea");
      const commentLogHead = document.querySelector("#log_head");
      const commentLogBody = document.querySelector("#log_body");

      commentSubmitButton.addEventListener("click", (e) => {
        // e.preventDefault();
        const selectedCheckbox = document.querySelector(".selected");
        const totalSelected = selectedCheckbox?.length;
        const commentMessage = commentTextarea.value;
        if (totalSelected === 0 || commentMessage.length === 0) {
          alert("Please make sure you entered a message and selected 1 or more friends.");
          return;
        }

        commentLogHead.innerHTML = "";
        commentLogBody.innerHTML = "";

        document.querySelectorAll(".selected").forEach((elem, i) => {
          let profileID = elem.dataset.steamid;
          setTimeout(() => {
            let xhr = new XMLHttpRequest();
            xhr.open("POST", `//steamcommunity.com/comment/Profile/post/${profileID}/-1/`, true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
            xhr.onloadend = (response) => {
              // let logBody = document.querySelector('#log_body')[0];
              commentLogBody.innerHTML += `<br>${
                response.success === false
                  ? response.error
                  : 'Successfully posted comment on <a href="https://steamcommunity.com/profiles/${profileID}/#commentthread_Profile_${profileID}_0_area">' + profileID + "</a>"
              }`;
              document.querySelector(`.friend_block_v2[data-steamid="${profileID}"]`).classList.remove("selected");
              document.querySelector(`.friend_block_v2[data-steamid="${profileID}"] .select_friend_checkbox`).checked = false;
              UpdateSelection();
            };
            xhr.send(`comment=${commentMessage}&count=6&sessionid=${g_sessionID}`);
          }, postingDelay * i * 1000);
        });
      });
    });
  })();

  //* ==========================================================================
  //* 4. Steam Copy Avatar Frame Source
  //* ==========================================================================

  function copySrcValueToClipboard() {
    // Get the div element with the class "avatarFrame"
    var avatarFrame = document.querySelector(".avatarFrame");

    // Check if the div element exists
    if (avatarFrame) {
      // Get the img element inside the div
      var imgElement = avatarFrame.querySelector("img");

      // Check if the img element exists
      if (imgElement) {
        // Get the src attribute value
        var srcValue = imgElement.src;

        // Display the src value in a prompt for manual copying
        prompt("Copy the src value:", srcValue);
      } else {
        console.error("No img element found inside the avatarFrame div.");
      }
    } else {
      console.error('No element found with the class "avatarFrame".');
    }
  }

  // Call the function to copy the src value to the clipboard
  // copySrcValueToClipboard();

  //* ==========================================================================
  //* 5. Steam Replace Avatar Frame Source
  //* ==========================================================================

  function replaceSrcValue() {
    // Get the div element with the class "profile_avatar_frame"
    var avatarFrame = document.querySelector(".profile_avatar_frame");

    // Check if the div element exists
    if (avatarFrame) {
      // Get the img element inside the div
      var imgElement = avatarFrame.querySelector("img");

      // Check if the img element exists
      if (imgElement) {
        // Prompt the user to enter the new src value
        var newSrcValue = prompt("Enter the new src value:");

        // Check if the user entered a value
        if (newSrcValue !== null) {
          // Update the src attribute of the img element
          imgElement.src = newSrcValue;
          console.log("Src value updated successfully:", newSrcValue);
        } else {
          console.log("Operation canceled by user.");
        }
      } else {
        console.error("No img element found inside the profile_avatar_frame div.");
      }
    } else {
      console.error('No element found with the class "profile_avatar_frame".');
    }
  }

  // Call the function to replace the src value
  // replaceSrcValue();

  // 6. Reload Steam market function

  // (function () {
  //   "use strict";

  //   // Reload Steam market function
  //   console.log("Reload Steam market function");
  //   const targetNode = document.body;

  //   const config = { childList: true, subtree: true };

  //   const createRefreshButton = function () {
  //     const refreshButton = document.createElement("button");
  //     refreshButton.textContent = "Refresh Page";
  //     // refreshButton.style.position = "fixed";
  //     refreshButton.style.top = "10px";
  //     refreshButton.style.right = "10px";
  //     refreshButton.style.zIndex = "9999";
  //     refreshButton.style.minWidth = "auto";
  //     refreshButton.style.padding = "10px";
  //     refreshButton.style.margin = "10px 0 0 0";
  //     refreshButton.classList.add("btn_green_white_innerfade", "btn_green_white_innerfade", "btn_medium", "market_commodity_buy_button");
  //     refreshButton.addEventListener("click", function () {
  //       location.reload();
  //     });

  //     const searchResultsTable = document.getElementById("searchResultsTable");
  //     if (searchResultsTable) {
  //       searchResultsTable.appendChild(refreshButton);
  //     }
  //   };

  //   const callback = function (mutationsList, observer) {
  //     for (const mutation of mutationsList) {
  //       if (mutation.type === "childList") {
  //         // Check if the added node is the desired div element
  //         const errorDiv = document.querySelector(".market_listing_table_message");
  //         if (errorDiv && errorDiv.textContent.trim() === "There was an error performing your search. Please try again later.") {
  //           // Trigger a refresh after a short pause (e.g., 2 seconds)
  //           console.log("There was an error");
  //           createRefreshButton();
  //           // Disconnect the observer to stop further checks
  //           observer.disconnect();
  //           break;
  //         }
  //       }
  //     }
  //   };

  //   const observer = new MutationObserver(callback);

  //   // Start observing the target node for configured mutations
  //   observer.observe(targetNode, config);
  // })();
})();
