// In case of 1/2*2*2*2, infix to prefix first counts 2*2*2*2 and then 1 / 16. This behavior is according to algorithm. However this is not proper math operation
// That is why i this case (1/2)*2*2*2 should be counted

class BracketsFromLeftAdderInCaseOfDivision {
    constructor(){
    }

    analyzeAndAddBrackets(expressionAsList){
        let reversedExpression = [...expressionAsList].reverse()
        console.log(reversedExpression[0])
        let index = 0;
        while (index < reversedExpression.length){
            let item = reversedExpression[index];
            // debugger;
            if (item == '/'){
                index = this.insertAllBracketsTillMultipleOrDivisionOperatorsOccure(reversedExpression, index)
            }

            index++;
        }
        return reversedExpression.reverse()
    }

    getIndexToInsertCloseBracket(expressionAsList, currentIndex){
        if (currentIndex == 0) return null
        console.log(currentIndex - 1)
        return currentIndex - 1
    }

    insertAllBracketsTillMultipleOrDivisionOperatorsOccure(expressionAsList, currentIndex){
        console.log(currentIndex)
        console.log(expressionAsList.toString())
        
        let insertCloseBracket = function(expressionAsList, currentIndex) {
            this.insertItemAtIndex(expressionAsList, ')', this.getIndexToInsertCloseBracket(expressionAsList, currentIndex+1))
            index++;
        }.bind(this)
        let insertAllOpenBrackets = function(expressionAsList, index){
            // debugger
            for(let i = 0; i < bracketsToOpen; i++){
                this.insertItemAtIndex(expressionAsList, '(', index)
            }
        }.bind(this)
        if (currentIndex == expressionAsList.length - 1) return null;
        let viewedItem = expressionAsList[currentIndex];
        let index = currentIndex;
        let bracketsToOpen = 0;
        while (this.isItemNumberOrIn('*/',viewedItem)){
            console.log(viewedItem)
            console.log(index)
            // debugger
            if (this.isItemIn('*/', viewedItem)) {
                // debugger
                insertCloseBracket(expressionAsList, index)
                bracketsToOpen++
            }
            index = index + 1;
            // debugger
            viewedItem = expressionAsList[index]
        }
        // debugger
        insertAllOpenBrackets(expressionAsList, index + 1)
        // debugger
        console.log(expressionAsList)
        return index + bracketsToOpen
    }

    isItemNumberOrIn(listString, item) { 
        return this.isNumber(item) ? this.isNumber(item) : this.isItemIn(listString, item)
    }
    insertItemAtIndex(list, item, index){ 
        // debugger
        list.splice(index-1, 0, item)
        // debugger
    }
    isNumber(item){return !isNaN(item)}
    isOperator(item){return this.isItemIn('*/+-', item)}
    isBracket(item){return this.isItemIn('()', item)}
    isItemIn(listAsString, item) {return Array.from(listAsString).indexOf(item) == -1 ? false : true}
}