import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
      themes: {
        light: {
          primary: '#61933c',
          secondary: '#e2d4b7',
          accent: '#17bebb'
        },
      },
    },
  })
