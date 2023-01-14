var txt;
searchstring = decodeURIComponent(GetURLParameter("q"));
resultcontainer = document.getElementById('results');
searchbar.value = searchstring;
counter = document.getElementById("count");
titleelement = document.getElementsByTagName("title")[0];
titleelement.innerHTML = "A.P. Search - " + searchstring;

var loadedPages = [];
var pid = 0;

function findSearchResults(){
  resultcontainer.innerHTML = "";
  
  var idx = lunr(function () {
      this.field('Title', { boost: 10 });
      this.field('URI');
      this.field('Desc');
      this.field('Keywords');
      this.ref('Id');
	  console.log(loadedPages);
	  
	  loadedPages.forEach(function (doc) {
		this.add(doc)
	  }, this);
  });
  
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
    resultcontainer.innerHTML += "<li><a href='"+ loadedPages[x[i].ref].URI +"'><span>" + loadedPages[x[i].ref].Title + "</span><span>" + loadedPages[x[i].ref].URI + "</span><span>" + loadedPages[x[i].ref].Desc + "</span></a></li>";
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

function addSearchResults(arg){
	loadedPages = arg.data;
	for(i=0;i<arg.data.length;i++){
		if(arg.data[i].Id >= pid){
			pid=arg.data[i].Id+1;
		}
	}
}
function addProjectSearchResults(arg){
	for(i=0;i<arg.data.length;i++){
		if(arg.data[i].IncludeInSearch){
			var newResult = {
				Title: (arg.data[i].hasOwnProperty("SearchTitle") ? arg.data[i].SearchTitle : arg.data[i].Title ),
				URI: arg.data[i].MainPage,
				Desc: arg.data[i].Desc,
				Keywords: arg.data[i].Keywords,
				Id: pid
			};
			loadedPages.push(newResult);
			pid = pid+1;
		}
	}
	findSearchResults();
}

getjson(addSearchResults, "search_index.json");
getjson(addProjectSearchResults, "projectlist.json");