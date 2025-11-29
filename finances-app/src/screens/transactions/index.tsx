// src/screens/transactions/index.tsx
import * as React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTransactions, Transaction } from '../../context/TransactionContext';

export default function Transactions() {
    const { transactions } = useTransactions();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Histórico de Transações</Text>

            <FlatList
                data={transactions}
                keyExtractor={item => item.id}
                renderItem={({ item }: { item: Transaction }) => (
                    <View
                        style={[
                            styles.item,
                            { borderLeftColor: item.type === "entrada" ? "green" : "red" }
                        ]}
                    >
                        <Text style={styles.desc}>{item.desc}</Text>
                        <Text style={[styles.value, { color: item.type === "entrada" ? "green" : "red" }]}>
                            R$ {(Number(item.value) || 0).toFixed(2)}
                        </Text>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <Text style={{ textAlign: 'center', marginTop: 20, color: '#888' }}>
                        Nenhuma transação registrada
                    </Text>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#f4f4f4" },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
    item: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 12,
        borderLeftWidth: 6
    },
    desc: { fontSize: 16, fontWeight: "bold" },
    value: { fontSize: 16, marginTop: 5 }
});
