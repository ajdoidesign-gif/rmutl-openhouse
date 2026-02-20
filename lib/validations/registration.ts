import { z } from 'zod'

export const registrationSchema = z.object({
  first_name: z.string().min(1, 'กรุณากรอกชื่อ').max(100),
  last_name: z.string().min(1, 'กรุณากรอกนามสกุล').max(100),
  phone: z
    .string()
    .min(9, 'เบอร์โทรศัพท์ต้องมีอย่างน้อย 9 หลัก')
    .max(15)
    .regex(/^[0-9+\-\s]+$/, 'รูปแบบเบอร์โทรไม่ถูกต้อง'),
  school_name: z.string().min(1, 'กรุณากรอกชื่อโรงเรียน').max(200),
  source: z.string().optional(),
  program_choice_1: z.string().uuid('กรุณาเลือกหลักสูตรอันดับ 1'),
  program_choice_2: z.string().uuid().optional().or(z.literal('')),
  program_choice_3: z.string().uuid().optional().or(z.literal('')),
  activity_ids: z
    .array(z.string().uuid())
    .min(1, 'กรุณาเลือกกิจกรรมอย่างน้อย 1 กิจกรรม'),
})

export type RegistrationFormData = z.infer<typeof registrationSchema>
