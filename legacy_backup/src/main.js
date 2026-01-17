import './style.css'
import { questionsWithImages as questions } from './questions.js'

// State
let currentQuestionIndex = 0;
let score = 0;
let isAnswering = false;
let timerTimeout;
let isPlaying = false;
let autoPlayInterval = null;
const QUESTION_TIME = 10000; // 10 seconds (matches CSS timer animation)

// DOM Elements
const app = document.getElementById('app');
const welcomeScreen = document.getElementById('welcome-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const previewFrame = document.querySelector('.preview-frame');

const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const questionText = document.getElementById('question-text');
const questionImage = document.getElementById('question-image');
const optionsContainer = document.getElementById('options-container');
const timerBar = document.getElementById('timer-bar');
const currentQuestionNum = document.getElementById('current-question-num');
const feedbackText = document.getElementById('feedback-text');

// Playback Controls
const playBtn = document.getElementById('play-btn');
const playIcon = playBtn.querySelector('.play-icon');
const currentTimeEl = document.getElementById('current-time');
const totalTimeEl = document.getElementById('total-time');
const progressBar = document.getElementById('progress-bar');

// Timeline Elements
const timelineThumbnails = document.getElementById('timeline-thumbnails');
const timelineProgress = document.getElementById('timeline-progress');
const downloadBtn = document.getElementById('download-btn');
const exportModal = document.getElementById('export-modal');
const exportCancel = document.getElementById('export-cancel');

// Calculate total time
const INTRO_TIME = 15;
const RESULT_TIME = 10;
const totalSeconds = INTRO_TIME + (questions.length * 15) + RESULT_TIME;

// Time tracking
let currentStep = 0;
let stepStartTime = 0;
let elapsedTime = 0;

// Initialize
function init() {
  const urlParams = new URLSearchParams(window.location.search);
  // Check if this is a Puppeteer recording session
  const isPuppeteerSession = urlParams.get('export') === 'true';

  // Always auto-play (export mode behavior)
  const isExportMode = true;

  // If opened by USER (not Puppeteer), trigger the export command
  if (!isPuppeteerSession) {
    console.log('🎬 User browser detected - triggering export...');
    fetch('/api/trigger-export')
      .then(res => res.json())
      .then(data => console.log('Export triggered:', data))
      .catch(err => console.log('Export trigger skipped (dev server may not be running):', err));
  }

  // Event listeners (Always attach)
  if (startBtn) startBtn.addEventListener('click', handleStartClick);
  if (restartBtn) restartBtn.addEventListener('click', handleRestartClick);
  if (playBtn) playBtn.addEventListener('click', togglePlayPause);
  if (downloadBtn) downloadBtn.addEventListener('click', handleDownload);
  if (exportCancel) exportCancel.addEventListener('click', cancelExport);

  if (isExportMode) {
    // Add export-mode class to both html and body for CSS targeting
    document.documentElement.classList.add('export-mode');
    document.body.classList.add('export-mode');

    // Let the CSS handles the dimensions (100% width/height)
    // to avoid layout overflow on smaller screens.

    initTimeline();
    // Start the 15-second intro countdown, then auto-start the quiz
    startAutoAdvance();
  } else {
    initTimeline();
    updateTotalTime();
    updateCurrentTime(0);
  }

  // EARLY PRELOAD: Start loading the first 5 question images during the intro
  // This ensures Question 1's image is fully cached before the user clicks "Start"
  preloadImages(0, 5);
}

window.automateExport = function (duration) {
  if (currentQuestionIndex >= questions.length) {
    return;
  }

  const qIndex = currentQuestionIndex;

  // Answer correctly just before time runs out (9.5s) to allow full animation
  // Total time will be ~9.5s + 5s feedback = ~14.5s (close to 15s)
  setTimeout(() => {
    // Verify we are still on the same question
    if (currentQuestionIndex !== qIndex) {
      console.log(`Export Mode: Skipping automate for Question ${qIndex + 1} (already advanced)`);
      return;
    }

    const currentQ = questions[currentQuestionIndex];
    if (!currentQ) return;
    const correctBtn = optionsContainer.children[currentQ.correct];
    if (correctBtn && !isAnswering) {
      handleAnswer(currentQ.correct, correctBtn);
    }
  }, duration - 500);
};

// Hook into loadQuestion
const originalLoadQuestion = function () { // Placeholder will be redefined below
  // Logic is actually inside the real function
};

function initTimeline() {
  timelineThumbnails.innerHTML = '';

  const introThumb = createThumbnail('Intro', 0, 'theme-intro');
  timelineThumbnails.appendChild(introThumb);

  const themes = ['theme-green', 'theme-pink', 'theme-cyan', 'theme-purple', 'theme-gold'];
  for (let i = 1; i <= questions.length; i++) {
    const theme = themes[(i - 1) % 5];
    const thumb = createThumbnail(i.toString(), i, theme);
    timelineThumbnails.appendChild(thumb);
  }

  const finalThumb = createThumbnail('Final', questions.length + 1, 'theme-final');
  timelineThumbnails.appendChild(finalThumb);

  updateTimelineState(0);
}

function createThumbnail(label, index, themeClass) {
  const thumb = document.createElement('div');
  thumb.className = `timeline-thumb ${themeClass}`;
  thumb.dataset.step = index;
  thumb.innerHTML = `
    <div class="thumb-content">${label}</div>
    <div class="thumb-label">${label === 'Intro' || label === 'Final' ? label : 'P' + label}</div>
  `;
  thumb.addEventListener('click', () => navigateToStep(index));
  return thumb;
}

function updateTimelineState(step) {
  const thumbs = timelineThumbnails.querySelectorAll('.timeline-thumb');
  thumbs.forEach((thumb, i) => {
    thumb.classList.remove('active', 'completed');
    if (i < step) {
      thumb.classList.add('completed');
    } else if (i === step) {
      thumb.classList.add('active');
      thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  });

  const totalSteps = questions.length + 2;
  const progress = (step / (totalSteps - 1)) * 100;
  timelineProgress.style.width = `${progress}%`;
  progressBar.style.width = `${progress}%`;
}

function navigateToStep(step) {
  currentStep = step;

  if (step === 0) {
    showIntro();
  } else if (step <= questions.length) {
    currentQuestionIndex = step - 1;
    showQuiz();
    loadQuestion();
  } else {
    showResult();
  }

  updateTimelineState(step);
  updateTimeFromStep(step);
}

function showIntro() {
  quizScreen.classList.remove('active');
  quizScreen.style.display = 'none';
  resultScreen.classList.remove('active');
  resultScreen.style.display = 'none';

  welcomeScreen.style.display = 'flex';
  welcomeScreen.classList.add('active');

  previewFrame.className = 'preview-frame';
  currentQuestionIndex = 0;
  score = 0;
}

function showQuiz() {
  welcomeScreen.classList.remove('active');
  welcomeScreen.style.display = 'none';
  resultScreen.classList.remove('active');
  resultScreen.style.display = 'none';

  quizScreen.style.display = 'flex';
  quizScreen.classList.add('active');
}

function showResult() {
  stopTimer();
  quizScreen.classList.remove('active');
  quizScreen.style.display = 'none';
  welcomeScreen.classList.remove('active');
  welcomeScreen.style.display = 'none';

  resultScreen.style.display = 'flex';
  resultScreen.classList.add('active');

  updateResultScreen();
}

function handleStartClick() {
  currentStep = 1;
  currentQuestionIndex = 0;
  score = 0;

  showQuiz();
  loadQuestion();
  updateTimelineState(1);

  // Initial Preload (First 5 images)
  preloadImages(0, 5);

  if (isPlaying) {
    startAutoAdvance();
  }
}

// Helper: Preload images in background
function preloadImages(startIndex, count) {
  for (let i = startIndex; i < startIndex + count && i < questions.length; i++) {
    const q = questions[i];
    if (q && q.image) {
      const img = new Image();
      img.src = q.image;
    }
  }
}

function handleRestartClick() {
  navigateToStep(0);
}

function togglePlayPause() {
  isPlaying = !isPlaying;

  if (isPlaying) {
    playIcon.textContent = '⏸';
    playBtn.classList.add('is-playing');
    startAutoAdvance();
  } else {
    playIcon.textContent = '▶';
    playBtn.classList.remove('is-playing');
    stopAutoAdvance();
  }
}

function startAutoAdvance() {
  stopAutoAdvance();
  if (currentStep === 0) {
    autoPlayInterval = setTimeout(() => {
      handleStartClick();
    }, INTRO_TIME * 1000);
  }
}

function stopAutoAdvance() {
  if (autoPlayInterval) {
    clearTimeout(autoPlayInterval);
    autoPlayInterval = null;
  }
}

function updateTotalTime() {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  totalTimeEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.0`;
}

function updateCurrentTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const tenths = Math.floor((seconds % 1) * 10);
  currentTimeEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${tenths}`;
}

function updateTimeFromStep(step) {
  let time = 0;
  if (step === 0) {
    time = 0;
  } else if (step <= questions.length) {
    time = INTRO_TIME + ((step - 1) * 15);
  } else {
    time = INTRO_TIME + (questions.length * 15);
  }
  updateCurrentTime(time);
}

function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];

  currentStep = currentQuestionIndex + 1;
  updateTimelineState(currentStep);
  updateTimeFromStep(currentStep);

  // PRELOAD NEXT 5 IMAGES
  // Creates a heavy buffer to ensure instant loading
  preloadImages(currentQuestionIndex + 1, 5);

  const themes = ['theme-green', 'theme-pink', 'theme-cyan', 'theme-purple', 'theme-gold'];
  previewFrame.className = 'preview-frame ' + themes[currentQuestionIndex % 5];

  questionText.innerText = currentQuestion.question;
  currentQuestionNum.innerText = currentQuestionIndex + 1;
  if (currentQuestion.image) {
    questionImage.src = currentQuestion.image;
  } else {
    questionImage.src = 'https://placehold.co/400x300/png';
  }

  optionsContainer.innerHTML = '';
  isAnswering = false;

  const letters = ['A', 'B', 'C'];

  currentQuestion.options.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `
      <div class="option-letter">${letters[index]}</div>
      <div class="option-text">${option}</div>
    `;
    btn.style.opacity = '0';
    btn.style.transform = 'translateY(10px) scale(0.95)';

    setTimeout(() => {
      btn.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
      btn.style.opacity = '1';
      btn.style.transform = 'translateY(0) scale(1)';
    }, 100 * (index + 1));

    btn.addEventListener('click', () => handleAnswer(index, btn));
    optionsContainer.appendChild(btn);
  });

  startTimer();

  // Export mode hook - answer just before timer runs out
  if (document.body.classList.contains('export-mode')) {
    window.automateExport(QUESTION_TIME);
  }
}

function startTimer() {
  timerBar.classList.remove('animating');
  void timerBar.offsetWidth;
  timerBar.classList.add('animating');

  timerTimeout = setTimeout(() => {
    handleTimeout();
  }, QUESTION_TIME);
}

function stopTimer() {
  clearTimeout(timerTimeout);
  timerBar.classList.remove('animating');
  timerBar.style.transform = getComputedStyle(timerBar).transform;
}

function handleTimeout() {
  if (isAnswering) return;
  isAnswering = true;

  const currentQuestion = questions[currentQuestionIndex];
  const correctBtn = optionsContainer.children[currentQuestion.correct];

  correctBtn.classList.add('correct');
  correctBtn.classList.add('highlight-correct');
  correctBtn.classList.add('bounce');

  Array.from(optionsContainer.children).forEach(btn => {
    btn.disabled = true;
    if (btn !== correctBtn) {
      btn.style.opacity = '0.5';
    }
  });

  setTimeout(() => {
    nextQuestion();
  }, 3000);
}

function handleAnswer(selectedIndex, btnElement) {
  if (isAnswering) return;
  stopTimer();
  isAnswering = true;

  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = selectedIndex === currentQuestion.correct;

  if (isCorrect) {
    btnElement.classList.add('correct');
    btnElement.classList.add('bounce');
    score++;
  } else {
    btnElement.classList.add('incorrect');
    const correctBtn = optionsContainer.children[currentQuestion.correct];
    correctBtn.classList.add('correct');
    correctBtn.classList.add('bounce');
  }

  Array.from(optionsContainer.children).forEach(btn => {
    btn.disabled = true;
    if (btn !== btnElement && btn !== optionsContainer.children[currentQuestion.correct]) {
      btn.style.opacity = '0.5';
    }
  });

  setTimeout(() => {
    nextQuestion();
  }, 5000); // Wait 5s before next question
}

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    const quizContent = document.querySelector('.quiz-content');
    quizContent.classList.add('fade-out');

    setTimeout(() => {
      loadQuestion();
      quizContent.classList.remove('fade-out');
    }, 500);
  } else {
    currentStep = questions.length + 1;
    showResult();
    updateTimelineState(currentStep);
    updateTimeFromStep(currentStep);
  }
}

function updateResultScreen() {
  // Visual-only mode: No scoring highlights or dynamic feedback.
  // The HTML contains the static "Fan Level" table.

  // In export mode, transition to Export Ready screen after 20 seconds
  if (document.body.classList.contains('export-mode')) {
    setTimeout(() => {
      showExportReadyScreen();
    }, 20000); // 20 seconds delay on final screen
  }
}

function showExportReadyScreen() {
  const exportReadyScreen = document.getElementById('export-ready-screen');
  const exportAgainBtn = document.getElementById('export-again-btn');

  // Hide result screen
  resultScreen.classList.remove('active');
  resultScreen.style.display = 'none';

  // Show export ready screen
  exportReadyScreen.style.display = 'flex';
  exportReadyScreen.classList.add('active');

  // Set final theme
  previewFrame.className = 'preview-frame theme-gold';

  // Dynamically create the export-finished signal for Puppeteer
  // This ensures detection only happens when this screen is actually shown
  const marker = document.createElement('div');
  marker.id = 'export-finished';
  exportReadyScreen.appendChild(marker);

  // Export Again button reloads the page to start a new export
  if (exportAgainBtn) {
    exportAgainBtn.addEventListener('click', () => {
      window.location.href = window.location.href; // Reload with same params
    });
  }
}

function handleDownload() {
  alert('💡 Para exportar el video, ejecuta el siguiente comando en tu terminal:\n\nnpm run export');
}

function cancelExport() {
  if (exportModal) exportModal.classList.add('hidden');
}

// Initialize on load
init();
