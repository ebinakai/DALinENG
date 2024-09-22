<template>
  <main>
    <div class="wrapper-edit">
      <form>
        <div class="form-group">
          <input class="form-control" type="text" name id="title" placeholder="Title" v-model="content.title">
        </div>
        <div class="form-group d-flex">
          <textarea ref="originalText" class="form-control py-3" name="text" id="text" rows="40" spellcheck="false" placeholder="contents..." v-model="text" @scroll="syncScroll"></textarea>
          <textarea ref="translatedText" class="form-control py-3 ml-2" name="text" rows="40" spellcheck="false" v-model="translatedText" disabled></textarea>
        </div>
        <div class="edit-btn-box mb-5">
          <button @click="back" class="btn-cancel btn btn-lg btn-secondary rounded-pill px-5 py-3 d-inline-block">
            <font-awesome-icon icon="fa-solid fa-arrow-left" />
            &nbsp;BACK
          </button>
          <button @click="trash" class="btn-save btn btn-lg btn-danger rounded-pill px-5 py-3 d-inline-block" type="submit">
            <font-awesome-icon icon="fa-solid fa-trash" />
            &nbsp;DELETE
          </button>
          <button @click="save" id="btn-save" class="btn-save btn btn-lg btn-primary rounded-pill px-5 py-3 d-inline-block" type="submit">
            <font-awesome-icon icon="fa-solid fa-floppy-disk" />
            &nbsp;SAVE
          </button>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
  import io from "socket.io-client";
  import store from '../store/index';
  import deepl from '../api/deepl';

  export default {
    name: "Edit",
    props: ['id'],
    data: () => ({
      text: "",
      content: {
        title: "",
        text: "",
        id: -1,
        vol: 0,
      },
      oldLines: [],
      newLines: [],
      debouncedTimeout: null,
      translatedLines: [],
      translatedText: '',
      token: store.state.auth.token,
      socket: io(store.state.urlDb),
    }),
    created() {
      if ( this.id == -1 ) {
        // 新規データを作成
        this.content.vol = this.$route.query.vol;
      } else {
        // 既存データを編集
        this.socket.emit("GET_DATA_BY_ID", this.id, (response) => {
          Object.keys(this.content).forEach((key) => {
            this.content[key] = response.DATA_BY_ID[key];
          });
          this.text = this.content.text;
        });
      }

      // c-s shortcut
      window.addEventListener("keyup", e => {
        if( e.ctrlKey && e.key === "s" ) {
            this.save(undefined, false);
        }
      });
      $("#text").focus();
    },
    methods: {
      // スクロール同期
      syncScroll() {
        const originalTextElement = this.$refs.originalText;
        const translatedTextElement = this.$refs.translatedText;

        // オリジナルのテキストエリアのスクロール位置を取得
        const scrollPercentage = originalTextElement.scrollTop / (originalTextElement.scrollHeight - originalTextElement.clientHeight);

        // 翻訳されたテキストエリアのスクロール位置を同期
        translatedTextElement.scrollTop = scrollPercentage * (translatedTextElement.scrollHeight - translatedTextElement.clientHeight);
      },
      // 保存
      save(e=undefined, flag=true) {
        if ( e !== undefined )  e.preventDefault();
        this.content.text = $("#text")[0].value;
        $("#btn-save").addClass("btn-flush");
        setTimeout(() => { $("#btn-save").removeClass("btn-flush"); }, 10);

        // 編集データを送信
        if( this.id == -1 ) {
          this.socket.emit("CREATE_DATA", this.content, (response) => {
            if ( response.status ) { 
              if ( flag ) { this.back(); }
              else { this.$router.push("/edit/" + response.id); }
            };
          });
        } else {
          this.socket.emit("SET_DATA", this.content, (response) => {
            if ( response.status && flag)  this.back();
          });
        }
      },

      // 削除
      trash(e) {
        e.preventDefault();

        if ( !confirm("really delete this article?") ) return;

        // 削除するIDを送信
        this.socket.emit("DELETE_DATA_BY_ID", this.content.id, (response) => {
          if ( response.status ) {
            window.location.href = "/book/" + this.content.vol;
          }
        });
      },

      // 前ページに戻る
      back(e) {
        if ( e !== undefined ) {
          e.preventDefault();
        }
        if ( this.id == -1 ) {
          this.$router.push("/book/" + this.content.vol);
          return;
        }
        this.$router.push("/section/" + this.content.id);
      },  

      // イベントが発生してから指定した時間が経過するまで処理を遅延させ、その間に再度イベントが発生した場合はタイマーをリセット
      debounce(func, wait) {
        return (...args) => {
          clearTimeout(this.debouncedTimeout);
          this.debouncedTimeout = setTimeout(() => func.apply(this, args), wait);
        };
      },

      // 変更箇所の検知
      async handleChangedLines() {
        this.newLines = this.text.split("\n");

        // translatedLinesを新しい行の数だけで初期化し、空文字列で埋める
        const oldTranslatedLines = this.translatedLines.slice();
        this.translatedLines = new Array(this.newLines.length).fill('');

        let currentBlock = [];
        let blockStartIndex = 0;

        for (let index = 0; index < this.newLines.length; index++) {
          const newLine = this.newLines[index];
          const oldLine = this.oldLines[index];
          if (newLine !== oldLine) {
            // 変更があった場合、現在のブロックに行を追加
            if (currentBlock.length === 0) {
              blockStartIndex = index;
            }
            currentBlock.push(newLine);
          } else { 
            this.translatedLines[index] = oldTranslatedLines[index] || '';

            if (currentBlock.length > 0) {
              // 変更が連続していない場合、現在のブロックを翻訳
              const textToTranslate = currentBlock.join('\n');

              try {
                const response = await deepl.translate({token: this.token, text: textToTranslate, targetLang: 'JA'});
                console.log(response); // 翻訳結果を表示

                // 翻訳結果を適切な位置に挿入
                response.data.split('\n').forEach((translatedLine, idx) => {
                  this.translatedLines[blockStartIndex + idx] = translatedLine;
                });
              } catch (error) {
                console.error('Translation failed:', error.message);
              }
              currentBlock = [];
            }
          }
          this.translatedText = this.translatedLines.join('\n');
        }

        if (currentBlock.length > 0) {
          // 最後のブロックを処理
          const textToTranslate = currentBlock.join('\n');
          try {
            const response = await deepl.translate({token: this.token, text: textToTranslate, targetLang: 'JA'});
            console.log(response); // 翻訳結果を表示

            // 翻訳結果を適切な位置に挿入
            response.data.split('\n').forEach((translatedLine, idx) => {
              this.translatedLines[blockStartIndex + idx] = translatedLine;
            });
          } catch (error) {
            console.error('Translation failed:', error.message);
          }
          this.translatedText = this.translatedLines.join('\n');
        }

        this.oldLines = this.newLines.slice(); // 参照ではなく値をコピーする
      },
    },

    watch: {
      // テキスト変更時の処理をデバウンスする
      text: function(newVal, oldVal) {
        const debouncedTextChange = this.debounce(() => {
          // 文字変換,オートセーブ
          this.handleChangedLines();
          this.save(undefined, false);
        }, 3000);
        debouncedTextChange();
        
        this.text = newVal.replace("--", "—");
        this.content.text = this.text;
      }
    }
  };
</script>

<style>
  .wrapper-edit {
    /* margin: 0 20px; */
    padding: 0 20px;
  }
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

  .btn-save {
    margin-left: 30px;
  }

  .btn-flush {
    opacity: .5;
  }
  @media screen and (max-width: 940px) {
    textarea.form-control {
      height: 65vh;
    }

    .edit-btn-box {
      display: flex;
      flex-direction: column-reverse;
    }

    .edit-btn-box button {
      display: block;
      width: 100%;
    }

    .btn-save {
      margin-left: 0;
      margin-bottom: 30px;
    }
  }
</style>