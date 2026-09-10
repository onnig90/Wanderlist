import { Place } from "@/lib/types";
import { StyleSheet, Text, View } from "react-native";

export default function PlaceCard({ name, category, notes }: Place) {
    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.category}>{category}</Text>
            </View>
            <Text style={styles.notes}>{notes}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        margin: 2,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    name: { fontSize: 16, fontWeight: "600" },
    category: {
        fontSize: 12,
        fontWeight: "600",
        color: "#548",
        textTransform: "uppercase",
    },
    notes: { marginTop: 4, color: "#444" },
});
