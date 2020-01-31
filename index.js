let keyDownFirstDate, keyDownCurrentDate,
    firstTimeKeyDown = true,
    isTimerRunning = false,
    timerJustStopped = true,
    timing,
    times = [],
    wasTimeAdded = false;
const timer = document.getElementById('timer'),
      timesList = document.getElementById('timesList');


document.addEventListener('keydown', e => {
  
  if(e.code == 'Space') {
    
    // stop timer
    if(isTimerRunning) {
      clearInterval(timing);

      // save time and update times list in html
      if(!wasTimeAdded) {
        times.push(timer.innerText);
        timesList.innerText = times.join(', ');
        wasTimeAdded = true;
      }
    }

    // get first date of spacebar down and current date (to check for how long it was pressed)
    if(timerJustStopped) {
      keyDownCurrentDate = Date.now();

      if(firstTimeKeyDown) {
        keyDownFirstDate = Date.now();
        firstTimeKeyDown = false;
      }

      // update text color of timer
      timer.style.color = (keyDownCurrentDate-keyDownFirstDate < 550) ? '#ff3617' : '#17ff23';       

    }
  }
  
});


document.addEventListener('keyup', e => {
  if(e.code == 'Space') {

    if(timerJustStopped) {
      firstTimeKeyDown = true;


      if(keyDownCurrentDate-keyDownFirstDate < 550) {
        timer.style.color = 'white';
      } else {
        // start counting if spacebar was pressed for at least 550ms
        timer.style.color = 'white';
        isTimerRunning = true;
        timerJustStopped = false;
        wasTimeAdded = false;
        count();
      }
      
    } else {
      timerJustStopped = true;
    }

  }
});


// start timer
function count() {
  const startTime = Date.now();
  let currentTime = Date.now(),
      timerVal = currentTime - startTime;
  
  timing = setInterval(() => {
    // update timer value on page
    timer.innerText = timeFormatter(timerVal);
    
    currentTime = Date.now();
    timerVal = currentTime - startTime;
  }, 10);
}


// set proper time format - min:s.ms
function timeFormatter(millis) {
  let min, s, ms,
      minFormat, sFormat, msFormat;

  min = Math.floor(millis/60/1000);
  s = Math.floor((millis - min*60*1000)/1000);
  ms = Math.floor((millis % 1000)/10);
  
  minFormat = min < 1 ? '' : `${min}:`;
  sFormat = (min > 0 && s < 10) ? `0${s}.` : `${s}.`;
  msFormat = ms < 10 ? `0${ms}` : `${ms}`;
  
  return minFormat + sFormat + msFormat;
}