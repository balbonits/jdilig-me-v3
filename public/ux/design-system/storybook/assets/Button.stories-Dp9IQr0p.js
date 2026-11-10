import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{d as J,F as K}from"./doc-iM-grpUe.js";import{B as r}from"./Button-B2zDfGes.js";import"./cx-2dOUpm6k.js";const $={title:"Components/Button",component:r,tags:["autodocs"],args:{children:"Save changes",variant:"primary",size:"md"},parameters:{docs:{description:{component:J({use:["Someone triggers an action: submit, save, open a dialog, delete."],avoid:["It goes to another page. Use a link (`<a href>`) instead.","There are several equal choices. Use a Select or Checkbox group."],anatomy:["Container (44px min height for md, the WCAG 2.5.8 target size)","Optional leading spinner while loading","Label, or an icon with an `aria-label` when icon-only"],variants:"`primary` for the main action (one per view), `secondary` for other actions, `ghost` for low-emphasis actions in toolbars, `danger` for destructive actions. Sizes `sm`, `md`, `lg`.",states:'Default, hover, focus-visible, active (moves down 1px, off under reduced motion), disabled (native `disabled`), loading (`aria-busy="true"`, clicks are ignored).',keyboard:[["Tab","Moves focus to the button"],["Enter / Space","Activates the button"]],a11y:[["4.1.2 Name, Role, Value","Native `<button>`. Icon-only buttons require `aria-label` (enforced by the TypeScript type)."],["1.4.3 Contrast (Minimum)","Label text is 4.5:1 or more on every variant in both themes (see Tokens)."],["2.5.8 Target Size (Minimum)","`sm` is 36px, `md` 44px, `lg` 48px tall."],K,["4.1.3 Status Messages","Loading sets `aria-busy`; pair it with a Toast or text for the result."]],code:`<Button variant="primary" onClick={save}>Save changes</Button>
<Button variant="ghost" iconOnly aria-label="Close">✕</Button>`})}}}},a={},s={args:{variant:"secondary",children:"Cancel"}},o={args:{variant:"ghost",children:"Skip"}},t={args:{variant:"danger",children:"Delete role"}},n={render:u=>e.jsxs("div",{style:{display:"flex",gap:12,alignItems:"center",flexWrap:"wrap"},children:[e.jsx(r,{...u,size:"sm",children:"Small"}),e.jsx(r,{...u,size:"md",children:"Medium"}),e.jsx(r,{...u,size:"lg",children:"Large"})]})},i={render:()=>e.jsx(r,{variant:"secondary",iconOnly:!0,"aria-label":"Add role",children:e.jsx("span",{"aria-hidden":"true",children:"+"})})},c={parameters:{pseudo:{hover:!0}}},d={parameters:{pseudo:{focusVisible:!0}}},l={parameters:{pseudo:{active:!0}}},p={args:{disabled:!0}},m={args:{loading:!0,children:"Saving…"}};var g,h,v;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:"{}",...(v=(h=a.parameters)==null?void 0:h.docs)==null?void 0:v.source}}};var y,b,S;s.parameters={...s.parameters,docs:{...(y=s.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    children: 'Cancel'
  }
}`,...(S=(b=s.parameters)==null?void 0:b.docs)==null?void 0:S.source}}};var f,x,B;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    variant: 'ghost',
    children: 'Skip'
  }
}`,...(B=(x=o.parameters)==null?void 0:x.docs)==null?void 0:B.source}}};var z,C,w;t.parameters={...t.parameters,docs:{...(z=t.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    variant: 'danger',
    children: 'Delete role'
  }
}`,...(w=(C=t.parameters)==null?void 0:C.docs)==null?void 0:w.source}}};var O,j,k;n.parameters={...n.parameters,docs:{...(O=n.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: a => <div style={{
    display: 'flex',
    gap: 12,
    alignItems: 'center',
    flexWrap: 'wrap'
  }}>
      <Button {...a} size="sm">Small</Button>
      <Button {...a} size="md">Medium</Button>
      <Button {...a} size="lg">Large</Button>
    </div>
}`,...(k=(j=n.parameters)==null?void 0:j.docs)==null?void 0:k.source}}};var D,L,T;i.parameters={...i.parameters,docs:{...(D=i.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => <Button variant="secondary" iconOnly aria-label="Add role"><span aria-hidden="true">+</span></Button>
}`,...(T=(L=i.parameters)==null?void 0:L.docs)==null?void 0:T.source}}};var A,I,M;c.parameters={...c.parameters,docs:{...(A=c.parameters)==null?void 0:A.docs,source:{originalSource:`{
  parameters: {
    pseudo: {
      hover: true
    }
  }
}`,...(M=(I=c.parameters)==null?void 0:I.docs)==null?void 0:M.source}}};var V,E,F;d.parameters={...d.parameters,docs:{...(V=d.parameters)==null?void 0:V.docs,source:{originalSource:`{
  parameters: {
    pseudo: {
      focusVisible: true
    }
  }
}`,...(F=(E=d.parameters)==null?void 0:E.docs)==null?void 0:F.source}}};var G,N,U;l.parameters={...l.parameters,docs:{...(G=l.parameters)==null?void 0:G.docs,source:{originalSource:`{
  parameters: {
    pseudo: {
      active: true
    }
  }
}`,...(U=(N=l.parameters)==null?void 0:N.docs)==null?void 0:U.source}}};var W,_,q;p.parameters={...p.parameters,docs:{...(W=p.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...(q=(_=p.parameters)==null?void 0:_.docs)==null?void 0:q.source}}};var H,P,R;m.parameters={...m.parameters,docs:{...(H=m.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    loading: true,
    children: 'Saving…'
  }
}`,...(R=(P=m.parameters)==null?void 0:P.docs)==null?void 0:R.source}}};const ee=["Primary","Secondary","Ghost","Danger","Sizes","IconOnly","Hover","FocusVisible","Active","Disabled","Loading"];export{l as Active,t as Danger,p as Disabled,d as FocusVisible,o as Ghost,c as Hover,i as IconOnly,m as Loading,a as Primary,s as Secondary,n as Sizes,ee as __namedExportsOrder,$ as default};
