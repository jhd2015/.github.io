var d=Object.defineProperty;var r=Object.getOwnPropertySymbols;var l=Object.prototype.hasOwnProperty,I=Object.prototype.propertyIsEnumerable;var u=(e,n,f)=>n in e?d(e,n,{enumerable:!0,configurable:!0,writable:!0,value:f}):e[n]=f,t=(e,n)=>{for(var f in n||(n={}))l.call(n,f)&&u(e,f,n[f]);if(r)for(var f of r(n))I.call(n,f)&&u(e,f,n[f]);return e};import{a6 as m,a7 as s,a8 as p}from"./index-Bfc9F0Lp.js";function V(e,n){const f=/^IF-/;if(f.test(e)){const o=e.split(f)[1],i=o.slice(0,o.indexOf(" ")==-1?o.length:o.indexOf(" ")),c=o.slice(o.indexOf(" ")+1,o.length);return Vue.defineComponent({name:"FontIcon",render(){return Vue.h(m,t({icon:i,iconType:c},n))}})}else return typeof e=="function"||typeof(e==null?void 0:e.render)=="function"?n?Vue.h(e,t({},n)):e:typeof e=="object"?Vue.defineComponent({name:"OfflineIcon",render(){return Vue.h(s,t({icon:e},n))}}):Vue.defineComponent({name:"Icon",render(){const o=e&&e.includes(":")?p:s;return Vue.h(o,t({icon:e},n))}})}export{V as u};
