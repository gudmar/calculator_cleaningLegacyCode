


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
        return evaluateAndReturnResult(calculatedResult.toString(), this.expectedResult.toString())
        if (isNaN(parseFloat(calculatedResult)) || isNaN(parseFloat(this.expectedResult))) {
            return evaluateAndReturnResult(calculatedResult, this.expectedResult)
        } else {
            return evaluateAndReturnResult(parseFloat(calculatedResult), parseFloat(this.expectedResult))
        }
    }
}


let testCase1 = {
    name: '1 / 2 * 3',
    expression: '1/2*3',
    expectedResult: '(1/2)*3'
}
let testCase10 = {
    name: ' 1 / 2 * 3 / 4 * 5 / 6 / 7 / 8 ',
    expression: '1/2*3/4*5/6/7/8',
    expectedResult: '((((((1 / 2) * 3) / 4) * 5) / 6) / 7) / 8'
}
let testCase11 = {
    name: '1 / 2 * 9 * 3 / 4 * 5 / 6 / 7 / 8',
    expression: '1/2*9*3/4*5/6/7/8',
    expectedResult: '((((((1 / 2) * 9 * 3) / 4) * 5) / 6) / 7) / 8'
}
let testCase12 = {
    name: '1 / 2 - 1 / 2 * 9 * 3 / 4 * 5 / 6 / 7 / 8 + 1 / 2 * 5 * 2',
    expression: '1/2-1/2*9*3/4*5/6/7/8+1/2*5*2',
    expectedResult: '1/2-((((((1 / 2) * 9 * 3) / 4) * 5) / 6) / 7) / 8 + (1/2)*5*2'
}
let testCase13 = {
    name: '1 / 2 - 1 / 2 * 9 * 3 / 4 * 5 / 6 / 7 / 8 + 1 * 2 * 3 / 2 * 5 * 2 - 1 * 2 / 3 + 4',
    expression: '1/2-1/2*9*3/4*5/6/7/8+1*2*3/2*5*2-1*2/3+4',
    expectedResult: '1/2-((((((1 / 2) * 9 * 3) / 4) * 5) / 6) / 7) / 8 + ((1 * 2 * 3)/2)*5*2 - (1*2)/3 + 4'
}

let testCase95 = {
    name: '((1+2)*(3-4)*(5+6))/(7+8)*(9+10) [Brackets present: no change]',
    expression: '((1+2)*(3-4)*(5+6))/(7+8)*(9+10)',
    expectedResult: '((1+2)*(3-4)*(5+6))/(7+8)*(9+10)'
}
let testCase99 = {
    name: '((((((1/2)*3)/4)*5)/6)/7)/8 [Brackets present: no change',
    expression: '((((((1/2)*3)/4)*5)/6)/7)/8',
    expectedResult: '((((((1/2)*3)/4)*5)/6)/7)/8'
}
let testCase100 = {
    name: '(1+2)*(3-4)*(5+6)/(7+8)*(9+10)',
    expression: '(1+2)*(3-4)*(5+6)/(7+8)*(9+10)',
    expectedResult: '((1+2)*(3-4)*(5+6))/(7+8)*(9+10)'
}
let testCase101 = {
    name: '1/2*3/4*5/6/7/8',
    expression: '1/2*3/4*5/6/7/8',
    expectedResult: '((((((1/2)*3)/4)*5)/6)/7)/8'
    // ((((((1 / 2) * 3) / 4) * 5) / 6) / 7) / 8
}



// let allTestCases = [testCase1, testCase2, testCase3, testCase4, testCase5, 
//                     testCase6, testCase7, testCase9, testCase10, testCase11, 
//                     testCase12, testCase13, testCase14, testCase15, testCase16,
//                     testCase17, testCase18, testCase19, testCase20, testCase21,
//                     testCase22, testCase23, testCase24, testCase25, testCase26, testCase27, testCase28
//                 ];



let allTestCases = [ testCase1, testCase10, testCase11, testCase12, testCase13]


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
    
    let testedFunction = function(expressionAsString) { 
        let converter = new StringToExpression();    
        let bracketsAdder = new BracketsFromLeftAdderInCaseOfDivision()
        let expressionAsList = converter.convert(expressionAsString)
        return bracketsAdder.analyzeAndAddBrackets(expressionAsList).join('')
    }
    let expectedResultConverter = function(expressionAsString){
        let converter = new StringToExpression();
        return converter.convert(expressionAsString).join('')
    }
    let timeStamp0 = performance.now();
    for (let tc of allTestCases){
        let testCase = new Test(tc.name, tc.expression, expectedResultConverter(tc.expectedResult), testedFunction)
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