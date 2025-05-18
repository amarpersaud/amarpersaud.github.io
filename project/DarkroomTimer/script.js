           /**
             * Enum for step duration types: seconds and times
             * @readonly
             * @enum {{name: string, hex: string}}
             */
            const StepDurationType = Object.freeze({
                SECONDS:   "seconds",
                TIMES:  "times",
                INVERSIONS: "inversions"
            });
            Object.freeze(StepDurationType);

            //current counter for step ids. incremented to avoid conflicting ID assignment.
			var current_step_id = 0;

            //Which step is currently being edited
            var current_editing_step_id = -1;

            //If true, editing is enabled and editor buttons are made visible
            var editing_enabled = true;
			
			var depth_limit = 3;
			
			
            ///Step in development process
            class DevelopmentStep{
				step_id = 0;
                step_type = "Chemical";
                step_name = "DefaultStepName"; 
                step_duration = 60;  //duration in seconds of entire step. Will clip/end even if substeps take longer.
                
				step_repeat_enabled = false;
				step_repeat_until_end = false;  //only matters if repeating
                step_frequency = 30;            //How frequently to repeat in seconds

                step_temperature = 20;  //20C

                sub_steps = [];
				
				step_parent = null;
				
                constructor(id, type, name, duration, repeat_enabled, repeat_until_end, freq, temperature, sub_steps){
                    this.step_id = id;
					this.step_type = type;
                    this.step_name = name;
                    this.step_duration = duration;
                    this.step_repeat_enabled = repeat_enabled;
                    this.step_repeat_until_end = repeat_until_end;
                    this.step_frequency = freq;
                    this.step_temperature = temperature;
                    this.sub_steps = sub_steps;
                }

                find_element_by_id(step_id){
                    if(this.step_id == step_id){
                        return this;
                    }
                    for(let i = 0; i < this.sub_steps.length; i++){
                        let q = this.sub_steps[i].find_element_by_id(step_id);
                        if(q != null){
                            return q;
                        }
                    }
                    return null;
                }
				
				remove_element_by_id(step_id){
					for(let i = 0; i < this.sub_steps.length; i++){
						if(this.sub_steps[i].step_id == step_id){
							this.sub_steps.splice(i, 1);		//delete element
							return;
						}
						this.sub_steps[i].remove_element_by_id(step_id);
					}
				}
				
				//nesting level. Return parent's depth + 1 (0 if no parent => root node).
				get_depth(){
					if(this.step_parent == null){
						return 0;
					}
					return this.step_parent.get_depth() + 1;
				}
				
            }

            var RootStep = new DevelopmentStep(-1, "", "", 0, false, false, 0, 20, []);
			
			/* get the index in the list of a step by its id */
			function index_of_step_id(step_id){
				for(let i = 0; i < RootStep.sub_steps.length; i++){	//loop through elements	
					if(RootStep.sub_steps[i].step_id == step_id){		//if id matches
						return i;  
					}
				}
				return -1;
			}

            function recurse_find_step_id(itm, step_id){
                if(itm.step_id == step_id){
                    return itm;
                }
                for(let i = 0; i < RootStep.sub_steps.length; i++){
                    let q = recurse_find_step_id(RootStep.sub_steps[i], step_id);
                    if(q != null){
                        return q;
                    }
                }
                return null;
            }

			/*--------- Input events ----------*/
			
			/* Save edited values to currently selected step */
			function step_save_edit_clicked(){
				let itm = RootStep.find_element_by_id(current_editing_step_id);
				               
  			    let new_step_name = document.getElementById("step_name_edit").value;
                let new_step_duration = document.getElementById("step_duration_edit").value;

                let new_step_type = document.getElementById("step_type_edit").value;
                let new_step_frequency = document.getElementById("step_frequency_edit").value;
                let new_step_frequency_duration = document.getElementById("step_frequency_duration_edit").value;

                let new_repeat_enabled = document.getElementById("step_repeat_edit").checked;
                let new_repeat_until_end = document.getElementById("step_repeat_until_end_edit").checked;
                let new_step_temp = document.getElementById("step_temperature_edit").value;
				
				itm.step_name = new_step_name;
				itm.step_duration = new_step_duration;
				
				itm.step_type = new_step_type;
				itm.step_frequency = new_step_frequency;
				itm.step_frequency_duration = new_step_frequency_duration;
				
				itm.repeat_enabled = new_repeat_enabled;
				itm.repeat_until_end = new_repeat_until_end;
				itm.step_temperature = new_step_temp;
				
				refreshUI();
				
			}
			
			/* Button clicked to add new step */
            function step_add_edit_clicked(){
                let new_step_name = document.getElementById("step_name_edit").value;
                let new_step_duration = document.getElementById("step_duration_edit").value;

                let new_step_type = document.getElementById("step_type_edit").value;
                let new_step_frequency = document.getElementById("step_frequency_edit").value;
                let new_step_frequency_duration = document.getElementById("step_frequency_duration_edit").value;

                let new_repeat_enabled = document.getElementById("step_repeat_edit").checked;
                let new_repeat_until_end = document.getElementById("step_repeat_until_end_edit").checked;
                let new_step_temp= document.getElementById("step_temperature_edit").value;

				current_editing_step_id = current_step_id;
                add_step(new_step_name, new_step_type, new_step_duration, new_repeat_enabled, new_repeat_until_end, new_step_frequency, new_step_temp, []);
            }

            function step_repeat_enabled_changed(sender){
                let should_repeat  = sender.checked;
            }
			
			function move_up_clicked(step_id){
				//Find item
				let itm = RootStep.find_element_by_id(step_id);
				//Get parent of the item
				let parent = itm.step_parent;
				
				let ind = -1;
				
				//Go through each of the steps in the parent
				for(let i = 0; i < parent.sub_steps.length; i++){
					//Find the index of the step
					if(parent.sub_steps[i].step_id == step_id){
						ind = i;
					}
				}
				
				//Now that we've found it, make sure the index is >0 to be able to swap it.
				if(ind > 0){
					//swap the two
					let temp = parent.sub_steps[ind-1];
					parent.sub_steps[ind-1] = parent.sub_steps[ind];
					parent.sub_steps[ind] = temp;
				}
				refreshUI();
			}
			function move_down_clicked(step_id){
				//Find item
				let itm = RootStep.find_element_by_id(step_id);
				//Get parent of the item
				let parent = itm.step_parent;
				
				let ind = -1;
				
				//Go through each of the steps in the parent
				for(let i = 0; i < parent.sub_steps.length; i++){
					//Find the index of the step
					
					if(parent.sub_steps[i].step_id == step_id){
						ind = i;
					}
				}
				//Now that we've found it, make sure the index is >0 to be able to swap it.
				if(ind < parent.sub_steps.length - 1 && ind >= 0){
					//swap the two
					let temp = parent.sub_steps[ind+1];
					parent.sub_steps[ind+1] = parent.sub_steps[ind];
					parent.sub_steps[ind] = temp;
				}
				refreshUI();
			}
			
			/* button within step clicked */
			function step_edit_clicked(step_id){
                // pass right to editor function. this function could be bypassed.
				start_edit_step(step_id);   
				refreshUI();
			}
            
            /* Button to add a sub-step to the given step clicked*/
            function step_add_to_clicked(step_id){
                //Add blank / default step to the given step.
                let itm = RootStep.find_element_by_id(step_id);
                if(itm != null && itm.get_depth() < depth_limit){

					let new_step_name = document.getElementById("step_name_edit").value;
					let new_step_duration = document.getElementById("step_duration_edit").value;

					let new_step_type = document.getElementById("step_type_edit").value;
					let new_step_frequency = document.getElementById("step_frequency_edit").value;
					let new_step_frequency_duration = document.getElementById("step_frequency_duration_edit").value;

					let new_step_repeat_enabled = document.getElementById("step_repeat_edit").checked;
					let new_step_repeat_until_end = document.getElementById("step_repeat_until_end_edit").checked;
					let new_step_temp= document.getElementById("step_temperature_edit").value;

                /* todo: populate from boxes for continuous and freq type */
                    /* todo: populate from boxes for continuous and freq type */
                    let new_step = new DevelopmentStep(
                        current_step_id,
                        new_step_type,
                        new_step_name,
                        new_step_duration,
                        new_step_repeat_enabled,
                        new_step_repeat_until_end,
                        new_step_frequency,
                        new_step_temp,
                        []
                    );
					new_step.step_parent = itm;
					current_editing_step_id = current_step_id;
                    current_step_id = current_step_id + 1;
                    itm.sub_steps.push(new_step);
                }
				refreshUI();     
            }


			
			/*---------- Step functions ----------*/
			
			/* populate editor for a given step id */
			function start_edit_step(step_id){
				let itm = RootStep.find_element_by_id(step_id);
				console.log("editing step id: " + step_id.toString());				
				
				current_editing_step_id = step_id;
				
                //populate the inputs from the step

                document.getElementById("step_name_edit").value                    =      itm.step_name;                
                document.getElementById("step_duration_edit").value                =      itm.step_duration;  
                     
                document.getElementById("step_type_edit").value                    =      itm.step_type;        
                document.getElementById("step_frequency_edit").value               =      itm.step_frequency;                
                //document.getElementById("step_frequency_duration_edit").value      =      itm.step_frequency_duration;                    
                                                                                                             
                document.getElementById("step_repeat_edit").checked                =      itm.step_repeat_enabled;                
                document.getElementById("step_repeat_until_end_edit").checked      =      itm.step_repeat_until_end;                            
                document.getElementById("step_temperature_edit").value             =      itm.step_temperature;   
				
				refreshUI();

			}
				
			
			/* delete a step by id */
			function delete_step(step_id){
				RootStep.remove_element_by_id(step_id);
				console.log("deleting step " + step_id.toString());
				refreshUI();
			}
			

			/* Adds step to the list */

            function add_step(step_name, step_type, step_duration, step_repeat_enabled, step_repeat_until_end, step_frequency, step_temperature, step_sub_steps){
                let new_step = new DevelopmentStep(
					current_step_id,
                    step_type,
                    step_name,
                    step_duration,
                    step_repeat_enabled,
                    step_repeat_until_end,
                    step_frequency,
                    step_temperature,
                    step_sub_steps
                );
				
				new_step.step_parent = RootStep;

				current_step_id = current_step_id + 1;
				RootStep.sub_steps.push(new_step);
				refreshUI();
            }
			
			
			/* clear the ui list */
			function clear_ui_step_list(){
				let step_list_m = document.getElementById("main_step_list");
				step_list_m.innerHTML = "";
			}
			
			/* populates the ui list */
			function populate_ui_step_list(){
			
				for(let i = 0; i < RootStep.sub_steps.length; i++){
					let itm = RootStep.sub_steps[i];
                    let clon = build_step_HTML_recursive(itm, i);

					//Add to main list
					let addto = document.getElementById("main_step_list");
					addto.appendChild(clon);
				}
			}
            
            //Build a step HTML from tree given parent item, recursively.
            function build_step_HTML_recursive(itm, step_num){
					//Clone the template
					let temp = document.getElementById("step_template");
					let clon = temp.content.firstElementChild.cloneNode(true);
					
					//If this is the currently edited step
					if(itm.step_id == current_editing_step_id && editing_enabled){
						clon.setAttribute("class", "step edited_step")
					}

					//Insert properties
					clon.querySelector(".step_num").innerHTML = "[Step " + step_num.toString() + "] " + itm.step_name;
					clon.querySelector(".step_duration").innerHTML = "Duration - " + itm.step_duration.toString();
					clon.querySelector(".step_temp").innerHTML = "Temperature - " + itm.step_temperature.toString();
					let buttons = clon.querySelectorAll("button");

                    buttons[0].setAttribute("onclick", "move_up_clicked(" + itm.step_id+")");
                    buttons[1].setAttribute("onclick", "move_down_clicked(" + itm.step_id+")");
					buttons[2].setAttribute("onclick", "delete_step(" + itm.step_id+")");
					buttons[3].setAttribute("onclick", "step_edit_clicked(" + itm.step_id+")");
					buttons[4].setAttribute("onclick", "step_add_to_clicked(" + itm.step_id+")");
					
                    //Create and insert children into this node
                    for(let i = 0; i < itm.sub_steps.length; i++){
                        let child = build_step_HTML_recursive(itm.sub_steps[i], i);
                        clon.querySelector(".step_container").appendChild(child);
                    }  
                    return clon;
            }
			

			/* refresh the list from underlying data */
			function refreshUI(){
				clear_ui_step_list();
				populate_ui_step_list();
				if(RootStep.sub_steps.length == 0){
					document.getElementById("step_save_edit_button").disabled = true;	//disable save button because there is no step to edit
				}
				else{
					document.getElementById("step_save_edit_button").disabled = false;	//disable save button because there is no step to edit
				}
			}
