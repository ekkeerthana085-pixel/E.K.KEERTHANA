import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Check, ShoppingBag } from 'lucide-react';
import { addItem } from '../features/cart/CartSlice.js';
import { products } from '../data/products.js';

const categories = ['All Plants', 'Statement Plants', 'Easy Care', 'Trailing Plants'];

export default function ProductList({ onOpenCart }) {
  const [category, setCategory] = useState('All Plants');
  const [recentlyAdded, setRecentlyAdded] = useState(null);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const visibleProducts = category === 'All Plants' ? products : products.filter((p) => p.category === category);

  const handleAdd = (product) => {
    dispatch(addItem(product));
    setRecentlyAdded(product.id);
    window.setTimeout(() => setRecentlyAdded((current) => current === product.id ? null : current), 1300);
  };

  return (
    <main className="page-wrap">
      <div className="catalog-heading">
        <div>
          <span className="section-kicker">FIND YOUR GREEN COMPANION</span>
          <h1 className="page-title">Plants for your<br />kind of space.</h1>
          <p className="page-intro">From easy-going greens to statement-making leaves, find a plant that feels right at home.</p>
        </div>
        <button className="cart-nav" onClick={onOpenCart}><ShoppingBag size={18} /> Cart ({cartCount})</button>
      </div>
      <div className="category-row" aria-label="Filter plants by category">
        {categories.map((item) => (
          <button key={item} className={category === item ? 'category-button selected' : 'category-button'} onClick={() => setCategory(item)} aria-pressed={category === item}>{item}</button>
        ))}
      </div>
      <div className="catalog-heading">
        <div><span className="section-kicker">THE PLANT EDIT</span><h2 className="page-title" style={{ fontSize: 30, marginBottom: 0 }}>{category}</h2></div>
        <span className="catalog-count">{visibleProducts.length} plants to explore</span>
      </div>
      <section className="product-grid" aria-label="Plant products">
        {visibleProducts.map((product) => (
          <article className="product-card" key={product.id}>
            <div className="product-image-wrap">
              <img className="product-image" src={product.image} alt={product.name} loading="lazy" />
              <span className="product-tag">{product.tag}</span>
            </div>
            <div className="product-info">
              <div className="product-category">{product.category}</div>
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-bottom">
                <span className="product-price">${product.price.toFixed(2)}</span>
                <button className="add-button" onClick={() => handleAdd(product)}>
                  {recentlyAdded === product.id ? <><Check size={14} /> Added</> : <><ShoppingBag size={14} /> Add to cart</>}
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}