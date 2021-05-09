// In case of 1/2*2*2*2, infix to prefix first counts 2*2*2*2 and then 1 / 16. This behavior is according to algorithm. However this is not proper math operation
// That is why i this case (1/2)*2*2*2 should be counted

class CommonToolkit{
    constructor(){
    }


    isItemNumberOrIn(listString, item) { return this.isNumber(item) ? this.isNumber(item) : this.isItemIn(listString, item)}

    isItemExpressionOrIn(listString, item) { return this.isExpression(item) ? this.isExpression(item) : this.isItemIn(listString, item)}


    insertItemAtIndex(list, item, index){ list.splice(index-1, 0, item)}


    isNumber(item){return !isNaN(item)}

    isExpression(item) {
        let isExpression = /p[0-9]*/.test(item)
        return this.isNumber(item) || isExpression;
    }


    isOperator(item){return this.isItemIn('*/+-', item)}


    isBracket(item){return this.isItemIn('()', item)}


    isItemIn(listAsString, item) {return Array.from(listAsString).indexOf(item) == -1 ? false : true}
}

class NestedExpressionInserter extends CommonToolkit{
    constructor(){
        super()
        this.extractor = new ExpressionInBracketExtractor();
        this.bracketAdder = new BracketsFromLeftAdderInCaseOfDivision();
    }

    addBrackets(_expression){
        let {expression, mappingObject} = this.extractor.replaceFirstLayerBrackets(_expression)
        let expressionWithBrackets = this.bracketAdder.analyzeAndAddBrackets(expression)
        let subexpressionsWithBrackets = this.getMappingObjectWithBrackets(mappingObject)
        let output = this.replacePlaceholdersWithExpressions(expressionWithBrackets, subexpressionsWithBrackets)
        return output
    }

    getMappingObjectWithBrackets(mappingObject) {
        let getSingleExpressionWithBrackets = function(key){
            return this.addBrackets(mappingObject[key])
        }.bind(this)
        let output = Object.keys(mappingObject).map(getSingleExpressionWithBrackets)
        return output
    }

    replacePlaceholdersWithExpressions(expressionWithPlaceholders, mappingObject){
        let replaceSingle = function(placeholder){
            let pattern = new RegExp(`${placeholder}`)
            return expressionWithPlaceholders.replace(pattern, `(${mappingObject[placeholder]})`)
        }
        let output = Object.keys(mappingObject).map(replaceSingle)
        return output
    }



}

class ExpressionInBracketExtractor extends CommonToolkit{
    constructor(){
        super()
        this.replacedMapper = {};
        this.lastAddedPlaceholderNumber = null;
    }

    replaceFirstLayerBrackets(_expression){
        while (this.isNextBrackets(_expression)){
            this.memorizeAndReplaceSingleMatch(_expression);
        }
        let output = {};
        output = {
            expression: _expression,
            mappingObject: {...this.replacedMapper}
        }
        this.clean()
        return output
    }

    clean(){
        this.replacedMapper = {};
        this.lastAddedPlaceholderNumber = null;
    }

    isNextBrackets(expression){
        return expression.indexOf('(') !=-1 ? true : false
    }

    findSingleMatch(expression){
        let startIndex = expression.indexOf('(');
        let bracketNestLevel = 1;
        let currentIndex = startIndex + 1;
        if (startIndex == -1) return null;
        while (bracketNestLevel != 0 && currentIndex < expression.length){
            let currentElement = expression[currentIndex];
            if (currentElement == '(') bracketNestLevel++;
            if (currentElement == ')') bracketNestLevel--;
            currentIndex++;
        }
        let output = {
            indexStart: startIndex,
            indexEnd: currentIndex - 1,
            foundSubExpression: expression.slice(startIndex, currentIndex)
        }
        return output;
    }

    memorizeAndReplaceSingleMatch(expression){
        let placeholder = this.generateNextPlaceholder();
        let match = this.findSingleMatch(expression);
        console.log(placeholder)
        console.log(match)
        this.replaceSingleMatch(expression, match, placeholder);
        this.replacedMapper[placeholder] = this.pealL1Brackets(match.foundSubExpression)
    }

    pealL1Brackets(expression) {
        return expression.slice(1, expression.length-1)
    }

    replaceSingleMatch(expression, {indexStart, indexEnd, foundSubExpression}, newElements){
        expression.splice(indexStart, foundSubExpression.length, newElements)
    }

    generateNextPlaceholder(){
        if (this.lastAddedPlaceholderNumber == null) {
            this.lastAddedPlaceholderNumber = 0; return 'p0'
        }
         return `p${this.lastAddedPlaceholderNumber++}`
    }
}


class BracketsFromLeftAdderInCaseOfDivision extends CommonToolkit{
    constructor(){
        super()
    }

    analyzeAndAddBrackets(expressionAsList){
        let reversedExpression = [...expressionAsList].reverse()
        console.log(reversedExpression[0])
        let index = 0;
        while (index < reversedExpression.length){
            let item = reversedExpression[index];
            if (item == '/'){
                let bracketAdder = new TillMultipleOrDivisionOperatorBracketInserter(reversedExpression, index)
                bracketAdder.calculateExpression()
                index = bracketAdder.getCurrentIndexAfterAddingBrackets()
                reversedExpression = bracketAdder.getExpressionWithBrackets()
            }

            index++;
        }
        return reversedExpression.reverse()
    }
}


class TillMultipleOrDivisionOperatorBracketInserter extends CommonToolkit{
    constructor(expressionAsList, currentIndex){
        super()
        this.expressionAsList = [...expressionAsList];
        this.viewedItem = this.expressionAsList[currentIndex];
        this.index = currentIndex;
        this.bracketsToOpen = 0;
        this.lastOperator = null;
    }

    getCurrentIndexAfterAddingBrackets(){
        return this.index + this.bracketsToOpen
    }


    getExpressionWithBrackets(){
        return this.expressionAsList;
    }


    calculateExpression(){
        while (this.isItemExpressionOrIn('*/',this.viewedItem)){
            this.addCloseBracketIfNeeded_changeLocalState()
            this.index++;
            this.viewedItem = this.expressionAsList[this.index]
        }
        this.insertAllOpenBrackets(this.expressionAsList, this.index + 1)
    }


    insertCloseBracket() {
        this.insertItemAtIndex(this.expressionAsList, ')', this.getIndexToInsertCloseBracket(this.expressionAsList, this.index + 1))
        this.index++;
    }


    insertAllOpenBrackets(){
        for(let i = 0; i < this.bracketsToOpen; i++){
            this.insertItemAtIndex(this.expressionAsList, '(', this.index + 1)
        }
    }


    getIndexToInsertCloseBracket(expressionAsList, currentIndex){
        if (currentIndex == 0) return null
        return currentIndex - 1
    }

    getPreviousOperator(){
        return this.index < 2 ? null : this.expressionAsList[this.index - 2];
    }


    addCloseBracketIfNeeded_changeLocalState(){
        
        if (this.viewedItem == '*' && this.lastOperator == '*') return null
        if (this.isItemIn('-+', this.getPreviousOperator())) return null
        if (this.isItemIn('*/', this.viewedItem) && (this.index > 1)) {
            console.log(this.getPreviousOperator())
            this.lastOperator = this.expressionAsList[this.index]
            this.insertCloseBracket()
            this.bracketsToOpen++
        }
    }
}