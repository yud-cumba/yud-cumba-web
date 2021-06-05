<template>
  <!-- <v-card
    :color="background"
    class="view"
    id="AboutMe"
  > -->
  <div class="view d-flex flex-column justify-end ">
    <!-- <h1>This is an aboutme page</h1> -->
    <v-dialog v-model="dialog" :width="this.screens[1] * 0.75">
      <v-card class="pa-5">
        <div class="d-flex">
          <v-img :max-width="this.screens[1] / 4" contain src="@/assets/img/AvatarHi.png"> </v-img>
          <div :class="`pa-10 text-center ${textColor}--text`">
            <h1>{{ textTitle }}</h1>
            <h4>{{ textInfo }}</h4>
          </div>
        </div>
        <v-card-actions class="d-flex justify-center">
          <h4>
            PRESIONA
            <v-btn class="mx-4 press" elevation-0 small fab @click="dialog = false"> Y</v-btn>
            PARA CONTINUAR
          </h4>
        </v-card-actions>
      </v-card>
    </v-dialog>
     <!-- <div class="d-flex">
       <div
       v-for="marioIndex in 5" :key="`mario-stair-${marioIndex}`"
       :class="`mario-stair ${classShow[marioIndex-1]}`"></div>
    </div> -->
    <div class="d-flex">
       <div
       v-for="marioIndex in 7" :key="`mario-stair-${marioIndex}`"
       :class="`mario-stair
        ${marioIndex%2 === 0 || classWalking}
        ${marioIndex%2 !== 0 || classStopping}
        ${classShow[marioIndex-1]}`">
       </div>
    </div>
    <template>
      <div class="brick5"></div>
      <div class="brick4"></div>
      <div class="brick3"></div>
      <div class="brick2"></div>
      <div class="brick"></div>
    </template>
  </div>
  <!-- </v-card> -->
</template>

<script>
import { mapState } from 'vuex';
import colors from '@/mixins/colors';
import { getAll } from '@/firebase/database';

export default {
  name: 'AboutMe',
  mixins: [colors],
  data: () => ({
    dialog: false,
    activator: true,
    activatorJump: true,
    about: {},
  }),
  async created() {
    this.about = await getAll('ABOUTME');
  },
  props: {
    isMobile: {
      type: Boolean,
      required: true,
      default: false,
    },
    scroll: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  watch: {
    scroll() {
      if (this.activator) {
        if (this.scroll > this.screens[1] * 0.6 && this.scroll < this.screens[2] * 0.6) {
          this.dialog = true;
          this.activator = false;
        }
      }
      if (this.scroll > this.screens[3]
      || this.scroll < this.screens[1] * 0.5) this.activator = true;

      // if (this.activatorJump) {
      if (this.scroll > this.screens[1] + 200 && this.scroll < this.screens[1] + 750) {
        this.$store.commit('SET_JUMP', true);
        this.activatorJump = false;
      } else {
        this.$store.commit('SET_JUMP', false);
      }
      // }
      // if (this.scroll < this.screens[1]) this.activatorJump = true;
    },
  },
  mounted() {
    window.addEventListener('keypress', (e) => {
      if (String.fromCharCode(e.keyCode).toLowerCase() === 'y') {
        this.dialog = false;
      }
    });
  },
  computed: {
    ...mapState(['english', 'darkMode', 'screens', 'isFront']),
    textTitle() {
      return !this.english ? '¡Hola mundo!' : 'Hello world!';
    },
    classShow() {
      const classShow = ['hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden'];
      [0, 1, 2, 3, 4, 5, 6].forEach((i) => {
        if (this.scroll > this.screens[1] + 200 + (i * 75)
      && this.scroll < this.screens[1] + 275 + (i * 75)) {
          classShow[i] = 'visible';
        } else {
          classShow[i] = 'hidden';
        }
      });
      return classShow;
    },
    classWalking() {
      return this.isFront ? 'walk-front' : 'walk-back';
    },
    classStopping() {
      return this.isFront ? 'stop-front' : 'stop-back';
    },
    showStair() {
      return !this.dialog;
    },
    background() {
      return this.darkMode ? this.mainDark : this.mainLigth;
    },
    textColor() {
      return this.darkMode ? 'white' : 'black';
    },
    textInfo() {
      const { spanish, english } = this.about;
      return !this.english ? spanish : english;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../app.scss";

/* .mario-stair {
  @include mario(380px, -200px, "../assets/img/mariobros.png");
  position: relative;
  z-index: 15;
} */
@for $i from 1 through 8 {
  .mario-stair:nth-child(#{$i}) {
    @if ($i > 5){
      @if( $i ==7){
        @include mario(380px - ($i * 8), -275px + (3 * 75), "../assets/img/mariobros.png");

      } @else{
        @include mario(380px - ($i * 8), -275px + (5 * 75), "../assets/img/mariobros.png");
    /* @include mario(380px - ($i * 8), 100px - (($i - 5) * 75), "../assets/img/mariobros.png"); */
      }
    } @else{
      @if $i % 2 == 0 {
          @include mario(380px - ($i * 8), -275px + ($i * 75), "../assets/img/mariobros.png");
        } @else {
            @include mario(380px - ($i * 8), -280px + ($i * 75), "../assets/img/mariobros.png");
      }
    }
    position: relative;
    z-index: 15;
  }
}
.visible{
  visibility: visible;
}
.hidden{
  visibility: hidden;
}
/* .mario-stair {
  @include mario(380px, -200px, "../assets/img/mariobros.png");
  position: relative;
  z-index: 15;
} */

.brick {
  @include brickStart(400px, 100px, 6);
}

.brick2 {
  @include brickStart(475px, 100px, 5);
}

.brick3 {
  @include brickStart(550px, 100px, 4);
}

.brick4 {
  @include brickStart(625px, 100px, 3);
}

.brick5 {
  @include brickStart(700px, 100px, 2);
}

.about {
  width: 75vw;
}

.press {
  font-size: 25px !important;
  font-weight: 900;
  border: 3px solid #1e1e2f !important;
  background-color: #ffcd00 !important;
  color: #3342ff !important;
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
