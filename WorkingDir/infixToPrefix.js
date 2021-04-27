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
			console.log(condition())
			while (condition()) {
				console.log(stackPeep())
				onErrorBeforeEachCall();
				callback()
			}
		}
		let popFromStackUnshiftToList = function(){
			outList.unshift(stack.pop())
		}
		let isStackTopOperatorsPrioGreaterEqualThenCurrentElementsPrio = function(){
			console.log(stackPeep())
			console.log(getSymbolPriority(stackPeep()))
			console.log(getSymbolPriority(currentItem))
			return isOperator(stackPeep()) && (getSymbolPriority(stackPeep()) >= getSymbolPriority(currentItem))
		}

		console.log(currentItem)

		if (isANumber(currentItem)) {
			console.log('Is a numner ' + currentItem)
			pushItemToBeginingOfList(currentItem)
		} else if (currentItem === ")") {
			stack.push(currentItem)
		} else if (isOperator(currentItem)){
			console.log('Is operator' + currentItem)
			repeatCallbackAsLongAsConditionIsMet(popFromStackUnshiftToList, isStackTopOperatorsPrioGreaterEqualThenCurrentElementsPrio)
			stack.push(currentItem)
		} else if (currentItem == '(') {
			repeatCallbackAsLongAsConditionIsMet(popFromStackUnshiftToList, ()=>{return stackPeep() != ')'}, throwSyntaxErrorCloseBracketMissing)
			stack.pop();
		}
		if ((i == listOfItems.length - 1) && (stack.length > 1)) {
			repeatCallbackAsLongAsConditionIsMet(popFromStackUnshiftToList(), () => {stack.length > 1})
		}
		console.log(stack.toString())
		console.log(stackPeep())
		console.log(outList.toString())
		// return outList;



		// if (isNaN(Number(currentItem)) === false) {      // 1) if item is a number add it to the begining of the list
		// 	outList.unshift(Number(currentItem));
		// } else if (currentItem === ")") {
		// 	stack.push(currentItem);
		// } else if (isOperator(currentItem)) {  // 3) if an item is an operator then pop from stack and push them to outList as long as they have prio higher or equal to an item
		// 	while (isOperator(stackPeep()) && (getSymbolPriority(stackPeep()) >= getSymbolPriority(currentItem))) {
		// 		let statckPop = stack.pop()
		// 		outList.unshift(stack.pop());
		// 	} // while
		// stack.push(currentItem);  // 4) push item (operator) to the stack
		// } else if (currentItem === "(") {
		// 	while (stackPeep() !== ")") {
		// 		if (!isOperator(stackPeep()) || stackPeep() === "$") {throwSyntaxErrorCloseBracketMissing()}  // if stack is empty "$" or there is anything that is not an operator or ")" report bad syntax
		// 		if ( stackPeep() != ')')
		// 			{
		// 				outList.unshift(stack.pop());  // 5) if an item is an "(" then remove from stack all operators till ")" is encountered
		// 			} else {
		// 				stack.pop();
		// 			}

		// 		// Here '$' is added to output list !!! 
		// }
		// 	stack.pop();   // 
		// } // else if
		// if ((i === listOfItems.length - 1) && stack.length > 1) {  // 6) If there was no () at beging or end of expression empty stack of all operators
		// 	while (stack.length > 1) {   // stack can be length 1 because of special value $
		// 		outList.unshift(stack.pop());
		// 	}
		// }  // if i===0 && stack.length > 1 
	}
	
	try {
		console.log('processEach should run')
		inputList.reverse().forEach(processEachInputItem)
		// for (var i=(inputList.length - 1); i>=0; i--) {    // 0) for each element from right to left do:
		console.log(outList)
		// }   // for i
		return outList;
	} // try
	catch(err) {
	
		return err;
		}
	
}