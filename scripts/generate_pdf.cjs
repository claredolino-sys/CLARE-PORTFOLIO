const { jsPDF } = require('jspdf');
const fs = require('fs');
const path = require('path');

const doc = new jsPDF({
  orientation: 'portrait',
  unit: 'pt',
  format: 'letter' // 612 x 792 pt
});

const pageWidth = doc.internal.pageSize.getWidth();
const pageHeight = doc.internal.pageSize.getHeight();
const marginX = 40;
const contentWidth = pageWidth - marginX * 2; // 532 pt

// Primary palette
const primaryDark = [15, 23, 42];      // #0F172A
const accentTeal = [3, 105, 161];      // #0369A1
const subtitleColor = [14, 116, 144];  // #0E7490
const grayMuted = [71, 85, 105];       // #475569
const lineDivider = [203, 213, 225];   // #CBD5E1

let y = 36;

function drawHeader() {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(19);
  doc.setTextColor(...primaryDark);
  doc.text('CLARE ANGELIE T. DOLINO', pageWidth / 2, y, { align: 'center' });
  y += 16;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...subtitleColor);
  doc.text('IT Business Analyst  ·  Project Management Specialist  ·  Full-Stack Developer', pageWidth / 2, y, { align: 'center' });
  y += 14;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...grayMuted);
  const contactText = 'Biliran, Philippines  |  clareangeliedolino@gmail.com  |  +63 964 963 3928  |  linkedin.com/in/clare-angelie-taringting-dolino-4180823a3';
  doc.text(contactText, pageWidth / 2, y, { align: 'center' });
  y += 16;
}

function drawSectionHeader(title) {
  y += 4;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...primaryDark);
  doc.text(title.toUpperCase(), marginX, y);
  
  y += 3;
  doc.setDrawColor(...lineDivider);
  doc.setLineWidth(0.8);
  doc.line(marginX, y, pageWidth - marginX, y);
  y += 11;
}

function addWrappedParagraph(text, fontSize = 8.5, fontStyle = 'normal', color = primaryDark, indent = 0, lineSpacing = 11.5) {
  doc.setFont('helvetica', fontStyle);
  doc.setFontSize(fontSize);
  doc.setTextColor(...color);
  const lines = doc.splitTextToSize(text, contentWidth - indent);
  for (const line of lines) {
    doc.text(line, marginX + indent, y);
    y += lineSpacing;
  }
}

function addBulletItem(text, indent = 10, bulletChar = '•', lineSpacing = 11) {
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...primaryDark);
  
  doc.text(bulletChar, marginX + indent - 7, y);
  const lines = doc.splitTextToSize(text, contentWidth - indent);
  for (let i = 0; i < lines.length; i++) {
    doc.text(lines[i], marginX + indent, y);
    y += lineSpacing;
  }
  y += 1.5;
}

// ==========================================
// PAGE 1
// ==========================================
drawHeader();

// 1. PROFESSIONAL SUMMARY
drawSectionHeader('Professional Summary');
addWrappedParagraph(
  'Magna Cum Laude Information Systems graduate (Rank 1, GWA 1.32) with a rare combination of IT Business Analysis, Project Management, and Full-Stack Development experience. Personally led requirements gathering, produced operational process documentation, managed Agile/Scrum teams, and wrote the production code for the same institutional systems. Delivered 3 production-ready platforms at the Philippine Information Agency and led an award-winning capstone project at Biliran Province State University, consistently reducing manual workflow bottlenecks by 80%+ and achieving a 4.85/5.00 ISO/IEC 25010 usability score. A technical analyst who speaks both the language of stakeholders and development teams, equally capable of defining requirements and implementing them.',
  8.5, 'normal', primaryDark, 0, 11
);
y += 3;

// 2. CORE COMPETENCIES
drawSectionHeader('Core Competencies');
const leftCol = [
  '• Business Requirements Analysis (BRD · BPD · RTM)',
  '• Agile / Scrum · Sprint Planning · Backlog Management',
  '• Business Process Mapping & Documentation',
  '• Stakeholder Engagement & Facilitation',
  '• Systems Analysis & Design (draw.io · dbdiagram.io)',
  '• SDLC Frameworks · Requirements Traceability',
  '• Test Case Writing & UAT Support',
  '• Defect & Issue Tracking · Risk & Dependency Monitoring',
  '• Full-Stack Development (React · TypeScript · Node.js)'
];

const rightCol = [
  '• Relational Database Design (PostgreSQL · MySQL · Supabase)',
  '• Frontend Development (HTML5 · CSS3 · JavaScript · Tailwind)',
  '• AI-Augmented Delivery (Gemini API · GitHub Copilot · Claude · Cursor)',
  '• Cross-functional Team Coordination & Leadership',
  '• Technical Documentation (Notion · Git · Process Flow Diagramming)'
];

const colWidth = (contentWidth - 16) / 2;
const competencyStartY = y;

doc.setFont('helvetica', 'normal');
doc.setFontSize(8.2);
doc.setTextColor(...primaryDark);

let leftY = competencyStartY;
for (const item of leftCol) {
  const lines = doc.splitTextToSize(item, colWidth);
  for (const line of lines) {
    doc.text(line, marginX, leftY);
    leftY += 10.5;
  }
}

let rightY = competencyStartY;
for (const item of rightCol) {
  const lines = doc.splitTextToSize(item, colWidth);
  for (const line of lines) {
    doc.text(line, marginX + colWidth + 16, rightY);
    rightY += 10.5;
  }
}
y = Math.max(leftY, rightY) + 3;

// 3. PROFESSIONAL EXPERIENCE
drawSectionHeader('Professional Experience');

// Role 1: PIA R8 IT Intern Leader
doc.setFont('helvetica', 'bold');
doc.setFontSize(9);
doc.setTextColor(...primaryDark);
doc.text('IT Business Analyst, Project Manager & Lead Developer (IT Intern Leader)', marginX, y);
doc.setFont('helvetica', 'italic');
doc.setTextColor(...grayMuted);
doc.text('Jan 2026 – Apr 2026', pageWidth - marginX, y, { align: 'right' });
y += 11;

doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...accentTeal);
doc.text('Philippine Information Agency – Region 8', marginX, y);
doc.setTextColor(...grayMuted);
doc.text('· Tacloban City, Philippines', marginX + 185, y);
y += 11;

addBulletItem('Led end-to-end requirements gathering and analysis for 3 production-level institutional software systems, ensuring full alignment with project scope, timelines, and stakeholder expectations at every phase.');
addBulletItem('Produced operational process documentation and functional specifications for each system, establishing the requirements baseline used throughout development, testing, and validation phases.');
addBulletItem('Analyzed manual, spreadsheet-based financial workflows to identify process gaps; architected a dual-layer Finance Monitoring and disbursement-tracking platform that reduced reporting turnaround time by over 80%.');
addBulletItem('Served as Scrum Team Leader for a 6-member intern development team; facilitated daily stand-ups, managed sprint backlogs, tracked delivery risks and dependencies, and cleared blockers to maintain schedule adherence.');
addBulletItem('Personally implemented production-ready full-stack systems using React, TypeScript, Node.js, Supabase (PostgreSQL), and Google Cloud Run, bridging requirements documentation directly to technical execution.');
addBulletItem('Monitored project deliverables, tracked issues from discovery through resolution, identified scope gaps and dependencies, and prepared status documentation for stakeholder review.');
addBulletItem('Received the Proficiency Award from Philippine Information Agency Region 8 for technical leadership and delivery excellence.');

y += 2;
// Role 2: Freelance Web Developer
doc.setFont('helvetica', 'bold');
doc.setFontSize(9);
doc.setTextColor(...primaryDark);
doc.text('Freelance Web Developer', marginX, y);
doc.setFont('helvetica', 'italic');
doc.setTextColor(...grayMuted);
doc.text('May 2023 – Present', pageWidth - marginX, y, { align: 'right' });
y += 11;

doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...accentTeal);
doc.text('Freelance', marginX, y);
doc.setTextColor(...grayMuted);
doc.text('· Philippines', marginX + 50, y);
y += 11;

addBulletItem('Architect and deliver end-to-end web applications for diverse clients, managing the full SDLC from initial requirements elicitation through to final deployment.');
addBulletItem('Translate client requirements directly into functional, deployed web solutions using HTML, CSS, JavaScript, and React; serve as sole point of contact and accountability owner for each project.');
addBulletItem('Apply AI-assisted tools (Google AI Studio, Claude, ChatGPT, Cursor, Lovable, Emergent, Manus) to accelerate implementation and improve client turnaround time.');

y += 2;
// Role 3: Freelance Creative & Multimedia Specialist
doc.setFont('helvetica', 'bold');
doc.setFontSize(9);
doc.setTextColor(...primaryDark);
doc.text('Freelance Creative & Multimedia Specialist', marginX, y);
doc.setFont('helvetica', 'italic');
doc.setTextColor(...grayMuted);
doc.text('2019 – Present', pageWidth - marginX, y, { align: 'right' });
y += 11;

doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...accentTeal);
doc.text('Freelance', marginX, y);
doc.setTextColor(...grayMuted);
doc.text('· Philippines', marginX + 50, y);
y += 11;

addBulletItem('Design data-driven infographics, brand identities, and cross-platform multimedia assets for 10+ clients, translating complex data structures into high-impact visual formats.');
addBulletItem('Manage creative projects from client briefing through iteration and final delivery, strengthening requirements-interpretation, stakeholder communication, and attention-to-detail skills.');

y += 2;
// 4. KEY PROJECTS (Intro on Page 1)
drawSectionHeader('Key Projects');
doc.setFont('helvetica', 'bold');
doc.setFontSize(8.5);
doc.setTextColor(...grayMuted);
doc.text('Philippine Information Agency – Region 8 (Internship, 2026)', marginX, y);
y += 11;

doc.setFont('helvetica', 'bold');
doc.setFontSize(8.8);
doc.setTextColor(...primaryDark);
doc.text('PIA R8 Finance Monitoring System', marginX, y);
doc.setFont('helvetica', 'italic');
doc.setTextColor(...accentTeal);
doc.text('| Lead BA, Project Manager & Sole Full-Stack Developer', marginX + 165, y);
y += 10;

doc.setFont('helvetica', 'normal');
doc.setFontSize(8);
doc.setTextColor(...grayMuted);
doc.text('Stack: JavaScript (ES6+), Node.js, Express.js, PostgreSQL (Supabase), HTML5, CSS3, SheetJS, Vercel / Cloud Run', marginX, y);
y += 10;

addBulletItem('Gathered and documented operational requirements from finance stakeholders; designed system architecture replacing error-prone spreadsheet workflows with an automated digital dashboard.');


// ==========================================
// PAGE 2
// ==========================================
doc.addPage();
y = 36;

addBulletItem('Architected a dual-layer persistence system with RESTful API endpoints and in-memory fallback for zero-downtime offline testing; reduced voucher verification and reporting cycles by 80%+ via chunked batch ingestion and sub-second multi-quarter fiscal aggregation.');
addBulletItem('Engineered a weighted, context-aware auto-classification engine using lexical token matching to autonomously categorize ledger entries (PS vs. MOOE) and automated in-browser formatted Excel report generation.');

y += 3;
// Project 2: TrackMyHours
doc.setFont('helvetica', 'bold');
doc.setFontSize(8.8);
doc.setTextColor(...primaryDark);
doc.text('TrackMyHours – Daily Time Record (DTR) Platform', marginX, y);
doc.setFont('helvetica', 'italic');
doc.setTextColor(...accentTeal);
doc.text('| Project Manager, Lead Analyst & Lead Programmer', marginX + 230, y);
y += 10;

doc.setFont('helvetica', 'normal');
doc.setFontSize(8);
doc.setTextColor(...grayMuted);
doc.text('Stack: TypeScript, React, Vite, Node.js, Supabase (PostgreSQL), IndexedDB, Google Gemini API, Tailwind CSS, face-api', marginX, y);
y += 10;

addBulletItem('Owned full project documentation and coordinated a 6-person cross-functional Agile team through all SDLC phases (requirements definition, development, testing, UAT, and deployment).');
addBulletItem('Engineered a zero-trust attendance pipeline (IP/Wi-Fi subnet detection, geofencing, facial liveness detection) eliminating proxy attendance; resolved browser 5MB localStorage crashes by designing an IndexedDB offline-first caching layer backed by Supabase cloud sync.');
addBulletItem('Integrated Google Gemini 2.5/3.0 function calling for autonomous multi-format document analysis (.pdf, .docx, .xlsx) and automated DTR computation with batch PDF/Excel report generation.');

y += 3;
// Project 3: RIS Inventory Portal
doc.setFont('helvetica', 'bold');
doc.setFontSize(8.8);
doc.setTextColor(...primaryDark);
doc.text('Requisition & Issue Slip (RIS) / Inventory Portal', marginX, y);
doc.setFont('helvetica', 'italic');
doc.setTextColor(...accentTeal);
doc.text('| Lead Analyst & Sole Full-Stack Developer', marginX + 215, y);
y += 10;

doc.setFont('helvetica', 'normal');
doc.setFontSize(8);
doc.setTextColor(...grayMuted);
doc.text('Stack: TypeScript, React 18, Vite, Tailwind CSS, PostgreSQL, Supabase (Auth · Storage · Edge Functions · pg_cron), SheetJS', marginX, y);
y += 10;

addBulletItem('Defined functional requirements, documented operational process workflows, and designed the full data model; coordinated with end-users to validate the system against institutional needs.');
addBulletItem('Implemented multi-tier RBAC, immutable PostgreSQL audit trail for government compliance and COA auditability, Row Level Security (RLS), and a 24-hour automated disaster recovery pipeline via Supabase Edge Functions with pg_cron.');

y += 4;
// Project 4: Capstone (BiPSU)
doc.setFont('helvetica', 'bold');
doc.setFontSize(8.5);
doc.setTextColor(...grayMuted);
doc.text('Biliran Province State University – Undergraduate Capstone Research Project (Apr 2025 – Dec 2025)', marginX, y);
y += 11;

doc.setFont('helvetica', 'bold');
doc.setFontSize(8.8);
doc.setTextColor(...primaryDark);
doc.text('Centralized Document Management Information System (CDMIS)', marginX, y);
y += 10;
doc.setFont('helvetica', 'italic');
doc.setTextColor(...accentTeal);
doc.text('| Project Leader, Lead Programmer & Head Research Writer', marginX, y);
y += 10;

doc.setFont('helvetica', 'normal');
doc.setFontSize(8);
doc.setTextColor(...grayMuted);
doc.text('Stack: TypeScript, React 18, Tailwind CSS, Vite, MySQL, Context API, Google Cloud Run', marginX, y);
y += 10;

addBulletItem('Directed a 6-member team through the full SDLC, executing requirements gathering, documentation, stakeholder alignment, development, and UAT for a unified web platform replacing fragmented paper-based records at the BiPSU Records and Archives Office.');
addBulletItem('Achieved ISO/IEC 25010 software usability score of 4.85/5.00; reduced document retrieval and processing time by ~80% through sub-second Vite-optimized client routing, hierarchical RBAC, and an end-to-end document request state machine with immutable audit logging.');

y += 5;
// 5. EDUCATION
drawSectionHeader('Education');
doc.setFont('helvetica', 'bold');
doc.setFontSize(9);
doc.setTextColor(...primaryDark);
doc.text('BS in Information Systems', marginX, y);
doc.setFont('helvetica', 'italic');
doc.setTextColor(...grayMuted);
doc.text('Graduated: May 2026', pageWidth - marginX, y, { align: 'right' });
y += 11;

doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...accentTeal);
doc.text('Biliran Province State University', marginX, y);
y += 11;

addBulletItem('Magna Cum Laude, Program Rank 1 of entire cohort, General Weighted Average (GWA): 1.32');
addBulletItem("Full Academic Scholarship Recipient, Continuous President's Lister (3rd & 4th Year) · Dean's Lister (multiple semesters)");
addBulletItem('Core Academic Focus: Systems Analysis & Design, Database Systems, Software Development Lifecycle (SDLC), Organizational Management and Concepts, Business Process Management, Graphics & Visual Computing, IS Project Management, and IS Management Strategy and Acquisition');

y += 4;
// 6. AWARDS & RECOGNITION
drawSectionHeader('Awards & Recognition');
doc.setFont('helvetica', 'bold');
doc.setFontSize(8.8);
doc.setTextColor(...primaryDark);
doc.text('Proficiency Awardee – Philippine Information Agency Region 8 (April 2026)', marginX, y);
y += 11;
addBulletItem('Awarded for exceptional technical contribution, leadership, and system delivery during the regional agency internship deployment.');

y += 4;
// 7. LANGUAGES
drawSectionHeader('Languages');
addBulletItem('English: Advanced / Highly Proficient');
addBulletItem('Tagalog / Waray-Waray: Native speaker');
addBulletItem('Conversational Chinese Mandarin & Korean: Basic conversational proficiency');
addBulletItem('Italian & French: Basic / Beginner');

// Write out to buffers and save files
const pdfData = doc.output('arraybuffer');
const buffer = Buffer.from(pdfData);

const targets = [
  path.join(__dirname, '../public/Clare_Dolino_Resume.pdf'),
  path.join(__dirname, '../public/CLARE_ANGELIE_T._DOLINO_-_Software_Development_Engineer.pdf'),
  path.join(__dirname, '../src/imports/CLARE_ANGELIE_T._DOLINO_-_Software_Development_Engineer.pdf'),
];

targets.forEach(target => {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, buffer);
  console.log('Successfully written:', target, 'Size:', buffer.length, 'bytes');
});
