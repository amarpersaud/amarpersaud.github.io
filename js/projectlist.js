
function filterProjectList(){
	
	console.log("filtering projects");
}


function getProjectList(arg){
	console.log("Loaded json");
	filterProjectList();
}

getjson(getProjectList, "projectlist.json");