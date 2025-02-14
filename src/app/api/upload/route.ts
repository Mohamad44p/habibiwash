// app/api/upload/route.ts

import { NextResponse } from 'next/server';
import { put, del } from '@vercel/blob';
import { nanoid } from 'nanoid';

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  try {
    const uniqueFilename = `${nanoid()}-${file.name}`;
    const blob = await put(uniqueFilename, file, {
      access: 'public',
    });

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'No URL provided' }, { status: 400 });
  }

  try {
    // Extract the filename from the URL
    const urlParts = url.split('/');
    const filename = urlParts[urlParts.length - 1];
    
    await del(filename);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};