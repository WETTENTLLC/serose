export const SEROSE_CONFIG = {
  // Preferred: use the Google Form formResponse endpoint and entry mappings below.
  // Example: https://docs.google.com/forms/d/e/FORM_ID/formResponse
  googleFormAction: 'https://docs.google.com/forms/d/e/1FAIpQLSc1gG3jt6PVqdVX8CZL18EvSa8yUDVEly4USaSzUFhK30b-5Q/formResponse',
  googleFormEntries: {
    name: 'entry.1496015927',
    phone: 'entry.486025268',
    email: 'entry.1267767266',
    date: 'entry.409454652',
    occasion: 'entry.1358893425',
    groupSize: 'entry.1661612634',
    nightlifeExperience: 'entry.1724796981',
    preferredVibe: 'entry.1361785697',
    daytimeExperiences: 'entry.880764520',
    budgetPerPerson: 'entry.137823471',
    golfInterest: 'entry.2078384875',
    dinnerInterest: 'entry.1801696310',
    transportationNeeded: 'entry.1524479471',
    vipTableInterest: 'entry.694484683',
    hotel: 'entry.830975444',
    notes: 'entry.1705949826',
    ageAcknowledgment: 'entry.592991170',
    privacyConsent: 'entry.966176397',
    serviceAvailabilityAcknowledgment: 'entry.198361528',
    guestConductAgreement: 'entry.610627222',
  },

  // Optional fallback if Google Forms is not configured.
  // formEndpoint: 'https://formspree.io/f/abcdwxyz',
  formEndpoint: '',

  // Optional fallback contact details shown on the site.
  contactEmail: 'seroselifestyle@gmail.com',
  contactPhone: '',
  instagram: '',

  // Public PayPal client ID. Checkout remains disabled until pricing,
  // deposits, refunds, and server-side order verification are finalized.
  paypalClientId: 'BAAJ9kHlXUaEWT6JUhtSwJ79QPgF64n7UkLkhPvPLwx7IiC_Hf64fNT5Aw5rilQgPJ4jZNwRy7vFPcOGtQ',
}
