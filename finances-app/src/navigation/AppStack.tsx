// src/navigation/AppStack.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Dashboard from "../screens/dashboard";
import AddTransaction from "../screens/addTransaction";
import Transactions from "../screens/transactions";

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
        </Stack.Navigator>
    );
}
