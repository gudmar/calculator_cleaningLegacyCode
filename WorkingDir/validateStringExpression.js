

class StringExpressionValidator{
    constructor(stringExpression){
        this.isNumberProcessed = false;
        this.wasADotInCurrentlyProcessedNumber = false;
    }

    validate(stringExpression){
        Array.from(stringExpression).forEach(this._procesSingleCharacter.bind(this))
    }

    _procesSingleCharacter(character, index, expression){

    }

    isCharacterADigit = function(character) {
        return !isNaN(parseInt(character))
    }


    isCharacterIn = function(charactersChain, character){
        return charactersChain.indexOf(character) != -1
    }

    isCharacterSupported = function(character) {
        return isCharacterIn(allowedCharacters, character)
    }

    addOperatorToExpression = function(character) {
        result.push(character)
    }


    ifCharacterIsIllegalCharacterThrowError = function(character) {
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


}