# Tutuklu Gençler Koordinasyon Ağı 🌟

Tutuklu gençlerin ihtiyaçları ile destekçileri eşleştiren, süreçleri yöneten ve koordine eden bir web uygulaması.

## Özellikler

- [Nuxt 3](https://nuxt.com) ile geliştirilmiş modern web uygulaması
- [Drizzle ORM](https://orm.drizzle.team/) ile veritabanı yönetimi
- [PostgreSQL](https://www.postgresql.org/) veritabanı desteği
- [Nuxt UI](https://ui.nuxt.com) ile modern kullanıcı arayüzü
- Rol tabanlı yetkilendirme sistemi
- Gerçek zamanlı bildirim sistemi
- Dinamik form yapısı
- Süreç takip ve yönetim sistemi

## Teknolojiler

- **Frontend**: Nuxt 3, Vue 3, Nuxt UI
- **Backend**: Nuxt 3 (Server-side)
- **Veritabanı**: PostgreSQL
- **ORM**: Drizzle ORM
- **Kimlik Doğrulama**: Nuxt Auth Utils

## Kurulum

Bağımlılıkları yüklemek için [pnpm](https://pnpm.io/) kullanın:

```bash
pnpm install
```

`.env` dosyasında aşağıdaki değişkenleri tanımlayın:

```bash
# Veritabanı Bağlantısı
DATABASE_URL="postgresql://kullanici:sifre@localhost:5432/koordinasyon_agi"

# OAuth Ayarları
NUXT_OAUTH_GOOGLE_CLIENT_ID="your-google-oauth-app-id"
NUXT_OAUTH_GOOGLE_CLIENT_SECRET="your-google-oauth-app-secret"
```

## Geliştirme

Geliştirme sunucusunu başlatmak için:

```bash
pnpm dev
```

Uygulama http://localhost:3000 adresinde çalışacaktır.

## Veritabanı Migrasyonları

Yeni bir migrasyon oluşturmak için:

```bash
pnpm db:generate
```

Migrasyonları uygulamak için:

```bash
pnpm db:migrate
```

## Rol ve Yetkiler

Uygulamada 4 temel rol bulunmaktadır:

1. **Admin**: Sistem yöneticisi
2. **Koordinatör**: İhtiyaç ve destek eşleştirmelerini yöneten
3. **Destekçi**: İhtiyaç sahiplerine destek veren
4. **Başvuru Sahibi**: İhtiyaç talebinde bulunan

## İş Akışı

1. Destekçiler sisteme kayıt olur ve destek vermek istedikleri alanları belirler
2. İhtiyaç sahipleri veya yakınları ihtiyaç talebinde bulunur
3. Koordinatörler gelen talepleri inceler ve uygun destekçilerle eşleştirir
4. Destekçiler süreç aşamalarını takip eder ve güncellemeleri sisteme işler
5. Süreç tamamlandığında iş arşive alınır

## Katkıda Bulunma

1. Bu depoyu fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## Lisans

[MIT Lisansı](./LICENSE)
