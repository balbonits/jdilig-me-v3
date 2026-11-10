import{j as T}from"./jsx-runtime-D_zvdyIk.js";import{r as E}from"./index-C9y0RuIT.js";import{u as S,B as x}from"./Toast-Cfig555-.js";import{d as C,F as b}from"./doc-iM-grpUe.js";import"./_commonjsHelpers-CqkleIqs.js";function I(y){const a=S(),{auto:w,...r}=y;return E.useEffect(()=>{w&&a({...r,duration:6e5})},[]),T.jsxs(x,{variant:"secondary",onClick:()=>a(r),children:["Show ",r.tone??"info"," toast"]})}const O={title:"Components/Toast",component:I,tags:["autodocs"],args:{title:"Role saved",message:" Example Co was added to Applied."},parameters:{docs:{story:{inline:!1,iframeHeight:220},description:{component:C({use:["Confirm something finished: saved, copied, sent.","Report a background error that is also shown where it happened."],avoid:["It is the only place an error appears. Always show the error next to the field or item too.","People must act on it. Use a Modal or inline message."],anatomy:["Viewport fixed bottom right",'Polite live region (`role="status"`) for info and success','Assertive live region (`role="alert"`) for errors',"Toast: colored edge, title, message, dismiss button"],variants:"`info`, `success`, `error`. Wrap the app in `<ToastProvider>` and call `useToast()`.",states:"Entering (fades up; none under reduced motion), shown, paused (hover or focus stops the timer), dismissed.",keyboard:[["Tab","Reaches the dismiss button"],["Enter / Space","Dismisses the toast"]],a11y:[["4.1.3 Status Messages",'Info and success go to `role="status"`; errors go to `role="alert"`. The regions stay mounted so additions are announced.'],["2.2.1 Timing Adjustable","Auto-dismiss (5s by default) pauses while hovered or focused."],["3.3.1 Error Identification","Toasts are never the only place an error is shown."],b],code:`const toast = useToast();
toast({ tone: 'success', title: 'Role saved' });`})}}}},e={args:{tone:"info",title:"Reminder set",message:" We will remind you on Friday.",auto:!0}},s={args:{tone:"success",auto:!0}},o={args:{tone:"error",title:"Could not save",message:" Check the form for details.",auto:!0}},t={args:{tone:"success"}};var n,i,c;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    tone: 'info',
    title: 'Reminder set',
    message: ' We will remind you on Friday.',
    auto: true
  }
}`,...(c=(i=e.parameters)==null?void 0:i.docs)==null?void 0:c.source}}};var d,u,m;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    tone: 'success',
    auto: true
  }
}`,...(m=(u=s.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};var l,p,g;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    tone: 'error',
    title: 'Could not save',
    message: ' Check the form for details.',
    auto: true
  }
}`,...(g=(p=o.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var f,h,v;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    tone: 'success'
  }
}`,...(v=(h=t.parameters)==null?void 0:h.docs)==null?void 0:v.source}}};const P=["Info","Success","Error","Interactive"];export{o as Error,e as Info,t as Interactive,s as Success,P as __namedExportsOrder,O as default};
