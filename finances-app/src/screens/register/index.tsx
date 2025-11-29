// src/screens/register/index.tsx
import * as React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";
import { Formik } from "formik";
import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
    name: Yup.string().required("Digite seu nome"),
    email: Yup.string().email("E-mail inválido").required("Digite seu e-mail"),
    password: Yup.string().min(6, "Mínimo 6 caracteres").required("Digite sua senha"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "As senhas não coincidem")
        .required("Confirme sua senha"),
});

export default function RegisterScreen() {
    const navigation = useNavigation();
    const { register } = useAuth();
    const [error, setError] = React.useState("");

    async function handleRegister(values: any) {
        try {
            setError("");

            await register(values.name, values.email, values.password);

            //navigation.navigate("Dashboard" as never);
        } catch (err: any) {
            setError(err.message);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Criar Conta</Text>

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Formik
                initialValues={{ name: "", email: "", password: "", confirmPassword: "" }}
                validationSchema={RegisterSchema}
                onSubmit={handleRegister}
            >
                {({ handleChange, handleSubmit, values, errors, touched }) => (
                    <>
                        <TextInput
                            placeholder="Nome"
                            value={values.name}
                            onChangeText={handleChange("name")}
                            style={styles.input}
                        />
                        {touched.name && errors.name && (
                            <Text style={styles.error}>{errors.name}</Text>
                        )}

                        <TextInput
                            placeholder="E-mail"
                            value={values.email}
                            onChangeText={handleChange("email")}
                            style={styles.input}
                        />
                        {touched.email && errors.email && (
                            <Text style={styles.error}>{errors.email}</Text>
                        )}

                        <TextInput
                            placeholder="Senha"
                            secureTextEntry
                            value={values.password}
                            onChangeText={handleChange("password")}
                            style={styles.input}
                        />
                        {touched.password && errors.password && (
                            <Text style={styles.error}>{errors.password}</Text>
                        )}

                        <TextInput
                            placeholder="Confirmar senha"
                            secureTextEntry
                            value={values.confirmPassword}
                            onChangeText={handleChange("confirmPassword")}
                            style={styles.input}
                        />
                        {touched.confirmPassword && errors.confirmPassword && (
                            <Text style={styles.error}>{errors.confirmPassword}</Text>
                        )}

                        <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
                            <Text style={styles.buttonText}>Registrar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text style={styles.link}>Já tenho conta</Text>
                        </TouchableOpacity>
                    </>
                )}
            </Formik>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20 },
    title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
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
    link: { textAlign: "center", marginTop: 15, color: "#4caf50" },
    error: { color: "red", marginBottom: 10 },
});

