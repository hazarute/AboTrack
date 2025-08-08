"use client"

import { Subscription } from './types'
import { SubscriptionCard } from './SubscriptionCard'

interface SubscriptionListProps {
  subscriptions: Subscription[]
  onDeleteSubscription: (id: string) => void
  totalCost: number
}

export function SubscriptionList({ 
  subscriptions, 
  onDeleteSubscription, 
  totalCost 
}: SubscriptionListProps) {
  if (subscriptions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          Henüz hiç aboneliğiniz bulunmuyor.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {subscriptions.map((subscription) => (
        <SubscriptionCard
          key={subscription.id}
          subscription={subscription}
          onDelete={onDeleteSubscription}
        />
      ))}
    </div>
  )
}
