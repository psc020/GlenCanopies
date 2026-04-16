import type { Testimonial } from "@/types/testimonial";

// Server-side fallback snapshot from the live review feed.
// This keeps testimonials available even if the external API is unavailable.
export const testimonials: Testimonial[] = [
  {
    id: "10232521145957173",
    name: "Paul Evans",
    quote: "Just got two canopies fitted by the boys brilliant job and looks amazing",
    date: "2026-02-26T10:15:22.000Z",
    dateLabel: "February 2026",
    sourceLabel: "Facebook recommendation",
    sourceUrl:
      "https://www.facebook.com/paul.evans.3344/posts/pfbid02JpYbqcvnwRtFGHpRiPGweE3b924oupnWT9MBCpsecP5ZnioUQ366T2hLTKkqJkQHl",
    avatarSrc:
      "https://scontent-ord5-2.xx.fbcdn.net/v/t39.30808-1/453966732_10226185225643125_3704194390845062315_n.jpg?stp=cp0_dst-jpg_s40x40_tt6&_nc_cat=102&ccb=1-7&_nc_sid=e99d92&_nc_ohc=pxjZmQhjKsQQ7kNvwFp9B91&_nc_oc=Adrw08cLAnHtdXkq5ZhyKrwfwi2HPdUCl--YuLFESIcaZnP7FNnwNPy3FdNiV31miQg&_nc_zt=24&_nc_ht=scontent-ord5-2.xx&_nc_gid=yZTOBwz8Al5HS-iLGU4raA&_nc_ss=7a389&oh=00_Af3djDG02AHD54lEQBptBoZeTclGRqCLIw2YdBQcAJzHEA&oe=69DAF34E",
    imageSrc:
      "https://scontent-ord5-3.xx.fbcdn.net/v/t39.30808-6/643700952_10232521143957123_5490208523302557608_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=106&ccb=1-7&_nc_sid=7b2446&_nc_ohc=y3cjzxUHWBIQ7kNvwF1Ex54&_nc_oc=Adpy00fKMhweqVV4m5f1KZD9LzTqupSIn7z-ggZaM5KMqvsjq5D4ATQ2j82SLQ6zufM&_nc_zt=23&_nc_ht=scontent-ord5-3.xx&_nc_gid=yZTOBwz8Al5HS-iLGU4raA&_nc_ss=7a389&oh=00_Af1FfxnoilhZ_Myvahj3C2EPBWKsBbT_mKOuyxy2qS568Q&oe=69DAF232",
    isRecommended: true,
  },
  {
    id: "10239039864198889",
    name: "Paul Graham",
    quote:
      "The guys were out today and fitted our new canopy. very professional and it really looks great, thanks again would highly recommend.",
    date: "2025-12-05T18:58:29.000Z",
    dateLabel: "December 2025",
    sourceLabel: "Facebook recommendation",
    sourceUrl:
      "https://www.facebook.com/paul.graham.921/posts/pfbid024Atdcs6CDxiAQtGM9ehoCLVr1WxVN8arMJexqz9Tzuh1mE7wm29oeds1WNUMmrBGl",
    avatarSrc:
      "https://scontent-ord5-2.xx.fbcdn.net/v/t39.30808-1/583334742_10238744149646210_7949989171457437782_n.jpg?stp=cp0_dst-jpg_s40x40_tt6&_nc_cat=102&ccb=1-7&_nc_sid=e99d92&_nc_ohc=XBeKibRmQC4Q7kNvwEW98VN&_nc_oc=AdqaVoGklTcTn3jDbKdMIM5kbP9dJYGdrsCVrnZjkmIPUgHaW3ONlw6LHUnD-G3h_eQ&_nc_zt=24&_nc_ht=scontent-ord5-2.xx&_nc_gid=yZTOBwz8Al5HS-iLGU4raA&_nc_ss=7a389&oh=00_Af2_Th3DAU3VxOUqpMyW_9IcXuQT-FlgTyVj_w9ofgC6Lg&oe=69DB1BD6",
    isRecommended: true,
  },
  {
    id: "7053477631366664",
    name: "Danielle McCallum",
    quote:
      "love my new canopy installed this morning by the guys 😀 couldn't recommend them enough the whole process was so quick from measuring to fitting... wouldn't eve ln new the guys were here and place was spotless after the had finished!! would highly recommend",
    date: "2024-01-25T17:06:54.000Z",
    dateLabel: "January 2024",
    sourceLabel: "Facebook recommendation",
    sourceUrl:
      "https://www.facebook.com/danielle.carey.165/posts/pfbid0rJ6vGdyczsXBbaE8b221Xaw1RXRCUNUv5v4mgdU1tcr2SnZGznGXbNxrBRRZTkJfl",
    avatarSrc:
      "https://scontent-mia3-2.xx.fbcdn.net/v/t39.30808-1/611154205_25446488628305618_5249568219236662539_n.jpg?stp=cp0_dst-jpg_s40x40_tt6&_nc_cat=105&ccb=1-7&_nc_sid=e99d92&_nc_ohc=zgRoOgg2cOMQ7kNvwEHw8SL&_nc_oc=AdoJZYD58jsq8E8RM7OSOZ6Wh15v5xDKZAjEbHlayX26788R3Lw705-rvxmVMS7F3C0&_nc_zt=24&_nc_ht=scontent-mia3-2.xx&_nc_gid=ab-kzXLO1C7EhIE5Fttpgw&_nc_ss=7a389&oh=00_Af1j69_qTGiDntKt_5zgGYLplSzcnCluRCeNvJdlIf9r8g&oe=69DAE83B",
    imageSrc:
      "https://scontent-mia3-1.xx.fbcdn.net/v/t39.30808-6/492420020_9570668402980895_2248597495472978571_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=7b2446&_nc_ohc=RGCb4L7hi8EQ7kNvwGXwwnD&_nc_oc=AdomGr8fsXmbD1QPMZhS4uA2dOTr8kCDeZJhMBW-cbpIEarbsX6K82oB_sDRmFAxY_8&_nc_zt=23&_nc_ht=scontent-mia3-1.xx&_nc_gid=ab-kzXLO1C7EhIE5Fttpgw&_nc_ss=7a389&oh=00_Af1i6tTKP7d8TXuScMDzAQ8QAW21rzP0BlSuopvRCEzboQ&oe=69DB0A87",
    isRecommended: true,
  },
  {
    id: "560818452748227",
    name: "Danielle Wynne",
    quote: "Absolutely in love with my Canopy 😍 thank you so much! Will definitely recommend",
    date: "2023-02-02T21:57:24.000Z",
    dateLabel: "February 2023",
    sourceLabel: "Facebook recommendation",
    sourceUrl:
      "https://www.facebook.com/danielle.wynne.712/posts/pfbid0DtCRbSutBpqVAm3S31gjEwx384Fyyu1X98ATcho99Y7Dq77ZsYmnjVS1BNMCHH63l",
    avatarSrc:
      "https://scontent-mia3-1.xx.fbcdn.net/v/t39.30808-1/534822543_1202116218618444_687506953930561752_n.jpg?stp=cp0_dst-jpg_s40x40_tt6&_nc_cat=111&ccb=1-7&_nc_sid=e99d92&_nc_ohc=nH8p10qXpoQQ7kNvwFe3Ewm&_nc_oc=AdrahF6mBvJ99NBLRrSytIz8X1YiAsOdHIXxWtPEbgZYdTqyb_3T-Xf4N50r4CdJ-IE&_nc_zt=24&_nc_ht=scontent-mia3-1.xx&_nc_gid=ab-kzXLO1C7EhIE5Fttpgw&_nc_ss=7a389&oh=00_Af29zNsM7aLjuzMJgNaOo53ZMcdyedN1BqtyN5ZB57BNSg&oe=69DB0D00",
    imageSrc:
      "https://scontent-mia5-2.xx.fbcdn.net/v/t39.30808-6/476618307_1042989534531114_2289769861740271075_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=100&ccb=1-7&_nc_sid=7b2446&_nc_ohc=g_uazZcmLIQQ7kNvwFXb1ia&_nc_oc=AdrwyQZtWmq5MjWT7UdRIPBd5i9JoS9QOpWcJmn1c328-_RFabn8DdYFb7_WjtTiJi8&_nc_zt=23&_nc_ht=scontent-mia5-2.xx&_nc_gid=ab-kzXLO1C7EhIE5Fttpgw&_nc_ss=7a389&oh=00_Af070cQwig1lHgprntKCcaoxFc817LSfwqUWd3xmscdvCQ&oe=69DAE78A",
    isRecommended: true,
  },
  {
    id: "2166754183505399",
    name: "Logue Louise",
    quote:
      "delighted with my canopy. quick and clean workmanship. very professional. would 100% recommend 🤩",
    date: "2022-07-11T17:17:23.000Z",
    dateLabel: "July 2022",
    sourceLabel: "Facebook recommendation",
    sourceUrl:
      "https://www.facebook.com/louisianna72/posts/pfbid0rTbzaGe1mQFDrJJ6rSSxThNpKupuYqAWC9SchgP1pd8FJUpPbVhZ2LYh4ah8uYfxl",
    avatarSrc:
      "https://scontent-iad3-1.xx.fbcdn.net/v/t39.30808-1/441950965_2656923947821751_7770632639816060864_n.jpg?stp=c8.0.416.416a_cp0_dst-jpg_s40x40_tt6&_nc_cat=110&ccb=1-7&_nc_sid=1d2534&_nc_ohc=kZ2ESbhoB8oQ7kNvwHv8F-r&_nc_oc=AdpytUgxhpB4D3A_35-eoAp8u3aFF7ei30CJSubNQmciMxSM4adHBtau4xYcO2SUsPM&_nc_zt=24&_nc_ht=scontent-iad3-1.xx&_nc_gid=a3eBl0d-Jhio0pB6a-zERQ&_nc_ss=7a389&oh=00_Af0Y6fFwdIVthAEOFEMPTzlx98E4TU6_x2yYLBxlt-Gcrg&oe=69DB0D58",
    imageSrc:
      "https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-6/482100560_2917003571813786_9156637060066125710_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=7b2446&_nc_ohc=bs8WYm8jv9MQ7kNvwE53JSS&_nc_oc=AdpuRX5zYlPDJXYmbmZ-9bImEuOjasns4pukbtua7WRewMIJwGf3vCxUeC0w9TK38Io&_nc_zt=23&_nc_ht=scontent-iad3-2.xx&_nc_gid=a3eBl0d-Jhio0pB6a-zERQ&_nc_ss=7a389&oh=00_Af3JmtuejwsT1Fu77EoCMDU5o6HvJKq8EpJQlPkCjANjjg&oe=69DB0ECE",
    isRecommended: true,
  },
  {
    id: "3222212274502703",
    name: "Sharon Smyth",
    quote:
      "Thank you so much for a beautiful canopy and windowsills fantastic job would highly recommend first class job very friendly and helpful from start to finish over the moon thanks",
    date: "2020-07-02T20:17:54.000Z",
    dateLabel: "July 2020",
    sourceLabel: "Facebook recommendation",
    sourceUrl:
      "https://www.facebook.com/sharon.smyth.58/posts/pfbid031YyifjMXS31aSribVJYAifpmQgZPUgmU29N9wo2igFjFa9ZTbVwVSrrRrRke2AHcl",
    avatarSrc:
      "https://scontent-iad6-1.xx.fbcdn.net/v/t39.30808-1/464183238_8734993186557890_6097745900296019321_n.jpg?stp=cp0_dst-jpg_s40x40_tt6&_nc_cat=100&ccb=1-7&_nc_sid=e99d92&_nc_ohc=9F4obcHwQ3QQ7kNvwFNmOZ8&_nc_oc=AdpsbyAmPANVUpygdWFtH3VhrbBKubqd5bfnN_-BoBDA0rrYYf1sM9rgDyMCdOCbDkI&_nc_zt=24&_nc_ht=scontent-iad6-1.xx&_nc_gid=a3eBl0d-Jhio0pB6a-zERQ&_nc_ss=7a389&oh=00_Af1ojAeZAXe5saeE2CI1S74h2MZV4O7Tsf5QqU2pSdVi2Q&oe=69DB1071",
    imageSrc:
      "https://scontent-iad3-1.xx.fbcdn.net/v/t1.6435-9/106707545_3222212194502711_8499179784764546811_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=7b2446&_nc_ohc=fybpBviL1t4Q7kNvwH3CYuj&_nc_oc=AdoPbaMmpvMGRPX-e4KZAAGdaDyQPMKZfAhvtg_17hYHmpie-KTMbOddt_QhXvUU6po&_nc_zt=23&_nc_ht=scontent-iad3-1.xx&_nc_gid=a3eBl0d-Jhio0pB6a-zERQ&_nc_ss=7a389&oh=00_Af1QlTOmGVQyrsFMxth6wZ2FJ55k2gKohtcnKmC5OSg8EQ&oe=69FC8F48",
    isRecommended: true,
  },
];
