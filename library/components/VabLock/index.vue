<template>
  <div class="vab-lock">
    <!-- <vab-icon icon="lock-line" @click="handleLock" /> -->
    <el-button class="header_btn" @click="handleLock">
      <vab-icon class="icons" icon="lock-line" />
    </el-button>
    <el-drawer
      v-model="lock"
      append-to-body
      class="vab-lock-drawer"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      direction="ttb"
      :show-close="false"
      size="100%"
      :with-header="false"
    >
      <div class="vab-screen-lock">
        <div
          class="vab-screen-lock-background"
          :style="{
            background: `var(--el-color-primary-light-5) fixed url(${background}) center`,
            backgroundSize: '100% 100%',
            filter: 'blur(10px)',
            transform: 'scale(1.1)',
          }"
        ></div>
        <div class="vab-screen-lock-content">
          <div class="vab-screen-lock-content-title">
            <el-avatar :size="180" :src="_profileStore.avatar?.preview_link || './static/svg/avatar.svg'" />
            <vab-icon icon="lock-line" />
            {{ title }} {{ $t('lock.screen_locked') }}
          </div>
          <div class="vab-screen-lock-content-form">
            <el-form ref="formRef" :model="form" :rules="rules" @submit.prevent>
              <el-form-item label="" :label-width="0" prop="password">
                <el-input v-model="form.password" v-focus autocomplete="off" :placeholder="$t('lock.enter_password')" type="password" />
                <el-button native-type="submit" type="primary" @click="handleUnLock">
                  <vab-icon icon="lock-line" />
                  <span>{{ $t('lock.unlock') }}</span>
                </el-button>
              </el-form-item>
            </el-form>
          </div>
          <span @click="randomBackground">{{ $t('lock.switch_wallpapers') }}</span>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useSettingsStore } from '/@/store/modules/settings'
import { _profileStore } from '~/src/services/profile'

defineOptions({
  name: 'VabLock',
})

const { t } = useI18n()
const settingsStore = useSettingsStore()
const { lock, title } = storeToRefs(settingsStore)
const { handleLock: _handleLock, handleUnLock: _handleUnLock } = settingsStore
const url = 'https://gcore.jsdelivr.net/gh/chuzhixin/image/vab-image-lock/'

const background = ref(`${url}${Math.round(Math.random() * 31)}.jpg`)
const randomBackground = () => {
  background.value = `${url}${Math.round(Math.random() * 31)}.jpg`
}

const validatePass = (rule: any, value: string, callback: any) => {
  if (value === '' || value !== '123456') {
    callback(new Error(t('lock.incorrect_password')))
  } else {
    callback()
  }
}

const formRef = ref()
const form = reactive({
  password: '123456',
})
const rules = {
  password: [{ validator: validatePass, trigger: 'blur' }],
}

const handleUnLock = () => {
  formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      useTimeoutFn(async () => {
        await _handleUnLock()
      }, 500)
    }
  })
}

const handleLock = () => {
  _handleLock()
}
</script>

<style lang="scss">
.el-overlay:has(.vab-lock-drawer) {
  backdrop-filter: none;

  .vab-lock-drawer {
    .el-drawer__body {
      padding: 0 !important;
      overflow: hidden !important;
    }
  }
}
// custom style
.header_btn {
  width: 32px !important;
  height: 32px;
  padding: 5px !important;
  margin-left: 10px;
  background: #f1f5f9 !important;
  &:hover {
    background: var(--el-color-primary-light-9) !important;
  }
  .icons {
    font-size: 15px;
    color: #0f172a !important;
  }
  .el-button {
    width: 32px !important;
    padding: 5px !important;
  }
}
.dark .header_btn {
  background: transparent !important;
  .icons {
    color: #f1f5f9 !important;
  }
  &:hover {
    background: var(--el-color-primary-light-9) !important;
  }
}
</style>

<style lang="scss" scoped>
.vab-lock-drawer {
  .vab-screen-lock {
    position: relative;
    z-index: var(--el-z-index);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    font-weight: bold;
    background: var(--el-mask-color);
    opacity: var(--opacity-value);

    &-background {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: calc(var(--el-z-index) - 1);
    }

    &-content {
      z-index: var(--el-z-index);
      width: 400px;
      padding: 40px 55px 40px 55px;
      color: var(--el-color-grey);
      text-align: center;
      background: var(--el-mask-color);
      backdrop-filter: blur(10px);
      border: 1px solid var(--el-border-color);
      border-radius: 15px;

      > span {
        font-size: var(--el-font-size-small);
        cursor: pointer;
      }

      &-title {
        line-height: 50px;
        color: var(--el-color-grey);
        text-align: center;

        :deep() {
          .el-avatar {
            width: 150px;
            height: 150px;

            img {
              padding: 30px;
              cursor: pointer;
            }
          }

          .ri-lock-line {
            display: block;
            margin: auto !important;
            font-size: 30px;
            color: var(--el-color-grey) !important;
          }
        }
      }

      &-form {
        :deep() {
          .el-input {
            position: relative;
            width: 100%;
            height: 40px;
            line-height: 40px;

            &__wrapper {
              padding-right: 0;
              border: 1px solid var(--el-color-primary);
              box-shadow: none;
            }

            &__inner {
              width: 180px;
            }

            &__suffix {
              .el-input__validateIcon {
                display: none;
              }
            }
          }

          .el-button {
            position: absolute;
            right: -1px;
            z-index: 999;
            height: 40px;
            margin-left: 0 !important;
            line-height: 40px;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;

            .ri-lock-line {
              margin-left: 0 !important;
            }
          }
        }
      }
    }

    @media (max-width: 768px) {
      .vab-screen-lock-content {
        width: 100% !important;
        padding: 40px 35px 40px 35px;
        margin: 5vw;
      }
    }
  }
}
</style>
