class StringExpressionValidator{
    constructor(){

    }

    validate(stringExpression){
        let notAllowedPatterns = [
            '[^0-9+\\/\\-*.\\s\\)\\()]',
            '[\\+\\-()*\\/]\\.[\\+\\-()*\\/]',
            '^([\\*\\/\\)])',
            '([\\+\\-])$',
            '^([\\.])$',
            '[\\+\\-()*\\/]([\\.])$',
            '[\\.]\\d+[\\.]',
            '\\d\\s+\\d',
            '\\)\\(',
            '[\\-\\+\\*\\/][\\*\\/]'
        ]
        let result = notAllowedPatterns.reduce((acc, pattern, index, arrayOfPatterns) => {
            if (index == 1) {acc = this.isExpressionValid(stringExpression, acc);}
            return acc && this.isExpressionValid(stringExpression, pattern)
        })
        return result && this.isNumberOfClosingBracketsEqulaToOpeningBrackets(stringExpression)

    }

    checkIfStringHasAntipattern(expression, pattern){
        
        let regEx = new RegExp(pattern)
        return regEx.test(expression) ? true : false;
    }

    isExpressionValid(expression, pattern){
        return !this.checkIfStringHasAntipattern(expression, pattern)
    }

    isNumberOfClosingBracketsEqulaToOpeningBrackets(expression){
        let nrOfOpeningBrackets = 0;
        let nrOfClosingBractets = 0;
        for(let character of Array.from(expression)){
            if (character == '(') nrOfOpeningBrackets++;
            if (character == ')') nrOfClosingBractets++;
            if (nrOfClosingBractets > nrOfOpeningBrackets) return false
        }
        return nrOfClosingBractets != nrOfOpeningBrackets ? false : true
    }

    isCharacterIn(charactersChain, character){  // For inheritance purposses - stringToExpression.js
        return charactersChain.indexOf(character) != -1
    }
    isDigitOrOneOfCharacters(characterChain, character){
        return this.isCharacterADigit(character) || this.isCharacterIn(characterChain, character)
    }
    isCharacterADigit(character) {
        return !isNaN(parseInt(character))
    }

}