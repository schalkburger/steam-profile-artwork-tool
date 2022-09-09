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
// Workshop
// $J('[name=consumer_app_id]').val(480);$J('[name=file_type]').val(0);$J('[name=visibility]').val(0);
// Long guide:
// $J('[name=consumer_app_id]').val(767);$J('[name=file_type]').val(9);$J('[name=visibility]').val(0);


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
    <a id="longArtworkButton" class="btn_darkblue_white_innerfade btn_medium" style="margin: 2px;">
    <span style="padding-left: 16px; padding-right: 16px;">Enable Custom Artwork Upload</span>
    </a>
    <a id="workshopArtworkButton" class="btn_darkblue_white_innerfade btn_medium" style="margin: 2px;">
    <span style="padding-left: 16px; padding-right: 16px;">Enable Workshop Upload</span>
    </a>
    <a id="longguideArtworkButton" class="btn_darkblue_white_innerfade btn_medium" style="margin: 2px;">
    <span style="padding-left: 16px; padding-right: 16px;">Enable Long Guide Upload</span>
    </a>
    <a id="resetButton" class="btn_darkblue_white_innerfade btn_medium" style="margin: 2px;background:#171a21">
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
  const alertCustomArtworkEnabled = document.createElement("div");
  alertCustomArtworkEnabled.className = "alertCustomArtworkEnabled";
  alertCustomArtworkEnabled.innerHTML = `<span><i>✔</i> Upload Custom Artwork Enabled</span>`;
  const fileUploadButton = document.querySelector("#file");
  const longArtworkButton = document.querySelector("#longArtworkButton");
  const workshopArtworkButton = document.querySelector("#workshopArtworkButton");
  const longGuideArtworkButton = document.querySelector("#longguideArtworkButton");
  const resetButton = document.querySelector("#resetButton");
  const fileUploadParent = fileUploadButton.parentNode;
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
  longArtworkButton.addEventListener("click", () => {
    customArtworkUploadEnable();
    agreeTermsInput.checked = true;
    fileUploadParent.insertBefore(alertCustomArtworkEnabled, fileUploadButton.nextSibling);
  });
  workshopArtworkButton.addEventListener("click", () => {
    customWorkshopUploadEnable();
    agreeTermsInput.checked = true;
    fileUploadParent.insertBefore(alertCustomArtworkEnabled, fileUploadButton.nextSibling);
  });
  longGuideArtworkButton.addEventListener("click", () => {
    longGuideUploadEnable();
    agreeTermsInput.checked = true;
    fileUploadParent.insertBefore(alertCustomArtworkEnabled, fileUploadButton.nextSibling);
  });
  resetButton.addEventListener("click", () => {
    resetUploads();
  });
})();
