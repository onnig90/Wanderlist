import { PlacesProvider } from "@/lib/places-context";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
    // const colorScheme = useColorScheme();
    // return (
    //     <ThemeProvider
    //         value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    //     >
    //         <AnimatedSplashOverlay />
    //         <AppTabs />
    //     </ThemeProvider>
    // );
    // PlacesProvider wraps Tabs, so it sits ABOVE every screen: the array it holds
    // is reachable from all of them, and owned by none of them.

    return (
        <PlacesProvider>
            <Tabs>
                <Tabs.Screen
                    name="index"
                    options={{
                        title: "Places",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="list" color={color} size={size} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="add"
                    options={{
                        title: "Add",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons
                                name="add-circle"
                                color={color}
                                size={size}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="place/[id]"
                    options={({ route }) => {
                        const params = route.params as
                            | { id?: string; name?: string }
                            | undefined;

                        return {
                            tabBarButton: params?.id ? undefined : () => null,
                            title: params?.name ?? "Place",

                            tabBarIcon: ({ color, size }) => (
                                <Ionicons
                                    name="planet"
                                    color={color}
                                    size={size}
                                />
                            ),
                        };
                    }}
                />
                <Tabs.Screen
                    name="explore"
                    options={{
                        title: "Explore",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons
                                name="airplane"
                                color={color}
                                size={size}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="settings"
                    options={{
                        title: "Settings",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons
                                name="settings"
                                color={color}
                                size={size}
                            />
                        ),
                    }}
                />
            </Tabs>
        </PlacesProvider>
    );
}
