<template>
  <main>
    <div class="wrapper">
      <div>
        <p class="mb-5">here is in the book vol.{{ vol }}</p>
      </div>
      <section class="mb-5 fadein d-flex align-items-center justify-content-around" v-for="content in contents">
        <router-link 
          class="disk rounded-circle d-flex flex-column align-items-center justify-content-center p-4 btn"
          :to="{ path: '/DALeng/section/' + content.id }"
          >
          <h2>
            <span class="d-inline-block" v-for="i in content.title.split(' ')">
              {{ i }}&nbsp;
            </span>
          </h2>
          <p class="mt-5 px-5">{{ content.text.substring(0, 300) + "..." }}</p>
        </router-link>
        <pixel-charactor class="res-hidden" />
      </section>

      <h2 class="mb-5" v-if="contents.length === 0">No article yet...</h2>

      <router-link 
      class="btn-create btn btn-primary rounded-pill px-4 py-3"
      :to="{ 
        path: '/DALeng/edit/-1',
        query: {vol: vol } }"
        >
        <font-awesome-icon icon="fa-solid fa-pen-to-square" />
        &nbsp;Create New
      </router-link>
      
    </div>
  </main>
</template>

<script>
  import PixelCharactor from '../components/PixelCharctor.vue';
  import io from "socket.io-client";
  export default {
    name: "Encore",
    props: ['vol'],
    components: {
      PixelCharactor
    },
    data: () => ({
      contents: [],
      socket: io("http://192.168.68.82:3001"),
    }),
    created() {
      this.socket.emit("GET_DATA_BY_VOL", this.vol, this.getData);
    },
    mounted() {
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
      },
      createNew() {
        window.location.href = "/edit/?vol=" + this.vol;
      },
      getData(response) {
        response.DATA_BY_VOL.forEach(content => {
          this.contents.push(content);
        });
        setTimeout(this.fadeIn);
      }
    },
    watch: {
      vol(newVal) {
        this.contents.splice(0);
        this.socket.emit("GET_DATA_BY_VOL", newVal, this.getData);
      }
    }
  };
</script>

<style>

  section {
    position: relative;
    height: 600px;
  }

  .disk {
    width: 600px;
    height: 600px;
    background-color: #00A495;
    color: white;
    cursor: pointer;
    transition: .2s;
  }

  .disk:hover {
    background-color: #00beae;
    transform:scale(1.1);
  }

  section:nth-child(even) {
    flex-direction: row-reverse;
  }
  
  .pixel {
    margin: 0 20px;
  }

  .disk p, 
  .disk h2 {
    text-shadow: 0 0 10px #888;
  }

  .btn-create {
    position: fixed;
    right: 40px;
    bottom: 130px;
    font-size: 21px;
  }

  @media screen and (max-width: 1040px) {
    section {
      height: 480px;
    }

    .disk {
      width: 310px;
      height: 310px;
      margin: 0 auto;
    }
  
    .disk p {
      display: none;
    }
  }

  @media screen and (max-width: 550px) {

    .btn-create {
      position: static;
      margin-bottom: 20px;

    }

    section {
      height: 280px;
    }

    .disk {
      width: 280px;
      height: 280px;
    }

  }
    
</style>