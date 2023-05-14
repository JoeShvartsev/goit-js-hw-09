import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix'

const ref = {
    dataEl: document.querySelector(".value[data-days]"),
    hoursEl: document.querySelector(".value[data-hours]"),
    minutesEl: document.querySelector(".value[data-minutes]"),
    secondsEl: document.querySelector(".value[data-seconds]"),
    startBtnEl: document.querySelector("button[data-start]"),
    timerEl: document.querySelector(".timer"),
    inputEl: document.getElementById("datetime-picker")
}
    ref.startBtnEl.style.width ="100px";
    ref.startBtnEl.style.height ="37px"
    ref.startBtnEl.style.marginLeft ="20px"
    ref.startBtnEl.style.border = "1px solid black"
    ref.inputEl.style.width = "200px";
    ref.inputEl.style.padding = "10px";
    ref.inputEl.style.border = "1px solid black";
    ref.timerEl.style.display = "flex";
    ref.timerEl.style.flexDirection = "row";
    ref.timerEl.style.justifyContent = "space-evenly";
    ref.timerEl.style.alignItems = "center";
    ref.timerEl.style.fontSize = "24px";
    ref.timerEl.style.color = "black";
    ref.timerEl.style.marginTop = "20px"
    ref.startBtnEl.disabled = true;


flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        timerHandler(selectedDates)
    },
});
function timerHandler(selectedDates) {
    let timerId = null;
    const targetDate = new Date(selectedDates[0]);
    if (targetDate <= Date.now()) {
        Notiflix.Report.failure('Error', 'Please select a future date and time.', 'OK');
    } else if (targetDate > Date.now()) {
        ref.startBtnEl.disabled = false;
        ref.startBtnEl.addEventListener('click', timerStart); 
    }
    function timerStart() { 
        if (timerId !== null ) {
            clearInterval(timerId);
            ref.startBtnEl.disabled = true;
            ref.startBtnEl.disabled = true;
            ref.dataEl.textContent = '00';
            ref.hoursEl.textContent = '00';
            ref.minutesEl.textContent = '00';
            ref.secondsEl.textContent = '00';
            return;
        } 
        else {
            timerId = setInterval(() => {
                const currentDateInMs = Date.now();
                const targetDateInMs = targetDate.getTime();
                const distanceToTarget = targetDateInMs - currentDateInMs;
                console.log(convertMs(distanceToTarget));
                timerSetUp()
                
                function timerSetUp(){
                    if (distanceToTarget <= 1000) {
                        clearInterval(timerId);
                    } 
                    else {
                        const { days, hours, minutes, seconds } = convertMs(distanceToTarget);
                        ref.dataEl.textContent = days;
                        ref.hoursEl.textContent = hours;
                        ref.minutesEl.textContent = minutes;
                        ref.secondsEl.textContent = seconds;
                    }
                }
                
                function addLeadingZero(value) {
                return String(value).padStart(2, '0');
                }

                function convertMs(ms) {
                    const second = 1000;
                    const minute = second * 60;
                    const hour = minute * 60;
                    const day = hour * 24;
                    const days = addLeadingZero(Math.floor(ms / day));
                    const hours = addLeadingZero(Math.floor((ms % day) / hour));
                    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
                    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

                    return { days, hours, minutes, seconds };
                }
            }, 1000);
            ref.startBtnEl.disabled = true;
        }
    }
}

