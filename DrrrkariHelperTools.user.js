// ==UserScript==
// @name         DrrrkariHelperTools
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       wtf
// @match        *://drrrkari.com/room*
// @icon         https://www.google.com/s2/favicons?domain=drrrkari.com
// @grant        none
// @updateURL    https://codes.cedms.jp/userscript/DrrrkariHelperTools.user.js
// @downloadURL  https://codes.cedms.jp/userscript/DrrrkariHelperTools.user.js
// @require      https://unpkg.com/axios/dist/axios.min.js
// ==/UserScript==

(function() {
    'use strict';
    var playingTime = 0;
    var $ = window.$;
    var { post } = axios;

    var parsed={};
    var menu = document.querySelector(".menu");
    var messageBoxInner = document.querySelector(".message_box_inner");
    var drrrHelperTools = document.createElement("li");
    var childTools = document.createElement("u");
    var childToolsHTML = document.createElement("span");

    childTools.innerText = "Helper";

    drrrHelperTools.setAttribute("class", "drrrHelperTools");
    childTools.setAttribute("class", "helperTools");
    childToolsHTML.style.display = "none";

    childTools.onclick = (e) => {
        childToolsHTML.style.display === "none"?
        childToolsHTML.style.display = "block":
        childToolsHTML.style.display = "none";
    };

    document.cookie.split('; ').forEach(a=>{
        const cookie=a.split("=");
        parsed[cookie[0]]=cookie[1];
    });

    console.log(`Your cookie is ${parsed["durarara-like-chat1"]}`);
    childToolsHTML.style.margin = "0";
    childToolsHTML.style.padding = "0";
    childToolsHTML.innerHTML = `\
      <span>durarara-like-chat1: </span><span class="dlc">${parsed["durarara-like-chat1"]}</span><br\>\
      <span>playing: </span><span class="playing">idk</span>\
    `;


    setInterval(()=>{
        document.querySelector(".playing").innerText = timestampToDate((playingTime++) * 1024);
    }, 1000);

    messageBoxInner.appendChild(childToolsHTML);
    drrrHelperTools.appendChild(childTools);
    menu.insertBefore(drrrHelperTools, menu.firstChild)

    var dlc = document.querySelector(".dlc");
    dlc.onclick = e => {
        copyFn(e.target.innerText);
        var copied = document.createElement("span");
        copied.innerText = "[Copied!]";
        copied.setAttribute("class", "copied");
        if (document.querySelector(".copied") == null) {
            childToolsHTML.insertBefore(copied, childToolsHTML.firstChild)
            setTimeout(() => childToolsHTML.removeChild(copied), 2000);
        }
    }

    function copyFn(text) {
        var ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.parentElement.removeChild(ta);
    }

    function timestampToDate(unixTimestamp) {
        let totalSeconds = unixTimestamp / 1000;
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        totalSeconds %= 60;
        let seconds = Math.floor(totalSeconds);
        return `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
    }
})();

