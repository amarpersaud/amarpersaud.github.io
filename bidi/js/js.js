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
  
    
  searchbarid = "searchbox";
  searchbuttonid = "search-button";
  searchbar = document.getElementById(searchbarid);
  searchbutton = document.getElementById(searchbuttonid);
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
