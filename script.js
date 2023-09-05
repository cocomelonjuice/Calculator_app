
/*
let a = 0;
let b = 0;
let x = 0;
*/ 
//nhập a
// chọn operator + - x /
// nhập b
// nhấn = 

/* 
hàm để thực hiện tính toán

const Calculate = () =>{

if (operator = "+"){
    return x = a+b;
}
else if (operator = "-"){
    return x = a-b;
}
else if (operator = "x"){
    return x = axb;
}
else if (operator = "/"){
    return x = a/b;
}
}

hàm nhập các nút từ bàn phím: a,b, operator, dấu chấm số thập phân...
hàm hiển thị kết quả 
hàm xóa toàn bộ
hàm xóa từng ký tự a, operator, b
hàm thực hiện tính tiếp sau khi đã tính toán 1,2,3...n lần
*/

/*tut link https://www.youtube.com/watch?v=j59qQ7YWLxw&t=1s*/

const NumberButtons = document.querySelectorAll('.Number');
const OperationButtons = document.querySelectorAll('.Operation');
const EqualButton = document.querySelector('.Keyequal');
const ClearButton = document.querySelector('.Clear');
const PreviousOperandTextElement = document.querySelector('.Previous-Operand')
const CurrentOperandTextElement = document.querySelector('.Current-Operand')

class Calculator {//class chứa constructor chứa input và fuunction cho caclculator
    constructor (PreviousOperandTextElement,CurrentOperandTextElement){
        this.PreviousOperandTextElement = PreviousOperandTextElement;// PreviousOperand nghĩa là dãy số được nhập trước, nhập đầu tiên
        this.CurrentOperandTextElement = CurrentOperandTextElement;//CurrentOperand nghĩa là dãy số được nhập sau, nhập sau khi đã có dãy số đầu tiên và sau khi đã nhấn chọn kiểu Operation dấu phép tính
        /*2 dòng trên có nghĩa là set PreviousOperandTextElement và CurrentOperandTextElement
        cho Class Calculator*/

        this.clear ()
        /*gọi hàm xóa toàn bộ để làm sạch các giá trị trước 
        khi thực hiện phép tính */
    }


clear ()//hàm xóa toàn bộ
{
    this.CurrentOperand = ''//khi xóa thì số current chỉ hiện chuỗi trống
    this.PreviousOperand=''// khí xóa thì... chỉ hiển thị chuỗi trống
    this.operation= undefined //khi xóa thì dấu operation không xác định
}

appendNumber (number) // hàm thêm số liên tiếp vào chuỗi số để thực hiện phép toán
{
    if (number==="."&&this.CurrentOperand.includes('.')) {
        return
    }
    /*có nghĩa là
    khi một chuỗi số append vào mà có đã có trong chuỗi đó dấu thập phân '.' rồi và nếu người dùng tiếp
    tục nhập vào một dấu chấm '.' nữa thì hàm sẽ return (return không ghi gì nữa nghĩa là kết thúc hàm)
    , hàm return để kết thúc hàm ngay tại dòng code này và không thực hiện
    các dòng code kể từ sau dòng code này, để tránh việc dấu chấm '.' được thêm vào nhiều lần nữa trong 1 chuỗi số mà đã có
    tồn tại dấu chấm trước đó, ví dụ: 123.11.22 */

    this.CurrentOperand= this.CurrentOperand.toString()+ number.toString();
    // hàm trên chuyển thành string (toString) vì ví dụ: nếu 2 số nhập vào là 1 và 1 thì Javascript sẽ tự chuyển thành 2 ( vì số 1+ 1 =2)
    // nên cần chuyển thành string để đạt được mục đích ghép chuối số liên tiếp "1" + "1" thành 11
}

chooseOperation (operation)  // hàm chọn operator
{
if (this.CurrentOperand==='') {return;}/* nếu có chuỗi trống ''( hay lúc đó đã có kiểu dấu phép tính được chọn rồi) thì sẽ ngừng lại (return), không thực hiện tiếp
toàn bộ hàm chooseOperation(operation) này vì : khi đã chọn dấu phép tính rồi thì sẽ ngăn người dùng chọn tiếp dấu phép tính khác (mặc dù người dùng có nhấn chọn 
    dấu phép tính khác đi nữa cũng không nhận), vì sau khi đã chọn dấu phép tính xong cần nhập chuỗi số tiếp theo chứ không chấp nhận dấu phép tính khác nhập vào thêm */

if (this.PreviousOperand !==''){// kiểm tra xem nếu đã có chuỗi số nhập vào trước đó rồi, và sau khi nhập kiểu dấu phép tính, và nhập chuối số sau rồi, thì sẽ thực hiện tính kết quả
    this.compute (); 
}

this.operation = operation;// kiểu dấu phép tính được chọn
this.PreviousOperand = this.CurrentOperand;
this.CurrentOperand = '';// lúc này trên màn hình sẽ không hiện dấu phép tính mới vừa chọn
}

compute () // hàm tính toán (khi nhấn dấu =) và hiển thị
{
    let computation ; // biến này là kết quả của hàm compute()
    const prev = parseFloat (this.PreviousOperand)/* giá trị thực của dãy số đã nhập vào = dùng hàm parseFloat để chuyển string thành số float , vì khi nhập vào 
    chuỗi số trước đó thì chuối số ở dạng chuỗi chứ không phải số nên không thực hiện tính toán được, vì vậy cần chuyển string thành float để thực hiện tính toán*/

    const current = parseFloat (this.CurrentOperand)/*tương tự dòng trên*/
    if (isNaN(prev)|| isNaN(current)) {return;} //kiểm tra xem nếu dãy số trước hoặc dãy số sau không phải là số (hay đang là kiểu NaN) thì sẽ return (dừng hàm) compute () dù cho người dùng có nhấn tiếp tục dấu "=" đi chăng nữa
    switch (this.operation){
        case '+':
            computation = prev + current;
            break // khi đã thực hiện 1 case trong vòng switch rồi thì break, không thực hiện tiếp các case sau nữa dù có match
        case '-':
            computation = prev - current;
            break
        case '*':
            computation = prev * current;
            break
        case '/':
                computation = prev / current;
            break
        default:
            return // nếu default (người dùng không chọn phép tính nào) thì sẽ không thực hiện phép tính nào
        }

        this.CurrentOperand = computation;
        this.operation = undefined;
        this.PreviousOperand = '';
}


/* getDisplayNumber xem lại để hiểu rõ hơn, từ phút 32:40*/
getDisplayNumber(number){// hàm để không hiển thị dấu "," trong chuỗi số nhập lúc sau và lúc đầu (vì mặc định sẽ có dấu đó ví dụ 5000 bị hiển thị thành 5,000), dấu "," là hàng dơn vị, trăm, nghìn.., khác dấu"." là thập phân
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


updateDisplay ()//hàm hiển thị
{
this.CurrentOperandTextElement.innerText = this.getDisplayNumber(this.CurrentOperand);//hiển thị dãy số được append vừa nhập, bao gồm bỏ dấu "," nhờ có từ việc gọi hàm getDisplayNumber ()
if (this.operation != null) /* kiểm tra xem có chọn operation chưa, nếu có thì thực hiện statement bên dưới*/
    {
    this.PreviousOperandTextElement.innerText = `${this.getDisplayNumber(this.PreviousOperand)} ${this.operation}`;//hiển thị dãy số  được append vừa nhập lên trên, để dành chỗ cho dãy số tiếp theo sẽ sắp được nhập ( sau khi đã chọn loại dấu operation), và gán chuỗi oepration vào số nhập trước đó, dùng template literal
    }
    else {
        this.PreviousOperandTextElement.innerText= '';
    }
}
}



// tạo class mới (dùng new_tênclass) từ class constructor ở lúc đầu, và gán cho object là calculator
const calculator = new Calculator (PreviousOperandTextElement,CurrentOperandTextElement)
        
NumberButtons.forEach (button =>{//duyệt qua từng button trong NumberButtons 
    button.addEventListener('click', ()=>{
        calculator.appendNumber(button.innerText);//thêm bất kỳ số nào vào dãy số nào khi người dùng nhấn số  
        calculator.updateDisplay ();// hiển thị lên display dãy số append vừa nhấn vào
    })
    
})

OperationButtons.forEach (button =>{//duyệt qua từng button trong OperationButtons 
    button.addEventListener('click', ()=>{
        calculator.chooseOperation(button.innerText);//chọn kiểu phép tính  
        calculator.updateDisplay ();// hiển thị lên display kiểu phép tính
    })
})

EqualButton.addEventListener ('click', button =>{
    calculator.compute();
    calculator.updateDisplay ();
})

ClearButton.addEventListener ('click', button =>{
    calculator.clear();
    calculator.updateDisplay ();
})




