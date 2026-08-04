/**
 * RUH PROJECT - Wizard & Application State Module
 * Manages 5-step wizard navigation, multi-member form registration, 11-digit Energy ID & 16-digit Barcode certificate rendering for R.U.H. Incorporation.
 */

import { getCurrentLang, getTranslation, translations } from './i18n.js';
import { getWillTemplate } from './templates.js';
import { registerUserAccount, generateEnergyId, generateBarcode16, formatBarcode } from './auth.js';

let currentStep = 1;
let memberCount = 1;
let selectedTier = 'phase1';
let currentMemberCerts = [];

export function initWizard() {
    const familyFormsContainer = document.getElementById('familyFormsContainer');
    const addMemberBtn = document.getElementById('addMemberBtn');
    const prevStepBtn = document.getElementById('prevStepBtn');
    const nextStepBtn = document.getElementById('nextStepBtn');
    const submitFormBtn = document.getElementById('submitFormBtn');

    // Add Family Member Form
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

            const phName = translations[lang].phFullName;
            const phId = translations[lang].phIdentity;
            const phEmail = translations[lang].phEmail;
            const phPhone = translations[lang].phPhone;
            const phRel = translations[lang].phRelationFamily;

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
                        <input type="text" class="form-control" name="fullName_${memberIndex}" placeholder="${phName}" data-i18n-placeholder="phFullName" required>
                    </div>
                    <div class="form-group">
                        <label>${translations[lang].lblIdentity}</label>
                        <input type="text" class="form-control" name="identityNo_${memberIndex}" placeholder="${phId}" data-i18n-placeholder="phIdentity" required>
                    </div>
                    <div class="form-group">
                        <label>${translations[lang].lblBirthDate}</label>
                        <input type="date" class="form-control" name="birthDate_${memberIndex}" required>
                    </div>
                    <div class="form-group">
                        <label>${translations[lang].lblEmail}</label>
                        <input type="email" class="form-control" name="email_${memberIndex}" placeholder="${phEmail}" data-i18n-placeholder="phEmail" required>
                    </div>
                    <div class="form-group">
                        <label>${translations[lang].lblPhone}</label>
                        <input type="tel" class="form-control" name="phone_${memberIndex}" placeholder="${phPhone}" data-i18n-placeholder="phPhone" required>
                    </div>
                    <div class="form-group">
                        <label>${translations[lang].lblRelation}</label>
                        <input type="text" class="form-control" name="relation_${memberIndex}" placeholder="${phRel}" data-i18n-placeholder="phRelationFamily" required>
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

    // Password live match feedback
    const regPassEl = document.getElementById('regPassword');
    const regPassConfirmEl = document.getElementById('regPasswordConfirm');
    const passMatchStatus = document.getElementById('passMatchStatus');

    function checkPasswordMatch() {
        if (!regPassEl || !regPassConfirmEl || !passMatchStatus) return;
        const p1 = regPassEl.value.trim();
        const p2 = regPassConfirmEl.value.trim();
        const lang = getCurrentLang();

        if (!p2) {
            passMatchStatus.textContent = '';
            return;
        }

        if (p1 === p2) {
            passMatchStatus.textContent = lang === 'tr' ? '✓ Şifreler eşleşiyor' : '✓ Passwords match';
            passMatchStatus.style.color = '#00ff88';
        } else {
            passMatchStatus.textContent = lang === 'tr' ? '✕ Şifreler eşleşmiyor' : '✕ Passwords do not match';
            passMatchStatus.style.color = '#ff5555';
        }
    }

    if (regPassEl) regPassEl.addEventListener('input', checkPasswordMatch);
    if (regPassConfirmEl) regPassConfirmEl.addEventListener('input', checkPasswordMatch);

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

    // Modal Certificate & Account Registration
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

    const selectedTierName = lang === 'tr' ? 'Aşama 1 Ön Kayıt Protokolü' : 'Phase 1 Pre-Registration Protocol';

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
        const chkKvkk = document.getElementById('chkKvkk');
        if (!chkTerms || !chkTerms.checked) {
            alert(lang === 'tr' ? 'Lütfen Hukuki Çerçeve ve Sorumluluk Sözleşmesi\'ni onaylayınız.' : 'Please accept the Legal Terms Contract.');
            return false;
        }
        if (!chkKvkk || !chkKvkk.checked) {
            alert(lang === 'tr' ? 'Lütfen 6698 Sayılı KVKK ve Gizlilik Politikası Aydınlatma Metni\'ni onaylayınız.' : 'Please accept the KVKK Privacy Policy Consent.');
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
    const selectedTierName = lang === 'tr' ? 'Aşama 1 Ön Kayıt Protokolü' : 'Phase 1 Pre-Registration Protocol';

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
            const primaryId = document.querySelector('input[name="identityNo_1"]')?.value || '11111111111';
            const primaryEmail = document.querySelector('input[name="email_1"]')?.value || 'user@example.com';
            
            const regPasswordInput = document.getElementById('regPassword');
            const regPasswordConfirmInput = document.getElementById('regPasswordConfirm');

            const password = regPasswordInput ? regPasswordInput.value.trim() : '';
            const confirmPassword = regPasswordConfirmInput ? regPasswordConfirmInput.value.trim() : '';

            // Password Rule Checks (Social Media Rules: min 8 chars, 1 uppercase, 1 lowercase, 1 number)
            const hasMinLength = password.length >= 8;
            const hasUpper = /[A-Z]/.test(password);
            const hasLower = /[a-z]/.test(password);
            const hasNumber = /[0-9]/.test(password);

            if (!hasMinLength || !hasUpper || !hasLower || !hasNumber) {
                alert(lang === 'tr' 
                    ? 'Şifreniz güvenlik kurallarına uymamaktadır.\nLütfen en az 8 karakter, 1 büyük harf, 1 küçük harf ve 1 rakam içeren bir şifre giriniz.' 
                    : 'Password does not meet security requirements.\nMust contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 number.'
                );
                if (regPasswordInput) regPasswordInput.focus();
                return;
            }

            if (password !== confirmPassword) {
                alert(lang === 'tr' 
                    ? 'Girdiğiniz şifreler eşleşmiyor! Lütfen şifre doğrulama kutucuğuna aynı şifreyi giriniz.' 
                    : 'Passwords do not match! Please re-enter the exact same password in the confirmation box.'
                );
                if (regPasswordConfirmInput) regPasswordConfirmInput.focus();
                return;
            }

            const selectedTierName = lang === 'tr' ? 'Aşama 1 Ön Kayıt Protokolü' : 'Phase 1 Pre-Registration Protocol';
            const isInheritYes = document.querySelector('input[name="inheritanceChoice"]:checked')?.value === 'yes';
            const inheritStatus = isInheritYes 
                ? (lang === 'tr' ? 'Kayıtlı & Escrow Onaylı' : 'Registered & Escrow Approved')
                : (lang === 'tr' ? 'Beden Tespiti (Miras Devirsiz)' : 'Host Body Detection Only');

            const now = new Date();
            const dateStr = now.toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-US');
            const timeStr = now.toLocaleTimeString(lang === 'tr' ? 'tr-TR' : 'en-US');
            const fullDateTime = `${dateStr} ${timeStr}`;

            // Build array of all registered family members with unique 11-digit Energy IDs and 16-digit Barcodes
            currentMemberCerts = [];
            const formCards = document.querySelectorAll('.family-member-card');
            
            formCards.forEach((card, idx) => {
                const num = idx + 1;
                const fName = card.querySelector(`input[name="fullName_${num}"]`)?.value || (num === 1 ? primaryName : `Member ${num}`);
                const fId = card.querySelector(`input[name="identityNo_${num}"]`)?.value || primaryId;
                const fEmail = card.querySelector(`input[name="email_${num}"]`)?.value || primaryEmail;

                currentMemberCerts.push({
                    fullName: fName,
                    identityNo: fId,
                    email: fEmail,
                    energyId: generateEnergyId(), // 11 alphanumeric characters
                    barcode: generateBarcode16(), // 16 digits
                    registeredAt: fullDateTime,
                    tierName: selectedTierName,
                    inheritanceStatus: inheritStatus
                });
            });

            const primaryMember = currentMemberCerts[0];

            // Save Account & Auto-login
            registerUserAccount({
                fullName: primaryMember.fullName,
                identityNo: primaryMember.identityNo,
                email: primaryMember.email,
                password: password,
                energyId: primaryMember.energyId,
                barcode: primaryMember.barcode,
                tierName: selectedTierName,
                inheritanceStatus: inheritStatus,
                registeredAt: fullDateTime,
                members: currentMemberCerts
            });

            // Render Certificate in Modal
            renderCertificateView(0);

            if (certModal) certModal.classList.add('active');
        });
    }

    if (closeCertModal) closeCertModal.addEventListener('click', () => certModal.classList.remove('active'));
    if (finishModalBtn) finishModalBtn.addEventListener('click', () => certModal.classList.remove('active'));
    if (printCertBtn) printCertBtn.addEventListener('click', () => window.print());
}

/**
 * Renders an official corporate R.U.H. Incorporation certificate inside the modal
 */
export function renderCertificateView(memberIndex = 0) {
    const cert = currentMemberCerts[memberIndex] || currentMemberCerts[0];
    if (!cert) return;

    const lang = getCurrentLang();
    const holderEl = document.getElementById('certHolderName');
    const energyIdEl = document.getElementById('certEnergyIdVal');
    const barcodeEl = document.getElementById('certBarcodeVal');
    const memberCountEl = document.getElementById('certMemberCount');
    const tierEl = document.getElementById('certTierName');
    const inheritEl = document.getElementById('certInheritance');
    const dateEl = document.getElementById('certDate');
    const qrImgEl = document.getElementById('certQrImg');

    if (holderEl) holderEl.textContent = cert.fullName;
    if (energyIdEl) energyIdEl.textContent = cert.energyId;
    if (barcodeEl) barcodeEl.textContent = formatBarcode(cert.barcode);
    if (memberCountEl) memberCountEl.textContent = `${currentMemberCerts.length} ${lang === 'tr' ? 'Kişi' : 'Person(s)'}`;
    if (tierEl) tierEl.textContent = `${cert.tierName} (${lang === 'tr' ? 'Aşama 1 Ücretsiz' : 'Phase 1 Free'})`;
    if (inheritEl) inheritEl.textContent = cert.inheritanceStatus;
    if (dateEl) dateEl.textContent = cert.registeredAt;

    // Generate dynamic QR code URL linking directly to verification portal on mobile scan
    const verifyUrl = `https://ozkanatasoy.github.io/RUH-Project/?verify=${cert.barcode}#verify`;
    if (qrImgEl) {
        qrImgEl.src = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(verifyUrl)}&color=00f2fe&bkgnd=07080d`;
        qrImgEl.alt = `Sertifika QR Kodu: ${cert.barcode}`;
    }

    // Populate Member Switcher dropdown if multiple members exist
    const switcherWrapper = document.getElementById('certMemberSwitcherWrapper');
    if (switcherWrapper) {
        if (currentMemberCerts.length > 1) {
            switcherWrapper.style.display = 'block';
            switcherWrapper.innerHTML = `
                <label style="font-size: 0.85rem; color: var(--text-muted); margin-right: 8px;">
                    ${lang === 'tr' ? 'Sertifika Seçin:' : 'Select Certificate:'}
                </label>
                <select id="certMemberSelect" class="form-control" style="display: inline-block; width: auto; padding: 4px 12px; font-size: 0.88rem;">
                    ${currentMemberCerts.map((m, i) => `
                        <option value="${i}" ${i === memberIndex ? 'selected' : ''}>
                            ${m.fullName} (${m.energyId})
                        </option>
                    `).join('')}
                </select>
            `;

            const selectEl = document.getElementById('certMemberSelect');
            if (selectEl) {
                selectEl.addEventListener('change', (e) => {
                    renderCertificateView(parseInt(e.target.value, 10));
                });
            }
        } else {
            switcherWrapper.style.display = 'none';
        }
    }
}
