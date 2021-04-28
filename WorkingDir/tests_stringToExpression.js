


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
        console.log(`%cCalculated result for ${this.expression} is : ${calculatedResult}`, 'background-color: blue; color: white; font-weight: bold;')
        if (isNaN(parseFloat(calculatedResult)) || isNaN(parseFloat(this.expectedResult))) {
            return evaluateAndReturnResult(calculatedResult, this.expectedResult)
        } else {
            return evaluateAndReturnResult(parseFloat(calculatedResult), parseFloat(this.expectedResult))
        }
    }
}


let testCase1 = {
    name: '2 + 2',
    expression: '2+2',
    expectedResult: [2, '+', 2].toString()
}
let testCase2 = {
    name: '(2 + 2)',
    expression: '2+2',
    expectedResult: [2, '+', 2].toString()    
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
    name: '(2+3)-(4)',
    expression: '(2+3)-(4)',
    expectedResult: ['(', 2, '+', 3, ')', '-', '(', 4, ')'].toString()    
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
    expectedResult: 'error'
}
let testCase13 = {
    name: '23.',
    expression: '23.',
    expectedResult: [23].toString()
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
    expression: '2.34+-3.5',
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
    expectedResult: [2, '-', '(', '+', 3, '-', '(', '-', 4, '+', -5, ')'].toString()    
}
let testCase25 = {
    name: '2.1-(+3.1-(-4.1+-5.1))',
    expression: '2.1-(+3.1-(-4.1+-5.1))',
    expectedResult: [2.1, '-', '(', '+', 3.1, '-', '(', '-', 4.1, '+', -5.1, ')'].toString()    
}

let allTestCases = [testCase1, testCase2, testCase3, testCase4, testCase5, 
                    testCase6, testCase7, testCase9, testCase10, testCase11, 
                    testCase12, testCase13, testCase14, testCase15, testCase16,
                    testCase17, testCase18, testCase19, testCase20, testCase21,
                    testCase22, testCase23, testCase24, testCase25
                ];
// let allTestCases = [testCase1, testCase2, testCase3];

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
    let evaluator = function(expressionAsString) { 
        console.log(expressionAsString)
        let converter = stringToExpression;
        return stringToExpression(expressionAsString)
    }
    let comparationMethod = evaluator

    for (let tc of allTestCases){
        console.log(tc.expression)
        let testCase = new Test(tc.name, tc.expression, tc.expectedResult, evaluator)
        placer.addResult(tc.name, testCase.runTestAndReturnValue())
    }

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