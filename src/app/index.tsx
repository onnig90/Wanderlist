import Badge from "@/components/Badge";
import PlaceCard from "@/components/PlaceCard";
import { usePlaces } from "@/lib/places-context";
import { Place } from "@/lib/types";
import { Link } from "expo-router";
import {
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function Index() {
    // No useState here any more. This screen reads the array, it does not own it.
    const { places } = usePlaces();

    return (
        <FlatList
            data={places}
            keyExtractor={(place) => place.id}
            contentContainerStyle={styles.content}
            ListHeaderComponent={
                <View style={styles.headerBlock}>
                    <View style={styles.header}>
                        <Text style={styles.appName}>Wanderlist</Text>
                        <Text style={styles.tagline}>
                            Places you want to see
                        </Text>
                    </View>

                    <Image
                        source={{ uri: "https://picsum.photos/800/280" }}
                        style={styles.hero}
                    />

                    {/* Week 2 lab: one prop in, one small styled View out. Swap badgeRow's
                        flexDirection between "row" and "column" and watch what moves. */}
                    <View style={styles.badgeRow}>
                        <Badge label="must-see" />
                        <Badge label="budget" />
                    </View>
                </View>
            }
            renderItem={({ item }: { item: Place }) => (
                <Link
                    href={{
                        pathname: "/place/[id]",
                        params: {
                            id: item.id,
                        },
                    }}
                    asChild // asChild tells Link not to render its own wrapper.
                >
                    <Pressable>
                        <PlaceCard
                            id={item.id}
                            name={item.name}
                            notes={item.notes}
                            category={item.category}
                        />
                    </Pressable>
                </Link>
            )}
            ListEmptyComponent={
                <Text style={styles.empty}>
                    No places yet - add one on the Add tab.
                </Text>
            }
        />
    );
}

const styles = StyleSheet.create({
    content: { padding: 16, gap: 12 },
    headerBlock: { gap: 12 },
    header: { paddingVertical: 8, alignItems: "center" },
    appName: { fontSize: 28, fontWeight: "700" },
    tagline: { fontSize: 14, color: "#548" },
    hero: { width: "100%", height: 160, borderRadius: 12 },
    badgeRow: { flexDirection: "row", gap: 8 },
    empty: { color: "#548", textAlign: "center", paddingVertical: 24 },
});
