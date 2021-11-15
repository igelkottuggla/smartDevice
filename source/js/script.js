function getElement(selection) {
  const element = document.getElementById(selection);
  if (element) {
    return element;
  }
  throw new Error(`Please check '${selection}' selector,no such element exists`
  );
}

const advisoryLink = document.querySelector('.hero a');
const feedbackSection = getElement('feedback');
const phoneInputs = document.querySelectorAll('[data-phone-pattern]');

const inputName = getElement('name');
const inputTel = getElement('tel');
const comment = getElement('comment');
const nameInput = getElement('user-name');
const telInput = getElement('user-tel');
const commentInput = getElement('user-comment');

const gap = 100;
const escBtn = 'Escape';

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

if (feedbackSection) {
  advisoryLink.addEventListener('click', (scrollEvent) => {
    scrollEvent.preventDefault();
    const id = scrollEvent.currentTarget.getAttribute('href').slice(1);
    const element = getElement(id);
    let position = element.offsetTop - gap;

    window.scrollTo({
      left: 0,
      top: position,
      behavior: 'smooth',
    });
  });
}

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

const callmeBtn = document.querySelector('.button--call-me');
const popup = document.querySelector('.popup');
const closeFormBtn = document.querySelector('.button--close');
const popupForm = document.querySelector('.popup__feedback-form');
const popupBtn = document.querySelector('.button--send');

const hidePopUp = () => {
  popup.classList.add('visually-hidden');
  document.body.classList.remove('overflow-hidden');
};

const showPopUp = () => {
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

const feedbackForm = document.querySelector('.feedback-form');
const feedbackFormBtn = document.querySelector('.button--contact');
if (feedbackForm) {
  feedbackFormBtn.addEventListener('click', () => {
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
