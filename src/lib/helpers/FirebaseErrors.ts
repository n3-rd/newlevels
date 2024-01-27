export function getFirebaseErrorMessage(errorCode: string): string {
    switch (errorCode) {
        case 'auth/invalid-email':
            return 'Invalid email.';
        case 'auth/user-disabled':
            return 'This user has been disabled.';
        case 'auth/user-not-found':
            return 'No user found with this email.';
        case 'auth/wrong-password':
            return 'Incorrect password.';
        case 'auth/popup-closed-by-user':
            return 'The popup has been closed before authentication could complete.';
        case 'auth/cancelled-popup-request':
            return 'Cancelled popup request.';
        case 'auth/popup-blocked':
            return 'The popup has been blocked by the browser.';
        case 'auth/operation-not-allowed':
            return 'Sign in with Google is not allowed.';
        case 'auth/invalid-credential':
            return 'Invalid credentials.';
        default:
            return 'An unknown error occurred.';
    }
}