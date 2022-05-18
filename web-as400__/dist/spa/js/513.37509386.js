"use strict";(self["webpackChunkweb_as400"]=self["webpackChunkweb_as400"]||[]).push([[513],{1390:(e,r,t)=>{t.d(r,{o:()=>o});t(6701);var a=t(7831);const o=(0,a.Q_)("as",{state:()=>({currentUser:"",queries:[],files:[],fastFiles:[],users:[],filenames:[]}),getters:{getCurrentUser:e=>e.currentUser,getQueries:e=>e.queries,getFiles:e=>e.files,getUsers:e=>e.users,getFilenames:e=>e.filenames,getFastFiles:e=>e.fastFiles},actions:{setCurrentUser(e){this.currentUser=e},async getQueriesAction(e){let r="http://"+window.location.hostname+":3300/files/all/?library="+e.lib+"&tablename="+e.fileName;e.lib,e.fileName;const t=await fetch(r,{method:"GET",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"no-referrer",enctype:"mutipart/form-data"}),a=await t.json();if(!t.ok)throw 409===a.code?new Error(a.message):new Error("Request failed with error code: "+t.status);this.queries=a},async getFilesAction(e){let r="http://"+window.location.hostname+":3300/files/PRTFFLD1/?library="+e.lib+"&tablename="+e.fileName;e.lib,e.fileName;const t=await fetch(r,{method:"GET",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"no-referrer",enctype:"mutipart/form-data"}),a=await t.json();if(!t.ok)throw 409===a.code?new Error(a.message):new Error("Request failed with error code: "+t.status);this.files=a},async getFastFilesAction(e){let r="http://"+window.location.hostname+":3300/files/PRTFFLD_SMART/?search_word="+e.search_word+"&user="+e.user+"&all="+e.all;e.search_word,e.user,e.all;const t=await fetch(r,{method:"GET",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"no-referrer",enctype:"mutipart/form-data"}),a=await t.json();if(!t.ok)throw 409===a.code?new Error(a.message):new Error("Request failed with error code: "+t.status);this.fastFiles=a},async getUsersAction(e){let r="http://"+window.location.hostname+":3300/files/SCHEMA/?library="+e.user;e.user;const t=await fetch(r,{method:"GET",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"no-referrer",enctype:"mutipart/form-data"}),a=await t.json();if(!t.ok)throw 409===a.code?new Error(a.message):new Error("Request failed with error code: "+t.status);this.users=a},async getFilenamesAction(e){const r="http://"+window.location.hostname+":3300/files/FILENAMES/?library="+e.filename,t=(e.filename,await fetch(r,{method:"GET",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"no-referrer",enctype:"mutipart/form-data"})),a=await t.json();if(!t.ok)throw 409===a.code?new Error(a.message):new Error("Request failed with error code: "+t.status);this.filenames=a}}})},5214:(e,r,t)=>{t.d(r,{H:()=>o});t(6701);var a=t(7831);const o=(0,a.Q_)("pref",{state:()=>({userPref:[],insertOrDeleteStatus:null}),getters:{getUserPref:e=>e.userPref,getInsertOrDeleteStatus:e=>e.insertOrDeleteStatus,getUserPrefAsObj:e=>{if(e.userPref.length<1)return[];var r=[];return r.push({label:e.userPref[0].PREFL1,value:e.userPref[0].PREFL1}),"NULL"!==e.userPref[0].PREFL2&&""!==e.userPref[0].PREFL2.trim()&&r.push({label:e.userPref[0].PREFL2,value:e.userPref[0].PREFL2}),"NULL"!==e.userPref[0].PREFL3&&""!==e.userPref[0].PREFL3.trim()&&r.push({label:e.userPref[0].PREFL3,value:e.userPref[0].PREFL3}),"NULL"!==e.userPref[0].PREFL4&&""!==e.userPref[0].PREFL4.trim()&&r.push({label:e.userPref[0].PREFL4,value:e.userPref[0].PREFL4}),"NULL"!==e.userPref[0].PREFL5&&""!==e.userPref[0].PREFL5.trim()&&r.push({label:e.userPref[0].PREFL5,value:e.userPref[0].PREFL5}),r}},actions:{async setUserPref(e){let r="http://"+window.location.hostname+":3300/files/USERPREF/?user="+e;const t=await fetch(r,{method:"GET",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"no-referrer",enctype:"mutipart/form-data"}),a=await t.json();if(!t.ok)throw 409===a.code?new Error(a.message):new Error("Request failed with error code: "+t.status);this.userPref=a},async insertOrUpdateUserPrefs(e){let r="http://"+window.location.hostname+":3300/files/inserOrUpdatePref/?libdat="+e.user+"&PREFL1="+e.prefl1+"&PREFL2="+e.prefl2+"&PREFL3="+e.prefl3+"&PREFL4="+e.prefl4+"&PREFL5="+e.prefl5;e.user,e.prefl1,e.prefl2,e.prefl3,e.prefl4,e.prefl5;const t=await fetch(r,{method:"GET",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"no-referrer",enctype:"mutipart/form-data"}),a=await t.json();if(!t.ok)throw 409===a.code?new Error(a.message):new Error("Request failed with error code: "+t.status);this.insertOrDeleteStatus=a}}})},5513:(e,r,t)=>{t.r(r),t.d(r,{default:()=>H});var a=t(3673);const o=(0,a.Uk)(" Powered by Team Cantine "),l=(0,a.Uk)("No results"),s={class:"q-ml-md"},n=(0,a.Uk)(" Dark mode "),i=(0,a.Uk)(" Essential Links ");function c(e,r,t,c,u,f){const d=(0,a.up)("q-btn"),m=(0,a.up)("q-toolbar-title"),p=(0,a.up)("q-item-section"),w=(0,a.up)("q-item"),h=(0,a.up)("q-icon"),g=(0,a.up)("q-select"),P=(0,a.up)("q-toggle"),E=(0,a.up)("q-toolbar"),L=(0,a.up)("q-header"),y=(0,a.up)("q-item-label"),F=(0,a.up)("EssentialLink"),U=(0,a.up)("q-list"),b=(0,a.up)("q-drawer"),k=(0,a.up)("router-view"),q=(0,a.up)("q-page-container"),R=(0,a.up)("q-layout");return(0,a.wg)(),(0,a.j4)(R,{view:"lHh Lpr lFf"},{default:(0,a.w5)((()=>[(0,a.Wm)(L,{elevated:"",class:"q-py-sm"},{default:(0,a.w5)((()=>[(0,a.Wm)(E,null,{default:(0,a.w5)((()=>[(0,a.Wm)(d,{flat:"",dense:"",round:"",icon:"menu","aria-label":"Menu",onClick:e.toggleLeftDrawer},null,8,["onClick"]),(0,a.Wm)(m,null,{default:(0,a.w5)((()=>[o])),_:1}),(0,a.Wm)(g,{style:{"max-width":"250px"},class:"q-mr-xl",modelValue:e.model,"onUpdate:modelValue":[r[0]||(r[0]=r=>e.model=r),e.onClickLibdat],"use-input":"","input-debounce":"0",label:"PROFILO","label-color":"white",options:e.options,onFilter:e.filterFn,behavior:"menu"},{"no-option":(0,a.w5)((()=>[(0,a.Wm)(w,null,{default:(0,a.w5)((()=>[(0,a.Wm)(p,{class:"text-grey"},{default:(0,a.w5)((()=>[l])),_:1})])),_:1})])),append:(0,a.w5)((()=>[(0,a.Wm)(h,{name:"lock",color:"white"})])),_:1},8,["modelValue","options","onFilter","onUpdate:modelValue"]),(0,a._)("div",s,[n,(0,a.Wm)(P,{color:"red",modelValue:e.dark,"onUpdate:modelValue":r[1]||(r[1]=r=>e.dark=r),onClick:r[2]||(r[2]=r=>e.q.dark.toggle())},null,8,["modelValue"])])])),_:1})])),_:1}),(0,a.Wm)(b,{modelValue:e.leftDrawerOpen,"onUpdate:modelValue":r[3]||(r[3]=r=>e.leftDrawerOpen=r),"show-if-above":"",bordered:""},{default:(0,a.w5)((()=>[(0,a.Wm)(U,null,{default:(0,a.w5)((()=>[(0,a.Wm)(y,{header:""},{default:(0,a.w5)((()=>[i])),_:1}),((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(e.essentialLinks,(e=>((0,a.wg)(),(0,a.j4)(F,(0,a.dG)({key:e.title},e),null,16)))),128))])),_:1})])),_:1},8,["modelValue"]),(0,a.Wm)(q,null,{default:(0,a.w5)((()=>[(0,a.Wm)(k)])),_:1})])),_:1})}var u=t(2323);function f(e,r,t,o,l,s){const n=(0,a.up)("q-icon"),i=(0,a.up)("q-item-section"),c=(0,a.up)("q-item-label"),f=(0,a.up)("q-item");return(0,a.wg)(),(0,a.j4)(f,{clickable:"",tag:"a",to:e.link},{default:(0,a.w5)((()=>[e.icon?((0,a.wg)(),(0,a.j4)(i,{key:0,avatar:""},{default:(0,a.w5)((()=>[(0,a.Wm)(n,{name:e.icon},null,8,["name"])])),_:1})):(0,a.kq)("",!0),(0,a.Wm)(i,null,{default:(0,a.w5)((()=>[(0,a.Wm)(c,null,{default:(0,a.w5)((()=>[(0,a.Uk)((0,u.zw)(e.title),1)])),_:1}),(0,a.Wm)(c,{caption:""},{default:(0,a.w5)((()=>[(0,a.Uk)((0,u.zw)(e.caption),1)])),_:1})])),_:1})])),_:1},8,["to"])}const d=(0,a.aZ)({name:"EssentialLink",props:{title:{type:String,required:!0},caption:{type:String,default:""},link:{type:String,default:"#"},icon:{type:String,default:""}}});var m=t(4260),p=t(3414),w=t(2035),h=t(4554),g=t(2350),P=t(7518),E=t.n(P);const L=(0,m.Z)(d,[["render",f]]),y=L;E()(d,"components",{QItem:p.Z,QItemSection:w.Z,QIcon:h.Z,QItemLabel:g.Z});var F=t(1959),U=t(1390),b=t(5214),k=t(8825),q=t(9582);const R=[{title:"Home",caption:"home",icon:"home",to:"/home"}],v=(0,a.aZ)({name:"MainLayout",components:{EssentialLink:y},setup(){const e=(0,k.Z)(),r=((0,q.tv)(),(0,F.iH)(!1)),t=(0,F.iH)(!1),a=(0,F.iH)(null),o=(0,F.iH)([]),l=(0,F.iH)([]),s=(0,U.o)(),n=(0,b.H)(),i=(e,r)=>{r(""!==e?()=>{const r=e.toLowerCase();l.value=o.value.filter((e=>e.toLowerCase().indexOf(r)>-1))}:()=>{l.value=o.value})},c=r=>{s.setCurrentUser(a.value),e.localStorage.set("currentUser",a.value),n.setUserPref(a.value),"null"!=e.localStorage.getItem("currentUser")?location.reload():e.localStorage.remove("currentUser")},u=()=>{""!==e.localStorage.getItem("currentUser")&&"null"!==e.localStorage.getItem("currentUser")&&null!==e.localStorage.getItem("currentUser")&&(a.value=e.localStorage.getItem("currentUser"),R.push({title:"Preferenze",caption:"pref",icon:"settings ",to:"/preference"}),R.push({title:"Query",caption:"Le mie query",icon:"search",to:"/query"})),n.setUserPref(a.value)},f=async()=>{try{const e={user:""};await s.getUsersAction(e),s.getUsers.forEach((e=>{o.value.push(e.TABLE_SCHEMA)}))}catch(e){console.log(e)}};return{essentialLinks:R,leftDrawerOpen:r,toggleLeftDrawer(){r.value=!r.value},dark:t,filterFn:i,model:a,options:l,stringOptions:o,onClickLibdat:c,loadUsers:f,loadUserPrefs:u,as:s,pref:n,q:e}},mounted(){this.loadUserPrefs(),this.loadUsers()}});var _=t(3066),C=t(3812),Q=t(9570),S=t(8240),T=t(3747),Z=t(7208),j=t(8886),W=t(2428),I=t(7011),D=t(2652);const O=(0,m.Z)(v,[["render",c]]),H=O;E()(v,"components",{QLayout:_.Z,QHeader:C.Z,QToolbar:Q.Z,QBtn:S.Z,QToolbarTitle:T.Z,QSelect:Z.Z,QItem:p.Z,QItemSection:w.Z,QIcon:h.Z,QToggle:j.Z,QDrawer:W.Z,QList:I.Z,QItemLabel:g.Z,QPageContainer:D.Z})}}]);