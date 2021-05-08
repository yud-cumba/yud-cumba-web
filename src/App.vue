<template>
  <v-app>
     <horizontal-scroll  class="horizontal-scroll">
    <div class="blue d-flex pa-0 ma-0 fondo">
      <Home :isMobile="isMobile"/>
      <About :isMobile="isMobile"/>
      <Knowledges/>
      <Projects/>
      <Contact/>
      <div :class="`mario ${walk}`"></div>
          </div>
        </horizontal-scroll>
        <div :class="`floor ${walkFloor}`"></div>
  </v-app>
</template>

<script>
import HorizontalScroll from 'vue-horizontal-scroll';
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
  },
  created() {
    this.walking();
  },
  watch: {
    walkFloor() {
      if (this.walkFloor === 'walking1') {
        setTimeout(() => {
          this.walkFloor = 'walking2';
        }, 500);
      }
      if (this.walkFloor === 'walking2') {
        setTimeout(() => {
          this.walkFloor = 'walking3';
        }, 500);
      } if (this.walkFloor === 'walking3') {
        setTimeout(() => {
          this.walkFloor = 'walking4';
        }, 500);
      }
      if (this.walkFloor === 'walking4') {
        setTimeout(() => {
          this.walkFloor = 'walking1';
        }, 500);
      }
    },
    // iswalk() {
    //   setTimeout(() => {
    //     console.log(this.walkFloor, this.walkFloor === 'walking1');
    //     if (this.walkFloor === 'walking1') {
    //       this.walkFloor = 'walking2';
    //     }
    //     if (this.walkFloor === 'walking2') {
    //       this.walkFloor = 'walking3';
    //     } if (this.walkFloor === 'walking3') {
    //       this.walkFloor = 'walking4';
    //     }
    //     if (this.walkFloor === 'walking4') {
    //       this.walkFloor = 'walking1';
    //     }
    //   }, 1500);
    // },
  },
  methods: {
    walking() {
      setInterval(() => {
        this.walk = this.walk === 'walk-front' ? 'stop-front ' : 'walk-front';
      }, 300);
      console.log(this.walkFloor, this.walkFloor === 'walking1');
      setTimeout(() => {
        this.walkFloor = 'walking2';
      }, 1500);
    },
  },
  data: () => ({
    front: true,
    walk: 'walk-front',
    walkFloor: 'walking1',
  }),
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
  },
};
</script>
<style>
.view{
  width: 100vw !important;
  height: 100vh !important;
}
.fondo{
  height: 100% !important;
}
.horizontal-scroll {
    display: flex;
    width: 100%;
    height: 100vh;
}
</style>
