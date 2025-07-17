import { createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom';
import App from '../App';
import { lazy, Suspense } from 'react';
import { LoadingSpinner } from '@components/ui';

// Lazy load pages for better performance
const HomePage = lazy(() => import('../pages/Home.tsx'));
const AboutPage = lazy(() => import('../pages/About.tsx'));
const NotFoundPage = lazy(() => import('../pages/NotFound.tsx'));

// Create a loading component for Suspense fallback
const Loader = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <LoadingSpinner size="lg" />
  </div>
);

// Create the router configuration
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        index
        element={
          <Suspense fallback={<Loader />}>
            <HomePage />
          </Suspense>
        }
      />
      <Route
        path="about"
        element={
          <Suspense fallback={<Loader />}>
            <AboutPage />
          </Suspense>
        }
      />
      <Route
        path="404"
        element={
          <Suspense fallback={<Loader />}>
            <NotFoundPage />
          </Suspense>
        }
      />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Route>
  )
);
