import { usePlaces } from "@/lib/places-context";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function PlaceDetail() {
    // const { name, category, notes } = useLocalSearchParams();
    const { id } = useLocalSearchParams<{ id: string }>();
    const { places, setPhoto } = usePlaces();

    // Find the Place from Places[] "state"
    const place = places.find((place) => place.id === id);

    async function takePhoto() {
        const perm = await ImagePicker.requestCameraPermissionsAsync();
        if (!perm.granted) {
            return;
        }

        const result = await ImagePicker.launchCameraAsync();
        if (!result.canceled) {
            setPhoto(id, result.assets[0].uri);
        }
    }

    if (!place) {
        return <Text>Error</Text>;
    }

    return (
        <View style={styles.screen}>
            <Text style={styles.name}>{place.name}</Text>

            {/* Same pill shape as the Badge on the Places tab, so a category
                looks the same wherever it shows up. */}
            <View style={styles.badge}>
                <Text style={styles.category}>{place.category}</Text>
            </View>

            <Text style={styles.notes}>{place.notes || "No notes yet."}</Text>

            {place.photoUri && (
                <Image source={{ uri: place.photoUri }} style={styles.photo} />
            )}

            <Button title="Take a Photo" onPress={takePhoto} />
            {place.photoUri && (
                <Button
                    title="Remove photo"
                    onPress={() => setPhoto(place.id, undefined)}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, padding: 24, gap: 12 },
    name: { fontSize: 28, fontWeight: "700" },
    badge: {
        backgroundColor: "#eee8f5",
        borderRadius: 999,
        paddingVertical: 4,
        paddingHorizontal: 10,
        // Without this the pill stretches across the whole column.
        alignSelf: "flex-start",
    },
    category: {
        fontSize: 12,
        fontWeight: "600",
        color: "#548",
        textTransform: "uppercase",
    },
    notes: { fontSize: 16, lineHeight: 24, color: "#444" },
    photo: { width: "100%", height: 220, borderRadius: 12 },
});
