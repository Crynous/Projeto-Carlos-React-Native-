// src/screens/transactionDetails/index.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useTransactions, Transaction } from "../../context/TransactionContext";

type RouteParams = {
    TransactionDetails: {
        item: Transaction;
    };
};

export default function TransactionDetails() {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<RouteParams, "TransactionDetails">>();

    const { item } = route.params;
    const { deleteTransaction, updateTransaction } = useTransactions();

    const [editing, setEditing] = useState(false);
    const [desc, setDesc] = useState(item.desc);
    const [value, setValue] = useState(String(item.value));

    // Atualiza no Firestore via updateTransaction
    async function saveEdits() {
        try {
            await updateTransaction(item.id, {
                desc,
                value: Number(value),
            });

            Alert.alert("Sucesso", "Transação atualizada!");
            setEditing(false);
        } catch (error: any) {
            console.error(error);
            Alert.alert("Erro", error?.message || "Não foi possível atualizar.");
        }
    }

    // Excluir com confirmação
    function confirmDelete() {
        Alert.alert(
            "Excluir Transação",
            "Tem certeza que deseja excluir essa transação?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await deleteTransaction(item.id);
                            navigation.goBack();
                        } catch (err: any) {
                            console.error(err);
                            Alert.alert("Erro", "Não foi possível excluir a transação.");
                        }
                    },
                },
            ]
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detalhes da Transação</Text>

            <Text style={styles.label}>Descrição</Text>
            {editing ? (
                <TextInput style={styles.input} value={desc} onChangeText={setDesc} />
            ) : (
                <Text style={styles.valueText}>{item.desc}</Text>
            )}

            <Text style={styles.label}>Valor</Text>
            {editing ? (
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={value}
                    onChangeText={setValue}
                />
            ) : (
                <Text style={styles.valueText}>R$ {Number(item.value).toFixed(2)}</Text>
            )}

            <Text style={styles.label}>Criado em</Text>
            <Text style={styles.date}>
                {new Date(item.createdAt).toLocaleString("pt-BR")}
            </Text>

            <View style={styles.row}>
                {!editing && (
                    <TouchableOpacity style={styles.btnEdit} onPress={() => setEditing(true)}>
                        <Text style={styles.btnText}>Editar</Text>
                    </TouchableOpacity>
                )}

                {editing && (
                    <TouchableOpacity style={styles.btnSave} onPress={saveEdits}>
                        <Text style={styles.btnText}>Salvar</Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity style={styles.btnDelete} onPress={confirmDelete}>
                    <Text style={styles.btnText}>Excluir</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 25 },
    label: { fontSize: 14, color: "#444", marginTop: 15 },
    valueText: { fontSize: 18, fontWeight: "600", color: "#111" },
    date: { color: "#555", marginBottom: 20 },

    input: {
        backgroundColor: "#f1f1f1",
        padding: 10,
        borderRadius: 8,
        fontSize: 16,
    },

    row: {
        flexDirection: "row",
        gap: 10,
        marginTop: 30,
    },

    btnEdit: {
        backgroundColor: "#1976d2",
        padding: 10,
        borderRadius: 8,
        flex: 1,
    },
    btnSave: {
        backgroundColor: "#2e7d32",
        padding: 10,
        borderRadius: 8,
        flex: 1,
    },
    btnDelete: {
        backgroundColor: "#c62828",
        padding: 10,
        borderRadius: 8,
        flex: 1,
    },

    btnText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
    },
});
