/**
* Template Name: Nova
* Template URL: https://bootstrapmade.com/nova-bootstrap-business-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

})();

function toggleValues(header) {
  const list = header.nextElementSibling;
  const isActive = header.classList.contains('active');

  // Đóng tất cả các mục khác
  document.querySelectorAll('.values-header').forEach(h => {
    h.classList.remove('active');
    h.nextElementSibling.style.display = 'none';
  });

  // Mở lại nếu chưa active
  if (!isActive) {
    header.classList.add('active');
    list.style.display = 'block';
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const phoneSection = document.querySelector(".iphone-pro");
  const titleOutside = document.querySelector("#approach-title");
  const titleInside = document.querySelector(".approach-title-inside");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Khi iPhone full trong viewport
          titleOutside.classList.add("hide");
          titleInside.classList.add("show");
        } else {
          // Khi scroll ngược lên
          titleOutside.classList.remove("hide");
          titleInside.classList.remove("show");
        }
      });
    },
    { threshold: 0.7 } // hiển thị khi 70% iPhone xuất hiện
  );

  observer.observe(phoneSection);
});




document.addEventListener("DOMContentLoaded", function () {
  const aiWave = document.getElementById('aiWave');
  const aiChat = document.getElementById('aiChat');
  const sendBtn = document.getElementById('sendBtn');
  const userInput = document.getElementById('userInput');
  const aiMessages = document.getElementById('aiMessages');
  const micBtn = document.getElementById('micBtn');

  // ==== 1️⃣ Toggle Chat ====
  aiWave?.addEventListener('click', e => {
    e.stopPropagation();
    aiChat.style.display = aiChat.style.display === 'flex' ? 'none' : 'flex';
  });
  document.addEventListener('click', e => {
    if (!aiChat.contains(e.target) && !aiWave.contains(e.target)) {
      aiChat.style.display = 'none';
    }
  });

  // ==== 2️⃣ TTS Function ====
  function speakText(text, lang = 'en-US') {
    if (!('speechSynthesis' in window)) {
      console.warn("SpeechSynthesis not supported");
      return;
    }
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang;
    utter.rate = 1.05;    // tốc độ đọc (0.5–2)
    utter.pitch = 1.75;   // cao độ (0–2)
    utter.volume = 0.75;  // âm lượng (0–1)
    speechSynthesis.cancel(); // ngắt giọng cũ
    speechSynthesis.speak(utter);
  }

  window.speechSynthesis.onvoiceschanged = () => {
  window.speechSynthesis.getVoices();
};
    const voices = window.speechSynthesis.getVoices();
  if (voices.length) utter.voice = voices.find(v => v.lang.includes(lang)) || voices[0];

  // ✅ đợi 1 chút trước khi đọc để không bị cắt chữ đầu
  setTimeout(() => {
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }, 200);

  // ==== 3️⃣ Send Message ====
  function sendMessage() {
    const msg = userInput.value.trim();
    if (!msg) return;
    const userMsg = document.createElement('div');
    userMsg.className = 'ai-msg user';
    userMsg.textContent = msg;
    aiMessages.appendChild(userMsg);
    userInput.value = '';

    setTimeout(() => {
      const botMsg = document.createElement('div');
      botMsg.className = 'ai-msg bot';
      const reply = getBotReply(msg);
      botMsg.textContent = reply;
      aiMessages.appendChild(botMsg);
      aiMessages.scrollTop = aiMessages.scrollHeight;
      speakText(reply); // 🗣️ nói câu trả lời
    }, 500);
  }

  function getBotReply(input) {
    input = input.toLowerCase();
    if (input.includes('hello') || input.includes('hi')) return "Hi there! I'm TrueVoice AI. Nice to meet you.";
    if (input.includes('service')) return "We offer AI-powered research and call center solutions.";
    if (input.includes('contact') || input.includes('connect')) return "You can contact us directly through this form or via email.";
    if (input.includes('thank')) return "You're very welcome! Always here to help.";
    if (input.includes("who are you") || input.includes("what is truevoice") || input.includes("company") || input.includes("what do the company do")) 
    return "We are TrueVoice Research — a data intelligence and voice analytics company that helps organizations turn conversations into insights.";
  if (input.includes("service") || input.includes("offer"))
    return "We provide Voice Analytics, Market Research, and specialized Call Center solutions for healthcare and insurance industries.";
  if (input.includes("market research"))
    return "We design and conduct AI-enhanced market research to help clients understand their customers and make data-driven decisions.";
  if (input.includes("why choose") || input.includes("advantage"))
    return "Because TrueVoice combines technology, human expertise, and data analytics to deliver meaningful insights and better customer experiences.";
  if (input.includes("ai") || input.includes("technology"))
    return "Our AI listens, transcribes, and analyzes conversations to detect emotion, intent, and key insights across every call.";
  if (input.includes("how are you")) return "I’m doing great! Thanks for asking. How about you?";
  if (input.includes("bye")) return "Goodbye! Have a great day from TrueVoice Research.";
  if (input.includes("approach") || input.includes("how do you work") || input.includes("method"))
      return "We follow a simple yet powerful approach: Listen – Analyze – Deliver. We capture real voices, analyze patterns, and turn them into strategic actions.";
   if (input.includes("value") || input.includes("core") || input.includes("principle"))
    return "Our core values are Integrity, Transparency, Agility, Human-Centered Progress, Quality Care, and Innovation.";

    return "That's interesting. You can contact us directly through this form or via email. I'll make sure our team knows about your thoughts.";
  }

  sendBtn?.addEventListener('click', sendMessage);
  userInput?.addEventListener('keypress', e => { if (e.key === 'Enter') sendMessage(); });

  // ==== 4️⃣ Voice Recognition ====
  let recognition;
  let recognizing = false;

  if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US'; // hoặc 'vi-VN' nếu bạn nói tiếng Việt

    recognition.onstart = () => {
      recognizing = true;
      micBtn.classList.add('active');
      console.log("🎤 Listening...");
    };
    recognition.onresult = (event) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i)
        transcript += event.results[i][0].transcript;
      userInput.value = transcript;
    };
    recognition.onerror = (e) => console.error("Speech error:", e.error);
    recognition.onend = () => {
      recognizing = false;
      micBtn.classList.remove('active');
      console.log("🛑 Mic stopped");
      if (userInput.value.trim()) sendMessage();
    };

    micBtn.addEventListener('click', () => {
      if (!recognition) return;
      if (recognizing) recognition.stop();
      else recognition.start();
    });
  } else {
    micBtn.style.display = "none";
  }
});

