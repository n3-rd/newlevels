// // page.server.ts
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   updateProfile,
// } from "firebase/auth";
// import { getFirebaseErrorMessage } from "$lib/helpers/FirebaseErrors";

// export async function post(request) {
//   const { email, password, name } = request.body;
//   const auth = getAuth();

//   try {
//     await createUserWithEmailAndPassword(auth, email, password);
//     await updateProfile(auth.currentUser, { displayName: name });
//     return {
//       status: 200,
//       body: {
//         message: "Account created successfully",
//       },
//     };
//   } catch (error) {
//     const errorMessage = getFirebaseErrorMessage(error.code);
//     return {
//       status: 500,
//       body: {
//         message: errorMessage,
//       },
//     };
//   }
// }