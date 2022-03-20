import App from './App.svelte';
import './assets/scss/app.scss';
import './middleware/auth';

const app = new App({
  target: document.body,
  props: {
    // name: 'world',
  },
});

export default app;
