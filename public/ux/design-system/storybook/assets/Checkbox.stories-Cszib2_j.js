import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as f}from"./index-C9y0RuIT.js";import{d as Q,F as X}from"./doc-iM-grpUe.js";import{c as Y}from"./cx-2dOUpm6k.js";import"./_commonjsHelpers-CqkleIqs.js";function k({label:o,hint:r,error:a,indeterminate:n=!1,disabled:s,className:c,...x}){const t=f.useId(),y=f.useRef(null);f.useEffect(()=>{y.current&&(y.current.indeterminate=n)},[n]);const P=[r&&`${t}-hint`,a&&`${t}-error`].filter(Boolean).join(" ")||void 0;return e.jsxs("div",{className:Y("em-check",s&&"em-check--disabled",c),children:[e.jsx("input",{ref:y,id:t,type:"checkbox",disabled:s,"aria-describedby":P,"aria-invalid":a?!0:void 0,"aria-checked":n?"mixed":void 0,...x}),e.jsxs("span",{className:"em-check-text",children:[e.jsx("label",{htmlFor:t,children:o}),r&&e.jsx("span",{className:"em-hint",id:`${t}-hint`,children:r}),a&&e.jsxs("span",{className:"em-error",id:`${t}-error`,children:["Error: ",a]})]})]})}function K({legend:o,children:r}){return e.jsxs("fieldset",{className:"em-fieldset",children:[e.jsx("legend",{className:"em-legend",children:o}),r]})}k.__docgenInfo={description:"",methods:[],displayName:"Checkbox",props:{label:{required:!0,tsType:{name:"string"},description:""},hint:{required:!1,tsType:{name:"string"},description:""},error:{required:!1,tsType:{name:"string"},description:""},indeterminate:{required:!1,tsType:{name:"boolean"},description:'Mixed state, e.g. a "select all" when only some items are checked.',defaultValue:{value:"false",computed:!1}}}};K.__docgenInfo={description:"",methods:[],displayName:"CheckboxGroup",props:{legend:{required:!0,tsType:{name:"string"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""}}};const te={title:"Components/Checkbox",component:k,tags:["autodocs"],args:{label:"Remote only"},parameters:{docs:{description:{component:Q({use:["A setting is on or off.","Someone picks any number of options from a short list (use CheckboxGroup)."],avoid:["Only one option can be picked. Use radio buttons or a Select.","The change applies instantly like a switch. Use a toggle button."],anatomy:["Native checkbox (20px, inside a 44px tall row)","Label","Optional hint","Error message","CheckboxGroup: `<fieldset>` with a `<legend>`"],variants:'Single checkbox, indeterminate ("some selected"), and a group.',states:'Unchecked, checked, indeterminate (`aria-checked="mixed"`), hover, focus-visible, disabled, error.',keyboard:[["Tab","Moves focus to the checkbox"],["Space","Toggles checked"]],a11y:[["1.3.1 Info and Relationships","Group uses `<fieldset>`/`<legend>`; each label uses `for`."],["4.1.2 Name, Role, Value","Native checkbox; indeterminate is set on the DOM property and announced as mixed."],["3.3.1 Error Identification","Error text is linked with `aria-describedby`."],X],code:`<CheckboxGroup legend="Work type">
  <Checkbox label="Remote" />
  <Checkbox label="Hybrid" />
</CheckboxGroup>`})}}}};function Z(){const o=["Remote","Hybrid","On site"],[r,a]=f.useState(["Remote"]),n=s=>a(c=>c.includes(s)?c.filter(x=>x!==s):[...c,s]);return e.jsxs(K,{legend:"Work type",children:[e.jsx(k,{label:"All types",checked:r.length===o.length,indeterminate:r.length>0&&r.length<o.length,onChange:()=>a(r.length===o.length?[]:o)}),o.map(s=>e.jsx(k,{label:s,checked:r.includes(s),onChange:()=>n(s)},s))]})}const i={},d={args:{defaultChecked:!0}},l={args:{label:"Select all roles",indeterminate:!0}},p={args:{hint:"Hides roles that need you on site."}},m={parameters:{pseudo:{hover:!0}}},u={parameters:{pseudo:{focusVisible:!0}}},h={args:{disabled:!0}},b={args:{label:"I confirm the details are correct",error:"Confirm before saving."}},g={render:()=>e.jsx(Z,{})};var C,v,S;i.parameters={...i.parameters,docs:{...(C=i.parameters)==null?void 0:C.docs,source:{originalSource:"{}",...(S=(v=i.parameters)==null?void 0:v.docs)==null?void 0:S.source}}};var j,N,E;d.parameters={...d.parameters,docs:{...(j=d.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    defaultChecked: true
  }
}`,...(E=(N=d.parameters)==null?void 0:N.docs)==null?void 0:E.source}}};var G,T,I;l.parameters={...l.parameters,docs:{...(G=l.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    label: 'Select all roles',
    indeterminate: true
  }
}`,...(I=(T=l.parameters)==null?void 0:T.docs)==null?void 0:I.source}}};var R,H,O;p.parameters={...p.parameters,docs:{...(R=p.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    hint: 'Hides roles that need you on site.'
  }
}`,...(O=(H=p.parameters)==null?void 0:H.docs)==null?void 0:O.source}}};var D,_,q;m.parameters={...m.parameters,docs:{...(D=m.parameters)==null?void 0:D.docs,source:{originalSource:`{
  parameters: {
    pseudo: {
      hover: true
    }
  }
}`,...(q=(_=m.parameters)==null?void 0:_.docs)==null?void 0:q.source}}};var V,w,F;u.parameters={...u.parameters,docs:{...(V=u.parameters)==null?void 0:V.docs,source:{originalSource:`{
  parameters: {
    pseudo: {
      focusVisible: true
    }
  }
}`,...(F=(w=u.parameters)==null?void 0:w.docs)==null?void 0:F.source}}};var U,W,$;h.parameters={...h.parameters,docs:{...(U=h.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...($=(W=h.parameters)==null?void 0:W.docs)==null?void 0:$.source}}};var M,A,B;b.parameters={...b.parameters,docs:{...(M=b.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    label: 'I confirm the details are correct',
    error: 'Confirm before saving.'
  }
}`,...(B=(A=b.parameters)==null?void 0:A.docs)==null?void 0:B.source}}};var L,z,J;g.parameters={...g.parameters,docs:{...(L=g.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => <GroupDemo />
}`,...(J=(z=g.parameters)==null?void 0:z.docs)==null?void 0:J.source}}};const ne=["Default","Checked","Indeterminate","WithHint","Hover","FocusVisible","Disabled","Error","Group"];export{d as Checked,i as Default,h as Disabled,b as Error,u as FocusVisible,g as Group,m as Hover,l as Indeterminate,p as WithHint,ne as __namedExportsOrder,te as default};
