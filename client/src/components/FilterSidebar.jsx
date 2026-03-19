import { useState } from 'react';
import { categories } from '../data/mockData';
import './FilterSidebar.css';

export default function FilterSidebar({ filters, onChange }) {
  const [priceRange, setPriceRange] = useState(filters.maxPrice || 300);
  const brands = ['Amul', 'Real', 'Bisleri', 'Lays', 'India Gate', 'Local Farm', 'Aashirvaad', 'Epigamia', 'Happilo', 'Tetley'];

  const handleCategory = (id) => {
    const current = filters.categories || [];
    const updated  = current.includes(id)
      ? current.filter(c => c !== id)
      : [...current, id];
    onChange({ ...filters, categories: updated });
  };

  const handleBrand = (brand) => {
    const current = filters.brands || [];
    const updated  = current.includes(brand)
      ? current.filter(b => b !== brand)
      : [...current, brand];
    onChange({ ...filters, brands: updated });
  };

  const handlePrice = (val) => {
    setPriceRange(val);
    onChange({ ...filters, maxPrice: Number(val) });
  };

  const clearAll = () => {
    setPriceRange(300);
    onChange({ categories: [], brands: [], maxPrice: 300 });
  };

  return (
    <aside className="filter-sidebar card">
      <div className="filter-header">
        <h3>Filters</h3>
        <button className="btn btn-ghost btn-sm" onClick={clearAll}>Clear All</button>
      </div>

      <div className="filter-section">
        <h4>Category</h4>
        {categories.map(c => (
          <label key={c.category_id} className="check-label">
            <input
              type="checkbox"
              checked={(filters.categories || []).includes(c.category_id)}
              onChange={() => handleCategory(c.category_id)}
            />
            {c.icon} {c.name}
          </label>
        ))}
      </div>

      <div className="divider" />

      <div className="filter-section">
        <h4>Price Range</h4>
        <div className="price-range-labels">
          <span>₹0</span>
          <span className="price-range-val">up to ₹{priceRange}</span>
        </div>
        <input
          type="range" min={0} max={300} step={10}
          value={priceRange}
          onChange={e => handlePrice(e.target.value)}
        />
      </div>

      <div className="divider" />

      <div className="filter-section">
        <h4>Brand</h4>
        {brands.map(brand => (
          <label key={brand} className="check-label">
            <input
              type="checkbox"
              checked={(filters.brands || []).includes(brand)}
              onChange={() => handleBrand(brand)}
            />
            {brand}
          </label>
        ))}
      </div>
    </aside>
  );
}
