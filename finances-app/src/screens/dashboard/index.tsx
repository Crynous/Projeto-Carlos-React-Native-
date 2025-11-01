import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Button, Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';

type DashboardNavProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;

export default function DashboardScreen() {
    const navigation = useNavigation<DashboardNavProp>();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Resumo Financeiro</Text>

            <Card containerStyle={styles.card}>
                <Text style={styles.label}>Saldo Atual</Text>
                <Text style={styles.value}>R$ 5.230,00</Text>
            </Card>

            <View style={styles.row}>
                <Card containerStyle={styles.smallCard}>
                    <Icon name="arrow-upward" />
                    <Text style={styles.label}>Entradas</Text>
                    <Text style={styles.valueSmall}>R$ 3.000</Text>
                </Card>
                <Card containerStyle={styles.smallCard}>
                    <Icon name="arrow-downward" />
                    <Text style={styles.label}>Saídas</Text>
                    <Text style={styles.valueSmall}>R$ 1.200</Text>
                </Card>
            </View>

            <Button title="Adicionar Transação" icon={{ name: 'add', color: 'white' }} buttonStyle={styles.button} onPress={() => console.log('Funcionalidade Add transação (futuro)')} />
            <Button title="Ver Histórico" icon={{ name: 'list', color: 'white' }} buttonStyle={[styles.button, { backgroundColor: '#4CAF50' }]} onPress={() => navigation.navigate('Transactions')} />

            <Button title="Logout" type="clear" onPress={() => navigation.navigate('Login')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'flex-start', padding: 20 },
    title: { fontSize: 28, fontWeight: 'bold', color: 'black', marginVertical: 20 },
    card: { width: '90%', borderRadius: 20, alignItems: 'center' },
    label: { fontSize: 16, color: 'gray' },
    value: { fontSize: 30, fontWeight: 'bold', color: 'black' },
    valueSmall: { fontSize: 18, color: 'black' },
    row: { flexDirection: 'row', justifyContent: 'space-between', width: '90%' },
    smallCard: { flex: 1, alignItems: 'center', borderRadius: 20, marginHorizontal: 5 },
    button: { borderRadius: 30, marginTop: 15, width: '90%', backgroundColor: '#2196F3' },
});
