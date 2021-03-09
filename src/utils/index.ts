const validatorUser = (user: any) => {
	const _class = ["G11", "H11", "H12", "H13"];
	const isCorrectClass = _class.find((_class) => _class === user._class);

	if (isCorrectClass && user.number && user.name) return true;

	return false;
};

const getDay = (day: number) => {
	if (day === 0) return 6;
	return day - 1;
};

type IClassTime = {
	start: number;
	finish: number;
};

type INextClassTime = {
	start: number;
	finish: number;
	next: number;
	type?: string;
};

const getNowSubject = (date: Date, classTime: IClassTime[]) => {
	const nowClass = classTime.find((v, i) => new Date(v.start).getTime() <= date.getTime() && date.getTime() <= new Date(v.finish).getTime());

	if (nowClass) {
		let index = classTime.indexOf(nowClass);
		return index;
	}

	return -1;
};

const getNextSubject = (date: Date, classTime: INextClassTime[], timetable: string[]): { index: number; class: string; type: string } | undefined => {
	const nextClass = classTime.find((v, i) => new Date(v.start).getTime() <= date.getTime() && date.getTime() <= new Date(v.finish).getTime());

	if (nextClass) {
		return { index: nextClass.next, class: timetable[nextClass.next], type: nextClass.type === "launch" ? "점심시간" : "쉬는시간" };
	}

	return undefined;
};

const getLeftTime = (fisrtDate: number, secondDate: number): string => {
	const leftTime = fisrtDate - secondDate;

	const hours = Math.floor((leftTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	const miniutes = Math.floor((leftTime % (1000 * 60 * 60)) / (1000 * 60));

	const message = hours ? `${hours}시간 ${miniutes}분` : `${miniutes}분`;

	return message;
};

const formatTime = (now: Date) => {
	const month = now.getMonth() + 1;
	const date = now.getDate();
	const hour = now.getHours();
	const min = now.getMinutes();
	const sec = now.getSeconds();

	const isAM = hour < 12;

	return `${month}월 ${date}일 ${isAM ? "오전" : "오후"} ${hour}시 ${fillZero(min)}분 ${sec}초`;
};

const fillZero = (number: number) => {
	if (number < 10) return `0${number.toString()}`;

	return number;
};

export { validatorUser, getDay, getNowSubject, getNextSubject, getLeftTime, formatTime };
