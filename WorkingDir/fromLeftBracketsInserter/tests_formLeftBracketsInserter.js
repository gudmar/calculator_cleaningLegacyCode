


let testCase1 = {
    name: '1 / 2 * 3',
    expression: '1/2*3',
    expectedResult: '(1/2)*3'
}
let testCase2 = {
    name: ' 1 / 2 * 3 / 4 * 5 / 6 / 7 / 8 ',
    expression: '1/2*3/4*5/6/7/8',
    expectedResult: '((((((1 / 2) * 3) / 4) * 5) / 6) / 7) / 8'
}
let testCase3 = {
    name: '1 / 2 * 9 * 3 / 4 * 5 / 6 / 7 / 8',
    expression: '1/2*9*3/4*5/6/7/8',
    expectedResult: '((((((1 / 2) * 9 * 3) / 4) * 5) / 6) / 7) / 8'
}
let testCase4 = {
    name: '1 / 2 - 1 / 2 * 9 * 3 / 4 * 5 / 6 / 7 / 8 + 1 / 2 * 5 * 2',
    expression: '1/2-1/2*9*3/4*5/6/7/8+1/2*5*2',
    expectedResult: '1/2-((((((1 / 2) * 9 * 3) / 4) * 5) / 6) / 7) / 8 + (1/2)*5*2'
}
let testCase5 = {
    name: '1 / 2 - 1 / 2 * 9 * 3 / 4 * 5 / 6 / 7 / 8 + 1 * 2 * 3 / 2 * 5 * 2 - 1 * 2 / 3 + 4',
    expression: '1/2-1/2*9*3/4*5/6/7/8+1*2*3/2*5*2-1*2/3+4',
    expectedResult: '1/2-((((((1 / 2) * 9 * 3) / 4) * 5) / 6) / 7) / 8 + ((1 * 2 * 3)/2)*5*2 - (1*2)/3 + 4'
}

let testCase6 = {
    name: '((19+29))/(79+89)',
    expression: '((19+29))/(79+89)',
    expectedResult: '((19+29))/(79+89)'
}

let testCase7 = {
    name: '(((1+2)*(3-4)*(5+6))/(7+8))*(9+10) [Brackets present: no change]',
    expression: '(((1+2)*(3-4)*(5+6))/(7+8))*(9+10)',
    expectedResult: '(((1+2)*(3-4)*(5+6))/(7+8))*(9+10)'
}
let testCase8 = {
    name: '((((((1/2)*3)/4)*5)/6)/7)/8 [Brackets present: no change',
    expression: '((((((1/2)*3)/4)*5)/6)/7)/8',
    expectedResult: '((((((1/2)*3)/4)*5)/6)/7)/8'
}
let testCase9 = {
    name: '(1+2)*(3-4)*(5+6)/(7+8)*(9+10)',
    expression: '(1+2)*(3-4)*(5+6)/(7+8)*(9+10)',
    expectedResult: '(((1+2)*(3-4)*(5+6))/(7+8))*(9+10)'
}
let testCase10 = {
    name: '1/2*3/4*5/6/7/8',
    expression: '1/2*3/4*5/6/7/8',
    expectedResult: '((((((1/2)*3)/4)*5)/6)/7)/8'
}
let testCase11 = {
    name: '(1+2)/(3+4)*(5+6)/(7-8)*(9-10)/(11-12)/(13-14)/(15-16)',
    expression: '(1+2)/(3+4)*(5+6)/(7-8)*(9-10)/(11-12)/(13-14)/(15-16)',
    expectedResult: '(((((((1+2)/(3+4))*(5+6))/(7-8))*(9-10))/(11-12))/(13-14))/(15-16)'
}
let testCase12 = {
    name: '(1+2)*((3-2)/((3-2)/(4-(1*(1*4*5/2*3)*5/2*3))-2)*(5+6)/(7+8)*(9+10)',
    expression: '(((((1+2)*(3-2))/((3-2)/(4-(((1*(((1*4*5)/2)*3)*5)/2)*3))-2))*(5+6))/(7+8))*(9+10)',
    expectedResult: '(((((1+2)*(3-2))/((3-2)/(4-(((1*(((1*4*5)/2)*3)*5)/2)*3))-2))*(5+6))/(7+8))*(9+10)'
}

let testCases = [testCase1, testCase2, testCase3, testCase4, testCase5, testCase6, 
                                testCase7, testCase8, testCase10, testCase11, testCase12
                ];


function _testedFunction(expressionAsString) {
    let converter = new StringToExpression();
    let bracketsAdder = new NestedExpressionInserter()
    let expressionAsList = converter.convert(expressionAsString)
    return bracketsAdder.addBrackets(expressionAsList).join('')
}

function expressionConverter(expressionAsString) {
    let converter = new StringToExpression();
    return converter.convert(expressionAsString).join('')
}

function _comparationFunction(a, b) { return a == b }
                
                