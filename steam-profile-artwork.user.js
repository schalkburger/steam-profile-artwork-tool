// ==UserScript==
// @name         Steam Profile Artwork
// @namespace    https://greasyfork.org/users/776541
// @match       https://steamcommunity.com/sharedfiles/edititem/767/3/
// @grant       none
// @version     1.0
// @author      -
// @description  Steam Profile Artwork Tool
// ==/UserScript==

// TO-DO
// Make workshop upload also use hex convert


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
  // .modifyArtworkInstructions blockquote {
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
    <span style="padding-left: 16px; padding-right: 16px;">Enter Blank Title</span>
    </a>
    <a id="customArtworkButton" class="btn_darkblue_white_innerfade btn_medium" style="margin: 2px;">
    <span style="padding-left: 16px; padding-right: 16px;">Enable Custom Artwork Upload</span>
    </a>
    <a id="longWorkshopButton" class="btn_darkblue_white_innerfade btn_medium" style="margin: 2px;">
    <span style="padding-left: 16px; padding-right: 16px;">Upload Long Workshop</span>
    </a>
    <a id="longGuideButton" class="btn_darkblue_white_innerfade btn_medium" style="margin: 2px;">
    <span style="padding-left: 16px; padding-right: 16px;">Upload Long Guide</span>
    </a>
    <a id="resetButton" class="btn_darkblue_white_innerfade btn_medium" style="margin: 0 0 0 5px;background:#171a21">
    <span style="padding-left: 16px; padding-right: 14px;background:#171a21">Reset</span>
    </a>
  </div>`;
  // Grab mainContentsDiv element reference
  const mainContentsDiv = document.querySelector("#mainContents");
  // Insert the Buttons
  mainContentsDiv.parentNode.insertBefore(steamProfileArtworkContainer, mainContentsDiv);
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
    titleFieldInput.value = blankTitleCharacter;
    titleFieldInput.classList.add("fieldInputSuccess");
    alertBlankTitleSet.classList.add("fadeIn");
    titleFieldParent.insertBefore(alertBlankTitleSet, titleFieldInput.nextSibling);
  });
  // ----------------------------
  // Enable Custom Artwork Button
  // ----------------------------
  // Fix the bug where I'm getting tuned the whole time about
  // Fucking cunts
  // Jirre
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
  // Buttons selectors
  const fileUploadButton = document.querySelector("#file");
  const customArtworkButton = document.querySelector("#customArtworkButton");
  const longWorkshopButton = document.querySelector("#longWorkshopButton");
  const longGuideButton = document.querySelector("#longGuideButton");
  const resetButton = document.querySelector("#resetButton");
  const selectArtworkTitle = document.querySelector(".detailBox:nth-of-type(2) .title");
  const fileUploadParent = fileUploadButton.parentNode;
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
    $J('[name=consumer_app_id]').val(480); $J('[name=file_type]').val(0); $J('[name=visibility]').val(0);
    setTimeout(scrollToChooseFileButton, 0);
  }
  function longGuideUploadEnable() {
    console.log("Long guide Upload Enabled");
    $J('[name=consumer_app_id]').val(767); $J('[name=file_type]').val(9); $J('[name=visibility]').val(0);
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
  });
  longWorkshopButton.addEventListener("click", () => {
    customWorkshopUploadEnable();
    agreeTermsInput.checked = true;
    selectArtworkTitle.textContent = "Modify your artwork";
    fileUploadParent.insertBefore(alertLongWorkshopEnabled, fileUploadButton);
    fileUploadParent.insertBefore(hexEditWebsite, fileUploadButton);
  });
  longGuideButton.addEventListener("click", () => {
    longGuideUploadEnable();
    agreeTermsInput.checked = true;
    selectArtworkTitle.textContent = "Modify your artwork";
    fileUploadParent.insertBefore(alertLongGuideEnabled, fileUploadButton);
    fileUploadParent.insertBefore(hexEditWebsite, fileUploadButton);
  });
  resetButton.addEventListener("click", () => {
    resetUploads();
  });
})();
