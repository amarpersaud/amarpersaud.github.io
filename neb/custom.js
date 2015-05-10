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