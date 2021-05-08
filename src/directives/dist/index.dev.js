"use strict";

var _vue = _interopRequireDefault(require("vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].directive('focus', {
  /**
       * inserted hook: Cuando el elemento es insertado en el DOM
       * @param el {HTMLElement} El elemento al que está dirigida la directiva
       */
  bind: function bind(el) {
    console.log(el); // Enfoca el elemento
    // eslint-disable-next-line no-param-reassign

    el.style.fontSize = '400px';
  }
});

_vue["default"].directive('scroll', {
  inserted: function inserted(el, binding) {
    // alert('scroll');
    console.log(el, binding); // eslint-disable-next-line no-param-reassign
    // el.style.fontSize = '400px';
    // const f = function (evt) {
    //   if (binding.value(evt, el)) {
    //     window.removeEventListener('scroll', f);
    //   }
    // };
    // window.addEventListener('scroll', f);
  }
});