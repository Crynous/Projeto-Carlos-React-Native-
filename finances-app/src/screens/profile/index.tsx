// src/screens/profile/index.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";

export default function ProfileScreenFake() {
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState("Usuário Exemplo");
    const [newPassword, setNewPassword] = useState("");
    const saldo = 1234.56; // saldo fake

    const showFutureAlert = () => {
        Alert.alert("Atenção", "Essa função será implementada em uma atualização futura!");
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.sectionTitle}>Perfil</Text>

            {/* Nome */}
            <Text style={styles.label}>Nome</Text>
            {editing ? (
                <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Seu nome" />
            ) : (
                <Text style={styles.value}>{name}</Text>
            )}
            <TouchableOpacity
                style={styles.button}
                onPress={showFutureAlert}
            >
                <Text style={styles.buttonText}>{editing ? "Salvar Nome" : "Editar Nome"}</Text>
            </TouchableOpacity>

            {/* Email */}
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>usuario@exemplo.com</Text>

            {/* Saldo */}
            <Text style={styles.label}>Saldo Atual</Text>
            <Text style={styles.value}>R$ {saldo.toFixed(2)}</Text>

            {/* Alterar senha */}
            <Text style={[styles.label, { marginTop: 20 }]}>Alterar Senha</Text>
            <TextInput
                style={styles.input}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Nova senha"
                secureTextEntry
            />
            <TouchableOpacity style={[styles.button, { backgroundColor: "#2e7d32" }]} onPress={showFutureAlert}>
                <Text style={styles.buttonText}>Alterar Senha</Text>
            </TouchableOpacity>

            {/* Logout */}
            <TouchableOpacity style={[styles.button, { backgroundColor: "#1e88e5" }]} onPress={showFutureAlert}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>

            {/* Excluir Conta */}
            <TouchableOpacity style={[styles.button, { backgroundColor: "#c62828" }]} onPress={showFutureAlert}>
                <Text style={styles.buttonText}>Excluir Conta</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#f7f8fb" },
    sectionTitle: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
    label: { fontSize: 14, color: "#444", marginTop: 10 },
    value: { fontSize: 16, fontWeight: "600", marginTop: 6, marginBottom: 10 },
    input: { backgroundColor: "#fff", padding: 12, borderRadius: 8, marginTop: 6 },
    button: { backgroundColor: "#4E5DFF", padding: 12, borderRadius: 8, marginTop: 10 },
    buttonText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
});
