// Entry point for SSG build only
import { ViteSSG } from 'vite-ssg/single-page';
import App from './App';

// Simple SSG setup that works with existing React Router
export const createApp = ViteSSG(App);