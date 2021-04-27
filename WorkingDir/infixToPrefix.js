function infix2prefix(inputList) {
	var stack = ["$"],
		outList = [],
		inLst = inputList.unshift("$");   // BUG MISUNDERSTANDING   inLst == 4, UNSHIFT returns a length of new list
	
	var special = "()+-x/*";
	var priorities = { "+": 10,
					   "-": 10,
					   "x": 20,
					   "/": 20,
					   "*": 20}; // object maping priorities with operators. ("+" in priorities) ? true : false; is a valid construction
	var currentItem = 0;  //currently processed element for debugging
    var stackCurrent = 0; // stackPeep for debugging purposes
    
	function isOperator(character) {
		return Object.keys(priorities).includes(character);
	}
	
	function getSymbolPriority(character) {
        return isOperator(character) ? Number(priorities[character]) : 0;
	}
	
	function stackPeep() {
        return stack[stack.length - 1]
	}

	function throwSyntaxErrorCloseBracketMissing(){
		if (!isOperator(stackPeep() || stackPeep() === "$")){
			console.log('SyntaxError )')
			throw new SyntaxError(`${this.constructor.name}: ')' missing`)
		}
	}


	function processEachInputItem(currentItem, i, listOfItems){
		let isANumber = function(val) { return !isNaN(Number(val))}
		let pushItemToBeginingOfList = function(item) {outList.unshift(item)}

		let repeatCallbackAsLongAsConditionIsMet = function(callback, condition, onErrorBeforeEachCall = () => {}){
			while (condition()) {
				onErrorBeforeEachCall();
				callback()
			}
		}
		let popFromStackUnshiftToList = function(){
			outList.unshift(stack.pop())
		}
		let isStackTopOperatorsPrioGreaterEqualThenCurrentElementsPrio = function(){
			return isOperator(stackPeep()) && (getSymbolPriority(stackPeep()) >= getSymbolPriority(currentItem))
		}

		if (isANumber(currentItem)) {
			pushItemToBeginingOfList(currentItem)
		} else if (currentItem === ")") {
			stack.push(currentItem)
		} else if (isOperator(currentItem)){
			repeatCallbackAsLongAsConditionIsMet(popFromStackUnshiftToList, isStackTopOperatorsPrioGreaterEqualThenCurrentElementsPrio)
			stack.push(currentItem)
		} else if (currentItem == '(') {
			repeatCallbackAsLongAsConditionIsMet(popFromStackUnshiftToList, ()=>{return stackPeep() != ')'}, throwSyntaxErrorCloseBracketMissing)
			stack.pop();
		}
		if ((i == listOfItems.length - 1) && (stack.length > 1)) {
			repeatCallbackAsLongAsConditionIsMet(popFromStackUnshiftToList(), () => {stack.length > 1})
		}
	}
	
	try {
		inputList.reverse().forEach(processEachInputItem)
		console.log(outList)
		return outList;
	} // try
	catch(err) {
	
		return err;
		}
	
}