import { useState, useMemo, useEffect } from "react";
import '../styles/globals.css';
import '../styles/index.css';
import '../styles/tailwind.css';
import '../styles/theme.css';
import {
  ShoppingCart,
  Search,
  X,
  Plus,
  Minus,
  ChevronRight,
  Leaf,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  ArrowLeft,
  Star,
  Truck,
  Shield,
  Clock,
  Tag,
  User,
  LogOut,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────

type Product = {
  id: number;
  name: string;
  price: number;
  unit: string;
  product_name: string;
  image_url: string;
  rating: number;
  is_organic: boolean;
  is_fresh: boolean;
  is_popular: boolean;
  category?: string;
  image?: string;
  badge?: string;
};

type CartItem = Product & { qty: number };

type View = "shop" | "cart" | "checkout" | "confirmation";

// ── Data ───────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "all", label: "All Items", emoji: "🛒" },
  { id: "fruits", label: "Fruits & Veg", emoji: "🥦" },
  { id: "dairy", label: "Dairy & Eggs", emoji: "🥛" },
  { id: "meat", label: "Meat & Fish", emoji: "🥩" },
  { id: "bakery", label: "Bakery", emoji: "🍞" },
  { id: "beverages", label: "Beverages", emoji: "🧃" },
  { id: "snacks", label: "Snacks", emoji: "🍪" },
  { id: "household", label: "Household", emoji: "🧴" },
];

// ── Fallback products ──
const FALLBACK_PRODUCTS: Product[] = [
  { id: 1, name: "Fresh Avocados", price: 180, unit: "per 3 pcs", category: "fruits", image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=300&fit=crop&auto=format", rating: 4.8, badge: "Fresh", product_name: "Fresh Avocados", image_url: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=300&fit=crop&auto=format", is_organic: false, is_fresh: true, is_popular: false },
  { id: 2, name: "Sweet Mangoes", price: 250, unit: "per kg", category: "fruits", image: "https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=400&h=300&fit=crop&auto=format", rating: 4.9, badge: "Popular", product_name: "Sweet Mangoes", image_url: "https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=400&h=300&fit=crop&auto=format", is_organic: false, is_fresh: true, is_popular: true },
  { id: 3, name: "Cherry Tomatoes", price: 120, unit: "per 500g", category: "fruits", image: "https://images.unsplash.com/photo-1563114773-84221bd62daa?w=400&h=300&fit=crop&auto=format", rating: 4.6, product_name: "Cherry Tomatoes", image_url: "https://images.unsplash.com/photo-1563114773-84221bd62daa?w=400&h=300&fit=crop&auto=format", is_organic: false, is_fresh: true, is_popular: false },
  { id: 4, name: "Baby Spinach", price: 90, unit: "per bunch", category: "fruits", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop&auto=format", rating: 4.5, badge: "Organic", product_name: "Baby Spinach", image_url: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop&auto=format", is_organic: true, is_fresh: true, is_popular: false },
  { id: 5, name: "Sweet Bananas", price: 80, unit: "per bunch", category: "fruits", image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop&auto=format", rating: 4.7, product_name: "Sweet Bananas", image_url: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop&auto=format", is_organic: false, is_fresh: true, is_popular: false },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

const fmt = (n: number) => `KES ${n.toLocaleString()}`;

// ── Login Component ───────────────────────────────────────────────────────────

function LoginPage({ onLogin, onSwitchToRegister }: { onLogin: (user: any) => void; onSwitchToRegister: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost/nnchi-supermarket/api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success) {
        onLogin(data.user);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9faf6] px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-10 h-10 bg-[#1a6b30] rounded-xl flex items-center justify-center">
              <Leaf size={20} className="text-white" />
            </div>
            <span className="text-2xl font-bold text-[#1a2e1c]">
              Nchi <span className="text-[#1a6b30]">Super</span>
            </span>
          </div>
          <h2 className="text-2xl font-bold text-[#1a2e1c]">Welcome Back!</h2>
          <p className="text-gray-500 text-sm mt-1">Login to your account</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-4 border border-red-200">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#1a2e1c] mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1a6b30] focus:ring-2 focus:ring-[#1a6b30]/20 outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1a2e1c] mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1a6b30] focus:ring-2 focus:ring-[#1a6b30]/20 outline-none transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1a6b30] text-white py-3 rounded-xl font-semibold hover:bg-[#155a28] transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Don't have an account?{' '}
            <button onClick={onSwitchToRegister} className="text-[#1a6b30] font-semibold hover:underline">
              Register here
            </button>
          </p>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            <strong>Test Credentials:</strong><br />
            Email: john@example.com<br />
            Password: password123
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Register Component ────────────────────────────────────────────────────────

function RegisterPage({ onSwitchToLogin }: { onSwitchToLogin: () => void }) {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost/nnchi-supermarket/api/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullname, email, password })
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Registration successful! You can now login.');
        setFullname('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9faf6] px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-10 h-10 bg-[#1a6b30] rounded-xl flex items-center justify-center">
              <Leaf size={20} className="text-white" />
            </div>
            <span className="text-2xl font-bold text-[#1a2e1c]">
              Nchi <span className="text-[#1a6b30]">Super</span>
            </span>
          </div>
          <h2 className="text-2xl font-bold text-[#1a2e1c]">Create Account</h2>
          <p className="text-gray-500 text-sm mt-1">Join Nnchi Supermarket today!</p>
        </div>

        {success && (
          <div className="bg-green-50 text-green-600 text-sm p-3 rounded-xl mb-4 border border-green-200">
            ✅ {success}
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-4 border border-red-200">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#1a2e1c] mb-1">Full Name</label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="John Mwangi"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1a6b30] focus:ring-2 focus:ring-[#1a6b30]/20 outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1a2e1c] mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1a6b30] focus:ring-2 focus:ring-[#1a6b30]/20 outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1a2e1c] mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 6 characters"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1a6b30] focus:ring-2 focus:ring-[#1a6b30]/20 outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1a2e1c] mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1a6b30] focus:ring-2 focus:ring-[#1a6b30]/20 outline-none transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1a6b30] text-white py-3 rounded-xl font-semibold hover:bg-[#155a28] transition disabled:opacity-50"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Already have an account?{' '}
            <button onClick={onSwitchToLogin} className="text-[#1a6b30] font-semibold hover:underline">
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function Badge({ text }: { text: string }) {
  return (
    <span className="absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-accent text-accent-foreground z-10">
      {text}
    </span>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-1 text-xs text-amber-500 font-medium">
      <Star size={11} fill="currentColor" />
      {rating.toFixed(1)}
    </span>
  );
}

function ProductCard({
  product,
  cartQty,
  onAdd,
  onRemove,
}: {
  product: Product;
  cartQty: number;
  onAdd: () => void;
  onRemove: () => void;
}) {
  const imageSrc = product.image_url || product.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop&auto=format';
  
  return (
    <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow group flex flex-col">
      <div className="relative overflow-hidden bg-secondary h-44">
        {product.badge && <Badge text={product.badge} />}
        {product.is_organic && !product.badge && <Badge text="Organic" />}
        {product.is_fresh && !product.badge && !product.is_organic && <Badge text="Fresh" />}
        <img
          src={imageSrc}
          alt={product.name || product.product_name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
        />
      </div>
      <div className="p-3 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-1">
          <h3 className="font-semibold text-sm leading-tight text-foreground line-clamp-2">
            {product.name || product.product_name}
          </h3>
          <StarRating rating={product.rating || 0} />
        </div>
        <p className="text-xs text-muted-foreground">{product.unit}</p>
        <div className="flex items-center justify-between mt-auto pt-1">
          <span className="text-base font-bold text-primary">{fmt(product.price)}</span>
          {cartQty === 0 ? (
            <button
              onClick={onAdd}
              className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-xl hover:bg-primary/90 transition-colors flex items-center gap-1"
            >
              <Plus size={12} /> Add
            </button>
          ) : (
            <div className="flex items-center gap-1 bg-primary rounded-xl overflow-hidden">
              <button onClick={onRemove} className="text-primary-foreground px-2 py-1.5 hover:bg-white/10 transition-colors">
                <Minus size={12} />
              </button>
              <span className="text-primary-foreground text-xs font-bold w-5 text-center">{cartQty}</span>
              <button onClick={onAdd} className="text-primary-foreground px-2 py-1.5 hover:bg-white/10 transition-colors">
                <Plus size={12} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CartSidebar({
  items,
  onClose,
  onAdd,
  onRemove,
  onCheckout,
}: {
  items: CartItem[];
  onClose: () => void;
  onAdd: (id: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
}) {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = 150;
  const total = subtotal + delivery;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="w-full max-w-sm bg-background flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
            <ShoppingCart size={18} className="text-primary" />
            Your Cart
            <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">{items.length}</span>
          </h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors p-1">
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-muted-foreground">
            <ShoppingCart size={40} className="opacity-30" />
            <p className="text-sm">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-3 space-y-3 scrollbar-hide">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 items-center">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
                    <img src={item.image || item.image_url || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop&auto=format'} alt={item.name || item.product_name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{item.name || item.product_name}</p>
                    <p className="text-xs text-muted-foreground">{fmt(item.price)} each</p>
                  </div>
                  <div className="flex items-center gap-1 bg-secondary rounded-lg">
                    <button onClick={() => onRemove(item.id)} className="text-primary p-1 hover:bg-border/20 rounded-l-lg transition-colors">
                      <Minus size={13} />
                    </button>
                    <span className="text-sm font-bold text-foreground w-6 text-center">{item.qty}</span>
                    <button onClick={() => onAdd(item.id)} className="text-primary p-1 hover:bg-border/20 rounded-r-lg transition-colors">
                      <Plus size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-5 py-4 border-t border-border space-y-3">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span><span>{fmt(subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery</span><span>{fmt(delivery)}</span>
                </div>
                <div className="flex justify-between font-bold text-foreground text-base border-t border-border pt-1.5">
                  <span>Total</span><span className="text-primary">{fmt(total)}</span>
                </div>
              </div>
              <button
                onClick={onCheckout}
                className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                Proceed to Checkout <ChevronRight size={16} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function CheckoutPage({
  items,
  onBack,
  onConfirm,
}: {
  items: CartItem[];
  onBack: () => void;
  onConfirm: () => void;
}) {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", address: "",
    payment: "mpesa",
    mpesaPhone: "", cardNumber: "", cardExpiry: "", cardCvv: "", cardName: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = 150;
  const total = subtotal + delivery;

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.phone.match(/^0[0-9]{9}$/)) e.phone = "Enter a valid Kenyan phone number";
    if (!form.email.includes("@")) e.email = "Enter a valid email";
    if (!form.address.trim()) e.address = "Required";
    if (form.payment === "mpesa" && !form.mpesaPhone.match(/^0[0-9]{9}$/))
      e.mpesaPhone = "Enter a valid M-Pesa number";
    if (form.payment === "card") {
      if (form.cardNumber.replace(/\s/g, "").length !== 16) e.cardNumber = "Enter a 16-digit card number";
      if (!form.cardExpiry.match(/^\d{2}\/\d{2}$/)) e.cardExpiry = "Use MM/YY format";
      if (form.cardCvv.length !== 3) e.cardCvv = "3 digits required";
      if (!form.cardName.trim()) e.cardName = "Required";
    }
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const e2 = validate();
    setErrors(e2);
    if (Object.keys(e2).length === 0) onConfirm();
  };

  const Field = ({
    label, id, type = "text", value, placeholder, error, onChange, maxLength,
  }: {
    label: string; id: string; type?: string; value: string; placeholder?: string;
    error?: string; onChange: (v: string) => void; maxLength?: number;
  }) => (
    <div>
      <label className="block text-sm font-semibold text-foreground mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(ev) => onChange(ev.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`w-full px-3 py-2.5 rounded-xl border text-sm bg-input-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all ${error ? "border-destructive" : "border-border"}`}
      />
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft size={16} /> Back to cart
      </button>

      <h1 className="font-display text-3xl font-bold text-foreground mb-6">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
            <h2 className="font-bold text-foreground">Delivery Details</h2>
            <Field label="Full Name" id="name" value={form.name} onChange={(v) => set("name", v)} placeholder="John Mwangi" error={errors.name} />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Phone Number" id="phone" value={form.phone} onChange={(v) => set("phone", v)} placeholder="0712 345 678" error={errors.phone} />
              <Field label="Email" id="email" type="email" value={form.email} onChange={(v) => set("email", v)} placeholder="john@email.com" error={errors.email} />
            </div>
            <Field label="Delivery Address" id="address" value={form.address} onChange={(v) => set("address", v)} placeholder="Street, Estate, City" error={errors.address} />
          </div>

          <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
            <h2 className="font-bold text-foreground">Payment Method</h2>
            <div className="grid grid-cols-3 gap-2">
              {(["mpesa", "card", "cash"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => set("payment", m)}
                  className={`py-3 px-2 rounded-xl text-sm font-semibold border-2 transition-all ${form.payment === m ? "border-primary bg-secondary text-primary" : "border-border text-muted-foreground hover:border-primary/30"}`}
                >
                  {m === "mpesa" ? "📱 M-Pesa" : m === "card" ? "💳 Card" : "💵 Cash"}
                </button>
              ))}
            </div>

            {form.payment === "mpesa" && (
              <Field label="M-Pesa Phone Number" id="mpesaPhone" value={form.mpesaPhone} onChange={(v) => set("mpesaPhone", v)} placeholder="0712 345 678" error={errors.mpesaPhone} />
            )}

            {form.payment === "card" && (
              <div className="space-y-3">
                <Field label="Cardholder Name" id="cardName" value={form.cardName} onChange={(v) => set("cardName", v)} placeholder="John Mwangi" error={errors.cardName} />
                <Field
                  label="Card Number" id="cardNumber" value={form.cardNumber}
                  onChange={(v) => {
                    const cleaned = v.replace(/\D/g, "").slice(0, 16);
                    const spaced = cleaned.replace(/(.{4})/g, "$1 ").trim();
                    set("cardNumber", spaced);
                  }}
                  placeholder="1234 5678 9012 3456" error={errors.cardNumber}
                />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Expiry (MM/YY)" id="cardExpiry" value={form.cardExpiry}
                    onChange={(v) => {
                      let val = v.replace(/\D/g, "").slice(0, 4);
                      if (val.length >= 3) val = val.slice(0, 2) + "/" + val.slice(2);
                      set("cardExpiry", val);
                    }}
                    placeholder="08/27" error={errors.cardExpiry} maxLength={5} />
                  <Field label="CVV" id="cardCvv" value={form.cardCvv} onChange={(v) => set("cardCvv", v.replace(/\D/g, "").slice(0, 3))} placeholder="123" error={errors.cardCvv} maxLength={3} />
                </div>
              </div>
            )}

            {form.payment === "cash" && (
              <p className="text-sm text-muted-foreground bg-muted rounded-xl px-4 py-3">
                Pay in cash when your order is delivered. Please have the exact amount ready.
              </p>
            )}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-card border border-border rounded-2xl p-5 sticky top-4">
            <h2 className="font-bold text-foreground mb-4">Order Summary</h2>
            <div className="space-y-2 max-h-56 overflow-y-auto scrollbar-hide mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground truncate pr-2">{item.name || item.product_name} × {item.qty}</span>
                  <span className="font-medium text-foreground flex-shrink-0">{fmt(item.price * item.qty)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-3 space-y-1.5 text-sm">
              <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
              <div className="flex justify-between text-muted-foreground"><span>Delivery</span><span>{fmt(delivery)}</span></div>
              <div className="flex justify-between font-bold text-base text-foreground border-t border-border pt-2 mt-1">
                <span>Total</span><span className="text-primary">{fmt(total)}</span>
              </div>
            </div>
            <button
              type="submit"
              className="w-full mt-4 bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <Shield size={16} />
              {form.payment === "mpesa" ? "Pay via M-Pesa" : form.payment === "card" ? "Pay Securely" : "Place Order"}
            </button>
            <p className="text-center text-xs text-muted-foreground mt-2">🔒 Secured by 256-bit SSL encryption</p>
          </div>
        </div>
      </form>
    </div>
  );
}

function ConfirmationPage({ onContinue }: { onContinue: () => void }) {
  const orderNo = `NCH-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="bg-card border border-border rounded-3xl p-10 max-w-md w-full shadow-lg">
        <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={36} className="text-primary" />
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">Order Confirmed!</h2>
        <p className="text-muted-foreground text-sm mb-1">Thank you for shopping with Nchi Supermarket</p>
        <p className="text-xs text-muted-foreground mb-6">Order #{orderNo}</p>
        <div className="bg-secondary rounded-xl p-4 text-sm text-left space-y-2 mb-6">
          <div className="flex items-center gap-2 text-primary font-semibold"><Truck size={15} /> Estimated delivery: 30 – 60 minutes</div>
          <p className="text-muted-foreground">You will receive an SMS confirmation and tracking updates on your phone.</p>
        </div>
        <button onClick={onContinue} className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors">
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

// ── Main App ───────────────────────────────────────────────────────────────────

export default function App() {
  // ── Auth State ──
  const [user, setUser] = useState<any>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // ── App State ──
  const [view, setView] = useState<View>("shop");
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  // ── Database State ──
  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState('');

  // ── Fetch Products ──
  useEffect(() => {
    fetch('http://localhost/nnchi-supermarket/api/products.php')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const mappedProducts: Product[] = data.map((item: any) => ({
            id: item.id,
            name: item.product_name,
            product_name: item.product_name,
            price: parseFloat(item.price),
            unit: item.unit,
            image_url: item.image_url,
            image: item.image_url,
            rating: parseFloat(item.rating) || 0,
            is_organic: item.is_organic === 1 || item.is_organic === true,
            is_fresh: item.is_fresh === 1 || item.is_fresh === true,
            is_popular: item.is_popular === 1 || item.is_popular === true,
            category: item.category_id ? String(item.category_id) : 'all',
            badge: item.is_organic ? 'Organic' : item.is_fresh ? 'Fresh' : '',
          }));
          setDbProducts(mappedProducts);
        } else {
          setDbProducts(FALLBACK_PRODUCTS);
        }
        setLoading(false);
      })
      .catch(() => {
        setDbProducts(FALLBACK_PRODUCTS);
        setDbError('Using fallback products - database not connected');
        setLoading(false);
      });
  }, []);

  const PRODUCTS = dbProducts.length > 0 ? dbProducts : FALLBACK_PRODUCTS;

  // ── Cart Functions ──
  const addToCart = (product: Product) => {
    setCart((c) => {
      const existing = c.find((i) => i.id === product.id);
      if (existing) return c.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...c, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((c) => {
      const existing = c.find((i) => i.id === id);
      if (existing && existing.qty === 1) return c.filter((i) => i.id !== id);
      return c.map((i) => i.id === id ? { ...i, qty: i.qty - 1 } : i);
    });
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  // ── Auth Functions ──
  const handleLogin = (userData: any) => {
    setUser(userData);
    setShowLogin(false);
    setShowRegister(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const handleRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const handleSwitchToLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  // ── Filter Products ──
  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCat = activeCategory === "all" || p.category === activeCategory;
      const matchSearch = (p.name || p.product_name || '').toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, search, PRODUCTS]);

  // ── Render ──

  // Show Login Page
  if (showLogin) {
    return <LoginPage onLogin={handleLogin} onSwitchToRegister={handleRegister} />;
  }

  // Show Register Page
  if (showRegister) {
    return <RegisterPage onSwitchToLogin={handleSwitchToLogin} />;
  }

  // ── Main App ──
  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* ── User Status Bar ── */}
      <div className="bg-[#1a2e1c] text-white text-xs py-1.5 px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span>🚚 Free delivery on orders over KES 2,000</span>
          <span>🕐 Open 7am – 10pm daily</span>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="flex items-center gap-1">
                <User size={12} /> {user.fullname}
              </span>
              <button onClick={handleLogout} className="flex items-center gap-1 hover:text-red-400 transition">
                <LogOut size={12} /> Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setShowLogin(true)} className="hover:text-[#4CAF50] transition">
                Login
              </button>
              <button onClick={() => setShowRegister(true)} className="hover:text-[#4CAF50] transition">
                Register
              </button>
            </>
          )}
        </div>
      </div>

      {/* ── Header ── */}
      <header className="sticky top-0 z-40 bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
              <Leaf size={16} className="text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-foreground" style={{ fontFamily: "'Fraunces', serif" }}>
              Nchi <span className="text-primary">Super</span>
            </span>
          </div>

          <div className="flex-1 max-w-lg mx-auto relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setView("shop"); }}
              placeholder="Search groceries, fresh produce…"
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-input-background border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <X size={13} />
              </button>
            )}
          </div>

          <button
            onClick={() => { if (view !== "shop") setView("shop"); setCartOpen(true); }}
            className="relative flex items-center gap-2 bg-primary text-primary-foreground px-3 py-2 rounded-xl hover:bg-primary/90 transition-colors flex-shrink-0"
          >
            <ShoppingCart size={16} />
            <span className="text-sm font-semibold hidden sm:block">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-accent text-accent-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* ── Cart Sidebar ── */}
      {cartOpen && (
        <CartSidebar
          items={cart}
          onClose={() => setCartOpen(false)}
          onAdd={(id) => { const p = PRODUCTS.find((p) => p.id === id)!; addToCart(p); }}
          onRemove={removeFromCart}
          onCheckout={() => { setCartOpen(false); setView("checkout"); }}
        />
      )}

      {/* ── Main Content ── */}
      {view === "confirmation" ? (
        <ConfirmationPage onContinue={() => { setCart([]); setView("shop"); }} />
      ) : view === "checkout" ? (
        <CheckoutPage
          items={cart}
          onBack={() => { setView("shop"); setCartOpen(true); }}
          onConfirm={() => setView("confirmation")}
        />
      ) : (
        <>
          {/* Hero */}
          {!search && (
            <section className="relative bg-primary overflow-hidden">
              <div className="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1400&h=400&fit=crop&auto=format"
                  alt="Fresh groceries at Nchi Supermarket"
                  className="w-full h-full object-cover opacity-20"
                />
              </div>
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <p className="text-primary-foreground/70 text-sm font-medium mb-1 tracking-wide uppercase">Welcome to</p>
                  <h1 className="text-white font-bold mb-3 leading-tight" style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
                    Nchi Supermarket
                  </h1>
                  <p className="text-primary-foreground/80 text-base mb-5 max-w-md">
                    Fresh produce, quality groceries, delivered to your door. Shop from Nairobi's favourite neighbourhood store.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-1.5 bg-white/15 text-white text-xs px-3 py-1.5 rounded-full">
                      <Truck size={12} /> Same-day delivery
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/15 text-white text-xs px-3 py-1.5 rounded-full">
                      <Tag size={12} /> Best prices guaranteed
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/15 text-white text-xs px-3 py-1.5 rounded-full">
                      <Clock size={12} /> Order by 8pm for today
                    </div>
                  </div>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1506617420156-8e4536971650?w=300&h=260&fit=crop&auto=format"
                  alt="Fresh vegetables basket"
                  className="w-56 h-48 object-cover rounded-2xl shadow-2xl flex-shrink-0 hidden sm:block"
                />
              </div>
            </section>
          )}

          {/* Category Bar */}
          <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex gap-1 overflow-x-auto scrollbar-hide py-3">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => { setActiveCategory(cat.id); setSearch(""); }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium flex-shrink-0 transition-all ${activeCategory === cat.id && !search ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-muted"}`}
                  >
                    <span>{cat.emoji}</span>
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            {loading && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
                <p className="text-sm text-muted-foreground mt-2">Loading products from database...</p>
              </div>
            )}
            
            {dbError && !loading && (
              <div className="text-center py-4 text-sm text-amber-600 bg-amber-50 rounded-xl mb-4">
                ⚠️ {dbError} - Showing sample products
              </div>
            )}

            {!loading && search && (
              <p className="text-sm text-muted-foreground mb-4">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""} for <strong>"{search}"</strong>
              </p>
            )}
            
            {!loading && !search && (
              <h2 className="text-xl font-bold text-foreground mb-4" style={{ fontFamily: "'Fraunces', serif" }}>
                {CATEGORIES.find((c) => c.id === activeCategory)?.label}
              </h2>
            )}
            
            {!loading && filtered.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <p className="text-4xl mb-3">🔍</p>
                <p className="font-semibold text-foreground">No items found</p>
                <p className="text-sm mt-1">Try a different search or category</p>
              </div>
            ) : (
              !loading && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                  {filtered.map((p) => {
                    const cartItem = cart.find((i) => i.id === p.id);
                    return (
                      <ProductCard
                        key={p.id}
                        product={p}
                        cartQty={cartItem?.qty ?? 0}
                        onAdd={() => addToCart(p)}
                        onRemove={() => removeFromCart(p.id)}
                      />
                    );
                  })}
                </div>
              )
            )}
          </main>

          {/* Footer */}
          <footer className="bg-foreground text-background mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
                    <Leaf size={14} className="text-primary-foreground" />
                  </div>
                  <span className="font-bold text-base" style={{ fontFamily: "'Fraunces', serif" }}>Nchi Supermarket</span>
                </div>
                <p className="text-sm text-background/60">Your trusted neighbourhood grocery store delivering fresh produce and quality goods across Nairobi.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-sm">Contact Us</h4>
                <div className="space-y-2 text-sm text-background/60">
                  <div className="flex items-center gap-2"><Phone size={13} /> +254 700 123 456</div>
                  <div className="flex items-center gap-2"><Mail size={13} /> hello@nchisuper.co.ke</div>
                  <div className="flex items-center gap-2"><MapPin size={13} /> Tom Mboya Street, Nairobi</div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-sm">Opening Hours</h4>
                <div className="space-y-1 text-sm text-background/60">
                  <div className="flex justify-between"><span>Mon – Fri</span><span>7:00 AM – 10:00 PM</span></div>
                  <div className="flex justify-between"><span>Saturday</span><span>7:00 AM – 10:00 PM</span></div>
                  <div className="flex justify-between"><span>Sunday</span><span>8:00 AM – 9:00 PM</span></div>
                </div>
              </div>
            </div>
            <div className="border-t border-background/10 max-w-7xl mx-auto px-4 sm:px-6 py-4 text-xs text-background/40 text-center">
              © 2025 Nchi Supermarket Ltd. All rights reserved.
            </div>
          </footer>
        </>
      )}
    </div>
  );
}