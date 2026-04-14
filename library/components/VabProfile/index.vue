<template>
  <div class="vab-profile personal-center-container no-background-container">
    <el-row :gutter="20" style="margin-bottom: 5px">
      <el-col :lg="8" :md="12" :sm="24" :xl="8" :xs="24">
        <vab-card class="vab-profile-top">
          <vab-back-button />
        </vab-card>
        <vab-card>
          <el-skeleton v-if="!_profileStore.id" class="user-info-skeleton">
            <template #template>
              <el-skeleton-item style="width: 100px; height: 100px; border-radius: 50%" variant="image" />
              <div style="padding: 14px">
                <el-skeleton-item style="width: 50%; height: 24px; margin-bottom: 5px" variant="p" />
                <el-skeleton-item style="width: 50%; margin-bottom: 5px" variant="p" />
              </div>
            </template>
          </el-skeleton>
          <div v-else class="user-info">
            <el-avatar :size="100" :src="_profileStore.avatar?.preview_link" />
            <div class="user-info-full-name">
              {{ _profileStore.username }}
            </div>
            <div class="user-info-description">
              {{ _profileStore.first_name }}
              {{ _profileStore.last_name }}
            </div>
          </div>
        </vab-card>
      </el-col>
      <el-col :lg="16" :md="12" :sm="24" :xl="16" :xs="24">
        <vab-card>
          <el-tabs v-model="activeName">
            <el-tab-pane v-for="elTab in elTabs" :key="elTab.name" :label="elTab.label" :name="elTab.name">
              <slot :name="'el-tab-' + elTab.name" />
            </el-tab-pane>
          </el-tabs>
        </vab-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :lg="24" :md="12" :sm="24" :xl="24" :xs="24">
        <el-tabs v-model="activeBottomTabName">
          <el-tab-pane v-for="elTab in elTabsBottom" :key="elTab.name" :label="elTab.label" :name="elTab.name">
            <slot :is-active-tab="activeBottomTabName === elTab.name" :name="'el-tab-bottom-' + elTab.name" />
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import { ProfileModel, _profileStore, getProfile_DEFAULT } from '~/src/services/profile'

defineOptions({ name: 'VabProfile' })

const { elTabs, elTabsBottom } = defineProps<{
  elTabs: ElTab[]
  elTabsBottom: ElTab[]
}>()

const _formData = ref<ProfileModel>(getProfile_DEFAULT())

const activeName = ref<string>(elTabs[0].name)
const activeBottomTabName = ref<string>(elTabsBottom[0].name ?? '')

onMounted(() => {
  _formData.value = _profileStore.value
})
</script>

<style lang="scss">
.vab-profile.personal-center-container {
  .user-info {
    padding: var(--el-padding);
    text-align: center;

    &-skeleton {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--el-padding);

      & div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
      }
    }

    &-full-name {
      margin-top: 15px;
      font-size: 24px;
      font-weight: 500;
      color: var(--el-color-grey);
    }

    &-description {
      margin-top: 8px;
    }
  }

  .vab-profile-top {
    .el-card__body {
      padding: 12px 18px !important;
    }
  }
}
</style>
