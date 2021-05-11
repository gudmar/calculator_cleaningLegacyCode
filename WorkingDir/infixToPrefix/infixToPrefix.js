
class InfixToPrefix {
	constructor() {
		this.stack = new Stack()
		this.output = [];
		this.operators = "()+-x/*";
		this.priorities = {
			"+": 10,
			"-": 10,
			"x": 20,
			"/": 20,
			"*": 20
		};
	}

	isOperator(character) {
		return Object.keys(this.priorities).includes(character);
	}

	getSymbolPriority(character) {
		return this.isOperator(character) ? Number(this.priorities[character]) : 0;
	}


	throwSyntaxErrorCloseBracketMissing() {
		if (!this.isOperator(this.stack.peep() || this.stack.peep() === "$")) {
			console.log('SyntaxError )')
			throw new SyntaxError(`${this.constructor.name}: ')' missing`)
		}
	}

	isANumber(val) { return !isNaN(Number(val)) }
	pushItemToBeginingOfList(item) { this.output.unshift(item) }

	repeatCallbackAsLongAsConditionIsMet(callback, conditionCallback, onErrorBeforeEachCall = () => { }) {
		while (conditionCallback()) {
			onErrorBeforeEachCall();
			callback()
		}
	}

	popFromStackUnshiftToList() {
		this.output.unshift(this.stack.pop())
	}

	isStackTopOperatorsPrioGreaterEqualThenCharactersPrio(character) {
		return this.isOperator(this.stack.peep()) && (this.getSymbolPriority(this.stack.peep()) >= this.getSymbolPriority(character))
	}

	isStackNotEmpty() { return !this.stack.isEmpty() }


	convertSingleCharacter(character, index, listOfItems) {
		if (this.isANumber(character)) {
			this.pushItemToBeginingOfList(character)
		} else if (character === ")") {
			this.stack.push(character)
		} else if (this.isOperator(character)) {
			this.repeatCallbackAsLongAsConditionIsMet(this.popFromStackUnshiftToList.bind(this),
				this.isStackTopOperatorsPrioGreaterEqualThenCharactersPrio.bind(this, character))
			this.stack.push(character)
		} else if (character == '(') {
			this.repeatCallbackAsLongAsConditionIsMet(this.popFromStackUnshiftToList.bind(this),
				() => { return this.stack.peep() != ')' },
				this.throwSyntaxErrorCloseBracketMissing.bind(this))
			this.stack.pop();
		}
		if ((index == listOfItems.length - 1) && (this.isStackNotEmpty())) {
			this.repeatCallbackAsLongAsConditionIsMet(this.popFromStackUnshiftToList.bind(this), this.isStackNotEmpty.bind(this))
		}
	}

	convert(expression) {
		try {
			let listCopy = [...expression]
			listCopy.reverse()
			listCopy.forEach(this.convertSingleCharacter.bind(this))
			return this.output;
		}
		catch (err) {

			return err;
		}
	}

}

function infix2prefix(inputList) {
	let converter = new InfixToPrefix();
	return converter.convert(inputList)
}

// function infix2prefix(inputList) {
// 	var stack = ["$"],
// 		outList = [];
// 	// inLst = inputList.unshift("$");   // BUG MISUNDERSTANDING   inLst == 4, UNSHIFT returns a length of new list
// 	inLst = inputList

// 	var special = "()+-x/*";
// 	var priorities = {
// 		"+": 10,
// 		"-": 10,
// 		"x": 20,
// 		"/": 20,
// 		"*": 20
// 	}; // object maping priorities with operators. ("+" in priorities) ? true : false; is a valid construction
// 	var currentItem = 0;  //currently processed element for debugging
// 	var stackCurrent = 0; // stackPeep for debugging purposes

// 	function isOperator(character) {
// 		return Object.keys(priorities).includes(character);
// 	}

// 	function getSymbolPriority(character) {
// 		return isOperator(character) ? Number(priorities[character]) : 0;
// 	}

// 	function stackPeep() {
// 		return stack[stack.length - 1]
// 	}

// 	function throwSyntaxErrorCloseBracketMissing() {
// 		if (!isOperator(stackPeep() || stackPeep() === "$")) {
// 			console.log('SyntaxError )')
// 			throw new SyntaxError(`${this.constructor.name}: ')' missing`)
// 		}
// 	}


// 	function processEachInputItem(currentItem, i, listOfItems) {
// 		let isANumber = function (val) { return !isNaN(Number(val)) }
// 		let pushItemToBeginingOfList = function (item) { outList.unshift(item) }

// 		let repeatCallbackAsLongAsConditionIsMet = function (callback, conditionCallback, onErrorBeforeEachCall = () => { }) {
// 			while (conditionCallback()) {
// 				onErrorBeforeEachCall();
// 				callback()
// 			}
// 		}
// 		let popFromStackUnshiftToList = function () {
// 			outList.unshift(stack.pop())
// 		}
// 		let isStackTopOperatorsPrioGreaterEqualThenCurrentElementsPrio = function () {
// 			return isOperator(stackPeep()) && (getSymbolPriority(stackPeep()) >= getSymbolPriority(currentItem))
// 		}

// 		let isStackNotEmpty = function () { return stack.length > 1 }

// 		// console.log(`currentItem: ${currentItem}`)
// 		// console.log('index : ' + i)
// 		// console.log(stack); 
// 		// console.log(outList)
// 		// console.log(listOfItems)

// 		if (isANumber(currentItem)) {
// 			pushItemToBeginingOfList(currentItem)
// 		} else if (currentItem === ")") {
// 			stack.push(currentItem)
// 		} else if (isOperator(currentItem)) {
// 			repeatCallbackAsLongAsConditionIsMet(popFromStackUnshiftToList, isStackTopOperatorsPrioGreaterEqualThenCurrentElementsPrio)
// 			stack.push(currentItem)
// 		} else if (currentItem == '(') {
// 			repeatCallbackAsLongAsConditionIsMet(popFromStackUnshiftToList, () => { return stackPeep() != ')' }, throwSyntaxErrorCloseBracketMissing)
// 			// console.log('%c Stack before poppoing ) ', 'background-color: yellow');
// 			// console.log(stack)
// 			stack.pop();
// 			// console.log('Stack after popoing')
// 			// console.log(stack)
// 		}
// 		if ((i == listOfItems.length - 1) && (stack.length > 1)) {
// 			repeatCallbackAsLongAsConditionIsMet(popFromStackUnshiftToList, isStackNotEmpty)
// 		}
// 	}

// 	try {
// 		let listCopy = [...inputList]
// 		listCopy.reverse()
// 		// console.log(listCopy)
// 		listCopy.forEach(processEachInputItem)
// 		// console.log(outList)
// 		return outList;
// 	}
// 	catch (err) {

// 		return err;
// 	}

// }