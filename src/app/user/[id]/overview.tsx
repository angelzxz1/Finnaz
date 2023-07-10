import { RootState } from 'Finnaz/utils/store';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { CgSpinner } from 'react-icons/cg'
import { z } from 'zod';
const monthNames = z.enum([
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
]);
const days = z.enum(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);

//This function will format any number into a currency format
function formatCurrency(num: number): string {
	return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function getDayOfWeek(day: number): string {
	switch (day) {
		case 0:
			return 'Sunday';
		case 1:
			return 'Monday';
		case 2:
			return 'Tuesday';
		case 3:
			return 'Wednesday';
		case 4:
			return 'Thursday';
		case 5:
			return 'Friday';
		case 6:
			return 'Saturday';
		default:
			return 'Sunday';
	}
}
function getMonthName(month: number): string {
	switch (month) {
		case 0:
			return 'January';
		case 1:
			return 'February';
		case 2:
			return 'March';
		case 3:
			return 'April';
		case 4:
			return 'May';
		case 5:
			return 'June';
		case 6:
			return 'July';
		case 7:
			return 'August';
		case 8:
			return 'September';
		case 9:
			return 'October';
		case 10:
			return 'November';
		case 11:
			return 'December';
		default:
			return 'January';
	}
}

const Loader = () => {
	return <div className="h-10">{/* <CgSpinner className="text-white animate-spin" /> */}</div>;
};

const Overview = () => {
	const { monthlyLimit, monthlySpent } = useSelector((state: RootState) => state.user);
	const { purchases } = useSelector((state: RootState) => state.purchases);
	interface dateObj {
		Date: number;
		Day: string;
		Month: string;
		Year: number;
	}
	const [date, setDate] = useState<dateObj>();
	const [isEditable, setIsEditable] = useState<boolean>(false);

	useEffect(() => {
		const d = new Date();
		const [Year, Month, Day, date] = [d.getFullYear(), d.getMonth(), d.getUTCDay(), d.getDate()];
		setDate({ Date: date, Day: getDayOfWeek(Day), Month: getMonthName(Month), Year });
	}, []);

	return (
		<section className="flex w-full justify-center border-b border-table py-8">
			<div className="flex w-8/12">
				<div className="flex w-1/2 flex-col justify-center">
					<h2 className="text-4xl font-semibold">Angel Zuniga</h2>
					<div className="mt-4 flex flex-col justify-start">
						<h3 className="text-2xl font-semibold">{date ? `${date.Day} ` : ''}</h3>
						<div>{date ? ` ${date.Month} ${date.Date}, ${date.Year} ` : <Loader />}</div>
					</div>
				</div>
				<div className="flex w-1/2 flex-col items-end justify-center">
					<div className="text- text-[#ffffff55]">Spent / Total</div>
					<div className="flex items-center text-2xl">
						<div className="text-2xl text-whitegreen">${formatCurrency(monthlySpent)}</div>
						<div className="mx-2 text-lg">/</div>
						{isEditable ? (
							<></>
						) : (
							<div className="text-2xl text-whitepurple">${formatCurrency(monthlyLimit)}</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};
export default Overview;
