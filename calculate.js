function clickSumButton() {
    const stringNumbers = valueFromInput('numbersInput').split(',');
    document.getElementById('result').textContent = sumNumbers(stringNumbers).value;
}

const valueFromInput = inputId => document.getElementById(inputId).value;

const convertValuesToContainerArray = strNumArray => {
    return strNumArray.length === 0 ? [] : [ValueContainer.of(strNumArray[0])].concat(convertValuesToContainerArray(strNumArray.slice(1)));
}

const sumContainerArray = containerArray => {
    return containerArray.reduce((a, b) => a.concat(b))
}

const sumComposeFunction = (convertFunction, sumFunction) => stringNumbers => sumFunction(convertFunction(stringNumbers));

const sumNumbers = sumComposeFunction(convertValuesToContainerArray, sumContainerArray);

class ValueContainer {

    elementZero = 0;

    constructor(val) {
        this._value = isNaN(+val) ? null :+val;
    }

    get value() {
        return this._value;
    }

    static of(val) {
        return new ValueContainer(val);
    }

    getOrElementZero() {
        return this.getOrElse(this.elementZero);
    }

    getOrElse(val) {
        return this.isPresent() ? this._value : val;
    }

    isPresent() {
        return this._value !== null && this._value !== undefined;
    }

    concat(valueContainer) {
        return ValueContainer.of(this.getOrElementZero() + valueContainer.getOrElementZero());
    }

}
