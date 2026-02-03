<template>
  <v-app>
    <v-app-bar flat>
      <v-container class="d-flex align-center justify-space-between">
        <div class="font-weight-bold">Realty Filters</div>
        <div class="d-flex ga-2">
          <v-btn to="/" variant="text">All</v-btn>
          <v-btn to="/liked" variant="text">Liked</v-btn>
        </div>
      </v-container>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import GridPage from './pages/GridPage.vue'
</script>
