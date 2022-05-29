"use strict";(self["webpackChunkweb_as400"]=self["webpackChunkweb_as400"]||[]).push([[941],{1390:(e,t,r)=>{r.d(t,{o:()=>a});r(6701);var l=r(7831);const a=(0,l.Q_)("as",{state:()=>({currentUser:"",queries:[],files:[],fastFiles:[],users:[],filenames:[]}),getters:{getCurrentUser:e=>e.currentUser,getQueries:e=>e.queries,getFiles:e=>e.files,getUsers:e=>e.users,getFilenames:e=>e.filenames,getFastFiles:e=>e.fastFiles},actions:{setCurrentUser(e){this.currentUser=e},async getQueriesAction(e){let t="http://10.100.0.30:3300/files/?library="+e.lib+"&tablename="+e.fileName;e.lib,e.fileName;const r=await fetch(t,{method:"GET",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"no-referrer",enctype:"mutipart/form-data"}),l=await r.json();if(!r.ok)throw 409===l.code?new Error(l.message):new Error("Request failed with error code: "+r.status);this.queries=l},async getFilesAction(e){let t="http://10.100.0.30:3300/files/PRTFFLD1/?library="+e.lib+"&tablename="+e.fileName;e.lib,e.fileName;const r=await fetch(t,{method:"GET",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"no-referrer",enctype:"mutipart/form-data"}),l=await r.json();if(!r.ok)throw 409===l.code?new Error(l.message):new Error("Request failed with error code: "+r.status);this.files=l},async getFastFilesAction(e){let t="http://10.100.0.30:3300/files/PRTFFLD_SMART/?search_word="+e.search_word+"&user="+e.user+"&all="+e.all;e.search_word,e.user,e.all;const r=await fetch(t,{method:"GET",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"no-referrer",enctype:"mutipart/form-data"}),l=await r.json();if(!r.ok)throw 409===l.code?new Error(l.message):new Error("Request failed with error code: "+r.status);this.fastFiles=l},async getUsersAction(e){let t="http://10.100.0.30:3300/files/SCHEMA/?library="+e.user;e.user;const r=await fetch(t,{method:"GET",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"no-referrer",enctype:"mutipart/form-data"}),l=await r.json();if(!r.ok)throw 409===l.code?new Error(l.message):new Error("Request failed with error code: "+r.status);this.users=l},async getFilenamesAction(e){const t="http://10.100.0.30:3300/files/FILENAMES/?library="+e.filename,r=(e.filename,await fetch(t,{method:"GET",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"no-referrer",enctype:"mutipart/form-data"})),l=await r.json();if(!r.ok)throw 409===l.code?new Error(l.message):new Error("Request failed with error code: "+r.status);this.filenames=l}}})},5214:(e,t,r)=>{r.d(t,{H:()=>a});r(6701);var l=r(7831);const a=(0,l.Q_)("pref",{state:()=>({userPref:[],insertOrDeleteStatus:null}),getters:{getUserPref:e=>e.userPref,getInsertOrDeleteStatus:e=>e.insertOrDeleteStatus,getUserPrefAsObj:e=>{if(e.userPref.length<1)return[];var t=[];return t.push({label:e.userPref[0].PREFL1,value:e.userPref[0].PREFL1}),"NULL"!==e.userPref[0].PREFL2&&""!==e.userPref[0].PREFL2.trim()&&t.push({label:e.userPref[0].PREFL2,value:e.userPref[0].PREFL2}),"NULL"!==e.userPref[0].PREFL3&&""!==e.userPref[0].PREFL3.trim()&&t.push({label:e.userPref[0].PREFL3,value:e.userPref[0].PREFL3}),"NULL"!==e.userPref[0].PREFL4&&""!==e.userPref[0].PREFL4.trim()&&t.push({label:e.userPref[0].PREFL4,value:e.userPref[0].PREFL4}),"NULL"!==e.userPref[0].PREFL5&&""!==e.userPref[0].PREFL5.trim()&&t.push({label:e.userPref[0].PREFL5,value:e.userPref[0].PREFL5}),t}},actions:{async setUserPref(e){let t="http://10.100.0.30:3300/files/USERPREF/?user="+e;const r=await fetch(t,{method:"GET",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"no-referrer",enctype:"mutipart/form-data"}),l=await r.json();if(!r.ok)throw 409===l.code?new Error(l.message):new Error("Request failed with error code: "+r.status);this.userPref=l},async insertOrUpdateUserPrefs(e){let t="http://10.100.0.30:3300/files/inserOrUpdatePref/?libdat="+e.user+"&PREFL1="+e.prefl1+"&PREFL2="+e.prefl2+"&PREFL3="+e.prefl3+"&PREFL4="+e.prefl4+"&PREFL5="+e.prefl5;e.user,e.prefl1,e.prefl2,e.prefl3,e.prefl4,e.prefl5;const r=await fetch(t,{method:"GET",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},redirect:"follow",referrerPolicy:"no-referrer",enctype:"mutipart/form-data"}),l=await r.json();if(!r.ok)throw 409===l.code?new Error(l.message):new Error("Request failed with error code: "+r.status);this.insertOrDeleteStatus=l}}})},8941:(e,t,r)=>{r.r(t),r.d(t,{default:()=>O});var l=r(3673);const a={class:"q-pa-md"},s={key:0,class:"q-pa-lg text-h6"},i={class:"q-gutter-md row"},o=(0,l.Uk)("No results"),n=(0,l.Uk)("No results"),d={class:"q-ml-lg"},c={style:{"margin-left":"130px"},inline:"",class:"flex flex-left"};function u(e,t,r,u,f,m){const h=(0,l.up)("q-option-group"),p=(0,l.up)("q-item-section"),g=(0,l.up)("q-item"),w=(0,l.up)("q-select"),E=(0,l.up)("q-toggle"),b=(0,l.up)("q-icon"),y=(0,l.up)("q-input"),F=(0,l.up)("q-btn"),P=(0,l.up)("q-checkbox"),L=(0,l.up)("q-card-section"),U=(0,l.up)("q-card"),A=(0,l.up)("q-table");return(0,l.wg)(),(0,l.iD)("div",a,[(0,l.Wm)(U,{class:"q-my-md"},{default:(0,l.w5)((()=>[(0,l.Wm)(L,{class:"q-py-lg q-px-lg"},{default:(0,l.w5)((()=>[f.pref.getUserPrefAsObj.length>0?((0,l.wg)(),(0,l.iD)("div",s,[(0,l.Wm)(h,{modelValue:f.group,"onUpdate:modelValue":[t[0]||(t[0]=e=>f.group=e),m.onGroupChange],options:f.pref.getUserPrefAsObj,color:"primary",inline:""},null,8,["modelValue","onUpdate:modelValue","options"])])):(0,l.kq)("",!0),(0,l._)("div",i,[(0,l.Wm)(w,{filled:"",modelValue:f.model,"onUpdate:modelValue":[t[1]||(t[1]=e=>f.model=e),m.onClickLibdat],"use-input":"","input-debounce":"0",label:"LIBDAT",clearable:"",options:f.options,onFilter:m.filterFn,behavior:"menu"},{"no-option":(0,l.w5)((()=>[(0,l.Wm)(g,null,{default:(0,l.w5)((()=>[(0,l.Wm)(p,{class:"text-grey"},{default:(0,l.w5)((()=>[o])),_:1})])),_:1})])),_:1},8,["modelValue","options","onFilter","onUpdate:modelValue"]),(0,l.Wm)(w,{filled:"",modelValue:f.fileNameModel,"onUpdate:modelValue":[t[2]||(t[2]=e=>f.fileNameModel=e),m.onClickFilename],"use-input":"",loading:f.loadingInputFiles,"input-debounce":"0",label:"FILE",autofocus:"",clearable:"",options:f.fileNamesOptions,onFilter:m.filterFileNames,behavior:"menu"},{"no-option":(0,l.w5)((()=>[(0,l.Wm)(g,null,{default:(0,l.w5)((()=>[(0,l.Wm)(p,{class:"text-grey"},{default:(0,l.w5)((()=>[n])),_:1})])),_:1})])),_:1},8,["modelValue","loading","options","onFilter","onUpdate:modelValue"]),(0,l._)("div",d,[(0,l.Wm)(E,{modelValue:f.queryToggle,"onUpdate:modelValue":t[3]||(t[3]=e=>f.queryToggle=e),size:"xl",icon:"visibility",label:"Query first 10000 Records"},null,8,["modelValue"])]),(0,l._)("div",c,[(0,l.Wm)(y,{style:{"min-width":"200px"},square:"",color:"primary","label-color":"primary",outlined:"",clearable:"",modelValue:f.fastWordSearch,"onUpdate:modelValue":t[4]||(t[4]=e=>f.fastWordSearch=e),label:"Fast Search"},{append:(0,l.w5)((()=>[(0,l.Wm)(b,{name:"bolt",color:"primary"})])),_:1},8,["modelValue"]),(0,l.Wm)(F,{loading:f.loading,inline:"",color:"primary q-ml-sm",label:"Search","icon-right":"send",onClick:m.fastSearch,disable:null==f.fastWordSearch||""==f.fastWordSearch||f.fastWordSearch.length<3},null,8,["loading","onClick","disable"]),(0,l.Wm)(P,{class:"q-ml-xl",size:"lg","left-label":"",modelValue:f.deep,"onUpdate:modelValue":t[5]||(t[5]=e=>f.deep=e),label:"Ricerca profonda"},null,8,["modelValue"])])])])),_:1})])),_:1}),f.queryToggle?(0,l.kq)("",!0):((0,l.wg)(),(0,l.j4)(A,{key:0,class:"my-sticky-header-table",dense:"","auto-width":"",grid:f.grid,rows:f.rows,columns:f.columns,"row-key":"name",loading:f.loading,boarderd:"",title:f.fileNameModel,separator:"cell",rowsPerPage:30,"rows-per-page-options":[0,8,18],style:{height:"640px"},filter:f.filter},{"top-right":(0,l.w5)((()=>[(0,l.Wm)(y,{borderless:"",dense:"",debounce:"300",modelValue:f.filter,"onUpdate:modelValue":t[7]||(t[7]=e=>f.filter=e),placeholder:"Search"},{append:(0,l.w5)((()=>[(0,l.Wm)(b,{name:"search"}),(0,l.Wm)(E,{modelValue:f.grid,"onUpdate:modelValue":t[6]||(t[6]=e=>f.grid=e),label:"Grid"},null,8,["modelValue"])])),_:1},8,["modelValue"]),(0,l.Wm)(F,{class:"q-ml-md",color:"primary","icon-right":"archive",label:"Export to csv","no-caps":"",onClick:m.exportTable},null,8,["onClick"])])),_:1},8,["grid","rows","columns","loading","title","filter"])),f.queryToggle?((0,l.wg)(),(0,l.j4)(A,{key:1,rows:f.queries,"row-key":"index",dense:"","auto-width":"",grid:f.grid,loading:f.loading,boarderd:"",title:f.fileNameModel,separator:"cell",style:{height:"640px"},filter:f.filter,rowsPerPage:1e4,"rows-per-page-options":[0,8,18]},{"top-right":(0,l.w5)((()=>[(0,l.Wm)(y,{borderless:"",dense:"",debounce:"300",modelValue:f.filter,"onUpdate:modelValue":t[9]||(t[9]=e=>f.filter=e),placeholder:"Search"},{append:(0,l.w5)((()=>[(0,l.Wm)(b,{name:"search"}),(0,l.Wm)(E,{modelValue:f.grid,"onUpdate:modelValue":t[8]||(t[8]=e=>f.grid=e),label:"Grid"},null,8,["modelValue"])])),_:1},8,["modelValue"])])),_:1},8,["rows","grid","loading","title","filter"])):(0,l.kq)("",!0)])}var f=r(1959),m=r(2841),h=r(8825),p=r(1390),g=r(5214);const w={data(){return{q:(0,h.Z)(),as:null,pref:null,fastWordSearch:"",deep:!1,queries:[],queryToggle:!1,pagination:{rowsPerPage:0},group:(0,f.iH)(""),loadingInputFiles:!1,model:null,stringOptions:[],options:this.stringOptions,fileNameModel:null,filenamesArray:[],fileNamesOptions:this.filenamesArray,separator:"vertical",filter:"",grid:!1,loading:!1,fileName:"ROLE_USER",lib:"WRKJEXP",rows:[],columns:[{name:"COLUMN_NAME",label:"CAMPO",field:"COLUMN_NAME",sortable:!0,align:"center"},{name:"COLUMN_TEXT",label:"DESCRIZIONE",field:"COLUMN_TEXT",sortable:!0,align:"left"},{name:"TABLE_SCHEMA",label:"LIBRERIA",field:"TABLE_SCHEMA",sortable:!0,align:"left"},{name:"TABLE_NAME",label:"FILE",field:"TABLE_NAME",sortable:!0,align:"left"},{name:"KEY_COLUMN",label:"CHIAVE",field:"KEY_COLUMN",sortable:!0,align:"left"},{name:"KEY_ORDER",label:"KEY_ORDER",field:"KEY_ORDER",sortable:!0,align:"left"},{name:"DATA_TYPE",label:"TIPO",field:"DATA_TYPE",sortable:!0},{name:"LENGTH",label:"LUNGHEZZA",field:"LENGTH",sortable:!0},{name:"NUMERIC_SCALE ",label:"DECIMALE",field:"NUMERIC_SCALE",sortable:!0},{name:"COLUMN_DEFAULT",label:"DEFAULT",field:"COLUMN_DEFAULT",sortable:!0},{name:"CHARACTER_MAXIMUM_LENGTH",label:"LUNGEZZA MASSIMA",field:"CHARACTER_MAXIMUM_LENGTH",sortable:!0}]}},methods:{fastSearch(){this.loadFastFiles()},onGroupChange(){this.model=this.group,this.loadFilenames(),this.fileNameModel=null},exportTable(){const e=[this.columns.map((e=>this.wrapCsvValue(e.label)))].concat(this.rows.map((e=>this.columns.map((t=>this.wrapCsvValue("function"===typeof t.field?t.field(e):e[void 0===t.field?t.name:t.field],t.format))).join(",")))).join("\r\n");(0,m.Z)("table-export.csv",e,"text/csv")},wrapCsvValue(e,t){let r=void 0!==t?t(e):e;return r=void 0===r||null===r?"":String(r),r=r.split('"').join('""'),`"${r}"`},onClickLibdat(e){this.loadFilenames(),this.fileNameModel=null},onClickFilename(e){this.loadFiles()},filterFileNames(e,t){t(""!==e?()=>{const t=e.toLowerCase();this.fileNamesOptions=this.filenamesArray.filter((e=>e.toLowerCase().indexOf(t)>-1))}:()=>{this.fileNamesOptions=this.filenamesArray})},filterFn(e,t){t(""!==e?()=>{const t=e.toLowerCase();this.options=this.stringOptions.filter((e=>e.toLowerCase().indexOf(t)>-1))}:()=>{this.options=this.stringOptions})},async loadFiles(){if(this.fileNameModel){this.loading=!0,this.rows=[];try{const e={lib:this.model,fileName:this.fileNameModel.split("--\x3e")[0].trim()};await this.as.getFilesAction(e),this.rows=this.as.getFiles,this.loading=!1}catch(e){console.log(e),this.loading=!1}}},async loadFastFiles(){if(""!==this.fastWordSearch){this.loading=!0,this.rows=[];try{const e={user:null!=this.q.localStorage.getItem("currentUser")&&""!=this.q.localStorage.getItem("currentUser")?this.q.localStorage.getItem("currentUser").trim():"",search_word:this.fastWordSearch.trim(),all:this.deep?"all":"no"};await this.as.getFastFilesAction(e),this.rows=this.as.getFastFiles,this.loading=!1}catch(e){console.log(e),this.loading=!1}}},async loadQueries(){if(this.fileNameModel){this.loading=!0,this.queries=[];try{const e={lib:this.model,fileName:this.fileNameModel.split("--\x3e")[0].trim()};await this.as.getQueriesAction(e),this.queries=this.as.getQueries,this.loading=!1}catch(e){console.log(e),this.loading=!1}}},async loadFilenames(){try{const e={filename:this.model};this.loadingInputFiles=!0,await this.as.getFilenamesAction(e),this.filenamesArray=[],this.as.getFilenames.forEach((e=>{this.filenamesArray.push(e.TABLE_NAME+" --\x3e "+e.TABLE_TEXT)})),this.loadingInputFiles=!1}catch(e){console.log(e)}},async loadUsers(){try{const e={user:""};await this.pref.setUserPref(this.q.localStorage.getItem("currentUser")),await this.pref.getUserPrefAsObj.length>0&&(this.group=this.pref.getUserPrefAsObj[0].value,this.model=this.group),await this.as.getUsersAction(e),await this.as.getUsers.forEach((e=>{this.stringOptions.push(e.TABLE_SCHEMA)})),this.loadFilenames()}catch(e){console.log(e)}}},watch:{queryToggle(e,t){e&&this.loadQueries()},fileNameModel(e,t){""!==e&&null!=this.fileNameModel&&this.queryToggle&&this.loadQueries()},fastWordSearch(e,t){}},created(){this.as=(0,p.o)(),this.pref=(0,g.H)(),this.loadUsers()}};var E=r(4260),b=r(151),y=r(5589),F=r(8758),P=r(7637),L=r(3414),U=r(2035),A=r(8886),T=r(4842),C=r(4554),N=r(8240),R=r(5735),q=r(8107),_=r(7518),M=r.n(_);const S=(0,E.Z)(w,[["render",u]]),O=S;M()(w,"components",{QCard:b.Z,QCardSection:y.Z,QOptionGroup:F.Z,QSelect:P.Z,QItem:L.Z,QItemSection:U.Z,QToggle:A.Z,QInput:T.Z,QIcon:C.Z,QBtn:N.Z,QCheckbox:R.Z,QTable:q.Z})}}]);