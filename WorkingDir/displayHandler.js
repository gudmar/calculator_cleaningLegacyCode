
function displayController(resultHandler) {
	var toDisplay = "0";
	function pushToDisplay(str){
		try {
			var displayContent = document.getElementById(resultHandler).value;
			if (displayContent === "0") {
				displayContent = str;
			} else {
				displayContent = displayContent.concat(str);
			}
			document.getElementById(resultHandler).value = displayContent;
			//toDisplay = displayContent;
			console.log("pushToDisplay.(\"trying to push {" + str +"} to display\")");
			console.log("pushToDisplay.toDisplay = " + toDisplay);
			toDisplay = displayContent;
			return 0;
		}
		catch(err) {
			window.alert("Error(pushToDisplay) : " + err.message);
			return 1;
		}
	}  // pushToDisplay
	function reading(){ try { toDisplay = document.getElementById(resultHandler).value;
							 console.log("readFromDisplay.toDisplay = " + toDisplay);
							 return toDisplay;
							}
						catch(err) { window.alert("Error(readFromDisplay) : " + err.message);
									 return Number(1);
									}
					  }
	return {
		addToDisplay: function(s=""){ reading();
										pushToDisplay(s);},
		readFromDisplay: function(){ return reading();},
							
		setDisplay: function(s="0"){ try { document.getElementById(resultHandler).value = s;
										   console.log("setDisplay.toDisplay = " + toDisplay);
										  toDisplay = s;
										  return Number(0);
										}
										catch(err) {
											window.alert("Error(setDisplay) : " + err.message);
											return Number(1);
										}
									},
		removeLastFromDisplay: function(){ try {reading(); 
												console.log("removeLastFromDisplay.(toDisplay.length) = " + toDisplay.length + " type: " + typeof toDisplay);
												console.log("removeLastFromDisplay.(toDisplay) = " + toDisplay);
												toDisplay = toDisplay.substring(0, toDisplay.length - 1);
												if (toDisplay.length === 0) {
													toDisplay = "0";
												}
												document.getElementById(resultHandler).value = toDisplay;
												return Number(0);
											   }
										  catch(err) {
											  console.log("Error(removeLastFromDisplay) : " + err.message);
											  return Number(1);
										  }
										 }
		
	
	}  // return
		
	
}     //calculator

function gloVars() {
	for (var b in window) {
		if(window.hasOwnProperty(b)) console.log(b);
	}
}