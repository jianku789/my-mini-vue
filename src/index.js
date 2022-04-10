import { reactive } from "./reactivity/reactive"
import { effect } from "./reactivity/effect"
import { ref } from "./reactivity/ref"

// const observed = (window.observed = reactive({
//     count1: 0,
//     count2: 111
// }));

// effect(() => {
//     effect(() => {
//         console.log('observed.count2 is',observed.count2);
//     })
//     console.log('observed.count1 is', observed.count1);
//   });
  

const foo = (window.foo = ref(1));
effect(() => {
    console.log('foo:', foo.value);
})

// const observed1 = (window.observed = reactive([1, 2, 3]));
// effect(() => {
//     console.log('observed1.index4 is', observed1[4]);
// });
// effect(() => {
//     console.log('observed1.length is', observed1.length);
// });
