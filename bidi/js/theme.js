function maincolor(color){document.getElementById("theme").href = "css/theme/"+color+".min.css";}function createCookie(n,v){var d=new Date();d.setYear(d.getYear()+100);d=d.toGMTString();var e=";expires="+d;document.cookie=n+"="+v+e+";path=/";}function readCookie(n){var Q=n+"=";var ca=document.cookie.split(';');for(var i=0;i < ca.length;i++){var c=ca[i];while(c.charAt(0)==' ')c = c.substring(1,c.length);if (c.indexOf(Q) == 0)return c.substring(Q.length,c.length);}return null;}document.main_color = readCookie("maincolor");if(document.main_color){maincolor(document.main_color);}else{createCookie("maincolor", "primary");document.main_color = "primary";maincolor("primary");}