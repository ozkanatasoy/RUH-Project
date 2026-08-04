/**
 * RUH PROJECT - Interactive Script
 * Features:
 * - Full TR/EN Bilingual Switcher
 * - Dynamic 5-Step Application Wizard
 * - Family Member Form Addition & Live Fee Calculator ($20,000 USD baseline)
 * - Interactive Will Templates Generator
 * - Animated Bio-Energy Canvas Visualizer
 * - Certificate Preview & Print Modal
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. BILINGUAL TRANSLATION DICTIONARY (TR / EN)
       ========================================================================== */
    const translations = {
        tr: {
            // Meta & General
            title: "RUH Project | Ruh Aktarımı & Miras Koruma Protokolü",
            announcementBadge: "AŞAMA 1 (AR-GE)",
            announcementText: "Bu portal şu anda <strong>Aşama 1 (Fikir, AR-GE ve Ön Kayıt)</strong> sürecindedir. Katılım bedeli teknolojik ve hukuki altyapıyı destekler. Ön kayıt yaptıranlar Aşama 2'de öncelikli hizmet alır.",
            
            // Nav
            navAbout: "Proje & Aşamalar",
            navMechanics: "Teknoloji & İşleyiş",
            navLegal: "Hukuki Çerçeve",
            navApply: "Ön Kayıt Başvurusu",
            navFaq: "SSS",
            navCta: "Yerinizi Ayırtın",

            // Hero
            heroTag: "Biyo-Enerji Kilitlenme & Kuantum GPS Protokolü",
            heroTitleGrad: "RUH PROJECT",
            heroSlogan: '"Ölmeden önce yerinizi ayırtın"',
            heroDesc: "İnsan bilincinin ve biyo-enerji izinin ölüm öncesinde kilitlenerek, sonraki canlı bedende kuantum GPS aracılığıyla tespiti ve mirasa dair tüm finansal ve taşınmaz hakların hukuki sözleşmelerle yeni yaşama aktarılması protokolü.",
            heroBtnApply: "Ön Kayıt Formu Doldur",
            heroBtnExplore: "Teknolojiyi İncele",
            statPhase: "AR-GE ve Hukuk Altyapısı",
            statFee: "Kişi Başı Katılım Bedeli",
            statEscrow: "Sözleşmeli Miras Garantisi",
            canvasStatus: "BİYO-ENERJİ FREKANS TARAMASI",
            labelEnergyLock: "Enerji İzi Durumu:",
            statusLocked: "KİLİTLENMEYE HAZIR",
            labelGPS: "Kuantum GPS Frekansı:",

            // Phases
            phaseSub: "ŞEFFAFLIK İLKESİ VE PROJE YOL HARİTASI",
            phaseTitle: "Fikir ve Uygulama Aşamaları",
            phaseDesc: "RUH Project iki temel evrede yürütülecektir. Şeffaflık ilkesi gereği ön kayıt sürecindeki katılım şartları aşağıda sunulmuştur.",
            phase1Badge: "AŞAMA 1 (Şu An Aktif)",
            phase1Title: "Fikir, AR-GE & Ön Kayıt Süreci",
            phase1Desc: "Müşteriler kişisel bilgi ve miras tercihlerini içeren ön kayıt formunu doldurarak kişi başı belirlenen hizmet katılım bedelini öder. Bu bedel, uluslararası biyo-fizik AR-GE çalışmalarını ve küresel miras hukuku altyapısını finanse eder.",
            p1Check1: "Kişisel Form Kaydı ve Biyo-Enerji Profili Oluşturma",
            p1Check2: "Miras Devir Protokolü ve Vasiyetname Şablonu Hazırlığı",
            p1Check3: "Aşama 2 Devreye Girdiğinde Öncelikli Aktivasyon Hakkı",
            p1Check4: "Hukuki Sorumluluk ve Sözleşme Onay Protokolü",

            phase2Badge: "AŞAMA 2 (Gelecek Aktivasyon)",
            phase2Title: "Uygulama & Hizmet Aktivasyonu",
            phase2Desc: "Teknolojik biyo-tarama donanımları ve uluslararası hukuki escrow sözleşme altyapısı tamamlandığında, 1. Aşamada ön kayıt yaptıran ve ödemesini tamamlayan müşteriler doğrudan ve öncelikli olarak hizmetten yararlanır.",
            p2Check1: "Ölüm Öncesi Vücutta Biyo-Enerji İzi Kilitleme İşlemi",
            p2Check2: "Yeni Bedende Kuantum GPS Yeri Tespiti ve Tescil",
            p2Check3: "Banka Escrow ve Miras Taşınmaz Devirlerinin Gerçekleştirilmesi",
            p2Check4: "Vasiyetname Şartlarının Yeni Beden Kimliğine Aktarılması",

            // Mechanics
            mechSub: "TEMEL İLKELER VE TEKNİK MEKANİZMA",
            mechTitle: "Nasıl Çalışır?",
            mechDesc: "Beden seçimi yapılmaz; biyo-enerji iziniz kilitlenir ve doğal uyum kanalıyla yeni beden kuantum GPS ile tespit edilir.",
            mechCard1Title: "1. Enerji İzi Kilitleme",
            mechCard1Desc: "Ölüm öncesinde kişinin hücre ve bilincine özel elektro-manyetik biyo-enerji frekansı taranarak dijital protokole kilitlenir. Firma veya müşteri geçilecek bedeni seçemez.",
            mechCard2Title: "2. Kuantum GPS Tespiti",
            mechCard2Desc: "Ruhun yeni canlı bedende hayat bulmasıyla birlikte, kilitlenen biyo-enerji izinin yaydığı frekans sinyali sayesinde yeni bedenin konumu nokta atışı tespit edilir.",
            mechCard3Title: "3. Hukuki Miras Transferi",
            mechCard3Desc: "Belirlenen vasiyetname ve bankacılık escrow sözleşmeleri doğrultusunda, kişinin önceki yaşamındaki tüm mal varlığı ve taşınmazları resmi devir süreciyle yeni kimliğine garanti edilir.",

            // Wizard Headers
            wizardSub: "İNTERAKTİF BAŞVURU PORTALI",
            wizardTitle: "Ön Kayıt ve Protokol Formu",
            wizardDesc: "Formu doldurarak ve kayıt ücretini onaylayarak RUH Project Aşama 1 protokolüne katılım sağlayabilirsiniz. Şahsen veya aile üyeleriniz için ayrı formlar oluşturabilirsiniz.",
            step1Header: "Kişisel & Aile",
            step2Header: "Ücret & Paket",
            step3Header: "Hukuki Onay",
            step4Header: "Miras & Vasiyet",
            step5Header: "Özet & Sertifika",

            // Wizard Step 1
            step1Title: "Adım 1: Müşteri & Aile Üyeleri Bilgi Formu",
            step1Subtitle: "Kendi bilgilerinizi doldurduktan sonra dilerseniz aile üyeleriniz için de ilave form oluşturabilirsiniz. Her kişi için ayrı katılım ücreti hesaplanır.",
            formTitle1: "Form 1: Ana Başvuru Sahibi (Kendiniz)",
            formTitleN: "Form ",
            lblFullName: "Ad Soyad *",
            lblIdentity: "TC Kimlik / Pasaport No *",
            lblBirthDate: "Doğum Tarihi *",
            lblEmail: "E-posta Adresi *",
            lblPhone: "Telefon Numarası *",
            lblRelation: "Yakınlık Derecesi",
            btnAddFamily: "+ Aile Üyesi İçin Ayrı Form Ekle",
            btnRemoveMember: "Formu Kaldır",

            // Wizard Step 2
            step2Title: "Adım 2: Hizmet Ücreti Hesaplama & Protokol Paketi",
            step2Subtitle: "Doldurulan form sayısına göre kişi başı standart taban hizmet ücreti ($20,000 USD) hesaplanır. Protokol paketinizi seçebilirsiniz.",
            alphaDesc: "Standart AR-GE katılımı, biyo-enerji izi ön kayıt kilidi ve temel miras escrow sözleşmesi.",
            sovereignDesc: "Kuantum kriptografik kasa, yörünge uydu takipli VIP GPS ve özel hukuki kayyum desteği.",
            feat1: "Biyo-Enerji İzi Kaydı",
            feat2: "Kuantum GPS Tespiti Sinyal Tescili",
            feat3: "Aşama 2 Öncelikli Aktivasyon",
            feat4: "Standart Bankacılık Vasiyet Protokolü",
            featSov1: "Tüm Alfa Protokol Hakları",
            featSov2: "Yörünge Uydusu Destekli Öncelikli GPS Tespiti",
            featSov3: "Kuantum Şifreli Dijital Vasiyet Kasası",
            featSov4: "Uluslararası Özel Hukuk Kayyumu Ataması",
            btnSelect: "Paketi Seç",
            btnSelected: "Seçildi",
            calcFormCount: "Toplam Kayıtlı Kişi Sayısı:",
            calcSelectedTier: "Seçilen Protokol:",
            calcTotal: "Toplam Katılım Bedeli:",

            // Wizard Step 3
            step3Title: "Adım 3: Hukuki Çerçeve ve Sorumluluk Sözleşmesi",
            step3Subtitle: "RUH Project Aşama 1 kapsamında bütün sorumluluğun kullanıcı tarafından kabul edildiğine dair resmi hukuki metin aşağıdadır.",
            contractHeader: "RUH PROJECT AŞAMA 1 ÖN KAYIT VE HUKUKİ SORUMLULUK SÖZLEŞMESİ",
            contractP1: "<strong>Madde 1 - Taraflar ve Konu:</strong> İşbu sözleşme, RUH Project ('Firma') ile bu platform üzerinden ön kayıt formunu dolduran ve katılım bedelini ödeyen 'Müşteri' arasında akdedilmiştir. Konu, Aşama 1 (Fikir ve AR-GE) süreci şartlarının ve Aşama 2 (Uygulama) haklarının belirlenmesidir.",
            contractP2: "<strong>Madde 2 - Şeffaflık ve Fikir Aşaması Beyanı:</strong> Müşteri, projenin mevcut durumda bir AR-GE ve fikir aşamasında olduğunu, ödenen hizmet bedelinin teknolojik biyo-enerji tarama yazılımları, uluslararası miras hukuku protokolleri ve altyapı geliştirilmesi amacıyla kullanıldığını gayri kabili rücu kabul eder.",
            contractP3: "<strong>Madde 3 - Beden Seçim Sınırlaması:</strong> Müşteri, sonraki yaşamında hangi canlı bedene geçeceğini kendisinin veya Firmanın seçemeyeceğini bilmekte ve kabul etmektedir. Süreç tamamen ölüm öncesi kilitlenen biyo-enerji frekansı ve kuantum GPS tespiti esasına dayanır.",
            contractP4: "<strong>Madde 4 - Sorumluluk Reddi:</strong> Müşteri, söz konusu hizmetin doğası gereği bilimsel ve hukuki AR-GE süreçlerine bağlı olduğunu, Aşama 2 hizmet aktivasyonu gerçekleştiğinde ön kayıtlı müşterilerin ilk ve öncelikli sıradan yararlanacağını kabul eder.",
            chkTermsText: "Yukarıdaki hukuki sözleşmeyi okudum, anladım ve Aşama 1 AR-GE katılım şartlarını ve tüm sorumluluğu kabul ediyorum. *",
            chkNoChoiceText: "Beden seçimi yapılamayacağını ve biyo-enerji kilitleme prensibini onaylıyorum. *",

            // Wizard Step 4
            step4Title: "Adım 4: Miras Devir Seçimi & Vasiyetname Şablonu",
            step4Subtitle: "İsteyen müşteriler mevcut finansal ve taşınmaz haklarını bir sonraki canlı bedenine aktarabilir. Sözleşmeler hukuki çerçevede banka ve resmi organlarca ölüm sonrası yürütülecektir.",
            inheritYesTitle: "Evet, Mirasımı Yeni Bedene Aktarmak İstiyorum",
            inheritYesDesc: "Vasiyetname ve bankacılık escrow anlaşması ile haklarım kilitlensin.",
            inheritNoTitle: "İstemiyorum / Sonra Düşüneceğim",
            inheritNoDesc: "Miras aktarımı olmadan sadece beden tespiti protokolü yürütülsün.",
            templateLabel: "Hazır Vasiyet Şablonları:",
            btnTpl1: "%100 Tam Devir Şablonu",
            btnTpl2: "Paylaşmalı Vasiyet Şablonu",
            btnTpl3: "Kripto & Taşınmaz Fonu",
            lblWillText: "Vasiyetname & Miras Aktarım Talimatı Metni",
            willHint: "Bu metin sadece yazılı bir sözleşme taslağıdır. Gerekli devir ve banka süreçleri müşteri öldükten sonra hukuki escrow kanallarınca gerçekleştirilecektir.",

            // Wizard Step 5 & Modal
            step5Title: "Adım 5: Özet İnceleme & Ön Kayıt Onayı",
            step5Subtitle: "Başvuru özetinizi kontrol ediniz ve Aşama 1 ön kayıt sertifikanızı oluşturunuz.",
            revForms: "Kayıtlı Formlar:",
            revTier: "Seçilen Paket:",
            revInherit: "Miras Aktarımı:",
            revTotal: "Toplam Ödenecek Katılım Bedeli:",
            payMethodTitle: "Ödeme Yöntemi Seçimi (Aşama 1 AR-GE Fonu)",
            payWire: "Banka Havalesi / SWIFT",
            payCrypto: "USDT / Crypto Escrow",
            payCard: "Kredi Kartı / Taksit",
            btnPrev: "Geri",
            btnNext: "Devam Et",
            btnSubmit: "Ön Kaydı Tamamla & Sertifikayı Al",

            // FAQ
            faqSub: "MERAK EDİLENLER",
            faqTitle: "Sıkça Sorulan Sorular",
            faqQ1: "Geçilecek canlı bedeni kendim seçebilir miyim?",
            faqA1: "Hayır. RUH Project sisteminde ne müşteri ne de firma geçilecek bedeni seçebilir. Ölüm öncesinde vücutta kilitlenen biyo-enerji izi ve doğal frekans uyumu doğrultusunda ruhun aktarıldığı yeni beden kuantum GPS sinyalleri ile otomatik olarak tespit edilir.",
            faqQ2: "Ödediğim $20,000 USD katılım ücreti ne amaçla kullanılmaktadır?",
            faqA2: "Bu ücret Aşama 1 (Fikir ve AR-GE) kapsamında biyo-fizik araştırmalarını, frekans kilitleme yazılımlarını ve uluslararası miras devir hukuku altyapısını finanse eder. Katılım sağlayanlar Aşama 2 aktivasyonunda öncelikli hakkı kazanır.",
            faqQ3: "Mirasım yeni bedene hukuken nasıl aktarılacak?",
            faqA3: "Aşama 4'te doldurduğunuz vasiyetname metni ve anlaşmalı banka escrow protokolleri doğrultusunda, ölüm gerçekleştikten ve yeni beden GPS ile tescil edildikten sonra resmi hukuk organları marifetiyle mal varlığınız devredilir.",
            faqQ4: "Aile üyelerim için ayrı ücret ödemem gerekiyor mu?",
            faqA4: "Evet. Her bireyin biyo-enerji izi ve kuantum frekansı benzersiz olduğundan, form adımında eklenen her aile üyesi için ayrı form ve ayrı hizmet ücreti ($20,000 USD / kişi) hesaplanır.",

            // Footer
            footerDesc: "Ölüm sonrası ruh aktarımı, biyo-enerji kilitleme ve miras koruma protokolü.",
            footerQuickLinks: "Hızlı Bağlantılar",
            footerLegalTitle: "Yasal Uyarı",
            footerLegalNotice: "Bu proje Aşama 1 (AR-GE ve Fikir) evresindedir. Sunulan tüm hizmetler ve sözleşmeler uluslararası hukuk çerçevesinde yürütülmekte olup, kullanıcılar sorumluluk şartlarını kabul eder.",

            // Modal Certificate
            certModalTitle: "RUH Project Ön Kayıt Sertifikası",
            certOfficialDoc: "AŞAMA 1 BİYO-ENERJİ VE MİRAS ÖN KAYIT BELGESİ",
            certStamp: "PH1 APPROVED<br>RUH R&D VAULT",
            btnPrint: "Sertifikayı Yazdır / PDF İndir",
            btnClose: "Kapat"
        },
        en: {
            // Meta & General
            title: "RUH Project | Soul Relocation & Inheritance Protocol",
            announcementBadge: "PHASE 1 (R&D)",
            announcementText: "This portal is currently in <strong>Phase 1 (Concept, R&D & Pre-Registration)</strong>. Pre-registration fees fund technological & legal infrastructure. Enrolled clients receive priority activation in Phase 2.",
            
            // Nav
            navAbout: "Project & Phases",
            navMechanics: "Tech & Mechanics",
            navLegal: "Legal Framework",
            navApply: "Pre-Registration Portal",
            navFaq: "FAQ",
            navCta: "Reserve Your Place",

            // Hero
            heroTag: "Bio-Energy Lock & Quantum GPS Protocol",
            heroTitleGrad: "RUH PROJECT",
            heroSlogan: '"Reserve your place before you die"',
            heroDesc: "A revolutionary protocol locking human consciousness and bio-energy signature before death, pinpointing the target host body via Quantum GPS post-relocation, and securing all inheritance & estate rights via legal contracts.",
            heroBtnApply: "Fill Pre-Registration Form",
            heroBtnExplore: "Explore Technology",
            statPhase: "R&D & Legal Infrastructure",
            statFee: "Contribution Fee / Person",
            statEscrow: "Contractual Estate Guarantee",
            canvasStatus: "BIO-ENERGY FREQUENCY SCANNER",
            labelEnergyLock: "Energy Signature State:",
            statusLocked: "READY FOR LOCKING",
            labelGPS: "Quantum GPS Frequency:",

            // Phases
            phaseSub: "TRANSPARENCY & PROJECT ROADMAP",
            phaseTitle: "Concept & Activation Phases",
            phaseDesc: "RUH Project operates under two transparent phases. Below are the terms governing Phase 1 pre-registration.",
            phase1Badge: "PHASE 1 (Currently Active)",
            phase1Title: "Concept, R&D & Pre-Registration",
            phase1Desc: "Clients fill out personal & estate preferences and pay the designated per-person contribution fee. This capital finances global bio-physics R&D and international estate escrow legal frameworks.",
            p1Check1: "Personal Data Registration & Bio-Energy Profiling",
            p1Check2: "Inheritance Escrow Transfer Protocol & Will Drafting",
            p1Check3: "Priority Service Activation Right upon Phase 2 Rollout",
            p1Check4: "Legal Liability & Responsibility Consent Protocol",

            phase2Badge: "PHASE 2 (Future Activation)",
            phase2Title: "Implementation & Service Activation",
            phase2Desc: "Once bio-scanning hardware and international banking escrow contracts are live, clients pre-registered in Phase 1 gain immediate, first-tier priority service access.",
            p2Check1: "Pre-Mortem Bio-Energy Signature Locking Procedure",
            p2Check2: "Quantum GPS Location Tracing & Registration of Next Host Body",
            p2Check3: "Execution of Banking Escrow & Real Estate Asset Transfer",
            p2Check4: "Will Terms Activation for the Identified Identity",

            // Mechanics
            mechSub: "CORE PRINCIPLES & TECHNICAL MECHANISMS",
            mechTitle: "How It Works",
            mechDesc: "Host body selection is impossible; your bio-energy signature is locked pre-death, and your next host body is located via resonant Quantum GPS.",
            mechCard1Title: "1. Bio-Energy Signature Lock",
            mechCard1Desc: "Prior to death, the unique electro-magnetic frequency of the client's cellular consciousness is scanned and locked into the digital protocol. Neither the client nor RUH can select the host body.",
            mechCard2Title: "2. Quantum GPS Tracing",
            mechCard2Desc: "As consciousness awakens in the new living entity, the locked bio-frequency signal allows Quantum GPS satellite arrays to pinpoint the exact location of the target host body.",
            mechCard3Title: "3. Legal Estate Escrow",
            mechCard3Desc: "Pursuant to pre-established legal trusts and banking escrow contracts, all assets, bank accounts, and real estate are legally transferred to the new identity.",

            // Wizard Headers
            wizardSub: "INTERACTIVE APPLICATION PORTAL",
            wizardTitle: "Pre-Registration & Protocol Form",
            wizardDesc: "Participate in RUH Project Phase 1 by submitting the registration form and contribution fee. Fill separate forms for yourself and family members.",
            step1Header: "Personal & Family",
            step2Header: "Fee & Package",
            step3Header: "Legal Waiver",
            step4Header: "Inheritance & Will",
            step5Header: "Review & Certificate",

            // Wizard Step 1
            step1Title: "Step 1: Applicant & Family Information Form",
            step1Subtitle: "Fill your own details first, then add optional separate forms for family members. Fees are calculated per person.",
            formTitle1: "Form 1: Primary Applicant (Self)",
            formTitleN: "Form ",
            lblFullName: "Full Name *",
            lblIdentity: "National ID / Passport No *",
            lblBirthDate: "Date of Birth *",
            lblEmail: "Email Address *",
            lblPhone: "Phone Number *",
            lblRelation: "Relationship",
            btnAddFamily: "+ Add Separate Form for Family Member",
            btnRemoveMember: "Remove Form",

            // Wizard Step 2
            step2Title: "Step 2: Service Fee Calculation & Protocol Tier",
            step2Subtitle: "Standard baseline contribution fee ($20,000 USD per person) is calculated based on registered form count. Select your protocol tier.",
            alphaDesc: "Standard R&D participation, bio-energy signature pre-registration lock, and baseline estate escrow contract.",
            sovereignDesc: "Quantum cryptographic vault, orbital satellite-tracked VIP GPS, and dedicated international legal custodian.",
            feat1: "Bio-Energy Signature Registration",
            feat2: "Quantum GPS Tracing Signal Escrow",
            feat3: "Phase 2 Priority Activation Guarantee",
            feat4: "Standard Banking Will Protocol",
            featSov1: "Includes All Alpha Protocol Rights",
            featSov2: "Orbital Satellite Priority GPS Tracing",
            featSov3: "Quantum Encrypted Digital Will Vault",
            featSov4: "Dedicated International Legal Custodian Assignment",
            btnSelect: "Select Package",
            btnSelected: "Selected",
            calcFormCount: "Total Registered Persons:",
            calcSelectedTier: "Selected Protocol:",
            calcTotal: "Total Contribution Fee:",

            // Wizard Step 3
            step3Title: "Step 3: Legal Framework & Responsibility Agreement",
            step3Subtitle: "Official legal contract below wherein customer assumes full liability for Phase 1 R&D pre-registration.",
            contractHeader: "RUH PROJECT PHASE 1 PRE-REGISTRATION & LEGAL LIABILITY CONTRACT",
            contractP1: "<strong>Article 1 - Parties & Subject:</strong> This contract is entered into between RUH Project ('Company') and the 'Client' filling out the pre-registration form. Subject: Establishing Phase 1 (Concept & R&D) terms and Phase 2 (Activation) rights.",
            contractP2: "<strong>Article 2 - R&D Disclosure & Transparency:</strong> Client irrevocably acknowledges that the project is currently in R&D and concept phase, and paid contribution fees fund biophysics R&D, energy-scanning software, and international legal escrow frameworks.",
            contractP3: "<strong>Article 3 - Host Body Non-Selection Limitation:</strong> Client understands and agrees that neither the Client nor Company can choose the destination living entity. The process relies strictly on pre-mortem bio-energy signature locking and Quantum GPS tracing.",
            contractP4: "<strong>Article 4 - Liability Release:</strong> Client agrees that due to the scientific R&D nature of the service, pre-registered clients receive priority activation rights upon Phase 2 rollout.",
            chkTermsText: "I have read, understood, and accept the legal contract, Phase 1 R&D contribution terms, and full user liability. *",
            chkNoChoiceText: "I confirm that host body selection is impossible and accept the bio-energy locking principle. *",

            // Wizard Step 4
            step4Title: "Step 4: Inheritance Transfer Choice & Will Template",
            step4Subtitle: "Optionally transfer wealth, assets, and real estate to your next living entity. Contracts are executed post-mortem via banking escrow.",
            inheritYesTitle: "Yes, I Want to Transfer My Estate to My Next Host Body",
            inheritYesDesc: "Lock my financial and real estate rights via legal banking escrow.",
            inheritNoTitle: "No / Decided Later",
            inheritNoDesc: "Proceed with host body identification protocol only, without asset transfer.",
            templateLabel: "Will & Testament Templates:",
            btnTpl1: "100% Full Transfer Template",
            btnTpl2: "Split Estate Template",
            btnTpl3: "Crypto & Real Estate Vault",
            lblWillText: "Will & Estate Transfer Directive Text",
            willHint: "This text serves as a legal drafting framework. Actual banking and asset transfers will be executed post-mortem via designated escrow trusts.",

            // Wizard Step 5 & Modal
            step5Title: "Step 5: Summary Review & Pre-Registration Approval",
            step5Subtitle: "Review your application summary and generate your Phase 1 Certificate.",
            revForms: "Registered Forms:",
            revTier: "Selected Package:",
            revInherit: "Inheritance Transfer:",
            revTotal: "Total Payable Contribution Fee:",
            payMethodTitle: "Payment Method Selection (Phase 1 R&D Fund)",
            payWire: "Bank Wire / SWIFT",
            payCrypto: "USDT / Crypto Escrow",
            payCard: "Credit Card / Installments",
            btnPrev: "Back",
            btnNext: "Continue",
            btnSubmit: "Complete Registration & Get Certificate",

            // FAQ
            faqSub: "FREQUENTLY ASKED QUESTIONS",
            faqTitle: "Frequently Asked Questions",
            faqQ1: "Can I choose which living host body I will transfer to?",
            faqA1: "No. Neither the client nor RUH Project can select the host body. The bio-energy signature locked before death naturally resonates with the target host body, which is automatically pinpointed via Quantum GPS signals.",
            faqQ2: "What is the purpose of the $20,000 USD contribution fee?",
            faqA2: "This fee finances Phase 1 R&D, biophysics frequency locking software, and international legal inheritance escrow frameworks. Pre-registered participants gain priority activation in Phase 2.",
            faqQ3: "How will my inheritance be legally transferred to the new host body?",
            faqA3: "Pursuant to your Will draft and banking escrow agreements, once death occurs and the new host body's location is verified via GPS, legal escrow executors transfer the assets.",
            faqQ4: "Do I need to pay a separate fee for each family member?",
            faqA4: "Yes. Since every individual possesses a unique bio-energy frequency, a separate form and individual fee ($20,000 USD per person) applies for each family member added.",

            // Footer
            footerDesc: "Post-mortem soul relocation, bio-energy signature locking, and inheritance protection protocol.",
            footerQuickLinks: "Quick Links",
            footerLegalTitle: "Legal Disclaimer",
            footerLegalNotice: "This project is currently in Phase 1 (Concept & R&D). All services and contracts are governed under international legal frameworks; clients accept responsibility terms.",

            // Modal Certificate
            certModalTitle: "RUH Project Pre-Registration Certificate",
            certOfficialDoc: "PHASE 1 BIO-ENERGY & INHERITANCE REGISTRATION CERTIFICATE",
            certStamp: "PH1 APPROVED<br>RUH R&D VAULT",
            btnPrint: "Print Certificate / Download PDF",
            btnClose: "Close"
        }
    };

    let currentLang = 'tr';

    // Switch Language Function
    function switchLanguage(lang) {
        currentLang = lang;
        document.body.className = `lang-${lang}`;
        document.getElementById('langCurrentLabel').textContent = lang.toUpperCase();

        const dict = translations[lang];
        if (!dict) return;

        // Update document title
        if (dict.title) document.title = dict.title;

        // Translate all elements with data-i18n
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) {
                el.innerHTML = dict[key];
            }
        });

        // Update Form Titles if any dynamically generated forms exist
        updateDynamicFormTitles();
        // Update Live Fee Summary text
        updateFeeSummary();
    }

    // Language Toggle Listener
    const langBtn = document.getElementById('langToggleBtn');
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            const newLang = currentLang === 'tr' ? 'en' : 'tr';
            switchLanguage(newLang);
        });
    }

    /* ==========================================================================
       2. ANIMATED BIO-ENERGY CANVAS VISUALIZER
       ========================================================================== */
    const canvas = document.getElementById('energyCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = canvas.parentElement.clientWidth;
        let height = canvas.height = canvas.parentElement.clientHeight;

        window.addEventListener('resize', () => {
            if (canvas.parentElement) {
                width = canvas.width = canvas.parentElement.clientWidth;
                height = canvas.height = canvas.parentElement.clientHeight;
            }
        });

        const particles = [];
        const particleCount = 45;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 2 + 1,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                alpha: Math.random() * 0.7 + 0.3,
                hue: Math.random() > 0.5 ? 185 : 275 // Cyan or Violet
            });
        }

        let pulseRadius = 0;

        function animateCanvas() {
            ctx.fillStyle = 'rgba(4, 5, 9, 0.25)';
            ctx.fillRect(0, 0, width, height);

            // Expanding energy wave pulse
            pulseRadius = (pulseRadius + 1.2) % (Math.max(width, height) / 2);
            ctx.beginPath();
            ctx.arc(width / 2, height / 2, pulseRadius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(0, 242, 254, ${1 - pulseRadius / (Math.max(width, height) / 2)})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Render particles & connections
            particles.forEach((p, idx) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p.hue}, 100%, 65%, ${p.alpha})`;
                ctx.shadowBlur = 8;
                ctx.shadowColor = `hsl(${p.hue}, 100%, 50%)`;
                ctx.fill();
                ctx.shadowBlur = 0;

                // Draw bio-electric connections
                for (let j = idx + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                    if (dist < 75) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(0, 242, 254, ${0.15 - dist / 500})`;
                        ctx.stroke();
                    }
                }
            });

            requestAnimationFrame(animateCanvas);
        }

        animateCanvas();
    }

    /* ==========================================================================
       3. INTERACTIVE MULTI-STEP WIZARD & CALCULATOR
       ========================================================================== */
    let currentStep = 1;
    let memberCount = 1;
    let selectedTier = 'alpha';
    let selectedTierFee = 20000;
    let selectedTierName = 'Alfa Protokol';

    const familyFormsContainer = document.getElementById('familyFormsContainer');
    const addMemberBtn = document.getElementById('addMemberBtn');
    const prevStepBtn = document.getElementById('prevStepBtn');
    const nextStepBtn = document.getElementById('nextStepBtn');
    const submitFormBtn = document.getElementById('submitFormBtn');

    // Add Family Member Function
    if (addMemberBtn) {
        addMemberBtn.addEventListener('click', () => {
            memberCount++;
            const memberIndex = memberCount;

            const memberCard = document.createElement('div');
            memberCard.className = 'family-member-card';
            memberCard.setAttribute('data-member-index', memberIndex);

            const formTitleText = currentLang === 'tr' 
                ? `Form ${memberIndex}: Aile Üyesi` 
                : `Form ${memberIndex}: Family Member`;

            memberCard.innerHTML = `
                <div class="member-card-header">
                    <span class="member-card-title">
                        <i class="fa-solid fa-user"></i> <span class="member-title-span">${formTitleText}</span>
                    </span>
                    <button type="button" class="btn-remove-member" onclick="removeMemberForm(${memberIndex})">
                        <i class="fa-solid fa-trash"></i> ${translations[currentLang].btnRemoveMember}
                    </button>
                </div>
                <div class="form-grid">
                    <div class="form-group">
                        <label>${translations[currentLang].lblFullName}</label>
                        <input type="text" class="form-control" name="fullName_${memberIndex}" required>
                    </div>
                    <div class="form-group">
                        <label>${translations[currentLang].lblIdentity}</label>
                        <input type="text" class="form-control" name="identityNo_${memberIndex}" required>
                    </div>
                    <div class="form-group">
                        <label>${translations[currentLang].lblBirthDate}</label>
                        <input type="date" class="form-control" name="birthDate_${memberIndex}" required>
                    </div>
                    <div class="form-group">
                        <label>${translations[currentLang].lblEmail}</label>
                        <input type="email" class="form-control" name="email_${memberIndex}" required>
                    </div>
                    <div class="form-group">
                        <label>${translations[currentLang].lblPhone}</label>
                        <input type="tel" class="form-control" name="phone_${memberIndex}" required>
                    </div>
                    <div class="form-group">
                        <label>${translations[currentLang].lblRelation}</label>
                        <input type="text" class="form-control" name="relation_${memberIndex}" placeholder="Örn: Eş / Çocuk / Kardeş" required>
                    </div>
                </div>
            `;

            familyFormsContainer.appendChild(memberCard);
            updateFeeSummary();
        });
    }

    // Global Remove Member Function
    window.removeMemberForm = function(index) {
        const card = document.querySelector(`.family-member-card[data-member-index="${index}"]`);
        if (card) {
            card.remove();
            memberCount = document.querySelectorAll('.family-member-card').length;
            updateDynamicFormTitles();
            updateFeeSummary();
        }
    };

    function updateDynamicFormTitles() {
        const cards = document.querySelectorAll('.family-member-card');
        cards.forEach((card, idx) => {
            const num = idx + 1;
            card.setAttribute('data-member-index', num);
            const titleSpan = card.querySelector('.member-title-span');
            if (titleSpan) {
                if (num === 1) {
                    titleSpan.textContent = translations[currentLang].formTitle1;
                } else {
                    titleSpan.textContent = `${translations[currentLang].formTitleN} ${num}: ${currentLang === 'tr' ? 'Aile Üyesi' : 'Family Member'}`;
                }
            }
        });
    }

    // Tier Selection Cards
    const tierCards = document.querySelectorAll('.tier-card');
    tierCards.forEach(card => {
        card.addEventListener('click', () => {
            tierCards.forEach(c => {
                c.classList.remove('active');
                const btn = c.querySelector('.btn-select-tier');
                if (btn) btn.textContent = translations[currentLang].btnSelect;
            });

            card.classList.add('active');
            selectedTier = card.getAttribute('data-tier');
            selectedTierFee = parseInt(card.getAttribute('data-fee'), 10);
            
            const selectedBtn = card.querySelector('.btn-select-tier');
            if (selectedBtn) selectedBtn.textContent = translations[currentLang].btnSelected;

            if (selectedTier === 'alpha') {
                selectedTierName = currentLang === 'tr' ? 'Alfa Protokol' : 'Alpha Protocol';
            } else {
                selectedTierName = currentLang === 'tr' ? 'Sovereign Soul Protokol' : 'Sovereign Soul Protocol';
            }

            updateFeeSummary();
        });
    });

    // Live Fee Calculator Update
    function updateFeeSummary() {
        const count = document.querySelectorAll('.family-member-card').length || 1;
        memberCount = count;
        const totalAmount = count * selectedTierFee;

        const countText = `${count} ${currentLang === 'tr' ? 'Kişi' : 'Person(s)'}`;
        const calcMemberCountEl = document.getElementById('calcMemberCount');
        if (calcMemberCountEl) calcMemberCountEl.textContent = countText;

        const calcTierNameEl = document.getElementById('calcTierName');
        if (calcTierNameEl) {
            calcTierNameEl.textContent = `${selectedTierName} ($${selectedTierFee.toLocaleString()} / ${currentLang === 'tr' ? 'Kişi' : 'Person'})`;
        }

        const calcTotalEl = document.getElementById('calcTotalAmount');
        if (calcTotalEl) calcTotalEl.textContent = `$${totalAmount.toLocaleString()} USD`;
    }

    // Step Navigation Logic
    function updateStepView() {
        // Hide all step panels
        document.querySelectorAll('.wizard-step-panel').forEach(panel => panel.classList.remove('active'));
        // Show active panel
        const activePanel = document.getElementById(`stepPanel${currentStep}`);
        if (activePanel) activePanel.classList.add('active');

        // Update Progress Indicators
        document.querySelectorAll('.step-indicator').forEach(ind => {
            const stepNum = parseInt(ind.getAttribute('data-step'), 10);
            ind.classList.remove('active', 'completed');
            if (stepNum === currentStep) {
                ind.classList.add('active');
            } else if (stepNum < currentStep) {
                ind.classList.add('completed');
            }
        });

        // Toggle Buttons
        if (currentStep === 1) {
            prevStepBtn.style.display = 'none';
        } else {
            prevStepBtn.style.display = 'inline-flex';
        }

        if (currentStep === 5) {
            nextStepBtn.style.display = 'none';
            submitFormBtn.style.display = 'inline-flex';
            populateSummaryReview();
        } else {
            nextStepBtn.style.display = 'inline-flex';
            submitFormBtn.style.display = 'none';
        }
    }

    if (nextStepBtn) {
        nextStepBtn.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                if (currentStep < 5) {
                    currentStep++;
                    updateStepView();
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

    // Form Step Validation
    function validateStep(step) {
        if (step === 1) {
            // Check primary required fields
            const primaryName = document.querySelector('input[name="fullName_1"]');
            const primaryId = document.querySelector('input[name="identityNo_1"]');
            if (!primaryName.value.trim() || !primaryId.value.trim()) {
                alert(currentLang === 'tr' ? 'Lütfen 1. Formdaki gerekli alanları (Ad Soyad, Kimlik No) doldurunuz.' : 'Please complete required fields in Form 1.');
                return false;
            }
        } else if (step === 3) {
            const chkTerms = document.getElementById('chkTerms');
            const chkNoChoice = document.getElementById('chkNoChoice');
            if (!chkTerms.checked || !chkNoChoice.checked) {
                alert(currentLang === 'tr' ? 'Lütfen hukuki sözleşmeyi ve beden seçimi sınırlamasını onaylayınız.' : 'Please accept the legal terms and non-selection policy.');
                return false;
            }
        }
        return true;
    }

    /* ==========================================================================
       4. INHERITANCE TRANSFER & WILL TEMPLATES
       ========================================================================== */
    const radioInheritYes = document.getElementById('radioInheritYes');
    const radioInheritNo = document.getElementById('radioInheritNo');
    const willSection = document.getElementById('willSection');
    const willText = document.getElementById('willText');

    if (radioInheritYes && radioInheritNo) {
        radioInheritYes.addEventListener('click', () => {
            radioInheritYes.classList.add('active');
            radioInheritNo.classList.remove('active');
            radioInheritYes.querySelector('input').checked = true;
            willSection.style.display = 'block';
        });

        radioInheritNo.addEventListener('click', () => {
            radioInheritNo.classList.add('active');
            radioInheritYes.classList.remove('active');
            radioInheritNo.querySelector('input').checked = true;
            willSection.style.display = 'none';
        });
    }

    // Will Templates Insertion
    const templates = {
        tpl1_tr: "VASİYETNAME VE TAM MİRAS DEVİR TALİMATI:\n\nÖlümüm gerçekleştikten sonra RUH Project biyo-enerji kilitleme protokolü çerçevesinde tespit edilen yeni canlı bedenime, tarafıma ait tüm banka mevduatlarımın, gayrimenkullerimin, hisse senetlerimin ve dijital varlıklarımın %100 oranında eksiksiz devredilmesini resmi escrow kanalları vasıtasıyla talep ediyorum.",
        tpl1_en: "WILL & FULL ESTATE TRANSFER DIRECTIVE:\n\nUpon my death, I instruct that 100% of my bank deposits, real estate properties, equities, and digital assets be legally transferred via official escrow trusts to my identified next living host body registered under the RUH Project bio-energy protocol.",
        
        tpl2_tr: "PAYLAŞMALI MİRAS DEVİR TALİMATI:\n\nÖlümümden sonra tespit edilecek yeni bedenime varlığımın %50'sinin aktarılmasını; kalan %50'lik kısmın ise kanuni mirasçılarıma / belirttiğim vakıflara devredilmesini talep ediyorum.",
        tpl2_en: "SPLIT ESTATE TRANSFER DIRECTIVE:\n\nUpon my death, I direct that 50% of my total estate be transferred to my identified next living host body, and the remaining 50% be distributed to my legal heirs and designated charitable foundations.",
        
        tpl3_tr: "KRİPTO VE TAŞINMAZ VASIYET KASASI:\n\nÖlümüm sonrasında tüm soğuk cüzdan kripto varlıklarımın ve gayrimenkul tapularımın kuantum şifreli kilitli kasadan tespit edilecek yeni beden kimliğime 18 yaşına ulaştığında devredilmesini onaylıyorum.",
        tpl3_en: "CRYPTOGRAPHIC & REAL ESTATE VAULT DIRECTIVE:\n\nUpon my death, I direct that all cold-wallet cryptographic assets and real estate titles held in quantum escrow be released to my identified next host body upon reaching the age of 18."
    };

    const btnTpl1 = document.getElementById('btnTpl1');
    const btnTpl2 = document.getElementById('btnTpl2');
    const btnTpl3 = document.getElementById('btnTpl3');

    if (btnTpl1) btnTpl1.addEventListener('click', () => { willText.value = currentLang === 'tr' ? templates.tpl1_tr : templates.tpl1_en; });
    if (btnTpl2) btnTpl2.addEventListener('click', () => { willText.value = currentLang === 'tr' ? templates.tpl2_tr : templates.tpl2_en; });
    if (btnTpl3) btnTpl3.addEventListener('click', () => { willText.value = currentLang === 'tr' ? templates.tpl3_tr : templates.tpl3_en; });

    /* ==========================================================================
       5. SUMMARY REVIEW & CERTIFICATE MODAL
       ========================================================================== */
    function populateSummaryReview() {
        const primaryName = document.querySelector('input[name="fullName_1"]')?.value || 'Ahmet Yıldız';
        const totalFee = memberCount * selectedTierFee;

        document.getElementById('revMemberNames').textContent = `${primaryName} (${memberCount} ${currentLang === 'tr' ? 'Kişi' : 'Person'})`;
        document.getElementById('revTierName').textContent = selectedTierName;

        const isInheritYes = document.querySelector('input[name="inheritanceChoice"]:checked')?.value === 'yes';
        document.getElementById('revInheritanceStatus').textContent = isInheritYes 
            ? (currentLang === 'tr' ? 'Evet (Vasiyetname Ekli)' : 'Yes (Will Attached)')
            : (currentLang === 'tr' ? 'Devir İstenmedi' : 'No Asset Transfer');

        document.getElementById('revTotalFee').textContent = `$${totalFee.toLocaleString()} USD`;
    }

    const certModal = document.getElementById('certificateModal');
    const closeCertModal = document.getElementById('closeCertModal');
    const finishModalBtn = document.getElementById('finishModalBtn');
    const printCertBtn = document.getElementById('printCertBtn');

    if (submitFormBtn) {
        submitFormBtn.addEventListener('click', () => {
            // Populate Certificate Card
            const primaryName = document.querySelector('input[name="fullName_1"]')?.value || 'Ahmet Yıldız';
            const totalFee = memberCount * selectedTierFee;
            const randomHash = 'RUH-2026-X' + Math.floor(1000 + Math.random() * 9000) + '-' + Math.floor(100 + Math.random() * 900);

            document.getElementById('certHashVal').textContent = randomHash;
            document.getElementById('certHolderName').textContent = primaryName;
            document.getElementById('certMemberCount').textContent = `${memberCount} ${currentLang === 'tr' ? 'Kişi' : 'Person(s)'}`;
            document.getElementById('certTierName').textContent = `${selectedTierName} ($${totalFee.toLocaleString()} USD)`;
            
            const isInheritYes = document.querySelector('input[name="inheritanceChoice"]:checked')?.value === 'yes';
            document.getElementById('certInheritance').textContent = isInheritYes 
                ? (currentLang === 'tr' ? 'Kayıtlı & Escrow Onaylı' : 'Registered & Escrow Approved')
                : (currentLang === 'tr' ? 'Beden Tespiti (Miras Devirsiz)' : 'Host Body Detection Only');

            const today = new Date();
            document.getElementById('certDate').textContent = today.toLocaleDateString(currentLang === 'tr' ? 'tr-TR' : 'en-US');

            // Show Modal
            certModal.classList.add('active');
        });
    }

    if (closeCertModal) closeCertModal.addEventListener('click', () => certModal.classList.remove('active'));
    if (finishModalBtn) finishModalBtn.addEventListener('click', () => certModal.classList.remove('active'));
    if (printCertBtn) printCertBtn.addEventListener('click', () => window.print());

    /* ==========================================================================
       6. FAQ ACCORDION & MOBILE NAVIGATION
       ========================================================================== */
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            item.classList.toggle('active');
        });
    });

    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    const closeAnnouncement = document.getElementById('closeAnnouncement');
    const announcementBar = document.getElementById('announcementBar');
    if (closeAnnouncement && announcementBar) {
        closeAnnouncement.addEventListener('click', () => {
            announcementBar.style.display = 'none';
        });
    }

});
