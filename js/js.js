  
  /* elements */
  
  searchbarid = "searchbox";
  searchbuttonid = "search-button";
  searchbar = document.getElementById(searchbarid);
  searchbutton = document.getElementById(searchbuttonid);
  
  /* Functions */
  
  Number.prototype.clamp = function(min, max) {
      return Math.min(Math.max(this, min), max);
  };
  function showElem(elem){
	elem.setAttribute("style","visibility: visible; opacity: 1;");
  }  
  function hideElem(elem){
	elem.setAttribute("style","visibility: hidden; opacity: 0; display:none;");
  }
  // find closest ancestor with class cls
  function findAncestor (el, cls) {
    while ((el != null) && !el.classList.contains(cls) && (el = el.parentElement));
    return el;
  }
  //Get parameter from URL
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
  
  //Get json from url and process in function func
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
  
  //Redirect to search 
  function search(text){
      location.href = "search?q=" + encodeURIComponent(text);
  }
  
  
  /* run on load */

  // Bind to onkeyup and onclick to search function
  searchbar.onkeyup = function(){
    if (event.keyCode == 13){
      search(searchbar.value);
    }
  }
  searchbutton.onclick = function(){
    search(searchbar.value);
  }
   
  var navopen = false;
   
  document.getElementsByClassName("openbutton")[0].onclick = function(){
    navigation = document.getElementsByClassName("nav")[0].getElementsByTagName("ul")[0];
    if(navigation.style.display=="block"){
      navigation.style.display="none";
      navopen = false;
    }
    else{
      navigation.style.display="block";
      navopen = true;
    }
  };


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
    document.getElementById(pgid).style.className = "active";
  }
  
  
  //Detect click to close if clicking off the dropdown
  document.onmousedown = function(event){
	//get list of dropdowns
	var s = document.querySelectorAll(".dropdown");		

	//Find clicked dropdown
	var dd = findAncestor(event.target, "dropdown");
	
	if(dd != null){	
		for(p=0; p < s.length; p++){				// close all dropdowns	
			if(s[p] != dd){
				s[p].setAttribute("active", 0);
				s[p].querySelector("ul").setAttribute("style", "visibility: hidden; opacity: 0;");
			}
		}
	}
	else{	
		for(p=0; p<s.length; p++){				// close all dropdowns	
			s[p].setAttribute("active", 0);
			s[p].querySelector("ul").setAttribute("style","visibility: hidden; opacity: 0;");
		}
	}
	
    if(navopen && (!(event.target.classList.contains("openbutton")) && !(findAncestor(event.target, "openbutton"))) && (!(event.target.classList.contains("nav")) && !(findAncestor(event.target, "nav")))){
      document.getElementsByClassName("nav")[0].getElementsByTagName("ul")[0].style.display="none";
    }
  }
  var dropdownValueChanged = new CustomEvent('dropdownValueChanged');
  
  // Bind onclick for dropdowns to toggle their menus and change their values when something is selected.
  s = document.getElementsByClassName("dropdown");
  
  for(i=0; i<s.length; i++){
    s[i].setAttribute("active", 0);
	
	var items = s[i].querySelector("ul").querySelectorAll("li");	//Find each li in the list
	var dropdownButton = s[i].querySelector("div");				//Find the button
	
	if(items.length > 0){
		firstItem = items[0].querySelector("a");					//Find the first item
		
		
		dropdownButton.setAttribute("defaultClass", dropdownButton.getAttribute("class"));											//Cache the button's class in defaultClass attribute
		
		if(firstItem.hasAttribute("data-cs")){
			dropdownButton.setAttribute("class",dropdownButton.getAttribute("defaultClass") + " " + firstItem.getAttribute("data-cs")); //Add on the first item's data-cs attribute to the class
		}
		
		dropdownButton.innerHTML = firstItem.innerHTML;																				// Pull the text from the first item	
		if(firstItem.hasAttribute("data-value")){
			s[i].setAttribute("value", firstItem.getAttribute("data-value"));														// set the default value to the first item's value		
		}
		else{			
			s[i].setAttribute("value", firstItem.innerHTML);		
		}
	}
    // open and close the menu when the button is clicked or an item is selected.
    s[i].onclick = function(event){
      if(event.currentTarget.getAttribute("active")==1){
        event.currentTarget.setAttribute("active", 0);
        event.currentTarget.querySelector("ul").setAttribute("style","visibility: hidden; opacity: 0;");
      }
      else{
        event.currentTarget.setAttribute("active", 1);
        event.currentTarget.querySelector("ul").setAttribute("style","visibility: visible; opacity: 1;");
      }
    }
	var maxWidthItem = -1;
    // for all 'a' tags, add an onclick event to change the text and value of the dropdown
    for(f = 0; f < items.length; f++){
	  if(items[f].querySelector("a").offsetWidth  > maxWidthItem){
		maxWidthItem = items[f].querySelector("a").offsetWidth;
	  }
      items[f].querySelector("a").onclick = function(event){
        var dd = findAncestor(event.currentTarget, "dropdown");							//Find associated dropdown
        
		var ddb = dd.querySelector("div");
		
		ddb.innerHTML = event.currentTarget.innerHTML; 			//Get selected item text
        
        if(event.currentTarget.hasAttribute("data-value")){
			dd.setAttribute("value", event.currentTarget.getAttribute("data-value"));					//use data-value attribute if available
        }
        else{
			dd.setAttribute("value", event.currentTarget.innerHTML);										//otherwise use innerHTML	
        }
        
		if(event.currentTarget.hasAttribute("data-cs")){
			ddb.setAttribute("class", ddb.getAttribute("defaultClass") + " " + event.currentTarget.getAttribute("data-cs")); //Add on the item's data-cs attribute to the class
		}
		
        dd.dispatchEvent(dropdownValueChanged);				//Trigger custom event
        if ("createEvent" in document) {					//Trigger onchange event: https://stackoverflow.com/questions/2856513/how-can-i-trigger-an-onchange-event-manually
			var evt = document.createEvent("HTMLEvents");
			evt.initEvent("change", false, true);
			dd.dispatchEvent(evt);
		}
		else
			dd.fireEvent("onchange");
      }
    }
	var style = dropdownButton.currentStyle || window.getComputedStyle(dropdownButton);
	var horizontalPadding = parseInt(style.paddingLeft) + parseInt(style.paddingRight);
	dropdownButton.setAttribute("style", "min-width: " + (maxWidthItem-24).toString() + "px !important");
  }
  