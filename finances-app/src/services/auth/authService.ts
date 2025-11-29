// src/services/auth/authService.ts
export async function firebaseLogin(email: string, password: string) {
    // depois substituímos isso por:
    // signInWithEmailAndPassword(auth, email, password)
    return { id: "TEMP_ID", name: "Temp User", email };
}

export async function firebaseRegister(name: string, email: string, password: string) {
    return { id: "TEMP_ID", name, email };
}

export async function firebaseLogout() {
    return true;
}
