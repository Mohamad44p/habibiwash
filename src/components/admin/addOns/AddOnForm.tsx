'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { AddOn } from '@/types/addOn'
import { useRouter } from 'next/navigation'
import { IconSelector } from '@/components/front/Home/icon-selector'
import { createAddOn, updateAddOn } from '@/app/actions/addOnsActions'
import { AVAILABLE_ICONS, IconName } from "@/lib/icons/icons" // Added AVAILABLE_ICONS import

const addOnSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.coerce.number().min(0, 'Price must be a positive number'),
  icon: z.string().refine((val) => val in AVAILABLE_ICONS, 'Please select a valid icon') as z.ZodType<IconName>,
})

export default function AddOnForm({ initialData }: { initialData?: AddOn }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<AddOn>({
    resolver: zodResolver(addOnSchema),
    defaultValues: initialData || {
      name: '',
      description: '',
      price: 0,
      icon: undefined,
    },
  })

  const onSubmit = async (data: AddOn) => {
    setIsSubmitting(true)
    try {
      if (initialData) {
        await updateAddOn(initialData.id!, data)
      } else {
        await createAddOn(data)
      }
      router.push('/admin/add-ons')
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  step="0.01" 
                  {...field} 
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Icon</FormLabel>
              <FormControl>
                <IconSelector value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/admin/add-ons')}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 
              'Saving...' : 
              initialData ? 'Update Add-on' : 'Create Add-on'
            }
          </Button>
        </div>
      </form>
    </Form>
  )
}
