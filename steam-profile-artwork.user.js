// ==UserScript==
// @name           Steam Profile Artwork
// @version        1.0.0
// @description    Steam Profile Artwork Tool
// @author         Darkharden
// @include        https://steamcommunity.com/*
// @run-at         document-idle
// @namespace      https://greasyfork.org/users/776541
// ==/UserScript==

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
  checkElement("video").then((element) => {
    const newScript = document.createElement("script");
    const inlineScript = document.createTextNode("jwplayer().play();jwplayer().setFullscreen(true);");
    newScript.appendChild(inlineScript);
    const target = document.body;
    target.appendChild(newScript);
  });
})();
