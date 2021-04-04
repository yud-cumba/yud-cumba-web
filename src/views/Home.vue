<template>
  <div id="Home">
    <v-img :src="require(`../assets/img/${img}`)"
    :height="imgHeigth">
      <NavBar :isMobile="isMobile" />
      <div class="mx-2 my-12 pt-5 d-flex flex-column align-center">
        <v-img
          width="500px"
          src="https://fontmeme.com/permalink/210329/63c8057c1ae08acb1021ad40f2540e94.png"
        ></v-img>
        <v-img
          width="500px"
          src="https://fontmeme.com/permalink/210329/2a5d082feee3a723785b240969747648.png"
        ></v-img>
        <v-img
          v-if="english"
          width="500px"
          src="https://fontmeme.com/permalink/210330/16d516feb139af114a63bc2e8b7d5884.png"
        ></v-img>
        <v-img
          v-else
          width="500px"
          src="https://fontmeme.com/permalink/210330/386b055d2c6ea4ffb54e89e4600fce9e.png"
        ></v-img>
        <div class="d-flex mt-12 lan" @click="setLanguage">
          <v-img width="40px" src="@/assets/img/mushroom.svg"></v-img>
        <h3 :class="`text-uppercase pa-1 ${textColor}--text click`">
          {{btnText}}</h3>
        </div>
      </div>
    </v-img>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { mapState } from 'vuex';

export default {
  name: 'Home',
  components: {
    NavBar,
  },
  data: () => ({
    english: false,
  }),
  props: {
    isMobile: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  methods: {
    setLanguage() {
      this.english = !this.english;
      this.$store.commit('SET_ENGLISH', this.english);
    },
  },
  computed: {
    btnText() {
      return this.english ? ' Look at my info in spanish' : 'Mira mi información en inglés';
    },
    imgHeigth() {
      return this.isMobile ? 600 : 'auto';
    },
    img() {
      return this.darkMode ? 'nigth.png' : 'day.gif';
    },
    textColor() {
      return this.darkMode ? 'white' : 'black';
    },
    ...mapState(['darkMode']),
  },
};
</script>
<style lang="scss" scoped>
@media only screen and (max-width: 1200px) {
  .lan {
    margin-top: 130px !important;
  }
}
@media only screen and (max-width: 500px) {
  .lan {
    font-size: 14px !important;
  }
}
</style>
