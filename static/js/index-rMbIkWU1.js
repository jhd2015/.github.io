var ve=Object.defineProperty,fe=Object.defineProperties;var ce=Object.getOwnPropertyDescriptors;var I=Object.getOwnPropertySymbols;var ge=Object.prototype.hasOwnProperty,be=Object.prototype.propertyIsEnumerable;var Y=(f,p,t)=>p in f?ve(f,p,{enumerable:!0,configurable:!0,writable:!0,value:t}):f[p]=t,j=(f,p)=>{for(var t in p||(p={}))ge.call(p,t)&&Y(f,t,p[t]);if(I)for(var t of I(p))be.call(p,t)&&Y(f,t,p[t]);return f},P=(f,p)=>fe(f,ce(p));var G=(f,p,t)=>new Promise((c,u)=>{var C=b=>{try{m(t.next(b))}catch(F){u(F)}},B=b=>{try{m(t.throw(b))}catch(F){u(F)}},m=b=>b.done?c(b.value):Promise.resolve(b.value).then(C,B);m((t=t.apply(f,p)).next())});import{S as he}from"./sortable.esm-DLvoQ0uI.js";import{c as _e,h as Ce,a as ye,o as E,g as ke,R as Ve,b as xe,d as Se}from"./index-ArjRfji5.js";import{n as y,t as W,b as l,r as d,f as h,aF as Le,aG as $,Y as X,d as Z,aH as Q,aI as we,J as Fe,x as ee,g as K,h as o,o as R,e as D,c as M,u as i,V as q,Q as Re,j as Be,aJ as J,w as H,_ as Ue}from"./index-y9bhGlt_.js";function De(f){const p=n=>{n.preventDefault(),X(()=>{const r=document.querySelector(".el-table__body-wrapper tbody");he.create(r,{animation:300,handle:".drag-btn",onEnd:({newIndex:v,oldIndex:V})=>{const S=t.value.list.splice(V,1)[0];t.value.list.splice(v,0,S)}})})},t=y({list:[],isLoading:!1}),c=y({title:"",month:"",baiduLink:""}),u=W({pageSize:20,currentPage:1,pageSizes:[20,40,60],total:0,align:"right",background:!0,size:"default"});function C(){m()}function B(){m()}f.isStarCoin&&(c.value.starCoin="0");function m(){t.value.isLoading=!0;const n={pageSize:u.pageSize,pageNum:u.currentPage};for(let r in c.value)c.value[r]&&(n[r]=c.value[r]);Ce(n).then(r=>{t.value.list=r.list,u.total=r.total}).finally(()=>{t.value.isLoading=!1})}const b=y([{type:"selection",align:"left"},{label:"序号",prop:"id",cellRenderer:({row:n})=>l("div",{class:"flex items-center"},[l(d("iconify-icon-online"),{icon:"icon-park-outline:drag",class:"drag-btn cursor-grab",onMouseenter:r=>p(r)},null),l("p",{class:"ml-[16px]"},[n.id])])},{label:"封面",prop:"img",slot:"img",width:60},{label:"编号",prop:"number"},{label:"标题",prop:"title",width:300},{label:"一级分类",prop:"month",headerSlot:"jointLevel1"},{label:"二级分类",prop:"festival",headerSlot:"jointLevel2"},{label:"三级分类",prop:"name",headerSlot:"jointLevel3"},{label:"格式",prop:"starCoin"},{label:"星币数",prop:"starCoin",cellRenderer:({row:n})=>n.starCoin>0?n.starCoin:"免费"},{label:"状态",prop:"status",cellRenderer:({row:n})=>n.status?l(d("el-tag"),{type:"primary"},{default:()=>[h("上架")]}):l(d("el-tag"),{type:"danger"},{default:()=>[h("下架")]})},{label:"更新日期",prop:"name"},{label:"操作",prop:"name",width:200,slot:"operation"}]),F=[{value:1,label:"Asia",children:[{value:2,label:"China",children:[{value:3,label:"Beijing"},{value:4,label:"Shanghai"},{value:5,label:"Hangzhou"}]},{value:6,label:"Japan",children:[{value:7,label:"Tokyo"},{value:8,label:"Osaka"},{value:9,label:"Kyoto"}]},{value:10,label:"Korea",children:[{value:11,label:"Seoul"},{value:12,label:"Busan"},{value:13,label:"Taegu"}]}]},{value:14,label:"Europe",children:[{value:15,label:"France",children:[{value:16,label:"Paris"},{value:17,label:"Marseille"},{value:18,label:"Lyon"}]},{value:19,label:"UK",children:[{value:20,label:"London"},{value:21,label:"Birmingham"},{value:22,label:"Manchester"}]}]},{value:23,label:"North America",children:[{value:24,label:"US",children:[{value:25,label:"New York"},{value:26,label:"Los Angeles"},{value:27,label:"Washington"}]},{value:28,label:"Canada",children:[{value:29,label:"Toronto"},{value:30,label:"Montreal"},{value:31,label:"Ottawa"}]}]}],x=y([]);function L(n){x.value=[],x.value=n.map(({_id:r})=>r)}function a(n){Le.confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{ye({id:n}).then(()=>{$.success("删除成功"),m()})}).catch(()=>{$.info("已取消删除")})}function w(n){var r;E[n]&&((r=E[n]({ids:JSON.stringify(x.value)}))==null||r.then(()=>{$.success("操作成功"),m()}))}function _(n){E.upper({ids:JSON.stringify([n])}).then(()=>{$.success("操作成功"),m()})}function k(n){E.lower({ids:JSON.stringify([n])}).then(()=>{$.success("操作成功"),m()})}return{columns:b,tableData:t,options:F,searchModel:c,handleSelectionChange:L,loadData:m,copyTextToClipboard:_e,handDelete:a,headOperationAll:w,handUpper:_,handLower:k,pagination:u,onSizeChange:C,onCurrentChange:B}}const Te={class:"dialog-footer"},Ae=Z({__name:"DialogForm",props:Q({data:{default:{_id:"",number:"",title:"",month:"",festival:"",baiduLink:"",img:[],monthFestival:[]}}},{modelValue:{type:Boolean},modelModifiers:{}}),emits:Q(["refresh"],["update:modelValue"]),setup(f,{emit:p}){const t=we(f,"modelValue"),c=f,u=y({_id:"",starCoin:0,title:"",month:"",festival:"",baiduLink:"",img:[],monthFestival:[]});Fe(()=>t.value,()=>{X(()=>{var L;u.value=P(j({},c.data),{monthFestival:[c.data.month,c.data.festival].filter(a=>a),starCoin:Number(c.data.starCoin||0),img:(L=c.data.img)==null?void 0:L.map(a=>({url:a,status:"success"}))}),b.value.resetFields()})});const C=p,B=W({starCoin:[{required:!0,message:"不可以为空"}],title:[{required:!0,message:"不可以为空"}],baiduLink:[{required:!0,message:"不可以为空"}],monthFestival:[{required:!0,message:"不可以为空",type:"array",trigger:"change"}],img:[{type:"array",required:!0,message:"不可以为空"}]}),m=y(!1),b=y();function F(){return G(this,null,function*(){var n,r;if(!(yield b.value.validate()))return;m.value=!0;const[a,w]=u.value.monthFestival,_=P(j({},u.value),{monthFestival:void 0,month:a,festival:w,img:(n=u.value.img)==null?void 0:n.filter(v=>v.status=="success").map(v=>{var V;return((V=v==null?void 0:v.response)==null?void 0:V.file)||v.url})}),k=new FormData;for(const v in _)Object.prototype.hasOwnProperty.call(_,v)&&(v=="img"?_[v].forEach((V,S)=>{k.append(`img[${S}]`,V)}):k.append(v,_[v]));(r=u.value)!=null&&r._id?(k.append("id",u.value._id),xe(k).then(()=>{t.value=!1,C("refresh")}).finally(()=>{m.value=!1})):Se(k).then(()=>{t.value=!1,C("refresh")}).finally(()=>{m.value=!1})})}const x=y([]);return ee(()=>{ke().then(L=>{x.value=L.map(a=>({value:a.month,label:a.month,children:a.festivals.map(({festival:w})=>({value:w,label:w}))}))})}),(L,a)=>{var S;const w=d("el-input-number"),_=d("el-form-item"),k=d("el-input"),n=d("el-cascader"),r=d("el-form"),v=d("el-button"),V=d("el-dialog");return R(),K(V,{modelValue:t.value,"onUpdate:modelValue":a[6]||(a[6]=g=>t.value=g),title:`${(S=c.data)!=null&&S._id?"编辑":"新增"}手抄报`,width:"500"},{footer:o(()=>[D("div",Te,[l(v,{onClick:a[5]||(a[5]=g=>t.value=!1)},{default:o(()=>a[8]||(a[8]=[h("取消")])),_:1}),l(v,{type:"primary",loading:m.value,onClick:F},{default:o(()=>a[9]||(a[9]=[h(" 确认 ")])),_:1},8,["loading"])])]),default:o(()=>[l(r,{ref_key:"ruleFormRef",ref:b,"label-position":"top",model:u.value,rules:B,"label-width":"auto",class:"demo-ruleForm","status-icon":""},{default:o(()=>[l(_,{label:"星币",prop:"starCoin"},{default:o(()=>[l(w,{modelValue:u.value.starCoin,"onUpdate:modelValue":a[0]||(a[0]=g=>u.value.starCoin=g),min:0,placeholder:"请输入"},null,8,["modelValue"])]),_:1}),l(_,{label:"标题",prop:"title"},{default:o(()=>[l(k,{modelValue:u.value.title,"onUpdate:modelValue":a[1]||(a[1]=g=>u.value.title=g),"show-word-limit":"",maxlength:"200",placeholder:"请输入"},null,8,["modelValue"])]),_:1}),l(_,{label:"月分-节曰",prop:"monthFestival"},{default:o(()=>[l(n,{modelValue:u.value.monthFestival,"onUpdate:modelValue":a[2]||(a[2]=g=>u.value.monthFestival=g),options:x.value},null,8,["modelValue","options"])]),_:1}),l(_,{label:"百度云链接",prop:"baiduLink"},{default:o(()=>[l(k,{modelValue:u.value.baiduLink,"onUpdate:modelValue":a[3]||(a[3]=g=>u.value.baiduLink=g),maxlength:"200",autosize:{minRows:2,maxRows:4},type:"textarea",placeholder:"请输入"},null,8,["modelValue"])]),_:1}),l(_,{prop:"img"},{label:o(()=>a[7]||(a[7]=[h(" 上传 ")])),default:o(()=>[l(Ve,{modelValue:u.value.img,"onUpdate:modelValue":a[4]||(a[4]=g=>u.value.img=g),name:"handCopy"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["modelValue","title"])}}}),$e={class:"flex"},Me={class:"head"},ze={key:0,class:"imgBox"},Ee={class:"table_operation"},Ne=Z({name:"thandCopyList",__name:"index",props:{isStarCoin:{default:!1}},setup(f){const p=f,{columns:t,tableData:c,options:u,searchModel:C,handleSelectionChange:B,loadData:m,copyTextToClipboard:b,handDelete:F,headOperationAll:x,handUpper:L,handLower:a,pagination:w,onSizeChange:_,onCurrentChange:k}=De(p);ee(()=>{m()});const n=y([]),r=y(),v=y(),V=()=>{var U,e;(e=(U=i(v).popperRef)==null?void 0:U.delayHide)==null||e.call(U)},S=y(!1),g=y({});function le(U){S.value=!0,g.value=U}function ae(){S.value=!0,g.value={}}return(U,e)=>{const N=d("el-input"),T=d("el-button"),te=d("el-image"),ne=d("el-tag"),oe=d("Link"),A=d("el-icon"),ie=d("Remove"),ue=d("Top"),se=d("Bottom"),re=d("Edit"),de=d("pure-table"),pe=d("el-cascader-panel"),me=d("el-popover"),O=Be("click-outside");return R(),M(Re,null,[D("div",$e,[D("div",Me,[e[15]||(e[15]=D("div",null,"手抄报列表",-1)),D("div",null,[l(N,{modelValue:i(C).title,"onUpdate:modelValue":e[0]||(e[0]=s=>i(C).title=s),"suffix-icon":i(J),style:{width:"150px","margin-right":"10px"},placeholder:"请输入标题"},null,8,["modelValue","suffix-icon"]),l(N,{modelValue:i(C).month,"onUpdate:modelValue":e[1]||(e[1]=s=>i(C).month=s),"suffix-icon":i(J),style:{width:"150px","margin-right":"10px"},placeholder:"请输入月分"},null,8,["modelValue","suffix-icon"]),l(N,{modelValue:i(C).baiduLink,"onUpdate:modelValue":e[2]||(e[2]=s=>i(C).baiduLink=s),"suffix-icon":i(J),style:{width:"150px","margin-right":"20px"},placeholder:"请输入标题"},null,8,["modelValue","suffix-icon"]),l(T,{type:"primary",onClick:i(m)},{default:o(()=>e[9]||(e[9]=[h("搜索")])),_:1},8,["onClick"]),l(T,{onClick:e[3]||(e[3]=s=>i(x)("upper"))},{default:o(()=>e[10]||(e[10]=[h("批量上架")])),_:1}),l(T,{onClick:e[4]||(e[4]=s=>i(x)("lower"))},{default:o(()=>e[11]||(e[11]=[h("批量下架")])),_:1}),p.isStarCoin?(R(),K(T,{key:0,onClick:e[5]||(e[5]=s=>i(x)("delete"))},{default:o(()=>e[12]||(e[12]=[h("批量删除")])),_:1})):q("",!0),p.isStarCoin?q("",!0):(R(),K(T,{key:1,type:"primary",onClick:e[6]||(e[6]=s=>i(x)("free"))},{default:o(()=>e[13]||(e[13]=[h(" 设置免费 ")])),_:1})),l(T,{type:"primary",onClick:ae},{default:o(()=>e[14]||(e[14]=[h("新增")])),_:1})])]),l(de,{"row-key":"_id",data:i(c).list,loading:i(c).isLoading,columns:i(t),adaptive:"",pagination:i(w),onSelectionChange:i(B),onPageSizeChange:i(_),onPageCurrentChange:i(k)},{img:o(({row:s})=>[s!=null&&s.img?(R(),M("div",ze,[l(te,{"preview-teleported":!0,src:s.img[0],fit:"fill","preview-src-list":s.img},null,8,["src","preview-src-list"])])):q("",!0)]),jointLevel1:o(()=>[H((R(),M("div",{ref_key:"buttonRef",ref:r},e[16]||(e[16]=[h("一级分类")]))),[[O,V]])]),jointLevel2:o(()=>[H((R(),M("div",null,e[17]||(e[17]=[h("二级分类")]))),[[O,V]])]),jointLevel3:o(()=>[H((R(),M("div",null,e[18]||(e[18]=[h("三级分类")]))),[[O,V]])]),state:o(()=>[l(ne,{type:"primary"},{default:o(()=>e[19]||(e[19]=[h("状态")])),_:1})]),operation:o(({row:s})=>[D("div",Ee,[l(A,{onClick:z=>i(b)(s.baiduLink)},{default:o(()=>[l(oe)]),_:2},1032,["onClick"]),l(A,{onClick:z=>i(F)(s._id)},{default:o(()=>[l(ie)]),_:2},1032,["onClick"]),l(A,{onClick:z=>i(L)(s._id)},{default:o(()=>[l(ue)]),_:2},1032,["onClick"]),l(A,{onClick:z=>i(a)(s._id)},{default:o(()=>[l(se)]),_:2},1032,["onClick"]),l(A,{onClick:z=>le(s)},{default:o(()=>[l(re)]),_:2},1032,["onClick"])])]),_:1},8,["data","loading","columns","pagination","onSelectionChange","onPageSizeChange","onPageCurrentChange"]),l(me,{ref_key:"popoverRef",ref:v,"virtual-ref":r.value,width:"400px",trigger:"click","virtual-triggering":"",placement:"bottom-start"},{default:o(()=>[D("div",null,[l(pe,{modelValue:n.value,"onUpdate:modelValue":e[7]||(e[7]=s=>n.value=s),props:{multiple:!0},options:i(u)},null,8,["modelValue","options"])])]),_:1},8,["virtual-ref"])]),l(Ae,{modelValue:S.value,"onUpdate:modelValue":e[8]||(e[8]=s=>S.value=s),data:g.value,onRefresh:i(m)},null,8,["modelValue","data","onRefresh"])],64)}}}),Je=Ue(Ne,[["__scopeId","data-v-de586ea9"]]);export{Je as default};
