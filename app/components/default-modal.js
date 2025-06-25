import Component from '@ember/component';

const TOTAL_SLIDES = 9;

export default Component.extend({
  tagName: '',
  open: true,
  slideNumber: Math.floor(Math.random() * TOTAL_SLIDES) + 1, // start on a random slide

  actions: {
    toggleModal() {
      this.toggleProperty('open');
    },
    nextSlide() {
      if (this.slideNumber < TOTAL_SLIDES) {
        this.set('slideNumber', this.slideNumber + 1);
      } else {
        // comment out the line below to disable infinite looping
        this.set('slideNumber', 1);
      }
    },
    prevSlide() {
      if (this.slideNumber > 1) {
        this.set('slideNumber', this.slideNumber - 1);
      } else {
        // comment out the line below to disable infinite looping
        this.set('slideNumber', TOTAL_SLIDES);
      }
    },
  },
});
