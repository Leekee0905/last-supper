import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './reset.css';
import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import Router from './shared/Router';
import LoadingModal from './components/LoadingModal';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10
    }
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<LoadingModal />}>
        <Router />
      </Suspense>
    </QueryClientProvider>
  </StrictMode>
);
