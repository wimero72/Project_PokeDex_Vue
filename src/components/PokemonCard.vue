
<script setup>
defineProps({
  pokemon: {
    type: Object,
    required: true
  }
});

const getStat = (pokemon, statName) => {
    return pokemon.stats.find(s => s.stat.name === statName)?.base_stat || 0;
};
</script>

<template>
  <div class="pokemon-card group">
    <div class="card-image-container">
        <!-- Arte oficial o sprite por defecto -->
        <img :src="pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default" :alt="pokemon.name" class="card-image" />
    </div>
    
    <div class="card-info">
        <h3 class="card-name">{{ pokemon.name }}</h3>
        <div class="card-stats">
            <div class="stat-badge attack">
                <span class="stat-label">ATK</span>
                <span class="stat-value">{{ getStat(pokemon, 'attack') }}</span>
            </div>
            <div class="stat-badge defense">
                <span class="stat-label">DEF</span>
                <span class="stat-value">{{ getStat(pokemon, 'defense') }}</span>
            </div>
        </div>
        
        <router-link :to="{ name: 'pokemon-detail', params: { id: pokemon.id }}" class="detail-link">
            Ver Detalles
        </router-link>
    </div>
  </div>
</template>

<style scoped>
.pokemon-card {
    background: var(--card-bg);
    border-radius: 16px;
    padding: 1.5rem;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid var(--border-color);
}

.pokemon-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0,0,0,0.15);
}

.card-image-container {
    width: 120px;
    height: 120px;
    margin-bottom: 1rem;
    position: relative;
    /* subtle glow for visual appeal */
}

.card-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 4px 4px rgba(0,0,0,0.2));
}

.card-name {
    text-transform: capitalize;
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: var(--text-primary);
}

.card-stats {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 1rem;
    width: 100%;
    justify-content: center;
}

.stat-badge {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: var(--stat-bg);
    padding: 0.25rem 0.5rem;
    border-radius: 8px;
    min-width: 50px;
}

.stat-label {
    font-size: 0.65rem;
    text-transform: uppercase;
    font-weight: 700;
    color: var(--text-secondary);
}

.stat-value {
    font-size: 1rem;
    font-weight: 800;
    color: var(--text-primary);
}

.stat-badge.attack .stat-value { color: #f87171; } /* Tono rojizo */
.stat-badge.defense .stat-value { color: #60a5fa; } /* Tono azulado */

.detail-link {
    display: inline-block;
    padding: 0.5rem 1rem;
    background: var(--primary-color);
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.875rem;
    transition: background 0.2s;
}

.detail-link:hover {
    background: var(--primary-hover);
}
</style>
