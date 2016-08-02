Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};
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

rs = document.getElementsByClassName('rangeinput');
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
    }
  }      
  range.onmousedown = function(e) { 
    currentrange = e.currentTarget;
    var X = e.pageX - e.currentTarget.offsetLeft; 
    var Y = e.pageY - e.currentTarget.offsetTop; 
    progress = e.currentTarget.getElementsByTagName("DIV")[0];
    progress.style.width = (X / e.currentTarget.offsetWidth * 100).clamp(0, 100) + "%";
    e.currentTarget.setAttribute("value", (X / e.currentTarget.offsetWidth * 100).clamp(0, 100));    
  }
}