var Fe=Object.create;var K=Object.defineProperty,_e=Object.defineProperties,Ne=Object.getOwnPropertyDescriptor,We=Object.getOwnPropertyDescriptors,ze=Object.getOwnPropertyNames,A=Object.getOwnPropertySymbols,$e=Object.getPrototypeOf,_=Object.prototype.hasOwnProperty,$=Object.prototype.propertyIsEnumerable;var z=(t,r,e)=>r in t?K(t,r,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[r]=e,l=(t,r)=>{for(var e in r||(r={}))_.call(r,e)&&z(t,e,r[e]);if(A)for(var e of A(r))$.call(r,e)&&z(t,e,r[e]);return t},f=(t,r)=>_e(t,We(r));var J=(t,r)=>{var e={};for(var n in t)_.call(t,n)&&r.indexOf(n)<0&&(e[n]=t[n]);if(t!=null&&A)for(var n of A(t))r.indexOf(n)<0&&$.call(t,n)&&(e[n]=t[n]);return e};var Je=(t,r)=>{for(var e in r)K(t,e,{get:r[e],enumerable:!0})},X=(t,r,e,n)=>{if(r&&typeof r=="object"||typeof r=="function")for(let i of ze(r))!_.call(t,i)&&i!==e&&K(t,i,{get:()=>r[i],enumerable:!(n=Ne(r,i))||n.enumerable});return t};var B=(t,r,e)=>(e=t!=null?Fe($e(t)):{},X(r||!t||!t.__esModule?K(e,"default",{value:t,enumerable:!0}):e,t)),Xe=t=>X(K({},"__esModule",{value:!0}),t);var Oe={};Je(Oe,{Provider:()=>Ze,useApiUrl:()=>ye,useAuthenticated:()=>Le,useCreate:()=>ie,useCreateMany:()=>pe,useCustom:()=>De,useDataProvider:()=>P,useDelete:()=>ue,useDeleteMany:()=>me,useGetIdentity:()=>Ee,useInvalidate:()=>b,useIsAuthenticated:()=>we,useIsExistAuthentication:()=>He,useList:()=>ee,useLogin:()=>Ae,useLogout:()=>Ue,useMany:()=>oe,useMutationMode:()=>E,useOne:()=>re,usePermissions:()=>ge,useUpdate:()=>se,useUpdateMany:()=>ce});module.exports=Xe(Oe);var I=B(require("react")),V=require("react-query"),j=require("react-query/devtools");var U=B(require("react")),Y=require("react-query"),h={login:()=>Promise.resolve(),logout:()=>Promise.resolve(),checkAuth:()=>Promise.resolve(),checkError:()=>Promise.resolve(),getPermissions:()=>Promise.resolve(),getUserIdentity:()=>Promise.resolve()},Q=U.default.createContext(h),Z=({login:t=h.login,logout:r=h.logout,checkAuth:e=h.checkAuth,checkError:n=h.checkError,getPermissions:i=h.getPermissions,getUserIdentity:T=h.getUserIdentity,isProvided:s,children:u})=>{let[d,o]=(0,U.useState)(!1),a=(0,Y.useQueryClient)();(0,U.useEffect)(()=>{a.invalidateQueries(["useAuthenticated"])},[d]);let p=async y=>{try{let c=await t(y);return o(!0),Promise.resolve(c)}catch(c){throw o(!1),c}},x=async y=>{try{let c=await r(y);return o(!1),Promise.resolve(c)}catch(c){throw o(!0),c}},D=async y=>{try{await e(y),o(!0)}catch(c){throw c!=null&&c.redirectPath&&console.log(c.redirectPath),o(!1),c}};return U.default.createElement(Q.Provider,{value:{login:p,logout:x,checkAuth:D,checkError:n,getPermissions:i,getUserIdentity:T,isAuthenticated:d,isProvided:s}},u)};var N=B(require("react")),Ye=()=>({default:{create:()=>Promise.resolve({data:{id:1}}),createMany:()=>Promise.resolve({data:[]}),deleteOne:()=>Promise.resolve({data:{id:1}}),deleteMany:()=>Promise.resolve({data:[]}),getList:()=>Promise.resolve({data:[],total:0}),getMany:()=>Promise.resolve({data:[]}),getOne:()=>Promise.resolve({data:{id:1}}),update:()=>Promise.resolve({data:{id:1}}),updateMany:()=>Promise.resolve({data:[]}),custom:()=>Promise.resolve({data:{}}),getApiUrl:()=>""}}),W=N.default.createContext(Ye()),O=e=>{var n=e,{children:t}=n,r=J(n,["children"]);let i;return!r.hasOwnProperty("updateMany")||!r.hasOwnProperty("createMany")?i=r:i={default:r},N.default.createElement(W.Provider,{value:i},t)};var Ze=({authProvider:t,children:r,reactQueryClientConfig:e,dataProvider:n})=>{var T;let i=new V.QueryClient(f(l({},e),{defaultOptions:f(l({},e==null?void 0:e.defaultOptions),{queries:l({refetchOnWindowFocus:!1,keepPreviousData:!0},(T=e==null?void 0:e.defaultOptions)==null?void 0:T.queries)})}));return I.default.createElement(V.QueryClientProvider,{client:i},I.default.createElement(Z,f(l({},t),{isProvided:!!t}),I.default.createElement(O,l({},n),I.default.createElement(I.default.Fragment,null,r))),I.default.createElement(j.ReactQueryDevtools,l({initialIsOpen:!1,position:"bottom-right"},e)))};var q=require("react-query");var M=(t,r,e)=>{let n=r||"default",i={all:[n],resourceAll:[n,t],list:T=>[...i.resourceAll,"list",l(l({},T),e)],many:T=>[...i.resourceAll,"getMany",T&&T.map(String),l({},e)].filter(s=>s!==void 0),detail:T=>[...i.resourceAll,"detail",T==null?void 0:T.toString(),l({},e)]};return i};var ee=({resource:t,config:r,queryOptions:e,metaData:n,dataProviderName:i})=>{let T=P(),s=M(t,i,n),{getList:u}=T(i);return(0,q.useQuery)(s.list(r),()=>u(f(l({resource:t},r),{metaData:n})),f(l({},e),{onSuccess:o=>{var a;(a=e==null?void 0:e.onSuccess)==null||a.call(e,o)},onError:o=>{var a;(a=e==null?void 0:e.onError)==null||a.call(e,o)}}))};var te=require("react-query");var re=({resource:t,id:r,queryOptions:e,metaData:n,dataProviderName:i})=>{let T=P(),s=M(t,i,n),{getOne:u}=T(i);return(0,te.useQuery)(s.detail(r),()=>u({resource:t,id:r,metaData:n}),f(l({},e),{onSuccess:o=>{var a;(a=e==null?void 0:e.onSuccess)==null||a.call(e,o)},onError:o=>{var a;(a=e==null?void 0:e.onError)==null||a.call(e,o)}}))};var ae=require("react-query");var oe=({resource:t,ids:r,queryOptions:e,metaData:n,dataProviderName:i})=>{let T=P(),s=M(t,i,n),{getMany:u}=T(i),d=(e==null?void 0:e.enabled)===void 0||(e==null?void 0:e.enabled)===!0;return(0,ae.useQuery)(s.many(r),()=>u({resource:t,ids:r,metaData:n}),f(l({},e),{onSuccess:a=>{var p;(p=e==null?void 0:e.onSuccess)==null||p.call(e,a)},onError:a=>{var p;(p=e==null?void 0:e.onError)==null||p.call(e,a)}}))};var S=require("react-query");var se=()=>{let t=(0,S.useQueryClient)(),r=P(),{mutationMode:e,undoableTimeout:n}=E(),i=b();return(0,S.useMutation)(({id:s,values:u,resource:d,mutationMode:o,undoableTimeout:a,onCancel:p,metaData:x,dataProviderName:D})=>{let y=o!=null?o:e,c=a!=null?a:n;return y!=="undoable"?r(D).update({resource:d,id:s,variables:u,metaData:x}):new Promise((R,v)=>{let H=()=>{r(D).update({resource:d,id:s,variables:u,metaData:x}).then(g=>R(g)).catch(g=>v(g))};p&&p(()=>{v({message:"mutationCancelled"})})})},{onMutate:async({resource:s,id:u,mutationMode:d,values:o,dataProviderName:a})=>{let p=M(s,a),x=t.getQueriesData(p.resourceAll),D=d!=null?d:e;return await t.cancelQueries(p.resourceAll,void 0,{silent:!0}),D!=="pessimistic"&&(t.setQueriesData(p.list(),y=>{if(!y)return null;let c=y.data.map(C=>{var R;return((R=C.id)==null?void 0:R.toString())===(u==null?void 0:u.toString())?l({id:u},o):C});return f(l({},y),{data:c})}),t.setQueriesData(p.many(),y=>{if(!y)return null;let c=y.data.map(C=>{var R;return((R=C.id)==null?void 0:R.toString())===(u==null?void 0:u.toString())&&(C=l({id:u},o)),C});return f(l({},y),{data:c})}),t.setQueriesData(p.detail(u),y=>y?f(l({},y),{data:l(l({},y.data),o)}):null)),{previousQueries:x,queryKey:p}},onSettled:(s,u,{id:d,resource:o,dataProviderName:a,invalidates:p=["list","many","detail"]})=>{i({resource:o,dataProviderName:a,invalidates:p,id:d})},onSuccess:(s,{id:u,resource:d})=>{},onError:(s,{id:u,resource:d},o)=>{if(o)for(let a of o.previousQueries)t.setQueryData(a[0],a[1]);s.message}})};var ne=require("react-query");var ie=()=>{let t=P(),r=b();return(0,ne.useMutation)(({resource:n,values:i,metaData:T,dataProviderName:s})=>t(s).create({resource:n,variables:i,metaData:T}),{onSuccess:(n,{resource:i,dataProviderName:T,invalidates:s=["list","many"]})=>{r({resource:i,dataProviderName:T,invalidates:s})},onError:(n,{resource:i})=>{}})};var L=require("react-query");var ue=()=>{let t=P(),r=(0,L.useQueryClient)(),{mutationMode:e,undoableTimeout:n}=E(),i=b();return(0,L.useMutation)(({id:s,mutationMode:u,undoableTimeout:d,resource:o,onCancel:a,metaData:p,dataProviderName:x,values:D})=>{let y=u!=null?u:e,c=d!=null?d:n;return y!=="undoable"?t(x).deleteOne({resource:o,id:s,metaData:p}):new Promise((R,v)=>{let H=()=>{t(x).deleteOne({resource:o,id:s,metaData:p}).then(g=>R(g)).catch(g=>v(g))};a&&a(()=>{v({message:"mutationCancelled"})})})},{onMutate:async({id:s,resource:u,mutationMode:d,dataProviderName:o})=>{let a=M(u,o),p=d!=null?d:e;await r.cancelQueries(a.resourceAll,void 0,{silent:!0});let x=r.getQueriesData(a.resourceAll);return p!=="pessimistic"&&(r.setQueriesData(a.list(),D=>D?{data:D.data.filter(c=>{var C;return((C=c.id)==null?void 0:C.toString())!==s.toString()}),total:D.total-1}:null),r.setQueriesData(a.many(),D=>{if(!D)return null;let y=D.data.filter(c=>{var C;return((C=c.id)==null?void 0:C.toString())!==(s==null?void 0:s.toString())});return f(l({},D),{data:y})})),{previousQueries:x,queryKey:a}},onSettled:(s,u,{id:d,resource:o,dataProviderName:a,invalidates:p=["list","many"]})=>{i({resource:o,dataProviderName:a,invalidates:p})},onSuccess:(s,{id:u,resource:d},o)=>{r.removeQueries(o.queryKey.detail(u))},onError:(s,{id:u,resource:d},o)=>{if(o)for(let a of o.previousQueries)r.setQueryData(a[0],a[1]);s.message}})};var de=require("react-query");var le=B(require("pluralize")),pe=()=>{let t=P(),r=b();return(0,de.useMutation)(({resource:n,values:i,metaData:T,dataProviderName:s})=>t(s).createMany({resource:n,variables:i,metaData:T}),{onSuccess:(n,{resource:i,dataProviderName:T,invalidates:s=["list","many"]})=>{let u=le.default.plural(i);r({resource:i,dataProviderName:T,invalidates:s})},onError:(n,{resource:i})=>{}})};var k=require("react-query");var ce=()=>{let t=(0,k.useQueryClient)(),r=P(),{mutationMode:e,undoableTimeout:n}=E(),i=b();return(0,k.useMutation)(({ids:s,values:u,resource:d,onCancel:o,mutationMode:a,undoableTimeout:p,metaData:x,dataProviderName:D})=>{let y=a!=null?a:e,c=p!=null?p:n;return y!=="undoable"?r(D).updateMany({resource:d,ids:s,variables:u,metaData:x}):new Promise((R,v)=>{let H=()=>{r(D).updateMany({resource:d,ids:s,variables:u,metaData:x}).then(g=>R(g)).catch(g=>v(g))};o&&o(()=>{v({message:"mutationCancelled"})})})},{onMutate:async({resource:s,ids:u,values:d,mutationMode:o,dataProviderName:a,metaData:p})=>{let x=M(s,a,p),D=o!=null?o:e;await t.cancelQueries(x.resourceAll,void 0,{silent:!0});let y=t.getQueriesData(x.resourceAll);if(D!=="pessimistic"){t.setQueriesData(x.list(),c=>{if(!c)return null;let C=c.data.map(R=>R.id!==void 0&&u.filter(v=>v!==void 0).map(String).includes(R.id.toString())?l(l({},R),d):R);return f(l({},c),{data:C})}),t.setQueriesData(x.many(),c=>{if(!c)return null;let C=c.data.map(R=>R.id!==void 0&&u.filter(v=>v!==void 0).map(String).includes(R.id.toString())?l(l({},R),d):R);return f(l({},c),{data:C})});for(let c of u)t.setQueriesData(x.detail(c),C=>{if(!C)return null;let R=l(l({},C.data),d);return f(l({},C),{data:R})})}return{previousQueries:y,queryKey:x}},onSettled:(s,u,{ids:d,resource:o,dataProviderName:a})=>{i({resource:o,invalidates:["list","many"],dataProviderName:a}),d.forEach(p=>i({resource:o,invalidates:["detail"],dataProviderName:a,id:p}))},onSuccess:(s,{ids:u,resource:d})=>{},onError:(s,{ids:u,resource:d},o)=>{if(o)for(let a of o.previousQueries)t.setQueryData(a[0],a[1]);s.message}})};var w=require("react-query");var me=()=>{let{mutationMode:t,undoableTimeout:r}=E(),e=P(),n=b(),i=(0,w.useQueryClient)();return(0,w.useMutation)(({resource:s,ids:u,mutationMode:d,undoableTimeout:o,onCancel:a,metaData:p,dataProviderName:x,values:D})=>{let y=d!=null?d:t,c=o!=null?o:r;return y!=="undoable"?e(x).deleteMany({resource:s,ids:u,metaData:p}):new Promise((R,v)=>{let H=()=>{e(x).deleteMany({resource:s,ids:u,metaData:p}).then(g=>R(g)).catch(g=>v(g))};a&&a(()=>{v({message:"mutationCancelled"})})})},{onMutate:async({ids:s,resource:u,mutationMode:d,dataProviderName:o})=>{let a=M(u,o),p=d!=null?d:t;await i.cancelQueries(a.resourceAll,void 0,{silent:!0});let x=i.getQueriesData(a.resourceAll);if(p!=="pessimistic"){i.setQueriesData(a.list(),D=>D?{data:D.data.filter(c=>c.id&&!s.map(String).includes(c.id.toString())),total:D.total-1}:null),i.setQueriesData(a.many(),D=>{if(!D)return null;let y=D.data.filter(c=>c.id?!s.map(String).includes(c.id.toString()):!1);return f(l({},D),{data:y})});for(let D of s)i.setQueriesData(a.detail(D),y=>!y||y.data.id==D?null:l({},y))}return{previousQueries:x,queryKey:a}},onSettled:(s,u,{resource:d,ids:o,dataProviderName:a,invalidates:p=["list","many"]})=>{n({resource:d,dataProviderName:a,invalidates:p})},onSuccess:(s,{ids:u,resource:d},o)=>{u.forEach(a=>i.removeQueries(o.queryKey.detail(a)))},onError:(s,{ids:u,resource:d},o)=>{if(o)for(let a of o.previousQueries)i.setQueryData(a[0],a[1]);s.message}})};var ye=t=>{let r=P(),{getApiUrl:e}=r(t);return e()};var Te=require("react-query");var De=({url:t,method:r,config:e,queryOptions:n,metaData:i,dataProviderName:T})=>{let s=P(),{custom:u}=s(T);if(u)return(0,Te.useQuery)([T,"custom",r,t,l(l({},e),i)],()=>u(f(l({url:t,method:r},e),{metaData:i})),f(l({},n),{onSuccess:o=>{var a;(a=n==null?void 0:n.onSuccess)==null||a.call(n,o)},onError:o=>{var a;(a=n==null?void 0:n.onError)==null||a.call(n,o)}}));throw Error("Not implemented custom on data provider.")};var G=require("react");var P=()=>{let t=(0,G.useContext)(W);return(0,G.useCallback)(e=>{if(e){if(!t[e])throw new Error(`"${e}" Data provider not found`);return t[e]}if(t.default)return t.default;throw new Error('There is no "default" data provider. Please pass dataProviderName.')},[t])};var xe=require("react"),fe=require("react-query");var b=()=>{let t=(0,fe.useQueryClient)();return(0,xe.useCallback)(({resource:e,dataProviderName:n,invalidates:i,id:T})=>{if(i===!1)return;let s=M(e,n);i.forEach(u=>{switch(u){case"all":t.invalidateQueries(s.all);break;case"list":t.invalidateQueries(s.list());break;case"many":t.invalidateQueries(s.many());break;case"resourceAll":t.invalidateQueries(s.resourceAll);break;case"detail":t.invalidateQueries(s.detail(T||""));break;default:break}})},[])};var Pe=require("react");var Re=B(require("react")),Ce=Re.default.createContext({mutationMode:"pessimistic",warnWhenUnsavedChanges:!1,syncWithLocation:!1,undoableTimeout:5e3});var E=()=>{let{mutationMode:t,undoableTimeout:r}=(0,Pe.useContext)(Ce);return{mutationMode:t,undoableTimeout:r}};var Me=require("react");var ve=require("react-query"),ge=t=>{let{getPermissions:r}=(0,Me.useContext)(Q);return(0,ve.useQuery)("usePermissions",r,t)};var Qe=B(require("react"));var be=require("react-query"),Ee=()=>{let{getUserIdentity:t}=Qe.default.useContext(Q);return(0,be.useQuery)("getUserIdentity",t,{enabled:!!t})};var Be=B(require("react")),he=require("react-query");var Ue=()=>{let{logout:t}=Be.default.useContext(Q);return(0,he.useMutation)("useLogout",t,{onSuccess:()=>{},onError:e=>{console.log(e)}})};var Ie=B(require("react")),Ke=require("react-query");var Ae=()=>{let{login:t}=Ie.default.useContext(Q);return(0,Ke.useMutation)("useLogin",t,{onSuccess:e=>{},onError:e=>{}})};var Ve=require("react"),Se=require("react-query");var Le=t=>{let{checkAuth:r}=(0,Ve.useContext)(Q);return(0,Se.useQuery)(["useAuthenticated",t],()=>r(t),{retry:!1})};var ke=require("react");var we=()=>{let{isAuthenticated:t}=(0,ke.useContext)(Q);return t};var Ge=require("react");var He=()=>{let{isProvided:t}=(0,Ge.useContext)(Q);return t||!1};
//# sourceMappingURL=index.js.map