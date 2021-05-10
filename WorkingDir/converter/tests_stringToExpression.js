


let testCase1 = {
    name: '2 + 2',
    expression: '2+2',
    expectedResult: [2, '+', 2].toString()
}
let testCase2 = {
    name: '(2 + 2)',
    expression: '(2+2)',
    expectedResult: ['(', 2, '+', 2, ')'].toString()    
}
let testCase3 = {
    name: '-2',
    expression: '-2',
    expectedResult: [-2].toString()    
}
let testCase4 = {
    name: '-2-3',
    expression: '-2-3',
    expectedResult: [-2, '-', 3].toString()    
}
let testCase5 = {
    name: '--2',
    expression: '--2',
    expectedResult: [2].toString()    
}
let testCase6 = {
    name: '+2',
    expression: '+2',
    expectedResult: [2].toString()    
}
let testCase7 = {
    name: '+++2',
    expression: '+++2',
    expectedResult: [2].toString()    
}
let testCase8 = {
    name: '--++-3',
    expression: '--++-3',
    expectedResult: [-3].toString()    
}
let testCase9 = {
    name: '(2+3)-(4.3)',
    expression: '(2+3)-(4.3)',
    expectedResult: ['(', 2, '+', 3, ')', '-', '(', 4.3, ')'].toString()    
}
let testCase10 = {
    name: 'd',
    expression: 'd',
    expectedResult: 'error' 
}
let testCase11 = {
    name: '2.3.4',
    expression: '2.3.4',
    expectedResult: 'error'
}
let testCase12 = {
    name: '.23',
    expression: '.23',
    expectedResult: '0.23'
}
let testCase13 = {
    name: '23.',
    expression: '23.',
    expectedResult: '23'
}
let testCase14 = {
    name: '*2',
    expression: '*2',
    expectedResult: 'error'
}
let testCase15 = {
    name: '3/-2',
    expression: '3/-2',
    expectedResult: [3, '/', -2].toString()    
}
let testCase16 = {
    name: '2-/3',
    expression: '2-/3',
    expectedResult: 'error'
}
let testCase17 = {
    name: '34.4235',
    expression: '34.4235',
    expectedResult: [34.4235]
}
let testCase18 = {
    name: '2.34+-3.4',
    expression: '2.34+-3.4',
    expectedResult: [2.34, '+', -3.4].toString()    
}
let testCase19 = {
    name: '2--3',
    expression: '2--3',
    expectedResult: [2, '-', -3].toString()    
}
let testCase20 = {
    name: '2-+3',
    expression: '2-+3',
    expectedResult: [2, '-', 3].toString()    
}
let testCase21 = {
    name: '2++3',
    expression: '2++3',
    expectedResult: [2, '+', 3].toString()    
}
let testCase22 = {
    name: '2+++3',
    expression: '2+++3',
    expectedResult: [2, '+', 3].toString()    
}
let testCase23 = {
    name: '2---3',
    expression: '2---3',
    expectedResult: [2, '-', 3].toString()    
}
let testCase24 = {
    name: '2-(+3-(-4+-5))',
    expression: '2-(+3-(-4+-5))',
    expectedResult: [2, '-', '(', 3, '-', '(', '-4', '+', -5, ')', ')'].toString()    
}
let testCase25 = {
    name: '2.1-(+3.1-(-4.1+-5.1))',
    expression: '2.1-(+3.1-(-4.1+-5.1))',
    expectedResult: [2.1, '-', '(', 3.1, '-', '(', -4.1, '+', -5.1, ')', ')'].toString()    
}
let testCase26= {
    name: '2-',
    expression: '2-',
    expectedResult: 'error'    
}
let testCase27 = {
    name: '(2+3)-+-+-(4)',
    expression: '(2+3)-+-+-(4)',
    expectedResult: ['(', 2, '+', 3, ')', '-', '(', 4, ')'].toString()    
}
let testCase28 = {
    name: '1/(2)+(1/4)+(1/(2*2*2)+(1/2*2*2*2)+1/(2*2*2*2*2))',
    expression: '1/(2)+(1/4)+(1/(2*2*2)+(1/2*2*2*2)+1/(2*2*2*2*2))',
    expectedResult: ['1','/','(','2',')','+','(','1','/','4',')','+','(','1','/','(','2','*','2','*','2',')','+','(','1','/','2','*','2','*','2','*','2',')','+','1','/','(','2','*','2','*','2','*','2','*','2',')',')'].toString()    
}
let testCase29 = {
    name: '1/2*2*2*2',
    expression: '1/2*2*2*2',
    expectedResult: ['/','1','*','2','*','2','*','2','2'].toString()    
}

let testCases = [testCase1, testCase2, testCase3, testCase4, testCase5, 
                    testCase6, testCase7, testCase9, testCase10, testCase11, 
                    testCase12, testCase13, testCase14, testCase15, testCase16,
                    testCase17, testCase18, testCase19, testCase20, testCase21,
                    testCase22, testCase23, testCase24, testCase25, testCase26, testCase27, testCase28
                ];



function _testedFunction(expressionAsString) {

        let converter = new StringToExpression();
        return converter.convert(expressionAsString)
}

function _comparationFunction(a, b) { return a == b }