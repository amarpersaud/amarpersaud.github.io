//change event for slider value changed

var changedEvent = new Event('changed');
//Clamp
Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};

//check if the mouse is pressed to prevent multiple sliders from moving at once and make the slider only move if the mouse is pressed.
  var mouseDown = 0;
  document.body.onmousedown = function(evt) { 
    if(evt.button==0){
      mouseDown = 1;
    }
  }
  document.body.onmouseup = function(evt) {
    if(evt.button==0){
      mouseDown = 0;
    }
  }

//get the range inputs
rs = document.getElementsByClassName('rangeinput');
//the currently selected range input
currentrange = rs[0];

for (i = 0; i < rs.length; i++) { 
  var range = rs[i]; 
  if(range.getAttribute("value") != ""){
    range.getElementsByTagName("DIV")[0].style.width = range.getAttribute("value") + "%";
  }
  else{
    range.getElementsByTagName("DIV")[0].style.width = "40%";
    range.setAttribute("value", 40);
  }
  range.onmousemove = function(e) { 
    if(mouseDown && e.currentTarget == currentrange){
      var X = e.pageX - e.currentTarget.offsetLeft; 
      var Y = e.pageY - e.currentTarget.offsetTop; 
      progress = e.currentTarget.getElementsByTagName("DIV")[0];
      progress.style.width = (X / e.currentTarget.offsetWidth * 100).clamp(0, 100) + "%";   
      e.currentTarget.setAttribute("value", (X / e.currentTarget.offsetWidth * 100).clamp(0, 100));
      e.currentTarget.dispatchEvent(changedEvent);
    }
  }      
  range.onmousedown = function(e) { 
    currentrange = e.currentTarget;
    var X = e.pageX - e.currentTarget.offsetLeft; 
    var Y = e.pageY - e.currentTarget.offsetTop; 
    progress = e.currentTarget.getElementsByTagName("DIV")[0];
    progress.style.width = (X / e.currentTarget.offsetWidth * 100).clamp(0, 100) + "%";
    e.currentTarget.setAttribute("value", (X / e.currentTarget.offsetWidth * 100).clamp(0, 100));    
    e.currentTarget.dispatchEvent(changedEvent);
  }
}