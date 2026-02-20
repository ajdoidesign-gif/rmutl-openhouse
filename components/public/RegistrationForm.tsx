'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { registrationSchema, type RegistrationFormData } from '@/lib/validations/registration'
import { cn } from '@/lib/utils'

interface Program {
  id: string
  name: string
  short_name: string
  color: string
  icon: string | null
}

interface Activity {
  id: string
  name: string
  display_name: string | null
  program_id: string | null
  // Supabase may return joined relation as array or single object
  programs: { short_name: string; color: string; icon: string | null } | { short_name: string; color: string; icon: string | null }[] | null
}

const SOURCE_OPTIONS = [
  'Facebook / Instagram',
  'แนะแนวจากโรงเรียน',
  'เพื่อน / รุ่นพี่แนะนำ',
  'เว็บไซต์มหาวิทยาลัย',
  'LINE',
  'อื่น ๆ',
]

export default function RegistrationForm({
  programs,
  activities,
}: {
  programs: Program[]
  activities: Activity[]
}) {
  const router = useRouter()
  const supabase = createClient()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      activity_ids: [],
    },
  })

  const selectedActivities = watch('activity_ids') || []
  const choice1 = watch('program_choice_1')
  const choice2 = watch('program_choice_2')

  const toggleActivity = (id: string) => {
    const current = getValues('activity_ids') || []
    if (current.includes(id)) {
      setValue('activity_ids', current.filter((a) => a !== id), { shouldValidate: true })
    } else {
      setValue('activity_ids', [...current, id], { shouldValidate: true })
    }
  }

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true)
    setServerError(null)

    const result = await supabase.rpc('submit_registration', {
      p_first_name: data.first_name,
      p_last_name: data.last_name,
      p_phone: data.phone,
      p_school_name: data.school_name,
      p_source: data.source || null,
      p_program_choice_1: data.program_choice_1,
      p_activity_ids: data.activity_ids,
      p_program_choice_2: data.program_choice_2 || null,
      p_program_choice_3: data.program_choice_3 || null,
    })

    setIsSubmitting(false)

    if (result.error || !result.data?.success) {
      const errCode = result.data?.error
      if (errCode === 'already_registered') {
        setServerError('เบอร์โทรนี้ลงทะเบียนไว้แล้ว ไม่สามารถลงทะเบียนซ้ำได้')
      } else {
        setServerError('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
      }
      return
    }

    router.push(`/register/success?id=${result.data.registration_id}`)
  }

  const inputClass = (hasError?: boolean) =>
    cn(
      'w-full border rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-accent/30 focus:border-accent',
      hasError ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'
    )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* ข้อมูลส่วนตัว */}
      <div>
        <h2 className="font-semibold text-primary text-lg mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-accent text-white text-xs flex items-center justify-center font-bold">1</span>
          ข้อมูลส่วนตัว
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              ชื่อ <span className="text-accent">*</span>
            </label>
            <input {...register('first_name')} className={inputClass(!!errors.first_name)} placeholder="ชื่อ" />
            {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              นามสกุล <span className="text-accent">*</span>
            </label>
            <input {...register('last_name')} className={inputClass(!!errors.last_name)} placeholder="นามสกุล" />
            {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              เบอร์โทรศัพท์ <span className="text-accent">*</span>
            </label>
            <input {...register('phone')} className={inputClass(!!errors.phone)} placeholder="0812345678" type="tel" />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              โรงเรียน <span className="text-accent">*</span>
            </label>
            <input {...register('school_name')} className={inputClass(!!errors.school_name)} placeholder="ชื่อโรงเรียน" />
            {errors.school_name && <p className="text-red-500 text-xs mt-1">{errors.school_name.message}</p>}
          </div>
        </div>
      </div>

      {/* หลักสูตรที่สนใจ */}
      <div>
        <h2 className="font-semibold text-primary text-lg mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-accent text-white text-xs flex items-center justify-center font-bold">2</span>
          หลักสูตรที่สนใจ
        </h2>
        <div className="space-y-3">
          {[
            { key: 'program_choice_1' as const, label: 'อันดับ 1', required: true },
            { key: 'program_choice_2' as const, label: 'อันดับ 2', required: false },
            { key: 'program_choice_3' as const, label: 'อันดับ 3', required: false },
          ].map(({ key, label, required }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {label} {required && <span className="text-accent">*</span>}
                {!required && <span className="text-gray-400 font-normal">(ไม่บังคับ)</span>}
              </label>
              <select
                {...register(key)}
                className={inputClass(!!errors[key])}
              >
                <option value="">-- เลือกหลักสูตร --</option>
                {programs
                  .filter((p) => {
                    if (key === 'program_choice_2') return p.id !== choice1
                    if (key === 'program_choice_3') return p.id !== choice1 && p.id !== choice2
                    return true
                  })
                  .map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.icon} {p.name}
                    </option>
                  ))}
              </select>
              {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]?.message}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* กิจกรรม */}
      <div>
        <h2 className="font-semibold text-primary text-lg mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-accent text-white text-xs flex items-center justify-center font-bold">3</span>
          กิจกรรมที่ต้องการเข้าร่วม <span className="text-accent">*</span>
        </h2>
        <p className="text-gray-500 text-sm mb-4">เลือกได้มากกว่า 1 กิจกรรม</p>
        <div className="space-y-3">
          {activities.map((activity) => {
            const isChecked = selectedActivities.includes(activity.id)
            const displayName = activity.display_name || activity.name
            const prog = Array.isArray(activity.programs) ? activity.programs[0] : activity.programs

            return (
              <label
                key={activity.id}
                className={cn(
                  'flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200',
                  isChecked
                    ? 'border-accent bg-accent/5'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                )}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleActivity(activity.id)}
                  className="mt-0.5 w-4 h-4 accent-accent flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    {prog && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ backgroundColor: prog.color + '20', color: prog.color }}
                      >
                        {prog.icon} {prog.short_name}
                      </span>
                    )}
                  </div>
                  <p className={cn('text-sm mt-1 font-medium', isChecked ? 'text-accent' : 'text-gray-700')}>
                    {displayName}
                  </p>
                </div>
              </label>
            )
          })}
        </div>
        {errors.activity_ids && (
          <p className="text-red-500 text-xs mt-2">{errors.activity_ids.message}</p>
        )}
      </div>

      {/* ที่มาของข่าวสาร */}
      <div>
        <h2 className="font-semibold text-primary text-lg mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-accent text-white text-xs flex items-center justify-center font-bold">4</span>
          ทราบข่าวสารจากที่ใด
          <span className="text-gray-400 font-normal text-sm">(ไม่บังคับ)</span>
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {SOURCE_OPTIONS.map((src) => (
            <label key={src} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="radio"
                value={src}
                {...register('source')}
                className="accent-accent"
              />
              {src}
            </label>
          ))}
        </div>
      </div>

      {/* Error */}
      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          {serverError}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-accent hover:bg-red-600 disabled:bg-gray-300 text-white font-semibold py-4 rounded-xl text-lg transition-all duration-200 shadow-sm hover:shadow-lg disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            กำลังบันทึก...
          </span>
        ) : (
          'ยืนยันการลงทะเบียน'
        )}
      </button>
    </form>
  )
}
