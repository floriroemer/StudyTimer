const DEFAULT_PREFERENCES = {
  language: 'en',
  durations: {
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60
  },
  countedModes: {
    focus: true,
    shortBreak: false,
    longBreak: false
  }
};

const COPY = {
  en: {
    brandEyebrow: 'Adaptive focus timer',
    systemTimeLabel: 'System time',
    settingsButton: 'Settings',
    settingsEyebrow: 'Settings',
    settingsTitle: 'Session setup',
    languageLabel: 'Language',
    focus: 'Focus',
    shortBreak: 'Short break',
    longBreak: 'Long break',
    currentMode: 'Current mode',
    nextPrefix: 'Next:',
    start: 'Start',
    pause: 'Pause',
    reset: 'Reset',
    modesEyebrow: 'Modes',
    modesTitle: 'Jump between sessions',
    sessions: 'Sessions',
    countAsSession: 'Count these modes as sessions',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds',
    settingsNote: 'Changes are saved instantly and used for the next session.',
    readyCaption: 'Ready for your next focus block.',
    runningCaption: 'Stay locked in. You are in a focus streak.',
    nextBlock: 'Next block:',
    focusFinishedTitle: 'Focus session complete',
    breakFinishedTitle: 'Break complete',
    focusFinishedBody: 'Time for {mode}.',
    breakFinishedBody: 'Time to jump back into focus.'
  },
  de: {
    brandEyebrow: 'Adaptiver Fokus-Timer',
    systemTimeLabel: 'Systemzeit',
    settingsButton: 'Einstellungen',
    settingsEyebrow: 'Einstellungen',
    settingsTitle: 'Session-Setup',
    languageLabel: 'Sprache',
    focus: 'Lernen',
    shortBreak: 'Kurze Pause',
    longBreak: 'Lange Pause',
    currentMode: 'Aktueller Modus',
    nextPrefix: 'Danach:',
    start: 'Start',
    pause: 'Pause',
    reset: 'Reset',
    modesEyebrow: 'Modi',
    modesTitle: 'Direkt zwischen Sessions wechseln',
    sessions: 'Sessions',
    countAsSession: 'Diese Modi als Session zaehlen',
    hours: 'Stunden',
    minutes: 'Minuten',
    seconds: 'Sekunden',
    settingsNote: 'Aenderungen werden sofort gespeichert und fuer die naechste Session verwendet.',
    readyCaption: 'Bereit fuer deinen naechsten Fokusblock.',
    runningCaption: 'Bleib dran. Du bist im Fokus.',
    nextBlock: 'Naechster Block:',
    focusFinishedTitle: 'Lerneinheit beendet',
    breakFinishedTitle: 'Pause beendet',
    focusFinishedBody: 'Zeit fuer {mode}.',
    breakFinishedBody: 'Zeit fuer die naechste Lerneinheit.'
  }
};

const MODE_COLORS = {
  focus: '#58e6b0',
  shortBreak: '#5ca6ff',
  longBreak: '#ff9b66'
};

const STORAGE_KEY = 'study-timer-settings';
const LONG_BREAK_FOCUS_CYCLE = 4;

const elements = {
  appShell: document.querySelector('.app-shell'),
  brandEyebrow: document.getElementById('brand-eyebrow'),
  systemTimeLabel: document.getElementById('system-time-label'),
  systemTime: document.getElementById('system-time'),
  modeTitle: document.getElementById('mode-title'),
  modeEyebrow: document.getElementById('mode-eyebrow'),
  timerDisplay: document.getElementById('timer-display'),
  timerCaption: document.getElementById('timer-caption'),
  sessionCounter: document.getElementById('session-counter'),
  sessionMinusButton: document.getElementById('session-minus-button'),
  sessionPlusButton: document.getElementById('session-plus-button'),
  nextChip: document.getElementById('next-chip'),
  timerRing: document.getElementById('timer-ring'),
  startPauseButton: document.getElementById('start-pause-button'),
  resetButton: document.getElementById('reset-button'),
  settingsToggleButton: document.getElementById('settings-toggle-button'),
  settingsButtonLabel: document.getElementById('settings-button-label'),
  settingsPopover: document.getElementById('settings-popover'),
  settingsEyebrow: document.getElementById('settings-eyebrow'),
  settingsTitle: document.getElementById('settings-title'),
  settingsNote: document.getElementById('settings-note'),
  languageLabel: document.getElementById('language-label'),
  countedSessionsLabel: document.getElementById('counted-sessions-label'),
  languageSelect: document.getElementById('language-select'),
  modesEyebrow: document.getElementById('modes-eyebrow'),
  modesTitle: document.getElementById('modes-title'),
  focusSettingsLabel: document.getElementById('focus-settings-label'),
  shortSettingsLabel: document.getElementById('short-settings-label'),
  longSettingsLabel: document.getElementById('long-settings-label'),
  countFocusLabel: document.getElementById('count-focus-label'),
  countShortLabel: document.getElementById('count-short-label'),
  countLongLabel: document.getElementById('count-long-label'),
  focusDurationPreview: document.getElementById('focus-duration-preview'),
  shortBreakDurationPreview: document.getElementById('shortBreak-duration-preview'),
  longBreakDurationPreview: document.getElementById('longBreak-duration-preview'),
  minimizeButton: document.getElementById('minimize-button'),
  maximizeButton: document.getElementById('maximize-button'),
  closeButton: document.getElementById('close-button'),
  modeButtons: Array.from(document.querySelectorAll('.mode-button')),
  timeInputs: Array.from(document.querySelectorAll('.time-field input')),
  countedModeCheckboxes: Array.from(document.querySelectorAll('.checkbox-field input')),
  unitLabels: {
    focus: {
      hours: document.getElementById('hours-label-focus'),
      minutes: document.getElementById('minutes-label-focus'),
      seconds: document.getElementById('seconds-label-focus')
    },
    shortBreak: {
      hours: document.getElementById('hours-label-short'),
      minutes: document.getElementById('minutes-label-short'),
      seconds: document.getElementById('seconds-label-short')
    },
    longBreak: {
      hours: document.getElementById('hours-label-long'),
      minutes: document.getElementById('minutes-label-long'),
      seconds: document.getElementById('seconds-label-long')
    }
  },
  durationInputs: {
    focus: {
      hours: document.getElementById('focus-hours'),
      minutes: document.getElementById('focus-minutes'),
      seconds: document.getElementById('focus-seconds')
    },
    shortBreak: {
      hours: document.getElementById('shortBreak-hours'),
      minutes: document.getElementById('shortBreak-minutes'),
      seconds: document.getElementById('shortBreak-seconds')
    },
    longBreak: {
      hours: document.getElementById('longBreak-hours'),
      minutes: document.getElementById('longBreak-minutes'),
      seconds: document.getElementById('longBreak-seconds')
    }
  },
  countedModeInputs: {
    focus: document.getElementById('count-focus-checkbox'),
    shortBreak: document.getElementById('count-shortBreak-checkbox'),
    longBreak: document.getElementById('count-longBreak-checkbox')
  }
};

const preferences = readPreferences();

const state = {
  language: preferences.language,
  durations: preferences.durations,
  countedModes: preferences.countedModes,
  currentMode: 'focus',
  remainingSeconds: preferences.durations.focus,
  totalSeconds: preferences.durations.focus,
  isRunning: false,
  timerEndsAt: null,
  completedSessions: 0,
  completedFocusSessions: 0,
  intervalId: null,
  clockIntervalId: null,
  isSettingsOpen: false,
  isMaximized: false
};

hydrateInputs();
bindEvents();
startSystemClock();
render();

function bindEvents() {
  elements.startPauseButton.addEventListener('click', toggleTimer);
  elements.resetButton.addEventListener('click', resetAll);
  elements.sessionMinusButton.addEventListener('click', () => adjustSessionCount(-1));
  elements.sessionPlusButton.addEventListener('click', () => adjustSessionCount(1));
  elements.settingsToggleButton.addEventListener('click', toggleSettingsPopover);
  elements.languageSelect.addEventListener('change', handleLanguageChange);
  elements.minimizeButton.addEventListener('click', () => window.studyTimerApi?.minimizeWindow());
  elements.maximizeButton.addEventListener('click', async () => {
    const isMaximized = await window.studyTimerApi?.toggleMaximizeWindow();
    state.isMaximized = Boolean(isMaximized);
    updateMaximizeGlyph();
  });
  elements.closeButton.addEventListener('click', () => window.studyTimerApi?.closeWindow());

  elements.modeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      selectMode(button.dataset.mode, true);
    });
  });

  elements.timeInputs.forEach((input) => {
    input.addEventListener('input', () => {
      updateDuration(input.dataset.mode);
    });
  });

  elements.countedModeCheckboxes.forEach((input) => {
    input.addEventListener('change', () => {
      updateCountedMode(input.dataset.mode, input.checked);
    });
  });

  document.addEventListener('click', handleDocumentClick);

  if (window.studyTimerApi?.onWindowStateChange) {
    window.studyTimerApi.onWindowStateChange((value) => {
      state.isMaximized = Boolean(value?.isMaximized);
      updateMaximizeGlyph();
    });
  }

  window.addEventListener('beforeunload', () => {
    stopInterval();
    stopSystemClock();
  });
}

function readPreferences() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return structuredClone(DEFAULT_PREFERENCES);
    }

    const parsed = JSON.parse(raw);
    return {
      language: parsed.language === 'de' ? 'de' : 'en',
      durations: {
        focus: sanitizeSeconds(parsed?.durations?.focus, DEFAULT_PREFERENCES.durations.focus),
        shortBreak: sanitizeSeconds(parsed?.durations?.shortBreak, DEFAULT_PREFERENCES.durations.shortBreak),
        longBreak: sanitizeSeconds(parsed?.durations?.longBreak, DEFAULT_PREFERENCES.durations.longBreak)
      },
      countedModes: {
        focus: parsed?.countedModes?.focus !== false,
        shortBreak: Boolean(parsed?.countedModes?.shortBreak),
        longBreak: Boolean(parsed?.countedModes?.longBreak)
      }
    };
  } catch {
    return structuredClone(DEFAULT_PREFERENCES);
  }
}

function hydrateInputs() {
  elements.languageSelect.value = state.language;

  Object.entries(elements.durationInputs).forEach(([mode, inputs]) => {
    const durationParts = splitDuration(state.durations[mode]);
    inputs.hours.value = String(durationParts.hours);
    inputs.minutes.value = String(durationParts.minutes);
    inputs.seconds.value = String(durationParts.seconds);
  });

  Object.entries(elements.countedModeInputs).forEach(([mode, input]) => {
    input.checked = state.countedModes[mode];
  });
}

function sanitizeSeconds(value, fallback) {
  const parsed = Number.parseInt(String(value), 10);
  if (Number.isNaN(parsed)) {
    return fallback;
  }

  return Math.min(99 * 3600 + 59 * 60 + 59, Math.max(1, parsed));
}

function splitDuration(totalSeconds) {
  const clamped = sanitizeSeconds(totalSeconds, 1);
  const hours = Math.floor(clamped / 3600);
  const minutes = Math.floor((clamped % 3600) / 60);
  const seconds = clamped % 60;

  return { hours, minutes, seconds };
}

function updateDuration(mode) {
  const inputs = elements.durationInputs[mode];
  const hours = clampNumber(inputs.hours.value, 0, 99);
  const minutes = clampNumber(inputs.minutes.value, 0, 59);
  const seconds = clampNumber(inputs.seconds.value, 0, 59);
  let totalSeconds = hours * 3600 + minutes * 60 + seconds;

  if (totalSeconds === 0) {
    totalSeconds = 1;
  }

  state.durations[mode] = totalSeconds;
  writePreferences();

  const normalized = splitDuration(totalSeconds);
  inputs.hours.value = String(normalized.hours);
  inputs.minutes.value = String(normalized.minutes);
  inputs.seconds.value = String(normalized.seconds);

  refreshModeLabels();

  if (!state.isRunning && state.currentMode === mode) {
    syncCurrentModeDuration();
  }

  render();
}

function syncCurrentModeDuration() {
  const durationSeconds = state.durations[state.currentMode];
  state.totalSeconds = durationSeconds;
  state.remainingSeconds = durationSeconds;
}

function selectMode(mode, shouldStopTimer) {
  if (!COPY.en[mode]) {
    return;
  }

  if (shouldStopTimer) {
    stopInterval();
    state.isRunning = false;
  }

  state.currentMode = mode;
  syncCurrentModeDuration();
  render();
}

function toggleSettingsPopover() {
  state.isSettingsOpen = !state.isSettingsOpen;
  elements.settingsPopover.classList.toggle('hidden', !state.isSettingsOpen);
}

function adjustSessionCount(delta) {
  state.completedSessions = Math.max(0, state.completedSessions + delta);
  render();
}

function updateCountedMode(mode, isChecked) {
  state.countedModes[mode] = Boolean(isChecked);
  writePreferences();
  render();
}

function handleDocumentClick(event) {
  if (!state.isSettingsOpen) {
    return;
  }

  const clickedInsidePopover = elements.settingsPopover.contains(event.target);
  const clickedToggle = elements.settingsToggleButton.contains(event.target);

  if (!clickedInsidePopover && !clickedToggle) {
    state.isSettingsOpen = false;
    elements.settingsPopover.classList.add('hidden');
  }
}

function handleLanguageChange() {
  state.language = elements.languageSelect.value === 'de' ? 'de' : 'en';
  writePreferences();
  render();
}

function toggleTimer() {
  if (state.isRunning) {
    pauseTimer();
    return;
  }

  startTimer();
}

function startTimer() {
  state.isRunning = true;
  state.timerEndsAt = Date.now() + state.remainingSeconds * 1000;
  stopInterval();
  state.intervalId = window.setInterval(tick, 250);
  render();
}

function pauseTimer() {
  if (!state.timerEndsAt) {
    return;
  }

  state.remainingSeconds = Math.max(0, Math.ceil((state.timerEndsAt - Date.now()) / 1000));
  state.isRunning = false;
  state.timerEndsAt = null;
  stopInterval();
  render();
}

function resetAll() {
  stopInterval();
  state.isRunning = false;
  state.timerEndsAt = null;
  state.completedSessions = 0;
  state.completedFocusSessions = 0;
  state.currentMode = 'focus';
  syncCurrentModeDuration();
  render();
}

function tick() {
  const remaining = Math.max(0, Math.ceil((state.timerEndsAt - Date.now()) / 1000));
  state.remainingSeconds = remaining;

  if (remaining === 0) {
    handleTimerComplete();
    return;
  }

  render();
}

async function handleTimerComplete() {
  stopInterval();
  state.isRunning = false;
  state.timerEndsAt = null;

  const finishedMode = state.currentMode;

  if (finishedMode === 'focus') {
    state.completedFocusSessions += 1;
  }

  if (state.countedModes[finishedMode]) {
    state.completedSessions += 1;
  }

  const nextMode = getNextMode(finishedMode, state.completedFocusSessions);
  state.currentMode = nextMode;
  syncCurrentModeDuration();

  const copy = getCopy();
  const title = finishedMode === 'focus' ? copy.focusFinishedTitle : copy.breakFinishedTitle;
  const body = finishedMode === 'focus'
    ? copy.focusFinishedBody.replace('{mode}', getModeLabel(nextMode).toLowerCase())
    : copy.breakFinishedBody;

  render();

  if (window.studyTimerApi?.notifyTimerComplete) {
    await window.studyTimerApi.notifyTimerComplete({ title, body });
  }
}

function getNextMode(finishedMode, completedFocusSessions) {
  if (finishedMode === 'focus') {
    return completedFocusSessions % LONG_BREAK_FOCUS_CYCLE === 0 ? 'longBreak' : 'shortBreak';
  }

  return 'focus';
}

function stopInterval() {
  if (state.intervalId) {
    window.clearInterval(state.intervalId);
    state.intervalId = null;
  }
}

function startSystemClock() {
  updateSystemTime();
  stopSystemClock();
  state.clockIntervalId = window.setInterval(updateSystemTime, 1000);
}

function stopSystemClock() {
  if (state.clockIntervalId) {
    window.clearInterval(state.clockIntervalId);
    state.clockIntervalId = null;
  }
}

function updateSystemTime() {
  const formatter = new Intl.DateTimeFormat(state.language === 'de' ? 'de-DE' : 'en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  elements.systemTime.textContent = formatter.format(new Date());
}

function writePreferences() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
    language: state.language,
    durations: state.durations,
    countedModes: state.countedModes
  }));
}

function clampNumber(value, min, max) {
  const parsed = Number.parseInt(String(value), 10);

  if (Number.isNaN(parsed)) {
    return min;
  }

  return Math.min(max, Math.max(min, parsed));
}

function getCopy() {
  return COPY[state.language];
}

function getModeLabel(mode) {
  return getCopy()[mode];
}

function formatTimer(totalSeconds) {
  const { hours, minutes, seconds } = splitDuration(totalSeconds);
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function formatDurationPreview(totalSeconds) {
  const { hours, minutes, seconds } = splitDuration(totalSeconds);
  return `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;
}

function refreshModeLabels() {
  elements.modeButtons.forEach((button) => {
    const mode = button.dataset.mode;
    button.querySelector('.mode-button-label').textContent = getModeLabel(mode);
    button.querySelector('strong').textContent = formatDurationPreview(state.durations[mode]);
  });

  elements.focusDurationPreview.textContent = formatDurationPreview(state.durations.focus);
  elements.shortBreakDurationPreview.textContent = formatDurationPreview(state.durations.shortBreak);
  elements.longBreakDurationPreview.textContent = formatDurationPreview(state.durations.longBreak);
}

function updateMaximizeGlyph() {
  elements.maximizeButton.textContent = state.isMaximized ? '❐' : '□';
}

function renderTranslations() {
  const copy = getCopy();

  elements.brandEyebrow.textContent = copy.brandEyebrow;
  elements.systemTimeLabel.textContent = copy.systemTimeLabel;
  elements.settingsButtonLabel.textContent = copy.settingsButton;
  elements.settingsEyebrow.textContent = copy.settingsEyebrow;
  elements.settingsTitle.textContent = copy.settingsTitle;
  elements.languageLabel.textContent = copy.languageLabel;
  elements.countedSessionsLabel.textContent = copy.countAsSession;
  elements.modeEyebrow.textContent = copy.currentMode;
  elements.modesEyebrow.textContent = copy.modesEyebrow;
  elements.modesTitle.textContent = copy.modesTitle;
  elements.focusSettingsLabel.textContent = copy.focus;
  elements.shortSettingsLabel.textContent = copy.shortBreak;
  elements.longSettingsLabel.textContent = copy.longBreak;
  elements.countFocusLabel.textContent = copy.focus;
  elements.countShortLabel.textContent = copy.shortBreak;
  elements.countLongLabel.textContent = copy.longBreak;
  elements.settingsNote.textContent = copy.settingsNote;
  elements.resetButton.textContent = copy.reset;

  Object.values(elements.unitLabels).forEach((labels) => {
    labels.hours.textContent = copy.hours;
    labels.minutes.textContent = copy.minutes;
    labels.seconds.textContent = copy.seconds;
  });

  updateSystemTime();
}

function render() {
  const copy = getCopy();
  const progress = state.totalSeconds === 0 ? 0 : state.remainingSeconds / state.totalSeconds;
  const progressAngle = `${Math.max(progress * 360, 0)}deg`;
  const nextMode = state.isRunning ? state.currentMode : getNextMode(state.currentMode, state.completedFocusSessions || 0);

  renderTranslations();

  elements.modeTitle.textContent = getModeLabel(state.currentMode);
  elements.timerDisplay.textContent = formatTimer(state.remainingSeconds);
  elements.timerCaption.textContent = state.isRunning
    ? copy.runningCaption
    : `${copy.nextBlock} ${getModeLabel(state.currentMode)}`;
  elements.sessionCounter.textContent = `${state.completedSessions} ${copy.sessions}`;
  elements.nextChip.textContent = `${copy.nextPrefix} ${getModeLabel(nextMode)}`;
  elements.startPauseButton.textContent = state.isRunning ? copy.pause : copy.start;
  elements.timerRing.style.background = `conic-gradient(${MODE_COLORS[state.currentMode]} ${progressAngle}, rgba(255, 255, 255, 0.07) 0deg)`;
  elements.timerRing.style.setProperty('--ring-color', MODE_COLORS[state.currentMode]);
  elements.appShell.dataset.language = state.language;
  elements.languageSelect.value = state.language;
  Object.entries(elements.countedModeInputs).forEach(([mode, input]) => {
    input.checked = state.countedModes[mode];
  });

  elements.modeButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.mode === state.currentMode);
  });

  refreshModeLabels();
  updateMaximizeGlyph();
}