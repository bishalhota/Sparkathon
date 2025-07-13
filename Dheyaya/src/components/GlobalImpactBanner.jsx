import React, { useState, useEffect } from 'react';
import { Leaf, Users, TreePine, Award, TrendingUp, Globe, ChevronDown, ChevronUp } from 'lucide-react';
import { getGlobalImpactStats } from '../lib/database';

export const GlobalImpactBanner = () => {
  const [stats, setStats] = useState({
    total_carbon_saved_kg: 1247.5,
    total_eco_purchases: 3420,
    total_customers_helped: 892,
    trees_equivalent: 62
  });
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    fetchGlobalStats();
  }, []);

  const fetchGlobalStats = async () => {
    try {
      const data = await getGlobalImpactStats();
      setStats(data);
    } catch (error) {
      console.log('Using demo stats - Supabase not connected');
      // Keep default demo stats
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  };

  return (
    <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 mb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Compact Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Globe className="w-6 h-6" />
            <div>
              <h2 className="text-xl font-bold">EcoMart Global Impact</h2>
              <p className="text-green-100 text-sm">Making a difference together</p>
            </div>
          </div>
          
          {/* Carbon Credits Tab */}
          <div className="flex items-center space-x-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center space-x-3">
              <Award className="w-5 h-5" />
              <div className="text-center">
                <div className="text-lg font-bold">2.5K</div>
                <div className="text-xs text-green-100">Credits Earned</div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center space-x-3">
              <Leaf className="w-5 h-5" />
              <div className="text-center">
                <div className="text-lg font-bold">{formatNumber(stats.total_carbon_saved_kg)}kg</div>
                <div className="text-xs text-green-100">CO₂ Saved</div>
              </div>
            </div>
            
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-2 hover:bg-white/20 transition-colors"
            >
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="mt-6 animate-slide-in-right">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Carbon Saved */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Leaf className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold mb-1">
                  {formatNumber(stats.total_carbon_saved_kg)}kg
                </div>
                <div className="text-green-100 text-sm">
                  Carbon Emissions Saved
                </div>
                <div className="text-xs text-green-200 mt-1">
                  Through eco-friendly purchases
                </div>
              </div>

              {/* Carbon Credits */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold mb-1">
                  2.5K
                </div>
                <div className="text-green-100 text-sm">
                  Carbon Credits Earned
                </div>
                <div className="text-xs text-green-200 mt-1">
                  ₹10 per credit from offsetting
                </div>
              </div>

              {/* Eco Purchases */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold mb-1">
                  {formatNumber(stats.total_eco_purchases)}
                </div>
                <div className="text-green-100 text-sm">
                  Eco-Friendly Purchases
                </div>
                <div className="text-xs text-green-200 mt-1">
                  Products with 4.0+ carbon rating
                </div>
              </div>

              {/* Customers Helped */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold mb-1">
                  {formatNumber(stats.total_customers_helped)}
                </div>
                <div className="text-green-100 text-sm">
                  Eco-Conscious Customers
                </div>
                <div className="text-xs text-green-200 mt-1">
                  Making sustainable choices
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-2xl mx-auto">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Award className="w-5 h-5" />
                  <span className="text-lg font-semibold">Join the Movement</span>
                </div>
                <p className="text-green-100 mb-3 text-sm">
                  Every eco-friendly purchase and carbon offset contribution helps reduce global emissions. 
                  Earn ₹10 worth of credits for every ₹10 spent on offsetting!
                </p>
                <div className="flex items-center justify-center space-x-4 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                    <span>Real-time impact tracking</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                    <span>Verified carbon savings</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                    <span>Community impact</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};