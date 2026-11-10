import{I as S}from"./Toast-Cfig555-.js";import{d as I,F as V}from"./doc-iM-grpUe.js";import"./jsx-runtime-D_zvdyIk.js";import"./index-C9y0RuIT.js";import"./_commonjsHelpers-CqkleIqs.js";const U={title:"Components/Input",component:S,tags:["autodocs"],args:{label:"Company",hint:"As it appears on the job post."},parameters:{docs:{description:{component:I({use:["You need one line of free text: a name, a URL, an email, a date."],avoid:["The answer is one of a known list. Use a Select.","You need several lines. Use a textarea with the same field wiring."],anatomy:["Visible label (always shown, never a placeholder alone)","Required marker `*` (hidden from screen readers; the native `required` is announced)","Hint text","Control",'Error message, prefixed "Error:"'],variants:"Any native input `type` (text, email, url, date, search). Use the `hint` and `error` props for help text.",states:'Default, hover (darker border), focus-visible, disabled, error (`aria-invalid="true"`, 2px danger border and a text message).',keyboard:[["Tab","Moves focus into the field"],["Typing","Edits the value (native behavior)"]],a11y:[["1.3.1 Info and Relationships / 3.3.2 Labels or Instructions","Real `<label for>`; hint and error are linked with `aria-describedby`."],["3.3.1 Error Identification",'Errors are text ("Error: …"), not only a red border, and are read with the field.'],["1.4.11 Non-text Contrast","The input border is `--border`, 3:1 or more against the surface."],V],code:'<Input label="Company" required error={errors.company} />'})}}}},e={},r={args:{required:!0}},a={parameters:{pseudo:{hover:!0}}},o={parameters:{pseudo:{focusVisible:!0}}},s={args:{disabled:!0,defaultValue:"Acme"}},t={args:{required:!0,error:"Enter the company name."}};var n,i,d;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:"{}",...(d=(i=e.parameters)==null?void 0:i.docs)==null?void 0:d.source}}};var c,u,p;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    required: true
  }
}`,...(p=(u=r.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};var m,l,h;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  parameters: {
    pseudo: {
      hover: true
    }
  }
}`,...(h=(l=a.parameters)==null?void 0:l.docs)==null?void 0:h.source}}};var b,f,g;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`{
  parameters: {
    pseudo: {
      focusVisible: true
    }
  }
}`,...(g=(f=o.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var v,y,x;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    disabled: true,
    defaultValue: 'Acme'
  }
}`,...(x=(y=s.parameters)==null?void 0:y.docs)==null?void 0:x.source}}};var E,q,w;t.parameters={...t.parameters,docs:{...(E=t.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    required: true,
    error: 'Enter the company name.'
  }
}`,...(w=(q=t.parameters)==null?void 0:q.docs)==null?void 0:w.source}}};const A=["Default","Required","Hover","FocusVisible","Disabled","Error"];export{e as Default,s as Disabled,t as Error,o as FocusVisible,a as Hover,r as Required,A as __namedExportsOrder,U as default};
