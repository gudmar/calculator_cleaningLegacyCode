class StringExpressionValidator{
    constructor(stringExpression){

    }

    validate(stringExpression){
        let notAllowedPatterns = [
            '[^0-9+\/\-*.]',
            '[^.]'
        ]


        let result = notAllowedPatterns.reduce((acc, pattern, index, arrayOfPatterns) => {
            if (index == 0) {acc = this.checkStringAgainstPattern(stringExpression, pattern)}
            return acc && this.checkStringAgainstPattern(stringExpression, pattern)
        })

        return result

    }

    checkStringAgainstPattern(expression, pattern){
        
        let regEx = new RegExp(pattern)
        return regEx.test(expression) ? true : false;
    }

}