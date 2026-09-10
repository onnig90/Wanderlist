import { usePlaces } from "@/lib/places-context";
import { StyleSheet, Text, View } from "react-native";

export default function Settings() {
    const { places } = usePlaces();

    return (
        <View style={styles.screen}>
            <Text style={styles.appName}>Wanderlist</Text>
            <Text style={styles.tagline}>Places you want to see</Text>

            <View style={styles.rows}>
                <Row label="Version" value="1.0.0" />
                <Row label="Course" value="420-952-VA" />
                <Row label="Built by" value="Leonardo Mascarenhas" />
                <Row label="Places saved" value={String(places.length)} />
            </View>

            <Text style={styles.note}>
                Places are kept in memory only - they disappear when the app
                restarts. Week 7 fixes that.
            </Text>
        </View>
    );
}

function Row({ label, value }: { label: string; value: string }) {
    return (
        <View style={styles.row}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, padding: 24, gap: 8 },
    appName: { fontSize: 28, fontWeight: "700" },
    tagline: { fontSize: 14, color: "#548", marginBottom: 16 },
    rows: { gap: 4 },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#ddd",
    },
    label: { color: "#548" },
    value: { fontWeight: "600" },
    note: { marginTop: 24, color: "#666", fontSize: 12 },
});
