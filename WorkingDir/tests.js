


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
        return parseFloat(this.expressionEvaluator(this.expression)) == parseFloat(this.expectedResult) ? 'PASS' : 'FAIL'
    }


}


let testCase1 = {
    name: '2 + 2 = 4',
    expression: '2+2',
    expectedResult: '4'

}



let allTestCases = [testCase1
                ];


(function runTestAndPlaceResults() {
    let placer = new TestResultPlacer('result')
    let evaluator = function(expressionAsString) { 
        console.log(expressionAsString)
        let converter = stringToExpression();
        return evaluate(infix2prefix(converter(expressionAsString)))
    }
    let comparationMethod = evaluator

    for (let tc of allTestCases){
        console.log(tc.expression)
        let testCase = new Test(tc.name, tc.expression, tc.expectedResult, evaluator)
        placer.addResult(tc.name, testCase.runTestAndReturnValue())
    }

})()