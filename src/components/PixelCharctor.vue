<template>
  <div class="pixel">
    <div class="pixel-img" :style="'background-image: url('+path+')'"></div>
  </div>
</template>


<script>
  export default {
    name: "Header",
    data: () => ({
      charctorList: ["Origami", "Rinne", "Marina", "Yamai", "Maria", "Natsumi-adult", "Kurumi-casual", "Origami-robo", "Origami-maid", "Shido", "Kotori-casual", "Yoshino-casual", "Toka", "Yuzuru", "Yoshino", "Tenka", "Shiori", "Reine", "Origami-ast", "Natsumi", "Kurumi", "Miku", "Mana", "Kotori", "Kaguya"],
      path: "",
    }),
    mounted() {
      const index = Math.floor(Math.random() * this.charctorList.length);
      this.path = `/images/pixel/${this.charctorList[index]}.webp`;
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