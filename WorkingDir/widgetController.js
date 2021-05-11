class CalculatorHardwareController{
    constructor(){
        this.display = document.getElementById('display');
        this.calculator = new Calculator();
        this.isTurnedOn = true;
    }

    coputeFilalResult(){
        if (!this.isTurnedOn) return null;
        this.replaceDisplayContent(this.calculator.compute(this.readFromDisplay()))
    }

    turnOnOff(){
        this.isTurnedOn = !this.isTurnedOn
        if (this.isTurnedOn) {this.replaceDisplayContent('0')}
        else (this.replaceDisplayContent(''))
    }

    addToDisplay(character){
        if (!this.isTurnedOn) return null;
        if ((this.display.value == 0) && !this.isOperator(character)) replaceDisplayContent(character)
        else {
            
            this.display.value = this.display.value + character
        }
    }

    isOperator(character) {return Array.from('*/+-').indexOf(character) != -1 ? true : false}

    replaceDisplayContent(expressionAsString){
        this.display.value = expressionAsString
    }

    readFromDisplay(){
        return this.display.value;
    }

    removeLastFromDisplay(){
        if (!this.isTurnedOn) return null;
        let currentDisplay = this.readFromDisplay();
        let symbolsResettingDisplay = [
            /Infinity/,
            /0/,
            /Error/,
            /undefined/
        ]
        let isResettingSymbol = function() {
            for (let s of symbolsResettingDisplay){
                if (s.test(currentDisplay)) return true
            }
            return false;
        }
        if (isResettingSymbol()) {replaceDisplayContent('0'); return null};
        if (currentDisplay.length == 1) {
            if (currentDisplay == 0) return null
            else {this.replaceDisplayContent('0'); return null}
        } else if (currentDisplay.length > 1) {
            this.replaceDisplayContent(currentDisplay.slice(0, currentDisplay.length - 1))
            return null;
        } else {
            this.replaceDisplayContent('0');
        }
    }

}

let c = new CalculatorHardwareController();

function addToDisplay(character){
	c.addToDisplay(character)
}

function turnOnOff(){
    c.turnOnOff();
}

function replaceDisplayContent(expressionAsString){
	c.replaceDisplayContent(expressionAsString)
}

function removeLastFromDisplay(){
    c.removeLastFromDisplay();
}

function finalResult() {
    c.coputeFilalResult()
}