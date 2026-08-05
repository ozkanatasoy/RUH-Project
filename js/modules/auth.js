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

export const ADMIN_ACCOUNT = {
    email: 'admin@ruhproject.com',
    password: 'admin123',
    fullName: 'Özkan Atasoy (Sistem Yöneticisi)',
    identityNo: '99999999999',
    energyId: 'RUH-ADMIN-01',
    barcode: '8942999999999999',
    tierName: 'Sistem Yöneticisi (Admin)',
    inheritanceStatus: 'Tam Sistem Yetkisi',
    phone: '+90 500 000 0000',
    phoneVerified: true,
    role: 'ADMIN',
    registeredAt: '05.08.2026 00:00'
};

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
    // Automatic cleanup of old test logs on init (as requested by user)
    const hasCleanedOldLogs = localStorage.getItem('ruh_v2_logs_cleaned');
    if (!hasCleanedOldLogs) {
        localStorage.removeItem('ruh_accounts');
        localStorage.removeItem('ruh_certificates_db');
        localStorage.setItem('ruh_v2_logs_cleaned', 'true');
    }

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
    const adminModal = document.getElementById('adminModal');

    const closeLoginModalBtn = document.getElementById('closeLoginModalBtn');
    const closeProfileModalBtn = document.getElementById('closeProfileModalBtn');
    const closeForgotModalBtn = document.getElementById('closeForgotModalBtn');
    const closeAdminModalBtn = document.getElementById('closeAdminModalBtn');
    const closeAdminModalFooterBtn = document.getElementById('closeAdminModalFooterBtn');

    const submitLoginBtn = document.getElementById('submitLoginBtn');
    const submitForgotBtn = document.getElementById('submitForgotBtn');
    const forgotPassLink = document.getElementById('forgotPassLink');
    const logoutBtn = document.getElementById('logoutBtn');

    const btnSendSmsCode = document.getElementById('btnSendSmsCode');
    const btnVerifySmsCode = document.getElementById('btnVerifySmsCode');

    const adminSearchInput = document.getElementById('adminSearchInput');
    const btnAdminResetAll = document.getElementById('btnAdminResetAll');
    const btnAdminExportCsv = document.getElementById('btnAdminExportCsv');
    const adminLogoutBtn = document.getElementById('adminLogoutBtn');

    if (navUserBtn) {
        navUserBtn.addEventListener('click', () => {
            if (currentUser) {
                if (currentUser.role === 'ADMIN') {
                    openAdminModal();
                } else {
                    openProfileModal();
                }
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
        closeLoginModalBtn.addEventListener('click', () => loginModal.classList.remove('active'));
    }
    if (closeProfileModalBtn && profileModal) {
        closeProfileModalBtn.addEventListener('click', () => profileModal.classList.remove('active'));
    }
    if (closeForgotModalBtn && forgotModal) {
        closeForgotModalBtn.addEventListener('click', () => forgotModal.classList.remove('active'));
    }
    if (closeAdminModalBtn && adminModal) {
        closeAdminModalBtn.addEventListener('click', () => adminModal.classList.remove('active'));
    }
    if (closeAdminModalFooterBtn && adminModal) {
        closeAdminModalFooterBtn.addEventListener('click', () => adminModal.classList.remove('active'));
    }

    if (forgotPassLink && loginModal && forgotModal) {
        forgotPassLink.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.classList.remove('active');
            forgotModal.classList.add('active');
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleLogin();
        });
    }

    if (submitLoginBtn) {
        submitLoginBtn.addEventListener('click', (e) => {
            if (loginForm && loginForm.requestSubmit) {
                // Allows browser to process native form submission & trigger password manager prompt
                loginForm.requestSubmit();
            } else {
                handleLogin();
            }
        });
    }
    if (submitForgotBtn) submitForgotBtn.addEventListener('click', handleForgotPassword);
    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);

    if (btnSendSmsCode) btnSendSmsCode.addEventListener('click', handleSendSmsCode);
    if (btnVerifySmsCode) btnVerifySmsCode.addEventListener('click', handleVerifySmsCode);

    if (adminSearchInput) {
        adminSearchInput.addEventListener('input', (e) => renderAdminDashboardData(e.target.value));
    }
    if (btnAdminResetAll) {
        btnAdminResetAll.addEventListener('click', resetAllTestLogs);
    }
    if (btnAdminExportCsv) {
        btnAdminExportCsv.addEventListener('click', exportUsersToCsv);
    }
    if (adminLogoutBtn) {
        adminLogoutBtn.addEventListener('click', () => {
            if (adminModal) adminModal.classList.remove('active');
            handleLogout();
        });
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

    // Admin Login Verification
    if (email.toLowerCase() === 'admin@ruhproject.com' && pass === 'admin123') {
        currentUser = ADMIN_ACCOUNT;
        localStorage.setItem('ruh_current_user', JSON.stringify(currentUser));
        if (chkRemember && chkRemember.checked) {
            localStorage.setItem('ruh_remembered_email', email);
        } else {
            localStorage.removeItem('ruh_remembered_email');
        }
        updateNavAuthButton();
        const loginModal = document.getElementById('loginModal');
        if (loginModal) loginModal.classList.remove('active');
        showCustomAlert(
            lang === 'tr' ? 'Yönetici Girişi Başarılı! Hoş geldiniz, Admin.' : 'Admin Login Successful! Welcome Admin.',
            null,
            'success',
            () => openAdminModal(),
            lang === 'tr' ? 'Yönetici Girişi Başarılı' : 'Admin Login Successful',
            lang === 'tr' ? 'Admin Paneline Git' : 'Go to Admin Panel'
        );
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
        showCustomAlert(
            lang === 'tr' ? `Hoş geldiniz, ${user.fullName}!` : `Welcome back, ${user.fullName}!`,
            null,
            'success',
            () => openProfileModal(),
            lang === 'tr' ? 'Giriş Başarılı' : 'Login Successful',
            lang === 'tr' ? 'Profili Aç' : 'Open Profile'
        );
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
    showCustomAlert(
        lang === 'tr' ? 'Oturumunuz başarıyla kapatılmıştır.' : 'Logged out successfully.',
        null,
        'success',
        null,
        lang === 'tr' ? 'Oturum Kapatıldı' : 'Logged Out'
    );
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
        if (currentUser.role === 'ADMIN') {
            if (userLabelSpan) userLabelSpan.innerHTML = lang === 'tr' ? '<i class="fa-solid fa-user-shield highlight-gold"></i> Admin Paneli' : '<i class="fa-solid fa-user-shield highlight-gold"></i> Admin Panel';
            navUserBtn.classList.add('logged-in');
        } else {
            if (userLabelSpan) userLabelSpan.textContent = lang === 'tr' ? 'Profilim' : 'My Profile';
            navUserBtn.classList.add('logged-in');
        }
    } else {
        if (userLabelSpan) userLabelSpan.textContent = lang === 'tr' ? 'Giriş Yap' : 'Login';
        navUserBtn.classList.remove('logged-in');
    }
}

export function openAdminModal() {
    const adminModal = document.getElementById('adminModal');
    if (!adminModal) return;

    renderAdminDashboardData();
    adminModal.classList.add('active');
}

export function renderAdminDashboardData(filterQuery = '') {
    const existingAccounts = JSON.parse(localStorage.getItem('ruh_accounts') || '[]');
    const certDb = JSON.parse(localStorage.getItem('ruh_certificates_db') || '[]');
    const donations = JSON.parse(localStorage.getItem('ruh_donations_list') || '[]');

    const totalUsersEl = document.getElementById('adminTotalUsers');
    const totalCertsEl = document.getElementById('adminTotalCerts');
    const verifiedPhoneEl = document.getElementById('adminVerifiedPhone');
    const totalDonationsEl = document.getElementById('adminTotalDonations');

    if (totalUsersEl) totalUsersEl.textContent = existingAccounts.length;
    if (totalCertsEl) totalCertsEl.textContent = certDb.length;
    if (verifiedPhoneEl) {
        const verifiedCount = existingAccounts.filter(acc => acc.phoneVerified).length;
        verifiedPhoneEl.textContent = verifiedCount;
    }
    if (totalDonationsEl) {
        const totalSum = donations.reduce((sum, d) => sum + (d.amount || 0), 0);
        totalDonationsEl.textContent = `$${totalSum.toLocaleString()}`;
    }

    const query = filterQuery.trim().toLowerCase();
    const filteredAccounts = existingAccounts.filter(acc => {
        if (!query) return true;
        return (
            (acc.fullName && acc.fullName.toLowerCase().includes(query)) ||
            (acc.email && acc.email.toLowerCase().includes(query)) ||
            (acc.identityNo && acc.identityNo.includes(query)) ||
            (acc.energyId && acc.energyId.toLowerCase().includes(query)) ||
            (acc.barcode && acc.barcode.includes(query)) ||
            (acc.phone && acc.phone.includes(query))
        );
    });

    const tbody = document.getElementById('adminUsersTableBody');
    if (!tbody) return;

    if (filteredAccounts.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="10" style="text-align: center; padding: 36px 16px; color: var(--text-muted);">
                    <i class="fa-solid fa-inbox" style="font-size: 2.2rem; color: var(--text-dim); margin-bottom: 10px; display: block;"></i>
                    ${query ? 'Arama kriterlerinize uygun kayıt bulunamadı.' : 'Henüz hiç kayıtlı kullanıcı bulunmamaktadır (Tüm test kayıtları sıfırlanmıştır).'}
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = filteredAccounts.map((acc, idx) => {
        const phoneBadge = acc.phoneVerified 
            ? `<span style="font-size: 0.72rem; color: #00ff88; border: 1px solid #00ff88; padding: 2px 6px; border-radius: 4px; margin-left: 4px;">✓ ONALANMIŞ</span>` 
            : `<span style="font-size: 0.72rem; color: #ff6b6b; border: 1px solid rgba(255, 80, 80, 0.4); padding: 2px 6px; border-radius: 4px; margin-left: 4px;">ONAYSIZ</span>`;

        return `
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05); transition: background 0.2s;" onmouseover="this.style.background='rgba(0,242,254,0.05)'" onmouseout="this.style.background='transparent'">
                <td style="padding: 12px 14px; font-weight: 700; color: var(--color-primary);">${idx + 1}</td>
                <td style="padding: 12px 14px; font-weight: 600; color: #fff;">${acc.fullName || '-'}</td>
                <td style="padding: 12px 14px; color: var(--text-muted);">${acc.email || '-'}</td>
                <td style="padding: 12px 14px; font-size: 0.82rem;">${acc.phone || '-'}${phoneBadge}</td>
                <td style="padding: 12px 14px; font-family: monospace;">${acc.identityNo || '-'}</td>
                <td style="padding: 12px 14px; font-family: monospace; color: var(--color-primary);">${acc.energyId || '-'}</td>
                <td style="padding: 12px 14px; font-family: monospace; color: var(--color-gold);">${formatBarcode(acc.barcode)}</td>
                <td style="padding: 12px 14px; font-size: 0.82rem;">${acc.inheritanceStatus || '-'}</td>
                <td style="padding: 12px 14px; font-size: 0.82rem; color: var(--text-muted);">${acc.registeredAt || '-'}</td>
                <td style="padding: 12px 14px; text-align: center;">
                    <div style="display: flex; gap: 6px; justify-content: center;">
                        <button type="button" class="btn btn-outline btn-xs admin-view-cert-btn" data-email="${acc.email}" title="Sertifikayı Gör">
                            <i class="fa-solid fa-certificate" style="color: var(--color-gold);"></i>
                        </button>
                        <button type="button" class="btn btn-outline btn-xs admin-delete-user-btn" data-email="${acc.email}" style="border-color: rgba(255,80,80,0.5); color: #ff6b6b;" title="Kullanıcıyı Sil">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');

    const deleteBtns = tbody.querySelectorAll('.admin-delete-user-btn');
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const email = btn.getAttribute('data-email');
            deleteSingleUserAccount(email);
        });
    });

    const viewCertBtns = tbody.querySelectorAll('.admin-view-cert-btn');
    viewCertBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const email = btn.getAttribute('data-email');
            const targetAcc = existingAccounts.find(a => a.email.toLowerCase() === email.toLowerCase());
            if (targetAcc) {
                const foundCert = certDb.find(c => c.email && c.email.toLowerCase() === email.toLowerCase());
                if (foundCert) {
                    const certModal = document.getElementById('certificateModal');
                    if (certModal) {
                        const holderName = document.getElementById('certHolderName');
                        const energyIdVal = document.getElementById('certEnergyIdVal');
                        const identityVal = document.getElementById('certIdentityVal');
                        const barcodeVal = document.getElementById('certBarcodeVal');
                        const dateVal = document.getElementById('certDateVal');

                        if (holderName) holderName.textContent = foundCert.fullName;
                        if (energyIdVal) energyIdVal.textContent = foundCert.energyId;
                        if (identityVal) identityVal.textContent = foundCert.identityNo;
                        if (barcodeVal) barcodeVal.textContent = foundCert.formattedBarcode;
                        if (dateVal) dateVal.textContent = foundCert.registeredAt;

                        certModal.classList.add('active');
                    }
                }
            }
        });
    });
}

export function deleteSingleUserAccount(email) {
    if (!email) return;
    const lang = getCurrentLang();
    if (!confirm(lang === 'tr' ? `${email} e-posta adresine sahip kaydı silmek istediğinize emin misiniz?` : `Are you sure you want to delete ${email}?`)) return;

    let existingAccounts = JSON.parse(localStorage.getItem('ruh_accounts') || '[]');
    let certDb = JSON.parse(localStorage.getItem('ruh_certificates_db') || '[]');

    existingAccounts = existingAccounts.filter(a => a.email.toLowerCase() !== email.toLowerCase());
    certDb = certDb.filter(c => c.email && c.email.toLowerCase() !== email.toLowerCase());

    localStorage.setItem('ruh_accounts', JSON.stringify(existingAccounts));
    localStorage.setItem('ruh_certificates_db', JSON.stringify(certDb));

    renderAdminDashboardData();
    showCustomAlert(lang === 'tr' ? `${email} kaydı sistemden silindi.` : `Deleted ${email} from system.`, null, 'success');
}

export function resetAllTestLogs() {
    const lang = getCurrentLang();
    const confirmMsg = lang === 'tr' 
        ? 'TÜM TEST KAYITLARINI SIFIRLAMAK İSTEDİĞİNİZE EMİN MİSİNİZ?\n\nBu işlem sistemdeki tüm kullanıcı başvurularını ve tescilli sertifikaları tamamen temizleyecektir.'
        : 'ARE YOU SURE YOU WANT TO RESET ALL TEST LOGS?\n\nThis will clear all user applications and certificates.';
        
    if (!confirm(confirmMsg)) return;

    localStorage.removeItem('ruh_accounts');
    localStorage.removeItem('ruh_certificates_db');

    if (currentUser && currentUser.role !== 'ADMIN') {
        currentUser = null;
        localStorage.removeItem('ruh_current_user');
        updateNavAuthButton();
    }

    renderAdminDashboardData();
    showCustomAlert(
        lang === 'tr' ? 'Tüm test kayıtları ve sertifika verileri başarıyla sıfırlandı!' : 'All test logs and certificate databases reset successfully!',
        null,
        'success'
    );
}

export function exportUsersToCsv() {
    const existingAccounts = JSON.parse(localStorage.getItem('ruh_accounts') || '[]');
    const lang = getCurrentLang();
    if (existingAccounts.length === 0) {
        showCustomAlert(lang === 'tr' ? 'Dışa aktarılacak kayıtlı kullanıcı bulunmamaktadır.' : 'No registered users to export.', null, 'error');
        return;
    }

    const headers = ['Sira', 'Ad Soyad', 'E-posta', 'Telefon', 'Telefon Onay', 'TC Kimlik No', 'Dijital Enerji ID', 'Barkod No', 'Protokol Seviyesi', 'Miras Escrow Tercihi', 'Kayit Tarihi'];
    
    const rows = existingAccounts.map((acc, i) => [
        i + 1,
        `"${(acc.fullName || '').replace(/"/g, '""')}"`,
        `"${(acc.email || '').replace(/"/g, '""')}"`,
        `"${(acc.phone || '').replace(/"/g, '""')}"`,
        acc.phoneVerified ? 'Evet' : 'Hayir',
        `"${(acc.identityNo || '').replace(/"/g, '""')}"`,
        `"${(acc.energyId || '').replace(/"/g, '""')}"`,
        `"${formatBarcode(acc.barcode)}"`,
        `"${(acc.tierName || '').replace(/"/g, '""')}"`,
        `"${(acc.inheritanceStatus || '').replace(/"/g, '""')}"`,
        `"${(acc.registeredAt || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `RUH_Project_Kayitli_Kullanicilar_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
