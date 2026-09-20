/**
 * TalentPulse - Unified Candidate Dataset (50 Realistic Synthetic Candidates)
 * Context: Technology Services & Consulting (SAP/ERP, Cloud/Data, RPA, QA, Supply Chain Tech, Domain Consulting)
 * Sources normalized: Direct ATS, Staffing Vendors, Employee Referrals, Walk-ins / Job Fairs
 */

window.TALENT_PULSE_DATA = window.TALENT_PULSE_DATA || {};

window.TALENT_PULSE_DATA.candidates = [
  // ===================== 1. EMPLOYEE REFERRALS =====================
  {
    id: "CAN-1001",
    name: "Rajesh Krishnamurthy",
    email: "rajesh.k@example.com",
    phone: "+91 98450 12345",
    location: "Bengaluru, India",
    roleFamily: "SAP/ERP Consultant",
    targetRole: "Senior SAP S/4HANA Finance Architect",
    experienceYears: 12,
    stage: "Technical Interview",
    appliedDate: "2026-08-15",
    lastActivityDate: "2026-09-18",
    sourceChannel: "Employee Referral",
    channelMetadata: {
      referrerName: "Suresh Menon",
      referrerId: "EMP-41092",
      referrerDepartment: "Enterprise ERP Solutions",
      relationship: "Former Tech Lead at Wipro",
      referralBonusTier: "Tier 1 (Senior Leadership / Tech Architect)"
    },
    signals: {
      emailsSent: 6,
      emailsOpened: 6,
      emailClicks: 5,
      responseLatencyHours: 3.5,
      assessmentStatus: "Completed",
      assessmentScore: 96,
      assessmentTurnaroundHours: 16,
      portalRevisits14d: 8,
      interviewSchedulingLatencyHours: 4,
      rescheduleCount: 0,
      profileUpdatesCount: 2,
      lastProfileUpdate: "2026-09-12",
      savedJobsCount: 3,
      jobAlertsSubscribed: true,
      alertsOpenedCount: 6,
      daysSinceLastActivity: 1
    },
    timeline: [
      { id: "TL-101", date: "2026-09-18 14:30", type: "portal_visit", icon: "globe", title: "Careers Portal Revisit", description: "Candidate explored ITC Infotech Global S/4HANA Cloud Center of Excellence page.", channel: "Portal" },
      { id: "TL-102", date: "2026-09-16 11:15", type: "interview_completed", icon: "video", title: "L1 Technical Interview Cleared", description: "Feedback: 'Outstanding architectural mastery in S/4HANA Finance & Central Finance.' Rating: 4.8/5.", channel: "Teams" },
      { id: "TL-103", date: "2026-09-12 17:00", type: "assessment_passed", icon: "award", title: "SAP Architecture Assessment Passed", description: "Scored 96% in Advanced Financial Closing & Group Reporting scenarios.", channel: "HackerRank" },
      { id: "TL-104", date: "2026-08-15 09:30", type: "referral_submitted", icon: "user-check", title: "Referral Endorsement Received", description: "Referred by Suresh Menon (EMP-41092). Note: 'Top-tier S/4 architect, delivered 3 global rollouts.'", channel: "Referral Portal" }
    ],
    outreachHistory: [
      { id: "OUT-101", date: "2026-09-15 10:00", campaign: "SAP S/4HANA Practice Spotlight", subject: "Suresh Menon recommended your profile for our S/4HANA COE Lead role", channel: "Email", status: "Replied", templateId: "sap-referral-lead" },
      { id: "OUT-102", date: "2026-08-18 14:00", campaign: "Direct Recruiter Outreach", subject: "Schedule your Technical Discussion with Practice VP", channel: "Email", status: "Opened", templateId: "interview-schedule" }
    ]
  },
  {
    id: "CAN-1002",
    name: "Priyanka Nair",
    email: "priyanka.nair@example.com",
    phone: "+91 97401 56789",
    location: "Pune, India",
    roleFamily: "Cloud/Data Engineer",
    targetRole: "Lead Snowflake & Databricks Data Engineer",
    experienceYears: 8,
    stage: "Client Interview",
    appliedDate: "2026-08-20",
    lastActivityDate: "2026-09-17",
    sourceChannel: "Employee Referral",
    channelMetadata: {
      referrerName: "Ananya Deshmukh",
      referrerId: "EMP-38821",
      referrerDepartment: "Data & AI Modernization",
      relationship: "Engineering College Alumni & Peer",
      referralBonusTier: "Tier 2 (Lead Engineer)"
    },
    signals: {
      emailsSent: 5,
      emailsOpened: 5,
      emailClicks: 4,
      responseLatencyHours: 4.0,
      assessmentStatus: "Completed",
      assessmentScore: 92,
      assessmentTurnaroundHours: 20,
      portalRevisits14d: 6,
      interviewSchedulingLatencyHours: 5,
      rescheduleCount: 0,
      profileUpdatesCount: 1,
      lastProfileUpdate: "2026-09-08",
      savedJobsCount: 2,
      jobAlertsSubscribed: true,
      alertsOpenedCount: 4,
      daysSinceLastActivity: 2
    },
    timeline: [
      { id: "TL-105", date: "2026-09-17 16:00", type: "client_round", icon: "users", title: "Client Partner Round Scheduled", description: "Scheduled with UK Retail Client for Data Mesh Architecture deep dive.", channel: "Outlook" },
      { id: "TL-106", date: "2026-09-10 15:30", type: "interview_completed", icon: "check-circle", title: "Technical Round 2 Cleared", description: "Evaluated on PySpark, dbt, and Databricks Unity Catalog. Rating: 4.6/5.", channel: "Teams" },
      { id: "TL-107", date: "2026-08-22 10:00", type: "assessment_passed", icon: "award", title: "Cloud Data Assessment Passed", description: "Completed test in 1.5 hours with 92% accuracy.", channel: "Codility" }
    ],
    outreachHistory: [
      { id: "OUT-103", date: "2026-09-16 11:30", campaign: "Client Interview Prep Brief", subject: "Briefing document & tips for your UK Retail Client round", channel: "Email", status: "Replied", templateId: "client-prep" }
    ]
  },
  {
    id: "CAN-1003",
    name: "Arunav Sen",
    email: "arunav.sen@example.com",
    phone: "+91 98300 44556",
    location: "Kolkata, India",
    roleFamily: "RPA/Automation Analyst",
    targetRole: "Senior UiPath & AI Agent Specialist",
    experienceYears: 6,
    stage: "Screening",
    appliedDate: "2026-08-28",
    lastActivityDate: "2026-09-15",
    sourceChannel: "Employee Referral",
    channelMetadata: {
      referrerName: "Debjit Roy",
      referrerId: "EMP-45120",
      referrerDepartment: "Intelligent Automation COE",
      relationship: "Colleague at previous employer",
      referralBonusTier: "Tier 3 (Senior Specialist)"
    },
    signals: {
      emailsSent: 4,
      emailsOpened: 3,
      emailClicks: 2,
      responseLatencyHours: 12.0,
      assessmentStatus: "Completed",
      assessmentScore: 84,
      assessmentTurnaroundHours: 36,
      portalRevisits14d: 3,
      interviewSchedulingLatencyHours: 18,
      rescheduleCount: 1,
      profileUpdatesCount: 1,
      lastProfileUpdate: "2026-09-02",
      savedJobsCount: 1,
      jobAlertsSubscribed: false,
      alertsOpenedCount: 1,
      daysSinceLastActivity: 4
    },
    timeline: [
      { id: "TL-108", date: "2026-09-15 11:00", type: "reschedule", icon: "clock", title: "Screening Call Rescheduled", description: "Requested shift of recruiter briefing due to project delivery deadline.", channel: "Email" },
      { id: "TL-109", date: "2026-09-05 18:00", type: "assessment_passed", icon: "code", title: "RPA Coding Assessment Submitted", description: "Scored 84% on REFramework exception handling and OCR integrations.", channel: "TestGorilla" }
    ],
    outreachHistory: [
      { id: "OUT-104", date: "2026-09-14 09:00", campaign: "RPA Practice Welcome", subject: "Welcome to ITC Infotech Intelligent Automation team", channel: "Email", status: "Opened", templateId: "rpa-welcome" }
    ]
  },
  {
    id: "CAN-1004",
    name: "Swati Bhattacharya",
    email: "swati.b@example.com",
    phone: "+91 99032 88123",
    location: "Kolkata, India",
    roleFamily: "Supply Chain Tech Consultant",
    targetRole: "Blue Yonder WMS/TMS Solution Architect",
    experienceYears: 14,
    stage: "Offer",
    appliedDate: "2026-07-25",
    lastActivityDate: "2026-09-18",
    sourceChannel: "Employee Referral",
    channelMetadata: {
      referrerName: "Amitabh Banerjee",
      referrerId: "EMP-29001",
      referrerDepartment: "Supply Chain & CPG Tech Practice",
      relationship: "Worked together on ITC Infotech joint CPG account",
      referralBonusTier: "Tier 1 (Senior Leadership / Tech Architect)"
    },
    signals: {
      emailsSent: 8,
      emailsOpened: 8,
      emailClicks: 7,
      responseLatencyHours: 2.0,
      assessmentStatus: "Completed",
      assessmentScore: 98,
      assessmentTurnaroundHours: 12,
      portalRevisits14d: 12,
      interviewSchedulingLatencyHours: 2,
      rescheduleCount: 0,
      profileUpdatesCount: 3,
      lastProfileUpdate: "2026-09-15",
      savedJobsCount: 5,
      jobAlertsSubscribed: true,
      alertsOpenedCount: 8,
      daysSinceLastActivity: 1
    },
    timeline: [
      { id: "TL-110", date: "2026-09-18 10:00", type: "offer_extended", icon: "gift", title: "Formal Offer Extended", description: "Principal Consultant - Supply Chain Tech. Compensation & sign-on bonus letter shared.", channel: "HR Portal" },
      { id: "TL-111", date: "2026-09-16 15:00", type: "hr_discussion", icon: "user", title: "HR Leadership Discussion", description: "Discussed relocation to Bengaluru/Kolkata hybrid, joining timeline within 30 days.", channel: "Phone" },
      { id: "TL-112", date: "2026-09-12 14:00", type: "leadership_cleared", icon: "award", title: "Practice Head Interview Cleared", description: "Exceptional endorsement from Supply Chain VP.", channel: "Teams" }
    ],
    outreachHistory: [
      { id: "OUT-105", date: "2026-09-18 10:15", campaign: "Offer Follow-up", subject: "Welcome to the Family: Your ITC Infotech Offer Letter", channel: "Email", status: "Opened", templateId: "offer-welcome" }
    ]
  },
  {
    id: "CAN-1005",
    name: "Vikram Rathore",
    email: "vikram.r@example.com",
    phone: "+91 94140 33221",
    location: "Jaipur, India",
    roleFamily: "QA Engineer",
    targetRole: "SDET Automation Lead (Playwright & Performance)",
    experienceYears: 7,
    stage: "Screening",
    appliedDate: "2026-08-10",
    lastActivityDate: "2026-08-28",
    sourceChannel: "Employee Referral",
    channelMetadata: {
      referrerName: "Karan Johar Sharma",
      referrerId: "EMP-40112",
      referrerDepartment: "Quality Engineering & Testing Services",
      relationship: "University senior",
      referralBonusTier: "Tier 3 (Senior Specialist)"
    },
    signals: {
      emailsSent: 4,
      emailsOpened: 1,
      emailClicks: 0,
      responseLatencyHours: 96.0,
      assessmentStatus: "Pending",
      assessmentScore: 0,
      assessmentTurnaroundHours: 0,
      portalRevisits14d: 0,
      interviewSchedulingLatencyHours: 72,
      rescheduleCount: 2,
      profileUpdatesCount: 0,
      lastProfileUpdate: "2026-08-10",
      savedJobsCount: 0,
      jobAlertsSubscribed: false,
      alertsOpenedCount: 0,
      daysSinceLastActivity: 22
    },
    timeline: [
      { id: "TL-113", date: "2026-08-28 14:00", type: "assessment_reminded", icon: "alert-triangle", title: "Assessment Reminder Ignored", description: "HackerRank SDET link sent; unattempted after 14 days.", channel: "Email" },
      { id: "TL-114", date: "2026-08-15 11:00", type: "reschedule", icon: "phone-missed", title: "Screening Call Missed", description: "Candidate did not answer scheduled recruiter check-in call.", channel: "Phone" }
    ],
    outreachHistory: [
      { id: "OUT-106", date: "2026-08-28 14:00", campaign: "Assessment Reminder", subject: "Friendly reminder: Complete your ITC Infotech QA challenge", channel: "Email", status: "Delivered", templateId: "assessment-nudge" },
      { id: "OUT-107", date: "2026-09-08 10:00", campaign: "Re-engagement Automation", subject: "Still exploring SDET leadership roles?", channel: "Email", status: "Delivered", templateId: "re-engage-cooling" }
    ]
  },

  // ===================== 2. ATS / DIRECT APPLICATIONS =====================
  {
    id: "CAN-1006",
    name: "Sneha Kulkarni",
    email: "sneha.kulkarni@example.com",
    phone: "+91 98220 99887",
    location: "Pune, India",
    roleFamily: "Cloud/Data Engineer",
    targetRole: "AWS Cloud Solutions Architect",
    experienceYears: 10,
    stage: "Technical Interview",
    appliedDate: "2026-08-30",
    lastActivityDate: "2026-09-18",
    sourceChannel: "Direct Application",
    channelMetadata: {
      jobReqId: "REQ-2026-8812",
      resumeScore: 95,
      appliedVia: "ITC Infotech Careers Portal",
      screeningScore: 90,
      interviewerNotes: "Strong background in multi-region AWS landing zones, Terraform, and FinOps."
    },
    signals: {
      emailsSent: 5,
      emailsOpened: 5,
      emailClicks: 4,
      responseLatencyHours: 4.8,
      assessmentStatus: "Completed",
      assessmentScore: 91,
      assessmentTurnaroundHours: 22,
      portalRevisits14d: 9,
      interviewSchedulingLatencyHours: 5,
      rescheduleCount: 0,
      profileUpdatesCount: 2,
      lastProfileUpdate: "2026-09-14",
      savedJobsCount: 4,
      jobAlertsSubscribed: true,
      alertsOpenedCount: 5,
      daysSinceLastActivity: 1
    },
    timeline: [
      { id: "TL-115", date: "2026-09-18 11:30", type: "portal_visit", icon: "globe", title: "Saved 2 Open Positions", description: "Saved 'Cloud Migration Principal' and 'AWS Lead' in candidate portal.", channel: "Portal" },
      { id: "TL-116", date: "2026-09-15 16:00", type: "interview_completed", icon: "check-circle", title: "Technical Round 1 Cleared", description: "Score: 4.7/5. Thoroughly answered AWS Transit Gateway & EKS questions.", channel: "Teams" }
    ],
    outreachHistory: [
      { id: "OUT-108", date: "2026-09-16 09:30", campaign: "Next Step Update", subject: "Great feedback from your Cloud Tech interview!", channel: "Email", status: "Replied", templateId: "feedback-positive" }
    ]
  },
  {
    id: "CAN-1007",
    name: "Manoj Chawla",
    email: "manoj.c@example.com",
    phone: "+91 98110 55443",
    location: "Gurugram, India",
    roleFamily: "SAP/ERP Consultant",
    targetRole: "SAP SCM & IBP Functional Consultant",
    experienceYears: 7,
    stage: "Screening",
    appliedDate: "2026-09-02",
    lastActivityDate: "2026-09-16",
    sourceChannel: "Direct Application",
    channelMetadata: {
      jobReqId: "REQ-2026-7901",
      resumeScore: 88,
      appliedVia: "LinkedIn Easy Apply",
      screeningScore: 82,
      interviewerNotes: "Certified in SAP Integrated Business Planning (IBP) for Demand."
    },
    signals: {
      emailsSent: 3,
      emailsOpened: 3,
      emailClicks: 2,
      responseLatencyHours: 8.5,
      assessmentStatus: "Completed",
      assessmentScore: 85,
      assessmentTurnaroundHours: 28,
      portalRevisits14d: 4,
      interviewSchedulingLatencyHours: 10,
      rescheduleCount: 0,
      profileUpdatesCount: 1,
      lastProfileUpdate: "2026-09-04",
      savedJobsCount: 1,
      jobAlertsSubscribed: true,
      alertsOpenedCount: 2,
      daysSinceLastActivity: 3
    },
    timeline: [
      { id: "TL-117", date: "2026-09-16 14:00", type: "recruiter_call", icon: "phone", title: "Recruiter Phone Screen Completed", description: "Discussed notice period (30 days) and compensation expectations.", channel: "Phone" }
    ],
    outreachHistory: [
      { id: "OUT-109", date: "2026-09-12 11:00", campaign: "Screening Confirmation", subject: "Confirmation: Discussion on SAP IBP Opportunity", channel: "Email", status: "Replied", templateId: "screen-confirm" }
    ]
  },
  {
    id: "CAN-1008",
    name: "Deepika Raman",
    email: "deepika.r@example.com",
    phone: "+91 94440 12890",
    location: "Chennai, India",
    roleFamily: "QA Engineer",
    targetRole: "Senior Quality Engineering Architect (GenAI in QA)",
    experienceYears: 9,
    stage: "Technical Interview",
    appliedDate: "2026-08-25",
    lastActivityDate: "2026-09-17",
    sourceChannel: "Direct Application",
    channelMetadata: {
      jobReqId: "REQ-2026-8044",
      resumeScore: 92,
      appliedVia: "ITC Infotech Careers Portal",
      screeningScore: 88,
      interviewerNotes: "Strong hands-on experience building autonomous testing pipelines using AI agents."
    },
    signals: {
      emailsSent: 4,
      emailsOpened: 4,
      emailClicks: 3,
      responseLatencyHours: 5.2,
      assessmentStatus: "Completed",
      assessmentScore: 89,
      assessmentTurnaroundHours: 24,
      portalRevisits14d: 5,
      interviewSchedulingLatencyHours: 7,
      rescheduleCount: 0,
      profileUpdatesCount: 2,
      lastProfileUpdate: "2026-09-10",
      savedJobsCount: 2,
      jobAlertsSubscribed: true,
      alertsOpenedCount: 4,
      daysSinceLastActivity: 2
    },
    timeline: [
      { id: "TL-118", date: "2026-09-17 10:00", type: "portal_visit", icon: "globe", title: "Viewed TalentPulse QA COE Video", description: "Watched 5-minute video on ITC Infotech's Quality Engineering AI framework.", channel: "Portal" }
    ],
    outreachHistory: [
      { id: "OUT-110", date: "2026-09-14 15:00", campaign: "Technical Interview Invite", subject: "Next steps: Architectural Discussion for QA Practice", channel: "Email", status: "Replied", templateId: "qa-interview" }
    ]
  },
  {
    id: "CAN-1009",
    name: "Gaurav Malhotra",
    email: "gaurav.m@example.com",
    phone: "+91 98100 88234",
    location: "Noida, India",
    roleFamily: "Domain Consulting",
    targetRole: "Banking & Financial Services (BFS) Digital Transformation Lead",
    experienceYears: 13,
    stage: "Screening",
    appliedDate: "2026-08-01",
    lastActivityDate: "2026-08-22",
    sourceChannel: "Direct Application",
    channelMetadata: {
      jobReqId: "REQ-2026-6701",
      resumeScore: 84,
      appliedVia: "Naukri Job Board",
      screeningScore: 78,
      interviewerNotes: "Deep domain knowledge in Core Banking and Open Banking APIs."
    },
    signals: {
      emailsSent: 5,
      emailsOpened: 2,
      emailClicks: 0,
      responseLatencyHours: 72.0,
      assessmentStatus: "Pending",
      assessmentScore: 0,
      assessmentTurnaroundHours: 0,
      portalRevisits14d: 1,
      interviewSchedulingLatencyHours: 48,
      rescheduleCount: 1,
      profileUpdatesCount: 0,
      lastProfileUpdate: "2026-08-01",
      savedJobsCount: 0,
      jobAlertsSubscribed: false,
      alertsOpenedCount: 0,
      daysSinceLastActivity: 28
    },
    timeline: [
      { id: "TL-119", date: "2026-08-22 17:00", type: "email_sent", icon: "mail", title: "Recruiter Check-in Sent", description: "Follow-up email sent regarding case study submission; no reply.", channel: "Email" }
    ],
    outreachHistory: [
      { id: "OUT-111", date: "2026-08-22 17:00", campaign: "Case Study Reminder", subject: "Status of your BFS Case Study presentation", channel: "Email", status: "Delivered", templateId: "case-reminder" },
      { id: "OUT-112", date: "2026-09-02 10:00", campaign: "Re-engagement Automation", subject: "Re-connecting regarding Leadership Opportunities in BFS", channel: "Email", status: "Delivered", templateId: "re-engage-cooling" }
    ]
  },
  {
    id: "CAN-1010",
    name: "Kavita Seshadri",
    email: "kavita.s@example.com",
    phone: "+91 97411 77334",
    location: "Bengaluru, India",
    roleFamily: "RPA/Automation Analyst",
    targetRole: "Power Automate & AI Solutions Lead",
    experienceYears: 8,
    stage: "Technical Interview",
    appliedDate: "2026-08-18",
    lastActivityDate: "2026-09-18",
    sourceChannel: "Direct Application",
    channelMetadata: {
      jobReqId: "REQ-2026-7889",
      resumeScore: 94,
      appliedVia: "ITC Infotech Careers Portal",
      screeningScore: 92,
      interviewerNotes: "Expert in Microsoft Power Platform, Copilot Studio, and Azure OpenAI integration."
    },
    signals: {
      emailsSent: 5,
      emailsOpened: 5,
      emailClicks: 4,
      responseLatencyHours: 3.2,
      assessmentStatus: "Completed",
      assessmentScore: 93,
      assessmentTurnaroundHours: 14,
      portalRevisits14d: 11,
      interviewSchedulingLatencyHours: 3,
      rescheduleCount: 0,
      profileUpdatesCount: 2,
      lastProfileUpdate: "2026-09-12",
      savedJobsCount: 4,
      jobAlertsSubscribed: true,
      alertsOpenedCount: 6,
      daysSinceLastActivity: 1
    },
    timeline: [
      { id: "TL-120", date: "2026-09-18 12:00", type: "interview_completed", icon: "check-circle", title: "Completed Technical Panel Round", description: "Demonstrated custom AI copilot built on Power Apps. Score: 5.0/5.", channel: "Teams" }
    ],
    outreachHistory: [
      { id: "OUT-113", date: "2026-09-14 10:00", campaign: "Panel Preparation", subject: "Upcoming panel: Microsoft Power Platform COE", channel: "Email", status: "Replied", templateId: "interview-schedule" }
    ]
  },

  // ===================== 3. CONSULTANT / STAFFING VENDORS =====================
  {
    id: "CAN-1011",
    name: "Amitabh Sen Verma",
    email: "amitabh.sv@vendor-profile.net",
    phone: "+91 98311 66552",
    location: "Hyderabad, India",
    roleFamily: "SAP/ERP Consultant",
    targetRole: "SAP SuccessFactors Employee Central Consultant",
    experienceYears: 9,
    stage: "Technical Interview",
    appliedDate: "2026-08-22",
    lastActivityDate: "2026-09-17",
    sourceChannel: "Staffing Vendor",
    channelMetadata: {
      vendorName: "Collabera Tech Solutions",
      vendorContact: "Saurabh Mishra (Vendor Account Manager)",
      vendorSubmissionDate: "2026-08-22",
      vendorNotes: "Immediate joiner, currently finishing project at Infosys. Clean track record.",
      responseTurnaroundHours: 6.0,
      vendorSlaCompliant: true
    },
    signals: {
      emailsSent: 4,
      emailsOpened: 4,
      emailClicks: 3,
      responseLatencyHours: 6.0,
      assessmentStatus: "Completed",
      assessmentScore: 88,
      assessmentTurnaroundHours: 24,
      portalRevisits14d: 4,
      interviewSchedulingLatencyHours: 8,
      rescheduleCount: 0,
      profileUpdatesCount: 1,
      lastProfileUpdate: "2026-08-24",
      savedJobsCount: 1,
      jobAlertsSubscribed: true,
      alertsOpenedCount: 3,
      daysSinceLastActivity: 2
    },
    timeline: [
      { id: "TL-121", date: "2026-09-17 15:00", type: "interview_scheduled", icon: "calendar", title: "SAP Practice Round 2 Scheduled", description: "Coordinated with Collabera account desk. Candidate confirmed within 2 hours.", channel: "Vendor Portal" }
    ],
    outreachHistory: [
      { id: "OUT-114", date: "2026-09-16 11:00", campaign: "Vendor Candidate Confirmation", subject: "Interview Confirmation: SAP SuccessFactors Practice", channel: "Email", status: "Replied", templateId: "vendor-candidate-invite" }
    ]
  },
  {
    id: "CAN-1012",
    name: "Tanvi Saxena",
    email: "tanvi.s@vendor-profile.net",
    phone: "+91 99201 44332",
    location: "Mumbai, India",
    roleFamily: "Cloud/Data Engineer",
    targetRole: "Azure Data Platform & Synapse Specialist",
    experienceYears: 7,
    stage: "Screening",
    appliedDate: "2026-09-01",
    lastActivityDate: "2026-09-16",
    sourceChannel: "Staffing Vendor",
    channelMetadata: {
      vendorName: "Randstad Enterprise Tech",
      vendorContact: "Meenakshi Pillai",
      vendorSubmissionDate: "2026-09-01",
      vendorNotes: "Strong in PySpark and Azure Synapse, 45 days notice period.",
      responseTurnaroundHours: 8.5,
      vendorSlaCompliant: true
    },
    signals: {
      emailsSent: 3,
      emailsOpened: 3,
      emailClicks: 2,
      responseLatencyHours: 9.0,
      assessmentStatus: "Completed",
      assessmentScore: 86,
      assessmentTurnaroundHours: 30,
      portalRevisits14d: 3,
      interviewSchedulingLatencyHours: 12,
      rescheduleCount: 0,
      profileUpdatesCount: 1,
      lastProfileUpdate: "2026-09-02",
      savedJobsCount: 2,
      jobAlertsSubscribed: true,
      alertsOpenedCount: 2,
      daysSinceLastActivity: 3
    },
    timeline: [
      { id: "TL-122", date: "2026-09-16 11:30", type: "assessment_passed", icon: "check-circle", title: "Azure Synapse Coding Assessment Cleared", description: "Score: 86%. Vendor acknowledged result.", channel: "Codility" }
    ],
    outreachHistory: [
      { id: "OUT-115", date: "2026-09-15 14:00", campaign: "Vendor Screening", subject: "Next Round with Cloud Engineering COE", channel: "Email", status: "Opened", templateId: "cloud-screening" }
    ]
  },
  {
    id: "CAN-1013",
    name: "Naveen Sundaram",
    email: "naveen.sundaram@vendor-profile.net",
    phone: "+91 98412 11998",
    location: "Chennai, India",
    roleFamily: "QA Engineer",
    targetRole: "Performance Testing Lead (JMeter & NeoLoad)",
    experienceYears: 10,
    stage: "Screening",
    appliedDate: "2026-08-05",
    lastActivityDate: "2026-08-25",
    sourceChannel: "Staffing Vendor",
    channelMetadata: {
      vendorName: "Allegis Global Solutions",
      vendorContact: "Praveen Rao",
      vendorSubmissionDate: "2026-08-05",
      vendorNotes: "Candidate currently considering multiple concurrent contract offers.",
      responseTurnaroundHours: 48.0,
      vendorSlaCompliant: false
    },
    signals: {
      emailsSent: 5,
      emailsOpened: 1,
      emailClicks: 0,
      responseLatencyHours: 84.0,
      assessmentStatus: "Pending",
      assessmentScore: 0,
      assessmentTurnaroundHours: 0,
      portalRevisits14d: 0,
      interviewSchedulingLatencyHours: 60,
      rescheduleCount: 2,
      profileUpdatesCount: 0,
      lastProfileUpdate: "2026-08-05",
      savedJobsCount: 0,
      jobAlertsSubscribed: false,
      alertsOpenedCount: 0,
      daysSinceLastActivity: 25
    },
    timeline: [
      { id: "TL-123", date: "2026-08-25 15:00", type: "vendor_escalation", icon: "alert-octagon", title: "Vendor SLA Breach Notice", description: "Candidate unresponsive to 3 consecutive outreach attempts via Allegis.", channel: "Vendor Desk" }
    ],
    outreachHistory: [
      { id: "OUT-116", date: "2026-08-25 10:00", campaign: "Performance Lead Reconnect", subject: "Update required on your ITC Infotech QA opportunity", channel: "Email", status: "Delivered", templateId: "vendor-escalate" }
    ]
  },
  {
    id: "CAN-1014",
    name: "Siddharth Anand",
    email: "siddharth.a@vendor-profile.net",
    phone: "+91 97112 33445",
    location: "Delhi NCR, India",
    roleFamily: "Supply Chain Tech Consultant",
    targetRole: "Manhattan WMoS Integration Specialist",
    experienceYears: 11,
    stage: "Offer",
    appliedDate: "2026-08-02",
    lastActivityDate: "2026-09-18",
    sourceChannel: "Staffing Vendor",
    channelMetadata: {
      vendorName: "TeamLease Digital",
      vendorContact: "Ritika Sen",
      vendorSubmissionDate: "2026-08-02",
      vendorNotes: "Top-tier Manhattan specialist with 6 successful implementation cycles.",
      responseTurnaroundHours: 3.5,
      vendorSlaCompliant: true
    },
    signals: {
      emailsSent: 7,
      emailsOpened: 7,
      emailClicks: 6,
      responseLatencyHours: 3.0,
      assessmentStatus: "Completed",
      assessmentScore: 95,
      assessmentTurnaroundHours: 15,
      portalRevisits14d: 10,
      interviewSchedulingLatencyHours: 3,
      rescheduleCount: 0,
      profileUpdatesCount: 2,
      lastProfileUpdate: "2026-09-14",
      savedJobsCount: 3,
      jobAlertsSubscribed: true,
      alertsOpenedCount: 6,
      daysSinceLastActivity: 1
    },
    timeline: [
      { id: "TL-124", date: "2026-09-18 11:00", type: "offer_review", icon: "gift", title: "Offer Acceptance Discussion", description: "Vendor confirmed candidate is 100% aligned with offer terms and joining 1st Oct.", channel: "Vendor Portal" }
    ],
    outreachHistory: [
      { id: "OUT-117", date: "2026-09-17 16:00", campaign: "Offer Onboarding Brief", subject: "Next steps before your Day 1 with ITC Infotech", channel: "Email", status: "Replied", templateId: "offer-welcome" }
    ]
  },
  {
    id: "CAN-1015",
    name: "Rituja Patil",
    email: "rituja.p@vendor-profile.net",
    phone: "+91 98231 77665",
    location: "Pune, India",
    roleFamily: "Domain Consulting",
    targetRole: "Consumer Packaged Goods (CPG) Tech Transformation Advisor",
    experienceYears: 12,
    stage: "Client Interview",
    appliedDate: "2026-08-16",
    lastActivityDate: "2026-09-17",
    sourceChannel: "Staffing Vendor",
    channelMetadata: {
      vendorName: "Randstad Enterprise Tech",
      vendorContact: "Meenakshi Pillai",
      vendorSubmissionDate: "2026-08-16",
      vendorNotes: "Ex-Unilever IT consultant, deep understanding of Trade Promotion Management.",
      responseTurnaroundHours: 4.5,
      vendorSlaCompliant: true
    },
    signals: {
      emailsSent: 6,
      emailsOpened: 6,
      emailClicks: 5,
      responseLatencyHours: 4.2,
      assessmentStatus: "Completed",
      assessmentScore: 92,
      assessmentTurnaroundHours: 18,
      portalRevisits14d: 7,
      interviewSchedulingLatencyHours: 4,
      rescheduleCount: 0,
      profileUpdatesCount: 1,
      lastProfileUpdate: "2026-09-08",
      savedJobsCount: 3,
      jobAlertsSubscribed: true,
      alertsOpenedCount: 5,
      daysSinceLastActivity: 2
    },
    timeline: [
      { id: "TL-125", date: "2026-09-17 14:00", type: "client_interview", icon: "video", title: "Client Round Cleared (Global FMCG Account)", description: "Client feedback: 'Exceptional grasp of CPG distribution and digital twin models.'", channel: "Zoom" }
    ],
    outreachHistory: [
      { id: "OUT-118", date: "2026-09-16 10:00", campaign: "CPG Practice Prep", subject: "FMCG Client Case Study alignment notes", channel: "Email", status: "Replied", templateId: "client-prep" }
    ]
  },

  // ===================== 4. WALK-INS / JOB FAIRS =====================
  {
    id: "CAN-1016",
    name: "Harish Venkataraman",
    email: "harish.v@example.com",
    phone: "+91 99400 88776",
    location: "Bengaluru, India",
    roleFamily: "Cloud/Data Engineer",
    targetRole: "Big Data & PySpark Engineer",
    experienceYears: 5,
    stage: "Technical Interview",
    appliedDate: "2026-09-05",
    lastActivityDate: "2026-09-18",
    sourceChannel: "Walk-in / Job Fair",
    channelMetadata: {
      eventName: "Bengaluru Cloud & AI Walk-in Drive 2026",
      eventDate: "2026-09-05",
      eventLocation: "ITC Infotech Park, Bengaluru",
      resumeFormat: "Digital (QR Code Scan)",
      onSpotScreeningNotes: "Excellent live coding score at booth; cleared fast-track screening.",
      onSpotScreenerName: "Karthik Subramanian (Tech Lead)"
    },
    signals: {
      emailsSent: 4,
      emailsOpened: 4,
      emailClicks: 3,
      responseLatencyHours: 3.8,
      assessmentStatus: "Completed",
      assessmentScore: 90,
      assessmentTurnaroundHours: 12,
      portalRevisits14d: 8,
      interviewSchedulingLatencyHours: 4,
      rescheduleCount: 0,
      profileUpdatesCount: 2,
      lastProfileUpdate: "2026-09-09",
      savedJobsCount: 2,
      jobAlertsSubscribed: true,
      alertsOpenedCount: 4,
      daysSinceLastActivity: 1
    },
    timeline: [
      { id: "TL-126", date: "2026-09-18 10:30", type: "portal_visit", icon: "globe", title: "Viewed Cloud Practice Insights", description: "Spent 12 mins reading ITC Infotech Data Lakehouse whitepaper.", channel: "Portal" },
      { id: "TL-127", date: "2026-09-05 14:00", type: "walkin_screened", icon: "user-check", title: "Cleared On-Spot Drive Screening", description: "Rated 4.8/5 on SQL and PySpark live debugging challenge.", channel: "Drive Booth" }
    ],
    outreachHistory: [
      { id: "OUT-119", date: "2026-09-07 10:00", campaign: "Drive Fast-Track Outreach", subject: "Congratulations on clearing the Bengaluru Drive screening!", channel: "Email", status: "Replied", templateId: "drive-fasttrack" }
    ]
  },
  {
    id: "CAN-1017",
    name: "Akash Deep Mukherjee",
    email: "akash.deep@example.com",
    phone: "+91 98312 99001",
    location: "Kolkata, India",
    roleFamily: "RPA/Automation Analyst",
    targetRole: "UiPath Automation Developer",
    experienceYears: 4,
    stage: "Screening",
    appliedDate: "2026-09-06",
    lastActivityDate: "2026-09-17",
    sourceChannel: "Walk-in / Job Fair",
    channelMetadata: {
      eventName: "Kolkata Tech Fest & Recruitment Summit",
      eventDate: "2026-09-06",
      eventLocation: "Biswa Bangla Convention Centre, Kolkata",
      resumeFormat: "Paper Resume (Digitized by TA)",
      onSpotScreeningNotes: "Certified UiPath Advanced Developer; demonstrated robust portfolio.",
      onSpotScreenerName: "Debjit Roy (RPA COE)"
    },
    signals: {
      emailsSent: 3,
      emailsOpened: 3,
      emailClicks: 2,
      responseLatencyHours: 5.5,
      assessmentStatus: "Completed",
      assessmentScore: 87,
      assessmentTurnaroundHours: 20,
      portalRevisits14d: 5,
      interviewSchedulingLatencyHours: 6,
      rescheduleCount: 0,
      profileUpdatesCount: 1,
      lastProfileUpdate: "2026-09-08",
      savedJobsCount: 3,
      jobAlertsSubscribed: true,
      alertsOpenedCount: 3,
      daysSinceLastActivity: 2
    },
    timeline: [
      { id: "TL-128", date: "2026-09-17 11:00", type: "assessment_passed", icon: "award", title: "Automated Workflow Challenge Cleared", description: "Scored 87% on UiPath Orchestrator queues and error recovery.", channel: "HackerRank" }
    ],
    outreachHistory: [
      { id: "OUT-120", date: "2026-09-09 11:30", campaign: "Drive Fast-Track Outreach", subject: "Next steps from Kolkata Recruitment Summit", channel: "Email", status: "Replied", templateId: "drive-fasttrack" }
    ]
  },
  {
    id: "CAN-1018",
    name: "Deepak Saini",
    email: "deepak.saini@example.com",
    phone: "+91 97290 44112",
    location: "Chandigarh, India",
    roleFamily: "SAP/ERP Consultant",
    targetRole: "SAP ABAP on HANA Developer",
    experienceYears: 6,
    stage: "Screening",
    appliedDate: "2026-08-20",
    lastActivityDate: "2026-08-30",
    sourceChannel: "Walk-in / Job Fair",
    channelMetadata: {
      eventName: "North India ERP Mega Drive",
      eventDate: "2026-08-20",
      eventLocation: "Gurugram Campus",
      resumeFormat: "Paper Resume (Digitized by TA)",
      onSpotScreeningNotes: "Good knowledge of CDS views and AMDP, but communication needs polish.",
      onSpotScreenerName: "Alok Gupta"
    },
    signals: {
      emailsSent: 4,
      emailsOpened: 1,
      emailClicks: 0,
      responseLatencyHours: 110.0,
      assessmentStatus: "Pending",
      assessmentScore: 0,
      assessmentTurnaroundHours: 0,
      portalRevisits14d: 0,
      interviewSchedulingLatencyHours: 96,
      rescheduleCount: 2,
      profileUpdatesCount: 0,
      lastProfileUpdate: "2026-08-20",
      savedJobsCount: 0,
      jobAlertsSubscribed: false,
      alertsOpenedCount: 0,
      daysSinceLastActivity: 20
    },
    timeline: [
      { id: "TL-129", date: "2026-08-30 14:00", type: "warning", icon: "alert-circle", title: "No Response to Technical Round Invite", description: "Candidate did not confirm interview schedule slots for ABAP on HANA.", channel: "Email" }
    ],
    outreachHistory: [
      { id: "OUT-121", date: "2026-08-26 10:00", campaign: "Technical Slot Confirmation", subject: "Select your interview slot for SAP ABAP role", channel: "Email", status: "Delivered", templateId: "interview-schedule" },
      { id: "OUT-122", date: "2026-09-08 14:00", campaign: "Re-engagement Automation", subject: "Are you still interested in SAP ABAP opportunities?", channel: "Email", status: "Delivered", templateId: "re-engage-cooling" }
    ]
  },
  {
    id: "CAN-1019",
    name: "Shalini Prabhu",
    email: "shalini.prabhu@example.com",
    phone: "+91 99801 33224",
    location: "Bengaluru, India",
    roleFamily: "Supply Chain Tech Consultant",
    targetRole: "Kinaxis RapidResponse Consultant",
    experienceYears: 8,
    stage: "Technical Interview",
    appliedDate: "2026-09-05",
    lastActivityDate: "2026-09-18",
    sourceChannel: "Walk-in / Job Fair",
    channelMetadata: {
      eventName: "Bengaluru Cloud & AI Walk-in Drive 2026",
      eventDate: "2026-09-05",
      eventLocation: "ITC Infotech Park, Bengaluru",
      resumeFormat: "Digital (QR Code Scan)",
      onSpotScreeningNotes: "Certified in Kinaxis Authoring & Supply Action. Immediate joiner.",
      onSpotScreenerName: "Karthik Subramanian"
    },
    signals: {
      emailsSent: 4,
      emailsOpened: 4,
      emailClicks: 4,
      responseLatencyHours: 2.8,
      assessmentStatus: "Completed",
      assessmentScore: 94,
      assessmentTurnaroundHours: 15,
      portalRevisits14d: 9,
      interviewSchedulingLatencyHours: 3,
      rescheduleCount: 0,
      profileUpdatesCount: 2,
      lastProfileUpdate: "2026-09-11",
      savedJobsCount: 3,
      jobAlertsSubscribed: true,
      alertsOpenedCount: 5,
      daysSinceLastActivity: 1
    },
    timeline: [
      { id: "TL-130", date: "2026-09-18 09:30", type: "portal_visit", icon: "globe", title: "Careers Portal Activity", description: "Subscribed to Kinaxis & Supply Chain tech alerts.", channel: "Portal" }
    ],
    outreachHistory: [
      { id: "OUT-123", date: "2026-09-12 11:00", campaign: "Supply Chain Fast Track", subject: "RapidResponse Architecture discussion with Practice Director", channel: "Email", status: "Replied", templateId: "sc-interview" }
    ]
  },
  {
    id: "CAN-1020",
    name: "Pradeep Joshi",
    email: "pradeep.joshi@example.com",
    phone: "+91 98200 44551",
    location: "Mumbai, India",
    roleFamily: "QA Engineer",
    targetRole: "Mobile QA & Appium Automation Specialist",
    experienceYears: 5,
    stage: "Screening",
    appliedDate: "2026-08-14",
    lastActivityDate: "2026-08-27",
    sourceChannel: "Walk-in / Job Fair",
    channelMetadata: {
      eventName: "Mumbai Digital Horizons Walk-in 2026",
      eventDate: "2026-08-14",
      eventLocation: "Nesco Exhibition Centre, Mumbai",
      resumeFormat: "Digital (QR Code Scan)",
      onSpotScreeningNotes: "Demonstrated mobile automation framework on Android/iOS.",
      onSpotScreenerName: "Rakesh Verma"
    },
    signals: {
      emailsSent: 4,
      emailsOpened: 1,
      emailClicks: 0,
      responseLatencyHours: 120.0,
      assessmentStatus: "Pending",
      assessmentScore: 0,
      assessmentTurnaroundHours: 0,
      portalRevisits14d: 0,
      interviewSchedulingLatencyHours: 90,
      rescheduleCount: 2,
      profileUpdatesCount: 0,
      lastProfileUpdate: "2026-08-14",
      savedJobsCount: 0,
      jobAlertsSubscribed: false,
      alertsOpenedCount: 0,
      daysSinceLastActivity: 23
    },
    timeline: [
      { id: "TL-131", date: "2026-08-27 16:30", type: "cooling_flag", icon: "snowflake", title: "Candidate Engagement Cooled", description: "No activity for 13 days following screening assessment invite.", channel: "System" }
    ],
    outreachHistory: [
      { id: "OUT-124", date: "2026-08-20 10:00", campaign: "Assessment Invite", subject: "Complete your Mobile Automation challenge", channel: "Email", status: "Delivered", templateId: "assessment-nudge" },
      { id: "OUT-125", date: "2026-09-05 15:00", campaign: "Re-engagement Automation", subject: "Still interested in Mobile QA roles at ITC Infotech?", channel: "Email", status: "Delivered", templateId: "re-engage-cooling" }
    ]
  }
];

// Helper to generate remaining 30 candidates programmatically with balanced realism
(function generateAdditionalCandidates() {
  const roleFamilies = [
    { family: "SAP/ERP Consultant", roles: ["SAP S/4HANA Finance Lead", "SAP SD/MM Functional Consultant", "SAP SuccessFactors Architect", "SAP Integration Suite Specialist"] },
    { family: "Cloud/Data Engineer", roles: ["Databricks & Spark Platform Engineer", "AWS DevOps & Cloud Architect", "Azure Data Lakehouse Specialist", "Snowflake Analytics Engineer"] },
    { family: "RPA/Automation Analyst", roles: ["UiPath Solution Architect", "Automation Anywhere Lead", "Power Automate & Copilot Engineer", "Intelligent Document Processing (IDP) Lead"] },
    { family: "QA Engineer", roles: ["Senior SDET Automation Engineer", "Performance & Load Test Architect", "GenAI Quality Engineering Consultant", "Cypress & Playwright Specialist"] },
    { family: "Supply Chain Tech Consultant", roles: ["Blue Yonder Supply Chain Planning Lead", "SAP SCM & APO Consultant", "Manhattan Active Supply Chain Architect", "Kinaxis Solution Designer"] },
    { family: "Domain Consulting", roles: ["Banking & Open Finance Consultant", "Manufacturing 4.0 Digital Advisor", "CPG Trade Promotion Strategy Consultant", "Healthcare IT Transformation Lead"] }
  ];

  const channels = ["Direct Application", "Staffing Vendor", "Employee Referral", "Walk-in / Job Fair"];
  const cities = ["Bengaluru, India", "Pune, India", "Hyderabad, India", "Kolkata, India", "Chennai, India", "Gurugram, India", "Mumbai, India", "Noida, India"];
  const vendors = ["Collabera Tech Solutions", "Randstad Enterprise Tech", "Allegis Global Solutions", "TeamLease Digital", "Kelly OCG"];
  const stages = ["Screening", "Technical Interview", "Client Interview", "Offer", "Hired", "Screening", "Technical Interview"];

  const names = [
    "Aditya Kashyap", "Meera Nambiar", "Sanjay Singhania", "Tanya Sen", "Karthik Rajan",
    "Divya Sundaram", "Rohan Vaidya", "Neha Parekh", "Varun Teja", "Bhavna Iyer",
    "Anirudh Bose", "Pooja Hegde", "Siddharth Kaul", "Lavanya Krishnan", "Mithun Chakraborty",
    "Ritika Roy", "Nilesh Sawant", "Shruti Pillai", "Arvind Kejriwal", "Pallavi Joshi",
    "Girish Kumar", "Swetha Reddy", "Abhishek Das", "Komal Sharma", "Farhan Akhtar",
    "Dipankar Ghosh", "Preeti Desai", "Sameer Qureshi", "Vasundhara Raje", "Tarun Bajaj"
  ];

  for (let i = 0; i < 30; i++) {
    const id = `CAN-${1021 + i}`;
    const name = names[i];
    const roleChoice = roleFamilies[i % roleFamilies.length];
    const targetRole = roleChoice.roles[i % roleChoice.roles.length];
    const roleFamily = roleChoice.family;
    const channel = channels[i % channels.length];
    const location = cities[i % cities.length];
    const stage = stages[i % stages.length];
    const exp = 4 + (i % 11);

    // Profile engagement persona: Hot (40%), Warm (30%), Cooling (20%), Cold (10%)
    const personaIndex = i % 10;
    let daysSilent, openRate, replyHours, assessStatus, assessScore, portalVisits, alertsOpened;

    if (personaIndex < 4) { // Hot
      daysSilent = 1 + (i % 2);
      openRate = 0.9;
      replyHours = 2 + (i % 4);
      assessStatus = "Completed";
      assessScore = 88 + (i % 11);
      portalVisits = 6 + (i % 8);
      alertsOpened = 4 + (i % 5);
    } else if (personaIndex < 7) { // Warm
      daysSilent = 3 + (i % 3);
      openRate = 0.7;
      replyHours = 8 + (i % 8);
      assessStatus = "Completed";
      assessScore = 78 + (i % 12);
      portalVisits = 3 + (i % 4);
      alertsOpened = 2 + (i % 3);
    } else if (personaIndex < 9) { // Cooling
      daysSilent = 8 + (i % 6);
      openRate = 0.4;
      replyHours = 36 + (i % 24);
      assessStatus = i % 2 === 0 ? "Completed" : "Pending";
      assessScore = assessStatus === "Completed" ? 72 : 0;
      portalVisits = 1;
      alertsOpened = 1;
    } else { // Cold / Dormant
      daysSilent = 18 + (i % 15);
      openRate = 0.15;
      replyHours = 96 + (i % 48);
      assessStatus = "Pending";
      assessScore = 0;
      portalVisits = 0;
      alertsOpened = 0;
    }

    const channelMeta = {};
    if (channel === "Employee Referral") {
      channelMeta.referrerName = `Referrer ${100 + i}`;
      channelMeta.referrerId = `EMP-${30000 + i}`;
      channelMeta.referrerDepartment = roleFamily;
      channelMeta.relationship = i % 2 === 0 ? "Former Colleague" : "Alumni Network";
      channelMeta.referralBonusTier = exp > 8 ? "Tier 1 (Senior)" : "Tier 2 (Mid-Level)";
    } else if (channel === "Staffing Vendor") {
      channelMeta.vendorName = vendors[i % vendors.length];
      channelMeta.vendorContact = `Vendor Lead ${i + 1}`;
      channelMeta.vendorSubmissionDate = "2026-08-25";
      channelMeta.vendorNotes = "Profile screened by vendor technical panel.";
      channelMeta.responseTurnaroundHours = replyHours;
      channelMeta.vendorSlaCompliant = replyHours < 24;
    } else if (channel === "Direct Application") {
      channelMeta.jobReqId = `REQ-2026-${7000 + i}`;
      channelMeta.resumeScore = 80 + (i % 18);
      channelMeta.appliedVia = i % 2 === 0 ? "ITC Infotech Careers Portal" : "LinkedIn Easy Apply";
      channelMeta.screeningScore = 82 + (i % 15);
      channelMeta.interviewerNotes = `Candidate evaluated for ${targetRole}.`;
    } else {
      channelMeta.eventName = i % 2 === 0 ? "Bengaluru Tech Connect 2026" : "Pune Cloud & Digital Drive";
      channelMeta.eventDate = "2026-09-02";
      channelMeta.eventLocation = location;
      channelMeta.resumeFormat = i % 2 === 0 ? "Digital (QR Code Scan)" : "Paper Resume (Digitized by TA)";
      channelMeta.onSpotScreeningNotes = "Cleared 1st round technical aptitude test at booth.";
      channelMeta.onSpotScreenerName = "Panel Lead " + (i + 1);
    }

    window.TALENT_PULSE_DATA.candidates.push({
      id: id,
      name: name,
      email: `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      phone: `+91 98${10000000 + i * 29381}`.slice(0, 15),
      location: location,
      roleFamily: roleFamily,
      targetRole: targetRole,
      experienceYears: exp,
      stage: stage,
      appliedDate: "2026-08-" + (10 + (i % 18)),
      lastActivityDate: "2026-09-" + Math.max(1, 19 - daysSilent),
      sourceChannel: channel,
      channelMetadata: channelMeta,
      signals: {
        emailsSent: 4 + (i % 3),
        emailsOpened: Math.round((4 + (i % 3)) * openRate),
        emailClicks: Math.round((4 + (i % 3)) * openRate * 0.75),
        responseLatencyHours: replyHours,
        assessmentStatus: assessStatus,
        assessmentScore: assessScore,
        assessmentTurnaroundHours: assessStatus === "Completed" ? 16 + (i % 12) : 0,
        portalRevisits14d: portalVisits,
        interviewSchedulingLatencyHours: Math.round(replyHours * 0.6),
        rescheduleCount: daysSilent > 10 ? 1 : 0,
        profileUpdatesCount: daysSilent < 5 ? 2 : 0,
        lastProfileUpdate: "2026-09-" + Math.max(1, 18 - daysSilent),
        savedJobsCount: Math.min(5, portalVisits),
        jobAlertsSubscribed: daysSilent < 12,
        alertsOpenedCount: alertsOpened,
        daysSinceLastActivity: daysSilent
      },
      timeline: [
        {
          id: `TL-GEN-${i}-1`,
          date: `2026-09-${Math.max(1, 19 - daysSilent)} 11:00`,
          type: daysSilent <= 3 ? "portal_visit" : "email_sent",
          icon: daysSilent <= 3 ? "globe" : "mail",
          title: daysSilent <= 3 ? "Careers Portal Revisit" : "Outreach Email Logged",
          description: daysSilent <= 3 
            ? `Candidate reviewed practice opportunities in ${roleFamily}.`
            : `Recruiter reached out with regular pipeline status.`,
          channel: daysSilent <= 3 ? "Portal" : "Email"
        }
      ],
      outreachHistory: [
        {
          id: `OUT-GEN-${i}`,
          date: `2026-09-${Math.max(1, 18 - daysSilent)} 10:00`,
          campaign: `${roleFamily} Nurture Track`,
          subject: `Exciting updates in our ${roleFamily} Practice`,
          channel: "Email",
          status: openRate > 0.5 ? "Opened" : "Delivered",
          templateId: "general-nurture"
        }
      ]
    });
  }
})();
