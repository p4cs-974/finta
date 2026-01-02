import { mutation } from "./_generated/server";

export const onAuthenticateUser = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .first();

    const now = new Date().toISOString();

    if (existing) {
      // Update existing user with latest Clerk data
      await ctx.db.patch(existing._id, {
        email: identity.email ?? existing.email,
        firstName: identity.givenName ?? existing.firstName,
        lastName: identity.familyName ?? existing.lastName,
        imageUrl: identity.pictureUrl ?? existing.imageUrl,
        updatedAt: now,
      });
      return existing._id;
    }

    // Create new user from Clerk data
    return await ctx.db.insert("users", {
      clerkId: identity.subject,
      email: identity.email ?? "",
      firstName: identity.givenName,
      lastName: identity.familyName,
      imageUrl: identity.pictureUrl,
      createdAt: now,
      updatedAt: now,
    });
  },
});
