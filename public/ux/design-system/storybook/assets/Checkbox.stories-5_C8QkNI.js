import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as k}from"./index-C9y0RuIT.js";import{d as se,F as oe}from"./doc-t_4pxHUb.js";import{A as ae}from"./AllThemes-7kMZk7Ez.js";import{c as te}from"./cx-2dOUpm6k.js";import"./_commonjsHelpers-CqkleIqs.js";import"./theme-skYQoSby.js";function t({label:o,hint:r,error:a,indeterminate:c=!1,disabled:s,className:i,...y}){const n=k.useId(),C=k.useRef(null);k.useEffect(()=>{C.current&&(C.current.indeterminate=c)},[c]);const re=[r&&`${n}-hint`,a&&`${n}-error`].filter(Boolean).join(" ")||void 0;return e.jsxs("div",{className:te("em-check",s&&"em-check--disabled",i),children:[e.jsx("input",{ref:C,id:n,type:"checkbox",disabled:s,"aria-describedby":re,"aria-invalid":a?!0:void 0,"aria-checked":c?"mixed":void 0,...y}),e.jsxs("span",{className:"em-check-text",children:[e.jsx("label",{htmlFor:n,children:o}),r&&e.jsx("span",{className:"em-hint",id:`${n}-hint`,children:r}),a&&e.jsxs("span",{className:"em-error",id:`${n}-error`,children:["Error: ",a]})]})]})}function ee({legend:o,children:r}){return e.jsxs("fieldset",{className:"em-fieldset",children:[e.jsx("legend",{className:"em-legend",children:o}),r]})}t.__docgenInfo={description:"",methods:[],displayName:"Checkbox",props:{label:{required:!0,tsType:{name:"string"},description:""},hint:{required:!1,tsType:{name:"string"},description:""},error:{required:!1,tsType:{name:"string"},description:""},indeterminate:{required:!1,tsType:{name:"boolean"},description:'Mixed state, e.g. a "select all" when only some items are checked.',defaultValue:{value:"false",computed:!1}}}};ee.__docgenInfo={description:"",methods:[],displayName:"CheckboxGroup",props:{legend:{required:!0,tsType:{name:"string"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""}}};const he={title:"Components/Checkbox",component:t,tags:["autodocs"],args:{label:"Remote only"},parameters:{docs:{description:{component:se({use:["A setting is on or off.","Someone picks any number of options from a short list (use CheckboxGroup)."],avoid:["Only one option can be picked. Use radio buttons or a Select.","The change applies instantly like a switch. Use a toggle button."],anatomy:["Native checkbox (20px, inside a 44px tall row)","Label","Optional hint","Error message","CheckboxGroup: `<fieldset>` with a `<legend>`"],variants:'Single checkbox, indeterminate ("some selected"), and a group.',states:'Unchecked, checked, indeterminate (`aria-checked="mixed"`), hover, focus-visible, disabled, error.',keyboard:[["Tab","Moves focus to the checkbox"],["Space","Toggles checked"]],a11y:[["1.3.1 Info and Relationships","Group uses `<fieldset>`/`<legend>`; each label uses `for`."],["4.1.2 Name, Role, Value","Native checkbox; indeterminate is set on the DOM property and announced as mixed."],["3.3.1 Error Identification","Error text is linked with `aria-describedby`."],oe],code:`<CheckboxGroup legend="Work type">
  <Checkbox label="Remote" />
  <Checkbox label="Hybrid" />
</CheckboxGroup>`})}}}};function ne(){const o=["Remote","Hybrid","On site"],[r,a]=k.useState(["Remote"]),c=s=>a(i=>i.includes(s)?i.filter(y=>y!==s):[...i,s]);return e.jsxs(ee,{legend:"Work type",children:[e.jsx(t,{label:"All types",checked:r.length===o.length,indeterminate:r.length>0&&r.length<o.length,onChange:()=>a(r.length===o.length?[]:o)}),o.map(s=>e.jsx(t,{label:s,checked:r.includes(s),onChange:()=>c(s)},s))]})}const d={},m={args:{defaultChecked:!0}},p={args:{label:"Select all roles",indeterminate:!0}},u={args:{hint:"Hides roles that need you on site."}},h={parameters:{pseudo:{hover:!0}}},b={parameters:{pseudo:{focusVisible:!0}}},g={args:{disabled:!0}},f={args:{label:"I confirm the details are correct",error:"Confirm before saving."}},x={render:()=>e.jsx(ne,{})},l={name:"All themes",render:()=>e.jsx(ae,{children:()=>e.jsxs("div",{children:[e.jsx(t,{label:"Remote only"}),e.jsx(t,{label:"Has salary range",defaultChecked:!0}),e.jsx(t,{label:"I confirm the details",error:"Confirm before saving."})]})})};var v,j,S;d.parameters={...d.parameters,docs:{...(v=d.parameters)==null?void 0:v.docs,source:{originalSource:"{}",...(S=(j=d.parameters)==null?void 0:j.docs)==null?void 0:S.source}}};var T,N,R;m.parameters={...m.parameters,docs:{...(T=m.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    defaultChecked: true
  }
}`,...(R=(N=m.parameters)==null?void 0:N.docs)==null?void 0:R.source}}};var E,G,I;p.parameters={...p.parameters,docs:{...(E=p.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    label: 'Select all roles',
    indeterminate: true
  }
}`,...(I=(G=p.parameters)==null?void 0:G.docs)==null?void 0:I.source}}};var A,H,O;u.parameters={...u.parameters,docs:{...(A=u.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    hint: 'Hides roles that need you on site.'
  }
}`,...(O=(H=u.parameters)==null?void 0:H.docs)==null?void 0:O.source}}};var D,_,q;h.parameters={...h.parameters,docs:{...(D=h.parameters)==null?void 0:D.docs,source:{originalSource:`{
  parameters: {
    pseudo: {
      hover: true
    }
  }
}`,...(q=(_=h.parameters)==null?void 0:_.docs)==null?void 0:q.source}}};var V,w,F;b.parameters={...b.parameters,docs:{...(V=b.parameters)==null?void 0:V.docs,source:{originalSource:`{
  parameters: {
    pseudo: {
      focusVisible: true
    }
  }
}`,...(F=(w=b.parameters)==null?void 0:w.docs)==null?void 0:F.source}}};var U,W,$;g.parameters={...g.parameters,docs:{...(U=g.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...($=(W=g.parameters)==null?void 0:W.docs)==null?void 0:$.source}}};var M,B,L;f.parameters={...f.parameters,docs:{...(M=f.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    label: 'I confirm the details are correct',
    error: 'Confirm before saving.'
  }
}`,...(L=(B=f.parameters)==null?void 0:B.docs)==null?void 0:L.source}}};var z,J,K;x.parameters={...x.parameters,docs:{...(z=x.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => <GroupDemo />
}`,...(K=(J=x.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var P,Q,X,Y,Z;l.parameters={...l.parameters,docs:{...(P=l.parameters)==null?void 0:P.docs,source:{originalSource:`{
  name: 'All themes',
  render: () => <AllThemes>{() => <div>
        <Checkbox label="Remote only" />
        <Checkbox label="Has salary range" defaultChecked />
        <Checkbox label="I confirm the details" error="Confirm before saving." />
      </div>}</AllThemes>
}`,...(X=(Q=l.parameters)==null?void 0:Q.docs)==null?void 0:X.source},description:{story:"Unchecked, checked and error in all 6 theme x mode combos (R-2).",...(Z=(Y=l.parameters)==null?void 0:Y.docs)==null?void 0:Z.description}}};const be=["Default","Checked","Indeterminate","WithHint","Hover","FocusVisible","Disabled","Error","Group","AllThemesStory"];export{l as AllThemesStory,m as Checked,d as Default,g as Disabled,f as Error,b as FocusVisible,x as Group,h as Hover,p as Indeterminate,u as WithHint,be as __namedExportsOrder,he as default};
