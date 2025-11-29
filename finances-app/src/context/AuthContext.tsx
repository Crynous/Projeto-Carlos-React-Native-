// src/context/AuthContext.tsx
import React, { createContext, useContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../services/api/firebase";

interface UserData {
  uid: string;
  name: string;
  email: string;
}

interface AuthContextData {
  user: UserData | null;
  loading: boolean;

  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);

  async function login(email: string, password: string) {
    setLoading(true);

    const response = await signInWithEmailAndPassword(auth, email, password);

    setUser({
      uid: response.user.uid,
      name: response.user.displayName ?? "",
      email: response.user.email ?? "",
    });

    setLoading(false);
  }

  async function register(name: string, email: string, password: string) {
    setLoading(true);

    const response = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(response.user, { displayName: name });

    setUser({
      uid: response.user.uid,
      name,
      email,
    });

    setLoading(false);
  }

  async function logout() {
    await signOut(auth);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
