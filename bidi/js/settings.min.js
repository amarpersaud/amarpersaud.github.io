  colordropdown = document.getElementById("mainColorDropdown");
  colordropdown.addEventListener("dropdownValueChanged", setmaincolor, false);
  colorbutton = colordropdown.getElementsByTagName("div")[0];
  //Change color on dropdown select
  newval = document.querySelectorAll('[data-value="'+document.main_color+'"]')[0];
  colordropdown.value = newval.value;
  colorbutton.innerHTML = newval.innerHTML;
  console.log(document.main_color);
  console.log(newval.innerHTML);
  function setmaincolor(e){ maincolor(e.currentTarget.value);}
  
  function saveSettings(){
    createCookie("mainColor", colordropdown.value);
    alert("Settings Saved");
  }