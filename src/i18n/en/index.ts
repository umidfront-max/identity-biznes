import core from './core.json'
import scoring from './scoring/index.json'
import scoring_credit from './scoring/credit-history/index.json'
import scoring_humo from './scoring/humo/index.json'
import scoring_inps from './scoring/inps-history/index.json'
import scoring_mib from './scoring/mib/index.json'
import scoring_pension from './scoring/pension-info/index.json'
import scoring_tax from './scoring/tax/index.json'
import scoring_uzcard from './scoring/uzcard/index.json'
import scoring_katm_modal from './scoring/katm-modal/index.json'
import components_universal_table from './components/universal-table-next/index.json'
import management from './management/index.json'
import management_branches from './management/branches/index.json'
import management_users from './management/users/index.json'
import management_roles from './management/roles/index.json'
import management_logs from './management/logs/index.json'
import customers from './customers/index.json'
import installments from './installments/index.json'
import tariff from './tariff/index.json'
import home from './home/index.json'
import profile from './profile/index.json'
import error from './error/index.json'
import login from './login/index.json'

export default {
  ...core,
  scoring,
  scoring_credit,
  scoring_humo,
  scoring_inps,
  scoring_mib,
  scoring_pension,
  scoring_tax,
  scoring_uzcard,
  scoring_katm_modal,
  components_universal_table,
  management,
  management_branches,
  management_users,
  management_roles,
  management_logs,
  customers,
  installments,
  tariff,
  home,
  profile,
  error,
  login,
}
