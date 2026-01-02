import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    currency: v.optional(v.string()),
    locale: v.optional(v.string()),
    createdAt: v.string(),
    updatedAt: v.string(),
  }).index("by_clerkId", ["clerkId"]),

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
