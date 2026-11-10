import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as o}from"./react-Bp2ZTvF6.js";import{M as r}from"./index-DniIBUax.js";import"./index-C9y0RuIT.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-4by9jpMv.js";import"./index-Drs0PAhs.js";import"./index-DgH-xKnr.js";import"./index-Bhqu_tAV.js";function t(s){const n={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...o(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Introduction"}),`
`,e.jsx(n.h1,{id:"ember-ui",children:"Ember UI"}),`
`,e.jsx(n.p,{children:"A small, accessible React design system starter by John Dilig. It has one token file, eight components, and a docs page for each that covers usage, keyboard behavior and WCAG notes."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Tokens:"})," color, type, space, radius and motion in ",e.jsx(n.code,{children:"src/tokens.css"}),", with light and dark themes. See ",e.jsx(n.a,{href:"?path=/docs/tokens--docs",children:"Tokens"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Components:"})," Button, Input, Select, Checkbox, Modal, Tabs, Table and Toast."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Checked automatically:"})," every story runs through axe in light and dark."]}),`
`]}),`
`,e.jsxs(n.p,{children:["Use the ",e.jsx(n.strong,{children:"Theme"})," button in the toolbar to switch light and dark. Every component works by keyboard, and motion turns off when ",e.jsx(n.code,{children:"prefers-reduced-motion: reduce"})," is set."]}),`
`,e.jsx(n.h2,{id:"use-it",children:"Use it"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { Button, ToastProvider } from 'ember-ui';
import 'ember-ui/ember.css';

<ToastProvider>
  <Button onClick={save}>Save</Button>
</ToastProvider>
`})}),`
`,e.jsxs(n.p,{children:["Code: ",e.jsx(n.a,{href:"https://github.com/balbonits/a11y-design-system",rel:"nofollow",children:"github.com/balbonits/a11y-design-system"}),". Case study: ",e.jsx(n.a,{href:"https://www.jdilig.me/ux/design-system",rel:"nofollow",children:"jdilig.me/ux/design-system"}),"."]})]})}function p(s={}){const{wrapper:n}={...o(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(t,{...s})}):t(s)}export{p as default};
