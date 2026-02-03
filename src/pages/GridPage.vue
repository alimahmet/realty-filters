<template>
    <v-container class="py-6">
      <div class="d-flex justify-space-between align-center mb-4">
          <h1 class="text-h4 font-weight-bold">Apartments — Astana</h1>
          <div class="text-body-2">Found: {{ filteredApartments.length }}</div>
      </div>
  
      <v-row dense>
        <v-col cols="12" md="4" lg="3">
          <v-card class="pa-4" rounded="xl">
            <v-select
              v-model="filters.districts"
              :items="districtOptions"
              label="Districts"
              multiple
              chips
              clearable
            />
  
            <v-select
              v-model="filters.rooms"
              :items="roomsOptions"
              label="Rooms"
              multiple
              chips
              clearable
            />
  
            <v-select
              v-model="filters.areaRange"
              :items="areaRanges"
              item-title="title"
              item-value="value"
              label="Area"
              clearable
            />
  
            <v-select
              v-model="filters.furniture"
              :items="furnitureOptions"
              label="Furniture"
              multiple
              chips
              clearable
            />
  
            <v-btn class="mt-3" block variant="tonal" @click="resetFilters">
              Reset filters
            </v-btn>
          </v-card>
        </v-col>
  
        <v-col cols="12" md="8" lg="9">
          <v-alert
            v-if="filteredApartments.length === 0"
            type="info"
            variant="tonal"
            rounded="xl"
            class="mb-4"
          >
            No results. Try changing filters.
          </v-alert>
  
          <v-row dense>
            <v-col
              v-for="apt in filteredApartments"
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
  
                  <div v-if="apt.furniture?.length" class="mt-2 d-flex flex-wrap ga-2">
                    <v-chip
                      v-for="f in apt.furniture"
                      :key="f"
                      size="small"
                      variant="tonal"
                    >
                      {{ f }}
                    </v-chip>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { computed, reactive, ref, watch } from 'vue'
  import apartments from '../data/apartments.json'
  
  const districtOptions = [
    'Есильский',
    'Алматинский',
    'Сарыаркинский',
    'Байконур',
    'Нура',
    'Сарыарка',
  ]
  
  const roomsOptions = [1, 2, 3, 4, 5]
  
  const areaRanges = [
    { title: 'до 40 м²', value: [0, 40] },
    { title: '40–60 м²', value: [40, 60] },
    { title: '60–80 м²', value: [60, 80] },
    { title: '80–100 м²', value: [80, 100] },
    { title: '100+ м²', value: [100, 9999] },
  ]
  
  const furnitureOptions = ['Кухня', 'Шкаф', 'Кровать', 'Диван', 'Стол', 'Стиралка']
  
  const filters = reactive({
    districts: [],
    rooms: [],
    areaRange: null,
    furniture: [],
  })
  
  const likes = ref(JSON.parse(localStorage.getItem('likes') || '{}'))
  
  function toggleLike(id) {
    likes.value[id] = !likes.value[id]
  }
  
  watch(
    likes,
    (v) => localStorage.setItem('likes', JSON.stringify(v)),
    { deep: true }
  )
  
  const filteredApartments = computed(() => {
    return apartments.filter((a) => {
      if (filters.districts.length && !filters.districts.includes(a.district)) return false
      if (filters.rooms.length && !filters.rooms.includes(a.rooms)) return false
  
      if (filters.areaRange) {
        const [minA, maxA] = filters.areaRange
        if (a.area < minA || a.area > maxA) return false
      }
  
      if (filters.furniture.length) {
        const set = new Set(a.furniture || [])
        for (const f of filters.furniture) {
          if (!set.has(f)) return false
        }
      }
  
      return true
    })
  })
  
  function resetFilters() {
    filters.districts = []
    filters.rooms = []
    filters.areaRange = null
    filters.furniture = []
  }
  </script>
  