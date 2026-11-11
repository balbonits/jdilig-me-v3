import{j as s}from"./jsx-runtime-D_zvdyIk.js";import{r as N}from"./index-C9y0RuIT.js";import{d as U,F as W}from"./doc-t_4pxHUb.js";import{A as F}from"./AllThemes-7kMZk7Ez.js";import{u as O}from"./Toast-C_cnXvPH.js";import{B as P}from"./Button-B2zDfGes.js";import"./_commonjsHelpers-CqkleIqs.js";import"./theme-skYQoSby.js";import"./cx-2dOUpm6k.js";function _(e){const d=O(),{auto:I,...c}=e;return N.useEffect(()=>{I&&d({...c,duration:6e5})},[]),s.jsxs(P,{variant:"secondary",onClick:()=>d(c),children:["Show ",c.tone??"info"," toast"]})}const J={title:"Components/Toast",component:_,tags:["autodocs"],args:{title:"Role saved",message:" Example Co was added to Applied."},parameters:{docs:{story:{inline:!1,iframeHeight:220},description:{component:U({use:["Confirm something finished: saved, copied, sent.","Report a background error that is also shown where it happened."],avoid:["It is the only place an error appears. Always show the error next to the field or item too.","People must act on it. Use a Modal or inline message."],anatomy:["Viewport fixed bottom right",'Polite live region (`role="status"`) for info and success','Assertive live region (`role="alert"`) for errors',"Toast: colored edge, title, message, optional action button (e.g. Undo), dismiss button"],variants:"`info`, `success`, `error`. Wrap the app in `<ToastProvider>` and call `useToast()`.",states:"Entering (fades up; none under reduced motion), shown, paused (hover or focus stops the timer), sticky (errors and toasts with an action stay until dismissed), dismissed.",keyboard:[["Tab","Reaches the dismiss button"],["Enter / Space","Dismisses the toast"]],a11y:[["4.1.3 Status Messages",'Info and success go to `role="status"`; errors go to `role="alert"`. The regions stay mounted so additions are announced.'],["2.2.1 Timing Adjustable","Info and success toasts auto-dismiss (5s by default) and pause while hovered or focused. Error toasts and toasts with an action (e.g. Undo) never auto-dismiss."],["3.3.1 Error Identification","Toasts are never the only place an error is shown."],W],code:`const toast = useToast();
toast({ tone: 'success', title: 'Role saved' });`})}}}},t={args:{tone:"info",title:"Reminder set",message:" We will remind you on Friday.",auto:!0}},r={args:{tone:"success",auto:!0}},a={args:{tone:"error",title:"Could not save",message:" Check the form for details.",auto:!0}},n={args:{tone:"success"}},i={args:{tone:"success",title:"Reminder done",action:{label:"Undo",onAction:()=>{}},auto:!0}},o={name:"All themes",render:()=>s.jsx(F,{children:()=>s.jsx("div",{style:{display:"grid",gap:8},children:["info","success","error"].map(e=>s.jsx("div",{className:`em-toast em-toast--${e}`,style:{pointerEvents:"auto"},children:s.jsxs("span",{className:"em-toast-text",children:[s.jsx("strong",{className:"em-toast-title",children:e==="error"?"Could not save":e==="success"?"Role saved":"Reminder set"})," ",e==="error"?"Check the form.":"All good."]})},e))})})};var m,l,u;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    tone: 'info',
    title: 'Reminder set',
    message: ' We will remind you on Friday.',
    auto: true
  }
}`,...(u=(l=t.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};var p,h,g;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    tone: 'success',
    auto: true
  }
}`,...(g=(h=r.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};var f,v,y;a.parameters={...a.parameters,docs:{...(f=a.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    tone: 'error',
    title: 'Could not save',
    message: ' Check the form for details.',
    auto: true
  }
}`,...(y=(v=a.parameters)==null?void 0:v.docs)==null?void 0:y.source}}};var A,x,T;n.parameters={...n.parameters,docs:{...(A=n.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    tone: 'success'
  }
}`,...(T=(x=n.parameters)==null?void 0:x.docs)==null?void 0:T.source}}};var w,E,R;i.parameters={...i.parameters,docs:{...(w=i.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    tone: 'success',
    title: 'Reminder done',
    action: {
      label: 'Undo',
      onAction: () => {}
    },
    auto: true
  }
}`,...(R=(E=i.parameters)==null?void 0:E.docs)==null?void 0:R.source}}};var S,C,b,j,k;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  name: 'All themes',
  render: () => <AllThemes>{() => <div style={{
      display: 'grid',
      gap: 8
    }}>
        {(['info', 'success', 'error'] as const).map(t => <div key={t} className={\`em-toast em-toast--\${t}\`} style={{
        pointerEvents: 'auto'
      }}>
            <span className="em-toast-text"><strong className="em-toast-title">{t === 'error' ? 'Could not save' : t === 'success' ? 'Role saved' : 'Reminder set'}</strong> {t === 'error' ? 'Check the form.' : 'All good.'}</span>
          </div>)}
      </div>}</AllThemes>
}`,...(b=(C=o.parameters)==null?void 0:C.docs)==null?void 0:b.source},description:{story:"Each tone in all 6 theme x mode combos (R-2), shown statically (no live region, no timer).",...(k=(j=o.parameters)==null?void 0:j.docs)==null?void 0:k.description}}};const K=["Info","Success","Error","Interactive","WithAction","AllThemesStory"];export{o as AllThemesStory,a as Error,t as Info,n as Interactive,r as Success,i as WithAction,K as __namedExportsOrder,J as default};
