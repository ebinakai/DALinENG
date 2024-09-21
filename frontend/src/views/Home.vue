<template>
  <main class="pb-5">
    <div class="wrapper d-flex flex-wrap pt-1">
      <div class="card-box mb-5 p-0 fadein" v-for="vol in vols">
        <router-link 
          class="card rounded shadow-lg p-0 btn"
          :to="{ path: '/book/'+ vol }">
          <div class="cover" :style="`background-image: url(/images/cover/cover-vol-${ vol }.webp)`">
          </div>  
          <div class="card-body">
            <h5 class="card-title mb-0">DATE A LIVE ENCORE Vol. {{ vol }}</h5>
          </div>
        </router-link>
      </div>
    </div>
    <div class="d-flex justify-content-around">
      <pixel-charactor />
      <pixel-charactor class="res-hidden" />
    </div>
  </main>
</template>

<script>
  import PixelCharactor from '../components/PixelCharctor.vue';
  export default {
    name: "Home",
    components: {
      PixelCharactor
    },
    data: () => ({
      vols: 11,
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
      max-width: 940px;
      gap: 1%;
    }

    .card-box {
      width: 49.5%;
    }
  }

  @media screen and (max-width: 940px) {
    .wrapper {
      max-width: 520px;
    } 

    .card-box {
      width: 100%;
      margin: 0 auto;
    }
  }
  @media screen and (max-width: 550px) {
    .res-hidden {
      display: none;
    }
  }
</style>
