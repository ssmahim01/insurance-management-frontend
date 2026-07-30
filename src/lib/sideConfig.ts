export const siteConfig = {
  name: "Surokkha Health",
  fullName: "Surokkha Health Bangladesh",
  description:
    "Affordable health, life, and disability micro-insurance with tele-doctor consultations, cashless hospital network, and discount partners across Bangladesh.",
  url: "https://www.surokkhahealth.com",

  phone: "09639444274",
  whatsapp: "01350775021",
  email: "info@surokkhahealth.com",

  address: {
    street: "House#304, Road#04, Avenue#04, Mirpur DOHS.",
    city: "Dhaka",
    postalCode: "1216",
    country: "Bangladesh",
  },

  // Used for embedding a Google Map on the contact page
  coordinates: {
    lat: 23.7936,
    lng: 90.4043,
  },

  social: {
    facebook: "https://facebook.com/shurokkhabd",
    linkedin: "https://linkedin.com/company/shurokkha",
    youtube: "https://youtube.com/@shurokkhabd",
  },

  supportHours: "Sunday–Thursday, 9:00 AM – 6:00 PM",
  website: "https://surokkhahealth.com"
} as const;

export type SiteConfig = typeof siteConfig;