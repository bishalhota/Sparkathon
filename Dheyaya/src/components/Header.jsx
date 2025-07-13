import React, { useState } from 'react';
import { Search, ShoppingCart, User, Leaf, Menu, X, LogOut, Gift, Award } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useUser } from '../contexts/UserContext';
import { AuthModal } from './AuthModal';
import { RewardsModal } from './RewardsModal';

export const Header = ({ onCartClick }) => {
  const { itemCount } = useCart();
  const { carbonCredits, user, logout } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRewardsModalOpen, setIsRewardsModalOpen] = useState(false);

  const handleAuthSuccess = (userData) => {
    // User context will handle the authentication state
    console.log('User authenticated:', userData);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const handleRewardRedeemed = (reward) => {
    console.log('Reward redeemed:', reward);
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Top bar */}
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Leaf className="w-8 h-8 text-green-600" />
                <span className="text-2xl font-bold text-gray-900">EcoMart</span>
              </div>
              
              {/* Desktop Navigation */}
              <nav className="hidden lg:flex space-x-8">
                <a href="#" className="text-gray-700 hover:text-green-600 font-medium transition-colors">Categories</a>
                <a href="#" className="text-gray-700 hover:text-green-600 font-medium transition-colors">Deals</a>
                <a href="#" className="text-gray-700 hover:text-green-600 font-medium transition-colors">Eco-Friendly</a>
                <a href="#" className="text-gray-700 hover:text-green-600 font-medium transition-colors">New Arrivals</a>
              </nav>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-8 hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for eco-friendly products..."
                  className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-6">
              {/* Carbon Credits */}
              <div className="hidden sm:flex items-center space-x-3">
                <button 
                  onClick={() => setIsRewardsModalOpen(true)}
                  className="flex items-center space-x-2 bg-emerald-50 hover:bg-emerald-100 px-3 py-1 rounded-full transition-colors group"
                >
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-medium">{carbonCredits.toLocaleString()}</span>
                  <span className="text-emerald-600 text-sm">Credits</span>
                  <Gift className="w-3 h-3 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>

              {/* Account */}
              <div className="relative">
                {user ? (
                  <div className="flex items-center space-x-2">
                    <span className="hidden sm:inline text-sm text-gray-700">
                      Hi, {user.full_name || user.email?.split('@')[0]}
                    </span>
                    <button 
                      onClick={handleLogout}
                      className="p-2 text-gray-700 hover:text-green-600 transition-colors"
                      title="Logout"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setIsAuthModalOpen(true)}
                    className="p-2 text-gray-700 hover:text-green-600 transition-colors"
                  >
                    <User className="w-6 h-6" />
                  </button>
                )}
              </div>

              {/* Cart */}
              <button 
                onClick={onCartClick}
                className="relative p-2 text-gray-700 hover:text-green-600 transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button 
                className="lg:hidden p-2 text-gray-700 hover:text-green-600"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 py-4">
              <nav className="flex flex-col space-y-4">
                <a href="#" className="text-gray-700 hover:text-green-600 font-medium">Categories</a>
                <a href="#" className="text-gray-700 hover:text-green-600 font-medium">Deals</a>
                <a href="#" className="text-gray-700 hover:text-green-600 font-medium">Eco-Friendly</a>
                <a href="#" className="text-gray-700 hover:text-green-600 font-medium">New Arrivals</a>
                
                <div className="space-y-2">
                  <button 
                    onClick={() => setIsRewardsModalOpen(true)}
                    className="flex items-center space-x-2 bg-emerald-50 hover:bg-emerald-100 px-3 py-2 rounded-full w-fit transition-colors"
                  >
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700 font-medium">{carbonCredits.toLocaleString()}</span>
                    <span className="text-emerald-600 text-sm">Credits</span>
                    <Gift className="w-3 h-3 text-emerald-500" />
                  </button>
                  
                  {/* Mobile Carbon Savings */}
                  <CarbonSavingsWidget />
                </div>
                
                {user && (
                  <button 
                    onClick={handleLogout}
                    className="text-left text-gray-700 hover:text-green-600 font-medium"
                  >
                    Logout
                  </button>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
      
      <RewardsModal 
        isOpen={isRewardsModalOpen}
        onClose={() => setIsRewardsModalOpen(false)}
        onRewardRedeemed={handleRewardRedeemed}
      />
    </>
  );
};