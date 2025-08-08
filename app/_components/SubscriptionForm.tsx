"use client"

import { useState } from "react"
import { CalendarDays } from 'lucide-react'
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { SubscriptionFormData } from "./types"

interface SubscriptionFormProps {
  onSubmit: (data: { name: string; price: number; renewalDate: Date }) => void;
}

export function SubscriptionForm({ onSubmit }: SubscriptionFormProps) {
  const [formData, setFormData] = useState<SubscriptionFormData>({
    name: "",
    price: "",
    renewalDate: undefined
  })
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Abonelik adı zorunludur'
    }
    
    if (!formData.price) {
      newErrors.price = 'Aylık ücret zorunludur'
    } else if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Geçerli bir tutar girin'
    }
    
    if (!formData.renewalDate) {
      newErrors.renewalDate = 'Lütfen bir tarih seçin'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    onSubmit({
      name: formData.name,
      price: parseFloat(formData.price),
      renewalDate: formData.renewalDate as Date
    })

    // Reset form
    setFormData({ name: "", price: "", renewalDate: undefined })
    setErrors({})
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Abonelik Adı</Label>
        <Input
          id="name"
          placeholder="Netflix Premium"
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value })
            if (errors.name) {
              setErrors({ ...errors, name: '' })
            }
          }}
        />
        {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Aylık Ücret</Label>
        <div className="relative">
          <Input
            id="price"
            type="number"
            step="0.01"
            placeholder="99.99"
            value={formData.price}
            onChange={(e) => {
              setFormData({ ...formData, price: e.target.value })
              if (errors.price) {
                setErrors({ ...errors, price: '' })
              }
            }}
            className="pl-8"
          />
          {errors.price && <p className="text-sm text-red-500 mt-1">{errors.price}</p>}
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            ₺
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Sonraki Yenileme Tarihi</Label>
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <div className="space-y-2">
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.renewalDate && "text-muted-foreground"
                )}
              >
                <CalendarDays className="mr-2 h-4 w-4" />
                {formData.renewalDate ? (
                  format(formData.renewalDate, "PPP")
                ) : (
                  <span>Tarih seçin</span>
                )}
              </Button>
            </PopoverTrigger>
            {errors.renewalDate && <p className="text-sm text-red-500 mt-1">{errors.renewalDate}</p>}
          </div>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={formData.renewalDate}
              onSelect={(date: Date | undefined) => {
                setFormData({ ...formData, renewalDate: date })
                if (errors.renewalDate) {
                  setErrors({ ...errors, renewalDate: '' })
                }
                setIsCalendarOpen(false)
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <Button type="submit" className="w-full">
        Aboneliği Ekle
      </Button>
    </form>
  )
}
