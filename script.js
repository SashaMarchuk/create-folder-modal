// DO NOT MODIFY THIS PART OF THE CODE

const colors = [
	null,
	"#604ECF",
	"#2574CE",
	"#1F96BA",
	"#4D8B6F",
	"#CC7C29",
	"#67434E",
	"#606383",
	"#E5E4F9",
	"#D5E9F7",
	"#D4EFF2",
	"#DFEDDF",
	"#F9EBD7",
	"#E2DDDB",
	"#E0E4E9",
];

const members = [
	{ name: "Ahmed", group: "Dev" },
	{ name: "Aleks", group: "QA" },
	{ name: "Algimantas", group: "Marketing" },
	{ name: "Cuong", group: "Dev" },
	{ name: "Edvinas", group: "Marketing" },
	{ name: "Erik", group: "Dev" },
	{ name: "George", group: "Dev" },
	{ name: "Hans", group: "QA" },
	{ name: "Jarune", group: "Marketing" },
	{ name: "Johan", group: "QA" },
	{ name: "Liza", group: "Dev" },
	{ name: "Kirsti", group: "Marketing" },
	{ name: "Yaroslav", group: "QA" },
];

//Helper functions
function getGroupUniqueList(membersInitList = members) {
	return membersInitList.reduce((result, {group}) => [...result, ...!result.includes(group) ? [group] : []], []);
}

function getRelevantMembersList(membersInitList = members, group){
	const cond = member.group === group || group == 'on';
	return membersInitList.reduce((result, {group, name}) => [...result, ...cond ? [name] : []], []);
}

function fillContainer({params, callbackFunc, selectorName = 'querySelector', selectorValue, param}) {
	for (let item of params)
		document[selectorName](selectorValue).appendChild(callbackFunc(item, param));

}

// Colors
function createColorDiv(color) {
	const customColor = color || 'transparent';

	const wrapper = document.createElement('div');
	wrapper.className = 'colorWrapper';

	const inputElem = document.createElement("input");
	inputElem.className = "folderColorInput";
	inputElem.type = 'radio';
	inputElem.name = 'colors';
	inputElem.id = customColor;
	inputElem.value = customColor;
	inputElem.required = true;
	inputElem.style.backgroundColor = customColor;

	wrapper.appendChild(inputElem);

	return wrapper;
}

fillContainer({params: colors, callbackFunc: createColorDiv, selectorValue: '#colors'}); // Color container


// Groups
function createGroupDiv(groupName) {
	const div = document.createElement("div");

	const input = document.createElement("input");
	input.id = groupName;
	input.value = groupName;
	input.name = "group";
	input.type = "radio";
	div.appendChild(input);

	const label = document.createElement("label");
	label.htmlFor = groupName;
	label.innerHTML = groupName;

	div.appendChild(label);

	return div;
}

fillContainer({params: getGroupUniqueList(), callbackFunc: createGroupDiv, selectorValue: '#groups'}) // Group container

document.querySelector("#groups").addEventListener("change", function (event) {
	const selectorValue = '#members';

	document.querySelector(selectorValue).innerHTML = "";
	const { value: memberType } = event.target;

	fillContainer({params: members, callbackFunc: createMemberDiv, selectorValue, param: memberType}) // Member container
});


// Members
function createMemberDiv(member, memberType = 'on') {
	const div = document.createElement("div");
	const input = document.createElement("input");
	input.id = member.name;
	input.type = "checkbox";
	input.disabled = true;
	input.checked = memberType === 'on' || member.group === memberType;
	div.appendChild(input);

	let label = document.createElement("label");
	label.htmlFor = member.name;
	label.innerHTML = member.name;

	div.appendChild(label);

	return div;
}

fillContainer({params: members, callbackFunc: createMemberDiv, selectorValue: '#members'}) // Member container


// Create, SUBMIT
document.querySelector("form").addEventListener("submit", function (event) {

	const { colors: color, group, folder } = Object.fromEntries(new FormData(event.target));

	const memberNames = getRelevantMembersList(members, group);
	const strMemberNames = memberNames.join(', ');
	const strOutput = `You have created folder ${folder} with color ${color} and the following members\n ${strMemberNames}`;
	console.log(strOutput);
	alert(strOutput);
});

// Close
document.getElementById("close").addEventListener("click", function () {
	alert('Folder creation cancelled');
});