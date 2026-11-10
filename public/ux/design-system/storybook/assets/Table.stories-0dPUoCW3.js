import{T}from"./Toast-Cfig555-.js";import{d as D,F as C}from"./doc-iM-grpUe.js";import"./jsx-runtime-D_zvdyIk.js";import"./index-C9y0RuIT.js";import"./_commonjsHelpers-CqkleIqs.js";const U=[{company:"Example Co",role:"Front-End Engineer",stage:"Applied",updated:"2026-11-02"},{company:"Sample Labs",role:"UI Engineer",stage:"Interview",updated:"2026-11-05"},{company:"Demo Inc",role:"React Developer",stage:"Saved",updated:"2026-10-29"}],x=[{key:"company",header:"Company",sortable:!0,rowHeader:!0},{key:"role",header:"Role"},{key:"stage",header:"Stage",sortable:!0},{key:"updated",header:"Updated",sortable:!0}],A={title:"Components/Table",component:T,tags:["autodocs"],args:{caption:"Roles (example data)",columns:x,rows:U,rowKey:R=>R.company},parameters:{docs:{description:{component:D({use:["People compare items across the same fields.","People sort or scan rows of data."],avoid:["The data is a single record. Use a list of label and value pairs.","It is for layout. Use CSS grid."],anatomy:['Scroll container (`role="region"`, labelled by the caption, focusable so keyboard users can scroll)',"`<caption>`",'Header cells with `scope="col"`',"Sort buttons inside sortable headers",'Row header cells with `scope="row"`'],variants:"Default, zebra rows, dense (for internal tools), and an empty state.",states:'Unsorted (`aria-sort="none"`), ascending, descending, row hover, focus-visible on the region and the sort buttons.',keyboard:[["Tab","Moves to the scroll region, then each sort button"],["Enter / Space","Sorts by that column; press again to reverse"],["← / →","Scrolls the region sideways when it has focus"]],a11y:[["1.3.1 Info and Relationships","Real `<table>` with caption and `scope` on headers."],["4.1.2 Name, Role, Value","`aria-sort` on the sorted header; the sort control is a `<button>`."],["1.4.10 Reflow","Wide tables scroll inside a focusable region instead of the whole page at 320px."],["2.1.1 Keyboard","The scroll region is focusable so it scrolls by keyboard."],C],code:`<Table caption="Roles" rowKey={(r) => r.id} rows={roles}
  columns={[{ key: 'company', header: 'Company', sortable: true, rowHeader: true }]} />`})}}}},e={},r={args:{initialSort:{key:"updated",dir:"descending"}}},o={args:{zebra:!0}},a={args:{dense:!0}},s={args:{rows:[],empty:"No roles yet. Add your first one."}},t={parameters:{pseudo:{focusVisible:!0}}};var n,c,d;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:"{}",...(d=(c=e.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var i,l,p;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    initialSort: {
      key: 'updated',
      dir: 'descending'
    }
  }
}`,...(p=(l=r.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};var u,m,b;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    zebra: true
  }
}`,...(b=(m=o.parameters)==null?void 0:m.docs)==null?void 0:b.source}}};var g,y,h;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    dense: true
  }
}`,...(h=(y=a.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};var f,w,S;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    rows: [],
    empty: 'No roles yet. Add your first one.'
  }
}`,...(S=(w=s.parameters)==null?void 0:w.docs)==null?void 0:S.source}}};var k,v,E;t.parameters={...t.parameters,docs:{...(k=t.parameters)==null?void 0:k.docs,source:{originalSource:`{
  parameters: {
    pseudo: {
      focusVisible: true
    }
  }
}`,...(E=(v=t.parameters)==null?void 0:v.docs)==null?void 0:E.source}}};const H=["Default","Sorted","Zebra","Dense","Empty","FocusVisible"];export{e as Default,a as Dense,s as Empty,t as FocusVisible,r as Sorted,o as Zebra,H as __namedExportsOrder,A as default};
