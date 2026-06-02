const NAV_SECTIONS = [
  { id:'00', label:'종합 현황' },
  { id:'01', label:'진료과목별 문의·예약' },
  { id:'02', label:'채널별 문의·예약' },
  { id:'03', label:'내원 현황' },
  { id:'04', label:'성사 현황' },
  { id:'05', label:'유입경로 분석' },
  { id:'06', label:'원장별 성사율' },
  { id:'07', label:'직원별 성사율' },
  { id:'08', label:'매출 현황' },
  { id:'09', label:'종합 리뷰' },
];

/* 데이터 파일 목록 — 새 파일 추가 시 여기에만 추가 */
const REPORT_FILES = [
  { label:'2026년 5월 (월간)', file:'data/2026-05-monthly.js' },
  { label:'2026년 4월 (월간)', file:'data/2026-04-monthly.js' },
];

function buildNav(currentSection) {
  const nav = document.getElementById('top-nav');
  if (!nav) return;
  nav.innerHTML = `<img src="assets/logo.png" class="nav-logo" alt="뉴헤어"><div class="nav-divider"></div>`;
  NAV_SECTIONS.forEach(s => {
    const a = document.createElement('a');
    a.href = '#';
    a.textContent = s.id + ' ' + s.label;
    a.dataset.section = s.id;
    if (s.id === currentSection) a.classList.add('active');
    a.addEventListener('click', e => {
      e.preventDefault();
      switchSection(s.id);
    });
    nav.appendChild(a);
  });
}

function buildSectionTabs(currentSection) {
  const wrap = document.getElementById('section-tabs');
  if (!wrap) return;
  wrap.innerHTML = '';
  NAV_SECTIONS.forEach(s => {
    const a = document.createElement('a');
    a.href = '#';
    a.textContent = s.id + ' ' + s.label;
    if (s.id === currentSection) a.classList.add('active');
    a.addEventListener('click', e => { e.preventDefault(); switchSection(s.id); });
    wrap.appendChild(a);
  });
}

function buildReportSelector() {
  const sel = document.getElementById('report-select');
  if (!sel) return;
  REPORT_FILES.forEach(r => {
    const opt = document.createElement('option');
    opt.value = r.file;
    opt.textContent = r.label;
    sel.appendChild(opt);
  });
  sel.addEventListener('change', () => loadReport(sel.value));
}

function switchSection(id) {
  document.querySelectorAll('.section-panel').forEach(p => p.classList.remove('active'));
  const panel = document.getElementById('section-' + id);
  if (panel) panel.classList.add('active');
  document.querySelectorAll('#top-nav a[data-section]').forEach(a => {
    a.classList.toggle('active', a.dataset.section === id);
  });
  document.querySelectorAll('#section-tabs a').forEach(a => {
    a.classList.toggle('active', a.textContent.startsWith(id));
  });
}

function checkAuth() {
  const role = sessionStorage.getItem('nh_role');
  if (!role) {
    sessionStorage.setItem('nh_redirect', location.href);
    location.href = 'login.html';
    return false;
  }
  return role;
}
