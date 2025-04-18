import { eq } from 'drizzle-orm'

export default defineTask({
  meta: {
    name: 'db:seed-need-request-fields',
    description: 'İhtiyaç talebi form alanlarını seed et'
  },
  async run() {
    console.log('İhtiyaç talebi form alanları seed ediliyor...')

    const db = useDB()
    // Önce mektup ihtiyaç türünü bul
    const mektupType = await db.select().from(tables.needTypes).where(eq(tables.needTypes.name, 'Mektup')).limit(1)
    const hukukiType = await db.select().from(tables.needTypes).where(eq(tables.needTypes.name, 'Hukuki Destek')).limit(1)

    if (!mektupType[0] || !hukukiType[0]) {
      return { result: 'Error', error: 'İhtiyaç türleri bulunamadı' }
    }

    const fieldData = [
      // Mektup için form alanları
      {
        needTypeId: mektupType[0].id,
        fieldName: 'alici_ad',
        label: 'Alıcı Adı',
        type: 'text',
        required: true,
        order: 1
      },
      {
        needTypeId: mektupType[0].id,
        fieldName: 'alici_soyad',
        label: 'Alıcı Soyadı',
        type: 'text',
        required: true,
        order: 2
      },
      {
        needTypeId: mektupType[0].id,
        fieldName: 'alici_adres',
        label: 'Alıcı Adresi',
        type: 'textarea',
        required: true,
        order: 3
      },
      {
        needTypeId: mektupType[0].id,
        fieldName: 'mektup_icerik',
        label: 'Mektup İçeriği',
        type: 'textarea',
        required: true,
        order: 4
      },
      // Hukuki Destek için form alanları
      {
        needTypeId: hukukiType[0].id,
        fieldName: 'dava_turu',
        label: 'Dava Türü',
        type: 'select',
        required: true,
        options: ['Ceza Davası', 'İdari Dava', 'Tazminat Davası'],
        order: 1
      },
      {
        needTypeId: hukukiType[0].id,
        fieldName: 'dava_durumu',
        label: 'Dava Durumu',
        type: 'select',
        required: true,
        options: ['Başlangıç', 'Devam Ediyor', 'Temyiz Aşamasında'],
        order: 2
      },
      {
        needTypeId: hukukiType[0].id,
        fieldName: 'aciklama',
        label: 'Detaylı Açıklama',
        type: 'textarea',
        required: true,
        order: 3
      }
    ]

    try {
      await db.insert(tables.needRequestFields).values(fieldData)
      console.log('İhtiyaç talebi form alanları başarıyla seed edildi')
      return { result: 'Success' }
    }
    catch (error) {
      console.error('İhtiyaç talebi form alanları seed edilirken hata oluştu:', error)
      return { result: 'Error', error: (error as Error).message }
    }
  }
})
