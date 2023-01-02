<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light mx-4 pt-3">
      <router-link
        class="navbar-brand d-flex" 
        to="/">
        <img src="/images/ratatoskr.webp" width="60" height="60" class="d-inline-block align-top" alt="">
        <h1 class="ml-2">DAL ENCORE in ENG</h1>
      </router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Volume
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <router-link
                class="dropdown-item"
                v-for="vol in vols"
                :to="{ path: '/book/' + vol }">
                Vol.{{ vol }}
              </router-link>
            </div>
          </li>
          <li class="nav-item">
            <router-link 
              class="nav-link disabled" 
              to="/">
              Create new Vol
            </router-link>
          </li>
          <li class="nav-item">
            <router-link 
              class="nav-link disabled" 
              to="/">
              Create new Article
            </router-link>
          </li>
          <li class="nav-item">
            <router-link 
              class="nav-link" 
              to="/admin">
              Control Panel
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="logout()">
              Logout
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/">
              Dash Board
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
  export default {
    name: "Header",
    data: () => ({
      vols: 11,
    }),
    methods: {
      logout () {
        return this.$store.dispatch('logout')
          .then(() => {
            this.$router.push('/login');
          })
          .catch(error => { throw error })
        }
    }
  };
</script>

<style>
  header {
    height: 100px;
  }

  nav h1 {
    font-size: 34px;
    font-weight: bold;
    line-height: 60px;
  }

  a:hover {
    cursor: pointer;
  }

  @media screen and (max-width: 550px) {
    nav h1 {
        display: none;
    }
  }
</style>