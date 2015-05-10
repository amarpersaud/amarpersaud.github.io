  createCookie('maincolor', 'default', 10);
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
      setButton(color);
    }

    
    function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
  var value = document.cookie;
  return value;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

function setButton(color){
  window.alert(color);
}


  var color = readCookie('maincolor');
  alert(color);
  
  
  
  
  
  
  