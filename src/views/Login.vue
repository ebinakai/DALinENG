<template>
  <form v-on:submit.prevent="handle">
      <label>User ID</label>
      <input type="text" placeholder="customer id" v-model="user.username" autocomplete="username" />
      <label>Password</label>
      <input type="password" placeholder="password" v-model="user.password" autocomplete="current-password" />
      <button type="submit">Sign In</button>
  </form>
</template>
<script>
export default {
data() {
  return {
    user: {}
  };
},
methods: {
  handle() {
    this.$store.dispatch("login", this.user)
      .then( () => {
        if ( this.$route.query.redirect !== undefined) {
          this.$router.push(this.$route.query.redirect);
        } else {
          this.$router.push("/DALeng/")
        }
      })
      .catch( error => { throw error } )
  }
}
};
</script>