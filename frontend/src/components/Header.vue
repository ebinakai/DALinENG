<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light">
      <router-link
        class="navbar-brand d-flex" 
        to="/"
        @click.native="closeDropdown">
        <img src="/images/ratatoskr.webp" width="60" height="60" class="d-inline-block align-top" alt="">
        <h1 class="ml-2 mb-0">DAL <span class="d-none d-md-inline">ENCORE </span>in ENG</h1>
      </router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="true" aria-label="Toggle navigation">
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
                :to="{ path: '/book/' + vol }"
                @click.native="closeDropdown">
                Vol.{{ vol }}
              </router-link>
            </div>
          </li>
          <li class="nav-item">
            <router-link 
              class="nav-link disabled" 
              to="/"
              @click.native="closeDropdown">
              Create new Vol
            </router-link>
          </li>
          <li class="nav-item">
            <router-link 
              class="nav-link disabled" 
              to="/"
              @click.native="closeDropdown">
              Create new Article
            </router-link>
          </li>
          <li class="nav-item">
            <router-link 
              class="nav-link" 
              to="/admin"
              @click.native="closeDropdown">
              Control Panel
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="logout()">
              Logout
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
        this.closeDropdown();
        return this.$store.dispatch('logout')
          .then(() => {
            this.$router.push('/login');
          })
          .catch(error => { throw error })
      },
      closeDropdown() {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const width = document.documentElement.clientWidth;
        console.debug(width);
        if (navbarToggler && !navbarToggler.classList.contains('collapsed') && width < 992) {
          navbarToggler.click();
        }
      }
    }
  };
</script>

<style>
  nav h1 {
    font-size: 34px;
    font-weight: bold;
    line-height: 60px;
  }

  #navbarNav {
    z-index: 10;
    background: rgba(255, 255, 255, .98);
  }

  a:hover {
    cursor: pointer;
  }

</style>