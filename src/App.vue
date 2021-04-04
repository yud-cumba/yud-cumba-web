<template>
  <v-app>
    <v-main>
      <Home :isMobile="isMobile"/>
      <About :isMobile="isMobile"/>
      <Knowledges/>
      <Projects/>
      <Contact/>
    </v-main>
  </v-app>
</template>

<script>
import About from './views/AboutMe.vue';
import Contact from './views/Contact.vue';
import Home from './views/Home.vue';
import Knowledges from './views/Knowledges.vue';
import Projects from './views/Projects.vue';

export default {
  name: 'App',
  components: {
    Home,
    About,
    Contact,
    Knowledges,
    Projects,
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
  },
};
</script>
<style>
</style>
