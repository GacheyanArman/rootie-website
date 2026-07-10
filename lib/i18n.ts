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
      subtitle: 'Актуальное наличие, новинки и цены — всегда в Instagram и Telegram. Нажмите на категорию, чтобы посмотреть.',
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
      subtitle: 'Current stock, new arrivals and prices — always on Instagram and Telegram. Tap a category to browse.',
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
      subtitle:
        'Առկա տեսականին, նորույթներն ու գները՝ միշտ Instagram-ում և Telegram-ում։ Սեղմեք կատեգորիայի վրա՝ դիտելու համար։',
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
          text: 'Ուղարկեք հաղորդագրություն Instagram-ում, Facebook-ում կամ Telegram / WhatsApp-ով — կհաստատենք չափսը, գինը և կպահենք ձեր զույգը։',
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
    footer: {
      line: '@rootie.yerevan · Սարյան 4, Երևան · Ամեն օր 11:00 – 22:00',
    },
  },
} as const

export type Translation = (typeof translations)[Lang]
