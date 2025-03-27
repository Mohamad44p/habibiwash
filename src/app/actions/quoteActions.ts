"use server";

import { QuoteFormData, QuoteStatus, Quote } from "@/types/quote";
import { revalidatePath } from "next/cache";
import db from "../db/db";

export async function submitQuote(data: QuoteFormData) {
  try {
    const quote = await db.quote.create({
      data: {
        ...data,
        exteriorServices: data.exteriorServices || [],
        interiorServices: data.interiorServices || [],
        status: "PENDING" as const,
        zipCode: data.zipCode || null,
        message: data.message || null
      }
    });

    revalidatePath("/admin/quotes");
    return { success: true, quote };
  } catch (error) {
    console.error("Error submitting quote:", error);
    return { success: false, error: "Failed to submit quote" };
  }
}

export async function getQuotes(): Promise<Quote[]> {
  const quotes = await db.quote.findMany({
    orderBy: { createdAt: "desc" }
  });
  
  return quotes.map(quote => ({
    ...quote,
    status: quote.status as QuoteStatus,
    createdAt: new Date(quote.createdAt),
    updatedAt: new Date(quote.updatedAt)
  }));
}

export async function getQuote(id: string) {
  try {
    return await db.quote.findUnique({
      where: { id }
    });
  } catch (error) {
    console.error("Error fetching quote:", error);
    return null;
  }
}

export async function updateQuoteStatus(id: string, status: QuoteStatus) {
  const quote = await db.quote.update({
    where: { id },
    data: { status }
  });
  revalidatePath("/admin/quotes");
  return { ...quote, status: quote.status as QuoteStatus };
}

export async function deleteQuote(id: string): Promise<boolean> {
  try {
    // Delete quote record
    await db.quote.delete({
      where: { id }
    });
    
    // Revalidate the quotes page to update the UI
    revalidatePath("/admin/quotes");
    return true;
  } catch (error) {
    console.error('Error deleting quote:', error);
    return false;
  }
}
