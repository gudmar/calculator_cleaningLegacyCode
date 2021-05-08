// In case of 1/2*2*2*2, infix to prefix first counts 2*2*2*2 and then 1 / 16. This behavior is according to algorithm. However this is not proper math operation
// That is why i this case (1/2)*2*2*2 should be counted

class CommonToolkit{
    constructor(){
    }


    isItemNumberOrIn(listString, item) { return this.isNumber(item) ? this.isNumber(item) : this.isItemIn(listString, item)}


    insertItemAtIndex(list, item, index){ list.splice(index-1, 0, item)}


    isNumber(item){return !isNaN(item)}


    isOperator(item){return this.isItemIn('*/+-', item)}


    isBracket(item){return this.isItemIn('()', item)}


    isItemIn(listAsString, item) {return Array.from(listAsString).indexOf(item) == -1 ? false : true}
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
        while (this.isItemNumberOrIn('*/',this.viewedItem)){
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