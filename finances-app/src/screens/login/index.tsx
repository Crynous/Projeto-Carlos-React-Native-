// src/screens/login/index.tsx
import * as React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";
import { Formik } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
    email: Yup.string().email("E-mail inválido").required("Digite seu e-mail"),
    password: Yup.string().min(6, "Mínimo 6 caracteres").required("Digite sua senha"),
});

export default function LoginScreen() {
    const navigation = useNavigation();
    const { login } = useAuth();
    const [error, setError] = React.useState("");

    async function handleLogin(values: any) {
        try {
            setError("");
            await login(values.email, values.password);
            //navigation.navigate("Dashboard" as never);
        } catch (err: any) {
            setError(err.message);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>FINANCES APP</Text>

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={LoginSchema}
                onSubmit={handleLogin}
            >
                {({ handleChange, handleSubmit, values, errors, touched }) => (
                    <>
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

                        <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate("Register" as never)}>
                            <Text style={styles.link}>Criar conta</Text>
                        </TouchableOpacity>
                    </>
                )}
            </Formik>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20 },
    title: { fontSize: 28, fontWeight: "bold", marginBottom: 20, justifyContent: "center", textAlign: "center" },
    input: {
        width: "100%",
        padding: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 6,
    },
    button: {
        backgroundColor: "#2196f3",
        padding: 15,
        borderRadius: 6,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
    link: { textAlign: "center", marginTop: 15, color: "#2196f3" },
    error: { color: "red", marginBottom: 10 },
});
