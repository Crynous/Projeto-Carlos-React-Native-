// src/screens/goalDetails/index.tsx
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useGoals, Goal } from "../../context/GoalsContext";

type RouteParams = {
    GoalDetails: {
        goal?: Goal;
    };
};

export default function GoalDetails() {
    const navigation = useNavigation<any>();
    const route = useRoute<RouteProp<RouteParams, "GoalDetails">>();
    const { goal } = route.params || {};

    const { addGoal, updateGoal, addToGoal, deleteGoal } = useGoals();

    // form fields
    const [title, setTitle] = useState(goal?.title ?? "");
    const [targetValue, setTargetValue] = useState(goal ? String(goal.targetValue) : "");
    const [currentValue, setCurrentValue] = useState(goal ? String(goal.currentValue) : "");
    const [addingAmount, setAddingAmount] = useState("");

    const isEdit = Boolean(goal);

    useEffect(() => {
        if (!goal) return;
        setTitle(goal.title);
        setTargetValue(String(goal.targetValue));
        setCurrentValue(String(goal.currentValue));
    }, [goal]);

    async function handleSave() {
        if (!title.trim() || Number(targetValue) <= 0) {
            Alert.alert("Erro", "Informe nome e meta válida.");
            return;
        }

        try {
            if (isEdit && goal) {
                await updateGoal(goal.id, {
                    title,
                    targetValue: Number(targetValue),
                    currentValue: Number(currentValue),
                });
                Alert.alert("Sucesso", "Objetivo atualizado.");
            } else {
                await addGoal(title, Number(targetValue), Number(currentValue) || 0);
                Alert.alert("Sucesso", "Objetivo criado.");
            }
            navigation.goBack();
        } catch (err: any) {
            console.error(err);
            Alert.alert("Erro", "Não foi possível salvar.");
        }
    }
    {/* 
    async function handleAddAmount() {
        const amt = Number(addingAmount);
        if (!amt || amt <= 0 || !goal) {
            Alert.alert("Erro", "Informe um valor válido e selecione o objetivo.");
            return;
        }
        
        try {
            await addToGoal(goal.id, amt);
            setAddingAmount("");
            Alert.alert("Sucesso", "Valor adicionado ao objetivo.");
        } catch (err: any) {
            console.error(err);
            Alert.alert("Erro", "Não foi possível adicionar o valor.");
        }
    }
    */}
    async function handleAddAmount() {
        const amt = Number(addingAmount);
        if (!amt || amt <= 0 || !goal) {
            Alert.alert("Erro", "Informe um valor válido e selecione o objetivo.");
            return;
        }
        try {
            await addToGoal(goal.id, amt);
            setAddingAmount("");
            // Mensagem de sucesso com botão que volta para a tela anterior
            Alert.alert(
                "Sucesso",
                "Valor adicionado ao objetivo.",
                [
                    {
                        text: "OK",
                        onPress: () => navigation.goBack(),
                    },
                ],
                { cancelable: false }
            );
        } catch (err: any) {
            console.error(err);
            Alert.alert("Erro", "Não foi possível adicionar o valor.");
        }
    }

    async function handleDelete() {
        if (!goal) return;
        Alert.alert("Excluir", "Deseja excluir este objetivo?", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Excluir",
                style: "destructive",
                onPress: async () => {
                    try {
                        await deleteGoal(goal.id);
                        navigation.goBack();
                    } catch (err: any) {
                        console.error(err);
                        Alert.alert("Erro", "Não foi possível excluir.");
                    }
                },
            },
        ]);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{isEdit ? "Editar Objetivo" : "Novo Objetivo"}</Text>

            <Text style={styles.label}>Nome</Text>
            <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Ex: Comprar celular" />

            <Text style={styles.label}>Meta (R$)</Text>
            <TextInput style={styles.input} keyboardType="numeric" value={targetValue} onChangeText={setTargetValue} placeholder="3000" />

            <Text style={styles.label}>Valor Atual (opcional)</Text>
            <TextInput style={styles.input} keyboardType="numeric" value={currentValue} onChangeText={setCurrentValue} placeholder="0" />

            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                <Text style={styles.saveText}>{isEdit ? "Salvar alterações" : "Criar objetivo"}</Text>
            </TouchableOpacity>

            {isEdit && (
                <>
                    <View style={styles.divider} />
                    <Text style={styles.subtitle}>Adicionar ao objetivo</Text>
                    <TextInput style={styles.input} keyboardType="numeric" value={addingAmount} onChangeText={setAddingAmount} placeholder="Valor a adicionar" />
                    <TouchableOpacity style={styles.addBtn} onPress={handleAddAmount}>
                        <Text style={styles.addText}>Adicionar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
                        <Text style={styles.deleteText}>Excluir objetivo</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#f7f8fb" },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 12 },
    label: { fontSize: 14, color: "#444", marginTop: 10 },
    input: {
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 8,
        marginTop: 6,
    },
    saveBtn: { backgroundColor: "#4E5DFF", padding: 12, borderRadius: 8, marginTop: 14 },
    saveText: { color: "#fff", fontWeight: "bold", textAlign: "center" },

    divider: { height: 1, backgroundColor: "#e6e6e6", marginVertical: 16 },

    subtitle: { fontWeight: "700", marginBottom: 8 },
    addBtn: { backgroundColor: "#2e7d32", padding: 12, borderRadius: 8, marginTop: 10 },
    addText: { color: "#fff", fontWeight: "bold", textAlign: "center" },

    deleteBtn: { marginTop: 12, backgroundColor: "#c62828", padding: 12, borderRadius: 8 },
    deleteText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
});
