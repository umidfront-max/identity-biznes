import TableModelConfig from '/@/config/table-model.config.ts'

export default class Users extends TableModelConfig {
  endpoint = 'users'
  title = 'Users'
  tableColumns = [
    {
      key: 'username',
      label: 'Username',
      width: '300',
    },
    {
      key: 'first_name',
      label: 'First name',
      width: 200,
    },
    {
      key: 'last_name',
      label: 'Last name',
      width: 200,
    },
    {
      key: (data: any) => (data.status ? 'Active' : 'Inactive'),
      label: 'Status',
      width: 200,
    },
  ]
}
