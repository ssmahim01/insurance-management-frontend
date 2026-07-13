export const siteConfig = {
  name: "Shurokkha",
  fullName: "Shurokkha Bangladesh",
  description:
    "Affordable health, life, and disability micro-insurance with tele-doctor consultations, cashless hospital network, and discount partners across Bangladesh.",
  url: "https://www.shurokkha.com.bd",

  phone: "09610500599",
  whatsapp: "+8809610500599",
  email: "support@shurokkha.com.bd",

  address: {
    street: "House 12, Road 7, Banani",
    city: "Dhaka",
    postalCode: "1213",
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
} as const;

export type SiteConfig = typeof siteConfig;