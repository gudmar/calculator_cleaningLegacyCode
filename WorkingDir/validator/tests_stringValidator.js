

function _testedFunction(expressionAsString) {
    let validator = new StringExpressionValidator()
    return validator.validate(expressionAsString)
}

function expressionConverter(expressionAsString) {
return expressionAsString
}

function _comparationFunction(a, b) { return a == b }


let testCaseA = {
    name: '2 => valid',
    expression: '2',
    expectedResult: true
}
let testCaseB = {
    name: '+2 => valid',
    expression: '+2',
    expectedResult: true
}
let testCaseC = {
    name: '2 => valid',
    expression: '2',
    expectedResult: true
}
let testCaseD = {
    name: '34d+ => not valid',
    expression: '34d+',
    expectedResult: false
}
let testCaseE = {
    name: '3+ => not valid',
    expression: '3+',
    expectedResult: false
}
let testCaseF = {
    name: '3. => valid',
    expression: '3.',
    expectedResult: true
}
let testCaseG = {
    name: '.4 => valid',
    expression: '.4',
    expectedResult: true
}
let testCaseH = {
    name: '3.4 => valid',
    expression: '3.4',
    expectedResult: true
}
let testCaseI = {
    name: '3.4323.43 => not valid',
    expression: '3.4323.43',
    expectedResult: false
}
let testCaseJ = {
    name: '(2*3)/(3--3) => valid',
    expression: '(2*3)/(3--3)',
    expectedResult: true
}
let testCaseK = {
    name: '(2*3.43)/(3.4--3.5) => valid',
    expression: '(2*3.43)/(3.4--3.5)',
    expectedResult: true
}
let testCaseL = {
    name: ')/(3.4--3.5) => not valid',
    expression: ')/(3.4--3.5)',
    expectedResult: false
}
let testCaseM = {
    name: '(3.4--3.5 => not valid',
    expression: '(3.4--3.5',
    expectedResult: false
}
let testCaseN = {
    name: '3.45*)5.4+44.34(-(5+6)*4 => not valid',
    expression: '3.45*)5.4+44.34(-(5+6)*4',
    expectedResult: false
}
let testCaseO = {
    name: '3+(.)-4 => not valid',
    expression: '3+(.)-4',
    expectedResult: false    
}
let testCaseP = {
    name: '(3 + 4) * 5',
    expression: '(3 + 4) * 5',
    expectedResult: true    
}
let testCaseR = {
    name: '(3 + 4 3) * 5 5 => not valid',
    expression: '(3 + 4 3) * 5 5',
    expectedResult: false
}
let testCaseS = {
    name: '4/-5 => valid',
    expression: '4/-5',
    expectedResult: true
}
let testCaseT = {
    name: '4-/5 => not valid',
    expression: '4-/5',
    expectedResult: false
}
let testCaseU = {
    name: '4.43//5.44 => not valid',
    expression: '4.43//5.44',
    expectedResult: false
}
let testCaseW = {
    name: '(4-5.43)(4-5) => not valid',
    expression: '(4-5.43)(4-5)',
    expectedResult: false
}
let testCaseX = {
    name: '+-+-++-- => not valid',
    expression: '+-+-++--',
    expectedResult: false
}
let testCaseY = {
    name: '34-43- => not valid',
    expression: '34-43-',
    expectedResult: false
}
let testCaseZ = {
    name: '123123-433243+(243.5342 / 43242) => valid',
    expression: '123123-433243+(243.5342 / 43242)',
    expectedResult: true
}
let testCaseAA = {
    name: '    234-4432    => valid [spaces at one or both sides]',
    expression: '    234-4432    ',
    expectedResult: true
}
let testCaseAB = {
    name: '.=> not valid',
    expression: '.',
    expectedResult: false
}
let testCaseAC = {
    name: '5-=> not valid',
    expression: '.',
    expectedResult: false
}
let testCaseAD = {
    name: '-.=> not valid',
    expression: '-.',
    expectedResult: false
}


let testCases = [testCaseA, testCaseB, testCaseC, testCaseD, testCaseE,
    testCaseF, testCaseG, testCaseH, testCaseI, testCaseJ,
    testCaseK, testCaseL, testCaseM, testCaseN, testCaseO, 
    testCaseP, testCaseR, testCaseS, testCaseT, testCaseU, 
    testCaseW, testCaseX, testCaseY, testCaseZ, testCaseAA,
    testCaseAB, testCaseAC, testCaseAD
];
