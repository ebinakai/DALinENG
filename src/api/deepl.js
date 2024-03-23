import translate from 'deepl'
const auth_key = import.meta.env.VITE_DEEPL_APIKEY

export default {
  translate: async (text) => {
    const res = await translate({free_api:true, text: text, target_lang:"JA", auth_key:auth_key})
    return res;
  },
}