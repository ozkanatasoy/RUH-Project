/**
 * RUH PROJECT - i18n Translation Module
 * Handles bilingual state (TR / EN) and dynamic DOM updates for Roadmap Architecture, Transparent Donation Pool ($100M Phased Allocation), Single Protocol Card, Certificate Verification Portal, Expanded FAQ, KVKK Privacy Policy, Legal.html & Contingency Heir Transfer.
 */

export const translations = {
    tr: {
        // Meta & General
        title: "RUH Project | Biyo-Enerji & Ruh Tespiti ve Miras Koruma Protokolü",
        announcementBadge: "AŞAMA 1 (ÜCRETSİZ ÖN KAYIT)",
        announcementText: "Bu portal şu anda <strong>Aşama 1 (Fikir, AR-GE ve Ücretsiz Ön Kayıt)</strong> sürecindedir. Ön kayıt yaptıran kullanıcılar Aşama 2 ve 3 devreye girdiğinde öncelikli hizmet hakkı kazanır.",
        
        // Nav
        navAbout: "Proje & Aşamalar",
        navMechanics: "Teknoloji & İşleyiş",
        navDonations: "AR-GE Havuzu",
        navLegal: "Hukuk & KVKK",
        navApply: "Ön Kayıt Başvurusu",
        navVerify: "Sertifika Sorgulama",
        navFaq: "SSS",
        navCta: "Yerinizi Ayırtın",
        navUserBtn: "Giriş Yap",
        navUserLogged: "Profilim",
        btnBackMain: "Ana Portala Dön",
        btnGoApply: "Anladım, Ön Kayıt Formuna Git",

        // Placeholders & Form Hints
        phFullName: "Örn: Ahmet Yıldız",
        phIdentity: "11 Haneli TC veya Pasaport",
        phEmail: "ahmet@example.com",
        phPhone: "+90 555 000 0000",
        phRelationSelf: "Kendisi (Ana Başvuran)",
        phRelationFamily: "Örn: Eş / Çocuk",
        phWillText: "Ölümümden sonra tespit edilecek yeni bedenime aktarılmasını istediğim banka hesapları, gayrimenkuller ve taşınır varlıkların listesi...",
        phDonateCustom: "Özel Tutar Giriniz (USD)",
        phPassword: "Örn: Ruh2026!",
        phConfirmPassword: "Şifrenizi tekrar giriniz",
        phLoginEmail: "Kayıtlı E-posta Adresiniz",
        phLoginPass: "Kullanıcı Şifreniz",
        phVerifyInput: "16 Haneli Barkod No veya 11 Haneli Enerji İzi ID",
        phAge: "Örn: 35",

        // Form Age & Gender i18n
        lblAge: "Yaş *",
        lblGender: "Cinsiyet *",
        optGenderSelect: "Cinsiyet Seçiniz",
        optGenderMale: "Erkek",
        optGenderFemale: "Kadın",
        optGenderOther: "Diğer / Belirtmek İstemiyorum",

        // Contingency Rights Succession Box (Aşama 2 & 3 Öncesi Vefat Halinde Hak Devri)
        contingencyTitle: "Aşama 2 & 3 Öncesi Vefat Halinde Hak Devri Protokolü",
        contingencyDesc: "Aşama 2 (Biyo-Enerji Kilitleme) ve Aşama 3 (Kuantum GPS Tespiti) hizmetleri aktif edilmeden önce ana başvuru sahibinin vefat etmesi durumunda ön kayıt ve öncelik hakkının devredileceği aile üyesi veya yedek hak sahibi bilgileri aşağıdadır:",
        contingencyMultiNotice: "Kayıtlı diğer aile üyeleriniz arasından hak devri yapmak istediğiniz kişi(leri) seçiniz ve devir oranlarını belirleyiniz:",
        contingencySingleNotice: "Kendiniz dışında aile üyesi kaydetmediğiniz için, vefatınız durumunda Aşama 2 & 3 öncelik haklarınızı devretmek istediğiniz 1. derece kanuni mirasçı veya yedek hak sahibini belirtiniz:",
        lblBackupHeirName: "Yedek Hak Sahibi Ad Soyad *",
        lblBackupHeirRelation: "Yakınlık / İletişim *",
        phBackupHeirName: "Örn: Mehmet Yıldız",
        phBackupHeirRelation: "Örn: Oğlu / +90 555...",

        // Auth & User Profile Modal
        loginModalTitle: "Kullanıcı Girişi",
        lblLoginEmail: "E-posta Adresi *",
        lblLoginPass: "Şifre *",
        btnLoginSubmit: "Oturum Aç",
        profileModalTitle: "Müşteri Hesabı & Protokol Profili",
        lblProfTitle: "Kayıtlı Müşteri:",
        lblProfEmail: "E-posta:",
        lblProfIdentity: "Kimlik / Pasaport:",
        lblProfHash: "Biyo-Kayıt Hash kilit ID:",
        lblProfTier: "Protokol Seviyesi:",
        lblProfStatus: "Biyo-Enerji İzi Durumu:",
        lblProfStatusVal: "KİLİTLENMEYE HAZIR (Aşama 1 Ön Kayıtlı)",
        lblProfInheritance: "Miras Escrow Tercihi:",
        lblEnergyId: "Dijital Enerji İzi ID (11 Hane):",
        lblProfBarcode: "Barkod No (16 Hane):",
        btnLogout: "Oturumu Kapat",

        // Hero
        heroTag: "Biyo-Enerji Kilitlenme & Kuantum GPS Protokolü",
        heroTitleGrad: "RUH PROJECT",
        heroSlogan: '"Ölmeden önce yerinizi ayırtın"',
        heroDesc: "İnsan bilincinin ve biyo-enerji izinin ölüm öncesinde kilitlenerek, ruhun doğal yerleşimi sonrasında yeni canlı bedende kuantum GPS aracılığıyla tespiti ve mirasa dair tüm finansal ve taşınmaz hakların hukuki sözleşmelerle yeni yaşama devredilmesi protokolü.",
        heroBtnApply: "Ücretsiz Ön Kayıt Formu",
        heroBtnExplore: "Aşamaları İncele",
        statPhase: "AR-GE ve Hukuk Altyapısı",
        statFee: "Aşama 1 Katılım Ücreti",
        statEscrow: "Sözleşmeli Miras Garantisi",
        canvasStatus: "BİYO-ENERJİ FREKANS TARAMASI",
        labelEnergyLock: "Enerji İzi Durumu:",
        statusLocked: "KİLİTLENMEYE HAZIR",
        labelGPS: "Kuantum GPS Frekansı:",

        // Phases (Roadmap Architecture Badges)
        phaseSub: "ŞEFFAFLIK İLKESİ VE PROJE YOL HARİTASI",
        phaseTitle: "Gelişim Yol Haritası",
        phaseDesc: "RUH Project üç temel evrede yürütülmektedir. Şeffaflık ilkesi gereği proje aşamaları ve katılım şartları aşağıda sunulmuştur.",
        
        phase1Badge: "AŞAMA 1 (Şu An Aktif)",
        phase1Title: "Aşama 1: Fikir, AR-GE & Ücretsiz Ön Kayıt",
        phase1Desc: "Müşteriler kişisel bilgi ve miras tercihlerini içeren formu doldurarak ücretsiz olarak ön kayıt yaptırır. Bu aşamada herhangi bir kayıt ücreti talep edilmez; biyo-fizik AR-GE ve uluslararası miras hukuku altyapısı modellenir.",
        p1Check1: "Ücretsiz Kişisel Kayıt ve Biyo-Enerji Taslağı Oluşturma",
        p1Check4: "Hukuki Beyan ve Sorumluluk Şartları Kabulü",

        phase2Badge: "AŞAMA 2 (AR-GE ve Altyapı Hazırlığı)",
        phase2Title: "Aşama 2: Biyo-Enerji Kilitleme & Escrow Sözleşmeleri",
        phase2Desc: "Teknolojik biyo-tarama donanımları ve uluslararası banka escrow sözleşmeleri devreye girer. Ön kayıt yaptıran müşterilerin ölüm öncesi hücre ve bilinç frekansı protokole kilitlenir.",
        p2Check1: "Ölüm Öncesi Hücresel Biyo-Enerji İzi Kilitleme",
        p2Check2: "Miras Devir Protokolü, Vasiyetname Şablonu Hazırlığı ve Resmi Bankacılık Escrow Tescili",
        p2Check3: "Aşama 1 sürecinde form doldurup bağış yapan sıralamaya göre önceliklendirilen kişiye özel aktivasyon",
        p2Check4: "Kuantum Şifreli Dijital Miras Kasası Kurulumu",

        phase3Badge: "AŞAMA 3 (Planlanan Evre - Beklemede)",
        phase3Title: "Aşama 3: Kuantum GPS Tespiti & Yeni Beden Tescili",
        phase3Desc: "Ruhun doğal süreçle yeni canlı bedende hayat bulmasıyla birlikte kuantum uydu ağı sinyali tespit eder. Hukuki kayyumlar marifetiyle tüm miras varlıkları resmi olarak yeni kimliğe devredilir.",
        p3Check1: "Yörünge Uyduları Destekli Kuantum GPS Yeri Tespiti",
        p3Check2: "Banka Escrow ve Gayrimenkul Devirlerinin Gerçekleştirilmesi",
        p3Check3: "Yeni Beden Kimliğine Vasiyet Şartlarının Aktarılması",
        p3Check4: "Kesintisiz Yaşam ve Varlık Sürekliliği Garantisi",

        // Transparent R&D Donation & Leaderboard Section
        donationSub: "%100 ŞEFFAFLIK İLKESİ VE AR-GE DESTEĞİ",
        donationTitle: "AR-GE ve Altyapı Bağış Havuzu",
        donationDesc: "Projenin Aşama 2 ve 3 teknolojik altyapısını hızlandırmak amacıyla bağış havuzu oluşturulmuştur. Form dolduran kullanıcılar arasında bağış yapan kişilere aktivasyon sürecinde mutlak öncelik tanınacaktır.",
        donateTargetHeader: "Şeffaf AR-GE İlerleme Durumu",
        donateRaisedLabel: "Toplanan Bağış:",
        donateTargetLabel: "Hedeflanan AR-GE Fonu:",
        donatePriorityNotice: "<strong>Öncelik Kuralı:</strong> Form dolduran kullanıcılar arasında bağış yapan kişilerin kimlikleri (gizlilik ilkesi gereği ad ve soyadın baş harfleri hariç şifrelenerek) en çok bağış yapana göre sıralanır. En yüksek bağış sahipleri Aşama 2 ve 3 hizmet aktivasyonunda 1. Derece VIP sırayı alır.",
        btnOpenDonateModal: "AR-GE Havuzuna Bağış Yap & Öncelik Kazan",
        leaderboardHeader: "Şifreli Bağışçı Sıralama Tablosu (En Yüksek Bağış Sıralaması)",
        thRank: "Sıra",
        thIdentity: "Şifreli Kimlik / İnisiyaller",
        thAmount: "Bağış Miktarı",
        thPriority: "Aktivasyon Öncelik Derecesi",

        // R&D Cost Breakdown & Funding Tiers i18n ($100M Goal)
        costBreakdownTitle: "Özet Maliyet Kalemleri ve AR-GE İhtiyacı ($100M Bütçe)",
        costItem1Title: "1. Biyo-Fizik & Kuantum Sensör Donanımı",
        costItem1Desc: "MEG / SQUID kuantum biyotarama donanımları, hücresel frekans kilitleme laboratuvarları ve temiz oda imalatı.",
        costItem1Amount: "$35,000,000 USD",
        costItem2Title: "2. Kuantum GPS & Yörünge Uydu Ağı",
        costItem2Desc: "LEO uydu bant genişliği, kuantum transponder kiralama ve nokta atışı sinyal nirengi algoritmaları.",
        costItem2Amount: "$30,000,000 USD",
        costItem3Title: "3. Uluslararası Miras Hukuku & Escrow",
        costItem3Desc: "Çoklu ülke miras devir trustları, bankacılık escrow anlaşmaları ve kuantum şifreli vasiyet kasası.",
        costItem3Amount: "$15,000,000 USD",
        costItem4Title: "4. Uzman Kadro & Operasyonel Güvenlik",
        costItem4Desc: "Kuantum fizikçileri, nörologlar, hukukçular ve siber güvenlik/ISO sertifikasyon altyapısı.",
        costItem4Amount: "$20,000,000 USD",

        fundingTiersTitle: "$100M Dolar Toplam AR-GE Fonu Kademeli Dağılım Seviyeleri",
        tier1Label: "Seviye 1 (%15 Pay): $15,000,000 USD - Uluslararası Miras Escrow Trustları & Siber Güvenlik",
        tier2Label: "Seviye 2 (%35 Pay - Toplam $50M): $35,000,000 USD - Biyo-Fizik Kuantum Sensör Donanımları & Laboratuvar İmalatı",
        tier3Label: "Seviye 3 (%50 Pay - Tam Hedef $100M): $50,000,000 USD - Kuantum GPS Yörünge Uydu Ağı & Tam Operasyon (Ana Hedef)",

        // Certificate Verification Section
        verifySub: "SİSTEM DOĞRULAMA & ORJİNAL KAYIT SORGULAMA",
        verifyTitle: "Sertifika & Barkod Doğrulama",
        verifyDesc: "R.U.H. Incorporation (Resonant Universal Heritage Inc.) tarafından düzenlenen resmi sertifikaların ve 11 haneli Dijital Enerji İzi ID'lerinin orijinalliğini 16 haneli barkod numaranız ile buradan sorgulayabilirsiniz.",
        btnVerify: "Sorgula & Doğrula",

        // Donation Modal
        donateModalTitle: "AR-GE ve Altyapı Fonuna Bağış Yap",
        lblDonorName: "Adınız ve Soyadınız (Sistemde A**** Y**** şeklinde şifrelenecektir) *",
        lblDonateAmount: "Bağış Miktarı (USD) *",
        donateModalHint: "Bağış tutarınız onaylandıktan sonra adınız ve soyadınız otomatik şifrelenerek sıralama tablosunda en yüksek tutara göre konumlandırılır ve aktivasyon önceliği tanımlanır.",
        btnConfirmDonate: "Bağışı Onayla ve Sıralamaya Gir",

        // Mechanics & Badges
        mechSub: "TEMEL İLKELER VE TEKNİK MEKANİZMA",
        mechTitle: "Nasıl Çalışır?",
        mechDesc: "Beden seçimi yapılmaz; biyo-enerji iziniz kilitlenir ve ruhun doğal yerleşimi sonrasında yeni beden kuantum GPS ile tespit edilir.",
        mechCard1Title: "1. Enerji İzi Kilitleme",
        mechCard1Desc: "Ölüm öncesinde kişinin hücre ve bilincine özel elektro-manyetik biyo-enerji frekansı taranarak dijital protokole kilitlenir. Firma veya müşteri geçilecek bedeni seçemez.",
        mechCard2Title: "2. Kuantum GPS Tespiti",
        mechCard2Desc: "Ruhun doğal süreçle yeni canlı bedende hayat bulmasıyla birlikte, kilitlenen biyo-enerji izinin yaydığı frekans sinyali sayesinde yeni bedenin konumu nokta atışı tespit edilir.",
        mechCard3Title: "3. Hukuki Miras Transferi",
        mechCard3Desc: "Belirlenen vasiyetname ve bankacılık escrow sözleşmeleri doğrultusunda, kişinin önceki yaşamındaki tüm mal varlığı ve taşınmazları resmi devir süreciyle yeni kimliğine garanti edilir.",
        badgeOptional: "İsteğe Bağlı",

        // Wizard Headers
        wizardSub: "İNTERAKTİF BAŞVURU PORTALI",
        wizardTitle: "Aşama 1 Ön Kayıt Formu",
        wizardDesc: "Formu doldurarak RUH Project Aşama 1 ücretsiz ön kayıt protokolüne katılım sağlayabilirsiniz. Şahsen veya aile üyeleriniz için ayrı kayıt oluşturabilirsiniz.",
        step1Header: "Kişisel & Aile",
        step2Header: "Protokol Kaydı",
        step3Header: "Hukuki Onay & KVKK",
        step4Header: "Miras & Vasiyet",
        step5Header: "Özet & Sertifika",

        // Wizard Step 1
        step1Title: "Adım 1: Müşteri & Aile Üyeleri Bilgi Formu",
        step1Subtitle: "Kendi bilgilerinizi doldurduktan sonra dilerseniz aile üyeleriniz için de ilave form oluşturabilirsiniz. Aşama 1 ön kaydı tamamen ücretsizdir.",
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

        // Wizard Step 2 (Single Protocol Card)
        step2Title: "Adım 2: Aşama 1 Ön Kayıt Protokolü",
        step2Subtitle: "Aşama 1 ön kayıt katılımı tamamen ücretsizdir. Bu adımda protokol kaydınız onaylanarak Aşama 2 ve 3 devreye girdiğinde öncelikli aktivasyon sıranız güvenceye alınır.",
        singleProtoTitle: "Aşama 1 Ön Kayıt Protokolü",
        singleProtoPrice: "$0 <span>/ Aşama 1 Ücretsiz Ön Kayıt</span>",
        singleProtoDesc: "Profil taslağı oluşturma, vasiyetname escrow hazırlığı ve Aşama 2 & 3 aktivasyon önceliği garantisi kapsayan resmi protokol kaydı.",
        singleFeat1: "Aşama 1 Ücretsiz Katılım Hakkı",
        singleFeat2: "Profil Taslağı",
        singleFeat3: "Aşama 2 ve 3 Hizmet Aktivasyon Sıra Garantisi",
        btnSelected: "Protokol Kaydı Aktif",
        calcFormCount: "Toplam Kayıtlı Kişi Sayısı:",
        calcSelectedTier: "Seçilen Protokol:",
        calcTotal: "Aşama 1 Katılım Ücreti:",

        // Wizard Step 3
        step3Title: "Adım 3: Hukuki Çerçeve ve KVKK Gizlilik Sözleşmesi",
        step3Subtitle: "RUH Project Aşama 1 ön kayıt kapsamında bütün sorumluluğun ve 6698 Sayılı KVKK gizlilik şartlarının kullanıcı tarafından kabul edildiğine dair resmi hukuki metin aşağıdadır.",
        contractHeader: "RUH PROJECT AŞAMA 1 ÖN KAYIT VE HUKUKİ SORUMLULUK SÖZLEŞMESİ",
        contractP1: "<strong>Madde 1 - Taraflar ve Konu:</strong> İşbu sözleşme, R.U.H. Incorporation (Resonant Universal Heritage Inc.) ('Firma') ile bu platform üzerinden ücretsiz ön kayıt formunu dolduran 'Müşteri' arasında akdedilmiştir. Konu, Aşama 1 (Fikir ve AR-GE) süreci şartlarının ve Aşama 2 & 3 öncelik haklarının belirlenmesidir.",
        contractP2: "<strong>Madde 2 - Şeffaflık ve Ücretsiz Ön Kayıt Beyanı:</strong> Müşteri, projenin mevcut durumda bir AR-GE ve fikir aşamasında olduğunu, Aşama 1 kaydının ücretsiz olduğunu ve gelecekteki hizmet aktivasyonları için sırasını güvenceye aldığını kabul eder.",
        contractP3: "<strong>Madde 3 - Beden Seçim Sınırlaması:</strong> Müşteri, sonraki yaşamında hangi canlı bedene geçeceğini kendisinin veya Firmanın seçemeyeceğini bilmekte ve kabul etmektedir. Süreç tamamen ölüm öncesi kilitlenen biyo-enerji frekansı ve kuantum GPS tespiti esasına dayanır.",
        contractP4: "<strong>Madde 4 - Sorumluluk Reddi ve Hizmet Önceliği:</strong> Müşteri, söz konusu hizmetin doğası gereği bilimsel ve hukuki AR-GE süreçlerine bağlı olduğunu, sonraki aşamalar devreye girdiğinde ön kayıtlı müşterilerin ilk ve öncelikli sıradan yararlanacağını kabul eder.",
        contractP5: "<strong>Madde 5 - 6698 Sayılı KVKK ve Gizlilik Politikası:</strong> Müşteriye ait kişisel veriler (Ad, Soyad, TC Kimlik No, İletişim Bilgileri) ve biyo-enerji profil taslağı 6698 Sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve Avrupa Genel Veri Koruma Tüzüğü (GDPR) uyumlu Post-Kuantum Şifreleme (PQC) standartlarında saklanır. Bağışçı sıralama tablosunda gizlilik prensibi gereği ad ve soyadlar şifreli gösterilir (Örn: A**** Y****). Müşteri verilerinin tescil ve doğrulanma amacıyla işlenmesini açık rızası ile kabul eder.",
        chkTermsText: "Yukarıdaki hukuki sözleşmeyi okudum, anladım ve Aşama 1 ön kayıt şartlarını ve tüm sorumluluğu kabul ediyorum. *",
        chkKvkkText: "6698 Sayılı KVKK ve Gizlilik Politikası Aydınlatma Metni'ni okudum, kişisel verilerimin, biyo-enerji taslağımın ve vasiyet bilgilerimin şifrelenerek işlenmesini onaylıyorum. *",

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

        // Wizard Step 5 & Password Registration
        step5Title: "Adım 5: Özet İnceleme & Hesap Şifresi Oluşturma",
        step5Subtitle: "Başvuru özetinizi kontrol ediniz, hesabınız için giriş şifresi belirleyiniz ve Aşama 1 ön kayıt sertifikanızı oluşturunuz.",
        revForms: "Kayıtlı Formlar:",
        revTier: "Seçilen Paket:",
        revInherit: "Miras Aktarımı:",
        revTotal: "Aşama 1 Katılım Bedeli:",
        lblCreatePassword: "Kullanıcı Şifresi Oluştur (Sosyal Medya Güvenlik Kuralları) *",
        lblConfirmPassword: "Şifreyi Tekrar Girin (Onay) *",
        payMethodTitle: "Ön Kayıt Onay Protokolü",
        payWire: "Dijital Ön Kayıt Tescili",
        payPhase2: "AŞAMA 2 (AR-GE ve Altyapı Hazırlığı)",
        payPhase3: "AŞAMA 3 (Planlanan Evre - Beklemede)",
        btnPrev: "Geri",
        btnNext: "Devam Et",
        btnSubmit: "Hesap Oluştur, Kaydı Tamamla & Sertifikayı Al",

        // Expanded FAQ (10 Questions & Answers + Expand Toggle)
        faqSub: "MERAK EDİLENLER VE TEKNİK DETAYLAR",
        faqTitle: "Sıkça Sorulan Sorular (SSS)",
        btnFaqShowAll: "Tüm Sıkça Sorulan Soruları Gör (10 Soru)",
        btnFaqShowLess: "Daha Az Göster",
        faqQ1: "Geçilecek canlı bedeni kendim seçebilir miyim?",
        faqA1: "Hayır. RUH Project sisteminde ne müşteri ne de firma geçilecek bedeni seçebilir. Ruhun doğal süreçle yeni bedene yerleşmesi sonrasında, kilitlenen biyo-enerji izi kuantum GPS sinyalleri ile otomatik olarak tespit edilir.",
        faqQ2: "Aşama 1 Ön Kayıt ücretli midir?",
        faqA2: "Hayır, Aşama 1 ön kayıt katılımı tamamen ücretsizdir. Bu aşamada form dolduran kullanıcılar biyo-enerji taslağını oluşturur ve Aşama 2 & 3 devreye girdiğinde öncelikli hizmet sırası kazanır.",
        faqQ3: "Mirasım yeni bedene hukuken nasıl aktarılacak?",
        faqA3: "Aşama 4'te doldurduğunuz vasiyetname metni ve uluslararası banka escrow protokolleri doğrultusunda, ölüm gerçekleştikten ve yeni beden kuantum GPS ile tescil edildikten sonra resmi hukuk kayyumları marifetiyle mal varlığınız devredilir.",
        faqQ4: "Aile üyelerim için ayrı form doldurmam gerekiyor mu?",
        faqA4: "Evet. Her bireyin biyo-enerji izi ve kuantum frekansı benzersiz olduğundan, form adımında eklenen her aile üyesi için ayrı form doldurularak sisteme kaydedilir ve her birine özel 11 haneli Enerji İzi ID'si ve 16 haneli Barkod No üretilir.",
        faqQ5: "Biyo-enerji izi kilitleme işlemi fiziksel bir acı veya cerrahi müdahale gerektirir mi?",
        faqA5: "Kesinlikle hayır. Biyo-tarama teknolojimiz girişimsel olmayan (non-invasive) MEG ve SQUID kuantum biyosensörleri ile çalışır. Hücresel ve beyinsel elektromanyetik frekanslar vücuda hiçbir temas veya cerrahi işlem uygulanmadan uzaktan taranarak kilitlenir.",
        faqQ6: "11 haneli Dijital Enerji İzi ID'si ve 16 haneli Barkod No ne işe yarar?",
        faqA6: "Her kayıtlı müşteriye özel olarak üretilen 11 haneli Enerji ID'si (Örn: RUH84K92M17) ve 16 haneli barkod (Örn: 8942-7109-4482-1928), kuantum GPS takibi ve R.U.H. Incorporation resmi sertifika doğrulama portalında orijinallik tescili sağlayan kriptografik kilit numaralarıdır.",
        faqQ7: "AR-GE bağış havuzuna yapılan katkılar nasıl değerlendirilir ve öncelik nasıl sağlanır?",
        faqA7: "Toplanan bağışlar %100 şeffaflık ilkesiyle 4 ana AR-GE kalemi (biyo-fizik donanımları, uydu ağı, escrow trustları ve uzman kadro) için kullanılır. Bağış yapan kullanıcılar sistemde en yüksek tutara göre sıralanarak Aşama 2 & 3 aktivasyonlarında 1. Derece VIP sırayı alır.",
        faqQ8: "Ölüm anından ruhun yeni canlı bedende tespit edilmesine kadar geçen süre ne kadardır?",
        faqA8: "Bilinç ve biyo-enerji akışı doğal biyolojik rezonansa bağlıdır. Yörünge uydularımız 7/24 küresel frekans taraması yapar ve ruh yeni bedende canlılık kazandığı an kilitli frekans sinyali sayesinde nokta atışı tespit edilir.",
        faqQ9: "Mirasımı mevcut ailem ile yeni bedenim arasında paylaştırabilir miyim?",
        faqA9: "Evet. Adım 4 vasiyetname seçeneğinde sunulan hazır şablonlar marifetiyle mal varlığınızın %100'ünü yeni bedeninize aktarabileceğiniz gibi, belirlediğiniz oranları mevcut aile üyelerinize bırakıp kalan kısmı yeni bedeninize devredebilirsiniz.",
        faqQ10: "Kişisel verilerim ve vasiyet detaylarım siber saldırılara karşı nasıl korunuyor?",
        faqA10: "Bütün biyo-profil kayıtları, finansal talimatlar ve vasiyet metinleri Post-Kuantum Şifreleme (PQC) ve ISO/IEC 27001 güvenlik standartlarında saklanır. Bağışçı sıralama tablosunda gizlilik ilkesi gereği ad ve soyadlar şifreli gösterilir (Örn: A**** Y****).",

        // Legal.html Page Specific i18n Keys
        legalPageTag: "RESMİ HUKUKİ BEYAN & PROTOKOL ŞARTLARI",
        legalPageHeading: "Hukuki Çerçeve ve Escrow Sözleşmesi",
        legalPageSub: "RUH Project kapsamında yürütülen biyo-enerji kilitleme, kuantum GPS tespiti ve uluslararası bankacılık miras escrow devirlerinin yasal çerçevesi aşağıda ayrıntılı olarak açıklanmıştır.",
        
        legalM1Title: "Madde 1 - Taraflar ve Sözleşmenin Amacı",
        legalM1P1: "İşbu sözleşme, R.U.H. Incorporation (Resonant Universal Heritage Inc.) ('Firma / Protokol Yönetimi') ile dijital portal üzerinden Aşama 1 ön kayıt formunu dolduran veya servise katılım sağlayan 'Müşteri / Kullanıcı' arasında akdedilmiştir.",
        legalM1P2: "Sözleşmenin amacı; ölüm öncesinde kilitlenen biyo-enerji frekans izinin, ölüm sonrasında kuantum GPS uyduları ile tespit edilmesi ve müşterinin önceden belirlediği miras haklarının resmi bankacılık escrow ve vasiyetname mekanizmaları marifetiyle yeni kimliğine aktarılmasının yasal sınırlarını düzenlemektir.",
        
        legalM2Title: "Madde 2 - Aşama 1 Şeffaflık Beyanı ve AR-GE Statüsü",
        legalM2P1: "Müşteri, RUH Project'in mevcut durumda bir <strong>Aşama 1 (Fikir, AR-GE ve Ücretsiz Ön Kayıt)</strong> sürecinde olduğunu açıkça beyan ve kabul eder. Aşama 1 kapsamında doldurulan formlar için müşteriden herhangi bir katılım ücreti talep edilmez.",
        legalM2Notice: "<strong>Önemli Bilgilendirme:</strong> Ön kayıt yaptıran müşteriler, Aşama 2 (Biyo-Enerji Kilitleme Donanımı) ve Aşama 3 (Kuantum GPS Tespiti) devreye girdiğinde hizmet aktivasyon önceliği kazanır. AR-GE havuzuna bağış yapan kullanıcılar en yüksek tutara göre sıralanarak 1. Derece VIP aktivasyon sırasına sahip olur.",
        
        legalM3Title: "Madde 3 - Beden Seçimi İmkânsızlığı ve Kuantum GPS İlkesi",
        legalM3P1: "Müşteri, sonraki yaşamında hangi canlı bedene (host body) aktarılacağını kendisinin veya Firmanın <strong>seçemeyeceğini</strong> bilmekte, anlamakta ve hukuken kabul etmektedir.",
        legalM3P2: "Süreç; ölüm öncesinde vücutta kilitlenen Elektro-Manyetik Biyo-Enerji Frekansı ile ruhun doğal frekans uyumu sağladığı yeni canlı beden arasındaki kuantum sinyal rezonansına dayanır. Konu tespiti yalnızca yörünge uyduları destekli Kuantum GPS ağı ile otomatik olarak gerçekleştirilir.",

        legalM4Title: "Madde 4 - Uluslararası Bankacılık Escrow ve Vasiyetname Transferi",
        legalM4Def: "<strong>Escrow Sözleşmesi Nedir?</strong> Escrow (Emanet / Güvence Hesabı Sözleşmesi), iki taraf arasındaki bir finansal veya hukuki işlemin güvenle gerçekleşmesi amacıyla varlıkların (banka hesapları, kripto varlıklar, gayrimenkuller) tarafsız bir üçüncü taraf (yediemin / uluslararası banka / hukuk trustı) tarafından dondurularak koruma altına alınması ve sözleşmedeki şart tam olarak gerçekleştiğinde hak sahibine aktarılması mekanizmasıdır.",
        legalM4StepsHeading: "Escrow Sözleşmesinin 4 Aşamalı Çalışma Protokolü:",
        legalM4Step1Title: "🔒 1. Varlıkların Kilitlenmesi (Yaşam Süresince)",
        legalM4Step1Desc: "Müşteri hayattayken vasiyetnamesini düzenler ve banka hesaplarını, gayrimenkullerini veya kripto fonlarını uluslararası anlaşmalı escrow protokolüne bağlar.",
        legalM4Step2Title: "🛡️ 2. Ölüm Sonrası Koruma (Yediemin / Banka Kasası)",
        legalM4Step2Desc: "Müşteri vefat ettiğinde varlıklar yasal olarak dondurulur. Üçüncü şahıslarca gasp edilmesi engellenir ve tarafsız bankacılık escrow hesabında güvende tutulur.",
        legalM4Step3Title: "📡 3. Şartın Gerçekleşmesi (Kuantum GPS Tespiti)",
        legalM4Step3Desc: "Escrow şartı: Ölüm öncesi kilitlenen biyo-enerji frekansının yeni canlı bedende kuantum GPS uyduları ile tespit edilip resmi olarak tescillenmesidir.",
        legalM4Step4Title: "🔑 4. Varlıkların Yeni Bedene Resmi Devri",
        legalM4Step4Desc: "Kuantum uyduları yeni bedenin konumunu doğruladığı an escrow şartı tamamlanır; resmi yasal kayyumlar marifetiyle varlıklar yeni kimliğinize aktarılır.",
        legalM4BoxTitle: "💡 Escrow Sözleşmesinin Temel Gerekliliği ve Neden Önemli Olduğu:",
        legalM4BoxLi1: "<strong>Mutlak Güvenlik Sınırı:</strong> Belirlenen kuantum GPS tescil şartı gerçekleşmeden hiçbir taraf veya 3. şahıs paraya dokunamaz.",
        legalM4BoxLi2: "<strong>Kesintisiz Varlık Sürekliliği:</strong> Eski yaşamınızdaki birikimlerinizin kaybolmadan veya el koyulmadan, yasal olarak bir sonraki canlı bedeninize aktarılmasını hukuken garanti eder.",

        legalM5Title: "Madde 5 - 6698 Sayılı KVKK, GDPR ve Gizlilik Politikası",
        legalM5P1: "<strong>Kişisel Verilerin Korunması (KVKK):</strong> Müşteriye ait kişisel veriler (Ad, Soyad, TC Kimlik No, İletişim Bilgileri, Biyo-Enerji Profil Taslağı ve Vasiyet Detayları), 6698 Sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve Avrupa Genel Veri Koruma Tüzüğü (GDPR) mevzuatına tam uyumlu olarak işlenmektedir.",
        legalM5P2: "<strong>Post-Kuantum Şifreleme (PQC):</strong> Tüm veriler ISO/IEC 27001 bilgi güvenliği standartlarında ve kuantum bilgisayar saldırılarına karşı korumalı Post-Kuantum Kriptografi algoritmalarıyla şifrelenir.",
        legalM5P3: "<strong>Şeffaf & Anonim Sıralama:</strong> Şeffaflık ilkemiz gereği bağışçı sıralama tablosunda müşterilerin ad ve soyadları varsayılan olarak kesinlikle şifrelenir (Örn: <code>A**** Y****</code>). Müşteri, kayıt adımı 3'teki KVKK kutucuğunu onaylayarak verilerinin şifrelenerek tescil edilmesine açık rıza gösterir.",

        legalM6Title: "Madde 6 - Sorumluluk Sınırlaması ve Yasal Feragat",
        legalM6P1: "RUH Project bilimsel ve hukuki AR-GE süreçlerine tabidir. Müşteri, işbu sözleşmeyi onaylayarak projenin aşamalı gelişim yapısını kabul ettiğini, Aşama 1 kayıtlarının deneysel ve hazırlık niteliğinde olduğunu kabul ve taahhüt eder.",

        // Footer
        footerDesc: "Ölüm sonrası biyo-enerji kilitleme, doğal ruh yerleşimi sonrası kuantum GPS tespiti ve miras koruma protokolü.",
        footerQuickLinks: "Hızlı Bağlantılar",
        footerLegalTitle: "Yasal Uyarı & KVKK",
        footerLegalNotice: "Bu proje Aşama 1 (AR-GE ve Fikir) evresindedir. Sunulan tüm hizmetler ve sözleşmeler 6698 Sayılı KVKK ve uluslararası hukuk çerçevesinde yürütülmekte olup, kullanıcılar gizlilik ve sorumluluk şartlarını kabul eder.",
        footerCopyright: "© 2026 R.U.H. Incorporation (Resonant Universal Heritage Inc.). Tüm Hakları Saklıdır. | 6698 Sayılı KVKK Uyumlu",
        legalFooterCopyright: "© 2026 R.U.H. Incorporation (Resonant Universal Heritage Inc.). Tüm Hakları Saklıdır. | Uluslararası Hukuki Çerçeve & GDPR",

        // Modal Certificate
        certModalTitle: "R.U.H. Incorporation (Resonant Universal Heritage Inc.) Resmi Ön Kayıt Sertifikası",
        certOfficialDoc: "AŞAMA 1 RESMİ BİYO-ENERJİ VE MİRAS ÖN KAYIT BELGESİ",
        certStamp: "PH1 APPROVED<br>R.U.H. INCORPORATION",
        btnPrint: "Sertifikayı Yazdır / PDF İndir",
        btnClose: "Kapat"
    },
    en: {
        // Meta & General
        title: "RUH Project | Bio-Energy & Soul Identification and Estate Protection Protocol",
        announcementBadge: "PHASE 1 (FREE PRE-REGISTRATION)",
        announcementText: "This portal is currently in <strong>Phase 1 (Concept, R&D & Free Pre-Registration)</strong>. Pre-registered users gain priority service activation upon Phase 2 & 3 deployment.",
        
        // Nav (Shortened navLegal to Legal & GDPR for header space)
        navAbout: "Project & Phases",
        navMechanics: "Tech & Mechanics",
        navDonations: "R&D Pool",
        navLegal: "Legal & GDPR",
        navApply: "Pre-Registration Portal",
        navVerify: "Verify Certificate",
        navFaq: "FAQ",
        navCta: "Reserve Your Place",
        navUserBtn: "Login",
        navUserLogged: "My Profile",
        btnBackMain: "Return to Main Portal",
        btnGoApply: "I Understand, Go to Pre-Registration Form",

        // Placeholders & Form Hints
        phFullName: "e.g., John Smith",
        phIdentity: "11-Digit ID or Passport",
        phEmail: "john@example.com",
        phPhone: "+1 555 000 0000",
        phRelationSelf: "Self (Primary Applicant)",
        phRelationFamily: "e.g., Spouse / Child",
        phWillText: "List of bank accounts, real estate, and digital assets to be transferred to my target host body post-transition...",
        phDonateCustom: "Enter Custom Amount (USD)",
        phPassword: "e.g., Ruh2026!",
        phConfirmPassword: "Re-enter your password",
        phLoginEmail: "Your Registered Email Address",
        phLoginPass: "Your Password",
        phVerifyInput: "16-Digit Barcode No or 11-Digit Energy ID",
        phAge: "e.g., 35",

        // Form Age & Gender i18n
        lblAge: "Age *",
        lblGender: "Gender *",
        optGenderSelect: "Select Gender",
        optGenderMale: "Male",
        optGenderFemale: "Female",
        optGenderOther: "Other / Prefer not to say",

        // Contingency Rights Succession Box (Aşama 2 & 3 Öncesi Vefat Halinde Hak Devri)
        contingencyTitle: "Succession Rights Transfer Protocol Prior to Phase 2 & 3",
        contingencyDesc: "If the primary applicant passes away before Phase 2 (Bio-Energy Lock) & Phase 3 (Quantum GPS Tracing) activation, designated succession rights and transfer percentages are established below:",
        contingencyMultiNotice: "Select family member(s) to transfer your pre-registration rights to and specify transfer percentages:",
        contingencySingleNotice: "Since no other family members were registered, designate a primary legal heir or backup contact for succession rights:",
        lblBackupHeirName: "Backup Heir Full Name *",
        lblBackupHeirRelation: "Relationship / Contact *",
        phBackupHeirName: "e.g., John Smith",
        phBackupHeirRelation: "e.g., Son / +1 555...",

        // Auth & User Profile Modal
        loginModalTitle: "User Login",
        lblLoginEmail: "Email Address *",
        lblLoginPass: "Password *",
        btnLoginSubmit: "Log In",
        profileModalTitle: "Customer Account & Protocol Profile",
        lblProfTitle: "Registered Client:",
        lblProfEmail: "Email:",
        lblProfIdentity: "National ID / Passport:",
        lblProfHash: "Bio-Signature Hash Lock ID:",
        lblProfTier: "Protocol Tier:",
        lblProfStatus: "Bio-Energy Lock Status:",
        lblProfStatusVal: "READY FOR LOCKING (Phase 1 Pre-Registered)",
        lblProfInheritance: "Inheritance Escrow Choice:",
        lblEnergyId: "Digital Energy ID (11 Chars):",
        lblProfBarcode: "Barcode No (16 Digits):",
        btnLogout: "Log Out",

        // Hero
        heroTag: "Bio-Energy Lock & Quantum GPS Protocol",
        heroTitleGrad: "RUH PROJECT",
        heroSlogan: '"Reserve your place before you die"',
        heroDesc: "A protocol locking pre-mortem bio-energy signature, detecting the host body via Quantum GPS following natural soul relocation, and legally transferring estate rights.",
        heroBtnApply: "Free Pre-Registration Form",
        heroBtnExplore: "Explore Roadmap",
        statPhase: "R&D & Legal Infrastructure",
        statFee: "Phase 1 Pre-Registration Fee",
        statEscrow: "Contractual Estate Guarantee",
        canvasStatus: "BIO-ENERGY FREQUENCY SCANNER",
        labelEnergyLock: "Energy Signature State:",
        statusLocked: "READY FOR LOCKING",
        labelGPS: "Quantum GPS Frequency:",

        // Phases (Roadmap Architecture Badges)
        phaseSub: "TRANSPARENCY & PROJECT ROADMAP",
        phaseTitle: "Development Roadmap",
        phaseDesc: "RUH Project operates under a transparent 3-phase development roadmap detailed below.",
        
        phase1Badge: "PHASE 1 (Currently Active)",
        phase1Title: "Phase 1: Concept, R&D & Free Pre-Registration",
        phase1Desc: "Clients fill out personal preferences and pre-register free of charge. No upfront fees are required during Phase 1 while biophysics R&D and legal escrow models are finalized.",
        p1Check1: "Free Personal Data Registration & Bio-Energy Profiling",
        p1Check4: "Legal Liability & Responsibility Consent Protocol",

        phase2Badge: "PHASE 2 (R&D & Infra Prep)",
        phase2Title: "Phase 2: Bio-Energy Lock & Estate Escrow",
        phase2Desc: "Deployment of bio-energy frequency scanning hardware and international banking escrow contracts. Pre-registered clients have their pre-mortem cellular signature locked into the protocol.",
        p2Check1: "Pre-Mortem Cellular Bio-Energy Signature Lock",
        p2Check2: "Inheritance Transfer Protocol, Will Drafting & Official Banking Escrow Registration",
        p2Check3: "Exclusive activation prioritized by ranking for applicants who complete the form and donate during Phase 1",
        p2Check4: "Quantum Encrypted Digital Will Vault Setup",

        phase3Badge: "PHASE 3 (Planned Phase - Standby)",
        phase3Title: "Phase 3: Quantum GPS Tracing & Host Body Verification",
        phase3Desc: "Upon natural soul presence in a new host body, orbital satellite arrays pinpoint the target vessel. Legal custodians execute the official transfer of wealth to the new identity.",
        p3Check1: "Orbital Satellite Priority Quantum GPS Location Tracing",
        p3Check2: "Execution of Banking Escrow & Real Estate Asset Transfer",
        p3Check3: "Will Terms Activation for the Identified Identity",
        p3Check4: "Seamless Life Continuity & Wealth Protection Guarantee",

        // Transparent R&D Donation & Leaderboard Section
        donationSub: "100% TRANSPARENCY & R&D SUPPORT",
        donationTitle: "R&D & Infrastructure Donation Pool",
        donationDesc: "To accelerate Phase 2 & 3 technological R&D, a transparent donation pool has been established. Donating clients receive top-tier activation priority.",
        donateTargetHeader: "Transparent R&D Funding Progress",
        donateRaisedLabel: "Total Raised:",
        donateTargetLabel: "Target R&D Goal:",
        donatePriorityNotice: "<strong>Priority Rule:</strong> Donating applicants are encrypted (names masked except initials for privacy) and sorted by contribution amount. Top donors secure 1st Class VIP Priority placement for Phase 2 & 3 service activation.",
        btnOpenDonateModal: "Donate to R&D Fund & Gain Priority",
        leaderboardHeader: "Encrypted Donor Leaderboard (Sorted by Highest Contribution)",
        thRank: "Rank",
        thIdentity: "Encrypted Identity / Initials",
        thAmount: "Contribution Amount",
        thPriority: "Activation Priority Tier",

        // R&D Cost Breakdown & Funding Tiers i18n ($100M Goal)
        costBreakdownTitle: "R&D Cost Breakdown & Infrastructure Need ($100M Budget)",
        costItem1Title: "1. Biophysics & Quantum Sensor Hardware",
        costItem1Desc: "MEG / SQUID quantum bio-scanning hardware, cellular frequency locking labs, and cleanroom fabrication.",
        costItem1Amount: "$35,000,000 USD",
        costItem2Title: "2. Quantum GPS & Orbital Satellite Network",
        costItem2Desc: "LEO satellite bandwidth, quantum transponder leasing, and precision signal triangulation algorithms.",
        costItem2Amount: "$30,000,000 USD",
        costItem3Title: "3. International Estate Escrow & Legal Framework",
        costItem3Desc: "Multi-jurisdictional estate transfer trusts, banking escrow contracts, and quantum encrypted Will vaults.",
        costItem3Amount: "$15,000,000 USD",
        costItem4Title: "4. Expert Team & Operational Security",
        costItem4Desc: "Quantum physicists, neuroscientists, legal counsel, and cybersecurity/ISO certification infrastructure.",
        costItem4Amount: "$20,000,000 USD",

        fundingTiersTitle: "$100M Total R&D Fund Phased Distribution Tiers",
        tier1Label: "Tier 1 (15% Share): $15,000,000 USD - International Estate Trusts & Cybersecurity Infrastructure",
        tier2Label: "Tier 2 (35% Share - Cumulative $50M): $35,000,000 USD - Biophysics Quantum Sensor Hardware & Cleanroom Labs",
        tier3Label: "Tier 3 (50% Share - Total Goal $100M): $50,000,000 USD - Quantum GPS Satellite Network & Full Operations (Main Goal)",

        // Certificate Verification Section
        verifySub: "SYSTEM VERIFICATION & CERTIFICATE LOOKUP",
        verifyTitle: "Certificate & Barcode Verification",
        verifyDesc: "Verify the official authenticity of certificates and 11-digit Digital Energy IDs issued by R.U.H. Incorporation (Resonant Universal Heritage Inc.) using your 16-digit barcode number.",
        btnVerify: "Lookup & Verify",

        // Donation Modal
        donateModalTitle: "Donate to R&D & Infrastructure Fund",
        lblDonorName: "Full Name (Masked as A**** Y**** for privacy) *",
        lblDonateAmount: "Donation Amount (USD) *",
        donateModalHint: "Upon confirmation, your identity will be automatically encrypted, ranked on the leaderboard by contribution amount, and assigned activation priority.",
        btnConfirmDonate: "Confirm Donation & Join Priority Rank",

        // Mechanics & Badges
        mechSub: "CORE PRINCIPLES & TECHNICAL MECHANISMS",
        mechTitle: "How It Works",
        mechDesc: "Host body selection is impossible; your bio-energy signature is locked pre-death, and your next host body is located via resonant Quantum GPS post natural relocation.",
        mechCard1Title: "1. Bio-Energy Signature Lock",
        mechCard1Desc: "Prior to death, the unique electro-magnetic frequency of the client's cellular consciousness is scanned and locked into the digital protocol. Neither the client nor RUH can select the host body.",
        mechCard2Title: "2. Quantum GPS Tracing",
        mechCard2Desc: "As consciousness naturally awakens in the new living entity, the locked bio-frequency signal allows Quantum GPS satellite arrays to pinpoint the exact location of the target host body.",
        mechCard3Title: "3. Legal Estate Escrow",
        mechCard3Desc: "Pursuant to pre-established legal trusts and banking escrow contracts, all assets, bank accounts, and real estate are legally transferred to the new identity.",
        badgeOptional: "Optional",

        // Wizard Headers
        wizardSub: "INTERACTIVE APPLICATION PORTAL",
        wizardTitle: "Phase 1 Pre-Registration Form",
        wizardDesc: "Participate in RUH Project Phase 1 free pre-registration protocol. Fill separate forms for yourself and family members.",
        step1Header: "Personal & Family",
        step2Header: "Protocol Entry",
        step3Header: "Legal Waiver & KVKK",
        step4Header: "Inheritance & Will",
        step5Header: "Review & Certificate",

        // Wizard Step 1
        step1Title: "Step 1: Applicant & Family Information Form",
        step1Subtitle: "Fill your own details first, then add optional separate forms for family members. Phase 1 pre-registration is completely free.",
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

        // Wizard Step 2 (Single Protocol Card)
        step2Title: "Step 2: Phase 1 Pre-Registration Protocol",
        step2Subtitle: "Phase 1 enrollment is completely free of charge. Your pre-registration spot will be secured for Phase 2 & 3 priority activation.",
        singleProtoTitle: "Phase 1 Pre-Registration Protocol",
        singleProtoPrice: "$0 <span>/ Phase 1 Free Pre-Registration</span>",
        singleProtoDesc: "Profile drafting and Phase 2 & 3 priority activation reservation.",
        singleFeat1: "Phase 1 Free Enrollment Spot",
        singleFeat2: "Profile Draft",
        singleFeat3: "Phase 2 & 3 Priority Service Activation Guarantee",
        btnSelected: "Protocol Entry Active",
        calcFormCount: "Total Registered Persons:",
        calcSelectedTier: "Selected Protocol:",
        calcTotal: "Phase 1 Contribution Fee:",

        // Wizard Step 3
        step3Title: "Step 3: Legal Framework & KVKK Privacy Policy",
        step3Subtitle: "Official legal contract below wherein customer assumes full liability and consents to KVKK Privacy Policy for Phase 1 R&D pre-registration.",
        contractHeader: "RUH PROJECT PHASE 1 PRE-REGISTRATION & LEGAL LIABILITY CONTRACT",
        contractP1: "<strong>Article 1 - Parties & Subject:</strong> This contract is entered into between R.U.H. Incorporation (Resonant Universal Heritage Inc.) ('Company') and the 'Client' filling out the free pre-registration form. Subject: Establishing Phase 1 (Concept & R&D) terms and Phase 2 & 3 priority rights.",
        contractP2: "<strong>Article 2 - Free Pre-Registration Disclosure:</strong> Client acknowledges that the project is currently in R&D and concept phase, Phase 1 registration is free of charge, and reserves priority for future service activations.",
        contractP3: "<strong>Article 3 - Host Body Non-Selection Limitation:</strong> Client understands and agrees that neither the Client nor Company can choose the destination living entity. The process relies strictly on pre-mortem bio-energy signature locking and Quantum GPS tracing.",
        contractP4: "<strong>Article 4 - Liability Release & Service Priority:</strong> Client agrees that due to the scientific R&D nature of the service, pre-registered clients receive priority activation rights upon Phase 2 rollout.",
        contractP5: "<strong>Article 5 - KVKK Law No. 6698 & Privacy Policy:</strong> Client personal data (Name, ID, Contact Info) and bio-profile drafts are stored under Post-Quantum Cryptography (PQC) and ISO/IEC 27001 compliant with KVKK Law No. 6698 and GDPR. Leaderboard entries display masked initials (e.g. A**** Y****) for privacy. Client provides explicit consent for data processing.",
        chkTermsText: "I have read, understood, and accept the legal contract, Phase 1 pre-registration terms, and full user liability. *",
        chkKvkkText: "I have read the KVKK Law No. 6698 Privacy Policy Disclosure, and I consent to the encrypted processing of my personal data, bio-energy profile draft, and Will details. *",

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

        // Wizard Step 5 & Password Registration
        step5Title: "Step 5: Summary Review & Password Creation",
        step5Subtitle: "Review your application summary, create your account password, and generate your Phase 1 Certificate.",
        revForms: "Registered Forms:",
        revTier: "Selected Package:",
        revInherit: "Inheritance Transfer:",
        revTotal: "Phase 1 Contribution Fee:",
        lblCreatePassword: "Create Account Password (Social Media Security Rules) *",
        lblConfirmPassword: "Confirm Password *",
        payMethodTitle: "Pre-Registration Protocol Approval",
        payWire: "Digital Pre-Registration Entry",
        payPhase2: "PHASE 2 (R&D & Infra Prep)",
        payPhase3: "PHASE 3 (Planned Phase - Standby)",
        btnPrev: "Geri",
        btnNext: "Devam Et",
        btnSubmit: "Create Account, Complete & Get Certificate",

        // Expanded FAQ (10 Questions & Answers + Expand Toggle)
        faqSub: "TECHNICAL DETAILS & FREQUENTLY ASKED QUESTIONS",
        faqTitle: "Frequently Asked Questions (FAQ)",
        btnFaqShowAll: "View All FAQ Questions (10 Questions)",
        btnFaqShowLess: "Show Less",
        faqQ1: "Can I choose which living host body I will transfer to?",
        faqA1: "No. Neither the client nor RUH Project can select the host body. The bio-energy signature locked before death naturally resonates with the target host body, which is automatically pinpointed via Quantum GPS signals.",
        faqQ2: "Is Phase 1 Pre-Registration free?",
        faqA2: "Yes! Phase 1 pre-registration is 100% free of charge. Users filling out the form create their bio-energy draft profile and secure first-tier priority placement for Phase 2 & 3 activation.",
        faqQ3: "How will my inheritance be legally transferred to the new host body?",
        faqA3: "Pursuant to your Will draft and international banking escrow agreements, once death occurs and the new host body's location is verified via Quantum GPS, legal escrow executors transfer the assets.",
        faqQ4: "Do I need to fill a separate form for each family member?",
        faqA4: "Yes. Since every individual possesses a unique bio-energy frequency, a separate form is filled and registered for each added family member, issuing a unique 11-digit Energy ID and 16-digit Barcode for each.",
        faqQ5: "Does the bio-energy signature locking procedure require any physical pain or surgical intervention?",
        faqA5: "Absolutely not. Our bio-scanning technology utilizes non-invasive MEG and SQUID quantum biosensors. Electro-magnetic brain and cellular frequencies are captured remotely without any physical contact or surgery.",
        faqQ6: "What is the purpose of the 11-digit Digital Energy ID and 16-digit Barcode No?",
        faqA6: "The 11-digit Energy ID (e.g. RUH84K92M17) and 16-digit barcode (e.g. 8942-7109-4482-1928) generated uniquely for each client act as cryptographic keys for Quantum GPS tracking and official verification on the R.U.H. Incorporation portal.",
        faqQ7: "How are contributions to the transparent R&D donation pool allocated?",
        faqA7: "Donations are 100% transparently allocated across 4 main R&D items (biophysics hardware, satellite arrays, legal escrow trusts, and security). Donating clients gain 1st Class VIP priority placement for Phase 2 & 3 activation.",
        faqQ8: "How long does it take from the moment of death to detect the consciousness in the new host body?",
        faqA8: "Consciousness rebirth resonance depends on biological cellular activation. Our LEO satellite network scans global bio-frequencies 24/7 to pinpoint the host body instantly upon signal emission.",
        faqQ9: "Can I split my inheritance between my current family and my new host body?",
        faqA9: "Yes. Using the Will templates provided in Step 4, clients can allocate 100% to the new body, or split designated percentages to existing family members while transferring the remainder to the new identity.",
        faqQ10: "How are my personal data and Will details protected against cyber threats?",
        faqA10: "All bio-profiles, financial directives, and contract details are encrypted under Post-Quantum Cryptography (PQC) and ISO/IEC 27001 standards. Leaderboard data displays initials only (e.g. A**** Y****).",

        // Legal.html Page Specific i18n Keys
        legalPageTag: "OFFICIAL LEGAL DISCLAIMER & PROTOCOL TERMS",
        legalPageHeading: "Legal Framework & Escrow Contract",
        legalPageSub: "The legal framework governing bio-energy locking, Quantum GPS host body tracing, and international banking estate escrow transfers executed under RUH Project is detailed below.",
        
        legalM1Title: "Article 1 - Parties & Contract Purpose",
        legalM1P1: "This contract is entered into between R.U.H. Incorporation (Resonant Universal Heritage Inc.) ('Company / Protocol Management') and the 'Client / User' filling out the Phase 1 pre-registration form or accessing the portal.",
        legalM1P2: "The purpose of this agreement is to define the legal scope of pre-mortem bio-energy signature locking, post-mortem Quantum GPS host body verification, and the execution of designated estate rights via official banking escrow and Will mechanisms.",
        
        legalM2Title: "Article 2 - Phase 1 Transparency Disclosure & R&D Status",
        legalM2P1: "Client explicitly acknowledges and agrees that RUH Project is currently in a <strong>Phase 1 (Concept, R&D & Free Pre-Registration)</strong> stage. No registration fees are collected for forms submitted during Phase 1.",
        legalM2Notice: "<strong>Important Notice:</strong> Pre-registered clients secure priority service activation rights upon deployment of Phase 2 (Bio-Energy Lock Hardware) and Phase 3 (Quantum GPS Tracing). Donating applicants are sorted by contribution amount to receive 1st Class VIP Priority placement.",
        
        legalM3Title: "Article 3 - Host Body Non-Selection Limitation & Quantum GPS Principle",
        legalM3P1: "Client understands, acknowledges, and legally accepts that neither the Client nor Company can <strong>choose or select</strong> which living host body the consciousness will transfer to post-transition.",
        legalM3P2: "The process relies strictly on quantum signal resonance between the pre-mortem electro-magnetic bio-energy frequency and the newly born entity providing natural frequency harmony. Location tracing is performed autonomously via orbital satellite Quantum GPS arrays.",

        legalM4Title: "Article 4 - International Banking Escrow & Estate Transfer",
        legalM4Def: "<strong>What is an Escrow Agreement?</strong> An Escrow contract is a financial and legal arrangement where assets (bank accounts, crypto, real estate) are frozen and held in trust by a neutral third party (escrowee / international bank / legal trust) until specified contract conditions are fully satisfied, whereupon assets are released to the beneficiary.",
        legalM4StepsHeading: "4-Stage Escrow Protocol Workflow:",
        legalM4Step1Title: "🔒 1. Asset Locking (During Lifetime)",
        legalM4Step1Desc: "Client drafts their Will and links bank accounts, real estate, or crypto funds to the international banking escrow protocol during their lifetime.",
        legalM4Step2Title: "🛡️ 2. Post-Mortem Asset Protection (Neutral Escrow Trust)",
        legalM4Step2Desc: "Upon death, assets are legally frozen to prevent unauthorized third-party seizure, remaining safely held in the neutral banking escrow trust.",
        legalM4Step3Title: "📡 3. Condition Fulfillment (Quantum GPS Tracing)",
        legalM4Step3Desc: "Escrow release condition: Verifying and registering the locked bio-energy signature in the new host body via Quantum GPS satellite tracking.",
        legalM4Step4Title: "🔑 4. Legal Asset Transfer to New Identity",
        legalM4Step4Desc: "Once Quantum GPS confirms host body location, escrow terms are fulfilled and official legal custodians execute the transfer of wealth to your new identity.",
        legalM4BoxTitle: "💡 Fundamental Necessity & Importance of Escrow Contracts:",
        legalM4BoxLi1: "<strong>Absolute Security Boundary:</strong> No party or third person can access funds until the designated Quantum GPS verification condition is met.",
        legalM4BoxLi2: "<strong>Seamless Wealth Continuity:</strong> Legally guarantees that assets from your prior life are preserved and seamlessly transferred to your next living identity without loss or seizure.",

        legalM5Title: "Article 5 - KVKK Law No. 6698, GDPR & Privacy Policy",
        legalM5P1: "<strong>Data Protection (KVKK & GDPR):</strong> Client personal data (Name, ID, Contact Info, Bio-Energy Profile Draft, Will Details) are processed in full compliance with Turkish KVKK Law No. 6698 and European General Data Protection Regulation (GDPR).",
        legalM5P2: "<strong>Post-Quantum Cryptography (PQC):</strong> All data is encrypted under ISO/IEC 27001 security standards and post-quantum cryptographic algorithms resilient against quantum computer decryption.",
        legalM5P3: "<strong>Transparent & Masked Ranking:</strong> Pursuant to our transparency policy, donor leaderboard entries strictly mask client names (e.g. <code>A**** Y****</code>). Client provides explicit consent for data processing by checking the KVKK consent box in Step 3.",

        legalM6Title: "Article 6 - Limitation of Liability & Legal Waiver",
        legalM6P1: "RUH Project is subject to ongoing scientific R&D and legal trust frameworks. By approving this contract, client agrees to the phased development roadmap and acknowledges that Phase 1 registrations represent experimental and preliminary enrollment.",

        // Footer
        footerDesc: "Post-mortem bio-energy locking, Quantum GPS host body tracing following natural soul relocation, and legal estate escrow protocol.",
        footerQuickLinks: "Quick Links",
        footerLegalTitle: "Legal Disclaimer & KVKK",
        footerLegalNotice: "This project is currently in Phase 1 (Concept & R&D). All services and contracts are governed under KVKK Law No. 6698 and international legal frameworks; clients accept privacy and responsibility terms.",
        footerCopyright: "© 2026 R.U.H. Incorporation (Resonant Universal Heritage Inc.). All Rights Reserved. | GDPR & KVKK Compliant",
        legalFooterCopyright: "© 2026 R.U.H. Incorporation (Resonant Universal Heritage Inc.). All Rights Reserved. | International Legal Framework & GDPR",

        // Modal Certificate
        certModalTitle: "R.U.H. Incorporation (Resonant Universal Heritage Inc.) Official Pre-Registration Certificate",
        certOfficialDoc: "PHASE 1 OFFICIAL BIO-ENERGY & INHERITANCE REGISTRATION CERTIFICATE",
        certStamp: "PH1 APPROVED<br>R.U.H. INCORPORATION",
        btnPrint: "Print Certificate / Download PDF",
        btnClose: "Close"
    }
};

let currentLanguage = 'tr';
const listeners = [];

export function getCurrentLang() {
    return currentLanguage;
}

export function getTranslation(key) {
    return translations[currentLanguage]?.[key] || key;
}

export function onLanguageChange(fn) {
    listeners.push(fn);
}

export function switchLanguage(lang) {
    currentLanguage = lang;
    document.body.className = `lang-${lang}`;
    document.documentElement.lang = lang;
    
    const langLabel = document.getElementById('langCurrentLabel');
    if (langLabel) langLabel.textContent = lang.toUpperCase();

    const dict = translations[lang];
    if (!dict) return;

    if (dict.title) document.title = dict.title;

    // Update innerHTML
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            el.innerHTML = dict[key];
        }
    });

    // Update Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (dict[key]) {
            el.placeholder = dict[key];
        }
    });

    listeners.forEach(fn => fn(lang));
}
