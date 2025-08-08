"use client"

import { Trash2 } from 'lucide-react'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Subscription } from './types'

interface SubscriptionCardProps {
  subscription: Subscription
  onDelete: (id: string) => void
}

export function SubscriptionCard({ subscription, onDelete }: SubscriptionCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">
            {subscription.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {subscription.price.toFixed(2)} ₺
          </p>
          <p className="text-xs text-muted-foreground">
            Yenilenme Tarihi: {format(subscription.renewalDate, "dd.MM.yyyy")}
          </p>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onDelete(subscription.id)}
          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Aboneliği sil</span>
        </Button>
      </div>
    </Card>
  )
}
