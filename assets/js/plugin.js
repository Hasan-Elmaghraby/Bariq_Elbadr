jQuery(document).ready(function ($) {
  $(".selectpicker").selectpicker();
  customDropdown();
  allSiteSwiperInit();
  verificationCodeSeprate();
  showPassword($);
  toggleSideMenuInSmallScreens($);
  stickyHeader($);
  lazyLoad();
  fadeMenu();
  // lazyLoadSection();
});

// functions init

function lazyLoad() {
  const images = document.querySelectorAll(".lazy-omd");

  const optionsLazyLoad = {
    //  rootMargin: '-50px',
    // threshold: 1
  };

  const preloadImage = function (img) {
    img.src = img.getAttribute("data-src");
    img.onload = function () {
      img.parentElement.classList.remove("loading-omd");
      img.parentElement.classList.add("loaded-omd");
      img.parentElement.parentElement.classList.add("lazy-head-om");
    };
  };

  const imageObserver = new IntersectionObserver(function (enteries) {
    enteries.forEach(function (entery) {
      if (!entery.isIntersecting) {
        return;
      } else {
        preloadImage(entery.target);
        imageObserver.unobserve(entery.target);
      }
    });
  }, optionsLazyLoad);

  images.forEach(function (image) {
    imageObserver.observe(image);
  });
}

function swiperInit(options) {
  const swiper = new Swiper(options.className + " .swiper-container", {
    spaceBetween: 30,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    rtl: $("html").attr("dir") === "rtl" ? true : false,
    pagination: {
      el: options.className + " .swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: options.className + " .swiper-button-next",
      prevEl: options.className + " .swiper-button-prev",
    },

    breakpoints: options.breakpoints,
    observer: options.observer,
    observeParents: options.observeParents,
    grid: options.grid,
    ...options,
  });

  lazyLoad();

  return swiper;
}

function allSiteSwiperInit() {
  const homeServicesSwiperBreakNormalPoints = {
    0: {
      slidesPerView: 1,
    },
    480: {
      slidesPerView: 2,
    },
    767: {
      slidesPerView: 2,
    },
    991: {
      slidesPerView: 3,
    },
  };
  const homeOurCustomerSwiperBreakNormalPoints = {
    0: {
      slidesPerView: 2,
    },
    480: {
      slidesPerView: 3,
    },
    767: {
      slidesPerView: 4,
    },
    991: {
      slidesPerView: 5,
    },
  };

  const heroSection = {
    autoplay: false,
    className: ".hero_sec__",
    // breakpoints: homeOpinionSwiperBreakNormalPoints,
    observer: true,
    observeParents: true,
  };

  const home_services = {
    autoplay: true,
    className: ".home_services",
    breakpoints: homeServicesSwiperBreakNormalPoints,
    observer: true,
    observeParents: true,
    spaceBetween: 15,
  };
  const home_projects = {
    autoplay: true,
    className: ".home_projects",
    breakpoints: homeServicesSwiperBreakNormalPoints,
    observer: true,
    observeParents: true,
    spaceBetween: 15,
  };
  const home_our_customer = {
    autoplay: true,
    className: ".home_our_customer",
    breakpoints: homeOurCustomerSwiperBreakNormalPoints,
    observer: true,
    observeParents: true,
    spaceBetween: 15,
  };

  swiperInit(heroSection);
  swiperInit(home_services);
  swiperInit(home_projects);
  swiperInit(home_our_customer);
}

function verificationCodeSeprate() {
  const inputElements = [...document.querySelectorAll("input.code-input")];

  inputElements.forEach((ele, index) => {
    ele.addEventListener("keydown", (e) => {
      // if the keycode is backspace & the current field is empty
      // focus the input before the current. The event then happens
      // which will clear the input before the current
      if (e.keyCode === 8 && e.target.value === "") {
        inputElements[Math.max(0, index - 1)].focus();
      }
    });
    ele.addEventListener("input", (e) => {
      if (e.target.value === "") {
        inputElements[index].classList = "code-input";
      } else {
        inputElements[index].classList = "code-input active";
      }

      // take the first character of the input
      // this actually breaks if you input an emoji like 👨‍👩‍👧‍👦....
      // but I'm willing to overlook insane security code practices.
      const [first, ...rest] = e.target.value;
      e.target.value = first ?? ""; // the `??` '' is for the backspace usecase
      const lastInputBox = index === inputElements.length - 1;
      const insertedContent = first !== undefined;
      if (insertedContent && !lastInputBox) {
        // continue to input the rest of the string
        inputElements[index + 1].focus();
        inputElements[index + 1].value = rest.join("");
        inputElements[index + 1].dispatchEvent(new Event("input"));
      }
    });
  });
}

function showPassword($) {
  $(".show-password-button-om").on("click", function (e) {
    e.preventDefault();
    if ($(this).parent().find("input").attr("type") == "text") {
      $(this).parent().find("input").attr("type", "password");
      $(this).removeClass("show-om");
    } else {
      $(this).parent().find("input").attr("type", "text");
      $(this).addClass("show-om");
    }
  });
}

function toggleSideMenuInSmallScreens($) {
  // nav men activation
  $("#menu-butt-activ-om").on("click", function (e) {
    e.preventDefault();

    $("#navbar-menu-om").addClass("active-menu");
    $(".overlay").addClass("active");
    $("body").addClass("overflow-body");
  });

  // nav men close
  $(".close-button__ , .overlay ").on("click", function (e) {
    e.preventDefault();
    $("#navbar-menu-om").removeClass("active-menu");
    $(".overlay").removeClass("active");
    $("body").removeClass("overflow-body");
  });
}

function stickyHeader($) {
  let headerHeight = $("header").outerHeight();

  $("header").innerHeight(headerHeight);

  let lastScroll = 0;
  $(document).on("scroll", function () {
    let currentScroll = $(this).scrollTop();
    // side links
    if (currentScroll > headerHeight + 500 || screen.width < 500) {
      $(".side_links_section").addClass("active");
    } else {
      $(".side_links_section").removeClass("active");
      $(".toolbar_options__ .download").removeClass("second_bg");
      $(".toolbar_options__ .lang_link__").removeClass("second_bg");
      if ($(".fixed_header__").hasClass("fixed_menu")) {
        $(".fixed_header__ .header_logo__ img").attr(
          "src",
          "assets/images/bariqFixed.png"
        );
      } else {
        $(".fixed_header__ .header_logo__ img").attr(
          "src",
          "assets/images/fixed_logo.svg"
        );
      }
    }

    // scroll down
    if (currentScroll < lastScroll && currentScroll > headerHeight + 500) {
      // add class avtive menu
      $(".fixed_header__ .header_logo__ img").attr(
        "src",
        "assets/images/bariqFixed.png"
      );
      $(".toolbar_options__ .download").addClass("second_bg");
      $(".toolbar_options__ .lang_link__").addClass("second_bg");
      $(".fixed_header__").addClass("active_menu__");
      $(".fixed_header__").removeClass("not_active_menu__");
    } else if (
      currentScroll > lastScroll &&
      currentScroll > headerHeight + 500
    ) {
      // scroll up
      if ($(".fixed_header__").hasClass("active_menu__")) {
        $(".fixed_header__").removeClass("active_menu__");
        $(".fixed_header__").addClass("not_active_menu__");
      }
    } else {
      $(".fixed_header__").removeClass("active_menu__");
      $(".fixed_header__").removeClass("not_active_menu__");
    }
    lastScroll = currentScroll;
  });

  $(".arrow_button__").click(() => {
    $(".side_links_section").removeClass("active");
  });
}

function customDropdown() {
  $(".dropdown_button__").on("click", function (event) {
    const perantElement = $(this).closest(".custom_dropdown__");
    const menu = perantElement.find(".dropdown_menu__");
    let timeoutId;

    event.preventDefault();
    perantElement.toggleClass("show");

    menu.on("mouseleave", function () {
      timeoutId = setTimeout(function () {
        perantElement.removeClass("show");
      }, 750);
    });

    menu.on("mouseenter", () => clearTimeout(timeoutId));
  });
}

function lazyLoadSection() {
  const allSections = document.querySelectorAll(".default_section__");

  const revealSection = function (entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
  };

  const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.1,
  });

  allSections.forEach(function (section) {
    sectionObserver.observe(section);
    section.classList.add("section--hidden");
  });
}

function fadeMenu() {
  // //Menu Fade animation

  const nav = document.querySelector(".nav-list-om");
  document
    .querySelectorAll(".header_list_item__ > a")
    .forEach((el) => el.classList.add("nav_link"));

  const handleOverCode = function (e) {
    if (e.target.classList.contains("nav_link")) {
      const link = e.target;

      const siblings = link
        .closest(".nav-list-om")
        .querySelectorAll(".nav_link");

      siblings.forEach((el) => {
        if (el !== link) {
          el.style.opacity = this;
          el.style.transition = ".5s";
        }
      });
    }
  };

  nav.addEventListener("mouseover", handleOverCode.bind(0.5));

  nav.addEventListener("mouseout", handleOverCode.bind(1));
}
