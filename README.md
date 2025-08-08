# AboTrack

[![Lisans: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

AboTrack, kullanıcıların aylık ve yıllık aboneliklerini (Netflix, Spotify, alan adları vb.) tek bir yerden takip etmelerini sağlayan, modern ve minimalist bir web uygulamasıdır. Bu araç, bütçe kontrolünü kolaylaştırır ve istenmeyen abonelik yenilemelerinin önüne geçmeye yardımcı olur.

![AboTrack Ekran Görüntüsü](https://imgur.com/a/Jnd7uYb)

## 🚀 Temel Özellikler

* **Abonelik Yönetimi:** Kolayca yeni abonelik ekleyin, mevcutları listeleyin ve silin.
* **Maliyet Takibi:** Tüm aboneliklerinizin aylık toplam maliyetini anında görün.
* **Modern Arayüz:** `v0.dev` ile üretilmiş, temiz, kullanıcı dostu ve tamamen duyarlı bir tasarım.
* **Koyu Tema Desteği:** Göz yormayan kullanım için aydınlık ve karanlık tema desteği.

## 🛠️ Kullanılan Teknolojiler

* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Dil:** [TypeScript](https://www.typescriptlang.org/)
* **Veritabanı & ORM:** [Prisma](https://www.prisma.io/) & [SQLite](https://www.sqlite.org/index.html)
* **Stil:** [Tailwind CSS](https://tailwindcss.com/)
* **UI Bileşenleri:** [Shadcn/ui](https://ui.shadcn.com/)
* **UI Üretimi:** [v0.dev by Vercel](https://v0.dev/)

## 📖 Geliştirme Yaklaşımı: UI-First

Bu proje, modern ve verimli bir **"UI-First (Arayüz Öncelikli)"** geliştirme metodolojisi ile inşa edilmiştir.

1.  **Tasarım:** Projenin tüm arayüzü, Vercel'in yapay zeka aracı `v0.dev` kullanılarak saniyeler içinde üretilmiştir.
2.  **Entegrasyon:** Üretilen bu statik arayüz, projenin iskeletini oluşturmuştur.
3.  **Backend Geliştirme:** Backend ve API endpoint'leri, mevcut arayüzün ihtiyaç duyduğu "sipariş listesini" karşılamak üzere geliştirilmiştir.

Bu yaklaşım, geliştirme sürecini önemli ölçüde hızlandırmış ve entegrasyon sorunlarını en aza indirmiştir.

## 🏁 Başlarken

Bu projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin:

1.  **Projeyi Klonlayın**
    ```bash
    git clone [https://github.com/hazarute/AboTrack.git](https://github.com/hazarute/AboTrack.git)
    ```

2.  **Proje Dizinine Gidin**
    ```bash
    cd AboTrack
    ```

3.  **Bağımlılıkları Yükleyin**
    ```bash
    npm install
    ```

4.  **Prisma'yı ve Veritabanını Ayarlayın**
    Prisma Client'ı oluşturun ve veritabanı şemasını senkronize edin.
    ```bash
    npx prisma generate
    npx prisma db push
    ```

5.  **Geliştirme Sunucusunu Başlatın**
    ```bash
    npm run dev
    ```

    Tarayıcınızda `http://localhost:3000` adresini açarak uygulamayı görebilirsiniz.

## 📄 Lisans

Bu proje **MIT Lisansı** ile lisanslanmıştır. Daha fazla bilgi için lisans detaylarına göz atabilirsiniz.

Tüm proje hakları ve kaynak kodları [https://github.com/hazarute/AboTrack](https://github.com/hazarute/AboTrack) adresinde bulunmaktadır.