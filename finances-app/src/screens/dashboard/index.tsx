// src/screens/dashboard/index.tsx
import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTransactions } from "../../context/TransactionContext";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";
import Feather from "react-native-vector-icons/Feather";

export default function Dashboard() {
    const { saldo, totalEntradas, totalSaidas } = useTransactions();
    const { logout } = useAuth();
    const navigation = useNavigation();

    return (
        <View style={styles.container}>

            {/* header com log out  */}
            <View style={styles.header}>
                <Text style={styles.title}>Dashboard</Text>

                <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                    <Feather name="log-out" size={24} color="#e53935" />
                </TouchableOpacity>
            </View>

            <View style={styles.card}>
                <Text style={styles.label}>Saldo Atual</Text>
                <Text style={styles.value}>R$ {saldo.toFixed(2)}</Text>
            </View>

            <View style={styles.row}>
                <View style={styles.smallCard}>
                    <Text style={styles.label}>Entradas</Text>
                    <Text style={styles.valueSmall}>R$ {totalEntradas.toFixed(2)}</Text>
                </View>

                <View style={styles.smallCard}>
                    <Text style={styles.label}>Saídas</Text>
                    <Text style={styles.valueSmall}>R$ {totalSaidas.toFixed(2)}</Text>
                </View>
            </View>

            <TouchableOpacity
                onPress={() => navigation.navigate("AddTransaction" as never)}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Adicionar Transação</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate("Transactions" as never)}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Ver Histórico</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#f4f4f4" },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },

    title: { fontSize: 24, fontWeight: "bold" },

    logoutButton: {
        padding: 5,
    },

    card: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    smallCard: {
        backgroundColor: "#fff",
        flex: 1,
        padding: 15,
        margin: 5,
        borderRadius: 10,
    },
    row: { flexDirection: "row", justifyContent: "space-between" },
    label: { fontSize: 16, color: "#555" },
    value: { fontSize: 26, fontWeight: "bold", marginTop: 5 },
    valueSmall: { fontSize: 20, fontWeight: "bold", marginTop: 5 },

    button: {
        backgroundColor: "#1e88e5",
        padding: 15,
        borderRadius: 10,
        marginTop: 15,
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
    },
});
