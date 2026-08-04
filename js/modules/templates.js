/**
 * RUH PROJECT - Will Templates Module
 * Provides ready-to-use testament & estate transfer directive drafts.
 */

export const templates = {
    tpl1_tr: "VASİYETNAME VE TAM MİRAS DEVİR TALİMATI:\n\nÖlümüm gerçekleştikten sonra RUH Project biyo-enerji kilitleme protokolü çerçevesinde tespit edilen yeni canlı bedenime, tarafıma ait tüm banka mevduatlarımın, gayrimenkullerimin, hisse senetlerimin ve dijital varlıklarımın %100 oranında eksiksiz devredilmesini resmi escrow kanalları vasıtasıyla talep ediyorum.",
    tpl1_en: "WILL & FULL ESTATE TRANSFER DIRECTIVE:\n\nUpon my death, I instruct that 100% of my bank deposits, real estate properties, equities, and digital assets be legally transferred via official escrow trusts to my identified next living host body registered under the RUH Project bio-energy protocol.",
    
    tpl2_tr: "PAYLAŞMALI MİRAS DEVİR TALİMATI:\n\nÖlümümden sonra tespit edilecek yeni bedenime varlığımın %50'sinin aktarılmasını; kalan %50'lik kısmın ise kanuni mirasçılarıma / belirttiğim vakıflara devredilmesini talep ediyorum.",
    tpl2_en: "SPLIT ESTATE TRANSFER DIRECTIVE:\n\nUpon my death, I direct that 50% of my total estate be transferred to my identified next living host body, and the remaining 50% be distributed to my legal heirs and designated charitable foundations.",
    
    tpl3_tr: "KRİPTO VE TAŞINMAZ VASIYET KASASI:\n\nÖlümüm sonrasında tüm soğuk cüzdan kripto varlıklarımın ve gayrimenkul tapularımın kuantum şifreli kilitli kasadan tespit edilecek yeni beden kimliğime 18 yaşına ulaştığında devredilmesini onaylıyorum.",
    tpl3_en: "CRYPTOGRAPHIC & REAL ESTATE VAULT DIRECTIVE:\n\nUpon my death, I direct that all cold-wallet cryptographic assets and real estate titles held in quantum escrow be released to my identified next host body upon reaching the age of 18."
};

export function getWillTemplate(templateId, lang) {
    const key = `${templateId}_${lang}`;
    return templates[key] || '';
}
