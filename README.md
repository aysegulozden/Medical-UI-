# 🏥 MedUI – Sağlık Randevu Uygulaması

Bu proje, hastane ve klinikler için geliştirilmiş örnek bir **online randevu sistemi**dir. Uygulamanın amacı sadece randevu oluşturmak değil, aynı zamanda kendi içerisinde tekrar kullanılabilir bir **Design System** oluşturmaktır.

Proje iki bölümden oluşmaktadır:

* **Randevu uygulaması** (kullanıcı tarafı)
* **Design System** (uygulamada kullanılan ortak bileşenler)

Projede React, TypeScript, Vite ve TailwindCSS kullanılmıştır.

---

## Projede Neler Var?

* Branş, doktor, tarih ve saat seçerek randevu oluşturma
* Oluşturulan randevuları görüntüleme
* Yaklaşan ve geçmiş randevuları listeleme
* Randevu iptal etme
* Light / Dark tema desteği
* Responsive tasarım
* Erişilebilir (Accessible) bileşenler
* Tekrar kullanılabilir UI bileşenleri

---

## Kullanılan Bileşenler

Design System içerisinde uygulamanın farklı bölümlerinde kullanılan ortak bileşenler bulunmaktadır.

Bazı bileşenler:

* Button
* Input
* Select
* Checkbox
* Radio
* Modal
* Toast
* Alert
* Table
* Badge
* Spinner
* Card

Sağlık uygulamasına özel hazırlanan bileşenler ise:

* DoctorCard
* PatientCard
* AppointmentCalendar
* HealthStatusBadge

---

## Projeyi Çalıştırma

```bash
npm install
npm run dev
```

Production build almak için:

```bash
npm run build
```

Önizleme:

```bash
npm run preview
```

---

## Sayfalar

| Sayfa         | Açıklama                                          |
| ------------- | ------------------------------------------------- |
| Randevu Al    | Yeni randevu oluşturma ekranı                     |
| Randevularım  | Oluşturulan randevuları görüntüleme ve iptal etme |
| Design System | Uygulamada kullanılan tüm bileşenlerin örnekleri  |

---

## Klasör Yapısı

```
src
├── app
├── components
│   ├── healthcare
│   └── ...
├── pages
├── store
├── styles
├── theme
├── demo
└── App.tsx
```

Bütün bileşenler tek bir dosya üzerinden dışa aktarılmaktadır.

```tsx
import { Button, DoctorCard, useToast } from "./components";
```

---

## Tema

Tema yapısı CSS değişkenleri kullanılarak hazırlanmıştır.

Desteklenen özellikler:

* Light Theme
* Dark Theme
* localStorage ile tema hafızası
* Design Token yapısı

---

## Kullanılan Teknolojiler

* React 18
* TypeScript
* Vite
* TailwindCSS
* React Context
* React Hooks

---

## Amaç

Bu proje geliştirilirken hedef, gerçek bir sağlık uygulamasına benzer kullanıcı deneyimi sunarken aynı zamanda farklı projelerde tekrar kullanılabilecek bir Design System oluşturmaktı.

---

## Demo Linki 

https://medical-ui-psi.vercel.app/
