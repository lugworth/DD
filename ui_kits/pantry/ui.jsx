const C = {blue:'#2d6cff', sky:'#0a84e0', cobalt:'#2d6cff', cyan:'#00d9ff', pink:'#ff2d87', green:'#39ff6a', coral:'#ff6050', ink:'#0a0a0a', panel:'#101010', line:'rgba(255,255,255,.12)', dim:'rgba(255,255,255,.45)'};
const Lab = ({c=C.dim, style, children}) => <div style={{fontSize:9, fontWeight:700, letterSpacing:'.2em', textTransform:'uppercase', color:c, ...style}}>{children}</div>;
const Tag = ({c=C.cyan, solid, children, style}) => <span style={{fontSize:8, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', padding:'2px 6px', border:`1px solid ${c}`, color:solid?'#000':c, background:solid?c:'transparent', ...style}}>{children}</span>;
const Btn = ({c=C.cobalt, solid, onClick, disabled, children, style}) => (
  <button onClick={onClick} disabled={disabled} className="db" style={{fontFamily:'inherit', fontSize:10, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', padding:'calc(8px*var(--den)) 14px', cursor:disabled?'not-allowed':'pointer', border:`1px solid ${c}`, color:solid?'#000':c, background:solid?c:'transparent', opacity:disabled?.35:1, ...style}}>{children}</button>
);
const Dot = ({on}) => <span style={{width:7, height:7, borderRadius:99, flexShrink:0, background:on?C.green:C.coral, boxShadow:on?`0 0 6px ${C.green}`:'none', display:'inline-block'}}></span>;
const Panel = ({title, c=C.cyan, right, children, style, tex}) => (
  <div style={{border:`1px solid ${C.line}`, background:C.panel, position:'relative', overflow:'hidden', display:'flex', flexDirection:'column', ...style}}>
    {tex ? <div className={`tex ${tex}`}></div> : null}
    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'calc(8px*var(--den)) 10px', borderBottom:`1px solid ${C.line}`, position:'relative', zIndex:1}}>
      <Lab c={c}>{title}</Lab>{right}
    </div>
    <div style={{padding:'calc(10px*var(--den))', position:'relative', zIndex:1, flex:1, minHeight:0, overflowY:'auto'}}>{children}</div>
  </div>
);
const Field = ({label, children}) => <label style={{display:'flex', flexDirection:'column', gap:5}}><Lab>{label}</Lab>{children}</label>;
const inputStyle = {fontFamily:'inherit', fontSize:12, color:'#fff', background:'#000', border:`1px solid ${C.line}`, padding:'calc(8px*var(--den)) 10px', outline:'none'};
const Toggle = ({on, onClick, children}) => (
  <button onClick={onClick} className="db" style={{fontFamily:'inherit', fontSize:9, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', padding:'5px 9px', cursor:'pointer', display:'inline-flex', alignItems:'center', gap:6, border:`1px solid ${on?C.cobalt:C.line}`, color:on?C.cobalt:C.dim, background:on?'rgba(45,108,255,.08)':'transparent'}}>
    <span style={{width:6, height:6, background:on?C.cobalt:'rgba(255,255,255,.2)'}}></span>{children}
  </button>
);
// recipe/inventory helpers
const missingOf = (r, inv) => r.ing.filter(id => !inv.find(i=>i.id===id).have);
const canMake = (r, inv) => missingOf(r, inv).length === 0;
const invName = (inv, id) => (inv.find(i=>i.id===id)||{}).name || id;
Object.assign(window, {C, Lab, Tag, Btn, Dot, Panel, Field, inputStyle, Toggle, missingOf, canMake, invName});
