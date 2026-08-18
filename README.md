# Catalog + Cart

Навчальний e-commerce каталог: список товарів з фільтрами, сортуванням і пагінацією + кошик.
Проєкт №4 у підготовці до позиції Middle Frontend Developer. Головна тема — **керування складним клієнтським станом на Zustand**.

## Стек і навіщо кожне

| Технологія | Навіщо саме вона |
|---|---|
| React 19 + TypeScript | базовий стек цілі (Middle React) |
| Vite | dev-сервер і білд; без налаштування, HMR миттєвий |
| Tailwind CSS 4 | стилі без окремих файлів і без вигадування назв класів; конфіг тепер у CSS через `@theme` |
| **Zustand** | головна тема проєкту: стан кошика/фільтрів поза деревом компонентів, без ре-рендеру всіх споживачів (див. ADR-001) |
| React Router 8 | 3 сторінки + фільтри в URL (див. ADR-003) |
| Vitest + Testing Library | тести логіки стора й компонентів |
| pnpm | пакетний менеджер |
| DummyJSON | джерело даних: пагінація, сортування, категорії, пошук з коробки (див. ADR-002) |

Повні обґрунтування рішень — [`docs/adr.md`](docs/adr.md).
Опис API і його обмежень — [`docs/api.md`](docs/api.md).
Токени й правила дизайну — [`docs/design-system.md`](docs/design-system.md).

## Вимоги до оточення

**Node.js 22.22+** — жорсткий мінімум React Router 8 (`engines`). Vite 8 задовольнився б і
20.19+, але роутер ні. `pnpm -v` — будь-яка актуальна.

## Створення з нуля

```bash
pnpm create vite@latest catalog-cart --template react-ts
cd catalog-cart
pnpm install
pnpm add react-router zustand
pnpm add tailwindcss @tailwindcss/vite
pnpm add @fontsource-variable/oswald @fontsource-variable/inter @fontsource-variable/geist-mono
git init
```

Шаблон `react-ts`, не `react-compiler-ts`: React Compiler автоматично мемоізує компоненти й
приховав би ре-рендери, на яких ми вчимо селектори Zustand.

## Запуск

```bash
pnpm install
pnpm dev
pnpm test
pnpm build
```

## Структура

```
catalog-cart/
├── README.md
├── docs/             # ADR, опис API, дизайн-система
└── src/
    ├── app/          # точка збірки: роутер, layout, providers
    ├── pages/        # CatalogPage, ProductPage, CartPage, StyleguidePage
    ├── components/   # переюзабельні UI-блоки (ProductCard, Pagination, Badge)
    ├── api/          # шар доступу до даних: fetch-функції до DummyJSON
    ├── store/        # Zustand-стори
    ├── types/        # доменні типи (Product, CartItem)
    └── lib/          # чисті утиліти (formatPrice, discountedPrice)
```

**Чому `api/` окремо від `store/`:** запит до сервера і керування станом — різні відповідальності.
Вся робота з URL-параметрами API живе в одному місці, тому додати `AbortController` або поміняти
джерело даних можна не чіпаючи компоненти.

**Чому `lib/` окремо:** чисті функції без React тестуються без рендеру — найдешевші тести в проєкті.

## Конвенції коду

- **Кожна функція-компонент має явний тип повернення `ReactNode`.** Без цього TypeScript
  виводить тип автоматично і не завжди ловить помилку на кшталт `return AppRouter` замість
  `return <AppRouter />` — обидва варіанти синтаксично валідні для компілятора, різницю бачить
  тільки React у рантаймі. Явний `: ReactNode` змушує TypeScript звірити повернене значення
  з тим, що React реально вміє рендерити, і підсвітити помилку одразу в редакторі.

  ```tsx
  function CatalogPage(): ReactNode { ... }   // так
  function CatalogPage() { ... }              // ні — тип виводиться неявно
  ```

## Прогрес

- [x] 0 — Інфраструктура + доменні типи
- [ ] 0.5 — Дизайн-система, Layout, Router, `/styleguide`
  - [x] токени + шрифти в `index.css` / `main.tsx`
  - [x] `Layout` + `Router` (catalog / product / cart / 404)
  - [ ] сторінка `/styleguide`
- [ ] 1 — Каталог на `useState`: `AbortController` + discriminated union
- [ ] 2 — Zustand: стор кошика
- [ ] 3 — `persist` middleware (localStorage)
- [ ] 4 — Стор фільтрів: пошук, категорія, сортування, ціна
- [ ] 5 — Пагінація
- [ ] 6 — Рефакторинг: slices, devtools, `useShallow`
- [ ] 7 — Тести
- [ ] 8 — Поліш і деплой

## Скоуп

**Є:** каталог, фільтри, сортування, пагінація, сторінка товару, кошик (drawer + сторінка),
збереження кошика між сесіями, чіпи активних фільтрів, бейджі знижки/наявності, skeleton-стани.

**Немає свідомо:** авторизація, оформлення замовлення, оплата, dark mode, серверний кеш
(TanStack Query / RTK Query — окрема тема наступного проєкту).
