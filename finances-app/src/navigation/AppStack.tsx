// src/navigation/AppStack.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Dashboard from "../screens/dashboard";
import AddTransaction from "../screens/addTransaction";
import Transactions from "../screens/transactions";
import TransactionDetails from "../screens/transactionDetails";
import Goals from "../screens/goals";
import GoalDetails from "../screens/goalDetails";
import ProfileScreen from "../screens/profile";

const Stack = createNativeStackNavigator();

export default function AppStack() {
    return (
        <Stack.Navigator initialRouteName="Dashboard">
            <Stack.Screen
                name="Dashboard"
                component={Dashboard}
                options={{ title: "Visão Geral" }}
            />
            <Stack.Screen
                name="AddTransaction"
                component={AddTransaction}
                options={{ title: "Nova Transação" }}
            />
            <Stack.Screen
                name="Transactions"
                component={Transactions}
                options={{ title: "Histórico" }}
            />
            <Stack.Screen
                name="TransactionDetails"
                component={TransactionDetails}
                options={{ title: "Detalhes da Transação" }}
            />
            <Stack.Screen
                name="Goals"
                component={Goals}
                options={{ title: "Objetivos Financeiros" }}
            />
            <Stack.Screen
                name="GoalDetails"
                component={GoalDetails}
                options={{ title: "Detalhes do Objetivo" }}
            />
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ title: "Perfil" }}
            />
        </Stack.Navigator>
    );
}
