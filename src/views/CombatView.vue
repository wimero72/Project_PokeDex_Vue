
<script setup>
import { ref, onMounted } from 'vue';
import { pokemonService } from '../services/pokemonService';
import CombatCard from '../components/CombatCard.vue';

const deck = ref([]); // 10 pokemon aleatorios
const loading = ref(true);
const selectedIndices = ref([]);
const resultMessage = ref('');
const resultClass = ref(''); // 'win' or 'lose'
const gameOver = ref(false);

const loadDeck = async () => {
    loading.value = true;
    deck.value = [];
    selectedIndices.value = [];
    resultMessage.value = '';
    gameOver.value = false;
    
    try {
        const data = await pokemonService.getRandomPokemonList(10);
        // Añade estado de juego a cada carta
        deck.value = data.map(p => ({
            ...p,
            isRevealed: false
        }));
    } catch (err) {
        console.error("Failed to load combat deck", err);
    } finally {
        loading.value = false;
    }
};

const handleCardSelect = (index) => {
    if (gameOver.value) return;
    if (selectedIndices.value.includes(index)) return; // Ya seleccionado
    if (selectedIndices.value.length >= 2) return; // Máximo 2 cartas

    // Revela la carta
    deck.value[index].isRevealed = true;
    selectedIndices.value.push(index);

    if (selectedIndices.value.length === 2) {
        setTimeout(resolveCombat, 800); // Pequeño retraso para suspenso
    }
};

const getStat = (pokemon, statName) => {
    return pokemon?.stats.find(s => s.stat.name === statName)?.base_stat || 0;
};

const resolveCombat = () => {
    const idx1 = selectedIndices.value[0];
    const idx2 = selectedIndices.value[1];
    
    const card1 = deck.value[idx1]; // Atacante
    const card2 = deck.value[idx2]; // Defensor
    
    const attackVal = getStat(card1, 'attack');
    const defenseVal = getStat(card2, 'defense');
    
    if (attackVal > defenseVal) {
        resultMessage.value = `${card1.name} ataca y derrota a ${card2.name}!`;
        resultClass.value = 'win';
    } else {
        resultMessage.value = `${card1.name} ataca pero pierde contra ${card2.name}!`;
        resultClass.value = 'lose';
    }
    
    gameOver.value = true;
};

const resetGame = () => {
    loadDeck();
};

onMounted(() => {
    loadDeck();
});
</script>

<template>
    <div class="combat-view">
        <div class="combat-header">
            <h1 class="title">Combate Pokemon</h1>
            <p class="instructions" v-if="!gameOver && selectedIndices.length < 2">
                ¡Selecciona 2 cartas para combatir! La primera ataca, la segunda defiende.
            </p>
        </div>

        <div v-if="loading" class="loading-state">
             <div class="spinner"></div>
             Barajando mazo...
        </div>

        <div v-else class="game-area">
             <!-- Superposición / Sección de resultados -->
             <div v-if="resultMessage" class="result-banner fade-in" :class="resultClass">
                <h2>{{ resultMessage }}</h2>
                <button @click="resetGame" class="reset-btn">Jugar de nuevo</button>
             </div>

             <div class="card-grid">
                <CombatCard 
                    v-for="(pokemon, index) in deck" 
                    :key="pokemon.id + '-' + index"
                    :pokemon="pokemon"
                    :isRevealed="pokemon.isRevealed"
                    @select="handleCardSelect(index)"
                    class="combat-card-item"
                />
             </div>
        </div>
    </div>
</template>

<style scoped>
.combat-view {
    text-align: center;
}

.combat-header {
    margin-bottom: 2rem;
}

.title {
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
}

.instructions {
    color: var(--text-secondary);
    font-size: 1.1rem;
}

.card-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem;
    perspective: 1000px;
}

.combat-card-item {
    transition: transform 0.3s;
}

.combat-card-item:hover {
    transform: translateY(-5px);
}

.result-banner {
    background: var(--card-bg);
    padding: 1.5rem;
    border-radius: 16px;
    margin-bottom: 2rem;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    border: 2px solid var(--border-color);
    display: inline-block;
}

.result-banner h2 {
    margin: 0 0 1rem 0;
    text-transform: capitalize;
}

.result-banner.win h2 { color: #f87171; }
.result-banner.lose h2 { color: #60a5fa; }

.reset-btn {
    padding: 0.75rem 2rem;
    background: var(--primary-color);
    color: white;
    border-radius: 50px;
    font-weight: 700;
    font-size: 1rem;
    transition: background 0.2s;
}

.reset-btn:hover {
    background: var(--primary-hover);
}

.loading-state {
    padding: 4rem;
    font-size: 1.5rem;
    color: var(--text-secondary);
}

.spinner {
    width: 50px;
    height: 50px;
    border: 5px solid var(--border-color);
    border-top: 5px solid var(--primary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
