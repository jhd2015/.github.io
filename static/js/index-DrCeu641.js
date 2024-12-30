var b=(e,n,t)=>new Promise((a,c)=>{var o=s=>{try{l(t.next(s))}catch(p){c(p)}},d=s=>{try{l(t.throw(s))}catch(p){c(p)}},l=s=>s.done?a(s.value):Promise.resolve(s.value).then(o,d);l((t=t.apply(e,n)).next())});import{aM as v,aG as D,d as z,aH as N,aI as K,q as O,n as E,r as Y,j as J,o as x,c as P,b as A,h as M,w as q,g as L,Q as _,e as j,V as I,al as Z,_ as $}from"./index-DMAT4wcX.js";const Ce=e=>v.request("post","/hand/add",{data:e}),Ye=e=>v.request("get","/hand/list",{params:e}),Ee=e=>v.request("post","/hand/delete",{data:e}),Me=e=>v.request("post","/hand/update",{data:e}),ye=()=>v.request("get","/hand/categories"),ee=e=>v.request("post","/upload",{data:e},{headers:{"Content-Type":"multipart/form-data"}}),Be={upper(e){return v.request("post","/hand/on",{data:e})},lower(e){return v.request("post","/hand/off",{data:e})},free(e){return v.request("post","/hand/free",{data:e})}};function Re(e){if(!navigator.clipboard){te(e);return}navigator.clipboard.writeText(e).then(function(){D.success("复制成功！")},function(){D.error("复制失败，请手动复制！")})}function te(e){var n=document.createElement("textarea");n.value=e,n.style.top="0",n.style.left="0",n.style.position="fixed",document.body.appendChild(n),n.focus(),n.select();try{var t=document.execCommand("copy");t&&D.success("复制成功！")}catch(a){D.error("复制失败，请手动复制！")}document.body.removeChild(n)}const ae="data:image/png;base64,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",ne="https://jhd2015.github.io/feima/static/png/background-C8QxyYXS.png",oe="https://jhd2015.github.io/feima/static/png/background-C8QxyYXS.png",se="https://jhd2015.github.io/feima/static/png/hand-E1bMYT_7.png",ie="https://jhd2015.github.io/feima/static/png/hand2-Col334wJ.png",U=2;function le(){function e(c){return b(this,arguments,function*(t,a=U){const o=document.createElement("canvas");let d,l=-11.7*Math.PI/180,s,p=0,f=0,C=t.width>t.height;t.width>t.height?(d=yield y(oe),s=yield y(ie),l=-9.7*Math.PI/180):(d=yield y(ne),s=yield y(se));const B=d.width/a,R=d.height/a;o.width=B,o.height=R,p=o.height-s.height/a,C&&(p-=80);const h=o.getContext("2d");if(h.drawImage(d,0,0,B,R),C){h.save();const i=983.05/a,u=695/a,m=(o.width-i)/2,g=(o.height-u)/2-80;h.translate(m+i/2,g+u/2),h.rotate(l),h.drawImage(t,-i/2+12/a,-u/2+200/a,i,u),h.restore()}else{h.save();const i=795/a,u=1123.14/a,m=(o.width-i)/2,g=(o.height-u)/2;h.translate(m+i/2,g+u/2),h.rotate(l),h.drawImage(t,-i/2-3/a,-u/2+55/a,i,u),h.restore()}h.drawImage(s,f,p,s.width/a,s.height/a);const r=yield y(ae);return H(r,{ctx:h,canvasWidth:o.width,canvasHeight:o.height}),new Promise(i=>{o.toBlob(u=>b(this,null,function*(){let g=new File([u],Date.now()+".png",{type:"image/png",lastModified:Date.now()});g.size>524288&&(g=yield ce(g,524288)),o.remove(),i({raw:g,url:URL.createObjectURL(u)})}))})})}function n(t){const a=new FileReader;return new Promise(c=>{a.onload=o=>b(this,null,function*(){const d=yield y(o.target.result);c(d)}),a.readAsDataURL(t)})}return{combineImages:e,getFileReader:n,ImageLoadimg:y,watermark:H}}function y(e){return new Promise(n=>{const t=new Image;t.onload=()=>{n(t)},t.src=e})}function H(e,{ctx:n,canvasWidth:t,canvasHeight:a}){const c=100/U,o=100/U,d=e.width/U,l=e.height/U,s=Math.ceil(t/(d+c)),p=Math.ceil(a/(l+o));for(let f=0;f<s;f++)for(let C=0;C<p;C++){const B=f*(d+c),R=C*(l+o);n.drawImage(e,B,R,d,l)}}function ce(e,n){return new Promise(t=>{re(e).then(a=>{W(a,e,n,t)})})}function W(e,n,t,a,c=10){const o=document.createElement("canvas"),d=o.getContext("2d");let l=e.width-c,s=e.height-c;o.width=l,o.height=s,e.width=l,e.height=s,d.drawImage(e,0,0,l,s),o.toBlob(p=>{if(p.size>t)W(e,n,t,a,c+10);else{let f=new File([p],n.name+".png",{type:n.type,lastModified:Date.now()});a(f)}},n.type,1)}function re(e){return new Promise(n=>{const t=new FileReader;t.onerror=a=>{console.error("Error reading file:",a)},t.onload=a=>{const c=new Image;c.onload=()=>{n(c)},c.src=a.target.result},t.readAsDataURL(e)})}const de={class:"uploadBox"},ue={class:"el-upload-list__item-thumbnail"},he=["src"],ge={key:0,class:"el-upload-list__item-status-label"},pe={class:"el-upload-list__item-actions"},me=["onClick"],we=["onClick"],Ae=z({__name:"index",props:N({name:{default:"1"}},{modelValue:{},modelModifiers:{}}),emits:["update:modelValue"],setup(e){const{getFileReader:n,combineImages:t}=le(),a="https://www.feima.fun/admin/upload",c=K(e,"modelValue"),o=O(()=>c.value.map(r=>r.url));E(!1),E("");const d=E(0),l=E(!1);E(!1);const s=E(),p=r=>{s.value.handleRemove(r)},f=r=>{d.value=r,l.value=!0};E(0);function C(r,i){B()}const B=Z(R,500);function R(){return b(this,null,function*(){c.value.forEach(r=>{["success","uploading"].includes(r.status)||h(r)})})}function h(r){return b(this,null,function*(){r.status="uploading";let i;try{i=yield n(r.raw);const u=yield t(i),m=new FormData;m.append("file",u.raw);const g=yield ee(m);g.file=`https://www.feima.fun/${g.file}`,r.response=g,r.url=g.file,r.status="success"}catch(u){r.status="fail"}})}return(r,i)=>{const u=Y("Plus"),m=Y("el-icon"),g=Y("icon-picture"),F=Y("Check"),G=Y("zoom-in"),V=Y("Delete"),X=Y("el-upload"),S=Y("el-image-viewer"),T=J("loading");return x(),P("div",de,[A(X,{ref_key:"uploadRef",ref:s,"file-list":c.value,"onUpdate:fileList":i[0]||(i[0]=w=>c.value=w),"list-type":"picture-card",width:"100px",multiple:"",name:"file",action:a,"auto-upload":!1,accept:"image/*",onChange:C},{file:M(({file:w,index:k})=>[q((x(),P("div",{key:k},[w.status=="fail"?(x(),L(m,{key:0},{default:M(()=>[A(g)]),_:1})):(x(),P(_,{key:1},[j("div",ue,[j("img",{width:"100%",height:"100%",src:w.url,alt:""},null,8,he)]),w.check?(x(),P("div",ge,[A(m,{color:"#fff"},{default:M(()=>[A(F)]),_:1})])):I("",!0),j("span",pe,[j("span",{class:"el-upload-list__item-preview",onClick:Q=>f(k)},[A(m,null,{default:M(()=>[A(G)]),_:1})],8,me),j("span",{class:"el-upload-list__item-delete",onClick:Q=>p(w)},[A(m,null,{default:M(()=>[A(V)]),_:1})],8,we)])],64))])),[[T,w.status=="uploading"]])]),default:M(()=>[A(m,null,{default:M(()=>[A(u)]),_:1})]),_:1},8,["file-list"]),l.value?(x(),L(S,{key:0,modelValue:l.value,"onUpdate:modelValue":i[1]||(i[1]=w=>l.value=w),"initial-index":d.value,"url-list":o.value,style:{"z-index":"99999999999"},"z-index:":"99999999999",teleported:!0,onClose:i[2]||(i[2]=w=>l.value=!1)},null,8,["modelValue","initial-index","url-list"])):I("",!0)])}}}),be=$(Ae,[["__scopeId","data-v-e0886a45"]]);export{y as I,be as R,Ee as a,Me as b,Re as c,Ce as d,ee as e,ye as g,Ye as h,Be as o,ae as s,H as w};
