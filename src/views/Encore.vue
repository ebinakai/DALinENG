<template>
  <main>
    <div class="wrapper">
      <div>
        <p class="mb-5">here is in the book vol.{{ vol }}</p>
      </div>
      <section class="mb-5 fadein" v-for="content in contents">
        <router-link 
          class="disk rounded-circle d-flex flex-column align-items-center justify-content-center p-4 btn"
          :to="{ path: '/section/' + content.id }"
          >
          <h2>
            <span class="d-inline-block" v-for="i in content.title.split(' ')">
              {{ i }}&nbsp;
            </span>
          </h2>
          <p class="mt-5 px-5">{{ content.text.substring(0, 300) + "..." }}</p>
        </router-link>
      </section>
      <router-link 
      class="btn-create btn btn-primary position-fixed rounded-pill px-4 py-3"
      :to="{ 
        path: '/edit/-1',
        query: {vol: vol } }"
        >
        <font-awesome-icon icon="fa-solid fa-pen-to-square" />
        &nbsp;Create New
      </router-link>
      
    </div>
  </main>
</template>

<script>
  import io from "socket.io-client";
  export default {
    name: "Encore",
    props: ['vol'],
    data: () => ({
      contents: [],
      socket: io("http://localhost:3001", {}),
    }),
    created() {
      this.socket.on('DATA_BY_VOL', (data) => {
        data.forEach(content => {
          this.contents.push(content);
        });
        setTimeout(this.fadeIn);
      });
      this.socket.emit("GET_DATA_BY_VOL", this.vol);
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
    },
    watch: {
      vol(newVal) {
        this.contents.splice(0);
        this.socket.emit("GET_DATA_BY_VOL", newVal);
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
    position: absolute;
    color: white;
    cursor: pointer;
    /* transform: translateY(200px); */
    transition: .2s;
  }

  .disk:hover {
    background-color: #00beae;
    transform:scale(1.1);
  }
  
  section:nth-child(even) .disk{
    left: 10%;
  }	

  section:nth-child(odd) .disk{
    right: 10%;
  }

  .disk p, 
  .disk h2 {
    text-shadow: 0 0 10px #888;
  }

  .btn-create {
    right: 40px;
    bottom: 30px;
    font-size: 21px;
  }

  @media screen and (max-width: 1040px) {
    section {
      height: 480px;
    }

    .disk {
      position: static;
      width: 480px;
      height: 480px;
      margin: 0 auto;
    }
  
    .disk p {
      display: none;
    }
  }

  @media screen and (max-width: 550px) {
    section {
      height: 280px;
    }

    .disk {
      width: 280px;
      height: 280px;
    }

  }
    
</style>