$(document).ready(function(){
  
  var clock= new Clock();
  clock.displayCurrentTime();
  clock.displaySessionTime();
  clock.displayBreakTime();
  var audio=
          document.getElementById("beep")
  
  $("#session-decrement").click(function() {
    clock.changeSession("subtract");
  });
  $("#session-increment").click(function() {
    clock.changeSession("plus");
  });
  $("#break-decrement").click(function() {
    clock.changeBreak("subtract");
  });
  $("#break-increment").click(function() {
    clock.changeBreak("plus");
  });
  $("#start_stop").click(function() {
    clock.toggleStartStop();
  });
  $("#reset").click(function() {
    clock.reset();
  });

function Clock(){

      var _this = this,
      timeOn,
      clockRunning = false,
      type = "Session",
      currentTime = 1500,
      sessionTime = 1500,
      breakTime = 300;
      
    function timeModify(input){
            var minutes = parseInt(input/ 60, 10);
            var seconds = parseInt(input%60,10);
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            var newTime="";
            newTime= minutes + ":" + seconds;
            return newTime;  
    }
      
     this.changeSession= function(input) {
       if(input==="subtract" && sessionTime>60){
         sessionTime-=60;
       } else if(input==="plus" && sessionTime<3600){
         sessionTime+=60;
       }
       currentTime=sessionTime;
       this.displaySessionTime();
       this.displayCurrentTime();
     }
     
    this.changeBreak = function(input) {
       if(input==="subtract" && breakTime>60){
         breakTime-=60;
       } else if(input==="plus" && breakTime<3600){
         breakTime+=60;
       }
       this.displayBreakTime();
     }
    
    this.displayCurrentTime = function() {
      $("#time-left").text(timeModify(currentTime));
    }
        
    this.displaySessionTime = function() {
      $("#session-length").text(parseInt(sessionTime / 60));
    }
    
    this.displayBreakTime = function() {
      $("#break-length").text(parseInt(breakTime / 60));
    }

      
    this.toggleStartStop=function(){
      if(clockRunning===true){
        clearInterval(timeOn);
        clockRunning=false;
      } else{
        timeOn=setInterval(function(){
          _this.timer();
        },1000);
            clockRunning=true;
      }
    }
  
    this.timer=function(){
    if (currentTime > 0) {
        currentTime --;
        this.displayCurrentTime();
        if (currentTime === 0) {
          audio.play();
          if (type === "Session") {
            currentTime = breakTime;
            type = "Break";
             $('#timer-label').text("Break"); 
          } else {
            currentTime = sessionTime;
            type = "Session";
            $('#timer-label').text(" Session"); 
          }
        }
      }
    }
  
    this.reset = function() {
    clearInterval(timeOn);
    type = "Session";
    clockRunning=false;
    currentTime = 1500;
    sessionTime=1500;
    breakTime = 300;
    audio.pause();
    audio.currentTime = 0;
    this.displayCurrentTime();
    this.displaySessionTime();
    this.displayBreakTime();
    }
  
}
  
});
