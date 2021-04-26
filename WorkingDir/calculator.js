


var c = displayController("display");  // This way I create a object of functions with a lexical context of "toDisplay"
var converter = stringToExpression();
var finalResult = function() {
	try {
		var i2p = infix2prefix(converter(c.readFromDisplay()));
		var result = evaluate(i2p);
		console.log(i2p + " === " + result);
		c.setDisplay(result);
		return 0;
	}
	catch {
		return 1;
		}
}

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


/********************************************************************************************************************/
/*******************************    ENGINE    ***********************************************************************/

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


function infix2prefix(inputList) {
	var stack = ["$"],
		outList = [],
		inLst = inputList.unshift("$");   // BUG MISUNDERSTANDING   inLst == 4, UNSHIFT returns a length of new list
	
	var operators = "+-x*/",
		special = "()+-x/*";
	var priorities = { "+": 10,
					   "-": 10,
					   "x": 20,
					   "/": 20,
					   "*": 20}; // object maping priorities with operators. ("+" in priorities) ? true : false; is a valid construction
	var currentItem = 0;  //currently processed element for debugging
	var stackCurrent = 0; // stackPeep for debugging purposes
	function isOperator(arg) {
		var temp = operators.indexOf(arg) === -1 ? false : true;
		console.log("isOPerator.arg = " + arg + "  result = " + temp);
		return operators.indexOf(arg) === -1 ? false : true;
	}  //isOperator
	
	function whatPrio(arg) {
		if (isOperator(arg)) {
			console.log("whatPrio = " + Number(priorities[arg]));
			return Number(priorities[arg]);
		} else {
			console.log("whatPrio = 0");
			return 0;
		}
	} //whatPrio
	
	function stackPeep() {
		let t = stack.length -1;
		let temp = stack[t];  //debugg  !!!!  return stack[stack.length -1] was undefined. Why??
		return temp;
	}  // stackPeep
	
	console.log("i2p.input = " + inputList);
	console.log("i2p.inLst = " + typeof inLst);
	try {
		for (var i=(inputList.length - 1); i>=0; i--) {    // 0) for each element from right to left do:
			currentItem = inputList[i];
			stackCurrent = stackPeep();
			if (isNaN(Number(inputList[i])) === false) {      // 1) if item is a number add it to the begining of the list
				outList.unshift(Number(inputList[i]));
			} else if (inputList[i] === ")") {
				stack.push(inputList[i]);
			} else if (isOperator(inputList[i])) {  // 3) if an item is an operator then pop from stack and push them to outList as long as they have prio higher or equal to an item
				while (isOperator(stackPeep()) && (whatPrio(stackPeep()) >= whatPrio(inputList[i]))) {
					outList.unshift(stack.pop());
				} // while
			stack.push(inputList[i]);  // 4) push item (operator) to the stack
			} else if (inputList[i] === "(") {
				while (stackPeep() !== ")") {
					if (stackPeep() === ")") {console.log(" stackPeep is ) ");}
					console.log("stack here is : " + String(stack));
					if (!isOperator(stackPeep()) || stackPeep() === "$") { throw "syntaxError ')' " + stackPeep();}  // if stack is empty "$" or there is anything that is not an operator or ")" report bad syntax
					outList.unshift(stack.pop());  // 5) if an item is an "(" then remove from stack all operators till ")" is encountered
			}
				stack.pop();   // 
			} // else if
			if ((i === 0) && stack.length > 1) {  // 6) If there was no () at beging or end of expression empty stack of all operators
				while (stack.length > 1) {   // stack can be length 1 because of special value $
					outList.unshift(stack.pop());
				}
			}  // if i===0 && stack.length > 1 
			console.log("End of iteration " + i + " Stack is: " + String(stack));
		}   // for i
		return outList;
	} // try
	catch(err) {
		return err;
		}
	
} // infix2prefix


function evaluate(inputList) {
	var operandStack = [];
	var operators = "+-*/x";
	var isSyntaxError = false;
	var elementA = 0,
		elementB = 0,
		partialResult = 0;  // elements for operations on values from stack
	
	function isOperand(arg) {
		var result = false;
		if (operators.indexOf(arg) === -1) { return true; }
		else { return false; }
	} // isOperator
	
	function myEval(arg1, arg2, op) {
		var result = 0;
		switch(op) {
			case "+":
				result = arg1 + arg2;
				break;
			case "-":
				result = arg2 - arg1;
				break;
			case "/":
				result = arg2 / arg1;
				break;
			case "x":
				result = arg1 * arg2;
				break;
			case "*":
				result = arg1 * arg2;
		} // switch
		return result;		
	}  // myEval
	
	for (var i = inputList.length - 1; i >=0; i--) {
		try {
			if (isOperand(inputList[i])) { 
				operandStack.push(inputList[i]); 
			} // if 
			else {
				elementA = operandStack.pop();
				elementB = operandStack.pop();
				partialResult = myEval(elementB, elementA, inputList[i]); 
				console.log("PARTIAL RESULT : ", partialResult);
				if (isNaN(partialResult)) { throw "syntaxError";}
				operandStack.push(partialResult);	
			}// else  -> if isOperand(inputList...
		} // try
		catch(err) {
			isSyntaxError = true;
		} // catch
	}   // for
	if (!isSyntaxError) { return operandStack.pop(); }
	else {
		console.log("Evluation gives an error");
		return "Error"; }
	
} // evaluate























		