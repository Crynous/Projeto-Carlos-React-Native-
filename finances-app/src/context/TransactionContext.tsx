// src/context/TransactionContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import { firestore } from "../services/api/firebase";
import { useAuth } from "./AuthContext";

export interface Transaction {
  id: string;
  desc: string;
  type: "entrada" | "saida";
  value: number;
  createdAt: number;
}

interface TransactionContextData {
  transactions: Transaction[];
  saldo: number;
  totalEntradas: number;
  totalSaidas: number;

  addTransaction: (desc: string, type: "entrada" | "saida", value: number) => Promise<void>;
  updateTransaction: (id: string, data: Partial<Transaction>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
}

const TransactionContext = createContext<TransactionContextData>({} as any);

export const TransactionProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // 🔥 Ouve as transações em tempo real
  useEffect(() => {
    if (!user) return;

    const ref = collection(firestore, "transactions");
    const q = query(ref, where("uid", "==", user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list: Transaction[] = [];

      snapshot.forEach((docItem) => {
        list.push({ id: docItem.id, ...(docItem.data() as any) });
      });

      setTransactions(list);
    });

    return () => unsubscribe();
  }, [user]);

  async function addTransaction(desc: string, type: "entrada" | "saida", value: number) {
    if (!user) return;

    const ref = collection(firestore, "transactions");

    await addDoc(ref, {
      uid: user.uid,
      desc,
      type,
      value,
      createdAt: Date.now(),
    });
  }

  async function updateTransaction(id: string, data: Partial<Transaction>) {
    const ref = doc(firestore, "transactions", id);
    await updateDoc(ref, data);
  }

  async function deleteTransaction(id: string) {
    const ref = doc(firestore, "transactions", id);
    await deleteDoc(ref);
  }

  // 🔢 Cálculos seguros (nunca retornam undefined)
  const totalEntradas = transactions
    .filter((t) => t.type === "entrada")
    .reduce((acc, item) => acc + Number(item.value || 0), 0);

  const totalSaidas = transactions
    .filter((t) => t.type === "saida")
    .reduce((acc, item) => acc + Number(item.value || 0), 0);

  const saldo = totalEntradas - totalSaidas;

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        saldo,
        totalEntradas,
        totalSaidas,
        addTransaction,
        updateTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export function useTransactions() {
  return useContext(TransactionContext);
}
