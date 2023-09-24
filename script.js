const NumberButtons = document.querySelectorAll(".Number");
const OperationButtons = document.querySelectorAll(".Operation");
const EqualButton = document.querySelector(".Equal");
const DeleteButton = document.querySelector(".Delete");

//const BackButtons = document.getElementsByClassName ("Backspace");

const PreviousOperandTextElement = document.querySelector(".Previous-Operand");
const CurrentOperandTextElement = document.querySelector(".Current-Operand");


class Calculator{
    constructor (PreviousOperandTextElement,CurrentOperandTextElement){
        this.CurrentOperandTextElement = CurrentOperandTextElement;
        this.PreviousOperandTextElement = PreviousOperandTextElement;
        this.clear(); // check bằng console.log
    }

    clear(){
        this.CurrentOperand = '';
        this.PreviousOperand = '';
        this.Operation = undefined;
    }
    
    appendNumber(number){
        if (number==="." && this.CurrentOperand.includes('.')){
            return;
        }
        this.CurrentOperand = this.CurrentOperand.toString() + number.toString();
    };
    
    chooseOperation (Operation){
        if (this.CurrentOperand===''){
            return;
        }
        if (this.CurrentOperand!==''){
            this.compute();
        }

        this.Operation=Operation;
        this.PreviousOperand = this.CurrentOperand;
        this.CurrentOperand = '';
    }

    compute(){
        let computation;
        const prev = parseFloat (this.PreviousOperand);
        const current = parseFloat (this.CurrentOperand);
        if (isNaN(prev)||isNaN(current)) { return;}
        switch (this.Operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case'*':
                computation = prev*current;
                break;
            case'/':
                computation = prev / current;
                break;
            default:
                return;
        }
        
        this.CurrentOperand = computation;
        this.Operation = undefined;
        this.PreviousOperand = '';
    }

    getDisplayNumber (number){

    const stringNumber = number.toString ();
    const integerDigits = parseFloat (stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
  
    let integerDisplay;
    if (isNaN(integerDigits)){
        integerDisplay ='';
    }else {
        integerDisplay = integerDigits.toLocaleString("en",{maximumFractionDigits: 0})
    }
    if (decimalDigits!=  null) {
        return `${integerDisplay}.${decimalDigits}`;
    }
    else {
        return integerDisplay;
    }

    }

    updateDisplay (){
        this.CurrentOperandTextElement.innerText = this.getDisplayNumber(this.CurrentOperand);
        if (this.Operation != null) 
        {
        this.PreviousOperandTextElement.innerText = `${this.getDisplayNumber(this.PreviousOperand)} ${this.Operation}`;
        }
        else {
        this.PreviousOperandTextElement.innerText= '';
        }
    }
}

const calculator = new Calculator (PreviousOperandTextElement, CurrentOperandTextElement)

NumberButtons.forEach (button =>{
    button.addEventListener('click', ()=>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
    
})

OperationButtons.forEach (button =>{
    button.addEventListener('click', ()=>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay ();
    })
})

EqualButton.addEventListener('click', button =>{
    calculator.compute();
    calculator.updateDisplay ();
})

DeleteButton.addEventListener('click', button =>{
    calculator.clear();
    calculator.updateDisplay ();
})