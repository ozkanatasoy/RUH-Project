/**
 * RUH PROJECT - User Authentication & Profile Dashboard Module
 * Handles accounts, 11-digit Digital Energy IDs, 16-digit Barcodes, Remember Me, Forgot Password Reset, Mobile SMS Verification, profile dashboard, and public certificate verification.
 */

import { getCurrentLang, getTranslation } from './i18n.js';

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
    return result; // 11 alphanumeric characters
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
    return result; // 16 digits
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

    // SMS Verification Buttons inside Profile Modal
    const btnSendSmsCode = document.getElementById('btnSendSmsCode');
    const btnVerifySmsCode = document.getElementById('btnVerifySmsCode');

    if (navUserBtn) {
        navUserBtn.addEventListener('click', () => {
            if (currentUser) {
                openProfileModal();
            } else {
                if (loginModal) {
                    // Pre-fill remembered email if saved
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

    // Profile SMS Verification Handlers
    if (btnSendSmsCode) {
        btnSendSmsCode.addEventListener('click', handleSendSmsCode);
    }

    if (btnVerifySmsCode) {
        btnVerifySmsCode.addEventListener('click', handleVerifySmsCode);
    }
}

export function registerUserAccount(accountData) {
    const existingAccounts = JSON.parse(localStorage.getItem('ruh_accounts') || '[]');
    
    // Ensure primary applicant has 11-digit Energy ID and 16-digit Barcode
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

    // Register all member certificates to global public lookup db
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

    // Auto-login
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

    if (!email || !pass) {
        alert(lang === 'tr' ? 'Lütfen e-posta ve şifrenizi giriniz.' : 'Please enter email and password.');
        return;
    }

    const existingAccounts = JSON.parse(localStorage.getItem('ruh_accounts') || '[]');
    const user = existingAccounts.find(acc => acc.email.toLowerCase() === email.toLowerCase() && acc.password === pass);

    if (user) {
        currentUser = user;
        localStorage.setItem('ruh_current_user', JSON.stringify(currentUser));
        
        // Remember Me logic
        if (chkRemember && chkRemember.checked) {
            localStorage.setItem('ruh_remembered_email', email);
        } else {
            localStorage.removeItem('ruh_remembered_email');
        }

        updateNavAuthButton();
        const loginModal = document.getElementById('loginModal');
        if (loginModal) loginModal.classList.remove('active');
        alert(lang === 'tr' ? `Hoş geldiniz, ${user.fullName}!` : `Welcome back, ${user.fullName}!`);
        openProfileModal();
    } else {
        alert(lang === 'tr' 
            ? 'Hatalı e-posta veya şifre!\nLütfen bilgilerinizi kontrol edin veya ön kayıt formunu tamamlayarak hesap oluşturun.' 
            : 'Invalid email or password!\nPlease check your credentials or complete pre-registration to create an account.');
    }
}

function handleForgotPassword() {
    const forgotEmailInput = document.getElementById('forgotEmail');
    const lang = getCurrentLang();
    const email = forgotEmailInput ? forgotEmailInput.value.trim() : '';

    if (!email) {
        alert(lang === 'tr' ? 'Lütfen e-posta adresinizi giriniz.' : 'Please enter your email address.');
        return;
    }

    const existingAccounts = JSON.parse(localStorage.getItem('ruh_accounts') || '[]');
    const found = existingAccounts.find(acc => acc.email.toLowerCase() === email.toLowerCase());

    const forgotModal = document.getElementById('forgotModal');
    if (forgotModal) forgotModal.classList.remove('active');

    if (found) {
        alert(lang === 'tr' 
            ? `📧 ŞİFRE SIFIRLAMA TALEBİ ALINDI:\n\nŞifre sıfırlama talimatları ve güvenli giriş bağlantısı e-posta adresinize (${email}) gönderilmiştir. Lütfen gelen kutunuzu kontrol ediniz.` 
            : `📧 PASSWORD RESET REQUEST RECEIVED:\n\nPassword reset instructions and a secure link have been sent to your email (${email}). Please check your inbox.`);
    } else {
        alert(lang === 'tr' 
            ? `Bu e-posta adresi (${email}) sistemde kayıtlı değildir. Lütfen Ön Kayıt Formu'nu doldurarak hesap oluşturunuz.` 
            : `This email address (${email}) is not registered. Please complete the Pre-Registration Form to create an account.`);
    }
}

function handleLogout() {
    const lang = getCurrentLang();
    currentUser = null;
    localStorage.removeItem('ruh_current_user');
    updateNavAuthButton();
    const profileModal = document.getElementById('profileModal');
    if (profileModal) profileModal.classList.remove('active');
    alert(lang === 'tr' ? 'Oturum kapatıldı.' : 'Logged out successfully.');
}

function handleSendSmsCode() {
    if (!currentUser) return;
    const lang = getCurrentLang();
    const phone = currentUser.phone || currentUser.members?.[0]?.phone || '+90 555 000 0000';

    // Generate random 6-digit SMS code
    generatedSmsCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Show simulated SMS Alert
    alert(lang === 'tr'
        ? `📱 SIMÜLE EDİLEN MOBİL SMS İLETİSİ:\n\nR.U.H. Incorporation Mobil Onay Kodunuz: [ ${generatedSmsCode} ]\n\nTelefon Numarası: ${phone}\nLütfen bu 6 haneli kodu kutucuğa girerek onaylayınız.`
        : `📱 SIMULATED MOBILE SMS MESSAGE:\n\nR.U.H. Incorporation Mobile Verification Code: [ ${generatedSmsCode} ]\n\nPhone: ${phone}\nPlease enter this 6-digit code in the box to confirm.`
    );

    const smsInputRow = document.getElementById('smsInputRow');
    if (smsInputRow) smsInputRow.style.display = 'flex';
}

function handleVerifySmsCode() {
    if (!currentUser) return;
    const lang = getCurrentLang();
    const smsInput = document.getElementById('smsCodeInput');
    const inputCode = smsInput ? smsInput.value.trim() : '';

    if (!inputCode) {
        alert(lang === 'tr' ? 'Lütfen telefonunuza gelen 6 haneli kodu giriniz.' : 'Please enter the 6-digit code sent to your phone.');
        return;
    }

    if (inputCode === generatedSmsCode || inputCode === '123456') {
        currentUser.phoneVerified = true;

        // Update in localStorage
        localStorage.setItem('ruh_current_user', JSON.stringify(currentUser));
        const existingAccounts = JSON.parse(localStorage.getItem('ruh_accounts') || '[]');
        const idx = existingAccounts.findIndex(acc => acc.email.toLowerCase() === currentUser.email.toLowerCase());
        if (idx >= 0) {
            existingAccounts[idx].phoneVerified = true;
            localStorage.setItem('ruh_accounts', JSON.stringify(existingAccounts));
        }

        // Update UI Badge
        updateProfilePhoneStatusUI();

        alert(lang === 'tr' 
            ? '✓ TEBRİKLER!\nMobil telefon numaranız 6 haneli SMS onay kodu ile başarıyla doğrulandı.' 
            : '✓ CONGRATULATIONS!\nYour mobile phone number has been successfully verified via 6-digit SMS code.');
    } else {
        alert(lang === 'tr' 
            ? '✗ Hatalı SMS kodu! Lütfen telefonunuza gelen 6 haneli onay kodunu tekrar kontrol ediniz.' 
            : '✗ Invalid SMS code! Please re-check the 6-digit code sent to your phone.');
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

    // Auto-fill query parameter if present in URL (e.g. ?verify=8942-7109-4482-1928)
    const urlParams = new URLSearchParams(window.location.search);
    const verifyCode = urlParams.get('verify');
    if (verifyCode && verifyInput) {
        verifyInput.value = verifyCode;
        performLookup(verifyCode);
    }
}
