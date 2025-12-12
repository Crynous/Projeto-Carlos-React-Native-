// src/screens/addTransaction/index.tsx
import * as React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTransactions } from "../../context/TransactionContext";
import { Formik } from "formik";
import * as Yup from "yup";

const TransactionSchema = Yup.object().shape({
    desc: Yup.string().required("Descrição é obrigatória"),
    value: Yup.number().positive("Valor deve ser positivo").required("Valor é obrigatório"),
});

export default function AddTransaction() {
    const navigation = useNavigation();
    const { addTransaction } = useTransactions();
    const [type, setType] = React.useState<"entrada" | "saida" | null>(null);

    async function handleAdd(values: any) {
        try {
            if (!type) return;
            await addTransaction(values.desc, type, Number(values.value));
            Alert.alert("Sucesso", "Transação adicionada!");
            navigation.goBack();
        } catch (err: any) {
            Alert.alert("Erro", err.message || "Não foi possível adicionar a transação");
        }
    }

    if (!type) {
        // Passo inicial: escolher tipo
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Escolha o tipo de transação</Text>
                <View style={styles.typeContainer}>
                    <TouchableOpacity style={[styles.typeButton, styles.typeEntrada]} onPress={() => setType("entrada")}>
                        <Text style={styles.typeTextSelected}>Entrada</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.typeButton, styles.typeSaida]} onPress={() => setType("saida")}>
                        <Text style={styles.typeTextSelected}>Saída</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    // Formulário principal
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{type === "entrada" ? "Nova Entrada" : "Nova Saída"}</Text>

            <Formik
                initialValues={{ desc: "", value: "" }}
                validationSchema={TransactionSchema}
                onSubmit={handleAdd}
            >
                {({ handleChange, handleSubmit, values, errors, touched }) => (
                    <>
                        <TextInput
                            placeholder="Descrição"
                            value={values.desc}
                            onChangeText={handleChange("desc")}
                            style={styles.input}
                        />
                        {touched.desc && errors.desc && <Text style={styles.error}>{errors.desc}</Text>}

                        <TextInput
                            placeholder="Valor"
                            keyboardType="numeric"
                            value={values.value}
                            onChangeText={handleChange("value")}
                            style={styles.input}
                        />
                        {touched.value && errors.value && <Text style={styles.error}>{errors.value}</Text>}

                        <TouchableOpacity style={[styles.button, type === "entrada" ? styles.typeEntrada : styles.typeSaida]} onPress={() => handleSubmit()}>
                            <Text style={styles.buttonText}>Adicionar</Text>
                        </TouchableOpacity>
                    </>
                )}
            </Formik>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f9f9f9",
        justifyContent: "center",
    },
    title: {
        fontSize: 26,
        fontWeight: "700",
        marginBottom: 30,
        textAlign: "center",
        color: "#333",
    },
    input: {
        width: "100%",
        padding: 14,
        marginBottom: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        backgroundColor: "#fff",
        fontSize: 16,
    },
    button: {
        paddingVertical: 16,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
    },
    error: {
        color: "#e53935",
        marginBottom: 10,
        marginLeft: 4,
        fontSize: 13,
    },
    typeContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    typeButton: {
        flex: 1,
        paddingVertical: 20,
        borderRadius: 10,
        marginHorizontal: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    typeEntrada: {
        backgroundColor: "#26a69a",
    },
    typeSaida: {
        backgroundColor: "#e53935",
    },
    typeTextSelected: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 18,
    },
});
