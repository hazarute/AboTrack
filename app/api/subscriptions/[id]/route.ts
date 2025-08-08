// app/api/subscriptions/[id]/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Aboneliği sil
export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    // Parametreleri context'ten alıyoruz ve await ile bekliyoruz
    const { id } = await Promise.resolve(context.params);
    
    await prisma.subscription.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Abonelik başarıyla silindi' });
  } catch (error) {
    console.error('Silme hatası:', error);
    return NextResponse.json(
      { 
        error: 'Abonelik silinirken bir hata oluştu',
        details: error instanceof Error ? error.message : 'Bilinmeyen hata'
      },
      { status: 500 }
    );
  }
}