<template>
  <v-card id="Knowledges" :color="background">
    <div  v-for="know in knowledges" :key="know.name">
    <v-img
    :src="know.img" max-width="100">
    </v-img>
    <h3>{{know.name}}</h3>
    </div>
  </v-card>
</template>
<script>
import { getAllData } from '@/firebase/database';
import { mapState } from 'vuex';
import colors from '@/mixins/colors';

export default {
  name: 'Knowledges',
  mixins: [colors],
  data: () => ({
    knowledges: [],
  }),
  computed: {
    ...mapState(['english', 'darkMode']),
    background() {
      return this.darkMode ? this.secondary : 'white';
    },
  },
  async created() {
    this.knowledges = await getAllData('KNOWLEDGES');
  },
};
</script>
