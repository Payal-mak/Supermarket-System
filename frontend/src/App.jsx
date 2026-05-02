import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProtectedRoute, AdminRoute } from './components/ProtectedRoute';
import Navbar  from './components/Navbar';
import Footer  from './components/Footer';
import AuthPage         from './pages/AuthPage';
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

function AppContent() {
  const { isAuthenticated, loading } = useAuth();

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="flex-center" style={{ minHeight: '100vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛍️</div>
          <p style={{ color: 'var(--gray-500)' }}>Loading…</p>
        </div>
      </div>
    );
  }

  // If not logged in, show auth gate
  if (!isAuthenticated) {
    return <AuthPage />;
  }

  // Logged in — show the app
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/"              element={<HomePage />} />
          <Route path="/products"      element={<ProductsPage />} />
          <Route path="/products/:id"  element={<ProductDetailPage />} />
          <Route path="/cart"          element={<CartPage />} />
          <Route path="/checkout"      element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
          <Route path="/dashboard"     element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/admin"         element={<AdminRoute><AdminPage /></AdminRoute>} />
          <Route path="*"             element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
