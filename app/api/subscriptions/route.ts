// app/api/subscriptions/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

// Tüm abonelikleri getir
export async function GET() {
  try {
    console.log('Abonelikler getiriliyor...');
    const subscriptions = await prisma.subscription.findMany({
      orderBy: { createdAt: 'desc' },
    });
    console.log('Abonelikler alındı:', subscriptions);
    return NextResponse.json(subscriptions);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu';
    console.error('Abonelikler alınırken hata oluştu:', error);
    return NextResponse.json(
      { 
        error: 'Abonelikler yüklenirken bir hata oluştu',
        details: errorMessage 
      },
      { status: 500 }
    );
  }
}

// Yeni abonelik oluştur
export async function POST(request: Request) {
  try {
    const { name, price, renewalDate } = await request.json();
    console.log('Yeni abonelik oluşturuluyor:', { name, price, renewalDate });
    
    // Basit doğrulama
    if (!name || !price || !renewalDate) {
      return NextResponse.json(
        { error: 'Lütfen tüm alanları doldurun' },
        { status: 400 }
      );
    }

    const subscription = await prisma.subscription.create({
      data: {
        name,
        price: parseFloat(price),
        renewalDate: new Date(renewalDate),
      },
    });
    console.log('Abonelik oluşturuldu:', subscription);

    return NextResponse.json(subscription, { status: 201 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu';
    console.error('Abonelik oluşturulurken hata oluştu:', error);
    return NextResponse.json(
      { 
        error: 'Abonelik oluşturulurken bir hata oluştu',
        details: errorMessage 
      },
      { status: 500 }
    );
  }
}