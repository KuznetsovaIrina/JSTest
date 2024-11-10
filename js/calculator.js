class Calculator {
    constructor() {
        this.errorMessages = {
            NAN: 'Один из аргументов не является числом',
            default: 'Произошла ошибка',
        }
    }
    add(a, b) {
        return a + b ? a + b : this.errorMessages.NAN;
    }
    subtract(a, b) {
        return a - b ? a - b : this.errorMessages.NAN;
    }
    multiply(a, b) {
        return a * b ? a * b : this.errorMessages.NAN;
    }
    divide(a, b) {
        const result = a / b;
        return result ? result : this.errorMessages.default;
    }
}

const calc = new Calculator();

console.log(calc.add(4, 5));
console.log(calc.subtract(9, 5));
console.log(calc.subtract('sdfsf', 5));
console.log(calc.subtract(7, 15));
console.log(calc.multiply(4, 4));
console.log(calc.multiply('5', 4));
console.log(calc.divide(3, 5));
console.log(calc.divide(0, 5));