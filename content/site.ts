/**
 * Увесь текст сайту в одному місці.
 * Правки контенту робляться тут, лізти в розмітку не треба.
 *
 * ⚠️ TODO — заглушки, чекають на дані від клієнта.
 */

export const site = {
  name: "TUTI Games",
  world: "TUTI World",
  url: "https://tutigames.com", // TODO: справжній домен
  locale: "uk_UA",
  title: "TUTI Games — ігри, у яких не можна програти",
  description:
    "Студія TUTI Games малює вручну розвивальні ігри для дошкільнят. Світ Карпат, знайомі звірята, жодної реклами й покупок усередині.",
} as const;

// Якорі записані від кореня («/#apps», а не «#apps»): те саме меню
// показується й на сторінках статей, звідки простий якір вів би нікуди.
export const nav = [
  { href: "/#apps", label: "Ігри" },
  { href: "/#about", label: "Про нас" },
  { href: "/articles", label: "Статті" },
  { href: "/#careers", label: "Кар'єра" },
  { href: "/#contact", label: "Контакти" },
] as const;

export const hero = {
  // Заголовок розбитий на три частини: на перше слово чіпляються смужки,
  // на останнє — зірка. Обидва рендеряться окремими span'ами, тож декор
  // їде за текстом на будь-якій ширині екрана.
  title: { start: "Тут", middle: "ніхто не", end: "програє" },
  lead: "Десять маленьких ігор про Карпати, ведмедика й зайчика Бібу. Без таймерів, без поразки й без реклами — дитина грає сама і в своєму темпі.",
  primary: { label: "Подивитися ігри", href: "#apps" },
  secondary: { label: "Про студію", href: "#about" },
  // Два кадри однієї сцени: широкий намальований під низьку смугу на
  // десктопі, звичайний — під телефон, де 7:3 перетворилося б на стрічку.
  cover: "hero-tuti",
  coverWide: "hero-tuti-wide",
  coverAlt: "Звірята TUTI на галявині біля озера в Карпатах",
} as const;

/**
 * Стрічка «Що в роботі».
 * TODO: замінити на справжні новини й дати, коли з'являться релізи.
 */
export const highlights = [
  {
    title: "Біба вирушає в гори",
    text: "Санчата, снігохід і засніжений схил. Зайчик зупиняється на кожній перешкоді — далі не поїде, поки не розберемо предмети за формою.",
    cover: "biba-sled",
  },
  {
    title: "Вісім кроків до борщу",
    text: "Казанок на вогні, підказка над ним і продукти внизу. Буряк, капуста, картопля — і жодного апельсина.",
    cover: "borsch-01",
  },
  {
    title: "Хата з кахляною піччю",
    text: "Ведмедик і білочка збираються на прогулянку. Одяг однаковий, розміри різні — головне нікого не переплутати.",
    cover: "hut-dressed",
  },
  {
    title: "Три наплічники в похід",
    text: "Червоний, синій і зелений. Ліхтарик, казанок, карта й килимок мають розійтися по своїх кольорах.",
    cover: "backpacks-01",
  },
] as const;

/**
 * Застосунки.
 * TODO: підтвердити фінальні назви та розподіл міні-ігор по застосунках.
 */
export const apps = [
  {
    slug: "biba-carpathians",
    title: "Біба в Карпатах",
    tagline: "Дорога горами й сортування за формою",
    description: "Зайчик спускається схилами. Щоб рушити далі — розклади предмети за формою.",
    cover: "biba-wide",
    coverTall: "biba-tall",
    tone: "sky",
    games: ["shapes", "sorter"],
  },
  {
    slug: "tuti-kitchen",
    title: "Кухня TUTI",
    tagline: "Готуємо борщ разом",
    description: "Казанок на вогні й підказка над ним. Вісім кроків до готової страви.",
    cover: "kitchen-wide",
    coverTall: "kitchen-tall",
    tone: "coral",
    games: ["borsch", "edible", "counting"],
  },
  {
    slug: "tuti-camp",
    title: "Похід TUTI",
    tagline: "Збираємо наплічник і облаштовуємо табір",
    description: "Три наплічники різного кольору, намет і багаття. Дві механіки поруч.",
    cover: "camp-wide",
    coverTall: "camp-tall",
    tone: "grass",
    games: ["colors", "picture", "puzzle"],
  },
  {
    slug: "tuti-home",
    title: "Хата у горах",
    tagline: "Великий і малий",
    description: "Ведмедик і білочка збираються гуляти. Одяг однаковий, розміри різні.",
    cover: "home-wide",
    coverTall: "home-tall",
    tone: "honey",
    games: ["big-small", "jeep"],
  },
] as const;

/**
 * Міні-ігри за ТЗ, у порядку документа.
 * `placeholderArt: true` — своєї графіки ще немає, показуємо кадр
 * із іншої гри як тимчасову обкладинку.
 */
export const games = [
  {
    slug: "borsch",
    title: "Приготуй борщ",
    summary: "Складаємо в казанок потрібні овочі й пропускаємо зайві.",
    skill: "Увага",
    cover: "borsch-02",
    placeholderArt: false,
  },
  {
    slug: "shapes",
    title: "Біба в Карпатах",
    summary: "Розкладаємо предмети за формою, щоб зайчик поїхав далі.",
    skill: "Форми",
    cover: "biba-level",
    placeholderArt: false,
  },
  {
    slug: "big-small",
    title: "Великий і малий",
    summary: "Одяг однаковий, розміри різні. Кому що підійде?",
    skill: "Розміри",
    cover: "hut-sweaters",
    placeholderArt: false,
  },
  {
    slug: "colors",
    title: "Сортуй за кольором",
    summary: "Три наплічники й спорядження, яке треба розкласти.",
    skill: "Кольори",
    cover: "backpacks-02",
    placeholderArt: false,
  },
  {
    slug: "picture",
    title: "Збери картину",
    summary: "У малюнку бракує деталей — знаходимо їх і ставимо на місце.",
    skill: "Простір",
    cover: "camp-silhouettes-clean",
    placeholderArt: false,
  },
  {
    slug: "jeep",
    title: "Збери джип",
    summary: "Машина розібрана на частини. Складаємо її назад.",
    skill: "Ціле й частини",
    cover: "winter-snowman",
    placeholderArt: true,
  },
  {
    slug: "puzzle",
    title: "Пазли",
    summary: "Класичні пазли з ілюстраціями зі світу TUTI.",
    skill: "Логіка",
    cover: "cabin-indoors",
    placeholderArt: true,
  },
  {
    slug: "counting",
    title: "Лічба",
    summary: "Перше знайомство з числами через знайомі предмети.",
    skill: "Лічба до 10",
    cover: "campfire-cooking",
    placeholderArt: true,
  },
  {
    slug: "sorter",
    title: "Сортер",
    summary: "Предмет і отвір під нього — знаходимо пару.",
    skill: "Моторика",
    cover: "shapes-meadow",
    placeholderArt: true,
  },
  {
    slug: "edible",
    title: "Їстівне — неїстівне",
    summary: "Вирішуємо, що можна покласти до рота, а що ні.",
    skill: "Побутова логіка",
    cover: "borsch-04",
    placeholderArt: true,
  },
] as const;

export const about = {
  title: "Що ми цінуємо",
  lead: "TUTI Games — невелика студія, яка малює ігри для дітей від трьох років. Кожен екран зроблений вручну, кадр за кадром.",
  // `face` — мордочка, що визирає з-над картки (assets/faces).
  values: [
    {
      title: "Намальовано вручну",
      text: "Жодних стоків. Свої звірята, свої Карпати, своя хата з кахляною піччю — усе під цю історію.",
      face: "face-bear",
      faceAlt: "Мордочка ведмедика",
    },
    {
      title: "Зрозуміло без слів",
      text: "Правила показані картинкою й анімацією. Дитина, яка ще не читає, розбереться сама.",
      face: "face-biba",
      faceAlt: "Мордочка зайчика Біби",
    },
    {
      title: "Не можна програти",
      text: "Немає таймерів, життів і поразки. Неправильна відповідь просто повертає предмет на місце.",
      face: "face-hedgehog",
      faceAlt: "Мордочка їжачка",
    },
    {
      title: "Без реклами й покупок",
      text: "Усередині немає банерів, відео за винагороду та внутрішніх покупок. Ніщо не відволікає.",
      face: "face-squirrel",
      faceAlt: "Мордочка білочки",
    },
  ],
  story: [
    "Ми починали з одного зайчика на санчатах. Виявилося, що найскладніше в дитячій грі — не механіка, а темп: дитина має встигати думати, а не наздоганяти екран.",
    "Тому в наших іграх немає таймерів і поразки. Помилка нічого не коштує — предмет просто повертається на місце, і можна спробувати ще раз. Саме так діти й вчаться.",
  ],
} as const;

export const careers = {
  title: "Шукаємо своїх",
  cover: "crew-winter",
  coverAlt: "Звірята TUTI ліплять сніговика в зимових Карпатах",
  lead: "Ми зростаємо й раді новим людям у команді.",
  // TODO: справжні вакансії. Поки показується блок fallback нижче.
  openings: [] as Array<{ title: string; type: string; text: string }>,
  fallback: {
    title: "Відкритих вакансій зараз немає",
    text: "Але ми завжди дивимося портфоліо ілюстраторів, аніматорів і Unity-розробників. Напишіть — збережемо контакт і повернемося, коли з'явиться підходяща роль.",
    cta: "Надіслати портфоліо",
  },
  perks: [
    "Маленька команда без зайвих погоджень",
    "Робота з ручною 2D-графікою, а не зі стоками",
    "Гнучкий графік і віддалено",
  ],
} as const;

export const contact = {
  title: "Напишіть нам",
  lead: "Співпраця, питання щодо ігор або портфоліо — усе на одну пошту. Відповідаємо протягом кількох робочих днів.",
  // TODO: справжня пошта та соцмережі
  email: "hello@tutigames.com",
  socials: [
    { label: "Instagram", href: "https://instagram.com/", handle: "@tutigames" },
    { label: "Telegram", href: "https://t.me/", handle: "@tutigames" },
    { label: "YouTube", href: "https://youtube.com/", handle: "TUTI Games" },
    { label: "LinkedIn", href: "https://linkedin.com/", handle: "TUTI Games" },
  ],
} as const;

export const footer = {
  note: "Ігри для дітей від трьох років. Без реклами, без внутрішніх покупок, без збору персональних даних.",
  legal: [
    { label: "Політика приватності", href: "#" }, // TODO
    { label: "Умови використання", href: "#" }, // TODO
  ],
} as const;
