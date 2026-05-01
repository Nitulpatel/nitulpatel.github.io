import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Root element not found');
  document.body.innerHTML = '<div style="color: red; padding: 20px;">Error: Root element not found</div>';
} else {
  try {
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  } catch (error) {
    console.error('Failed to render app:', error);
    rootElement.innerHTML = `<div style="color: #888; padding: 20px; text-align: center;">
      <h1 style="color: #ff4747;">Error Loading Portfolio</h1>
      <p>Check browser console for details</p>
    </div>`;
  }
}
