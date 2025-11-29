// src/screens/addTransaction/index.tsx
import * as React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTransactions } from "../../context/TransactionContext";
import { Formik } from "formik";
import * as Yup from "yup";

const TransactionSchema = Yup.object().shape({
    desc: Yup.string().required("Descrição é obrigatória"),
    type: Yup.string().oneOf(["entrada", "saida"]).required("Tipo é obrigatório"),
    value: Yup.number().positive("Valor deve ser positivo").required("Valor é obrigatório"),
});

export default function AddTransaction() {
    const navigation = useNavigation();
    const { addTransaction } = useTransactions();

    async function handleAdd(values: any) {
        try {
            await addTransaction(values.desc, values.type, Number(values.value));
            Alert.alert("Sucesso", "Transação adicionada!");
            navigation.goBack();
        } catch (err: any) {
            Alert.alert("Erro", err.message || "Não foi possível adicionar a transação");
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nova Transação</Text>

            <Formik
                initialValues={{ desc: "", type: "entrada", value: "" }}
                validationSchema={TransactionSchema}
                onSubmit={handleAdd}
            >
                {({ handleChange, handleSubmit, values, errors, touched, setFieldValue }) => (
                    <>
                        <TextInput
                            placeholder="Descrição"
                            value={values.desc}
                            onChangeText={handleChange("desc")}
                            style={styles.input}
                        />
                        {touched.desc && errors.desc && <Text style={styles.error}>{errors.desc}</Text>}

                        <View style={styles.typeContainer}>
                            <TouchableOpacity
                                style={[
                                    styles.typeButton,
                                    values.type === "entrada" && styles.typeSelected,
                                ]}
                                onPress={() => setFieldValue("type", "entrada")}
                            >
                                <Text style={values.type === "entrada" ? styles.typeTextSelected : styles.typeText}>Entrada</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.typeButton,
                                    values.type === "saida" && styles.typeSelected,
                                ]}
                                onPress={() => setFieldValue("type", "saida")}
                            >
                                <Text style={values.type === "saida" ? styles.typeTextSelected : styles.typeText}>Saída</Text>
                            </TouchableOpacity>
                        </View>

                        {touched.type && errors.type && <Text style={styles.error}>{errors.type}</Text>}

                        <TextInput
                            placeholder="Valor"
                            keyboardType="numeric"
                            value={values.value}
                            onChangeText={handleChange("value")}
                            style={styles.input}
                        />
                        {touched.value && errors.value && <Text style={styles.error}>{errors.value}</Text>}

                        <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
                            <Text style={styles.buttonText}>Adicionar</Text>
                        </TouchableOpacity>
                    </>
                )}
            </Formik>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: "center" },
    title: { fontSize: 26, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
    input: {
        width: "100%",
        padding: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 6,
    },
    button: {
        backgroundColor: "#4caf50",
        padding: 15,
        borderRadius: 6,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
    error: { color: "red", marginBottom: 10 },
    typeContainer: { flexDirection: "row", justifyContent: "space-around", marginBottom: 10 },
    typeButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    typeSelected: { backgroundColor: "#4caf50", borderColor: "#4caf50" },
    typeText: { color: "#000", fontWeight: "bold" },
    typeTextSelected: { color: "#fff", fontWeight: "bold" },
});
