function Inventory({inv, onToggle, onRestockAll, onScan}) {
  const out = inv.filter(i=>!i.have);
  const outStaples = out.filter(i=>i.staple);
  const locs = ['fridge','freezer','pantry'];
  const locColor = {fridge:C.cyan, freezer:C.sky, pantry:C.cobalt};
  return (
    <div style={{display:'flex', flexDirection:'column', gap:'calc(12px*var(--den))', height:'100%', minHeight:0}}>
      <div style={{border:`1px solid ${out.length?C.coral:C.green}`, background:out.length?'rgba(255,96,80,.06)':'rgba(57,255,106,.05)', padding:'calc(10px*var(--den)) 12px', display:'flex', alignItems:'center', gap:12, flexWrap:'wrap'}}>
        <Lab c={out.length?C.coral:C.green}>{out.length ? `\u26A0 ${out.length} OUT OF STOCK${outStaples.length?` \u00B7 ${outStaples.length} STAPLE${outStaples.length>1?'S':''}`:''}` : '\u25CF ALL STOCKED — KITCHEN NOMINAL'}</Lab>
        <div style={{display:'flex', gap:4, flexWrap:'wrap', flex:1}}>
          {out.slice(0,6).map(i=><Tag key={i.id} c={i.staple?C.coral:C.dim} style={i.staple?{}:{borderColor:C.line}}>{i.name}</Tag>)}
          {out.length>6 ? <Tag c={C.dim} style={{borderColor:'transparent'}}>+{out.length-6}</Tag> : null}
        </div>
        {out.length ? <Btn c={C.cobalt} onClick={onRestockAll}>+ ALL TO SHOPPING</Btn> : null}
        <Btn c={C.pink} solid onClick={onScan}>&#9639; SCAN RECEIPT</Btn>
      </div>
      <div style={{flex:1, minHeight:0, display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'calc(12px*var(--den))'}}>
        {locs.map(loc => {
          const items = inv.filter(i=>i.loc===loc);
          const have = items.filter(i=>i.have).length;
          return (
            <Panel key={loc} title={`// ${window.PANTRY.aisle[loc]} — ${have}/${items.length}`} c={locColor[loc]} tex={loc==='pantry'?'tx-patch':loc==='fridge'?'tx-dense':'tx-react'}>
              <div style={{display:'flex', flexDirection:'column', gap:2}}>
                {items.map(it => (
                  <div key={it.id} onClick={()=>onToggle(it.id)} className="row" style={{display:'flex', alignItems:'center', gap:9, padding:'calc(6px*var(--den)) 8px', cursor:'pointer', borderBottom:'1px solid rgba(255,255,255,.05)'}}>
                    <Dot on={it.have}/>
                    <span style={{fontSize:12, flex:1, color:it.have?'#fff':C.dim, textDecoration:it.have?'none':'line-through'}}>{it.name}</span>
                    {it.staple ? <Tag c={C.dim} style={{borderColor:'transparent', color:'rgba(255,255,255,.3)'}}>STAPLE</Tag> : null}
                    <span style={{fontSize:8, letterSpacing:'.14em', color:it.have?C.green:C.coral}}>{it.have?'HAVE':'OUT'}</span>
                  </div>))}
              </div>
            </Panel>);
        })}
      </div>
    </div>);
}

function Shopping({list, inv, onCheck, onClearDone, onAdd, onRestock}) {
  const [txt, setTxt] = React.useState('');
  const done = list.filter(i=>i.done).length;
  const add = () => { if (txt.trim()) { onAdd(txt.trim()); setTxt(''); } };
  const groups = {};
  list.forEach(i => { const g = i.loc ? window.PANTRY.aisle[i.loc] : 'OTHER'; (groups[g] = groups[g]||[]).push(i); });
  return (
    <div style={{display:'grid', gridTemplateColumns:'1fr 300px', gap:'calc(12px*var(--den))', height:'100%', minHeight:0}}>
      <Panel title={`// SHOPPING LIST — ${done}/${list.length} IN CART`} c={C.cobalt}
        right={done ? <Btn c={C.green} onClick={onClearDone} style={{padding:'3px 8px', fontSize:8}}>RESTOCK {done} \u2192 INVENTORY</Btn> : null}>
        {list.length===0 ? <div style={{border:`1px dashed ${C.line}`, padding:30, textAlign:'center'}}><Lab>// LIST EMPTY — NICE</Lab></div> :
          Object.entries(groups).map(([g, items]) => (
            <div key={g} style={{marginBottom:'calc(14px*var(--den))'}}>
              <Lab style={{marginBottom:6, color:'rgba(255,255,255,.3)'}}>&#9642; {g}</Lab>
              {items.map(it => (
                <div key={it.key} onClick={()=>onCheck(it.key)} className="row" style={{display:'flex', alignItems:'center', gap:10, padding:'calc(7px*var(--den)) 8px', cursor:'pointer', borderBottom:'1px solid rgba(255,255,255,.05)'}}>
                  <span style={{width:12, height:12, border:`1px solid ${it.done?C.green:C.line}`, background:it.done?C.green:'transparent', color:'#000', fontSize:9, lineHeight:'12px', textAlign:'center', flexShrink:0}}>{it.done?'\u2713':''}</span>
                  <span style={{fontSize:12, flex:1, color:it.done?C.dim:'#fff', textDecoration:it.done?'line-through':'none'}}>{it.name}</span>
                  {it.from ? <Tag c={C.pink} style={{borderColor:'transparent'}}>&#8592; {it.from}</Tag> : null}
                </div>))}
            </div>))}
      </Panel>
      <div style={{display:'flex', flexDirection:'column', gap:'calc(12px*var(--den))'}}>
        <Panel title="// ADD ITEM" c={C.cyan}>
          <div style={{display:'flex', gap:6}}>
            <input value={txt} onChange={e=>setTxt(e.target.value)} onKeyDown={e=>e.key==='Enter'&&add()} placeholder="&gt; item_" style={{...inputStyle, flex:1, minWidth:0}}/>
            <Btn c={C.cyan} solid onClick={add}>+</Btn>
          </div>
        </Panel>
        <Panel title="// OUT OF STOCK" c={C.coral} tex="tx-react" style={{flex:1, minHeight:0}}>
          {inv.filter(i=>!i.have).map(i => (
            <div key={i.id} style={{display:'flex', alignItems:'center', gap:8, padding:'5px 0', borderBottom:'1px solid rgba(255,255,255,.05)'}}>
              <Dot on={false}/><span style={{fontSize:11, flex:1, color:C.dim}}>{i.name}</span>
              {list.some(l=>l.invId===i.id) ? <Tag c={C.dim} style={{borderColor:'transparent'}}>LISTED</Tag> : <Btn c={C.cobalt} onClick={()=>onRestock(i.id)} style={{padding:'2px 7px', fontSize:8}}>+ LIST</Btn>}
            </div>))}
        </Panel>
      </div>
    </div>);
}

const DAYS = ['MON','TUE','WED','THU','FRI','SAT','SUN'];
function Planner({recipes, inv, plan, prefs, onSetPrefs, onAssign, onClear, onAutoBuild, onOpen}) {
  const [picking, setPicking] = React.useState(null); // day index
  const pool = recipes.filter(r =>
    (!prefs.veg || r.tags.includes('veg')) &&
    (!prefs.quick || r.mins <= 30) &&
    (!prefs.stock || canMake(r, inv)));
  return (
    <div style={{display:'flex', flexDirection:'column', gap:'calc(12px*var(--den))', height:'100%', minHeight:0}}>
      <div style={{display:'flex', gap:8, alignItems:'center', flexWrap:'wrap', border:`1px solid ${C.line}`, background:C.panel, padding:'calc(9px*var(--den)) 12px'}}>
        <Lab c={C.pink}>// DIET FILTER</Lab>
        <Toggle on={prefs.veg} onClick={()=>onSetPrefs({...prefs, veg:!prefs.veg})}>vegetarian</Toggle>
        <Toggle on={prefs.quick} onClick={()=>onSetPrefs({...prefs, quick:!prefs.quick})}>&le;30 min</Toggle>
        <Toggle on={prefs.stock} onClick={()=>onSetPrefs({...prefs, stock:!prefs.stock})}>use what i have</Toggle>
        <span style={{flex:1}}></span>
        <Lab>{pool.length} RECIPES MATCH</Lab>
        <Btn c={C.pink} solid onClick={()=>onAutoBuild(pool)}>&#9889; AUTO-BUILD WEEK</Btn>
      </div>
      <div style={{flex:1, minHeight:0, display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:'calc(8px*var(--den))'}}>
        {DAYS.map((d,di) => {
          const rid = plan[di];
          const r = rid && recipes.find(x=>x.id===rid);
          const today = di === 2; // WED, per sample date
          return (
            <div key={d} style={{border:`1px solid ${today?C.cobalt:C.line}`, background:C.panel, display:'flex', flexDirection:'column', minHeight:0, position:'relative', overflow:'hidden'}}>
              {di%2===0 ? <div className="tex tx-dense"></div> : null}
              <div style={{padding:'7px 8px', borderBottom:`1px solid ${C.line}`, display:'flex', justifyContent:'space-between', position:'relative', zIndex:1}}>
                <Lab c={today?C.cobalt:C.dim}>{d}</Lab>{today?<Tag c={C.cobalt} solid>NOW</Tag>:null}
              </div>
              <div style={{flex:1, padding:'calc(8px*var(--den))', position:'relative', zIndex:1, display:'flex', flexDirection:'column', gap:6}}>
                {r ? (<React.Fragment>
                  <div onClick={()=>onOpen(r.id)} style={{fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:14, lineHeight:.95, textTransform:'uppercase', cursor:'pointer', color:canMake(r,inv)?'#fff':C.coral}}>{r.name}</div>
                  <div style={{display:'flex', gap:4, flexWrap:'wrap'}}><Tag c={C.dim} style={{borderColor:C.line}}>{r.mins}M</Tag>{canMake(r,inv)?<Tag c={C.green}>&#9679;</Tag>:<Tag c={C.coral}>{missingOf(r,inv).length} MISS</Tag>}</div>
                  <button onClick={()=>onClear(di)} className="db" style={{marginTop:'auto', fontFamily:'inherit', background:'none', border:'none', color:'rgba(255,255,255,.25)', fontSize:8, letterSpacing:'.14em', cursor:'pointer', textAlign:'left', padding:0}}>&#10005; CLEAR</button>
                </React.Fragment>) : (
                  <button onClick={()=>setPicking(picking===di?null:di)} className="db" style={{flex:1, fontFamily:'inherit', background:'none', border:`1px dashed ${picking===di?C.cyan:C.line}`, color:picking===di?C.cyan:C.dim, fontSize:10, letterSpacing:'.14em', cursor:'pointer'}}>+ DINNER</button>)}
              </div>
            </div>);
        })}
      </div>
      {picking!==null ? (
        <Panel title={`// PICK FOR ${DAYS[picking]} — FILTERED BY DIET`} c={C.cyan} style={{maxHeight:180}}>
          <div style={{display:'flex', flexWrap:'wrap', gap:6}}>
            {pool.map(r => <Toggle key={r.id} on={false} onClick={()=>{onAssign(picking, r.id); setPicking(null);}}>{r.name} \u00B7 {r.mins}m</Toggle>)}
            {pool.length===0 ? <Lab>// NOTHING MATCHES THE DIET FILTER</Lab> : null}
          </div>
        </Panel>) : null}
    </div>);
}

function Scanner({onClose, onCommit}) {
  const [phase, setPhase] = React.useState('idle'); // idle -> scanning -> done
  const [prog, setProg] = React.useState(0);
  const rc = window.PANTRY.receipt;
  React.useEffect(() => {
    if (phase!=='scanning') return;
    const t = setInterval(() => setProg(p => { if (p>=100){clearInterval(t); setPhase('done'); return 100;} return p+4; }), 50);
    return () => clearInterval(t);
  }, [phase]);
  return (
    <div style={{position:'fixed', inset:0, zIndex:50, background:'rgba(0,0,0,.75)', display:'flex', alignItems:'center', justifyContent:'center'}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{width:440, maxWidth:'90vw', background:C.ink, border:`1px solid ${C.pink}`, position:'relative', overflow:'hidden'}}>
        <div className="tex tx-cosmo" style={{opacity:'calc(.25*var(--texop))'}}></div>
        <div style={{position:'relative', zIndex:1, padding:'calc(16px*var(--den))', display:'flex', flexDirection:'column', gap:12}}>
          <div style={{display:'flex', justifyContent:'space-between'}}><Lab c={C.pink}>// RECEIPT SCANNER v0.2</Lab>
            <button onClick={onClose} className="db" style={{fontFamily:'inherit', background:'none', border:'none', color:C.dim, cursor:'pointer', fontSize:11, padding:0}}>&#10005;</button></div>
          {phase==='idle' ? (
            <div onClick={()=>setPhase('scanning')} style={{border:`2px dashed ${C.pink}`, padding:'36px 20px', textAlign:'center', cursor:'pointer'}}>
              <div style={{fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:22, textTransform:'uppercase'}}>DROP RECEIPT</div>
              <Lab style={{marginTop:6}}>or click to simulate camera capture</Lab>
            </div>) : null}
          {phase==='scanning' ? (
            <div style={{display:'flex', flexDirection:'column', gap:8}}>
              <div style={{fontSize:11, color:C.cyan}}>&gt; OCR PASS {prog < 50 ? 1 : 2}/2 \u2014 {rc.store}...</div>
              <div style={{height:8, border:`1px solid ${C.line}`}}><div style={{height:'100%', width:prog+'%', background:`repeating-linear-gradient(45deg,${C.pink},${C.pink} 6px,${C.cobalt} 6px,${C.cobalt} 12px)`}}></div></div>
              <Lab>{prog}% \u2014 EXTRACTING LINE ITEMS</Lab>
            </div>) : null}
          {phase==='done' ? (
            <div style={{display:'flex', flexDirection:'column', gap:10}}>
              <div style={{border:`1px solid ${C.line}`, padding:10, background:'#050505'}}>
                <div style={{display:'flex', justifyContent:'space-between', marginBottom:8}}><Lab c={C.cobalt}>{rc.store}</Lab><Lab>{rc.date}</Lab></div>
                {rc.items.map((it,i) => (
                  <div key={i} style={{display:'flex', gap:8, alignItems:'center', padding:'4px 0', borderBottom:'1px solid rgba(255,255,255,.05)'}}>
                    <span style={{fontSize:11, flex:1, color:'#fff'}}>{it.name}</span>
                    {it.map ? <Tag c={C.green}>&#8594; {invName(window.PANTRY.inv, it.map)}</Tag> : <Tag c={C.dim} style={{borderColor:C.line}}>NEW / SKIP</Tag>}
                  </div>))}
              </div>
              <Btn c={C.green} solid onClick={onCommit}>&#10003; RESTOCK {rc.items.filter(i=>i.map).length} MATCHED ITEMS</Btn>
            </div>) : null}
        </div>
      </div>
    </div>);
}
Object.assign(window, {Inventory, Shopping, Planner, Scanner, DAYS});
