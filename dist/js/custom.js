
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
      if(! color){
        document.getElementById('customtemplate').setAttrubute('href', 'http://amarpersaud.github.io/dist/css/' + color + '.css');
      }
      createCookie('maincolor', color);
    }

    
    function createCookie(name,value,days) {

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


function loaded(){
if(! readCookie('maincolor')){
  createCookie('maincolor', 'default', 10);
  var color = readCookie('maincolor');
  maincol(color);
} else{
  var color = readCookie('maincolor');
  maincol(color);
}
}