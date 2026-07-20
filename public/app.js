// Konfigurasi Pertanyaan Kuesioner PSPK (5 Dimensi, 10 Pertanyaan dari script asli)
const QUIZ_STEPS = [
  {
    id: 'governance',
    name: '1. Leadership & Governance',
    questions: [
      {
        id: 'q1',
        text: '1. Sejauh mana manajemen dan pimpinan organisasi memahami pentingnya PSPK 1 dan PSPK 2?',
        options: [
          { val: 1, text: 'Belum tersedia atau belum pernah dibahas' },
          { val: 2, text: 'Sudah mulai dibahas, tetapi belum terstruktur' },
          { val: 3, text: 'Sudah tersedia sebagian dan sedang dikembangkan' },
          { val: 4, text: 'Sudah tersedia, terstruktur, dan dijalankan secara konsisten' }
        ]
      },
      {
        id: 'q2',
        text: '2. Apakah organisasi sudah menetapkan penanggung jawab atau tim yang menangani persiapan PSPK?',
        options: [
          { val: 1, text: 'Belum tersedia atau belum pernah dibahas' },
          { val: 2, text: 'Sudah mulai dibahas, tetapi belum terstruktur' },
          { val: 3, text: 'Sudah tersedia sebagian dan sedang dikembangkan' },
          { val: 4, text: 'Sudah tersedia, terstruktur, dan dijalankan secara konsisten' }
        ]
      }
    ]
  },
  {
    id: 'strategy',
    name: '2. Risk & Strategic Integration',
    questions: [
      {
        id: 'q3',
        text: '3. Apakah organisasi sudah mengidentifikasi risiko dan peluang terkait keberlanjutan yang dapat memengaruhi kinerja dan prospek keuangan?',
        options: [
          { val: 1, text: 'Belum tersedia atau belum pernah dibahas' },
          { val: 2, text: 'Sudah mulai dibahas, tetapi belum terstruktur' },
          { val: 3, text: 'Sudah tersedia sebagian dan sedang dikembangkan' },
          { val: 4, text: 'Sudah tersedia, terstruktur, dan dijalankan secara konsisten' }
        ]
      },
      {
        id: 'q7',
        text: '4. Sejauh mana informasi keberlanjutan telah terintegrasi dengan proses finance, risk management, dan corporate planning?',
        options: [
          { val: 1, text: 'Belum tersedia atau belum pernah dibahas' },
          { val: 2, text: 'Sudah mulai dibahas, tetapi belum terstruktur' },
          { val: 3, text: 'Sudah tersedia sebagian dan sedang dikembangkan' },
          { val: 4, text: 'Sudah tersedia, terstruktur, dan dijalankan secara konsisten' }
        ]
      }
    ]
  },
  {
    id: 'dataReadiness',
    name: '3. Data Readiness',
    questions: [
      {
        id: 'q4',
        text: '5. Apakah organisasi sudah mengidentifikasi informasi dan data ESG yang diperlukan untuk mendukung pengungkapan PSPK?',
        options: [
          { val: 1, text: 'Belum tersedia atau belum pernah dibahas' },
          { val: 2, text: 'Sudah mulai dibahas, tetapi belum terstruktur' },
          { val: 3, text: 'Sudah tersedia sebagian dan sedang dikembangkan' },
          { val: 4, text: 'Sudah tersedia, terstruktur, dan dijalankan secara konsisten' }
        ]
      },
      {
        id: 'q5',
        text: '6. Sejauh mana data ESG tersedia, terdokumentasi, dan dapat diakses dari berbagai divisi atau unit kerja?',
        options: [
          { val: 1, text: 'Belum tersedia atau belum pernah dibahas' },
          { val: 2, text: 'Sudah mulai dibahas, tetapi belum terstruktur' },
          { val: 3, text: 'Sudah tersedia sebagian dan sedang dikembangkan' },
          { val: 4, text: 'Sudah tersedia, terstruktur, dan dijalankan secara konsisten' }
        ]
      }
    ]
  },
  {
    id: 'assurance',
    name: '4. Internal Control & Assurance',
    questions: [
      {
        id: 'q6',
        text: '7. Apakah organisasi sudah memiliki proses untuk memastikan keakuratan, konsistensi, dan validitas data keberlanjutan?',
        options: [
          { val: 1, text: 'Belum tersedia atau belum pernah dibahas' },
          { val: 2, text: 'Sudah mulai dibahas, tetapi belum terstruktur' },
          { val: 3, text: 'Sudah tersedia sebagian dan sedang dikembangkan' },
          { val: 4, text: 'Sudah tersedia, terstruktur, dan dijalankan secara konsisten' }
        ]
      },
      {
        id: 'q9',
        text: '8. Apakah organisasi sudah memiliki mekanisme review, kontrol internal, dan persetujuan atas informasi keberlanjutan?',
        options: [
          { val: 1, text: 'Belum tersedia atau belum pernah dibahas' },
          { val: 2, text: 'Sudah mulai dibahas, tetapi belum terstruktur' },
          { val: 3, text: 'Sudah tersedia sebagian dan sedang dikembangkan' },
          { val: 4, text: 'Sudah tersedia, terstruktur, dan dijalankan secara konsisten' }
        ]
      }
    ]
  },
  {
    id: 'roadmap',
    name: '5. People & Implementation Roadmap',
    questions: [
      {
        id: 'q8',
        text: '9. Apakah tim yang terlibat sudah memiliki pemahaman dan kompetensi yang memadai terkait PSPK 1 dan PSPK 2?',
        options: [
          { val: 1, text: 'Belum tersedia atau belum pernah dibahas' },
          { val: 2, text: 'Sudah mulai dibahas, tetapi belum terstruktur' },
          { val: 3, text: 'Sudah tersedia sebagian dan sedang dikembangkan' },
          { val: 4, text: 'Sudah tersedia, terstruktur, dan dijalankan secara konsisten' }
        ]
      },
      {
        id: 'q10',
        text: '10. Apakah organisasi sudah memiliki roadmap dan target waktu yang jelas untuk mempersiapkan penerapan PSPK?',
        options: [
          { val: 1, text: 'Belum tersedia atau belum pernah dibahas' },
          { val: 2, text: 'Sudah mulai dibahas, tetapi belum terstruktur' },
          { val: 3, text: 'Sudah tersedia sebagian dan sedang dikembangkan' },
          { val: 4, text: 'Sudah tersedia, terstruktur, dan dijalankan secara konsisten' }
        ]
      }
    ]
  }
];

// Opsi Tantangan
const CHALLENGES_OPTIONS = [
  'Pemahaman manajemen mengenai PSPK masih terbatas',
  'Belum ada sponsor, PIC, atau tim khusus',
  'Kompetensi internal masih terbatas',
  'Risiko dan peluang keberlanjutan belum dipetakan',
  'Informasi ESG belum terintegrasi dengan proses bisnis',
  'Data ESG masih tersebar di berbagai divisi',
  'Data owner dan tanggung jawab pengelolaan data belum jelas',
  'Kualitas dan konsistensi data belum memadai',
  'Belum memiliki proses kontrol dan validasi data',
  'Belum memiliki roadmap implementasi',
  'Keterbatasan sistem atau teknologi pendukung',
  'Belum mengetahui langkah awal yang perlu dilakukan',
  'Lainnya'
];

// App State
let currentStepIdx = 0; // 0: Profil, 1-5: Quiz, 6: Tantangan & Kebutuhan, 7: Consent, 8: Loading, 9: Result
let profileData = {};
let answersData = {};
let selectedChallenges = [];
let needsData = {};
let consentsData = { data: false, comms: false };

// DOM Sections
const sections = {
  welcome: document.getElementById('step-welcome'),
  quiz: document.getElementById('step-quiz'),
  challenges: document.getElementById('step-challenges'),
  consent: document.getElementById('step-consent'),
  loading: document.getElementById('step-loading'),
  result: document.getElementById('step-result')
};

// Profile Form Event
const profileForm = document.getElementById('profile-form');
profileForm.addEventListener('submit', (e) => {
  e.preventDefault();
  profileData = {
    name: document.getElementById('input-name').value.trim(),
    email: document.getElementById('input-email').value.trim(),
    company: document.getElementById('input-company').value.trim(),
    jobTitle: document.getElementById('input-job').value.trim(),
    division: document.getElementById('input-division').value,
    phone: document.getElementById('input-phone').value.trim()
  };
  
  // Masuk ke quiz
  currentStepIdx = 1;
  showSection('quiz');
  renderQuizStep();
});

// Quiz Navigation
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const quizPillarName = document.getElementById('quiz-pillar-name');
const quizProgressText = document.getElementById('quiz-progress-text');
const quizProgressInner = document.getElementById('quiz-progress-inner');
const questionsContainer = document.getElementById('questions-container');

btnPrev.addEventListener('click', () => {
  if (currentStepIdx > 1) {
    currentStepIdx--;
    renderQuizStep();
  } else if (currentStepIdx === 1) {
    currentStepIdx = 0;
    showSection('welcome');
  }
});

btnNext.addEventListener('click', () => {
  if (validateCurrentStepAnswers()) {
    if (currentStepIdx < QUIZ_STEPS.length) {
      currentStepIdx++;
      renderQuizStep();
    } else {
      // Masuk ke section Tantangan & Kebutuhan
      currentStepIdx = 6;
      showSection('challenges');
      renderChallengesStep();
    }
  } else {
    alert('Mohon jawab seluruh pertanyaan sebelum melanjutkan.');
  }
});

// Render Quiz Dimensions
function renderQuizStep() {
  const currentPillar = QUIZ_STEPS[currentStepIdx - 1];
  
  // Update Progress UI
  quizPillarName.textContent = currentPillar.name;
  quizProgressText.textContent = `Dimensi ${currentStepIdx} dari ${QUIZ_STEPS.length}`;
  const progressPercent = (currentStepIdx / QUIZ_STEPS.length) * 100;
  quizProgressInner.style.width = `${progressPercent}%`;

  // Render Questions
  questionsContainer.innerHTML = '';
  
  currentPillar.questions.forEach((q) => {
    const qBlock = document.createElement('div');
    qBlock.className = 'question-block';
    
    const qTitle = document.createElement('h3');
    qTitle.className = 'question-text';
    qTitle.textContent = q.text;
    qBlock.appendChild(qTitle);
    
    const optionsList = document.createElement('div');
    optionsList.className = 'options-list';
    
    q.options.forEach((opt) => {
      const optCard = document.createElement('div');
      optCard.className = 'option-card';
      if (answersData[q.id] === opt.val) {
        optCard.classList.add('selected');
      }
      
      optCard.addEventListener('click', () => {
        const siblingCards = optionsList.querySelectorAll('.option-card');
        siblingCards.forEach(c => c.classList.remove('selected'));
        optCard.classList.add('selected');
        answersData[q.id] = opt.val;
      });
      
      const radioCircle = document.createElement('div');
      radioCircle.className = 'option-radio';
      
      const textSpan = document.createElement('span');
      textSpan.className = 'option-text-span';
      textSpan.textContent = opt.text;
      
      optCard.appendChild(radioCircle);
      optCard.appendChild(textSpan);
      optionsList.appendChild(optCard);
    });
    
    qBlock.appendChild(optionsList);
    questionsContainer.appendChild(qBlock);
  });
}

function validateCurrentStepAnswers() {
  const currentPillar = QUIZ_STEPS[currentStepIdx - 1];
  return currentPillar.questions.every(q => answersData[q.id] !== undefined);
}

// Section 6: Challenges & Needs Render and Events
const challengesContainer = document.getElementById('challenges-checkboxes');
const challengesForm = document.getElementById('challenges-form');
const challengesError = document.getElementById('challenges-error');
const btnChallengesPrev = document.getElementById('btn-challenges-prev');

function renderChallengesStep() {
  challengesContainer.innerHTML = '';
  
  CHALLENGES_OPTIONS.forEach((opt) => {
    const card = document.createElement('div');
    card.className = 'checkbox-card';
    if (selectedChallenges.includes(opt)) {
      card.classList.add('checked');
    }
    
    card.addEventListener('click', () => {
      if (selectedChallenges.includes(opt)) {
        selectedChallenges = selectedChallenges.filter(c => c !== opt);
        card.classList.remove('checked');
      } else {
        if (selectedChallenges.length >= 3) {
          alert('Pilih maksimal 3 tantangan.');
          return;
        }
        selectedChallenges.push(opt);
        card.classList.add('checked');
      }
    });
    
    const checkboxBox = document.createElement('div');
    checkboxBox.className = 'custom-checkbox';
    
    const textSpan = document.createElement('span');
    textSpan.className = 'checkbox-label-text';
    textSpan.textContent = opt;
    
    card.appendChild(checkboxBox);
    card.appendChild(textSpan);
    challengesContainer.appendChild(card);
  });
}

btnChallengesPrev.addEventListener('click', () => {
  currentStepIdx = QUIZ_STEPS.length;
  showSection('quiz');
  renderQuizStep();
});

challengesForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  if (selectedChallenges.length === 0 || selectedChallenges.length > 3) {
    challengesError.style.display = 'block';
    challengesContainer.scrollIntoView({ behavior: 'smooth' });
    return;
  }
  challengesError.style.display = 'none';

  needsData = {
    neededSupport: document.getElementById('select-support').value,
    timeline: document.getElementById('select-timeline').value,
    involvement: document.getElementById('select-involvement').value,
    interest: document.getElementById('select-interest').value,
    specialNote: document.getElementById('text-note').value.trim()
  };

  currentStepIdx = 7;
  showSection('consent');
  renderConsentStep();
});

// Section 7: Consent Form & Submit
const consentForm = document.getElementById('consent-form');
const btnConsentPrev = document.getElementById('btn-consent-prev');
const consentCardData = document.getElementById('consent-card-data');
const consentCardComms = document.getElementById('consent-card-comms');

function renderConsentStep() {
  // Reset view
  consentCardData.classList.toggle('checked', consentsData.data);
  consentCardComms.classList.toggle('checked', consentsData.comms);
}

consentCardData.addEventListener('click', () => {
  consentsData.data = !consentsData.data;
  consentCardData.classList.toggle('checked', consentsData.data);
});

consentCardComms.addEventListener('click', () => {
  consentsData.comms = !consentsData.comms;
  consentCardComms.classList.toggle('checked', consentsData.comms);
});

btnConsentPrev.addEventListener('click', () => {
  currentStepIdx = 6;
  showSection('challenges');
});

consentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!consentsData.data) {
    alert('Anda wajib menyetujui pernyataan penggunaan informasi sebelum mengirimkan assessment.');
    return;
  }
  
  submitAllData();
});

// Show Section helper
function showSection(key) {
  Object.keys(sections).forEach(k => {
    sections[k].classList.remove('active');
  });
  sections[key].classList.add('active');
}

// POST API Submission
async function submitAllData() {
  showSection('loading');
  
  const payload = {
    ...profileData,
    answers: answersData,
    challenges: selectedChallenges,
    ...needsData,
    dataConsent: consentsData.data,
    commsConsent: consentsData.comms
  };

  try {
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error || 'Gagal memproses kuesioner.');
    }

    const data = await response.json();
    displayResults(data);
  } catch (error) {
    alert(`Terjadi kesalahan: ${error.message}`);
    currentStepIdx = 7;
    showSection('consent');
  }
}

// Display Results
function displayResults(data) {
  showSection('result');
  
  document.getElementById('result-name').textContent = data.name;
  document.getElementById('result-company').textContent = data.company;
  
  const percentage = data.totalPercentage;
  document.getElementById('result-percentage').textContent = `${percentage}%`;
  
  const circle = document.getElementById('radial-progress');
  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius; // 314
  circle.style.strokeDasharray = `${circumference}`;
  
  const offset = circumference - (percentage / 100) * circumference;
  circle.getBoundingClientRect(); 
  circle.style.strokeDashoffset = offset;

  const badge = document.getElementById('result-badge');
  badge.textContent = data.readinessLevel;
  badge.className = 'badge';
  
  if (percentage <= 40) {
    badge.classList.add('not-ready');
    circle.style.stroke = '#e53e3e';
  } else if (percentage <= 75) {
    badge.classList.add('developing');
    circle.style.stroke = '#dd6b20';
  } else {
    badge.classList.add('ready');
    circle.style.stroke = '#0f766e';
  }

  document.getElementById('result-desc').textContent = data.readinessDesc;

  // Set 5 dimensions bars
  const dims = {
    gov: data.dimensionScores.governance,
    strat: data.dimensionScores.strategy,
    data: data.dimensionScores.dataReadiness,
    assurance: data.dimensionScores.assurance,
    roadmap: data.dimensionScores.roadmap
  };

  Object.keys(dims).forEach((key) => {
    document.getElementById(`bar-${key}`).style.width = `${dims[key]}%`;
    document.getElementById(`score-${key}`).textContent = `${dims[key]}%`;
  });

  // Set WA Link
  const btnWa = document.getElementById('btn-wa-cta');
  btnWa.href = data.waLink;

  // Check email warning
  const emailNotif = document.getElementById('email-notif');
  if (data.emailSent) {
    emailNotif.innerHTML = `<i class="fa-regular fa-envelope-open mr-2"></i> Laporan kesiapan lengkap telah dikirimkan ke <strong>${profileData.email}</strong>.`;
    emailNotif.style.backgroundColor = '#f0fdfa';
    emailNotif.style.color = '#0f766e';
    emailNotif.style.borderColor = 'rgba(15, 118, 110, 0.2)';
  } else {
    emailNotif.innerHTML = `<i class="fa-solid fa-triangle-exclamation mr-2"></i> Skor berhasil dihitung! Namun pengiriman email tertunda: SMTP belum terkonfigurasi.`;
    emailNotif.style.backgroundColor = '#fffaf0';
    emailNotif.style.color = '#dd6b20';
    emailNotif.style.borderColor = 'rgba(221, 107, 32, 0.2)';
  }
}
