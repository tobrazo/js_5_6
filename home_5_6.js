var clocker = function(){

                var current = function(){
                    return(new Date()).getTime();
                }
var starttime = 0;
var lap = 0;

    this.start = function() {
        starttime = starttime ? starttime : current();
      };

   
    this.stop = function() {    
        lap = starttime ? lap + current() - starttime : lap;
        starttime = 0; 
      };


       this.reset = function() {
        lap = starttime = 0;
      };

    this.time = function() {
        return lap + (starttime ? current() - starttime : 0); 
      };

};


var watch = new clocker();
var clocktimer;

function formatTime(time) {

  var h = m = s = ms = 0;

  var newTime = '';


  h = Math.floor( time / (60 * 60 * 1000) );
  time = time % (60 * 60 * 1000);
  m = Math.floor( time / (60 * 1000) );
  time = time % (60 * 1000);
  s = Math.floor( time / 1000 );
  ms = time % 1000;


  h <= 9 ? h = "0" + h : 0
  m <= 9 ? m = "0" + m : 0
  s <= 9 ? s = "0" + s : 0
  ms <= 9 ? ms = "0" + ms : 0
  ms <= 99 ? ms = "0" + ms : 0


  newTime = h + ':' + m + ':' + s + ':' + ms;

  return newTime;
}
     
function update() {
  document.getElementById('time').innerHTML = formatTime(watch.time());
}

function start() {
  formatTime(watch.time)
  clocktimer = setInterval("update()", 1);
  
  watch.start();
  
}

function stop() {
  watch.stop();
  clearInterval(clocktimer);
}

function reset() {
  stop();
  watch.reset();
  update();

  document.getElementById('starting').className = "btn btn-primary btn-lg start btn-success";
  document.getElementById('starting').innerHTML = "start";
  document.getElementById('time').innerHTML = "00:00:00.000";

}


function change(){

  elemStart = document.getElementById('starting');

  if (elemStart.innerHTML == "start") {

    elemStart.className = "btn btn-primary btn-lg stop btn-warning";
    elemStart.innerHTML = "pause";
    elemStart.onclick = function pause(){ change(); stop();}
  
  } else if (elemStart.innerHTML == "pause"){
    elemStart.className = "btn btn-primary btn-lg start btn-info";
    elemStart.innerHTML = "resume";
    elemStart.onclick = function resume(){ change(); start();}
  
  } else {

    elemStart.className = "btn btn-primary btn-lg stop btn-warning";
    elemStart.innerHTML = "pause";
    elemStart.onclick = function pause(){ change(); stop();}
  }

}