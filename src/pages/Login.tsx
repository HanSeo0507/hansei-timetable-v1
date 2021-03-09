import React, { useState } from "react";
import styled from "styled-components";

import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import Select, { ValueType } from "react-select";

import { Container, Button } from "src/components";
import Logo from "src/assets/hansei.png";

interface ISelectOption {
	value: string;
	label: string;
}

const Login: React.FC = () => {
	// eslint-disable-next-line
	const [cookies, setCookie] = useCookies(["userInfo"]);

	const [error, setError] = useState("");
	const [userInfo, setUserInfo] = useState({ major: "H", _class: "H12", number: 0, name: "" });

	const majorOptions: ISelectOption[] = [
		{ value: "H", label: "해킹방어과정" },
		{ value: "G", label: "게임과" },
	];
	const HClassOptions: ISelectOption[] = [
		{ value: "H11", label: "1반" },
		{ value: "H12", label: "2반" },
		{ value: "H13", label: "3반" },
	];
	const GClassOptions: ISelectOption[] = [{ value: "G11", label: "1반" }];

	const onMajorChange = (option: ValueType<ISelectOption, false>) => {
		if (option) setUserInfo({ ...userInfo, major: option.value });
	};
	const onClassChange = (option: ValueType<ISelectOption, false>) => {
		if (option) setUserInfo({ ...userInfo, _class: option.value });
	};
	const onNumberChange = (event: React.FormEvent<HTMLInputElement>) => {
		const number = event.currentTarget.value;
		if (number) setUserInfo({ ...userInfo, number: Number(number) });
	};
	const onNameChange = (event: React.FormEvent<HTMLInputElement>) => {
		const name = event.currentTarget.value;
		if (name) setUserInfo({ ...userInfo, name });
	};

	const onSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		const errorValue = [];
		const errorType = [];
		const { major, _class, number, name } = userInfo;

		if (major && _class && number && name) {
			setCookie("userInfo", JSON.stringify({ _class, number, name }));
			window.location.href = "/";
		} else {
			if (!major) errorValue.push("학과");
			if (!_class) errorValue.push("반");
			if (!number) errorValue.push("번호");
			if (!name) errorValue.push("이름");

			if (!major || !_class) errorType.push("선택");
			if (!number || !name) errorType.push("입력");

			let errorText: string = "";

			errorValue.forEach((v, i, a) => {
				if (i === a.length - 1) {
					errorText = errorText + v + "을(를) ";
				} else {
					errorText = errorText + v + ", ";
				}
			});

			errorType.forEach((v, i, a) => {
				if (i === a.length - 1) {
					errorText = errorText + v;
				} else {
					errorText = errorText + v + "/";
				}
			});

			setError(`${errorText}해주세요`);
		}
	};

	return (
		<div className="container h-100">
			<div className="row h-100 align-items-center">
				<Container>
					<LoginTitleWrapper>
						<div className="row mx-auto">
							<div className="col-12 col-sm-4">
								<LoginTitleLogo src={Logo} />
							</div>
							<div className="col-12 col-sm-8 my-auto">
								<LoginTitleText>
									한세사이버보안고등학교
									<br /> 1학년 2반 줌 수업 시간표
								</LoginTitleText>
							</div>
						</div>
					</LoginTitleWrapper>
					<LoginContentWrapper className="row mx-auto" onSubmit={onSubmit}>
						<div className="col-12 col-sm-6">
							<Select options={majorOptions} placeholder="학과를 선택해주세요" onChange={onMajorChange} value={{ value: "H", label: "해킹방어과정" }} isDisabled />
						</div>
						<div className="col-12 col-sm-6">
							<Select options={(userInfo.major === "H" ? HClassOptions : GClassOptions) || []} placeholder="반을 선택해주세요" onChange={onClassChange} value={{ value: "H12", label: "2반" }} isDisabled />
						</div>
						<div className="col-12 col-sm-6">
							<LoginContentInput type="number" placeholder="번호를 입력해주세요" onChange={onNumberChange} />
						</div>
						<div className="col-12 col-sm-6">
							<LoginContentInput placeholder="이름을 입력해주세요" onChange={onNameChange} />
						</div>
						{error && (
							<div className="col-12 text-center mt-3">
								<LoginContentError>{error}</LoginContentError>
							</div>
						)}
						<div className="col-12">
							<Button type="submit" className="w-100">
								로그인
							</Button>
						</div>
					</LoginContentWrapper>
				</Container>
			</div>
		</div>
	);
};

export default Login;

const LoginTitleWrapper = styled.div`
	display: flex;
	margin-bottom: 1.5rem;
`;

const LoginTitleLogo = styled.img`
	display: block;

	width: 9rem;
	height: auto;

	margin: 0 auto;
`;

const LoginTitleText = styled.h1`
	text-align: center;
	font-size: 20px;
	font-weight: 900;

	margin: auto 0 auto 1rem;
`;

const LoginContentWrapper = styled.form`
	& > div {
		margin-bottom: 0.4rem;
	}

	& > div:last-child {
		margin: 1rem 0 0 0;
	}
`;

const LoginContentInput = styled.input`
	width: 100%;
	border: 1px solid rgba(0, 0, 0, 0.2);
	border-radius: 0.3rem;
	padding: 0.4rem 0.7rem;
`;

const LoginContentError = styled.span`
	color: red;
	font-weight: 700;
`;
