<template>
  <footer class="d-flex align-items-center text-center">
    <p class="flex-grow-1 m-0">©2022 Ebina Kai / Koji Tachibana ･ Tsunaco</p>
  </footer>
</template>
  
<script>
  export default {
    name: "Footer",
    data: () => ({
    }),
    methods: {
    },
  };
</script>

<style>
  footer {
    background-color: black;
    color: white;
    /* position: absolute;←絶対位置
    bottom: 0; */
    width: 100%;
    height: 80px;
  }

  footer p {
    line-height: 80px;
  }

  @media screen and (max-width: 550px) {
  }
</style>