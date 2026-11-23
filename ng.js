(() => {
  'use strict';
  const data = window.PORTAL_DATA;
  if (!data || !Array.isArray(data.branches)) return;
  const $ = id => document.getElementById(id);
  const driveUrl = id => `https://drive.google.com/drive/folders/${encodeURIComponent(id)}`;
  const labels = {'1':'1st','2':'2nd','3':'3rd','4':'4th'};
  const semesterLabel = key => {const [year,sem] = key.split('-'); return `${labels[year]} Year · Sem ${sem}`;};
  const branchSelect = $('branchSelect'), yearSelect = $('yearSelect'), semSelect = $('semSelect');
  const allFolders = data.branches.reduce((n,b)=>n+Object.keys(b.semesters).length,0);
  $('branchCount').textContent = data.branches.length;
  $('folderCount').textContent = allFolders;
  $('availableCount').textContent = `${allFolders} linked semester folders`;
  $('heroDrive').href = driveUrl(data.root);
  $('contributeLink').href = data.contribute;
  $('communityLink').href = data.community;
  $('updated').textContent = `Folder catalog verified: ${new Date(data.updated+'T12:00:00').toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}`;
  data.branches.forEach(b => branchSelect.add(new Option(`${b.code} — ${b.name}`,b.code)));
  const getBranch = () => data.branches.find(b=>b.code===branchSelect.value);
  const resetOptions = (select,text) => {select.replaceChildren(new Option(text,'')); select.value=''; select.disabled=true;};
  const getKey = () => `${yearSelect.value}-${semSelect.value}`;
  function updateTarget() {
    const b=getBranch(), id=b?.semesters[getKey()]; const link=$('openBtn');
    if (id) {link.href=driveUrl(id);link.classList.remove('disabled');link.removeAttribute('aria-disabled');link.removeAttribute('tabindex');$('selectionHint').textContent=`Ready: ${b.code} · ${semesterLabel(getKey())}`;
      try {localStorage.setItem('rnp-selection',JSON.stringify({branch:b.code,year:yearSelect.value,sem:semSelect.value}));} catch(_e){}
    } else {link.removeAttribute('href');link.classList.add('disabled');link.setAttribute('aria-disabled','true');link.setAttribute('tabindex','-1');$('selectionHint').textContent=b ? 'Choose a year and semester to continue.' : 'Select a department to see available semesters.';}
  }
  function updateSemesters(restoreSem='') {
    resetOptions(semSelect,'Select semester');const b=getBranch(),year=yearSelect.value;
    if (b&&year) {Object.keys(b.semesters).filter(k=>k.startsWith(year+'-')).sort().forEach(k=>semSelect.add(new Option(`Semester ${k.split('-')[1]}`,k.split('-')[1])));semSelect.disabled=semSelect.options.length===1;if (restoreSem&&[...semSelect.options].some(o=>o.value===restoreSem))semSelect.value=restoreSem;}
    updateTarget();
  }
  function updateYears(restoreYear='',restoreSem='') {
    resetOptions(yearSelect,'Select year');const b=getBranch();
    if (b) {const years=[...new Set(Object.keys(b.semesters).map(k=>k.split('-')[0]))].sort();years.forEach(y=>yearSelect.add(new Option(`${labels[y]} Year`,y)));yearSelect.disabled=years.length===0;if (restoreYear&&years.includes(restoreYear))yearSelect.value=restoreYear;}
    updateSemesters(restoreSem);
  }
  branchSelect.addEventListener('change',()=>updateYears());
  yearSelect.addEventListener('change',()=>updateSemesters());
  semSelect.addEventListener('change',updateTarget);
  try {const p=JSON.parse(localStorage.getItem('rnp-selection')||'null');if(p&&data.branches.some(b=>b.code===p.branch)){branchSelect.value=p.branch;updateYears(p.year,p.sem);}else updateTarget();} catch(_e){updateTarget();}
  const grid=$('departmentGrid');
  function drawCards(query='') {
    const q=query.trim().toLowerCase();const results=data.branches.filter(b => !q || `${b.code} ${b.name}`.toLowerCase().includes(q) || Object.keys(b.semesters).some(k=>`${k} ${k.replace('-','-')} ${semesterLabel(k)} ${b.code} ${b.name}`.toLowerCase().includes(q)));
    const fragment=document.createDocumentFragment();
    results.forEach(b=>{
      const article=document.createElement('article');article.className='department-card';
      const heading=document.createElement('div');heading.className='card-top';
      const symbol=document.createElement('span');symbol.className='card-symbol';symbol.textContent=b.icon;
      const badge=document.createElement('span');badge.className='folder-badge';badge.textContent=`${Object.keys(b.semesters).length} semesters`;
      heading.append(symbol,badge);
      const name=document.createElement('h3');name.textContent=b.code;
      const subtitle=document.createElement('p');subtitle.textContent=b.name;
      const chips=document.createElement('div');chips.className='semester-chips';
      Object.entries(b.semesters).sort(([a],[c])=>a.localeCompare(c)).forEach(([key,id])=>{
        if(q && !`${b.code} ${b.name}`.toLowerCase().includes(q) && !`${key} ${semesterLabel(key)}`.toLowerCase().includes(q))return;
        const a=document.createElement('a');a.href=driveUrl(id);a.target='_blank';a.rel='noopener noreferrer';a.textContent=key;a.setAttribute('aria-label',`${b.code} ${semesterLabel(key)} notes (opens Google Drive)`);a.title=semesterLabel(key);chips.append(a);
      });
      const footer=document.createElement('a');footer.className='folder-link';footer.href=driveUrl(b.folder);footer.target='_blank';footer.rel='noopener noreferrer';footer.textContent='All department folders ↗';
      article.append(heading,name,subtitle,chips,footer);fragment.append(article);
    });
    grid.replaceChildren(fragment);$('emptyState').hidden=results.length!==0;$('searchStatus').textContent=q?`${results.length} matching departments`:`Explore ${data.branches.length} departments and ${allFolders} verified semester folders.`;
  }
  drawCards();
  $('searchInput').addEventListener('input',e=>drawCards(e.target.value));
  document.addEventListener('keydown',e=>{if(e.key==='/'&&document.activeElement?.tagName!=='INPUT'&&document.activeElement?.tagName!=='SELECT'){e.preventDefault();$('searchInput').focus();}});
  const themeButton=$('themeBtn');
  try {if(localStorage.getItem('rnp-theme')==='light')document.body.classList.add('light');}catch(_e){}
  const syncTheme=()=>{themeButton.textContent=document.body.classList.contains('light')?'☀':'☾';themeButton.setAttribute('aria-label',`Switch to ${document.body.classList.contains('light')?'dark':'light'} mode`);};
  syncTheme();themeButton.addEventListener('click',()=>{document.body.classList.toggle('light');syncTheme();try{localStorage.setItem('rnp-theme',document.body.classList.contains('light')?'light':'dark');}catch(_e){}});
})();
