/**
 * RUH PROJECT - Wizard & Application State Module
 * Manages 5-step wizard navigation, strict multi-member form validation, newborn birth date calculation, Contingency Heir Succession Protocol, 11-digit Energy ID & 16-digit Barcode certificate rendering for R.U.H. Incorporation.
 */

import { getCurrentLang, getTranslation, translations } from './i18n.js';
import { getWillTemplate } from './templates.js';
import { registerUserAccount, generateEnergyId, generateBarcode16, formatBarcode } from './auth.js';

let currentStep = 1;
let memberCount = 1;
let selectedTier = 'phase1';
let currentMemberCerts = [];

/**
 * Attaches birth date change listener to calculate age automatically (supports newborns born today with age = 0)
 */
function attachBirthDateAgeListener(card, num) {
    const birthEl = card.querySelector(`input[name="birthDate_${num}"]`);
    const ageEl = card.querySelector(`input[name="age_${num}"]`);
    if (birthEl && ageEl) {
        // Set max date to today so newborns (born today) can be registered!
        const todayStr = new Date().toISOString().split('T')[0];
        birthEl.max = todayStr;

        birthEl.addEventListener('change', () => {
            if (birthEl.value) {
                const birthDate = new Date(birthEl.value);
                const today = new Date();
                let age = today.getFullYear() - birthDate.getFullYear();
                const m = today.getMonth() - birthDate.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                if (age < 0) age = 0; // Newborn baby
                ageEl.value = age;
            }
        });
    }
}

export function initWizard() {
    const familyFormsContainer = document.getElementById('familyFormsContainer');
    const addMemberBtn = document.getElementById('addMemberBtn');
    const prevStepBtn = document.getElementById('prevStepBtn');
    const nextStepBtn = document.getElementById('nextStepBtn');
    const submitFormBtn = document.getElementById('submitFormBtn');

    // Attach birth date age calculator listener to Form 1
    const primaryCard = document.querySelector('.family-member-card[data-member-index="1"]');
    if (primaryCard) {
        attachBirthDateAgeListener(primaryCard, 1);
    }

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
            const phAgeVal = translations[lang].phAge || '35';

            const lblAgeVal = translations[lang].lblAge || (lang === 'tr' ? 'Yaş *' : 'Age *');
            const lblGenderVal = translations[lang].lblGender || (lang === 'tr' ? 'Cinsiyet *' : 'Gender *');
            const optSelectVal = translations[lang].optGenderSelect || (lang === 'tr' ? 'Cinsiyet Seçiniz' : 'Select Gender');
            const optMaleVal = translations[lang].optGenderMale || (lang === 'tr' ? 'Erkek' : 'Male');
            const optFemaleVal = translations[lang].optGenderFemale || (lang === 'tr' ? 'Kadın' : 'Female');
            const optOtherVal = translations[lang].optGenderOther || (lang === 'tr' ? 'Diğer / Belirtmek İstemiyorum' : 'Other / Prefer not to say');

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
                        <label>${lblAgeVal}</label>
                        <input type="number" class="form-control" name="age_${memberIndex}" placeholder="${phAgeVal}" data-i18n-placeholder="phAge" min="0" max="120" required>
                    </div>
                    <div class="form-group">
                        <label>${lblGenderVal}</label>
                        <select class="form-control" name="gender_${memberIndex}" required>
                            <option value="" disabled selected>${optSelectVal}</option>
                            <option value="male">${optMaleVal}</option>
                            <option value="female">${optFemaleVal}</option>
                            <option value="other">${optOtherVal}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>${translations[lang].lblEmail}</label>
                        <input type="email" class="form-control" name="email_${memberIndex}" placeholder="${phEmail}" data-i18n-placeholder="phEmail" required>
                    </div>
                    <div class="form-group" style="grid-column: span 2;">
                        <label>${translations[lang].lblPhone}</label>
                        <input type="tel" class="form-control" name="phone_${memberIndex}" placeholder="${phPhone}" data-i18n-placeholder="phPhone" required>
                        <small class="form-hint" style="color: var(--color-cyan); font-size: 0.78rem; display: block; margin-top: 5px;" data-i18n="phoneNoticeHint">
                            <i class="fa-solid fa-mobile-screen-button"></i> Form tamamlandığında e-postanıza doğrulama bağlantısı, profilinizde ise mobil SMS onay sistemi sunulacaktır.
                        </small>
                    </div>
                    <div class="form-group" style="grid-column: span 2;">
                        <label>${translations[lang].lblRelation}</label>
                        <input type="text" class="form-control" name="relation_${memberIndex}" placeholder="${phRel}" data-i18n-placeholder="phRelationFamily" required>
                    </div>
                </div>
            `;

            familyFormsContainer.appendChild(memberCard);
            attachBirthDateAgeListener(memberCard, memberIndex);
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

    if (regPassEl && regPassConfirmEl && passMatchStatus) {
        const checkMatch = () => {
            const lang = getCurrentLang();
            const p1 = regPassEl.value;
            const p2 = regPassConfirmEl.value;
            if (!p2) {
                passMatchStatus.textContent = '';
                return;
            }
            if (p1 === p2) {
                passMatchStatus.textContent = lang === 'tr' ? '✓ Şifreler eşleşiyor' : '✓ Passwords match';
                passMatchStatus.style.color = 'var(--color-green)';
            } else {
                passMatchStatus.textContent = lang === 'tr' ? '✗ Şifreler eşleşmiyor' : '✗ Passwords do not match';
                passMatchStatus.style.color = 'var(--color-red)';
            }
        };
        regPassEl.addEventListener('input', checkMatch);
        regPassConfirmEl.addEventListener('input', checkMatch);
    }

    // Step Navigation
    if (nextStepBtn) {
        nextStepBtn.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                showSkeletonLoading(() => {
                    currentStep = Math.min(currentStep + 1, 5);
                    updateStepView();
                });
            }
        });
    }

    if (prevStepBtn) {
        prevStepBtn.addEventListener('click', () => {
            showSkeletonLoading(() => {
                currentStep = Math.max(currentStep - 1, 1);
                updateStepView();
            });
        });
    }

    // Indicator Click Handler
    document.querySelectorAll('.step-indicator').forEach(indicator => {
        indicator.addEventListener('click', () => {
            const targetStep = parseInt(indicator.getAttribute('data-step'), 10);
            if (targetStep < currentStep || validateStep(currentStep)) {
                showSkeletonLoading(() => {
                    currentStep = targetStep;
                    updateStepView();
                });
            }
        });
    });

    initInheritanceAndTemplates();
    initCertificateModal(submitFormBtn);
    updateStepView();
}

export function updateDynamicFormTitles() {
    const lang = getCurrentLang();
    const cards = document.querySelectorAll('.family-member-card');
    cards.forEach((card, idx) => {
        const num = idx + 1;
        card.setAttribute('data-member-index', num);
        const titleSpan = card.querySelector('.member-title-span');
        if (titleSpan) {
            if (num === 1) {
                titleSpan.textContent = lang === 'tr' ? 'Form 1: Ana Başvuru Sahibi (Kendiniz)' : 'Form 1: Primary Applicant (Self)';
            } else {
                titleSpan.textContent = lang === 'tr' ? `Form ${num}: Aile Üyesi` : `Form ${num}: Family Member`;
            }
        }
    });
}

export function updateFeeSummary() {
    const calcCountEl = document.getElementById('calcMemberCount');
    const calcTierEl = document.getElementById('calcTierName');
    const calcTotalEl = document.getElementById('calcTotalAmount');
    const lang = getCurrentLang();

    const count = document.querySelectorAll('.family-member-card').length;
    if (calcCountEl) calcCountEl.textContent = `${count} ${lang === 'tr' ? 'Kişi' : 'Person(s)'}`;
    if (calcTierEl) calcTierEl.textContent = lang === 'tr' ? 'Aşama 1 Ön Kayıt Protokolü (Aşama 1 Ücretsiz)' : 'Phase 1 Pre-Registration Protocol (Phase 1 Free)';
    if (calcTotalEl) calcTotalEl.textContent = lang === 'tr' ? '$0 USD (Ücretsiz Ön Kayıt)' : '$0 USD (Free Pre-Registration)';
}

function updateStepView() {
    document.querySelectorAll('.wizard-step-panel').forEach((panel, idx) => {
        panel.classList.toggle('active', idx + 1 === currentStep);
    });

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
        populateContingencySuccessionView();
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
        const formCards = document.querySelectorAll('.family-member-card');
        for (let idx = 0; idx < formCards.length; idx++) {
            const num = idx + 1;
            const nameEl = formCards[idx].querySelector(`input[name="fullName_${num}"]`);
            const idEl = formCards[idx].querySelector(`input[name="identityNo_${num}"]`);
            const birthEl = formCards[idx].querySelector(`input[name="birthDate_${num}"]`);
            const ageEl = formCards[idx].querySelector(`input[name="age_${num}"]`);
            const genderEl = formCards[idx].querySelector(`select[name="gender_${num}"]`);
            const emailEl = formCards[idx].querySelector(`input[name="email_${num}"]`);
            const phoneEl = formCards[idx].querySelector(`input[name="phone_${num}"]`);
            const relEl = formCards[idx].querySelector(`input[name="relation_${num}"]`);

            const isNameValid = nameEl && nameEl.value.trim().length > 0;
            const isIdValid = idEl && idEl.value.trim().length > 0;
            const isBirthValid = birthEl && birthEl.value.length > 0;
            const isAgeValid = ageEl && ageEl.value !== '' && ageEl.value !== undefined && parseInt(ageEl.value, 10) >= 0;
            const isGenderValid = genderEl && genderEl.value !== '';
            const isEmailValid = emailEl && emailEl.value.trim().length > 0;
            const isPhoneValid = phoneEl && phoneEl.value.trim().length > 0;
            const isRelValid = relEl && relEl.value.trim().length > 0;

            if (!isNameValid || !isIdValid || !isBirthValid || !isAgeValid || !isGenderValid || !isEmailValid || !isPhoneValid || !isRelValid) {
                alert(lang === 'tr' 
                    ? `⚠️ Form ${num}'de doldurulmamış eksik alanlar bulunmaktadır!\n\nAdım 2'ye geçebilmek için Ad Soyad, Kimlik No, Doğum Tarihi, Yaş, Cinsiyet, E-posta, Telefon Numarası ve Yakınlık alanlarının tamamını eksiksiz doldurmanız zorunludur.` 
                    : `⚠️ Form ${num} has incomplete required fields!\n\nTo proceed to Step 2, you must fill out Full Name, National ID, Birth Date, Age, Gender, Email, Phone Number, and Relationship.`);
                return false;
            }
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

/**
 * Renders Contingency Rights Succession Box in Step 5 (Vefat Halinde Hak Devri)
 */
export function populateContingencySuccessionView() {
    const container = document.getElementById('contingencyDynamicContainer');
    if (!container) return;

    const lang = getCurrentLang();
    const familyCards = document.querySelectorAll('.family-member-card');
    
    if (familyCards.length > 1) {
        // Multiple family members registered
        let html = `
            <p style="font-size: 0.88rem; color: var(--color-gold); margin-bottom: 14px; font-weight: 600;">
                <i class="fa-solid fa-users"></i> ${translations[lang].contingencyMultiNotice || 'Kayıtlı diğer aile üyeleriniz arasından hak devri yapmak istediğiniz kişi(leri) seçiniz ve devir oranlarını belirleyiniz:'}
            </p>
            <div style="display: flex; flex-direction: column; gap: 10px;">
        `;

        const otherMembers = [];
        familyCards.forEach((card, idx) => {
            const memberIdx = card.getAttribute('data-member-index');
            if (memberIdx !== '1') {
                const nameInput = card.querySelector(`input[name="fullName_${memberIdx}"]`);
                const relInput = card.querySelector(`input[name="relation_${memberIdx}"]`);
                const name = nameInput ? nameInput.value.trim() : `Aile Üyesi ${memberIdx}`;
                const relation = relInput ? relInput.value.trim() : (lang === 'tr' ? 'Aile Üyesi' : 'Family Member');
                otherMembers.push({ index: memberIdx, name, relation });
            }
        });

        const equalShare = Math.floor(100 / (otherMembers.length || 1));

        otherMembers.forEach((m) => {
            html += `
                <div class="contingency-item-row" style="display: flex; align-items: center; justify-content: space-between; background: rgba(10, 14, 26, 0.8); padding: 12px 16px; border-radius: 8px; border: 1px solid rgba(0, 242, 254, 0.2);">
                    <label style="display: flex; align-items: center; gap: 10px; margin: 0; cursor: pointer; color: #fff; font-size: 0.95rem; font-weight: 500;">
                        <input type="checkbox" class="chk-contingency-member" data-member-idx="${m.index}" checked style="width: 18px; height: 18px; accent-color: var(--color-cyan);">
                        <span><strong>${m.name}</strong> (${m.relation})</span>
                    </label>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 0.85rem; color: var(--text-muted);">${lang === 'tr' ? 'Devir Oranı:' : 'Share:'}</span>
                        <input type="number" class="form-control input-contingency-share" data-member-idx="${m.index}" value="${equalShare}" min="1" max="100" style="width: 75px; text-align: center; padding: 6px; font-weight: 700;"> %
                    </div>
                </div>
            `;
        });

        html += `</div>`;
        container.innerHTML = html;

    } else {
        // Single applicant (only Form 1)
        const html = `
            <div class="contingency-single-box">
                <p style="font-size: 0.88rem; color: var(--color-gold); margin-bottom: 12px; font-weight: 600;">
                    <i class="fa-solid fa-user-shield"></i> ${translations[lang].contingencySingleNotice || 'Kendiniz dışında aile üyesi kaydetmediğiniz için, vefatınız durumunda Aşama 2 & 3 öncelik haklarınızı devretmek istediğiniz 1. derece kanuni mirasçı veya yedek hak sahibini belirtiniz:'}
                </p>
                <div class="form-grid" style="grid-template-columns: 1fr 1fr; gap: 14px;">
                    <div class="form-group" style="margin: 0;">
                        <label>${translations[lang].lblBackupHeirName || 'Yedek Hak Sahibi Ad Soyad *'}</label>
                        <input type="text" class="form-control" id="backupHeirName" placeholder="${translations[lang].phBackupHeirName || 'Örn: Mehmet Yıldız'}" required>
                    </div>
                    <div class="form-group" style="margin: 0;">
                        <label>${translations[lang].lblBackupHeirRelation || 'Yakınlık / İletişim *'}</label>
                        <input type="text" class="form-control" id="backupHeirRelation" placeholder="${translations[lang].phBackupHeirRelation || 'Örn: Oğlu / +90 555...'}" required>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML = html;
    }
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
            const primaryPhone = document.querySelector('input[name="phone_1"]')?.value || '';
            
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

            // Single Heir backup fields validation if memberCount === 1
            const familyCards = document.querySelectorAll('.family-member-card');
            let backupHeirData = null;
            if (familyCards.length === 1) {
                const bName = document.getElementById('backupHeirName');
                const bRel = document.getElementById('backupHeirRelation');
                if (bName && !bName.value.trim()) {
                    alert(lang === 'tr' ? 'Lütfen vefat halinde devredilecek Yedek Hak Sahibi Ad Soyad alanını doldurunuz.' : 'Please enter Backup Heir Full Name.');
                    if (bName) bName.focus();
                    return;
                }
                backupHeirData = {
                    name: bName?.value.trim(),
                    relation: bRel?.value.trim()
                };
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
            
            familyCards.forEach((card, idx) => {
                const num = idx + 1;
                const fName = card.querySelector(`input[name="fullName_${num}"]`)?.value || (num === 1 ? primaryName : `Member ${num}`);
                const fId = card.querySelector(`input[name="identityNo_${num}"]`)?.value || primaryId;
                const fEmail = card.querySelector(`input[name="email_${num}"]`)?.value || primaryEmail;
                const fPhone = card.querySelector(`input[name="phone_${num}"]`)?.value || primaryPhone;
                const fAge = card.querySelector(`input[name="age_${num}"]`)?.value || '0';
                const fGender = card.querySelector(`select[name="gender_${num}"]`)?.value || '';

                currentMemberCerts.push({
                    fullName: fName,
                    identityNo: fId,
                    email: fEmail,
                    phone: fPhone,
                    age: fAge,
                    gender: fGender,
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
                phone: primaryMember.phone,
                age: primaryMember.age,
                gender: primaryMember.gender,
                password: password,
                energyId: primaryMember.energyId,
                barcode: primaryMember.barcode,
                tierName: selectedTierName,
                inheritanceStatus: inheritStatus,
                registeredAt: fullDateTime,
                phoneVerified: false, // Default false until SMS verification in profile
                backupHeir: backupHeirData,
                members: currentMemberCerts
            });

            // Simulated Email Verification Link Notification
            alert(lang === 'tr' 
                ? `📧 E-POSTA DOĞRULAMA BİLDİRİMİ:\n\nForm kaydınız başarıyla oluşturuldu! E-posta adresinize (${primaryMember.email}) doğrulama bağlantısı gönderilmiştir.\n\nTelefon numaranızı (${primaryMember.phone}) doğrulamak için sağ üstteki 'Profilim' sekmesinden 6 haneli Mobil SMS Onay sistemini kullanabilirsiniz.`
                : `📧 EMAIL VERIFICATION NOTICE:\n\nRegistration complete! A verification link has been sent to your email (${primaryMember.email}).\n\nTo verify your phone (${primaryMember.phone}), use the 6-digit Mobile SMS system in your 'My Profile' tab.`
            );

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
    const switcherSelect = document.getElementById('certMemberSwitcher');

    if (switcherWrapper && switcherSelect) {
        if (currentMemberCerts.length > 1) {
            switcherWrapper.style.display = 'block';
            switcherSelect.innerHTML = '';
            currentMemberCerts.forEach((m, idx) => {
                const opt = document.createElement('option');
                opt.value = idx;
                opt.textContent = `${m.fullName} (${m.energyId})`;
                if (idx === memberIndex) opt.selected = true;
                switcherSelect.appendChild(opt);
            });

            switcherSelect.onchange = (e) => {
                renderCertificateView(parseInt(e.target.value, 10));
            };
        } else {
            switcherWrapper.style.display = 'none';
        }
    }
}
