<template>
  <v-app>
    <!-- <audio id="song" autoplay loop>
      <source src="http://scummbar.com/mi2/DOTT/03%20-%20Busting%20The%20Candy%20Machine.mp3">
    </audio> -->
    <NavBar :isMobile="isMobile" :class="`${darkMode? 'blueDark' :'blueLight'}`" />
    <horizontal-scroll  class="horizontal-scroll" :setFront="setFront" :setScroll="setScroll">
      <div :class="`d-flex pa-0 ma-0 fondo ${darkMode? 'blueDark' :'blueLight'}`">
        <Home :isMobile="isMobile" :isWalking="isWalking" :isFront ="front"/>
        <About :isMobile="isMobile" :scroll="scroll"/>
        <Knowledges :isMobile="isMobile" :scroll="scroll"/>
        <Projects/>
        <Contact/>
      </div>
    </horizontal-scroll>
    <div :class="`mario ${walk} ${isJump && 'jump1'}`">
    </div>
    <div :class="`floor ${walkFloor}`"></div>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import HorizontalScroll from '@/components/HorizontalScroll.vue';
import NavBar from '@/components/NavBar.vue';
import About from './views/AboutMe.vue';
import Contact from './views/Contact.vue';
import Home from './views/Home.vue';
import Knowledges from './views/Knowledges.vue';
import Projects from './views/Projects.vue';

import 'vue-horizontal-scroll/dist/vue-horizontal-scroll.css';

export default {
  name: 'App',
  components: {
    HorizontalScroll,
    Home,
    About,
    Contact,
    Knowledges,
    Projects,
    NavBar,
  },
  created() {
    this.walking();
    const screens = [0, 1, 2, 3, 4, 5].map((e) => e * window.innerWidth);
    this.$store.commit('SET_SCREENS', screens);
  },
  watch: {
    walkFloor() {
      if (this.isWalking) {
        [0, 1, 2, 3].forEach((i) => {
          if (this.walkFloor === `walking-${i}`) {
            setTimeout(() => {
              const number = this.front ? (i + 1) % 4 : (i + 3) % 4;
              this.walkFloor = `walking-${number}`;
            }, 500);
          }
        });
      }
    },
    isWalking() {
      if (this.isWalking) {
        const number = Number(this.walkFloor.split('-')[1]);
        const index = (number + 1) % 4;
        this.walkFloor = `walking-${index}`;
      }
    },
  },
  methods: {
    setScroll(scrollLeft) {
      this.scroll = scrollLeft;
    },
    setFront(boolean) {
      this.front = boolean;
    },
    walking() {
      setInterval(() => {
        if (this.isWalking) {
          const direction = this.front ? 'front' : 'back';
          this.walk = this.walk === `walk-${direction}` ? `stop-${direction}` : `walk-${direction}`;
        } else {
          this.walk = 'stop-front';
        }
      }, 300);
    },
  },
  data: () => ({
    front: true,
    walk: 'stop-front',
    walkFloor: 'walking-1',
    scroll: 0,
  }),
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    isWalking() {
      return this.scroll > 0;
    },
    ...mapState(['darkMode']),
    ...mapState(['isJump']),
  },
};
</script>
<style lang="scss">
@import "app.scss";

@keyframes jump{
  0% { bottom: 105px; left: 130;}
  50% {  bottom: 125px ; left: 160;}
  100% {  bottom: 145px ; left: 190;}
}
.mario {
  margin:auto;
  position: fixed;
  z-index: 15;
  @include mario(100px,85px, './assets/img/mariobros.png');
}
.jump1 {
  /* animation: jump 2s; */
  display: none;
}
.view{
  width: 100vw !important;
  height: 100% !important;
}
.fondo{
  height: 100% !important;
}
.horizontal-scroll {
    display: flex;
    width: 100%;
    height: 100vh;
}
.dialog{
  position: relative;
  bottom:50px;
  left: 70px;
}

.coin0{
    background-position: 0% 0% !important;
    @include coin();
}
.coin1{
    background-position: 13% 0% !important;
    @include coin();
}
.coin2{
    background-position: 26% 0% !important;
    @include coin();
}
.coin3{
    background-position: 39% 0% !important;
    @include coin();
}
.coin4{
    background-position: 53% 0% !important;
    @include coin();
}
/* @keyframes movecoin {
    0% { background-position: 0% 0%}
    6.25% { background-position: 6.25% 0%}
    12.5% { background-position: 12.5% 0%}
    50% { background-position: 50% 0%}
    100% { background-position: 100% 0% }
  } */
</style>
