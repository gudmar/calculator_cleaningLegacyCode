

class StringExpressionValidator{
    constructor(stringExpression){
        this.supportedNonDigitCharacters = '-+/*.()'
    }

    validate(stringExpression){
        this.resetFlags();
        let arrayOfBooleanResults = Array.from(stringExpression).map(this._procesSingleCharacter.bind(this))
        return arrayOfBooleanResults.reduce((acc, result, index) => {
            if (index == 0) {acc = result}
            return acc && result
        })
    }

    resetFlags(){
        this.isNumberProcessed = false;
        this.wasADotInCurrentlyProcessedNumber = false;
        this.nrOfOpeningBrackets = 0;
        this.nrOfClosingBrackets = 0;
    }

    areAllConditionsFromArrayMet(arrayOfBooleans) {
        return arrayOfBooleans.reduce((acc, result, index) => {
            if (index == 0) {acc = result}
            return acc && result
        })
    }

    _procesSingleCharacter(character, index, expression){

        let isCharacterAtPositionValid = function(character, isAtPosition, isValidCallback = ()=>{return true}){
            if (!isAtPosition) {
                return true
            } else {
                return isValidCallback()
            }
        }

        let isLastCharacter = function() {return index == expression.length -1}

        let isFirstCharacter = function() {return index == 0}

        let isInValidLastCharacterSet = function() {return this.isDigitOrOneOfCharacters(').', character)}.bind(this)

        let isInValidFirstCharacterSet = function() {return this.isDigitOrOneOfCharacters('(.-+', character)}.bind(this)

        let ifThisIsLastCharacterIsItValid = function(){ return isCharacterAtPositionValid(character, isLastCharacter(), isInValidLastCharacterSet)}
        
        let ifThisIsFirstCharacterIsItValid = function(){ return isCharacterAtPositionValid(character, isFirstCharacter(), isInValidFirstCharacterSet)}

        let doesPreviousCharacterMeetConditionOrIsFirst = function(callbackCheckCondition) { 
            if (isFirstCharacter()) {
                return true
            } else {
                return callbackCheckCondition(expression[index - 1]) ? true : false 
            }
        }

        let doesNextCharacterMeetConditionOrIsLast = function(callbackCheckCondition) { 
            if (isLastCharacter()) {
                return true
            } else {
                return callbackCheckCondition(expression[index + 1]) ? true : false }
            }

        let checkIfNrAndOrderOfBracketsIsCorrect = function() {
            if (character == '(') this.nrOfOpeningBrackets++;
            if (character == ')') this.nrOfClosingBrackets++;
            if (this.nrOfClosingBrackets > this.nrOfOpeningBrackets) return false
            if (isLastCharacter()) {
                return this.nrOfClosingBrackets == this.nrOfOpeningBrackets ? true : false;
            }
            return true
        }.bind(this)

        let ifNumberIsProcessedIsItStillValid = function(character){          
            if(this.isCharacterADigit(character) || character == '.') {
                this.isNumberProcessed = true;
            }

            if(this.wasADotInCurrentlyProcessedNumber && character == '.' ) {
                return false
            } 
            if (character == '.') {
                this.wasADotInCurrentlyProcessedNumber = true
            }

            finalizeNumberProcessingIfNotNumberChar(character)
            return true
        }.bind(this)

        let isADotNotStandAlone = function () {
            if (character == '.') {
                return doesNextCharacterMeetConditionOrIsLast(this.isNotCharacterADigit) &&
                    doesPreviousCharacterMeetConditionOrIsFirst(this.isNotCharacterADigit) ? false : true
            }
            return true
        }.bind(this)

        let finalizeNumberProcessingIfNotNumberChar = function(character) {
            if (this.isCharacterIn('+-()/*', character)){
                this.isNumberProcessed = false;
                this.wasADotInCurrentlyProcessedNumber = false;
            }
        }.bind(this)

        let arrayOfRules = [
            this.isCharacterLegal(character),
            ifThisIsFirstCharacterIsItValid(),
            ifThisIsLastCharacterIsItValid(),
            ifNumberIsProcessedIsItStillValid(character),
            isADotNotStandAlone(),
            checkIfNrAndOrderOfBracketsIsCorrect()

        ]

        console.log(arrayOfRules)

        return this.areAllConditionsFromArrayMet(arrayOfRules)

    }


    isDigitOrOneOfCharacters(characterChain, character){
        return this.isCharacterADigit(character) || this.isCharacterIn(characterChain, character)
    }

    isCharacterADigit(character) {
        return !isNaN(parseInt(character))
    }


    isNotCharacterADigit(character) {
        return isNaN(parseInt(character))
    }


    isCharacterIn(charactersChain, character){
        return charactersChain.indexOf(character) != -1
    }

    isCharacterSupported(character) {
        return isCharacterIn(allowedCharacters, character)
    }

    addOperatorToExpression(character) {
        result.push(character)
    }


    isCharacterLegal(character) {
        return this.isCharacterADigit(character) || this.isCharacterIn(this.supportedNonDigitCharacters, character)
    }


}