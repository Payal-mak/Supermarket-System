import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAllProductsWithDetails } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import './ProductsPage.css';

const SORT_OPTIONS = [
  { value: 'default',    label: 'Relevance' },
  { value: 'price_asc',  label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'discount',   label: 'Best Discount' },
  { value: 'name',       label: 'Name A–Z' },
];

export default function ProductsPage() {
  const [params] = useSearchParams();
  const initCat   = params.get('category') ? [Number(params.get('category'))] : [];
  const searchQ   = params.get('search') || '';

  const [filters, setFilters] = useState({ categories: initCat, brands: [], maxPrice: 300 });
  const [sort,    setSort]    = useState('default');
  const [sidebar, setSidebar] = useState(false);

  const all = getAllProductsWithDetails();

  const filtered = useMemo(() => {
    let list = [...all];

    if (searchQ) {
      const q = searchQ.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }
    if (filters.categories.length) {
      list = list.filter(p => filters.categories.includes(p.category_id));
    }
    if (filters.brands.length) {
      list = list.filter(p => filters.brands.includes(p.brand));
    }
    list = list.filter(p => p.price.selling_price <= filters.maxPrice);

    switch (sort) {
      case 'price_asc':  list.sort((a,b) => a.price.selling_price - b.price.selling_price); break;
      case 'price_desc': list.sort((a,b) => b.price.selling_price - a.price.selling_price); break;
      case 'discount':   list.sort((a,b) => (b.price.mrp - b.price.selling_price) - (a.price.mrp - a.price.selling_price)); break;
      case 'name':       list.sort((a,b) => a.name.localeCompare(b.name)); break;
      default:           break;
    }
    return list;
  }, [all, searchQ, filters, sort]);

  return (
    <div className="products-page page-enter">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span>Home</span> / <span className="active">
            {searchQ ? `Search: "${searchQ}"` : 'All Products'}
          </span>
        </div>

        <div className="pl-layout">
          {/* Sidebar — desktop */}
          <div className="pl-sidebar hide-mobile">
            <FilterSidebar filters={filters} onChange={setFilters} />
          </div>

          {/* Main */}
          <div className="pl-main">
            {/* Sort + mobile filter bar */}
            <div className="pl-topbar">
              <p className="pl-count"><strong>{filtered.length}</strong> products found</p>
              <div style={{ display:'flex', gap:'0.5rem', alignItems:'center' }}>
                <button
                  className="btn btn-outline btn-sm hide-desktop"
                  onClick={() => setSidebar(o => !o)}
                >
                  🔧 Filters
                </button>
                <select
                  className="form-input sort-select"
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                >
                  {SORT_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Mobile sidebar overlay */}
            {sidebar && (
              <div className="mobile-filter-overlay">
                <div className="mobile-filter-panel">
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1rem' }}>
                    <h3>Filters</h3>
                    <button className="btn btn-ghost" onClick={() => setSidebar(false)}>✕ Close</button>
                  </div>
                  <FilterSidebar filters={filters} onChange={(f) => { setFilters(f); setSidebar(false); }} />
                </div>
              </div>
            )}

            {filtered.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🔍</div>
                <h3>No products found</h3>
                <p>Try adjusting your filters or search term.</p>
              </div>
            ) : (
              <div className="pl-grid">
                {filtered.map(p => <ProductCard key={p.product_id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
