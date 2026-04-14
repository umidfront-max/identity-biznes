export const useErrorLogStore = defineStore('errorLog', {
  state: (): ErrorLogModuleType => ({
    errorLogs: [],
  }),
  getters: {
    getErrorLogs: (state) => state.errorLogs,
  },
  actions: {
    addErrorLog(errorLog: any) {
      this.errorLogs.push(errorLog)
    },
    clearErrorLog() {
      this.errorLogs.splice(0)
    },
  },
})

export type ErrorLogModuleType = {
  errorLogs: any[]
}
