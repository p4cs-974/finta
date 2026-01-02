import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const budgets = await ctx.db
      .query("budgets")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .collect();

    const transactions = await ctx.db
      .query("transactions")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .collect();

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      .toISOString()
      .split("T")[0];
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()))
      .toISOString()
      .split("T")[0];

    return budgets.map((budget) => {
      const startDate = budget.period === "monthly" ? startOfMonth : startOfWeek;
      const spent = transactions
        .filter(
          (tx) =>
            tx.type === "expense" &&
            tx.category === budget.category &&
            tx.date >= startDate
        )
        .reduce((sum, tx) => sum + tx.amount, 0);

      return { ...budget, spent };
    });
  },
});

export const create = mutation({
  args: {
    category: v.string(),
    limit: v.number(),
    period: v.union(v.literal("weekly"), v.literal("monthly")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    return await ctx.db.insert("budgets", {
      userId: identity.subject,
      ...args,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("budgets"),
    category: v.string(),
    limit: v.number(),
    period: v.union(v.literal("weekly"), v.literal("monthly")),
  },
  handler: async (ctx, { id, ...args }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const budget = await ctx.db.get(id);
    if (!budget || budget.userId !== identity.subject) {
      throw new Error("Not found");
    }

    return await ctx.db.patch(id, args);
  },
});

export const remove = mutation({
  args: { id: v.id("budgets") },
  handler: async (ctx, { id }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const budget = await ctx.db.get(id);
    if (!budget || budget.userId !== identity.subject) {
      throw new Error("Not found");
    }

    return await ctx.db.delete(id);
  },
});
