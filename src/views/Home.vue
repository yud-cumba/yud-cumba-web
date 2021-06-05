<template>
  <div class="view">
      <div class="d-flex flex-column align-center my-5"
      >
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
        <div class="d-flex mt-5 lan" @click="setLanguage">
          <v-img width="40px" src="@/assets/img/mushroom.svg"></v-img>
        <h3 :class="`text-uppercase pa-1 ${textColor}--text click`">
          {{btnText}}</h3>
        </div>
      </div>
      <div :class="`tree ${walkingClass}`">
        </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Home',
  data: () => ({
    english: false,
  }),
  props: {
    isFront: {
      type: Boolean,
      required: true,
      default: false,
    },
    isWalking: {
      type: Boolean,
      required: true,
      default: false,
    },
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
    textColor() {
      return this.darkMode ? 'white' : 'black';
    },
    walkingClass() {
      if (this.isWalking) {
        return this.isFront ? 'walkingFront' : 'walkingBack';
      }
      return '';
    },
    ...mapState(['darkMode']),
  },
};
</script>
<style lang="scss" scoped>
.tree{
  width: 100vw;
  height: 200px;
  position: absolute;
  bottom: 50px;
  background: url('../assets/img/background.png');
  background-position: 0px 100%;
}
@mixin walkingBackground ($direction){
  @if $direction == front {
    animation: movefront 5s linear infinite;
  } @else {
    animation: moveback 5s linear infinite;
  }
}
.walkingFront {
  @include walkingBackground(front);
}
.walkingBack {
  @include walkingBackground(back);
}
@keyframes movefront {
  0% { background-position: 512px 100%}
  100% { background-position: 0px 100%; }
}
@keyframes moveback {
  0% { background-position: 0px 100%; }
  100% { background-position: 512px 100%}
}
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
