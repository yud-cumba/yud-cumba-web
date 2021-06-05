<template>
    <div class="_horizontal-scroll">
        <slot></slot>
    </div>
</template>

<script>
export default {
  props: ['setFront', 'setScroll'],
  data: () => ({
    front: true,
    scroll: 0,
  }),
  mounted() {
    const content = this.$el;
    // const vm = this;
    // Firefox
    console.log('content', content);
    if (content.addEventListener) {
      content.addEventListener('DOMMouseScroll', (e) => {
        console.log(e.wheelDelta);
        content.scrollBy(-e.wheelDelta, 0);
      }, false);
    }
    // IE
    if (content.attachEvent) {
      content.attachEvent('onmousewheel', (e) => {
        content.scrollBy(-e.wheelDelta, 0);
      });
    }
    // Chrome
    // eslint-disable-next-line func-names
    content.onwheel = function (e) {
    //   console.log(currentFront);
      //   if (currentFront !== this.front) {
      //     console.log('cambiemooos', currentFront, e.wheelDelta);
      //     this.front = currentFront;
      //   }
      content.scrollBy(-e.wheelDelta, 0);
    };
    // content.onmousewheel = function (e) {
    //   console.log(e);
    // //   content.scrollBy(-e.wheelDelta, 0);
    // };
    const vm = this;
    content.onscroll = function (e) {
      const currentFront = e.target.scrollLeft - vm.scroll >= 0;
      vm.setScroll(e.target.scrollLeft);
      vm.scroll = e.target.scrollLeft;
      if (currentFront !== vm.front) {
        vm.setFront(currentFront);
        vm.front = currentFront;
        vm.$store.commit('SET_FRONT', currentFront);
      }
    //   console.log(e);
    //   console.log(e.target.scrollTop);
    //   console.log('w', e.target.scrollWidth);
      //   vm.setFront(e.wheelDelta < 0);
    //   content.scrollBy(-e.wheelDelta, 0);
    };
  },
};
</script>

<style scoped>
._horizontal-scroll {
    box-sizing: border-box;
    overflow-x: scroll;
    overflow-y: hidden;
    text-align: left;
    white-space: nowrap;
}
</style>
