
 function setpercent(x, id, percent,tdelay){
      ttime = tdelay / (percent-x);
      document.getElementById(id).style.width = percent + "%";
      setpercentfast(x, id, percent,ttime);
    }
    function setpercentfast(x, id, percent,time){
      document.getElementById(id).innerHTML = x + "%";
      x++;
      if(x<=percent){
        setTimeout(function(){
          setpercentfast(x, id, percent,ttime);
        }, ttime);
      }
    }
    function maincol(color){
      var head  = document.getElementsByTagName('head')[0];
      var links  = document.createElement('link');
      links.id   = 'customtemplate';
      links.rel  = 'stylesheet';
      links.type = 'text/css';
      links.href = 'http://amarpersaud.github.io/dist/css/' + color + '.css';
      links.media = 'all';
      head.appendChild(links);
    }
    var qq;
    function mcol(q){
      qq = q;
      maincol(qq);
    }

    function saveSettings(){
      createCookie('maincolor', qq);
    }
    
    function createCookie(name,value) {

      var date = new Date ();
      date.setYear (date.getYear() + 1);
      date = date.toGMTString();
    
		var expires = "; expires="+date;
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}


function start(){
if(! readCookie('maincolor')){
  createCookie('maincolor', 'info');
  var color = readCookie('maincolor');
  maincol(color);
} else{
  var color = readCookie('maincolor');
  maincol(color);
}
}

function loadSettings(){
  col = readCookie('maincolor');
  if(col == "default"){
        document.getElementById('maincolor').innerHTML = "White";
  }
  else if(col == "danger"){
        document.getElementById('maincolor').innerHTML = "Red";
  }
  else if(col == "warning"){
        document.getElementById('maincolor').innerHTML = "Orange";
  }
  else if(col == "primary"){
        document.getElementById('maincolor').innerHTML = "Blue";
  }
  else if(col == "info"){
        document.getElementById('maincolor').innerHTML = "Light Blue";
  }
  else{
        document.getElementById('maincolor').innerHTML = "Green";
  }
    document.getElementById('loading').remove();
}
var w;

function showAlert(lert) {
    a = "#" + lert;
    w = 0;
    $(a).addClass("in");
    document.getElementById("seconds").style.width = "0%";
     setTimeout(function(){
      $(a).alert('close');
     }, 10000);

    }
    

