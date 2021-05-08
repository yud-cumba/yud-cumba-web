<template>
  <div>
    <v-row class="d-flex justify-space-between">
      <v-img
          width="130px"
          class="cielo"
          src="@/assets/img/cielo1.png"
        ></v-img>
      <radial-menu
        :rotate="180"
        :size="60"
        :style="`
        margin-left: 120px;
        margin-top: 70px;
        z-index:9;
        position: fixed;
        background-color: ${mainColor};
        color: white;`"
        :itemSize="60"
        :radius="160"
        :angle-restriction="110"
      >
        <radial-menu-item
          v-for="(item, index) in items"
          :key="index"
          :style="`background-color: ${mainColor}`"
          @click="$router.push({ name: item.route, hash: `#${item.route}` })"
        >
          <v-icon>{{ item.icon }}</v-icon>
        </radial-menu-item>
      </radial-menu>
      <DarkModeSwitch
        @switched="onSwitched"
        :initialState="false"
        :isMobile="isMobile"
      />
    </v-row>
    <!-- <v-card v-else class="d-flex justify-space-between" :color="mainColor">
      <v-icon>mdi-home</v-icon>
      <v-list class="d-flex" dark :color="mainColor">
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="$router.push({ name: item.route, hash: `#${item.route}` })"
          class="text-lg-h6 list d-flex justify-center"
        > <v-icon :class="`${textColor}--text mx-1`">{{ item.icon }}</v-icon>
          <h5 :class="`${textColor}--text text-uppercase`"
          >{{ item.text }}</h5>
        </v-list-item>
      </v-list>
      <DarkModeSwitch
        @switched="onSwitched"
        :initialState="false"
        :isMobile="isMobile"
      />
    </v-card> -->
  </div>
</template>

<script>
import { RadialMenu, RadialMenuItem } from 'vue-radial-menu';
import colors from '@/mixins/colors';
import DarkModeSwitch from '@/components/Switch.vue';
import { mapState } from 'vuex';

export default {
  name: 'navbar',
  components: {
    RadialMenu,
    RadialMenuItem,

    DarkModeSwitch,
  },
  props: {
    isMobile: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  mixins: [colors],
  data() {
    return {
      lastClicked: 'click on something!',
      mainColor: '#FFB74D',
      textColor: 'black',
    };
  },
  methods: {
    onSwitched(isSwitched) {
      this.textColor = isSwitched ? 'white' : 'black';
      this.mainColor = isSwitched ? this.mainDark : this.mainLigth;
      this.$store.commit('SET_DARKMODE', isSwitched);
    },
  },
  computed: {
    ...mapState(['english']),
    items() {
      return [
        {
          text: !this.english ? 'Inicio' : 'Home',
          icon: 'mdi-home',
          route: 'Home',
        },
        {
          text: !this.english ? 'Sobre mí' : 'About me',
          icon: 'mdi-account-star',
          route: 'AboutMe',
        },
        {
          text: !this.english ? 'Conocimientos' : 'Knowledges',
          icon: 'mdi-book-open-page-variant',
          route: 'Knowledges',
        },
        {
          text: !this.english ? 'Proyectos' : 'Projects',
          icon: 'mdi-wrench',
          route: 'Projects',
        },
        {
          text: !this.english ? 'Contactame' : 'Contact me',
          icon: 'mdi-cellphone-sound',
          route: 'Contact',
        },
      ];
    },
  },
};
</script>
<style lang="scss" scoped>
.cielo{
  position: fixed;
  top: 10px;
  left: 20px;
  z-index: 10;
}
.list {
  width: 200px !important;
}
</style>
