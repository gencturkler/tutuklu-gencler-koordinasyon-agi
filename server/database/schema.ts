import { pgTable, text, integer, timestamp, serial, boolean, jsonb } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

// Diagram view: https://dbdiagram.io/d/koordinasyon-agi-6802342c1ca52373f57d2ba7

export const todos = pgTable('todos', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  completed: boolean('completed').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().default(sql`CURRENT_TIMESTAMP`)
})

/**
 * Kullanıcılar tablosu
 * Sistemdeki tüm kullanıcıları (admin, koordinatör, destekçi, başvuru sahibi) tutar
 */
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').unique().notNull(), // Kullanıcının e-posta adresi
  name: text('name').notNull(), // Kullanıcının tam adı
  password: text('password'), // Şifrelenmiş kullanıcı şifresi
  phone: text('phone'), // Kullanıcının telefon numarası
  role: text('role').notNull().default('user'), // Kullanıcının rolü: 'admin', 'coordinator', 'supporter', 'applicant'
  active: boolean('active').notNull().default(true), // Kullanıcının aktif/pasif durumu
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().default(sql`CURRENT_TIMESTAMP`),
  deletedAt: timestamp('deleted_at', { withTimezone: true }) // Soft delete için silme zamanı
})

/**
 * İhtiyaç Türleri tablosu
 * Sistemde tanımlı olan tüm ihtiyaç türlerini tutar
 */
export const needTypes = pgTable('need_types', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(), // İhtiyaç türünün adı (örn: Mektup, Hukuki Destek)
  description: text('description'), // İhtiyaç türünün açıklaması
  active: boolean('active').notNull().default(true), // İhtiyaç türünün aktif/pasif durumu
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().default(sql`CURRENT_TIMESTAMP`)
})

/**
 * İhtiyaç Talebi Form Alanları tablosu
 * Her ihtiyaç türü için talep formunda gösterilecek alanları tutar
 */
export const needRequestFields = pgTable('need_request_fields', {
  id: serial('id').primaryKey(),
  needTypeId: integer('need_type_id').notNull().references(() => needTypes.id), // Hangi ihtiyaç türüne ait
  fieldName: text('field_name').notNull(), // Alan adı (örn: "alici_adresi")
  label: text('label').notNull(), // Formda gösterilecek etiket (örn: "Alıcı Adresi")
  type: text('type').notNull(), // Alan tipi: 'text', 'textarea', 'select', 'location', 'date' vb.
  required: boolean('required').notNull().default(false), // Zorunlu alan mı?
  options: jsonb('options'), // Select tipi için seçenekler
  order: integer('order').notNull(), // Formdaki sıralama
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().default(sql`CURRENT_TIMESTAMP`)
})

/**
 * Destek Başvurusu Form Alanları tablosu
 * Her ihtiyaç türü için destek başvurusu formunda gösterilecek alanları tutar
 */
export const supportApplicationFields = pgTable('support_application_fields', {
  id: serial('id').primaryKey(),
  needTypeId: integer('need_type_id').notNull().references(() => needTypes.id), // Hangi ihtiyaç türüne ait
  fieldName: text('field_name').notNull(), // Alan adı
  label: text('label').notNull(), // Formda gösterilecek etiket
  type: text('type').notNull(), // Alan tipi
  required: boolean('required').notNull().default(false), // Zorunlu alan mı?
  options: jsonb('options'), // Select tipi için seçenekler
  order: integer('order').notNull(), // Formdaki sıralama
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().default(sql`CURRENT_TIMESTAMP`)
})

/**
 * İhtiyaç Talepleri tablosu
 * İhtiyaç sahiplerinin oluşturduğu talepleri tutar
 */
export const needRequests = pgTable('need_requests', {
  id: serial('id').primaryKey(),
  needTypeId: integer('need_type_id').notNull().references(() => needTypes.id), // Hangi ihtiyaç türü için talep
  applicantId: integer('applicant_id').notNull().references(() => users.id), // Talebi oluşturan kullanıcı
  status: text('status').notNull().default('pending'), // Talebin durumu: 'pending', 'matched', 'completed', 'cancelled'
  isUrgent: boolean('is_urgent').notNull().default(false), // Acil durum işareti
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().default(sql`CURRENT_TIMESTAMP`)
})

/**
 * İhtiyaç Talebi Değerleri tablosu
 * İhtiyaç taleplerinde girilen alan değerlerini tutar
 */
export const needRequestValues = pgTable('need_request_values', {
  id: serial('id').primaryKey(),
  needRequestId: integer('need_request_id').notNull().references(() => needRequests.id), // Hangi talebe ait
  fieldId: integer('field_id').notNull().references(() => needRequestFields.id), // Hangi alana ait
  value: text('value').notNull(), // Girilen değer
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().default(sql`CURRENT_TIMESTAMP`)
})

/**
 * Destek Başvuruları tablosu
 * Destekçilerin yaptığı başvuruları tutar
 */
export const supportApplications = pgTable('support_applications', {
  id: serial('id').primaryKey(),
  needTypeId: integer('need_type_id').notNull().references(() => needTypes.id), // Hangi ihtiyaç türünde destek verebileceği
  supporterId: integer('supporter_id').notNull().references(() => users.id), // Destekçi kullanıcı
  status: text('status').notNull().default('pending'), // Başvuru durumu: 'pending', 'approved', 'rejected'
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().default(sql`CURRENT_TIMESTAMP`)
})

/**
 * Destek Başvurusu Değerleri tablosu
 * Destek başvurularında girilen alan değerlerini tutar
 */
export const supportApplicationValues = pgTable('support_application_values', {
  id: serial('id').primaryKey(),
  supportApplicationId: integer('support_application_id').notNull().references(() => supportApplications.id), // Hangi başvuruya ait
  fieldId: integer('field_id').notNull().references(() => supportApplicationFields.id), // Hangi alana ait
  value: text('value').notNull(), // Girilen değer
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().default(sql`CURRENT_TIMESTAMP`)
})

/**
 * Görevler tablosu
 * Her ihtiyaç türü için tanımlanan görevleri tutar
 */
export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  needTypeId: integer('need_type_id').notNull().references(() => needTypes.id), // Hangi ihtiyaç türüne ait
  name: text('name').notNull(), // Görev adı (örn: "Mektup Yazımı", "Gönderim")
  description: text('description'), // Görev hakkında detaylı açıklama
  order: integer('order').notNull(), // Görevin sırası (1'den başlar)
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().default(sql`CURRENT_TIMESTAMP`)
})

/**
 * Eşleştirmeler tablosu
 * İhtiyaç talepleri ile destek başvurularının eşleştirildiği tablo
 */
export const matches = pgTable('matches', {
  id: serial('id').primaryKey(),
  needRequestId: integer('need_request_id').notNull().references(() => needRequests.id), // Eşleştirilen ihtiyaç talebi
  supportApplicationId: integer('support_application_id').notNull().references(() => supportApplications.id), // Eşleştirilen destek başvurusu
  coordinatorId: integer('coordinator_id').notNull().references(() => users.id), // Eşleştirmeyi yapan koordinatör
  status: text('status').notNull().default('in_progress'), // Eşleştirme durumu: 'in_progress', 'completed', 'cancelled'
  currentTaskId: integer('current_task_id').references(() => tasks.id), // Mevcut görev
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().default(sql`CURRENT_TIMESTAMP`)
})

/**
 * Görev Güncellemeleri tablosu
 * Eşleştirilmiş işlerin görev güncellemelerini tutar
 */
export const taskUpdates = pgTable('task_updates', {
  id: serial('id').primaryKey(),
  matchId: integer('match_id').notNull().references(() => matches.id), // Hangi eşleştirmeye ait
  taskId: integer('task_id').notNull().references(() => tasks.id), // Hangi göreve ait
  status: text('status').notNull(), // Görev durumu: 'completed', 'in_progress', 'pending'
  notes: text('notes'), // Görev hakkında ek notlar
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().default(sql`CURRENT_TIMESTAMP`)
})

/**
 * Bildirimler tablosu
 * Sistemdeki tüm bildirimleri tutar
 */
export const notifications = pgTable('notifications', {
  id: serial('id').primaryKey(),
  recipientId: integer('recipient_id').notNull().references(() => users.id), // Bildirimin gönderileceği kullanıcı
  type: text('type').notNull(), // Bildirim tipi: 'new_request', 'stage_update', 'match_completed'
  content: text('content').notNull(), // Bildirim içeriği
  isRead: boolean('is_read').notNull().default(false), // Bildirimin okunup okunmadığı
  relatedRecordId: integer('related_record_id'), // İlgili kaydın ID'si
  relatedRecordType: text('related_record_type'), // İlgili kaydın tipi
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().default(sql`CURRENT_TIMESTAMP`)
})
