function stringToExpression(strInput) {

		if (strInput.length = 0) { return ""}

		let numberBeingConverted = "";
		let syntaxError = false; 
		let result = [];
		let numberConverter = null;

		let allowedCharacters = '().+-/*'
		let plusMinusUnipolarAllowedAfter = '(+-'


		let isCharacterADigit = function(character) {
			return !isNaN(parseInt(character))
		}


		let isCharacterIn = function(charactersChain, character){
			return charactersChain.indexOf(character) != -1
		}

		let isCharacterSupported = function(character) {
			return isCharacterIn(allowedCharacters, character)
		}

		let addOperatorToExpression = function(character) {
			result.push(character)
		}


		let ifCharacterIsIllegalCharacterThrowError = function(character) {
			let conditionArrayForSingleCharacter = [
				(character) => {return isNaN(parseInt(character))},
				(character) => {return !isCharacterSupported(character)}
			]
			let characterIsIllegal = conditionArrayForSingleCharacter.reduce((acc, condition, index) => {
				if (index == 1) {acc = acc(character);}
				return acc && condition(character)
			})
			if (characterIsIllegal) {throw new SyntaxError(`${this.constructor.name}: character ${character} is not supported`)}
		}




		let processSingleCharacter = function(character, index, strInput) {

			let getLastProcessedCharacter = function(){
				return (index == 0) ? null : strInput[index - 1]
			}	
			let wasLastCharacterIn = function(charactersChain) {
				return isCharacterIn(charactersChain, getLastProcessedCharacter())
			}

			let isThisFirstProcessedCharacter = function(){
				return index == 0 ? true : false;
			}
			let isThisLastProcessedCharacter = function() {
				return index == strInput.length -1 ? true : false;
			}

			ifCharacterIsIllegalCharacterThrowError(character)
			// result.push(character)

			if (isThisLastProcessedCharacter(character) && (!isCharacterADigit(character) || (!isCharacterIn('.)')))) {
				throw new SyntaxError(`${this.constructor.name}: last character is supposed to be a digit`)
			}

			if (isCharacterADigit(character)) {
				console.log(`character ${character} is a digit`)
				nextNumberConversionStep(character)
				if (isThisLasttProcessedCharacter(character)){
					console.log(`Character ${character} is a digit and last character`)
					finalizePreviousNumberConversion();
				}

				return null
			} 
			if (isCharacterIn('+-'), character){
				if (wasLastCharacterIn('(-+') || isThisFirstProcessedCharacter()) {
					console.log(`Character is ${character}, and last processed character was '+-" or null`)
					nextNumberConversionStep(character)
					return null
				}
			}
			if (isCharacterIn('+-*/'), character){
				if (isCharacterADigit(getLastProcessedCharacter()) || isCharacterIn(')', getLastProcessedCharacter())){
					console.log(`CHaracter ${character} is operator, last processed character was ) or this is the first porcessed character`)
					finalizePreviousNumberConversion();
					addOperatorToExpression(character)	
					return null
				}
			}
			 


			throw new SyntaxError(`${this.constructor.name}: last character was ${getLastProcessedCharacter()}, 
								   current is ${character}. This is not supported combination`
			)
		}


		function nextNumberConversionStep(character) {
			getNumberConverter().nextConversionStep(character)
		}


		function finalizePreviousNumberConversion() {
			result.push(getNumberConverter().getProcessedSoFar())
			getNumberConverter().resetConverter()
		}

		function getNumberConverter(){
			if (numberConverter == null) {numberConverter = new NumberConverter()} 
			return numberConverter;
		}

		try{
			Array.from(strInput).forEach(processSingleCharacter);
			console.log(result)
			return result	
		} catch (e) {
			console.log(e)
			return 'error'
		}
	}

	class NumberConverter{
		constructor(){
			this.convertedSoFar = '';
			this.wasThereADot = false;
			this.minusFlag = false;
		}
		nextConversionStep(character) {
			console.log(!this.isCharacterADigit(character))
			console.log(!this.isCharacterIn('.+-', character))
			console.log(character)
			if (!this.isCharacterADigit(character) && !this.isCharacterIn('.+-', character)) this.throwSyntaxError(character)
			if (character == '.') {
				if (this.wasThereADot) this.throwSyntaxError(character);
				this.wasThereADot = true;
			}
			if (this.wasThereAnyDigitSoFar()){
				if (this.isCharacterIn('+-')){
					this.throwSyntaxError()
				} 
			} else {
				if (character == '-') {
					this.toggleMinusSign()
					return null
				}
				if (character == '+'){
					return null
				}	
			}
			this.convertedSoFar = this.convertedSoFar + character
		}
		getProcessedSoFar(){
			return parseFloat(this.convertedSoFar)
		}
		resetConverter(){
			this.convertedSoFar = '';
			this.wasThereADot = false;
			this.minusFlag = false
		}

		isCharacterADigit(character) {
			return !isNaN(parseInt(character))
		}
		isCharacterIn = function(charactersChain, character){
			return charactersChain.indexOf(character) != -1
		}
		wasThereAnyDigitSoFar() {
			return this.convertedSoFar != '' ? true : false;
		}
		throwSyntaxError(currentCharacter) {
			throw SyntaxError(`${this.constructor.name}: error in syntax: processed so far: ${this.convertedSoFar}, 
				${this.wasThereADot ? 'there was already a dot' : 'there was not a dot yet'} currently processed character: ${currentCharacter} `
			)
		}
		toggleMinusSign() {
			this.minusFlag = !this.minusFlag;
		}
	}