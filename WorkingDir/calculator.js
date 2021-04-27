


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
			console.trace(err)
		} // catch
	}   // for
	if (!isSyntaxError) { return operandStack.pop(); }
	else {
		console.log("Evluation gives an error");
		return "Error"; }
	
} // evaluate























		