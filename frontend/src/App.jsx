import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar  from './components/Navbar';
import Footer  from './components/Footer';
import HomePage         from './pages/HomePage';
import ProductsPage     from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage         from './pages/CartPage';
import CheckoutPage     from './pages/CheckoutPage';
import DashboardPage    from './pages/DashboardPage';
import AdminPage        from './pages/AdminPage';

function NotFound() {
  return (
    <div className="container empty-state" style={{ paddingTop: '5rem' }}>
      <div className="empty-icon">🔍</div>
      <h2>404 — Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <a href="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>Go Home</a>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/"              element={<HomePage />} />
              <Route path="/products"      element={<ProductsPage />} />
              <Route path="/products/:id"  element={<ProductDetailPage />} />
              <Route path="/cart"          element={<CartPage />} />
              <Route path="/checkout"      element={<CheckoutPage />} />
              <Route path="/dashboard"     element={<DashboardPage />} />
              <Route path="/admin"         element={<AdminPage />} />
              <Route path="*"             element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}
