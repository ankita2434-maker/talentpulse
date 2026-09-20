/**
 * TalentPulse - Outreach Automation & Campaign Engine
 * Features:
 * - Rule-based proactive triggers
 * - Drip campaign sequence engine (multi-step scheduling with day delays)
 * - Role-aware template library with merge fields
 * - A/B testing framework (Subject & copy variants with comparative analytics)
 * - Candidate touchpoint logging & response simulation
 */

window.TALENT_PULSE_CAMPAIGNS = window.TALENT_PULSE_CAMPAIGNS || {};

(function() {
  // Pre-configured role-aware email and SMS templates
  const templateLibrary = [
    {
      id: "tpl-sap-nurture",
      roleFamily: "SAP/ERP Consultant",
      name: "SAP S/4HANA Transformation Spotlight",
      channel: "Email",
      subjectVariantA: "Transforming global enterprises with SAP S/4HANA at ITC Infotech",
      subjectVariantB: "Hi {{first_name}}, an architect-level view into our SAP Practice",
      bodyVariantA: `Hi {{first_name}},

Hope you're having a productive week!

Our Enterprise ERP Solutions practice at ITC Infotech is currently scaling our S/4HANA Cloud and Central Finance implementations for Fortune 500 manufacturing and consumer enterprises.

Given your deep experience in {{target_role}}, we'd love to share an overview of the architectural challenges our team is currently tackling, including clean core transformations and BTP integrations.

Would you be open for a 15-minute informal conversation with our Practice Director this Thursday or Friday?

Best regards,
Talent Acquisition Team | ITC Infotech`,
      bodyVariantB: `Hi {{first_name}},

I noticed your extensive background in {{target_role}}. At ITC Infotech, we're building next-generation SAP solutions with an emphasis on S/4HANA Cloud and AI-assisted automation.

We have a fast-moving track for key leadership and architectural positions in your domain. I'd love to connect and see if our roadmap aligns with your next career milestone.

Feel free to reply directly or pick a convenient slot here: [Schedule 15-min Call].

Warm regards,
Senior Recruiter | Enterprise ERP`
    },
    {
      id: "tpl-cloud-data",
      roleFamily: "Cloud/Data Engineer",
      name: "Cloud Data Modernization Deep Dive",
      channel: "Email",
      subjectVariantA: "Building modern Data Lakehouses with Snowflake & Databricks",
      subjectVariantB: "{{first_name}}, let's talk modern data architectures at ITC Infotech",
      bodyVariantA: `Hi {{first_name}},

Enterprises today need real-time data streaming and unified data governance. Our Cloud & Data practice is driving multi-cloud modernizations using Snowflake, Databricks Unity Catalog, and AWS/Azure native stacks.

Your background as {{target_role}} stands out to our engineering leadership. We would value an opportunity to discuss upcoming project blueprints and how you could lead high-impact client deliveries.

Are you available for a brief catch-up later this week?

Cheers,
Data & AI Talent Team | ITC Infotech`,
      bodyVariantB: `Hi {{first_name}},

Quick note from the ITC Infotech Data Practice! We are expanding our core team of senior data architects for major UK and US digital transformation engagements.

With your hands-on expertise in {{target_role}}, you would be an ideal fit for our high-velocity teams.

Could we schedule a quick 10-minute briefing on our tech stack and current open reqs?

Best,
Cloud Sourcing Desk`
    },
    {
      id: "tpl-rpa-ai",
      roleFamily: "RPA/Automation Analyst",
      name: "Intelligent Automation & AI Agents Nurture",
      channel: "Email",
      subjectVariantA: "From RPA to Autonomous AI Agents: Explore opportunities at ITC Infotech",
      subjectVariantB: "{{first_name}}, take your Automation career to the next level",
      bodyVariantA: `Hi {{first_name}},

Intelligent Automation is evolving rapidly from traditional RPA to cognitive workflows powered by GenAI and Agentic AI. At ITC Infotech's Automation COE, we build end-to-end enterprise digital workers using UiPath, Microsoft Power Automate, and custom LLM workflows.

We were impressed by your profile as {{target_role}} and would love to explore how our vision aligns with your aspirations.

Let's connect for a brief 15-minute introduction.

Warm regards,
Intelligent Automation Practice`,
      bodyVariantB: `Hi {{first_name}},

Are you ready to build autonomous automation systems for global leaders?

We're recruiting lead specialists in {{target_role}} to head client delivery teams across Europe and APAC. Let's find 15 minutes this week to discuss our exciting pipeline!

Best,
Automation Hiring Lead`
    },
    {
      id: "tpl-qa-genai",
      roleFamily: "QA Engineer",
      name: "Quality Engineering & Autonomous Testing",
      channel: "Email",
      subjectVariantA: "Redefining Quality Engineering with GenAI & Playwright",
      subjectVariantB: "{{first_name}}, explore Lead SDET & QA Architect roles",
      bodyVariantA: `Hi {{first_name}},

Modern software testing is no longer just scripts—it's self-healing test automation and synthetic test data generation. At ITC Infotech Quality Engineering, we partner with industry leaders to deliver flawless digital customer experiences.

Your credentials as {{target_role}} are a strong match for our strategic client accounts. We'd love to invite you for a fast-track conversation.

Looking forward to hearing from you.

Sincerely,
Quality Engineering Talent Partner`,
      bodyVariantB: `Hi {{first_name}},

I came across your strong track record in software quality assurance and automation. We are actively hiring for {{target_role}} within our Quality Engineering Center of Excellence.

Would you be open to an exploratory chat this week?

Best regards,
QE Recruiting Team`
    },
    {
      id: "tpl-supplychain",
      roleFamily: "Supply Chain Tech Consultant",
      name: "Supply Chain Digital Transformation Nurture",
      channel: "Email",
      subjectVariantA: "Optimizing global supply chains with Blue Yonder & Kinaxis",
      subjectVariantB: "{{first_name}}, leading CPG & Retail supply chain modernization",
      bodyVariantA: `Hi {{first_name}},

Global supply chain resilience is a board-level priority for our enterprise clients. ITC Infotech's Supply Chain practice delivers end-to-end WMS, TMS, and digital planning solutions.

Given your background in {{target_role}}, we would love to connect and share details on our tier-1 supply chain advisory projects.

Can we set up a brief chat this week?

Warm regards,
Supply Chain Practice Leader`,
      bodyVariantB: `Hi {{first_name}},

Are you looking to lead large-scale supply chain implementations? We have multiple high-visibility roles for {{target_role}} supporting global retail and CPG titans.

Let me know when you have 10 minutes to talk!

Regards,
Supply Chain Talent Partner`
    },
    {
      id: "tpl-re-engage-cooling",
      roleFamily: "All",
      name: "Cooling Candidate Re-Engagement Nudge",
      channel: "Email",
      subjectVariantA: "Still exploring your next move, {{first_name}}?",
      subjectVariantB: "{{first_name}} — exciting updates regarding your application with ITC Infotech",
      bodyVariantA: `Hi {{first_name}},

I wanted to check in regarding your interest in the {{target_role}} position with ITC Infotech.

We understand life gets busy and priorities shift, but your profile remains top of mind for our technical panel. If you are still exploring new horizons, we can fast-track your next discussion.

If timing is not right, simply let us know and we will keep your profile warm for future leadership roles.

Best regards,
Senior Recruitment Partner | ITC Infotech`,
      bodyVariantB: `Hi {{first_name}},

Checking in to see if you have any questions regarding your {{target_role}} opportunity! Our team recently released new practice highlights and client engagements that match your profile.

Would 10 minutes tomorrow work to reconnect?

Warmly,
Talent Acquisition Team`
    },
    {
      id: "tpl-sms-quick",
      roleFamily: "All",
      name: "Fast-Track SMS / WhatsApp Touch",
      channel: "SMS",
      tone: "Direct & Fast",
      subjectVariantA: "Quick check-in from ITC Infotech",
      subjectVariantB: "Update on your {{target_role}} application",
      bodyVariantA: `Hi {{first_name}}, Priya from ITC Infotech TA. Impressed by your {{target_role}} background! We have immediate openings in our {{role_family}} team. Quick 10-min chat this week? Reply YES to connect.`,
      bodyVariantB: `Hello {{first_name}}, following up on your application for {{target_role}} at ITC Infotech. We'd love to fast-track your profile. Pick a quick 10-min slot: https://itcinfotech.com/careers/slot`
    },
    {
      id: "tpl-inmail-executive",
      roleFamily: "All",
      name: "Executive LinkedIn InMail Invitation",
      channel: "InMail",
      tone: "Executive Leadership",
      subjectVariantA: "{{first_name}}, leadership opportunity in {{role_family}} at ITC Infotech",
      subjectVariantB: "Confidential inquiry: {{target_role}} role with ITC Infotech Consulting",
      bodyVariantA: `Hi {{first_name}},

I’ve been following your impressive track record in the {{role_family}} space, particularly your expertise as {{target_role}}.

Our Consulting Practice is currently heading high-impact digital modernizations for global Fortune 500 enterprises. Given your technical depth, our Practice VP would value a confidential conversation to explore potential leadership synergies.

Would you be open to an introductory discussion this week?

Best regards,
Priya Sharma | Senior Executive Recruiter | ITC Infotech`,
      bodyVariantB: `Hi {{first_name}},

Reaching out directly as our Practice Leadership identified your background as a strong match for an upcoming strategic {{target_role}} appointment.

If you're open to exploring new horizons with global client exposure and architectural autonomy, I'd be delighted to share our practice roadmap.

Warmly,
Senior Executive Recruiter`
    }
  ];

  // Active automated drip campaigns
  let activeCampaigns = [
    {
      id: "CMP-2026-01",
      name: "Cooling Talent Re-Engagement Drip (Q3)",
      status: "Active",
      createdAt: "2026-09-01",
      targetSegment: {
        tiers: ["Cooling"],
        roleFamilies: ["All"],
        stages: ["Screening", "Technical Interview"],
        channels: ["All"]
      },
      audienceCount: 14,
      steps: [
        { stepNumber: 1, delayDays: 0, channel: "Email", templateId: "tpl-re-engage-cooling", name: "Gentle Status Check" },
        { stepNumber: 2, delayDays: 3, channel: "SMS", templateId: "tpl-re-engage-cooling", name: "Quick 2-min WhatsApp/SMS Touch" },
        { stepNumber: 3, delayDays: 7, channel: "Email", templateId: "tpl-re-engage-cooling", name: "Practice Highlights & Fast-Track Offer" }
      ],
      abTest: {
        enabled: true,
        variantAName: "Informal Peer Tone",
        variantBName: "Executive Leadership Tone",
        sentCountA: 7,
        sentCountB: 7,
        openedA: 5,
        openedB: 4,
        repliedA: 3,
        repliedB: 2
      },
      metrics: {
        sent: 14,
        delivered: 14,
        opened: 9,
        clicked: 6,
        replied: 5,
        conversionRate: "35.7%"
      }
    },
    {
      id: "CMP-2026-02",
      name: "SAP S/4HANA Practice Fast-Track Nurture",
      status: "Active",
      createdAt: "2026-09-08",
      targetSegment: {
        tiers: ["Hot", "Warm"],
        roleFamilies: ["SAP/ERP Consultant"],
        stages: ["Sourced", "Screening", "Technical Interview"],
        channels: ["Direct Application", "Employee Referral"]
      },
      audienceCount: 18,
      steps: [
        { stepNumber: 1, delayDays: 0, channel: "Email", templateId: "tpl-sap-nurture", name: "Practice Architecture Overview" },
        { stepNumber: 2, delayDays: 4, channel: "Email", templateId: "tpl-sap-nurture", name: "Executive VP Meet Invite" }
      ],
      abTest: {
        enabled: true,
        variantAName: "Project Scale Focus",
        variantBName: "Fast-Track Career Growth",
        sentCountA: 9,
        sentCountB: 9,
        openedA: 8,
        openedB: 7,
        repliedA: 6,
        repliedB: 5
      },
      metrics: {
        sent: 18,
        delivered: 18,
        opened: 15,
        clicked: 12,
        replied: 11,
        conversionRate: "61.1%"
      }
    },
    {
      id: "CMP-2026-03",
      name: "Cloud & Data Engineering Elite Nurture",
      status: "Active",
      createdAt: "2026-09-10",
      targetSegment: {
        tiers: ["Hot", "Warm"],
        roleFamilies: ["Cloud/Data Engineer"],
        stages: ["Screening", "Technical Interview"],
        channels: ["All"]
      },
      audienceCount: 22,
      steps: [
        { stepNumber: 1, delayDays: 0, channel: "Email", templateId: "tpl-cloud-data", name: "Databricks & Snowflake Blueprint" },
        { stepNumber: 2, delayDays: 5, channel: "Email", templateId: "tpl-cloud-data", name: "Tech Lead Fast-Track Briefing" }
      ],
      abTest: {
        enabled: true,
        variantAName: "Tech Architecture Specs",
        variantBName: "Global Client Impact",
        sentCountA: 11,
        sentCountB: 11,
        openedA: 10,
        openedB: 9,
        repliedA: 7,
        repliedB: 6
      },
      metrics: {
        sent: 22,
        delivered: 22,
        opened: 19,
        clicked: 14,
        replied: 13,
        conversionRate: "59.1%"
      }
    },
    {
      id: "CMP-2026-04",
      name: "Job Fair & Walk-in Fast-Track Accelerator",
      status: "Active",
      createdAt: "2026-09-06",
      targetSegment: {
        tiers: ["Hot", "Warm"],
        roleFamilies: ["All"],
        stages: ["Screening"],
        channels: ["Walk-in / Job Fair"]
      },
      audienceCount: 12,
      steps: [
        { stepNumber: 1, delayDays: 0, channel: "Email", templateId: "tpl-cloud-data", name: "Drive Follow-up & Next Steps" },
        { stepNumber: 2, delayDays: 2, channel: "SMS", templateId: "tpl-cloud-data", name: "Quick Slot Booking SMS" }
      ],
      abTest: {
        enabled: false,
        sentCountA: 12,
        sentCountB: 0,
        openedA: 10,
        openedB: 0,
        repliedA: 8,
        repliedB: 0
      },
      metrics: {
        sent: 12,
        delivered: 12,
        opened: 10,
        clicked: 9,
        replied: 8,
        conversionRate: "66.7%"
      }
    }
  ];

  // Rule-based proactive triggers
  const automatedTriggers = [
    {
      id: "TRG-101",
      name: "Cooling Score Auto-Reengagement",
      condition: "Engagement score drops below 50 AND no recruiter contact in 7+ days",
      action: "Automatically enroll candidate in 'Cooling Talent Re-Engagement Drip' (Role-customized variant)",
      status: "Enabled",
      lastFired: "Today at 09:15 AM",
      matchesCount: 6
    },
    {
      id: "TRG-102",
      name: "High-Intent Hot Lead Alert",
      condition: "Candidate visits careers portal 3+ times in 48 hours OR opens 2+ job alerts",
      action: "Send high-priority Teams notification to assigned Recruiter & bump to top of daily attention list",
      status: "Enabled",
      lastFired: "Today at 11:30 AM",
      matchesCount: 9
    },
    {
      id: "TRG-103",
      name: "Assessment Pending 48h Reminder",
      condition: "Technical assessment unattempted after 48 hours from invite",
      action: "Send automated gentle SMS/Email nudge with practice prep tips",
      status: "Enabled",
      lastFired: "Yesterday at 16:45 PM",
      matchesCount: 4
    },
    {
      id: "TRG-104",
      name: "Staffing Vendor SLA Escalation",
      condition: "Vendor candidate submission has no interview slot confirmed after 72 hours",
      action: "Alert Vendor Relationship Desk to contact agency account manager",
      status: "Enabled",
      lastFired: "2 days ago",
      matchesCount: 2
    }
  ];

  /**
   * Replaces merge fields in a template string with actual candidate data
   */
  function populateMergeFields(text, candidate) {
    if (!text || !candidate) return "";
    const meta = candidate.channelMetadata || {};
    return text
      .replace(/{{first_name}}/g, candidate.name ? candidate.name.split(" ")[0] : "Candidate")
      .replace(/{{full_name}}/g, candidate.name || "")
      .replace(/{{target_role}}/g, candidate.targetRole || "Senior Technology Specialist")
      .replace(/{{role_family}}/g, candidate.roleFamily || "Technology Consulting")
      .replace(/{{source_channel}}/g, candidate.sourceChannel || "Careers Portal")
      .replace(/{{referrer_name}}/g, meta.referrerName || "our leadership team")
      .replace(/{{company}}/g, "ITC Infotech");
  }

  /**
   * Creates a new campaign and stores it in the active campaigns list
   */
  function createCampaign(campaignData) {
    const newId = `CMP-2026-${String(activeCampaigns.length + 1).padStart(2, '0')}`;
    const newCampaign = {
      id: newId,
      name: campaignData.name || "Custom Outreach Campaign",
      status: "Active",
      createdAt: new Date().toISOString().split('T')[0],
      targetSegment: campaignData.targetSegment || {
        tiers: ["All"],
        roleFamilies: ["All"],
        stages: ["All"],
        channels: ["All"]
      },
      audienceCount: campaignData.audienceCount || 0,
      steps: campaignData.steps || [
        { stepNumber: 1, delayDays: 0, channel: "Email", templateId: "tpl-re-engage-cooling", name: "Initial Touch" },
        { stepNumber: 2, delayDays: 3, channel: "Email", templateId: "tpl-re-engage-cooling", name: "Follow-up" }
      ],
      abTest: {
        enabled: campaignData.abTestEnabled || false,
        variantAName: campaignData.variantAName || "Standard Approach",
        variantBName: campaignData.variantBName || "Value Proposition Focus",
        sentCountA: Math.ceil((campaignData.audienceCount || 10) / 2),
        sentCountB: Math.floor((campaignData.audienceCount || 10) / 2),
        openedA: 0,
        openedB: 0,
        repliedA: 0,
        repliedB: 0
      },
      metrics: {
        sent: campaignData.audienceCount || 0,
        delivered: campaignData.audienceCount || 0,
        opened: 0,
        clicked: 0,
        replied: 0,
        conversionRate: "0.0%"
      }
    };
    activeCampaigns.unshift(newCampaign);
    return newCampaign;
  }

  /**
   * Logs a manual or automated outreach touchpoint to a candidate's profile
   */
  function logCandidateOutreach(candidate, details) {
    if (!candidate) return;
    const outreachId = `OUT-ACT-${Date.now().toString().slice(-4)}`;
    const newEntry = {
      id: outreachId,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      campaign: details.campaignName || "1-Click Direct Recruiter Outreach",
      subject: details.subject || "Exciting Opportunity at ITC Infotech",
      channel: details.channel || "Email",
      status: "Delivered",
      templateId: details.templateId || "manual"
    };
    
    candidate.outreachHistory = candidate.outreachHistory || [];
    candidate.outreachHistory.unshift(newEntry);

    // Also add to candidate interaction timeline
    candidate.timeline = candidate.timeline || [];
    candidate.timeline.unshift({
      id: `TL-ACT-${Date.now().toString().slice(-4)}`,
      date: newEntry.date,
      type: "outreach_sent",
      icon: details.channel === "SMS" ? "message-square" : "mail",
      title: `${details.channel || "Email"} Outreach Sent`,
      description: `Sent "${details.subject}". Message: ${details.body ? details.body.slice(0, 80) + '...' : ''}`,
      channel: details.channel || "Email"
    });

    // Reset inactivity days and boost responsiveness
    if (candidate.signals) {
      candidate.signals.emailsSent = (candidate.signals.emailsSent || 0) + 1;
      candidate.signals.daysSinceLastActivity = 0;
    }
  }

  /**
   * Updates an existing outreach template
   */
  function updateTemplate(templateId, updatedFields) {
    const idx = templateLibrary.findIndex(t => t.id === templateId);
    if (idx !== -1) {
      templateLibrary[idx] = { ...templateLibrary[idx], ...updatedFields };
      return templateLibrary[idx];
    }
    return null;
  }

  /**
   * Creates and stores a new customized outreach template
   */
  function createTemplate(templateData) {
    const newId = `tpl-custom-${Date.now().toString().slice(-4)}`;
    const newTemplate = {
      id: newId,
      roleFamily: templateData.roleFamily || "All",
      name: templateData.name || "Custom Outreach Template",
      channel: templateData.channel || "Email",
      tone: templateData.tone || "Professional Consulting",
      subjectVariantA: templateData.subjectVariantA || "Opportunity with ITC Infotech",
      subjectVariantB: templateData.subjectVariantB || "Exploring next steps at ITC Infotech",
      bodyVariantA: templateData.bodyVariantA || "Hi {{first_name}}, ...",
      bodyVariantB: templateData.bodyVariantB || "Hi {{first_name}}, ..."
    };
    templateLibrary.unshift(newTemplate);
    return newTemplate;
  }

  window.TALENT_PULSE_CAMPAIGNS = {
    getTemplates: () => [...templateLibrary],
    getActiveCampaigns: () => [...activeCampaigns],
    getAutomatedTriggers: () => [...automatedTriggers],
    populateMergeFields,
    createCampaign,
    logCandidateOutreach,
    updateTemplate,
    createTemplate
  };
})();
