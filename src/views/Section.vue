<template>
  <main>
    <div class="wrapper">
      <div class="container contents pt-5 fadein mb-5">
        <div class="mb-5">
          <h2 class="mb-5">{{ content.title }}</h2>
          <p v-for="p in content.text.split('\n\n')">{{ p }}</p>
        </div>
        <div class="text-right">
          <router-link 
            class="btn btn-primary rounded-pill px-4 py-3"
            :to="{ path: '/edit/' + id }"
            >
            <font-awesome-icon icon="fa-solid fa-pen-to-square" />
            &nbsp;Edit
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  import io from "socket.io-client";
  import store from '../store/index';
  export default {
    name: "Section",
    props: ['id'],
    data: () => ({
      content: {
        title: "", 
        text: "", 
        id: 0, 
        vol: 0,
      },
      socket: io(store.state.urlDb),
    }),
    created() {
      this.socket.emit("GET_DATA_BY_ID", this.id, (response) => {
        Object.keys(this.content).forEach((key) => {
          this.content[key] = response.DATA_BY_ID[key];
        });
        setTimeout(this.fadeIn);
      });
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
      goEditPage() {
        window.location.href = "/edit/" + this.id;
      },
    },
  };
</script>

<style>
  .contents p {
    white-space: pre-wrap;
  }

  .contents p {
    text-align: left;
  }

  .btn-box {
    text-align: right;
  }

  .btn-edit {
    font-size: 27px;
    width: 100px;
    height: 100px;
  }

  @media screen and (max-width: 1040px) {
    .btn-box {
      text-align: center;
    }
  }
  @media screen and (max-width: 550px) {
    p {
      font-size: .8rem;
    }
  }
    
</style>