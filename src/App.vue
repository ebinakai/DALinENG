<script setup>
// import HelloWorld from './components/HelloWorld.vue'
import Header from './components/Header.vue';
</script>

<template>
  <Header />

  <main class="d-flex flex-wrap">

    <div class="card article-card shadow-lg">
      <div>

        <p class="p-3 head-text">
          {{ intro }}
        </p>

      </div>  
      <div class="card-body d-flex justify-content-around align-items-center">
        <h5 class="card-title mb-0">{{ title }}</h5>
        <a href="#" class="btn btn-primary">to be continued</a>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "App",
  components: {},
  data: () => ({
    intro: `
      “ Um, ‘ He who does not work、neither shall he eat ’……? ”
      One day’ break time. Toka cocked her head with serious face.
      “ What’s up, Toka? ”
      ” You have a serious look on your face. ”
      Yoshino in the same uniform as Toka and ‘Yoshinon’ talked to Toka. Toka faced up with serious face.
      “ Few minutes ago, our teacher said it. I'll have a lot of trouble Shido’ cooking isn't eaten. ”
      said Toka moans.
      “ Well… your job is student, right? ”
      “ Oh, I see. …Um? By the way, how come Yoshino and Yoshinon wear school uniform? ”
      “ Tha… That’s because… ”
      “ Don’t mind that in the spin-off. ”
      “ Um…? ”
      Toka none too understood about Yoshino said, but she had hunch that don’t pursue about it.
    `,
    title: "DATE A JOB case-1 ~ student ~",
  }),
  mounted() {
    this.intro.replace(/\r?\n/g, '<br>');
    console.log(this.intro)
  },
  methods: {
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

  main {
    max-width: 1700px;
    margin: 0 auto;
    padding: 0 20px;
    gap: .5%;
  }

  .article-card {
    width: 600px;
  }

  .article-card:hover {
    transform:scale(1.02);
    transition: .2s;
  }

  .head-text {
    background: #868E96;
    color: #EBEBF2;
    height: 210px;
    overflow: hidden;
    border-radius: 5px;
  }

  article a:hover {
    background-color: #EBEBF2;
  }

  @media screen and (max-width: 1140px) {
    main {
      gap: 1%;
    }

    article {
      width: 49.5%;
    }
    
  }
</style>