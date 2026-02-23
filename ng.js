// ==========================================
// 🗂 DATA MANAGEMENT
// ==========================================

const globalLinks = {
    fullDrive: "https://drive.google.com/drive/folders/YOUR_ROOT_FOLDER",
    requestForm: "https://forms.gle/YOUR_REQUEST_FORM",
    contributeForm: "https://forms.gle/YOUR_CONTRIBUTE_FORM",
    whatsapp: "https://chat.whatsapp.com/YOUR_INVITE_LINK",
    reportIssue: "mailto:support@raghu.edu?subject=Broken Link Report" // Used for the flag icons
};

const semesterLinks = {
    "1-1": "#", "1-2": "#", "2-1": "#", "2-2": "#",
    "3-1": "#", "3-2": "https://drive.google.com/drive/folders/YOUR_3_2_FOLDER",
    "4-1": "#", "4-2": "#"
};

const trendingData = [
    { title: "Deep Learning (3-2) Exam Ready Answers", link: "#", icon: "fa-brain" },
    { title: "Software Engineering NPTEL Notes", link: "#", icon: "fa-code-branch" },
    { title: "First Fit / Best Fit Memory Allocation (C Code)", link: "#", icon: "fa-memory" },
    { title: "Computer Networks Unit 1 & 2", link: "#", icon: "fa-network-wired" }
];

const placementData = [
    { title: "DevOps Engineer Roadmaps & Basics", link: "#", icon: "fa-infinity" },
    { title: "Cloud Computing Fundamentals", link: "#", icon: "fa-cloud" },
    { title: "Software Testing Interview Q&A", link: "#", icon: "fa-bug" },
    { title: "TCS Ninja Aptitude Previous Papers", link: "#", icon: "fa-file-signature" }
];

const recentData = [
    { title: "CSE 3-2 Lab Manuals Updated", link: "#", icon: "fa-book" },
    { title: "ECE Microprocessors Mid 1 Syllabus", link: "#", icon: "fa-microchip" },
    { title: "CIVIL Structural Analysis Notes", link: "#", icon: "fa-building" }
];

const branchesData = [
    { title: "Computer Science (CSE)", link: "#", icon: "fa-laptop-code" },
    { title: "Electronics (ECE)", link: "#", icon: "fa-microchip" },
    { title: "Mechanical (MECH)", link: "#", icon: "fa-cogs" },
    { title: "Civil Engineering", link: "#", icon: "fa-hard-hat" }
];

// ==========================================
// 🧠 APPLICATION LOGIC
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    setupGlobalLinks();
    initTheme();
    loadPreferences();
    
    // Render Sections
    renderCards(trendingData, 'trending-container', '🔥 Mid Exams', 'fire');
    renderCards(placementData, 'placement-container', '💼 Career', 'prep');
    renderCards(recentData, 'recent-container', '🆕 New', 'new');
    renderCards(branchesData, 'branches-container', '', '');
    
    document.getElementById('searchInput').addEventListener('input', handleSearch);
    
    // Set dynamic update date
    const dateOpts = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('last-updated').innerText = "Last Updated: " + new Date().toLocaleDateString('en-IN', dateOpts);
});

// Setup Links
function setupGlobalLinks() {
    document.getElementById('btn-full-drive').href = globalLinks.fullDrive;
    document.getElementById('btn-request').href = globalLinks.requestForm;
    document.getElementById('btn-contribute').href = globalLinks.contributeForm;
    document.getElementById('btn-whatsapp').href = globalLinks.whatsapp;
}

// 🌓 Dark/Light Mode Logic
function initTheme() {
    const toggleBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('raghuTheme');
    
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        toggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }

    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        localStorage.setItem('raghuTheme', isLight ? 'light' : 'dark');
        toggleBtn.innerHTML = isLight ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    });
}

// 💾 Local Storage for Dropdowns
function loadPreferences() {
    const savedYear = localStorage.getItem('raghuYear');
    const savedSem = localStorage.getItem('raghuSem');
    if(savedYear) document.getElementById('yearSelect').value = savedYear;
    if(savedSem) document.getElementById('semSelect').value = savedSem;
}

function openSemesterNotes() {
    const year = document.getElementById('yearSelect').value;
    const sem = document.getElementById('semSelect').value;

    if (!year || !sem) {
        alert("Please select both Year and Semester.");
        return;
    }

    // Save choices for next time
    localStorage.setItem('raghuYear', year);
    localStorage.setItem('raghuSem', sem);

    const key = `${year}-${sem}`;
    const targetLink = semesterLinks[key];

    if (targetLink && targetLink !== "#") {
        window.open(targetLink, '_blank');
    } else {
        alert("Materials for this semester are currently being updated.");
    }
}

// Render Cards with "Report Flag"
function renderCards(dataArray, containerId, badgeText, badgeClass) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; 

    dataArray.forEach(item => {
        const badgeHTML = badgeText ? `<span class="badge ${badgeClass}">${badgeText}</span>` : '';
        const card = `
            <div class="glass-card searchable-item" data-title="${item.title.toLowerCase()}">
                <a href="${item.link}" target="_blank" style="display:block; height:100%;">
                    <div class="card-header">
                        <i class="fa-solid ${item.icon} card-icon"></i>
                        ${badgeHTML}
                    </div>
                    <h3 class="card-title">${item.title}</h3>
                </a>
                <a href="${globalLinks.reportIssue}&body=Reporting broken link for: ${encodeURIComponent(item.title)}" 
                   class="report-link" title="Report broken link">
                   <i class="fa-solid fa-flag"></i>
                </a>
            </div>
        `;
        container.innerHTML += card;
    });
}

// Real-time Search
function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    const items = document.querySelectorAll('.searchable-item');
    items.forEach(item => {
        const title = item.getAttribute('data-title');
        item.style.display = title.includes(query) ? 'flex' : 'none';
    });
}