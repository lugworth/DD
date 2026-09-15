function Library({recipes, inv, onOpen, onPlanNight}) {
  const [q, setQ] = React.useState('');
  const [tag, setTag] = React.useState(null);
  const [onlyMake, setOnlyMake] = React.useState(false);
  const tags = ['veg','quick','batch'];
  const list = recipes.filter(r =>
    (!q || r.name.toLowerCase().includes(q.toLowerCase())) &&
    (!tag || r.tags.includes(tag)) &&
    (!onlyMake || canMake(r, inv)));
  return (
    <div style={{display:'flex', flexDirection:'column', gap:'calc(12px*var(--den))', height:'100%'}}>
      <div style={{display:'flex', gap:8, alignItems:'center', flexWrap:'wrap'}}>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="&gt; search recipes_" style={{...inputStyle, flex:'1 1 220px', borderColor:q?C.cyan:C.line, color:C.cyan}}/>
        {tags.map(t => <Toggle key={t} on={tag===t} onClick={()=>setTag(tag===t?null:t)}>{t}</Toggle>)}
        <Toggle on={onlyMake} onClick={()=>setOnlyMake(!onlyMake)}>can make now</Toggle>
      </div>
      <div style={{flex:1, overflowY:'auto', display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(230px,1fr))', gap:'calc(10px*var(--den))', alignContent:'start'}}>
        {list.map((r,i) => {
          const miss = missingOf(r, inv);
          const accents = [C.cyan, C.pink, C.cobalt, C.green];
          const a = accents[i % 4];
          return (
            <div key={r.id} onClick={()=>onOpen(r.id)} className="card" style={{border:`1px solid ${C.line}`, background:C.panel, cursor:'pointer', position:'relative', overflow:'hidden', padding:'calc(12px*var(--den))', display:'flex', flexDirection:'column', gap:8, minHeight:120}}>
              <div className={`tex ${i%3===0?'tx-dense':i%3===1?'tx-patch':'tx-react'}`}></div>
              <div style={{position:'relative', zIndex:1, display:'flex', justifyContent:'space-between', gap:6}}>
                <Lab c={a}>REC/{String(i+1).padStart(2,'0')}</Lab>
                {miss.length===0 ? <Tag c={C.green}>&#9679; CAN MAKE</Tag> : <Tag c={C.coral}>{miss.length} MISSING</Tag>}
              </div>
              <div style={{position:'relative', zIndex:1, fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:19, lineHeight:.95, textTransform:'uppercase', letterSpacing:'-.01em'}}>{r.name}</div>
              <div style={{position:'relative', zIndex:1, marginTop:'auto', display:'flex', gap:6, alignItems:'center', flexWrap:'wrap'}}>
                <Tag c={C.dim} style={{borderColor:C.line}}>{r.mins} MIN</Tag>
                <Tag c={C.dim} style={{borderColor:C.line}}>SERVES {r.serves}</Tag>
                {r.tags.map(t => <Tag key={t} c={a}>{t}</Tag>)}
              </div>
            </div>);
        })}
        {list.length===0 ? <div style={{gridColumn:'1/-1', border:`1px dashed ${C.line}`, padding:30, textAlign:'center'}}><Lab>// NO MATCH — LOOSEN THE FILTERS</Lab></div> : null}
      </div>
    </div>);
}

function RecipeDetail({r, inv, idx, onBack, onCook, onAddMissing, onToggleItem}) {
  const miss = missingOf(r, inv);
  return (
    <div style={{display:'grid', gridTemplateColumns:'340px 1fr', gap:'calc(12px*var(--den))', height:'100%', minHeight:0}}>
      <div style={{display:'flex', flexDirection:'column', gap:'calc(12px*var(--den))', minHeight:0}}>
        <div style={{border:`1px solid ${C.line}`, background:C.panel, padding:'calc(14px*var(--den))', position:'relative', overflow:'hidden'}}>
          <div className="tex tx-cosmo" style={{opacity:'calc(.35*var(--texop))'}}></div>
          <div style={{position:'relative', zIndex:1}}>
            <button onClick={onBack} className="db" style={{fontFamily:'inherit', background:'none', border:'none', color:C.cyan, fontSize:9, letterSpacing:'.18em', cursor:'pointer', padding:0, marginBottom:10}}>&#9664; BACK TO LIBRARY</button>
            <div style={{fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:32, lineHeight:.92, textTransform:'uppercase', letterSpacing:'-.01em'}}>{r.name}</div>
            <div style={{display:'flex', gap:6, marginTop:10, flexWrap:'wrap'}}>
              <Tag c={C.cobalt} solid>{r.mins} MIN</Tag><Tag c={C.cyan}>SERVES {r.serves}</Tag>
              {r.tags.map(t=><Tag key={t} c={C.pink}>{t}</Tag>)}
            </div>
          </div>
        </div>
        <Panel title={`// INGREDIENTS — ${r.ing.length}`} c={miss.length? C.coral : C.green} style={{flex:1, minHeight:0}}>
          <div style={{display:'flex', flexDirection:'column', gap:2}}>
            {r.ing.map(id => {
              const it = inv.find(i=>i.id===id);
              return (
                <div key={id} onClick={()=>onToggleItem(id)} className="row" style={{display:'flex', alignItems:'center', gap:9, padding:'calc(7px*var(--den)) 8px', cursor:'pointer', borderBottom:`1px solid rgba(255,255,255,.05)`}}>
                  <Dot on={it.have}/>
                  <span style={{fontSize:12, flex:1, color:it.have?'#fff':C.dim, textDecoration:it.have?'none':'line-through'}}>{it.name}</span>
                  <Tag c={C.dim} style={{borderColor:'transparent'}}>{window.PANTRY.aisle[it.loc]}</Tag>
                </div>);
            })}
          </div>
        </Panel>
        <div style={{display:'flex', gap:8}}>
          <Btn c={C.green} solid disabled={miss.length>0} onClick={onCook} style={{flex:1}}>&#9654; COOK IT — DEDUCT STOCK</Btn>
          {miss.length>0 ? <Btn c={C.cobalt} onClick={onAddMissing} style={{flex:1}}>+ {miss.length} TO SHOPPING LIST</Btn> : null}
        </div>
      </div>
      <Panel title="// METHOD" c={C.cyan} tex="tx-dense">
        <div style={{display:'flex', flexDirection:'column', gap:'calc(14px*var(--den))', maxWidth:640}}>
          {r.steps.map((s,i) => (
            <div key={i} style={{display:'flex', gap:14, alignItems:'baseline'}}>
              <span style={{fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:30, color:[C.cyan,C.pink,C.cobalt,C.green][i%4], lineHeight:1, flexShrink:0}}>{String(i+1).padStart(2,'0')}</span>
              <p style={{fontSize:13, lineHeight:1.6, margin:0}}>{s}</p>
            </div>))}
          <div style={{borderTop:`1px solid ${C.line}`, paddingTop:10}}><Lab>// EOF — SERVE HOT</Lab></div>
        </div>
      </Panel>
    </div>);
}

function RecipeForm({inv, onSave, onCancel}) {
  const [name, setName] = React.useState('');
  const [mins, setMins] = React.useState(30);
  const [serves, setServes] = React.useState(2);
  const [tags, setTags] = React.useState([]);
  const [ing, setIng] = React.useState([]);
  const [steps, setSteps] = React.useState(['']);
  const [err, setErr] = React.useState(null);
  const toggleTag = t => setTags(tags.includes(t) ? tags.filter(x=>x!==t) : [...tags, t]);
  const toggleIng = id => setIng(ing.includes(id) ? ing.filter(x=>x!==id) : [...ing, id]);
  const save = () => {
    if (!name.trim()) return setErr('NAME REQUIRED');
    if (ing.length===0) return setErr('PICK AT LEAST ONE INGREDIENT');
    onSave({id:'u'+Date.now(), name:name.trim(), tags, mins:+mins||30, serves:+serves||2, ing, steps:steps.filter(s=>s.trim())});
  };
  return (
    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'calc(12px*var(--den))', height:'100%', minHeight:0}}>
      <Panel title="// NEW RECIPE — META" c={C.pink} tex="tx-patch">
        <div style={{display:'flex', flexDirection:'column', gap:'calc(14px*var(--den))'}}>
          <Field label="RECIPE NAME"><input value={name} onChange={e=>{setName(e.target.value); setErr(null);}} placeholder="&gt; e.g. midnight ramen_" style={{...inputStyle, fontSize:15, color:C.cobalt, borderColor:name?C.cobalt:C.line}}/></Field>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
            <Field label="MINUTES"><input type="number" value={mins} onChange={e=>setMins(e.target.value)} style={inputStyle}/></Field>
            <Field label="SERVES"><input type="number" value={serves} onChange={e=>setServes(e.target.value)} style={inputStyle}/></Field>
          </div>
          <Field label="TAGS"><div style={{display:'flex', gap:6}}>{['veg','quick','batch'].map(t=><Toggle key={t} on={tags.includes(t)} onClick={()=>toggleTag(t)}>{t}</Toggle>)}</div></Field>
          <Field label="STEPS">
            <div style={{display:'flex', flexDirection:'column', gap:6}}>
              {steps.map((s,i) => (
                <div key={i} style={{display:'flex', gap:6}}>
                  <span style={{fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:16, color:C.cyan, width:24, flexShrink:0, paddingTop:8}}>{String(i+1).padStart(2,'0')}</span>
                  <input value={s} onChange={e=>setSteps(steps.map((x,j)=>j===i?e.target.value:x))} placeholder="&gt; step_" style={{...inputStyle, flex:1}}/>
                </div>))}
              <Btn c={C.cyan} onClick={()=>setSteps([...steps,''])} style={{alignSelf:'flex-start'}}>+ STEP</Btn>
            </div>
          </Field>
        </div>
      </Panel>
      <div style={{display:'flex', flexDirection:'column', gap:'calc(12px*var(--den))', minHeight:0}}>
        <Panel title={`// INGREDIENTS — ${ing.length} PICKED`} c={C.green} style={{flex:1, minHeight:0}}>
          <div style={{display:'flex', flexWrap:'wrap', gap:6}}>
            {inv.map(it => <Toggle key={it.id} on={ing.includes(it.id)} onClick={()=>toggleIng(it.id)}>{it.name}</Toggle>)}
          </div>
        </Panel>
        {err ? <div style={{border:`1px solid ${C.coral}`, color:C.coral, fontSize:10, fontWeight:700, letterSpacing:'.14em', padding:'8px 10px'}}>&#9888; {err}</div> : null}
        <div style={{display:'flex', gap:8}}>
          <Btn c={C.cobalt} solid onClick={save} style={{flex:1}}>SAVE TO LIBRARY</Btn>
          <Btn c={C.dim} onClick={onCancel} style={{borderColor:C.line}}>DISCARD</Btn>
        </div>
      </div>
    </div>);
}
Object.assign(window, {Library, RecipeDetail, RecipeForm});
