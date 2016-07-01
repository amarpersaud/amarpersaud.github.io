var txt;
searchstring = decodeURIComponent(GetURLParameter("q"));
resultcontainer = document.getElementById('results');
searchbar.value = searchstring;
counter = document.getElementById("count");
titleelement = document.getElementsByTagName("title")[0];
titleelement.innerHTML = "A.P. Search - " + searchstring;
var idx = lunr(function () {
      this.field('Title', { boost: 10 });
      this.field('URI');
      this.field('Desc');
      this.ref('Id');
  });
function myFunction(arg){
  resultcontainer.innerHTML = "";
  txt = arg;
  for(i=0;i<arg.data.length;i++){
    idx.add(arg.data[i]);
  }
  x = idx.search(searchstring);
  if(x.length == 0){
    resultcontainer.innerHTML += "No results found.";
    counter.innerHTML = "Showing <b>0</b>-<b>0</b> of <b>0</b> for \"" + searchstring + "\"";  
  }
  else{
    upper = 1;
    if(x.length >=15){
      lower = 15;
    }
    else{
      lower = x.length;
    }
    total = x.length;
    counter.innerHTML = "Showing <b>" + upper + "</b>-<b>" + lower + "</b> of <b>" + total + "</b> for \"" + searchstring + "\"";
  }
  for(i=0;i<x.length && i<16;i++){
    resultcontainer.innerHTML += "<li><a href='"+ arg.data[x[i].ref].URI +"'><span>" + arg.data[x[i].ref].Title + "</span><span>" + arg.data[x[i].ref].URI + "</span><span>" + arg.data[x[i].ref].Desc + "</span></a></li>";
  }
}
function filter(arg){
  resultcontainer.innerHTML = "";
  x = idx.search(searchbar.value);
    for(i=0;i<x.length;i++){
      resultcontainer.innerHTML += "<li><a href='/a/?id="+ x[i].ref +"'>" + arg.data[x[i].ref].Name + "</a></li>";
    }
  titleelement.innerHTML = "A.P. Search - " + searchbar.value;
}
getjson(myFunction, "search_index.json");