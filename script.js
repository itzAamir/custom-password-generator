const generateBtn = document.querySelector("#generate_btn");
const outputBox = document.querySelector("#password-output");
const copyBtn = document.querySelector("#copy-btn");

const CAPITAL_LETTERS = {
	name: "CAPITAL_LETTERS",
	value: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
};
const LOWER_LETTERS = {
	name: "LOWER_LETTERS",
	value: CAPITAL_LETTERS.value.toLowerCase(),
};
const NUMBERS = { name: "NUMBERS", value: "0123456789" };
const SPECIAL_CHARS = {
	name: "SPECIAL_CHARS",
	value: " !#$%&'()*+,-./:;<=>?@[]^_{|}~",
};
const ALL_CHARS = [CAPITAL_LETTERS, NUMBERS, SPECIAL_CHARS, LOWER_LETTERS];

generateBtn.addEventListener("click", preGenerate);
copyBtn.addEventListener("click", handleCopy);

function preGenerate() {
	const checkboxes = document.querySelectorAll("input[type='checkbox']");
	const options = Array.from(checkboxes).map((box) => {
		return { id: box.id, value: box.checked, name: box.name };
	});
	let included_types = [];

	options.forEach((charType, idx) => {
		if (charType.value === true) {
			included_types.push({ ...charType, characters: ALL_CHARS[idx].value });
		}
	});
	included_types.push({
		...LOWER_LETTERS,
		characters: LOWER_LETTERS.value,
		value: true,
	});

	handleGenerate(included_types);
}

function handleGenerate(includedTypes) {
	const passSize = document.querySelector("#pass_size").value;

	let password = [];

	for (let i = 0; i < parseInt(passSize); i++) {
		const randomCharType =
			includedTypes[Math.floor(Math.random() * includedTypes.length)];

		password.push(
			randomCharType.characters[
				Math.floor(Math.random() * randomCharType.characters.length)
			]
		);
	}
	// debugger;
	outputBox.value = password.join("");
}

function handleCopy(e) {
	e.target.innerText = "Copied";
	setTimeout(() => {
		e.target.innerText = "Copy";
	}, 700);
	navigator.clipboard.writeText(outputBox.value);
}
