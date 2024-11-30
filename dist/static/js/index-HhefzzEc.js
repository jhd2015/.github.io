var I=Object.defineProperty;var b=Object.getOwnPropertySymbols;var D=Object.prototype.hasOwnProperty,M=Object.prototype.propertyIsEnumerable;var g=(l,u,t)=>u in l?I(l,u,{enumerable:!0,configurable:!0,writable:!0,value:t}):l[u]=t,h=(l,u)=>{for(var t in u||(u={}))D.call(u,t)&&g(l,t,u[t]);if(b)for(var t of b(u))M.call(u,t)&&g(l,t,u[t]);return l};import{u as w}from"./hooks-CJCDaD43.js";import{B,y,X as S,H as o,E as X}from"./index-Bfc9F0Lp.js";const $={options:{type:Array,default:()=>[]},modelValue:{type:void 0,require:!1,default:"0"},block:{type:Boolean,default:!1},size:{type:String},disabled:{type:Boolean,default:!1},resize:{type:Boolean,default:!1}},C=Vue.defineComponent({name:"ReSegmented",props:$,emits:["change","update:modelValue"],setup(l,{emit:u}){const t=Vue.ref(0),f=Vue.ref(0),{isDark:m}=B(),i=Vue.ref(!1),d=Vue.ref(-1),n=Vue.ref(""),c=Vue.getCurrentInstance(),r=y(l.modelValue)?Vue.toRef(l,"modelValue"):Vue.ref(0);function k({option:e,index:a},s){l.disabled||e.disabled||(s.preventDefault(),y(l.modelValue)?u("update:modelValue",a):r.value=a,n.value="",u("change",{index:a,option:e}))}function R({option:e,index:a},s){l.disabled||(s.preventDefault(),d.value=a,e.disabled||r.value===a?n.value="":n.value=m.value?"#1f1f1f":"rgba(0, 0, 0, 0.06)")}function z(e,a){l.disabled||(a.preventDefault(),d.value=-1)}function V(e=r.value){Vue.nextTick(()=>{var s;const a=(s=c==null?void 0:c.proxy)==null?void 0:s.$refs[`labelRef${e}`];a&&(t.value=a.clientWidth,f.value=a.offsetLeft,i.value=!0)})}function v(){S(".pure-segmented",()=>{Vue.nextTick(()=>{V(r.value)})})}(l.block||l.resize)&&v(),Vue.watch(()=>r.value,e=>{Vue.nextTick(()=>{V(e)})},{immediate:!0}),Vue.watch(()=>l.size,v,{immediate:!0});const N=()=>l.options.map((e,a)=>Vue.createVNode("label",{ref:`labelRef${a}`,class:["pure-segmented-item",(l.disabled||(e==null?void 0:e.disabled))&&"pure-segmented-item-disabled"],style:{background:d.value===a?n.value:"",color:l.disabled?null:!e.disabled&&(r.value===a||d.value===a)?m.value?"rgba(255, 255, 255, 0.85)":"rgba(0,0,0,.88)":""},onMouseenter:s=>R({option:e,index:a},s),onMouseleave:s=>z({option:e,index:a},s),onClick:s=>k({option:e,index:a},s)},[Vue.createVNode("input",{type:"radio",name:"segmented"},null),Vue.withDirectives(Vue.createVNode("div",{class:"pure-segmented-item-label"},[e.icon&&!o(e.label)?Vue.createVNode("span",{class:"pure-segmented-item-icon",style:{marginRight:e.label?"6px":0}},[Vue.h(w(e.icon,h({},e==null?void 0:e.iconAttrs)))]):null,e.label?o(e.label)?Vue.h(e.label):Vue.createVNode("span",null,[e.label]):null]),[[Vue.resolveDirective("tippy"),{content:e==null?void 0:e.tip,zIndex:41e3}]])]));return()=>Vue.createVNode("div",{class:{"pure-segmented":!0,"pure-segmented-block":l.block,"pure-segmented--large":l.size==="large","pure-segmented--small":l.size==="small"}},[Vue.createVNode("div",{class:"pure-segmented-group"},[Vue.createVNode("div",{class:"pure-segmented-item-selected",style:{width:`${t.value}px`,transform:`translateX(${f.value}px)`,display:i.value?"block":"none"}},null),N()])])}}),q=X(C);export{q as R};
