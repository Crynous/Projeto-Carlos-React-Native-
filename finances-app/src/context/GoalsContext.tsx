// src/context/GoalsContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    where,
    increment,
} from "firebase/firestore";
import { firestore } from "../services/api/firebase";
import { useAuth } from "./AuthContext";

export interface Goal {
    id: string;
    uid: string;
    title: string;
    targetValue: number;
    currentValue: number;
    createdAt: number;
}

interface GoalsContextData {
    goals: Goal[];
    addGoal: (title: string, target: number, initial?: number) => Promise<void>;
    updateGoal: (id: string, data: Partial<Goal>) => Promise<void>;
    addToGoal: (id: string, amount: number) => Promise<void>;
    deleteGoal: (id: string) => Promise<void>;
}

const GoalsContext = createContext<GoalsContextData>({} as GoalsContextData);

export const GoalsProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();
    const [goals, setGoals] = useState<Goal[]>([]);

    useEffect(() => {
        if (!user) {
            setGoals([]);
            return;
        }

        const ref = collection(firestore, "goals");
        const q = query(ref, where("uid", "==", user.uid));

        const unsub = onSnapshot(q, (snapshot) => {
            const list: Goal[] = [];
            snapshot.forEach((d) => {
                list.push({ id: d.id, ...(d.data() as any) });
            });
            setGoals(list);
        });

        return () => unsub();
    }, [user]);

    async function addGoal(title: string, target: number, initial = 0) {
        if (!user) return;
        const ref = collection(firestore, "goals");
        await addDoc(ref, {
            uid: user.uid,
            title,
            targetValue: target,
            currentValue: initial,
            createdAt: Date.now(),
        });
    }

    async function updateGoal(id: string, data: Partial<Goal>) {
        const ref = doc(firestore, "goals", id);
        await updateDoc(ref, data as any);
    }

    async function addToGoal(id: string, amount: number) {
        // Usa increment para evitar race conditions
        const ref = doc(firestore, "goals", id);
        await updateDoc(ref, { currentValue: increment(amount) as any });
    }

    async function deleteGoal(id: string) {
        const ref = doc(firestore, "goals", id);
        await deleteDoc(ref);
    }

    return (
        <GoalsContext.Provider value={{ goals, addGoal, updateGoal, addToGoal, deleteGoal }}>
            {children}
        </GoalsContext.Provider>
    );
};

export function useGoals() {
    return useContext(GoalsContext);
}
