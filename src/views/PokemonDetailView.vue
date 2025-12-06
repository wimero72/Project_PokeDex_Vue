
<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { pokemonService } from '../services/pokemonService';

const route = useRoute();
const pokemon = ref(null);
const loading = ref(true);
const error = ref(null);

const loadPokemonDetail = async () => {
    loading.value = true;
    error.value = null;
    try {
        pokemon.value = await pokemonService.getPokemonById(route.params.id);
    } catch (err) {
        error.value = 'Fallo al cargar detalles del Pokemon.';
        console.error(err);
    } finally {
        loading.value = false;
    }
};

const typeColors = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    steel: '#B7B7CE',
    fairy: '#D685AD',
};

const getTypeColor = (type) => typeColors[type] || '#777';

onMounted(() => {
    loadPokemonDetail();
});
</script>

<template>
    <div class="detail-container fade-in">
        <router-link to="/" class="back-link">← Volver a la lista</router-link>

        <div v-if="loading" class="loading-state">
             <div class="spinner"></div>
             Cargando detalles...
        </div>

        <div v-else-if="error" class="error-state">
            {{ error }}
        </div>

        <div v-else-if="pokemon" class="pokemon-detail-card">
            <div class="detail-header">
                <div class="image-wrapper">
                     <img :src="pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default" :alt="pokemon.name" class="detail-image" />
                </div>
                <div class="header-info">
                    <h1 class="detail-name">{{ pokemon.name }}</h1>
                    <div class="types">
                        <span 
                            v-for="t in pokemon.types" 
                            :key="t.type.name" 
                            class="type-badge"
                            :style="{ backgroundColor: getTypeColor(t.type.name) }"
                        >
                            {{ t.type.name }}
                        </span>
                    </div>
                </div>
            </div>

            <div class="stats-section">
                <h2>Estadísticas Base</h2>
                <div class="stats-grid">
                    <div v-for="stat in pokemon.stats" :key="stat.stat.name" class="stat-item">
                        <div class="stat-header">
                            <span class="stat-name">{{ stat.stat.name.replace('-', ' ') }}</span>
                            <span class="stat-number">{{ stat.base_stat }}</span>
                        </div>
                        <div class="progress-bar-bg">
                            <div 
                                class="progress-bar-fill" 
                                :style="{ width: Math.min(stat.base_stat, 100) + '%' }"
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="sprites-gallery">
                 <h2>Sprites</h2>
                 <div class="sprites-row">
                    <img :src="pokemon.sprites.front_default" alt="Front" title="Front Default" />
                    <img :src="pokemon.sprites.back_default" alt="Back" title="Back Default"  />
                    <img :src="pokemon.sprites.front_shiny" alt="Front Shiny" title="Front Shiny" />
                    <img :src="pokemon.sprites.back_shiny" alt="Back Shiny" title="Back Shiny" />
                 </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.detail-container {
    max-width: 800px;
    margin: 0 auto;
}

.back-link {
    display: inline-block;
    margin-bottom: 2rem;
    color: var(--text-secondary);
    font-weight: 600;
    transition: color 0.2s;
}

.back-link:hover {
    color: var(--primary-color);
}

.pokemon-detail-card {
    background: var(--card-bg);
    border-radius: 24px;
    padding: 2rem;
    box-shadow: 0 10px 40px rgba(0,0,0,0.1);
    border: 1px solid var(--border-color);
}

.detail-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    margin-bottom: 3rem;
    text-align: center;
}

@media (min-width: 768px) {
    .detail-header {
        flex-direction: row;
        text-align: left;
    }
}

.image-wrapper {
    background: var(--bg-color);
    border-radius: 50%;
    padding: 2rem;
    width: 200px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.detail-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 8px 8px rgba(0,0,0,0.2));
}

.detail-name {
    font-size: 3rem;
    text-transform: capitalize;
    margin: 0 0 1rem 0;
    font-weight: 800;
}

.types {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
}

@media (min-width: 768px) {
    .types { justify-content: flex-start; }
}

.type-badge {
    padding: 0.5rem 1rem;
    border-radius: 50px;
    color: white;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 0.875rem;
    text-shadow: 0 1px 2px rgba(0,0,0,0.2);
}

.stats-section h2, .sprites-gallery h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    border-bottom: 2px solid var(--border-color);
    padding-bottom: 0.5rem;
}

.stats-grid {
    display: grid;
    gap: 1rem;
}

.stat-item {
    margin-bottom: 0.5rem;
}

.stat-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.25rem;
    font-weight: 600;
    text-transform: capitalize;
}

.progress-bar-bg {
    height: 10px;
    background: var(--border-color);
    border-radius: 5px;
    overflow: hidden;
}

.progress-bar-fill {
    height: 100%;
    background: var(--primary-color);
    border-radius: 5px;
    transition: width 1s ease-out;
}

.sprites-row {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
}

.sprites-row img {
    width: 96px;
    height: 96px;
    image-rendering: pixelated;
}
.loading-state, .error-state {
    text-align: center;
    padding: 3rem;
    font-size: 1.25rem;
    color: var(--text-secondary);
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
</style>
