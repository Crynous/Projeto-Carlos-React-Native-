// src/screens/goals/index.tsx
import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useGoals } from "../../context/GoalsContext";
import GoalItem from "../../components/GoalItem";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

export default function GoalsScreen() {
  const { goals } = useGoals();
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Objetivos</Text>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate("GoalDetails" as never)}
        >
          <Feather name="plus" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={goals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <GoalItem goal={item} />}
        ListEmptyComponent={() => <Text style={styles.empty}>Nenhum objetivo ainda</Text>}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f4f4f8" },
  headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 },
  title: { fontSize: 24, fontWeight: "bold" },
  addBtn: { backgroundColor: "#4E5DFF", padding: 10, borderRadius: 10 },
  empty: { textAlign: "center", marginTop: 20, color: "#888" },
});
