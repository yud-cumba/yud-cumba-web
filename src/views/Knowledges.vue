<template>
  <div id="Knowledges" class="view d-flex flex-column justify-end blue">
    <div>
      {{ selectedKnowledge.title }}
      <v-row class="d-flex justify-center">
        <div
          v-for="know in selectedKnowledge.value"
          :key="know.name"
          class="my-3 d-flex align-center flex-column justify-end"
        >
          <div v-for="coin in know.rating" :key="coin" class="d-flex flex-column ">
            <div :class="coinClass"></div>
          </div>
          <div class="brick d-flex justify-center mt-3">
            <v-img :src="know.img" :max-width="50" contain class="column ma-5"
            :height="50"
            > </v-img>
          </div>
        </div>
      </v-row>
    </div>
    <v-row>
      <v-col
        v-for="(value, key) in byGroup"
        :key="key"
        class="mt-auto line d-flex align-center flex-column"
      >
        <!-- <h4 class="text-uppercase">{{key}}</h4> -->
        <v-img
          src="@/assets/img/question_block.png"
          :max-width="75"
          @click="showKnowledge(value, key)"
          class="click"
        >
        </v-img>
      </v-col>
    </v-row>
    <div>
      <div
        v-if="seeOptions"
        class="bocadillo-redondo
     d-flex justify-center align-center"
      >
        <p class="pt-3 pr-2">Click en un</p>
        <v-img src="@/assets/img/question_block.png" :max-width="25"> </v-img>
      </div>
    </div>
    <!-- <template v-if="byGroup">
      <div v-for="(values, key) in byGroup" :key="key">
        <template v-if="key !== 'otros'">
          <div class="d-flex my-5">
            <v-img max-width="50" src="@/assets/img/mushroom.svg"></v-img>
            <h3 class=" ml-5 mt-2 text-capitalize">{{ key }}</h3>
          </div>
          <v-row>
            <div v-for="know in values" :key="know.name"
            class="my-3">
              <v-img
                :src="know.img"
                width="100"
                contain
                class="column ma-5"
                height="100"
              >
              </v-img>
            </div>
          </v-row>
          <Divider />
        </template>
      </div>
      <div v-for="(values, key) in byGroup" :key="`${key}${values.length}`">
        <template v-if="key === 'otros'">
          <div class="d-flex my-5">
            <v-img max-width="50" src="@/assets/img/mushroom.svg"></v-img>
            <h3 class=" ml-5 mt-2 text-capitalize">{{ key }}</h3>
          </div>
          <v-row class="pb-5">
            <div v-for="know in values" :key="know.name" class="ma-3">
              <v-img :src="know.img" max-width="100" max-height="150"> </v-img>
            </div>
          </v-row>
          <Divider />
        </template>
      </div>
    </template> -->
  </div>
</template>
<script>
import { getAllData } from '@/firebase/database';
import { mapState } from 'vuex';
// import Divider from '@/components/Divider.vue';
import colors from '@/mixins/colors';
import group from '@/mixins/group';

export default {
  name: 'Knowledges',
  mixins: [colors, group],
  data: () => ({
    knowledges: [],
    selectedKnowledge: [],
    coinClass: 'coin0',
  }),
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
  methods: {
    showKnowledge(value, title) {
      this.selectedKnowledge = {
        value,
        title,
      };
    },
  },
  computed: {
    seeOptions() {
      return this.scroll > this.screens[2] - 200 && this.scroll < this.screens[3] - 200;
    },
    ...mapState(['english', 'darkMode', 'screens', 'isFront']),
    background() {
      return this.darkMode ? this.secondary : 'white';
    },
    title() {
      return !this.english ? 'Mis conocimientos' : 'My knowledges';
    },
    byGroup() {
      if (this.knowledges.length) {
        return this.groupBy(this.knowledges, 'type');
      }
      return false;
    },
  },
  watch: {
    coinClass() {
      [0, 1, 2, 3, 4].forEach((i) => {
        if (this.coinClass === `coin${i}`) {
          setTimeout(() => {
            const number = (i + 1) % 5;
            this.coinClass = `coin${number}`;
          }, 300);
        }
      });
    },
  },
  async created() {
    this.knowledges = await getAllData('KNOWLEDGES');
    setTimeout(() => {
      this.coinClass = 'coin2';
    }, 200);
  },
};
</script>
<style lang="scss" scoped>
.brick {
  background: url("../assets/img/brick.png");
  background-size: auto 100%;
  width: 75px;
  height: 75px;
}
.bocadillo-redondo {
  position: fixed;
  height: 80px;
  width: 200px;
  bottom: 200px;
  left: 200px;
  background: white;
  border-radius: 50%;
  box-shadow: 1px 12px 33px rgb(0 0 0 / 50%);
}
.bocadillo-redondo:before {
  border: 15px solid white;
  content: "";
  border-left-color: white;
  border-bottom-color: transparent;
  border-right-color: transparent;
  position: absolute;
  bottom: -20px;
  right: 150px;
  transform: rotate(18deg);
}
.line {
  position: relative;
  bottom: 300px;
}
.row-data {
  height: 100px !important;
}
</style>
