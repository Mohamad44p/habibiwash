'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { TimeSlot } from '@/types/timeSlot'
import { useRouter } from 'next/navigation'
import { createTimeSlot, updateTimeSlot } from '@/app/actions/timeSlotsActions'

const timeSlotSchema = z.object({
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
})

export default function TimeSlotForm({ initialData }: { initialData?: TimeSlot }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<TimeSlot>({
    resolver: zodResolver(timeSlotSchema),
    defaultValues: initialData || {
      startTime: '',
      endTime: '',
    },
  })

  const onSubmit = async (data: TimeSlot) => {
    setIsSubmitting(true)
    try {
      if (initialData) {
        await updateTimeSlot(initialData.id!, data)
      } else {
        await createTimeSlot(data)
      }
      router.push('/admin/time-slots')
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Time</FormLabel>
              <FormControl>
                <Input type="time" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Time</FormLabel>
              <FormControl>
                <Input type="time" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/admin/time-slots')}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 
              'Saving...' : 
              initialData ? 'Update Time Slot' : 'Create Time Slot'
            }
          </Button>
        </div>
      </form>
    </Form>
  )
}
