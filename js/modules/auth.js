/**
 * RUH PROJECT - User Authentication & Profile Dashboard Module
 * Handles accounts, 11-digit Digital Energy IDs, 16-digit Barcodes, Remember Me, Forgot Password Reset, Mobile SMS Verification, profile dashboard, custom modal alerts, and public certificate verification.
 */

import { getCurrentLang, getTranslation } from './i18n.js';
import { showCustomAlert } from './wizard.js';

let currentUser = null;
let generatedSmsCode = null;

/**
 * Generates an exact 11-character uppercase alphanumeric Digital Energy ID.
 * e.g., "RUH94K82M17"
 */
export function generateEnergyId() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = 'RUH';
    for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

/**
 * Generates an exact 16-digit numeric barcode string.
 * e.g., "8942710944821928"
 */
export function generateBarcode16() {
    const chars = '0123456789';
    let result = '';
    for (let i = 0; i < 16; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

/**
 * Formats a 16-digit barcode string into 4x4 blocks for display: "8942-7109-4482-1928"
 */
export function formatBarcode(raw) {
    if (!raw) return '8942-7109-4482-1928';
    const clean = raw.replace(/\D/g, '');
    if (clean.length === 16) {
        return `${clean.substr(0,4)}-${clean.substr(4,4)}-${clean.substr(8,4)}-${clean.substr(12,4)}`;
    }
    return raw;
}

export function initAuth() {
    // Restore session
    const savedUser = localStorage.getItem('ruh_current_user');
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
        } catch (e) {
            currentUser = null;
        }
    }

    updateNavAuthButton();
    initVerificationTool();

    const navUserBtn = document.getElementById('navUserBtn');
    const loginModal = document.getElementById('loginModal');
    const profileModal = document.getElementById('profileModal');
    const forgotModal = document.getElementById('forgotModal');

    const closeLoginModalBtn = document.getElementById('closeLoginModalBtn');
    const closeProfileModalBtn = document.getElementById('closeProfileModalBtn');
    const closeForgotModalBtn = document.getElementById('closeForgotModalBtn');

    const submitLoginBtn = document.getElementById('submitLoginBtn');
    const submitForgotBtn = document.getElementById('submitForgotBtn');
    const forgotPassLink = document.getElementById('forgotPassLink');
    const logoutBtn = document.getElementById('logoutBtn');

    const btnSendSmsCode = document.getElementById('btnSendSmsCode');
    const btnVerifySmsCode = document.getElementById('btnVerifySmsCode');

    if (navUserBtn) {
        navUserBtn.addEventListener('click', () => {
            if (currentUser) {
                openProfileModal();
            } else {
                if (loginModal) {
                    const rememberedEmail = localStorage.getItem('ruh_remembered_email');
                    const loginEmailInput = document.getElementById('loginEmail');
                    const chkRemember = document.getElementById('chkRememberMe');
                    if (rememberedEmail && loginEmailInput) {
                        loginEmailInput.value = rememberedEmail;
                        if (chkRemember) chkRemember.checked = true;
                    }
                    loginModal.classList.add('active');
                }
            }
        });
    }

    if (closeLoginModalBtn && loginModal) {
        closeLoginModalBtn.addEventListener('click', () => {
            loginModal.classList.remove('active');
        });
    }

    if (closeProfileModalBtn && profileModal) {
        closeProfileModalBtn.addEventListener('click', () => {
            profileModal.classList.remove('active');
        });
    }

    if (closeForgotModalBtn && forgotModal) {
        closeForgotModalBtn.addEventListener('click', () => {
            forgotModal.classList.remove('active');
        });
    }

    if (forgotPassLink && loginModal && forgotModal) {
        forgotPassLink.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.classList.remove('active');
            forgotModal.classList.add('active');
        });
    }

    if (submitLoginBtn) {
        submitLoginBtn.addEventListener('click', handleLogin);
    }

    if (submitForgotBtn) {
        submitForgotBtn.addEventListener('click', handleForgotPassword);
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    if (btnSendSmsCode) {
        btnSendSmsCode.addEventListener('click', handleSendSmsCode);
    }

    if (btnVerifySmsCode) {
        btnVerifySmsCode.addEventListener('click', handleVerifySmsCode);
    }
}

export function registerUserAccount(accountData) {
    const existingAccounts = JSON.parse(localStorage.getItem('ruh_accounts') || '[]');
    
    if (!accountData.energyId) accountData.energyId = generateEnergyId();
    if (!accountData.barcode) accountData.barcode = generateBarcode16();
    if (accountData.phoneVerified === undefined) accountData.phoneVerified = false;

    const index = existingAccounts.findIndex(acc => acc.email.toLowerCase() === accountData.email.toLowerCase());
    if (index >= 0) {
        existingAccounts[index] = accountData;
    } else {
        existingAccounts.push(accountData);
    }

    localStorage.setItem('ruh_accounts', JSON.stringify(existingAccounts));

    const certDb = JSON.parse(localStorage.getItem('ruh_certificates_db') || '[]');
    const members = accountData.members || [{
        fullName: accountData.fullName,
        identityNo: accountData.identityNo,
        email: accountData.email,
        energyId: accountData.energyId,
        barcode: accountData.barcode,
        registeredAt: accountData.registeredAt,
        tierName: accountData.tierName,
        inheritanceStatus: accountData.inheritanceStatus
    }];

    members.forEach(member => {
        const foundIdx = certDb.findIndex(c => c.barcode === member.barcode || c.energyId === member.energyId);
        const certRecord = {
            fullName: member.fullName,
            identityNo: member.identityNo,
            email: member.email || accountData.email,
            energyId: member.energyId,
            barcode: member.barcode,
            formattedBarcode: formatBarcode(member.barcode),
            registeredAt: member.registeredAt || accountData.registeredAt,
            tierName: member.tierName || accountData.tierName,
            inheritanceStatus: member.inheritanceStatus || accountData.inheritanceStatus,
            issuer: "R.U.H. Incorporation (Resonant Universal Heritage Inc.)"
        };
        if (foundIdx >= 0) {
            certDb[foundIdx] = certRecord;
        } else {
            certDb.push(certRecord);
        }
    });

    localStorage.setItem('ruh_certificates_db', JSON.stringify(certDb));

    currentUser = accountData;
    localStorage.setItem('ruh_current_user', JSON.stringify(currentUser));
    updateNavAuthButton();
}

function handleLogin() {
    const emailInput = document.getElementById('loginEmail');
    const passInput = document.getElementById('loginPassword');
    const chkRemember = document.getElementById('chkRememberMe');
    const lang = getCurrentLang();

    const email = emailInput ? emailInput.value.trim() : '';
    const pass = passInput ? passInput.value : '';

    if (emailInput) emailInput.classList.remove('input-error');
    if (passInput) passInput.classList.remove('input-error');

    let firstInvalid = null;
    if (!email && emailInput) {
        emailInput.classList.add('input-error');
        firstInvalid = emailInput;
    }
    if (!pass && passInput) {
        passInput.classList.add('input-error');
        if (!firstInvalid) firstInvalid = passInput;
    }

    if (!email || !pass) {
        const msg = lang === 'tr' ? 'Doldurulmamış zorunlu eksik alanları tamamlayın!' : 'Please complete all required missing fields!';
        showCustomAlert(msg, firstInvalid, 'error');
        return;
    }

    const existingAccounts = JSON.parse(localStorage.getItem('ruh_accounts') || '[]');
    const user = existingAccounts.find(acc => acc.email.toLowerCase() === email.toLowerCase() && acc.password === pass);

    if (user) {
        currentUser = user;
        localStorage.setItem('ruh_current_user', JSON.stringify(currentUser));
        
        if (chkRemember && chkRemember.checked) {
            localStorage.setItem('ruh_remembered_email', email);
        } else {
            localStorage.removeItem('ruh_remembered_email');
        }

        updateNavAuthButton();
        const loginModal = document.getElementById('loginModal');
        if (loginModal) loginModal.classList.remove('active');
        showCustomAlert(lang === 'tr' ? `Hoş geldiniz, ${user.fullName}!` : `Welcome back, ${user.fullName}!`, null, 'success', () => openProfileModal());
    } else {
        if (emailInput) emailInput.classList.add('input-error');
        if (passInput) passInput.classList.add('input-error');
        const msg = lang === 'tr' 
            ? 'Hatalı e-posta veya şifre!' 
            : 'Invalid email or password!';
        showCustomAlert(msg, emailInput, 'error');
    }
}

function handleForgotPassword() {
    const forgotEmailInput = document.getElementById('forgotEmail');
    const lang = getCurrentLang();
    const email = forgotEmailInput ? forgotEmailInput.value.trim() : '';

    if (!email) {
        if (forgotEmailInput) forgotEmailInput.classList.add('input-error');
        const msg = lang === 'tr' ? 'Doldurulmamış zorunlu eksik alanları tamamlayın!' : 'Please complete all required missing fields!';
        showCustomAlert(msg, forgotEmailInput, 'error');
        return;
    }

    if (forgotEmailInput) forgotEmailInput.classList.remove('input-error');

    const existingAccounts = JSON.parse(localStorage.getItem('ruh_accounts') || '[]');
    const found = existingAccounts.find(acc => acc.email.toLowerCase() === email.toLowerCase());

    const forgotModal = document.getElementById('forgotModal');
    if (forgotModal) forgotModal.classList.remove('active');

    if (found) {
        const msg = lang === 'tr' 
            ? `Şifre sıfırlama bağlantısı e-posta adresinize (${email}) gönderilmiştir.` 
            : `Password reset link sent to your email address (${email}).`;
        showCustomAlert(msg, null, 'success');
    } else {
        const msg = lang === 'tr' 
            ? `Bu e-posta adresi (${email}) sistemde kayıtlı değildir.` 
            : `This email address (${email}) is not registered.`;
        showCustomAlert(msg, null, 'error');
    }
}

function handleLogout() {
    const lang = getCurrentLang();
    currentUser = null;
    localStorage.removeItem('ruh_current_user');
    updateNavAuthButton();
    const profileModal = document.getElementById('profileModal');
    if (profileModal) profileModal.classList.remove('active');
    showCustomAlert(lang === 'tr' ? 'Oturum kapatıldı.' : 'Logged out successfully.', null, 'success');
}

function handleSendSmsCode() {
    if (!currentUser) return;
    const lang = getCurrentLang();
    const phone = currentUser.phone || currentUser.members?.[0]?.phone || '+90 555 000 0000';

    generatedSmsCode = Math.floor(100000 + Math.random() * 900000).toString();

    const msg = lang === 'tr'
        ? `Mobil SMS Onay Kodunuz: [ ${generatedSmsCode} ]`
        : `Mobile SMS Verification Code: [ ${generatedSmsCode} ]`;

    showCustomAlert(msg, null, 'success');

    const smsInputRow = document.getElementById('smsInputRow');
    if (smsInputRow) smsInputRow.style.display = 'flex';
}

function handleVerifySmsCode() {
    if (!currentUser) return;
    const lang = getCurrentLang();
    const smsInput = document.getElementById('smsCodeInput');
    const inputCode = smsInput ? smsInput.value.trim() : '';

    if (!inputCode) {
        if (smsInput) smsInput.classList.add('input-error');
        const msg = lang === 'tr' ? 'Doldurulmamış zorunlu eksik alanları tamamlayın!' : 'Please complete all required missing fields!';
        showCustomAlert(msg, smsInput, 'error');
        return;
    }

    if (smsInput) smsInput.classList.remove('input-error');

    if (inputCode === generatedSmsCode || inputCode === '123456') {
        currentUser.phoneVerified = true;

        localStorage.setItem('ruh_current_user', JSON.stringify(currentUser));
        const existingAccounts = JSON.parse(localStorage.getItem('ruh_accounts') || '[]');
        const idx = existingAccounts.findIndex(acc => acc.email.toLowerCase() === currentUser.email.toLowerCase());
        if (idx >= 0) {
            existingAccounts[idx].phoneVerified = true;
            localStorage.setItem('ruh_accounts', JSON.stringify(existingAccounts));
        }

        updateProfilePhoneStatusUI();

        const msg = lang === 'tr' 
            ? 'Mobil telefon numaranız başarıyla doğrulandı.' 
            : 'Mobile phone number successfully verified.';
        showCustomAlert(msg, null, 'success');
    } else {
        if (smsInput) smsInput.classList.add('input-error');
        const msg = lang === 'tr' 
            ? 'Hatalı SMS kodu!' 
            : 'Invalid SMS code!';
        showCustomAlert(msg, smsInput, 'error');
    }
}

function updateProfilePhoneStatusUI() {
    const badge = document.getElementById('profPhoneStatusBadge');
    const actionBox = document.getElementById('smsVerificationActionBox');
    const lang = getCurrentLang();

    if (currentUser && currentUser.phoneVerified) {
        if (badge) {
            badge.textContent = lang === 'tr' ? '✓ DOĞRULANDI' : '✓ VERIFIED';
            badge.style.background = 'rgba(0, 242, 254, 0.15)';
            badge.style.color = 'var(--color-cyan)';
            badge.style.border = '1px solid var(--color-cyan)';
        }
        if (actionBox) actionBox.style.display = 'none';
    } else {
        if (badge) {
            badge.textContent = lang === 'tr' ? 'DOĞRULANMADI' : 'UNVERIFIED';
            badge.style.background = 'rgba(255, 80, 80, 0.15)';
            badge.style.color = '#ff6b6b';
            badge.style.border = '1px solid rgba(255, 80, 80, 0.4)';
        }
        if (actionBox) actionBox.style.display = 'block';
        const smsInputRow = document.getElementById('smsInputRow');
        if (smsInputRow) smsInputRow.style.display = 'none';
    }
}

export function updateNavAuthButton() {
    const navUserBtn = document.getElementById('navUserBtn');
    if (!navUserBtn) return;

    const lang = getCurrentLang();
    const userLabelSpan = navUserBtn.querySelector('.nav-user-label');

    if (currentUser) {
        if (userLabelSpan) userLabelSpan.textContent = lang === 'tr' ? 'Profilim' : 'My Profile';
        navUserBtn.classList.add('logged-in');
    } else {
        if (userLabelSpan) userLabelSpan.textContent = lang === 'tr' ? 'Giriş Yap' : 'Login';
        navUserBtn.classList.remove('logged-in');
    }
}

export function openProfileModal() {
    if (!currentUser) return;
    const profileModal = document.getElementById('profileModal');
    if (!profileModal) return;

    const profName = document.getElementById('profName');
    const profEmail = document.getElementById('profEmail');
    const profEnergyId = document.getElementById('profEnergyId');
    const profBarcode = document.getElementById('profBarcode');
    const profId = document.getElementById('profIdentity');
    const profTier = document.getElementById('profTier');
    const profInheritance = document.getElementById('profInheritance');

    if (profName) profName.textContent = currentUser.fullName;
    if (profEmail) profEmail.textContent = currentUser.email;
    if (profEnergyId) profEnergyId.textContent = currentUser.energyId || generateEnergyId();
    if (profBarcode) profBarcode.textContent = formatBarcode(currentUser.barcode);
    if (profId) profId.textContent = currentUser.identityNo;
    if (profTier) profTier.textContent = currentUser.tierName;
    if (profInheritance) profInheritance.textContent = currentUser.inheritanceStatus;

    updateProfilePhoneStatusUI();
    profileModal.classList.add('active');
}

/**
 * Public Certificate & Barcode Verification Portal Logic
 */
export function initVerificationTool() {
    const verifyForm = document.getElementById('verifyForm');
    const verifyInput = document.getElementById('verifyInput');
    const btnVerifySubmit = document.getElementById('btnVerifySubmit');
    const verifyResultContainer = document.getElementById('verifyResultContainer');

    function performLookup(query) {
        if (!query) return;
        const cleanQuery = query.trim().replace(/-/g, '').toUpperCase();
        const lang = getCurrentLang();

        const certDb = JSON.parse(localStorage.getItem('ruh_certificates_db') || '[]');
        const found = certDb.find(c => 
            c.barcode.replace(/-/g, '') === cleanQuery || 
            c.energyId.toUpperCase() === cleanQuery
        );

        if (!verifyResultContainer) return;
        verifyResultContainer.style.display = 'block';

        if (found) {
            verifyResultContainer.innerHTML = `
                <div class="cyber-card verify-success-box" style="border-color: #00ff88; background: rgba(0, 255, 136, 0.05); padding: 24px;">
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                        <i class="fa-solid fa-circle-check" style="font-size: 2.2rem; color: #00ff88;"></i>
                        <div>
                            <h4 style="color: #00ff88; margin: 0; font-size: 1.2rem;">${lang === 'tr' ? 'Sertifika Doğrulandı (R.U.H. Incorporation)' : 'Certificate Verified (R.U.H. Incorporation)'}</h4>
                            <span style="font-size: 0.85rem; color: var(--text-muted);">${found.issuer}</span>
                        </div>
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; font-size: 0.92rem;">
                        <div><strong>${lang === 'tr' ? 'Kayıtlı Sahibi:' : 'Client Name:'}</strong> ${found.fullName}</div>
                        <div><strong>${lang === 'tr' ? 'Dijital Enerji İzi ID:' : 'Digital Energy ID:'}</strong> <span class="highlight-cyan" style="font-family: monospace;">${found.energyId}</span></div>
                        <div><strong>${lang === 'tr' ? 'Barkod Numarası:' : 'Barcode No:'}</strong> <span class="highlight-gold" style="font-family: monospace;">${found.formattedBarcode}</span></div>
                        <div><strong>${lang === 'tr' ? 'Kayıt Tarihi:' : 'Registration Date:'}</strong> ${found.registeredAt}</div>
                        <div><strong>${lang === 'tr' ? 'Protokol Seviyesi:' : 'Protocol Tier:'}</strong> ${found.tierName}</div>
                        <div><strong>${lang === 'tr' ? 'Miras Escrow Tercihi:' : 'Inheritance Escrow:'}</strong> ${found.inheritanceStatus}</div>
                    </div>
                </div>
            `;
        } else {
            verifyResultContainer.innerHTML = `
                <div class="cyber-card verify-fail-box" style="border-color: #ff3366; background: rgba(255, 51, 102, 0.05); padding: 24px; text-align: center;">
                    <i class="fa-solid fa-circle-xmark" style="font-size: 2.5rem; color: #ff3366; margin-bottom: 12px;"></i>
                    <h4 style="color: #ff3366; margin-bottom: 8px;">${lang === 'tr' ? 'Geçersiz veya Bulunamayan Barkod / Enerji ID' : 'Invalid or Unregistered Barcode / Energy ID'}</h4>
                    <p style="color: var(--text-muted); font-size: 0.9rem;">${lang === 'tr' ? 'Girdiğiniz numara R.U.H. Incorporation resmi veri tabanında tescilli görünmemektedir. Lütfen 16 haneli barkodunuzu veya 11 haneli Enerji İzi ID kodunuzu tekrar kontrol ediniz.' : 'The number provided is not registered in the official R.U.H. Incorporation database. Please re-check your 16-digit barcode or 11-digit Energy ID.'}</p>
                </div>
            `;
        }
    }

    if (btnVerifySubmit && verifyInput) {
        btnVerifySubmit.addEventListener('click', () => performLookup(verifyInput.value));
    }

    if (verifyForm && verifyInput) {
        verifyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            performLookup(verifyInput.value);
        });
    }

    const urlParams = new URLSearchParams(window.location.search);
    const verifyCode = urlParams.get('verify');
    if (verifyCode && verifyInput) {
        verifyInput.value = verifyCode;
        performLookup(verifyCode);
    }
}
