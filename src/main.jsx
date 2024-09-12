import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './reset.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Router from './shared/Router';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  </StrictMode>
);
