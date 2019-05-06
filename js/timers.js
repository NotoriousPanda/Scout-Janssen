//I apologize for the layout
onkeydown = function(e){
  /*
  Q: 81
  W: 87
  E: 69
  R: 82
  T: 84
  */
  doTheTimerStuff(e.which);
}
function resizeIframe(obj) {
  obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
}
onkeyup = function(e){
  doTheOtherTimerStuff(e.which);
}

//Perfectly ordered variables
var timerFor0 = 0;
var timer0Loop;
var timerFor4 = 0;
var timer4Loop;
var timer3Loop;
var timerFor3 = 0;
var timer2Loop;
var timerFor2 = 0;
var timer1Loop;
var timerFor1 = 0;

function doTheTimerStuff(keyCode){
  timeInterval = 250;
  timeIncrements = timeInterval/1000;
  switch(keyCode){
    case 81:
      if(timer0Loop != undefined){
        clearInterval(timer0Loop);
        timer0Loop = undefined;
      } else {
        clearInterval(timer4Loop);
        timer4Loop = undefined;
        var timerElement = document.getElementById("timer0");
        timer0Loop = setInterval(function(){
          timerFor0 = timerFor0 + timeIncrements;
          timerElement.innerHTML = (timerFor0 / 1).toFixed(2);
         }, timeInterval);
      }
      break;
    case 87:
      timer1Div = document.getElementById("timer1");
      if(timer1Loop == undefined) timer1Loop = setInterval(function(){
        timerFor1 = timerFor1 + timeIncrements;
        timer1Div.innerHTML = (timerFor1 / 1).toFixed(2);
      }, timeInterval);
      break;
    case 69:
      timer2Div = document.getElementById("timer2");
      if(timer2Loop == undefined) timer2Loop = setInterval(function(){
        timerFor2 = timerFor2 + timeIncrements;
        timer2Div.innerHTML = (timerFor2 / 1).toFixed(2);
      }, timeInterval);
      break;
    case 82:
      timer3Div = document.getElementById("timer3");
      if(timer3Loop == undefined) timer3Loop = setInterval(function(){
        timerFor3 = timerFor3 + timeIncrements;
        timer3Div.innerHTML = (timerFor3 / 1).toFixed(2);
      }, timeInterval);
      break;
    case 84:
      if(timer4Loop != undefined){
        clearInterval(timer4Loop);
        timer4Loop = undefined;
      } else {
        clearInterval(timer0Loop);
        timer0Loop = undefined;
        var timerElement4 = document.getElementById("timer4");
        timer4Loop = setInterval(function(){
          timerFor4 = timerFor4 + timeIncrements;
          timerElement4.innerHTML = (timerFor4 / 1).toFixed(2);
        }, timeInterval);
      }
      break;
  }
}

function doTheOtherTimerStuff(keyCode){
  switch(keyCode){
    case 87:
      clearInterval(timer1Loop);
      timer1Loop = undefined;
      break;
    case 69:
      clearInterval(timer2Loop);
      timer2Loop = undefined;
      break;
    case 82:
      clearInterval(timer3Loop);
      timer3Loop = undefined;
      break;
  }
}
