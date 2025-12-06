
<script setup>
import { RouterLink, RouterView } from 'vue-router'
import ThemeToggle from './components/ThemeToggle.vue'
</script>

<template>
  <header class="navbar">
    <div class="container navbar-content">
      <div class="brand">
        <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg" alt="Pokemon" class="logo" />
        <span class="brand-text">Pokedex</span>
      </div>

      <nav class="nav-links">
        <RouterLink to="/" class="nav-link" active-class="active">Inicio</RouterLink>
        <RouterLink to="/combat" class="nav-link" active-class="active">Combate</RouterLink>
      </nav>

      <div class="actions">
        <ThemeToggle />
      </div>
    </div>
  </header>

  <main class="main-content container">
    <RouterView v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
  </main>
</template>

<style scoped>
.navbar {
  background: var(--card-bg);
  border-bottom: 1px solid var(--border-color);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  transition: background 0.3s, border 0.3s;
}

.navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo {
  height: 40px;
}

.brand-text {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-primary);
  display: none; /* Oculta en pantallas pequeñas si es necesario, o mostrar */
}

@media (min-width: 640px) {
    .brand-text { display: block; }
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  font-weight: 600;
  color: var(--text-secondary);
  font-size: 1.1rem;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.2s;
}

.nav-link:hover {
  color: var(--primary-color);
}

.nav-link.active {
  color: var(--primary-color);
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: 0px;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--primary-color);
  border-radius: 2px;
}

.main-content {
  padding-top: 2rem;
  padding-bottom: 2rem;
  flex: 1;
}

/* Transición de página */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
