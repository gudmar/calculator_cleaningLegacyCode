


class CalculatorWidget extends AbstractComponent{
    constructor() {
        super()
        this.display = this.shadowRoot.querySelector('#display')
        this.isTurnedOn = true;
        this.calculator = new Calculator(6);
    }

    static get observedAttributes() {
        return []
    }

    _getOnOffClassName(){
        return this.stateOn?'slider-on':'slider-off'
    }
    _getTemplate(){
        return `
            <style>
            *{
                --button-width: 50px;
                --button-height: 50px;
                
                --button-font-size: 1.3rem;
                --button-border-width: 4px;
                --button-border-width: 0.2rem;
                --button-long: calc( 100px + calc( var(--button-border-width) * 2));
                --display-color: rgb(100, 250, 100);
            }
            .center{
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .housing {
                flex-direction: column;
                width: 420px;
                height: 400px;
                border-style: solid;
                border-width: 1px;
                border-color: black;
                border-radius: 5px;
                background-image: linear-gradient(-45deg, rgb(128, 128, 128), rgb(50, 50, 50));
                box-shadow: 1.5vw 1vw 4px rgb(0, 0, 0);
                margin: auto;
            }
            .display{
                width: 380;
                height: 100px;
                text-align: right;
                font-family: 'Courier New', Courier, monospace;
                color: var(--display-color);
                background-color: black;
                border: 4px inset rgb(118, 118, 118);
                font-size: 25px;
                padding: 5px;
                resize: none;
            }
            .display:focus{
                outline: none;
            }
            .display::-webkit-scrollbar {
                width: 6px;
            }
            .display::-webkit-scrollbar-thumb {
                background-color: rgb(100, 250, 100);
                border-radius: 3px;
              }

              .button-container{
                  border-radius: 3px;
                  border: solid rgb(60, 80, 90);
              }

            .button {
                float:left;
                font-family: Arial, Helvetica, sans-serif;
                font-size: 1.4em;
                padding: 0;
                border-width: var(--button-border-widht);
                width: var(--button-width);
                height: var(--button-height);
                background: linear-gradient(-45deg, white, rgba(0, 0, 250, 0.1));
                border-style: outset;
                border-color: rgb(118, 118, 118);
                border-image: initial;
                transition: 250ms;
            }
            .button:hover {
                background: linear-gradient(-45deg, white, rgba(70, 70, 250, 0.3));
                cursor: pointer;
                transition: 250ms;
            }
            .button:active {
                background: linear-gradient(-45deg, yellow, rgba(70, 250, 250, 0.3));
                transition: 250ms;
            }
            .red-button {
                background: linear-gradient(-45deg, red, rgba(250, 0, 0, 0.1));
            }
            .red-button:hover {
                background: linear-gradient(-45deg, red, rgba(250, 70, 70, 0.7));
            }
            .red-button:active {
                background: linear-gradient(-45deg, red, yellow);
                transition: 250ms;
            }
            .orange-button {
                
                background: linear-gradient(-45deg, orange, rgba(250, 0, 0, 0.1));
            }
            .orange-button:hover {
                
                background: linear-gradient(-45deg, orange, rgba(250, 70, 70, 0.7));
            }
            .orange-button:active {
                background: linear-gradient(-45deg, orange, red);
                transition: 250ms;
            }
            .green-button {
                background: linear-gradient(-45deg, green, rgba(0, 250, 0, 0.1));
            }
            .green-button:hover {
                background: linear-gradient(-45deg, green, rgba(0, 250, 0, 0.9));
            }
            .green-button:active {
                background: linear-gradient(-45deg, yellow, rgba(70, 250, 250, 0.3));
                transition: 250ms;
            }
            .heigh-button {
                height: var(--button-long)
            }
            .wide-button {
                width: var(--button-long)
            }
            .button-absolute{
                position: absolute;
                bottom: 0;
            }
            .button-wrapper{
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                width: 400;
                padding: 10px;
            }
            .button-container{
                display: flex;
                align-content: center;
                position: relative;
            }
            .controls{
                width: calc( calc(var(--button-width) * 1) + calc(2 * var(--button-border-width)));
                flex-direction: column;
            }
            .numbers {
                width: calc( calc(var(--button-width) * 3) + calc(6 * var(--button-border-width)));
                flex-wrap: wrap;
            }
            .operators{
                width: calc( calc(var(--button-width) * 2) + calc(4 * var(--button-border-width)));
                flex-wrap: wrap;
            }

            @media screen and (max-width: 500px){
                *{
                    --button-width: 40px;
                    --button-height: 40px;
                    
                    --button-font-size: 1.3rem;
                    --button-border-width: 4px;
                    --button-border-width: 0.2rem;
                    --button-long: calc( 80px + calc( var(--button-border-width) * 2));
                }
                .housing {
                    width: 220px;
                    height: 460px;
                }
                .display {
                    width: 85%;
                }
                .controls{
                    flex-direction: row;
                    width: calc( calc(var(--button-width) * 4) + calc(8 * var(--button-border-width)));
                }
                .heigh-button{
                    width: var(--button-long);
                    height: var(--button-height)
                }
                .wide-button{
                    width: var(--button-width);
                    height: var(--button-long)
                }
                .button-group{
                    flex-direction: row;
                }
                .button-wrapper{
                    padding-top: 10px;
                    padding-bottom: 0px;
                    height: calc( var(--button-height) * 8);
                    width: calc( calc(var(--button-width) * 4) + calc(8 * var(--button-border-width)));
                    flex-direction: column;
                }
                .button-absolute{
                    position: static;
                }
                .numbers{
                    width: calc( calc(var(--button-width) * 4) + calc(8 * var(--button-border-width)));
                    flex-direction: row;
                }
                .numbers-group-1{
                    width: calc( calc(var(--button-width) * 3) + calc(6 * var(--button-border-width)));
                }
                .numbers-group-2{
                    width: calc( calc(var(--button-width) * 1) + calc(2 * var(--button-border-width)));
                }
                .operators{
                    width: calc( calc(var(--button-width) * 4) + calc(8 * var(--button-border-width)));
                }
            }

            </style>
        
            <div class = "housing center">
                <textarea class = "display" id = "display" spellcheck=false>0</textarea>
                <div class = "button-wrapper">
                    <div class = "button-container controls">${this.getControlButtonsAsString()}</div>
                    <div class = "button-container numbers">
                        <div class = "numbers-group-1">${this.getNumericButtonsAsString(1)}</div>
                        <div class = "numbers-group-2">${this.getNumericButtonsAsString(2)}</div>
                    </div>                
                    <div class = "button-container operators">${this.getOperatorButtonsAsString()}</div>
                </div>
            </div>
        `
        // <input type="text" class = "display" id = "display" spellcheck=false value=0>
        }
        getControlButtonsAsString(){
            let buttons = [{label: 'IO', additionalClasses: 'red-button'},
            {label: 'CE', additionalClasses: 'green-button'},
            {label: 'C', additionalClasses: 'orange-button heigh-button'}]
            return this.getButtonsAsStrings(buttons)
        }
        getNumericButtonsAsString(groupNr){
                let descriptor1 = [ 7, 8, 9, 4, 5, 
                                    6, 1, 2, 3
                                  ]
                let descriptor2 = ['.', {label: '0', additionalClasses: 'wide-button'}]
                return groupNr == 1 ? this.getButtonsAsStrings(descriptor1) : this.getButtonsAsStrings(descriptor2)
            }

        getOperatorButtonsAsString() {
            let descriptors =  ['x', '(', '/', ')', '-', {label: '=', additionalClasses: `heigh-button`},
                                {label: '+', additionalClasses: 'button-absolute'}]
            return this.getButtonsAsStrings(descriptors)
        }

        getButtonsAsStrings(buttonsDescriptor){
            let arrayOfStringButtons = buttonsDescriptor.map(this.getSingleButtonAsString.bind(this))
            console.log(arrayOfStringButtons)
            return arrayOfStringButtons.join('')
            return arrayOfStringButtons.reduce((acc, element, index) => {
                if (index == 0) {acc = element; return acc;}
                acc = acc + element;
            })
        }

        getSingleButtonAsString(descriptor){
            let label = '', additionalClasses = '', action = '';
            
            if (this.isItemIn('1234567890()*x/+-.', descriptor)){
                label = '' + descriptor;
            }
            if (typeof(descriptor) == 'object'){
                label = descriptor.label;
                additionalClasses = descriptor.additionalClasses == undefined ? '' : descriptor.additionalClasses;
            }
            return `<div class = 'button center ${additionalClasses}'>${label}</div>`
        }

        addEventListenersToButtons(){
            let allButtons = this.shadowRoot.querySelectorAll('.button')
            let getCallbackForEventListner = function(buttonAsElement){
                let buttonLabel = buttonAsElement.innerText;
                if (this.isItemIn('1234567890()/+-.', buttonLabel)) return this.writeToDisplay.bind(this, buttonLabel)
                if (buttonLabel == 'CE') return this.removeLastFromDisplay.bind(this)
                if (buttonLabel == 'C') return this.replaceDisplayContent.bind(this, '0')
                if (buttonLabel == 'IO') return this.turnOnOff.bind(this)
                if (buttonLabel == '=') return this.computeFilnaResult.bind(this)
                if (buttonLabel == 'x') return this.writeToDisplay.bind(this, '*')
            }.bind(this)
            let addEventListenerToButton = function(buttonAsElement){
                buttonAsElement.addEventListener('click', getCallbackForEventListner.call(this, buttonAsElement))
            }.bind(this)
            allButtons.forEach(addEventListenerToButton)
            
        }

        removeLastFromDisplay(){
            if (!this.isTurnedOn) return null;
            let currentDisplay = this.readFromDisplay();

            if (this.isSymbolResettingDisplayDisplayed()) {this.replaceDisplayContent('0'); return null};
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

        isSymbolResettingDisplayDisplayed(){
            let currentDisplay = this.readFromDisplay();
            let symbolsResettingDisplay = [
                /Infinity/,
                /Error/,
                /undefined/
            ]
            for (let s of symbolsResettingDisplay){
                if (s.test(currentDisplay)) return true
            }
            return false;
        }

        writeToDisplay(character){
            let currentDisplay = this.readFromDisplay();
            if (!this.isTurnedOn) return null;
            if (this.isSymbolResettingDisplayDisplayed()) {this.replaceDisplayContent(character); return null;}
            if ((currentDisplay == 0) && !this.isOperator(character)) {
                this.replaceDisplayContent(character)
            }
            else {
                this.display.value = currentDisplay + character
            }
        }

        isOperator(character) {return this.isItemIn('+x*-/')}

        replaceDisplayContent(expressionAsString){
            this.display.value = expressionAsString
        }

        readFromDisplay(){
            console.log(this.display['value'])
            return this.display.value;
        }

        computeFilnaResult(){
            if (!this.isTurnedOn) return null;
            this.replaceDisplayContent(this.calculator.compute(this.readFromDisplay()))
        }
    
        turnOnOff(){
            this.isTurnedOn = !this.isTurnedOn
            if (this.isTurnedOn) {this.replaceDisplayContent('0')}
            else (this.replaceDisplayContent(''))
        }




    attributeChangedCallback(name, oldValue, newValue) {
    }
    connectedCallback(){
        this.addEventListenersToButtons();
    }




}
customElements.define('custom-claculator', CalculatorWidget)
