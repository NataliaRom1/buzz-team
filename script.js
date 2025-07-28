const banner = document.querySelector('.banner');
const button = banner.querySelector('#main-button');
const desc2 = banner.querySelector('.banner__desc-second');
const desc3 = banner.querySelector('.banner__desc-third');
const stepsWrapper = banner.querySelector('.banner__steps');
const steps = stepsWrapper.querySelectorAll('.banner__step');
const slide = banner.querySelector('.banner__slide');

function resetAnimations() {
  steps.forEach(step => {
    step.classList.remove('fade-in', 'fade-out');
  });
  desc2.classList.remove('fade-in', 'fade-out');
  desc3.classList.remove('fade-in', 'fade-out');
  slide.classList.remove('slide-animate-in', 'slide-animate-out');
}

function startCycle() {
  resetAnimations();

  stepsWrapper.classList.remove('d-none');
  desc2.classList.remove('d-none');
  desc2.classList.add('fade-in');

  // === Появление шагов по очереди ===
  steps.forEach((step, index) => {
    setTimeout(() => {
      step.style.animationDelay = '0s';
      step.classList.add('fade-in');
    }, index * 750);
  });

  // === Скрыть шаги одновременно + показать слайд ===
  setTimeout(() => {
    steps.forEach((step) => {
      // step.classList.remove('fade-in');
      step.classList.add('fade-out');
    });

    desc2.classList.add('fade-out');

    // Через 0.5s — скрыть шаги и показать слайд
    setTimeout(() => {
      desc2.classList.add('d-none');
      stepsWrapper.classList.add('d-none');

      desc3.classList.remove('d-none');
      slide.classList.remove('d-none');

      desc3.classList.add('fade-in');
      slide.classList.add('slide-animate-in');
    }, 500);
  }, 5000);

  // === Через 2s после показа слайда — скрыть слайд и повторить ===
  setTimeout(() => {
    slide.classList.add('slide-animate-out');
    desc3.classList.add('fade-out');

    // После исчезновения — перезапуск цикла
    setTimeout(() => {
      slide.classList.add('d-none');
      desc3.classList.add('d-none');
      startCycle();
    }, 1000); // 1s = slideOut duration
  }, 9000); // 5.5s (шаги) + 0.5s (fadeOut) + 3s (пауза перед slide-out)
}


button.addEventListener('click', () => {
  button.classList.add('fade-out');

  // стартуем цикл
  setTimeout(() => {
    button.classList.add('d-none');
    stepsWrapper.classList.remove('d-none');
    desc2.classList.remove('d-none');

    startCycle();
  }, 300);
});