// finances-app/App.tsx
import * as React from 'react'
import AppNavigator from './src/navigation/AppNavigator';
import { TransactionProvider } from './src/context/TransactionContext';
import { AuthProvider } from './src/context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <TransactionProvider>
        <AppNavigator />
      </TransactionProvider>
    </AuthProvider>
  );
}
