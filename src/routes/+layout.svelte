<script lang="ts">
	import '../app.pcss';
	import { SvelteToast } from '@zerodevx/svelte-toast';

	import { FirebaseApp } from 'sveltefire';
	import { initializeApp } from 'firebase/app';
	import { getFirestore } from 'firebase/firestore';
	import { getAuth } from 'firebase/auth';
	import { firebaseConfig } from '$lib/firebase';

	// Initialize Firebase
	const app = initializeApp(firebaseConfig);
	const firestore = getFirestore(app);
	const auth = getAuth(app);

	const options = {
		reversed: true,
		intro: { y: 192 }
	};
</script>

<SvelteToast {options} />

<FirebaseApp {auth} {firestore}>
	<slot />
</FirebaseApp>
