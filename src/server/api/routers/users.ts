import { z } from 'zod';
import { createTRPCRouter, publicProcedure, protectedProcedure } from 'Finnaz/server/api/trpc';

export const usersRouter = createTRPCRouter({
	getUser: protectedProcedure.input(z.object({ id: z.string() })).query(({ ctx, input }) => {
		return ctx.prisma.user.findUnique({ where: { id: input.id } });
	})
});
