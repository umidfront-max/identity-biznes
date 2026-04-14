<script lang="ts" setup>
import { useSettingsStore } from '/@/store/modules/settings.ts'

const settingsStore = useSettingsStore()
const { mode } = storeToRefs(settingsStore)
</script>
<template>
  <div :class="{ 'dark-color': mode == 'dark' }">
    <div class="d-flex" style="width: 460px">
      <div class="loading-cell" style="width: 330px; height: 30px">
        <div class="loader"></div>
      </div>
      <div>
        <div class="loading-cell relative" style="width: 120px; height: 30px">
          <div class="loader"></div>
        </div>
      </div>
    </div>
    <div style="display: flex; justify-content: space-between">
      <div class="loading-cell relative" style="width: 120px; height: 30px; margin: 16px 0">
        <div class="loader"></div>
      </div>
      <div class="d-flex">
        <div class="loading-cell relative" style="width: 44px; height: 34px">
          <div class="loader"></div>
        </div>
        <div class="loading-cell relative" style="width: 44px; height: 34px">
          <div class="loader"></div>
        </div>
        <div class="loading-cell relative" style="width: 44px; height: 34px">
          <div class="loader"></div>
        </div>
        <div class="loading-cell relative" style="width: 44px; height: 34px">
          <div class="loader"></div>
        </div>
        <div class="loading-cell relative" style="width: 44px; height: 34px">
          <div class="loader"></div>
        </div>
      </div>
    </div>
    <div class="grid" :class="{ 'dark-color': mode == 'dark' }">
      <div>
        <div class="border">
          <div class="loading-cell" style="height: 24px">
            <div class="loader"></div>
          </div>
        </div>
        <div v-for="ind in 6" :key="ind" class="border" style="border-top: none; border-right: 0">
          <div class="d-flex">
            <div class="loading-cell relative" style="width: 44px; height: 34px">
              <div class="loader"></div>
            </div>
            <div class="loading-cell relative" style="width: 44px; height: 34px">
              <div class="loader"></div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="border">
          <div class="loading-cell relative">
            <div class="loader"></div>
          </div>
        </div>
        <div v-for="ind in 6" :key="ind" class="border" style="height: 49.8px; border-top: 0px; border-right: 0">
          <div class="loading-cell relative">
            <div class="loader"></div>
          </div>
        </div>
      </div>
      <div>
        <div class="border">
          <div class="loading-cell relative">
            <div class="loader"></div>
          </div>
        </div>
        <div v-for="ind in 6" :key="ind" class="border" style="height: 49.8px; border-top: 0px; border-right: 0">
          <div class="loading-cell relative">
            <div class="loader"></div>
          </div>
        </div>
      </div>
      <div>
        <div class="border">
          <div class="loading-cell relative">
            <div class="loader"></div>
          </div>
        </div>
        <div v-for="ind in 6" :key="ind" class="border" style="height: 49.8px; border-top: 0px; border-right: 0">
          <div class="loading-cell relative">
            <div class="loader"></div>
          </div>
        </div>
      </div>
      <div>
        <div class="border">
          <div class="loading-cell relative">
            <div class="loader"></div>
          </div>
        </div>
        <div v-for="ind in 6" :key="ind" class="border" style="height: 49.8px; border-top: 0px; border-right: 0">
          <div class="loading-cell relative">
            <div class="loader"></div>
          </div>
        </div>
      </div>
      <div>
        <div class="border">
          <div class="loading-cell relative">
            <div class="loader"></div>
          </div>
        </div>
        <div v-for="ind in 6" :key="ind" class="border" style="height: 49.8px; border-top: 0px">
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
.grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  background: white;
}
.dark-color {
  background: transparent;
  .loading-cell {
    background-image: linear-gradient(to right, #3a3a3a 0%, #3f3f3f 10%, #4a4a4a 20%, #3f3f3f 30%, #3a3a3a 50%, #3a3a3a 100%);
    border: 1px solid #3a3a3a !important;
  }
  .border {
    border: 1px solid #3b3434 !important;
  }
}
.border {
  display: flex;
  flex-direction: column;
  // margin-top: 4px;
  align-items: center;
  justify-content: center;
  padding: 6px;
  // background: white;
  border: 1px solid #e1e0e0;
}
.d-flex {
  display: flex;
  gap: 10px;
}
</style>
