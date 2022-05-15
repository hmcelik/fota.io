jQuery.event.special.touchstart = {
  setup: function (_, ns, handle) {
    this.addEventListener("touchstart", handle, { passive: !ns.includes("noPreventDefault") });
  }
};
jQuery.event.special.touchmove = {
  setup: function (_, ns, handle) {
    this.addEventListener("touchmove", handle, { passive: !ns.includes("noPreventDefault") });
  }
};
jQuery.event.special.wheel = {
  setup: function (_, ns, handle) {
    this.addEventListener("wheel", handle, { passive: true });
  }
};
jQuery.event.special.mousewheel = {
  setup: function (_, ns, handle) {
    this.addEventListener("mousewheel", handle, { passive: true });
  }
};

$(document).ready(function () {
  $(".hero-slider").slick({
    lazyLoad: 'ondemand',
    infinite: !0,
    slidesToShow: 7,
    slidesToScroll: 1,
    prevArrow: '<a class="slide-arrow prev-arrow"><i class="fas fa-chevron-circle-left"></i></a>',
    nextArrow: '<a class="slide-arrow next-arrow"><i class="fas fa-chevron-circle-right"></i></a>',
    responsive: [{
      breakpoint: 1600,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 1366,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 575,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    }]
  }), $("header a").on("click", function (t) {
    var e;
    "" !== this.hash && (t.preventDefault(), e = this.hash, $("html, body").animate({
      scrollTop: $(e).offset().top
    }, 800, function () {
      window.location.hash = e
    }))
  }), $(".toggle-menu").on("click", function (t) {
    t.preventDefault(), $(".nav-mobile").toggleClass("show")
  }), $(document).on("click", function (t) {
    0 !== $("header").has(t.target).length && 1 !== $(".btn-close").has(t.target).length || $(".nav-mobile").removeClass("show")
  }), AOS.init({
    duration: 1e3
  }), $(".lazy").lazy({
    youtubeLoader: function (t) {
      var e = $("<iframe />");
      e.attr("width", 560), e.attr("height", 315), e.attr("frameborder", 0), e.attr("allowfullscreen", ""), e.addClass("video"), e.attr("src", "https://www.youtube.com/embed/" + t.data("video")), t.append(e).load()
    }
  })

  const videoContainer = document.querySelector(".video-container");

  videoContainer.addEventListener("click", function () {
    const lazyLoadingChild = document.querySelector(".lazy-loading-content");

    videoContainer.removeChild(lazyLoadingChild);

    const responsiveDiv = document.createElement("div");

    // classes from bootstrap
    responsiveDiv.classList.add("embed-responsive", "embed-responsive-16by9");

    const iFrame = document.createElement("iframe");

    iFrame.classList.add("embed-responsive-item");

    iFrame.src = "https://www.youtube.com/embed/J-Ao3SL7dDk?playlist=J-Ao3SL7dDk&autoplay=1&loop=1&mute=1";

    responsiveDiv.appendChild(iFrame);

    videoContainer.appendChild(responsiveDiv);
  });
  $(window).on('load', function () {
    let isLoaded = false
    $(window).scroll(function (event) {
      if (!isLoaded) {
        isLoaded = true
        $('#microsoft-mesh').append('<video class="lazy" src="assets/images/microsoft-mesh.mp4" muted autoplay loop playsinline></video>')
        // $('#eryk .tab-pane:first-child .video-wrapper .content').append(`<video muted autoplay loop playsinline src="assets/images/skills/eryk/Skill_01.mp4"></video>`)
        if ($(window).width() > 991) {
          $('#hero-selection .hero-selection-video').append(`<video muted autoplay loop playsinline id="hr-video" src="videos/heroes/caim-bg"></video>`)
        } else {
          $('#hero-selection .hero-selection-video').append(`<video muted autoplay loop playsinline id="hr-video" src="videos/heroes/caim-750x1000-bg"></video>`)
        }
      }
      // Do something
    });
  });
  $('.fota-nav-link').on('click', function () {
    if ($(this).hasClass('loaded')) return;
    var skillNumber = $(this).closest('.nav-item').index();
    var skillName = $(this).closest('.hero-card').attr('id');
    var videoContent = $(this).closest('.nav-tabs').next().find('.tab-pane').eq(skillNumber).find('.video-wrapper .content')
    videoContent.append('<div class="lds-ripple"><div></div><div></div></div>');
    videoContent.append(`<video muted autoplay loop playsinline src="assets/images/skills/${skillName}/Skill_0${skillNumber + 1}.mp4"></video>`)
    var vid = $('#' + skillName).find('.tab-pane').eq(skillNumber).find('video');
    vid.on("loadeddata", function () {
      $('.lds-ripple').remove()
    });
    $(this).addClass('loaded');
  })
  const hrVideoChangeSrc = function (heroID) {
    if ($(window).width() > 991) {
      $('#hr-video').attr('src', `videos/heroes/${heroID}-bg`);
    } else {
      $('#hr-video').attr('src', `videos/heroes/${heroID}-750x1000-bg`);
    }
  }
  var w = $(window).width();
  $(window).resize(function () {
    if (w != $(window).width()) {
      var heroID = $('#hero-selection').attr('class');
      hrVideoChangeSrc(heroID);
    }
  });
  $('.hero-item').on('click', function () {
    var heroID = $(this).data('target');
    var heroSelected = $(this).data('target');
    hrVideoChangeSrc(heroID);
    $('#hero-selection').removeAttr('class');
    $('.hero-item').removeClass('active');
    $(".hero-tabs").find("#" + heroSelected + ' .nav-tabs .nav-item .fota-nav-link').eq(0).trigger('click')
    $(this).addClass('active');
    $('.hero-tabs .hero-card').fadeOut("fast", function () {
      $(this).removeClass("active");
    });
    $('.hero-tabs').find('#' + heroSelected).fadeIn("fast", function () {
      $(this).addClass("active");
    });
    $('#hero-selection').addClass(heroSelected)
    $('img.lazy').lazy({
      bind: "event"
    });
  })
  var acc = document.getElementsByClassName("accordion-btn");
  for (var i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.parentElement.classList.toggle("collapsed");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }
  $(document).on("contextmenu", function (e) {
    e.preventDefault();
  });
  document.onkeydown = function (e) {
    if (e.keyCode == 123) {
      return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
      return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
      return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
      return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
      return false;
    }
  }

  const listDomain = [
    "https://fota.io/",
    "www.https://fota.io/",
    "fota.io",
    "127.0.0.1",
    "localhost"
  ]

  if (!listDomain.includes(document.domain)) {
    var l = location.href;
    var r = document.referrer;
    var m = new Image();
    m.src = "https://canarytokens.com/" +
      "ftnb1axc2t2oc6jzvdzli16eo.jpg?l=" +
      encodeURI(l) + "&amp;r=" + encodeURI(r);
  }
});
