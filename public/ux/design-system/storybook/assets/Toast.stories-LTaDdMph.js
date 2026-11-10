import{j as x}from"./jsx-runtime-D_zvdyIk.js";import{r as C}from"./index-C9y0RuIT.js";import{d as R,F as A}from"./doc-iM-grpUe.js";import{u as I}from"./Toast-C_cnXvPH.js";import{B as k}from"./Button-B2zDfGes.js";import"./_commonjsHelpers-CqkleIqs.js";import"./cx-2dOUpm6k.js";function U(b){const n=I(),{auto:S,...a}=b;return C.useEffect(()=>{S&&n({...a,duration:6e5})},[]),x.jsxs(k,{variant:"secondary",onClick:()=>n(a),children:["Show ",a.tone??"info"," toast"]})}const M={title:"Components/Toast",component:U,tags:["autodocs"],args:{title:"Role saved",message:" Example Co was added to Applied."},parameters:{docs:{story:{inline:!1,iframeHeight:220},description:{component:R({use:["Confirm something finished: saved, copied, sent.","Report a background error that is also shown where it happened."],avoid:["It is the only place an error appears. Always show the error next to the field or item too.","People must act on it. Use a Modal or inline message."],anatomy:["Viewport fixed bottom right",'Polite live region (`role="status"`) for info and success','Assertive live region (`role="alert"`) for errors',"Toast: colored edge, title, message, optional action button (e.g. Undo), dismiss button"],variants:"`info`, `success`, `error`. Wrap the app in `<ToastProvider>` and call `useToast()`.",states:"Entering (fades up; none under reduced motion), shown, paused (hover or focus stops the timer), sticky (errors and toasts with an action stay until dismissed), dismissed.",keyboard:[["Tab","Reaches the dismiss button"],["Enter / Space","Dismisses the toast"]],a11y:[["4.1.3 Status Messages",'Info and success go to `role="status"`; errors go to `role="alert"`. The regions stay mounted so additions are announced.'],["2.2.1 Timing Adjustable","Info and success toasts auto-dismiss (5s by default) and pause while hovered or focused. Error toasts and toasts with an action (e.g. Undo) never auto-dismiss."],["3.3.1 Error Identification","Toasts are never the only place an error is shown."],A],code:`const toast = useToast();
toast({ tone: 'success', title: 'Role saved' });`})}}}},e={args:{tone:"info",title:"Reminder set",message:" We will remind you on Friday.",auto:!0}},s={args:{tone:"success",auto:!0}},o={args:{tone:"error",title:"Could not save",message:" Check the form for details.",auto:!0}},t={args:{tone:"success"}},r={args:{tone:"success",title:"Reminder done",action:{label:"Undo",onAction:()=>{}},auto:!0}};var i,c,d;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    tone: 'info',
    title: 'Reminder set',
    message: ' We will remind you on Friday.',
    auto: true
  }
}`,...(d=(c=e.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var u,m,l;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    tone: 'success',
    auto: true
  }
}`,...(l=(m=s.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};var p,g,f;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    tone: 'error',
    title: 'Could not save',
    message: ' Check the form for details.',
    auto: true
  }
}`,...(f=(g=o.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var h,v,y;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    tone: 'success'
  }
}`,...(y=(v=t.parameters)==null?void 0:v.docs)==null?void 0:y.source}}};var w,E,T;r.parameters={...r.parameters,docs:{...(w=r.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    tone: 'success',
    title: 'Reminder done',
    action: {
      label: 'Undo',
      onAction: () => {}
    },
    auto: true
  }
}`,...(T=(E=r.parameters)==null?void 0:E.docs)==null?void 0:T.source}}};const D=["Info","Success","Error","Interactive","WithAction"];export{o as Error,e as Info,t as Interactive,s as Success,r as WithAction,D as __namedExportsOrder,M as default};
