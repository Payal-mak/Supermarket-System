import XLSX from 'xlsx';
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const docsDir = resolve(__dirname, '..', 'docs');
const outputPath = resolve(__dirname, '..', 'frontend', 'src', 'data', 'productData.js');

// ─── Category classification ────────────────────────────────────────────
const CATEGORIES = {
  "Grocery & Staples": [
    "dal", "atta", "besan", "rice", "salt", "oil", "ghee", "masala", "hing",
    "spice", "poha", "chilli powder", "turmeric", "jeera", "haldi", "ajwain",
    "dhana", "methi", "garam masala", "aambali", "fada", "lot", "aakha",
    "adad", "chana", "rajma", "moong", "urad", "toor", "tuver", "math",
    "mag", "rava", "suji", "maida", "jaggery", "sugar", "gur", "gud",
    "papad", "pickle", "achar", "mukhwas", "supari", "saunf", "elaichi",
    "lavang", "dalchini", "jaifal", "javitri", "kesar", "kokam", "amchur",
    "tamarind", "vinegar", "sauce", "ketchup", "jam", "honey", "badam",
    "kaju", "pista", "dry fruit", "cashew", "almond", "raisin", "fig",
    "dates", "khajur", "copra", "nariyal", "coconut", "groundnut",
    "peanut", "singdana", "til", "sesame", "mustard", "sarson", "rai",
    "soyabean", "soya", "corn", "makai", "wheat", "flour", "chakki",
    "fortune", "patanjali", "everest", "mdh", "catch", "ashirvaad",
    "aashirvaad", "rajgaro", "nachni", "ragi", "jowar", "bajra", "millet",
    "idli", "dosa", "upma", "vermicelli", "sevai", "noodle", "pasta",
    "maggi", "yippee", "top ramen", "instant", "agarbatti", "dhoop",
    "camphor", "kapoor", "puja", "sindur", "kumkum", "gulal", "rangoli",
    "deep", "diya", "bati", "cotton wick", "chandan", "sandalwood",
    "joss stick", "incense", "panipuri", "bhel"
  ],
  "Snacks & Namkeen": [
    "wafer", "chips", "sev", "bhel", "popcorn", "nachos", "farsan", "chevdo",
    "chana jor", "chataka", "crunchex", "balaji", "act-2", "act -2", "act2",
    "namkeen", "mixture", "kurkure", "lays", "bingo", "pringles", "haldiram",
    "bikano", "snack", "mathi", "gathiya", "ganthiya", "tikha", "fafda",
    "khakhra", "papdi", "bhujia", "banana chip", "ring", "tedha medha",
    "tikki", "pellet", "masala munch", "chatpata", "chaat", "puff",
    "corn ring", "cheese ball", "aloo bhujia"
  ],
  "Bakery & Biscuits": [
    "khari", "cookie", "biscuit", "rusk", "bread", "cake", "cream roll",
    "parle", "britannia", "sunfeast", "glucose", "digestive", "cracker",
    "marie", "toast", "nankhatai", "bun", "pav", "muffin", "croissant",
    "waffle", "tost", "good day", "bourbon", "hide & seek", "nutri choice",
    "treat", "oreo", "dark fantasy", "50-50", "50 50", "tiger", "milk bikis",
    "little heart", "nice", "monaco", "krackjack", "jim jam", "magicstix",
    "unibic", "anmol"
  ],
  "Beverages & Cold Drinks": [
    "tea", "chai", "coffee", "juice", "drink", "sharbat", "lassi", "shake",
    "wagh bakri", "tata tea", "cold drink", "frooti", "maaza", "sprite", "coke",
    "pepsi", "fanta", "limca", "thums up", "mountain dew", "7up", "mirinda",
    "appy", "real", "tropicana", "paper boat", "sting", "red bull", "monster",
    "glucon-d", "rasna", "tang", "roohafza", "sherbet", "nimbu pani",
    "lemonade", "soda", "tonic", "water", "bisleri", "kinley", "navchetan",
    "premium leaf", "leaf tea", "bhuki", "dust tea", "green tea", "black tea",
    "masala tea", "ginger tea", "herbal tea", "lemon tea", "peach tea",
    "ice tea", "nescafe", "bru", "cappuccino", "latte", "cocoa", "boost",
    "horlicks", "complan", "bournvita", "milo", "pediasure"
  ],
  "Dairy Products": [
    "butter", "cheese", "cream", "ghee", "paneer", "amul", "milk",
    "chocominis", "chocolate milk", "curd", "dahi", "yogurt", "shrikhand",
    "buttermilk", "chaas", "lassi", "gowardhan", "mother dairy",
    "verka", "nandini", "milkmaid", "condensed milk", "cheese slice",
    "cheese block", "cheese spread", "mozzarella", "cheddar"
  ],
  "Cosmetics & Personal Care": [
    "soap", "shampoo", "hair oil", "talcum", "talc", "toothpaste", "toothbrush",
    "henna", "mehendi", "attar", "perfume", "face wash", "lotion",
    "deo", "body wash", "nail", "kajal", "lipstick", "powder", "gel",
    "bajaj almond", "wild stone", "colorina", "anchor paste", "anchor tooth",
    "cream", "moisturizer", "sunscreen", "fairness", "beauty", "cosmetic",
    "makeup", "foundation", "compact", "eyeliner", "mascara", "blush",
    "concealer", "primer", "serum", "toner", "cleanser", "scrub", "mask",
    "pack", "wax", "razor", "blade", "shaving", "aftershave", "cologne",
    "body spray", "roll on", "antiperspirant", "deodorant", "hair colour",
    "hair dye", "hair cream", "hair gel", "hair spray", "conditioner",
    "comb", "brush", "mirror", "bindi", "sindoor", "alta", "nail polish",
    "nail cutter", "tweezer", "cotton", "cotton ball", "cotton pad",
    "sanitary", "pad", "tampon", "panty liner", "diaper", "baby care",
    "baby soap", "baby shampoo", "baby oil", "baby powder", "baby cream",
    "vaseline", "petroleum jelly", "lip balm", "chapstick",
    "hand wash", "sanitizer", "hand sanitizer", "dental",
    "mouthwash", "floss", "dental floss", "tongue cleaner",
    "colgate", "pepsodent", "closeup", "oral-b", "sensodyne",
    "dove", "lux", "lifebuoy", "dettol", "savlon", "himalaya",
    "nivea", "pond", "fair & lovely", "glow & lovely", "lakme",
    "garnier", "loreal", "olay", "cetaphil", "biotique",
    "patanjali", "dabur", "meswak", "babool", "vicco",
    "navratna", "clinic plus", "head & shoulders",
    "pantene", "tresemme", "sunsilk", "parachute", "hair & care",
    "bajaj", "emami", "marico", "set wet", "park avenue",
    "fogg", "engage", "yardley", "brut", "old spice",
    "axe", "hina", "mehndi"
  ],
  "Household Products": [
    "dish wash", "cleaning", "detergent", "floor cleaner", "tiles cleaner",
    "phenyl", "colin", "vim", "harpic", "air freshener", "aer", "odonil",
    "surf", "ariel", "wheel", "nirma", "washing",
    "bleach", "acid", "toilet cleaner", "bathroom cleaner", "glass cleaner",
    "kitchen cleaner", "drain cleaner", "pipe cleaner", "mosquito",
    "cockroach", "insecticide", "pesticide", "repellent", "hit", "all out",
    "good knight", "mortein", "lizol", "domex", "mr muscle",
    "scotch brite", "sponge", "wipe", "mop", "broom", "dustpan",
    "cloth", "duster", "match", "matchbox", "candle", "battery",
    "bulb", "tube light", "led", "plug", "switch", "wire",
    "tape", "adhesive", "fevicol", "quickfix", "mseal",
    "lock", "chain", "key", "umbrella", "rain coat",
    "washing powder", "fabric softener", "starch",
    "naphthalene", "moth ball", "camphor ball",
    "room freshener", "car freshener", "spray",
    "aashray", "cleaning powder", "white phenyl"
  ],
  "Plastic Ware & Kitchen": [
    "bucket", "container", "rack", "dabba", "box", "tray", "mug", "jug",
    "aera", "plastic", "steel", "storage", "baratan",
    "bottle", "flask", "thermos", "tiffin", "lunch box",
    "plate", "bowl", "glass", "cup", "saucer", "spoon",
    "fork", "knife", "ladle", "spatula", "tawa", "kadai",
    "pressure cooker", "pan", "pot", "casserole", "jar",
    "basket", "dustbin", "hanger", "clip", "peg",
    "stool", "chair", "table", "mat", "sheet",
    "foil", "cling wrap", "zip lock", "garbage bag",
    "clothes", "senso"
  ],
  "Stationery": [
    "pen", "pencil", "scissor", "scale", "notebook", "book", "eraser",
    "stapler", "pin", "rubber", "marker", "sketch", "aerotix",
    "pramukh pins", "atul paper",
    "paper", "file", "folder", "register", "diary", "calendar",
    "calculator", "ruler", "compass", "protractor", "set square",
    "geometry", "colour", "crayon", "paint", "brush",
    "glue", "stick", "fevistick", "whitener", "correction",
    "sharpener", "pouch", "geometry box",
    "chart", "drawing", "art", "craft"
  ],
  "Gift & Toy Articles": [
    "playing card", "toy", "activity book", "magnetic", "abcd", "game",
    "puzzle", "doll", "car toy", "gift",
    "ball", "bat", "racket", "kite", "manja",
    "decoration", "photo frame", "showpiece", "idol",
    "candle holder", "lamp", "lantern", "vase",
    "party", "birthday", "celebration", "festive",
    "cracker", "sparkler", "balloon", "ribbon",
    "wrapping", "gift box", "gift bag", "maa party"
  ]
};

// ─── Helper: clean product name ────────────────────────────────────────
function cleanName(raw) {
  return String(raw || '').replace(/\s+/g, ' ').trim();
}

// ─── Helper: classify product into category ────────────────────────────
function classifyProduct(name) {
  const lower = name.toLowerCase();
  
  // Check in priority order (more specific categories first)
  const priorityOrder = [
    "Gift & Toy Articles",
    "Stationery",
    "Plastic Ware & Kitchen",
    "Household Products",
    "Dairy Products",
    "Beverages & Cold Drinks",
    "Bakery & Biscuits",
    "Snacks & Namkeen",
    "Cosmetics & Personal Care",
    "Grocery & Staples"
  ];
  
  for (const category of priorityOrder) {
    const keywords = CATEGORIES[category];
    for (const keyword of keywords) {
      if (lower.includes(keyword.toLowerCase())) {
        return category;
      }
    }
  }
  
  return "Grocery & Staples"; // default fallback
}

// ─── Parse File 1: stock_and_sales_report.xlsx ────────────────────────
function parseFile1() {
  const wb = XLSX.readFile(resolve(docsDir, 'stock_and_sales_report.xlsx'));
  const sheet = wb.Sheets[wb.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });
  
  const products = [];
  let currentCompany = 'Unknown';
  
  // Columns based on header row (Row 2):
  // 0: Particular, 1: Packing, 2: BatchNo, 3: Expiry Date, 4: Expiry Days,
  // 5: MRP, 6: Sale, 7: Pur.Tax%, 8: Opn(Q+F), 9: Opn Amt(Q+F),
  // 10: T.Pur(Q+F), 11: T.Pur Amt(Q+F), 12: T.P/R(Q+F), 13: T.P/R Amt(Q+F),
  // 14: N.T.Sale(Q+F), 15: N.T.Sale Amt(Q+F), 16: Bal(Q+F), 17: Bal Amt(Q+F),
  // 18: Basic Cost, 19: SGST, 20: CGST, 21: CostOfSale
  
  for (let i = 4; i < data.length; i++) {
    const row = data[i];
    const firstCell = cleanName(row[0]);
    
    if (!firstCell) continue;
    
    // Check if it's a company row
    if (firstCell.toLowerCase().startsWith('company :') || firstCell.toLowerCase().startsWith('company:')) {
      currentCompany = firstCell.replace(/^company\s*:\s*/i, '').trim();
      continue;
    }
    
    // Skip header/footer rows
    if (firstCell.toLowerCase().includes('page no') || 
        firstCell.toLowerCase().includes('saleable stock') ||
        firstCell.toLowerCase().includes('from 01/04') ||
        firstCell.toLowerCase().includes('particular') ||
        firstCell.toLowerCase().includes('grand total') ||
        firstCell.toLowerCase().includes('company total')) {
      continue;
    }
    
    const name = firstCell;
    const packing = cleanName(row[1]);
    const mrp = parseFloat(row[5]) || 0;
    const balanceQty = parseFloat(row[16]) || 0;
    
    if (mrp > 0 && name.length > 1) {
      products.push({
        name,
        packing,
        mrp,
        balance_qty: balanceQty,
        company: currentCompany,
        source: 'file1'
      });
    }
  }
  
  return products;
}

// ─── Parse File 2: STOCK_SUMMARY.xlsx ────────────────────────────────
function parseFile2() {
  const wb = XLSX.readFile(resolve(docsDir, 'STOCK_SUMMARY.xlsx'));
  const sheet = wb.Sheets[wb.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });
  
  const products = [];
  let currentProductName = '';
  
  // Columns (Row 1 header):
  // 0: Item, 1: Packing, 2: FIT, 3: MRP, 4: ExpDt, 5: S.Stock, 6: NS.Stock, 7: T.Stock
  
  for (let i = 2; i < data.length; i++) {
    const row = data[i];
    let name = cleanName(row[0]);
    const packing = cleanName(row[1]);
    const mrp = parseFloat(row[3]) || 0;
    const sStock = parseFloat(row[5]) || 0;
    const tStock = parseFloat(row[7]) || 0;
    
    // Skip header/footer rows
    if (name.toLowerCase().includes('page no') || 
        name.toLowerCase().includes('stock summary') ||
        name.toLowerCase().includes('grand total') ||
        name.toLowerCase().includes('item')) {
      continue;
    }
    
    // Continuation row (blank name = same product as above, different batch)
    if (!name && currentProductName) {
      name = currentProductName;
    } else if (name) {
      currentProductName = name;
    }
    
    if (mrp > 0 && name.length > 1) {
      products.push({
        name,
        packing,
        mrp,
        balance_qty: sStock, // use saleable stock
        company: '', // File 2 doesn't have company info
        source: 'file2'
      });
    }
  }
  
  return products;
}

// ─── Deduplicate: key = (name + packing), keep highest balance_qty ────
function deduplicateProducts(allProducts) {
  const map = new Map();
  
  for (const p of allProducts) {
    const key = `${p.name.toLowerCase()}|${p.packing.toLowerCase()}`;
    const existing = map.get(key);
    
    if (!existing) {
      map.set(key, { ...p });
    } else {
      // Keep the one with highest balance_qty
      if (p.balance_qty > existing.balance_qty) {
        map.set(key, { ...p, company: p.company || existing.company });
      } else if (!existing.company && p.company) {
        existing.company = p.company;
      }
      // Also take the higher MRP if existing MRP is 0
      if (existing.mrp === 0 && p.mrp > 0) {
        existing.mrp = p.mrp;
      }
    }
  }
  
  return Array.from(map.values());
}

// ─── Title case helper ─────────────────────────────────────────────────
function toTitleCase(str) {
  const exceptions = ['gm', 'ml', 'kg', 'ltr', 'pcs', 'pic', 'no', 'rs', 'mr', '/'];
  return str.replace(/\w\S*/g, (word) => {
    const lower = word.toLowerCase();
    if (exceptions.includes(lower) && str.toLowerCase() !== lower) {
      return word.toUpperCase();
    }
    return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
  });
}

// ─── Main ──────────────────────────────────────────────────────────────
console.log('Parsing File 1: stock_and_sales_report.xlsx...');
const products1 = parseFile1();
console.log(`  → ${products1.length} product rows from File 1`);

console.log('Parsing File 2: STOCK_SUMMARY.xlsx...');
const products2 = parseFile2();
console.log(`  → ${products2.length} product rows from File 2`);

const allRaw = [...products1, ...products2];
console.log(`Total raw rows: ${allRaw.length}`);

const deduped = deduplicateProducts(allRaw);
console.log(`After deduplication: ${deduped.length} unique products`);

// Classify into categories and assign IDs
const CATEGORY_LIST = [
  { id: 1,  name: "Grocery & Staples",         icon: "🛒", color: "#dcfce7" },
  { id: 2,  name: "Snacks & Namkeen",          icon: "🍿", color: "#fef9c3" },
  { id: 3,  name: "Bakery & Biscuits",         icon: "🍞", color: "#fce7f3" },
  { id: 4,  name: "Beverages & Cold Drinks",   icon: "🥤", color: "#dbeafe" },
  { id: 5,  name: "Dairy Products",            icon: "🧈", color: "#f0fdf4" },
  { id: 6,  name: "Cosmetics & Personal Care", icon: "💄", color: "#f5d0d8" },
  { id: 7,  name: "Household Products",        icon: "🏠", color: "#fff7ed" },
  { id: 8,  name: "Plastic Ware & Kitchen",    icon: "🫙", color: "#e0f2fe" },
  { id: 9,  name: "Stationery",                icon: "✏️", color: "#f3e8ff" },
  { id: 10, name: "Gift & Toy Articles",       icon: "🎁", color: "#ffe4e6" },
];

const categoryMap = {};
for (const cat of CATEGORY_LIST) {
  categoryMap[cat.name] = cat.id;
}

// Compute category-level discount percentages
const CATEGORY_DISCOUNTS = {
  1: 5,   // Grocery & Staples
  2: 8,   // Snacks & Namkeen
  3: 10,  // Bakery & Biscuits
  4: 5,   // Beverages & Cold Drinks
  5: 3,   // Dairy Products
  6: 12,  // Cosmetics & Personal Care
  7: 10,  // Household Products
  8: 15,  // Plastic Ware & Kitchen
  9: 5,   // Stationery
  10: 10, // Gift & Toy Articles
};

const finalProducts = deduped.map((p, idx) => {
  const categoryName = classifyProduct(p.name);
  const categoryId = categoryMap[categoryName];
  const discountPercent = CATEGORY_DISCOUNTS[categoryId] || 0;
  const sellingPrice = Math.round(p.mrp * (1 - discountPercent / 100));
  
  return {
    product_id: idx + 1,
    name: toTitleCase(p.name),
    packing: p.packing.toUpperCase().trim() || '-',
    mrp: p.mrp,
    selling_price: sellingPrice,
    discount_percent: discountPercent,
    balance_qty: Math.max(0, Math.round(p.balance_qty)),
    company: p.company ? toTitleCase(p.company) : 'General',
    category_id: categoryId,
    category_name: categoryName,
    image_url: null,
    is_featured: false,
    discount_badge: '',
  };
});

// Count stats
const catCounts = {};
const companies = new Set();
for (const p of finalProducts) {
  catCounts[p.category_name] = (catCounts[p.category_name] || 0) + 1;
  companies.add(p.company);
}

console.log('\n=== Category Distribution ===');
for (const [cat, count] of Object.entries(catCounts).sort((a,b) => b[1]-a[1])) {
  console.log(`  ${cat}: ${count}`);
}
console.log(`\nTotal companies: ${companies.size}`);
console.log(`Total products: ${finalProducts.length}`);

// Mark some products as featured (top 16 by balance_qty that are in stock)
const featuredIds = finalProducts
  .filter(p => p.balance_qty > 0)
  .sort((a, b) => b.balance_qty - a.balance_qty)
  .slice(0, 16)
  .map(p => p.product_id);

for (const p of finalProducts) {
  if (featuredIds.includes(p.product_id)) {
    p.is_featured = true;
  }
}

// ─── Generate output JS file ─────────────────────────────────────────
const output = `// ═══════════════════════════════════════════════════════════════════
// AUTO-GENERATED — Real product data from Radhika Shopping Mall
// Parsed from stock_and_sales_report.xlsx & STOCK_SUMMARY.xlsx
// Generated: ${new Date().toISOString()}
// Total products: ${finalProducts.length} | Companies: ${companies.size}
// ═══════════════════════════════════════════════════════════════════

export const CATEGORIES = ${JSON.stringify(CATEGORY_LIST, null, 2)};

export const CATEGORY_MAP = {
${CATEGORY_LIST.map(c => `  ${c.id}: "${c.name}"`).join(',\n')}
};

export const ALL_PRODUCTS = ${JSON.stringify(finalProducts, null, 2)};

export const COMPANIES = ${JSON.stringify([...companies].sort(), null, 2)};

// ─── Helper functions ──────────────────────────────────────────────────

export const getProductImage = (product) => {
  if (product.image_url) return product.image_url;
  const cat = CATEGORY_MAP[product.category_id] || 'Product';
  return \`https://placehold.co/200x200/E3EA98/165F47?text=\${encodeURIComponent(cat.split(' ')[0])}\`;
};

export const getProductById = (id) => ALL_PRODUCTS.find(p => p.product_id === id) || null;

export const getProductsByCategory = (categoryId) =>
  categoryId ? ALL_PRODUCTS.filter(p => p.category_id === categoryId) : ALL_PRODUCTS;

export const getProductsByCompany = (company) =>
  ALL_PRODUCTS.filter(p => p.company === company);

export const getFeaturedProducts = () => ALL_PRODUCTS.filter(p => p.is_featured);

export const getInStockProducts = () => ALL_PRODUCTS.filter(p => p.balance_qty > 0);

export const searchProducts = (query) => {
  const q = query.toLowerCase().trim();
  if (!q) return ALL_PRODUCTS;
  return ALL_PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.company.toLowerCase().includes(q) ||
    p.category_name.toLowerCase().includes(q) ||
    p.packing.toLowerCase().includes(q)
  );
};

export const TOTAL_PRODUCTS = ALL_PRODUCTS.length;
export const TOTAL_COMPANIES = COMPANIES.length;
export const TOTAL_CATEGORIES = CATEGORIES.length;
`;

writeFileSync(outputPath, output, 'utf8');
console.log(`\n✅ Written to: ${outputPath}`);
console.log(`   Size: ${(output.length / 1024 / 1024).toFixed(2)} MB`);
