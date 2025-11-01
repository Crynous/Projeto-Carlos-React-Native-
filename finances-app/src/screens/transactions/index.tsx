import * as React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';

type TransactionsNavProp = NativeStackNavigationProp<RootStackParamList, 'Transactions'>;

export default function TransactionsScreen() {
    const navigation = useNavigation<TransactionsNavProp>();

    const transactions = [
        { id: '1', desc: 'Salário', type: 'entrada', value: 3200 },
        { id: '2', desc: 'Supermercado', type: 'saida', value: -250 },
        { id: '3', desc: 'Transporte', type: 'saida', value: -80 },
        { id: '4', desc: 'Freelancer', type: 'entrada', value: 500 },
    ];

    const renderItem = ({ item }: any) => (
        <View style={styles.item}>
            <Icon name={item.type === 'entrada' ? 'arrow-upward' : 'arrow-downward'} color={item.type === 'entrada' ? 'green' : 'red'} />
            <View style={styles.itemInfo}>
                <Text style={styles.desc}>{item.desc}</Text>
                <Text style={styles.value}>{item.value < 0 ? `- R$ ${Math.abs(item.value)}` : `R$ ${item.value}`}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Histórico de Transações</Text>

            <FlatList
                data={transactions}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={{ paddingBottom: 20 }}
            />

            <Text style={styles.back} onPress={() => navigation.navigate('Dashboard')}>Voltar</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white', padding: 20 },
    title: { fontSize: 28, fontWeight: 'bold', color: 'black', textAlign: 'center', marginBottom: 20 },
    item: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f5', padding: 15, borderRadius: 20, marginBottom: 10 },
    itemInfo: { marginLeft: 10 },
    desc: { fontSize: 16, color: 'black' },
    value: { fontSize: 18, fontWeight: 'bold', color: 'black' },
    back: { marginTop: 10, textAlign: 'center', color: '#2196F3', textDecorationLine: 'underline' },
});
