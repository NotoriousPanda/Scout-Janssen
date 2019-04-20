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

onkeyup = function(e){
  doTheOtherTimerStuff(e.which);
  console.log("hi");
}

//Perfectly ordered variables
var timeFor0 = 0;
var timer0Loop;
var timeFor4 = 0;
var timer4Loop;
var timer3Loop;
var timerFor3 = 0;
var timer2Loop;
var timerFor2 = 0;
var timer1Loop;
var timerFor1 = 0;

function doTheTimerStuff(keyCode){
  switch(keyCode){
    case 81:
      if(timer0Loop != undefined){
        clearInterval(timer0Loop);
        timer0Loop = undefined;
      } else {
        var timerElement = document.getElementById("timer0");
        timer0Loop = setInterval(function(){
          timeFor0++;
          timerElement.innerHTML = timeFor0 / 1;}, 1000);
      }
      break;
    case 87:
      timer1Div = document.getElementById("timer1");
      if(timer1Loop == undefined) timer1Loop = setInterval(function(){
        timerFor1++;
        timer1Div.innerHTML = timerFor1 / 1}, 1000);
      break;
    case 69:
      timer2Div = document.getElementById("timer2");
      if(timer2Loop == undefined) timer2Loop = setInterval(function(){
        timerFor2++;
        timer2Div.innerHTML = timerFor2 / 1}, 1000);
      break;
    case 82:
      timer3Div = document.getElementById("timer3");
      if(timer3Loop == undefined) timer3Loop = setInterval(function(){
        timerFor3++;
        timer3Div.innerHTML = timerFor3 / 1}, 1000);
      break;
    case 84:
      if(timer4Loop != undefined){
        clearInterval(timer4Loop);
        timer4Loop = undefined;
      } else {
        var timerElement4 = document.getElementById("timer4");
        timer4Loop = setInterval(function(){
          timeFor4++;
          timerElement4.innerHTML = timeFor4 / 1;}, 1000);
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
}s
