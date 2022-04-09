import { isObject, hasChanged, isArrary} from "../utils";
import { track, trigger } from "./effect";

const proxyMap = new WeakMap();

export function reactive(target) {
  // 若target不是object类型变量则直接返回target不在往下执行
  if (!isObject(target)) {
    return target;
  }
  // 若target已经是reactive过了则直接返回target不在往下执行
  if (isReactive(target)){
    return target;
  }
  // 若target已经在proxyMap里则返回target对应proxy
  if (proxyMap.has(target)){
    return proxyMap.get(target);
  }
  
  const proxy = new Proxy(target, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver);
      track(target, key);
      // 深层代理特例
      // 若结果是object类型则递归调用reactive函数
      return isObject(res) ? reactive(res): res;
    },
    set(target, key, value, receiver) {
      let oldLength = target.length;
      const oldValue = target[key];
      const res = Reflect.set(target, key, value, receiver);
      // 只有值改变时才触发trigger
      if (hasChanged(oldValue, value)){
        trigger(target, key);
        //数组特例
        // 若target是数组时手动触发一次对长度的trigger
        if (isArrary(target) && hasChanged(oldLength, target.length)){
          trigger(target, 'length');
        }
      }
      return res;
    }
  })
  proxyMap.set(target, proxy)
  return proxy;
}

export function isReactive(target){
  return !!(target && target.__isReactive);
}