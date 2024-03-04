<template>
  <main id="loginPage">
    <div class="login-card-container container-md px-4">
      <form v-on:submit.prevent="handle()">
        <div class="login-card p-5 rounded-lg submit-animation">
  
          <div class="login-card-header text-center mb-5">
            <h2 class="mb-4 font-weight-light">Security Form</h2>
            <h3 class="mb-3 font-weight-light">Hello. Agent!</h3>
          </div>
  
          <div class="login-card-form mb-5">
            <div class="form-item">
              <label for="LoginCardUsername" class="form-item-icon material-symbols-rounded">person</label>
              <input class="rounded-pill py-2 pl-5 pr-3" id="LoginCardUsername" type="text" placeholder="ID" v-model="user.username" autocomplete="username" required />
            </div>
            <div class="form-item">
              <label for="LoginCardPassword" class="form-item-icon material-symbols-rounded">lock</label>
              <input class="rounded-pill py-2 pl-5 pr-3" id="LoginCardPassword" type="password" placeholder="PASSWORD" v-model="user.password" autocomplete="current-password" required />
            </div>
          </div>
  
          <div class="login-card-footer text-center">
            <button class="rounded-pill p-3 font-weight-bold submit-animation" type="submit"><span>Sign In</span></button>
          </div>
  
        </div>
      </form>
    </div>
  </main>
</template>
<script>
  export default {
    data() {
      return {
        user: {}
      };
    },
    mounted() {
      $(".submit-animation").removeClass("active");
      $("#LoginCardUsername").focus();
    },
    methods: {
      handle() {
        $(".submit-animation").addClass("active");
        setTimeout( () => {
          this.$store.dispatch("login", this.user)
            .then( res => {
              console.debug(res);
              $(".submit-animation").removeClass("active");

              const status = ( res.response === undefined )? undefined : res.response.status;
              $("#LoginCardUsername").toggleClass("bg-danger", status == 301);
              $("#LoginCardPassword").toggleClass("bg-danger", status == 302);

              if ( res.status != 200 ) { return };

              if ( this.$route.query.redirect !== undefined) {
                this.$router.push(this.$route.query.redirect);
              } else {
                this.$router.push("/")
              }
            })
            .catch( error => { throw error } )
        }, 700);
      }
    }
  };
</script>
<style>
  #loginPage {
    background: linear-gradient(to right, #0528F2,#AEC5F2);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .login-card-container {
    max-width: 550px;
  }

  .login-card {
    background: rgba(255, 255, 255, .6);
    position: relative;
  }

  .login-card::before {
    content: "";
    position: absolute;
    background: rgba(255, 255, 255, .2);
    inset: 0;
    transform: rotate(-5deg);
  }

  .login-card.active::before {
    transform: rotate(355deg);
    transition: all .55s ease-in-out;
  }

  .login-card-header h3 {
    font-size: 1.2rem;
  }

  .login-card-form,
  .login-card-footer {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .login-card-form .form-item {
    position: relative;
  }

  .login-card-form .form-item .form-item-icon {
    position: absolute;
    top: .5rem;
    left: 1.3rem;
    opacity: .4;
  }

  .login-card-footer {
    font-size: .8rem;
  }

  .login-card input[type="text"],
  .login-card input[type="password"] {
    border: none;
    outline: none;
    width: 100%;
    background: rgba(255, 255, 255, .3);
    transition: all .5s;
  }

  .login-card input:focus {
    background: white;
  }

  .login-card-footer button {
    background: black;
    color: white;
    font-size: 1rem;
    border: none;
    text-transform: uppercase;
    transition: all .3s;
    position: relative;
    z-index: 1;
  }

  .login-card-footer button::before,
  .login-card-footer button::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 56px;
    height: 56px;
    border-radius: 28px;
  }

  .login-card-footer button::before {
    background-color: #7aa0eb;
    transition: width .5s ease;
    z-index: -2;
  }

  .login-card-footer button::after {
    background-color: #0560f2;
    transition: left .5s ease;
    z-index: -1;
  }

  .login-card-footer button.active::before {
    width: 100%;
  }

  .login-card-footer button.active::after {
    left: calc(100% - 56px);
  }

  .login-card-footer button:hover {
    color: rgba(255, 255, 255, .6);
  }
</style>