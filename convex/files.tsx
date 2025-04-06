import {v} from 'convex/values';
import { mutation, query } from './_generated/server';

export const createFile = mutation({
    args: {
        fileName: v.string(),
        teamId: v.string(),
        createdBy: v.string(),
        archive: v.boolean(),
        document: v.string(),
        whiteboard: v.string()
    },

    handler: async(ctx, args) => {
        const result = await ctx.db.insert('files', args);
        return result;
    }
});

export const getFiles = query({
    args: {
        teamId: v.string()
    },

    handler: async(ctx, args) => {
        const result = ctx.db.query('files')
        .filter((q) => q.eq(q.field('teamId'), args.teamId))
        .order('desc')
        .collect();

        return result;
    }
});


export const updateDocument = mutation({
    args: {
        _id: v.id('files'),
        document: v.string()
    },

    handler: async(ctx, args) => {
        const result = await ctx.db.patch(args._id, {document: args.document});
        return result;
    }
});


export const updateWhiteboard = mutation({
    args: {
        _id: v.id('files'),
        whiteboard: v.string()
    },

    handler: async(ctx, args) => {
        const result = await ctx.db.patch(args._id, {whiteboard: args.whiteboard});
        return result;
    }
});


export const getFileById = query({
    args: {
        _id: v.id('files')
    },

    handler: async(ctx, args) => {
        const result = await ctx.db.get(args._id);
        return result;
    }
});


export const deleteFileById = mutation({
    args: {
        _id: v.id('files')
    },

    handler: async(ctx, args) => {
        const result = await ctx.db.delete(args._id);
        return result;
    }
});


export const deleteAllFilesByTeamId = mutation({
    args: {
        _id: v.id('teams') // Team ID
    },

    handler: async(ctx, args) => {
        // Fetch all files with the given teamId
        const files = await ctx.db.query('files')
            .filter((q) => q.eq(q.field('teamId'), args._id))
            .collect();

        // Delete each file one by one
        for (const file of files) {
            await ctx.db.delete(file._id);
        }

        return { success: true, message: `Deleted ${files.length} files` };
    }
});