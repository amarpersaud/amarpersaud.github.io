  searchbarid = "searchbox";
  searchbuttonid = "search-button";
  searchbar = document.getElementById(searchbarid);
  searchbutton = document.getElementById(searchbuttonid);

  Number.prototype.clamp = function(min, max) {
      return Math.min(Math.max(this, min), max);
  };
function GetURLParameter(sParam)
  {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
      var sParameterName = sURLVariables[i].split('=');
      if (sParameterName[0] == sParam) 
      {
        return sParameterName[1];
      }
    }
  }
  function getjson(func, url){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArg = JSON.parse(xmlhttp.responseText);
            func(myArg);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }
  
  
  function search(text){
      location.href = "search?q=" + encodeURIComponent(text);
  }
  // Bind to onkeyup and onclick to search function
  searchbar.onkeyup = function(){
    if (event.keyCode == 13){
      search(searchbar.value);
    }
  }
  searchbutton.onclick = function(){
    search(searchbar.value);
  }
  
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
  
  var pgid = "";
  if(location.pathname == "/"){
    pgid = "nav_home";
  }
  if(location.pathname == "/projects.html"){
    pgid = "nav_projects";
  }
  if(location.pathname == "/about.html"){
    pgid = "nav_about";
  }
  if(location.pathname == "/settings.html"){
    pgid = "nav_settings";
  }
  if(pgid != ""){
    document.getElementById(pgid).style.class = "active";
  }
  document.onmousedown = function(event){
    if(!(event.target.classList.contains("dropdown")) && !(findAncestor(event.target, "dropdown"))){
      s=document.getElementsByClassName("dropdown");
      for(i=0; i<s.length; i++){
        s[i].active = 0;
        s[i].getElementsByTagName("ul")[0].setAttribute("style","display: none");
      }      
    }
  }
  s = document.getElementsByClassName("dropdown");
  for(i=0; i<s.length; s++){
    s[i].active = 0;
    s[i].onclick = function(event){
      if(event.currentTarget.active==1){
        event.currentTarget.active = 0;
        event.currentTarget.getElementsByTagName("ul")[0].setAttribute("style","display: none");
      }
      else{
        event.currentTarget.active = 1;
        event.currentTarget.getElementsByTagName("ul")[0].setAttribute("style","display:inline-block");
      }
    }
  }
  function findAncestor (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
  }