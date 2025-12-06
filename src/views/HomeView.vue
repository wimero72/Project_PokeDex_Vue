
<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { pokemonService } from '../services/pokemonService';
import PokemonCard from '../components/PokemonCard.vue';

const pokemonList = ref([]);
const displayList = ref([]); // Lista separada para mostrar y manejar el filtrado elegantemente
const loading = ref(true);
const error = ref(null);
const searchQuery = ref('');

// Obtener 10 pokemon aleatorios al cargar
const loadPokemon = async () => {
    loading.value = true;
    error.value = null;
    try {
        const data = await pokemonService.getRandomPokemonList(10);
        pokemonList.value = data;
    } catch (err) {
        error.value = 'Fallo al cargar Pokemon. Por favor inténtalo de nuevo.';
        console.error(err);
    } finally {
        loading.value = false;
    }
};

// Lógica de filtrado
const filteredPokemon = computed(() => {
    if (!searchQuery.value) return pokemonList.value;
    const query = searchQuery.value.toLowerCase();
    return pokemonList.value.filter(p => p.name.toLowerCase().includes(query));
});

onMounted(() => {
    loadPokemon();
});
</script>

<template>
    <div class="home-view">
        <div class="header-section">
            <h1 class="page-title">Explorar Pokemon</h1>
            
            <div class="search-container">
                <input 
                    type="text" 
                    v-model="searchQuery" 
                    placeholder="Buscar Pokemon..." 
                    class="search-input"
                />
            </div>
        </div>

        <div v-if="loading" class="loading-state">
            <div class="spinner"></div>
            <p>Atrapando Pokemon...</p>
        </div>

        <div v-else-if="error" class="error-state">
            <p>{{ error }}</p>
            <button @click="loadPokemon" class="retry-btn">Reintentar</button>
        </div>

        <div v-else class="pokemon-grid fade-in">
             <transition-group name="list">
                <PokemonCard 
                    v-for="pokemon in filteredPokemon" 
                    :key="pokemon.id" 
                    :pokemon="pokemon" 
                />
            </transition-group>
        </div>

        <div v-if="!loading && filteredPokemon.length === 0" class="empty-state">
            <p>No se encontraron Pokemon que coincidan con "{{ searchQuery }}"</p>
        </div>
    </div>
</template>

<style scoped>
.header-section {
    text-align: center;
    margin-bottom: 2rem;
}

.page-title {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 1.5rem;
    color: var(--text-primary);
    background: linear-gradient(135deg, var(--primary-color), #ec4899);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.search-container {
    max-width: 500px;
    margin: 0 auto;
}

.search-input {
    width: 100%;
    padding: 1rem 1.5rem;
    border-radius: 50px;
    border: 2px solid var(--border-color);
    background: var(--input-bg);
    color: var(--text-primary);
    font-size: 1.1rem;
    transition: all 0.3s;
    outline: none;
    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}

.search-input:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.2);
}

.pokemon-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
    padding: 1rem 0;
}

.loading-state, .error-state, .empty-state {
    text-align: center;
    padding: 4rem 0;
    color: var(--text-secondary);
    font-size: 1.2rem;
}

.spinner {
    width: 40px;
    height: 40px;
    border: 4px solid var(--border-color);
    border-top: 4px solid var(--primary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.retry-btn {
    padding: 0.75rem 1.5rem;
    background: var(--primary-color);
    color: white;
    border-radius: 8px;
    font-weight: 600;
    margin-top: 1rem;
}

/* List Transitions */
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
