import { useState } from 'react';

interface RegisterProps {
  onSwitchToLogin: () => void;
}

export default function Register({ onSwitchToLogin }: RegisterProps) {
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

    // Validation
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
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-10 h-10 bg-[#1a6b30] rounded-xl flex items-center justify-center">
              <span className="text-white text-xl">🛒</span>
            </div>
            <span className="text-2xl font-bold text-[#1a2e1c]">
              Nchi <span className="text-[#1a6b30]">Super</span>
            </span>
          </div>
          <h2 className="text-2xl font-bold text-[#1a2e1c]">Create Account</h2>
          <p className="text-gray-500 text-sm mt-1">Join Nnchi Supermarket today!</p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 text-green-600 text-sm p-3 rounded-xl mb-4 border border-green-200">
            ✅ {success}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-4 border border-red-200">
            ❌ {error}
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#1a2e1c] mb-1">
              Full Name
            </label>
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
            <label className="block text-sm font-semibold text-[#1a2e1c] mb-1">
              Email Address
            </label>
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
            <label className="block text-sm font-semibold text-[#1a2e1c] mb-1">
              Password
            </label>
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
            <label className="block text-sm font-semibold text-[#1a2e1c] mb-1">
              Confirm Password
            </label>
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
            <button
              onClick={onSwitchToLogin}
              className="text-[#1a6b30] font-semibold hover:underline"
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}