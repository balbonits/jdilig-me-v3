import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{S as w}from"./Toast-Cfig555-.js";import{d as E,F as j}from"./doc-iM-grpUe.js";import"./index-C9y0RuIT.js";import"./_commonjsHelpers-CqkleIqs.js";const y=e.jsxs(e.Fragment,{children:[e.jsx("option",{value:"",children:"Choose a stage"}),e.jsx("option",{value:"saved",children:"Saved"}),e.jsx("option",{value:"applied",children:"Applied"}),e.jsx("option",{value:"interview",children:"Interview"}),e.jsx("option",{value:"offer",children:"Offer"})]}),F={title:"Components/Select",component:w,tags:["autodocs"],args:{label:"Stage",children:y},parameters:{docs:{description:{component:E({use:["Someone picks one option from a list of about 4 to 15."],avoid:["There are 2 or 3 options. Show them all as radio buttons.","The list needs search. That is a custom listbox, planned for a later version."],anatomy:["Visible label","Optional hint","Native `<select>` styled with tokens","Error message"],variants:"One size (44px). Use an empty first option as a prompt when there is no default.",states:"Default, hover, focus-visible, disabled, error.",keyboard:[["Tab","Moves focus to the select"],["Space / Enter / Alt+↓","Opens the option list (browser native)"],["↑ / ↓","Changes the option"],["Typing a letter","Jumps to a matching option"]],a11y:[["4.1.2 Name, Role, Value","Native `<select>`: the browser and screen reader handle the listbox."],["1.3.1 Info and Relationships","Label and hint/error wired with `for` and `aria-describedby`."],["3.3.1 Error Identification","Error shown as text and `aria-invalid`."],j],code:`<Select label="Stage" value={stage} onChange={(e) => setStage(e.target.value)}>
  <option value="applied">Applied</option>
</Select>`})}}}},r={},o={parameters:{pseudo:{hover:!0}}},a={parameters:{pseudo:{focusVisible:!0}}},s={args:{disabled:!0}},t={args:{required:!0,error:"Choose a stage."}};var n,i,p;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:"{}",...(p=(i=r.parameters)==null?void 0:i.docs)==null?void 0:p.source}}};var c,l,d;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`{
  parameters: {
    pseudo: {
      hover: true
    }
  }
}`,...(d=(l=o.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var u,m,h;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  parameters: {
    pseudo: {
      focusVisible: true
    }
  }
}`,...(h=(m=a.parameters)==null?void 0:m.docs)==null?void 0:h.source}}};var v,b,g;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...(g=(b=s.parameters)==null?void 0:b.docs)==null?void 0:g.source}}};var f,S,x;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    required: true,
    error: 'Choose a stage.'
  }
}`,...(x=(S=t.parameters)==null?void 0:S.docs)==null?void 0:x.source}}};const N=["Default","Hover","FocusVisible","Disabled","Error"];export{r as Default,s as Disabled,t as Error,a as FocusVisible,o as Hover,N as __namedExportsOrder,F as default};
