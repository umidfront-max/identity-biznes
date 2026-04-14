import TableModelConfig from '/@/config/table-model.config.ts'

export default class Devices extends TableModelConfig {
  title = 'Devices'
  endpoint = ''
  tableColumns = [
    {
      key: 'name',
      label: 'Name',
      width: '300',
    },
  ]
  constructor(endpoint: string) {
    super()

    this.endpoint = endpoint
  }
}
