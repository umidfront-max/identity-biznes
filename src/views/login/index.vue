<script lang="ts" setup>
import { ElNotification } from 'element-plus'
import { rules } from './rules'
import { PERMISSION_ENUM } from '/@/router/pemissionsEnum'
import { _PermissionsStore, _TOKEN, _deviceStore, _profileStore, getProfile_API, login_API } from '/@/services/profile'
import { useSettingsStore } from '/@/store/modules/settings.ts'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const settingsStore = useSettingsStore()
const { title } = storeToRefs(settingsStore)
const _loading = ref(false)
const redirect = ref<any>(undefined)
const _formRef = ref()
const _form = ref({
  username: '',
  password: '',
})

function afterLogin(token: string) {
  if (token) {
    _TOKEN.value = token
    const hour = new Date().getHours()
    const thisTime =
      hour < 8
        ? t('login.good_morning')
        : hour <= 11
          ? t('login.good_morning')
          : hour <= 13
            ? t('login.good_afternoon')
            : hour < 18
              ? t('login.good_evening')
              : t('login.good_night')
    ElNotification({
      title: t('login.welcome'),
      message: thisTime,
      type: 'success',
    })
  } else {
    const err = t(`login.messages.incorrect_token_message`)
    ElNotification({
      title: t('login.hey'),
      message: err,
      type: 'success',
    })
  }
}

_deviceStore.value.deviceType = getDeviceType()
_deviceStore.value.deviceOS = getOperatingSystem()
_deviceStore.value.deviceName = navigator.userAgent

function getDeviceType() {
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(navigator.userAgent)) {
    return 'Tablet'
  } else if (/(mobi|opera mini|iphone|android|mobile|windows phone|iemobile)/i.test(navigator.userAgent)) {
    return 'Mobile'
  }
  return 'Desktop'
}

function getOperatingSystem() {
  const userAgent = navigator.userAgent
  if (/Windows/.test(userAgent)) {
    return 'Windows'
  } else if (/Mac OS|MacOS/.test(userAgent)) {
    return 'macOS'
  } else if (/Android/.test(userAgent)) {
    return 'Android'
  } else if (/iOS/.test(userAgent)) {
    return 'iOS'
  } else if (/Linux/.test(userAgent)) {
    return 'Linux'
  }
  return 'Unknown'
}

async function loadMyself() {
  const [error, response] = await getProfile_API()

  if (error) return

  _profileStore.value = response.data

  for (const key in _profileStore.value.permissions) {
    if (Object.prototype.hasOwnProperty.call(_profileStore.value.permissions, key)) {
      const element = _profileStore.value.permissions[key]

      _PermissionsStore.value.set(key as PERMISSION_ENUM, element)
    }
  }

  router.push('/')
}

function handleLogin() {
  _formRef.value?.validate(async (valid: any) => {
    if (valid) {
      _loading.value = true
      const [error, response] = await login_API(_form.value.username, _form.value.password)
      _loading.value = false

      if (error) return

      afterLogin(response.data.token)
      loadMyself()
    }
  })
}

watchEffect(() => {
  redirect.value = (route.query && route.query.redirect) || '/'
})
</script>

<template>
  <div class="login-page">
    <div class="login-tools">
      <vab-language />
      <vab-dark />
    </div>

    <div class="login-box">
      <div class="login-brand">
        <div class="brand-mark">IB</div>
        <span class="brand-name">{{ title }}</span>
      </div>

      <div class="login-heading">
        <h1>{{ $t('login.hello') }}</h1>
        <p>{{ $t('login.welcome_to') }}{{ title }}</p>
      </div>

      <el-form ref="_formRef" label-position="top" :model="_form" :rules="rules" @submit.prevent="handleLogin">
        <el-form-item :label="t('login.placeholders.user_name')" prop="username">
          <el-input
            v-model.trim="_form.username"
            clearable
            :placeholder="t('login.placeholders.user_name')"
            size="large"
            type="text"
          />
        </el-form-item>
        <el-form-item :label="t('login.placeholders.password')" prop="password">
          <el-input
            ref="passwordRef"
            v-model.trim="_form.password"
            clearable
            :placeholder="t('login.placeholders.password')"
            size="large"
            type="password"
            show-password
          />
        </el-form-item>
        <el-button class="login-submit" :loading="_loading" native-type="submit" size="large" type="primary">
          {{ $t('login.login') }}
        </el-button>
      </el-form>

      <div class="login-hint">Demo: admin / admin</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 24px;
  background: #fafafa;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.login-tools {
  position: fixed;
  top: 20px;
  right: 24px;
  display: flex;
  align-items: center;
  gap: 4px;
  z-index: 10;
}

.login-box {
  width: 100%;
  max-width: 400px;
  padding: 40px;
  background: #ffffff;
  border: 1px solid #ececec;
  border-radius: 16px;
}

.login-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 36px;

  .brand-mark {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    color: #ffffff;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: -0.5px;
    box-shadow: 0 2px 8px rgba(37, 99, 235, 0.25);
  }

  .brand-name {
    font-size: 14px;
    font-weight: 600;
    color: #111111;
    letter-spacing: -0.2px;
  }
}

.login-heading {
  margin-bottom: 28px;

  h1 {
    margin: 0;
    font-size: 24px;
    font-weight: 600;
    color: #111111;
    letter-spacing: -0.4px;
  }

  p {
    margin: 6px 0 0;
    font-size: 14px;
    color: #6b7280;
    line-height: 1.5;
  }
}

.login-submit {
  width: 100%;
  height: 44px;
  margin-top: 8px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.1px;
  border-radius: 10px;
  background: #2563eb;
  border: none;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.2);
  transition: all 0.15s ease;

  &:hover,
  &:focus {
    background: #1d4ed8;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
  }

  &:active {
    background: #1e40af;
  }
}

.login-hint {
  margin-top: 24px;
  text-align: center;
  font-size: 12px;
  color: #9ca3af;
  letter-spacing: 0.2px;
}

:deep(.el-form-item) {
  margin-bottom: 18px;

  .el-form-item__label {
    padding: 0 0 6px;
    font-size: 13px;
    font-weight: 500;
    color: #374151;
    line-height: 1.4;
  }

  .el-input__wrapper {
    padding: 0 14px;
    height: 42px;
    border-radius: 10px;
    background: #ffffff;
    box-shadow: 0 0 0 1px #e5e7eb;
    transition: box-shadow 0.15s ease;

    &:hover {
      box-shadow: 0 0 0 1px #d1d5db;
    }

    &.is-focus {
      box-shadow: 0 0 0 1.5px #2563eb;
    }
  }

  .el-input__inner {
    height: 42px;
    font-size: 14px;
    color: #111111;

    &::placeholder {
      color: #9ca3af;
    }
  }

  .el-form-item__error {
    padding-top: 4px;
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .login-box {
    padding: 32px 24px;
    border: none;
    background: transparent;
  }
}
</style>
