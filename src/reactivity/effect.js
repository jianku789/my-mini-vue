// activeEffect记录当前运行的函数
let activeEffect;
// effectStack栈保存activeEffect中嵌套effect
let effectStack = [];
export function effect(fn) {
  const effectFn = () => {
    try {
      activeEffect = effectFn;
      effectStack.push(activeEffect);
      return fn();
    } finally {
      // effect嵌套特例
      // 使用effectStack栈当栈空时activeEffect赋值为undefine
      effectStack.pop();
      activeEffect = effectStack[effectStack.length - 1];
    }
  }
  effectFn();
  return effectFn;
}
// 收集依赖,把effect里的函数收集起来方便后面修改值时触发

// targetMap用于储存effect,并建立副作用与依赖的相互关系
const targetMap = new WeakMap();
export function track(target, key) {
  if (!activeEffect) {
    return;
  }
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }

  let deps = depsMap.get(key);
  if (!deps) {
    depsMap.set(key, (deps = new Set()));
  }
  deps.add(activeEffect);
}

export function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap){
    return;
  }
  const deps = depsMap.get(key);
  if (!deps){
    return;
  }
  deps.forEach(effectFn => {
    effectFn();
  });
}