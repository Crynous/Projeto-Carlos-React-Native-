import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input } from "@rneui/themed";
import { Button } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';

type LoginNavProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
    const navigation = useNavigation<LoginNavProp>();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>APP TELA DE LOGIN - FINANCES</Text>

            <Input
                placeholder='Digite seu email'
                placeholderTextColor='gray'
                leftIcon={{ name: 'person', color: 'black' }}
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.inputText}
            />

            <Input
                placeholder="Digite sua senha"
                placeholderTextColor='gray'
                leftIcon={{ name: 'lock', color: 'black' }}
                secureTextEntry
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.inputText}
            />

            <Button
                title="Logar"
                buttonStyle={styles.button}
                onPress={() => navigation.navigate('Dashboard')}
            />

            <Text style={styles.textLink} onPress={() => navigation.navigate('Register')}>
                Não possui conta? Clique aqui para cadastrar!
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', padding: 20 },
    title: { color: 'black', fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    inputContainer: { backgroundColor: 'rgba(253,253,253,0.3)', borderRadius: 30, marginBottom: 10 },
    inputText: { color: 'black', fontSize: 16 },
    button: { borderRadius: 30, marginTop: 10, paddingHorizontal: 30, backgroundColor: '#2196F3' },
    textLink: { fontSize: 15, color: 'gray', marginTop: 20, textDecorationLine: 'underline', textAlign: 'center' },
});
