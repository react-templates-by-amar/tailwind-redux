import { Outlet, Link } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';
import '@/styles/globals.css';

function App() {
  return (
    <div className="bg-background text-foreground min-h-screen transition-colors duration-300">
      <header className="border-b border-foreground/10">
        <div className="container mx-auto px-4">
          <nav className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link to="/" className="text-xl font-bold">
                React Template
              </Link>
              <div className="hidden md:flex gap-6">
                <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors">
                  Home
                </Link>
                <Link to="/about" className="text-foreground/80 hover:text-foreground transition-colors">
                  About
                </Link>
              </div>
            </div>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-foreground/10 py-6">
        <div className="container mx-auto px-4 text-center text-foreground/60 text-sm">
          © {new Date().getFullYear()} React Template. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
