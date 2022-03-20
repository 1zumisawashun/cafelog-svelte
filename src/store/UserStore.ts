import type { firebase } from '../firebase/config';
import { writable } from 'svelte/store';

const UserStore = writable<firebase.User | null>(null);

export { UserStore };
