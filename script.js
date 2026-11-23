/**
 * EQUAL — Understanding Gender Equality (UN SDG 05)
 * Main Interactive Engine: Multi-Step Questionnaire & Real-time Chart.js Analytics
 */

// Global state and constants
const STORAGE_KEY = 'equal_sdg05_survey_dataset_v1';

// Initial 16 fictional demonstration participants strictly adhering to required distribution:
// Q3 (Equality achieved in India): Yes: 2, No: 8, Partially: 6 (Total: 16)
// Q4 (Witnessed discrimination): Yes: 11, No: 3, Unsure: 2 (Total: 16)
// Q5 (Equal career opportunities): Yes: 3, No: 7, Sometimes: 6 (Total: 16)
// Q6 (Equal household responsibilities): Yes: 14, No: 1, Depends: 1 (Total: 16)
const INITIAL_DEMO_DATA = [
  {
    id: 'demo-01',
    isDemo: true,
    age: '18–24',
    gender: 'Woman',
    achieved: 'No',
    discrimination: 'Yes',
    career: 'No',
    household: 'Yes',
    stereotypes: 'Strongly agree',
    education: 'Needs much more focus',
    improvement: 'Safety & Legal Protection',
    theme: 'Early school gender sensitization',
    comment: 'Start teaching mutual respect and emotional intelligence from primary school so respect becomes second nature.',
    timestamp: '2026-11-20T10:15:00Z'
  },
  {
    id: 'demo-02',
    isDemo: true,
    age: '25–34',
    gender: 'Man',
    achieved: 'Partially',
    discrimination: 'Yes',
    career: 'Sometimes',
    household: 'Yes',
    stereotypes: 'Agree',
    education: 'Needs much more focus',
    improvement: 'Workplace & Pay Equity',
    theme: 'Shared parenting & paternity leave',
    comment: 'Mandatory paternity leave is essential to break the myth that parenting and caregiving belong solely to women.',
    timestamp: '2026-11-20T11:42:00Z'
  },
  {
    id: 'demo-03',
    isDemo: true,
    age: '18–24',
    gender: 'Woman',
    achieved: 'No',
    discrimination: 'Yes',
    career: 'No',
    household: 'Yes',
    stereotypes: 'Strongly agree',
    education: 'Rarely discussed',
    improvement: 'Safety & Legal Protection',
    theme: 'Dismantling daily microaggressions',
    comment: 'Streets and public transit must be unconditionally safe at any hour so women never have to limit their aspirations.',
    timestamp: '2026-11-20T14:20:00Z'
  },
  {
    id: 'demo-04',
    isDemo: true,
    age: '35–49',
    gender: 'Woman',
    achieved: 'No',
    discrimination: 'Yes',
    career: 'No',
    household: 'Yes',
    stereotypes: 'Strongly agree',
    education: 'Needs much more focus',
    improvement: 'Social & Family Mindsets',
    theme: 'Shared parenting & paternity leave',
    comment: 'Families must stop treating girls as temporary guests and boys as entitled heirs; true equality begins in the home.',
    timestamp: '2026-11-21T09:05:00Z'
  },
  {
    id: 'demo-05',
    isDemo: true,
    age: '18–24',
    gender: 'Man',
    achieved: 'Partially',
    discrimination: 'Yes',
    career: 'Sometimes',
    household: 'Yes',
    stereotypes: 'Agree',
    education: 'Needs much more focus',
    improvement: 'Workplace & Pay Equity',
    theme: 'Equal pay audits & salary transparency',
    comment: 'Full transparency in corporate pay bands would eliminate hidden gender wage gaps once and for all.',
    timestamp: '2026-11-21T13:30:00Z'
  },
  {
    id: 'demo-06',
    isDemo: true,
    age: '25–34',
    gender: 'Woman',
    achieved: 'No',
    discrimination: 'Yes',
    career: 'No',
    household: 'Yes',
    stereotypes: 'Strongly agree',
    education: 'Needs much more focus',
    improvement: 'Leadership & Representation',
    theme: 'Dismantling daily microaggressions',
    comment: 'We need institutional quotas and mentorship networks to shatter executive glass ceilings in corporate boardrooms.',
    timestamp: '2026-11-21T16:45:00Z'
  },
  {
    id: 'demo-07',
    isDemo: true,
    age: '50+',
    gender: 'Man',
    achieved: 'Yes',
    discrimination: 'No',
    career: 'Yes',
    household: 'Yes',
    stereotypes: 'Neutral',
    education: 'Thoroughly discussed',
    improvement: 'Education & Sensitization',
    theme: 'Early school gender sensitization',
    comment: 'Encourage girls in STEM fields while teaching boys household chores without stigma or gender roles.',
    timestamp: '2026-11-22T08:12:00Z'
  },
  {
    id: 'demo-08',
    isDemo: true,
    age: '18–24',
    gender: 'Non-binary / Diverse',
    achieved: 'No',
    discrimination: 'Yes',
    career: 'No',
    household: 'Yes',
    stereotypes: 'Strongly agree',
    education: 'Not discussed at all',
    improvement: 'Social & Family Mindsets',
    theme: 'Dismantling daily microaggressions',
    comment: 'Gender equality must explicitly include trans, non-binary, and queer persons in legal protections and daily empathy.',
    timestamp: '2026-11-22T10:50:00Z'
  },
  {
    id: 'demo-09',
    isDemo: true,
    age: '25–34',
    gender: 'Woman',
    achieved: 'Partially',
    discrimination: 'Yes',
    career: 'Sometimes',
    household: 'Yes',
    stereotypes: 'Agree',
    education: 'Needs much more focus',
    improvement: 'Workplace & Pay Equity',
    theme: 'Equal pay audits & salary transparency',
    comment: 'Address maternal bias: women should not face career stalls simply because they decide to start a family.',
    timestamp: '2026-11-22T12:15:00Z'
  },
  {
    id: 'demo-10',
    isDemo: true,
    age: '35–49',
    gender: 'Man',
    achieved: 'Partially',
    discrimination: 'Yes',
    career: 'Sometimes',
    household: 'Yes',
    stereotypes: 'Agree',
    education: 'Needs much more focus',
    improvement: 'Safety & Legal Protection',
    theme: 'Shared parenting & paternity leave',
    comment: 'Men must speak out actively against sexism in private groups, not just post support on social media.',
    timestamp: '2026-11-22T14:00:00Z'
  },
  {
    id: 'demo-11',
    isDemo: true,
    age: '18–24',
    gender: 'Woman',
    achieved: 'No',
    discrimination: 'Yes',
    career: 'No',
    household: 'Yes',
    stereotypes: 'Strongly agree',
    education: 'Rarely discussed',
    improvement: 'Safety & Legal Protection',
    theme: 'Early school gender sensitization',
    comment: 'Real consequences for harassment, paired with comprehensive consent education in higher secondary institutions.',
    timestamp: '2026-11-22T15:25:00Z'
  },
  {
    id: 'demo-12',
    isDemo: true,
    age: '25–34',
    gender: 'Woman',
    achieved: 'No',
    discrimination: 'Yes',
    career: 'No',
    household: 'Yes',
    stereotypes: 'Strongly agree',
    education: 'Needs much more focus',
    improvement: 'Social & Family Mindsets',
    theme: 'Dismantling daily microaggressions',
    comment: 'Stop expecting women to shoulder 90% of domestic caregiving on top of their full-time professional jobs.',
    timestamp: '2026-11-22T17:10:00Z'
  },
  {
    id: 'demo-13',
    isDemo: true,
    age: '18–24',
    gender: 'Man',
    achieved: 'Partially',
    discrimination: 'Unsure',
    career: 'Sometimes',
    household: 'Yes',
    stereotypes: 'Agree',
    education: 'Needs much more focus',
    improvement: 'Education & Sensitization',
    theme: 'Early school gender sensitization',
    comment: 'Workshops for parents to dismantle generational biases about gender roles and daughter-in-law expectations.',
    timestamp: '2026-11-22T18:40:00Z'
  },
  {
    id: 'demo-14',
    isDemo: true,
    age: 'Under 18',
    gender: 'Woman',
    achieved: 'Partially',
    discrimination: 'Unsure',
    career: 'Sometimes',
    household: 'Depends',
    stereotypes: 'Agree',
    education: 'Needs much more focus',
    improvement: 'Leadership & Representation',
    theme: 'Early school gender sensitization',
    comment: 'See more women leading tech labs and government cabinets so young girls naturally see themselves as leaders.',
    timestamp: '2026-11-23T07:15:00Z'
  },
  {
    id: 'demo-15',
    isDemo: true,
    age: '35–49',
    gender: 'Man',
    achieved: 'Yes',
    discrimination: 'No',
    career: 'Yes',
    household: 'No',
    stereotypes: 'Neutral',
    education: 'Thoroughly discussed',
    improvement: 'Workplace & Pay Equity',
    theme: 'Equal pay audits & salary transparency',
    comment: 'Provide clear, merit-based metrics in all promotions regardless of background or gender.',
    timestamp: '2026-11-23T08:30:00Z'
  },
  {
    id: 'demo-16',
    isDemo: true,
    age: '25–34',
    gender: 'Woman',
    achieved: 'No',
    discrimination: 'No',
    career: 'Yes',
    household: 'Yes',
    stereotypes: 'Disagree',
    education: 'Needs much more focus',
    improvement: 'Safety & Legal Protection',
    theme: 'Dismantling daily microaggressions',
    comment: 'Zero tolerance for casual derogatory humor and gender slurs in college campuses and workspaces.',
    timestamp: '2026-11-23T09:10:00Z'
  }
];

// Active dataset loaded from storage or initialized
let currentDataset = [];

// Survey Wizard State
const TOTAL_STEPS = 10;
let currentStep = 1;
const surveyAnswers = {};

// Chart instances
let chartEqualityAchievedInstance = null;
let chartImprovementAreasInstance = null;
let chartCareerVsDomesticInstance = null;
let chartDiscriminationInstance = null;

/* ==========================================================================
   Dataset Storage Management
   ========================================================================== */
function loadDataset() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length >= 16) {
        currentDataset = parsed;
        return;
      }
    }
  } catch (err) {
    console.warn('Could not read survey dataset from localStorage:', err);
  }
  // Fallback to initial demonstration baseline
  currentDataset = JSON.parse(JSON.stringify(INITIAL_DEMO_DATA));
  saveDataset();
}

function saveDataset() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentDataset));
  } catch (err) {
    console.error('Failed to persist dataset to localStorage:', err);
  }
}

function resetToDefaultData() {
  if (confirm('Reset the dataset back to the baseline 16 demonstration participants? Any live browser submissions will be cleared.')) {
    currentDataset = JSON.parse(JSON.stringify(INITIAL_DEMO_DATA));
    saveDataset();
    updateDashboard();
    // Flash reset confirmation
    const notice = document.querySelector('.demo-data-notice');
    if (notice) {
      notice.style.transition = 'background-color 0.4s ease';
      notice.style.backgroundColor = '#E9C9CC';
      setTimeout(() => {
        notice.style.backgroundColor = '#FFFFFF';
      }, 600);
    }
  }
}

/* ==========================================================================
   Survey Wizard Engine
   ========================================================================== */
function initSurveyWizard() {
  const stepElements = document.querySelectorAll('.survey-step');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const nextBtnText = document.getElementById('nextBtnText');
  const nextBtnIcon = document.getElementById('nextBtnIcon');
  const alertEl = document.getElementById('surveyAlert');
  const stepperDots = document.getElementById('stepperDots');
  const charCountEl = document.getElementById('charCount');
  const textareaEl = document.getElementById('q10_text');
  const retakeBtn = document.getElementById('retakeSurveyBtn');

  // Generate stepper indicator dots
  if (stepperDots) {
    stepperDots.innerHTML = '';
    for (let i = 1; i <= TOTAL_STEPS; i++) {
      const dot = document.createElement('span');
      dot.className = `step-dot ${i === 1 ? 'active' : ''}`;
      dot.setAttribute('data-step-dot', i);
      stepperDots.appendChild(dot);
    }
  }

  // Setup custom card clicking & keyboard selection
  document.querySelectorAll('.option-card').forEach(card => {
    const radio = card.querySelector('input[type="radio"]');

    // Click on card
    card.addEventListener('click', (e) => {
      if (radio) {
        radio.checked = true;
        updateCardSelection(card);
        hideSurveyAlert();
      }
    });

    // Keyboard support: Enter / Space
    card.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (radio) {
          radio.checked = true;
          updateCardSelection(card);
          hideSurveyAlert();
        }
      }
    });
  });

  // Textarea character counter
  if (textareaEl && charCountEl) {
    textareaEl.addEventListener('input', () => {
      charCountEl.textContent = `${textareaEl.value.length} / 250`;
    });
  }

  // Next / Submit Button
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (validateCurrentStep()) {
        hideSurveyAlert();
        if (currentStep < TOTAL_STEPS) {
          goToStep(currentStep + 1);
        } else {
          submitSurvey();
        }
      }
    });
  }

  // Previous Button
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentStep > 1) {
        hideSurveyAlert();
        goToStep(currentStep - 1);
      }
    });
  }

  // Retake button
  if (retakeBtn) {
    retakeBtn.addEventListener('click', () => {
      resetSurveyForm();
    });
  }
}

function updateCardSelection(selectedCard) {
  const container = selectedCard.closest('.survey-step') || selectedCard.closest('.options-grid');
  if (!container) return;

  const radioName = selectedCard.querySelector('input[type="radio"]')?.name;
  if (!radioName) return;

  // Unselect siblings with the same radio name
  container.querySelectorAll(`input[name="${radioName}"]`).forEach(input => {
    const parent = input.closest('.option-card');
    if (parent) {
      parent.classList.remove('selected');
    }
  });

  selectedCard.classList.add('selected');
}

function validateCurrentStep() {
  const currentStepEl = document.querySelector(`.survey-step[data-step="${currentStep}"]`);
  if (!currentStepEl) return false;

  const alertEl = document.getElementById('surveyAlert');
  const alertText = document.getElementById('surveyAlertText');

  if (currentStep <= 9) {
    const checkedRadio = currentStepEl.querySelector('input[type="radio"]:checked');
    if (!checkedRadio) {
      if (alertEl && alertText) {
        alertText.textContent = 'Please choose an option to continue.';
        alertEl.classList.add('visible');
      }
      return false;
    }
    // Save answer
    surveyAnswers[`q${currentStep}`] = checkedRadio.value;
    return true;
  } else if (currentStep === 10) {
    const checkedTheme = currentStepEl.querySelector('input[name="q10_theme"]:checked');
    if (!checkedTheme) {
      if (alertEl && alertText) {
        alertText.textContent = 'Please select a core societal reform theme to complete your response.';
        alertEl.classList.add('visible');
      }
      return false;
    }
    surveyAnswers.q10_theme = checkedTheme.value;
    const writtenText = document.getElementById('q10_text')?.value.trim();
    surveyAnswers.q10_comment = writtenText || '';
    return true;
  }

  return true;
}

function hideSurveyAlert() {
  const alertEl = document.getElementById('surveyAlert');
  if (alertEl) {
    alertEl.classList.remove('visible');
  }
}

function goToStep(targetStep) {
  const stepElements = document.querySelectorAll('.survey-step');
  const prevStepEl = document.querySelector(`.survey-step[data-step="${currentStep}"]`);
  const nextStepEl = document.querySelector(`.survey-step[data-step="${targetStep}"]`);
  const prevBtn = document.getElementById('prevBtn');
  const nextBtnText = document.getElementById('nextBtnText');
  const nextBtnIcon = document.getElementById('nextBtnIcon');
  const badgeEl = document.getElementById('surveyStepBadge');
  const categoryPill = document.getElementById('surveyCategoryPill');
  const percentLabel = document.getElementById('surveyPercentLabel');
  const progressBar = document.getElementById('surveyProgressBar');

  if (!nextStepEl) return;

  if (prevStepEl) {
    prevStepEl.classList.remove('active');
  }
  nextStepEl.classList.add('active');

  currentStep = targetStep;

  // Update step indicators
  const stepPad = String(currentStep).padStart(2, '0');
  if (badgeEl) badgeEl.textContent = `Question ${stepPad} of ${TOTAL_STEPS}`;

  const category = nextStepEl.getAttribute('data-category') || 'Survey';
  if (categoryPill) categoryPill.textContent = category;

  const percent = Math.round((currentStep / TOTAL_STEPS) * 100);
  if (percentLabel) percentLabel.textContent = `${percent}% Completed`;
  if (progressBar) progressBar.style.width = `${percent}%`;

  // Update Stepper Dots
  document.querySelectorAll('.step-dot').forEach((dot, idx) => {
    const stepNum = idx + 1;
    dot.classList.remove('active', 'completed');
    if (stepNum === currentStep) {
      dot.classList.add('active');
    } else if (stepNum < currentStep) {
      dot.classList.add('completed');
    }
  });

  // Update previous button
  if (prevBtn) {
    prevBtn.disabled = currentStep === 1;
  }

  // Update Next Button label on step 10
  if (nextBtnText && nextBtnIcon) {
    if (currentStep === TOTAL_STEPS) {
      nextBtnText.textContent = 'Submit Response';
      nextBtnIcon.innerHTML = '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>';
    } else {
      nextBtnText.textContent = 'Continue';
      nextBtnIcon.innerHTML = '<path d="M5 12h14M12 5l7 7-7 7"/>';
    }
  }

  // Smooth scroll back to top of survey app card if on mobile
  const surveyApp = document.getElementById('surveyApp');
  if (surveyApp && window.innerWidth < 768) {
    surveyApp.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function submitSurvey() {
  // Construct new response record
  const newSubmission = {
    id: 'user-' + Date.now(),
    isDemo: false,
    age: surveyAnswers.q1 || '18–24',
    gender: surveyAnswers.q2 || 'Woman',
    achieved: surveyAnswers.q3 || 'Partially',
    discrimination: surveyAnswers.q4 || 'Yes',
    career: surveyAnswers.q5 || 'No',
    household: surveyAnswers.q6 || 'Yes',
    stereotypes: surveyAnswers.q7 || 'Strongly agree',
    education: surveyAnswers.q8 || 'Needs much more focus',
    improvement: surveyAnswers.q9 || 'Safety & Legal Protection',
    theme: surveyAnswers.q10_theme || 'Early school gender sensitization',
    comment: surveyAnswers.q10_comment || 'Promote genuine empathy, legal protection, and equal recognition across society.',
    timestamp: new Date().toISOString()
  };

  // Add to dataset and persist
  currentDataset.unshift(newSubmission);
  saveDataset();

  // Show celebration / confirmation card
  const formEl = document.getElementById('surveyForm');
  const completionEl = document.getElementById('surveyCompletion');
  if (formEl) formEl.style.display = 'none';
  if (completionEl) completionEl.style.display = 'block';

  // Recalculate & animate analytics dashboard!
  updateDashboard();
}

function resetSurveyForm() {
  currentStep = 1;
  for (const k in surveyAnswers) {
    delete surveyAnswers[k];
  }

  // Clear inputs and selection classes
  const formEl = document.getElementById('surveyForm');
  if (formEl) {
    formEl.reset();
    formEl.style.display = 'block';
  }
  document.querySelectorAll('.option-card').forEach(card => card.classList.remove('selected'));
  
  const charCountEl = document.getElementById('charCount');
  if (charCountEl) charCountEl.textContent = '0 / 250';

  const completionEl = document.getElementById('surveyCompletion');
  if (completionEl) completionEl.style.display = 'none';

  goToStep(1);
}

/* ==========================================================================
   Analytics Engine & Chart.js Visualizations
   ========================================================================== */
function updateDashboard() {
  const total = currentDataset.length;
  const liveCount = currentDataset.filter(d => !d.isDemo).length;

  // 1. Calculations for Top 4 Metric Cards
  // Metric 1: Total Participants
  animateCounter('statTotalParticipants', total);
  const liveCountEl = document.getElementById('statRealSubmissionsCount');
  if (liveCountEl) liveCountEl.textContent = String(liveCount);

  // Update total ref labels in context
  document.querySelectorAll('.stat-total-ref').forEach(el => {
    el.textContent = String(total);
  });

  // Metric 2: Witnessed discrimination (Yes count)
  const discYesCount = currentDataset.filter(d => d.discrimination === 'Yes').length;
  const discPercent = total > 0 ? ((discYesCount / total) * 100).toFixed(1) : '0.0';
  animateCounter('statDiscriminationPercent', parseFloat(discPercent));
  const discCountEl = document.getElementById('statDiscriminationCount');
  if (discCountEl) discCountEl.textContent = String(discYesCount);
  const discBar = document.getElementById('statDiscriminationBar');
  if (discBar) discBar.style.width = `${discPercent}%`;

  // Metric 3: Support equal household work (Yes count)
  const houseYesCount = currentDataset.filter(d => d.household === 'Yes').length;
  const housePercent = total > 0 ? ((houseYesCount / total) * 100).toFixed(1) : '0.0';
  animateCounter('statHouseholdPercent', parseFloat(housePercent));
  const houseCountEl = document.getElementById('statHouseholdCount');
  if (houseCountEl) houseCountEl.textContent = String(houseYesCount);
  const houseBar = document.getElementById('statHouseholdBar');
  if (houseBar) houseBar.style.width = `${housePercent}%`;

  // Metric 4: Equality gap in India (No + Partially count)
  const noOrPartiallyCount = currentDataset.filter(d => d.achieved === 'No' || d.achieved === 'Partially').length;
  const gapPercent = total > 0 ? ((noOrPartiallyCount / total) * 100).toFixed(1) : '0.0';
  animateCounter('statNotAchievedPercent', parseFloat(gapPercent));
  const gapCountEl = document.getElementById('statNoOrPartiallyCount');
  if (gapCountEl) gapCountEl.textContent = String(noOrPartiallyCount);
  const eqBar = document.getElementById('statEqualityBar');
  if (eqBar) eqBar.style.width = `${gapPercent}%`;

  // Dynamic Written Interpretations updates
  const achYesCount = currentDataset.filter(d => d.achieved === 'Yes').length;
  const achNoCount = currentDataset.filter(d => d.achieved === 'No').length;
  const achYesPct = total > 0 ? ((achYesCount / total) * 100).toFixed(1) : '0';
  const achNoPct = total > 0 ? ((achNoCount / total) * 100).toFixed(1) : '0';
  const interpAchYes = document.getElementById('interpretAchievedYes');
  const interpAchNo = document.getElementById('interpretAchievedNo');
  if (interpAchYes) interpAchYes.textContent = `${achYesPct}%`;
  if (interpAchNo) interpAchNo.textContent = `${achNoPct}%`;

  const carYesCount = currentDataset.filter(d => d.career === 'Yes').length;
  const carYesPct = total > 0 ? ((carYesCount / total) * 100).toFixed(1) : '0';
  const interpCareerYes = document.getElementById('interpretCareerYes');
  const interpHouseholdYes = document.getElementById('interpretHouseholdYes');
  if (interpCareerYes) interpCareerYes.textContent = `${carYesPct}%`;
  if (interpHouseholdYes) interpHouseholdYes.textContent = `${housePercent}%`;

  // 2. Render Charts
  renderChartEqualityAchieved();
  renderChartImprovementAreas();
  renderChartCareerVsDomestic();
  renderChartDiscrimination();

  // 3. Render Community Voices Cards
  renderCommunityVoices();
}

/**
 * Animated number counter utility
 */
function animateCounter(elementId, targetValue) {
  const el = document.getElementById(elementId);
  if (!el) return;

  const startValue = parseFloat(el.textContent) || 0;
  if (startValue === targetValue) return;

  const duration = 800; // ms
  const startTime = performance.now();
  const isFloat = String(targetValue).includes('.');

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Smooth ease-out curve
    const easeOutProgress = 1 - Math.pow(1 - progress, 3);
    const currentVal = startValue + (targetValue - startValue) * easeOutProgress;

    el.textContent = isFloat ? currentVal.toFixed(1) : Math.round(currentVal);

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = isFloat ? targetValue.toFixed(1) : targetValue;
    }
  }

  requestAnimationFrame(step);
}

/* ==========================================================================
   Chart 1: Perception of Gender Equality in India (Donut)
   ========================================================================== */
function renderChartEqualityAchieved() {
  const canvas = document.getElementById('chartEqualityAchieved');
  if (!canvas) return;

  const yesCount = currentDataset.filter(d => d.achieved === 'Yes').length;
  const noCount = currentDataset.filter(d => d.achieved === 'No').length;
  const partCount = currentDataset.filter(d => d.achieved === 'Partially').length;

  const dataValues = [yesCount, noCount, partCount];
  const labels = ['Yes (Achieved)', 'No (Not Achieved)', 'Partially'];

  if (chartEqualityAchievedInstance) {
    chartEqualityAchievedInstance.data.datasets[0].data = dataValues;
    chartEqualityAchievedInstance.update();
    return;
  }

  const ctx = canvas.getContext('2d');
  chartEqualityAchievedInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: dataValues,
        backgroundColor: [
          '#8F2635', // Primary Burgundy (Yes)
          '#30202F', // Deep Plum (No)
          '#E9C9CC'  // Dusty Rose (Partially)
        ],
        borderColor: '#FAF7F2',
        borderWidth: 3,
        hoverOffset: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '68%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: '600' },
            color: '#30202F',
            padding: 16,
            usePointStyle: true,
            pointStyle: 'circle'
          }
        },
        tooltip: {
          backgroundColor: '#30202F',
          titleFont: { family: "'DM Sans', sans-serif", size: 13, weight: '700' },
          bodyFont: { family: "'Manrope', sans-serif", size: 13 },
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            label: function(context) {
              const val = context.raw || 0;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const pct = total > 0 ? ((val / total) * 100).toFixed(1) : 0;
              return ` ${context.label}: ${val} respondents (${pct}%)`;
            }
          }
        }
      }
    }
  });
}

/* ==========================================================================
   Chart 2: Priority Areas Requiring Most Improvement (Horizontal Bar)
   ========================================================================== */
function renderChartImprovementAreas() {
  const canvas = document.getElementById('chartImprovementAreas');
  if (!canvas) return;

  const categories = [
    'Safety & Legal Protection',
    'Workplace & Pay Equity',
    'Social & Family Mindsets',
    'Leadership & Representation',
    'Education & Sensitization'
  ];

  const counts = categories.map(cat => {
    return currentDataset.filter(d => d.improvement === cat).length;
  });

  if (chartImprovementAreasInstance) {
    chartImprovementAreasInstance.data.datasets[0].data = counts;
    chartImprovementAreasInstance.update();
    return;
  }

  const ctx = canvas.getContext('2d');
  chartImprovementAreasInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: categories,
      datasets: [{
        label: 'Participant Priority Votes',
        data: counts,
        backgroundColor: [
          '#E5243B', // SDG Red
          '#8F2635', // Burgundy
          '#30202F', // Deep Plum
          '#D2C3E5', // Lavender tint
          '#E9C9CC'  // Dusty Rose
        ],
        borderRadius: 6,
        barThickness: 20
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#30202F',
          titleFont: { family: "'DM Sans', sans-serif", size: 13 },
          bodyFont: { family: "'Manrope', sans-serif", size: 13 },
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            label: function(context) {
              const total = currentDataset.length;
              const val = context.raw || 0;
              const pct = total > 0 ? ((val / total) * 100).toFixed(1) : 0;
              return ` ${val} selections (${pct}%)`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(230, 223, 214, 0.6)' },
          ticks: {
            font: { family: "'Manrope', sans-serif", size: 11, weight: '600' },
            color: '#77716F',
            stepSize: 2
          }
        },
        y: {
          grid: { display: false },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: '600' },
            color: '#30202F'
          }
        }
      }
    }
  });
}

/* ==========================================================================
   Chart 3: Career Opportunities vs Domestic Labor Perception (Comparative)
   ========================================================================== */
function renderChartCareerVsDomestic() {
  const canvas = document.getElementById('chartCareerVsDomestic');
  if (!canvas) return;

  // Career: Yes (3), No (7), Sometimes (6)
  const careerYes = currentDataset.filter(d => d.career === 'Yes').length;
  const careerNo = currentDataset.filter(d => d.career === 'No').length;
  const careerMid = currentDataset.filter(d => d.career === 'Sometimes').length;

  // Household: Yes (14), No (1), Depends (1)
  const houseYes = currentDataset.filter(d => d.household === 'Yes').length;
  const houseNo = currentDataset.filter(d => d.household === 'No').length;
  const houseMid = currentDataset.filter(d => d.household === 'Depends').length;

  const dataCareer = [careerYes, careerMid, careerNo];
  const dataHousehold = [houseYes, houseMid, houseNo];

  if (chartCareerVsDomesticInstance) {
    chartCareerVsDomesticInstance.data.datasets[0].data = dataCareer;
    chartCareerVsDomesticInstance.data.datasets[1].data = dataHousehold;
    chartCareerVsDomesticInstance.update();
    return;
  }

  const ctx = canvas.getContext('2d');
  chartCareerVsDomesticInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Affirmative / Equal', 'Conditional / Sometimes', 'Negative / Inequitable'],
      datasets: [
        {
          label: 'Equal Career Opportunities (Q05)',
          data: dataCareer,
          backgroundColor: '#8F2635',
          borderRadius: 6,
          barPercentage: 0.7,
          categoryPercentage: 0.7
        },
        {
          label: 'Equal Household Work Support (Q06)',
          data: dataHousehold,
          backgroundColor: '#E9C9CC',
          borderColor: '#8F2635',
          borderWidth: 1.5,
          borderRadius: 6,
          barPercentage: 0.7,
          categoryPercentage: 0.7
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: '600' },
            color: '#30202F',
            padding: 16,
            usePointStyle: true
          }
        },
        tooltip: {
          backgroundColor: '#30202F',
          titleFont: { family: "'DM Sans', sans-serif", size: 13 },
          bodyFont: { family: "'Manrope', sans-serif", size: 13 },
          padding: 12,
          cornerRadius: 8
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            font: { family: "'DM Sans', sans-serif", size: 11, weight: '600' },
            color: '#30202F'
          }
        },
        y: {
          grid: { color: 'rgba(230, 223, 214, 0.6)' },
          ticks: {
            font: { family: "'Manrope', sans-serif", size: 11, weight: '600' },
            color: '#77716F',
            stepSize: 3
          }
        }
      }
    }
  });
}

/* ==========================================================================
   Chart 4: Witnessed Discrimination (Doughnut / Polar)
   ========================================================================== */
function renderChartDiscrimination() {
  const canvas = document.getElementById('chartDiscrimination');
  if (!canvas) return;

  const yesCount = currentDataset.filter(d => d.discrimination === 'Yes').length;
  const noCount = currentDataset.filter(d => d.discrimination === 'No').length;
  const unsureCount = currentDataset.filter(d => d.discrimination === 'Unsure').length;

  const dataValues = [yesCount, noCount, unsureCount];
  const labels = ['Witnessed (Yes)', 'Not Witnessed (No)', 'Ambiguous / Unsure'];

  if (chartDiscriminationInstance) {
    chartDiscriminationInstance.data.datasets[0].data = dataValues;
    chartDiscriminationInstance.update();
    return;
  }

  const ctx = canvas.getContext('2d');
  chartDiscriminationInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: dataValues,
        backgroundColor: [
          '#E5243B', // SDG Red (Witnessed)
          '#E9E3F2', // Lavender (No)
          '#30202F'  // Deep Plum (Unsure)
        ],
        borderColor: '#FAF7F2',
        borderWidth: 3,
        hoverOffset: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '64%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: { family: "'DM Sans', sans-serif", size: 12, weight: '600' },
            color: '#30202F',
            padding: 16,
            usePointStyle: true,
            pointStyle: 'circle'
          }
        },
        tooltip: {
          backgroundColor: '#30202F',
          titleFont: { family: "'DM Sans', sans-serif", size: 13, weight: '700' },
          bodyFont: { family: "'Manrope', sans-serif", size: 13 },
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            label: function(context) {
              const val = context.raw || 0;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const pct = total > 0 ? ((val / total) * 100).toFixed(1) : 0;
              return ` ${context.label}: ${val} respondents (${pct}%)`;
            }
          }
        }
      }
    }
  });
}

/* ==========================================================================
   Qualitative Voices Feed (Question 10 Submissions)
   ========================================================================== */
function renderCommunityVoices() {
  const container = document.getElementById('voicesGrid');
  const countBadge = document.getElementById('voicesCountBadge');
  if (!container) return;

  if (countBadge) {
    countBadge.textContent = `${currentDataset.length} Reflections`;
  }

  // Display top 6 responses (user submissions at top, followed by demo quotes)
  const itemsToShow = currentDataset.slice(0, 6);

  container.innerHTML = itemsToShow.map(item => {
    const isLive = !item.isDemo;
    const badgeLabel = isLive ? '★ Live Submission' : 'Demo Participant';
    const tag = item.theme || 'Societal Reform';
    const quote = item.comment ? escapeHtml(item.comment) : 'Encourage equality, active dialogue, and shared responsibility.';
    const cohort = `${escapeHtml(item.gender)}, ${escapeHtml(item.age)}`;

    return `
      <div class="voice-card ${isLive ? 'is-live' : ''}">
        <span class="voice-theme-tag">${escapeHtml(tag)}</span>
        <blockquote class="voice-quote">&ldquo;${quote}&rdquo;</blockquote>
        <div class="voice-footer">
          <span>${cohort}</span>
          <span>${badgeLabel}</span>
        </div>
      </div>
    `;
  }).join('');
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* ==========================================================================
   Navigation, Header Scroll & General Polish
   ========================================================================== */
function initNavigation() {
  const header = document.getElementById('site-header');
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const currentYearEl = document.getElementById('currentYear');

  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  // Sticky header background and shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
    highlightActiveNav();
  }, { passive: true });

  // Mobile menu toggle
  if (mobileBtn && mobileNav) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = mobileNav.classList.contains('open');
      if (isOpen) {
        mobileNav.classList.remove('open');
        mobileNav.setAttribute('aria-hidden', 'true');
        mobileBtn.setAttribute('aria-expanded', 'false');
      } else {
        mobileNav.classList.add('open');
        mobileNav.setAttribute('aria-hidden', 'false');
        mobileBtn.setAttribute('aria-expanded', 'true');
      }
    });

    // Close mobile nav when clicking a link
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        mobileNav.setAttribute('aria-hidden', 'true');
        mobileBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Reset Demo button
  const resetBtn = document.getElementById('resetDemoBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', resetToDefaultData);
  }
}

function highlightActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 120;
    const sectionId = current.getAttribute('id');
    const navLink = document.querySelector(`.desktop-nav a[href*="${sectionId}"]`);

    if (navLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink.classList.add('active');
      } else {
        navLink.classList.remove('active');
      }
    }
  });
}

/* ==========================================================================
   App Bootstrap
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  loadDataset();
  initSurveyWizard();
  initNavigation();
  updateDashboard();
});
