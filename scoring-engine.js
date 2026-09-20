/**
 * TalentPulse - Engagement Scoring Engine (0-100) with Explainability & Dynamic Weights
 * Features:
 * - Multi-factor behavioral & pipeline analysis
 * - Dynamic time decay based on days of inactivity
 * - Explainable factor breakdown (positive drivers + decay penalties)
 * - Pluggable weight configuration (tunable by recruiters & admins)
 * - Tier classification: Hot (80-100), Warm (60-79), Cooling (40-59), Cold (0-39)
 */

window.TALENT_PULSE_ENGINE = window.TALENT_PULSE_ENGINE || {};

(function() {
  // Default configurable weights (Sum = 100 max possible raw points before decay)
  const defaultWeights = {
    emailResponsiveness: 15,    // Email open and click-through rates
    responseLatency: 20,         // Fast response to recruiter calls/emails (<6h ideal)
    assessmentPerformance: 20,   // Fast & high-scoring assessment completion
    portalActivity: 15,          // Careers portal & jobs page revisit frequency
    interviewResponsiveness: 15, // Speedy interview scheduling & zero reschedules
    explicitInterest: 15,        // Saved jobs, job alerts enabled, profile updates
    decayMultiplier: 1.0         // Inactivity decay penalty sensitivity
  };

  let currentWeights = { ...defaultWeights };

  // Tier classification rules
  function getTier(score) {
    if (score >= 80) {
      return {
        key: "hot",
        label: "Hot",
        badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
        solidBg: "bg-emerald-500",
        textColor: "text-emerald-400",
        ringColor: "#10b981",
        description: "Actively engaged candidate; high response rate; immediate interview & offer priority."
      };
    } else if (score >= 60) {
      return {
        key: "warm",
        label: "Warm",
        badgeClass: "bg-amber-500/10 text-amber-400 border-amber-500/30",
        solidBg: "bg-amber-500",
        textColor: "text-amber-400",
        ringColor: "#f59e0b",
        description: "Moderately engaged; needs steady nurturing & timely recruiter follow-ups."
      };
    } else if (score >= 40) {
      return {
        key: "cooling",
        label: "Cooling",
        badgeClass: "bg-orange-500/10 text-orange-400 border-orange-500/30",
        solidBg: "bg-orange-500",
        textColor: "text-orange-400",
        ringColor: "#f97316",
        description: "Declining engagement; falling response rate; trigger automated re-engagement outreach."
      };
    } else {
      return {
        key: "cold",
        label: "Cold / Dormant",
        badgeClass: "bg-slate-500/10 text-slate-400 border-slate-500/30",
        solidBg: "bg-slate-500",
        textColor: "text-slate-400",
        ringColor: "#64748b",
        description: "Inactive / unresponsive; candidate should be enrolled into long-term talent pool drip."
      };
    }
  }

  /**
   * Calculates engagement score and generates explainability factors
   */
  function calculateCandidateScore(candidate, weights = currentWeights) {
    const s = candidate.signals || {};
    const factors = [];
    let rawScore = 0;

    // 1. Email Responsiveness (Max: weights.emailResponsiveness)
    const emailWeight = weights.emailResponsiveness;
    let emailPoints = 0;
    if (s.emailsSent > 0) {
      const openRatio = s.emailsOpened / s.emailsSent;
      const clickRatio = s.emailClicks / s.emailsSent;
      emailPoints = Math.round(emailWeight * (openRatio * 0.6 + clickRatio * 0.4));
    }
    rawScore += emailPoints;
    factors.push({
      name: "Outreach & Email Interaction",
      points: emailPoints,
      maxPoints: emailWeight,
      type: emailPoints >= emailWeight * 0.7 ? "positive" : (emailPoints <= emailWeight * 0.3 ? "warning" : "neutral"),
      explanation: `${s.emailsOpened || 0} of ${s.emailsSent || 0} emails opened (${s.emailClicks || 0} link clicks)`
    });

    // 2. Response Latency (Max: weights.responseLatency)
    const latencyWeight = weights.responseLatency;
    let latencyPoints = 0;
    const latency = s.responseLatencyHours !== undefined ? s.responseLatencyHours : 48;
    if (latency <= 4) {
      latencyPoints = latencyWeight;
    } else if (latency <= 12) {
      latencyPoints = Math.round(latencyWeight * 0.85);
    } else if (latency <= 24) {
      latencyPoints = Math.round(latencyWeight * 0.65);
    } else if (latency <= 48) {
      latencyPoints = Math.round(latencyWeight * 0.4);
    } else if (latency <= 96) {
      latencyPoints = Math.round(latencyWeight * 0.2);
    } else {
      latencyPoints = 0;
    }
    rawScore += latencyPoints;
    factors.push({
      name: "Recruiter Response Speed",
      points: latencyPoints,
      maxPoints: latencyWeight,
      type: latency <= 12 ? "positive" : (latency > 48 ? "penalty" : "neutral"),
      explanation: latency <= 24 ? `Avg reply latency ${latency.toFixed(1)} hrs (Rapid responder)` : `Delayed reply latency ${latency.toFixed(1)} hrs`
    });

    // 3. Assessment Completion & Turnaround (Max: weights.assessmentPerformance)
    const assessWeight = weights.assessmentPerformance;
    let assessPoints = 0;
    if (s.assessmentStatus === "Completed") {
      const scoreComponent = (s.assessmentScore || 80) / 100;
      const speedBonus = s.assessmentTurnaroundHours <= 24 ? 1.0 : (s.assessmentTurnaroundHours <= 48 ? 0.8 : 0.6);
      assessPoints = Math.round(assessWeight * scoreComponent * speedBonus);
      factors.push({
        name: "Technical Assessment",
        points: assessPoints,
        maxPoints: assessWeight,
        type: "positive",
        explanation: `Completed test scoring ${s.assessmentScore}% within ${s.assessmentTurnaroundHours}h`
      });
    } else if (s.assessmentStatus === "In Progress") {
      assessPoints = Math.round(assessWeight * 0.4);
      factors.push({
        name: "Technical Assessment",
        points: assessPoints,
        maxPoints: assessWeight,
        type: "neutral",
        explanation: `Assessment currently in progress`
      });
    } else {
      assessPoints = 0;
      factors.push({
        name: "Technical Assessment",
        points: 0,
        maxPoints: assessWeight,
        type: "warning",
        explanation: `Assessment pending or unattempted`
      });
    }
    rawScore += assessPoints;

    // 4. Careers Portal Revisit Activity (Max: weights.portalActivity)
    const portalWeight = weights.portalActivity;
    const visits = s.portalRevisits14d || 0;
    let portalPoints = Math.min(portalWeight, Math.round((visits / 8) * portalWeight));
    rawScore += portalPoints;
    factors.push({
      name: "Portal Revisit Frequency",
      points: portalPoints,
      maxPoints: portalWeight,
      type: visits >= 4 ? "positive" : (visits === 0 ? "warning" : "neutral"),
      explanation: `${visits} portal sessions logged in the last 14 days`
    });

    // 5. Interview Scheduling Responsiveness (Max: weights.interviewResponsiveness)
    const interviewWeight = weights.interviewResponsiveness;
    let interviewPoints = interviewWeight;
    const schedLatency = s.interviewSchedulingLatencyHours || 12;
    const reschedules = s.rescheduleCount || 0;
    
    if (schedLatency > 48) interviewPoints -= Math.round(interviewWeight * 0.4);
    else if (schedLatency > 24) interviewPoints -= Math.round(interviewWeight * 0.2);
    
    interviewPoints -= reschedules * Math.round(interviewWeight * 0.3);
    interviewPoints = Math.max(0, interviewPoints);
    rawScore += interviewPoints;
    factors.push({
      name: "Interview Scheduling Agility",
      points: interviewPoints,
      maxPoints: interviewWeight,
      type: reschedules === 0 && schedLatency <= 12 ? "positive" : (reschedules > 0 ? "penalty" : "neutral"),
      explanation: reschedules === 0 ? `Confirmed slots in ${schedLatency}h with 0 reschedules` : `${reschedules} interview reschedule(s) requested`
    });

    // 6. Explicit Interest Signals (Max: weights.explicitInterest)
    const interestWeight = weights.explicitInterest;
    let interestPoints = 0;
    const saved = s.savedJobsCount || 0;
    const alertSub = s.jobAlertsSubscribed ? 1 : 0;
    const alertOpens = s.alertsOpenedCount || 0;
    const profileFresh = (s.profileUpdatesCount || 0) > 0 ? 1 : 0;

    interestPoints = Math.round(
      interestWeight * (
        (Math.min(3, saved) / 3) * 0.35 +
        alertSub * 0.25 +
        (Math.min(4, alertOpens) / 4) * 0.25 +
        profileFresh * 0.15
      )
    );
    rawScore += interestPoints;
    factors.push({
      name: "Explicit Intent & Alerts",
      points: interestPoints,
      maxPoints: interestWeight,
      type: interestPoints >= interestWeight * 0.6 ? "positive" : "neutral",
      explanation: `${saved} saved job(s), ${alertOpens} alerts opened, profile freshness verified`
    });

    // 7. Time Inactivity Decay Penalty
    const daysSilent = s.daysSinceLastActivity !== undefined ? s.daysSinceLastActivity : 0;
    let decayPenalty = 0;
    if (daysSilent > 5) {
      // Deducts points based on inactivity duration multiplied by decay multiplier
      decayPenalty = Math.round((daysSilent - 4) * 2.2 * (weights.decayMultiplier || 1.0));
      // Cap decay so it doesn't drop below 0
      decayPenalty = Math.min(rawScore, Math.min(45, decayPenalty));
    }

    if (decayPenalty > 0) {
      factors.push({
        name: "Inactivity Time Decay",
        points: -decayPenalty,
        maxPoints: 0,
        type: "penalty",
        explanation: `${daysSilent} days since last candidate engagement touchpoint (-${decayPenalty} pts)`
      });
    }

    // Final Score bounded between 0 and 100
    const finalScore = Math.max(0, Math.min(100, rawScore - decayPenalty));
    const tier = getTier(finalScore);

    // Recommended next action calculation
    let recommendedAction = "";
    let actionType = "outreach";
    let actionButtonText = "Send Outreach";

    if (tier.key === "hot") {
      if (candidate.stage === "Technical Interview" || candidate.stage === "Client Interview") {
        recommendedAction = "Fast-track interview panel scheduling; candidate has very high engagement and may be holding concurrent offers.";
        actionButtonText = "Fast-Track Interview";
        actionType = "schedule";
      } else if (candidate.stage === "Offer") {
        recommendedAction = "Schedule Executive Pre-joining Connect with Practice VP to secure offer acceptance.";
        actionButtonText = "Offer Acceptance Call";
        actionType = "offer";
      } else {
        recommendedAction = "Prioritize immediate recruiter screening call today; candidate is at peak responsiveness.";
        actionButtonText = "Schedule Priority Call";
        actionType = "call";
      }
    } else if (tier.key === "warm") {
      recommendedAction = `Share targeted ${candidate.roleFamily} Practice Tech Spotlight and client impact case study to nurture interest.`;
      actionButtonText = "Send Role Spotlight";
      actionType = "nurture";
    } else if (tier.key === "cooling") {
      recommendedAction = `Trigger Automated Cooling Re-engagement Sequence (${candidate.roleFamily} custom variant) before candidate drops to cold.`;
      actionButtonText = "Trigger Re-engagement";
      actionType = "reengage";
    } else {
      recommendedAction = "Candidate inactive. Enroll in quarterly alumni/talent-pool newsletter and refresh contact data.";
      actionButtonText = "Enroll in Talent Pool";
      actionType = "talent_pool";
    }

    return {
      score: finalScore,
      rawScore: rawScore,
      decayPenalty: decayPenalty,
      tier: tier.label,
      tierKey: tier.key,
      tierBadge: tier.badgeClass,
      solidBg: tier.solidBg,
      textColor: tier.textColor,
      ringColor: tier.ringColor,
      tierDescription: tier.description,
      factors: factors,
      recommendedAction: recommendedAction,
      actionButtonText: actionButtonText,
      actionType: actionType
    };
  }

  /**
   * Recalculates scores for all candidates in the dataset
   */
  function recalculateAllCandidates(candidatesList, weights = currentWeights) {
    if (!Array.isArray(candidatesList)) return;
    candidatesList.forEach(cand => {
      const result = calculateCandidateScore(cand, weights);
      cand.engagementScore = result.score;
      cand.engagementTier = result.tier;
      cand.engagementTierKey = result.tierKey;
      cand.scoreDetails = result;
    });
  }

  window.TALENT_PULSE_ENGINE = {
    getWeights: () => ({ ...currentWeights }),
    setWeights: (newWeights) => {
      currentWeights = { ...currentWeights, ...newWeights };
    },
    resetWeights: () => {
      currentWeights = { ...defaultWeights };
    },
    calculateCandidateScore,
    recalculateAllCandidates,
    getTier
  };
})();
