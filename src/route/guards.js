import store from "../store"
import auth from "../api/auth"

export const authorizeToken = (to, from, next) => {
  if ( !to.matched.some(record => record.meta.requiresAuth) ) {
    next();
  }

  auth.checkToken( store.state.auth )
  .then( res => {
    next();
  })
  .catch( err => { 
    next({ path: '/DALeng/login/', query: { redirect: to.fullPath } });
  });
}