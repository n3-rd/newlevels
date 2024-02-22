import { writable } from "svelte/store";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

function authStore() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let unsubscribe: any;

  if (!auth || !globalThis.window) {
    console.warn("Auth is not initialized or not in browser");
    const { subscribe } = writable(null);
    return {
      subscribe,
    };
  }
  const { subscribe } = writable(auth.currentUser ?? null, (set) => {
    unsubscribe = onAuthStateChanged(auth, (user) => {
      set(user);
      console.log("store user", user)
    });

    return () => unsubscribe();
  });
  return {
    subscribe,
  };
}

export const user = authStore()