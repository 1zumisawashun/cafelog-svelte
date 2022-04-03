import { writable } from 'svelte/store';

const shopStore = writable<any>(null);

export { shopStore };
