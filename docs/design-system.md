# Дизайн-система

## Напрямок

Каталог DummyJSON — це різнокаліберні товари з різними фонами на фото (помада, диван, ноутбук).
Будь-який колір у шеллі конфліктує з фотографіями, тому інтерфейс **тихий**: теплуватий сірий,
один акцентний колір, витрачений тільки на CTA й активні стани.

**Фішка системи:** усі числа — моноширинним шрифтом з табличними цифрами. У сітці каталогу
й у кошику ціни стоять у колонку; при пропорційних цифрах `$1,598` і `$899` не вирівнюються по
розрядах, і око не може швидко порівняти. Це функціональне рішення, не декор.

## Шрифти

```bash
pnpm add @fontsource-variable/geist @fontsource-variable/geist-mono
```

```ts
// src/main.tsx
import "@fontsource-variable/geist"
import "@fontsource-variable/geist-mono"
```

- **Geist Sans** — інтерфейс і текст.
- **Geist Mono** — усі числа: ціни, кількість, рейтинг, лічильники.

Одна сімʼя у двох ролях: узгоджені пропорції, але візуально різні ролі.
Не Inter — це дефолт більшості пет-проєктів.

## Токени

Два шари: **примітиви** (просто кольори) → **семантика** (роль кольору).
Компоненти використовують **тільки семантику**. Зміна акценту = один рядок замість 40 класів.

```css
/* src/index.css */
@import "tailwindcss";

@theme {
  --font-sans: "Geist Variable", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "Geist Mono Variable", ui-monospace, monospace;

  --color-ash-0:   #ffffff;
  --color-ash-50:  #faf9f7;
  --color-ash-100: #f2f0ec;
  --color-ash-200: #e5e2db;
  --color-ash-300: #cfcbc2;
  --color-ash-500: #7c776e;
  --color-ash-700: #3d3a35;
  --color-ash-900: #1a1917;

  --color-cobalt-500: #2b4acb;
  --color-cobalt-600: #223ca6;
  --color-cobalt-50:  #edf0fd;

  --color-sale:   #c0421c;
  --color-ok:     #12704d;
  --color-warn:   #a2650a;
  --color-danger: #b03028;

  --radius-control: 8px;
  --radius-card: 12px;
}

/* Аліаси — окремим блоком з inline, бо посилаються на інші змінні:
   Tailwind підставить у клас саме значення, а не подвійне посилання. */
@theme inline {
  --color-surface:        var(--color-ash-0);
  --color-surface-muted:  var(--color-ash-50);
  --color-surface-sunken: var(--color-ash-100);
  --color-line:           var(--color-ash-200);
  --color-line-strong:    var(--color-ash-300);
  --color-text:           var(--color-ash-900);
  --color-text-subtle:    var(--color-ash-700);
  --color-text-muted:     var(--color-ash-500);

  --color-brand:       var(--color-cobalt-500);
  --color-brand-hover: var(--color-cobalt-600);
  --color-brand-tint:  var(--color-cobalt-50);
}
```

Отримані класи: `bg-surface`, `text-text-muted`, `border-line`, `bg-brand`, `text-sale`,
`rounded-card`, `rounded-control`, `font-mono`.

## Правила

**Типографіка.** Пʼять розмірів: `text-xs` 12 / `text-sm` 14 / `text-base` 16 / `text-lg` 18 /
`text-2xl` 24. Дві товщини: `font-normal`, `font-medium`. Обмеження навмисне — коли розмірів 11,
кожен компонент бере свій і сітка розсипається.

**Числа.** Завжди `font-mono tabular-nums`.

**Акцент.** `bg-brand` — максимум один раз на екран. «В кошик» на 20 картках акцентною бути не
може, інакше акцент перестає працювати: на картці вона з обведенням, залитою стає тільки коли
товар уже в кошику (степер) і в підсумку кошика.

**Межі.** `border-line` звичайно, `border-line-strong` на hover. Тіней немає, крім рінга
`focus-visible` — доступність з клавіатури не опція.

**Наявність.** `text-ok` — в наявності, `text-warn` — `stock < 10`, `text-danger` — `stock === 0`.
Колір ніколи не єдиний носій інформації: разом з кольором завжди текст.

**Знижка.** Бейдж `-15%` кольором `sale`, стара ціна — `text-text-muted line-through`.

## Сторінка `/styleguide`

Жива документація в самому додатку: палітра, типографічна шкала, стани кнопок, бейджі, скелетони.
Навіщо: коли токен змінюється, одразу видно всі наслідки на одному екрані. Це також підготовка
до Storybook у наступних проєктах.

## Dark mode

Свідомо немає (ADR-006). Токени структуровані так, що додати тему = один блок перевизначень.
