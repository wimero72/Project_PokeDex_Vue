
<script setup>
import { useThemeStore } from '../stores/theme';

const themeStore = useThemeStore();

const options = [
    { value: 'light', label: 'Claro', icon: '☀️' },
    { value: 'dark', label: 'Oscuro', icon: '🌙' },
    { value: 'system', label: 'Sistema', icon: '💻' }
];
</script>

<template>
    <div class="theme-toggle">
        <label v-for="option in options" :key="option.value" :class="{ active: themeStore.theme === option.value }">
            <input 
                type="radio" 
                name="theme" 
                :value="option.value" 
                v-model="themeStore.theme"
            >
            <span class="icon">{{ option.icon }}</span>
            <span class="label">{{ option.label }}</span>
        </label>
    </div>
</template>

<style scoped>
.theme-toggle {
    display: flex;
    background: var(--input-bg);
    padding: 0.25rem;
    border-radius: 12px;
    border: 1px solid var(--border-color);
}

label {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.35rem 0.75rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
    user-select: none;
    color: var(--text-secondary);
}

input {
    display: none;
}

label:hover {
    color: var(--text-primary);
    background: rgba(125,125,125, 0.1);
}

label.active {
    background: var(--primary-color);
    color: white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.icon {
    font-size: 1rem;
}

.label {
    font-size: 0.875rem;
    font-weight: 600;
}

@media (max-width: 640px) {
    .label {
        display: none;
    }
    
    label {
        padding: 0.35rem;
    }
}
</style>
