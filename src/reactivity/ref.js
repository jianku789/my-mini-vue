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
// 用类对ref实现
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
        // 当值发生改变时才触发trigger
        if (hasChanged(this.__value, newValue)){
            this.__value = convert(newValue);
            trigger(this, 'value');
        };
    }
}
// 若传入value是object类型则用reactive进行响应式代理
function convert(value) {
    return isObject(value) ? reactive(value) : value;
}