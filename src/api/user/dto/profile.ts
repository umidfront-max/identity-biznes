import TemplateTheme from '/@/api/user/dto/templateTheme.ts'

export default interface Profile {
  id: number
  username: string
  first_name: string
  last_name: string
  phone?: string
  status: number
  avatar?: {
    id: string
    type: number
    preview_link: string
    link: string
    name: string
    original_name: string
    mime: string
  }
  permissions?: string[]
  template_theme?: TemplateTheme
  language?: string
}
