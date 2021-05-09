class StringToExpression extends StringExpressionValidator{
	constructor(){
		super();
		this.result = [];
		this.isNumberProcessed = false;
		this.processedNumber = '';
		this.nrOfMinus = 0;
	}


	convert(expression) {
		let spacelessExpression = expression.replace(/\s+/g, '')
		if (!this.validate(expression)) return 'error'
		Array.from(spacelessExpression).forEach(this.processSingleCharacter.bind(this));
		let output = [...this.result]
		this.clean();
		return output
	}

	clean(){
		this.result = []; this.isNumberProcessed = false; this.processedNumber = ''; this.nrOfMinus = 0;
	}


	processSingleCharacter(character, index, strInput) {

		let isLastCharacter = function() { return index == strInput.length - 1 ? true : false}
		let isFirstCharacter = function() { return index == 0 ? true : false}
		let getNextCharacter = function(){return isLastCharacter() ? null : strInput[index + 1]}
		let getLastCharacter = function(){return isFirstCharacter() ? null : strInput[index - 1]}
		let addCharacterToProcessedNumber = function() {this.processedNumber = this.processedNumber + character}.bind(this)

		if (this.isCharacterIn('+-', character)) {
			if ((this.isCharacterIn('+-(/*.', getLastCharacter())) || getLastCharacter() == null) {
				if (character == '-') this.nrOfMinus++;
			} else {
				this.finalizeNumberConversion()
				this.result.push(character)
			}

		}

		if (this.isPartOfNumber(character)){
			this.isNumberProcessed = true;
			if (!this.isCharacterADigit(getLastCharacter()) && character == '.') {this.processedNumber = this.processedNumber + '0'}
			if (this.nrOfMinus > 0 && this.nrOfMinus % 2 > 0) this.processedNumber = '-' + this.processedNumber;
			if (this.isCharacterADigit(character)) addCharacterToProcessedNumber()
			if (character == '.' && this.isCharacterADigit(getNextCharacter())) addCharacterToProcessedNumber()
			this.nrOfMinus = 0;
		}

		if (this.isCharacterIn('/*()', character)) {
			if (this.nrOfMinus % 2 > 0) {this.result.push('-'); this.nrOfMinus = 0}
			this.finalizeNumberConversion();
			this.result.push(character);
		}

		if (isLastCharacter()) {this.finalizeNumberConversion()}

	}


	finalizeNumberConversion(){
		if (this.processedNumber){
			this.result.push(this.processedNumber);
			this.isNumberProcessed = false;
			this.processedNumber = '';
			this.nrOfMinus = 0;
	
		}	}
	

	isPartOfNumber(character){
		return this.isDigitOrOneOfCharacters('.', character)
	}

}
