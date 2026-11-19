import '@mantine/core/styles.css';
import './styles/global.css';

import { MantineProvider } from '@mantine/core';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('No se encontró el elemento raíz de la aplicación.');
}

createRoot(rootElement).render(
  <StrictMode>
    <MantineProvider
      defaultColorScheme="dark"
      theme={{
        fontFamily:
          '"Avenir Next", "Segoe UI Variable", "Segoe UI", "Trebuchet MS", sans-serif',
        headings: {
          fontFamily:
            '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif',
          fontWeight: '600',
        },
        primaryColor: 'yellow',
        defaultRadius: 'md',
      }}
    >
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </MantineProvider>
  </StrictMode>,
);
