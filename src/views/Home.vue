<template>
  <main>
    <div class="wrapper d-flex flex-wrap">
      <div class="card-box mb-5 p-0 fadein" v-for="content in contents">
        <router-link 
          class="card rounded shadow-lg p-0 btn"
          :to="{path: '/encore/'+content.vol, }">
          <div class="cover" :style="`background-image: url(/images/cover/cover-vol-${content.vol}.webp)`">
          </div>  
          <div class="card-body">
            <h5 class="card-title mb-0">DATE A LIVE ENCORE Vol. {{ content.vol }}</h5>
          </div>
        </router-link>
      </div>
    </div>
  </main>
</template>

<script>
  export default {
    name: "Home",
    components: {},
    data: () => ({
      contents: [
        {vol: 1},
        {vol: 2},
        {vol: 3},
        {vol: 4},
        {vol: 5},
        {vol: 6},
        {vol: 7},
        {vol: 8},
        {vol: 9},
        {vol: 10},
        {vol: 11},
      ],
    }),
    mounted() {
      // フェードイン
      this.fadeIn();
      $(window).scroll(this.fadeIn);
    },
    methods: {
      fadeIn(){
        $('.fadein').each(function(){
          const elemPos = $(this).offset().top;
          const scroll = $(window).scrollTop();
          const windowHeight = $(window).height();
          if (scroll > elemPos - windowHeight){
            $(this).addClass('scrollin');
          }
        });
      }
    },
  };
</script>

<style>
  /* 
  #010326
  #393E59
  #F0F2F2
  #6FBFBF
  #82D9D9
  */

  .card-box {
    width: 32%;
  }

  .card {
    transition: .2s;
  }

  .card:hover {
    transform:scale(1.1);
  }

  .cover {
    height: 310px;
    background-size: 100% auto;
  }

  @media screen and (max-width: 1700px) {
    .wrapper {
      max-width: 1040px;
      gap: 1%;
    }

    .card-box {
      width: 49.5%;
    }
  }

  @media screen and (max-width: 1040px) {
    .wrapper {
      max-width: 520px;
    } 

    .card-box {
      width: 100%;
      margin: 0 auto;
    }
  }
</style>
