const Aside = () => {
	return (
		<aside className="hidden xl:flex xl:h-full xl:w-1/2 xl:items-center xl:justify-center ">
			<div className="h-[87%] w-4/5">
				<div className="h-3/5 overflow-auto text-[32px] font-semibold">
					Get in control of your spending with Finnas - the easy-to-use spending tracker that helps you stay
					on top of your finances.
				</div>
				<div className="flex h-2/5 flex-wrap items-end">
					<div className="w-full rounded-xl bg-table p-4">
						<div className="overflow-auto text-[11px] text-xs font-thin">
							I`&apos;`ve been using Finnas for a few weeks now and it`&apos;`s been a game-changer for
							me. It`&apos;`s so easy to track my spending and see where my money is going each week,
							month, and year.
						</div>
						<div className="mt-4 flex">
							<div className="aspect-square rounded-md bg-gray-500 p-2">Icon</div>
							<div className="ml-2">
								<div className="text-sm font-bold">John Smith</div>
								<div className="text-xs">Accountant</div>
							</div>
						</div>
					</div>
					<div className="flex w-full items-end justify-center">
						<div className="mx-1 h-[10px] w-[10px] rounded-full bg-[#D9D9D9]"></div>
						<div className="mx-1 h-[10px] w-[10px] rounded-full bg-[#D9D9D999]"></div>
					</div>
				</div>
			</div>
		</aside>
	);
};
export default Aside;
