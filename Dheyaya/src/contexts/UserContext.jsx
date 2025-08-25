import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [carbonCredits, setCarbonCredits] = useState(250); // Starting with demo credits (₹10 per credit)
  const [redeemedRewards, setRedeemedRewards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load user data from localStorage on mount
  useEffect(() => {
    setIsLoading(true);
    const savedUser = localStorage.getItem('user');
    const savedCredits = localStorage.getItem('carbonCredits');
    const savedRewards = localStorage.getItem('redeemedRewards');
    
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        // Update carbon credits from saved user data if available
        if (parsedUser.carbon_credits) {
          setCarbonCredits(parsedUser.carbon_credits);
        }
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('user');
      }
    } else {
      // Create demo user
      const demoUser = {
        id: 'demo-user',
        email: 'demo@ecomart.com',
        full_name: 'Demo User',
        carbon_credits: 250
      };
      setUser(demoUser);
      localStorage.setItem('user', JSON.stringify(demoUser));
    }
    
    if (savedCredits) {
      try {
        const credits = parseInt(savedCredits);
        if (!isNaN(credits)) {
          setCarbonCredits(credits);
        }
      } catch (error) {
        console.error('Error parsing saved credits:', error);
      }
    }
    
    if (savedRewards) {
      try {
        setRedeemedRewards(JSON.parse(savedRewards));
      } catch (error) {
        console.error('Error parsing saved rewards:', error);
        setRedeemedRewards([]);
      }
    }
    
    setIsLoading(false);
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (user && !isLoading) {
      localStorage.setItem('user', JSON.stringify({ 
        ...user, 
        carbon_credits: carbonCredits 
      }));
      localStorage.setItem('carbonCredits', carbonCredits.toString());
      localStorage.setItem('redeemedRewards', JSON.stringify(redeemedRewards));
    }
  }, [user, carbonCredits, redeemedRewards, isLoading]);
  
  const addCarbonCredits = (amount) => {
    if (typeof amount !== 'number' || isNaN(amount)) {
      console.error('Invalid amount for adding carbon credits:', amount);
      return;
    }
    setCarbonCredits(prev => prev + amount);
  };
  
  const spendCarbonCredits = (amount) => {
    if (typeof amount !== 'number' || isNaN(amount)) {
      console.error('Invalid amount for spending carbon credits:', amount);
      return false;
    }
    if (carbonCredits >= amount) {
      setCarbonCredits(prev => prev - amount);
      return true;
    }
    return false;
  };

  const addRedeemedReward = (reward) => {
    if (!reward || !reward.id) {
      console.error('Invalid reward object:', reward);
      return;
    }
    setRedeemedRewards(prev => [...prev, reward]);
  };

  const login = (email, name) => {
    if (!email || !name) {
      console.error('Invalid login parameters:', { email, name });
      return;
    }
    const newUser = {
      id: Date.now().toString(),
      email,
      full_name: name,
      carbon_credits: carbonCredits
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
    setCarbonCredits(0);
    setRedeemedRewards([]);
    localStorage.removeItem('user');
    localStorage.removeItem('carbonCredits');
    localStorage.removeItem('redeemedRewards');
    
    // Reset to demo user after logout
    setTimeout(() => {
      const demoUser = {
        id: 'demo-user',
        email: 'demo@ecomart.com',
        full_name: 'Demo User',
        carbon_credits: 250
      };
      setUser(demoUser);
      setCarbonCredits(250);
      localStorage.setItem('user', JSON.stringify(demoUser));
      localStorage.setItem('carbonCredits', '250');
    }, 100);
  };

  return (
    <UserContext.Provider value={{
      user,
      carbonCredits,
      addCarbonCredits,
      spendCarbonCredits,
      redeemedRewards,
      addRedeemedReward,
      isLoggedIn: !!user,
      isLoading,
      login,
      logout
    }}>
      {children}
    </UserContext.Provider>
  );
};