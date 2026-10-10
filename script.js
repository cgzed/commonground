/* =========================================================
   COMMONGROUND BEHAVIOUR
   Mobile nav · home carousel · video strip
   photo galleries · clients slider · logo wall
   ========================================================= */

(function () {
  /* --- mobile nav --- */
  var btn = document.querySelector(".menu-btn");
  var nav = document.querySelector(".nav");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      nav.classList.toggle("is-open");
    });
  }

  /* --- home header carousel (3s, ken-burns class handled in CSS) --- */
  var slides = Array.prototype.slice.call(document.querySelectorAll(".carousel .slide"));
  if (slides.length) {
    var i = 0;
    var count = document.getElementById("slide-count");
    function show(n) {
      var next = (n + slides.length) % slides.length;
      slides.forEach(function (s) { s.classList.remove("is-on", "is-leaving"); });
      slides[i].classList.add("is-leaving");
      slides[next].classList.add("is-on");
      i = next;
      if (count) count.textContent = (i + 1) + " / " + slides.length;
    }
    function step(dir) { show(i + dir); restart(); }
    var prev = document.getElementById("prev-slide");
    var next = document.getElementById("next-slide");
    if (prev) prev.addEventListener("click", function () { step(-1); });
    if (next) next.addEventListener("click", function () { step(1); });
    var timer;
    function restart() {
      clearInterval(timer);
      timer = setInterval(function () { show(i + 1); }, 3000);
    }
    restart();
    var root = document.querySelector(".carousel");
    if (root) {
      root.addEventListener("mouseenter", function () { clearInterval(timer); });
      root.addEventListener("mouseleave", restart);
    }
  }

  /* --- video page accordion strip
     EXTEND: copy a .work-tile. Set data-id (Vimeo), data-title, data-desc,
     and a background-image thumbnail. Featured title + sentence follow the click.
  --- */
  var tiles = document.querySelectorAll(".work-tile");
  var stage = document.getElementById("work-player");
  var featTitle = document.getElementById("featured-title");
  var featNote = document.getElementById("featured-note");
  tiles.forEach(function (tile) {
    tile.addEventListener("click", function () {
      tiles.forEach(function (t) { t.classList.remove("is-on"); });
      tile.classList.add("is-on");
      var id = tile.getAttribute("data-id");
      var title = tile.getAttribute("data-title") || tile.getAttribute("aria-label") || "";
      var copy = tile.getAttribute("data-desc") || "";
      if (stage && id) {
        stage.innerHTML = '<iframe src="https://player.vimeo.com/video/' + id + '?title=0&byline=0&portrait=0&color=7a765a&autoplay=1" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="' + title.replace(/"/g, "") + '"></iframe>';
      }
      if (featTitle) featTitle.textContent = title;
      if (featNote) featNote.textContent = copy;
    });
  });

  /* --- photography galleries --- */
  /* EDIT THESE FOLDER PATHS to match your website. Case must match exactly. */
  var galleryFolders = {
    editorial: "images/photography/editorial/",
    events: "images/photography/events/",
    humanitarian: "images/photography/humanitarian/",
    portraiture: "images/photography/portraits/"
  };
  /* Add/remove filenames here. Preserve spelling, capitals and extension. */
  var galleryFiles = {
    "editorial": [
        "01_20160315CZED1561.jpg",
        "02_20160315CZED1643.jpg",
        "03_20160315CZED1686.jpg",
        "04_20160316CZED1760.jpg",
        "05_CZED2495.jpg",
        "06_20160311_24_CZED1481.jpg",
        "07_20160617-CZED3890.jpg",
        "08_20160617-CZED4148.jpg",
        "09_20160617-CZED4207.jpg",
        "10_20160617-CZED4250-1.jpg",
        "11_20160818-CZED6340.jpg",
        "12_20160818-CZED6349.jpg",
        "13_SoundDesigHub.jpg",
        "14_20160617-CZED4291-2.jpg",
        "15_20160708-CZED5033.jpg",
        "16_20160708-CZED5102.jpg",
        "17_20160708-CZED5182.jpg",
        "18_20160811-CZED6214.jpg",
        "19_20160811-CZED6115.jpg",
        "20_20160920-CZED7491.jpg",
        "21_CZED7552.jpg",
        "22_20161005-CZED8071.jpg",
        "23_CZED0327.jpg",
        "24_CZED1963.jpg",
        "25_CZED2029.jpg",
        "26_CZED2061.jpg",
        "27_CZED7697.jpg",
        "28_DSCF7307-web.jpg",
        "29_Sarah-Rose-5-print.jpg",
        "30_CZED0703.jpg",
        "31_elouera.jpg",
        "32_elouera.jpg",
		"33_MYOB-Madebox_099.jpg",
		"34_MYOB-Madebox_105.jpg",
		"35_MYOB-Madebox_153.jpg",
		"36_MYOB-Madebox_137.jpg",
		"38_MYOB-Madebox_139.jpg"
    ],
    "events": [
        "01_CGZ4724_jpg.jpg",
        "02_CGZ4758.jpg",
        "02_CGZ8766_u0oogm.jpg",
        "03_CGZ1447_jpg.jpg",
        "04_Shakespeare-CZED_vqk0im.jpg",
        "05_CGZ1466_jpg.jpg",
        "05_CGZ9359.jpg",
        "06_CGZ9414_KevinRudd_jpg.jpg",
        "07_20160115_DSCF4009.jpg",
        "10_CGZ3570_w5fhde.jpg",
        "11_CGZ0113_q1jy76.jpg",
        "12_DSF0940-2.jpg",
        "12-DSCF9091.jpg",
        "13_DSF9938.jpg",
        "15_Shakespeare-CZED_fnah2u.jpg",
        "18_62599-9163215-11062164_ADDC_jpg.jpg",
        "19_150822_CGZ4509.jpg",
        "19_Shakespeare-CZED_dz7yw7.jpg",
        "20_150828_CGZ5137.jpg",
        "22_20160714-CZED5810.jpg",
        "23_20170317-CZED8665-2.jpg",
        "24_20170402-CZED8901.jpg",
        "24_Shakespeare-CZED_aq6b3j.jpg",
        "25_20170617-CZED1517.jpg",
        "26_DSCF7880.jpg",
        "27_CGZ4147.jpg",
        "28_CZED9196.jpg",
        "29_DSF0860.jpg",
        "30_DSF0886.jpg",
        "31_DSF0973.jpg",
		"32_MYOB-Madebox_027.jpg"
    ],
    "humanitarian": [
        "01_CGZ0041.jpg",
        "02_CGZ0263.jpg",
        "03_CGZ0652.jpg",
        "04_CGZ1245.jpg",
        "05_CGZ1601.jpg",
        "06_CGZ9424.jpg",
        "07_CGZ9843.jpg",
        "08_CGZ9662.jpg",
        "09_CGZ9436.jpg",
        "10_CGZ1554.jpg",
        "11_CGZ1193.jpg",
        "12_CGZ1354.jpg",
        "13_CGZ1504.jpg",
        "14_CGZ2265.jpg",
        "15_CGZ4356.jpg",
        "16_DSC1888.jpg",
        "17_CGZ8133.jpg",
        "18_0041.jpg",
        "19_CGZ2883.jpg",
        "20_CGZ0063.jpg",
        "21_CGZ4379.jpg",
        "22_DSC3897.jpg",
        "23_DSC2045.jpg",
        "24_CGZ2530.jpg",
        "25_CGZ7746.jpg",
        "26_CGZ9041.jpg",
        "27_3687524.jpg",
        "28_3687528.jpg",
        "29_3687618.jpg",
        "30_3687910.jpg",
        "31_3687989.jpg",
        "32_3687993.jpg",
        "33_CGZ9642.jpg",
        "34_3687995.jpg",
        "35_3688018.jpg",
        "36_3688025.jpg",
        "37_3688027.jpg",
        "38_3688039.jpg",
        "39_3688040.jpg",
        "40_3688046.jpg",
        "41_3688047.jpg",
        "41_3688105.jpg",
        "42_CGZ5504.jpg",
        "43_3688110.jpg",
        "44_3688111.jpg",
        "45_3688123.jpg",
        "46_CGZ0563.jpg",
        "47_3688108.jpg",
        "48_CGZ0461.jpg",
        "49_3687646.jpg",
        "50_CGZ2475.jpg",
        "51_3687801.jpg",
        "52_3687905.jpg",
        "53_3687914.jpg",
        "54_3687913.jpg",
        "55_3687916.jpg",
		"56_DSCF0324.jpg",
		"57_DSCF9589.jpg"
    ],
    "portraiture": [
        "01_CZED1299.jpg",
        "02_DSCF1198.jpg",
        "02_DSF4737.jpg",
        "03_DSF4779.jpg",
        "04_CZED9335.jpg",
        "05_CZED9721-2.jpg",
        "06_CZED9383.jpg",
        "07_CZED9637.jpg",
        "08_CGZ8277-2edit.jpg",
        "09_CGZ1360.jpg",
        "10_CZED1344.jpg",
        "11_DSF1665-Edit.jpg",
        "12_DSCF6312-2.jpg",
        "13_DSCF6206.jpg",
        "14_CZED0947-Edit-3.jpg",
        "15_CZED7633.jpg",
        "16_DSCF2516-Edit.jpg",
        "18_DSCF2818-WEB.jpg",
        "19_DSCF7380.jpg",
        "20_Faran1.jpg",
		"21_MYOB-Madebox_062.jpg",
		"22_DSCF9714.jpg"
    ]
};
  var galleries = {};
  Object.keys(galleryFiles).forEach(function(key) {
    galleries[key] = galleryFiles[key].map(function(file) { return galleryFolders[key] + file; });
  });
  /* CATEGORY LABELS: keep keys matched to galleries and HTML data-gallery values. */
  var titles = { portraiture: "Portraiture", humanitarian: "Humanitarian", editorial: "Editorial", events: "Events & media" };
  /* Photography: natural dimensions drive responsive masonry; no image cropping.
     EXTEND: add paths to galleries above. Dimensions are read from each image. */
  var galleryStage = document.getElementById('gallery-stage');
  if (galleryStage) {
    var grid = galleryStage.querySelector('.gallery-grid');
    var status = document.getElementById('gallery-status');
    var galleryButtons = Array.prototype.slice.call(document.querySelectorAll('[data-gallery]'));
    var viewer = document.getElementById('photo-lightbox');
    var fullImage = document.getElementById('lightbox-image');
    var viewerCount = document.getElementById('lightbox-count');
    var viewerTitle = document.getElementById('lightbox-title');
    var closeButton = document.getElementById('lightbox-close');
    var activeKey, selected = 0, loaded = [], opener, generation = 0;
    var savedOverflow, touchX, touchY;
    var revealObserver;
    var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    // Only enable invisible starting states when an observer is available.
    function revealGallery() {
      if (!('IntersectionObserver' in window) || motion.matches) return;
      revealObserver = new IntersectionObserver(function(entries) {
        var visible=entries.filter(function(e){return e.isIntersecting;});
        visible.sort(function(a,b){return a.target.offsetTop-b.target.offsetTop || a.target.offsetLeft-b.target.offsetLeft;});
        visible.forEach(function(entry,index) {
          entry.target.style.setProperty('--photo-delay',Math.min(index,6)*65+'ms');
          entry.target.classList.add('is-revealed');
          revealObserver.unobserve(entry.target);
        });
      }, {threshold:.08});
      loaded.forEach(function(item){item.button.classList.add('photo-reveal-ready');revealObserver.observe(item.button);});
    }
    function revealImmediately(){
      if (!motion.matches) return;
      if(revealObserver) revealObserver.disconnect();
      loaded.forEach(function(item){item.button.classList.add('is-revealed');});
    }
    if(motion.addEventListener) motion.addEventListener('change',revealImmediately);
    else if(motion.addListener) motion.addListener(revealImmediately);
    // Page-local CSS, so shared stylesheet edits are unnecessary.
    var galleryStyle=document.createElement('style');
    galleryStyle.textContent='.gallery-grid{display:block;position:relative}.gallery-grid .gallery-photo{position:absolute;margin:0}.gallery-photo.photo-reveal-ready{opacity:0;transform:translateY(16px) scale(.97);transition:opacity .55s ease,transform .65s ease;transition-delay:var(--photo-delay,0ms)}.gallery-photo.photo-reveal-ready.is-revealed{opacity:1;transform:none}@media(prefers-reduced-motion:reduce){.gallery-photo.photo-reveal-ready{opacity:1;transform:none;transition:none}}';
    document.head.appendChild(galleryStyle);
    // Balanced masonry: place each image into the shortest column(s).
    function layoutGallery() {
      var width = grid.clientWidth;
      if (!width) return;
      var columns = width < 520 ? 2 : width < 850 ? 3 : 4;
      if (width < 350) columns = 1;
      var gap = 16, cellWidth = (width - gap * (columns - 1)) / columns;
      var heights = Array(columns).fill(0);
      loaded.forEach(function(item) {
        var span = item.width / item.height >= 1.65 && columns >= 3 ? 2 : 1;
        var bestColumn = 0, top = Infinity;
        for (var c=0; c<=columns-span; c++) {
          var candidate = Math.max.apply(null, heights.slice(c,c+span));
          if (candidate < top) { top = candidate; bestColumn = c; }
        }
        var imageWidth = cellWidth * span + gap * (span - 1);
        var height = imageWidth * item.height / item.width;
        item.button.style.width = imageWidth + 'px';
        item.button.style.height = height + 'px';
        item.button.style.left = (bestColumn*(cellWidth+gap)) + 'px';
        item.button.style.top = top + 'px';
        for (var col=bestColumn; col<bestColumn+span; col++) heights[col] = top + height + gap;
      });
      grid.style.height = Math.max(0,Math.max.apply(null,heights)-gap) + 'px';
    }
    function showPhoto(index) {
      if (!loaded.length) return;
      selected = (index + loaded.length) % loaded.length;
      var item = loaded[selected];
      fullImage.src = item.src;
      fullImage.alt = item.alt;
      viewerTitle.textContent = titles[activeKey];
      viewerCount.textContent = (selected + 1) + ' / ' + loaded.length;
    }
    function openPhoto(item, button) {
      opener = button;
      showPhoto(loaded.indexOf(item));
      if (!viewer.open) {
        savedOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        viewer.showModal();
      }
      closeButton.focus();
    }
    function closePhoto() { viewer.close(); }
    closeButton.addEventListener('click', closePhoto);
    viewer.addEventListener('close', function () {
      document.body.style.overflow = savedOverflow || '';
      fullImage.removeAttribute('src');
      if (opener && opener.isConnected) opener.focus();
    });
    document.getElementById('lightbox-prev').addEventListener('click', function () { showPhoto(selected - 1); });
    document.getElementById('lightbox-next').addEventListener('click', function () { showPhoto(selected + 1); });
    viewer.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault(); showPhoto(selected + (e.key === 'ArrowRight' ? 1 : -1));
      }
    });
    viewer.addEventListener('click', function (e) { if (e.target === viewer) closePhoto(); });
    fullImage.addEventListener('touchstart', function (e) {
      touchX = e.changedTouches[0].clientX; touchY = e.changedTouches[0].clientY;
    }, { passive: true });
    fullImage.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - touchX;
      var dy = e.changedTouches[0].clientY - touchY;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) showPhoto(selected + (dx < 0 ? 1 : -1));
    }, { passive: true });
    fullImage.addEventListener('error', function () { fullImage.alt = 'This photograph could not be loaded.'; });
    function loadGallery(key, updateHash) {
      if (!galleries[key]) return;
      activeKey = key;
      var token = ++generation;
      if(revealObserver) revealObserver.disconnect();
      loaded = [];
      grid.replaceChildren();
      grid.style.height='0px';
      status.textContent = 'Loading ' + titles[key] + '…';
      grid.setAttribute('aria-busy', 'true');
      galleryButtons.forEach(function (button) { button.setAttribute('aria-pressed', String(button.getAttribute('data-gallery') === key)); });
      if (updateHash) history.replaceState(null, '', '#' + key);
      var failures = 0, complete = 0, list = galleries[key].slice();
      // Shuffle a copy once for this visit; source arrays stay unchanged.
      for(var n=list.length-1;n>0;n--){var j=Math.floor(Math.random()*(n+1));var swap=list[n];list[n]=list[j];list[j]=swap;}
      list.forEach(function (src, index) {
        var img = new Image();
        img.decoding = 'async';
        img.onload = function () {
          if (token !== generation) return;
          if (!img.naturalWidth || !img.naturalHeight) { failures++; finish(); return; }
          var button = document.createElement('button');
          button.type = 'button'; button.className = 'gallery-photo';
          var alt = titles[key] + ' photograph ' + (index + 1);
          button.setAttribute('aria-label', 'View ' + alt);
          img.alt = alt; img.width = img.naturalWidth; img.height = img.naturalHeight;
          var item = {src: src, alt: alt, width: img.naturalWidth, height: img.naturalHeight, button: button, order: index};
          button.appendChild(img);
          button.addEventListener('click', function () { openPhoto(item, button); });
          loaded.push(item); finish();
        };
        img.onerror = function () { if (token === generation) { failures++; finish(); } };
        img.src = src;
      });
      function finish() {
        complete++;
        status.textContent = titles[key] + ' · ' + loaded.length + ' photograph' + (loaded.length === 1 ? '' : 's') +
          (complete < list.length ? ' · Loading…' : failures ? ' · ' + failures + ' unavailable' : '');
        if (complete === list.length) {
          loaded.sort(function(a,b){return a.order-b.order;});
          loaded.forEach(function(item){grid.appendChild(item.button);});
          layoutGallery(); revealGallery();
          grid.setAttribute('aria-busy','false');
        }
      }
    }
    galleryButtons.forEach(function (button) {
      button.addEventListener('click', function () { loadGallery(button.getAttribute('data-gallery'), true); });
    });
    if (typeof ResizeObserver !== 'undefined') new ResizeObserver(layoutGallery).observe(grid);
    else window.addEventListener('resize', layoutGallery);
    function loadFromHash() { var key = location.hash.slice(1); loadGallery(galleries[key] ? key : 'humanitarian', false); }
    window.addEventListener('hashchange', loadFromHash);
    loadFromHash();
  }


  /* Brand: templates hold case-study content; add a card and template to extend. */
  var caseDialog = document.getElementById('brand-case-dialog');
  if (caseDialog) {
    var caseButtons = Array.prototype.slice.call(document.querySelectorAll('[data-case]'));
    var caseContent = document.getElementById('brand-case-content');
    var caseIndex = 0, caseOpener, caseOverflow;
    function renderCase(index) {
      caseIndex = (index + caseButtons.length) % caseButtons.length;
      var template = document.getElementById('case-' + caseButtons[caseIndex].getAttribute('data-case'));
      caseContent.replaceChildren(template.content.cloneNode(true));
      document.getElementById('brand-case-count').textContent = (caseIndex + 1) + ' / ' + caseButtons.length;
      caseDialog.scrollTop = 0;
    }
    caseButtons.forEach(function (button, index) {
      button.addEventListener('click', function () {
        caseOpener = button; renderCase(index);
        caseOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        caseDialog.showModal(); document.getElementById('brand-case-close').focus();
      });
    });
    document.getElementById('brand-case-close').addEventListener('click', function () { caseDialog.close(); });
    caseDialog.addEventListener('close', function () {
      document.body.style.overflow = caseOverflow || '';
      if (caseOpener) caseOpener.focus();
    });
    document.getElementById('brand-case-prev').addEventListener('click', function () { renderCase(caseIndex - 1); });
    document.getElementById('brand-case-next').addEventListener('click', function () { renderCase(caseIndex + 1); });
    caseDialog.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); renderCase(caseIndex + (e.key === 'ArrowRight' ? 1 : -1)); }
    });
    var moreWork = document.getElementById('brand-more');
    var extraWork = Array.prototype.slice.call(document.querySelectorAll('[data-extra-work]'));
    if (moreWork && extraWork.length) {
      extraWork.forEach(function (card) { card.hidden = true; });
      moreWork.hidden = false;
      moreWork.addEventListener('click', function () {
        var expanded = moreWork.getAttribute('aria-expanded') !== 'true';
        extraWork.forEach(function (card) { card.hidden = !expanded; });
        moreWork.setAttribute('aria-expanded', String(expanded));
        moreWork.textContent = expanded ? 'Show less work ↑' : 'Show more work ↓';
      });
    }
  }

  /* --- clients 4-up slider --- */
  var pack = document.getElementById("t-row");
  if (pack) {
    var cards = Array.prototype.slice.call(pack.querySelectorAll(".qcard"));
    var start = 0;
    function showPack() {
      cards.forEach(function (c, idx) {
        var on = idx >= start && idx < start + 4;
        c.style.display = on ? "" : "none";
      });
    }
    showPack();
    var tp = document.getElementById("t-prev");
    var tn = document.getElementById("t-next");
    if (tp) tp.addEventListener("click", function () {
      start = Math.max(0, start - 4);
      showPack();
    });
    if (tn) tn.addEventListener("click", function () {
      if (start + 4 < cards.length) start += 4;
      showPack();
    });
  }

  /* --- logo wall --- */
  var wall = document.getElementById("logo-wall");
  if (wall) {
    var logos = [
      { name: "Northern Health" }, { name: "West Metro HSP" }, { name: "Peter MacCallum" },
      { name: "Monash Health" }, { name: "Deakin University" }, { name: "Kids Hope" },
      { name: "Thankyou" }, { name: "YourGrocer" }, { name: "Interserve" },
      { name: "CBM Australia" }, { name: "Heartwood" }, { name: "IGA" },
      { name: "AIFC" }, { name: "StageMinded" }, { name: "Global Interaction" },
      { name: "Heartburst" }
    ];
    logos.forEach(function (logo) {
      var el = document.createElement("div");
      el.className = "logo-cell";
      if (logo.src) {
        var img = document.createElement("img");
        img.src = logo.src; img.alt = logo.name;
        el.appendChild(img);
      } else {
        el.innerHTML = "<span>" + logo.name + "</span>";
      }
      wall.appendChild(el);
    });
  }
})();
