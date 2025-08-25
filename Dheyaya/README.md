# EcoMart - E-commerce with Carbon Credit System

A modern e-commerce platform focused on eco-friendly products with an integrated carbon credit system.

## Features

- **Product Catalog**: Browse eco-friendly products with carbon ratings
- **Carbon Rating System**: Products rated 1-5 based on environmental impact
- **Carbon Credits**: Earn credits by contributing to carbon offsetting
- **Alternative Suggestions**: Get eco-friendly alternatives for high-impact products
- **Rewards System**: Redeem carbon credits for exclusive rewards
- **Carbon Savings Tracking**: Track your environmental impact

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the Dheyaya folder
3. Install dependencies:
   ```bash
   npm install
   ```

### Environment Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. **Option 1: With Supabase (Recommended)**
   - Create a Supabase project at [supabase.com](https://supabase.com)
   - Get your project URL and anon key
   - Update `.env` with your credentials:
     ```
     VITE_SUPABASE_URL=your_supabase_project_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```
   - Run the database migrations from the `supabase/migrations` folder

3. **Option 2: Demo Mode**
   - Leave the `.env` file empty or don't create it
   - The app will run in demo mode with mock data
   - Authentication will work with any email/password combination

### Running the Application

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Authentication

### With Supabase
- Full authentication with email/password
- User profiles stored in database
- Persistent sessions

### Demo Mode
- Works with any email/password combination
- Data stored in localStorage
- Perfect for testing and development

## Database Schema

The application uses the following main tables:
- `users` - User profiles and carbon credits
- `products` - Product catalog with carbon ratings
- `categories` - Product categories
- `cart_items` - Shopping cart functionality
- `orders` - Order management
- `carbon_savings` - Track environmental impact
- `carbon_credits` - Credit transactions

## Carbon Credit System

- Earn 1 credit for every ₹10 spent on carbon offsetting
- Credits can be redeemed for rewards like discounts, free shipping, etc.
- Track your carbon savings from eco-friendly purchases

## Technologies Used

- **Frontend**: React, Tailwind CSS, Vite
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Icons**: Lucide React
- **State Management**: React Context

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.