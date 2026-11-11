import{j as e}from"./jsx-runtime-D_zvdyIk.js";/* empty css                     */import{A as n}from"./AllThemes-7kMZk7Ez.js";import{T as i}from"./theme-skYQoSby.js";import{B as o}from"./Button-B2zDfGes.js";import{I as l}from"./Input-xx571Hta.js";import"./cx-2dOUpm6k.js";import"./Field-CcNIjgJN.js";import"./index-C9y0RuIT.js";import"./_commonjsHelpers-CqkleIqs.js";const v={title:"Tokens/Theme registry",parameters:{docs:{description:{component:"One component, two themes. The second theme is a test fixture (stories only, not shipped) until the next CA-signed theme registers."}}}},p={id:"test-fixture",label:"Test fixture, not a design"},t={name:"Same component, two themes",render:()=>e.jsx(n,{themes:[i[0],p],children:m=>e.jsxs("div",{style:{display:"grid",gap:12},children:[e.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap"},children:[e.jsx(o,{children:"Save"}),e.jsx(o,{variant:"secondary",children:"Cancel"})]}),e.jsx(l,{label:`Email (${m})`,hint:"Shape and color both come from the theme."})]})})};var r,s,a;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`{
  name: 'Same component, two themes',
  render: () => <AllThemes themes={[THEME_REGISTRY[0], fixture]}>
      {label => <div style={{
      display: 'grid',
      gap: 12
    }}>
          <div style={{
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap'
      }}>
            <Button>Save</Button>
            <Button variant="secondary">Cancel</Button>
          </div>
          <Input label={\`Email (\${label})\`} hint="Shape and color both come from the theme." />
        </div>}
    </AllThemes>
}`,...(a=(s=t.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};const E=["SameComponentTwoThemes"];export{t as SameComponentTwoThemes,E as __namedExportsOrder,v as default};
