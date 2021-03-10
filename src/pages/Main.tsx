import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { isMobile } from "react-device-detect";
import { AuthContext } from "src/Auth";
import { formatTime, getDay, getLeftTime, getNextSubject, getNowSubject } from "src/utils";
import { Button, Container } from "src/components";

import Logo from "src/assets/hansei.png";

const Main: React.FC = () => {
	const [now, setNow] = useState(new Date());
	const [today, setToday] = useState(0);
	const [classOf, setClassOf] = useState("");

	const [nowClass, setNowClass] = useState(0);
	const [nextClass, setNextClass] = useState<{ index: number; class: string; type: string } | undefined>();

	const { _class, number, name } = useContext(AuthContext);

	const timetable = [
		["수학", "사회", "국사", "진로", "과학", "정처", "정처"],
		["파이썬", "파이썬", "국어", "영어", "자율", "자율"],
		["수학", "국어", "국사", "사회", "영어", "파이썬", "파이썬"],
		["사회", "디자인", "디자인", "과학", "국사", "음악", "국어"],
		["디자인", "정처", "정처", "영어", "과학", "체육", "수학"],
	];

	const classTime = [
		{ start: new Date().setHours(8, 40, 0), finish: new Date().setHours(9, 20, 0) },
		{ start: new Date().setHours(9, 30, 0), finish: new Date().setHours(10, 10, 0) },
		{ start: new Date().setHours(10, 20, 0), finish: new Date().setHours(11, 0, 0) },
		{ start: new Date().setHours(11, 10, 0), finish: new Date().setHours(11, 50, 0) },
		{ start: new Date().setHours(12, 0, 0), finish: new Date().setHours(12, 40, 0) },
		{ start: new Date().setHours(12, 50, 0), finish: new Date().setHours(13, 30, 0) },
		{ start: new Date().setHours(13, 40, 0), finish: new Date().setHours(14, 20, 0) },
		{ start: new Date().setHours(14, 30, 0), finish: new Date().setHours(15, 10, 0) },
	];

	const restTime = [
		{ start: new Date().setHours(0, 0, 0), finish: new Date().setHours(8, 40, 0), next: 0 },
		{ start: new Date().setHours(9, 20, 0), finish: new Date().setHours(9, 30, 0), next: 1 },
		{ start: new Date().setHours(10, 10, 0), finish: new Date().setHours(10, 20, 0), next: 2 },
		{ start: new Date().setHours(11, 0, 0), finish: new Date().setHours(11, 10, 0), next: 3 },
		{ start: new Date().setHours(11, 5, 0), finish: new Date().setHours(12, 50, 0), next: 4, type: "lunch" },
		{ start: new Date().setHours(13, 30, 0), finish: new Date().setHours(13, 40, 0), next: 5 },
		{ start: new Date().setHours(14, 20, 0), finish: new Date().setHours(14, 30, 0), next: 6 },
	];

	const time = ["1교시", "2교시", "3교시", "4교시", "5교시", "6교시", "7교시"];
	const timeM = ["1", "2", "3", "4", "5", "6", "7"];

	const day = ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일"];
	const dayM = ["월", "화", "수", "목", "금", "토", "일"];

	interface IZoomID {
		[index: string]: string;
	}

	const zoomIds: IZoomID = {
		국어: "531 696 3430",
		영어: "974 976 2480",
		사회: "458 265 2826",
		국사: "418 692 2475",
		수학: "260 836 1619",
		과학: "314 911 3899",
		정처: "279 718 8506",
		파이썬: "997 912 0043",
		진로: "341 183 8871",
		음악: "373 769 7752",
		디자인: "351 971 4354",
		체육: "517 857 7141",
	};

	const ZoomLink = (subject: string) => {
		return `${isMobile ? "zoomus://" : "zoommtg://"}zoom.us/join?confno=${zoomIds[subject].replace(/ /g, "")}&uname=${classOf}`;
	};

	const initialize = () => {
		setNow(new Date());
		setToday(getDay(new Date().getDay()));

		setNowClass(getNowSubject(new Date(), classTime));
		setNextClass(getNextSubject(new Date(), restTime, timetable[today]));
	};

	useEffect(() => {
		setToday(getDay(new Date().getDay()));
		setClassOf(`${_class?.replace("G", "게").replace("H", "해")}${number} ${name}`);
		setNowClass(getNowSubject(new Date(), classTime));
		setNextClass(getNextSubject(new Date(), restTime, timetable[today]));
		setInterval(() => {
			initialize();
		}, 1000);
		// eslint-disable-next-line
	}, []);

	return (
		<div className="container h-100">
			<div className="row h-100 align-items-center">
				<div className="col-10 mx-auto">
					<Container className="mb-4 text-center">
						<MainLogo src={Logo} />
						<DescTimeWrapper className="py-3 mb-2">
							<DescTimeNow>{formatTime(now)}</DescTimeNow>
						</DescTimeWrapper>
						<div className="row">
							{nowClass < 0 ? (
								<>
									<div className={nextClass ? "col-12 col-md-6 py-4" : "col-12 pt-0 pb-3"}>
										<div>
											{nextClass ? (
												<>
													<DescText className="mb-2">
														지금은 <DescBold>{nextClass.index === 0 ? "수업 시작 전" : `${time[nextClass.index - 1]} ${nextClass.type}`}</DescBold>입니다
													</DescText>
													<DescText className="mb-2">
														다음 시간은{" "}
														<DescBold>
															{time[nextClass.index]} {nextClass.class}
														</DescBold>
														입니다
													</DescText>

													<DescText isClassOf className="mt-3">
														학번: <DescBold>{classOf}</DescBold>
													</DescText>
													<a href={ZoomLink(timetable[today][nextClass.index])}>
														<DescButton className="mt-1">수업 참가하기 ({zoomIds[timetable[today][nextClass.index]]})</DescButton>
													</a>
												</>
											) : (
												<DescText className="mx-auto">오늘 수업이 모두 종료되었습니다.</DescText>
											)}
										</div>
									</div>
									{nextClass && (
										<div className="col-12 col-md-6 py-4">
											<div className="my-auto">
												<DescText>수업시간까지 남은 시간</DescText>
												<DescText>
													<DescBold>{getLeftTime(classTime[nextClass.index].finish, now.getTime())}</DescBold>
												</DescText>
											</div>
										</div>
									)}
								</>
							) : (
								<>
									<div className="col-12 col-md-6 py-4">
										<div>
											<DescText>
												지금은{" "}
												<DescBold>
													{time[nowClass]} {timetable[today][nowClass]}
												</DescBold>{" "}
												수업입니다
											</DescText>
											<DescText isClassOf className="mt-3">
												학번: <DescBold>{classOf}</DescBold>
											</DescText>

											<a href={ZoomLink(timetable[today][nowClass])}>
												<DescButton className="mt-1">수업 참가하기 ({zoomIds[timetable[today][nowClass]]})</DescButton>
											</a>
										</div>
									</div>
									<div className="col-12 col-md-6 py-4">
										<DescText>쉬는 시간까지 남은 시간</DescText>
										<DescText>
											<DescBold>{getLeftTime(classTime[nowClass].finish, now.getTime())}</DescBold>
										</DescText>
									</div>
								</>
							)}
						</div>
					</Container>
					<Container>
						<Table>
							<thead>
								<tr>
									<Th>#</Th>
									{day.map((v, i) => {
										return (
											i < 5 && (
												<Th key={i} style={{ background: today === i ? "rgba(204, 218, 39, 0.6)" : "" }}>
													<span className="d-sm-block d-md-none">{dayM[i]}</span>
													<span className="d-none d-md-block">{v}</span>
												</Th>
											)
										);
									})}
								</tr>
							</thead>
							<tbody>
								{time.map((v, i) => {
									return (
										<tr key={i}>
											<Td>
												<span className="d-sm-block d-md-none">{timeM[i]}</span>
												<span className="d-none d-md-block">{v}</span>
											</Td>
											{timetable.map((v, k) => {
												return (
													<Td key={k} style={{ background: today === k ? (nowClass === i ? "rgba(204, 218, 39, 1)" : "rgba(204, 218, 39, 0.6)") : "", fontWeight: today === k ? (nowClass === i ? 900 : 500) : 500 }}>
														<span className="d-sm-block d-md-none">{v[i] === "파이썬" || v[i] === "디자인" ? v[i].slice(0, 2) : v[i]}</span>
														<span className="d-none d-md-block">{v[i]}</span>
													</Td>
												);
											})}
										</tr>
									);
								})}
							</tbody>
						</Table>
					</Container>
				</div>
			</div>
		</div>
	);
};

export default Main;

const DescText = styled.p<{ isClassOf?: boolean }>`
	font-weight: 500;
	font-size: ${(props) => (props.isClassOf ? "16px" : "20px")};
`;

const DescTimeWrapper = styled.div``;

const DescTimeNow = styled.span`
	font-weight: 500;
	font-size: 30px;
	letter-spacing: -2px;
`;

const DescBold = styled.strong`
	font-weight: 700;
`;

const DescButton = styled(Button)`
	background-color: #0e71eb;
`;

const Table = styled.table`
	text-align: center;
	border-spacing: 0;
	border-collapse: collapse;
	border-style: hidden;
	width: 100%;

	border-radius: 1rem;

	& > thead {
		border-radius: 1rem;
		border: 2px solid #888888;
	}
`;
const Th = styled.th`
	border: 2px solid #888888;
	padding: 1rem;
`;
const Td = styled.td`
	border: 2px solid #888888;
	padding: 1rem;
`;

const MainLogo = styled.img`
	display: block;

	width: 9rem;
	height: auto;

	margin: 0 auto;
`;
