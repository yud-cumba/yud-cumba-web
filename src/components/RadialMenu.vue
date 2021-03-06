<template>
    <div  class="vue-radial-menu-wrapper">
        <v-btn
            fab
            small
            :class="`vue-radial-menu-container ${shouldOpen && 'open'}`"
            @click="handleClick">
            X
        </v-btn>
        <slot v-if="shouldOpen"></slot>
    </div>
</template>

<script>
/* eslint-disable no-param-reassign */
export default {
  name: 'RadialMenu',
  props: {
    angleRestriction: { type: Number, default: 180 },
    size: { type: Number, default: 50 },
    itemSize: { type: Number, default: 36 },
    rotate: { type: Number, default: 0 },
    radius: { type: Number, default: 100 },
    open: { type: Boolean, default: undefined },
  },
  data() {
    const { size } = this;
    const manualMode = typeof this.open !== 'undefined';
    return {
      manualMode,
      isOpen: false,
      style: {
        width: `${size}px`,
        height: `${size}px`,
      },
    };
  },
  computed: {
    shouldOpen() {
      const { open, manualMode, isOpen } = this;
      return manualMode ? open : isOpen;
    },
  },
  mounted() {
    document.addEventListener('click', this.closeMenuEvent);
    this.setChildProps();
    window.addEventListener('keypress', (e) => {
      const letter = String.fromCharCode(e.keyCode);
      if (letter === 'x') {
        this.handleClick();
      }
    });
  },
  beforeUpdate() {
    this.setChildProps();
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closeMenuEvent);
  },
  methods: {
    closeMenuEvent(e) {
      if (this.shouldOpen && !this.$el.contains(e.target)) {
        this.toggleMenu();
      }
    },
    handleClick() {
      this.$emit('click');
      this.toggleMenu();
    },
    toggleMenu() {
      if (this.manualMode) return;
      if (this.isOpen) {
        this.isOpen = false;
        this.$emit('close');
      } else {
        this.isOpen = true;
        this.$emit('open');
      }
    },
    setChildProps() {
      // Manually add prop data to the items
      const items = this.$slots.default.map((s) => s.componentOptions.propsData);
      const {
        size, itemSize, angleRestriction, rotate, radius,
      } = this;
      const angle = angleRestriction > 300 || angleRestriction < -300 ? 300 : angleRestriction;
      const frags = angle / (items.length - 1 || 1);
      const angles = items.map(
        (item, index) => (Math.PI * (frags * index + rotate)) / 180,
      );
      items.forEach((propData, index) => {
        propData.width = itemSize;
        propData.height = itemSize;
        propData.left = -1 * (size / 2 + Math.cos(angles[index]) * radius - itemSize / 2);
        propData.top = size / 2 - Math.sin(angles[index]) * radius - itemSize / 2;
        propData.onClick = this.manualMode ? null : this.toggleMenu;
      });
    },
  },
};
</script>

<style>

.vue-radial-menu-container {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    transition: all 0.2s ease;
    position: relative;
    top: 64px;
    right: 55px;
    z-index: 6;
    font-size: 25px !important;
    font-weight:900;
    border:3px solid #1e1e2f!important;
    background-color: #ffcd00 !important;
    color: #3342FF !important;
}
.vue-radial-menu-container.open {
    transform: rotateZ(45deg);
}
</style>
