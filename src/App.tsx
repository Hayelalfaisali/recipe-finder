import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import Search from './pages/Search';
import Favorites from './pages/Favorites';
import MealPlanner from './pages/MealPlanner';
import RecipeDetail from './pages/RecipeDetail';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen w-full bg-gray-50">
          <nav className="w-full bg-white shadow-sm">
            <div className="w-full px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between items-center">
                <div className="flex items-center">
                  <Link to="/" className="text-2xl font-bold text-accent-600">
                    Recipe Finder
                  </Link>
                </div>
                <div className=" flex items-center space-x-4">
                  <Link to="/search" className="text-gray-600 hover:text-gray-900">Search</Link>
                  <Link to="/favorites" className="text-gray-600 hover:text-gray-900">Favorites</Link>
                  <Link to="/meal-planner" className="text-gray-600 hover:text-gray-900">Meal Planner</Link>
                </div>
              </div>
            </div>
          </nav>

          <main className="w-full">
            <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/meal-planner" element={<MealPlanner />} />
                <Route path="/recipe/:id" element={<RecipeDetail />} />
              </Routes>
            </div>
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
}
