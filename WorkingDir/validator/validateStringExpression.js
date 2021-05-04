

class StringExpressionValidator{
    constructor(stringExpression){
        this.supportedNonDigitCharacters = '-+/*.() '
        this.lastSymbolicType = null
        this.stringOfExpressionsSymbolicTypes = ''
    }

    validate(stringExpression){
        this.resetFlags();
        let arrayOfBooleanResults = Array.from(stringExpression.trim()).map(this._procesSingleCharacter.bind(this))
        
        let output = arrayOfBooleanResults.reduce((acc, result, index) => {
            if (index == 0) {acc = result}
            return acc && result
        })
        // console.log(this.stringOfExpressionsSymbolicTypes)
        this.stringOfExpressionsSymbolicTypes = '';
        return output
    }

    _procesSingleCharacter(character, index, expression){

        let isCharacterAtPositionValid = function(character, isAtPosition, isValidCallback = ()=>{return true}){
            if (!isAtPosition) {
                return true
            } else {
                return isValidCallback()
            }
        }

        let addNextElementToArrayOfSymbolicTypesIfNeeded = function(){
            // console.log(this.getSymbolicTypeOfElement(character))
            let isCurrentlyANumberProcessed = (this.isNumberProcessed && this.getSymbolicTypeOfElement(getLastCharacter()) == 'n')
            let isCurrentlySpaceProcessed = this.getSymbolicTypeOfElement(character) == 's'
            
            if (!(isCurrentlySpaceProcessed || isCurrentlyANumberProcessed)){
                this.stringOfExpressionsSymbolicTypes = this.stringOfExpressionsSymbolicTypes + this.getSymbolicTypeOfElement(character)
            }
            if (this.lastSymbolicType)
                this.lastSymbolicType = this.getLastSymbolicType(character)
            return true
        }.bind(this)

        let getLastSymbolicType = function() {return this.getSymbolicTypeOfCharacterAtPosition(index-1)}

        let changeLastAndCurrentElementType = function() {
            this.lastProcessedElement = this.currentProcessedElement
            this.currentProcessedElement = character
        }

        let getLastCharacter = function(){
            return index == 0 ? null : expression[index - 1]
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


        let checkIfThereAreOnlyAllowedPatterns = function() {
            if (isLastCharacter) {
                let arrayOfNotAllowedPatterns = [
                    '//', '**', '/*', '*/', '-/', '+/', '+*', '-*', ')n', 'n(', ')(', 'nn'
                ]
                return this.isAnyOfGivenPattrnsInString(this.stringOfExpressionsSymbolicTypes, arrayOfNotAllowedPatterns)
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
            if (this.isCharacterIn('+-()/* ', character)){
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
            checkIfNrAndOrderOfBracketsIsCorrect(),
            addNextElementToArrayOfSymbolicTypesIfNeeded(),
            checkIfThereAreOnlyAllowedPatterns()
        ]

        // console.log(arrayOfRules)
        return this.areAllConditionsFromArrayMet(arrayOfRules)
    }


    resetFlags(){
        this.nrOfClosingBrackets = 0;
        this.nrOfOpeningBrackets = 0;
        this.isNumberProcessed = false;
        this.wasADotInCurrentlyProcessedNumber = false;   
    }


    areAllConditionsFromArrayMet(arrayOfBooleans) {
        return arrayOfBooleans.reduce((acc, result, index) => {
            if (index == 0) {acc = result}
            return acc && result
        })
    }


    getSymbolicTypeOfElement(character) {
            if (this.isCharacterADigit(character) || character == '.') return 'n'
            if (this.isCharacterIn('+-/*()', character)) return character;
            if (character == ' ') return 's';
            if (character == undefined) return 'u';
            return 'x'
        }
    

    getSymbolicTypeOfCharacterAtPosition(index) {
        return index < 0 || index >= this.stringOfExpressionsSymbolicTypes.length ? null : this.stringOfExpressionsSymbolicTypes[index]
    }

    
    recordSymbolicType(typeToRecord) {
        this.stringOfExpressionsSymbolicTypes = this.stringOfExpressionsSymbolicTypes + typeToRecord
    }

    isAnyOfGivenPattrnsInString(stringToCheck, arrayOfPatterns){
        for (let pattern of arrayOfPatterns){
            if (stringToCheck.indexOf(pattern) != -1) return false
        }
        return true
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


    isCharacterLegal(character) {
        return this.isCharacterADigit(character) || this.isCharacterIn(this.supportedNonDigitCharacters, character)
    }


}