<script lang="ts" setup>
import { rules } from './rules'
import { PROFIL_STATUS_ENUM } from '/@/services/profile'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const _myInfo = ref({
  username: '',
  first_name: '',
  last_name: '',
  status: '',
})
</script>

<template>
  <div class="profil-update">
    <el-form label-position="top" :model="_myInfo" :rules="rules">
      <el-form-item :label="t('profile.columns.username')" prop="username">
        <el-input v-model="_myInfo.username" />
      </el-form-item>
      <div class="grid">
        <el-form-item :label="t('profile.columns.first_name')" prop="first_name">
          <el-input v-model="_myInfo.first_name" />
        </el-form-item>
        <el-form-item :label="t('profile.columns.last_name')" prop="last_name">
          <el-input v-model="_myInfo.last_name" />
        </el-form-item>
      </div>
      <el-form-item :label="t('profile.columns.status')" prop="status">
        <el-radio-group v-model="_myInfo.status">
          <el-radio border :label="PROFIL_STATUS_ENUM.ACTIVE">{{ $t('profile.columns.active') }}</el-radio>
          <el-radio border :label="PROFIL_STATUS_ENUM.INACTIVE">{{ $t('profile.columns.inactive') }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="profil_btn">
        <el-button plain type="danger">{{ $t('buttons.cancel') }}</el-button>
        <el-button plain type="primary">{{ $t('buttons.save') }}</el-button>
      </div>
    </el-form>
  </div>
</template>
<style lang="scss">
.profil-update {
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 10px;
  .grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 30px;
  }
  .profil_btn {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
