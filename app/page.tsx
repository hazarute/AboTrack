"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from 'lucide-react'
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { SubscriptionForm } from "./_components/SubscriptionForm"
import { SubscriptionList } from "./_components/SubscriptionList"
import { Subscription } from "./_components/types"

export default function Dashboard() {
  const { theme, setTheme } = useTheme()
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch subscriptions on component mount
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch('/api/subscriptions')
        if (!response.ok) throw new Error('Failed to fetch subscriptions')
        const data = await response.json()
        setSubscriptions(data)
      } catch (error) {
        console.error('Error fetching subscriptions:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSubscriptions()
  }, [])

  const totalCost = subscriptions.reduce((sum, sub) => sum + sub.price, 0)

  const handleAddSubscription = async (data: { name: string; price: number; renewalDate: Date }) => {
    try {
      const response = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          price: data.price.toString(),
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to add subscription')
      }

      const newSubscription = await response.json()
      setSubscriptions([newSubscription, ...subscriptions])
    } catch (error) {
      console.error('Error adding subscription:', error)
    }
  }

  const deleteSubscription = async (id: string) => {
    try {
      const response = await fetch(`/api/subscriptions/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete subscription')

      setSubscriptions(subscriptions.filter(sub => sub.id !== id))
    } catch (error) {
      console.error('Error deleting subscription:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1" />
            <h1 className="text-4xl font-bold text-foreground">AboTrack</h1>
            <div className="flex-1 flex justify-end">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </div>
          </div>
          <p className="text-lg text-muted-foreground">Manage your subscriptions with ease</p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Add New Subscription */}
          <Card>
            <CardHeader>
              <CardTitle>Yeni Abonelik Ekle</CardTitle>
              <CardDescription>
                Aylık harcamalarınızı takip etmek için yeni bir abonelik ekleyin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SubscriptionForm onSubmit={handleAddSubscription} />
            </CardContent>
          </Card>

          {/* Right Column - My Subscriptions */}
          <Card>
            <CardHeader>
              <CardTitle>Aboneliklerim</CardTitle>
              <CardDescription>
                Toplam Aylık Maliyet: <span className="font-semibold text-foreground">{totalCost.toFixed(2)} ₺</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SubscriptionList 
                subscriptions={subscriptions} 
                onDeleteSubscription={deleteSubscription}
                totalCost={totalCost}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
