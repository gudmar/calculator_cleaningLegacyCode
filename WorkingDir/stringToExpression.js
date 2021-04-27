function stringToExpression() {
	//var history; // an object containing pares: strInput, strOutput
	return convert = function(strInput){
		console.log(" 2.3.4 is " + isNaN(Number('2.3.2')));
		if (strInput.length > 0) {
			var numberBeingConverted = "",
		    	syntaxError = false; // was a syntax error detected?
			var result = [];
			console.log("stringToExpression.LengthOfString = " + strInput.length);
			for (var i = 0; i < strInput.length; i++) {
				if (isNaN(Number(strInput[i])) && (strInput[i] !== ".")) {
					if (numberBeingConverted !== "") {
						try {   // cannot convert - syntax went wrong -> eg two dots in one expresion
							let currentConversion = Number(String(numberBeingConverted));
							if (isNaN(currentConversion)) { throw "SyntaxErr!";}
								else {
							result.push(currentConversion)
							result.push(strInput[i]);
							numberBeingConverted = "";
							}
						}
						catch(err) { syntaxError = true;}
					}  // if (numberBeingConverted ...
					else {
						result.push(strInput[i]);
					}
				}  // if (isNaN)Number(strInput[i] ...
				else {  // strInput[i]  is a number
					numberBeingConverted += strInput[i];	
				} // else  -> so strInput[i] is a number			
			} // for strInput
			if (numberBeingConverted !== "") {
				try {if (isNaN(numberBeingConverted)) {throw "SyntacErr";} 
					else {result.push(numberBeingConverted);}  // if last element to be converted is a number it will be converted here
					}  //try
			    catch(err) {syntaxError = true;}
		   }  // if mumberBeingConverted!== ...
			if (syntaxError) {return "SyntaxError";} else { return result; }
		} else  { // if strInput.lenght > 0
			return "";
		}			
		}
		//return convert(s);
} //strToExpresion