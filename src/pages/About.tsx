import { useState } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

export function About() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Smart Price Tracker</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your ultimate destination for finding the best deals across multiple e-commerce platforms
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              At Smart Price Tracker, we believe that everyone deserves to get the best value for their money.
              We've built a platform that makes it incredibly easy to compare prices across major e-commerce
              platforms in real-time.
            </p>
            <p className="text-gray-700 mb-4">
              Our intelligent price tracking system monitors thousands of products daily, ensuring you never
              miss out on the best deals. Whether you're shopping on Amazon, Flipkart, or Myntra, we've got
              you covered.
            </p>
            <p className="text-gray-700">
              We're committed to transparency, accuracy, and helping you make informed purchasing decisions.
              Save time, save money, and shop smarter with Smart Price Tracker.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md p-8 text-white">
            <h2 className="text-2xl font-bold mb-6">Why Choose Us?</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-white bg-opacity-20 rounded-lg p-2 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Real-Time Price Comparison</h3>
                  <p className="text-blue-100">
                    Get instant access to current prices across all major platforms
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-white bg-opacity-20 rounded-lg p-2 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Price History Tracking</h3>
                  <p className="text-blue-100">
                    View historical price trends to make better buying decisions
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-white bg-opacity-20 rounded-lg p-2 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">User Reviews</h3>
                  <p className="text-blue-100">
                    Read authentic reviews from verified users
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-white bg-opacity-20 rounded-lg p-2 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Best Deals Alert</h3>
                  <p className="text-blue-100">
                    Never miss out on trending products and exclusive offers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 lg:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h2>
              <p className="text-gray-700 mb-8">
                Have questions or feedback? We'd love to hear from you. Send us a message and we'll
                respond as soon as possible.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">support@smartpricetracker.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">+91 1800-123-4567</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium text-gray-900">Mumbai, Maharashtra, India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 lg:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Your message..."
                  />
                </div>

                {submitted && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-600">Thank you! Your message has been sent.</p>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Send Message</span>
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
