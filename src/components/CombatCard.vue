
<script setup>
import { computed } from 'vue';

const props = defineProps({
    pokemon: {
        type: Object,
        required: true
    },
    isRevealed: {
        type: Boolean,
        default: false
    }
});

defineEmits(['select']);

const getStat = (pokemon, statName) => {
    return pokemon.stats?.find(s => s.stat.name === statName)?.base_stat || 0;
};
</script>

<template>
  <div class="combat-card-container" @click="$emit('select')">
    <div class="combat-card" :class="{ flipped: isRevealed }">
        <!-- Frente de la carta (Info Pokemon) -->
        <div class="card-face card-front">
             <div class="card-image-container">
                <img :src="pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites?.front_default" :alt="pokemon.name" class="card-image" />
            </div>
            <h3 class="card-name">{{ pokemon.name }}</h3>
            <div class="stats-row">
                 <div class="stat-badge attack">
                    <span class="stat-label">ATK</span>
                    <span class="stat-value">{{ getStat(pokemon, 'attack') }}</span>
                </div>
                <div class="stat-badge defense">
                    <span class="stat-label">DEF</span>
                    <span class="stat-value">{{ getStat(pokemon, 'defense') }}</span>
                </div>
            </div>
        </div>

        <!-- Dorso de la carta (Patrón Pokeball) -->
        <div class="card-face card-back">
            <div class="pokeball-design">
                <div class="pokeball-center"></div>
            </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
.combat-card-container {
    perspective: 1000px;
    width: 200px;
    height: 300px;
    cursor: pointer;
}

.combat-card {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    border-radius: 16px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.combat-card.flipped {
    transform: rotateY(180deg);
}

.card-face {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border: 4px solid #fbd743; /* Borde amarillo Pokemon */
}

/* Cara Frontal */
.card-front {
    background: var(--card-bg);
    transform: rotateY(180deg); 
    /* 
    Porque empezamos boca abajo (lo que muestra el reverso).
    Si queremos que empiece boca abajo, y flipped signifique revelado.
    
    Lógica de tarjeta giratoria estándar:
    - Contenedor
    - Interior (relativo, transición)
    - Frente (abs, z-2)
    - Reverso (abs, rotateY 180)
    
    Si queremos "Boca Abajo" inicialmente:
    - El "Reverso" de la carta (patrón) debe ser visible.
    - El "Frente" de la carta (contenido) debe estar oculto.
    
    Si se aplica .flipped:
    - Rotar 180deg.
    
    Entonces:
    - Cara Frontal (Contenido): transform: rotateY(180deg);
    - Cara Trasera (Patrón): transform: rotateY(0deg);
    
    Cuando .flipped:
    - Contenedor/Interior rota 180deg.
    - Cara Trasera se vuelve 180deg (oculta)
    - Cara Frontal se vuelve 360deg (0deg) (visible)
    */
}

.card-back {
    background: linear-gradient(135deg, #ff5e5e 50%, #fbd743 50%);
    /* Patrón simple tipo Pokeball */
    color: white;
    transform: rotateY(0deg);
}

.pokeball-design {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 8px solid white;
    position: relative;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
}

.pokeball-center {
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
}

.card-image-container {
    width: 120px;
    height: 120px;
    margin-bottom: 1rem;
}

.card-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.card-name {
    margin: 0.5rem 0;
    font-size: 1.2rem;
    color: var(--text-primary);
    text-transform: capitalize;
}

.stats-row {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
}

.stat-badge {
    text-align: center;
    background: var(--stat-bg);
    padding: 0.5rem;
    border-radius: 8px;
    min-width: 50px;
}

.stat-label {
    display: block;
    font-size: 0.7rem;
    font-weight: bold;
    color: var(--text-secondary);
}

.stat-value {
    font-size: 1.1rem;
    font-weight: bold;
    color: var(--text-primary);
}
</style>
