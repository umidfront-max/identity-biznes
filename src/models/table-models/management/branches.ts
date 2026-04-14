import TableModelConfig from '/@/config/table-model.config.ts'

export default class Branches extends TableModelConfig {
  endpoint = 'management/branches'
  title = 'Branches'
  tableColumns = [
    {
      key: 'name',
      label: 'Name',
      width: '300',
    },

    {
      key: 'address',
      label: 'Address',
      width: 200,
    },
    {
      key: 'inn',
      label: 'Inn',
      width: 200,
    },
  ]
  constructor() {
    super()
  }
}
