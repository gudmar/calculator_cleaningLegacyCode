


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
        // if (isNaN(parseFloat(calculatedResult)) || isNaN(parseFloat(this.expectedResult))) {
        //     return evaluateAndReturnResult(calculatedResult, this.expectedResult)
        // } else {
        //     return evaluateAndReturnResult(parseFloat(calculatedResult), parseFloat(this.expectedResult))
        // }
    }
}


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

let addingBracketsTestCases = [testCase1, testCase2, testCase3, testCase4, testCase5, testCase6, 
                                testCase7, testCase8, testCase10, testCase11, testCase12
                ];


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
        // let bracketsAdder = new BracketsFromLeftAdderInCaseOfDivision()
        let bracketsAdder = new NestedExpressionInserter()
        let expressionAsList = converter.convert(expressionAsString)
        return bracketsAdder.addBrackets(expressionAsList).join('')
        // return bracketsAdder.analyzeAndAddBrackets(expressionAsList).join('')
    }
    let expectedResultConverter = function(expressionAsString){
        let converter = new StringToExpression();
        return converter.convert(expressionAsString).join('')
    }
    let timeStamp0 = performance.now();
    for (let tc of addingBracketsTestCases){
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

// ==============================  Testing extraction of first layer ============================================
let extractor = new ExpressionInBracketExtractor()
let converter = new StringToExpression()
let extractionInverter = new NestedExpressionInserter();
// let converter1 = new StringToExpression()
let testCases = {
    testCaseA: '2+(3/4)-(4*5/6)+((3+5)/(5-9))+(4-4)',
    testCaseB: '2/3/4/5 * 8 * 9 + 4',
    testCaseC: '((2/3/4/5 * 8 * 9 + 4))',
    testCaseD: '((1+2)*(3-4)*(5+6))/(7+8)*(9+10)',
    testCaseE: '((1+2))/(7+8)'
}

// for (let test in testCases) {
//     console.log('%c' + test.toUpperCase(), 'background-color: black; color: white; padding: 5px; border-radius: 5px; font-weight: bold;');
//     let tc = converter.convert(testCases[test])
//     let {mappingObject, expression} = extractor.replaceFirstLayerBrackets(tc);
//     console.log(testCases[test])
//     console.log({mappingObject, expression})
//     console.log(extractionInverter.replacePlaceholdersWithExpressions(expression, mappingObject))
// }


