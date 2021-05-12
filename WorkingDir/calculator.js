
class Calculator{
	constructor(nrOfDigitsAfterComma){
		this.validator = new StringExpressionValidator()
		this.infixToPrefixConverter = new InfixToPrefix();
		this.expressionStringToListConverter = new StringToExpression();
		this.bracketAdder = new NestedExpressionInserter();
		this.operators = "+-*/";
		this.nrOfDigitsAfterComma = nrOfDigitsAfterComma;
	}


	compute(expressionAsString){
		if (!this.validateExpression(expressionAsString)) return 'Error'
		let expressionAsList = this.convertStingToListOfChars(expressionAsString);
		let expressionWithAddedBrackets = this.bracketAdder.addBrackets(expressionAsList)
		let expressionInPrefixNotation = this.convertInfixToPrefix(expressionWithAddedBrackets)
		let result = this.evaluate(expressionInPrefixNotation.map((item)=>{return isNaN(item)?item:parseFloat(item)}))
		return this.nrOfDigitsAfterComma === undefined ? result : this.round(result)
	}

	round(result){
		let multiplier = Math.pow(10, this.nrOfDigitsAfterComma);
		return Math.round(parseFloat(result)*multiplier)/multiplier;
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


	isUnasigned(arg1, arg2, operator){
		if (arg1 == undefined || arg2 == undefined) return true;
		if (operator == '/' && Math.abs(arg1) == Infinity) return true;
		if (operator == '*' && Math.abs(arg1) == 0 && Math.abs(arg2) == Infinity) return true;
		if (operator == '*' && Math.abs(arg2) == 0 && Math.abs(arg1) == Infinity) return true;
		if (Math.abs(arg1) == Infinity && Math.abs(arg2) == Infinity) {
			if (operator == '-' || operator == '/') return true 
		}
		return false;
	}


	evaluataSingleOperation(arg1, arg2, operator){
		if (this.isUnasigned(arg1, arg2, operator)) return undefined
		switch(operator) {
			case "+": return arg1 + arg2;
			case "-": return arg2 - arg1;
			case "/": return arg2 / arg1;
			case "*": return arg1 * arg2;
		}
	}

	isOperator(character) {return Array.from(this.operators).indexOf(character) == -1 ? false : true}
	isOperand(character) { return !this.isOperator(character)}



	evaluate(prefixExpressionAsList) {
		let operandStack = new Stack();
		let evaluateSingleOperationAndHandleState = function(item, index){
			if (this.isOperand(item)) {
				operandStack.push(item);
			}
			else {
				let elementA = operandStack.pop();
				let elementB = operandStack.pop();
				let partialResult = this.evaluataSingleOperation(elementB, elementA, item);
				if (partialResult == undefined) return undefined
				if (isNaN(partialResult)) return "Error"
				operandStack.push(partialResult);
			}
		}.bind(this)

		prefixExpressionAsList.reverse().forEach(evaluateSingleOperationAndHandleState)

		return operandStack.pop()
	} 
}























		