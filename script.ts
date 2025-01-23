function toNumber(value: number | string) {
    if (typeof value === 'number') {
        return Number(value);
    } else if (typeof value === 'string') {
        return value;
    } else {
        throw new Error('Invalid input. Please provide a number or a string.');
    }
}

console.log(toNumber(true));