'use server'

import { revalidatePath } from 'next/cache'
import { DateRange } from 'react-day-picker'
import { redirect } from 'next/navigation'

export async function updateDashboardDate(range: DateRange | undefined) {
  try {
    const params = new URLSearchParams();
    
    if (range?.from instanceof Date && range?.to instanceof Date) {
      params.set('from', range.from.toISOString());
      params.set('to', range.to.toISOString());
    }

    revalidatePath('/admin/dashboard');
    redirect(`/admin/dashboard${params.toString() ? `?${params.toString()}` : ''}`);
  } catch (error) {
    console.error('Error updating dashboard date:', error);
    redirect('/admin/dashboard');
  }
}
