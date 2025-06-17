import {
  ExtendedEditItemSchema,
  ExtendedRegisterItemSchema,
  RegisterItem,
} from "@/app/schema/item";
import { db } from "@/db/client";
import { NextRequest, NextResponse } from "next/server";
import { items as itemsTable } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";

export async function POST(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const kitchenId = parseInt(params.id);
  if (isNaN(kitchenId)) {
    return NextResponse.json({ error: "Invalid kitchen ID" }, { status: 400 });
  }

  const formData = await req.formData();

  try {
    const items: RegisterItem["items"] = [];
    let index = 0;

    while (formData.has(`items[${index}].item_name`)) {
      const item: any = {
        item_name: formData.get(`items[${index}].item_name`)?.toString() ?? "",
        item_description:
          formData.get(`items[${index}].item_description`)?.toString() ?? "",
        item_price: Number(formData.get(`items[${index}].item_price`) ?? 0),
        item_stock: Number(formData.get(`items[${index}].item_stock`) ?? 0),
        item_url: formData.get(`items[${index}].item_url`) as File | null,
      };
      items.push(item);
      index++;
    }

    const validated = ExtendedRegisterItemSchema.parse({ items });

    const newItems = validated.items.map((item) => ({
      kitchenId,
      itemName: item.item_name,
      itemDescription: item.item_description ?? "",
      itemPrice: item.item_price,
      itemStock: item.item_stock,
      itemUrl: null,
    }));

    const inserted = await db.insert(itemsTable).values(newItems).returning();

    return NextResponse.json(inserted, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Failed to create items",
        details: error?.errors ?? error?.message ?? error,
      },
      { status: 400 }
    );
  }
}

export async function PATCH(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const kitchenId = parseInt(params.id);
  if (isNaN(kitchenId)) {
    return NextResponse.json({ error: "Invalid kitchen ID" }, { status: 400 });
  }

  const formData = await req.formData();

  const items = [];
  let index = 0;

  while (formData.has(`items[${index}].item_id`)) {
    const item: any = {
      item_id: Number(formData.get(`items[${index}].item_id`)),
      item_name: formData.get(`items[${index}].item_name`)?.toString(),
      item_description: formData
        .get(`items[${index}].item_description`)
        ?.toString(),
      item_price: formData.get(`items[${index}].item_price`)
        ? Number(formData.get(`items[${index}].item_price`))
        : undefined,
      item_stock: formData.get(`items[${index}].item_stock`)
        ? Number(formData.get(`items[${index}].item_stock`))
        : undefined,
      item_url: formData.get(`items[${index}].item_url`) as File | null,
    };
    items.push(item);
    index++;
  }

  try {
    const validated = ExtendedEditItemSchema.parse({ items });

    const results = await Promise.all(
      validated.items.map((item) =>
        db
          .update(itemsTable)
          .set({
            itemName: item.item_name,
            itemDescription: item.item_description,
            itemPrice: item.item_price,
            itemStock: item.item_stock,
            itemUrl: item.item_url ? null : undefined,
          })
          .where(
            and(
              eq(itemsTable.itemId, item.item_id),
              eq(itemsTable.kitchenId, kitchenId)
            )
          )
          .returning()
      )
    );

    return NextResponse.json({ updated: results.flat() }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to update items", details: err?.errors ?? err?.message },
      { status: 400 }
    );
  }
}

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const kitchenId = parseInt((await context.params).id, 10);

  if (isNaN(kitchenId)) {
    return NextResponse.json({ error: "Invalid kitchen ID" }, { status: 400 });
  }

  try {
    const kitchenItems = await db
      .select()
      .from(itemsTable)
      .where(eq(itemsTable.kitchenId, kitchenId));

    console.log("✅ kitchenItems:", kitchenItems);

    return NextResponse.json(kitchenItems, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch items", details: error?.message ?? error },
      { status: 500 }
    );
  }
}
