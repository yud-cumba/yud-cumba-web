import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import es from 'vuetify/es5/locale/es';

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { es },
    current: 'es',
  },
  theme: {
    themes: {
      light: {
        blueLight: '#64B5F6',
        blueDark: '#1A237E',
      },
    },
  },
});
