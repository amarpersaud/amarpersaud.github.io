  colordropdown = document.getElementById("mainColorDropdown");
  colordropdown.addEventListener("dropdownValueChanged", setmaincolor, false);
  colorbutton = colordropdown.getElementsByTagName("div")[0];
  //Change color on dropdown select
  newval = document.querySelectorAll('[data-value="'+document.main_color+'"]')[0];
  colordropdown.value = newval.value;
  colorbutton.innerHTML = newval.innerHTML;
  document.getElementById("loading").parentNode.removeChild(document.getElementById("loading"));
  function setmaincolor(e){ maincolor(e.currentTarget.value);}
  
  function saveSettings(){
    createCookie("maincolor", colordropdown.value);
  }