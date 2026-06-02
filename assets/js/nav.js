const NAV_ITEMS = [
  { id: '00', label: '종합 현황', file: 'index.html' },
  { id: '01', label: '진료과목별 문의·예약', file: 'section01.html' },
  { id: '02', label: '채널별 문의·예약', file: 'section02.html' },
  { id: '03', label: '내원 현황', file: 'section03.html' },
  { id: '04', label: '성사 현황', file: 'section04.html' },
  { id: '05', label: '유입경로 분석', file: 'section05.html' },
  { id: '06', label: '원장별 성사율', file: 'section06.html' },
  { id: '07', label: '직원별 성사율', file: 'section07.html' },
  { id: '08', label: '매출 현황', file: 'section08.html' },
  { id: '09', label: '종합 리뷰', file: 'section09.html' },
];

function buildNav(currentFile) {
  const nav = document.getElementById('top-nav');
  if (!nav) return;
  nav.innerHTML = `<span class="nav-title">뉴헤어 보고서</span><div class="nav-divider"></div>`;
  NAV_ITEMS.forEach(item => {
    const a = document.createElement('a');
    a.href = item.file;
    a.textContent = item.id + ' ' + item.label;
    if (item.file === currentFile) a.classList.add('active');
    nav.appendChild(a);
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
