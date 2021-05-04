


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
    name: '10/-3 = Error',
    expression: '10/-3',
    expectedResult: 'Error'        
}
let testCase15 = {
    name: '10/(-3) = -3.3333333333333335',
    expression: '10/(-3)',
    expectedResult: '3.3333333333333335'
}
let testCase16 = {
    name: '3*(-3) = -9',
    expression: '3*(-3)',
    expectedResult: '-9'
}
let testCase17 = {
    name: '3*-3 = Error',
    expression: '3*-3',
    expectedResult: 'Error'
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
    expectedResult: '-0.00002809383'    
}
let testCase24 = {
    name: '1/(2)+(1/4)+(1/(2*2*2)+(1/2*2*2*2)+1/(2*2*2*2*2)=4.90625',
    expression: '(3-4)*((9-8)/(10-100)*(((4-3)*(8-6))/(9-800)))',
    expectedResult: '4.90625'    
}
let testCase25 = {
    name: '1/2*3/4*5=1.875',
    expression: '1/2*3/4*5',
    expectedResult: '1.875'    
}
let testCase26 = {
    name: '(9/0)*0=undefined',
    expression: '(9/0)*0',
    expectedResult: 'undefined'
}
let testCase27 = {
    name: '(1-9/0)*0=undefined',
    expression: '(1-9/0)*0',
    expectedResult: 'undefined'
}

let allTestCases = [testCase1, testCase2, testCase3, testCase4, testCase5, 
                    testCase6, testCase7, testCase9, testCase10, testCase11, 
                    testCase12, testCase13, testCase14, testCase15, testCase16,
                    testCase17, testCase18, testCase19, testCase20, testCase21,
                    testCase22, testCase23, testCase24, testCase25, testCase27
                ];
// let allTestCases = [testCase9
// ];

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
        let converterInstance = new StringToExpression()
        let converter = converterInstance;
        console.log(converter.convert(expressionAsString))
        return evaluate(infix2prefix(converter.convert(expressionAsString)))
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