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
    alert("getting");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArg = JSON.parse(xmlhttp.responseText);
            alert("funcing");
            func(myArg);
        }
    };
    alert("opening");
    xmlhttp.open("GET", url, true);
    alert("sending");
    xmlhttp.send();
  }