import { UsersResponseDTO, UserStoreType } from '/@/api/users/dto/usersDTO'
import { deleteUsers, getSingleUser, getUsersList } from '/@/api/users/users.ts'
import { BaseListRequest } from '/@/base/baseListRequest.ts'
import { BaseTableFilterableField } from '/@/base/baseTableFilterableField.ts'
const emptyData: UsersResponseDTO = {
  id: null,
  username: '',
  phone: '',
  first_name: '',
  last_name: '',
  status: false,
  password: null,
  password_confirmation: null,
}
export const useUsersStore = defineStore('users', {
  state: (): UserStoreType<UsersResponseDTO> => {
    return {
      formData: emptyData,
      list: [],
      theme: null,
      tableColumns: [
        {
          label: 'Username',
          prop: 'username',
          sortable: true,
          checked: true,
        },

        {
          label: 'Ism',
          prop: 'first_name',
          sortable: true,
          checked: true,
        },
        {
          label: 'Familiya',
          prop: 'last_name',
          sortable: true,
          checked: true,
        },
        {
          label: 'Status',
          prop: 'status',
          checked: true,
        },
        {
          label: 'telefon nomer',
          prop: 'phone',
        },
      ],
      tableData: { success: true },
      currentFilters: {},
    }
  },
  getters: {
    filterableFields: (): BaseTableFilterableField[] => {
      return [] // Here can be some filterable fields
    },
  },
  actions: {
    async updateFilters(query: BaseListRequest) {
      this.currentFilters = query
      await this.refreshTable()
    },
    async refreshTable() {
      this.tableData = await getUsersList(this.currentFilters)
    },
    async getSingleUserId(id: number) {
      return getSingleUser(id)
    },
    async deleteUsers(ids: number[]) {
      return deleteUsers(ids)
    },
  },
})
