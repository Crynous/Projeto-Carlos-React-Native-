// src/App.tsx
import * as React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { TransactionProvider } from "./src/context/TransactionContext";
import { AuthProvider } from "./src/context/AuthContext";
import { GoalsProvider } from "./src/context/GoalsContext";

export default function App() {
  return (
    <AuthProvider>
      <TransactionProvider>
        <GoalsProvider>
          <AppNavigator />
        </GoalsProvider>
      </TransactionProvider>
    </AuthProvider>
  );
}
