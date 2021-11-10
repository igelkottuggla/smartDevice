const header = document.querySelector('.header');
const openBtn = document.querySelector('.header__button');
const headerNavLinks = document.querySelectorAll('.nav__item a');

const gap = 100;

window.addEventListener('resize', () => {
  if (window.innerWidth >= 1024) {
    document.body.classList.remove('overflow-hidden');
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const eventCalllback = (event) => {
    const el = event.target;
    const clearVal = el.dataset.phoneClear;
    const pattern = el.dataset.phonePattern;
    const matrixDef = '+7(___) ___-__-__';
    const matrix = pattern ? pattern : matrixDef;
    let index = 0;
    const def = matrix.replace(/\D/g, '');
    let val = event.target.value.replace(/\D/g, '');

    if (clearVal !== 'false' && event.type === 'blur') {
      if (val.length < matrix.match(/([\_\d])/g).length) {
        event.target.value = '';
        return;
      }
    }
    if (def.length >= val.length) {
      val = def;
    }
    event.target.value = matrix.replace(/./g, function (input) {
      let check = index >= val.length ? '' : input;
      return /[_\d]/.test(input) && index < val.length
        ? val.charAt(index++)
        : check;
    });
  };

  const phoneInputs = document.querySelectorAll('[data-phone-pattern]');
  for (let elem of phoneInputs) {
    for (let ev of ['input', 'blur', 'focus']) {
      elem.addEventListener(ev, eventCalllback);
    }
  }
});

if (header) {
  header.classList.remove('header--no-js');

  openBtn.addEventListener('click', () => {
    header.classList.toggle('header--open');
    document.body.classList.toggle('overflow-hidden');
  });

  headerNavLinks.forEach((link) => {
    link.addEventListener('click', () => {
      header.classList.remove('header--open');
      document.body.classList.remove('overflow-hidden');
    });
  });
}

if (headerNavLinks) {
  headerNavLinks.forEach((link) => {
    link.addEventListener('click', (scrollEvent) => {
      scrollEvent.preventDefault();
      const id = scrollEvent.currentTarget.getAttribute('href').slice(1);
      const element = document.getElementById(id);
      let position = element.offsetTop - gap;

      window.scrollTo({
        left: 0,
        top: position,
        behavior: 'smooth',
      });
    });
  });
}

const video = document.querySelector('.video__content');

if (video) {
  const playBtn = document.querySelector('.video__play');

  const toggleVideoStatus = () => {
    if (video.paused) {
      video.play();
      playBtn.classList.add('video__button--active');
    } else {
      video.pause();
      playBtn.classList.remove('video__button--active');
    }
  };

  playBtn.addEventListener('click', toggleVideoStatus);
}

const form = document.querySelector('.hero__form');

if (form) {
  const submitBtn = document.querySelector('.hero__form button');
  const inputName = document.getElementById('name');

  inputName.addEventListener('input', function (event) {
    const el = event.target;
    if (el.value === '') {
      inputName.setCustomValidity('Введите имя');
    } else {
      inputName.setCustomValidity('');
    }
  });

  submitBtn.addEventListener('click', () => {
    localStorage.setItem('tel', document.getElementById('tel').value);
    localStorage.setItem('name', document.getElementById('name').value);
  });
}
