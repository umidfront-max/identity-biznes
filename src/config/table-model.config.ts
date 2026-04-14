import { ref, inject } from 'vue'
import { AxiosPromise } from 'axios'
import router from '/@/router'
import instance from '/@/utils/request.ts'
import { getValueFromGivenObjectByKey } from '/@/utils/object.ts'
export default abstract class TableModelConfig {
  $baseConfirm = inject<any>('$baseConfirm')
  $baseMessage = inject<any>('$baseMessage')

  sortBy = ref()
  item = ref({})
  total = ref(0)
  list = ref([])
  extraParams = ref({})
  perPage = ref(10)
  isBusy = ref(false)
  isFetchingItem = ref(false)
  currentPage = ref(1)
  searchQuery = ref('')
  isPagination = ref(false)

  viewTableColumns = ref<any>([])

  hasView = ref<any>(true)
  hasDelete = ref<any>(true)
  hasCreate = ref<any>(true)
  hasEdit = ref<any>(true)

  abstract title: string
  abstract endpoint: string
  abstract tableColumns: TableCol[]

  // $FETCHING LIST HANDLERS ================>

  getListEndpoint(): string {
    return `/${this.endpoint}`
  }

  getTotalQuery(): object {
    const generatedQuery: QueryBody = {}

    if (this.searchQuery.value) {
      generatedQuery.search = this.searchQuery.value
    }
    if (this.sortBy.value) {
      generatedQuery.sort = this.sortBy.value
    }

    return {
      page: this.currentPage.value,
      per_page: this.perPage.value,
      ...generatedQuery,
      ...this.extraParams.value,
    }
  }

  getList() {
    this.isBusy.value = true

    instance
      .get(this.getListEndpoint(), { params: this.getTotalQuery() })
      .then((response: any) => {
        const { data, meta } = response

        if (data) {
          this.isPagination.value = true
          this.list.value = data
          this.total.value = meta ? meta.total : null
        } else {
          this.isPagination.value = false
          this.list.value = data
        }
      })
      .finally(() => {
        this.isBusy.value = false
      })
  }

  rebootData = () => {
    this.getList()
  }

  // $FETCHING LIST HANDLERS //==============>

  // FETCHING ITEM HANDLERS =============>
  getItemEndpoint(id: any): string {
    return `/${this.endpoint}/${id}`
  }

  getItem(id: any) {
    this.isFetchingItem.value = true

    return new Promise((resolve, reject) => {
      instance
        .get(this.getItemEndpoint(id))
        .then((response: any) => {
          const { data } = response

          if (data) {
            resolve(data)
          }
        })
        .catch((err) => {
          reject(err)
          this.$baseMessage('Something went wrong', 'warning', 'hey')
        })
        .finally(() => {
          this.isFetchingItem.value = false
        })
    })
  }

  // FETCHING ITEM HANDLERS //===========>

  // $DELETION HANDLERS ================>
  delete(id: any): AxiosPromise {
    return instance.delete(`${this.endpoint}`, { data: { ids: [id] } })
  }

  onDelete(data: { id: string | number }): void {
    if (data.id) {
      this.$baseConfirm('Are You Sure', 'Delete', async () => {
        await this.delete(data.id)
          .then(() => {
            this.rebootData()
            this.$baseMessage('Successfully deleted !', 'success', 'hey')
          })
          .catch(() => {
            this.$baseMessage('Something went wrong', 'warning', 'hey')
          })
      })
    } else {
      this.$baseMessage('No ID', 'warning', 'hey')
    }
  }
  // $DELETION HANDLERS //==============>
  // $EDITION HANDLERS ================>
  getUpdateRoute(data: { id: unknown }): string {
    return `/${this.endpoint}/${data.id}/update`
  }
  update(data: { id: unknown }) {
    router.push(this.getUpdateRoute(data))
  }
  // $EDITION HANDLERS //==============>
  // CREATION HANDLERS ================>
  getCreateRoute(): string {
    return `/${this.endpoint}/create`
  }

  create() {
    router.push(this.getCreateRoute())
  }
  // CREATION HANDLERS //==============>

  // VIEW HANDLERS ================>
  setFormColumns(tableRowItem: any) {
    // @ts-ignore
    this.viewTableColumns = this.tableColumns.map(({ key, label }) => ({
      value: getValueFromGivenObjectByKey(tableRowItem, key),
      label,
      key,
    }))
  }
  // VIEW HANDLERS //==============>
}
