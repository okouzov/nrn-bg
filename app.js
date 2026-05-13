const capacityGb = 100;

const cities = [
  { name: "Sofia", bg: "София", lat: 42.6977, lng: 23.3219, label: [-14, -22] },
  { name: "Blagoevgrad", bg: "Благоевград", lat: 42.0209, lng: 23.0943, label: [34, 30] },
  { name: "Plovdiv", bg: "Пловдив", lat: 42.1354, lng: 24.7453, label: [-18, -24] },
  { name: "Sliven", bg: "Сливен", lat: 42.6817, lng: 26.3229, label: [0, 31] },
  { name: "Shumen", bg: "Шумен", lat: 43.2712, lng: 26.9361, label: [0, -24] },
  { name: "Varna", bg: "Варна", lat: 43.2141, lng: 27.9147, label: [-14, 24] },
  { name: "Ruse", bg: "Русе", lat: 43.8356, lng: 25.9657, label: [0, -25] },
  { name: "Svishtov", bg: "Свищов", lat: 43.6187, lng: 25.3506, label: [-5, -24] },
  { name: "Veliko Turnovo", bg: "Велико Търново", lat: 43.0757, lng: 25.6172, label: [65, -18], labelEn: [57, -18] },
  { name: "Gabrovo", bg: "Габрово", lat: 42.8747, lng: 25.3189, label: [0, 32] },
  { name: "Pleven", bg: "Плевен", lat: 43.417, lng: 24.6067, label: [18, 32] },
  { name: "Dolna Mitropolia", bg: "Долна Митрополия", lat: 43.4668, lng: 24.5339, label: [-5, -25] },
  { name: "Rozhen", bg: "Рожен", lat: 41.6936, lng: 24.7381, label: [0, 32] }
];

const cityDetails = {
  Blagoevgrad: {
    name: {
      en: 'South-West University "Neofit Rilski"',
      bg: 'Югозападен университет "Неофит Рилски"'
    },
    website: "https://www.swu.bg/",
    image: "https://www.swu.bg/images/images/Logo/Logo_New.png"
  },
  Sliven: {
    name: {
      en: "Technical University of Sofia, Faculty and College - Sliven",
      bg: "ТУ-София, Факултет и Колеж - Сливен"
    },
    website: "https://tu-sliven.com/",
    image: "https://tu-sliven.com/favicon.ico"
  },
  Ruse: {
    name: {
      en: 'University of Ruse "Angel Kanchev"',
      bg: 'Русенски университет "Ангел Кънчев"'
    },
    website: "https://www.uni-ruse.bg/",
    image: "https://www.uni-ruse.bg/SiteAssets/ru-logo-125x140.png"
  },
  Svishtov: {
    name: {
      en: 'D. A. Tsenov Academy of Economics',
      bg: 'Стопанска академия "Димитър А. Ценов"'
    },
    website: "https://www.uni-svishtov.bg/",
    image: "https://www.uni-svishtov.bg/images/logo-bg.svg"
  },
  Pleven: {
    name: {
      en: "Medical University - Pleven",
      bg: "Медицински университет - Плевен"
    },
    website: "https://www.mu-pleven.bg/",
    image: "https://www.mu-pleven.bg/images/Logo/mu-logo10.png"
  },
  "Dolna Mitropolia": {
    name: {
      en: 'Bulgarian Air Force Academy "Georgi Benkovski"',
      bg: 'Висше военновъздушно училище "Георги Бенковски"'
    },
    website: "https://www.af-acad.bg/",
    image: "https://www.af-acad.bg/Images/logo3.png"
  },
  Gabrovo: {
    name: {
      en: "Technical University - Gabrovo",
      bg: "Технически университет - Габрово"
    },
    website: "https://www.tugab.bg/",
    image: "https://www.tugab.bg/images/Logo-bg.png"
  },
  Rozhen: {
    name: {
      en: "National Astronomical Observatory Rozhen",
      bg: "Национална астрономическа обсерватория Рожен"
    },
    website: "https://nao-rozhen.org/",
    image: "https://nao-rozhen.org/slshow/big_thumbnails/img_(20).jpg"
  }
};

const underConstructionCities = new Set(["Sofia", "Plovdiv", "Varna", "Shumen", "Veliko Turnovo"]);

const ringCities = cities.filter((city) => city.name !== "Rozhen");
const ringLinks = ringCities.map((city, index) => {
  const next = ringCities[(index + 1) % ringCities.length];
  return {
    id: `${city.name.toLowerCase().replace(/\s+/g, "-")}-${next.name.toLowerCase().replace(/\s+/g, "-")}`,
    index,
    from: city.name,
    to: next.name,
    capacityGb
  };
});

const extraLinks = [
  { id: "plovdiv-rozhen", index: ringLinks.length, from: "Plovdiv", to: "Rozhen", capacityGb: 1 }
];

const links = [...ringLinks, ...extraLinks];
const flowLineOffset = 1.45;

const rrpFundedCities = new Set(["Blagoevgrad", "Dolna Mitropolia", "Pleven", "Svishtov", "Ruse", "Gabrovo"]);

const bounds = {
  minLng: 22.18,
  maxLng: 28.74,
  minLat: 41.12,
  maxLat: 44.25,
  x: 19,
  y: 21,
  width: 1163,
  height: 719
};

const bulgariaOutline = bulgariaBoundaryCoordinates;

const plovdivMapFrame = {
  x: 0,
  y: 8,
  width: 1190,
  height: 735
};

const plovdivBounds = {
  minLng: 24.71,
  maxLng: 24.8,
  minLat: 42.123,
  maxLat: 42.158
};

const plovdivContour = [
  [24.711, 42.142],
  [24.717, 42.151],
  [24.735, 42.157],
  [24.759, 42.156],
  [24.783, 42.151],
  [24.799, 42.141],
  [24.797, 42.132],
  [24.781, 42.125],
  [24.756, 42.123],
  [24.731, 42.127],
  [24.714, 42.134]
];

const plovdivInnerContour = [
  [24.726, 42.145],
  [24.739, 42.151],
  [24.759, 42.151],
  [24.779, 42.146],
  [24.786, 42.138],
  [24.776, 42.131],
  [24.755, 42.129],
  [24.736, 42.133],
  [24.725, 42.139]
];

const plovdivNodes = [
  {
    id: "regional-admin",
    name: "Regional Administration - Plovdiv",
    bg: "Областна администрация - Пловдив",
    labelName: ["Regional Admin", "Plovdiv"],
    labelBg: ["Областна адм.", "Пловдив"],
    address: "пл. Никола Мушанов 1",
    lat: 42.1480922,
    lng: 24.7297194,
    label: [-34, -28],
    anchor: "end"
  },
  {
    id: "tu-plovdiv",
    name: "TU-Sofia, Plovdiv Branch",
    bg: "ТУ-София, филиал Пловдив",
    labelName: ["TU-Sofia", "Plovdiv Branch"],
    labelBg: ["ТУ-София", "филиал Пловдив"],
    address: "ул. Цанко Дюстабанов 25",
    lat: 42.1392225,
    lng: 24.7492663,
    label: [-26, 28],
    anchor: "end"
  },
  {
    id: "agrarian-university",
    name: "Agricultural University - Plovdiv",
    bg: "Аграрен университет - Пловдив",
    labelName: ["Agricultural", "University"],
    labelBg: ["Аграрен", "университет"],
    address: "бул. Менделеев 12",
    lat: 42.1342104,
    lng: 24.7656067,
    label: [34, 18],
    anchor: "start"
  },
  {
    id: "orak-engineering",
    name: "ORAK Engineering",
    bg: "Орак Инженеринг",
    labelName: ["ORAK", "Engineering"],
    labelBg: ["Орак", "Инженеринг"],
    address: "бул. Санкт Петербург 48",
    lat: 42.142728,
    lng: 24.785292,
    label: [34, -6],
    anchor: "start"
  },
  {
    id: "evolink-plovdiv",
    name: "Backup internet",
    bg: "Бекъп интернет",
    labelName: ["Backup", "internet"],
    labelBg: ["Бекъп", "интернет"],
    address: "бул. Христо Ботев 92В",
    lat: 42.1359533,
    lng: 24.753979,
    label: [0, 44],
    anchor: "middle"
  }
];

const plovdivLinks = [
  { id: "pd-admin-tu", from: "regional-admin", to: "tu-plovdiv", capacityGb: 100 },
  { id: "pd-tu-agrarian", from: "tu-plovdiv", to: "agrarian-university", capacityGb: 100 },
  { id: "pd-agrarian-admin", from: "agrarian-university", to: "regional-admin", capacityGb: 100 },
  { id: "pd-tu-orak", from: "tu-plovdiv", to: "orak-engineering", capacityGb: 10 },
  { id: "pd-tu-evolink", from: "tu-plovdiv", to: "evolink-plovdiv", capacityGb: 10 }
];

const plovdivNodeById = new Map(plovdivNodes.map((node) => [node.id, node]));

const plovdivNodeDetails = {
  "regional-admin": {
    name: {
      en: "Regional Administration - Plovdiv",
      bg: "Областна администрация - Пловдив"
    },
    website: "https://pd.government.bg/",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/24/Coat_of_arms_of_Bulgaria.svg"
  },
  "tu-plovdiv": {
    name: {
      en: "TU-Sofia, Plovdiv Branch",
      bg: "ТУ-София, филиал Пловдив"
    },
    website: "https://www.tu-plovdiv.bg/",
    image: "https://graph.facebook.com/tu.plovdiv.bg/picture?type=large"
  },
  "agrarian-university": {
    name: {
      en: "Agricultural University - Plovdiv",
      bg: "Аграрен университет - Пловдив"
    },
    website: "https://www.au-plovdiv.bg/",
    image: "https://www.au-plovdiv.bg/assets/logo/au-logo.jpg"
  },
  "orak-engineering": {
    name: {
      en: "ORAK Engineering",
      bg: "Орак Инженеринг"
    },
    website: "https://orakgroup.com/",
    image: "https://orakgroup.com/wp-content/uploads/2025/02/orak-logo.png"
  },
  "evolink-plovdiv": {
    name: {
      en: "Backup internet",
      bg: "Бекъп интернет"
    },
    website: "https://www.evolink.com/",
    image: "https://www.evolink.com/img/logo.svg"
  }
};

const shumenMapFrame = plovdivMapFrame;

const shumenBounds = {
  minLng: 26.918,
  maxLng: 26.966,
  minLat: 43.258,
  maxLat: 43.287
};

const shumenContour = [
  [26.9185, 43.274],
  [26.9235, 43.2845],
  [26.9405, 43.287],
  [26.9605, 43.2825],
  [26.966, 43.274],
  [26.962, 43.262],
  [26.949, 43.2585],
  [26.93, 43.26],
  [26.92, 43.267]
];

const shumenNodes = [
  {
    id: "sh-regional-admin",
    name: "Regional Administration - Shumen",
    bg: "Областна администрация - Шумен",
    labelName: ["Regional Admin", "Shumen"],
    labelBg: ["Областна адм.", "Шумен"],
    address: 'бул. "Славянски" 30',
    lat: 43.2713174,
    lng: 26.9306974,
    label: [-38, -24],
    anchor: "end"
  },
  {
    id: "shumen-university",
    name: "Shumen University",
    bg: "Шуменски университет",
    labelName: ["Shumen", "University"],
    labelBg: ["Шуменски", "университет"],
    address: 'ул. "Университетска" 115',
    lat: 43.279328,
    lng: 26.9496213,
    label: [28, -24],
    anchor: "start"
  },
  {
    id: "nvu-shumen",
    name: "National Military University, Shumen Branch",
    bg: "НВУ - филиал Шумен",
    labelName: ["NVU", "Shumen Branch"],
    labelBg: ["НВУ", "филиал Шумен"],
    address: 'ул. "Карел Шкорпил" 1',
    lat: 43.2693212,
    lng: 26.9312719,
    label: [-30, 48],
    anchor: "end"
  },
  {
    id: "sh-backup-internet",
    name: "Backup internet",
    bg: "Бекъп интернет",
    labelName: ["Backup", "internet"],
    labelBg: ["Бекъп", "интернет"],
    address: "ул. Индустриална 25",
    lat: 43.267944,
    lng: 26.9533518,
    label: [30, 32],
    anchor: "start"
  }
];

const shumenLinks = [
  { id: "sh-admin-shu", from: "sh-regional-admin", to: "shumen-university", capacityGb: 100 },
  { id: "sh-shu-nvu", from: "shumen-university", to: "nvu-shumen", capacityGb: 100 },
  { id: "sh-nvu-admin", from: "nvu-shumen", to: "sh-regional-admin", capacityGb: 100 },
  { id: "sh-nvu-backup", from: "nvu-shumen", to: "sh-backup-internet", capacityGb: 10 }
];

const commodityLinkIds = new Set(["pd-tu-evolink", "sh-nvu-backup", "vt-nvu-backup", "va-naval-backup"]);

const shumenNodeById = new Map(shumenNodes.map((node) => [node.id, node]));

const shumenNodeDetails = {
  "sh-regional-admin": {
    name: {
      en: "Regional Administration - Shumen",
      bg: "Областна администрация - Шумен"
    },
    website: "https://shumenoblast.egov.bg/",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/24/Coat_of_arms_of_Bulgaria.svg"
  },
  "shumen-university": {
    name: {
      en: "Konstantin Preslavsky University of Shumen",
      bg: 'Шуменски университет "Епископ Константин Преславски"'
    },
    website: "https://www.shu.bg/",
    image: "https://www.shu.bg/wp-content/uploads/file-manager-advanced/users//2023/12/cropped-logo-192x192.jpg"
  },
  "nvu-shumen": {
    name: {
      en: "National Military University, Shumen Branch",
      bg: "Национален военен университет - филиал Шумен"
    },
    website: "https://www.nvu.bg/bg/fakultet-artileriya-pvo-i-kis",
    image: "assets/nvu-shumen-logo.png"
  },
  "sh-backup-internet": {
    name: {
      en: "Backup internet",
      bg: "Бекъп интернет"
    },
    website: "https://www.evolink.com/",
    image: "https://www.evolink.com/img/logo.svg"
  }
};

const velikoTurnovoMapFrame = plovdivMapFrame;

const velikoTurnovoBounds = {
  minLng: 25.565,
  maxLng: 25.678,
  minLat: 43.054,
  maxLat: 43.122
};

const velikoTurnovoContour = [
  [25.624321, 43.120582],
  [25.627582, 43.116185],
  [25.622328, 43.108474],
  [25.623692, 43.104656],
  [25.616406, 43.100278],
  [25.618732, 43.096739],
  [25.597993, 43.089455],
  [25.587474, 43.090003],
  [25.585252, 43.08137],
  [25.576404, 43.078464],
  [25.572227, 43.071829],
  [25.588145, 43.066668],
  [25.567234, 43.054937],
  [25.589764, 43.057978],
  [25.598591, 43.055211],
  [25.626593, 43.056193],
  [25.636908, 43.061463],
  [25.635362, 43.066115],
  [25.668961, 43.065623],
  [25.665302, 43.073814],
  [25.669951, 43.075727],
  [25.66239, 43.080999],
  [25.674332, 43.082528],
  [25.675362, 43.08502],
  [25.656179, 43.099076],
  [25.65354, 43.096068],
  [25.649463, 43.098716],
  [25.643863, 43.096663],
  [25.639271, 43.104951],
  [25.637666, 43.118962],
  [25.624321, 43.120582]
];

const velikoTurnovoNodes = [
  {
    id: "vt-regional-admin",
    name: "Regional Administration - Veliko Tarnovo",
    bg: "Областна администрация - Велико Търново",
    labelName: ["Regional Admin", "Veliko Tarnovo"],
    labelBg: ["Областна адм.", "Велико Търново"],
    address: 'пл. "Център" 2',
    lat: 43.0803443,
    lng: 25.6360381,
    label: [33, -25],
    anchor: "start"
  },
  {
    id: "vt-university",
    name: "Veliko Tarnovo University",
    bg: "Великотърновски университет",
    labelName: ["Veliko Tarnovo", "University"],
    labelBg: ["Великотърновски", "университет"],
    address: 'ул. "Т. Търновски" 2',
    lat: 43.0760167,
    lng: 25.6497444,
    label: [30, 8],
    anchor: "start"
  },
  {
    id: "vt-nvu",
    name: "National Military University",
    bg: "Национален военен университет",
    labelName: ["National Military", "University"],
    labelBg: ["Национален военен", "университет"],
    address: 'бул. "България" 76',
    lat: 43.08095,
    lng: 25.6118,
    label: [-32, -24],
    anchor: "end"
  },
  {
    id: "vt-backup-internet",
    name: "Backup internet",
    bg: "Бекъп интернет",
    labelName: ["Backup", "internet"],
    labelBg: ["Бекъп", "интернет"],
    address: "бул. Васил Левски 29",
    lat: 43.0785262,
    lng: 25.6275133,
    label: [28, 18],
    anchor: "start"
  }
];

const velikoTurnovoLinks = [
  { id: "vt-admin-university", from: "vt-regional-admin", to: "vt-university", capacityGb: 100 },
  { id: "vt-university-nvu", from: "vt-university", to: "vt-nvu", capacityGb: 100 },
  { id: "vt-nvu-admin", from: "vt-nvu", to: "vt-regional-admin", capacityGb: 100 },
  { id: "vt-nvu-backup", from: "vt-nvu", to: "vt-backup-internet", capacityGb: 10 }
];

const velikoTurnovoNodeById = new Map(velikoTurnovoNodes.map((node) => [node.id, node]));

const velikoTurnovoNodeDetails = {
  "vt-regional-admin": {
    name: {
      en: "Regional Administration - Veliko Tarnovo",
      bg: "Областна администрация - Велико Търново"
    },
    website: "https://vt.government.bg/",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/24/Coat_of_arms_of_Bulgaria.svg"
  },
  "vt-university": {
    name: {
      en: "St. Cyril and St. Methodius University of Veliko Tarnovo",
      bg: 'Великотърновски университет "Св. св. Кирил и Методий"'
    },
    website: "https://www.uni-vt.bg/",
    image: "assets/uni-vt-logo.gif"
  },
  "vt-nvu": {
    name: {
      en: "National Military University Vasil Levski",
      bg: 'Национален военен университет "Васил Левски"'
    },
    website: "https://nvu.bg/",
    image: "assets/nvu-logo.png"
  },
  "vt-backup-internet": {
    name: {
      en: "Backup internet",
      bg: "Бекъп интернет"
    },
    website: "https://www.evolink.com/",
    image: "https://www.evolink.com/img/logo.svg"
  }
};

const varnaMapFrame = plovdivMapFrame;

const varnaBounds = {
  minLng: 27.89,
  maxLng: 28.04,
  minLat: 43.18,
  maxLat: 43.265
};

const varnaContour = [
  [27.921933, 43.187137],
  [27.921606, 43.196866],
  [27.928316, 43.2057],
  [27.933093, 43.203972],
  [27.942829, 43.210837],
  [27.958157, 43.211267],
  [27.976722, 43.219685],
  [27.996919, 43.215508],
  [28.001735, 43.221184],
  [28.013785, 43.224364],
  [28.018485, 43.242266],
  [28.030208, 43.247486],
  [28.032013, 43.258151],
  [28.039, 43.262],
  [28.025, 43.265],
  [28.002633, 43.264159],
  [27.9918, 43.257366],
  [27.97291, 43.26448],
  [27.952451, 43.246935],
  [27.939137, 43.244961],
  [27.929204, 43.248403],
  [27.926981, 43.240383],
  [27.897089, 43.242429],
  [27.89, 43.232],
  [27.895, 43.215],
  [27.902, 43.2],
  [27.912, 43.193],
  [27.921933, 43.187137]
];

const varnaNodes = [
  {
    id: "va-regional-admin",
    name: "Regional Administration - Varna",
    bg: "Областна администрация - Варна",
    labelName: ["Regional Admin", "Varna"],
    labelBg: ["Областна адм.", "Варна"],
    address: 'ул. "Преслав" 26',
    lat: 43.2013677,
    lng: 27.9157126,
    label: [10, 31],
    anchor: "start"
  },
  {
    id: "va-naval-academy",
    name: "Naval Academy",
    bg: "ВВМУ „Н. Й. Вапцаров“",
    labelName: ["Naval", "Academy"],
    labelBg: ["ВВМУ", "Н. Й. Вапцаров"],
    address: 'ул. "Васил Друмев" 73',
    lat: 43.2128375,
    lng: 27.9322145,
    label: [20, 15],
    anchor: "start"
  },
  {
    id: "va-technical-university",
    name: "Technical University - Varna",
    bg: "Технически университет - Варна",
    labelName: ["TU-Varna"],
    labelBg: ["ТУ-Варна"],
    address: 'ул. "Студентска" 1',
    lat: 43.2240631,
    lng: 27.9357045,
    label: [22, -23],
    anchor: "start"
  },
  {
    id: "va-economics-university",
    name: "University of Economics - Varna",
    bg: "Икономически университет - Варна",
    labelName: ["UE-Varna"],
    labelBg: ["ИУ-Варна"],
    address: "бул. Княз Борис I 77",
    lat: 43.2089504,
    lng: 27.9237081,
    label: [-38, -2],
    anchor: "end"
  },
  {
    id: "va-medical-university",
    name: "Medical University - Varna",
    bg: "Медицински университет - Варна",
    labelName: ["MU-Varna"],
    labelBg: ["МУ-Варна"],
    address: 'ул. "Проф. Марин Дринов" 55',
    lat: 43.2122621,
    lng: 27.9212922,
    label: [-31, -1],
    anchor: "end"
  },
  {
    id: "va-free-university",
    name: "Varna Free University",
    bg: "Варненски свободен университет",
    labelName: ["Varna Free", "University"],
    labelBg: ["Варненски свободен", "университет"],
    address: 'ул. "Янко Славчев" 84',
    lat: 43.2581446,
    lng: 28.0272851,
    label: [-34, -22],
    anchor: "end"
  },
  {
    id: "va-backup-internet",
    name: "Backup internet",
    bg: "Бекъп интернет",
    labelName: ["Backup", "internet"],
    labelBg: ["Бекъп", "интернет"],
    address: "ул. Уилям Гладстон 15",
    lat: 43.2175,
    lng: 27.9212,
    label: [-20, -34],
    anchor: "end"
  }
];

const varnaLinks = [
  { id: "va-admin-naval", from: "va-regional-admin", to: "va-naval-academy", capacityGb: 100 },
  { id: "va-naval-tu", from: "va-naval-academy", to: "va-technical-university", capacityGb: 100 },
  { id: "va-tu-economics", from: "va-technical-university", to: "va-economics-university", capacityGb: 100 },
  { id: "va-economics-admin", from: "va-economics-university", to: "va-regional-admin", capacityGb: 100 },
  { id: "va-naval-medical", from: "va-naval-academy", to: "va-medical-university", capacityGb: 100 },
  { id: "va-naval-free", from: "va-naval-academy", to: "va-free-university", capacityGb: 100 },
  { id: "va-naval-backup", from: "va-naval-academy", to: "va-backup-internet", capacityGb: 10 }
];

const varnaNodeById = new Map(varnaNodes.map((node) => [node.id, node]));

const varnaNodeDetails = {
  "va-regional-admin": {
    name: {
      en: "Regional Administration - Varna",
      bg: "Областна администрация - Варна"
    },
    website: "https://varnaregion.egov.bg/",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/24/Coat_of_arms_of_Bulgaria.svg"
  },
  "va-naval-academy": {
    name: {
      en: "Nikola Vaptsarov Naval Academy",
      bg: "ВВМУ „Н. Й. Вапцаров“"
    },
    website: "https://www.naval-acad.bg/",
    image: "https://www.naval-acad.bg/wp-content/uploads/2023/03/logo_NVNA.png"
  },
  "va-technical-university": {
    name: {
      en: "Technical University - Varna",
      bg: "Технически университет - Варна"
    },
    website: "http://www.tu-varna.bg/",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjITWn7-iipEAT2zT6echc7CXCxnp1mXqFsQ&s"
  },
  "va-economics-university": {
    name: {
      en: "University of Economics - Varna",
      bg: "Икономически университет - Варна"
    },
    website: "https://ue-varna.bg/",
    image: "https://ue-varna.bg/img/logo_bg.png"
  },
  "va-medical-university": {
    name: {
      en: "Medical University - Varna",
      bg: "Медицински университет - Варна"
    },
    website: "https://www.mu-varna.bg/",
    image: "https://www.mu-varna.bg/BG/AboutUs/PublishingImages/loga2025/LogoMU-Varna%20HQ.PNG"
  },
  "va-free-university": {
    name: {
      en: "Varna Free University",
      bg: "Варненски свободен университет"
    },
    website: "https://www.vfu.bg/",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNopJmm5Q9EcRC9Ho1OtmQA6u6pFy8xhN9fA&s"
  },
  "va-backup-internet": {
    name: {
      en: "Backup internet",
      bg: "Бекъп интернет"
    },
    website: "https://www.evolink.com/",
    image: "https://www.evolink.com/img/logo.svg"
  }
};

const sofiaMapFrame = plovdivMapFrame;

const sofiaBounds = {
  minLng: 23.295,
  maxLng: 23.415,
  minLat: 42.644,
  maxLat: 42.707
};

const sofiaContour = [
  [23.296, 42.674],
  [23.302, 42.696],
  [23.322, 42.706],
  [23.352, 42.706],
  [23.384, 42.701],
  [23.412, 42.684],
  [23.414, 42.666],
  [23.398, 42.651],
  [23.362, 42.644],
  [23.325, 42.649],
  [23.302, 42.66],
  [23.296, 42.674]
];

const sofiaNodes = [
  {
    id: "so-meu",
    name: "MIDT",
    bg: "МИДТ",
    labelName: ["MIDT"],
    labelBg: ["МИДТ"],
    address: "ул. Гурко 26",
    lat: 42.6934644,
    lng: 23.3249726,
    label: [-20, -8],
    labelEn: [-20, 22],
    anchor: "end"
  },
  {
    id: "so-iict-bas",
    name: "IICT-BAS",
    bg: "ИИКТ-БАН",
    labelName: ["IICT-BAS"],
    labelBg: ["ИИКТ-БАН"],
    address: "ул. Акад. Г. Бончев бл. 25A",
    lat: 42.6751847,
    lng: 23.3667446,
    label: [4, -26],
    anchor: "start"
  },
  {
    id: "so-tu-sofia",
    name: "TU-Sofia",
    bg: "ТУ-София",
    labelName: ["TU-Sofia"],
    labelBg: ["ТУ-София"],
    address: "бул. Климент Охридски 8",
    lat: 42.6552239,
    lng: 23.3550724,
    label: [24, 15],
    anchor: "start"
  },
  {
    id: "so-uctm",
    name: "UCTM",
    bg: "ХТМУ",
    labelName: ["UCTM"],
    labelBg: ["ХТМУ"],
    address: "бул. Климент Охридски 8",
    lat: 42.6513479,
    lng: 23.3546914,
    label: [28, 4],
    anchor: "start"
  },
  {
    id: "so-utp",
    name: "UTP",
    bg: "ВУТП",
    labelName: ["UTP"],
    labelBg: ["ВУТП"],
    address: "ул. Акад. Стефан Младенов 1",
    lat: 42.6560501,
    lng: 23.3476173,
    label: [0, -24],
    anchor: "middle"
  },
  {
    id: "so-unwe",
    name: "UNWE",
    bg: "УНСС",
    labelName: ["UNWE"],
    labelBg: ["УНСС"],
    address: "ул. 8-ми декември 19",
    lat: 42.6505806,
    lng: 23.3486588,
    label: [0, 35],
    anchor: "middle"
  },
  {
    id: "so-fmi",
    name: "FMI, Sofia University",
    bg: "СУ ФМИ",
    labelName: ["FMI"],
    labelBg: ["СУ ФМИ"],
    address: "бул. Джеймс Баучър 5",
    lat: 42.6743374,
    lng: 23.3264,
    label: [-22, 4],
    anchor: "end"
  },
  {
    id: "so-mu-sofia",
    name: "Medical University - Sofia",
    bg: "МУ-София",
    labelName: ["MU-Sofia"],
    labelBg: ["МУ-София"],
    address: "ул. Георги Софийски 1",
    lat: 42.6866461,
    lng: 23.3092818,
    label: [22, -16],
    anchor: "start"
  },
  {
    id: "so-sofia-university",
    name: "Sofia University",
    bg: "Софийски университет",
    labelName: ["Sofia", "University"],
    labelBg: ["Софийски", "университет"],
    address: "бул. Цар Освободител 15",
    lat: 42.6956732,
    lng: 23.331538,
    label: [-18, -14],
    anchor: "end"
  },
  {
    id: "so-vtu",
    name: "VTU Todor Kableshkov",
    bg: "ВТУ Т. Каблешков",
    labelName: ["VTU"],
    labelBg: ["ВТУ"],
    address: "бул. Гео Милев 158",
    lat: 42.6790517,
    lng: 23.3810145,
    label: [24, 4],
    anchor: "start"
  },
  {
    id: "so-unibit-1",
    name: "UniBIT 1",
    bg: "УниБИТ 1",
    labelName: ["UniBIT 1"],
    labelBg: ["УниБИТ 1"],
    address: "бул. Цариградско шосе 119",
    lat: 42.65782,
    lng: 23.3836461,
    label: [20, 28],
    anchor: "start"
  },
  {
    id: "so-unibit-2",
    name: "UniBIT 2",
    bg: "УниБИТ 2",
    labelName: ["UniBIT 2"],
    labelBg: ["УниБИТ 2"],
    address: "бул. Шипченски проход 69A",
    lat: 42.6719,
    lng: 23.3786,
    label: [24, 4],
    anchor: "start"
  },
  {
    id: "so-nimh",
    name: "NIMH",
    bg: "НИМХ",
    labelName: ["NIMH"],
    labelBg: ["НИМХ"],
    address: "бул. Цариградско шосе 66",
    lat: 42.6549036,
    lng: 23.3791836,
    label: [-18, 34],
    anchor: "end"
  },
  {
    id: "so-sofia-tech-park",
    name: "Sofia Tech Park",
    bg: "София Тех Парк",
    labelName: ["Sofia Tech", "Park"],
    labelBg: ["София Тех", "Парк"],
    address: "Цариградско шосе 111",
    lat: 42.6687,
    lng: 23.3782,
    label: [20, 34],
    anchor: "middle"
  },
  {
    id: "so-kkipko",
    name: "CISCDC",
    bg: "ККИПКО",
    labelName: ["CISCDC"],
    labelBg: ["ККИПКО"],
    address: "бул. Ген. Тотлебен 34",
    lat: 42.6874,
    lng: 23.3047,
    label: [0, 36],
    anchor: "middle"
  },
  {
    id: "so-foz",
    name: "Faculty of Public Health",
    bg: "ФОЗ (МУ-София)",
    labelName: ["Public Health", "MU-Sofia"],
    labelBg: ["ФОЗ", "(МУ-София)"],
    address: "ул. Бяло море 8",
    lat: 42.700541,
    lng: 23.339223,
    label: [22, -16],
    anchor: "start"
  },
  {
    id: "so-medical-college",
    name: "Medical College, MU-Sofia",
    bg: "Мед. колеж (МУ-София)",
    labelName: ["Medical College", "MU-Sofia"],
    labelBg: ["Мед. колеж", "(МУ-София)"],
    address: "ул. Йорданка Филаретова 3",
    lat: 42.6928255,
    lng: 23.3080473,
    label: [24, -10],
    labelEn: [9, -25],
    anchor: "start"
  },
  {
    id: "so-pharmacy",
    name: "Faculty of Pharmacy",
    bg: "Фарм. факултет (МУ-София)",
    labelName: ["Pharmacy", "MU-Sofia"],
    labelBg: ["Фарм. ф-т", "(МУ-София)"],
    address: "ул. Дунав 2",
    lat: 42.7004,
    lng: 23.3337568,
    label: [-20, -26],
    anchor: "end"
  },
  {
    id: "so-feba",
    name: "Faculty of Economics and Business Administration",
    bg: "Стопански факултет (СУ)",
    labelName: ["FEBA", "SU"],
    labelBg: ["Стопански ф-т", "(СУ)"],
    address: "бул. Цариградско шосе 125, блок 3",
    lat: 42.6767,
    lng: 23.3549,
    label: [-24, 4],
    anchor: "end"
  },
  {
    id: "so-gate",
    name: "GATE Institute",
    bg: "Институт GATE",
    labelName: ["GATE"],
    labelBg: ["GATE"],
    address: "бул. Джеймс Баучър 5",
    lat: 42.6731,
    lng: 23.3315,
    label: [24, 28],
    anchor: "start"
  },
  {
    id: "so-military-academy",
    name: "Military Academy",
    bg: "Военна академия",
    labelName: ["Military", "Academy"],
    labelBg: ["Военна", "академия"],
    address: "бул. Евлоги и Христо Георгиеви 82",
    lat: 42.6904804,
    lng: 23.3481498,
    label: [33, 0],
    anchor: "start"
  },
  {
    id: "so-art-academy",
    name: "National Academy of Art",
    bg: "Художествена академия",
    labelName: ["NAA"],
    labelBg: ["НХА"],
    address: "ул. Шипка 1",
    lat: 42.6935364,
    lng: 23.33528,
    label: [24, -7],
    anchor: "start"
  },
  {
    id: "so-equinix-so2",
    name: "Equinix SO2",
    bg: "Equinix SO2",
    labelName: ["Equinix", "SO2"],
    labelBg: ["Equinix", "SO2"],
    address: "ул. Поручик Неделчо Бончев 33",
    lat: 42.67572,
    lng: 23.401498,
    label: [32, 4],
    anchor: "start"
  },
  {
    id: "so-a1-peering",
    name: "A1 peering",
    bg: "A1 пиъринг",
    labelName: ["A1"],
    labelBg: ["A1"],
    address: "IICT-BAS peering",
    lat: 42.68032,
    lng: 23.36473,
    label: [16, -12],
    anchor: "start"
  },
  {
    id: "so-evolink-peering",
    name: "Evolink peering",
    bg: "Еволинк пиъринг",
    labelName: ["Evolink"],
    labelBg: ["Еволинк"],
    address: "IICT-BAS peering",
    lat: 42.67005,
    lng: 23.3667446,
    label: [0, 34],
    anchor: "middle"
  },
  {
    id: "so-bix-peering",
    name: "BIX.BG",
    bg: "BIX.BG",
    labelName: ["BIX.BG"],
    labelBg: ["BIX.BG"],
    address: "IICT-BAS peering",
    lat: 42.67176,
    lng: 23.3607,
    label: [-16, 20],
    anchor: "end"
  }
];

const sofiaLinks = [
  { id: "so-meu-tu", from: "so-meu", to: "so-tu-sofia", capacityGb: 100 },
  { id: "so-meu-military", from: "so-meu", to: "so-military-academy", capacityGb: 100 },
  { id: "so-meu-iict", from: "so-meu", to: "so-iict-bas", capacityGb: 100 },
  { id: "so-iict-tu", from: "so-iict-bas", to: "so-tu-sofia", capacityGb: 100 },
  { id: "so-iict-unibit1", from: "so-iict-bas", to: "so-unibit-1", capacityGb: 100 },
  { id: "so-iict-unibit2", from: "so-iict-bas", to: "so-unibit-2", capacityGb: 100 },
  { id: "so-iict-vtu", from: "so-iict-bas", to: "so-vtu", capacityGb: 100 },
  { id: "so-iict-gate", from: "so-iict-bas", to: "so-gate", capacityGb: 100 },
  { id: "so-iict-military", from: "so-iict-bas", to: "so-military-academy", capacityGb: 100 },
  { id: "so-military-mu", from: "so-military-academy", to: "so-mu-sofia", capacityGb: 100 },
  { id: "so-unibit1-unibit2", from: "so-unibit-1", to: "so-unibit-2", capacityGb: 100 },
  { id: "so-vtu-su", from: "so-vtu", to: "so-sofia-university", capacityGb: 100 },
  { id: "so-su-art", from: "so-sofia-university", to: "so-art-academy", capacityGb: 100 },
  { id: "so-art-military", from: "so-art-academy", to: "so-military-academy", capacityGb: 100 },
  { id: "so-mu-fmi", from: "so-mu-sofia", to: "so-fmi", capacityGb: 100 },
  { id: "so-fmi-gate", from: "so-fmi", to: "so-gate", capacityGb: 100 },
  { id: "so-fmi-unwe", from: "so-fmi", to: "so-unwe", capacityGb: 100 },
  { id: "so-unwe-utp", from: "so-unwe", to: "so-utp", capacityGb: 100 },
  { id: "so-unwe-tu", from: "so-unwe", to: "so-tu-sofia", capacityGb: 100 },
  { id: "so-tu-uctm", from: "so-tu-sofia", to: "so-uctm", capacityGb: 100 },
  { id: "so-uctm-unwe", from: "so-uctm", to: "so-unwe", capacityGb: 100 },
  { id: "so-tu-utp", from: "so-tu-sofia", to: "so-utp", capacityGb: 100 },
  { id: "so-iict-stp", from: "so-iict-bas", to: "so-sofia-tech-park", capacityGb: 100 },
  { id: "so-iict-equinix", from: "so-iict-bas", to: "so-equinix-so2", capacityGb: 200, capacityLabel: "2x100Gb" },
  { id: "so-iict-a1-peering", from: "so-iict-bas", to: "so-a1-peering", capacityGb: 100, capacityLabelKey: "legend100Peering", type: "peering" },
  { id: "so-iict-evolink-peering", from: "so-iict-bas", to: "so-evolink-peering", capacityGb: 100, capacityLabelKey: "legend100Peering", type: "peering" },
  { id: "so-iict-bix-peering", from: "so-iict-bas", to: "so-bix-peering", capacityGb: 100, capacityLabelKey: "legend100Peering", type: "peering" },
  { id: "so-iict-nimh", from: "so-iict-bas", to: "so-nimh", capacityGb: 10 },
  { id: "so-iict-feba", from: "so-iict-bas", to: "so-feba", capacityGb: 100 },
  { id: "so-mu-kkipko", from: "so-mu-sofia", to: "so-kkipko", capacityGb: 10 },
  { id: "so-su-pharmacy", from: "so-sofia-university", to: "so-pharmacy", capacityGb: 10 },
  { id: "so-su-foz", from: "so-sofia-university", to: "so-foz", capacityGb: 10 },
  { id: "so-mu-medical-college", from: "so-mu-sofia", to: "so-medical-college", capacityGb: 10 }
];

const sofiaNodeById = new Map(sofiaNodes.map((node) => [node.id, node]));

const sofiaNodeDetails = {
  "so-meu": {
    name: {
      en: "Ministry of Innovation and Digital Transformation",
      bg: "Министерство на иновациите и дигиталната трансформация"
    },
    website: "https://midt.bg/",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/24/Coat_of_arms_of_Bulgaria.svg"
  },
  "so-iict-bas": {
    name: {
      en: "Institute of Information and Communication Technologies - BAS",
      bg: "Институт по информационни и комуникационни технологии - БАН"
    },
    website: "https://www.iict.bas.bg/",
    image: "https://www.google.com/s2/favicons?domain=iict.bas.bg&sz=128"
  },
  "so-tu-sofia": {
    name: {
      en: "Technical University of Sofia",
      bg: "Технически университет - София"
    },
    website: "https://www.tu-sofia.bg/",
    image: "https://nchdc.acad.bg/wp-content/uploads/3_TU_bg_n.png"
  },
  "so-uctm": {
    name: {
      en: "University of Chemical Technology and Metallurgy",
      bg: "Химикотехнологичен и металургичен университет"
    },
    website: "https://uctm.edu/",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShlXyscT2BwI1Fng-52Io-p5LcGCMZYx5Q0A&s"
  },
  "so-utp": {
    name: {
      en: "University of Telecommunications and Post",
      bg: "Висше училище по телекомуникации и пощи"
    },
    website: "https://www.utp.bg/",
    image: "https://www.google.com/s2/favicons?domain=utp.bg&sz=128"
  },
  "so-unwe": {
    name: {
      en: "University of National and World Economy",
      bg: "Университет за национално и световно стопанство"
    },
    website: "https://www.unwe.bg/",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFOZJUDWvIaLADo2oprF3In-XcaAYADLndUg&s"
  },
  "so-fmi": {
    name: {
      en: "Faculty of Mathematics and Informatics, Sofia University",
      bg: "Факултет по математика и информатика, СУ"
    },
    website: "https://www.fmi.uni-sofia.bg/",
    image: "https://nchdc.acad.bg/wp-content/uploads/2_SU_bg_n.png"
  },
  "so-mu-sofia": {
    name: {
      en: "Medical University - Sofia",
      bg: "Медицински университет - София"
    },
    website: "https://mu-sofia.bg/",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Logo_MU_Sofia.png"
  },
  "so-sofia-university": {
    name: {
      en: "Sofia University St. Kliment Ohridski",
      bg: "Софийски университет Св. Климент Охридски"
    },
    website: "https://www.uni-sofia.bg/",
    image: "https://nchdc.acad.bg/wp-content/uploads/2_SU_bg_n.png"
  },
  "so-vtu": {
    name: {
      en: "Todor Kableshkov University of Transport",
      bg: "ВТУ Тодор Каблешков"
    },
    website: "https://www.vtu.bg/",
    image: "https://www.google.com/s2/favicons?domain=vtu.bg&sz=128"
  },
  "so-unibit-1": {
    name: {
      en: "University of Library Studies and Information Technologies",
      bg: "Университет по библиотекознание и информационни технологии"
    },
    website: "https://www.unibit.bg/",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/99/%D0%9B%D0%BE%D0%B3%D0%BE_%D0%BD%D0%B0_%D0%A3%D0%BD%D0%B8%D0%91%D0%98%D0%A2.png"
  },
  "so-unibit-2": {
    name: {
      en: "University of Library Studies and Information Technologies",
      bg: "Университет по библиотекознание и информационни технологии"
    },
    website: "https://www.unibit.bg/",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/99/%D0%9B%D0%BE%D0%B3%D0%BE_%D0%BD%D0%B0_%D0%A3%D0%BD%D0%B8%D0%91%D0%98%D0%A2.png"
  },
  "so-nimh": {
    name: {
      en: "National Institute of Meteorology and Hydrology",
      bg: "Национален институт по метеорология и хидрология"
    },
    website: "https://www.meteo.bg/",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWrrkq0EHbjgwHyfooiaL3Ngf726FNJWznAw&s"
  },
  "so-sofia-tech-park": {
    name: {
      en: "Sofia Tech Park",
      bg: "София Тех Парк"
    },
    website: "https://sofiatech.bg/",
    image: "https://www.google.com/s2/favicons?domain=sofiatech.bg&sz=128"
  },
  "so-kkipko": {
    name: {
      en: "Crisis Management and Disaster Response Centre of Excellence",
      bg: "ККИПКО"
    },
    website: "https://ciscdc.armf.bg/",
    image: "https://www.mod.bg/logo/SKS/ciscdc_logo.png"
  },
  "so-foz": {
    name: {
      en: "Faculty of Public Health, MU-Sofia",
      bg: "Факултет по обществено здраве, МУ-София"
    },
    website: "https://foz.mu-sofia.bg/",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFZ54YZkB6zMSaxMAD-UkqZ4DCsoEL3RHNtQ&s"
  },
  "so-medical-college": {
    name: {
      en: "Medical College Yordanka Filaretova, MU-Sofia",
      bg: "Медицински колеж Йорданка Филаретова, МУ-София"
    },
    website: "https://mc.mu-sofia.bg/",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Logo_MU_Sofia.png"
  },
  "so-pharmacy": {
    name: {
      en: "Faculty of Pharmacy, MU-Sofia",
      bg: "Фармацевтичен факултет, МУ-София"
    },
    website: "https://pharmfac.mu-sofia.bg/",
    image: "https://media.licdn.com/dms/image/v2/D4D0BAQEPYIWd58IA2w/company-logo_200_200/B4DZlWtOCdJIAI-/0/1758096319163/faculty_of_pharmacy_medical_university_of_sofia_logo?e=2147483647&v=beta&t=irZMNN_NbSUG-1VgunPDFrxp3eRtytQ4A6rWXK_k8fQ"
  },
  "so-feba": {
    name: {
      en: "Faculty of Economics and Business Administration, Sofia University",
      bg: "Стопански факултет, СУ"
    },
    website: "https://feba.edupage.org/",
    image: "https://nchdc.acad.bg/wp-content/uploads/2_SU_bg_n.png"
  },
  "so-gate": {
    name: {
      en: "GATE Institute",
      bg: "Институт GATE"
    },
    website: "https://gate-ai.eu/",
    image: "https://moodle.gate-ai.eu/pluginfile.php/1/core_admin/logo/0x150/1617295027/gate_logo.png"
  },
  "so-military-academy": {
    name: {
      en: "Rakovski National Defence College",
      bg: "Военна академия Г. С. Раковски"
    },
    website: "https://rndc.bg/",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS0qMqUFPK8Kilm5rFkcbWMvCCGXM-2sgkug&s"
  },
  "so-art-academy": {
    name: {
      en: "National Academy of Art",
      bg: "Национална художествена академия"
    },
    website: "https://www.nha.bg/",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL2FEIcafVkyuzei_mSYbRo0JV_nPjdjzekg&s"
  },
  "so-equinix-so2": {
    name: {
      en: "Equinix SO2",
      bg: "Equinix SO2"
    },
    website: "https://www.equinix.com/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Equinix_logo.svg/1280px-Equinix_logo.svg.png"
  },
  "so-a1-peering": {
    name: {
      en: "A1 peering",
      bg: "A1 пиъринг"
    },
    website: "https://www.a1.bg/",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/98/A1_red_logo.png"
  },
  "so-evolink-peering": {
    name: {
      en: "Evolink peering",
      bg: "Еволинк пиъринг"
    },
    website: "https://www.evolink.com/",
    image: "https://www.evolink.com/img/logo.svg"
  },
  "so-bix-peering": {
    name: {
      en: "BIX.BG - Bulgarian Internet Exchange",
      bg: "BIX.BG - Bulgarian Internet Exchange"
    },
    website: "https://www.bix.bg/",
    image: "https://media.licdn.com/dms/image/v2/C4D0BAQFJgenF9s9Y1w/company-logo_200_200/company-logo_200_200/0/1668088644484/bixbg_logo?e=2147483647&v=beta&t=k7f1Jsqqdc1bE_mOV7ulV6pNSXeciuhBOOYM9WiaUqE"
  }
};

const detailViews = {
  plovdiv: {
    nodes: plovdivNodes,
    links: plovdivLinks,
    nodeById: plovdivNodeById,
    nodeDetails: plovdivNodeDetails,
    contour: plovdivContour,
    projector: projectPlovdiv,
    pointGetter: getPlovdivPoint,
    summaryKey: "plovdivActiveSummary"
  },
  shumen: {
    nodes: shumenNodes,
    links: shumenLinks,
    nodeById: shumenNodeById,
    nodeDetails: shumenNodeDetails,
    contour: shumenContour,
    projector: projectShumen,
    pointGetter: getShumenPoint,
    summaryKey: "shumenActiveSummary"
  },
  velikoTurnovo: {
    nodes: velikoTurnovoNodes,
    links: velikoTurnovoLinks,
    nodeById: velikoTurnovoNodeById,
    nodeDetails: velikoTurnovoNodeDetails,
    contour: velikoTurnovoContour,
    projector: projectVelikoTurnovo,
    pointGetter: getVelikoTurnovoPoint,
    summaryKey: "velikoTurnovoActiveSummary"
  },
  varna: {
    nodes: varnaNodes,
    links: varnaLinks,
    nodeById: varnaNodeById,
    nodeDetails: varnaNodeDetails,
    contour: varnaContour,
    projector: projectVarna,
    pointGetter: getVarnaPoint,
    summaryKey: "varnaActiveSummary"
  },
  sofia: {
    nodes: sofiaNodes,
    links: sofiaLinks,
    nodeById: sofiaNodeById,
    nodeDetails: sofiaNodeDetails,
    contour: sofiaContour,
    projector: projectSofia,
    pointGetter: getSofiaPoint,
    summaryKey: "sofiaActiveSummary"
  }
};

const rrpFundedDetailNodes = {
  plovdiv: new Set(["tu-plovdiv", "agrarian-university"]),
  shumen: new Set(["nvu-shumen", "shumen-university"]),
  velikoTurnovo: new Set(["vt-nvu", "vt-university"]),
  varna: new Set(["va-economics-university", "va-naval-academy", "va-technical-university"]),
  sofia: new Set([
    "so-meu",
    "so-art-academy",
    "so-sofia-university",
    "so-military-academy",
    "so-iict-bas",
    "so-vtu",
    "so-unibit-1",
    "so-tu-sofia",
    "so-unwe",
    "so-utp",
    "so-fmi",
    "so-mu-sofia",
    "so-uctm"
  ])
};

const translations = {
  en: {
    pageTitle: "Bulgaria - optical research backbone",
    plovdivPageTitle: "Plovdiv - optical research ring",
    shumenPageTitle: "Shumen - optical research ring",
    velikoTurnovoPageTitle: "Veliko Tarnovo - optical research ring",
    varnaPageTitle: "Varna - optical research ring",
    sofiaPageTitle: "Sofia - optical research ring",
    eyebrow: "National research network",
    heading: "Bulgaria - optical research backbone",
    plovdivHeading: "Plovdiv - optical research ring",
    shumenHeading: "Shumen - optical research ring",
    velikoTurnovoHeading: "Veliko Tarnovo - optical research ring",
    varnaHeading: "Varna - optical research ring",
    sofiaHeading: "Sofia - optical research ring",
    mapAria: "Interactive map of Bulgaria - optical research backbone",
    plovdivMapAria: "Interactive map of Plovdiv - optical research ring",
    shumenMapAria: "Interactive map of Shumen - optical research ring",
    velikoTurnovoMapAria: "Interactive map of Veliko Tarnovo - optical research ring",
    varnaMapAria: "Interactive map of Varna - optical research ring",
    sofiaMapAria: "Interactive map of Sofia - optical research ring",
    mapTitle: "Bulgaria - optical research backbone",
    plovdivMapTitle: "Plovdiv - optical research ring",
    shumenMapTitle: "Shumen - optical research ring",
    velikoTurnovoMapTitle: "Veliko Tarnovo - optical research ring",
    varnaMapTitle: "Varna - optical research ring",
    sofiaMapTitle: "Sofia - optical research ring",
    mapDescription:
      "Sofia connects through Blagoevgrad, Plovdiv, Sliven, Shumen, Varna, Ruse, Svishtov, Veliko Turnovo, Gabrovo, Pleven, Dolna Mitropolia, and back to Sofia. Rozhen connects to Plovdiv at 1Gb.",
    plovdivMapDescription:
      "Plovdiv city map with five academic network nodes, three 100Gb links, and two 10Gb links from TU-Sofia, Plovdiv Branch.",
    shumenMapDescription:
      "Shumen city map with four research network nodes, three 100Gb links between the main points of presence, and one 10Gb commodity link from NVU to Backup internet.",
    velikoTurnovoMapDescription:
      "Veliko Tarnovo city map with four research network nodes, three 100Gb links between the main points of presence, and one 10Gb commodity link from NVU to Backup internet.",
    varnaMapDescription:
      "Varna city map with seven points of presence, six 100Gb links between the main institutions, and one 10Gb commodity link from the Naval Academy to Backup internet.",
    sofiaMapDescription:
      "Sofia city map with 26 points of presence, 24 100Gb research links, three 100Gb peering links, one 2x100Gb link, and five 10Gb access links.",
    cities: "Cities",
    nodes: "Nodes",
    links: "Links",
    capacity: "Max. Capacity",
    controls: "Controls",
    animateTraffic: "Animate traffic",
    rrpFunded: "RRP funded",
    flowSpeed: "Flow speed",
    legend: "Legend",
    legend100: "100Gb",
    legend100Peering: "100Gb peering",
    legend200: "2x100Gb",
    legend10: "10Gb",
    legend10Internet: "10Gb commodity",
    legend1: "1Gb",
    legendAcademicNode: "Research node",
    legendRingNode: "City ring",
    legendStateNetwork: "State network",
    legendBackupInternet: "Backup Internet",
    legendGeantNode: "GÉANT node",
    legendPeeringNode: "Peering",
    selectedSegment: "Selection",
    selectedHint: "Click a network line to view its capacity.",
    routeConnector: "to",
    capacityLine: "Capacity",
    activeSummary: "12 x 100Gb + 1 x 1Gb",
    plovdivActiveSummary: "3 x 100Gb + 2 x 10Gb",
    shumenActiveSummary: "3 x 100Gb + 1 x 10Gb",
    velikoTurnovoActiveSummary: "3 x 100Gb + 1 x 10Gb",
    varnaActiveSummary: "6 x 100Gb + 1 x 10Gb",
    sofiaActiveSummary: "24 x 100Gb + 3 x 100Gb peering + 1 x 2x100Gb + 5 x 10Gb",
    node: "node",
    academicNode: "Research node",
    website: "Website",
    contact: "Contact person",
    contactEmpty: "Not set",
    underConstruction: "Under Construction",
    close: "Close",
    return: "Return",
    visualizationNote:
      "Note: This is an approximate visualization at a logical level and this map does not claim to be reliable in distances or actual implementation of routes, but only aims to give a general idea of the network topology"
  },
  bg: {
    pageTitle: "България - оптична изследователска магистрала",
    plovdivPageTitle: "Пловдив - оптичен изследователски пръстен",
    shumenPageTitle: "Шумен - оптичен изследователски пръстен",
    velikoTurnovoPageTitle: "Велико Търново - оптичен изследователски пръстен",
    varnaPageTitle: "Варна - оптичен изследователски пръстен",
    sofiaPageTitle: "София - оптичен изследователски пръстен",
    eyebrow: "Национална изследователска мрежа",
    heading: "България - оптична изследователска магистрала",
    plovdivHeading: "Пловдив - оптичен изследователски пръстен",
    shumenHeading: "Шумен - оптичен изследователски пръстен",
    velikoTurnovoHeading: "Велико Търново - оптичен изследователски пръстен",
    varnaHeading: "Варна - оптичен изследователски пръстен",
    sofiaHeading: "София - оптичен изследователски пръстен",
    mapAria: "Интерактивна карта на България - оптична изследователска магистрала",
    plovdivMapAria: "Интерактивна карта на Пловдив - оптичен изследователски пръстен",
    shumenMapAria: "Интерактивна карта на Шумен - оптичен изследователски пръстен",
    velikoTurnovoMapAria: "Интерактивна карта на Велико Търново - оптичен изследователски пръстен",
    varnaMapAria: "Интерактивна карта на Варна - оптичен изследователски пръстен",
    sofiaMapAria: "Интерактивна карта на София - оптичен изследователски пръстен",
    mapTitle: "България - оптична изследователска магистрала",
    plovdivMapTitle: "Пловдив - оптичен изследователски пръстен",
    shumenMapTitle: "Шумен - оптичен изследователски пръстен",
    velikoTurnovoMapTitle: "Велико Търново - оптичен изследователски пръстен",
    varnaMapTitle: "Варна - оптичен изследователски пръстен",
    sofiaMapTitle: "София - оптичен изследователски пръстен",
    mapDescription:
      "София се свързва през Благоевград, Пловдив, Сливен, Шумен, Варна, Русе, Свищов, Велико Търново, Габрово, Плевен, Долна Митрополия и обратно към София. Рожен е свързан към Пловдив с 1Gb.",
    plovdivMapDescription:
      "Градска карта на Пловдив с пет академични възела, три 100Gb връзки и две 10Gb връзки от ТУ-София, филиал Пловдив.",
    shumenMapDescription:
      "Градска карта на Шумен с четири изследователски възела, три 100Gb връзки между основните точки на присъствие и една 10Gb интернет връзка от НВУ към Бекъп интернет.",
    velikoTurnovoMapDescription:
      "Градска карта на Велико Търново с четири изследователски възела, три 100Gb връзки между основните точки на присъствие и една 10Gb интернет връзка от НВУ към Бекъп интернет.",
    varnaMapDescription:
      "Градска карта на Варна със седем точки на присъствие, шест 100Gb връзки между основните институции и една 10Gb интернет връзка от ВВМУ към Бекъп интернет.",
    sofiaMapDescription:
      "Градска карта на София с 26 точки на присъствие, 24 изследователски 100Gb връзки, три 100Gb пиъринг връзки, една 2x100Gb връзка и пет 10Gb връзки.",
    cities: "Града",
    nodes: "Възела",
    links: "Връзки",
    capacity: "Макс. капацитет",
    controls: "Управление",
    animateTraffic: "Анимирай трафика",
    rrpFunded: "Финансиран по ПВУ",
    flowSpeed: "Скорост на потока",
    legend: "Легенда",
    legend100: "100Gb",
    legend100Peering: "100Gb пиъринг",
    legend200: "2x100Gb",
    legend10: "10Gb",
    legend10Internet: "10Gb интернет",
    legend1: "1Gb",
    legendAcademicNode: "изследователски възел",
    legendRingNode: "градски пръстен",
    legendStateNetwork: "държавна мрежа",
    legendBackupInternet: "бекъп интернет",
    legendGeantNode: "GÉANT възел",
    legendPeeringNode: "пиъринг",
    selectedSegment: "Избор",
    selectedHint: "Натиснете линия от мрежата, за да видите капацитета.",
    routeConnector: "към",
    capacityLine: "Капацитет",
    activeSummary: "12 x 100Gb + 1 x 1Gb",
    plovdivActiveSummary: "3 x 100Gb + 2 x 10Gb",
    shumenActiveSummary: "3 x 100Gb + 1 x 10Gb",
    velikoTurnovoActiveSummary: "3 x 100Gb + 1 x 10Gb",
    varnaActiveSummary: "6 x 100Gb + 1 x 10Gb",
    sofiaActiveSummary: "24 x 100Gb + 3 x 100Gb пиъринг + 1 x 2x100Gb + 5 x 10Gb",
    node: "възел",
    academicNode: "Изследователски възел",
    website: "Уеб сайт",
    contact: "Лице за контакт",
    contactEmpty: "Не е зададено",
    underConstruction: "В процес на подготовка",
    close: "Затвори",
    return: "Return",
    visualizationNote:
      "Забележка: Това е приблизителна визуализация на логическо ниво и настоящата карта не претендира за достоверност на разстояния или реална реализация на трасета, а цели само да даде най-обща представа за топологията на мрежата"
  }
};

const svg = document.getElementById("networkMap");
const mapStage = document.querySelector(".map-stage");
const backgroundLayer = document.getElementById("backgroundLayer");
const linkLayer = document.getElementById("linkLayer");
const cityLayer = document.getElementById("cityLayer");
const selectedDetails = document.getElementById("selectedDetails");
const activeSummary = document.getElementById("activeSummary");
const languageEnBtn = document.getElementById("languageEnBtn");
const languageBgBtn = document.getElementById("languageBgBtn");
const animateToggle = document.getElementById("animateToggle");
const rrpToggle = document.getElementById("rrpToggle");
const speedRange = document.getElementById("speedRange");
const cityPopup = document.getElementById("cityPopup");
const legendList = document.getElementById("legendList");
const returnMapButton = document.getElementById("returnMapButton");
const returnMapIconPath = returnMapButton.querySelector("path");
const metricValues = document.querySelectorAll(".metric-value");
const metricLabels = document.querySelectorAll(".metric-label");

const cityByName = new Map(cities.map((city) => [city.name, city]));
const linkElements = new Map();
const cityElements = new Map();

let currentLanguage = window.location.hash === "#bg" ? "bg" : "en";
let currentView = "bulgaria";
let activeLinks = links;
let activePointGetter = getCityPoint;
let selectedLinkId = "";
let activePopupCity = "";

function createSvgElement(tagName, attributes = {}) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", tagName);
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  return element;
}

function setSvgTitle(element, text) {
  let titleElement = Array.from(element.children).find((child) => child.tagName.toLowerCase() === "title");

  if (!titleElement) {
    titleElement = createSvgElement("title");
    element.insertBefore(titleElement, element.firstChild);
  }

  titleElement.textContent = text;
}

function t(key) {
  return translations[currentLanguage][key] ?? translations.en[key] ?? key;
}

function displayCityName(cityName) {
  const city = cityByName.get(cityName);
  return currentLanguage === "bg" ? city.bg : city.name;
}

function cityLabelOffset(city) {
  return currentLanguage === "en" && city.labelEn ? city.labelEn : city.label;
}

function cityLabelAnchor(labelOffset) {
  return labelOffset[0] < -10 ? "end" : "middle";
}

function isCityDetailView(view = currentView) {
  return Object.hasOwn(detailViews, view);
}

function currentDetailView() {
  return detailViews[currentView];
}

function currentDetailNodes() {
  return currentDetailView().nodes;
}

function currentDetailLinks() {
  return currentDetailView().links;
}

function currentDetailNodeById() {
  return currentDetailView().nodeById;
}

function currentDetailNodeDetails() {
  return currentDetailView().nodeDetails;
}

function currentDetailSummaryKey() {
  return currentDetailView().summaryKey;
}

function displayPointName(pointName) {
  if (isCityDetailView()) {
    const node = currentDetailNodeById().get(pointName);
    return node ? (currentLanguage === "bg" ? node.bg : node.name) : pointName;
  }

  return displayCityName(pointName);
}

function displayDetailLabel(nodeId) {
  const node = currentDetailNodeById().get(nodeId);
  return currentLanguage === "bg" ? node.labelBg : node.labelName;
}

function detailLabelOffset(node) {
  return currentLanguage === "en" && node.labelEn ? node.labelEn : node.label;
}

function detailLabelAnchor(node, labelOffset) {
  return node.anchor ?? (labelOffset[0] < -10 ? "end" : "start");
}

function activateCity(city) {
  clearSelection();
  if (city.name === "Sofia") {
    showSofiaMap();
  } else if (city.name === "Plovdiv") {
    showPlovdivMap();
  } else if (city.name === "Shumen") {
    showShumenMap();
  } else if (city.name === "Veliko Turnovo") {
    showVelikoTurnovoMap();
  } else if (city.name === "Varna") {
    showVarnaMap();
  } else {
    showCityPopup(city.name);
  }
}

function activateDetailNode(nodeId) {
  selectDetailNode(nodeId);
  showDetailNodePopup(nodeId);
}

function setSvgTextLines(element, lines) {
  const textLines = Array.isArray(lines) ? lines : [lines];
  const x = element.getAttribute("x");

  element.replaceChildren();
  const lineGap = currentView === "sofia" ? "12" : "18";
  textLines.forEach((line, index) => {
    const tspan = createSvgElement("tspan", {
      x,
      dy: index === 0 ? "0" : lineGap
    });
    tspan.textContent = line;
    element.appendChild(tspan);
  });
}

function detailNodeTypeClass(nodeId) {
  if (
    nodeId === "regional-admin" ||
    nodeId === "sh-regional-admin" ||
    nodeId === "vt-regional-admin" ||
    nodeId === "va-regional-admin" ||
    nodeId === "so-meu" ||
    nodeId === "so-kkipko"
  ) {
    return "state-network-node";
  }

  if (
    nodeId === "evolink-plovdiv" ||
    nodeId === "sh-backup-internet" ||
    nodeId === "vt-backup-internet" ||
    nodeId === "va-backup-internet"
  ) {
    return "backup-node";
  }

  if (nodeId === "so-equinix-so2") {
    return "geant-node";
  }

  if (nodeId === "so-a1-peering" || nodeId === "so-evolink-peering" || nodeId === "so-bix-peering") {
    return "peering-node";
  }

  return "academic-node";
}

function isRrpFundedPoint(pointId) {
  if (currentView === "bulgaria") {
    return rrpFundedCities.has(pointId);
  }

  const fundedNodes = rrpFundedDetailNodes[currentView];
  return Boolean(fundedNodes && fundedNodes.has(pointId));
}

function rrpFundingClass(pointId) {
  return isRrpFundedPoint(pointId) ? " rrp-funded" : "";
}

function routeText(link) {
  return `${displayPointName(link.from)} ${t("routeConnector")} ${displayPointName(link.to)}`;
}

function capacityText(link) {
  if (link.capacityLabelKey) {
    return t(link.capacityLabelKey);
  }

  return link.capacityLabel ?? `${link.capacityGb}Gb`;
}

function project(lng, lat) {
  const x = bounds.x + ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * bounds.width;
  const y = bounds.y + ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * bounds.height;
  return { x, y };
}

function pathFromCoordinates(coords, close = false) {
  return coords
    .map(([lng, lat], index) => {
      const point = project(lng, lat);
      return `${index === 0 ? "M" : "L"} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`;
    })
    .join(" ")
    .concat(close ? " Z" : "");
}

function pathFromProjectedCoordinates(coords, projector, close = false) {
  return coords
    .map(([lng, lat], index) => {
      const point = projector(lng, lat);
      return `${index === 0 ? "M" : "L"} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`;
    })
    .join(" ")
    .concat(close ? " Z" : "");
}

function getCityPoint(name) {
  const city = cityByName.get(name);
  return project(city.lng, city.lat);
}

function projectPlovdiv(lng, lat) {
  const x = plovdivMapFrame.x + ((lng - plovdivBounds.minLng) / (plovdivBounds.maxLng - plovdivBounds.minLng)) * plovdivMapFrame.width;
  const y = plovdivMapFrame.y + ((plovdivBounds.maxLat - lat) / (plovdivBounds.maxLat - plovdivBounds.minLat)) * plovdivMapFrame.height;
  return { x, y };
}

function getPlovdivPoint(nodeId) {
  const node = plovdivNodeById.get(nodeId);
  return projectPlovdiv(node.lng, node.lat);
}

function projectShumen(lng, lat) {
  const x = shumenMapFrame.x + ((lng - shumenBounds.minLng) / (shumenBounds.maxLng - shumenBounds.minLng)) * shumenMapFrame.width;
  const y = shumenMapFrame.y + ((shumenBounds.maxLat - lat) / (shumenBounds.maxLat - shumenBounds.minLat)) * shumenMapFrame.height;
  return { x, y };
}

function getShumenPoint(nodeId) {
  const node = shumenNodeById.get(nodeId);
  return projectShumen(node.lng, node.lat);
}

function projectVelikoTurnovo(lng, lat) {
  const x =
    velikoTurnovoMapFrame.x +
    ((lng - velikoTurnovoBounds.minLng) / (velikoTurnovoBounds.maxLng - velikoTurnovoBounds.minLng)) * velikoTurnovoMapFrame.width;
  const y =
    velikoTurnovoMapFrame.y +
    ((velikoTurnovoBounds.maxLat - lat) / (velikoTurnovoBounds.maxLat - velikoTurnovoBounds.minLat)) * velikoTurnovoMapFrame.height;
  return { x, y };
}

function getVelikoTurnovoPoint(nodeId) {
  const node = velikoTurnovoNodeById.get(nodeId);
  return projectVelikoTurnovo(node.lng, node.lat);
}

function projectVarna(lng, lat) {
  const x = varnaMapFrame.x + ((lng - varnaBounds.minLng) / (varnaBounds.maxLng - varnaBounds.minLng)) * varnaMapFrame.width;
  const y = varnaMapFrame.y + ((varnaBounds.maxLat - lat) / (varnaBounds.maxLat - varnaBounds.minLat)) * varnaMapFrame.height;
  return { x, y };
}

function getVarnaPoint(nodeId) {
  const node = varnaNodeById.get(nodeId);
  return projectVarna(node.lng, node.lat);
}

function projectSofia(lng, lat) {
  const x = sofiaMapFrame.x + ((lng - sofiaBounds.minLng) / (sofiaBounds.maxLng - sofiaBounds.minLng)) * sofiaMapFrame.width;
  const y = sofiaMapFrame.y + ((sofiaBounds.maxLat - lat) / (sofiaBounds.maxLat - sofiaBounds.minLat)) * sofiaMapFrame.height;
  return { x, y };
}

function getSofiaPoint(nodeId) {
  const node = sofiaNodeById.get(nodeId);
  return projectSofia(node.lng, node.lat);
}

function getLinkPoints(link) {
  return {
    from: activePointGetter(link.from),
    to: activePointGetter(link.to)
  };
}

function formatPointValue(value) {
  return value.toFixed(1);
}

function isBorderArcLink(link) {
  return link.id === "ruse-svishtov";
}

function linkPathD(link, offset = 0) {
  const { from, to } = getLinkPoints(link);

  if (currentView === "plovdiv" && link.id === "pd-agrarian-admin") {
    const controlA = {
      x: from.x - 14,
      y: from.y - 58
    };
    const controlB = {
      x: to.x + 64,
      y: to.y - 38
    };

    return [
      `M ${formatPointValue(from.x)} ${formatPointValue(from.y + offset)}`,
      `C ${formatPointValue(controlA.x)} ${formatPointValue(controlA.y + offset)}`,
      `${formatPointValue(controlB.x)} ${formatPointValue(controlB.y + offset)}`,
      `${formatPointValue(to.x)} ${formatPointValue(to.y + offset)}`
    ].join(" ");
  }

  if (currentView === "shumen" && link.id === "sh-shu-nvu") {
    const control = {
      x: (from.x + to.x) / 2,
      y: (from.y + to.y) / 2 + 62
    };

    return [
      `M ${formatPointValue(from.x)} ${formatPointValue(from.y + offset)}`,
      `Q ${formatPointValue(control.x)} ${formatPointValue(control.y + offset)}`,
      `${formatPointValue(to.x)} ${formatPointValue(to.y + offset)}`
    ].join(" ");
  }

  if (currentView === "velikoTurnovo" && link.id === "vt-nvu-admin") {
    const control = {
      x: (from.x + to.x) / 2,
      y: (from.y + to.y) / 2 - 58
    };

    return [
      `M ${formatPointValue(from.x)} ${formatPointValue(from.y + offset)}`,
      `Q ${formatPointValue(control.x)} ${formatPointValue(control.y + offset)}`,
      `${formatPointValue(to.x)} ${formatPointValue(to.y + offset)}`
    ].join(" ");
  }

  if (currentView === "velikoTurnovo" && link.id === "vt-university-nvu") {
    const control = {
      x: (from.x + to.x) / 2,
      y: (from.y + to.y) / 2 + 108
    };

    return [
      `M ${formatPointValue(from.x)} ${formatPointValue(from.y + offset)}`,
      `Q ${formatPointValue(control.x)} ${formatPointValue(control.y + offset)}`,
      `${formatPointValue(to.x)} ${formatPointValue(to.y + offset)}`
    ].join(" ");
  }

  if (currentView === "varna" && link.id === "va-admin-naval") {
    const control = {
      x: (from.x + to.x) / 2 - 12,
      y: (from.y + to.y) / 2 + 48
    };

    return [
      `M ${formatPointValue(from.x)} ${formatPointValue(from.y + offset)}`,
      `Q ${formatPointValue(control.x)} ${formatPointValue(control.y + offset)}`,
      `${formatPointValue(to.x)} ${formatPointValue(to.y + offset)}`
    ].join(" ");
  }

  if (currentView === "varna" && link.id === "va-economics-admin") {
    const control = {
      x: (from.x + to.x) / 2 - 22,
      y: (from.y + to.y) / 2 - 28
    };

    return [
      `M ${formatPointValue(from.x)} ${formatPointValue(from.y + offset)}`,
      `Q ${formatPointValue(control.x)} ${formatPointValue(control.y + offset)}`,
      `${formatPointValue(to.x)} ${formatPointValue(to.y + offset)}`
    ].join(" ");
  }

  if (currentView === "sofia" && link.id === "so-meu-military") {
    const control = {
      x: (from.x + to.x) / 2,
      y: (from.y + to.y) / 2 + 28
    };

    return [
      `M ${formatPointValue(from.x)} ${formatPointValue(from.y + offset)}`,
      `Q ${formatPointValue(control.x)} ${formatPointValue(control.y + offset)}`,
      `${formatPointValue(to.x)} ${formatPointValue(to.y + offset)}`
    ].join(" ");
  }

  if (currentView === "sofia" && link.id === "so-military-mu") {
    const control = {
      x: (from.x + to.x) / 2,
      y: (from.y + to.y) / 2 + 42
    };

    return [
      `M ${formatPointValue(from.x)} ${formatPointValue(from.y + offset)}`,
      `Q ${formatPointValue(control.x)} ${formatPointValue(control.y + offset)}`,
      `${formatPointValue(to.x)} ${formatPointValue(to.y + offset)}`
    ].join(" ");
  }

  if (currentView === "sofia" && link.id === "so-vtu-su") {
    const control = {
      x: (from.x + to.x) / 2,
      y: (from.y + to.y) / 2 - 155
    };

    return [
      `M ${formatPointValue(from.x)} ${formatPointValue(from.y + offset)}`,
      `Q ${formatPointValue(control.x)} ${formatPointValue(control.y + offset)}`,
      `${formatPointValue(to.x)} ${formatPointValue(to.y + offset)}`
    ].join(" ");
  }

  if (currentView === "sofia" && link.id === "so-fmi-unwe") {
    const control = {
      x: (from.x + to.x) / 2 - 52,
      y: (from.y + to.y) / 2
    };

    return [
      `M ${formatPointValue(from.x + offset)} ${formatPointValue(from.y)}`,
      `Q ${formatPointValue(control.x + offset)} ${formatPointValue(control.y)}`,
      `${formatPointValue(to.x + offset)} ${formatPointValue(to.y)}`
    ].join(" ");
  }

  if (currentView === "sofia" && link.id === "so-unibit1-unibit2") {
    const control = {
      x: (from.x + to.x) / 2 + 88,
      y: (from.y + to.y) / 2
    };

    return [
      `M ${formatPointValue(from.x)} ${formatPointValue(from.y + offset)}`,
      `Q ${formatPointValue(control.x)} ${formatPointValue(control.y + offset)}`,
      `${formatPointValue(to.x)} ${formatPointValue(to.y + offset)}`
    ].join(" ");
  }

  if (isBorderArcLink(link)) {
    const control = {
      x: (from.x + to.x) / 2 - 8,
      y: (from.y + to.y) / 2 + 48
    };

    return [
      `M ${formatPointValue(from.x)} ${formatPointValue(from.y + offset)}`,
      `Q ${formatPointValue(control.x)} ${formatPointValue(control.y + offset)}`,
      `${formatPointValue(to.x)} ${formatPointValue(to.y + offset)}`
    ].join(" ");
  }

  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.hypot(dx, dy) || 1;
  const normalX = (-dy / length) * offset;
  const normalY = (dx / length) * offset;

  return [
    `M ${formatPointValue(from.x + normalX)} ${formatPointValue(from.y + normalY)}`,
    `L ${formatPointValue(to.x + normalX)} ${formatPointValue(to.y + normalY)}`
  ].join(" ");
}

function drawBackground() {
  backgroundLayer.appendChild(
    createSvgElement("path", {
      class: "country-shape",
      d: pathFromCoordinates(bulgariaOutline, true)
    })
  );
}

function drawDetailBackground() {
  const { contour, projector } = currentDetailView();

  backgroundLayer.append(
    createSvgElement("path", {
      class: "plovdiv-contour-fill",
      d: pathFromProjectedCoordinates(contour, projector, true)
    }),
    createSvgElement("path", {
      class: "plovdiv-contour-line",
      d: pathFromProjectedCoordinates(contour, projector, true)
    })
  );
}

function drawLinks() {
  activeLinks.forEach((link) => {
    const lineOffset = isCityDetailView() ? 2.4 : flowLineOffset;
    const commodityClass = commodityLinkIds.has(link.id) ? " commodity-link" : "";
    const peeringClass = link.type === "peering" ? " peering-link" : "";
    const group = createSvgElement("g", {
      class: `link-group capacity-${link.capacityGb}${commodityClass}${peeringClass}`,
      "data-link-id": link.id
    });
    setSvgTitle(group, `${routeText(link)}, ${capacityText(link)}`);

    const shadow = createSvgElement("path", {
      class: "network-link-shadow",
      d: linkPathD(link)
    });

    const forward = createSvgElement("path", {
      class: "flow-line flow-forward",
      d: linkPathD(link, lineOffset)
    });

    const reverse = createSvgElement("path", {
      class: "flow-line flow-reverse",
      d: linkPathD(link, -lineOffset)
    });

    const hit = createSvgElement("path", {
      class: "link-hit",
      d: linkPathD(link),
      tabindex: "0",
      role: "button",
      "aria-label": `${routeText(link)}, ${capacityText(link)}`
    });

    hit.addEventListener("click", (event) => {
      event.stopPropagation();
      selectLink(link.id);
    });
    hit.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectLink(link.id);
      }
    });

    group.append(shadow, forward, reverse, hit);
    linkLayer.appendChild(group);
    linkElements.set(link.id, group);
  });
}

function drawCities() {
  cities.forEach((city) => {
    const point = project(city.lng, city.lat);
    const labelOffset = cityLabelOffset(city);
    const nodeTypeClass = underConstructionCities.has(city.name) ? "ring-node" : "academic-node";
    const group = createSvgElement("g", {
      class: `city-node ${nodeTypeClass}${rrpFundingClass(city.name)}`,
      tabindex: "0",
      role: "button",
      "aria-label": `${displayCityName(city.name)} ${t("node")}`
    });
    setSvgTitle(group, displayCityName(city.name));

    const halo = createSvgElement("circle", {
      class: "city-halo",
      cx: point.x,
      cy: point.y,
      r: 16
    });
    const dot = createSvgElement("circle", {
      class: "city-dot",
      cx: point.x,
      cy: point.y,
      r: 7
    });
    const label = createSvgElement("text", {
      class: "city-label",
      x: point.x + labelOffset[0],
      y: point.y + labelOffset[1],
      "text-anchor": cityLabelAnchor(labelOffset)
    });
    label.textContent = displayCityName(city.name);

    group.append(halo, dot, label);
    cityLayer.appendChild(group);
    cityElements.set(city.name, group);

    dot.addEventListener("click", (event) => {
      event.stopPropagation();
      activateCity(city);
    });
    group.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activateCity(city);
      }
    });
  });
}

function drawDetailNodes() {
  currentDetailNodes().forEach((node) => {
    const point = activePointGetter(node.id);
    const labelOffset = detailLabelOffset(node);
    const nodeTypeClass = detailNodeTypeClass(node.id);
    const group = createSvgElement("g", {
      class: `city-node ${nodeTypeClass} plovdiv-node${rrpFundingClass(node.id)}`,
      tabindex: "0",
      role: "button",
      "aria-label": `${displayPointName(node.id)} ${t("node")}`
    });
    setSvgTitle(group, displayPointName(node.id));

    const halo = createSvgElement("circle", {
      class: "city-halo",
      cx: point.x,
      cy: point.y,
      r: 26
    });
    const dot = createSvgElement("circle", {
      class: "city-dot",
      cx: point.x,
      cy: point.y,
      r: 12
    });
    const label = createSvgElement("text", {
      class: "city-label plovdiv-label",
      x: point.x + labelOffset[0],
      y: point.y + labelOffset[1],
      "text-anchor": detailLabelAnchor(node, labelOffset)
    });
    setSvgTextLines(label, displayDetailLabel(node.id));

    group.append(halo, dot, label);
    cityLayer.appendChild(group);
    cityElements.set(node.id, group);

    dot.addEventListener("click", (event) => {
      event.stopPropagation();
      activateDetailNode(node.id);
    });
    group.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activateDetailNode(node.id);
      }
    });
  });
}

function linkById(linkId) {
  return activeLinks.find((link) => link.id === linkId);
}

function selectLink(linkId) {
  selectedLinkId = linkId;
  hideCityPopup();

  linkElements.forEach((element, id) => {
    element.classList.toggle("active", id === linkId);
  });
  cityElements.forEach((element) => element.classList.remove("active"));

  const link = linkById(linkId);
  selectedDetails.innerHTML = `
    <div class="segment-card">
      <strong>${routeText(link)}</strong>
      <span>${t("capacityLine")}: ${capacityText(link)}</span>
    </div>
  `;
  activeSummary.textContent = `${routeText(link)} · ${capacityText(link)}`;
}

function selectDetailNode(nodeId) {
  selectedLinkId = "";
  hideCityPopup();

  linkElements.forEach((element) => element.classList.remove("active"));
  cityElements.forEach((element, id) => {
    element.classList.toggle("active", id === nodeId);
  });

  const node = currentDetailNodeById().get(nodeId);
  selectedDetails.innerHTML = `
    <div class="segment-card">
      <strong>${displayPointName(nodeId)}</strong>
      <span>${node.address}</span>
    </div>
  `;
  activeSummary.textContent = displayPointName(nodeId);
}

function clearSelection() {
  selectedLinkId = "";
  linkElements.forEach((element) => element.classList.remove("active"));
  cityElements.forEach((element) => element.classList.remove("active"));
  selectedDetails.innerHTML = "";
  activeSummary.textContent = isCityDetailView() ? t(currentDetailSummaryKey()) : t("activeSummary");
}

function svgPointToStage(point) {
  const stageRect = mapStage.getBoundingClientRect();
  return {
    x: (point.x / 1200) * stageRect.width,
    y: (point.y / 760) * stageRect.height
  };
}

function showCityPopup(cityName) {
  const city = cityByName.get(cityName);
  const point = svgPointToStage(getCityPoint(cityName));
  const details = cityDetails[cityName];
  const isUnderConstruction = underConstructionCities.has(cityName);
  activePopupCity = cityName;

  cityElements.forEach((element, name) => {
    element.classList.toggle("active", name === cityName);
  });

  if (isUnderConstruction || !details) {
    cityPopup.innerHTML = `
      <button class="popup-close" type="button" aria-label="${t("close")}">×</button>
      <div class="popup-placeholder">UC</div>
      <div>
        <p class="popup-kicker">${displayCityName(city.name)}</p>
        <h3>${t("underConstruction")}</h3>
      </div>
    `;
  } else {
    cityPopup.innerHTML = `
      <button class="popup-close" type="button" aria-label="${t("close")}">×</button>
      <img class="popup-image" src="${details.image}" alt="" loading="lazy" />
      <div>
        <p class="popup-kicker">${t("academicNode")}</p>
        <h3>${details.name[currentLanguage]}</h3>
        <dl class="popup-meta">
          <div>
            <dt>${t("website")}</dt>
            <dd><a href="${details.website}" target="_blank" rel="noreferrer">${details.website}</a></dd>
          </div>
          <div>
            <dt>${t("contact")}</dt>
            <dd>${t("contactEmpty")}</dd>
          </div>
        </dl>
      </div>
    `;
  }

  cityPopup.hidden = false;
  cityPopup.classList.add("visible");
  positionCityPopup(point.x, point.y);
  cityPopup.querySelector(".popup-close")?.addEventListener("click", (event) => {
    event.stopPropagation();
    hideCityPopup();
  });
}

function showDetailNodePopup(nodeId) {
  const details = currentDetailNodeDetails()[nodeId];
  const point = svgPointToStage(activePointGetter(nodeId));
  activePopupCity = nodeId;

  cityPopup.innerHTML = `
    <button class="popup-close" type="button" aria-label="${t("close")}">×</button>
    <img class="popup-image" src="${details.image}" alt="" loading="lazy" />
    <div>
      <p class="popup-kicker">${displayPointName(nodeId)}</p>
      <h3>${details.name[currentLanguage]}</h3>
      <dl class="popup-meta">
        <div>
          <dt>${t("website")}</dt>
          <dd><a href="${details.website}" target="_blank" rel="noreferrer">${details.website}</a></dd>
        </div>
        <div>
          <dt>${t("contact")}</dt>
          <dd>${t("contactEmpty")}</dd>
        </div>
      </dl>
    </div>
  `;

  cityPopup.hidden = false;
  cityPopup.classList.add("visible");
  positionCityPopup(point.x, point.y);
  cityPopup.querySelector(".popup-close")?.addEventListener("click", (event) => {
    event.stopPropagation();
    hideCityPopup();
  });
}

function positionCityPopup(x, y) {
  const stageRect = mapStage.getBoundingClientRect();
  const popupRect = cityPopup.getBoundingClientRect();
  const margin = 12;
  const left = Math.max(margin, Math.min(x + 18, stageRect.width - popupRect.width - margin));
  const top = Math.max(margin, Math.min(y + 18, stageRect.height - popupRect.height - margin));

  cityPopup.style.left = `${left}px`;
  cityPopup.style.top = `${top}px`;
}

function hideCityPopup() {
  activePopupCity = "";
  cityPopup.hidden = true;
  cityPopup.classList.remove("visible");
  cityElements.forEach((element) => element.classList.remove("active"));
}

function updateCityLabels() {
  cityElements.forEach((element, cityName) => {
    const label = element.querySelector(".city-label");
    if (label) {
      if (isCityDetailView() && currentDetailNodeById().has(cityName)) {
        const node = currentDetailNodeById().get(cityName);
        const point = activePointGetter(cityName);
        const labelOffset = detailLabelOffset(node);
        label.setAttribute("x", point.x + labelOffset[0]);
        label.setAttribute("y", point.y + labelOffset[1]);
        label.setAttribute("text-anchor", detailLabelAnchor(node, labelOffset));
        setSvgTextLines(label, displayDetailLabel(cityName));
      } else {
        const city = cityByName.get(cityName);
        if (city) {
          const point = project(city.lng, city.lat);
          const labelOffset = cityLabelOffset(city);
          label.setAttribute("x", point.x + labelOffset[0]);
          label.setAttribute("y", point.y + labelOffset[1]);
          label.setAttribute("text-anchor", cityLabelAnchor(labelOffset));
        }
        label.textContent = displayPointName(cityName);
      }
    }
    element.setAttribute("aria-label", `${displayPointName(cityName)} ${t("node")}`);
    setSvgTitle(element, displayPointName(cityName));
  });
}

function updateLinkAriaLabels() {
  linkElements.forEach((element, linkId) => {
    const link = linkById(linkId);
    element.querySelector(".link-hit")?.setAttribute("aria-label", `${routeText(link)}, ${capacityText(link)}`);
    setSvgTitle(element, `${routeText(link)}, ${capacityText(link)}`);
  });
}

function renderReturnMapIcon() {
  const miniBounds = bulgariaOutline.reduce(
    (acc, [lng, lat]) => ({
      minLng: Math.min(acc.minLng, lng),
      maxLng: Math.max(acc.maxLng, lng),
      minLat: Math.min(acc.minLat, lat),
      maxLat: Math.max(acc.maxLat, lat)
    }),
    { minLng: Infinity, maxLng: -Infinity, minLat: Infinity, maxLat: -Infinity }
  );
  const width = 64;
  const height = 42;
  const margin = 3;
  const scale = Math.min(
    (width - margin * 2) / (miniBounds.maxLng - miniBounds.minLng),
    (height - margin * 2) / (miniBounds.maxLat - miniBounds.minLat)
  );
  const drawnWidth = (miniBounds.maxLng - miniBounds.minLng) * scale;
  const drawnHeight = (miniBounds.maxLat - miniBounds.minLat) * scale;
  const offsetX = (width - drawnWidth) / 2;
  const offsetY = (height - drawnHeight) / 2;

  const d = bulgariaOutline
    .map(([lng, lat], index) => {
      const x = offsetX + (lng - miniBounds.minLng) * scale;
      const y = offsetY + (miniBounds.maxLat - lat) * scale;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ")
    .concat(" Z");

  returnMapIconPath.setAttribute("d", d);
}

function renderLegend() {
  legendList.classList.toggle("plovdiv-legend", isCityDetailView());
  legendList.classList.toggle("main-map-legend", !isCityDetailView());

  if (isCityDetailView()) {
    const has200 = activeLinks.some((link) => link.capacityGb === 200);
    const hasPeering = activeLinks.some((link) => link.type === "peering");
    const hasStandard10 = activeLinks.some((link) => link.capacityGb === 10 && !commodityLinkIds.has(link.id));
    const hasCommodity10 = activeLinks.some((link) => commodityLinkIds.has(link.id));
    const detailNodeTypes = new Set(currentDetailNodes().map((node) => detailNodeTypeClass(node.id)));
    const twoHundredGbRow = has200
      ? `<div class="legend-row">
          <span class="legend-line legend-200" aria-hidden="true"></span>
          <span>${t("legend200")}</span>
        </div>`
      : "";
    const peeringRow = hasPeering
      ? `<div class="legend-row">
          <span class="legend-line legend-peering" aria-hidden="true"></span>
          <span>${t("legend100Peering")}</span>
        </div>`
      : "";
    const tenGbRows = [
      hasStandard10
        ? `<div class="legend-row">
          <span class="legend-line legend-10" aria-hidden="true"></span>
          <span>${t("legend10")}</span>
        </div>`
        : "",
      hasCommodity10
        ? `<div class="legend-row">
          <span class="legend-line legend-commodity" aria-hidden="true"></span>
          <span>${t("legend10Internet")}</span>
        </div>`
        : ""
    ].join("");
    const nodeRows = [
      detailNodeTypes.has("state-network-node")
        ? `<div class="legend-row">
          <span class="legend-node legend-node-state" aria-hidden="true"></span>
          <span>${t("legendStateNetwork")}</span>
        </div>`
        : "",
      detailNodeTypes.has("academic-node")
        ? `<div class="legend-row">
          <span class="legend-node legend-node-academic" aria-hidden="true"></span>
          <span>${t("legendAcademicNode")}</span>
        </div>`
        : "",
      detailNodeTypes.has("backup-node")
        ? `<div class="legend-row">
          <span class="legend-node legend-node-backup" aria-hidden="true"></span>
          <span>${t("legendBackupInternet")}</span>
        </div>`
        : "",
      detailNodeTypes.has("geant-node")
        ? `<div class="legend-row">
          <span class="legend-node legend-node-geant" aria-hidden="true"></span>
          <span>${t("legendGeantNode")}</span>
        </div>`
        : "",
      detailNodeTypes.has("peering-node")
        ? `<div class="legend-row">
          <span class="legend-node legend-node-peering" aria-hidden="true"></span>
          <span>${t("legendPeeringNode")}</span>
        </div>`
        : ""
    ].join("");

    legendList.innerHTML = `
      <div class="legend-column">
        ${twoHundredGbRow}
        <div class="legend-row">
          <span class="legend-line legend-100" aria-hidden="true"></span>
          <span>${t("legend100")}</span>
        </div>
        ${peeringRow}
        ${tenGbRows}
      </div>
      <div class="legend-column">
        ${nodeRows}
      </div>
    `;
    return;
  }

  const items =
    [
      { marker: '<span class="legend-line legend-100" aria-hidden="true"></span>', label: t("legend100") },
      {
        marker: '<span class="legend-node legend-node-academic" aria-hidden="true"></span>',
        label: t("legendAcademicNode"),
        className: "main-node-legend-row"
      },
      { marker: '<span class="legend-line legend-1" aria-hidden="true"></span>', label: t("legend1") },
      {
        marker: '<span class="legend-node legend-node-ring" aria-hidden="true"></span>',
        label: t("legendRingNode"),
        className: "main-node-legend-row"
      }
    ];

  legendList.innerHTML = items
    .map(
      (item) => `
        <div class="legend-row ${item.className ?? ""}">
          ${item.marker}
          <span>${item.label}</span>
        </div>
      `
    )
    .join("");
}

function updateMetrics() {
  if (isCityDetailView()) {
    metricValues[0].textContent = String(currentDetailNodes().length);
    metricLabels[0].textContent = t("nodes");
    metricValues[1].textContent = String(currentDetailLinks().length);
    metricLabels[1].textContent = t("links");
    metricValues[2].textContent = currentDetailLinks().some((link) => link.capacityGb === 200) ? "2x100Gb" : "100Gb";
    metricLabels[2].textContent = t("capacity");
    return;
  }

  metricValues[0].textContent = String(cities.length);
  metricLabels[0].textContent = t("cities");
  metricValues[1].textContent = String(links.length);
  metricLabels[1].textContent = t("links");
  metricValues[2].textContent = "100Gb";
  metricLabels[2].textContent = t("capacity");
}

function updateViewText() {
  const viewPrefix = isCityDetailView() ? currentView : "";
  const titleKey = viewPrefix ? `${viewPrefix}PageTitle` : "pageTitle";
  const headingKey = viewPrefix ? `${viewPrefix}Heading` : "heading";
  const mapAriaKey = viewPrefix ? `${viewPrefix}MapAria` : "mapAria";
  const mapTitleKey = viewPrefix ? `${viewPrefix}MapTitle` : "mapTitle";
  const mapDescriptionKey = viewPrefix ? `${viewPrefix}MapDescription` : "mapDescription";

  document.title = t(titleKey);
  document.querySelector("[data-i18n='heading']").textContent = t(headingKey);
  document.getElementById("mapTitle").textContent = t(mapTitleKey);
  document.getElementById("mapDescription").textContent = t(mapDescriptionKey);
  mapStage.setAttribute("aria-label", t(mapAriaKey));
}

function applyLanguage() {
  document.documentElement.lang = currentLanguage === "bg" ? "bg" : "en";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });

  updateViewText();
  updateMetrics();
  renderLegend();
  languageEnBtn.classList.toggle("active", currentLanguage === "en");
  languageBgBtn.classList.toggle("active", currentLanguage === "bg");
  languageEnBtn.setAttribute("aria-pressed", String(currentLanguage === "en"));
  languageBgBtn.setAttribute("aria-pressed", String(currentLanguage === "bg"));
  returnMapButton.setAttribute("aria-label", t("return"));

  updateCityLabels();
  updateLinkAriaLabels();

  if (selectedLinkId) {
    selectLink(selectedLinkId);
  } else if (activePopupCity) {
    const pointName = activePopupCity;
    activeSummary.textContent = isCityDetailView() ? t(currentDetailSummaryKey()) : t("activeSummary");
    if (isCityDetailView() && currentDetailNodeById().has(pointName)) {
      showDetailNodePopup(pointName);
    } else {
      showCityPopup(pointName);
    }
  } else {
    clearSelection();
  }
}

function setLanguage(language) {
  if (currentLanguage === language) {
    return;
  }

  currentLanguage = language;
  history.replaceState(null, "", `${window.location.pathname}${window.location.search}${language === "bg" ? "#bg" : ""}`);
  applyLanguage();
}

function setFlowSpeed() {
  const speed = Number(speedRange.value);
  const duration = (4.8 / speed).toFixed(2);
  svg.style.setProperty("--flow-duration", `${duration}s`);
}

function resetMapLayers() {
  backgroundLayer.replaceChildren();
  linkLayer.replaceChildren();
  cityLayer.replaceChildren();
  linkElements.clear();
  cityElements.clear();
  selectedLinkId = "";
  activePopupCity = "";
  hideCityPopup();
}

function showBulgariaMap() {
  currentView = "bulgaria";
  activeLinks = links;
  activePointGetter = getCityPoint;
  mapStage.classList.remove("plovdiv-view");
  mapStage.classList.remove("sofia-view");
  returnMapButton.hidden = true;

  resetMapLayers();
  drawBackground();
  drawLinks();
  drawCities();
  applyLanguage();
}

function showDetailMap(viewName) {
  currentView = viewName;
  activeLinks = currentDetailLinks();
  activePointGetter = currentDetailView().pointGetter;
  mapStage.classList.add("plovdiv-view");
  mapStage.classList.toggle("sofia-view", viewName === "sofia");
  returnMapButton.hidden = false;

  resetMapLayers();
  drawDetailBackground();
  drawLinks();
  drawDetailNodes();
  applyLanguage();
}

function showPlovdivMap() {
  showDetailMap("plovdiv");
}

function showShumenMap() {
  showDetailMap("shumen");
}

function showVelikoTurnovoMap() {
  showDetailMap("velikoTurnovo");
}

function showVarnaMap() {
  showDetailMap("varna");
}

function showSofiaMap() {
  showDetailMap("sofia");
}

function bindControls() {
  languageEnBtn.addEventListener("click", () => setLanguage("en"));
  languageBgBtn.addEventListener("click", () => setLanguage("bg"));
  svg.classList.toggle("rrp-visible", rrpToggle.checked);
  returnMapButton.addEventListener("click", (event) => {
    event.stopPropagation();
    showBulgariaMap();
  });
  animateToggle.addEventListener("change", () => {
    svg.classList.toggle("traffic-paused", !animateToggle.checked);
  });
  rrpToggle.addEventListener("change", () => {
    svg.classList.toggle("rrp-visible", rrpToggle.checked);
  });
  speedRange.addEventListener("input", setFlowSpeed);

  svg.addEventListener("click", () => {
    clearSelection();
    hideCityPopup();
  });
  mapStage.addEventListener("click", (event) => {
    if (event.target === mapStage || event.target.classList.contains("map-base")) {
      clearSelection();
      hideCityPopup();
    }
  });
  cityPopup.addEventListener("click", (event) => event.stopPropagation());
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".link-group") && !event.target.closest(".city-node") && !event.target.closest(".city-popup")) {
      clearSelection();
      hideCityPopup();
    }
  });
}

function initialize() {
  bindControls();
  setFlowSpeed();
  renderReturnMapIcon();
  const initialParams = new URLSearchParams(window.location.search);
  const initialView = initialParams.get("view");
  if (isCityDetailView(initialView)) {
    showDetailMap(initialView);
    const initialNode = initialParams.get("node");
    if (currentDetailNodeById().has(initialNode)) {
      selectDetailNode(initialNode);
      showDetailNodePopup(initialNode);
    }
  } else {
    showBulgariaMap();
  }
}

initialize();
