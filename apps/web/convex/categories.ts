import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const defaultCategories = [
  { name: "Groceries", icon: "shopping-cart", color: "#22c55e" },
  { name: "Dining", icon: "utensils", color: "#f97316" },
  { name: "Transport", icon: "car", color: "#3b82f6" },
  { name: "Entertainment", icon: "film", color: "#a855f7" },
  { name: "Shopping", icon: "shopping-bag", color: "#ec4899" },
  { name: "Utilities", icon: "zap", color: "#eab308" },
  { name: "Health", icon: "heart", color: "#ef4444" },
  { name: "Income", icon: "wallet", color: "#10b981" },
  { name: "Other", icon: "more-horizontal", color: "#6b7280" },
];

export const list = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return defaultCategories.map((cat, i) => ({ ...cat, _id: `default-${i}` }));
    }

    const categories = await ctx.db
      .query("categories")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .collect();

    if (categories.length === 0) {
      return defaultCategories.map((cat, i) => ({ ...cat, _id: `default-${i}` }));
    }

    return categories;
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    icon: v.optional(v.string()),
    color: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    return await ctx.db.insert("categories", {
      userId: identity.subject,
      ...args,
    });
  },
});

export const remove = mutation({
  args: { id: v.id("categories") },
  handler: async (ctx, { id }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const category = await ctx.db.get(id);
    if (!category || category.userId !== identity.subject) {
      throw new Error("Not found");
    }

    return await ctx.db.delete(id);
  },
});
