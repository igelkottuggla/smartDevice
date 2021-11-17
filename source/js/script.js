(function () {
  const phoneInputs = document.querySelectorAll('[data-phone-pattern]');
  if (phoneInputs) {
    document.addEventListener('DOMContentLoaded', function () {
      const eventCalllback = (event) => {
        const el = event.target;

        const clearVal = el.dataset.phoneClear;
        const pattern = el.dataset.phonePattern;
        const matrixDef = '+7(___)___-__-__';
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

      for (let elem of phoneInputs) {
        for (let ev of ['input', 'blur', 'focus']) {
          elem.addEventListener(ev, eventCalllback);
        }
      }

      phoneInputs.forEach((input) => {
        input.addEventListener('focus', (event) => {
          event.target.value = '+7(';
        });
      });
    });
  }
})();

(function () {
  const advisoryLink = document.querySelector('.hero a');
  const feedbackSection = document.getElementById('feedback');

  const gap = 100;
  if (feedbackSection) {
    advisoryLink.addEventListener('click', (scrollEvent) => {
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
  }
})();

(function () {
  const footerEl = document.querySelector('.footer');
  const footerBtns = document.querySelectorAll('.button--toggle');
  if (footerEl) {
    footerEl.classList.remove('footer--no-js');

    if (footerBtns) {
      footerBtns.forEach((button) => {
        button.addEventListener('click', function (evt) {
          for (let i = 0; i < footerBtns.length; i++) {
            if (footerBtns[i] === evt.target) {
              footerBtns[i].nextElementSibling.classList.toggle('opened');
            }

            if (footerBtns[i] !== evt.target) {
              footerBtns[i].nextElementSibling.classList.remove('opened');
              footerBtns[i].classList.remove('opened');
            }
          }
          button.classList.toggle('opened');
        });
      });
    }
  }
})();

(function () {
  const callmeBtn = document.querySelector('.button--call-me');
  const popup = document.querySelector('.popup');
  const closeFormBtn = document.querySelector('.button--close');
  const popupForm = document.querySelector('.popup__feedback-form');
  const popupBtn = document.querySelector('.button--send');
  const escBtn = 'Escape';

  const hidePopUp = () => {
    popup.classList.add('visually-hidden');
    document.body.classList.remove('overflow-hidden');
  };

  const showPopUp = () => {
    const nameInput = document.getElementById('user-name');
    nameInput.focus();
    popup.classList.remove('visually-hidden');
    document.body.classList.add('overflow-hidden');
  };

  if (popup) {
    callmeBtn.addEventListener('click', () => {
      showPopUp();

      document.addEventListener('click', (event) => {
        if (event.target === popup) {
          hidePopUp();
        }
      });

      document.addEventListener('keydown', function (event) {
        if (event.key === escBtn) {
          hidePopUp();
        }
      });
    });

    closeFormBtn.addEventListener('click', (event) => {
      event.preventDefault();
      hidePopUp();
    });
  }
  if (popupForm) {
    const nameInput = document.getElementById('user-name');
    const telInput = document.getElementById('user-tel');
    const commentInput = document.getElementById('user-comment');
    popupBtn.addEventListener('click', () => {
      if (popupForm) {
        const popupUserInfo = {
          name: nameInput.value,
          tel: telInput.value,
          comment: commentInput.value,
        };
        localStorage.setItem('popup-user', JSON.stringify(popupUserInfo));
      }
    });
  }
})();

(function () {
  const feedbackForm = document.querySelector('.feedback-form');
  const feedbackFormBtn = document.querySelector('.button--contact');
  if (feedbackForm) {
    feedbackFormBtn.addEventListener('click', () => {
      const inputName = document.getElementById('name');
      const inputTel = document.getElementById('tel');
      const comment = document.getElementById('comment');

      if (feedbackForm) {
        const feedbackUserInfo = {
          name: inputName.value,
          tel: inputTel.value,
          comment: comment.value,
        };

        localStorage.setItem('feedback-user', JSON.stringify(feedbackUserInfo));
      }
    });
  }
})();
