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
        s[i].getElementsByTagName("ul")[0].setAttribute("style","visibility: hidden; opacity: 0;");
      }      
    }
  }
  var dropdownValueChanged = new CustomEvent('dropdownValueChanged');
  
  // Bind onclick for dropdowns to toggle their menus and change their values when something is selected.
  s = document.getElementsByClassName("dropdown");
  for(i=0; i<s.length; i++){
    s[i].active = 0;
    s[i].value = s[i].getElementsByTagName("div")[0].innerHTML;
    // open and close the menu when the button is clicked or an item is selected.
    s[i].onclick = function(event){
      if(event.currentTarget.active==1){
        event.currentTarget.active = 0;
        event.currentTarget.getElementsByTagName("ul")[0].setAttribute("style","visibility: hidden; opacity: 0;");
      }
      else{
        event.currentTarget.active = 1;
        event.currentTarget.getElementsByTagName("ul")[0].setAttribute("style","visibility: visible; opacity: 1;");
      }
    }
    g = s[i].getElementsByTagName("ul")[0].getElementsByTagName("a");
    // for all 'a' tags, add an onclick event to change the text and value of the dropdown
    for(f = 0; f<g.length; f++){
      g[f].onclick = function(event){
        l = findAncestor(event.currentTarget, "dropdown");
        l.getElementsByTagName("div")[0].innerHTML = event.currentTarget.innerHTML;
        
        if(event.currentTarget.getAttribute("data-value")){
          l.value = event.currentTarget.getAttribute("data-value");
        }
        else{
          l.value = event.currentTarget.innerHTML;
        }
        
        l.dispatchEvent(dropdownValueChanged);
      }
    }
  }
  // find closest ancestor with class cls
  function findAncestor (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
  }
  
  var alertelement = document.registerElement('x-alert', {
  prototype: Object.create(HTMLDivElement.prototype),
  extends: 'div'});
  
  function callback(id){
    document.getElementById(id).parentNode.parentNode.parentNode.parentNode.removeChild(document.getElementById(id).parentNode.parentNode.parentNode);
  }
  function makeid(len)
  {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for( var i=0; i < len; i++ ){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
  }

  //time - seconds
  function createAlert(text, time){
    t = "<button></button><span>" + text + "</span><span><div><div></div></div></span>";
    prgid = makeid(10);
    ddd = document.createElement('x-alert');
    ddd.innerHTML = t;
    ss = ddd.getElementsByTagName('span')[1].getElementsByTagName("div")[0].getElementsByTagName("div")[0];
    ss.style.transitionDuration = time + "s";
    ss.id = prgid;
    ss.style.width = "100%";
    document.getElementsByClassName("alertcontainer")[0].insertBefore(ddd,document.getElementsByClassName("alertcontainer")[0].firstChild);
    ddd.getElementsByTagName("button")[0].onclick = function(e){callback(e.currentTarget.parentNode.getElementsByTagName('span')[1].getElementsByTagName("div")[0].getElementsByTagName("div")[0].id)};
    (function(b){setTimeout(function(){callback(b);}, Number(time)*1000);})(prgid);
    (function(b){setTimeout(function(){document.getElementById(b).parentNode.parentNode.parentNode.style.opacity="0";}, (Number(time)*1000)-400);})(prgid);
    (function(b){setTimeout(function(){document.getElementById(b).style.width = "0%";},0);})(prgid);
  }