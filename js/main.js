// Fixed accent color (blue) — also clears any stale hue saved by the old auto-cycling script
localStorage.removeItem('hue-color');
document.documentElement.style.setProperty('--hue-color', '230');

const navMenu = document.getElementById('nav-menu'),
  navToggle = document.getElementById('nav-toggle'),
  navClose = document.getElementById('nav-close')
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu')
  })
}
if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu')
  })
}

const navLink = document.querySelectorAll('.nav_link')
function linkAction() {
  const navMenu = document.getElementById('nav-menu')
  navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

const skillsContent = document.getElementsByClassName('skills_content'),
  skillsHeader = document.querySelectorAll('.skills_header')
function toggleSkills() {
  let itemClass = this.parentNode.className
  for (i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = 'skills_content skills_close'
  }
  if (itemClass === 'skills_content skills_close') {
    this.parentNode.className = 'skills_content skills_open'
  }
}
skillsHeader.forEach((el) => {
  el.addEventListener('click', toggleSkills)
})

const tabs = document.querySelectorAll('[data-target]'),
  tabContents = document.querySelectorAll('[data-content]')
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.target)
    tabContents.forEach(tabContent => {
      tabContent.classList.remove('qualification_active')
    })
    target.classList.add('qualification_active')
    tabs.forEach(tab => {
      tab.classList.remove('qualification_active')
    })
    tab.classList.add('qualification_active')
  })
})

const modalViews = document.querySelectorAll('.services_modal'),
  modalBtns = document.querySelectorAll('.services_button'),
  modalCloses = document.querySelectorAll('.services_modal-close')
let modal = function (modalClick) {
  modalViews[modalClick].classList.add('active-modal')
}
modalBtns.forEach((modalBtn, i) => {
  modalBtn.addEventListener('click', () => {
    modal(i)
  })
})
modalCloses.forEach((modalClose) => [
  modalClose.addEventListener('click', () => {
    modalViews.forEach((modalView) => {
      modalView.classList.remove('active-modal')
    })
  })
])

/*==================== PROJECTS DATA ====================*/
const projects = [
  {
    title: "Why Is My App Slow",
    description: "Diagnoses slow web interactions using real Web Vitals metrics, helping developers pinpoint frontend performance bottlenecks.",
    image: "./img/why-is-my-app-slow.jpg",
    tech: ["JavaScript", "Performance", "Web Vitals"],
    link: "https://why-is-my-app-slow.netlify.app",
    status: "live"
  },
  {
    title: "CP Dashboard",
    description: "Aggregates competitive programming stats from 5 platforms via APIs and scraping, in an Angular/Ionic UI with a Node.js backend.",
    image: "./img/cp-dashboard.jpg",
    tech: ["Angular", "TypeScript", "Node.js", "Ionic 5", "MongoDB", "HTML", "SCSS"],
    link: "https://cp-dashboard.netlify.app",
    status: "live"
  },
  {
    title: "WhatsApp Chat Analyser",
    description: "Parses exported WhatsApp chat logs and surfaces analytics like active users, message trends, and word frequency via Streamlit.",
    image: "./img/whatsapp-chat-analyser.jpg",
    tech: ["Python", "Pandas", "Numpy", "Streamlit", "Sklearn", "nltk"],
    link: "https://whatsappchatsanalyser.streamlit.app/",
    status: "live"
  },
  {
    title: "Movies Recommender",
    description: "Content-based movie recommender using a precomputed similarity matrix, fetching live posters from the TMDB API via Streamlit.",
    image: "./img/movie-recommender.jpg",
    tech: ["Python", "Pandas", "Scikit-learn", "Streamlit"],
    link: "https://movies-recommender-system.streamlit.app/",
    status: "live"
  },
  {
    title: "DevConnector",
    description: "Developer social network built with Angular and Ionic, shipping as both a responsive web app and a packaged native Android app.",
    image: "./img/dev-connector.jpg",
    tech: ["Angular", "TypeScript", "Node.js", "Ionic 5", "MongoDB", "HTML", "CSS"],
    link: "https://devconnectors.netlify.app",
    status: "live"
  },
]

/*==================== RENDER PROJECTS ====================*/
function escapeHtml(str) {
  const div = document.createElement('div')
  div.textContent = str
  return div.innerHTML
}

function renderProjects() {
  const wrapper = document.getElementById('portfolio-wrapper')
  if (!wrapper) return

  wrapper.innerHTML = projects.map(project => `
    <div class="portfolio_content swiper-slide">
      <div class="portfolio_card">
        <div class="portfolio_img-wrap">
          <span class="portfolio_status">${escapeHtml(project.status)}</span>
          <img src="${project.image}" alt="${escapeHtml(project.title)} project screenshot" class="portfolio_img">
        </div>
        <div class="portfolio_data">
          <h3 class="portfolio_title">${escapeHtml(project.title)}</h3>
          <p class="portfolio_description">${escapeHtml(project.description)}</p>
          <div class="tech_demo">
            <div class="tech_stack">
              ${project.tech.map(t => `<div class="chip">${escapeHtml(t)}</div>`).join('')}
            </div>
            <a href="${project.link}" class="portfolio_button" target="_blank" aria-label="View ${escapeHtml(project.title)} live">
              <i class="uil uil-arrow-up-right button_icon"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  `).join('')
}

// Render project cards before Swiper initializes, so it has slides to work with.
renderProjects()

let swiper = new Swiper('.portfolio_container', {
  loop: true,
  speed: 900,
  spaceBetween: 24,
  slidesPerView: 1,
  breakpoints: {
    640: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: true,
    pauseOnMouseEnter: true,
  },
})

const sections = document.querySelectorAll('section[id]')

function scrollActive() {
  const scrollY = window.pageYOffset
  sections.forEach(current => {
    const sectionHeight = current.offsetHeight
    const sectionTop = current.offsetTop - 50
    const sectionId = current.getAttribute('id')
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.add('active-link')
    } else {
      document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.remove('active-link')
    }
  })
}
window.addEventListener('scroll', scrollActive)

function scrollHeader() {
  const nav = document.getElementById('header')
  if (this.scrollY >= 80) nav.classList.add('scroll-header');
  else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

function scrollUp() {
  const scrollUp = document.getElementById('scroll-up');
  if (this.scrollY >= 500) scrollUp.classList.add('show-scroll');
  else scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp)

const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')
const roadMapCard = document.getElementById('about_img')

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => document.body.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'
const updateRoadmapImage = () => {
  const theme = getCurrentTheme();
  roadMapCard.src = `https://roadmap.sh/card/tall/66b753b9b64402e0524ed413?variant=${theme}`
}
if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  document.body.classList[selectedTheme === 'uil-moon' ? 'add' : 'remove'](iconTheme)
  updateRoadmapImage();
}
themeButton.addEventListener('click', () => {
  document.body.classList.toggle(darkTheme)
  themeButton.classList.toggle(iconTheme)
  localStorage.setItem('selected-theme', getCurrentTheme())
  localStorage.setItem('selected-icon', getCurrentIcon())
  updateRoadmapImage();
})

/*==================== CONTACT FORM ====================*/
const contactForm = document.getElementById('contact-form')
const contactStatus = document.getElementById('contact-status')

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const submitBtn = contactForm.querySelector('.contact_btn')
    const formData = new FormData(contactForm)

    submitBtn.disabled = true
    contactStatus.textContent = 'Sending...'
    contactStatus.className = 'contact_status'

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        contactStatus.textContent = "Thanks! Your message has been sent — I'll get back to you soon."
        contactStatus.className = 'contact_status contact_status-success'
        contactForm.reset()
      })
      .catch(() => {
        contactStatus.textContent = 'Something went wrong. Please try emailing me directly instead.'
        contactStatus.className = 'contact_status contact_status-error'
      })
      .finally(() => {
        submitBtn.disabled = false
      })
  })
}