const t={startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]"),bodyEl:document.body};t.startBtn.addEventListener("click",(()=>{t.startBtn.disabled=!0,timerId=setInterval((()=>{t.bodyEl.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3)}));t.stopBtn.addEventListener("click",(()=>{t.startBtn.disabled=!1,t.stopBtn.addEventListener("click",(()=>{clearInterval(timerId)}))}));
//# sourceMappingURL=01-color-switcher.28924fc4.js.map
