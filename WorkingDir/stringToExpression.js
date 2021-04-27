function stringToExpression(strInput) {

		if (strInput.length = 0) { return ""}

		let numberBeingConverted = "";
		let syntaxError = false; 
		let result = [];
		let numberConverter = null;

		let allowedCharacters = '().+-/*'
		let plusMinusUnipolarAllowedAfter = '(+-'



		let isCharacterADigit = function(character) {
			return !isNaN(parseInt(String(character)))
		}


		let isCharacterIn = function(charactersChain, character){
			return charactersChain.indexOf(character) != -1
		}

		let isCharacterSupported = function(character) {
			return isCharacterIn(allowedCharacters, character)
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

			ifCharacterIsIllegalCharacterThrowError(character)
			// result.push(character)

			if (isCharacterADigit(character)) {
				nextNumberConversionStep()
				return null
			} 
			if (isCharacterIn('+-')){
				if (wasLastCharacterIn('(-+') || isThisFirstProcessedCharacter()) {
					nextNumberConversionStep()
					return null
				}
			}
			if (isCharacterIn('+-*/')){
				if (isCharacterADigit(getLastProcessedCharacter) || isThisFirstProcessedCharacter() || isCharacterIn(')')){
					finalizePreviousNumberConversion();
					addOperatorToExpression()	
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
			result.push(getCurrentNumberConverter.getProcessedSoFar())
			getNumberConverter().resetConverter()
		}

		function getNumberConverter(){
			if (numberConverter == null) {numberConverter = new numberConverter()} 
			return numberConverter;
		}
	}

	class numberConverter{
		constructor(){
			this.convertedSoFar = '';
			this.wasThereADot = false;
			this.minusFlag = false;
		}
		nextConversionStep(character) {
			if (!this.isCharacterADigit(character) && !this.isCharacterIn('.+-')) this.throwSyntaxError()
			if (character == '.') {
				if (this.wasThereADot) this.throwSyntaxError();
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
		throwSyntaxError() {
			throw SyntaxError(`${this.constructor.name}: error in syntax: processed so far: ${this.convertedSoFar}, 
				${this.wasThereADot ? 'there was already a dot' : 'there was not a dot yet'} currently processed character: ${character} `
			)
		}
		toggleMinusSign() {
			this.minusFlag = !this.minusFlag;
		}
	}