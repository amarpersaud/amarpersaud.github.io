let allProjects = [];

function filterProjectList(){
	var template = document.querySelector("#projecttemplate");
	
	//Count for number of projects in each category
	var numActiveProjects = 0;
	var numInactiveProjects = 0;
	var numCompletedProjects = 0;
	
}


function getProjectList(arg){
	allProjects = arg;
	filterProjectList();
}

getjson(getProjectList, "projectlist.json");