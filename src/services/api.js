const BASE_URL = 'https://api.thecatapi.com/v1';

export async function fetchBreeds(limit = 30) {
    const res = await fetch(`${BASE_URL}/breeds?limit=${limit}`);
    if (!res.ok) throw new Error('Failed to fetch breeds');
    return res.json();
}

export async function fetchBreedById(id) {
    const res = await fetch(`${BASE_URL}/breeds/${id}`);
    if (!res.ok) throw new Error('Breed not found');
    return res.json();
}