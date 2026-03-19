import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { discount } from '../data/mockData';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { price, stock, product_id, name, brand, image_url, unit } = product;
  const { addItem, isInCart, getQty, updateQty } = useCart();

  const inCart  = isInCart(product_id);
  const qty     = getQty(product_id);
  const outOfStock = stock?.quantity === 0;
  const disc    = discount(price.mrp, price.selling_price);

  const handleAdd = (e) => { e.preventDefault(); addItem(product); };
  const handleInc = (e) => { e.preventDefault(); updateQty(product_id, qty + 1); };
  const handleDec = (e) => { e.preventDefault(); updateQty(product_id, qty - 1); };

  return (
    <Link to={`/products/${product_id}`} className="product-card card">
      <div className="pc-image-wrap">
        <img src={image_url} alt={name} className="pc-image" loading="lazy" />
        {disc > 0 && <span className="pc-disc-badge">{disc}% OFF</span>}
        {outOfStock && <div className="pc-oos-overlay">Out of Stock</div>}
      </div>

      <div className="pc-body">
        <p className="pc-brand">{brand}</p>
        <h3 className="pc-name">{name}</h3>
        <p className="pc-unit">{unit}</p>

        <div className="pc-footer">
          <div>
            <div className="price-row">
              <span className="price-sell">₹{price.selling_price}</span>
              {price.mrp > price.selling_price && (
                <span className="price-mrp">₹{price.mrp}</span>
              )}
            </div>
          </div>

          {!outOfStock && (
            inCart ? (
              <div className="qty-control" onClick={e => e.preventDefault()}>
                <button className="qty-btn" onClick={handleDec}>−</button>
                <span className="qty-value">{qty}</span>
                <button className="qty-btn" onClick={handleInc}>+</button>
              </div>
            ) : (
              <button className="pc-add-btn" onClick={handleAdd}>+ Add</button>
            )
          )}
        </div>
      </div>
    </Link>
  );
}
