'use client'

import { useCallback, useState } from 'react'
import { DateRange } from "react-day-picker"
import { DateRangePicker } from "./DateRangePicker"
import { useSearchParams } from 'next/navigation'

interface DateRangePickerWrapperProps {
  onDateChange: (range: DateRange | undefined) => Promise<void>
}

export function DateRangePickerWrapper({ onDateChange }: DateRangePickerWrapperProps) {
  const searchParams = useSearchParams()
  
  const [date, setDate] = useState<DateRange | undefined>(() => {
    const from = searchParams.get('from')
    const to = searchParams.get('to')
    if (from && to) {
      return {
        from: new Date(from),
        to: new Date(to)
      }
    }
    return {
      from: new Date(new Date().setDate(new Date().getDate() - 30)),
      to: new Date()
    }
  })

  const handleDateChange = useCallback(async (newDate: DateRange | undefined) => {
    setDate(newDate)
    await onDateChange(newDate)
  }, [onDateChange])

  return <DateRangePicker date={date} onDateChange={handleDateChange} />
}
