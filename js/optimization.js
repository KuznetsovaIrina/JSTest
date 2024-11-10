//  Функция debounce

function debounce(func, delay) {
    let timeout;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, arguments), delay);
    }
}

const debouncedFunction = debounce(() => {
    console.log('Вызвана функция с задержкой');
}, 2000);

debouncedFunction();
debouncedFunction();


// Глубокое клонирование объекта

function deepClone(obj) {
    const json = JSON.stringify(obj);
    return JSON.parse(json);
}

const original = {
    name: 'John',
    address: {
        city: 'New York',
        country: 'USA'
    }
};

const copy = deepClone(original);
copy.address.city = 'Los Angeles';
console.log(original.address.city); // New York (оригинальный объект не должен измениться)
console.log(copy.address.city); // Los Angeles