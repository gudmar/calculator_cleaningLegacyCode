


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
                        <th>Test Name</th>
                        <th>Test expression</th>
                        <th>Calculated result</th>
                        <th>Expected result</th>
                        <th>Passed/ Failed</th>
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

    addResult({testName, testedExpression, calculatedResult, expectedResult, passedFailed}) {
        if (!this._isResultValid(passedFailed)) {
            throw new TypeError (`${this.constructor.name}: result should be 'PASS', or 'FAIL'`)
        }
        let strContent = `
            <tr class = '${passedFailed}'>
                <td>${this.index}</td>
                <td>${testName}</td>
                <td>${testedExpression}</td>
                <td>${calculatedResult}</td>
                <td>${expectedResult}</td>
                <td>${passedFailed}</td>
            </tr>
        `
        this._placeStrContentToElementWithId(strContent)
        this.index++;
    }
}

class Test{
    constructor({name, testedExpression, expectedResult, testedFunction, comparationFunction = (a, b) => {return a == b}}){
        this.name = name;
        this.expression = testedExpression;
        this.expectedResult = expectedResult;
        this.testedFunction = testedFunction
    }
    runTestAndReturnValue(){
        let calculatedResult = this.testedFunction(this.expression)
        let evaluateAndReturnResult = function(evaluated, expected) {
            return evaluated == expected ? 'PASS' : 'FAIL'
        }
        console.log(`%cCalculated result for ${this.expression} is : ${calculatedResult}`, 'background-color: blue; color: white; font-weight: bold;')
        calculatedResult = calculatedResult == undefined ? 'undefined' : calculatedResult.toString();
        return evaluateAndReturnResult(calculatedResult.toString(), this.expectedResult.toString())
    }
}


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
    let _expressionConverter = function(expression) {return expression};
    try{
        _expressionConverter = expressionConverter;
    } catch (e){
        console.log('Probably expression converter is undefined. Not a big of a deal..')
    }

    let timeStamp0 = performance.now();

    
    for (let tc of testCases){
        let testCase = new Test({
            name: tc.name, 
            testedExpression: tc.expression, 
            expectedResult: _expressionConverter(tc.expectedResult), 
            testedFunction: _testedFunction,
            comparationFunction: _comparationFunction
        })

        console.log(tc.expression)

        placer.addResult({
            testName: tc.name, 
            testedExpression: tc.expression,
            calculatedResult: _testedFunction(tc.expression),
            expectedResult: tc.expectedResult,
            passedFailed: testCase.runTestAndReturnValue()
        })
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
