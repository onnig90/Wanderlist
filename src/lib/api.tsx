export type City = {
    id: number;
    name: string;
    country: string;
    region?: string;
    population: number;
};

const MAX_LIMIT = 10;

export async function getCities(limit: number = MAX_LIMIT): Promise<City[]> {
    const response = await fetch(
        `https://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=${MAX_LIMIT}`,
    );

    if (!response.ok) {
        const body = await response.text();
        throw new Error(`Request failed: ${response.status} ${body}`);
    }

    const json = await response.json();
    return json.data;
}
