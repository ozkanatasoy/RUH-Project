/**
 * RUH PROJECT - User Authentication & Profile Dashboard Module
 * Handles accounts, 11-digit Digital Energy IDs, 16-digit Barcodes, profile dashboard, and public certificate verification.
 */

import { getCurrentLang, getTranslation } from './i18n.js';

let currentUser = null;

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
    const closeLoginModalBtn = document.getElementById('closeLoginModalBtn');
    const closeProfileModalBtn = document.getElementById('closeProfileModalBtn');
    const submitLoginBtn = document.getElementById('submitLoginBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    if (navUserBtn) {
        navUserBtn.addEventListener('click', () => {
            if (currentUser) {
                openProfileModal();
            } else {
                if (loginModal) loginModal.classList.add('active');
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

    if (submitLoginBtn) {
        submitLoginBtn.addEventListener('click', handleLogin);
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
}

export function registerUserAccount(accountData) {
    const existingAccounts = JSON.parse(localStorage.getItem('ruh_accounts') || '[]');
    
    // Ensure primary applicant has 11-digit Energy ID and 16-digit Barcode
    if (!accountData.energyId) accountData.energyId = generateEnergyId();
    if (!accountData.barcode) accountData.barcode = generateBarcode16();

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
            issuer: "R.U.H. INCORPORATION PROTOCOL VAULT",
            status: "OFFICIALLY VERIFIED & APPROVED"
        };

        if (foundIdx >= 0) certDb[foundIdx] = certRecord;
        else certDb.push(certRecord);
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
        updateNavAuthButton();
        const loginModal = document.getElementById('loginModal');
        if (loginModal) loginModal.classList.remove('active');
        alert(lang === 'tr' ? `Hoş geldiniz, ${user.fullName}!` : `Welcome back, ${user.fullName}!`);
        openProfileModal();
    } else {
        alert(lang === 'tr' ? 'Hatalı e-posta veya şifre! Lütfen ön kayıt formunu tamamlayarak hesap oluşturunuz.' : 'Invalid email or password! Please complete pre-registration to create an account.');
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

    const lang = getCurrentLang();

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
                    <div class="grid grid-2" style="gap: 12px; font-size: 0.92rem; text-align: left;">
                        <div><strong>${lang === 'tr' ? 'Adı Soyadı:' : 'Full Name:'}</strong> ${found.fullName}</div>
                        <div><strong>${lang === 'tr' ? 'Dijital Enerji İzi ID (11 Hane):' : 'Digital Energy ID (11 Chars):'}</strong> <span class="highlight-cyan">${found.energyId}</span></div>
                        <div><strong>${lang === 'tr' ? 'Barkod No (16 Hane):' : 'Barcode No (16 Digits):'}</strong> <span class="highlight-gold">${found.formattedBarcode}</span></div>
                        <div><strong>${lang === 'tr' ? 'Kayıt Tarihi ve Saati:' : 'Registration Date & Time:'}</strong> ${found.registeredAt}</div>
                        <div><strong>${lang === 'tr' ? 'Protokol Seviyesi:' : 'Protocol Tier:'}</strong> ${found.tierName}</div>
                        <div><strong>${lang === 'tr' ? 'Miras Devir Durumu:' : 'Inheritance Status:'}</strong> ${found.inheritanceStatus}</div>
                    </div>
                </div>
            `;
        } else {
            verifyResultContainer.innerHTML = `
                <div class="cyber-card verify-error-box" style="border-color: #ff5555; background: rgba(255, 85, 85, 0.05); padding: 20px; text-align: center;">
                    <i class="fa-solid fa-triangle-exclamation" style="font-size: 2rem; color: #ff5555; margin-bottom: 10px; display: block;"></i>
                    <h4 style="color: #ff5555; margin-bottom: 6px;">${lang === 'tr' ? 'Sertifika Bulunamadı' : 'Certificate Not Found'}</h4>
                    <p style="font-size: 0.9rem; color: var(--text-muted); margin: 0;">
                        ${lang === 'tr' ? 'Girdiğiniz barkod veya Enerji İzi ID sistem veritabanında bulunamadı. Lütfen 16 haneli barkod numaranızı kontrol ediniz.' : 'The barcode or Energy ID entered was not found in the database. Please verify your 16-digit barcode.'}
                    </p>
                </div>
            `;
        }
    }

    if (btnVerifySubmit) {
        btnVerifySubmit.addEventListener('click', () => {
            if (verifyInput) performLookup(verifyInput.value);
        });
    }

    // Auto-verify if URL has ?verify=BARCODE or #verify
    const urlParams = new URLSearchParams(window.location.search);
    const verifyParam = urlParams.get('verify');
    if (verifyParam) {
        if (verifyInput) verifyInput.value = verifyParam;
        setTimeout(() => {
            const verifySec = document.getElementById('verify');
            if (verifySec) verifySec.scrollIntoView({ behavior: 'smooth' });
            performLookup(verifyParam);
        }, 500);
    }
}
