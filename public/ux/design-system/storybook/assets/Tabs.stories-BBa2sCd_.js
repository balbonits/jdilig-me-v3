import{j as o}from"./jsx-runtime-D_zvdyIk.js";import{b as T}from"./Toast-Cfig555-.js";import{d as x,F as R}from"./doc-iM-grpUe.js";import"./index-C9y0RuIT.js";import"./_commonjsHelpers-CqkleIqs.js";const n=[{id:"overview",label:"Overview",content:o.jsx("p",{style:{margin:0},children:"Role summary and current stage."})},{id:"notes",label:"Notes",content:o.jsx("p",{style:{margin:0},children:"Interview notes go here."})},{id:"contacts",label:"Contacts",content:o.jsx("p",{style:{margin:0},children:"Recruiter and hiring manager."})}],H={title:"Components/Tabs",component:T,tags:["autodocs"],args:{label:"Role details",tabs:n},parameters:{docs:{description:{component:x({use:["Related content splits into 2 to 6 views and only one is needed at a time."],avoid:["The views are steps in order. Use a stepper or separate pages.","People need to compare views side by side. Show them together."],anatomy:["`tablist` with an accessible name","`tab` buttons (roving tabindex: only the selected tab is in the Tab order)","`tabpanel` for each tab, labelled by its tab and focusable"],variants:"Horizontal tabs. Tabs scroll sideways when they do not fit (320px wide screens).",states:"Selected (accent underline), unselected, hover, focus-visible, disabled tab (skipped by arrow keys).",keyboard:[["Tab","Moves focus to the selected tab, then into the panel"],["→ / ←","Moves to and selects the next or previous tab (wraps)"],["Home / End","Selects the first or last tab"]],a11y:[["4.1.2 Name, Role, Value","WAI-ARIA tabs pattern: `tablist`, `tab` with `aria-selected` and `aria-controls`, `tabpanel` with `aria-labelledby`."],["2.1.1 Keyboard","Arrow keys, Home and End, with automatic activation."],["1.4.11 Non-text Contrast","The selected underline uses `--accent`, 3:1 or more against the background."],R],code:`<Tabs label="Role details" tabs={[
  { id: 'overview', label: 'Overview', content: <Overview /> },
  { id: 'notes', label: 'Notes', content: <Notes /> },
]} />`})}}}},e={},a={args:{defaultTab:"notes"}},t={args:{tabs:[...n.slice(0,2),{...n[2],disabled:!0}]}},s={parameters:{pseudo:{hover:!0}}},r={parameters:{pseudo:{focusVisible:!0}}};var i,c,d;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:"{}",...(d=(c=e.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var l,b,p;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    defaultTab: 'notes'
  }
}`,...(p=(b=a.parameters)==null?void 0:b.docs)==null?void 0:p.source}}};var m,u,h;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    tabs: [...tabs.slice(0, 2), {
      ...tabs[2],
      disabled: true
    }]
  }
}`,...(h=(u=t.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};var v,g,w;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
  parameters: {
    pseudo: {
      hover: true
    }
  }
}`,...(w=(g=s.parameters)==null?void 0:g.docs)==null?void 0:w.source}}};var y,f,S;r.parameters={...r.parameters,docs:{...(y=r.parameters)==null?void 0:y.docs,source:{originalSource:`{
  parameters: {
    pseudo: {
      focusVisible: true
    }
  }
}`,...(S=(f=r.parameters)==null?void 0:f.docs)==null?void 0:S.source}}};const V=["Default","SecondSelected","WithDisabledTab","Hover","FocusVisible"];export{e as Default,r as FocusVisible,s as Hover,a as SecondSelected,t as WithDisabledTab,V as __namedExportsOrder,H as default};
