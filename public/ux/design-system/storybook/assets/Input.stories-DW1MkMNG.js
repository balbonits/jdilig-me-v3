import{j as r}from"./jsx-runtime-D_zvdyIk.js";import{d as D,F as k}from"./doc-t_4pxHUb.js";import{A as U}from"./AllThemes-7kMZk7Ez.js";import{I as d}from"./Input-xx571Hta.js";import"./theme-skYQoSby.js";import"./Field-CcNIjgJN.js";import"./index-C9y0RuIT.js";import"./_commonjsHelpers-CqkleIqs.js";import"./cx-2dOUpm6k.js";const B={title:"Components/Input",component:d,tags:["autodocs"],args:{label:"Company",hint:"As it appears on the job post."},parameters:{docs:{description:{component:D({use:["You need one line of free text: a name, a URL, an email, a date."],avoid:["The answer is one of a known list. Use a Select.","You need several lines. Use a textarea with the same field wiring."],anatomy:["Visible label (always shown, never a placeholder alone)","Required marker `*` (hidden from screen readers; the native `required` is announced)","Hint text","Control",'Error message, prefixed "Error:"'],variants:"Any native input `type` (text, email, url, date, search). Use the `hint` and `error` props for help text.",states:'Default, hover (darker border), focus-visible, disabled, error (`aria-invalid="true"`, 2px danger border and a text message).',keyboard:[["Tab","Moves focus into the field"],["Typing","Edits the value (native behavior)"]],a11y:[["1.3.1 Info and Relationships / 3.3.2 Labels or Instructions","Real `<label for>`; hint and error are linked with `aria-describedby`."],["3.3.1 Error Identification",'Errors are text ("Error: …"), not only a red border, and are read with the field.'],["1.4.11 Non-text Contrast","The input border is `--border`, 3:1 or more against the surface."],k],code:'<Input label="Company" required error={errors.company} />'})}}}},a={},s={args:{required:!0}},o={parameters:{pseudo:{hover:!0}}},t={parameters:{pseudo:{focusVisible:!0}}},n={args:{disabled:!0,defaultValue:"Acme"}},i={args:{required:!0,error:"Enter the company name."}},e={name:"All themes",render:()=>r.jsx(U,{children:()=>r.jsxs("div",{style:{display:"grid",gap:12},children:[r.jsx(d,{label:"Company",hint:"As it appears on the posting."}),r.jsx(d,{label:"Role",required:!0,error:"Enter the role title."})]})})};var l,p,m;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:"{}",...(m=(p=a.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var c,u,h;s.parameters={...s.parameters,docs:{...(c=s.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    required: true
  }
}`,...(h=(u=s.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};var b,f,g;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`{
  parameters: {
    pseudo: {
      hover: true
    }
  }
}`,...(g=(f=o.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var y,v,x;t.parameters={...t.parameters,docs:{...(y=t.parameters)==null?void 0:y.docs,source:{originalSource:`{
  parameters: {
    pseudo: {
      focusVisible: true
    }
  }
}`,...(x=(v=t.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};var E,A,q;n.parameters={...n.parameters,docs:{...(E=n.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    disabled: true,
    defaultValue: 'Acme'
  }
}`,...(q=(A=n.parameters)==null?void 0:A.docs)==null?void 0:q.source}}};var S,R,T;i.parameters={...i.parameters,docs:{...(S=i.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    required: true,
    error: 'Enter the company name.'
  }
}`,...(T=(R=i.parameters)==null?void 0:R.docs)==null?void 0:T.source}}};var I,w,C,j,V;e.parameters={...e.parameters,docs:{...(I=e.parameters)==null?void 0:I.docs,source:{originalSource:`{
  name: 'All themes',
  render: () => <AllThemes>{() => <div style={{
      display: 'grid',
      gap: 12
    }}>
        <Input label="Company" hint="As it appears on the posting." />
        <Input label="Role" required error="Enter the role title." />
      </div>}</AllThemes>
}`,...(C=(w=e.parameters)==null?void 0:w.docs)==null?void 0:C.source},description:{story:"Default, hint and error in all 6 theme x mode combos (R-2).",...(V=(j=e.parameters)==null?void 0:j.docs)==null?void 0:V.description}}};const G=["Default","Required","Hover","FocusVisible","Disabled","Error","AllThemesStory"];export{e as AllThemesStory,a as Default,n as Disabled,i as Error,t as FocusVisible,o as Hover,s as Required,G as __namedExportsOrder,B as default};
