let allProjects = [];
let projectImportanceDropdown = document.querySelector("#projectImportance");
let projectTypeDropdown = document.querySelector("#projectType");

function filterProjectList(e){
	var template = document.querySelector("#projecttemplate");
	
	//Count for number of projects in each category
	var numActiveProjects = 0;
	var numInactiveProjects = 0;
	var numCompletedProjects = 0;
	
	var completedProjectList = document.querySelector("#CompletedProjectList");
	var activeProjectList = document.querySelector("#ActiveProjectList");
	var inactiveProjectList = document.querySelector("#InactiveProjectList");
	
	completedProjectList.innerHTML = "";
	activeProjectList.innerHTML = "";
	inactiveProjectList.innerHTML = "";


	var selectedImportance = projectImportanceDropdown.getAttribute("value");
	var selectedType = projectTypeDropdown.getAttribute("value");

	//Filter by each input
	var validprojects = [];
	
	for(i = 0; i < allProjects.length; i++){
		var proj = allProjects[i];
		//If the project has current selected importance or all importances allowed, keep going, otherwise skip to next project.
		if(!(selectedImportance == proj.Importance.toLowerCase() || selectedImportance == "all")){
			continue;
		}
		
		var projecttags = proj.Tags;
		for(j = 0; j < projecttags.length; j++){
			projecttags[j] = projecttags[j].toLowerCase();
		}
		
		//If the project has current selected type or all types allowed, keep going, otherwise skip to next project.
		if(!(projecttags.includes(selectedType) || selectedType == "all")){
			continue;
		}
		
		validprojects += proj;
		//it meets the criteria. add it.
		var projectclone = template.content.cloneNode(true);
		projectclone.querySelector("h2").innerHTML = allProjects[i].Title;											//set project title
		var sp = projectclone.querySelectorAll("span");																//Find span elements
		sp[0].querySelector("i").setAttribute("class", sp[0].querySelector("i").getAttribute("class") + " " + proj.ProjectIcon);	//add project icon
		for(j = 0; j < proj.TechnologyIcons.length; j++){															//Add each technology icon
			var newicon = document.createElement("i");
			newicon.setAttribute("class",  "projecticon t " + proj.TechnologyIcons[j]);
			sp[1].innerHTML += "  ";
			sp[1].appendChild(newicon);
		}
		projectclone.querySelector("div").querySelector("p").innerHTML += proj.Desc;							//Add description
		for(j = 0; j < proj.Buttons.length; j++){																	//Add buttons
			var newbutton = document.createElement("a");
			newbutton.setAttribute("class",  "button template-color");
			newbutton.setAttribute("href", proj.Buttons[j].Link);
			newbutton.setAttribute("tooltip", proj.Buttons[j].Tooltip);
			newbutton.innerHTML = proj.Buttons[j].Text;
			projectclone.querySelector("div").querySelector("div").appendChild(newbutton);
		}
		
		switch(proj.Status){
			case "Active":
				numActiveProjects++;
				activeProjectList.appendChild(projectclone);
				break;
			case "Inactive":
				numInactiveProjects++;
				inactiveProjectList.appendChild(projectclone);
				break;
			case "Complete":
				numCompletedProjects++;
				completedProjectList.appendChild(projectclone);
				break;
			default:
				console.log("Failed to add project; invalid status");
				break;
		}
	}
	if(numCompletedProjects == 0){
		hideElem(document.querySelector("#CompletedProjectContainer"));
	}
	else{
		showElem(document.querySelector("#CompletedProjectContainer"));
	}
	
	if(numInactiveProjects == 0){
		hideElem(document.querySelector("#InactiveProjectContainer"));
	}
	else{
		showElem(document.querySelector("#InactiveProjectContainer"));
	}
	
	if(numActiveProjects == 0){
		hideElem(document.querySelector("#ActiveProjectContainer"));
	}
	else{
		showElem(document.querySelector("#ActiveProjectContainer"));
	}
}


function getProjectList(arg){
	allProjects = arg.data;
	filterProjectList(0);
}

projectImportanceDropdown.addEventListener("change", filterProjectList);
projectTypeDropdown.addEventListener("change", filterProjectList);

getjson(getProjectList, "projectlist.json");