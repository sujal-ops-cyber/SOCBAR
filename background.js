"use strict";
chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.local.set({thumb: '#3aa757', bar: "#696969", width: "11", radius:"11"}, function() {
    console.log("poopoobar");
  });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { schemes: ["https", "http"] },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});
