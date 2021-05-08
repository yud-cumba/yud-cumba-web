export default {
  methods: {
    handleScroll(evt, el, min, max) {
      console.log('window.scrollY', window.scrollY);
      if (window.scrollY > min) {
        el.setAttribute(
          'style',
          'opacity: 1; transform: translate3d(0, -10px, 0)',
        );
      }
      return window.scrollY > max;
    },
  },
};
