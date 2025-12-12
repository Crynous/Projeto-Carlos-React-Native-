// src/components/GoalItem/index.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Goal } from "../../context/GoalsContext";
import { useNavigation } from "@react-navigation/native";

interface Props {
  goal: Goal;
}

export default function GoalItem({ goal }: Props) {
  const navigation = useNavigation<any>();
  const progress = Math.min(100, Math.round((goal.currentValue / (goal.targetValue || 1)) * 100));

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("GoalDetails" as never, { goal } as never)}
      activeOpacity={0.8}
    >
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.title}>{goal.title}</Text>
          <Text style={styles.percent}>{progress}%</Text>
        </View>

        <View style={styles.progressBackground}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>

        <View style={styles.row}>
          <Text style={styles.current}>R$ {Number(goal.currentValue).toFixed(2)}</Text>
          <Text style={styles.target}>meta R$ {Number(goal.targetValue).toFixed(2)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  title: { fontSize: 16, fontWeight: "700" },
  percent: { fontSize: 14, color: "#555" },
  progressBackground: {
    height: 8,
    backgroundColor: "#eee",
    borderRadius: 6,
    overflow: "hidden",
    marginTop: 10,
    marginBottom: 10,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4E5DFF",
  },
  current: { fontSize: 14, fontWeight: "600" },
  target: { fontSize: 13, color: "#777" },
});
