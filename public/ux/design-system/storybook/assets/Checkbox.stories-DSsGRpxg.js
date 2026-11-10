import{j as m}from"./jsx-runtime-D_zvdyIk.js";import{r as B}from"./index-C9y0RuIT.js";import{C as h,a as J}from"./Toast-Cfig555-.js";import{d as K,F as P}from"./doc-iM-grpUe.js";import"./_commonjsHelpers-CqkleIqs.js";const re={title:"Components/Checkbox",component:h,tags:["autodocs"],args:{label:"Remote only"},parameters:{docs:{description:{component:K({use:["A setting is on or off.","Someone picks any number of options from a short list (use CheckboxGroup)."],avoid:["Only one option can be picked. Use radio buttons or a Select.","The change applies instantly like a switch. Use a toggle button."],anatomy:["Native checkbox (20px, inside a 44px tall row)","Label","Optional hint","Error message","CheckboxGroup: `<fieldset>` with a `<legend>`"],variants:'Single checkbox, indeterminate ("some selected"), and a group.',states:'Unchecked, checked, indeterminate (`aria-checked="mixed"`), hover, focus-visible, disabled, error.',keyboard:[["Tab","Moves focus to the checkbox"],["Space","Toggles checked"]],a11y:[["1.3.1 Info and Relationships","Group uses `<fieldset>`/`<legend>`; each label uses `for`."],["4.1.2 Name, Role, Value","Native checkbox; indeterminate is set on the DOM property and announced as mixed."],["3.3.1 Error Identification","Error text is linked with `aria-describedby`."],P],code:`<CheckboxGroup legend="Work type">
  <Checkbox label="Remote" />
  <Checkbox label="Hybrid" />
</CheckboxGroup>`})}}}};function Q(){const r=["Remote","Hybrid","On site"],[o,b]=B.useState(["Remote"]),q=e=>b(u=>u.includes(e)?u.filter(z=>z!==e):[...u,e]);return m.jsxs(J,{legend:"Work type",children:[m.jsx(h,{label:"All types",checked:o.length===r.length,indeterminate:o.length>0&&o.length<r.length,onChange:()=>b(o.length===r.length?[]:r)}),r.map(e=>m.jsx(h,{label:e,checked:o.includes(e),onChange:()=>q(e)},e))]})}const s={},a={args:{defaultChecked:!0}},t={args:{label:"Select all roles",indeterminate:!0}},n={args:{hint:"Hides roles that need you on site."}},c={parameters:{pseudo:{hover:!0}}},i={parameters:{pseudo:{focusVisible:!0}}},d={args:{disabled:!0}},l={args:{label:"I confirm the details are correct",error:"Confirm before saving."}},p={render:()=>m.jsx(Q,{})};var g,f,k;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:"{}",...(k=(f=s.parameters)==null?void 0:f.docs)==null?void 0:k.source}}};var x,C,S;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    defaultChecked: true
  }
}`,...(S=(C=a.parameters)==null?void 0:C.docs)==null?void 0:S.source}}};var y,v,G;t.parameters={...t.parameters,docs:{...(y=t.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    label: 'Select all roles',
    indeterminate: true
  }
}`,...(G=(v=t.parameters)==null?void 0:v.docs)==null?void 0:G.source}}};var E,H,O;n.parameters={...n.parameters,docs:{...(E=n.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    hint: 'Hides roles that need you on site.'
  }
}`,...(O=(H=n.parameters)==null?void 0:H.docs)==null?void 0:O.source}}};var D,R,j;c.parameters={...c.parameters,docs:{...(D=c.parameters)==null?void 0:D.docs,source:{originalSource:`{
  parameters: {
    pseudo: {
      hover: true
    }
  }
}`,...(j=(R=c.parameters)==null?void 0:R.docs)==null?void 0:j.source}}};var I,V,w;i.parameters={...i.parameters,docs:{...(I=i.parameters)==null?void 0:I.docs,source:{originalSource:`{
  parameters: {
    pseudo: {
      focusVisible: true
    }
  }
}`,...(w=(V=i.parameters)==null?void 0:V.docs)==null?void 0:w.source}}};var F,N,T;d.parameters={...d.parameters,docs:{...(F=d.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...(T=(N=d.parameters)==null?void 0:N.docs)==null?void 0:T.source}}};var U,W,_;l.parameters={...l.parameters,docs:{...(U=l.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    label: 'I confirm the details are correct',
    error: 'Confirm before saving.'
  }
}`,...(_=(W=l.parameters)==null?void 0:W.docs)==null?void 0:_.source}}};var A,M,L;p.parameters={...p.parameters,docs:{...(A=p.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => <GroupDemo />
}`,...(L=(M=p.parameters)==null?void 0:M.docs)==null?void 0:L.source}}};const oe=["Default","Checked","Indeterminate","WithHint","Hover","FocusVisible","Disabled","Error","Group"];export{a as Checked,s as Default,d as Disabled,l as Error,i as FocusVisible,p as Group,c as Hover,t as Indeterminate,n as WithHint,oe as __namedExportsOrder,re as default};
