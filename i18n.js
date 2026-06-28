/* i18n.js — Bilingual FR/EN translation system */

const translations = {
  fr: {
    // Nav
    'nav.about': 'À propos',
    'nav.skills': 'Compétences',
    'nav.projects': 'Projets',
    'nav.contact': 'Contact',
    'nav.cv': 'CV',
    'nav.cv.aria': 'Télécharger le CV (nouvelle fenêtre)',

    // Hero
    'hero.badge': 'Disponible pour un stage en développement logiciel',
    'hero.badge.short': 'Disponible',
    'hero.title': 'Développeur Full Stack',
    'hero.subtitle': 'Étudiant en <strong>Sciences Informatiques et Logiciels</strong> à Calavi, Bénin. Je construis des interfaces modernes et des systèmes logiciels fiables — du front-end React jusqu\'à l\'API Node.js.',
    'hero.cta.projects': 'Voir mes projets',
    'hero.cta.contact': 'Me contacter',

    // Stats
    'stats.projects': 'Projets déployés',
    'stats.tech': 'Technologies maîtrisées',
    'stats.langs': 'Langues de travail',
    'stats.autonomy': 'Autonomie & curiosité',

    // About
    'about.label': 'À propos',
    'about.title': 'Ce qui me définit',
    'about.lead': 'J\'apprends en construisant des choses réelles — pas des exercices de cours.',
    'about.p1': 'En première année de Licence en <strong>Sciences Informatiques et Logiciels</strong> à Calavi, j\'ai développé une double culture : la logique système en C (pointeurs, mémoire, structures de données) et l\'ingénierie web moderne avec React et Node.js. Ces deux approches se complètent — comprendre ce qui se passe sous le capot change fondamentalement la qualité du code qu\'on écrit.',
    'about.p2': 'Mon objectif à moyen terme : étendre progressivement mon expertise vers <strong>l\'ingénierie de l\'intelligence artificielle</strong>, les workflows assistés par IA et les architectures logicielles intégrant des systèmes intelligents. Pas comme une compétence déjà acquise — comme une direction clairement assumée.',
    'about.goal1': 'Acquérir une expérience concrète via un stage',
    'about.goal2': 'Approfondir Next.js, Node.js et les architectures full stack',
    'about.goal3': 'Contribuer à des projets open source à impact',
    'about.location': 'Calavi, Bénin 🇧🇯',
    'about.formation.label': 'Formation',
    'about.formation.value': 'Sciences Informatiques et Logiciels',
    'about.availability.label': 'Disponibilité',
    'about.availability.value': 'Stage · Immédiat',
    'about.langs.label': 'Langues',
    'about.langs.value': 'Français · Anglais · Fon · Idatcha',
    'about.location.label': 'Localisation',

    // Skills
    'skills.label': 'Compétences',
    'skills.title': 'Mon stack technique',
    'skills.description': 'Un ensemble de compétences en progression active — honnête sur mon niveau, rigoureux sur la qualité.',
    'skills.frontend': 'Front-End',
    'skills.backend': 'Back-End',
    'skills.programming': 'Programmation',
    'skills.tools': 'Outils & IA',
    'skills.horizon.label': 'Axe d\'évolution',
    'skills.horizon.text': 'Ingénierie IA · Systèmes intelligents · Workflows assistés par IA · Architectures logicielles intégrant l\'IA',

    // Projects
    'projects.label': 'Projets',
    'projects.title': 'Ce que j\'ai construit',
    'projects.description': 'Projets concrets — pas des exercices. Chacun résout un vrai problème.',
    'projects.github.all': 'Voir tous les projets sur GitHub',
    'projects.problem': 'Problème',
    'projects.solution': 'Solution',
    'projects.results': 'Résultats',
    'projects.code': 'Code',

    // Project 1
    'proj1.type': 'E-commerce · Plateforme',
    'proj1.title': 'SkillKit Hub',
    'proj1.tagline': 'Plateforme e-commerce de produits digitaux adaptée au contexte africain',
    'proj1.problem': 'Vendre des produits digitaux (ebooks, guides, kits) dans 5 domaines différents avec un paiement adapté au marché béninois — sans Stripe ni PayPal.',
    'proj1.solution': 'Site multi-domaines avec catalogue filtrable dynamiquement, système de paiement Mobile Money manuel et génération automatique de messages WhatsApp pour les transactions.',
    'proj1.results': 'Plateforme opérationnelle — 5 domaines (Informatique, Onglerie, Fitness, Études, Business), 15 produits, dark mode premium, responsive mobile-first.',

    // Project 2
    'proj2.type': 'Système · Langage C',
    'proj2.title': 'Gestionnaire de Notes',
    'proj2.tagline': 'Application C avec persistance fichiers, CRUD complet et statistiques',
    'proj2.problem': 'Gérer et persister des notes étudiants en console, sans interface graphique.',
    'proj2.solution': 'Application C complète — pointeurs, tableaux dynamiques, persistance via fopen/fprintf/fscanf, menu interactif.',
    'proj2.results': '~200 lignes couvrant CRUD, calculs statistiques (moyenne, max, min) et sauvegarde entre sessions.',

    // Project 3
    'proj3.type': 'Web · Découverte culturelle',
    'proj3.title': 'BeninWide',
    'proj3.tagline': 'Plateforme de découverte touristique et culturelle du Bénin',
    'proj3.problem': 'Le Bénin manque d\'une présence numérique claire pour valoriser son patrimoine culturel auprès des visiteurs et de la diaspora.',
    'proj3.solution': 'Site vitrine multipage avec sections découverte, gastronomie, événements et contacts — design moderne, navigation fluide.',
    'proj3.results': 'Interface complète et responsive, mise en avant de destinations, plats locaux et événements culturels du Bénin.',

    // Contact
    'contact.label': 'Contact',
    'contact.title': 'Travaillons ensemble',
    'contact.subtitle': 'Je suis disponible pour un stage en développement logiciel dès maintenant.\nRecruteurs, startups, cabinets informatiques — n\'hésitez pas.',
    'contact.email': 'M\'envoyer un email',
    'contact.cv': 'Télécharger mon CV',

    // Footer
    'footer.tagline': 'Développeur Full Stack · Sciences Informatiques et Logiciels',
  },

  en: {
    // Nav
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'nav.cv': 'Resume',
    'nav.cv.aria': 'Download Resume (new window)',

    // Hero
    'hero.badge': 'Available for a software development internship',
    'hero.badge.short': 'Available',
    'hero.title': 'Full Stack Developer',
    'hero.subtitle': 'Student in <strong>Computer Science & Software Engineering</strong> at Calavi, Benin. I build modern interfaces and reliable software systems — from React front-end to Node.js APIs.',
    'hero.cta.projects': 'View my projects',
    'hero.cta.contact': 'Get in touch',

    // Stats
    'stats.projects': 'Deployed projects',
    'stats.tech': 'Technologies mastered',
    'stats.langs': 'Working languages',
    'stats.autonomy': 'Autonomy & curiosity',

    // About
    'about.label': 'About',
    'about.title': 'What defines me',
    'about.lead': 'I learn by building real things — not textbook exercises.',
    'about.p1': 'In my first year of a Bachelor\'s in <strong>Computer Science & Software Engineering</strong> at Calavi, I developed a dual culture: systems thinking in C (pointers, memory, data structures) and modern web engineering with React and Node.js. Both reinforce each other — understanding what happens under the hood fundamentally changes the quality of the code you write.',
    'about.p2': 'My medium-term goal: progressively extend my expertise toward <strong>AI engineering</strong>, AI-assisted workflows, and software architectures integrating intelligent systems. Not as a claimed skill — as a clearly assumed direction.',
    'about.goal1': 'Gain hands-on experience through an internship',
    'about.goal2': 'Deepen Next.js, Node.js and full stack architectures',
    'about.goal3': 'Contribute to impactful open source projects',
    'about.location': 'Calavi, Benin 🇧🇯',
    'about.formation.label': 'Education',
    'about.formation.value': 'Computer Science & Software Engineering',
    'about.availability.label': 'Availability',
    'about.availability.value': 'Internship · Immediately',
    'about.langs.label': 'Languages',
    'about.langs.value': 'French · English · Fon · Idatcha',
    'about.location.label': 'Location',

    // Skills
    'skills.label': 'Skills',
    'skills.title': 'My tech stack',
    'skills.description': 'An actively growing skill set — honest about my level, rigorous about quality.',
    'skills.frontend': 'Front-End',
    'skills.backend': 'Back-End',
    'skills.programming': 'Programming',
    'skills.tools': 'Tools & AI',
    'skills.horizon.label': 'Future direction',
    'skills.horizon.text': 'AI Engineering · Intelligent Systems · AI-assisted Workflows · AI-integrated Software Architectures',

    // Projects
    'projects.label': 'Projects',
    'projects.title': 'What I\'ve built',
    'projects.description': 'Real projects — not exercises. Each one solves a concrete problem.',
    'projects.github.all': 'See all projects on GitHub',
    'projects.problem': 'Problem',
    'projects.solution': 'Solution',
    'projects.results': 'Results',
    'projects.code': 'Code',

    // Project 1
    'proj1.type': 'E-commerce · Platform',
    'proj1.title': 'SkillKit Hub',
    'proj1.tagline': 'Digital product e-commerce platform adapted to the African context',
    'proj1.problem': 'Selling digital products (ebooks, guides, kits) across 5 different domains with a payment system adapted to the Beninese market — without Stripe or PayPal.',
    'proj1.solution': 'Multi-domain site with dynamically filterable catalog, manual Mobile Money payment system, and automatic WhatsApp message generation for transactions.',
    'proj1.results': 'Operational platform — 5 domains (IT, Nails, Fitness, Studies, Business), 15 products, premium dark mode, mobile-first responsive.',

    // Project 2
    'proj2.type': 'System · C Language',
    'proj2.title': 'Grade Manager',
    'proj2.tagline': 'C application with file persistence, full CRUD and statistics',
    'proj2.problem': 'Managing and persisting student grades in a console application, without a graphical interface.',
    'proj2.solution': 'Complete C application — pointers, dynamic arrays, persistence via fopen/fprintf/fscanf, interactive menu.',
    'proj2.results': '~200 lines covering CRUD, statistical calculations (average, max, min) and session persistence.',

    // Project 3
    'proj3.type': 'Web · Cultural Discovery',
    'proj3.title': 'BeninWide',
    'proj3.tagline': 'Tourist and cultural discovery platform for Benin',
    'proj3.problem': 'Benin lacks a clear digital presence to showcase its cultural heritage to visitors and the diaspora.',
    'proj3.solution': 'Multi-page showcase site with discovery, gastronomy, events and contact sections — modern design, smooth navigation.',
    'proj3.results': 'Complete responsive interface highlighting destinations, local dishes and cultural events in Benin.',

    // Contact
    'contact.label': 'Contact',
    'contact.title': 'Let\'s work together',
    'contact.subtitle': 'I\'m available for a software development internship right now.\nRecruiters, startups, tech firms — feel free to reach out.',
    'contact.email': 'Send me an email',
    'contact.cv': 'Download my resume',

    // Footer
    'footer.tagline': 'Full Stack Developer · Computer Science & Software Engineering',
  }
};

const LANG_KEY = 'ma-portfolio-lang';

function getLang() {
  return localStorage.getItem(LANG_KEY) || 'fr';
}

function setLang(lang) {
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.setAttribute('lang', lang);
  renderTranslations(lang);
  updateLangToggle(lang);
}

function t(key, lang) {
  return translations[lang]?.[key] || translations['fr'][key] || key;
}

function renderTranslations(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value = t(key, lang);
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = value;
    } else if (el.hasAttribute('data-i18n-html')) {
      el.innerHTML = value;
    } else {
      el.textContent = value;
    }
  });

  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria');
    el.setAttribute('aria-label', t(key, lang));
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    el.innerHTML = t(key, lang);
  });
}

function updateLangToggle(lang) {
  const btn = document.getElementById('lang-toggle');
  if (!btn) return;
  const nextLang = lang === 'fr' ? 'EN' : 'FR';
  btn.textContent = nextLang;
  btn.setAttribute('aria-label', lang === 'fr' ? 'Switch to English' : 'Passer en français');
  btn.setAttribute('lang', lang === 'fr' ? 'en' : 'fr');
}

function initI18n() {
  const currentLang = getLang();
  document.documentElement.setAttribute('lang', currentLang);
  renderTranslations(currentLang);
  updateLangToggle(currentLang);

  const btn = document.getElementById('lang-toggle');
  if (btn) {
    btn.addEventListener('click', () => {
      const current = getLang();
      setLang(current === 'fr' ? 'en' : 'fr');
    });
  }
}

initI18n();

export { setLang, getLang, t };
