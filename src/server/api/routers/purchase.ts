import { z } from 'zod';
import { createTRPCRouter, publicProcedure, protectedProcedure } from 'Finnaz/server/api/trpc';

export const purchaseRouter = createTRPCRouter({
	getPurchaseByID: protectedProcedure.input(z.object({ id: z.string() })).query(({ ctx, input }) => {
		return ctx.prisma.purchase.findUnique({ where: { id: input.id } });
	}),
	getPurchaseByDate: protectedProcedure.input(z.object({ date: z.date() })).query(({ ctx, input }) => {
		return ctx.prisma.purchase.findMany({ where: { date: input.date } });
	}),
	getPurchaseByMonth: protectedProcedure.input(z.object({ month: z.string() })).query(({ ctx, input }) => {
		return ctx.prisma.purchase.findMany({ where: { month: input.month } });
	}),
	// getPurchaseByWeek: protectedProcedure.input(z.object({ from: z.date(), to: z.date() })).query(({ ctx, input }) => {
	// 	return ctx.prisma.purchase.findMany({ where: { date: { gte: input.from, lte: input.to } } });
	// }),
	getPurchaseByYear: protectedProcedure.input(z.object({ year: z.string() })).query(({ ctx, input }) => {
		return ctx.prisma.purchase.findMany({ where: { year: input.year } });
	}),
	getPurchaseByUser: protectedProcedure.input(z.object({ userId: z.string() })).query(({ ctx, input }) => {
		return ctx.prisma.purchase.findMany({ where: { userId: input.userId } });
	}),
	addPurchase: protectedProcedure
		.input(
			z.object({
				userId: z.string(),
				date: z.date(),
				day: z.string(),
				month: z.string(),
				year: z.string(),
				amount: z.number(),
				subcripcion: z.boolean(),
				descripcion: z.string()
			})
		)
		.mutation(({ ctx, input }) => {
			return ctx.prisma.purchase.create({
				data: {
					userId: input.userId,
					date: input.date,
					month: input.month,
					year: input.year,
					amount: input.amount,
					day: input.day,
					subcripcion: input.subcripcion,
					descripcion: input.descripcion
				}
			});
		}),
	updatePurchase: protectedProcedure
		.input(z.object({ id: z.string(), amount: z.number() }))
		.mutation(({ ctx, input }) => {
			return ctx.prisma.purchase.update({ where: { id: input.id }, data: { amount: input.amount } });
		}),
	deletePurchase: protectedProcedure.input(z.object({ id: z.string() })).mutation(({ ctx, input }) => {
		return ctx.prisma.purchase.delete({ where: { id: input.id } });
	})
});
