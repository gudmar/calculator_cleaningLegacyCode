


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
                
                --button-font-size: 1.3rem;
                --button-border-width: 4px;
                --button-border-width: 0.2rem;
                --button-long: calc( 60px + calc( var(--button-border-width) * 2));
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
            .button-absolute{
                position: absolute;
                bottom: 0;
            }
            .button-wrapper{
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                width: calc( calc( var(--button-border-width) * 2) * 8);
                width: 80%;
                padding: 30px;
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
                .housing {
                    width: 300px;
                    height: 400px;
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
                    height: calc( var(--button-height) * 9);
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
        
            <div class = "housing">
                <div class = "display"></div>
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
            let descriptors =  [{label: 'x', action: `this.writeToDisplay('*')`}, {label: '(', action: `this.writeToDisplay('(')`}, 
                                {label: '/', action: `this.writeToDisplay('/')`}, {label: ')', action: `this.writeToDisplay(')')`},
                                {label: '-', action: `this.writeToDisplay('-')`}, {label: '=', action: `this.writeToDisplay('=')`, additionalClasses: 'heigh-button'},
                                {label: '+', action: `this.writeToDioplay('+')`, additionalClasses: 'button-absolute'}]
            return this.getButtonsAsStrings(descriptors)
        }

        getButtonsAsStrings(buttonsDescriptor){
            let arrayOfStringButtons = buttonsDescriptor.map(this.getSingleButtonAsString)
            console.log(arrayOfStringButtons)
            return arrayOfStringButtons.join('')
            return arrayOfStringButtons.reduce((acc, element, index) => {
                if (index == 0) {acc = element; return acc;}
                acc = acc + element;
            })
        }

        getSingleButtonAsString(descriptor){
            let label = '', additionalClasses = '', action = '';
            
            if (typeof(descriptor) == 'number'){
                label = '' + descriptor;
                action = `this.writeToDisplay(${label})`
            }
            if (typeof(descriptor) == 'object'){
                label = descriptor.label;
                additionalClasses = descriptor.additionalClasses == undefined ? '' : descriptor.additionalClasses;
                action = descriptor.action != undefined ? `onclick = ${descriptor.action}` : ``
            }
            return `<div class = 'button center ${additionalClasses}' ${action}>${label}</div>`
        }




    attributeChangedCallback(name, oldValue, newValue) {
    }
    connectedCallback(){
    }




}
customElements.define('custom-claculator', Calculator)
