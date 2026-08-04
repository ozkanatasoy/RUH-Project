/**
 * RUH PROJECT - Transparent Donation & Donor Leaderboard Module
 * Features:
 * - Live R&D Donation Pool & Progress Bar Calculation (Starts at $0 USD / $70,000,000 USD Target)
 * - Name Masking & Encryption (e.g. Ahmet Yıldız -> A**** Y****)
 * - Sorted Descending Donor Leaderboard (Highest donor gets top rank & VIP Priority)
 * - Interactive Donation Modal & Live State Update
 */

import { getCurrentLang, getTranslation } from './i18n.js';

let targetGoal = 70000000; // $70,000,000 USD Target Goal
let currentDonors = [];    // Reset to empty ($0 USD raised)

/**
 * Masks a full name for privacy & security.
 * e.g., "Ahmet Yıldız" -> "A**** Y****"
 */
export function maskName(fullName) {
    if (!fullName || typeof fullName !== 'string') return 'A**** K****';
    const parts = fullName.trim().split(/\s+/);
    return parts.map(part => {
        if (part.length <= 1) return part + '****';
        return part.charAt(0).toUpperCase() + '****';
    }).join(' ');
}

export function initDonations() {
    renderLeaderboard();
    updateDonationProgress();

    const openDonationModalBtn = document.getElementById('openDonationModalBtn');
    const donationModal = document.getElementById('donationModal');
    const closeDonationModalBtn = document.getElementById('closeDonationModalBtn');
    const submitDonationBtn = document.getElementById('submitDonationBtn');

    if (openDonationModalBtn && donationModal) {
        openDonationModalBtn.addEventListener('click', () => {
            donationModal.classList.add('active');
        });
    }

    if (closeDonationModalBtn && donationModal) {
        closeDonationModalBtn.addEventListener('click', () => {
            donationModal.classList.remove('active');
        });
    }

    // Donation Preset Amount Buttons
    const amountBtns = document.querySelectorAll('.donate-amount-btn');
    const customAmountInput = document.getElementById('customDonateAmount');

    amountBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            amountBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const val = btn.getAttribute('data-amount');
            if (customAmountInput) customAmountInput.value = val;
        });
    });

    if (submitDonationBtn) {
        submitDonationBtn.addEventListener('click', () => {
            const donorNameInput = document.getElementById('donorFullName');
            const amountInput = document.getElementById('customDonateAmount');
            
            const rawName = donorNameInput ? donorNameInput.value.trim() : '';
            const amount = amountInput ? parseInt(amountInput.value, 10) : 0;

            if (!rawName) {
                const lang = getCurrentLang();
                alert(lang === 'tr' ? 'Lütfen adınızı ve soyadınızı giriniz.' : 'Please enter your full name.');
                return;
            }

            if (isNaN(amount) || amount <= 0) {
                const lang = getCurrentLang();
                alert(lang === 'tr' ? 'Lütfen geçerli bir bağış miktarı giriniz.' : 'Please enter a valid donation amount.');
                return;
            }

            // Determine Priority Tier based on amount
            let tier = 'Standard';
            if (amount >= 25000) tier = 'VIP';
            else if (amount >= 10000) tier = 'Priority';

            // Add new donation entry
            currentDonors.push({
                name: rawName,
                amount: amount,
                date: new Date().toISOString().split('T')[0],
                tier: tier
            });

            // Re-sort donors descending by amount
            currentDonors.sort((a, b) => b.amount - a.amount);

            // Re-render components
            renderLeaderboard();
            updateDonationProgress();

            if (donationModal) donationModal.classList.remove('active');

            const lang = getCurrentLang();
            const masked = maskName(rawName);
            alert(lang === 'tr' 
                ? `Teşekkürler! ${amount.toLocaleString()} USD tutarındaki bağışınız kaydedildi. İdentity kodunuz (${masked}) sıralama tablosuna öncelikli olarak eklendi.`
                : `Thank you! Your donation of $${amount.toLocaleString()} USD has been recorded. Your identity (${masked}) is now placed on the priority leaderboard.`
            );

            // Reset inputs
            if (donorNameInput) donorNameInput.value = '';
        });
    }
}

export function renderLeaderboard() {
    const tbody = document.getElementById('donorLeaderboardBody');
    if (!tbody) return;

    const lang = getCurrentLang();

    if (currentDonors.length === 0) {
        const emptyMsg = lang === 'tr' 
            ? 'Henüz bağış kaydı bulunmamaktadır. Formu doldurduktan sonra bağış yaparak 1. sırada yerinizi alabilirsiniz.'
            : 'No donations recorded yet. Complete the form and donate to claim 1st rank priority placement!';
        tbody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center; color: var(--text-muted); padding: 36px 16px;">
                    <i class="fa-solid fa-hand-holding-dollar" style="font-size: 2rem; margin-bottom: 12px; display: block; color: var(--gold-accent);"></i>
                    <span>${emptyMsg}</span>
                </td>
            </tr>
        `;
        return;
    }

    // Sort descending by amount
    currentDonors.sort((a, b) => b.amount - a.amount);

    tbody.innerHTML = currentDonors.map((donor, index) => {
        const masked = maskName(donor.name);
        const rank = index + 1;
        let rankBadgeClass = 'rank-default';
        if (rank === 1) rankBadgeClass = 'rank-gold';
        else if (rank === 2) rankBadgeClass = 'rank-silver';
        else if (rank === 3) rankBadgeClass = 'rank-bronze';

        let priorityLabel = lang === 'tr' ? '1. Derece VIP Öncelik' : '1st Class VIP Priority';
        let badgeClass = 'badge-vip';
        if (donor.amount < 25000 && donor.amount >= 10000) {
            priorityLabel = lang === 'tr' ? '2. Derece Öncelik' : '2nd Tier Priority';
            badgeClass = 'badge-priority';
        } else if (donor.amount < 10000) {
            priorityLabel = lang === 'tr' ? 'Ön Kayıt Sırası' : 'Standard Priority';
            badgeClass = 'badge-standard';
        }

        return `
            <tr>
                <td><span class="rank-badge ${rankBadgeClass}">#${rank}</span></td>
                <td><strong class="masked-name"><i class="fa-solid fa-user-shield"></i> ${masked}</strong></td>
                <td><span class="donor-amount">$${donor.amount.toLocaleString()} USD</span></td>
                <td><span class="priority-tag ${badgeClass}">${priorityLabel}</span></td>
            </tr>
        `;
    }).join('');
}

export function updateDonationProgress() {
    const totalRaised = currentDonors.reduce((sum, d) => sum + d.amount, 0);
    const percentage = Math.min(100, ((totalRaised / targetGoal) * 100)).toFixed(1);

    const raisedEl = document.getElementById('totalRaisedAmount');
    const targetEl = document.getElementById('targetGoalAmount');
    const progressBar = document.getElementById('donationProgressBarFill');
    const percentEl = document.getElementById('donationProgressPercentage');

    if (raisedEl) raisedEl.textContent = `$${totalRaised.toLocaleString()} USD`;
    if (targetEl) targetEl.textContent = `$${targetGoal.toLocaleString()} USD`;
    if (progressBar) progressBar.style.width = `${percentage}%`;
    if (percentEl) percentEl.textContent = `%${percentage}`;
}
