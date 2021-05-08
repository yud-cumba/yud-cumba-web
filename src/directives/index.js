import Vue from 'vue';

Vue.directive('focus', {
  /**
       * inserted hook: Cuando el elemento es insertado en el DOM
       * @param el {HTMLElement} El elemento al que está dirigida la directiva
       */
  bind(el) {
    console.log(el);
    // Enfoca el elemento
    // eslint-disable-next-line no-param-reassign
    el.style.fontSize = '400px';
  },
});

Vue.directive('scrolling', {
  inserted(el, binding) {
    const handleScroll = binding.value;
    const f = function (evt) {
      console.log(handleScroll(evt, el));
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f);
      }
    };
    window.addEventListener('scroll', f);
  },
});
