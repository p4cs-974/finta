import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const transactions = await ctx.db
      .query("transactions")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .order("desc")
      .collect();

    return transactions;
  },
});

export const create = mutation({
  args: {
    amount: v.number(),
    description: v.string(),
    category: v.string(),
    type: v.union(v.literal("income"), v.literal("expense")),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    return await ctx.db.insert("transactions", {
      userId: identity.subject,
      ...args,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("transactions"),
    amount: v.number(),
    description: v.string(),
    category: v.string(),
    type: v.union(v.literal("income"), v.literal("expense")),
    date: v.string(),
  },
  handler: async (ctx, { id, ...args }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const transaction = await ctx.db.get(id);
    if (!transaction || transaction.userId !== identity.subject) {
      throw new Error("Not found");
    }

    return await ctx.db.patch(id, args);
  },
});

export const remove = mutation({
  args: { id: v.id("transactions") },
  handler: async (ctx, { id }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const transaction = await ctx.db.get(id);
    if (!transaction || transaction.userId !== identity.subject) {
      throw new Error("Not found");
    }

    return await ctx.db.delete(id);
  },
});

export const getStats = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return { totalBalance: 0, monthlySpending: 0, monthlyIncome: 0 };
    }

    const transactions = await ctx.db
      .query("transactions")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .collect();

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      .toISOString()
      .split("T")[0];

    let totalBalance = 0;
    let monthlySpending = 0;
    let monthlyIncome = 0;

    for (const tx of transactions) {
      if (tx.type === "income") {
        totalBalance += tx.amount;
        if (tx.date >= startOfMonth) {
          monthlyIncome += tx.amount;
        }
      } else {
        totalBalance -= tx.amount;
        if (tx.date >= startOfMonth) {
          monthlySpending += tx.amount;
        }
      }
    }

    return { totalBalance, monthlySpending, monthlyIncome };
  },
});
