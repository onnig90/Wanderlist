import AsyncStorage from "@react-native-async-storage/async-storage";
import { Place } from "./types";

export const STORAGE_KEY = "wanderlist.places";

export async function savePlaces(places: Place[]) {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(places));
}

export async function loadPlaces(): Promise<Place[]> {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
}
