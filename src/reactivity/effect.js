// 记录当前运行的函数
let activeEffect;

export function effect(fn) {
  const effectFn = () => {
    try {
      activeEffect = effectFn;
      return fn();
    } finally {
      // effect执行完赋值为undefined
      activeEffect = undefined;
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