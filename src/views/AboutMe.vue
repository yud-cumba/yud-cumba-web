<template>
  <v-card
    :color="background"
    class="d-flex justify-center align-center"
    id="AboutMe"
  >
    <div class="d-flex about justify-center aling-center">
      <v-img
      src="@/assets/img/AvatarHi.png" ></v-img>
      <div :class="`pa-10 text-center ${textColor}--text`">
        <h1>{{ textTitle }}</h1>
        <h4>{{ textInfo }}</h4>
      </div>
    </div>
  </v-card>
</template>
<script>
import { mapState } from 'vuex';
import colors from '@/mixins/colors';

export default {
  name: 'AboutMe',
  mixins: [colors],
  props: {
    isMobile: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  computed: {
    ...mapState(['english', 'darkMode']),
    textTitle() {
      return !this.english ? 'Hola mundo' : 'Hello world';
    },
    background() {
      return this.darkMode ? this.mainDark : this.mainLigth;
    },
    textColor() {
      return this.darkMode ? 'white' : 'black';
    },
    textInfo() {
      const spanish = 'Soy Matemática con especialización en ecuaciones diferenciales parciales y además frontend developer con habilidades backend y análisis de datos. Tengo experiencia desarrollando páginas webs desde cero utilizando JavaScript puro, Vue.js, React.js y Angular (aunque siempre estoy abierta a utilizar nuevas tecnologías), siempre con el objetivo de crear las mejores funcionalidades para obtener un producto escalable y de calidad que satisfaga las necesidades de quienes la utilicen. Me apasiona la lógica que hay detrás de todo algoritmo de programación, en la cual, (gracias a mis habilidades matemáticas) me va súper BIEN, pero siempre busco que me vaya MEJOR! Si quieres seguir sabiendo de mí puedes seguir revisando mi perfil o escribirme un mensaje';
      return !this.english ? spanish : 'Hello world';
    },
  },
};
</script>
<style scoped>
#AboutMe {
  height: 80vh;
}
.about {
    width: 75vw;
}
@media only screen and (max-width: 400px) {
  .about {
    width: 100vw;
    display: flex;
    flex-direction: column;
  }
  #AboutMe {
    height: auto;
    padding-top: 40px;
    font-size: 15px;
  }
}
</style>
