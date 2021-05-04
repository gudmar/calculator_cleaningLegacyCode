


class TestResultPlacer{
    constructor(targetId){
        this.tBodyId = targetId + 'tBodyId'
        this._placeStrContentToElementWithId(this._getTableWrapperTemplate(), targetId)
        this.index = 1;
    }
    _getTableWrapperTemplate(){
        return `
            <table>
                <thead>
                    <tr>
                        <th>Nr</th>
                        <th>Test Case</th>
                        <th>Result</th>
                    </tr>
                </thead>
                <tbody id = "${this.tBodyId}">
                </tbody>
            </table>
        `
    }

    _placeStrContentToElementWithId(strContent, id = this.tBodyId){
        document.getElementById(id).appendChild(this._str2element(strContent))
    }

    _str2element(str){
        let template = document.createElement('template');
        template.innerHTML = str;
        return template.content.cloneNode(true)
    }

    _isResultValid(result){
        return (result == 'PASS' || result == 'FAIL')?true:false
    }

    addResult(testName, result) {
        if (!this._isResultValid(result)) {
            throw new TypeError (`${this.constructor.name}: result should be 'PASS', or 'FAIL'`)
        }
        let strContent = `
            <tr class = '${result}'>
                <td>${this.index}</td>
                <td>${testName}</td>
                <td>${result}</td>
            </tr>
        `
        this._placeStrContentToElementWithId(strContent)
        this.index++;
    }
}

class Test{
    constructor(name, expressionAsString, expectedResult, expressionEvaluator){
        this.name = name;
        this.expression = expressionAsString;
        this.expectedResult = expectedResult;
        this.expressionEvaluator = expressionEvaluator
    }
    runTestAndReturnValue(){
        let calculatedResult = this.expressionEvaluator(this.expression)
        let evaluateAndReturnResult = function(evaluated, expected) {
            return evaluated == expected ? 'PASS' : 'FAIL'
        }
        console.log(`%cCalculated result for ${this.expression} is : ${calculatedResult}`, 'background-color: blue; color: white; font-weight: bold; padding: 5px;')
        if (isNaN(parseFloat(calculatedResult)) || isNaN(parseFloat(this.expectedResult))) {
            return evaluateAndReturnResult(calculatedResult, this.expectedResult)
        } else {
            return evaluateAndReturnResult(parseFloat(calculatedResult), parseFloat(this.expectedResult))
        }
    }
}


// let allTestCases = [testCase1, testCase2, testCase3, testCase4, testCase5, 
//                     testCase6, testCase7, testCase9, testCase10, testCase11, 
//                     testCase12, testCase13, testCase14, testCase15, testCase16,
//                     testCase17, testCase18, testCase19, testCase20, testCase21,
//                     testCase22, testCase23, testCase24, testCase25, testCase26
//                 ];

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






let allTestCases = [testCaseA, testCaseB, testCaseC, testCaseD, testCaseE,
    testCaseF, testCaseG, testCaseH, testCaseI, testCaseJ,
    testCaseK, testCaseL, testCaseM, testCaseN, testCaseO, 
    testCaseP, testCaseR, testCaseS, testCaseT, testCaseU, 
    testCaseW, testCaseX, testCaseY, testCaseZ, testCaseAA,
    testCaseAB, testCaseAC, testCaseAD
];

// let allTestCases = [testCaseJ]

function getPassRatio(){
    let passed = document.querySelectorAll('.PASS').length;
    let allTests = document.querySelector('tbody').querySelectorAll('tr').length;
    return Math.floor(passed/allTests*10000)/100 + '%'
}
function stringToElement(htmlString){
    let template = document.createElement('template')
    template.innerHTML = htmlString;
    return template.content.cloneNode(true)
}

(function runTestAndPlaceResults() {
    let placer = new TestResultPlacer('result')
    let validator = new StringExpressionValidator()
    let validate = function(expressionAsString) { 
        console.log(validator.validate(expressionAsString))
        return validator.validate(expressionAsString)
    }
    let comparationMethod = validate

    let timeStamp0 = performance.now();
    for (let tc of allTestCases){
        let testCase = new Test(tc.name, tc.expression, tc.expectedResult, validate)
        placer.addResult(tc.name, testCase.runTestAndReturnValue())
    }
    let timeStamp1 = performance.now();
    console.log(`%cExecution of tests took ${timeStamp1 - timeStamp0} ms`, 'background-color: green; color: white; padding: 5px; border-radius: 5px;')

})()

function appendPassRatio() {
    let output = `
    <div class="pass-ratio">
        Pass ratio is: ${getPassRatio()}
    </div>
    `
    document.getElementById('result').appendChild(stringToElement(output))
}

appendPassRatio();