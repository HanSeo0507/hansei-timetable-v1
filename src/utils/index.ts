const validatorUser = (user: any) => {
	const _class = ["G11", "H11", "H12", "H13"];
	const isCorrectClass = _class.find((_class) => _class === user._class);

	if (isCorrectClass && user.number && user.name) return true;

	return false;
};

export { validatorUser };
