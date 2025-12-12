// src/screens/transactions/index.tsx
import * as React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useTransactions } from "../../context/TransactionContext";
import TransactionItem from "../../components/TransactionItem";
import { useFilteredTransactions } from "../../hooks/useFilteredTransactions";

export default function Transactions() {
    const { transactions } = useTransactions();
    const {
        filtered,
        setFilterType,
        setSortType,
        filterType,
        sortType,
    } = useFilteredTransactions(transactions);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Histórico de Transações</Text>

            {/* ------- FILTER BUTTONS ------- */}
            <View style={styles.filtersRow}>
                <TouchableOpacity
                    style={[styles.filterBtn, filterType === "all" && styles.active]}
                    onPress={() => setFilterType("all")}
                >
                    <Text style={filterType === "all" ? styles.activeText : styles.btnText}>Todos</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.filterBtn, filterType === "entrada" && styles.active]}
                    onPress={() => setFilterType("entrada")}
                >
                    <Text style={filterType === "entrada" ? styles.activeText : styles.btnText}>Entradas</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.filterBtn, filterType === "saida" && styles.active]}
                    onPress={() => setFilterType("saida")}
                >
                    <Text style={filterType === "saida" ? styles.activeText : styles.btnText}>Saídas</Text>
                </TouchableOpacity>
            </View>

            {/* ------- SORT BUTTONS ------- */}
            <View style={styles.filtersRow}>
                <TouchableOpacity
                    style={[styles.filterBtn, sortType === "date_desc" && styles.active]}
                    onPress={() => setSortType("date_desc")}
                >
                    <Text style={sortType === "date_desc" ? styles.activeText : styles.btnText}>Recentes</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.filterBtn, sortType === "value_desc" && styles.active]}
                    onPress={() => setSortType("value_desc")}
                >
                    <Text style={sortType === "value_desc" ? styles.activeText : styles.btnText}>Maior Valor</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.filterBtn, sortType === "value_asc" && styles.active]}
                    onPress={() => setSortType("value_asc")}
                >
                    <Text style={sortType === "value_asc" ? styles.activeText : styles.btnText}>Menor Valor</Text>
                </TouchableOpacity>
            </View>

            {/* ------- FLATLIST ------- */}
            <FlatList
                data={filtered}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <TransactionItem item={item} />}
                ListEmptyComponent={() => (
                    <Text style={{ textAlign: "center", marginTop: 20, color: "#888" }}>
                        Nenhuma transação encontrada
                    </Text>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#f4f4f4" },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },

    filtersRow: {
        flexDirection: "row",
        marginBottom: 15,
        gap: 10,
    },

    filterBtn: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: "#e0e0e0",
        alignItems: "center",
    },

    active: {
        backgroundColor: "#1e88e5",
    },

    btnText: { color: "#333", fontWeight: "bold" },
    activeText: { color: "#fff", fontWeight: "bold" },
});
