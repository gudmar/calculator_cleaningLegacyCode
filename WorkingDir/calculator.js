


var c = displayController("display");  // This way I create a object of functions with a lexical context of "toDisplay"
var converterInstance = new StringToExpression()
var converter = converterInstance;
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

class Calculator{
	constructor(){
		this.validator = new StringExpressionValidator()
		this.infixToPrefixConverter = new InfixToPrefix();
		this.expressionStringToListConverter = new StringToExpression();
		this.bracketAdder = new NestedExpressionInserter();
	}
	validateExpression(expressionAsString){
		return this.validator.validate(expressionAsString)
	}
	convertInfixToPrefix(expressionAsListOfCharacters) {
		return this.infixToPrefixConverter.convert(expressionAsListOfCharacters)
	}
	convertStingToListOfChars(expressionAsString) {
		return this.expressionStringToListConverter.convert(expressionAsString)
	}
	compute(expressionAsString){
		if (!this.validateExpression(expressionAsString)) return 'Error'
		let expressionAsList = this.convertStingToListOfChars(expressionAsString);
		let expressionWithAddedBrackets = this.bracketAdder.addBrackets(expressionAsList)
		let expressionInPrefixNotation = this.convertInfixToPrefix(expressionWithAddedBrackets)
		
		console.log(expressionAsList)
		console.log(expressionInPrefixNotation)
		return evaluate(expressionInPrefixNotation.map((item)=>{return isNaN(item)?item:parseFloat(item)}))
	}
}




function evaluate(inputList) {
	var operandStack = [];
	var operators = "+-*/x";
	var isSyntaxError = false;
	var elementA = 0,
		elementB = 0,
		partialResult = 0;  // elements for operations on values from stack
	let isOperator = function(character) {return Array.from(operators).indexOf(character) == -1 ? false : true}
	let isOperand = function(character) { return !isOperator(character)}
	console.log(inputList.toString());
		
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
		console.log(result)
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
				console.log(elementA); console.log(elementB)
				partialResult = myEval(elementB, elementA, inputList[i]); 
				console.log(`PARTIAL RESULT: ${elementA} ${inputList[i]} ${elementB} : ${partialResult}`);
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























		