'use strict';

    const add = (a,b)=> a+b;
    const mul = ( a,b)=> a*b;
    const sub =(a,b)=> a-b;
    const div =(a,b)=>a/b;

         const operate =(a,operator,b)=>{
            switch(operator){
            case '+':
                return add(a,b);
                case '-':
                    return sub(a,b);
                  case '*':
                    return mul(a,b);
                    case '/':
                        return div(a,b)
                    default:
                        return Number.NaN;    
            }
         }
                let firstNumber = null;
                let currentOperator = null;
                let shouldResetDisplay = false;
                  const maxLength = 12;
                  const ErrorMessage = "MATH ERROR";

       const display = document.querySelector('.display');
       const buttons = document.querySelectorAll('button');
        


               const setDisplay = value => (display.textContent = value);
               const roundResult = number => Number.parseFloat(number.toPrecision(12));
                 const startNewNumber = () => {
                      if(shouldResetDisplay){
                        setDisplay('0');
                        shouldResetDisplay =false;
                      }
                 };
                   
                    const inputDigit = digit=>{
                        startNewNumber();
                                               
                                const  current = display.textContent;
                        
                             if(current=== '0'){
                                setDisplay(digit === "00"? "0":  digit);
                             }
                             else{
                                setDisplay(current + digit);
                             }
                            }
                              const inputDecimal = ()=> {
                                if(shouldResetDisplay) return;
                                startNewNumber();
                                 if(!display.textContent.includes('.')){
                                    setDisplay(display.textContent+('.'))
                                 }
                                }
                                   const showError = ()=>{
                                    firstNumber = null;
                                    currentOperator = null;
                                    shouldResetDisplay = true;
                                    setDisplay(ErrorMessage);}
 
                                 const evaluate = ()=>{
                                    if(currentOperator === null || shouldResetDisplay) return;
                                 
                                  
                                  const secondNumber  = Number.parseFloat(display.textContent);
                                  if(currentOperator==='/' && secondNumber === 0){
                                      showError();
                                      return;
                                  }
                                   const result = operate(firstNumber, currentOperator , secondNumber)
                                   setDisplay(String(roundResult(result)));

                                   firstNumber = null;
                                   currentOperator = null;
                                   shouldResetDisplay = true;
                    
                    
                               }

                      const handleOperator = operator=> 
                      {
                        if(currentOperator !== null) {
                            evaluate();
                        
                        if(display.textContent=== ErrorMessage) return;
                        }

                        firstNumber = Number.parseFloat(display.textContent);
                        currentOperator = operator;
                        shouldResetDisplay = true;
                      }
                        const deleteLast = ()=> {
                            if(shouldResetDisplay) return;
                            const shortened = display.textContent.slice(0,-1);
                              setDisplay(shortened === '' ?'0': shortened);
                        }
                       
                           const clearAll = ()=>{
                            firstNumber = null;
                            currentOperator = null;
                            shouldResetDisplay = false;
                            setDisplay('0');
                           }
                              const handlePercent = ()=>{
                              const value =   Number.parseFloat(display.textContent)
                                 setDisplay(String(roundResult(value/100)));
                              }
                           
                           const handleButton = value=>{
                              if(display.textContent=== ErrorMessage){
                                clearAll();
                              

                            }
                              if(value==='AC'){
                                clearAll();
                              }
                              else if(value==='DEL'){
                                deleteLast();
                              } else if(value==='%'){
                                handlePercent();
                              }else if( value==='.'){
                                inputDecimal();
                              }
                              else if( ["+","-","*","/"].includes(value)){
                                handleOperator(value);
                              }else if(value==='='){
                                evaluate();
                              }
                              else{
                                inputDigit(value);
                              }}

                    buttons.forEach(button=>{ button.addEventListener('click',()=>
                      handleButton(button.textContent));
                    });


                    
   
                  