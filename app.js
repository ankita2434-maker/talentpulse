/**
 * TalentPulse - Main Application Controller
 * Coordinates:
 * - Reactive state & dataset synchronization
 * - View router (Dashboard, Candidates, 360 Profile, Campaigns, Analytics, Settings)
 * - Persona switching (Recruiter, TA Lead, Leadership)
 * - Interactive charts (Funnel, Score Gauge, 30-day Trend, Channel ROI)
 * - 3-Step Campaign Builder wizard with live audience estimator
 * - 1-Click Quick Outreach modal with merge fields and timeline logging
 * - Dynamic scoring weight adjustments with live recalculation
 */

(function() {
  // Application State
  const state = {
    candidates: [],
    campaigns: [],
    currentView: 'dashboard',
    selectedCandidateId: null,
    activePersona: 'recruiter', // 'recruiter' | 'ta_lead' | 'leadership'
    filters: {
      search: '',
      roleFamily: 'All',
      channel: 'All',
      tier: 'All',
      stage: 'All'
    },
    campaignWizard: {
      currentStep: 1,
      name: '',
      selectedChannels: ['All'],
      selectedRoleFamilies: ['All'],
      selectedTiers: ['Cooling'],
      selectedStages: ['All'],
      steps: [
        { stepNumber: 1, delayDays: 0, channel: 'Email', templateId: 'tpl-re-engage-cooling', name: 'Initial Re-engagement Touch' },
        { stepNumber: 2, delayDays: 3, channel: 'Email', templateId: 'tpl-re-engage-cooling', name: 'Value Proposition & Role Focus' }
      ],
      abTestEnabled: true,
      variantAName: 'Consulting Impact Focus',
      variantBName: 'Career Growth & Autonomy Focus'
    }
  };

  // DOM Elements cache
  let elements = {};

  // Initialize Application
  function init() {
    // 1. Load data
    state.candidates = window.TALENT_PULSE_DATA ? [...window.TALENT_PULSE_DATA.candidates] : [];
    state.campaigns = window.TALENT_PULSE_CAMPAIGNS ? window.TALENT_PULSE_CAMPAIGNS.getActiveCampaigns() : [];

    // 2. Compute initial scores
    if (window.TALENT_PULSE_ENGINE) {
      window.TALENT_PULSE_ENGINE.recalculateAllCandidates(state.candidates);
    }

    // 3. Set default selected candidate
    if (state.candidates.length > 0) {
      state.selectedCandidateId = state.candidates[0].id;
    }

    // 4. Cache DOM elements
    cacheElements();

    // 5. Setup event listeners
    bindEvents();

    // 6. Initial render
    renderApp();

    console.log("TalentPulse initialized successfully with", state.candidates.length, "candidates.");
  }

  function cacheElements() {
    elements = {
      navItems: document.querySelectorAll('[data-nav-view]'),
      views: {
        dashboard: document.getElementById('view-dashboard'),
        candidates: document.getElementById('view-candidates'),
        candidate360: document.getElementById('view-candidate-360'),
        campaigns: document.getElementById('view-campaigns'),
        analytics: document.getElementById('view-analytics'),
        settings: document.getElementById('view-settings')
      },
      personaSelector: document.getElementById('persona-select'),
      personaBadge: document.getElementById('persona-badge'),
      personaName: document.getElementById('persona-name'),
      personaRole: document.getElementById('persona-role'),
      // Metric counters
      metricActiveCandidates: document.getElementById('metric-total-active'),
      metricHotCount: document.getElementById('metric-hot-count'),
      metricWarmCount: document.getElementById('metric-warm-count'),
      metricCoolingCount: document.getElementById('metric-cooling-count'),
      metricColdCount: document.getElementById('metric-cold-count'),
      metricCampaignsRunning: document.getElementById('metric-campaigns-running'),
      metricAttentionToday: document.getElementById('metric-attention-today'),
      // Tables & Containers
      attentionTableBody: document.getElementById('attention-table-body'),
      allCandidatesTableBody: document.getElementById('candidates-table-body'),
      campaignsListContainer: document.getElementById('active-campaigns-list'),
      // Filters
      searchInput: document.getElementById('filter-search'),
      roleFilter: document.getElementById('filter-role'),
      channelFilter: document.getElementById('filter-channel'),
      tierFilter: document.getElementById('filter-tier'),
      // Candidate 360 container
      candidate360Container: document.getElementById('candidate-360-container'),
      // Modals
      outreachModal: document.getElementById('outreach-modal'),
      outreachModalCandidateName: document.getElementById('outreach-candidate-name'),
      outreachModalRole: document.getElementById('outreach-candidate-role'),
      outreachTemplateSelect: document.getElementById('outreach-template-select'),
      outreachSubjectInput: document.getElementById('outreach-subject-input'),
      outreachBodyInput: document.getElementById('outreach-body-input'),
      outreachChannelSelect: document.getElementById('outreach-channel-select'),
      outreachSendBtn: document.getElementById('outreach-send-btn'),
      outreachCancelBtn: document.getElementById('outreach-cancel-btn'),
      // Campaign Wizard
      campaignAudienceCount: document.getElementById('campaign-audience-count'),
      campaignPreviewBody: document.getElementById('campaign-preview-body')
    };
  }

  function bindEvents() {
    // Navigation routing
    elements.navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetView = item.getAttribute('data-nav-view');
        switchView(targetView);
      });
    });

    // Persona Switcher
    if (elements.personaSelector) {
      elements.personaSelector.addEventListener('change', (e) => {
        setPersona(e.target.value);
      });
    }

    // Filter controls
    if (elements.searchInput) {
      elements.searchInput.addEventListener('input', (e) => {
        state.filters.search = e.target.value.toLowerCase();
        renderFilteredLists();
      });
    }
    if (elements.roleFilter) {
      elements.roleFilter.addEventListener('change', (e) => {
        state.filters.roleFamily = e.target.value;
        renderFilteredLists();
      });
    }
    if (elements.channelFilter) {
      elements.channelFilter.addEventListener('change', (e) => {
        state.filters.channel = e.target.value;
        renderFilteredLists();
      });
    }
    if (elements.tierFilter) {
      elements.tierFilter.addEventListener('change', (e) => {
        state.filters.tier = e.target.value;
        renderFilteredLists();
      });
    }

    // Quick Outreach modal controls
    if (elements.outreachCancelBtn) {
      elements.outreachCancelBtn.addEventListener('click', closeOutreachModal);
    }
    if (elements.outreachSendBtn) {
      elements.outreachSendBtn.addEventListener('click', executeOutreachSend);
    }
    if (elements.outreachTemplateSelect) {
      elements.outreachTemplateSelect.addEventListener('change', (e) => {
        populateOutreachFromTemplate(e.target.value);
      });
    }

    // Settings weight sliders live calculation
    const weightInputs = ['weight-email', 'weight-latency', 'weight-assessment', 'weight-portal', 'weight-interview', 'weight-interest', 'weight-decay'];
    weightInputs.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', () => {
          updateWeightLabels();
        });
      }
    });

    const saveWeightsBtn = document.getElementById('btn-save-weights');
    if (saveWeightsBtn) {
      saveWeightsBtn.addEventListener('click', applyNewWeights);
    }
    const resetWeightsBtn = document.getElementById('btn-reset-weights');
    if (resetWeightsBtn) {
      resetWeightsBtn.addEventListener('click', resetWeightsToDefault);
    }

    // Campaign Wizard buttons
    const wizardNextBtn = document.getElementById('wizard-next-btn');
    if (wizardNextBtn) {
      wizardNextBtn.addEventListener('click', advanceCampaignWizard);
    }
    const wizardPrevBtn = document.getElementById('wizard-prev-btn');
    if (wizardPrevBtn) {
      wizardPrevBtn.addEventListener('click', regressCampaignWizard);
    }
    const launchCampaignBtn = document.getElementById('btn-launch-campaign');
    if (launchCampaignBtn) {
      launchCampaignBtn.addEventListener('click', launchCreatedCampaign);
    }
  }

  // Persona Management
  function setPersona(persona) {
    state.activePersona = persona;
    const personaProfiles = {
      recruiter: {
        name: "Priya Sharma",
        role: "Senior Tech Recruiter",
        badge: "Recruiter View",
        badgeClass: "bg-blue-500/20 text-blue-300 border-blue-500/40"
      },
      ta_lead: {
        name: "Vikram Malhotra",
        role: "Head of Talent Acquisition",
        badge: "TA Lead / Admin",
        badgeClass: "bg-teal-500/20 text-teal-300 border-teal-500/40"
      },
      leadership: {
        name: "Rajeev Tandon",
        role: "VP - Global Tech Services",
        badge: "Executive Leadership",
        badgeClass: "bg-purple-500/20 text-purple-300 border-purple-500/40"
      }
    };

    const profile = personaProfiles[persona] || personaProfiles.recruiter;
    if (elements.personaName) elements.personaName.textContent = profile.name;
    if (elements.personaRole) elements.personaRole.textContent = profile.role;
    if (elements.personaBadge) {
      elements.personaBadge.textContent = profile.badge;
      elements.personaBadge.className = `px-2.5 py-0.5 rounded-full text-xs font-medium border ${profile.badgeClass}`;
    }

    showToast(`Switched view to ${profile.badge} (${profile.name})`);

    // In leadership persona, direct to analytics if on dashboard
    if (persona === 'leadership' && state.currentView === 'dashboard') {
      switchView('analytics');
    }
  }

  // View Routing
  function switchView(viewName) {
    if (!elements.views[viewName]) return;

    state.currentView = viewName;

    // Update active nav styling
    elements.navItems.forEach(item => {
      if (item.getAttribute('data-nav-view') === viewName) {
        item.classList.add('bg-slate-800', 'text-teal-400', 'border-l-4', 'border-teal-400');
        item.classList.remove('text-slate-400', 'hover:bg-slate-800/50');
      } else {
        item.classList.remove('bg-slate-800', 'text-teal-400', 'border-l-4', 'border-teal-400');
        item.classList.add('text-slate-400', 'hover:bg-slate-800/50');
      }
    });

    // Toggle views visibility
    Object.keys(elements.views).forEach(key => {
      if (key === viewName) {
        elements.views[key].classList.remove('hidden');
      } else {
        elements.views[key].classList.add('hidden');
      }
    });

    // Trigger view-specific re-renders
    if (viewName === 'dashboard') renderDashboard();
    else if (viewName === 'candidates') renderCandidatesList();
    else if (viewName === 'candidate360') renderCandidate360(state.selectedCandidateId);
    else if (viewName === 'campaigns') renderCampaignsView();
    else if (viewName === 'analytics') renderAnalyticsView();
    else if (viewName === 'settings') renderSettingsView();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Master Render
  function renderApp() {
    renderDashboard();
    renderCandidatesList();
    renderCampaignsView();
    renderAnalyticsView();
    renderSettingsView();
  }

  // 1. RECRUITER DASHBOARD RENDERER
  function renderDashboard() {
    const analytics = window.TALENT_PULSE_ANALYTICS.computeAnalytics(state.candidates, state.campaigns);
    const summary = analytics.summary;

    // Summary Metric Cards
    if (elements.metricActiveCandidates) elements.metricActiveCandidates.textContent = summary.totalCandidates;
    if (elements.metricHotCount) elements.metricHotCount.textContent = summary.hotTotal;
    if (elements.metricWarmCount) elements.metricWarmCount.textContent = summary.warmTotal;
    if (elements.metricCoolingCount) elements.metricCoolingCount.textContent = summary.coolingTotal;
    if (elements.metricColdCount) elements.metricColdCount.textContent = summary.coldTotal;
    if (elements.metricCampaignsRunning) elements.metricCampaignsRunning.textContent = summary.activeCampaignsCount;
    if (elements.metricAttentionToday) elements.metricAttentionToday.textContent = summary.urgentAttentionTotal;

    // Render Source Funnel Visual
    renderSourceFunnel(analytics.channelStats);

    // Render Priority "Attention Required Today" Candidates
    renderAttentionCandidates();
  }

  function renderSourceFunnel(channelStats) {
    const funnelContainer = document.getElementById('funnel-bars-container');
    if (!funnelContainer) return;

    const channels = Object.values(channelStats);
    const maxTotal = Math.max(...channels.map(c => c.totalSourced), 1);

    funnelContainer.innerHTML = channels.map(ch => {
      const pct = Math.round((ch.totalSourced / maxTotal) * 100);
      const hotPct = ch.totalSourced > 0 ? Math.round((ch.hotTierCount / ch.totalSourced) * 100) : 0;
      
      let badgeClass = "channel-direct";
      if (ch.name === "Employee Referral") badgeClass = "channel-referral";
      else if (ch.name === "Staffing Vendor") badgeClass = "channel-vendor";
      else if (ch.name === "Walk-in / Job Fair") badgeClass = "channel-walkin";

      return `
        <div class="space-y-1.5">
          <div class="flex items-center justify-between text-xs">
            <span class="font-medium px-2 py-0.5 rounded text-[11px] ${badgeClass}">${ch.name}</span>
            <div class="flex items-center space-x-3 text-slate-400">
              <span><b>${ch.totalSourced}</b> Sourced</span>
              <span class="text-emerald-400">🔥 <b>${ch.hotTierCount}</b> Hot (${hotPct}%)</span>
              <span class="text-teal-400">💼 <b>${ch.hiresCount + ch.offersCount}</b> Hired/Offers</span>
            </div>
          </div>
          <div class="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex">
            <div class="bg-emerald-500 h-full" style="width: ${(ch.hotTierCount / ch.totalSourced) * 100}%" title="Hot Candidates"></div>
            <div class="bg-amber-500 h-full" style="width: ${(ch.warmTierCount / ch.totalSourced) * 100}%" title="Warm Candidates"></div>
            <div class="bg-orange-500 h-full" style="width: ${(ch.coolingTierCount / ch.totalSourced) * 100}%" title="Cooling Candidates"></div>
            <div class="bg-slate-600 h-full" style="width: ${(ch.coldTierCount / ch.totalSourced) * 100}%" title="Cold Candidates"></div>
          </div>
        </div>
      `;
    }).join('');
  }

  function renderAttentionCandidates() {
    if (!elements.attentionTableBody) return;

    // Filter candidates needing urgent attention:
    // 1. Cooling tier candidates (risk of losing them)
    // 2. Hot tier candidates waiting in interview/offer stage
    const priorityList = state.candidates
      .filter(c => c.engagementTierKey === 'cooling' || (c.engagementTierKey === 'hot' && c.stage !== 'Hired'))
      .sort((a, b) => {
        // Cooling first, then highest score
        if (a.engagementTierKey === 'cooling' && b.engagementTierKey !== 'cooling') return -1;
        if (b.engagementTierKey === 'cooling' && a.engagementTierKey !== 'cooling') return 1;
        return b.engagementScore - a.engagementScore;
      })
      .slice(0, 7);

    elements.attentionTableBody.innerHTML = priorityList.map(cand => {
      const details = cand.scoreDetails || {};
      const channelClass = getChannelBadgeClass(cand.sourceChannel);

      return `
        <tr class="border-b border-slate-800 hover:bg-slate-800/40 transition-colors">
          <td class="py-3.5 px-4">
            <div class="flex items-center space-x-3">
              <div class="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-teal-400 font-semibold text-xs">
                ${cand.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <button onclick="window.TALENT_PULSE_APP.viewCandidate360('${cand.id}')" class="font-semibold text-sm text-slate-100 hover:text-teal-400 text-left transition-colors">
                  ${cand.name}
                </button>
                <div class="text-xs text-slate-400">${cand.targetRole}</div>
              </div>
            </div>
          </td>
          <td class="py-3.5 px-4 text-xs text-slate-300">
            <span class="inline-block px-2 py-0.5 rounded text-[11px] font-medium ${channelClass}">
              ${cand.sourceChannel}
            </span>
          </td>
          <td class="py-3.5 px-4 text-xs text-slate-300">
            <span class="px-2 py-0.5 rounded text-xs bg-slate-800 text-slate-300 border border-slate-700 font-medium">
              ${cand.stage}
            </span>
          </td>
          <td class="py-3.5 px-4">
            <div class="flex items-center space-x-2">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${details.tierBadge || 'badge-hot'}">
                ${cand.engagementScore} — ${cand.engagementTier}
              </span>
            </div>
          </td>
          <td class="py-3.5 px-4 text-xs text-slate-400">
            <div class="flex items-center space-x-1">
              <i data-lucide="clock" class="w-3.5 h-3.5 text-slate-500"></i>
              <span>${cand.signals.daysSinceLastActivity === 0 ? 'Today' : `${cand.signals.daysSinceLastActivity}d ago`}</span>
            </div>
            <div class="text-[11px] text-slate-500 truncate max-w-[160px]">${details.recommendedAction ? details.recommendedAction.slice(0, 30) + '...' : ''}</div>
          </td>
          <td class="py-3.5 px-4 text-right">
            <div class="flex items-center justify-end space-x-2">
              <button onclick="window.TALENT_PULSE_APP.viewCandidate360('${cand.id}')" class="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded transition-colors" title="View 360 Profile">
                <i data-lucide="eye" class="w-4 h-4"></i>
              </button>
              <button onclick="window.TALENT_PULSE_APP.openOutreachModal('${cand.id}')" class="px-2.5 py-1 text-xs font-medium rounded bg-teal-500/20 text-teal-300 hover:bg-teal-500/30 border border-teal-500/40 transition-all flex items-center space-x-1">
                <i data-lucide="send" class="w-3 h-3"></i>
                <span>Outreach</span>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  // 2. CANDIDATES LIST RENDERER (Filterable)
  function renderCandidatesList() {
    renderFilteredLists();
  }

  function renderFilteredLists() {
    if (!elements.allCandidatesTableBody) return;

    const filtered = state.candidates.filter(c => {
      const matchesSearch = !state.filters.search || 
        c.name.toLowerCase().includes(state.filters.search) || 
        c.targetRole.toLowerCase().includes(state.filters.search) ||
        c.location.toLowerCase().includes(state.filters.search) ||
        c.id.toLowerCase().includes(state.filters.search);

      const matchesRole = state.filters.roleFamily === 'All' || c.roleFamily === state.filters.roleFamily;
      const matchesChannel = state.filters.channel === 'All' || c.sourceChannel === state.filters.channel;
      const matchesTier = state.filters.tier === 'All' || c.engagementTierKey === state.filters.tier.toLowerCase();

      return matchesSearch && matchesRole && matchesChannel && matchesTier;
    });

    const countLabel = document.getElementById('candidates-filtered-count');
    if (countLabel) countLabel.textContent = `Showing ${filtered.length} of ${state.candidates.length} candidates`;

    elements.allCandidatesTableBody.innerHTML = filtered.map(cand => {
      const details = cand.scoreDetails || {};
      const channelClass = getChannelBadgeClass(cand.sourceChannel);

      return `
        <tr class="border-b border-slate-800/80 hover:bg-slate-800/50 transition-colors">
          <td class="py-3 px-4">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-teal-400 font-semibold text-xs">
                ${cand.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <button onclick="window.TALENT_PULSE_APP.viewCandidate360('${cand.id}')" class="font-medium text-sm text-slate-100 hover:text-teal-400 text-left transition-colors">
                  ${cand.name}
                </button>
                <div class="text-xs text-slate-400">${cand.email} • ${cand.location}</div>
              </div>
            </div>
          </td>
          <td class="py-3 px-4 text-xs text-slate-200">
            <div class="font-medium">${cand.targetRole}</div>
            <div class="text-[11px] text-slate-400">${cand.roleFamily} (${cand.experienceYears}y exp)</div>
          </td>
          <td class="py-3 px-4 text-xs">
            <span class="inline-block px-2 py-0.5 rounded text-[11px] font-medium ${channelClass}">
              ${cand.sourceChannel}
            </span>
          </td>
          <td class="py-3 px-4 text-xs">
            <span class="px-2 py-0.5 rounded text-xs bg-slate-800 text-slate-300 border border-slate-700">
              ${cand.stage}
            </span>
          </td>
          <td class="py-3 px-4">
            <div class="flex items-center space-x-2">
              <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold border ${details.tierBadge || 'badge-hot'}">
                ${cand.engagementScore}
              </span>
              <span class="text-xs font-medium text-slate-300">${cand.engagementTier}</span>
            </div>
          </td>
          <td class="py-3 px-4 text-xs text-slate-400">
            ${cand.signals.daysSinceLastActivity === 0 ? 'Active today' : `${cand.signals.daysSinceLastActivity}d silent`}
          </td>
          <td class="py-3 px-4 text-right">
            <div class="flex items-center justify-end space-x-2">
              <button onclick="window.TALENT_PULSE_APP.viewCandidate360('${cand.id}')" class="px-2 py-1 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded border border-slate-700 transition-colors">
                View 360
              </button>
              <button onclick="window.TALENT_PULSE_APP.openOutreachModal('${cand.id}')" class="p-1 text-teal-400 hover:text-teal-300 hover:bg-teal-500/20 rounded transition-colors" title="Send Outreach">
                <i data-lucide="send" class="w-4 h-4"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  // 3. CANDIDATE 360 PROFILE RENDERER
  function renderCandidate360(candidateId) {
    const candidate = state.candidates.find(c => c.id === candidateId) || state.candidates[0];
    if (!candidate || !elements.candidate360Container) return;

    state.selectedCandidateId = candidate.id;
    const details = candidate.scoreDetails || window.TALENT_PULSE_ENGINE.calculateCandidateScore(candidate);
    const meta = candidate.channelMetadata || {};
    const channelClass = getChannelBadgeClass(candidate.sourceChannel);

    // Circumference of SVG circle (radius = 54 -> C = 2 * PI * 54 = 339.29)
    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    const strokeOffset = circumference - (candidate.engagementScore / 100) * circumference;

    // Format channel metadata box
    let channelMetaHtml = '';
    if (candidate.sourceChannel === 'Employee Referral') {
      channelMetaHtml = `
        <div class="bg-purple-950/20 border border-purple-800/30 rounded-lg p-3 text-xs space-y-1">
          <div class="text-purple-300 font-semibold flex items-center space-x-1.5">
            <i data-lucide="user-check" class="w-4 h-4"></i>
            <span>Employee Referral Details</span>
          </div>
          <div class="text-slate-300"><b>Referrer:</b> ${meta.referrerName || 'N/A'} (${meta.referrerId || ''})</div>
          <div class="text-slate-300"><b>Department:</b> ${meta.referrerDepartment || 'Consulting'}</div>
          <div class="text-slate-400"><b>Relationship:</b> ${meta.relationship || 'Peer'}</div>
          <div class="text-purple-300 text-[11px] font-medium">Eligible: ${meta.referralBonusTier || 'Tier 2'}</div>
        </div>
      `;
    } else if (candidate.sourceChannel === 'Staffing Vendor') {
      channelMetaHtml = `
        <div class="bg-sky-950/20 border border-sky-800/30 rounded-lg p-3 text-xs space-y-1">
          <div class="text-sky-300 font-semibold flex items-center space-x-1.5">
            <i data-lucide="briefcase" class="w-4 h-4"></i>
            <span>Staffing Vendor Partner</span>
          </div>
          <div class="text-slate-300"><b>Agency:</b> ${meta.vendorName || 'Staffing Partner'}</div>
          <div class="text-slate-300"><b>Vendor Lead:</b> ${meta.vendorContact || 'Vendor Desk'}</div>
          <div class="text-slate-400"><b>Turnaround Time:</b> ${meta.responseTurnaroundHours || 8} hrs (SLA: ${meta.vendorSlaCompliant ? 'Compliant' : 'Breached'})</div>
          <div class="text-slate-300 italic text-[11px]">"${meta.vendorNotes || 'Strong candidate profile.'}"</div>
        </div>
      `;
    } else if (candidate.sourceChannel === 'Walk-in / Job Fair') {
      channelMetaHtml = `
        <div class="bg-amber-950/20 border border-amber-800/30 rounded-lg p-3 text-xs space-y-1">
          <div class="text-amber-300 font-semibold flex items-center space-x-1.5">
            <i data-lucide="map-pin" class="w-4 h-4"></i>
            <span>Recruitment Drive / Job Fair</span>
          </div>
          <div class="text-slate-300"><b>Drive Name:</b> ${meta.eventName || 'Regional Tech Drive'}</div>
          <div class="text-slate-300"><b>Location:</b> ${meta.eventLocation || 'Bengaluru'} (${meta.eventDate || 'Recent'})</div>
          <div class="text-slate-400"><b>Resume Intake:</b> ${meta.resumeFormat || 'Digital'}</div>
          <div class="text-slate-300 text-[11px]"><b>On-Spot Screener:</b> ${meta.onSpotScreenerName || 'TA Panel'} — "${meta.onSpotScreeningNotes || 'Cleared'}"</div>
        </div>
      `;
    } else {
      channelMetaHtml = `
        <div class="bg-blue-950/20 border border-blue-800/30 rounded-lg p-3 text-xs space-y-1">
          <div class="text-blue-300 font-semibold flex items-center space-x-1.5">
            <i data-lucide="file-text" class="w-4 h-4"></i>
            <span>Direct Application (ATS)</span>
          </div>
          <div class="text-slate-300"><b>Job Req:</b> ${meta.jobReqId || 'REQ-2026-8000'}</div>
          <div class="text-slate-300"><b>Resume Score:</b> ${meta.resumeScore || 88}% Match</div>
          <div class="text-slate-400"><b>Applied Via:</b> ${meta.appliedVia || 'Careers Portal'}</div>
          <div class="text-slate-300 text-[11px]"><b>Review:</b> "${meta.interviewerNotes || 'Direct candidate submission.'}"</div>
        </div>
      `;
    }

    elements.candidate360Container.innerHTML = `
      <!-- Header Banner Card -->
      <div class="glass-panel rounded-xl p-6 relative overflow-hidden border border-slate-700/60">
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div class="flex items-start space-x-4">
            <div class="w-16 h-16 rounded-xl bg-slate-800 border-2 border-teal-500/40 flex items-center justify-center text-teal-300 font-bold text-2xl shadow-lg">
              ${candidate.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div class="space-y-1">
              <div class="flex items-center space-x-3 flex-wrap">
                <h2 class="text-2xl font-bold text-white">${candidate.name}</h2>
                <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold ${details.tierBadge}">
                  ${details.tier} Tier
                </span>
                <span class="px-2.5 py-0.5 rounded-full text-xs font-medium ${channelClass}">
                  ${candidate.sourceChannel}
                </span>
              </div>
              <div class="text-sm font-medium text-teal-400">${candidate.targetRole}</div>
              <div class="flex items-center space-x-4 text-xs text-slate-400 pt-1 flex-wrap">
                <span><i data-lucide="mail" class="w-3.5 h-3.5 inline mr-1 text-slate-500"></i>${candidate.email}</span>
                <span><i data-lucide="phone" class="w-3.5 h-3.5 inline mr-1 text-slate-500"></i>${candidate.phone}</span>
                <span><i data-lucide="map-pin" class="w-3.5 h-3.5 inline mr-1 text-slate-500"></i>${candidate.location}</span>
                <span><i data-lucide="briefcase" class="w-3.5 h-3.5 inline mr-1 text-slate-500"></i>${candidate.experienceYears} Years Experience</span>
              </div>
            </div>
          </div>

          <div class="flex items-center space-x-6 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <!-- Circular Gauge -->
            <div class="relative w-28 h-28 flex items-center justify-center">
              <svg class="w-28 h-28 transform -rotate-90">
                <circle cx="56" cy="56" r="48" stroke="currentColor" stroke-width="8" class="text-slate-800" fill="transparent" />
                <circle cx="56" cy="56" r="48" stroke="${details.ringColor}" stroke-width="8" 
                        stroke-dasharray="${2 * Math.PI * 48}" stroke-dashoffset="${(2 * Math.PI * 48) - (candidate.engagementScore / 100) * (2 * Math.PI * 48)}"
                        stroke-linecap="round" fill="transparent" class="score-gauge-circle" />
              </svg>
              <div class="absolute flex flex-col items-center justify-center text-center">
                <span class="text-3xl font-black text-white">${candidate.engagementScore}</span>
                <span class="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Pulse Score</span>
              </div>
            </div>

            <div class="space-y-2">
              <div class="text-xs text-slate-400">Current Stage</div>
              <div class="text-sm font-bold text-slate-200 bg-slate-800 px-3 py-1 rounded border border-slate-700 inline-block">
                ${candidate.stage}
              </div>
              <div>
                <button onclick="window.TALENT_PULSE_APP.openOutreachModal('${candidate.id}')" class="px-3.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-medium text-xs shadow-md transition-all flex items-center space-x-1.5">
                  <i data-lucide="send" class="w-3.5 h-3.5"></i>
                  <span>Send Outreach</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recommended Action Callout Banner -->
      <div class="bg-gradient-to-r from-teal-950/40 via-slate-900 to-blue-950/40 border border-teal-500/30 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="flex items-start space-x-3">
          <div class="p-2 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 shrink-0">
            <i data-lucide="zap" class="w-5 h-5"></i>
          </div>
          <div>
            <div class="text-xs uppercase font-bold tracking-wider text-teal-400">Recommended Next Action</div>
            <div class="text-sm text-slate-200 mt-0.5">${details.recommendedAction}</div>
          </div>
        </div>
        <button onclick="window.TALENT_PULSE_APP.openOutreachModal('${candidate.id}', '${details.actionType}')" class="px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold text-xs transition-colors shrink-0 shadow-lg shadow-teal-500/20">
          ${details.actionButtonText || 'Take Action'}
        </button>
      </div>

      <!-- Main Content Grid (3 Columns) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <!-- Left Column: Explainability & Channel Metadata (4 cols) -->
        <div class="lg:col-span-4 space-y-6">
          
          <!-- Channel Metadata Box -->
          ${channelMetaHtml}

          <!-- "Why This Score" Contributing Factors -->
          <div class="glass-panel rounded-xl p-5 border border-slate-700/60 space-y-4">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 class="font-bold text-sm text-white flex items-center space-x-2">
                <i data-lucide="pie-chart" class="w-4 h-4 text-teal-400"></i>
                <span>Why This Score? (Explainability)</span>
              </h3>
              <span class="text-xs text-slate-400">${details.tier} Tier</span>
            </div>

            <div class="space-y-3">
              ${details.factors.map(f => {
                let badgeStyle = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
                let sign = "+";
                if (f.type === 'penalty') {
                  badgeStyle = "bg-rose-500/10 text-rose-400 border-rose-500/20";
                  sign = "";
                } else if (f.type === 'warning') {
                  badgeStyle = "bg-amber-500/10 text-amber-400 border-amber-500/20";
                  sign = "";
                }

                return `
                  <div class="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 space-y-1">
                    <div class="flex items-center justify-between text-xs">
                      <span class="font-medium text-slate-200">${f.name}</span>
                      <span class="px-1.5 py-0.5 rounded text-[11px] font-bold border ${badgeStyle}">
                        ${sign}${f.points} ${f.maxPoints > 0 ? `/ ${f.maxPoints} pts` : 'pts'}
                      </span>
                    </div>
                    <div class="text-[11px] text-slate-400 leading-relaxed">${f.explanation}</div>
                  </div>
                `;
              }).join('')}
            </div>

            <div class="pt-2 text-[11px] text-slate-500 border-t border-slate-800/60 text-center">
              Weights can be adjusted in the Settings tab
            </div>
          </div>
        </div>

        <!-- Middle & Right Columns: Activity Timeline & Trend Line (8 cols) -->
        <div class="lg:col-span-8 space-y-6">
          
          <!-- Score Trend Sparkline Card -->
          <div class="glass-panel rounded-xl p-5 border border-slate-700/60 space-y-3">
            <div class="flex items-center justify-between">
              <h3 class="font-bold text-sm text-white flex items-center space-x-2">
                <i data-lucide="trending-up" class="w-4 h-4 text-teal-400"></i>
                <span>30-Day Engagement Score Trend</span>
              </h3>
              <div class="text-xs text-slate-400 flex items-center space-x-2">
                <span>Last updated: <b>${candidate.lastActivityDate}</b></span>
              </div>
            </div>

            <!-- SVG Score Trend Line -->
            <div class="w-full h-32 bg-slate-900/80 rounded-lg p-2 flex flex-col justify-end border border-slate-800 relative">
              ${renderScoreTrendSvg(candidate)}
            </div>
          </div>

          <!-- Omnichannel Interaction Activity Timeline -->
          <div class="glass-panel rounded-xl p-5 border border-slate-700/60 space-y-4">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 class="font-bold text-sm text-white flex items-center space-x-2">
                <i data-lucide="activity" class="w-4 h-4 text-teal-400"></i>
                <span>Omnichannel Interaction Timeline</span>
              </h3>
              <span class="text-xs text-slate-400">${(candidate.timeline || []).length} recorded touchpoints</span>
            </div>

            <div class="relative pl-6 space-y-6 timeline-stem">
              ${(candidate.timeline || []).map(tl => {
                return `
                  <div class="relative pl-2">
                    <!-- Dot Icon -->
                    <div class="absolute -left-6 top-0 w-6 h-6 rounded-full bg-slate-900 border-2 border-teal-500/50 flex items-center justify-center text-teal-400 shadow">
                      <i data-lucide="${tl.icon || 'circle'}" class="w-3 h-3"></i>
                    </div>

                    <div class="bg-slate-900/70 p-3.5 rounded-lg border border-slate-800 space-y-1">
                      <div class="flex items-center justify-between text-xs flex-wrap">
                        <span class="font-semibold text-slate-100">${tl.title}</span>
                        <div class="flex items-center space-x-2 text-slate-400 text-[11px]">
                          <span class="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">${tl.channel || 'System'}</span>
                          <span>${tl.date}</span>
                        </div>
                      </div>
                      <div class="text-xs text-slate-300">${tl.description}</div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Outreach History Log -->
          <div class="glass-panel rounded-xl p-5 border border-slate-700/60 space-y-3">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 class="font-bold text-sm text-white flex items-center space-x-2">
                <i data-lucide="mail-check" class="w-4 h-4 text-teal-400"></i>
                <span>Outreach & Campaign Delivery Log</span>
              </h3>
              <button onclick="window.TALENT_PULSE_APP.openOutreachModal('${candidate.id}')" class="text-xs text-teal-400 hover:text-teal-300 font-medium">
                + New Message
              </button>
            </div>

            <div class="space-y-2">
              ${(candidate.outreachHistory || []).map(out => {
                let statusBadge = "bg-blue-500/20 text-blue-300 border-blue-500/30";
                if (out.status === 'Replied') statusBadge = "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
                else if (out.status === 'Opened') statusBadge = "bg-amber-500/20 text-amber-300 border-amber-500/30";

                return `
                  <div class="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 border border-slate-800 text-xs">
                    <div class="space-y-0.5">
                      <div class="font-semibold text-slate-200">${out.subject}</div>
                      <div class="text-slate-400 text-[11px]">${out.campaign} • via ${out.channel}</div>
                    </div>
                    <div class="flex items-center space-x-3">
                      <span class="px-2 py-0.5 rounded text-[11px] font-medium border ${statusBadge}">${out.status}</span>
                      <span class="text-slate-500 text-[11px]">${out.date}</span>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

        </div>

      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  }

  function renderScoreTrendSvg(candidate) {
    // Generate 6 historic data points leading to current score
    const currentScore = candidate.engagementScore;
    const daysSilent = (candidate.signals && candidate.signals.daysSinceLastActivity) || 0;
    
    // Simulate trend based on current state
    const points = [];
    if (currentScore > 75) {
      points.push(currentScore - 20, currentScore - 12, currentScore - 5, currentScore - 8, currentScore - 2, currentScore);
    } else if (currentScore < 50) {
      points.push(currentScore + 30, currentScore + 25, currentScore + 18, currentScore + 10, currentScore + 4, currentScore);
    } else {
      points.push(currentScore - 5, currentScore + 8, currentScore - 2, currentScore + 5, currentScore - 4, currentScore);
    }

    const svgWidth = 600;
    const svgHeight = 100;
    const xStep = svgWidth / (points.length - 1);

    const coordinates = points.map((p, index) => {
      const clamped = Math.max(0, Math.min(100, p));
      const y = svgHeight - (clamped / 100) * (svgHeight - 20) - 10;
      const x = index * xStep;
      return { x, y, val: clamped };
    });

    const pathD = coordinates.reduce((acc, pt, idx) => {
      return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
    }, "");

    const areaD = `${pathD} L ${svgWidth} ${svgHeight} L 0 ${svgHeight} Z`;

    return `
      <svg viewBox="0 0 ${svgWidth} ${svgHeight}" class="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#14b8a6" stop-opacity="0.3" />
            <stop offset="100%" stop-color="#14b8a6" stop-opacity="0.0" />
          </linearGradient>
        </defs>
        <!-- Area fill -->
        <path d="${areaD}" fill="url(#trendGrad)" />
        <!-- Trend stroke -->
        <path d="${pathD}" fill="none" stroke="#14b8a6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        <!-- Data dots -->
        ${coordinates.map(pt => `
          <circle cx="${pt.x}" cy="${pt.y}" r="4" fill="#0f172a" stroke="#14b8a6" stroke-width="2" />
        `).join('')}
      </svg>
      <div class="flex justify-between text-[10px] text-slate-500 pt-1">
        <span>30 Days Ago</span>
        <span>15 Days Ago</span>
        <span>Today (${currentScore} pts)</span>
      </div>
    `;
  }

  // 4. CAMPAIGN BUILDER & ACTIVE CAMPAIGNS VIEW
  function renderCampaignsView() {
    renderActiveCampaignsList();
    renderTemplatesGrid();
    renderAutomatedTriggersList();
    updateCampaignWizardAudience();
  }

  function renderTemplatesGrid() {
    const container = document.getElementById('templates-cards-grid');
    if (!container) return;

    const templates = window.TALENT_PULSE_CAMPAIGNS.getTemplates();
    container.innerHTML = templates.map(tpl => {
      let channelBadge = "bg-blue-500/20 text-blue-300 border-blue-500/30";
      let channelIcon = "mail";
      if (tpl.channel === 'SMS') {
        channelBadge = "bg-amber-500/20 text-amber-300 border-amber-500/30";
        channelIcon = "message-square";
      } else if (tpl.channel === 'InMail') {
        channelBadge = "bg-sky-500/20 text-sky-300 border-sky-500/30";
        channelIcon = "linkedin";
      }

      return `
        <div class="bg-slate-900/80 rounded-xl p-4 border border-slate-800 flex flex-col justify-between space-y-3 hover:border-slate-700 transition-all">
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="px-2 py-0.5 rounded text-[11px] font-semibold border ${channelBadge} flex items-center space-x-1">
                <i data-lucide="${channelIcon}" class="w-3 h-3"></i>
                <span>${tpl.channel}</span>
              </span>
              <span class="text-[10px] text-slate-400 font-medium">${tpl.tone || 'Consulting'}</span>
            </div>

            <div class="font-bold text-sm text-white">${tpl.name}</div>
            <div class="text-[11px] text-teal-400 font-medium">Practice: ${tpl.roleFamily}</div>
            <div class="text-xs text-slate-300 font-medium line-clamp-1 border-b border-slate-800/80 pb-1">
              ${tpl.subjectVariantA || tpl.name}
            </div>
            <div class="text-[11px] text-slate-400 line-clamp-3 whitespace-pre-line leading-relaxed italic">
              "${tpl.bodyVariantA ? tpl.bodyVariantA.slice(0, 140) + '...' : ''}"
            </div>
          </div>

          <div class="pt-2 border-t border-slate-800/80 flex items-center justify-between">
            <span class="text-[10px] text-slate-500 font-mono">ID: ${tpl.id}</span>
            <button onclick="window.TALENT_PULSE_APP.openEditTemplateModal('${tpl.id}')" class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-semibold border border-slate-700 flex items-center space-x-1 transition-colors">
              <i data-lucide="edit-2" class="w-3 h-3"></i>
              <span>Edit Content</span>
            </button>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  function renderActiveCampaignsList() {
    const container = document.getElementById('active-campaigns-list');
    if (!container) return;

    container.innerHTML = state.campaigns.map(cmp => {
      const seg = cmp.targetSegment || {};
      const ab = cmp.abTest || {};

      return `
        <div class="glass-panel rounded-xl p-5 border border-slate-700/60 space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <div class="flex items-center space-x-3">
                <h3 class="font-bold text-base text-white">${cmp.name}</h3>
                <span class="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  ${cmp.status}
                </span>
              </div>
              <div class="text-xs text-slate-400 mt-0.5">
                Target: <b>${seg.tiers.join(', ')}</b> | Practice: <b>${seg.roleFamilies.join(', ')}</b> | Created: ${cmp.createdAt}
              </div>
            </div>
            <div class="flex items-center space-x-2 text-xs text-slate-300">
              <span class="bg-slate-800 px-3 py-1 rounded border border-slate-700 font-medium">
                Audience: <b>${cmp.audienceCount}</b> candidates
              </span>
            </div>
          </div>

          <!-- Drip Sequence Visual -->
          <div class="space-y-1.5">
            <div class="text-xs font-semibold text-slate-300">Drip Schedule:</div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
              ${(cmp.steps || []).map(st => `
                <div class="p-2.5 rounded bg-slate-900/60 border border-slate-800 text-xs flex items-center space-x-2">
                  <div class="w-6 h-6 rounded bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-[11px] shrink-0">
                    D+${st.delayDays}
                  </div>
                  <div class="truncate">
                    <div class="font-medium text-slate-200 truncate">${st.name}</div>
                    <div class="text-[10px] text-slate-400">${st.channel} Step</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Metrics & A/B Test Comparison -->
          <div class="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2 border-t border-slate-800/80 text-center">
            <div class="bg-slate-900/40 p-2 rounded">
              <div class="text-xs text-slate-400">Total Sent</div>
              <div class="text-base font-bold text-white">${cmp.metrics.sent}</div>
            </div>
            <div class="bg-slate-900/40 p-2 rounded">
              <div class="text-xs text-slate-400">Open Rate</div>
              <div class="text-base font-bold text-teal-400">${Math.round((cmp.metrics.opened / cmp.metrics.sent) * 100)}%</div>
            </div>
            <div class="bg-slate-900/40 p-2 rounded">
              <div class="text-xs text-slate-400">Response Rate</div>
              <div class="text-base font-bold text-emerald-400">${Math.round((cmp.metrics.replied / cmp.metrics.sent) * 100)}%</div>
            </div>
            <div class="bg-slate-900/40 p-2 rounded">
              <div class="text-xs text-slate-400">Next Stage Conv.</div>
              <div class="text-base font-bold text-purple-400">${cmp.metrics.conversionRate}</div>
            </div>
            <div class="bg-slate-900/40 p-2 rounded col-span-2 sm:col-span-1 text-left">
              <div class="text-[11px] text-slate-400">A/B Test Status</div>
              <div class="text-xs font-semibold text-amber-400">
                ${ab.enabled ? `Var A: ${Math.round((ab.repliedA / ab.sentCountA) * 100)}% vs Var B: ${Math.round((ab.repliedB / ab.sentCountB) * 100)}%` : 'Standard Run'}
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  function renderAutomatedTriggersList() {
    const container = document.getElementById('automated-triggers-list');
    if (!container) return;

    const triggers = window.TALENT_PULSE_CAMPAIGNS.getAutomatedTriggers();
    container.innerHTML = triggers.map(trg => `
      <div class="flex items-start justify-between p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
        <div class="space-y-1 pr-4">
          <div class="flex items-center space-x-2">
            <span class="font-bold text-slate-100">${trg.name}</span>
            <span class="px-2 py-0.2 rounded-full text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Active</span>
          </div>
          <div class="text-slate-400"><b>IF:</b> ${trg.condition}</div>
          <div class="text-teal-300"><b>THEN:</b> ${trg.action}</div>
        </div>
        <div class="text-right shrink-0 text-slate-500 text-[11px]">
          <div>Fired: ${trg.lastFired}</div>
          <div class="text-slate-400 font-semibold mt-0.5">${trg.matchesCount} candidates matched</div>
        </div>
      </div>
    `).join('');
  }

  // Campaign Wizard Logic
  function advanceCampaignWizard() {
    if (state.campaignWizard.currentStep < 3) {
      state.campaignWizard.currentStep += 1;
      updateCampaignWizardView();
    }
  }

  function regressCampaignWizard() {
    if (state.campaignWizard.currentStep > 1) {
      state.campaignWizard.currentStep -= 1;
      updateCampaignWizardView();
    }
  }

  function updateCampaignWizardView() {
    const step1El = document.getElementById('wizard-step-1');
    const step2El = document.getElementById('wizard-step-2');
    const step3El = document.getElementById('wizard-step-3');
    const prevBtn = document.getElementById('wizard-prev-btn');
    const nextBtn = document.getElementById('wizard-next-btn');
    const launchBtn = document.getElementById('btn-launch-campaign');

    const step = state.campaignWizard.currentStep;

    if (step1El) step1El.classList.toggle('hidden', step !== 1);
    if (step2El) step2El.classList.toggle('hidden', step !== 2);
    if (step3El) step3El.classList.toggle('hidden', step !== 3);

    if (prevBtn) prevBtn.classList.toggle('hidden', step === 1);
    if (nextBtn) nextBtn.classList.toggle('hidden', step === 3);
    if (launchBtn) launchBtn.classList.toggle('hidden', step !== 3);

    // Update wizard step indicators
    for (let i = 1; i <= 3; i++) {
      const badge = document.getElementById(`step-indicator-${i}`);
      if (badge) {
        if (i === step) {
          badge.className = "w-8 h-8 rounded-full bg-teal-500 text-slate-950 font-bold flex items-center justify-center text-xs shadow-lg shadow-teal-500/30";
        } else if (i < step) {
          badge.className = "w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs border border-emerald-500/40";
        } else {
          badge.className = "w-8 h-8 rounded-full bg-slate-800 text-slate-500 font-bold flex items-center justify-center text-xs border border-slate-700";
        }
      }
    }

    if (step === 3) {
      updateCampaignWizardPreview();
    }
  }

  function updateCampaignWizardAudience() {
    // Calculate matching audience based on wizard segment filters
    const matched = state.candidates.filter(c => {
      // Default to cooling if selected
      const tiers = state.campaignWizard.selectedTiers;
      if (!tiers.includes('All') && !tiers.includes(c.engagementTier)) return false;

      const roles = state.campaignWizard.selectedRoleFamilies;
      if (!roles.includes('All') && !roles.includes(c.roleFamily)) return false;

      const channels = state.campaignWizard.selectedChannels;
      if (!channels.includes('All') && !channels.includes(c.sourceChannel)) return false;

      return true;
    });

    if (elements.campaignAudienceCount) {
      elements.campaignAudienceCount.textContent = `${matched.length} Candidates`;
    }
  }

  function updateCampaignWizardPreview() {
    const previewEl = document.getElementById('campaign-preview-body');
    if (!previewEl) return;

    // Use first matched candidate for live preview
    const sampleCandidate = state.candidates.find(c => c.engagementTierKey === 'cooling') || state.candidates[0];
    const template = window.TALENT_PULSE_CAMPAIGNS.getTemplates()[0];

    const filledSubject = window.TALENT_PULSE_CAMPAIGNS.populateMergeFields(template.subjectVariantA, sampleCandidate);
    const filledBody = window.TALENT_PULSE_CAMPAIGNS.populateMergeFields(template.bodyVariantA, sampleCandidate);

    previewEl.innerHTML = `
      <div class="space-y-2">
        <div class="text-xs text-slate-400">
          <b>Preview Candidate:</b> ${sampleCandidate.name} (${sampleCandidate.targetRole})
        </div>
        <div class="text-xs font-semibold text-slate-200 border-b border-slate-800 pb-1">
          Subject: ${filledSubject}
        </div>
        <div class="text-xs text-slate-300 whitespace-pre-line font-sans bg-slate-900/80 p-3 rounded border border-slate-800">
          ${filledBody}
        </div>
      </div>
    `;
  }

  function launchCreatedCampaign() {
    const nameInput = document.getElementById('wizard-campaign-name');
    const campaignName = (nameInput && nameInput.value) ? nameInput.value : "Q3 Strategic Talent Nurture";

    const matched = state.candidates.filter(c => {
      const tiers = state.campaignWizard.selectedTiers;
      if (!tiers.includes('All') && !tiers.includes(c.engagementTier)) return false;
      return true;
    });

    const newCampaign = window.TALENT_PULSE_CAMPAIGNS.createCampaign({
      name: campaignName,
      audienceCount: matched.length || 15,
      abTestEnabled: true,
      variantAName: "Personalized Leadership Tone",
      variantBName: "Technical Blueprint Tone"
    });

    state.campaigns = window.TALENT_PULSE_CAMPAIGNS.getActiveCampaigns();
    renderActiveCampaignsList();

    // Reset wizard
    state.campaignWizard.currentStep = 1;
    updateCampaignWizardView();

    showToast(`Campaign "${campaignName}" launched to ${newCampaign.audienceCount} candidates!`);
  }

  // 5. LEADERSHIP ANALYTICS VIEW
  function renderAnalyticsView() {
    const analytics = window.TALENT_PULSE_ANALYTICS.computeAnalytics(state.candidates, state.campaigns);
    
    // Channel Effectiveness Table
    const tableBody = document.getElementById('analytics-channel-table');
    if (tableBody) {
      tableBody.innerHTML = Object.values(analytics.channelStats).map(ch => {
        const channelClass = getChannelBadgeClass(ch.name);
        return `
          <tr class="border-b border-slate-800 hover:bg-slate-800/40 text-xs">
            <td class="py-3 px-4">
              <span class="font-medium px-2 py-0.5 rounded ${channelClass}">${ch.name}</span>
            </td>
            <td class="py-3 px-4 font-bold text-slate-200">${ch.totalSourced}</td>
            <td class="py-3 px-4 text-emerald-400 font-semibold">${ch.hotTierCount}</td>
            <td class="py-3 px-4 text-amber-400">${ch.warmTierCount}</td>
            <td class="py-3 px-4 text-orange-400">${ch.coolingTierCount}</td>
            <td class="py-3 px-4 text-teal-300 font-bold">${ch.hiresCount + ch.offersCount}</td>
            <td class="py-3 px-4 text-slate-300">${ch.avgTimeToEngageDays} days</td>
            <td class="py-3 px-4 font-bold text-purple-300">${ch.hireConversionRate}</td>
          </tr>
        `;
      }).join('');
    }

    // Role Family Health
    const roleContainer = document.getElementById('analytics-role-bars');
    if (roleContainer) {
      roleContainer.innerHTML = Object.values(analytics.roleStats).map(rf => `
        <div class="space-y-1">
          <div class="flex justify-between text-xs">
            <span class="font-medium text-slate-200">${rf.name}</span>
            <span class="text-slate-400">${rf.count} Candidates (Avg Score: <b>${rf.avgScore}</b>)</span>
          </div>
          <div class="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
            <div class="bg-teal-500 h-full rounded-full" style="width: ${rf.avgScore}%"></div>
          </div>
        </div>
      `).join('');
    }
  }

  // 6. SETTINGS & WEIGHT CONFIGURATOR VIEW
  function renderSettingsView() {
    const weights = window.TALENT_PULSE_ENGINE.getWeights();
    setSliderVal('weight-email', weights.emailResponsiveness);
    setSliderVal('weight-latency', weights.responseLatency);
    setSliderVal('weight-assessment', weights.assessmentPerformance);
    setSliderVal('weight-portal', weights.portalActivity);
    setSliderVal('weight-interview', weights.interviewResponsiveness);
    setSliderVal('weight-interest', weights.explicitInterest);
    setSliderVal('weight-decay', Math.round(weights.decayMultiplier * 100));

    updateWeightLabels();
  }

  function setSliderVal(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val;
  }

  function updateWeightLabels() {
    const getVal = id => parseInt(document.getElementById(id).value, 10);
    const email = getVal('weight-email');
    const latency = getVal('weight-latency');
    const assess = getVal('weight-assessment');
    const portal = getVal('weight-portal');
    const interview = getVal('weight-interview');
    const interest = getVal('weight-interest');
    const decay = getVal('weight-decay');

    setLabel('lbl-weight-email', `${email} pts`);
    setLabel('lbl-weight-latency', `${latency} pts`);
    setLabel('lbl-weight-assessment', `${assess} pts`);
    setLabel('lbl-weight-portal', `${portal} pts`);
    setLabel('lbl-weight-interview', `${interview} pts`);
    setLabel('lbl-weight-interest', `${interest} pts`);
    setLabel('lbl-weight-decay', `${(decay / 100).toFixed(1)}x`);

    const totalRaw = email + latency + assess + portal + interview + interest;
    const totalEl = document.getElementById('lbl-total-weight');
    if (totalEl) {
      totalEl.textContent = `Total Base Points: ${totalRaw} / 100`;
      totalEl.className = totalRaw === 100 ? "text-emerald-400 font-bold" : "text-amber-400 font-bold";
    }
  }

  function setLabel(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function applyNewWeights() {
    const getVal = id => parseInt(document.getElementById(id).value, 10);
    const newWeights = {
      emailResponsiveness: getVal('weight-email'),
      responseLatency: getVal('weight-latency'),
      assessmentPerformance: getVal('weight-assessment'),
      portalActivity: getVal('weight-portal'),
      interviewResponsiveness: getVal('weight-interview'),
      explicitInterest: getVal('weight-interest'),
      decayMultiplier: getVal('weight-decay') / 100
    };

    window.TALENT_PULSE_ENGINE.setWeights(newWeights);
    window.TALENT_PULSE_ENGINE.recalculateAllCandidates(state.candidates);

    // Re-render views
    renderDashboard();
    renderFilteredLists();
    if (state.selectedCandidateId) {
      renderCandidate360(state.selectedCandidateId);
    }

    showToast("Scoring weights saved! All 50 candidate scores recalculated live.");
  }

  function resetWeightsToDefault() {
    window.TALENT_PULSE_ENGINE.resetWeights();
    renderSettingsView();
    applyNewWeights();
    showToast("Scoring weights reset to platform defaults.");
  }

  // 7. QUICK OUTREACH MODAL
  function openOutreachModal(candidateId, actionType = 'outreach') {
    const candidate = state.candidates.find(c => c.id === candidateId);
    if (!candidate) return;

    state.activeOutreachCandidateId = candidateId;

    if (elements.outreachModalCandidateName) elements.outreachModalCandidateName.textContent = candidate.name;
    if (elements.outreachModalRole) elements.outreachModalRole.textContent = `${candidate.targetRole} (${candidate.sourceChannel})`;

    // Populate templates dropdown
    const templates = window.TALENT_PULSE_CAMPAIGNS.getTemplates();
    if (elements.outreachTemplateSelect) {
      elements.outreachTemplateSelect.innerHTML = `
        <option value="">-- Select Template --</option>
        ${templates.map(t => `<option value="${t.id}">${t.name} (${t.roleFamily})</option>`).join('')}
      `;

      // Pre-select matching role family template or cooling template
      const matchedTpl = templates.find(t => t.roleFamily === candidate.roleFamily) || 
                         templates.find(t => candidate.engagementTierKey === 'cooling' && t.id === 'tpl-re-engage-cooling') || 
                         templates[0];

      if (matchedTpl) {
        elements.outreachTemplateSelect.value = matchedTpl.id;
        populateOutreachFromTemplate(matchedTpl.id);
      }
    }

    if (elements.outreachModal) elements.outreachModal.classList.remove('hidden');
  }

  function populateOutreachFromTemplate(templateId) {
    const candidate = state.candidates.find(c => c.id === state.activeOutreachCandidateId);
    const template = window.TALENT_PULSE_CAMPAIGNS.getTemplates().find(t => t.id === templateId);

    if (!template || !candidate) return;

    const populatedSubject = window.TALENT_PULSE_CAMPAIGNS.populateMergeFields(template.subjectVariantA, candidate);
    const populatedBody = window.TALENT_PULSE_CAMPAIGNS.populateMergeFields(template.bodyVariantA, candidate);

    if (elements.outreachSubjectInput) elements.outreachSubjectInput.value = populatedSubject;
    if (elements.outreachBodyInput) elements.outreachBodyInput.value = populatedBody;
  }

  function closeOutreachModal() {
    if (elements.outreachModal) elements.outreachModal.classList.add('hidden');
    state.activeOutreachCandidateId = null;
  }

  function executeOutreachSend() {
    const candidate = state.candidates.find(c => c.id === state.activeOutreachCandidateId);
    if (!candidate) return;

    const subject = elements.outreachSubjectInput ? elements.outreachSubjectInput.value : "Outreach message";
    const body = elements.outreachBodyInput ? elements.outreachBodyInput.value : "";
    const channel = elements.outreachChannelSelect ? elements.outreachChannelSelect.value : "Email";

    // Log to campaign engine
    window.TALENT_PULSE_CAMPAIGNS.logCandidateOutreach(candidate, {
      campaignName: "1-Click Recruiter Direct Touch",
      subject: subject,
      body: body,
      channel: channel
    });

    // Recompute candidate score to reflect new activity
    window.TALENT_PULSE_ENGINE.recalculateAllCandidates(state.candidates);

    closeOutreachModal();

    // Refresh views
    renderDashboard();
    renderFilteredLists();
    if (state.currentView === 'candidate360' || state.selectedCandidateId === candidate.id) {
      renderCandidate360(candidate.id);
    }

    showToast(`Outreach sent to ${candidate.name} via ${channel}! Timeline updated.`);
  }

  // Toast System
  function showToast(message) {
    const toast = document.getElementById('toast-notification');
    const toastText = document.getElementById('toast-message');
    if (!toast || !toastText) return;

    toastText.textContent = message;
    toast.classList.remove('hidden');
    toast.classList.add('toast-enter');

    setTimeout(() => {
      toast.classList.add('hidden');
    }, 4000);
  }

  function getChannelBadgeClass(channel) {
    if (channel === 'Employee Referral') return 'channel-referral';
    if (channel === 'Staffing Vendor') return 'channel-vendor';
    if (channel === 'Walk-in / Job Fair') return 'channel-walkin';
    return 'channel-direct';
  }

  // 8. ADD NEW CANDIDATE MODAL & LOGIC
  function openAddCandidateModal() {
    const modal = document.getElementById('add-candidate-modal');
    if (!modal) return;
    
    // Reset form
    const form = document.getElementById('add-candidate-form');
    if (form) form.reset();

    // Default to direct application channel fields
    handleChannelChange('Direct Application');

    modal.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  }

  function closeAddCandidateModal() {
    const modal = document.getElementById('add-candidate-modal');
    if (modal) modal.classList.add('hidden');
  }

  function handleChannelChange(channel) {
    const container = document.getElementById('channel-fields-container');
    if (!container) return;

    if (channel === 'Employee Referral') {
      container.innerHTML = `
        <div class="text-xs font-semibold text-purple-300 flex items-center space-x-1.5 mb-1">
          <i data-lucide="user-check" class="w-4 h-4"></i>
          <span>Employee Referral Details</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-[11px] font-medium text-slate-300 mb-1">Referrer Name & Employee ID</label>
            <input type="text" id="meta-referrer-name" placeholder="e.g. Suresh Menon (EMP-41092)" class="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200">
          </div>
          <div>
            <label class="block text-[11px] font-medium text-slate-300 mb-1">Referrer Practice Department</label>
            <input type="text" id="meta-referrer-dept" placeholder="e.g. Enterprise ERP Solutions" class="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200">
          </div>
          <div>
            <label class="block text-[11px] font-medium text-slate-300 mb-1">Relationship to Candidate</label>
            <input type="text" id="meta-referrer-rel" placeholder="e.g. Former Colleague / College Alumni" class="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200">
          </div>
          <div>
            <label class="block text-[11px] font-medium text-slate-300 mb-1">Referral Bonus Tier</label>
            <select id="meta-referrer-tier" class="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200">
              <option value="Tier 1 (Senior Leadership / Tech Architect)">Tier 1 (Senior Leadership / Tech Architect)</option>
              <option value="Tier 2 (Lead Engineer / Specialist)" selected>Tier 2 (Lead Engineer / Specialist)</option>
              <option value="Tier 3 (Senior Consultant)">Tier 3 (Senior Consultant)</option>
            </select>
          </div>
        </div>
      `;
    } else if (channel === 'Staffing Vendor') {
      container.innerHTML = `
        <div class="text-xs font-semibold text-sky-300 flex items-center space-x-1.5 mb-1">
          <i data-lucide="briefcase" class="w-4 h-4"></i>
          <span>Staffing Vendor Partner Information</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-[11px] font-medium text-slate-300 mb-1">Vendor Agency Name</label>
            <input type="text" id="meta-vendor-name" placeholder="e.g. Collabera / Randstad / Allegis" class="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200">
          </div>
          <div>
            <label class="block text-[11px] font-medium text-slate-300 mb-1">Vendor Account Manager</label>
            <input type="text" id="meta-vendor-contact" placeholder="e.g. Saurabh Mishra" class="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200">
          </div>
          <div class="sm:col-span-2">
            <label class="block text-[11px] font-medium text-slate-300 mb-1">Vendor Screening Notes</label>
            <input type="text" id="meta-vendor-notes" placeholder="e.g. Immediate joiner, cleared agency technical screen." class="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200">
          </div>
        </div>
      `;
    } else if (channel === 'Walk-in / Job Fair') {
      container.innerHTML = `
        <div class="text-xs font-semibold text-amber-300 flex items-center space-x-1.5 mb-1">
          <i data-lucide="map-pin" class="w-4 h-4"></i>
          <span>Drive / Job Fair Event Details</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-[11px] font-medium text-slate-300 mb-1">Event / Drive Name</label>
            <input type="text" id="meta-event-name" placeholder="e.g. Bengaluru Cloud & AI Walk-in Drive 2026" class="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200">
          </div>
          <div>
            <label class="block text-[11px] font-medium text-slate-300 mb-1">Drive Venue / City</label>
            <input type="text" id="meta-event-loc" placeholder="e.g. ITC Infotech Park, Bengaluru" class="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200">
          </div>
          <div>
            <label class="block text-[11px] font-medium text-slate-300 mb-1">Resume Collection Format</label>
            <select id="meta-event-resume" class="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200">
              <option value="Digital (QR Code Scan)">Digital (QR Code Scan)</option>
              <option value="Paper Resume (Digitized by TA)">Paper Resume (Digitized by TA)</option>
            </select>
          </div>
          <div>
            <label class="block text-[11px] font-medium text-slate-300 mb-1">On-the-Spot Screening Verdict</label>
            <input type="text" id="meta-event-verdict" placeholder="e.g. Cleared 1st level coding challenge with 4.8/5" class="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200">
          </div>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="text-xs font-semibold text-blue-300 flex items-center space-x-1.5 mb-1">
          <i data-lucide="file-text" class="w-4 h-4"></i>
          <span>Direct ATS Application Details</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label class="block text-[11px] font-medium text-slate-300 mb-1">Job Requisition ID</label>
            <input type="text" id="meta-ats-req" placeholder="e.g. REQ-2026-8901" value="REQ-2026-${Math.floor(7000 + Math.random() * 2000)}" class="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200">
          </div>
          <div>
            <label class="block text-[11px] font-medium text-slate-300 mb-1">Resume Match Score (%)</label>
            <input type="number" id="meta-ats-score" min="50" max="100" value="92" class="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200">
          </div>
          <div>
            <label class="block text-[11px] font-medium text-slate-300 mb-1">Applied Source Portal</label>
            <input type="text" id="meta-ats-portal" placeholder="e.g. ITC Infotech Careers Portal" value="ITC Infotech Careers Portal" class="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200">
          </div>
        </div>
      `;
    }

    if (window.lucide) window.lucide.createIcons();
  }

  function saveNewCandidate() {
    const nameInput = document.getElementById('new-cand-name');
    const emailInput = document.getElementById('new-cand-email');
    const phoneInput = document.getElementById('new-cand-phone');
    const locationInput = document.getElementById('new-cand-location');
    const familyInput = document.getElementById('new-cand-family');
    const roleInput = document.getElementById('new-cand-role');
    const expInput = document.getElementById('new-cand-exp');
    const stageInput = document.getElementById('new-cand-stage');
    const channelInput = document.getElementById('new-cand-channel');
    const postureRadios = document.getElementsByName('cand-posture');

    if (!nameInput || !nameInput.value.trim()) {
      showToast("Please enter candidate full name");
      return;
    }

    let posture = 'hot';
    for (let r of postureRadios) {
      if (r.checked) posture = r.value;
    }

    const channel = channelInput ? channelInput.value : 'Direct Application';
    const newId = `CAN-${1000 + state.candidates.length + 1}`;
    const today = new Date().toISOString().split('T')[0];

    // Channel metadata
    const channelMeta = {};
    if (channel === 'Employee Referral') {
      channelMeta.referrerName = document.getElementById('meta-referrer-name')?.value || "Referral Team";
      channelMeta.referrerDepartment = document.getElementById('meta-referrer-dept')?.value || familyInput.value;
      channelMeta.relationship = document.getElementById('meta-referrer-rel')?.value || "Former Colleague";
      channelMeta.referralBonusTier = document.getElementById('meta-referrer-tier')?.value || "Tier 2";
    } else if (channel === 'Staffing Vendor') {
      channelMeta.vendorName = document.getElementById('meta-vendor-name')?.value || "Premier Staffing Partner";
      channelMeta.vendorContact = document.getElementById('meta-vendor-contact')?.value || "Account Desk";
      channelMeta.vendorNotes = document.getElementById('meta-vendor-notes')?.value || "Profile submitted via vendor portal.";
      channelMeta.responseTurnaroundHours = 4.0;
      channelMeta.vendorSlaCompliant = true;
    } else if (channel === 'Walk-in / Job Fair') {
      channelMeta.eventName = document.getElementById('meta-event-name')?.value || "National Tech Drive 2026";
      channelMeta.eventLocation = document.getElementById('meta-event-loc')?.value || locationInput.value;
      channelMeta.resumeFormat = document.getElementById('meta-event-resume')?.value || "Digital (QR Code Scan)";
      channelMeta.onSpotScreeningNotes = document.getElementById('meta-event-verdict')?.value || "Cleared drive screening.";
      channelMeta.onSpotScreenerName = "Practice Panel";
    } else {
      channelMeta.jobReqId = document.getElementById('meta-ats-req')?.value || "REQ-2026-9001";
      channelMeta.resumeScore = parseInt(document.getElementById('meta-ats-score')?.value || "90", 10);
      channelMeta.appliedVia = document.getElementById('meta-ats-portal')?.value || "Careers Portal";
      channelMeta.interviewerNotes = "Direct application submitted online.";
    }

    // Signals based on posture
    let signals = {};
    if (posture === 'hot') {
      signals = {
        emailsSent: 2,
        emailsOpened: 2,
        emailClicks: 2,
        responseLatencyHours: 3.0,
        assessmentStatus: "Completed",
        assessmentScore: 94,
        assessmentTurnaroundHours: 14,
        portalRevisits14d: 8,
        interviewSchedulingLatencyHours: 4,
        rescheduleCount: 0,
        profileUpdatesCount: 2,
        lastProfileUpdate: today,
        savedJobsCount: 3,
        jobAlertsSubscribed: true,
        alertsOpenedCount: 4,
        daysSinceLastActivity: 0
      };
    } else if (posture === 'warm') {
      signals = {
        emailsSent: 3,
        emailsOpened: 2,
        emailClicks: 1,
        responseLatencyHours: 12.0,
        assessmentStatus: "Completed",
        assessmentScore: 82,
        assessmentTurnaroundHours: 30,
        portalRevisits14d: 4,
        interviewSchedulingLatencyHours: 12,
        rescheduleCount: 0,
        profileUpdatesCount: 1,
        lastProfileUpdate: today,
        savedJobsCount: 1,
        jobAlertsSubscribed: true,
        alertsOpenedCount: 2,
        daysSinceLastActivity: 2
      };
    } else {
      signals = {
        emailsSent: 4,
        emailsOpened: 1,
        emailClicks: 0,
        responseLatencyHours: 48.0,
        assessmentStatus: "Pending",
        assessmentScore: 0,
        assessmentTurnaroundHours: 0,
        portalRevisits14d: 1,
        interviewSchedulingLatencyHours: 48,
        rescheduleCount: 1,
        profileUpdatesCount: 0,
        lastProfileUpdate: today,
        savedJobsCount: 0,
        jobAlertsSubscribed: false,
        alertsOpenedCount: 0,
        daysSinceLastActivity: 8
      };
    }

    const newCandidate = {
      id: newId,
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      phone: phoneInput.value.trim() || "+91 98000 00000",
      location: locationInput.value.trim() || "Bengaluru, India",
      roleFamily: familyInput.value,
      targetRole: roleInput.value.trim(),
      experienceYears: parseInt(expInput.value, 10) || 5,
      stage: stageInput.value,
      appliedDate: today,
      lastActivityDate: today,
      sourceChannel: channel,
      channelMetadata: channelMeta,
      signals: signals,
      timeline: [
        {
          id: `TL-NEW-${Date.now().toString().slice(-4)}`,
          date: `${today} 10:00`,
          type: "application_received",
          icon: "user-plus",
          title: `Candidate Ingested (${channel})`,
          description: `Profile added into ${familyInput.value} pipeline for ${roleInput.value.trim()}.`,
          channel: channel
        }
      ],
      outreachHistory: []
    };

    // Calculate initial engagement score
    const scoreResult = window.TALENT_PULSE_ENGINE.calculateCandidateScore(newCandidate);
    newCandidate.engagementScore = scoreResult.score;
    newCandidate.engagementTier = scoreResult.tier;
    newCandidate.engagementTierKey = scoreResult.tierKey;
    newCandidate.scoreDetails = scoreResult;

    // Add to state
    state.candidates.unshift(newCandidate);
    state.selectedCandidateId = newCandidate.id;

    // Close modal
    closeAddCandidateModal();

    // Re-render UI
    renderDashboard();
    renderFilteredLists();

    // Show toast and option to view 360
    showToast(`Added candidate "${newCandidate.name}" (${newCandidate.engagementScore} pts — ${newCandidate.engagementTier})!`);
  }

  // 9. OUTREACH TEMPLATE LANGUAGE & CONTENT EDITOR
  function openEditTemplateModal(templateId) {
    const modal = document.getElementById('edit-template-modal');
    if (!modal) return;

    const idInput = document.getElementById('edit-template-id');
    const nameInput = document.getElementById('edit-template-name');
    const channelSelect = document.getElementById('edit-template-channel');
    const familySelect = document.getElementById('edit-template-family');
    const toneSelect = document.getElementById('edit-template-tone');
    const subjectInput = document.getElementById('edit-template-subject');
    const bodyInput = document.getElementById('edit-template-body');
    const titleEl = document.getElementById('edit-template-modal-title');

    if (templateId) {
      const template = window.TALENT_PULSE_CAMPAIGNS.getTemplates().find(t => t.id === templateId);
      if (template) {
        if (idInput) idInput.value = template.id;
        if (nameInput) nameInput.value = template.name;
        if (channelSelect) channelSelect.value = template.channel || "Email";
        if (familySelect) familySelect.value = template.roleFamily || "All";
        if (toneSelect) toneSelect.value = template.tone || "Professional Consulting";
        if (subjectInput) subjectInput.value = template.subjectVariantA || "";
        if (bodyInput) bodyInput.value = template.bodyVariantA || "";
        if (titleEl) titleEl.textContent = `Edit Template: ${template.name}`;
      }
    } else {
      // Create new template mode
      if (idInput) idInput.value = "";
      if (nameInput) nameInput.value = "New Custom Outreach Template";
      if (channelSelect) channelSelect.value = "Email";
      if (familySelect) familySelect.value = "All";
      if (toneSelect) toneSelect.value = "Professional Consulting";
      if (subjectInput) subjectInput.value = "Regarding your career in {{role_family}} at ITC Infotech";
      if (bodyInput) bodyInput.value = `Hi {{first_name}},

I was reviewing your impressive work as {{target_role}} and wanted to connect regarding upcoming initiatives in our {{role_family}} team.

Would you be open for a brief 10-minute introductory conversation this week?

Best regards,
Talent Acquisition Team | ITC Infotech`;
      if (titleEl) titleEl.textContent = "Create New Outreach Template";
    }

    modal.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  }

  function closeEditTemplateModal() {
    const modal = document.getElementById('edit-template-modal');
    if (modal) modal.classList.add('hidden');
  }

  function saveTemplateChanges() {
    const idInput = document.getElementById('edit-template-id');
    const nameInput = document.getElementById('edit-template-name');
    const channelSelect = document.getElementById('edit-template-channel');
    const familySelect = document.getElementById('edit-template-family');
    const toneSelect = document.getElementById('edit-template-tone');
    const subjectInput = document.getElementById('edit-template-subject');
    const bodyInput = document.getElementById('edit-template-body');

    const templateId = idInput ? idInput.value : "";
    const updatedData = {
      name: nameInput ? nameInput.value.trim() : "Custom Template",
      channel: channelSelect ? channelSelect.value : "Email",
      roleFamily: familySelect ? familySelect.value : "All",
      tone: toneSelect ? toneSelect.value : "Professional Consulting",
      subjectVariantA: subjectInput ? subjectInput.value.trim() : "",
      subjectVariantB: subjectInput ? subjectInput.value.trim() : "",
      bodyVariantA: bodyInput ? bodyInput.value.trim() : "",
      bodyVariantB: bodyInput ? bodyInput.value.trim() : ""
    };

    if (templateId) {
      window.TALENT_PULSE_CAMPAIGNS.updateTemplate(templateId, updatedData);
      showToast(`Updated template "${updatedData.name}"!`);
    } else {
      window.TALENT_PULSE_CAMPAIGNS.createTemplate(updatedData);
      showToast(`Created new template "${updatedData.name}"!`);
    }

    closeEditTemplateModal();
    renderTemplatesGrid();
    refreshOutreachTemplateDropdown();
  }

  function insertMergeTag(textareaId, tag) {
    const textarea = document.getElementById(textareaId);
    if (!textarea) return;

    const startPos = textarea.selectionStart !== undefined ? textarea.selectionStart : textarea.value.length;
    const endPos = textarea.selectionEnd !== undefined ? textarea.selectionEnd : textarea.value.length;
    const currentVal = textarea.value;

    textarea.value = currentVal.substring(0, startPos) + tag + currentVal.substring(endPos);
    textarea.focus();
    textarea.selectionStart = textarea.selectionEnd = startPos + tag.length;
  }

  function refreshOutreachTemplateDropdown() {
    const templates = window.TALENT_PULSE_CAMPAIGNS.getTemplates();
    if (elements.outreachTemplateSelect) {
      const currentVal = elements.outreachTemplateSelect.value;
      elements.outreachTemplateSelect.innerHTML = `
        <option value="">-- Select Template --</option>
        ${templates.map(t => `<option value="${t.id}">${t.name} (${t.channel} • ${t.roleFamily})</option>`).join('')}
      `;
      if (currentVal) elements.outreachTemplateSelect.value = currentVal;
    }
  }

  function saveComposerAsNewTemplate() {
    const subject = elements.outreachSubjectInput ? elements.outreachSubjectInput.value : "Direct Outreach";
    const body = elements.outreachBodyInput ? elements.outreachBodyInput.value : "";
    const channel = elements.outreachChannelSelect ? elements.outreachChannelSelect.value : "Email";

    if (!body.trim()) {
      showToast("Please enter message body text first");
      return;
    }

    const newTpl = window.TALENT_PULSE_CAMPAIGNS.createTemplate({
      name: `Custom ${channel} (${new Date().toLocaleDateString()})`,
      channel: channel,
      roleFamily: "All",
      tone: "Custom Wording",
      subjectVariantA: subject,
      subjectVariantB: subject,
      bodyVariantA: body,
      bodyVariantB: body
    });

    refreshOutreachTemplateDropdown();
    renderTemplatesGrid();
    if (elements.outreachTemplateSelect) {
      elements.outreachTemplateSelect.value = newTpl.id;
    }

    showToast(`Saved current message into Template Library as "${newTpl.name}"!`);
  }

  // Global Exposure for inline HTML handlers
  window.TALENT_PULSE_APP = {
    viewCandidate360: (candidateId) => {
      switchView('candidate360');
      renderCandidate360(candidateId);
    },
    openOutreachModal: (candidateId, actionType) => openOutreachModal(candidateId, actionType),
    openAddCandidateModal: () => openAddCandidateModal(),
    closeAddCandidateModal: () => closeAddCandidateModal(),
    handleChannelChange: (ch) => handleChannelChange(ch),
    saveNewCandidate: () => saveNewCandidate(),
    openEditTemplateModal: (tplId) => openEditTemplateModal(tplId),
    closeEditTemplateModal: () => closeEditTemplateModal(),
    saveTemplateChanges: () => saveTemplateChanges(),
    insertMergeTag: (targetId, tag) => insertMergeTag(targetId, tag),
    saveComposerAsNewTemplate: () => saveComposerAsNewTemplate(),
    switchView: (viewName) => switchView(viewName),
    showToast: (msg) => showToast(msg)
  };

  // Start on page load
  document.addEventListener('DOMContentLoaded', init);
})();
