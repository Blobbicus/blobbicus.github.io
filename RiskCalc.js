// Number of risk calculations
numOfRisks = 3;
riskValue = new Array(numOfRisks).fill(0);
// ID for result boxes
riskID = ["resultBox_Full", "resultBox_NonInv", "resultBox_SPAHR"];
// Array of all tests
let tests = [];
// Create tests with buttons and add to array of tests
/*
const PH_NAME = {name:"PH_NAME", weight:[0,0,0], value:[1,2,3], title:"", btnText:["BTN1","BTN2","BTN3"]};
tests.push(PH_NAME);
*/
//RV Failure
const RV_Fail = {name:"RV_Fail", weight:[1,0,0], value:[1,3], title:"", btnText:["Nej","Ja"]};
tests.push(RV_Fail);
// Progression of Symptoms
const Sympt_Prog = {name:"Sympt_Prog", weight:[1,0,0], value:[1,2,3], title:"", btnText:["Nej","Långsam","Snabb"]};
tests.push(Sympt_Prog);
// Syncope
const Syncope = {name:"Syncope", weight:[1,0,0], value:[1,2,3], title:"", btnText:["Nej","Enstaka","Upprepade"]};
tests.push(Syncope);
// WHO-FC
const WHO_FC = {name:"WHO_FC", weight:[1,1,1], value:[1,2,3], title:"", btnText:["I, II","III","IV"]};
tests.push(WHO_FC);
// 6MWT
const MWT = {name:"MWT", weight:[1,1,1], value:[1,2,3], title:"", btnText:["> 440","165 - 440","< 165"]};
tests.push(MWT);
// Peak VO_2
const Peak_VO2 = {name:"Peak_VO2", weight:[1,0,0], value:[1,2,3], title:"", btnText:["> 15","11 - 15","< 11"]};
tests.push(Peak_VO2);
//
const Predicted_VO2 = {name:"Predicted_VO2", weight:[1,0,0], value:[1,2,3], title:"", btnText:["> 65","35 - 65","< 35"]};
tests.push(Predicted_VO2);
// VE / VO_2 slope
const VE_slope = {name:"VE_slope", weight:[1,0,0], value:[1,2,3], title:"", btnText:["< 36","36 - 44.9","&GreaterEqual; 45"]};
tests.push(VE_slope);
//
const proBNP = {name:"proBNP", weight:[1,1,1], value:[1,2,3], title:"", btnText:["< 300","300-1400","> 1400"]};
tests.push(proBNP);
//
const BNP = {name:"BNP", weight:[1,1,0], value:[1,2,3], title:"", btnText:["< 50","50 - 300","> 300"]};
tests.push(BNP);
//
const RAarea = {name:"RAarea", weight:[1,0,1], value:[1,2,3], title:"", btnText:["< 18","18 - 26","> 26"]};
tests.push(RAarea);
//
const Pericardial_Effusion = {name:"Pericardial_Effusion", weight:[1,0,1], value:[1,2,3], title:"", btnText:["Nej","Lindrigt","Måttligt/Uttalat"]};
tests.push(Pericardial_Effusion);
//
const MRAP = {name:"MRAP", weight:[1,0,1], value:[1,2,3], title:"", btnText:["< 8","8 - 14","> 14"]};
tests.push(MRAP);
//
const CI = {name:"CI", weight:[1,0,1], value:[1,2,3], title:"", btnText:["&GreaterEqual; 2.5","2.0 - 2.4","< 2.0"]};
tests.push(CI);
//
const SvO2 = {name:"SvO2", weight:[1,0,1], value:[1,2,3], title:"", btnText:["> 65","60 - 65","< 60"]};
tests.push(SvO2);


// Number of tests in array
numOfTests = tests.length;

// Create array with test values
let testValue = new Array(numOfTests).fill(0);

// Update all risks
function updateRisk() {

	let sum = new Array(numOfRisks).fill(0);
	let w = new Array(numOfRisks).fill(0);
	// Add up the sum and weights of all tests for each risk
	for (let i = 0; i < numOfRisks; i++) {
		for (let j = 0; j < numOfTests; j++) {
			sum[i] += tests[j].weight[i]*testValue[j];
			w[i] += (testValue[j]!=0)*tests[j].weight[i];
			//if (testValue[j] != 0) {
			//	w[i] += tests[j].weight[i];
			//}
		}
	}
	// Calculate the average of all tests
	for (let i = 0; i < numOfRisks; i++) {
		riskValue[i] = 0;
		if (w[i] !== 0) {
			riskValue[i] = sum[i]/w[i];
		}
	} 

	for (let i=0; i<numOfRisks; i++) {
		if (riskValue[i]) {
			document.getElementById(riskID[i]).innerHTML = riskValue[i].toFixed(2);
		} else {
			document.getElementById(riskID[i]).innerHTML = "-";
		}
		switch (Math.round(riskValue[i])) {
		case 1:
			document.getElementById(riskID[i]).style.backgroundColor = "lightgreen";			
		break
		case 2:
			document.getElementById(riskID[i]).style.backgroundColor = "yellow";			
		break
		case 3:
			document.getElementById(riskID[i]).style.backgroundColor = "red";			
		break
		default:
			document.getElementById(riskID[i]).style.backgroundColor = "lightgrey";
		}
		
	}
	//console.log(`Risk updated, full risk = ${riskValue[0]}`);
}

function inputButton(name, val) {
	//updateButton(id, testNum, btnNum);
	for (let i=0; i < numOfTests; i++) {
		if (name === tests[i].name) {
			if (testValue[i] == val) {
				var radio = document.querySelector(`input[type=radio][name=${name}]:checked`);
				radio.checked = false;
				testValue[i] = 0;
				//console.log(`Updated test ${name} value to ${testValue[i]}!`)
			} else {
				testValue[i] = val;
				//console.log(`Updated test ${name} value to ${testValue[i]}!`)
			}
			
			
		}
	}
	updateRisk();
}

function inputField() {

}

function collapseContent(btn) {
	btn.classList.toggle("collapsible_open");
	var content = btn.nextElementSibling;
	/*
	if (content.style.display === "none") {
		content.style.display = "block";

	} else {
		content.style.display = "none";
	}
	*/
	//console.log(content.style.maxHeight);
	if (content.style.maxHeight) {
		content.style.maxHeight = null;
		//console.log("Closed collapsible!");
	} else {
		content.style.maxHeight = content.scrollHeight + "px";
		//console.log(`Opened collapsible! ${content.scrollHeight}`);
	}
}

function resetCalc() {
	
	for(let i = 0; i < numOfTests; i++) {
		var name = tests[i].name;
		var radio;
		if( radio = document.querySelector(`input[type=radio][name=${name}]:checked`) ) {
			radio.checked = false;
		}
		testValue[i] = 0;
	}
	updateRisk();
}