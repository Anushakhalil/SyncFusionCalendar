import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('#your-key');

const container = document.getElementById('schedule');
const root = createRoot(container);
root.render(<App />);