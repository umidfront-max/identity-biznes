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
  <div class="login-container">
    <div class="login-right-tools">
      <vab-language />
      <vab-dark />
    </div>

    <div class="login-card">
      <!-- Left side - illustration -->
      <div class="login-left">
        <div class="login-left-content">
          <img alt="Identity Biznes" class="login-illustration" src="/src/assets/login-illustration.svg" />
          <h2 class="login-left-title">{{ title }}</h2>
          <p class="login-left-desc">{{ $t('login.welcome_to') }}{{ title }}</p>
        </div>
      </div>

      <!-- Right side - form -->
      <div class="login-right">
        <div class="login-right-content">
          <div class="login-logo-area">
            <img alt="Logo" class="login-logo" src="/src/assets/logo2.svg" />
          </div>
          <h1 class="login-title">{{ $t('login.hello') }}</h1>
          <p class="login-subtitle">{{ $t('login.welcome_to') }}{{ title }}</p>

          <el-form ref="_formRef" label-position="top" :model="_form" :rules="rules" @submit.prevent="handleLogin">
            <el-form-item :label="t('login.placeholders.user_name')" prop="username">
              <el-input v-model.trim="_form.username" clearable :placeholder="t('login.placeholders.user_name')" size="large" type="text">
                <template #prefix>
                  <vab-icon icon="user-line" />
                </template>
              </el-input>
            </el-form-item>
            <el-form-item :label="t('login.placeholders.password')" prop="password">
              <el-input
                ref="passwordRef"
                v-model.trim="_form.password"
                clearable
                :placeholder="t('login.placeholders.password')"
                size="large"
                type="password"
              >
                <template #prefix>
                  <vab-icon icon="lock-line" />
                </template>
              </el-input>
            </el-form-item>
            <el-button class="login-btn" :loading="_loading" native-type="submit" size="large" type="primary">
              {{ $t('login.login') }}
            </el-button>
          </el-form>

          <div class="login-demo-hint">
            <span>Demo: admin / admin</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at 30% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 70% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%);
    animation: bgMove 20s ease-in-out infinite;
  }

  .login-right-tools {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  .login-card {
    position: relative;
    z-index: 1;
    display: flex;
    width: 960px;
    max-width: 95vw;
    min-height: 560px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 24px;
    box-shadow:
      0 25px 60px rgba(0, 0, 0, 0.15),
      0 0 0 1px rgba(255, 255, 255, 0.2);
    overflow: hidden;
  }

  .login-left {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f0f0ff 0%, #e8e0ff 100%);
    padding: 40px;

    &-content {
      text-align: center;
    }

    &-title {
      margin-top: 20px;
      font-size: 24px;
      font-weight: 700;
      color: #4f46e5;
      letter-spacing: -0.5px;
    }

    &-desc {
      margin-top: 8px;
      font-size: 14px;
      color: #6b7280;
    }
  }

  .login-illustration {
    width: 100%;
    max-width: 360px;
    height: auto;
  }

  .login-right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;

    &-content {
      width: 100%;
      max-width: 360px;
    }
  }

  .login-logo-area {
    margin-bottom: 24px;

    .login-logo {
      width: 48px;
      height: 48px;
    }
  }

  .login-title {
    font-size: 32px;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 4px;
    letter-spacing: -0.5px;
  }

  .login-subtitle {
    font-size: 15px;
    color: #6b7280;
    margin-bottom: 32px;
  }

  .login-btn {
    width: 100%;
    height: 48px;
    margin-top: 8px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 12px;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    border: none;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
    }
  }

  .login-demo-hint {
    margin-top: 24px;
    text-align: center;
    font-size: 13px;
    color: #9ca3af;

    span {
      padding: 6px 16px;
      background: #f3f4f6;
      border-radius: 20px;
    }
  }

  :deep(.el-form-item) {
    margin-bottom: 20px;

    .el-form-item__label {
      font-weight: 500;
      color: #374151;
      font-size: 14px;
      padding-bottom: 6px;
    }

    .el-input {
      .el-input__wrapper {
        border-radius: 12px;
        padding: 4px 12px;
        box-shadow: 0 0 0 1px #e5e7eb;
        transition: all 0.3s ease;

        &:hover {
          box-shadow: 0 0 0 1px #a5b4fc;
        }

        &.is-focus {
          box-shadow: 0 0 0 2px #6366f1;
        }
      }
    }

    .el-form-item__error {
      font-size: 12px;
    }
  }
}

@keyframes bgMove {
  0%,
  100% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(-2%, 1%);
  }
  50% {
    transform: translate(1%, -1%);
  }
  75% {
    transform: translate(-1%, 2%);
  }
}

@media (max-width: 768px) {
  .login-container {
    .login-card {
      flex-direction: column;
      min-height: auto;
    }

    .login-left {
      display: none;
    }

    .login-right {
      padding: 32px 24px;
    }
  }
}
</style>
