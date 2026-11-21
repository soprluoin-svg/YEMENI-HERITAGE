export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const sceneIds = [
  "opening",
  "ibex",
  "bab-al-yemen",
  "dar-al-hajar",
  "coffee",
] as const;
export type SceneId = (typeof sceneIds)[number];

export function isLocale(value: string): value is Locale {
  return locales.some((locale) => value === locale);
}

export const localePaths: Record<Locale, string> = { en: "/", ar: "/ar" };

export const contactUrl = "https://github.com/soprluoin-svg";

type Chapter = {
  id: Exclude<SceneId, "opening" | "coffee">;
  category: string;
  title: string;
  description: string;
};

type ExhibitionCopy = {
  title: string;
  edition: string;
  description: string;
  chaptersLabel: string;
  skip: string;
  menu: string;
  closeMenu: string;
  navigation: Record<SceneId, string>;
  opening: {
    place: string;
    headline: string;
    emphasis: string;
    explore: string;
    scroll: string;
  };
  preview: {
    caption: string;
    open: string;
    close: string;
    loading: string;
    failed: string;
    coffeeReview: string;
    tree: string;
    palace: string;
    rotate: string;
    float: string;
  };
  placeholder: string;
  heroPlaceholder: string;
  ibexImageDescription: string;
  chapters: readonly Chapter[];
  coffee: {
    category: string;
    title: string;
    description: string;
    placeholder: string;
  };
  finale: { heading: string; contact: string; back: string };
};

export const exhibitionCopy = {
  en: {
    title: "Yemeni Heritage",
    edition: "Copper & Coffee Edition",
    description:
      "An immersive journey through heritage, architecture, and digital craftsmanship.",
    chaptersLabel: "Exhibition chapters",
    skip: "Skip to exhibition",
    menu: "Open navigation",
    closeMenu: "Close navigation",
    navigation: {
      opening: "Opening",
      ibex: "The Ibex",
      "bab-al-yemen": "Bab Al-Yemen",
      "dar-al-hajar": "Dar Al-Hajar",
      coffee: "Coffee",
    },
    opening: {
      place: "Yemen",
      headline: "A Legacy",
      emphasis: "in Motion.",
      explore: "Explore the exhibition",
      scroll: "Scroll to explore",
    },
    preview: {
      caption: "Exhibition model",
      coffeeReview: "Sculpted coffee studies · Awaiting review",
      tree: "Dragon Blood Tree",
      palace: "Dar Al-Hajar",
      rotate: "Rotate",
      float: "Float",
      open: "View in 3D",
      close: "Close 3D view",
      loading: "Loading 3D view…",
      failed: "The 3D view is unavailable. The static view is still available.",
    },
    placeholder: "3D asset pending",
    heroPlaceholder: "Ibex reference · 3D model pending",
    ibexImageDescription:
      "A copper ibex sculpture with a ridged, curling horn and one raised foreleg.",
    chapters: [
      {
        id: "ibex",
        category: "Ancient sculpture",
        title: "The Yemeni Ibex",
        description:
          "A sweeping horn and a lifted foreleg give the ancient Yemeni ibex its distinctive silhouette. In this gallery, aged copper will bring the sculpture’s profile and engraved details into relief.",
      },
      {
        id: "bab-al-yemen",
        category: "The old city of Sana’a",
        title: "Bab Al-Yemen",
        description:
          "Bab Al-Yemen opens into the old city of Sana’a. The gateway’s towers, arched passage and ornamented windows set the scale for an architectural study in warm sandstone and bronze.",
      },
      {
        id: "dar-al-hajar",
        category: "Wadi Dhahr",
        title: "Dar Al-Hajar",
        description:
          "The Rock Palace rises in tiers from its massive stone foundation. Pale gypsum frames the windows, tracing the rhythm of the masonry against the muted tones of the valley.",
      },
    ],
    coffee: {
      category: "The coffee ritual",
      title: "Grounded in Yemen.",
      description:
        "From Yemen’s mountain terraces to the port of Mocha, coffee carried the character of a place far beyond its borders.",
      placeholder: "Coffee bean studies · Development placeholders",
    },
    finale: {
      heading: "Let’s make something memorable.",
      contact: "Get in touch on GitHub",
      back: "Back to opening",
    },
  },
  ar: {
    title: "تراث اليمن",
    edition: "إصدار النحاس والقهوة",
    description: "رحلة غامرة عبر التراث والعمارة والحِرفة الرقمية.",
    chaptersLabel: "فصول المعرض",
    skip: "انتقل إلى المعرض",
    menu: "افتح قائمة التنقّل",
    closeMenu: "أغلق قائمة التنقّل",
    navigation: {
      opening: "المطلع",
      ibex: "الوعل",
      "bab-al-yemen": "باب اليمن",
      "dar-al-hajar": "دار الحجر",
      coffee: "القهوة",
    },
    opening: {
      place: "اليمن",
      headline: "إرثٌ",
      emphasis: "ينبض بالحركة.",
      explore: "استكشف المعرض",
      scroll: "مرّر لاستكشاف المعرض",
    },
    preview: {
      caption: "نموذج المعرض",
      coffeeReview: "دراسات منحوتة لحبّتَي القهوة · بانتظار المراجعة",
      tree: "شجرة دم الأخوين",
      palace: "دار الحجر",
      rotate: "دوّر",
      float: "التعويم",
      open: "اعرض النموذج الثلاثي الأبعاد",
      close: "أغلق العرض الثلاثي الأبعاد",
      loading: "جارٍ تحميل العرض الثلاثي الأبعاد…",
      failed: "تعذّر تشغيل العرض الثلاثي الأبعاد. العرض الثابت متاح.",
    },
    placeholder: "النموذج الثلاثي الأبعاد قيد الإعداد",
    heroPlaceholder: "صورة مرجعية للوعل · النموذج قيد الإعداد",
    ibexImageDescription:
      "منحوتة وعل نحاسية ذات قرن مقوّس ومحزّز وساق أمامية مرفوعة.",
    chapters: [
      {
        id: "ibex",
        category: "النحت القديم",
        title: "الوعل اليمني",
        description:
          "يمنح القرن المقوّس والساق الأمامية المرفوعة الوعل اليمني القديم هيئته المميزة. سيُبرز النحاس المعتّق في هذا المشهد ملامح المنحوتة وتفاصيل النقش.",
      },
      {
        id: "bab-al-yemen",
        category: "صنعاء القديمة",
        title: "باب اليمن",
        description:
          "يفضي باب اليمن إلى مدينة صنعاء القديمة. وتشكّل أبراجه وممرّه المقوّس ونوافذه المزخرفة أساس دراسة معمارية بألوان الحجر الرملي والبرونز.",
      },
      {
        id: "dar-al-hajar",
        category: "وادي ظهر",
        title: "دار الحجر",
        description:
          "يرتفع دار الحجر بطبقاته المتدرّجة فوق كتلة صخرية ضخمة. ويحيط الجص الفاتح بالنوافذ، مبرزًا إيقاع البناء الحجري وسط ألوان الوادي الهادئة.",
      },
    ],
    coffee: {
      category: "طقوس القهوة",
      title: "جذورها في اليمن.",
      description:
        "من مدرّجات اليمن الجبلية إلى ميناء المخا، حملت القهوة طابع المكان إلى ما وراء حدوده.",
      placeholder: "دراسة لِحبّتَي قهوة · مجسّمات مؤقتة للتطوير",
    },
    finale: {
      heading: "لنصنع معًا شيئًا يبقى في الذاكرة.",
      contact: "تواصل عبر GitHub",
      back: "العودة إلى المطلع",
    },
  },
} satisfies Record<Locale, ExhibitionCopy>;
