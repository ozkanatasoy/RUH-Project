/**
 * RUH PROJECT - i18n Translation Module
 * Handles bilingual state (TR / EN) and dynamic DOM updates for Roadmap Architecture, Transparent Donation Pool, Single Protocol Card, Certificate Verification Portal & Expanded FAQ.
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
        navDonations: "Şeffaf AR-GE Havuzu",
        navLegal: "Hukuki Çerçeve",
        navApply: "Ön Kayıt Başvurusu",
        navVerify: "Sertifika Sorgulama",
        navFaq: "SSS",
        navCta: "Yerinizi Ayırtın",
        navUserBtn: "Giriş Yap",
        navUserLogged: "Profilim",

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

        fundingTiersTitle: "Tavsiye Edilen AR-GE Bağış Hedef Seviyeleri",
        tier1Label: "Seviye 1: $5,000,000 USD - Prototip & Yasal Sözleşme Altyapısı",
        tier2Label: "Seviye 2: $25,000,000 USD - Donanım Üretimi & Uydu Entegrasyonu",
        tier3Label: "Seviye 3: $100,000,000 USD - Tam Ölçekli Küresel AR-GE & Escrow Ağı (Ana Hedef)",

        // Certificate Verification Section
        verifySub: "SİSTEM DOĞRULAMA & ORJİNAL KAYIT SORGULAMA",
        verifyTitle: "Sertifika & Barkod Doğrulama",
        verifyDesc: "R.U.H. Incorporation tarafından düzenlenen resmi sertifikaların ve 11 haneli Dijital Enerji İzi ID'lerinin orijinalliğini 16 haneli barkod numaranız ile buradan sorgulayabilirsiniz.",
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
        step3Header: "Hukuki Onay",
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
        step3Title: "Adım 3: Hukuki Çerçeve ve Sorumluluk Sözleşmesi",
        step3Subtitle: "RUH Project Aşama 1 ön kayıt kapsamında bütün sorumluluğun kullanıcı tarafından kabul edildiğine dair resmi hukuki metin aşağıdadır.",
        contractHeader: "RUH PROJECT AŞAMA 1 ÖN KAYIT VE HUKUKİ SORUMLULUK SÖZLEŞMESİ",
        contractP1: "<strong>Madde 1 - Taraflar ve Konu:</strong> İşbu sözleşme, RUH Project ('Firma') ile bu platform üzerinden ücretsiz ön kayıt formunu dolduran 'Müşteri' arasında akdedilmiştir. Konu, Aşama 1 (Fikir ve AR-GE) süreci şartlarının ve Aşama 2 & 3 öncelik haklarının belirlenmesidir.",
        contractP2: "<strong>Madde 2 - Şeffaflık ve Ücretsiz Ön Kayıt Beyanı:</strong> Müşteri, projenin mevcut durumda bir AR-GE ve fikir aşamasında olduğunu, Aşama 1 kaydının ücretsiz olduğunu ve gelecekteki hizmet aktivasyonları için sırasını güvenceye aldığını kabul eder.",
        contractP3: "<strong>Madde 3 - Beden Seçim Sınırlaması:</strong> Müşteri, sonraki yaşamında hangi canlı bedene geçeceğini kendisinin veya Firmanın seçemeyeceğini bilmekte ve kabul etmektedir. Süreç tamamen ölüm öncesi kilitlenen biyo-enerji frekansı ve kuantum GPS tespiti esasına dayanır.",
        contractP4: "<strong>Madde 4 - Sorumluluk Reddi:</strong> Müşteri, söz konusu hizmetin doğası gereği bilimsel ve hukuki AR-GE süreçlerine bağlı olduğunu, sonraki aşamalar devreye girdiğinde ön kayıtlı müşterilerin ilk ve öncelikli sıradan yararlanacağını kabul eder.",
        chkTermsText: "Yukarıdaki hukuki sözleşmeyi okudum, anladım ve Aşama 1 ön kayıt şartlarını ve tüm sorumluluğu kabul ediyorum. *",

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

        // Expanded FAQ (10 Questions & Answers)
        faqSub: "MERAK EDİLENLER VE TEKNİK DETAYLAR",
        faqTitle: "Sıkça Sorulan Sorular (SSS)",
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

        // Footer
        footerDesc: "Ölüm sonrası biyo-enerji kilitleme, doğal ruh yerleşimi sonrası kuantum GPS tespiti ve miras koruma protokolü.",
        footerQuickLinks: "Hızlı Bağlantılar",
        footerLegalTitle: "Yasal Uyarı",
        footerLegalNotice: "Bu proje Aşama 1 (AR-GE ve Fikir) evresindedir. Sunulan tüm hizmetler ve sözleşmeler uluslararası hukuk çerçevesinde yürütülmekte olup, kullanıcılar sorumluluk şartlarını kabul eder.",

        // Modal Certificate
        certModalTitle: "R.U.H. Incorporation Resmi Ön Kayıt Sertifikası",
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
        
        // Nav
        navAbout: "Project & Phases",
        navMechanics: "Tech & Mechanics",
        navDonations: "Transparent R&D Pool",
        navLegal: "Legal Framework",
        navApply: "Pre-Registration Portal",
        navVerify: "Verify Certificate",
        navFaq: "FAQ",
        navCta: "Reserve Your Place",
        navUserBtn: "Login",
        navUserLogged: "My Profile",

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

        fundingTiersTitle: "Target R&D Funding Progress Tiers",
        tier1Label: "Tier 1: $5,000,000 USD - Prototype & Legal Contract Infrastructure",
        tier2Label: "Tier 2: $25,000,000 USD - Hardware Manufacturing & Satellite Integration",
        tier3Label: "Tier 3: $100,000,000 USD - Full-Scale Global R&D & Escrow Network (Main Goal)",

        // Certificate Verification Section
        verifySub: "SYSTEM VERIFICATION & CERTIFICATE LOOKUP",
        verifyTitle: "Certificate & Barcode Verification",
        verifyDesc: "Verify the official authenticity of certificates and 11-digit Digital Energy IDs issued by R.U.H. Incorporation using your 16-digit barcode number.",
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
        step3Header: "Legal Waiver",
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
        step3Title: "Step 3: Legal Framework & Responsibility Agreement",
        step3Subtitle: "Official legal contract below wherein customer assumes full liability for Phase 1 R&D pre-registration.",
        contractHeader: "RUH PROJECT PHASE 1 PRE-REGISTRATION & LEGAL LIABILITY CONTRACT",
        contractP1: "<strong>Article 1 - Parties & Subject:</strong> This contract is entered into between RUH Project ('Company') and the 'Client' filling out the free pre-registration form. Subject: Establishing Phase 1 (Concept & R&D) terms and Phase 2 & 3 priority rights.",
        contractP2: "<strong>Article 2 - Free Pre-Registration Disclosure:</strong> Client acknowledges that the project is currently in R&D and concept phase, Phase 1 registration is free of charge, and reserves priority for future service activations.",
        contractP3: "<strong>Article 3 - Host Body Non-Selection Limitation:</strong> Client understands and agrees that neither the Client nor Company can choose the destination living entity. The process relies strictly on pre-mortem bio-energy signature locking and Quantum GPS tracing.",
        contractP4: "<strong>Article 4 - Liability Release:</strong> Client agrees that due to the scientific R&D nature of the service, pre-registered clients receive priority activation rights upon Phase 2 rollout.",
        chkTermsText: "I have read, understood, and accept the legal contract, Phase 1 pre-registration terms, and full user liability. *",

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

        // Expanded FAQ (10 Questions & Answers)
        faqSub: "TECHNICAL DETAILS & FREQUENTLY ASKED QUESTIONS",
        faqTitle: "Frequently Asked Questions (FAQ)",
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

        // Footer
        footerDesc: "Post-mortem bio-energy locking, Quantum GPS host body tracing following natural soul relocation, and legal estate escrow protocol.",
        footerQuickLinks: "Quick Links",
        footerLegalTitle: "Legal Disclaimer",
        footerLegalNotice: "This project is currently in Phase 1 (Concept & R&D). All services and contracts are governed under international legal frameworks; clients accept responsibility terms.",

        // Modal Certificate
        certModalTitle: "R.U.H. Incorporation Official Pre-Registration Certificate",
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
