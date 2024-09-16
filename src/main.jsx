import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './reset.css';
import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import Router from './shared/Router';
import LoadingModal from './components/SuspenseModal';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<LoadingModal />}>
        <Router />
      </Suspense>
    </QueryClientProvider>
  </StrictMode>
);
