

function _testedFunction(expressionAsString) {
        let infixToPrefixConverter = new InfixToPrefix()
        let result = infixToPrefixConverter.convert(expressionAsString) 
        console.log(result)
        return result
}

function expressionConverter(expressionAsString) {
    return expressionAsString
}

function _comparationFunction(a, b) { return a == b }


let testCaseA = {
    name: '2 + 2',
    expression: ['2', '+', '2'],
    expectedResult: ['+', '2', '2']
}
let testCaseB = {
    name: '(3-2)*(3+2)',
    expression: ['(', 3, '-', 2, ')', '*', '(', 3, '+', 2, ')'],
    expectedResult: ["*", "-", 3, 2, "+", 3, 2]
}
let testCaseC = {
    name: '(3)',
    expression: ['(', 3, ')'],
    expectedResult: [3]
}
let testCaseD = {
    name: '((3-2)*(3+2)+5)/(3+6+2-1)',
    expression: ['(', '(', '3', '-', '2', ')', '*', '(', '3', '+', '2', ')', '+', '5', ')', '/', '(', '3', '+', '6', '+', '2', '-', '1', ')'],
    expectedResult: ['/', '+', '*', '-', '3', '2', '+', '3', '2', '5', '+', '3', '+', '6', '-', '2', '1']
}
let testCaseE = {
    name: '(1+(2+(3-(4*(5-6)/7)-8)/9)-0)',
    expression: ['(','1','+','(','2','+','(','3','-','(','4','*','(','5','-','6',')','/','7',')','-','8',')','/','9',')','-','0',')'],
    expectedResult: ['+','1','-','+','2','/','-','3','-','*','4','/','-','5','6','7','8','9','0']
}
let testCaseF = {
    name: '(1+2)*(3-4)/(5+6)*(7+8)/9',
    expression: ['(','1','+','2',')','*','(','3','-','4',')','/','(','5','+','6',')','*','(','7','+','8',')','/','9'],
    expectedResult: ['*','+','1','2','/','-','3','4','*','+','5','6','/','+','7','8','9']
}
let testCaseG = {
    name: '1+2+3+4+6+7+8+9+0+11',
    expression: ['1','+','2','+','3','+','4','+','6','+','7','+','8','+','9','+','0','+','11'],
    expectedResult: ['+','1','+','2','+','3','+','4','+','6','+','7','+','8','+','9','+','0','11']
}
let testCaseH = {
    name: '1/(2)+(1/4)+(1/(2*2*2)+(1/2*2*2*2)+1/(2*2*2*2*2))',
    expression: ['1','/','(','2',')','+','(','1','/','4',')','+','(','1','/','(','2','*','2','*','2',')','+','(','1','/','2','*','2','*','2','*','2',')','+','1','/','(','2','*','2','*','2','*','2','*','2',')',')'],
    expectedResult: ['+','/','1','2','+','/','1','4','+','/','1','*','2','*','2','2','+','/','1','*','2','*','2','*','2','2','/','1','*','2','*','2','*','2','*','2','2']
}
let testCaseI = {
    name: '1/2*2*2*2',
    expression: ['1','/','2','*','2','*','2','*','2'],
    expectedResult: ['+','/','1','2','+','/','1','4','+','/','1','*','2','*','2','2','+','/','1','*','2','*','2','*','2','2','/','1','*','2','*','2','*','2','*','2','2']
}


//  https://raj457036.github.io/Simple-Tools/prefixAndPostfixConvertor.html  - This one contains a bug)
//  https://www.web4college.com/converters/infix-to-postfix-prefix.php  - this one works


let testCases = [testCaseA, testCaseB, testCaseC, testCaseD, testCaseE, testCaseF, testCaseG, testCaseH]

