import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { City, getCities } from "../lib/api";

export default function Explore() {
    const [cities, setCities] = useState<City[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function load() {
            try {
                setLoading(true);
                setError(null);
                setCities(await getCities());
            } catch (e) {
                setError(
                    "Could not load cities. Check your connection and try again.",
                );
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    if (loading) return <ActivityIndicator style={styles.screen} />;
    if (error) return <Text style={styles.error}>{error}</Text>;

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Explore</Text>
            <FlatList
                data={cities}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <Text style={styles.row}>
                        {item.name}, {item.country}
                    </Text>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, padding: 24 },
    title: { fontSize: 24, fontWeight: "600", marginBottom: 8 },
    row: { paddingVertical: 8 },
    error: { padding: 24, color: "#b00020" },
});
