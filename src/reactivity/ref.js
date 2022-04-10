import { isObject, hasChanged, isArrary } from "../utils";
import { track, trigger } from "./effect";
import { reactive } from "./reactive";


export function ref(value) {
    if (isRef(value)) {
        return value;
    }

    return new RefImpl(value);

}

export function isRef(value) {
    return (value && value.__isRef);
}

class RefImpl {
    constructor(value) {
        this.__isRef = true;
        this.__value = convert(value);
    }

    get value() {
        track(this, 'value');
        return this.__value;
    }

    set value(newValue) {
        if (hasChanged(this.__value, newValue));
        this.__value = newValue;
        trigger(this, 'value');
    }
}

function convert(value) {
    return isObject(value) ? reactive(value) : value;
}