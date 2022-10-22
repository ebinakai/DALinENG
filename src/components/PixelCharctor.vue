<template>
  <div class="pixel">
    <div class="pixel-img" :style="'background-image: url('+path+')'"></div>
  </div>
</template>


<script>
  export default {
    name: "Header",
    data: () => ({
      charctorList: ["origami","rinne","marina","yamai","maria","natsumi-adult","kurumi-casual","origami-robo","origami-maid","shido","kotori-casual","yoshino-casual","toka","yuzuru","yoshino","tenka","shiori","reine","origami-ast","natsumi","kurumi","miku","mana","kotori","kaguya"],
      path: "",
    }),
    mounted() {
      const index = Math.floor(Math.random() * this.charctorList.length);
      this.path = `/DALeng/images/pixel/${this.charctorList[index]}.webp`;
    },
  };
</script>

<style>
  .pixel {
    width: 125px;
    animation: move-y .8s infinite alternate ease-in-out;
    display: inline-block;
  }

  .pixel-img {
    width: 100%;
    height: 165px;
    background-size: contain; 
    background-repeat: no-repeat;

  }

  @keyframes move-y {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(30px);
    }
  }
</style>