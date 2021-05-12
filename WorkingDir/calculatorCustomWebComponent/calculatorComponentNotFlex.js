


class Calculator extends AbstractComponent{
    constructor() {
        super()

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
                --button-width: 30px;
                --button-height: 30px;
                --button-long: 60px;
                --button-font-size: 1.3rem;
            }
            .center{
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .housing {
                width: 500px;
                height: 500px;
                border-style: solid;
                border-width: 1px;
                border-color: black;
                border-radius: 5px;
                background-image: linear-gradient(-45deg, rgb(128, 128, 128), rgb(50, 50, 50));
                box-shadow: 1.5vw 1vw 4px rgb(0, 0, 0);
                margin: auto;

                .button {
                    float:left;
                    font-family: Arial, Helvetica, sans-serif;
                    font-size: 1.8em;
                    padding: 0;
                    border-width: 0.2em;
                    width: var(--button-width);
                    height: var(--button-height);
                    background: linear-gradient(-45deg, white, rgba(0, 0, 250, 0.1));
                }
                .button:hover {
                    background: linear-gradient(-45deg, white, rgba(70, 70, 250, 0.3));
                }
                .button:active {
                    background: linear-gradient(-45deg, yellow, rgba(70, 250, 250, 0.3));
                }
                .red-button {
                    background: linear-gradient(-45deg, red, rgba(250, 0, 0, 0.1));
                }
                .red-button:hover {
                    background: linear-gradient(-45deg, red, rgba(250, 70, 70, 0.7));
                }
                .orange-button {
                    background: linear-gradient(-45deg, green, rgba(0, 250, 0, 0.1));
                }
                .orange-button:hover {
                    background: linear-gradient(-45deg, green, rgba(0, 250, 0, 0.9));
                }
                .green-button {
                    background: linear-gradient(-45deg, orange, rgba(250, 0, 0, 0.1));
                }
                .green-button:hover {
                    background: linear-gradient(-45deg, orange, rgba(250, 70, 70, 0.7));
                }
                .heigh-button {
                    height: var(--button-long)
                }
                .wide-button {
                    width: var(--button-long)
                }
                .button-container{
                    display: flex;
                    flex-direcion: column;
                    align-content: center;
                }
                .button-row{
                    display: flex;
                    justify-content: center;
                    flex-direction: row;
                }
                .button-group{
                    display: flex;
                    justify-content: center;
                    flex-direction: column;                    
                }

            }
            @media screen and (max-width: 500px){
                .housing {
                    width: 300px;
                    height: 400px;
                }
                .controls{
                    flex-direction: row;
                }
                .heigh-button{
                    width: var(--button-long);
                    height: var(--button-height)
                }
                .button-group{
                    flex-direction: row;
                }
            }

            </style>
        
            <div class = "housing">
                <div class = "display"></div>
                <div class = "button-container">
                    <div class = "button-container controls"></div>
                    <div class = "button-container numbers">
                        <div class = "button-row" id="firstNumberRow"></div>
                        <div class = "button-row" id="secondNumberRow"></div>
                        <div class = "button-row" id="thirdNumberRow"></div>
                        <div class = "button-row" id="fourthNumberRow"></div>
                    </div>
                    <div class = "button-container operators"></div>
                        <div class = "button-group" id="firstOperatorsRow">
                            <div class = "button-row" id="operatorRow11"></div>
                            <div class = "button-row" id="operatorRow12"></div>
                        </div>
                        <div class = "button-group" id="secondOperatorsRow">
                            <div class = "button-row" id="operatorRow21"></div>
                            <div class = "button-row" id="operatorRow22"></div>
                        </div>
                    </div>
            </div>
        `
        }
        getControlButtonsAsString(){
            let buttons = [{label: 'IO', classes: '.red-button'},
            {label: 'CE', classes: '.green-button'},
            {label: 'C', classes: '.orange-button heigh-button'}]
            return this.getButtonsAsStrings(buttons)
        }
        addNumericButtons(rowNumber){
            switch(rowNumber){
                case 1: return this.getButtonsAsStrings([ 7, 8, 9])
                case 2: return this.getButtonsAsStrings([ 4, 5, 6])
                case 3: return this.getButtonsAsStrings([ 1, 2, 3])
                case 4: return this.getButtonsAsStrings([{label: '0', additionalClasses: 'button-width'}, '.'])
            }
        }
        addOperatorButtons(gorup, row){
            let descriptors = { '11': [{label: 'x', action: 'this.writeToDisplay("*")'}, {label: '(', action: 'this.writeToDisplay("(")'}],
                                '12': [{label: '/', action: 'this.writeToDisplay("/")'}, {label: ')', action: 'this.writeToDisplay(")")'}],
                                '21': [{label: '-', action: 'this.writeToDisplay("-")'}, {label: '=', action: 'this.writeToDisplay("=")'}],
                                '22': [{label: '+', action: 'this.writeToDioplay("+")'}]
                              }
            return this.getButtonsAsStrings(descriptors['' + gorup + row])
        }

        getButtonsAsStrings(buttonsDescriptor){
            let arrayOfStringButtons = buttonsDescriptor.map(this.getSingleButtonAsString)
            return arrayOfStringButtons.reduce((acc, element, index) => {
                if (index == 0) {acc = element; return acc;}
                acc = acc + element;
            })
        }

        getSingleButtonAsString(descriptor){
            let label = '', additionalClasses = '', action = '';
            if (typeof(descriptor) == number){
                label = descriptor.name;
                additionalClasses = descriptor.additionalClasses == undefined ? '' : descriptor.additionalClasses;
                action = `onclick = ${descriptor.action}` : `onclick = this.writeToDisplay(${`
            }
            
        }
    }




    attributeChangedCallback(name, oldValue, newValue) {
    }
    connectedCallback(){
    }




}
customElements.define('custom-claculator', Calculator)
