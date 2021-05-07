// In case of 1/2*2*2*2, infix to prefix first counts 2*2*2*2 and then 1 / 16. This behavior is according to algorithm. However this is not proper math operation
// That is why i this case (1/2)*2*2*2 should be counted

class BracketsFromLeftAdderInCaseOfDivision {
    constructor(){
        this.newContext = false; // in case new brackets are encountered
    }

    analyzeAndAddBrackets(expressionAsList){
        let reversedExpression = [...expressionAsList].reverse()
        let index = 0;
        while (index < reversedExpression.length){
            let item = reversedExpression[index];
            if (item == '/'){
                let lastExpressionStartIndex = this.getLastExpressionStartIndex(); // (a + b * c)/(d + e)!!*f <- !! is last index
                let nextExpressionEndIndex = this.getNextExpressionEndIndex(); // !!a*b*(f+d)/(z-x)*y <- !! is last index
            }

            index++;
        }
        return reversedExpression.reverse()
    }

    addItemAtIndex(array, item, index){ array.splice(index, 0, item)}
    isNumber(item){return !isNaN(item)}
    isOperator(item){return this.isItemIn('*/+-', item)}
    isBracket(item){return this.isItemIn('()', item)}
    isItemIn(listAsString, item) {return Array.from(listAsString).indexOf(item) == -1 ? false : true}
}