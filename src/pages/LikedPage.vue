<template>
    <v-container class="py-6">
      <div class="d-flex justify-space-between align-center mb-4">
          <h1 class="text-h4 font-weight-bold">Liked apartments</h1>
          <div class="text-body-2">Saved: {{ likedApartments.length }}</div>
      </div>
  
      <v-alert
        v-if="likedApartments.length === 0"
        type="info"
        variant="tonal"
        rounded="xl"
      >
        No liked apartments yet.
      </v-alert>
  
      <v-row dense v-else>
        <v-col
          v-for="apt in likedApartments"
          :key="apt.id"
          cols="12"
          sm="6"
          lg="4"
        >
          <v-card rounded="xl" elevation="2" class="h-100">
            <v-img :src="apt.image" height="170" cover />
  
            <v-card-text>
              <div class="d-flex justify-space-between align-center">
                <div class="font-weight-medium" style="max-width: 85%">
                  {{ apt.address }}
                </div>
  
                <v-btn icon variant="text" @click="toggleLike(apt.id)">
                  <v-icon :icon="likes[apt.id] ? 'mdi-heart' : 'mdi-heart-outline'" />
                </v-btn>
              </div>
  
              <div class="text-body-2 mt-1">
                {{ apt.area }} м² · {{ apt.rooms }} rooms · {{ apt.district }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { computed, ref, watch } from 'vue'
  import apartments from '../data/apartments.json'
  
  const likes = ref(JSON.parse(localStorage.getItem('likes') || '{}'))
  
  function toggleLike(id) {
    likes.value[id] = !likes.value[id]
  }
  
  watch(
    likes,
    (v) => localStorage.setItem('likes', JSON.stringify(v)),
    { deep: true }
  )
  
  const likedApartments = computed(() =>
    apartments.filter(a => likes.value[a.id])
  )
  </script>
  