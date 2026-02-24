// ==========================================
// 🗂 DATA MANAGEMENT
// ==========================================

const globalLinks = {
    fullDrive: "https://drive.google.com/drive/folders/1JfItnHB5p97VdtLYHVz111Ydm6497LIu?usp=drive_link",
    requestForm: "https://forms.gle/YOUR_REQUEST_FORM",
    contributeForm: "https://forms.gle/dbgi6LQNZNEqkgbR8",
    whatsapp: "https://chat.whatsapp.com/BSDhYkmpwvbKZq3CChZ9uN",
    reportIssue: "mailto:raghuengineeringcollagesample@gmail.com?subject=Broken Link Report" 
};

// Now the keys are "BRANCH-YEAR-SEM"
const semesterLinks = {
    "FY-1-1": "https://drive.google.com/drive/folders/FY_1_1_LINK",
    "FY-1-2": "https://drive.google.com/drive/folders/FY_1_2_LINK",
    
    // CSE Links
    "CSE-2-1": "#",
    "CSE-2-2": "#",
    "CSE-3-1": "#",
    "CSE-3-2": "https://drive.google.com/drive/folders/YOUR_CSE_3_2_FOLDER",
    "CSE-4-1": "#",
    "CSE-4-2": "#",

    // ECE Links
    "ECE-2-1": "#"
};

const trendingData = [
    { title: "Deep Learning (3-2) Exam Ready Answers", link: "#", icon: "fa-brain" },
    { title: "Software Engineering NPTEL Notes", link: "#", icon: "fa-code-branch" },
    { title: "First Fit / Best Fit Memory Allocation (C Code)", link: "#", icon: "fa-memory" },
    { title: "Computer Networks Unit 1 & 2", link: "#", icon: "fa-network-wired" }
];

// NOTE: Restored this array! If you delete this, you MUST also delete line 80 where it renders!
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
    { title: "Computer Science (CSE)", link: "https://drive.google.com/drive/folders/1Jpd-qegwibBbD92tJhMu9Ittw_Xx9-9d?usp=drive_link", icon: "fa-laptop-code" },
    { title: "Electronics (ECE)", link: "https://drive.google.com/drive/folders/1JpSNqNSsYTYJEHJ8Repns2LX0obQ_LB7?usp=drive_link", icon: "fa-microchip" },
    { title: "CSM (AI & ML)", link: "https://drive.google.com/drive/folders/1JuMkCDFU0O1wTOYoVB2itjH0fqHmuTqT?usp=drive_link", icon: "fa-robot" },
    { title: "Mechanical (MECH)", link: "https://drive.google.com/drive/folders/1Jn4o7_a5ONXFhK61oOSU_byXzRtEVamF?usp=drive_link", icon: "fa-cogs" },
    { title: "Civil Engineering", link: "https://drive.google.com/drive/folders/1JhfQm71trSCbMuqQPLfhtOnS4TxxVFcg?usp=drive_link", icon: "fa-hard-hat" }
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
    const savedBranch = localStorage.getItem('raghuBranch');
    const savedYear = localStorage.getItem('raghuYear');
    const savedSem = localStorage.getItem('raghuSem');
    
    if(savedBranch) document.getElementById('branchSelect').value = savedBranch;
    if(savedYear) document.getElementById('yearSelect').value = savedYear;
    if(savedSem) document.getElementById('semSelect').value = savedSem;
}

// 🎯 The Logic to Extract and Combine
function openSemesterNotes() {
    const branchSelect = document.getElementById('branchSelect');
    const yearSelect = document.getElementById('yearSelect');
    const semSelect = document.getElementById('semSelect');

    // Prevent crashing if a dropdown is missing from HTML
    if (!branchSelect || !yearSelect || !semSelect) {
         alert("Dropdown elements missing. Please check HTML.");
         return;
    }

    const branch = branchSelect.value;
    const year = yearSelect.value;
    const sem = semSelect.value;

    if (!branch || !year || !sem) {
        alert("Please select Branch, Year, and Semester.");
        return;
    }

    // Save choices for next time
    localStorage.setItem('raghuBranch', branch);
    localStorage.setItem('raghuYear', year);
    localStorage.setItem('raghuSem', sem);

    const key = `${branch}-${year}-${sem}`;
    const targetLink = semesterLinks[key];

    if (targetLink && targetLink !== "#") {
        window.open(targetLink, '_blank');
    } else {
        alert("Materials for " + branch + " " + year + "-" + sem + " are currently being updated.");
    }
}

// Render Cards with "Report Flag"
function renderCards(dataArray, containerId, badgeText, badgeClass) {
    const container = document.getElementById(containerId);
    if(!container) return; // safeguard
    container.innerHTML = ''; 

    dataArray.forEach(item => {
        const badgeHTML = badgeText ? `<span class="badge ${badgeClass}">${badgeText}</span>` : '';
        const card = `
            <div class="glass-card searchable-item" data-title="${item.title.toLowerCase()}">
                <a href="${item.link}" target="_blank" style="display:block
