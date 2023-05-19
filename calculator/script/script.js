const $ = document
const outputQuestion = $.querySelector('.output__question')
const outputAnswer = $.querySelector('.output__answer')
const numberPads = $.querySelectorAll('.input__keypad--digit')
const keypadAc = $.querySelector('.input__keypad--ac')
const keypadC = $.querySelector('.input__keypad--c')
const KeypadEqual = $.querySelector('.input__keypad--equal')
const operations = $.querySelectorAll('.input__keypad--operation')
const KeypadDot = $.querySelector('.input__keypad--dot')
let operationIndex, result, firstNumber, secondNumber;
const completeOperationRegex = /((\d|\.)+(\+|×|∧|÷|-){1}(\d|\.)+)/g;
const halfOperationRegex = /(\d|\.)+(\+|×|∧|÷|-){1}/g;
const dotRegex = /\.\d+(\+|-|×|∧|÷)\./g;


window.addEventListener('load', () => {
    outputQuestion.value = ''
    outputAnswer.value = ''
})




numberPads.forEach(number => {
    number.addEventListener('click', clickHandler)
})


function clickHandler(e) {
    outputQuestion.value += e.target.firstChild.textContent
}


keypadC.addEventListener('click', () => {
    if (outputQuestion.value.match(/^(\d+)?\.\d+(\+|×|∧|÷|-)(\d+)?\.(\d)?$/g)) {
        outputQuestion.value = outputQuestion.value.slice(0, -2)
    } else {
        outputQuestion.value = outputQuestion.value.slice(0, -1)
    }
})


keypadAc.addEventListener('click', () => {
    outputQuestion.value = ''
    outputAnswer.value = ''
})


KeypadDot.addEventListener('click', () => {
    if (outputQuestion.value.match(/^-(\d+)\.\d+-$/g) ||
        outputQuestion.value.match(/^-(\d+)?\.\d+(\+|×|∧|÷|-)$/g) ||
        outputQuestion.value.match(/^-(\d+)?\.\d+(\+|×|∧|÷|-)(\d+)$/g)) {
        outputQuestion.value += '.'
        return
    } else if (outputQuestion.value === '.' ||
        (outputQuestion.value).match(dotRegex) ||
        (outputQuestion.value).match(/^\d+\.$/g) ||
        (outputQuestion.value).match(/(\+|×|∧|÷|-)(\d+)?\.\d+/g) ||
        (outputQuestion.value).match(/(\+|×|∧|÷|-)(\d+)?\./g) ||
        (outputQuestion.value).match(/^(\d+)?\.\d+$/g) ||
        (outputQuestion.value).match(/^(\d+)\.(\+|×|∧|÷|-)\.$/g) ||
        (outputQuestion.value).match(/(\+|×|∧|÷|-)(\d+)\./g)) {
        return
    }
    outputQuestion.value += '.'
})



operations.forEach(operation => {
    operation.addEventListener('click', e => {
        if (outputQuestion.value.match(/((\d|\.)+(\+|×|∧|÷|-){1}(\d|\.)+)/g) && (/^(\d+)?\.?(\d+)?(\+|×|∧|÷|-)\.$/g).test(outputQuestion.value) === false) {
            calculator();
        } else if (outputQuestion.value === '' ||
            outputQuestion.value.match(/(\d|\.)+(\+|×|∧|÷|-){1}/g) ||
            outputQuestion.value.match(/(\d+)?\.\d+(\+|×|∧|÷|-)\./g) ||
            outputQuestion.value.match(/^(\d+)?\.?(\d+)?(\+|×|∧|÷|-)\.$/g) ||
            outputQuestion.value === '.') {
            return;
        } else if (outputQuestion.value.match(/^(\d+)?\.$/g)) {
            outputQuestion.value = outputQuestion.value.slice(0, -1)
        }

        firstNumber = outputQuestion.value;
        outputQuestion.value += e.target.firstChild.textContent;
        operationIndex = outputQuestion.value.length - 1;
    });
});



function calculator() {
    if (outputQuestion.value.match(/^-?(\d+)?\.\d+(\+|×|∧|÷|-)\.$/g) ||
        outputQuestion.value.match(/^\d+(\.\d+)?(\+|×|∧|÷|-)\.$/g)) {
        return
    } else if (outputQuestion.value === '.' ||
        outputQuestion.value.match(/^(\d+)$|^(\+|×|∧|÷|-)?(\d+)?\.\d+$/g)) {
        outputAnswer.value = outputQuestion.value;
        return;
    }

    let secondNumber = outputQuestion.value.substring(operationIndex + 1, outputQuestion.value.length);

    if (secondNumber && firstNumber) {

        switch (outputQuestion.value[operationIndex]) {
            case '+':
                result = sum(firstNumber, secondNumber);
                break;
            case '-':
                result = subtraction(firstNumber, secondNumber);
                break;
            case '×':
                result = multiplication(firstNumber, secondNumber);
                break;
            case '÷':
                result = division(firstNumber, secondNumber);
                break;
            default:
                result = pow(firstNumber, secondNumber);
        }


        if (Number.isInteger(result)) {
            outputAnswer.value = outputQuestion.value = firstNumber = result;
        } else {
            outputAnswer.value = outputQuestion.value = firstNumber = result.toFixed(3);
        }
    } else if (outputQuestion.value.match(/^\d+\.$/g)) {
        outputAnswer.value = outputQuestion.value.slice(0, -1);
        outputQuestion.value = outputAnswer.value;
    } else if (outputQuestion.value.match(/(\d+)?\.\d+/g)) {
        outputAnswer.value = firstNumber;
    } else if (outputQuestion.value.match(/^\d+(\+|×|∧|÷|-)$/g)) {
        outputAnswer.value = outputQuestion.value.slice(0, -1);
        outputQuestion.value = outputAnswer.value;
    } else {
        outputAnswer.value = outputQuestion.value;
    }



}


KeypadEqual.addEventListener('click', calculator)


function sum(firstNum, secondNum) {
    return +firstNum + +secondNum
}


function subtraction(firstNum, secondNum) {
    return firstNum - secondNum
}


function multiplication(firstNum, secondNum) {
    return firstNum * secondNum
}


function division(firstNum, secondNum) {
    return firstNum / secondNum
}


function pow(firstNum, secondNum) {
    return firstNum ** secondNum
}

