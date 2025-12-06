
const BASE_URL = 'https://pokeapi.co/api/v2';

export const pokemonService = {
    async getPokemonList(limit = 10, offset = 0) {
        try {
            const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
            const data = await response.json();

            // Fetch - detalles de cada pokemon para obtener la imagen y estadísticas inmediatamente para la carta
            const detailedList = await Promise.all(
                data.results.map(async (pokemon) => {
                    return this.getPokemonByName(pokemon.name);
                })
            );
            return detailedList;
        } catch (error) {
            console.error('Error al obtener lista de Pokemon:', error);
            throw error;
        }
    },

    async getRandomPokemonList(count = 10) {
        try {
            // Hay aprox 1000+ pokemon, vamos a obtener IDs aleatorios.
            // limita a los primeros 151 (Gen 1) o ~1000 para variedad? Vamos con 898 (Gen 8) para estar seguros.
            const maxId = 898;
            const randomIds = Array.from({ length: count }, () => Math.floor(Math.random() * maxId) + 1);

            const promises = randomIds.map(id => this.getPokemonById(id));
            return await Promise.all(promises);
        } catch (error) {
            console.error("Error al obtener pokemon aleatorios:", error);
            throw error;
        }
    },

    async getPokemonByName(name) {
        try {
            const response = await fetch(`${BASE_URL}/pokemon/${name}`);
            if (!response.ok) throw new Error('Pokemon no encontrado');
            return await response.json();
        } catch (error) {
            console.error(`Error al obtener Pokemon ${name}:`, error);
            throw error;
        }
    },

    async getPokemonById(id) {
        try {
            const response = await fetch(`${BASE_URL}/pokemon/${id}`);
            if (!response.ok) throw new Error('Pokemon no encontrado');
            return await response.json();
        } catch (error) {
            console.error(`Error al obtener Pokemon ID ${id}:`, error);
            throw error;
        }
    }
};
