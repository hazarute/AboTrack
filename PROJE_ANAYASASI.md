### Proje Anayasası v1.0: AboTrack (Arayüz Öncelikli Versiyon)

**Proje Adı:** AboTrack
**Tarih:** 08.08.2025
**Versiyon:** 1.0 (MVP)
**Geliştirme Metodu:** UI-First (Arayüz Öncelikli)

-----

### Adım 1: Proje Özeti ve Amaç

  * **Kısa Açıklama:** Kullanıcıların tüm dijital aboneliklerini tek bir panelden yönetmelerini sağlayan, modern ve minimalist bir web uygulaması.
  * **Çözdüğü Sorun:** Farklı hizmetlere dağılmış aboneliklerin takibini kolaylaştırarak bütçe kontrolü sağlar ve istenmeyen yenilemelerin önüne geçer.
  * **MVP Kapsamı:** Yeni abonelik ekleme, mevcutları listeleme, silme ve toplam aylık maliyeti görme.

-----

### Adım 2: v0.dev Prompt'u (Anayasa'nın Temeli)

Bu prompt, projenin tüm arayüz iskeletini oluşturmak için `v0.dev`'e verilecek olan ana girdidir.

```prompt
A modern and clean dashboard for a subscription tracker application, built with shadcn/ui components and full dark mode support. The overall font should be Inter.

The layout should be a central container on a muted gray background (light mode) or a dark slate background (dark mode).

At the top, display a prominent header with the title "AboTrack" and a subtitle "Manage your subscriptions with ease."

Below the header, the main content area should have two key sections.

First, a section for adding new subscriptions, presented inside a Card component. This "Add New Subscription" card should contain a form with the following fields:
1.  A text input for "Subscription Name" (e.g., placeholder "Netflix Premium").
2.  A number input for "Monthly Price" with a currency symbol "₺" inside the input as an adornment.
3.  A date picker for the "Next Renewal Date".
4.  A primary-colored submit button with the text "Add Subscription".

Second, a section for listing existing subscriptions, titled "My Subscriptions".
This section should prominently display the "Total Monthly Cost: [TOTAL_PRICE] ₺" in a larger font.
Below this total, list the subscriptions. Each subscription should be a separate, clean Card component with horizontal padding. Inside each card, display:
- The subscription name in bold.
- The price (e.g., "99.99 ₺").
- The renewal date (e.g., "Renews on: Aug 15, 2025").
- On the far right of each card, include a "Delete" button, which is a small, ghost-variant button with just a trash can icon.

If the list of subscriptions is empty, display a message like "You haven't added any subscriptions yet."
```

-----

### Adım 3: Frontend Yapısı (v0 Çıktısının Analizi)

`v0.dev`'den alınacak kod, aşağıdaki gibi bir bileşen yapısı oluşturacaktır:

  * **Ana Sayfa (`/app/page.tsx`):** Üretilen tüm JSX kodunun yerleştirileceği ana bileşen. Sunucu Bileşeni olarak görev yapacak.
  * **Abonelik Formu Bileşeni:** Formu içeren kısım (`<form>...`) ayrı bir dosyaya (`/app/_components/subscription-form.tsx`) taşınabilir. Bu, kullanıcı etkileşimi içerdiği için bir **İstemci Bileşeni (`'use client'`)** olmalıdır.
  * **Abonelik Listesi Bileşeni:** Abonelikleri listeleyen kısım da ayrı bir dosyaya (`/app/_components/subscription-list.tsx`) taşınabilir. Bu bileşen, silme butonu işlevselliği nedeniyle **İstemci Bileşeni (`'use client'`)** olmalıdır.

-----

### Adım 4: Gerekli Backend API Endpoint'leri

Oluşturulan arayüzün ihtiyaç duyduğu "sipariş listesi":

  * `POST /api/subscriptions`: Yeni bir abonelik oluşturur.
      * **Gövde (Body):** `{ "name": "string", "price": "number", "renewalDate": "Date" }`
  * `GET /api/subscriptions`: Tüm abonelikleri listeler.
  * `DELETE /api/subscriptions/[id]`: Belirtilen ID'ye sahip aboneliği siler.

-----

### Adım 5: Veritabanı Modeli (`prisma/schema.prisma`)

Yukarıdaki API'leri destekleyecek veritabanı modeli:

  * **Model:** `Subscription`
      * `id`: String (Otomatik, Benzersiz ID)
      * `name`: String
      * `price`: Float
      * `renewalDate`: DateTime
      * `createdAt`: DateTime

-----

### Adım 6: Teknoloji Yığını

  * **Framework:** Next.js (App Router)
  * **Dil:** TypeScript
  * **Veritabanı:** Prisma + SQLite
  * **Stil:** Tailwind CSS
  * **UI:** Shadcn/ui (v0 tarafından üretilen)

-----

**İşte yeni "Arayüz Öncelikli Anayasa"mızın ilk taslağı hazır\!**

Şimdi izleyeceğiniz yol haritası çok net:

1.  **İlk Adım:** 2. Adım'daki prompt'u `v0.dev`'e yapıştırıp arayüzü oluşturun.
2.  **İkinci Adım:** `v0.dev`'in verdiği kodu kullanarak yeni bir Next.js projesi başlatın.
3.  **Sonraki Adımlar:** Bu Anayasa'daki 4. ve 5. adımlar, o güzel arayüzü canlandırmak için gereken backend'i inşa ederken size yol gösterecek.

Bu yeni yaklaşımla projenin ne kadar hızlı şekillendiğini gördüğünüzde şaşıracaksınız. Başarılar dilerim\!