window.PANTRY = (() => {
const inv = [
 ['beef','Ground beef','fridge',0],['spag','Spaghetti','pantry',0],['toms','Canned tomatoes','pantry',0],
 ['onion','Onions','pantry',1],['garlic','Garlic','pantry',1],['butter','Butter','fridge',1],
 ['soy','Soy sauce','pantry',1],['mixveg','Stir-fry veg mix','freezer',0],['rice','Jasmine rice','pantry',1],
 ['chix','Chicken thighs','freezer',0],['lemon','Lemons','fridge',0],['pots','Potatoes','pantry',0],
 ['arbo','Arborio rice','pantry',0],['mush','Mushrooms','fridge',0],['parm','Parmesan','fridge',0],
 ['chick','Chickpeas (can)','pantry',0],['coco','Coconut milk','pantry',0],['curry','Curry paste','fridge',0],
 ['buns','Burger buns','pantry',0],['ched','Cheddar','fridge',0],['salmon','Salmon fillets','freezer',0],
 ['miso','Miso paste','fridge',0],['tort','Tortillas','pantry',0],['taco','Taco seasoning','pantry',0],
 ['bread','Sourdough loaf','pantry',0],['gnoc','Gnocchi','pantry',0],['pesto','Pesto jar','pantry',0],
 ['eggs','Eggs','fridge',0],['oil','Olive oil','pantry',1],['spin','Baby spinach','fridge',0],
].map(([id,name,loc,staple]) => ({id,name,loc,staple:!!staple,have:true}));
// start a few out-of-stock for realism
for (const id of ['beef','lemon','salmon','coco','buns','eggs']) inv.find(i=>i.id===id).have=false;
const R = (id,name,tags,mins,serves,ing,steps) => ({id,name,tags,mins,serves,ing,steps});
const recipes = [
 R('bolo','Weeknight Bolognese',['batch'],45,4,['beef','spag','toms','onion','garlic','parm','oil'],
  ['Sweat onion + garlic in olive oil.','Brown the beef hard, don\u2019t crowd it.','Tip in tomatoes, simmer 30 min.','Toss with spaghetti, bury in parm.']),
 R('stir','Garlic Butter Stir-Fry',['veg','quick'],20,2,['mixveg','garlic','butter','soy','rice'],
  ['Get rice going first.','Screaming-hot pan, veg in, keep it moving.','Butter + garlic + soy off the heat.','Serve over rice.']),
 R('sheet','Sheet-Pan Lemon Chicken',[],50,4,['chix','lemon','pots','garlic','oil'],
  ['220\u00b0C. Toss everything on one pan.','Lemon halves cut-side down.','Roast 40 min, skin side up.','Squeeze the roasted lemons over.']),
 R('riso','Mushroom Risotto',['veg'],40,3,['arbo','mush','onion','butter','parm','garlic'],
  ['Brown mushrooms first, set aside.','Toast rice in butter with onion.','Ladle stock, stir, repeat ~20 min.','Fold in mushrooms + parm.']),
 R('curryx','Chickpea Coconut Curry',['veg','batch','quick'],25,4,['chick','coco','curry','onion','garlic','rice','spin'],
  ['Fry curry paste with onion + garlic.','Chickpeas + coconut milk, simmer 15.','Wilt in spinach at the end.','Rice on the side.']),
 R('smash','Smash Burgers',['quick'],20,2,['beef','buns','ched','onion','butter'],
  ['Loose beef balls, hot griddle.','SMASH. 90 seconds. Flip.','Cheese on, buns buttered + toasted.','Stack with shaved onion.']),
 R('misos','Miso Salmon + Rice',['quick'],25,2,['salmon','miso','soy','rice','butter'],
  ['Whisk miso + soy + knob of butter.','Brush salmon, grill 8 min.','Glaze again halfway.','Serve on rice, spoon over pan juice.']),
 R('rvp','Roast Veg Pesto Pasta',['veg','batch'],35,4,['spag','pesto','mush','onion','parm','oil'],
  ['Roast veg at 200\u00b0C till edges char.','Cook pasta, save a mug of water.','Pesto + pasta water = sauce.','Toss everything, parm on top.']),
 R('tacos','Beef Tacos',['quick'],25,3,['beef','tort','taco','ched','onion'],
  ['Brown beef, dust with seasoning.','Splash of water, simmer 5.','Char tortillas on the flame.','Build. No plate survives.']),
 R('soup','Tomato Soup + Grilled Cheese',['veg','quick'],20,2,['toms','onion','garlic','butter','bread','ched'],
  ['Blitz tomatoes, onion, garlic. Simmer.','Butter the OUTSIDE of the bread.','Low and slow till molten.','Dunk. Mandatory.']),
 R('fried','Leftover Fried Rice',['veg','quick'],15,2,['rice','eggs','mixveg','soy','garlic','oil'],
  ['Day-old rice only.','Egg first, scramble hard, out.','Rice + veg, high heat, soy at the edge.','Egg back in. Done in 15.']),
 R('gnop','Pesto Gnocchi',['veg','quick'],15,2,['gnoc','pesto','parm','butter','spin'],
  ['Pan-fry gnocchi in butter till crisp.','No boiling. Trust.','Pesto + spinach off heat.','Parm avalanche.']),
];
const receipt = {store:'MEGAMART #0442', date:'07/22/2026', items:[
 {name:'GRND BEEF 80/20', map:'beef'},{name:'LEMONS NET 4CT', map:'lemon'},
 {name:'SALMON ATL FZN', map:'salmon'},{name:'CCNUT MILK 400ML', map:'coco'},
 {name:'EGGS LG 12CT', map:'eggs'},{name:'BRIOCHE BUNS 6', map:'buns'},
 {name:'KOMBUCHA GNGR', map:null},{name:'DARK CHOC 85%', map:null},
]};
const aisle = {fridge:'CHILLED', freezer:'FROZEN', pantry:'DRY GOODS'};
return {inv, recipes, receipt, aisle};
})();
