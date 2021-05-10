

function _testedFunction(expressionAsString) {
    let calculator = new Calculator();
    return calculator.compute(expressionAsString)
}

function expressionConverter(expressionAsString) {
return expressionAsString
}

function _comparationFunction(a, b) { return a == b }



let testCase1 = {
    name: '2 + 2 = 4',
    expression: '2+2',
    expectedResult: '4'
}
let testCase2 = {
    name: '+/9',
    expression: '+/9',
    expectedResult: 'Error'
}
let testCase3 = {
    name: ' 9 / 0 = Infinity',
    expression: '9/0',
    expectedResult: 'Infinity'
}
let testCase4 = {
    name: ' - 9 / 0 = Infinity',
    expression: '-9/0',
    expectedResult: '-Infinity'
}
let testCase5 = {
    name: ' ((3-9) = Error',
    expression: '((3-9)',
    expectedResult: 'Error'
}
let testCase6 = {
    name: ' (3-9)) = Error',
    expression: '(3-9))',
    expectedResult: 'Error'
}
let testCase7 = {
    name: '9-1090 = - 1081',
    expression: '9-1090',
    expectedResult: '-1081'    
}
let testCase8 = {
    name: '(3-2)*(3+2) = 5',
    expression: '(3-2)*(3+2)',
    expectedResult: '5'        
}
let testCase9 = {
    name: '((3-2)*(3+2)+5)/(3+6+2-1) = 1',
    expression: '((3-2)*(3+2)+5)/(3+6+2-1)',
    expectedResult: '1'        
}
let testCase10 = {
    name: '10/4=2.5',
    expression: '10/4',
    expectedResult: '2.5'        
}
let testCase11 = {
    name: '2.5*2.5=6.25',
    expression: '2.5*2.5',
    expectedResult: '6.25'        
}
let testCase12 = {
    name: '1*2*3*4*5*6*7*8*9*10 = 3628800',
    expression: '1*2*3*4*5*6*7*8*9*10',
    expectedResult: '3628800'        
}
let testCase13 = {
    name: '10/3 = 3.3333333333333335',
    expression: '10/3',
    expectedResult: '3.3333333333333335'        
}
let testCase14 = {
    name: '10/-3 = -3.3333333333333335',
    expression: '10/-3',
    expectedResult: '-3.3333333333333335'      
}
let testCase15 = {
    name: '10/(-3) = -3.3333333333333335',
    expression: '10/(-3)',
    expectedResult: '-3.3333333333333335'
}
let testCase16 = {
    name: '3*(-3) = -9',
    expression: '3*(-3)',
    expectedResult: '-9'
}
let testCase17 = {
    name: '3*-3 = -9',
    expression: '3*-3',
    expectedResult: '-9'
}
let testCase18 = {
    name: '-3 = -3',
    expression: '-3',
    expectedResult: '-3'
}
let testCase19 = {
    name: '3 = 3',
    expression: '3',
    expectedResult: '3'
}
let testCase20 = {
    name: '(9/0)*(9/0)=Infinity',
    expression: '(9/0)*(9/0)',
    expectedResult: 'Infinity'
}
let testCase21 = {
    name: '(9/0)*(9/0)*(9-10)=-Infinity',
    expression: '(9/0)*(9/0)*(9-10)',
    expectedResult: '-Infinity'
}
let testCase22 = {
    name: '(-9*9)=-81',
    expression: '(-9*9)',
    expectedResult: '-81'    
}
let testCase23 = {
    name: '(3-4)*((9-8)/(10-100)*(((4-3)*(8-6))/(9-800))=-0.00002809383',
    expression: '(3-4)*((9-8)/(10-100)*(((4-3)*(8-6))/(9-800)))',
    expectedResult: '-0.00002809383340356792'    
}
let testCase24 = {
    name: '1/(2)+(1/4)+(1/(2*2*2)+(1/2*2*2*2)+1/(2*2*2*2*2))=4.90625',
    expression: '1/(2)+(1/4)+(1/(2*2*2)+(1/2*2*2*2)+1/(2*2*2*2*2))',
    expectedResult: '4.90625'    
}
let testCase25 = {
    name: '1/2*3/4*5=1.875',
    expression: '1/2*3/4*5',
    expectedResult: '1.875'    
}
let testCase26 = {
    name: '(9/0)*0=Infinity',
    expression: '(9/0)*0',
    expectedResult: 'Infinity'
}
let testCase27 = {
    name: '(1-9/0)*0=undefined',
    expression: '(1-9/0)*0',
    expectedResult: 'undefined'
}
let testCase28 = {
    name: '1/(2)+(1/4)+(1/(2*2*2)+(2*2*1/2*2*2*2)+1/(2*2*2*2*2))=16.90625',
    expression: '1/(2)+(1/4)+(1/(2*2*2)+(2*2*1/2*2*2*2)+1/(2*2*2*2*2))',
    expectedResult: '16.90625'
}
let testCase29 = {
    name: '1/2*2*2*2=4',
    expression: '1/2*2*2*2',
    expectedResult: '4'
}
let testCase30 = {
    name: '1/2/4/5=0.025',
    expression: '1/2/4/5',
    expectedResult: '0.025'
}

let testCases = [testCase1, testCase2, testCase3, testCase4, testCase5,
    testCase6, testCase7, testCase9, testCase10, testCase11,
    testCase12, testCase13, testCase14, testCase15, testCase16,
    testCase17, testCase18, testCase19, testCase20, testCase21,
    testCase22, testCase23, testCase24, testCase25, testCase27, testCase28, testCase30
];

