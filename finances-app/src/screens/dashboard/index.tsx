// src/screens/dashboard/index.tsx
import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useTransactions } from "../../context/TransactionContext";
import { useGoals } from "../../context/GoalsContext";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";
import Feather from "react-native-vector-icons/Feather";

export default function Dashboard() {
    const { saldo, totalEntradas, totalSaidas } = useTransactions();
    const { goals } = useGoals();
    const { logout } = useAuth();
    const navigation = useNavigation<any>();

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>

            {/* Header com logout e perfil */}
            <View style={styles.header}>
                <Text style={styles.title}>Dashboard</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity
                        style={[styles.headerButton, { marginRight: 10 }]}
                        onPress={() => navigation.navigate("Profile")}
                    >
                        <Feather name="user" size={24} color="#1e88e5" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.headerButton} onPress={logout}>
                        <Feather name="log-out" size={24} color="#e53935" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Saldo geral */}
            <View style={styles.card}>
                <Text style={styles.label}>Saldo Atual</Text>
                <Text style={styles.value}>R$ {saldo.toFixed(2)}</Text>
            </View>

            {/* Entradas e Saídas */}
            <View style={styles.row}>
                <View style={[styles.smallCard, { borderLeftColor: "#2e7d32", borderLeftWidth: 6 }]}>
                    <Text style={styles.label}>Entradas</Text>
                    <Text style={[styles.valueSmall, { color: "#2e7d32" }]}>R$ {totalEntradas.toFixed(2)}</Text>
                </View>

                <View style={[styles.smallCard, { borderLeftColor: "#c62828", borderLeftWidth: 6 }]}>
                    <Text style={styles.label}>Saídas</Text>
                    <Text style={[styles.valueSmall, { color: "#c62828" }]}>R$ {totalSaidas.toFixed(2)}</Text>
                </View>
            </View>

            {/* Botões de transação */}
            <TouchableOpacity
                onPress={() => navigation.navigate("AddTransaction")}
                style={[styles.button, styles.addButton]}
            >
                <Feather name="plus" size={18} color="#fff" style={{ marginRight: 6 }} />
                <Text style={styles.buttonText}>Adicionar Transação</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate("Transactions")}
                style={[styles.button, styles.historyButton]}
            >
                <Feather name="clock" size={18} color="#fff" style={{ marginRight: 6 }} />
                <Text style={styles.buttonText}>Histórico de transações</Text>
            </TouchableOpacity>

            {/* Objetivos */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Objetivos</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Goals")}
                    style={styles.goalsButton}
                >
                    <Text style={styles.goalsButtonText}>Ver Objetivos</Text>
                    <Feather name="chevron-right" size={18} color="#fff" />
                </TouchableOpacity>
            </View>

            {goals.length === 0 ? (
                <Text style={styles.empty}>Nenhum objetivo ainda</Text>
            ) : (
                goals.map((goal) => {
                    const progress = Math.min(
                        100,
                        Math.round((goal.currentValue / (goal.targetValue || 1)) * 100)
                    );

                    return (
                        <View key={goal.id} style={styles.goalCard}>
                            <View style={styles.goalHeader}>
                                <Text style={styles.goalTitle}>{goal.title}</Text>
                                <Text style={styles.goalPercent}>{progress}%</Text>
                            </View>

                            <View style={styles.progressBackground}>
                                <View style={[styles.progressFill, { width: `${progress}%` }]} />
                            </View>

                            <View style={styles.goalFooter}>
                                <Text style={styles.goalCurrent}>R$ {goal.currentValue.toFixed(2)}</Text>
                                <Text style={styles.goalTarget}>meta R$ {goal.targetValue.toFixed(2)}</Text>
                            </View>
                        </View>
                    );
                })
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#f4f4f4" },

    header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
    title: { fontSize: 24, fontWeight: "bold" },
    headerButton: { padding: 5 },

    card: { backgroundColor: "#fff", padding: 20, borderRadius: 10, marginBottom: 20 },
    smallCard: { backgroundColor: "#fff", flex: 1, padding: 15, margin: 5, borderRadius: 10 },
    row: { flexDirection: "row", justifyContent: "space-between" },
    label: { fontSize: 16, color: "#555" },
    value: { fontSize: 26, fontWeight: "bold", marginTop: 5 },
    valueSmall: { fontSize: 20, fontWeight: "bold", marginTop: 5 },

    button: { flexDirection: "row", alignItems: "center", justifyContent: "center", padding: 15, borderRadius: 10, marginTop: 15 },
    addButton: { backgroundColor: "#1e88e5" },
    historyButton: { backgroundColor: "#616161" },
    buttonText: { color: "#fff", textAlign: "center", fontSize: 16, fontWeight: "bold" },

    sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 30, marginBottom: 10 },
    sectionTitle: { fontSize: 20, fontWeight: "bold" },
    goalsButton: { flexDirection: "row", alignItems: "center", backgroundColor: "#4E5DFF", padding: 8, borderRadius: 8 },
    goalsButtonText: { color: "#fff", fontWeight: "bold", marginRight: 4 },

    empty: { textAlign: "center", marginTop: 10, color: "#888" },

    goalCard: { backgroundColor: "#fff", padding: 14, borderRadius: 10, marginBottom: 12 },
    goalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    goalTitle: { fontSize: 16, fontWeight: "700", flexShrink: 1 },
    goalPercent: { fontSize: 14, color: "#555", marginLeft: 10, flexShrink: 0 },

    progressBackground: { height: 8, backgroundColor: "#eee", borderRadius: 6, overflow: "hidden", marginTop: 10, marginBottom: 10 },
    progressFill: { height: "100%", backgroundColor: "#4E5DFF" },

    goalFooter: { flexDirection: "row", justifyContent: "space-between" },
    goalCurrent: { fontSize: 14, fontWeight: "600" },
    goalTarget: { fontSize: 13, color: "#777" },
});
