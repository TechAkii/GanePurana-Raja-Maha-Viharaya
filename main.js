
'use strict';

/* ════════════════════════════════════════
   EVENTS DATA — edit this array to update
   ════════════════════════════════════════ */
const EVENTS = [
    {
        id: 1,
        title: 'Vesak Poya Celebration',
        category: 'annual',
        badge: 'May 2026',
        status: 'upcoming',
        cat_label: '🌸 Annual Festival',
        description: 'Celebrate the birth, enlightenment, and parinibbana of the Lord Buddha with traditional lantern displays, pirith chanting, dharma talks, and dansalas throughout Bentota.',
        img: 'Vesak_festival.png',
        imgAlt: 'Vesak lantern celebrations in Sri Lanka',
        meta: ['📅 Full Moon Poya', '⏰ All Day & Night', '🎟️ Free Entry']
    },
    {
        id: 2,
        title: 'Poya Day Sil Programme',
        category: 'monthly',
        badge: 'Every Poya',
        status: 'ongoing',
        cat_label: '☸ Monthly Observance',
        description: 'Every full moon Poya day — an eight-precept sil observance including morning bana, group meditation, and midday almsgiving to the Sangha.',
        img: 'sil_programme.png',
        imgAlt: '',
        meta: ['📅 Monthly', '⏰ 5:00 AM – 6:00 PM', '👕 White Attire']
    },
    {
        id: 3,
        title: 'Annual Piriwena Prize Giving',
        category: 'piriwena',
        badge: 'Dec 2026',
        status: 'upcoming',
        cat_label: '📚 Piriwena',
        description: 'The annual prize-giving ceremony honouring student monks who have excelled in national Piriwena examinations at Praathamic, Madhyama, and Upadaya levels.',
        img: 'prize_giving.png',
        imgAlt: 'Buddhist monks at a Sri Lankan temple',
        meta: ['📅 December', '⏰ 9:00 AM', '🎖️ All Monks']
    },
    {
        id: 4,
        title: 'Sacred Bodhi Puja — Poson',
        category: 'annual',
        badge: 'June 2026',
        status: 'upcoming',
        cat_label: '🌳 Annual Ceremony',
        description: 'A dawn puja at the Bodhi tree on the temple premises. Devotees offer flowers and oil lamps while the monks chant sutras.',
        img: 'Bodhi_puja.jpg',
        imgAlt: 'Sacred Bodhi tree',
        meta: ['📅 Poson Poya — June', '⏰ 5:30 AM', '🌸 All Welcome']
    },
    {
        id: 5,
        title: 'Dhamma School — Daham Pasala',
        category: 'education',
        badge: 'Every Sunday',
        status: 'ongoing',
        cat_label: '🏫 Education',
        description: 'The Daham Pasala teaches Buddhist philosophy, Sinhala language, and culture to children of Bentota and surrounding villages every Sunday morning.',
        img: 'daham_pasala.png',
        imgAlt: '',
        meta: ['📅 Every Sunday', '⏰ 8:00 AM', '👶 Children']
    },
    {
        id: 6,
        title: 'Katina Pinkama',
        category: 'annual',
        badge: 'Oct / Nov 2026',
        status: 'upcoming',
        cat_label: '🕯️ Annual Ceremony',
        description: 'The Katina ceremony marks the end of the Vas (rains retreat) season. Devotees offer robes and requisites to the Sangha.',
        img: 'katina_pinkama.png',
        imgAlt: '',
        meta: ['📅 After Vap Poya', '⏰ 8:00 AM', '🎊 Procession']
    },
    {
        id: 7,
        title: 'Community Almsgiving — Sangha Dana',
        category: 'monthly',
        badge: 'According to arrangemnet date',
        status: 'ongoing',
        cat_label: '🙏 Almsgiving',
        description: 'Monthly almsgiving to the resident monks. Families may contact the temple to arrange a personal or group dana on any Poya day.',
        img: 'community_almsgiving.png',
        imgAlt: '',
        meta: ['📅 Poya Days', '⏰ 10:30 AM', '📞 Pre-arrange Required']
    },
    {
        id: 8,
        title: 'National Piriwena Examination',
        category: 'piriwena',
        badge: 'Annual',
        status: 'past',
        cat_label: '📝 Piriwena',
        description: 'Student monks sit the national Piriwena examination administered by the Government of Sri Lanka — a milestone in their academic monastic training.',
        img: 'piriwena.jpg',
        imgAlt: '',
        meta: ['📅 Annual', '⏰ All Day', '📝 Monks Only']
    }
];

/* ── Render events ── */
function renderEvents(filter = 'all') {
    const grid = document.getElementById('evGrid');
    const filtered = filter === 'all' ? EVENTS : EVENTS.filter(e => e.category === filter);

    if (!filtered.length) {
        grid.innerHTML = `<div class="ev-empty"><span>🙏</span><p>No events in this category at the moment.</p></div>`;
        return;
    }

    grid.innerHTML = filtered.map(ev => {
        const statusClass = ev.status === 'upcoming' || ev.status === 'ongoing' ? 'up-lbl' : 'past-lbl';
        const statusText = ev.status.charAt(0).toUpperCase() + ev.status.slice(1);
        const imgHtml = ev.img
            ? `<img src="${ev.img}" alt="${ev.imgAlt}" loading="lazy"/>`
            : '';
        const metaHtml = ev.meta.map(m => `<span class="evmi">${m}</span>`).join('');

        return `
      <article class="evc">
        <div class="ev-img" style="background:linear-gradient(135deg,var(--maroon-deep),var(--navy))">
          ${imgHtml}
          <span class="ev-badge">${ev.badge}</span>
        </div>
        <div class="evbd">
          <div style="display:flex;align-items:center;gap:7px;margin-bottom:7px">
            <span class="ev-cat">${ev.cat_label}</span>
            <span class="evlbl ${statusClass}">${statusText}</span>
          </div>
          <h3>${ev.title}</h3>
          <p>${ev.description}</p>
          <div class="evmeta" aria-label="Event details">${metaHtml}</div>
        </div>
      </article>`;
    }).join('');
}

/* ── Render filter buttons ── */
function renderFilters() {
    const categories = [
        { key: 'all', label: 'All Events' },
        { key: 'monthly', label: 'Monthly' },
        { key: 'annual', label: 'Annual' },
        { key: 'piriwena', label: 'Piriwena' },
        { key: 'education', label: 'Education' }
    ];
    const container = document.querySelector('.evfil');
    container.innerHTML = categories.map((c, i) => `
    <button class="eff" data-cat="${c.key}" aria-pressed="${i === 0}">${c.label}</button>
  `).join('');

    container.addEventListener('click', e => {
        const btn = e.target.closest('.eff');
        if (!btn) return;
        container.querySelectorAll('.eff').forEach(b => b.setAttribute('aria-pressed', 'false'));
        btn.setAttribute('aria-pressed', 'true');
        renderEvents(btn.dataset.cat);
    });
}

/* ── Scroll-reveal ── */
function initReveal() {
    const obs = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                const delay = i * 60;
                setTimeout(() => entry.target.classList.add('in'), delay);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.rv').forEach(el => obs.observe(el));
}

/* ── Active nav link on scroll ── */
function initNavHighlight() {
    const sections = document.querySelectorAll('section[id], div[id]');
    const links = document.querySelectorAll('.nav-list a');
    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                links.forEach(l => l.removeAttribute('aria-current'));
                const active = document.querySelector(`.nav-list a[href="#${entry.target.id}"]`);
                if (active) active.setAttribute('aria-current', 'page');
            }
        });
    }, { rootMargin: '-50% 0px -50% 0px' });
    sections.forEach(s => obs.observe(s));
}

/* ── Nav scroll shrink ── */
function initNavScroll() {
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
        nav.style.background = window.scrollY > 50
            ? 'rgba(58,30,30,0.98)'
            : 'rgba(95,59,59,0.96)';
    }, { passive: true });
}

initNavScroll();

/* ── Mobile burger ── */
function initBurger() {
    const burger = document.getElementById('burger');
    const menu = document.getElementById('nav-list');
    burger.addEventListener('click', () => {
        const open = burger.getAttribute('aria-expanded') === 'true';
        burger.setAttribute('aria-expanded', String(!open));
        menu.classList.toggle('open', !open);
    });
    menu.addEventListener('click', e => {
        if (e.target.tagName === 'A') {
            burger.setAttribute('aria-expanded', 'false');
            menu.classList.remove('open');
        }
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && menu.classList.contains('open')) {
            burger.setAttribute('aria-expanded', 'false');
            menu.classList.remove('open');
            burger.focus();
        }
    });
}

/* ── Contact form ── */
const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = {
      firstName: document.getElementById("cfirst")?.value.trim() || "",
      lastName: document.getElementById("clast")?.value.trim() || "",
      email: document.getElementById("cemail")?.value.trim() || "",
      phone: document.getElementById("cphone")?.value.trim() || "",
      subject: document.getElementById("csubject")?.value.trim() || "",
      message: (document.getElementById("cmessage") || document.getElementById("cmsg"))?.value.trim() || ""
    };

    try {
      const response = await fetch("http://localhost:3000/send-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        alert("Message sent successfully.");
        form.reset();
      } else {
        alert(result.message || "Failed to send message.");
      }
    } catch (error) {
      console.error(error);
      alert("Server error. Please try again.");
    }
  });
}


/* ── Year in footer ── */
document.getElementById('yr').textContent = new Date().getFullYear();

/* ── Init all ── */
document.addEventListener('DOMContentLoaded', () => {
    renderFilters();
    renderEvents();
    initReveal();
    initNavHighlight();
    initNavScroll();
    initBurger();
});