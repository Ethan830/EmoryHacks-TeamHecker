// import { runtime } from "webextension-polyfill";

// runtime.onInstalled.addListener(() => {
//   console.log("[background] loaded ");
// });

// export {};

// Optional: Listen for installation or updates
/* eslint-disable no-undef */
chrome.runtime.onInstalled.addListener(() => {
  console.log("Color Blind Adjuster extension installed.");
});
