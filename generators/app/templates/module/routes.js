/* <%= pkg %> <%= version %> */
import { urljoin as _u, loadable } from 'utils'

import MODULE_URLS from './urls'

const moduleName = 'app.<%= lower %>'


export default [
  {
    path     :_u(MODULE_URLS.REDEEM, redeemParam),
    component:loadable(() => import (/* webpackChunkName: `app.<%= lower %>` */ './components/Redeemer.js'))
  }

  /*
  {
    path     :MODULE_URLS.LOGOUT,
    component:Logout,
    private  :true,
    //test:(user) => user.id
  },
  */
]




