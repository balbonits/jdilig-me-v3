import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{d as Z,F as ee}from"./doc-t_4pxHUb.js";import{A as re}from"./AllThemes-7kMZk7Ez.js";import{B as r}from"./Button-B2zDfGes.js";import"./theme-skYQoSby.js";import"./cx-2dOUpm6k.js";const ce={title:"Components/Button",component:r,tags:["autodocs"],args:{children:"Save changes",variant:"primary",size:"md"},parameters:{docs:{description:{component:Z({use:["Someone triggers an action: submit, save, open a dialog, delete."],avoid:["It goes to another page. Use a link (`<a href>`) instead.","There are several equal choices. Use a Select or Checkbox group."],anatomy:["Container (44px min height for md, the WCAG 2.5.8 target size)","Optional leading spinner while loading","Label, or an icon with an `aria-label` when icon-only"],variants:"`primary` for the main action (one per view), `secondary` for other actions, `ghost` for low-emphasis actions in toolbars, `danger` for destructive actions. Sizes `sm`, `md`, `lg`.",states:'Default, hover, focus-visible, active (moves down 1px, off under reduced motion), disabled (native `disabled`), loading (`aria-busy="true"`, clicks are ignored).',keyboard:[["Tab","Moves focus to the button"],["Enter / Space","Activates the button"]],a11y:[["4.1.2 Name, Role, Value","Native `<button>`. Icon-only buttons require `aria-label` (enforced by the TypeScript type)."],["1.4.3 Contrast (Minimum)","Label text is 4.5:1 or more on every variant in both themes (see Tokens)."],["2.5.8 Target Size (Minimum)","`sm` is 36px, `md` 44px, `lg` 48px tall."],ee,["4.1.3 Status Messages","Loading sets `aria-busy`; pair it with a Toast or text for the result."]],code:`<Button variant="primary" onClick={save}>Save changes</Button>
<Button variant="ghost" iconOnly aria-label="Close">✕</Button>`})}}}},t={},n={args:{variant:"secondary",children:"Cancel"}},o={args:{variant:"ghost",children:"Skip"}},i={args:{variant:"danger",children:"Delete role"}},c={render:a=>e.jsxs("div",{style:{display:"flex",gap:12,alignItems:"center",flexWrap:"wrap"},children:[e.jsx(r,{...a,size:"sm",children:"Small"}),e.jsx(r,{...a,size:"md",children:"Medium"}),e.jsx(r,{...a,size:"lg",children:"Large"})]})},d={render:()=>e.jsx(r,{variant:"secondary",iconOnly:!0,"aria-label":"Add role",children:e.jsx("span",{"aria-hidden":"true",children:"+"})})},l={parameters:{pseudo:{hover:!0}}},m={parameters:{pseudo:{focusVisible:!0}}},p={parameters:{pseudo:{active:!0}}},u={args:{disabled:!0}},g={args:{loading:!0,children:"Saving…"}},s={name:"All themes",render:()=>e.jsx(re,{children:a=>e.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"},children:[e.jsx(r,{children:"Save"}),e.jsx(r,{variant:"secondary",children:"Cancel"}),e.jsx(r,{variant:"ghost",children:"Skip"}),e.jsx(r,{variant:"danger",children:"Delete"}),e.jsx(r,{size:"sm",variant:"secondary",children:"Small"}),e.jsx(r,{variant:"secondary",iconOnly:!0,"aria-label":`Add role (${a})`,children:e.jsx("span",{"aria-hidden":"true",children:"+"})})]})})};var h,v,y;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:"{}",...(y=(v=t.parameters)==null?void 0:v.docs)==null?void 0:y.source}}};var S,x,b;n.parameters={...n.parameters,docs:{...(S=n.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    children: 'Cancel'
  }
}`,...(b=(x=n.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};var f,B,j;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    variant: 'ghost',
    children: 'Skip'
  }
}`,...(j=(B=o.parameters)==null?void 0:B.docs)==null?void 0:j.source}}};var A,z,C;i.parameters={...i.parameters,docs:{...(A=i.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    variant: 'danger',
    children: 'Delete role'
  }
}`,...(C=(z=i.parameters)==null?void 0:z.docs)==null?void 0:C.source}}};var T,w,O;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:`{
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
}`,...(O=(w=c.parameters)==null?void 0:w.docs)==null?void 0:O.source}}};var k,D,I;d.parameters={...d.parameters,docs:{...(k=d.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <Button variant="secondary" iconOnly aria-label="Add role"><span aria-hidden="true">+</span></Button>
}`,...(I=(D=d.parameters)==null?void 0:D.docs)==null?void 0:I.source}}};var L,M,E;l.parameters={...l.parameters,docs:{...(L=l.parameters)==null?void 0:L.docs,source:{originalSource:`{
  parameters: {
    pseudo: {
      hover: true
    }
  }
}`,...(E=(M=l.parameters)==null?void 0:M.docs)==null?void 0:E.source}}};var V,W,F;m.parameters={...m.parameters,docs:{...(V=m.parameters)==null?void 0:V.docs,source:{originalSource:`{
  parameters: {
    pseudo: {
      focusVisible: true
    }
  }
}`,...(F=(W=m.parameters)==null?void 0:W.docs)==null?void 0:F.source}}};var G,N,R;p.parameters={...p.parameters,docs:{...(G=p.parameters)==null?void 0:G.docs,source:{originalSource:`{
  parameters: {
    pseudo: {
      active: true
    }
  }
}`,...(R=(N=p.parameters)==null?void 0:N.docs)==null?void 0:R.source}}};var U,_,q;u.parameters={...u.parameters,docs:{...(U=u.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...(q=(_=u.parameters)==null?void 0:_.docs)==null?void 0:q.source}}};var H,P,$;g.parameters={...g.parameters,docs:{...(H=g.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    loading: true,
    children: 'Saving…'
  }
}`,...($=(P=g.parameters)==null?void 0:P.docs)==null?void 0:$.source}}};var J,K,Q,X,Y;s.parameters={...s.parameters,docs:{...(J=s.parameters)==null?void 0:J.docs,source:{originalSource:`{
  name: 'All themes',
  render: () => <AllThemes>{l => <div style={{
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap',
      alignItems: 'center'
    }}>
        <Button>Save</Button><Button variant="secondary">Cancel</Button><Button variant="ghost">Skip</Button>
        <Button variant="danger">Delete</Button><Button size="sm" variant="secondary">Small</Button>
        <Button variant="secondary" iconOnly aria-label={\`Add role (\${l})\`}><span aria-hidden="true">+</span></Button>
      </div>}</AllThemes>
}`,...(Q=(K=s.parameters)==null?void 0:K.docs)==null?void 0:Q.source},description:{story:"Every variant in all 6 theme x mode combos (R-2).",...(Y=(X=s.parameters)==null?void 0:X.docs)==null?void 0:Y.description}}};const de=["Primary","Secondary","Ghost","Danger","Sizes","IconOnly","Hover","FocusVisible","Active","Disabled","Loading","AllThemesStory"];export{p as Active,s as AllThemesStory,i as Danger,u as Disabled,m as FocusVisible,o as Ghost,l as Hover,d as IconOnly,g as Loading,t as Primary,n as Secondary,c as Sizes,de as __namedExportsOrder,ce as default};
