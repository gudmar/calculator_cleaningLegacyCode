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
		throw new SyntaxError(`${this.constructor.name}: ')' missing`)
	}


	function processEachInputItem(currentItem, i, listOfItems){
		// currentItem = currentItem;
		console.log(currentItem)
		console.log(outList)
		stackCurrent = stackPeep();
		console.log(stack)
		if (isNaN(Number(currentItem)) === false) {      // 1) if item is a number add it to the begining of the list
			outList.unshift(Number(currentItem));
			console.log('is numbner')
		} else if (currentItem === ")") {
			stack.push(currentItem);
			console.log('is )')
		} else if (isOperator(currentItem)) {  // 3) if an item is an operator then pop from stack and push them to outList as long as they have prio higher or equal to an item
			console.log(stackPeep()); console.log(getSymbolPriority(stackPeep())); console.log(getSymbolPriority(currentItem))
			console.log('Current Item', currentItem)
			console.log('stack peep', stackPeep())
			while (isOperator(stackPeep()) && (getSymbolPriority(stackPeep()) >= getSymbolPriority(currentItem))) {
				let statckPop = stack.pop()
				outList.unshift(stack.pop());
				console.log(outList)
			} // while
		stack.push(currentItem);  // 4) push item (operator) to the stack
		} else if (currentItem === "(") {
			while (stackPeep() !== ")") {
				if (stackPeep() === ")") {console.log(" stackPeep is ) ");}
				console.log("stack here is : " + String(stack));
				console.log(stackPeep())
				if (!isOperator(stackPeep()) || stackPeep() === "$") {throwSyntaxErrorCloseBracketMissing()}  // if stack is empty "$" or there is anything that is not an operator or ")" report bad syntax
				if ( stackPeep() != ')')
					{
						outList.unshift(stack.pop());  // 5) if an item is an "(" then remove from stack all operators till ")" is encountered
					} else {
						stack.pop();
					}

				// Here '$' is added to output list !!! 
		}
			stack.pop();   // 
		} // else if
		if ((i === listOfItems.length - 1) && stack.length > 1) {  // 6) If there was no () at beging or end of expression empty stack of all operators
			while (stack.length > 1) {   // stack can be length 1 because of special value $
				outList.unshift(stack.pop());
			}
		}  // if i===0 && stack.length > 1 
		console.log("End of iteration " + i + " Stack is: " + String(stack));
	}
	
	try {
		inputList.reverse().forEach(processEachInputItem)
		// for (var i=(inputList.length - 1); i>=0; i--) {    // 0) for each element from right to left do:

		// }   // for i
		console.log(outList)
		return outList;
	} // try
	catch(err) {
		console.trace(err)
		return err;
		}
	
}