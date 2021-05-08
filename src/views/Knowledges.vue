<template>
  <div id="Knowledges" class="view">
    <h1>{{ title }}</h1>
    <template v-if="byGroup">
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
    </template>
  </div>
</template>
<script>
import { getAllData } from '@/firebase/database';
import { mapState } from 'vuex';
import Divider from '@/components/Divider.vue';
import colors from '@/mixins/colors';
import group from '@/mixins/group';

export default {
  name: 'Knowledges',
  mixins: [colors, group],
  data: () => ({
    knowledges: [],
  }),
  components: {
    Divider,
  },
  computed: {
    ...mapState(['english', 'darkMode']),
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
  async created() {
    this.knowledges = await getAllData('KNOWLEDGES');
  },
};
</script>
<style lang="scss" scoped>
</style>
