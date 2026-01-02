import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  transactions: defineTable({
    userId: v.string(),
    amount: v.number(),
    description: v.string(),
    category: v.string(),
    type: v.union(v.literal("income"), v.literal("expense")),
    date: v.string(),
  }).index("by_user", ["userId"]),

  budgets: defineTable({
    userId: v.string(),
    category: v.string(),
    limit: v.number(),
    period: v.union(v.literal("weekly"), v.literal("monthly")),
  }).index("by_user", ["userId"]),

  categories: defineTable({
    userId: v.string(),
    name: v.string(),
    icon: v.optional(v.string()),
    color: v.optional(v.string()),
  }).index("by_user", ["userId"]),
});
