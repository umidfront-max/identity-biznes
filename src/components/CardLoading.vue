<script lang="ts" setup>
import { useSettingsStore } from '/@/store/modules/settings.ts'

const settingsStore = useSettingsStore()
const { mode } = storeToRefs(settingsStore)
</script>
<template>
  <div>
    <div :class="{ 'dark-color': mode == 'dark' }" style="display: flex; justify-content: space-between; width: 450px">
      <div class="card-title" style="width: 340px; margin-right: 30px">
        <div class="loading-cell relative">
          <div class="loader"></div>
        </div>
      </div>
      <div class="card-title" :class="{ 'dark-color': mode == 'dark' }">
        <div class="loading-cell relative">
          <div class="loader"></div>
        </div>
      </div>
    </div>
    <div style="display: flex; justify-content: center; margin: 30px 0">
      <div class="card-info" :class="{ 'dark-color': mode == 'dark' }">
        <div>
          <div class="chip loading-cell relative">
            <div class="loader"></div>
          </div>
          <div class="loading-cell card-number">
            <div class="loader"></div>
          </div>
          <div class="card-date">
            <div class="loading-cell" style="width: 100%; height: 16px">
              <div class="loader"></div>
            </div>
            <div class="loading-cell" style="width: 100%; height: 16px; margin-top: 6px">
              <div class="loader"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="card-title" :class="{ 'dark-color': mode == 'dark' }" style="width: 180px; margin: 30px 0">
        <div class="loading-cell relative">
          <div class="loader"></div>
        </div>
      </div>
    </div>
    <div :class="{ 'dark-color': mode == 'dark' }">
      <div v-for="el in 6" :key="el" class="card-grid table-col" :class="{ 'dark-color': mode == 'dark' }">
        <div class="card-grid">
          <div class="card-border">
            <div class="loading-cell relative">
              <div class="loader"></div>
            </div>
          </div>
          <div class="card-border">
            <div class="loading-cell relative">
              <div class="loader"></div>
            </div>
          </div>
        </div>
        <div class="card-grid">
          <div class="card-border">
            <div class="loading-cell relative">
              <div class="loader"></div>
            </div>
          </div>
          <div class="card-border">
            <div class="loading-cell relative">
              <div class="loader"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '/@/assets/css/loading-cell.css';
.card-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  &.dark-color {
    background: #1d1e1f !important;
  }
}
.table-col {
  background: white;
}
.dark-color {
  background: #1d1e1f;
  .loading-cell {
    background-image: linear-gradient(to right, #3a3a3a 0%, #3f3f3f 10%, #4a4a4a 20%, #3f3f3f 30%, #3a3a3a 50%, #3a3a3a 100%);
    border: 1px solid #3a3a3a !important;
  }
  .card-border {
    border: 1px solid #3b3434 !important;
  }
}
.card-info {
  position: relative;
  width: 400px;
  height: 240px;
  background: white;
  border-radius: 16px;
  .chip {
    top: 24px !important;
    bottom: 24px !important;
    left: 24px !important;
    width: 55px;
    height: 45px;
  }
  .card-number {
    position: relative;
    top: 40px;
    left: 38px;
    width: 80% !important;
    height: 35px !important;
  }
  .card-date {
    position: absolute;
    right: 34px !important;
    bottom: 30px;
    width: 80px;
  }
  &.dark-color {
    background: #595555;
  }
}
.card-title {
  display: flex;
  flex-direction: column;
  // margin-top: 4px;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 6px;
}
.card-border {
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
