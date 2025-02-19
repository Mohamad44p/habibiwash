import { NextResponse } from 'next/server';
import db from '@/app/db/db';

export async function POST(request: Request) {
  try {
    const { addonIds } = await request.json();

    if (!addonIds || !Array.isArray(addonIds)) {
      return NextResponse.json({ error: 'Invalid add-on IDs' }, { status: 400 });
    }

    const addOns = await db.addOn.findMany({
      where: {
        id: {
          in: addonIds
        }
      },
      select: {
        price: true
      }
    });

    const total = addOns.reduce((sum, addon) => sum + addon.price, 0);

    return NextResponse.json({ total });
  } catch (error) {
    console.error('Error calculating add-ons prices:', error);
    return NextResponse.json(
      { error: 'Failed to calculate add-ons prices' },
      { status: 500 }
    );
  }
}
