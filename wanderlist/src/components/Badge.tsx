import { StyleSheet, Text, View } from "react-native";

type Props = { label: string };

export default function Badge({ label }: Props) {
    return (
        <View style={styles.badge}>
            <Text style={styles.label}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    badge: {
        backgroundColor: "#eee8f5",
        borderRadius: 999,
        paddingVertical: 4,
        paddingHorizontal: 10,
        // Without this the badge stretches to fill a column parent - which is
        // exactly what makes the row/column flip worth looking at.
        alignSelf: "flex-start",
    },
    label: {
        fontSize: 12,
        fontWeight: "600",
        color: "#548",
        textTransform: "uppercase",
    },
});
