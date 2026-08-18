# Дизайн-система

Джерело — референс-макет каталогу жіночого одягу: світло-сірий фон, білі панелі без бордерів,
кораловий акцент, вузький шрифт капслоком у заголовках.

## Напрямок

**Фон сірий, контент білий.** Панелі й картки не мають бордерів — вони відділені від фону
кольором і відступами. Це прибирає лінії з макета й дає фотографіям товарів працювати без рамок.

**Кораловий — єдиний акцент.** Він на CTA, активному стані фільтра, зірках рейтингу,
заголовках розділів і активній категорії. Більше жодного кольору в інтерфейсі немає.

**Знижка сіра, не червона.** У референсі бейдж `-$50` на нейтральній плашці. Червоний конфліктував
би з коралом, тому економія позначається стримано.

**Числа — моноширинним з табличними цифрами.** Ціни в каталозі й кошику стоять у колонку;
при пропорційних цифрах `$1,598` і `$899` не вирівнюються по розрядах.

## Шрифти

```bash
pnpm add @fontsource-variable/oswald @fontsource-variable/inter @fontsource-variable/geist-mono
```

```ts
// src/main.tsx
import "@fontsource-variable/oswald"
import "@fontsource-variable/inter"
import "@fontsource-variable/geist-mono"
```

| Роль | Шрифт | Де |
|---|---|---|
| Заголовки, назви товарів, кнопки | **Oswald** | капслок + трекінг `0.08em` |
| Текст, опис, підписи | **Inter** | звичайний регістр |
| Числа | **Geist Mono** | ціни, кількість, рейтинг |

Oswald — вузький grotesque, який дає той самий характер, що на референсі: назва товару читається
як `LACE V-NECK DRESS`, а не як речення. Капслок і трекінг — обов'язкові разом: капслок без
трекінгу зливається.

## Токени

Два шари: **примітиви** → **семантика**. Компоненти використовують тільки семантику.

```css
/* src/index.css */
@import "tailwindcss";

@theme {
  --font-display: "Oswald Variable", ui-sans-serif, sans-serif;
  --font-sans: "Inter Variable", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "Geist Mono Variable", ui-monospace, monospace;

  --color-coral-400: #f78d77;
  --color-coral-500: #f2695d;
  --color-coral-600: #e0503f;
  --color-coral-50:  #fdeeea;

  --color-slate-0:   #ffffff;
  --color-slate-50:  #f7f7f7;
  --color-slate-100: #f1f1f1;
  --color-slate-200: #e6e6e6;
  --color-slate-300: #cfcfcf;
  --color-slate-400: #9b9b9b;
  --color-slate-600: #6e6e73;
  --color-slate-700: #55555a;
  --color-slate-900: #38383c;

  --color-badge:  #85858d;
  --color-ok:     #4caf72;
  --color-warn:   #d99a2b;
  --color-danger: #d0503f;

  --radius-control: 4px;
  --radius-card: 0px;
  --tracking-caps: 0.08em;
}

/* Аліаси окремим блоком з inline, бо посилаються на інші змінні */
@theme inline {
  --color-page:           var(--color-slate-50);
  --color-surface:        var(--color-slate-0);
  --color-surface-sunken: var(--color-slate-100);
  --color-line:           var(--color-slate-200);
  --color-line-strong:    var(--color-slate-300);

  --color-text:        var(--color-slate-900);
  --color-text-subtle: var(--color-slate-700);
  --color-text-muted:  var(--color-slate-400);

  --color-brand:       var(--color-coral-500);
  --color-brand-hover: var(--color-coral-600);
  --color-brand-light: var(--color-coral-400);
  --color-brand-tint:  var(--color-coral-50);
}
```

Класи: `bg-page`, `bg-surface`, `text-text-muted`, `border-line`, `bg-brand`, `bg-badge`,
`font-display`, `font-mono`, `rounded-control`, `tracking-caps`.

`--radius-card: 0px` — у референсі картки й панелі з прямими кутами. Закруглення тільки
у дрібних контролах (чіпи розмірів, дропдаун) і повні кола у круглих кнопках (`rounded-full`).

## Правила

**Заголовки й кнопки:** `font-display uppercase tracking-caps`. Ніколи не капслок без трекінгу.

**Числа:** `font-mono tabular-nums`.

**Акцент:** `bg-brand` — один раз на екран. На картці «В кошик» проявляється тільки при ховері
(як у референсі), у кошику — на кнопці «Оформити».

**Панелі:** `bg-surface` без бордера, розділені відступами по сірому фону `bg-page`.
Бордер (`border-line`) — тільки на контролах: інпути, чіпи, дропдауни.

**Бейдж знижки:** `bg-badge text-white`, нижній лівий кут картки.

**Наявність:** `text-ok` / `text-warn` (`stock < 10`) / `text-danger` (`stock === 0`).
Колір ніколи не єдиний носій інформації — завжди разом з текстом.

**Зірки рейтингу:** заповнені `text-brand`, порожні `text-slate-300`.

## Компоненти з референсу

| Елемент | Поведінка |
|---|---|
| Свотчі кольорів | кружечки, вибраний з галочкою, окрема кнопка «×» скидає |
| Чіпи розмірів | прямокутники з бордером, активний залитий коралом |
| Слайдер ціни | коралова заповнена частина, поточне значення коралом під ним |
| Дерево категорій | розкриття стрілкою, активна гілка коралова, вертикальний скрол |
| Ховер на картці | оверлей з круглими кнопками (сердечко, око) + чіпи розмірів |
| Кнопки панелі фільтрів | круглі: коралова «застосувати», сіра «скинути» |

## Сторінка `/styleguide`

Жива документація в додатку: палітра, типографічна шкала, стани кнопок, чіпи, свотчі, бейджі,
скелетони. Коли токен змінюється — наслідки видно на одному екрані.

## Dark mode

Свідомо немає (ADR-006).
