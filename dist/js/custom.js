
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
      document.getElementById('maincolor').setAttribute('class','btn dropdown-toggle btn-' + color);
      if(color == 'info'){
      document.getElementById('maincolor').innerHTML = 'Light Blue <span class="caret"></span>';
      }
      if(color == 'danger'){
      document.getElementById('maincolor').innerHTML = 'Red <span class="caret"></span>';
      }
      if(color == 'warning'){
      document.getElementById('maincolor').innerHTML = 'Orange <span class="caret"></span>';
      }
      if(color == 'primary'){
      document.getElementById('maincolor').innerHTML = 'Blue <span class="caret"></span>';
      }
      if(color == 'success'){
      document.getElementById('maincolor').innerHTML = 'Green <span class="caret"></span>';
      }
      if(color == 'default'){
      document.getElementById('maincolor').innerHTML = 'White <span class="caret"></span>';
      }
      createCookie('maincolor', color);
      setButtons(color);
    }

    
    function createCookie(name,value,days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	else var expires = "";
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

function setButtons(color){
  var list = document.getElementsByTagName('button');
  
  for(var i=0; i<list.length; i++){
    ca = list[i].getAttribute('class').split(' ');
    
    for(var a=0; a<ca.length; a++){
      if(ca[a] == "btn-primary" || ca[a] == "btn-danger" || ca[a] == "btn-warning" || ca[a] == "btn-info" || ca[a] == "btn-default" || ca[a] == "btn-success" || ca[a] == "undefined"){
        ca[a] = '';
      }
    }
    classtoput = '';
    for(var b=0; b<=ca.length; b++){
      var classtoput = classtoput + " " + ca[b];
    }
    
    list[i].setAttribute('class', classtoput + ' btn-' + color);
  }
}



if(! readCookie('maincolor')){
  createCookie('maincolor', 'default', 100);
} 
var color = readCookie('maincolor');
setButtons(color);

  
  
  
  
  
  