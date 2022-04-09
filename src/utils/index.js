export function isObject(target){
  return typeof target === 'object' && target !== null;
}

export function hasChanged(oldValue, value){
  return oldValue !== value && !(Number.isNaN(oldValue) && Number.isNaN(value)) ;
}

export function isArrary(target){
  return Array.isArray(target);
}