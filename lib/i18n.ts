export type Lang = 'ru' | 'en' | 'hy'

export const LANGS: { code: Lang; label: string }[] = [
  { code: 'ru', label: 'РУ' },
  { code: 'en', label: 'EN' },
  { code: 'hy', label: 'ՀԱՅ' },
]

export const translations = {
  ru: {
    nav: {
      catalog: 'Каталог',
      store: 'Магазин',
      contacts: 'Контакты',
    },
    hero: {
      tagline: 'Концепт-стор · Ереван',
      subtitle:
        'Оригинальные кроссовки, одежда и коллекционные аксессуары. Saryan 4, Ереван · Ежедневно 11:00 – 22:00. Весь ассортимент и заказ — в наших соцсетях.',
      buyInstagram: 'Купить в Instagram',
      buyFacebook: 'Купить в Facebook',
      telegramChannel: 'Telegram-канал',
      heroAlt: 'Стена с кроссовками в магазине Rootie',
    },
    catalog: {
      title: 'ЧТО У НАС ЕСТЬ',
      subtitle: 'Актуальное наличие, новинки и цены — каталог обновляется автоматически.',
      stockLow: 'Осталось мало',
      stockOut: 'Нет в наличии',
      fallback: 'Актуальный каталог сейчас смотри в Instagram',
      items: [
        {
          title: 'Кроссовки',
          description:
            'Nike, Jordan, New Balance, коллаборации Travis Scott и редкие релизы. Размеры от детских до 48 EU.',
          alt: 'Кроссовки Jordan 1 Low x Travis Scott на полке магазина Rootie',
        },
        {
          title: 'Одежда и кепки',
          description: 'Худи, футболки, кепки New Era и брендовые вещи. Всё оригинальное, с примеркой в магазине.',
          alt: 'Зона одежды и кепок в магазине Rootie',
        },
        {
          title: 'Bearbrick и аксессуары',
          description:
            'Коллекционные фигурки Bearbrick, часы Audemars Piguet x Swatch и другие редкие находки.',
          alt: 'Коллекционные фигурки Bearbrick на полках магазина Rootie',
        },
      ],
    },
    howToBuy: {
      title: 'КАК КУПИТЬ',
      steps: [
        {
          title: '1. Выберите товар',
          text: 'Смотрите наличие и новинки в Instagram или Telegram-канале — публикуем всё свежее каждую неделю.',
        },
        {
          title: '2. Напишите нам',
          text: 'Директ в Instagram, Facebook или Telegram / WhatsApp — подскажем размеры, цену и зарезервируем пару.',
        },
        {
          title: '3. Заберите заказ',
          text: 'Приходите в магазин на Saryan 4 с примеркой или оформите доставку — как вам удобнее.',
        },
      ],
      writeInstagram: 'Написать в Instagram',
    },
    gallery: {
      title: 'НАШ МАГАЗИН',
      subtitle: 'Уютный концепт-стор в центре Еревана. К нам заходят даже мировые звёзды — приходите и вы.',
      alts: [
        'Подсвеченные полки с кроссовками Nike и Jordan',
        'Касса магазина Rootie с логотипом',
        'Вход в магазин Rootie вечером с подсвеченным логотипом',
      ],
    },
    contacts: {
      title: 'ЖДЁМ ВАС',
      address: 'Адрес',
      addressValue: 'Saryan 4, Ереван, Армения',
      openMaps: 'Открыть в Google Maps',
      hours: 'Часы работы',
      hoursValue: 'Ежедневно 11:00 – 22:00',
      phone: 'Телефон',
      phoneNote: 'WhatsApp / Telegram',
    },
    openStatus: { openNow: 'Открыто сейчас', closedNow: 'Сейчас закрыто' },
    drops: {
      title: 'ПОСЛЕДНИЕ ДРОПЫ',
      subtitle: 'Новые пары, одежда и коллекционные находки — следите за свежими поступлениями.',
      items: [
        { title: 'Travis Scott selection', excerpt: 'Редкие силуэты и коллаборации в свежем поступлении.', alt: 'Новая подборка кроссовок Travis Scott в Rootie' },
        { title: 'Summer streetwear', excerpt: 'Футболки, кепки и лёгкие слои для ереванского лета.', alt: 'Новое поступление streetwear и кепок в Rootie' },
        { title: 'Аксессуары', excerpt: 'Часы, сумки и другие акцентные детали из свежего поступления.', alt: 'Новое поступление аксессуаров в магазине Rootie' },
      ],
    },
    brandStory: {
      title: 'КУЛЬТУРА, А НЕ ПРОСТО ВЕЩИ',
      paragraphs: [
        'ROOTIE появился в Ереване как место для тех, кто ценит происхождение, историю и детали каждой вещи.',
        'Мы проверяем подлинность каждого товара и собираем выборку, которую хочется носить и коллекционировать.',
        'В наш магазин заглядывают местные ценители и известные гости города — но атмосфера всегда остаётся открытой и своей.',
      ],
      promise: 'Гарантия оригинальности',
      imageAlt: 'Интерьер и стойка магазина Rootie в Ереване',
    },
    faq: {
      title: 'ЧАСТЫЕ ВОПРОСЫ',
      items: [
        { question: 'Все товары оригинальные?', answer: 'Да. Мы работаем только с оригинальными товарами и проверяем происхождение каждой позиции до её появления в магазине.' },
        { question: 'Можно примерить перед покупкой?', answer: 'Конечно. Приходите в магазин на Saryan 4 — команда поможет подобрать размер и спокойно примерить вещь.' },
        { question: 'Есть доставка?', answer: 'Доставляем по Армении. Международную доставку согласуем индивидуально — напишите нам страну и интересующий товар.' },
        { question: 'Как можно оплатить?', answer: 'В магазине доступны наличная и безналичная оплата. Для доставки команда подскажет актуальный способ при подтверждении заказа.' },
        { question: 'Можно вернуть или обменять?', answer: 'Условия зависят от категории и состояния товара. Свяжитесь с нами до покупки или сразу после получения, чтобы уточнить детали.' },
        { question: 'Где смотреть актуальное наличие?', answer: 'Свежие поступления и доступные размеры публикуем в Instagram и Telegram. Можно также написать нам напрямую.' },
      ],
    },
    footer: {
      line: '@rootie.yerevan · Saryan 4, Ереван · Ежедневно 11:00 – 22:00',
    },
  },
  en: {
    nav: {
      catalog: 'Catalog',
      store: 'Store',
      contacts: 'Contacts',
    },
    hero: {
      tagline: 'Concept Store · Yerevan',
      subtitle:
        'Original sneakers, clothes and collectible accessories. Saryan 4, Yerevan · Daily 11:00 – 22:00. Full stock and orders — on our social media.',
      buyInstagram: 'Shop on Instagram',
      buyFacebook: 'Shop on Facebook',
      telegramChannel: 'Telegram Channel',
      heroAlt: 'Sneaker wall at the Rootie store',
    },
    catalog: {
      title: 'WHAT WE HAVE',
      subtitle: 'Current stock, new arrivals and prices — this catalog updates automatically.',
      stockLow: 'Low stock',
      stockOut: 'Out of stock',
      fallback: 'See the current catalog on Instagram',
      items: [
        {
          title: 'Sneakers',
          description:
            'Nike, Jordan, New Balance, Travis Scott collabs and rare releases. Sizes from kids to 48 EU.',
          alt: 'Jordan 1 Low x Travis Scott sneakers on a shelf at Rootie',
        },
        {
          title: 'Clothes & Caps',
          description: 'Hoodies, tees, New Era caps and branded pieces. All original, try on in store.',
          alt: 'Clothing and caps area at the Rootie store',
        },
        {
          title: 'Bearbrick & Accessories',
          description: 'Collectible Bearbrick figures, Audemars Piguet x Swatch watches and other rare finds.',
          alt: 'Collectible Bearbrick figures on shelves at Rootie',
        },
      ],
    },
    howToBuy: {
      title: 'HOW TO BUY',
      steps: [
        {
          title: '1. Pick an item',
          text: 'Browse stock and new arrivals on Instagram or our Telegram channel — fresh drops every week.',
        },
        {
          title: '2. Message us',
          text: 'DM us on Instagram, Facebook or Telegram / WhatsApp — we will confirm sizes, price and reserve your pair.',
        },
        {
          title: '3. Get your order',
          text: 'Visit the store at Saryan 4 to try on, or arrange delivery — whatever works for you.',
        },
      ],
      writeInstagram: 'Message on Instagram',
    },
    gallery: {
      title: 'OUR STORE',
      subtitle: 'A cozy concept store in the heart of Yerevan. Even world stars drop by — come visit us too.',
      alts: [
        'Illuminated shelves with Nike and Jordan sneakers',
        'Rootie store counter with the logo',
        'Rootie store entrance at night with an illuminated logo',
      ],
    },
    contacts: {
      title: 'VISIT US',
      address: 'Address',
      addressValue: 'Saryan 4, Yerevan, Armenia',
      openMaps: 'Open in Google Maps',
      hours: 'Opening Hours',
      hoursValue: 'Daily 11:00 – 22:00',
      phone: 'Phone',
      phoneNote: 'WhatsApp / Telegram',
    },
    openStatus: { openNow: 'Open now', closedNow: 'Closed now' },
    drops: {
      title: 'LATEST DROPS',
      subtitle: 'Fresh sneakers, streetwear and collectible finds — follow the newest arrivals.',
      items: [
        { title: 'Travis Scott selection', excerpt: 'Rare silhouettes and collaborations from our latest arrival.', alt: 'New Travis Scott sneaker selection at Rootie' },
        { title: 'Summer streetwear', excerpt: 'Tees, caps and light layers made for Yerevan summer.', alt: 'New streetwear and caps arrival at Rootie' },
        { title: 'Accessory arrivals', excerpt: 'Watches, bags and statement details from our latest arrival.', alt: 'New accessories at the Rootie store' },
      ],
    },
    brandStory: {
      title: 'CULTURE, NOT JUST THINGS',
      paragraphs: [
        'ROOTIE began in Yerevan as a place for people who value the origin, story and detail behind every piece.',
        'We authenticate every item and curate a selection made to be worn, kept and collected.',
        'Local enthusiasts and well-known visitors to the city stop by — while the atmosphere always stays open and personal.',
      ],
      promise: 'Authenticity guaranteed',
      imageAlt: 'Interior and counter of the Rootie store in Yerevan',
    },
    faq: {
      title: 'FREQUENTLY ASKED',
      items: [
        { question: 'Are all items authentic?', answer: 'Yes. We only carry authentic products and verify the origin of every item before it reaches the store.' },
        { question: 'Can I try items on first?', answer: 'Absolutely. Visit us at Saryan 4 and our team will help with sizing and let you try everything comfortably.' },
        { question: 'Do you offer delivery?', answer: 'We deliver across Armenia. International delivery is arranged individually — message us with your country and chosen item.' },
        { question: 'How can I pay?', answer: 'Cash and card payments are available in store. For delivery orders, our team will confirm the current payment option.' },
        { question: 'Can I return or exchange?', answer: 'Terms depend on the product category and condition. Contact us before purchase or promptly after delivery for the exact details.' },
        { question: 'Where can I see current stock?', answer: 'We publish new arrivals and available sizes on Instagram and Telegram. You can also message us directly.' },
      ],
    },
    footer: {
      line: '@rootie.yerevan · Saryan 4, Yerevan · Daily 11:00 – 22:00',
    },
  },
  hy: {
    nav: {
      catalog: 'Տեսականի',
      store: 'Խանութ',
      contacts: 'Կապ',
    },
    hero: {
      tagline: 'Քոնցեպտ խանութ · Երևան',
      subtitle:
        'Օրիգինալ սպորտային կոշիկներ, հագուստ և կոլեկցիոն աքսեսուարներ։ Սարյան 4, Երևան · Ամեն օր 11:00 – 22:00։ Ամբողջ տեսականին և պատվերները՝ մեր սոցցանցերում։',
      buyInstagram: 'Գնել Instagram-ում',
      buyFacebook: 'Գնել Facebook-ում',
      telegramChannel: 'Telegram ալիք',
      heroAlt: 'Սպորտային կոշիկների պատը Rootie խանութում',
    },
    catalog: {
      title: 'ԻՆՉ ՈՒՆԵՆՔ',
      subtitle: 'Առկա տեսականին, նորույթներն ու գները՝ կատալոգը թարմացվում է ինքնաշխատ։',
      stockLow: 'Քիչ է մնացել',
      stockOut: 'Առկա չէ',
      fallback: 'Արդի կատալոգը հիմա դիտեք Instagram-ում',
      items: [
        {
          title: 'Սպորտային կոշիկներ',
          description:
            'Nike, Jordan, New Balance, Travis Scott համագործակցություններ և հազվագյուտ թողարկումներ։ Չափսերը՝ մանկականից մինչև 48 EU։',
          alt: 'Jordan 1 Low x Travis Scott կոշիկները Rootie խանութի դարակին',
        },
        {
          title: 'Հագուստ և գլխարկներ',
          description:
            'Հուդիներ, շապիկներ, New Era գլխարկներ և բրենդային իրեր։ Ամեն ինչ օրիգինալ է, փորձեք խանութում։',
          alt: 'Հագուստի և գլխարկների բաժինը Rootie խանութում',
        },
        {
          title: 'Bearbrick և աքսեսուարներ',
          description:
            'Կոլեկցիոն Bearbrick ֆիգուրներ, Audemars Piguet x Swatch ժամացույցներ և այլ հազվագյուտ գտածոներ։',
          alt: 'Կոլեկցիոն Bearbrick ֆիգուրները Rootie խանութի դարակներին',
        },
      ],
    },
    howToBuy: {
      title: 'ԻՆՉՊԵՍ ԳՆԵԼ',
      steps: [
        {
          title: '1. Ընտրեք ապրանքը',
          text: 'Դիտեք առկա տեսականին և նորույթները Instagram-ում կամ Telegram ալիքում — ամեն շաբաթ նոր թողարկումներ։',
        },
        {
          title: '2. Գրեք մեզ',
          text: 'Ուղարկեք հաղ��րդագրություն Instagram-ում, Facebook-ում կամ Telegram / WhatsApp-ով — կհաստատենք չափսը, գինը և կպահենք ձեր զույգը։',
        },
        {
          title: '3. Ստացեք պատվերը',
          text: 'Այցելեք խանութ Սարյան 4 հասցեով՝ փորձելու համար, կամ պատվիրեք առաքում — ինչպես ձեզ հարմար է։',
        },
      ],
      writeInstagram: 'Գրել Instagram-ում',
    },
    gallery: {
      title: 'ՄԵՐ ԽԱՆՈՒԹԸ',
      subtitle:
        'Հարմարավետ քոնցեպտ խանութ Երևանի կենտրոնում։ Մեզ մոտ գալիս են նույնիսկ համաշխարհային աստղեր — եկեք նաև դուք։',
      alts: [
        'Լուսավորված դարակներ Nike և Jordan կոշիկներով',
        'Rootie խանութի դրամարկղը լոգոյով',
        'Rootie խանութի մուտքը երեկոյան՝ լուսավորված լոգոյով',
      ],
    },
    contacts: {
      title: 'ՍՊԱՍՈՒՄ ԵՆՔ ՁԵԶ',
      address: 'Հասցե',
      addressValue: 'Սարյան 4, Երևան, Հայաստան',
      openMaps: 'Բացել Google Maps-ում',
      hours: 'Աշխատանքային ժամեր',
      hoursValue: 'Ամեն օր 11:00 – 22:00',
      phone: 'Հեռախոս',
      phoneNote: 'WhatsApp / Telegram',
    },
    openStatus: { openNow: 'Բաց է հիմա', closedNow: 'Փակ է հիմա' },
    drops: {
      title: 'ՎԵՐՋԻՆ ՆՈՐՈՒՅԹՆԵՐԸ',
      subtitle: 'Նոր կոշիկներ, streetwear և կոլեկցիոն գտածոներ՝ հետևեք վերջին համալրումներին։',
      items: [
        { title: 'Travis Scott ընտրանի', excerpt: 'Հազվագյուտ մոդելներ և համագործակցություններ՝ նոր համալրումից։', alt: 'Travis Scott կոշիկների նոր ընտրանին Rootie-ում' },
        { title: 'Ամառային streetwear', excerpt: 'Շապիկներ, գլխարկներ և թեթև հագուստ երևանյան ամռան համար։', alt: 'Streetwear-ի և գլխարկների նոր համալրում Rootie-ում' },
        { title: 'Նոր աքսեսուարներ', excerpt: 'Ժամացույցներ, պայուսակներ և ընդգծված մանրուքներ՝ նոր համալրումից։', alt: 'Աքսեսուարների նոր համալրում Rootie խանութում' },
      ],
    },
    brandStory: {
      title: 'ՄՇԱԿՈՒՅԹ, ՈՉ ՄԻԱՅՆ ԻՐԵՐ',
      paragraphs: [
        'ROOTIE-ն ստեղծվել է Երևանում նրանց համար, ովքեր գնահատում են յուրաքանչյուր իրի ծագումը, պատմությունն ու մանրուքները։',
        'Մենք ստուգում ենք յուրաքանչյուր ապրանքի իսկությունը և ձևավորում ընտրանի, որը ցանկանում ես կրել ու հավաքածուում պահել։',
        'Մեզ այցելում են տեղացի սիրահարներ և քաղաքի հայտնի հյուրեր, իսկ մթնոլորտը միշտ մնում է բաց ու հարազատ։',
      ],
      promise: 'Իսկության երաշխիք',
      imageAlt: 'Rootie խանութի ինտերիերն ու դրամարկղը Երևանում',
    },
    faq: {
      title: 'ՀԱՃԱԽ ՏՐՎՈՂ ՀԱՐՑԵՐ',
      items: [
        { question: 'Բոլոր ապրանքներն օրիգինա՞լ են', answer: 'Այո։ Մենք առաջարկում ենք միայն օրիգինալ ապրանքներ և ստուգում ենք յուրաքանչյուր իրի ծագումը մինչև խանութում ներկայացնելը։' },
        { question: 'Կարո՞ղ եմ փորձել մինչև գնելը', answer: 'Իհարկե։ Այցելեք մեզ Սարյան 4 հասցեով, և թիմը կօգնի ընտրել չափսն ու հանգիստ փորձել ապրանքը։' },
        { question: 'Առաքում ունե՞ք', answer: 'Առաքում ենք ամբողջ Հայաստանում։ Միջազգային առաքումը համաձայնեցնում ենք անհատապես՝ գրեք երկիրը և ընտրված ապրանքը։' },
        { question: 'Ինչպե՞ս կարելի է վճարել', answer: 'Խանութում հասանելի են կանխիկ և անկանխիկ վճարումներ։ Առաքման դեպքում թիմը կհաստատի վճարման գործող տարբերակը։' },
        { question: 'Կարո՞ղ եմ վերադարձնել կամ փոխանակել', answer: 'Պայմանները կախված են ապրանքի տեսակից և վիճակից։ Մանրամասների համար կապվեք մեզ հետ գնումից առաջ կամ ստանալուց անմիջապես հետո։' },
        { question: 'Որտե՞ղ տեսնել առկա տեսականին', answer: 'Նորույթներն ու առկա չափսերը հրապարակում ենք Instagram-ում և Telegram-ում։ Կարող եք նաև գրել մեզ ուղիղ։' },
      ],
    },
    footer: {
      line: '@rootie.yerevan · Սարյան 4, Երևան · Ամեն օր 11:00 – 22:00',
    },
  },
} as const

export type Translation = (typeof translations)[Lang]
