
import { defineStore } from 'pinia';
import { ref, watch, onMounted } from 'vue';

export const useThemeStore = defineStore('theme', () => {
    // Opciones: 'light', 'dark', 'system'
    const theme = ref(localStorage.getItem('theme') || 'light');

    const applyTheme = (newTheme) => {
        const root = document.documentElement;
        const isDark = newTheme === 'dark' || (newTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

        if (isDark) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    };

    watch(theme, (newVal) => {
        localStorage.setItem('theme', newVal);
        applyTheme(newVal);
    });

    onMounted(() => {
        applyTheme(theme.value);

        // Escucha cambios del sistema si el modo es system
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (theme.value === 'system') {
                applyTheme('system');
            }
        });
    });

    return { theme, applyTheme };
});
