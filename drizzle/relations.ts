import { relations } from "drizzle-orm/relations";
import { kitchens, items, buyers, account, orders, orderItems } from "./schema";

export const itemsRelations = relations(items, ({one}) => ({
	kitchen: one(kitchens, {
		fields: [items.kitchenId],
		references: [kitchens.kitchenId]
	}),
}));

export const kitchensRelations = relations(kitchens, ({many}) => ({
	items: many(items),
	orders: many(orders),
}));

export const accountRelations = relations(account, ({one}) => ({
	buyer: one(buyers, {
		fields: [account.id],
		references: [buyers.buyerId]
	}),
}));

export const buyersRelations = relations(buyers, ({many}) => ({
	accounts: many(account),
	orders: many(orders),
}));

export const ordersRelations = relations(orders, ({one, many}) => ({
	buyer: one(buyers, {
		fields: [orders.buyerId],
		references: [buyers.buyerId]
	}),
	kitchen: one(kitchens, {
		fields: [orders.kitchenId],
		references: [kitchens.kitchenId]
	}),
	orderItems: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({one}) => ({
	order: one(orders, {
		fields: [orderItems.orderId],
		references: [orders.orderId]
	}),
}));