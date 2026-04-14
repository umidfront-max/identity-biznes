<script lang="ts" setup>
import { useSettingsStore } from '/@/store/modules/settings.ts'

const settingsStore = useSettingsStore()
const { mode } = storeToRefs(settingsStore)
</script>
<template>
  <div :class="{ 'dark-color': mode == 'dark' }">
    <div style="display: flex; justify-content: space-between; width: 450px">
      <div class="single-title" style="width: 340px; margin-right: 30px">
        <div class="loading-cell relative">
          <div class="loader"></div>
        </div>
      </div>
      <div class="single-title">
        <div class="loading-cell relative">
          <div class="loader"></div>
        </div>
      </div>
    </div>
    <div>
      <div class="single-title" style="width: 180px; margin: 20px 0">
        <div class="loading-cell relative">
          <div class="loader"></div>
        </div>
      </div>
    </div>
    <div v-for="el in 6" :key="el" class="single-grid table-col" :class="{ 'dark-color': mode == 'dark' }">
      <div class="single-grid">
        <div class="single-border">
          <div class="loading-cell relative">
            <div class="loader"></div>
          </div>
        </div>
        <div class="single-border">
          <div class="loading-cell relative">
            <div class="loader"></div>
          </div>
        </div>
      </div>
      <div class="single-grid">
        <div class="single-border">
          <div class="loading-cell relative">
            <div class="loader"></div>
          </div>
        </div>
        <div class="single-border">
          <div class="loading-cell relative">
            <div class="loader"></div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="single-title" style="width: 180px; margin: 20px 0">
        <div class="loading-cell relative">
          <div class="loader"></div>
        </div>
      </div>
    </div>
    <div v-for="el in 6" :key="el" class="single-grid table-col" :class="{ 'dark-color': mode == 'dark' }">
      <div class="single-grid">
        <div class="single-border">
          <div class="loading-cell relative">
            <div class="loader"></div>
          </div>
        </div>
        <div class="single-border">
          <div class="loading-cell relative">
            <div class="loader"></div>
          </div>
        </div>
      </div>
      <div class="single-grid">
        <div class="single-border">
          <div class="loading-cell relative">
            <div class="loader"></div>
          </div>
        </div>
        <div class="single-border">
          <div class="loading-cell relative">
            <div class="loader"></div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="single-title" style="width: 180px; margin: 20px 0">
        <div class="loading-cell relative">
          <div class="loader"></div>
        </div>
      </div>
    </div>
    <div v-for="el in 6" :key="el" class="single-grid table-col" :class="{ 'dark-color': mode == 'dark' }">
      <div class="single-grid">
        <div class="single-border">
          <div class="loading-cell relative">
            <div class="loader"></div>
          </div>
        </div>
        <div class="single-border">
          <div class="loading-cell relative">
            <div class="loader"></div>
          </div>
        </div>
      </div>
      <div class="single-grid">
        <div class="single-border">
          <div class="loading-cell relative">
            <div class="loader"></div>
          </div>
        </div>
        <div class="single-border">
          <div class="loading-cell relative">
            <div class="loader"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '/@/assets/css/loading-cell.css';
.single-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.table-col {
  background: white;
}
.dark-color {
  background: transparent;
  .loading-cell {
    background-image: linear-gradient(to right, #3a3a3a 0%, #3f3f3f 10%, #4a4a4a 20%, #3f3f3f 30%, #3a3a3a 50%, #3a3a3a 100%);
    border: 1px solid #3a3a3a !important;
  }
  .single-border {
    border: 1px solid #3b3434 !important;
  }
}
.single-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 6px;
}
.single-border {
  display: flex;
  flex-direction: column;
  // margin-top: 4px;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px;
  // background: white;
  border: 1px solid #e1e0e0;
}
</style>
