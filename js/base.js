// 1. Проверка на палиндром

function isPalindrome(str) {
    const string = str.toString();
    const formatString = (string) => string.replace(/\s/g, '').toLowerCase();
    return formatString(string) === formatString(string.split('').reverse().join(''));
}

// 2. FizzBuzz

function fizzBuzz() {
    for (let num = 1; num <= 100; num++) {
        let result;

        if (num % 3 === 0 && num % 5 === 0) {
            result = 'FizzBuzz';
        } else if (num % 3 === 0) {
            result = 'Fizz';
        } else if (num % 5 === 0) {
            result = 'Buzz';
        } else {
            result = num;
        }

        console.log(result);
    }
}

fizzBuzz();

// 3. Разбиение массива на части

function chunkArray(array, size) {
    const result = [];

    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }

    return result;
}