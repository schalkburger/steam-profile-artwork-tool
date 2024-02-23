// ==UserScript==
// @name Automatically receive Steam stickers when browsing Steam
// @name:zh Automatically receive Steam stickers when browsing Steam
// @name:en Auto claim Steam stickers when browsing Steam
// @namespace https://github.com/UnluckyNinja
// @version 0.2.2
// @description Automatically receive sticker rewards (if any) from various Steam promotions
// @description:en Auto claim sticker rewards in various steam sales (if any)
// @author UnluckyNinja
// @licenseMIT
// @match https://store.steampowered.com/*
// @icon https://www.google.com/s2/favicons?sz=64&domain=steampowered.com
// @grant none
// ==/UserScript==

(async function () {
  "use strict";

  // To prevent the script from making unnecessary requests outside the promotion period, skip directly if the time exceeds
  // However, the number of requests once a day is already very low, so just leave it on all the time and save the need for manual updates.
  // if (Date.now() > new Date('2023-05-24').getTime()) {
  // log('To avoid unnecessary requests being automatically skipped, you can manually modify the behavior (comment these two lines in the script), or wait for the next update')
  // return
  // }

  // before any request, check if there is a web api token on the page, if not, request to a valid page, if no valid response again, take it as not claimable
  let webapi_token = null;
  if (window.application_config?.dataset?.loyalty_webapi_token) {
    webapi_token = JSON.parse(window.application_config.dataset.loyalty_webapi_token);
  } else {
    const res = await fetch("/category/action");
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    const token = doc.getElementById("application_config")?.dataset?.loyalty_webapi_token;
    if (!token) {
      console.log("No valid API token found, are you logged in?");
      return;
    }
    webapi_token = JSON.parse(token);
  }

  // can claim check
  const res = await fetch(`https://api.steampowered.com/ISaleItemRewardsService/CanClaimItem/v1/?access_token=${webapi_token}`);
  const json = await res.json();

  const can_claim = !!json.response?.can_claim;
  const next_claim_time = json.response?.next_claim_time;

  // request to /ClaimItem
  if (can_claim) {
    await fetch(`https://api.steampowered.com/ISaleItemRewardsService/ClaimItem/v1/?access_token=${webapi_token}`, { method: "POST" });
    console.log("Collection completed");
  } else {
    if (next_claim_time) {
      console.log("Sticker already claimed today, the next item will be available at: " + new Date(next_claim_time * 1000).toLocaleString("en-GB"));
    } else {
      console.log("No content to collect, skipping.");
    }
  }
})();
