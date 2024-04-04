import Component from '@ember/component';

export default Component.extend({
  tagName: '',
  open: true,
  slideNumber: 1,
  totalSlides: 3,

  actions: {
    toggleModal() {
      this.toggleProperty('open');
    },
    nextSlide() {
      if (this.slideNumber < this.totalSlides) {
        this.set('slideNumber', this.slideNumber + 1);
      }
    },
    prevSlide() {
      if (this.slideNumber > 1) {
        this.set('slideNumber', this.slideNumber - 1);
      }
    },
  },
});
