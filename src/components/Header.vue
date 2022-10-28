<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light mx-4 pt-3">
      <a class="navbar-brand d-flex" href="/DALeng">
        <img src="/images/ratatoskr.webp" width="60" height="60" class="d-inline-block align-top" alt="">
        <h1 class="ml-2">DAL ENCORE in ENG</h1>
      </a>
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
                v-for="content in vol"
                :to="{ path: '/DALeng/encore/' + content }">
                Vol.{{content}}
              </router-link>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#">Create new Vol</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#">Create new Article</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/admin">Control Panel</a>
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
      vol: 11
    }),
  };
</script>

<style>
  nav h1 {
    font-size: 34px;
    font-weight: bold;
    line-height: 60px;
  }

  @media screen and (max-width: 550px) {
    nav h1 {
        display: none;
    }
  }
</style>