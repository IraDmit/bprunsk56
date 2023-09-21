window.addEventListener("DOMContentLoaded", () => {
  try {
    document.querySelectorAll(".accordions__item__title").forEach((el) => {
      el.addEventListener("click", ({ target }) => {
        slideToggle(target);
      });
    });
  } catch (error) {
    console.warn('querySelector(".accordions")');
  }

  try {
    const optionsClose = () => {
      let options = document.querySelectorAll(".filter__options");
      options.forEach((element) => {
        element.classList.remove("open");
      });
    };
    document.addEventListener("click", ({ target }) => {
      if (target.classList.contains("filter__selected")) {
        target.nextElementSibling.classList.toggle("open");
      } else if (target.classList.contains("filter__options__item")) {
        let text = target.textContent;
        target.parentNode.previousElementSibling.children[0].innerText = text;
        optionsClose();
      } else if (
        !target.classList.contains("filter__selected") &&
        !target.classList.contains("filter__options__item") &&
        !target.classList.contains("address-table__btns__toogle__btn")
      ) {
        optionsClose();
      } else if (
        target.classList.contains("address-table__btns__toogle__btn")
      ) {
        const targetParentChildren = Array.from(target.parentNode.children);
        targetParentChildren.forEach((el) => {
          el.classList.remove("active");
        });
        target.classList.add("active");
      }
    });
  } catch (error) {}

  const menu = document.querySelector(".menu");

  try {
    menu.addEventListener("click", ({ target }) => {
      document.querySelectorAll(".menu__item").forEach((el) => {
        if (el.classList.contains("active")) {
          el.classList.remove("active");
        }
      });
      if (target.classList.contains("menu__item"))
        target.classList.add("active");
    });
  } catch (error) {
    console.warn(error);
  }

  const slideUp = (target, duration = 500) => {
    if (!target.nextElementSibling.classList.contains("_slide")) {
      target.classList.remove("active");
      target.nextElementSibling.classList.add("_slide");
      target.nextElementSibling.style.transitionProperty =
        "height, margin, padding";
      target.nextElementSibling.style.transitionDuration = duration + "ms";
      target.nextElementSibling.style.height =
        target.nextElementSibling.offsetHeight + "px";
      // eslint-disable-next-line no-unused-expressions
      target.nextElementSibling.offsetHeight;
      target.nextElementSibling.style.overflow = "hidden";
      target.nextElementSibling.style.height = 0;
      target.nextElementSibling.style.paddingTop = 0;
      target.nextElementSibling.style.paddingBottom = 0;
      target.nextElementSibling.style.marginTop = 0;
      target.nextElementSibling.style.marginBottom = 0;
      window.setTimeout(() => {
        target.nextElementSibling.hidden = true;
        target.nextElementSibling.style.removeProperty("height");
        target.nextElementSibling.style.removeProperty("padding-top");
        target.nextElementSibling.style.removeProperty("padding-bottom");
        target.nextElementSibling.style.removeProperty("margin-top");
        target.nextElementSibling.style.removeProperty("margin-bottom");
        target.nextElementSibling.style.removeProperty("overflow");
        target.nextElementSibling.style.removeProperty("transition-duration");
        target.nextElementSibling.style.removeProperty("transition-property");
        target.nextElementSibling.classList.remove("_slide");
      }, duration);
    }
  };
  const slideDown = (target, duration = 500) => {
    if (!target.nextElementSibling.classList.contains("_slide")) {
      target.classList.add("active");
      target.nextElementSibling.classList.add("_slide");
      if (target.nextElementSibling.hidden) {
        target.nextElementSibling.hidden = false;
      }
      const height = target.nextElementSibling.offsetHeight;
      target.nextElementSibling.style.overflow = "hidden";
      target.nextElementSibling.style.height = 0;
      target.nextElementSibling.style.paddingTop = 0;
      target.nextElementSibling.style.paddingBottom = 0;
      target.nextElementSibling.style.marginTop = 0;
      target.nextElementSibling.style.marginBottom = 0;
      target.nextElementSibling.offsetHeight;
      target.nextElementSibling.style.transitionProperty =
        "height, margin, padding";
      target.nextElementSibling.style.transitionDuration = duration + "ms";
      target.nextElementSibling.style.height = height + "px";
      // ie fix
      target.nextElementSibling.style.removeProperty("padding-top");
      target.nextElementSibling.style.removeProperty("padding-bottom");
      target.nextElementSibling.style.removeProperty("margin-top");
      target.nextElementSibling.style.removeProperty("margin-bottom");
      window.setTimeout(() => {
        target.nextElementSibling.style.removeProperty("height");
        target.nextElementSibling.style.removeProperty("overflow");
        target.nextElementSibling.style.removeProperty("transition-duration");
        target.nextElementSibling.style.removeProperty("transition-property");
        target.nextElementSibling.classList.remove("_slide");
      }, duration);
    }
  };
  const slideToggle = (target, duration = 500) => {
    if (target.nextElementSibling.hidden) {
      return slideDown(target, duration);
    } else {
      return slideUp(target, duration);
    }
  };
});
