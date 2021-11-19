(function () {
  const phoneInputs = document.querySelectorAll('[data-phone-pattern]');
  const errorText = document.querySelector('.feedback-form__field p');
  if (phoneInputs) {
    document.addEventListener('DOMContentLoaded', function () {
      const eventCalllback = (event) => {
        const el = event.target;

        const pattern = el.dataset.phonePattern;
        const matrixDef = '+7(___)___-__-__';
        const matrix = pattern ? pattern : matrixDef;
        let index = 0;
        const def = matrix.replace(/\D/g, '');
        let val = event.target.value.replace(/\D/g, '');

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

      phoneInputs.forEach((input) => {
        input.addEventListener('keyup', (event) => {
          if (event.target.value.length < 16) {
            errorText.classList.remove('visually-hidden');
            return;
          } else {
            errorText.classList.add('visually-hidden');
          }
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
  const footerBtns = document.querySelectorAll('.footer__details h2');
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
              footerBtns[i].classList.remove('opened-tab');
            }
          }
          button.classList.toggle('opened-tab');
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

  function isDescendant(ancestor, descendant) {
    do {
      if (descendant === ancestor) {
        return true;
      }
    } while ((descendant = descendant.parentNode));
    return false;
  }

  let tabIndexRestoreFunctions;

  document
    .querySelector('.button--close')
    .addEventListener('click', function () {
      tabIndexRestoreFunctions.forEach((f) => f());
      tabIndexRestoreFunctions.forEach((f) => f());
      tabIndexRestoreFunctions = null;
    });

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
    let htmlAllCollection = document.all;

    callmeBtn.addEventListener('click', () => {
      showPopUp();
      tabIndexRestoreFunctions = Array.prototype.filter
        .call(
            htmlAllCollection,
            (descendant) =>
              descendant.tabIndex > -1 && !isDescendant(popup, descendant)
        )
        .map((descendant) => {
          var oldTabIndex = descendant.tabIndex;
          descendant.tabIndex = -1;
          return () => (descendant.tabIndex = oldTabIndex);
        });

      document.addEventListener('click', (event) => {
        if (event.target === popup) {
          hidePopUp();
          tabIndexRestoreFunctions.forEach((f) => f());
          tabIndexRestoreFunctions.forEach((f) => f());
          tabIndexRestoreFunctions = null;
        }
      });

      document.addEventListener('keydown', function (event) {
        if (event.key === escBtn) {
          hidePopUp();
          tabIndexRestoreFunctions.forEach((f) => f());
          tabIndexRestoreFunctions.forEach((f) => f());
          tabIndexRestoreFunctions = null;
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
