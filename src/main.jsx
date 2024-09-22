import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './reset.css';
import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import Router from './shared/Router';
import LoadingModal from './components/LoadingModal';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AlertProvider from './styles/CustomAlert/AlertProvider';
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
      <AlertProvider>
        <Suspense fallback={<LoadingModal />}>
          <ReactQueryDevtools />
          <Router />
        </Suspense>
      </AlertProvider>
    </QueryClientProvider>
  </StrictMode>
);