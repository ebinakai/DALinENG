import store from "../store"

export const authorizeToken = (to, from, next) => {
  if ( to.matched.some(record => record.meta.requiresAuth) && store.state.auth.token == null ) {
    next({ path: '/login/', query: { redirect: to.fullPath } });
  } else {
    next();
  }
}