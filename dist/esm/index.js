var _=Object.defineProperty,z=Object.defineProperties;var N=Object.getOwnPropertyDescriptors;var b=Object.getOwnPropertySymbols;var K=Object.prototype.hasOwnProperty,V=Object.prototype.propertyIsEnumerable;var B=(t,a,e)=>a in t?_(t,a,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[a]=e,d=(t,a)=>{for(var e in a||(a={}))K.call(a,e)&&B(t,e,a[e]);if(b)for(var e of b(a))V.call(a,e)&&B(t,e,a[e]);return t},D=(t,a)=>z(t,N(a));var L=(t,a)=>{var e={};for(var n in t)K.call(t,n)&&a.indexOf(n)<0&&(e[n]=t[n]);if(t!=null&&b)for(var n of b(t))a.indexOf(n)<0&&V.call(t,n)&&(e[n]=t[n]);return e};import U from"react";import{QueryClientProvider as Y,QueryClient as Z}from"react-query";import{ReactQueryDevtools as j}from"react-query/devtools";import k,{useEffect as W,useState as $}from"react";import{useQueryClient as J}from"react-query";var h={login:()=>Promise.resolve(),logout:()=>Promise.resolve(),checkAuth:()=>Promise.resolve(),checkError:()=>Promise.resolve(),getPermissions:()=>Promise.resolve(),getUserIdentity:()=>Promise.resolve()},Q=k.createContext(h),w=({login:t=h.login,logout:a=h.logout,checkAuth:e=h.checkAuth,checkError:n=h.checkError,getPermissions:u=h.getPermissions,getUserIdentity:y=h.getUserIdentity,isProvided:s,children:i})=>{let[l,o]=$(!1),r=J();W(()=>{r.invalidateQueries(["useAuthenticated"])},[l]);let p=async c=>{try{let m=await t(c);return o(!0),Promise.resolve(m)}catch(m){throw o(!1),m}},f=async c=>{try{let m=await a(c);return o(!1),Promise.resolve(m)}catch(m){throw o(!0),m}},T=async c=>{try{await e(c),o(!0)}catch(m){throw m!=null&&m.redirectPath&&console.log(m.redirectPath),o(!1),m}};return k.createElement(Q.Provider,{value:{login:p,logout:f,checkAuth:T,checkError:n,getPermissions:u,getUserIdentity:y,isAuthenticated:l,isProvided:s}},i)};import H from"react";var X=()=>({default:{create:()=>Promise.resolve({data:{id:1}}),createMany:()=>Promise.resolve({data:[]}),deleteOne:()=>Promise.resolve({data:{id:1}}),deleteMany:()=>Promise.resolve({data:[]}),getList:()=>Promise.resolve({data:[],total:0}),getMany:()=>Promise.resolve({data:[]}),getOne:()=>Promise.resolve({data:{id:1}}),update:()=>Promise.resolve({data:{id:1}}),updateMany:()=>Promise.resolve({data:[]}),custom:()=>Promise.resolve({data:{}}),getApiUrl:()=>""}}),S=H.createContext(X()),G=e=>{var n=e,{children:t}=n,a=L(n,["children"]);let u;return!a.hasOwnProperty("updateMany")||!a.hasOwnProperty("createMany")?u=a:u={default:a},H.createElement(S.Provider,{value:u},t)};var lt=({authProvider:t,children:a,reactQueryClientConfig:e,dataProvider:n})=>{var y;let u=new Z(D(d({},e),{defaultOptions:D(d({},e==null?void 0:e.defaultOptions),{queries:d({refetchOnWindowFocus:!1,keepPreviousData:!0},(y=e==null?void 0:e.defaultOptions)==null?void 0:y.queries)})}));return U.createElement(Y,{client:u},U.createElement(w,D(d({},t),{isProvided:!!t}),U.createElement(G,d({},n),U.createElement(U.Fragment,null,a))),U.createElement(j,d({initialIsOpen:!1,position:"bottom-right"},e)))};import{useQuery as O}from"react-query";var R=(t,a,e)=>{let n=a||"default",u={all:[n],resourceAll:[n,t],list:y=>[...u.resourceAll,"list",d(d({},y),e)],many:y=>[...u.resourceAll,"getMany",y&&y.map(String),d({},e)].filter(s=>s!==void 0),detail:y=>[...u.resourceAll,"detail",y==null?void 0:y.toString(),d({},e)]};return u};var q=({resource:t,config:a,queryOptions:e,metaData:n,dataProviderName:u})=>{let y=P(),s=R(t,u,n),{getList:i}=y(u);return O(s.list(a),()=>i(D(d({resource:t},a),{metaData:n})),D(d({},e),{onSuccess:o=>{var r;(r=e==null?void 0:e.onSuccess)==null||r.call(e,o)},onError:o=>{var r;(r=e==null?void 0:e.onError)==null||r.call(e,o)}}))};import{useQuery as ee}from"react-query";var te=({resource:t,id:a,queryOptions:e,metaData:n,dataProviderName:u})=>{let y=P(),s=R(t,u,n),{getOne:i}=y(u);return ee(s.detail(a),()=>i({resource:t,id:a,metaData:n}),D(d({},e),{onSuccess:o=>{var r;(r=e==null?void 0:e.onSuccess)==null||r.call(e,o)},onError:o=>{var r;(r=e==null?void 0:e.onError)==null||r.call(e,o)}}))};import{useQuery as re}from"react-query";var ae=({resource:t,ids:a,queryOptions:e,metaData:n,dataProviderName:u})=>{let y=P(),s=R(t,u,n),{getMany:i}=y(u),l=(e==null?void 0:e.enabled)===void 0||(e==null?void 0:e.enabled)===!0;return re(s.many(a),()=>i({resource:t,ids:a,metaData:n}),D(d({},e),{onSuccess:r=>{var p;(p=e==null?void 0:e.onSuccess)==null||p.call(e,r)},onError:r=>{var p;(p=e==null?void 0:e.onError)==null||p.call(e,r)}}))};import{useMutation as oe,useQueryClient as se}from"react-query";var ne=()=>{let t=se(),a=P(),{mutationMode:e,undoableTimeout:n}=g(),u=E();return oe(({id:s,values:i,resource:l,mutationMode:o,undoableTimeout:r,onCancel:p,metaData:f,dataProviderName:T})=>{let c=o!=null?o:e,m=r!=null?r:n;return c!=="undoable"?a(T).update({resource:l,id:s,variables:i,metaData:f}):new Promise((x,M)=>{let I=()=>{a(T).update({resource:l,id:s,variables:i,metaData:f}).then(v=>x(v)).catch(v=>M(v))};p&&p(()=>{M({message:"mutationCancelled"})})})},{onMutate:async({resource:s,id:i,mutationMode:l,values:o,dataProviderName:r})=>{let p=R(s,r),f=t.getQueriesData(p.resourceAll),T=l!=null?l:e;return await t.cancelQueries(p.resourceAll,void 0,{silent:!0}),T!=="pessimistic"&&(t.setQueriesData(p.list(),c=>{if(!c)return null;let m=c.data.map(C=>{var x;return((x=C.id)==null?void 0:x.toString())===(i==null?void 0:i.toString())?d({id:i},o):C});return D(d({},c),{data:m})}),t.setQueriesData(p.many(),c=>{if(!c)return null;let m=c.data.map(C=>{var x;return((x=C.id)==null?void 0:x.toString())===(i==null?void 0:i.toString())&&(C=d({id:i},o)),C});return D(d({},c),{data:m})}),t.setQueriesData(p.detail(i),c=>c?D(d({},c),{data:d(d({},c.data),o)}):null)),{previousQueries:f,queryKey:p}},onSettled:(s,i,{id:l,resource:o,dataProviderName:r,invalidates:p=["list","many","detail"]})=>{u({resource:o,dataProviderName:r,invalidates:p,id:l})},onSuccess:(s,{id:i,resource:l})=>{},onError:(s,{id:i,resource:l},o)=>{if(o)for(let r of o.previousQueries)t.setQueryData(r[0],r[1]);s.message}})};import{useMutation as ie}from"react-query";var ue=()=>{let t=P(),a=E();return ie(({resource:n,values:u,metaData:y,dataProviderName:s})=>t(s).create({resource:n,variables:u,metaData:y}),{onSuccess:(n,{resource:u,dataProviderName:y,invalidates:s=["list","many"]})=>{a({resource:u,dataProviderName:y,invalidates:s})},onError:(n,{resource:u})=>{}})};import{useQueryClient as le,useMutation as de}from"react-query";var pe=()=>{let t=P(),a=le(),{mutationMode:e,undoableTimeout:n}=g(),u=E();return de(({id:s,mutationMode:i,undoableTimeout:l,resource:o,onCancel:r,metaData:p,dataProviderName:f,values:T})=>{let c=i!=null?i:e,m=l!=null?l:n;return c!=="undoable"?t(f).deleteOne({resource:o,id:s,metaData:p}):new Promise((x,M)=>{let I=()=>{t(f).deleteOne({resource:o,id:s,metaData:p}).then(v=>x(v)).catch(v=>M(v))};r&&r(()=>{M({message:"mutationCancelled"})})})},{onMutate:async({id:s,resource:i,mutationMode:l,dataProviderName:o})=>{let r=R(i,o),p=l!=null?l:e;await a.cancelQueries(r.resourceAll,void 0,{silent:!0});let f=a.getQueriesData(r.resourceAll);return p!=="pessimistic"&&(a.setQueriesData(r.list(),T=>T?{data:T.data.filter(m=>{var C;return((C=m.id)==null?void 0:C.toString())!==s.toString()}),total:T.total-1}:null),a.setQueriesData(r.many(),T=>{if(!T)return null;let c=T.data.filter(m=>{var C;return((C=m.id)==null?void 0:C.toString())!==(s==null?void 0:s.toString())});return D(d({},T),{data:c})})),{previousQueries:f,queryKey:r}},onSettled:(s,i,{id:l,resource:o,dataProviderName:r,invalidates:p=["list","many"]})=>{u({resource:o,dataProviderName:r,invalidates:p})},onSuccess:(s,{id:i,resource:l},o)=>{a.removeQueries(o.queryKey.detail(i))},onError:(s,{id:i,resource:l},o)=>{if(o)for(let r of o.previousQueries)a.setQueryData(r[0],r[1]);s.message}})};import{useMutation as me}from"react-query";import ce from"pluralize";var ye=()=>{let t=P(),a=E();return me(({resource:n,values:u,metaData:y,dataProviderName:s})=>t(s).createMany({resource:n,variables:u,metaData:y}),{onSuccess:(n,{resource:u,dataProviderName:y,invalidates:s=["list","many"]})=>{let i=ce.plural(u);a({resource:u,dataProviderName:y,invalidates:s})},onError:(n,{resource:u})=>{}})};import{useMutation as Te,useQueryClient as fe}from"react-query";var De=()=>{let t=fe(),a=P(),{mutationMode:e,undoableTimeout:n}=g(),u=E();return Te(({ids:s,values:i,resource:l,onCancel:o,mutationMode:r,undoableTimeout:p,metaData:f,dataProviderName:T})=>{let c=r!=null?r:e,m=p!=null?p:n;return c!=="undoable"?a(T).updateMany({resource:l,ids:s,variables:i,metaData:f}):new Promise((x,M)=>{let I=()=>{a(T).updateMany({resource:l,ids:s,variables:i,metaData:f}).then(v=>x(v)).catch(v=>M(v))};o&&o(()=>{M({message:"mutationCancelled"})})})},{onMutate:async({resource:s,ids:i,values:l,mutationMode:o,dataProviderName:r,metaData:p})=>{let f=R(s,r,p),T=o!=null?o:e;await t.cancelQueries(f.resourceAll,void 0,{silent:!0});let c=t.getQueriesData(f.resourceAll);if(T!=="pessimistic"){t.setQueriesData(f.list(),m=>{if(!m)return null;let C=m.data.map(x=>x.id!==void 0&&i.filter(M=>M!==void 0).map(String).includes(x.id.toString())?d(d({},x),l):x);return D(d({},m),{data:C})}),t.setQueriesData(f.many(),m=>{if(!m)return null;let C=m.data.map(x=>x.id!==void 0&&i.filter(M=>M!==void 0).map(String).includes(x.id.toString())?d(d({},x),l):x);return D(d({},m),{data:C})});for(let m of i)t.setQueriesData(f.detail(m),C=>{if(!C)return null;let x=d(d({},C.data),l);return D(d({},C),{data:x})})}return{previousQueries:c,queryKey:f}},onSettled:(s,i,{ids:l,resource:o,dataProviderName:r})=>{u({resource:o,invalidates:["list","many"],dataProviderName:r}),l.forEach(p=>u({resource:o,invalidates:["detail"],dataProviderName:r,id:p}))},onSuccess:(s,{ids:i,resource:l})=>{},onError:(s,{ids:i,resource:l},o)=>{if(o)for(let r of o.previousQueries)t.setQueryData(r[0],r[1]);s.message}})};import{useQueryClient as xe,useMutation as Ce}from"react-query";var Pe=()=>{let{mutationMode:t,undoableTimeout:a}=g(),e=P(),n=E(),u=xe();return Ce(({resource:s,ids:i,mutationMode:l,undoableTimeout:o,onCancel:r,metaData:p,dataProviderName:f,values:T})=>{let c=l!=null?l:t,m=o!=null?o:a;return c!=="undoable"?e(f).deleteMany({resource:s,ids:i,metaData:p}):new Promise((x,M)=>{let I=()=>{e(f).deleteMany({resource:s,ids:i,metaData:p}).then(v=>x(v)).catch(v=>M(v))};r&&r(()=>{M({message:"mutationCancelled"})})})},{onMutate:async({ids:s,resource:i,mutationMode:l,dataProviderName:o})=>{let r=R(i,o),p=l!=null?l:t;await u.cancelQueries(r.resourceAll,void 0,{silent:!0});let f=u.getQueriesData(r.resourceAll);if(p!=="pessimistic"){u.setQueriesData(r.list(),T=>T?{data:T.data.filter(m=>m.id&&!s.map(String).includes(m.id.toString())),total:T.total-1}:null),u.setQueriesData(r.many(),T=>{if(!T)return null;let c=T.data.filter(m=>m.id?!s.map(String).includes(m.id.toString()):!1);return D(d({},T),{data:c})});for(let T of s)u.setQueriesData(r.detail(T),c=>!c||c.data.id==T?null:d({},c))}return{previousQueries:f,queryKey:r}},onSettled:(s,i,{resource:l,ids:o,dataProviderName:r,invalidates:p=["list","many"]})=>{n({resource:l,dataProviderName:r,invalidates:p})},onSuccess:(s,{ids:i,resource:l},o)=>{i.forEach(r=>u.removeQueries(o.queryKey.detail(r)))},onError:(s,{ids:i,resource:l},o)=>{if(o)for(let r of o.previousQueries)u.setQueryData(r[0],r[1]);s.message}})};var Re=t=>{let a=P(),{getApiUrl:e}=a(t);return e()};import{useQuery as Me}from"react-query";var ve=({url:t,method:a,config:e,queryOptions:n,metaData:u,dataProviderName:y})=>{let s=P(),{custom:i}=s(y);if(i)return Me([y,"custom",a,t,d(d({},e),u)],()=>i(D(d({url:t,method:a},e),{metaData:u})),D(d({},n),{onSuccess:o=>{var r;(r=n==null?void 0:n.onSuccess)==null||r.call(n,o)},onError:o=>{var r;(r=n==null?void 0:n.onError)==null||r.call(n,o)}}));throw Error("Not implemented custom on data provider.")};import{useCallback as Qe,useContext as Ee}from"react";var P=()=>{let t=Ee(S);return Qe(e=>{if(e){if(!t[e])throw new Error(`"${e}" Data provider not found`);return t[e]}if(t.default)return t.default;throw new Error('There is no "default" data provider. Please pass dataProviderName.')},[t])};import{useCallback as ge}from"react";import{useQueryClient as he}from"react-query";var E=()=>{let t=he();return ge(({resource:e,dataProviderName:n,invalidates:u,id:y})=>{if(u===!1)return;let s=R(e,n);u.forEach(i=>{switch(i){case"all":t.invalidateQueries(s.all);break;case"list":t.invalidateQueries(s.list());break;case"many":t.invalidateQueries(s.many());break;case"resourceAll":t.invalidateQueries(s.resourceAll);break;case"detail":t.invalidateQueries(s.detail(y||""));break;default:break}})},[])};import{useContext as be}from"react";import Ue from"react";var F=Ue.createContext({mutationMode:"pessimistic",warnWhenUnsavedChanges:!1,syncWithLocation:!1,undoableTimeout:5e3});var g=()=>{let{mutationMode:t,undoableTimeout:a}=be(F);return{mutationMode:t,undoableTimeout:a}};import{useContext as Ie}from"react";import{useQuery as Ae}from"react-query";var Se=t=>{let{getPermissions:a}=Ie(Q);return Ae("usePermissions",a,t)};import Be from"react";import{useQuery as Ke}from"react-query";var Ve=()=>{let{getUserIdentity:t}=Be.useContext(Q);return Ke("getUserIdentity",t,{enabled:!!t})};import Le from"react";import{useMutation as ke}from"react-query";var we=()=>{let{logout:t}=Le.useContext(Q);return ke("useLogout",t,{onSuccess:()=>{},onError:e=>{console.log(e)}})};import He from"react";import{useMutation as Ge}from"react-query";var Fe=()=>{let{login:t}=He.useContext(Q);return Ge("useLogin",t,{onSuccess:e=>{},onError:e=>{}})};import{useContext as _e}from"react";import{useQuery as ze}from"react-query";var Ne=t=>{let{checkAuth:a}=_e(Q);return ze(["useAuthenticated",t],()=>a(t),{retry:!1})};import{useContext as We}from"react";var $e=()=>{let{isAuthenticated:t}=We(Q);return t};import{useContext as Je}from"react";var Xe=()=>{let{isProvided:t}=Je(Q);return t||!1};export{lt as Provider,Re as useApiUrl,Ne as useAuthenticated,ue as useCreate,ye as useCreateMany,ve as useCustom,P as useDataProvider,pe as useDelete,Pe as useDeleteMany,Ve as useGetIdentity,E as useInvalidate,$e as useIsAuthenticated,Xe as useIsExistAuthentication,q as useList,Fe as useLogin,we as useLogout,ae as useMany,g as useMutationMode,te as useOne,Se as usePermissions,ne as useUpdate,De as useUpdateMany};
//# sourceMappingURL=index.js.map