// src/components/TransactionItem/index.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Transaction } from "../../context/TransactionContext";
import { useNavigation } from "@react-navigation/native";

interface Props {
    item: Transaction;
}

export default function TransactionItem({ item }: Props) {
    const navigation = useNavigation<any>();
    const isEntrada = item.type === "entrada";

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("TransactionDetails", { item })}
        >
            <View
                style={[
                    styles.container,
                    { borderLeftColor: isEntrada ? "#2e7d32" : "#c62828" },
                ]}
            >
                <View style={styles.row}>
                    <Text style={styles.desc}>{item.desc}</Text>
                    <Text
                        style={[
                            styles.value,
                            { color: isEntrada ? "#2e7d32" : "#c62828" },
                        ]}
                    >
                        R$ {Number(item.value).toFixed(2)}
                    </Text>
                </View>

                <Text style={styles.date}>
                    {new Date(item.createdAt).toLocaleDateString("pt-BR")}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 12,
        borderLeftWidth: 6,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    desc: {
        fontSize: 16,
        fontWeight: "bold",
    },
    value: {
        fontSize: 16,
        fontWeight: "bold",
    },
    date: {
        marginTop: 6,
        fontSize: 12,
        color: "#666",
    },
});
