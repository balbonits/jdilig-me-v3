import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{d as R,F as H}from"./doc-t_4pxHUb.js";import{A as U}from"./AllThemes-7kMZk7Ez.js";import{u as z,F as B}from"./Field-CcNIjgJN.js";import{c as J}from"./cx-2dOUpm6k.js";import"./theme-skYQoSby.js";import"./index-C9y0RuIT.js";import"./_commonjsHelpers-CqkleIqs.js";function n({label:V,hint:p,error:l,required:m,className:_,children:k,...I}){const d=z({hint:p,error:l});return e.jsx(B,{...d,label:V,hint:p,error:l,required:m,children:e.jsx("select",{id:d.id,className:J("em-control",_),"aria-describedby":d.describedBy,"aria-invalid":l?!0:void 0,required:m,...I,children:k})})}n.__docgenInfo={description:"A styled native select: the browser handles the listbox, keyboard and screen reader behavior.",methods:[],displayName:"Select",props:{label:{required:!0,tsType:{name:"string"},description:""},hint:{required:!1,tsType:{name:"string"},description:""},error:{required:!1,tsType:{name:"string"},description:""},required:{required:!1,tsType:{name:"boolean"},description:""}}};const c=e.jsxs(e.Fragment,{children:[e.jsx("option",{value:"",children:"Choose a stage"}),e.jsx("option",{value:"saved",children:"Saved"}),e.jsx("option",{value:"applied",children:"Applied"}),e.jsx("option",{value:"interview",children:"Interview"}),e.jsx("option",{value:"offer",children:"Offer"})]}),Y={title:"Components/Select",component:n,tags:["autodocs"],args:{label:"Stage",children:c},parameters:{docs:{description:{component:R({use:["Someone picks one option from a list of about 4 to 15."],avoid:["There are 2 or 3 options. Show them all as radio buttons.","The list needs search. That is a custom listbox, planned for a later version."],anatomy:["Visible label","Optional hint","Native `<select>` styled with tokens","Error message"],variants:"One size (44px). Use an empty first option as a prompt when there is no default.",states:"Default, hover, focus-visible, disabled, error.",keyboard:[["Tab","Moves focus to the select"],["Space / Enter / Alt+↓","Opens the option list (browser native)"],["↑ / ↓","Changes the option"],["Typing a letter","Jumps to a matching option"]],a11y:[["4.1.2 Name, Role, Value","Native `<select>`: the browser and screen reader handle the listbox."],["1.3.1 Info and Relationships","Label and hint/error wired with `for` and `aria-describedby`."],["3.3.1 Error Identification","Error shown as text and `aria-invalid`."],H],code:`<Select label="Stage" value={stage} onChange={(e) => setStage(e.target.value)}>
  <option value="applied">Applied</option>
</Select>`})}}}},s={},a={parameters:{pseudo:{hover:!0}}},o={parameters:{pseudo:{focusVisible:!0}}},t={args:{disabled:!0}},i={args:{required:!0,error:"Choose a stage."}},r={name:"All themes",render:()=>e.jsx(U,{children:()=>e.jsxs("div",{style:{display:"grid",gap:12},children:[e.jsx(n,{label:"Stage",children:c}),e.jsx(n,{label:"Next step",required:!0,error:"Choose a stage.",children:c})]})})};var u,h,b;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:"{}",...(b=(h=s.parameters)==null?void 0:h.docs)==null?void 0:b.source}}};var g,v,f;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  parameters: {
    pseudo: {
      hover: true
    }
  }
}`,...(f=(v=a.parameters)==null?void 0:v.docs)==null?void 0:f.source}}};var S,x,y;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  parameters: {
    pseudo: {
      focusVisible: true
    }
  }
}`,...(y=(x=o.parameters)==null?void 0:x.docs)==null?void 0:y.source}}};var T,j,A;t.parameters={...t.parameters,docs:{...(T=t.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...(A=(j=t.parameters)==null?void 0:j.docs)==null?void 0:A.source}}};var w,C,E;i.parameters={...i.parameters,docs:{...(w=i.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    required: true,
    error: 'Choose a stage.'
  }
}`,...(E=(C=i.parameters)==null?void 0:C.docs)==null?void 0:E.source}}};var q,F,N,O,D;r.parameters={...r.parameters,docs:{...(q=r.parameters)==null?void 0:q.docs,source:{originalSource:`{
  name: 'All themes',
  render: () => <AllThemes>{() => <div style={{
      display: 'grid',
      gap: 12
    }}>
        <Select label="Stage">{options}</Select>
        <Select label="Next step" required error="Choose a stage.">{options}</Select>
      </div>}</AllThemes>
}`,...(N=(F=r.parameters)==null?void 0:F.docs)==null?void 0:N.source},description:{story:"Default and error in all 6 theme x mode combos (R-2).",...(D=(O=r.parameters)==null?void 0:O.docs)==null?void 0:D.description}}};const Z=["Default","Hover","FocusVisible","Disabled","Error","AllThemesStory"];export{r as AllThemesStory,s as Default,t as Disabled,i as Error,o as FocusVisible,a as Hover,Z as __namedExportsOrder,Y as default};
