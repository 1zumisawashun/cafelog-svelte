import App from './App.svelte';
import './assets/scss/app.scss';

const app = new App({
  target: document.body,
  props: {
    ready: false,
  },
});
interface GMapWindow extends Window {
  initMap: any;
}

declare const window: GMapWindow;

window.initMap = function ready() {
  app.$set({ ready: true });
};

export default app;
