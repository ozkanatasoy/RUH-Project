/**
 * RUH PROJECT - Wizard & Application State Module (3-Phase & Free Pre-Registration)
 * Manages 5-step wizard navigation, dynamic family member forms, Phase 1 free enrollment, and certificate preview.
 */

import { getCurrentLang, getTranslation, translations } from './i18n.js';
import { getWillTemplate } from './templates.js';

let currentStep = 1;
let memberCount = 1;
let selectedTier = 'alpha';
let selectedTierFee = 0; // Phase 1 is Free!
let selectedTierName = 'Alfa Protokol';

export function initWizard() {
    const familyFormsContainer = document.getElementById('familyFormsContainer');
    const addMemberBtn = document.getElementById('addMemberBtn');
    const prevStepBtn = document.getElementById('prevStepBtn');
    const nextStepBtn = document.getElementById('nextStepBtn');
    const submitFormBtn = document.getElementById('submitFormBtn');

    // Add Family Member
    if (addMemberBtn) {
        addMemberBtn.addEventListener('click', () => {
            memberCount++;
            const memberIndex = memberCount;

            const memberCard = document.createElement('div');
            memberCard.className = 'family-member-card';
            memberCard.setAttribute('data-member-index', memberIndex);

            const lang = getCurrentLang();
            const formTitleText = lang === 'tr' 
                ? `Form ${memberIndex}: Aile Üyesi` 
                : `Form ${memberIndex}: Family Member`;

            memberCard.innerHTML = `
                <div class="member-card-header">
                    <span class="member-card-title">
                        <i class="fa-solid fa-user"></i> <span class="member-title-span">${formTitleText}</span>
                    </span>
                    <button type="button" class="btn-remove-member" aria-label="Remove Family Member Form" onclick="window.removeMemberForm(${memberIndex})">
                        <i class="fa-solid fa-trash"></i> ${translations[lang].btnRemoveMember}
                    </button>
                </div>
                <div class="form-grid">
                    <div class="form-group">
                        <label>${translations[lang].lblFullName}</label>
                        <input type="text" class="form-control" name="fullName_${memberIndex}" required>
                    </div>
                    <div class="form-group">
                        <label>${translations[lang].lblIdentity}</label>
                        <input type="text" class="form-control" name="identityNo_${memberIndex}" required>
                    </div>
                    <div class="form-group">
                        <label>${translations[lang].lblBirthDate}</label>
                        <input type="date" class="form-control" name="birthDate_${memberIndex}" required>
                    </div>
                    <div class="form-group">
                        <label>${translations[lang].lblEmail}</label>
                        <input type="email" class="form-control" name="email_${memberIndex}" required>
                    </div>
                    <div class="form-group">
                        <label>${translations[lang].lblPhone}</label>
                        <input type="tel" class="form-control" name="phone_${memberIndex}" required>
                    </div>
                    <div class="form-group">
                        <label>${translations[lang].lblRelation}</label>
                        <input type="text" class="form-control" name="relation_${memberIndex}" placeholder="${lang === 'tr' ? 'Örn: Eş / Çocuk' : 'e.g., Spouse / Child'}" required>
                    </div>
                </div>
            `;

            familyFormsContainer.appendChild(memberCard);
            updateFeeSummary();
        });
    }

    // Global Remove Handler
    window.removeMemberForm = function(index) {
        const card = document.querySelector(`.family-member-card[data-member-index="${index}"]`);
        if (card) {
            card.remove();
            memberCount = document.querySelectorAll('.family-member-card').length;
            updateDynamicFormTitles();
            updateFeeSummary();
        }
    };

    // Tier Selection Cards
    const tierCards = document.querySelectorAll('.tier-card');
    tierCards.forEach(card => {
        card.addEventListener('click', () => {
            const lang = getCurrentLang();
            tierCards.forEach(c => {
                c.classList.remove('active');
                const btn = c.querySelector('.btn-select-tier');
                if (btn) btn.textContent = translations[lang].btnSelect;
            });

            card.classList.add('active');
            selectedTier = card.getAttribute('data-tier');
            selectedTierFee = 0; // Phase 1 Free
            
            const selectedBtn = card.querySelector('.btn-select-tier');
            if (selectedBtn) selectedBtn.textContent = translations[lang].btnSelected;

            if (selectedTier === 'alpha') {
                selectedTierName = lang === 'tr' ? 'Alfa Protokol' : 'Alpha Protocol';
            } else {
                selectedTierName = lang === 'tr' ? 'Sovereign Soul Protokol' : 'Sovereign Soul Protocol';
            }

            updateFeeSummary();
        });
    });

    // Navigation Listeners
    if (nextStepBtn) {
        nextStepBtn.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                if (currentStep < 5) {
                    showSkeletonLoading(() => {
                        currentStep++;
                        updateStepView();
                    });
                }
            }
        });
    }

    if (prevStepBtn) {
        prevStepBtn.addEventListener('click', () => {
            if (currentStep > 1) {
                currentStep--;
                updateStepView();
            }
        });
    }

    // Inheritance Toggles & Will Templates
    initInheritanceAndTemplates();

    // Modal Certificate
    initCertificateModal(submitFormBtn);
}

function updateDynamicFormTitles() {
    const lang = getCurrentLang();
    const cards = document.querySelectorAll('.family-member-card');
    cards.forEach((card, idx) => {
        const num = idx + 1;
        card.setAttribute('data-member-index', num);
        const titleSpan = card.querySelector('.member-title-span');
        if (titleSpan) {
            if (num === 1) {
                titleSpan.textContent = translations[lang].formTitle1;
            } else {
                titleSpan.textContent = `${translations[lang].formTitleN} ${num}: ${lang === 'tr' ? 'Aile Üyesi' : 'Family Member'}`;
            }
        }
    });
}

export function updateFeeSummary() {
    const lang = getCurrentLang();
    const count = document.querySelectorAll('.family-member-card').length || 1;
    memberCount = count;

    const countText = `${count} ${lang === 'tr' ? 'Kişi' : 'Person(s)'}`;
    const calcMemberCountEl = document.getElementById('calcMemberCount');
    if (calcMemberCountEl) calcMemberCountEl.textContent = countText;

    const calcTierNameEl = document.getElementById('calcTierName');
    if (calcTierNameEl) {
        calcTierNameEl.textContent = `${selectedTierName} (${lang === 'tr' ? 'Aşama 1 Ücretsiz' : 'Phase 1 Free'})`;
    }

    const calcTotalEl = document.getElementById('calcTotalAmount');
    if (calcTotalEl) calcTotalEl.textContent = lang === 'tr' ? '$0 USD (Ücretsiz Ön Kayıt)' : '$0 USD (Free Pre-Registration)';
}

function updateStepView() {
    document.querySelectorAll('.wizard-step-panel').forEach(panel => panel.classList.remove('active'));
    const activePanel = document.getElementById(`stepPanel${currentStep}`);
    if (activePanel) activePanel.classList.add('active');

    document.querySelectorAll('.step-indicator').forEach(ind => {
        const stepNum = parseInt(ind.getAttribute('data-step'), 10);
        ind.classList.remove('active', 'completed');
        if (stepNum === currentStep) {
            ind.classList.add('active');
        } else if (stepNum < currentStep) {
            ind.classList.add('completed');
        }
    });

    const prevStepBtn = document.getElementById('prevStepBtn');
    const nextStepBtn = document.getElementById('nextStepBtn');
    const submitFormBtn = document.getElementById('submitFormBtn');

    if (prevStepBtn) prevStepBtn.style.display = currentStep === 1 ? 'none' : 'inline-flex';

    if (currentStep === 5) {
        if (nextStepBtn) nextStepBtn.style.display = 'none';
        if (submitFormBtn) submitFormBtn.style.display = 'inline-flex';
        populateSummaryReview();
    } else {
        if (nextStepBtn) nextStepBtn.style.display = 'inline-flex';
        if (submitFormBtn) submitFormBtn.style.display = 'none';
    }
}

function showSkeletonLoading(callback) {
    const wizardCard = document.querySelector('.wizard-card');
    if (wizardCard) {
        wizardCard.classList.add('skeleton-loading');
        setTimeout(() => {
            wizardCard.classList.remove('skeleton-loading');
            if (callback) callback();
        }, 200);
    } else {
        if (callback) callback();
    }
}

function validateStep(step) {
    const lang = getCurrentLang();
    if (step === 1) {
        const primaryName = document.querySelector('input[name="fullName_1"]');
        const primaryId = document.querySelector('input[name="identityNo_1"]');
        if (!primaryName.value.trim() || !primaryId.value.trim()) {
            alert(lang === 'tr' ? 'Lütfen 1. Formdaki gerekli alanları (Ad Soyad, Kimlik No) doldurunuz.' : 'Please complete required fields in Form 1.');
            return false;
        }
    } else if (step === 3) {
        const chkTerms = document.getElementById('chkTerms');
        const chkNoChoice = document.getElementById('chkNoChoice');
        if (!chkTerms.checked || !chkNoChoice.checked) {
            alert(lang === 'tr' ? 'Lütfen hukuki sözleşmeyi ve beden seçimi sınırlamasını onaylayınız.' : 'Please accept the legal terms and non-selection policy.');
            return false;
        }
    }
    return true;
}

function initInheritanceAndTemplates() {
    const radioInheritYes = document.getElementById('radioInheritYes');
    const radioInheritNo = document.getElementById('radioInheritNo');
    const willSection = document.getElementById('willSection');
    const willText = document.getElementById('willText');

    if (radioInheritYes && radioInheritNo) {
        radioInheritYes.addEventListener('click', () => {
            radioInheritYes.classList.add('active');
            radioInheritNo.classList.remove('active');
            radioInheritYes.querySelector('input').checked = true;
            if (willSection) willSection.style.display = 'block';
        });

        radioInheritNo.addEventListener('click', () => {
            radioInheritNo.classList.add('active');
            radioInheritYes.classList.remove('active');
            radioInheritNo.querySelector('input').checked = true;
            if (willSection) willSection.style.display = 'none';
        });
    }

    const btnTpl1 = document.getElementById('btnTpl1');
    const btnTpl2 = document.getElementById('btnTpl2');
    const btnTpl3 = document.getElementById('btnTpl3');

    if (btnTpl1) btnTpl1.addEventListener('click', () => { if (willText) willText.value = getWillTemplate('tpl1', getCurrentLang()); });
    if (btnTpl2) btnTpl2.addEventListener('click', () => { if (willText) willText.value = getWillTemplate('tpl2', getCurrentLang()); });
    if (btnTpl3) btnTpl3.addEventListener('click', () => { if (willText) willText.value = getWillTemplate('tpl3', getCurrentLang()); });
}

function populateSummaryReview() {
    const lang = getCurrentLang();
    const primaryName = document.querySelector('input[name="fullName_1"]')?.value || 'Ahmet Yıldız';

    const revMemberNames = document.getElementById('revMemberNames');
    if (revMemberNames) revMemberNames.textContent = `${primaryName} (${memberCount} ${lang === 'tr' ? 'Kişi' : 'Person'})`;

    const revTierName = document.getElementById('revTierName');
    if (revTierName) revTierName.textContent = selectedTierName;

    const isInheritYes = document.querySelector('input[name="inheritanceChoice"]:checked')?.value === 'yes';
    const revInherit = document.getElementById('revInheritanceStatus');
    if (revInherit) {
        revInherit.textContent = isInheritYes 
            ? (lang === 'tr' ? 'Evet (Vasiyetname Ekli)' : 'Yes (Will Attached)')
            : (lang === 'tr' ? 'Devir İstenmedi' : 'No Asset Transfer');
    }

    const revTotalFee = document.getElementById('revTotalFee');
    if (revTotalFee) revTotalFee.textContent = lang === 'tr' ? '$0 USD (Ücretsiz Ön Kayıt)' : '$0 USD (Free Pre-Registration)';
}

function initCertificateModal(submitFormBtn) {
    const certModal = document.getElementById('certificateModal');
    const closeCertModal = document.getElementById('closeCertModal');
    const finishModalBtn = document.getElementById('finishModalBtn');
    const printCertBtn = document.getElementById('printCertBtn');

    if (submitFormBtn) {
        submitFormBtn.addEventListener('click', () => {
            const lang = getCurrentLang();
            const primaryName = document.querySelector('input[name="fullName_1"]')?.value || 'Ahmet Yıldız';
            const randomHash = 'RUH-2026-X' + Math.floor(1000 + Math.random() * 9000) + '-' + Math.floor(100 + Math.random() * 900);

            document.getElementById('certHashVal').textContent = randomHash;
            document.getElementById('certHolderName').textContent = primaryName;
            document.getElementById('certMemberCount').textContent = `${memberCount} ${lang === 'tr' ? 'Kişi' : 'Person(s)'}`;
            document.getElementById('certTierName').textContent = `${selectedTierName} (${lang === 'tr' ? 'Aşama 1 Ücretsiz' : 'Phase 1 Free'})`;
            
            const isInheritYes = document.querySelector('input[name="inheritanceChoice"]:checked')?.value === 'yes';
            document.getElementById('certInheritance').textContent = isInheritYes 
                ? (lang === 'tr' ? 'Kayıtlı & Escrow Onaylı' : 'Registered & Escrow Approved')
                : (lang === 'tr' ? 'Beden Tespiti (Miras Devirsiz)' : 'Host Body Detection Only');

            const today = new Date();
            document.getElementById('certDate').textContent = today.toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-US');

            if (certModal) certModal.classList.add('active');
        });
    }

    if (closeCertModal) closeCertModal.addEventListener('click', () => certModal.classList.remove('active'));
    if (finishModalBtn) finishModalBtn.addEventListener('click', () => certModal.classList.remove('active'));
    if (printCertBtn) printCertBtn.addEventListener('click', () => window.print());
}
