import  {reactive} from "./reactivity/reactive"
import { effect } from "./reactivity/effect"

const observed = (window.observed = reactive({
    count1: 0,
    count2: 11
}));

effect(() => {
    console.log('observed.count1 is', observed.count1);
    effect(() => {
        console.log('observed.count2 is',observed.count2);
    })
  });

// const observed1 = (window.observed = reactive([1, 2, 3]));
// effect(() => {
//     console.log('observed1.index4 is', observed1[4]);
// });
// effect(() => {
//     console.log('observed1.length is', observed1.length);
// });
