import type { firebase } from '../firebase/config';
import { writable } from 'svelte/store';

const authStore = writable<firebase.User | null>(null);

export { authStore };
