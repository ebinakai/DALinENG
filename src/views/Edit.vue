<template>
  <main>
    <div class="wrapper">
      <form action="" method="post">
        <div class="form-group">
          <label for="title">TITLE</label>
          <input class="form-control" type="text" name id="title" placeholder="Title" v-model="content.title">
        </div>
        <div class="form-group">
          <label for="text">CONTENT</label>
          <textarea class="form-control" name="text" id="text" rows="40" spellcheck="false" placeholder="contents...">{{ content.text }}</textarea>
        </div>
        <div>
          <button @click="back" class="btn btn-lg btn-secondary px-5 py-3 d-inline-block">CANCEL</button>
          <button @click="save" class="btn btn-lg btn-primary px-5 py-3 ml-5 d-inline-block" type="submit">SAVE</button>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
  import io from "socket.io-client";
  export default {
    name: "Edit",
    props: ['id'],
    data: () => ({
      content: {
        title: "",
        text: "",
        id: 0,
        vol: 0,
      },
      socket: io("http://localhost:3001", {}),
    }),
    created() {
      if ( this.id == -1) {
        this.socket.emit("GET_NEW_ID");
      } else {
        this.socket.emit("GET_DATA_BY_ID", this.id);
      }

      this.socket.on('NEW_ID', (id) => {
        this.content.id = id;
        this.content.vol = this.$route.query.vol;
      });

      this.socket.on('DATA_BY_ID', (data) => {
        Object.keys(this.content).forEach((key) => {
          this.content[key] = data[key];
        });
      });

      this.socket.on('SET_DATA_BY_ID_COMPLETED', (val) => {
        if (val) {
          this.back();
        }
      });
    },
    methods: {
      save(e) {
        e.preventDefault();
        this.content.text = $("#text")[0].value;

        this.socket.emit("SET_DATA_BY_ID", this.content);
      },
      back(e = undefined) {
        if ( e !== undefined) {
          e.preventDefault()
          if ( this.id == -1 ) {
            window.location.href = "/encore/" + this.content.vol;
            return;
          }
        }
        window.location.href = "/section/" + this.content.id;
      },  
    },
    watch: {
      
    }
  };
</script>

<style>

  #title {
    font-size: 40px;
  } 

  textarea.form-control {
    resize: none;
    height: 75vh;
  }

  .form-group label {
    font-size: 24px;
  }
  
  @media screen and (max-width: 1040px) {

  }

  @media screen and (max-width: 550px) {

  }
    
</style>