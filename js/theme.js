function maincolor(color){
    document.getElementById("theme").href = "/css/theme/" + color + ".min.css";
  }
  //Cookie handling. Needs to come first so that cookies can be read for the theme.
    function createCookie(name,value) {
    var date = new Date ();
    date.setYear (date.getYear() + 100);
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
  
  document.main_color = readCookie("maincolor");
  if(document.main_color){
    maincolor(document.main_color);
  }
  else{
    createCookie("maincolor", "primary");
    document.main_color = "primary";
    maincolor("primary");
  }