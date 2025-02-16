'use client'

import { useState } from 'react'
import { useForm, useFieldArray, Control } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Package } from '@/types/package'
import { useRouter } from 'next/navigation'
import { RichTextEditor } from '@/components/front/Editor/RichTextEditor'
import { ImageUpload } from '@/lib/ImageUpload'
import { createPackage, updatePackage } from '@/app/actions/packagesActions'
import { X, Plus, Trash2 } from 'lucide-react';
import { Switch } from "@/components/ui/switch" // Add this import

const priceSchema = z.object({
  id: z.string().optional(),
  vehicleType: z.string().min(1, 'Vehicle type is required'),
  price: z.number().min(0, 'Price must be a positive number'),
})

const subPackageSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Sub package name is required'),
  description: z.string().min(1, 'Description is required'),
  duration: z.coerce.number().min(1, 'Duration must be at least 1 minute'), // Changed to coerce
  prices: z.array(priceSchema).min(1, 'At least one price is required'),
  image: z.string().optional(), // Add image field
})

const packageSchema = z.object({
  name: z.string().min(1, 'Package name is required'),
  image: z.string().optional(),
  featured: z.boolean().default(false), // Add featured field
  subPackages: z.array(subPackageSchema).min(1, 'At least one sub package is required'),
})

type PackageFormValues = z.infer<typeof packageSchema>

export default function PackageForm({ initialData }: { initialData?: Package }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<PackageFormValues>({
    resolver: zodResolver(packageSchema),
    defaultValues: initialData || {
      name: '',
      image: '',
      featured: false, // Add default value
      subPackages: [{ name: '', description: '', duration: 0, prices: [{ vehicleType: '', price: 0 }], image: '' }],
    },
  })

  const subPackagesArray = useFieldArray({
    control: form.control,
    name: 'subPackages',
  });

  const onSubmit = async (data: PackageFormValues) => {
    setIsSubmitting(true)
    try {
      // If image has changed, delete the old one
      if (initialData?.image && initialData.image !== data.image) {
        await fetch(`/api/upload?url=${encodeURIComponent(initialData.image)}`, {
          method: 'DELETE',
        });
      }

      if (initialData) {
        await updatePackage(initialData.id!, data)
      } else {
        await createPackage(data)
      }
      router.push('/admin/packages')
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-7xl mx-auto space-y-8 p-6">
        <div className="bg-white rounded-xl shadow-sm p-8 space-y-6 dark:bg-[#0F0F12] dark:shadow-none">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-medium dark:text-gray-100">Package Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full dark:bg-[#0F0F12] dark:text-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Add featured field after name field */}
            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base dark:text-gray-100">Featured Package</FormLabel>
                    <div className="text-sm text-muted-foreground">
                      This package will be highlighted in the booking page
                    </div>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-medium dark:text-gray-100">Package Image</FormLabel>
                  <FormControl>
                    <ImageUpload 
                      value={field.value} 
                      onChange={field.onChange} 
                      height="250px" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6 pt-6 border-t dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100">Sub Packages</h3>
              <Button
                type="button"
                variant="outline"
                onClick={() => subPackagesArray.append({
                  name: '',
                  description: '',
                  duration: 0,
                  prices: [{ vehicleType: '', price: 0 }],
                  image: ''
                })}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Sub Package
              </Button>
            </div>

            <div className="space-y-6">
              {subPackagesArray.fields.map((subPackageField, subPackageIndex) => (
                <div
                  key={subPackageField.id}
                  className="relative bg-gray-50 rounded-xl p-6 space-y-6 border border-gray-200 dark:dark:bg-[#0F0F12] dark:border-gray-600"
                >
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => subPackagesArray.remove(subPackageIndex)}
                    className="absolute right-4 top-4 text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <X className="w-4 h-4" />
                  </Button>

                  <div className="space-y-6">
                    {/* Sub Package Name */}
                    <FormField
                      control={form.control}
                      name={`subPackages.${subPackageIndex}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="dark:text-gray-200">Name</FormLabel>
                          <FormControl>
                            <Input {...field} className="bg-white dark:bg-[#0F0F12] dark:text-white" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Duration */}
                    <FormField
                      control={form.control}
                      name={`subPackages.${subPackageIndex}.duration`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="dark:text-gray-200">Duration (minutes)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="1"
                              className="bg-white dark:bg-[#0F0F12] dark:text-white"
                              {...field}
                              onChange={(e) => field.onChange(e.target.valueAsNumber)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Description */}
                    <FormField
                      control={form.control}
                      name={`subPackages.${subPackageIndex}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="dark:text-gray-200">Description</FormLabel>
                          <FormControl>
                            <div className="border rounded-lg bg-white overflow-hidden dark:bg-[#0F0F12] dark:border-gray-700">
                              <RichTextEditor content={field.value} onChange={field.onChange} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Sub Package Image */}
                    <FormField
                      control={form.control}
                      name={`subPackages.${subPackageIndex}.image`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-medium dark:text-gray-100">Sub Package Image</FormLabel>
                          <FormControl>
                            <ImageUpload 
                              value={field.value} 
                              onChange={field.onChange} 
                              height="200px" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Prices */}
                    <div className="pt-4">
                      <PriceFields
                        control={form.control}
                        subPackageIndex={subPackageIndex}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 sticky bottom-0 bg-white p-4 border-t shadow-lg dark:bg-[#0F0F12] dark:border-gray-700 dark:shadow-none">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/admin/packages')}
            className="w-32"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting} 
            className="w-32"
          >
            {isSubmitting ? 
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                {initialData ? 'Updating...' : 'Creating...'}
              </div>
              : 
              initialData ? 'Update' : 'Create'
            }
          </Button>
        </div>
      </form>
    </Form>
  );
}

function PriceFields({ control, subPackageIndex }: { control: Control<PackageFormValues>, subPackageIndex: number }) {
  const { fields: priceFields, append: appendPrice, remove: removePrice } = useFieldArray({
    control,
    name: `subPackages.${subPackageIndex}.prices`,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-md font-medium text-gray-900 dark:text-gray-100">Price List</h4>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => appendPrice({ vehicleType: '', price: 0 })}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Price
        </Button>
      </div>
      
      <div className="space-y-4">
        {priceFields.map((priceField, priceIndex) => (
          <div key={priceField.id} 
               className="p-4 rounded-lg bg-white border border-gray-200 space-y-4 dark:bg-[#0F0F12] dark:border-gray-600"
          >
            <div className="flex justify-between items-center">
              <h5 className="text-sm font-medium text-gray-700 dark:text-gray-200">Price #{priceIndex + 1}</h5>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removePrice(priceIndex)}
                className="text-red-500 hover:text-red-600 hover:bg-red-50 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <FormField
                control={control}
                name={`subPackages.${subPackageIndex}.prices.${priceIndex}.vehicleType`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-gray-200">Vehicle Type</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-white dark:bg-[#0F0F12] dark:text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`subPackages.${subPackageIndex}.prices.${priceIndex}.price`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-gray-200">Price</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="number" 
                        step="0.01"
                        className="bg-white dark:bg-[#0F0F12] dark:text-white"
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}