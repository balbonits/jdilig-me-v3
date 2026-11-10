import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{d as N,F as V}from"./doc-iM-grpUe.js";import{u as D,F as _}from"./Field-CcNIjgJN.js";import{c as k}from"./cx-2dOUpm6k.js";import"./index-C9y0RuIT.js";import"./_commonjsHelpers-CqkleIqs.js";function E({label:F,hint:d,error:i,required:l,className:C,children:O,...q}){const n=D({hint:d,error:i});return e.jsx(_,{...n,label:F,hint:d,error:i,required:l,children:e.jsx("select",{id:n.id,className:k("em-control",C),"aria-describedby":n.describedBy,"aria-invalid":i?!0:void 0,required:l,...q,children:O})})}E.__docgenInfo={description:"A styled native select: the browser handles the listbox, keyboard and screen reader behavior.",methods:[],displayName:"Select",props:{label:{required:!0,tsType:{name:"string"},description:""},hint:{required:!1,tsType:{name:"string"},description:""},error:{required:!1,tsType:{name:"string"},description:""},required:{required:!1,tsType:{name:"boolean"},description:""}}};const A=e.jsxs(e.Fragment,{children:[e.jsx("option",{value:"",children:"Choose a stage"}),e.jsx("option",{value:"saved",children:"Saved"}),e.jsx("option",{value:"applied",children:"Applied"}),e.jsx("option",{value:"interview",children:"Interview"}),e.jsx("option",{value:"offer",children:"Offer"})]}),J={title:"Components/Select",component:E,tags:["autodocs"],args:{label:"Stage",children:A},parameters:{docs:{description:{component:N({use:["Someone picks one option from a list of about 4 to 15."],avoid:["There are 2 or 3 options. Show them all as radio buttons.","The list needs search. That is a custom listbox, planned for a later version."],anatomy:["Visible label","Optional hint","Native `<select>` styled with tokens","Error message"],variants:"One size (44px). Use an empty first option as a prompt when there is no default.",states:"Default, hover, focus-visible, disabled, error.",keyboard:[["Tab","Moves focus to the select"],["Space / Enter / Alt+↓","Opens the option list (browser native)"],["↑ / ↓","Changes the option"],["Typing a letter","Jumps to a matching option"]],a11y:[["4.1.2 Name, Role, Value","Native `<select>`: the browser and screen reader handle the listbox."],["1.3.1 Info and Relationships","Label and hint/error wired with `for` and `aria-describedby`."],["3.3.1 Error Identification","Error shown as text and `aria-invalid`."],V],code:`<Select label="Stage" value={stage} onChange={(e) => setStage(e.target.value)}>
  <option value="applied">Applied</option>
</Select>`})}}}},r={},s={parameters:{pseudo:{hover:!0}}},a={parameters:{pseudo:{focusVisible:!0}}},o={args:{disabled:!0}},t={args:{required:!0,error:"Choose a stage."}};var c,p,u;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:"{}",...(u=(p=r.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var m,h,b;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  parameters: {
    pseudo: {
      hover: true
    }
  }
}`,...(b=(h=s.parameters)==null?void 0:h.docs)==null?void 0:b.source}}};var f,v,g;a.parameters={...a.parameters,docs:{...(f=a.parameters)==null?void 0:f.docs,source:{originalSource:`{
  parameters: {
    pseudo: {
      focusVisible: true
    }
  }
}`,...(g=(v=a.parameters)==null?void 0:v.docs)==null?void 0:g.source}}};var S,x,y;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...(y=(x=o.parameters)==null?void 0:x.docs)==null?void 0:y.source}}};var w,j,T;t.parameters={...t.parameters,docs:{...(w=t.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    required: true,
    error: 'Choose a stage.'
  }
}`,...(T=(j=t.parameters)==null?void 0:j.docs)==null?void 0:T.source}}};const L=["Default","Hover","FocusVisible","Disabled","Error"];export{r as Default,o as Disabled,t as Error,a as FocusVisible,s as Hover,L as __namedExportsOrder,J as default};
