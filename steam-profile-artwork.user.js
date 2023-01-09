// ==UserScript==
// @name        Steam Profile Artwork Tool
// @namespace   https://greasyfork.org/en/users/961305-darkharden
// @match       https://steamcommunity.com/sharedfiles/edititem/767/3/
// @match       https://steamcommunity.com/id/*/edit/info
// @match       https://steamcommunity.com/id/*
// @match       https://steamcommunity.com/id/*/friends/
// @include     /^https?:\/\/steamcommunity.com\/(id\/+[A-Za-z0-9$-_.+!*'(),]+|profiles\/7656119[0-9]{10})\/friends\/?$/
// @exclude     https://steamcommunity.com/id/*/inventory/*
// @version     1.4.1
// @author      Schalk Burger <schalkb@gmail.com>
// @description  A tool to make it easier to upload custom artwork for your profile.
// @license MIT
// ==/UserScript==

// TO-DO

// 1. Profile theme switcher preview on profile page - body class change DefaultTheme / MidnightTheme
// 3. Comment remover script - https://greasyfork.org/en/scripts/26473-steam-community-comments-remover
// 4. Centering text in info box / bios
// 5. Make workshop upload also use hex convert

(function () {
  "use strict";
  let version = GM_info.script.version;
  console.log(`Steam Artwork Tool Version ${version}`);
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
  }
  .alertBlankTitleSet, .alertCustomArtworkEnabled {
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
  .alertBlankTitleSet, .alertCustomArtworkEnabled.longWorkshopGuideEnabled {
    margin-top: 0;
  }
  // .alertCustomArtworkEnabled.longWorkshopEnabled, .alertCustomArtworkEnabled.longGuideEnabled {
  //   display: none;
  // }
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
    position: relative;
    left: 55px;
    max-width: 590px;
    max-height: 500px;
    overflow: auto;
    background: none;
  }
  .symbols-container details {
        padding: 15px;
  }
  .symbols-container details[open] {
    padding: 15px;
    background: #111c34;
  }
  .symbols-container summary {
    cursor: pointer;
  }
  .profileedit_ProfileBoxContent_3s6BB .symbols-container {
    left: 0;
    top: -32px;
  }
  .profileedit_ProfileBoxContent_3s6BB .symbols-container details[open] {
    background-color: rgba(0,0,0,.25);
  }
  .customtext_showcase + .symbols-container {
    left: 0;
    top: 10px;
  }
  .customtext_showcase + .symbols-container details[open] {
    background-color: transparent;
  }
  .profile_artwork {
    border-top: 1px solid rgb(255 255 255 / 15%);
    border-bottom: 1px solid rgb(255 255 255 / 15%);
    padding: 10px 0 0 5px;
    margin-bottom: 10px;
  }
  .upload-artwork-link, .change-profile-theme {
    position: relative;
  }
  .upload-artwork-link:hover {
    text-decoration: underline;
  }
  .change-profile-theme-container {
    display: flex;
  }
  .change-profile-theme {
    min-width: 130px;
    cursor: pointer;
    overflow: visible;
    z-index: 400;
    color: #fff;
  }
  .change-profile-theme .color-themes {
    display: flex;
    flex-direction: column;
    background-color: #171a21;
    color: #fff;
    padding: 15px;
    padding-top: 10px;
    box-shadow: 0 0 12px #000000;
    margin-top: 10px;
    min-width: 140px;
  }
  .change-profile-theme .color-themes span {
    margin: 6px 0 4px 0;
    display: block;
  }
  .change-profile-theme .color-themes span:hover {
    text-decoration: underline;
  }
  .change-profile-theme details {
    position: absolute;
    top: 0;
    left: 0;
  }
  #manage_friends .friends-comments-textarea {
    width: 100%;
  }
  #manage_friends.manage_friends_panel.manage {
    padding-bottom: 20px;
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

  // ----------------------------
  // Upload Artwork & Enable Custom Uploads Buttons
  // ----------------------------
  // Upload custom artwork button to profile

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
    checkElement(".btn_profile_action").then((element) => {
      console.log("btn_profile_action");
      function setUploadArtworkButton() {
        const uploadArtworkURL = `https://steamcommunity.com/sharedfiles/edititem/767/3/`;
        const uploadCustomArtworkButtonContainer = document.createElement("div");
        uploadCustomArtworkButtonContainer.className = "profile_artwork";
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
        console.log("Body class theme:", bodyClassesOutput[0].toString());
        uploadCustomArtworkButtonContainer.setAttribute("data-panel", "{'maintainX':true,'bFocusRingRoot':true,'flow-children':'row'}");
        // Create Buttons
        uploadCustomArtworkButtonContainer.innerHTML = `
        <div class="profile_count_link">
          <a class="upload-artwork-link" href="https://steamcommunity.com/sharedfiles/edititem/767/3/"><span>Upload artwork</span></a>
        </div>
        <div class="profile_count_link change-profile-theme-container">
          <div class="change-profile-theme">
            <details>
            <summary>Preview Theme</summary>
              <div class="color-themes">
                <span class="change-theme" id="DefaultTheme">Default Theme</span>
                <span class="change-theme" id="SummerTheme">Summer</span>
                <span class="change-theme" id="MidnightTheme">Midnight</span>
                <span class="change-theme" id="SteelTheme">Steel</span>
                <span class="change-theme" id="CosmicTheme">Cosmic</span>
                <span class="change-theme" id="DarkModeTheme">DarkMode</span>
              </div>
            </details>
          </div>
          <div class="active-theme"><span>${currentTheme}</span></div>
        </div>
        `;
        // Grab mainContentsDiv element reference
        const uploadCustomArtworkButton = document.querySelector(".profile_header_actions .btn_profile_action:first-child");
        const uploadArtworkButtonReferenceParent = document.querySelector(".responsive_count_link_area");
        const uploadArtworkButtonReferenceChild = document.querySelector(".responsive_count_link_area > div:first-child");
        // Insert the Buttons
        uploadArtworkButtonReferenceParent.insertBefore(uploadCustomArtworkButtonContainer, uploadArtworkButtonReferenceChild);
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
          const themeColorArray = ["DefaultTheme", "SummerTheme", "MidnightTheme", "SteelTheme", "CosmicTheme", "DarkModeTheme"];
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

    // ----------------------------
    // Symbols & Characters for comments
    // ----------------------------
    // Check if comment area exists
    checkElement(".flat_page").then((element) => {
      console.log("flat_page exists");
      function setCommentSymbolsPicker() {
        const symbolsDialogDetails = document.createElement("div");
        symbolsDialogDetails.className = "symbols-container ";
        symbolsDialogDetails.innerHTML = `
        <details>
        <summary>Symbols & Characters</summary>
        <div>
        <div class="subSection detailBox" id="2050699">
        <div class="subSectionTitle">Invisible Spacers</div>
        <div class="subSectionDesc">
          For those needing spacers for anything they are doing, but regular spaces (using the space bar) do not properly register. Simply copy and paste the space between the two " | " and use that for
          all your spacing needs. <br />⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀▼▼▼▼▼▼▼<br />⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ |⠀⠀⠀⠀⠀⠀⠀⠀⠀| <br />⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀▲▲▲▲▲▲▲
          <div style="clear: both"></div>
        </div>
      </div>
      <div style="clear: both"></div>
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
          🆒 🆙 🆖 🆓 🔤 🔠 🔡 <br /><br /><br /><br />
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
      </details>
      `;

        // Check if on main profile page

        const mainProfilePage = document.getElementsByClassName("commentthread_entry").length > 0;

        if (mainProfilePage) {
          // Grab mainContentsDiv element reference
          console.log("commentthread_entry found");
          const symbolsPickerModalLocation = document.querySelector(".commentthread_entry");
          symbolsPickerModalLocation.parentNode.appendChild(symbolsDialogDetails, symbolsPickerModalLocation);
        } else {
          console.log("commentthread_entry not found");
        }

        // Check if on Edit Profile page

        const profileEditInfoPage = document.getElementsByClassName("summary_summaryTextArea_2ipSt").length > 0;

        if (profileEditInfoPage) {
          const symbolsPickerProfileEditLocation = document.querySelector(".summary_summaryTextArea_2ipSt");
          symbolsPickerProfileEditLocation.parentNode.appendChild(symbolsDialogDetails, symbolsPickerProfileEditLocation);
        }

        // Featured Showcase Custom Text

        const profileEditShowcaseText = document.getElementsByClassName("customization_edit_area").length > 0;

        const navLinkShowcase = document.getElementsByClassName("profileeditshell_Shell_2kqKZ").length > 0;

        if (navLinkShowcase) {
          console.log("profileShowCasesMavLink found");
          const profileEditGeneralNavLink = document.querySelector(".profileeditshell_NavLink_3rtIp[href$='/showcases']");
          profileEditGeneralNavLink.addEventListener("click", () => {
            console.log("Featured Showcase nav link clicked");
            // window.location.replace("https://steamcommunity.com/id/darkharden/edit/showcases")
            // window.location.reload();
            window.history.pushState("", "", "/showcases");
            function reloadShowCasesPage() {
              window.location.reload();
            }
            // Reload page after 3 seconds
            setTimeout(reloadShowCasesPage, 200);
          });
        }

        if (profileEditShowcaseText) {
          console.log("customization_edit_area found");
          const symbolsPickerProfileEditLocation = document.querySelector(".customization_edit_area .customtext_showcase");
          symbolsPickerProfileEditLocation.parentNode.appendChild(symbolsDialogDetails, symbolsPickerProfileEditLocation);
        } else {
          console.log("customization_edit_area not found");
        }

        // Featured Showcase Summary
        const profileEditSummary = document.getElementsByClassName("profileedit_ProfileBoxContent_3s6BB").length > 0;

        // Check if Showcase Nav link exists

        const navLinkGeneral = document.getElementsByClassName("profileeditshell_Shell_2kqKZ").length > 0;

        if (navLinkGeneral) {
          const profileEditFeaturedShowCaseNavLink = document.querySelector(".profileeditshell_NavLink_3rtIp[href$='/info']");
          profileEditFeaturedShowCaseNavLink.addEventListener("click", () => {
            console.log("General nav link clicked");
            // window.location.replace("https://steamcommunity.com/id/darkharden/edit/info")
            // window.location.reload();
            window.history.pushState("", "", "/info");
            function reloadGeneralPage() {
              window.location.reload();
            }
            // Reload page after 3 seconds
            setTimeout(reloadGeneralPage, 200);
          });
        }

        if (profileEditSummary) {
          console.log("profileedit_ProfileBoxContent_3s6BB found");
          const symbolsPickerProfileEditLocation = document.querySelector(".profileedit_ProfileBoxContent_3s6BB .summary_summaryTextArea_2ipSt");
          symbolsPickerProfileEditLocation.parentNode.appendChild(symbolsDialogDetails, symbolsPickerProfileEditLocation);
        } else {
          console.log("profileedit_ProfileBox_uwqwo not found");
        }
      }
      setTimeout(setCommentSymbolsPicker, 500);
    });
  })();

  // ========================================================================== //
  // Steam Profile Artwork Tool Buttons

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
    checkElement("#mainContents").then((element) => {
      console.log("#mainContents exists");
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
    checkElement(".titleField").then((element) => {
      console.log(".titleField exists");
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

  // Steam Mass Comments Poster Vanilla

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

      ToggleManageFriends();

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
})();
