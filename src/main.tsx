import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import './index.css'
import { ThemeProvider } from "@/components/theme-provider"
import Router from './router'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const queryClient = new QueryClient();   


ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Router/>
        <ReactQueryDevtools/>
      </QueryClientProvider>
    </React.StrictMode>
  </ThemeProvider>
)
