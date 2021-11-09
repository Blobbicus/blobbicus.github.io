// Number of risk calculations
var numOfRisks = 3;
let riskValue = new Array(numOfRisks).fill(0);
// ID for result boxes
var riskID = ["result_Full", "result_Compera", "result_SPAHR"];
// Array of all parameters
let params = [];
// Create params with buttons and add to array of params
/*
const PH_NAME = {name:"PH_NAME", weight:[0,0,0], value:[1,2,3], title:"", btnText:["BTN1","BTN2","BTN3"]};
params.push(PH_NAME);
*/
//RV Failure
const RV_Fail = {name:"RV_Fail", group:"Sympt", weight:[1,0,0], value:[1,0,3], title:"Clinical signs of right heart failure", btnText:["Absent","-","Present"]};
params.push(RV_Fail);
// Progression of Symptoms
const Sympt_Prog = {name:"Sympt_Prog", group:"Sympt", weight:[1,0,0], value:[1,2,3], title:"Progression of symptoms", btnText:["No","Slow","Rapid"]};
params.push(Sympt_Prog);
// Syncope
const Syncope = {name:"Syncope", group:"Sympt", weight:[1,0,0], value:[1,2,3], title:"Syncope", btnText:["No","Occasionally","Repeated syncope"]};
params.push(Syncope);
// WHO-FC
const WHO_FC = {name:"WHO_FC", group:"WHO_walk", weight:[1,1,1], value:[1,2,3], title:"WHO functional class <sup>¤</sup>", btnText:["I, II","III","IV"]};
params.push(WHO_FC);
// 6MWT
const MWT = {name:"MWT", group:"WHO_walk", weight:[1,1,1], value:[1,2,3], title:"Six-minute walking distance <sup>¤</sup>", btnText:["> 440 m","165 - 440 m","< 165 m"]};
params.push(MWT);
// Peak VO_2
const Peak_VO2 = {name:"Peak_VO2", group:"Cardiopulmonary", weight:[1,0,0], value:[1,2,3], title:"Peak VO2", btnText:["Peak VO<sub>2</sub> > 15 ml/min/kg","Peak VO<sub>2</sub> 11 - 15 ml/min/kg","Peak VO<sub>2</sub> < 11 ml/min/kg"]};
params.push(Peak_VO2);
//
const Predicted_VO2 = {name:"Predicted_VO2", group:"Cardiopulmonary", weight:[1,0,0], value:[1,2,3], title:"Predicted VO2", btnText:["> 65% of predicted","35 - 65% of predicted","< 35% of predicted"]};
params.push(Predicted_VO2);
// VE / VO_2 slope
const VE_slope = {name:"VE_slope", group:"Cardiopulmonary", weight:[1,0,0], value:[1,2,3], title:"VE/VO2-slope", btnText:["VE/VO<sub>2</sub>-slope < 36","VE/VO<sub>2</sub>-slope 36 - 44.9","VE/VO<sub>2</sub>-slope &GreaterEqual; 45"]};
params.push(VE_slope);
//
const proBNP = {name:"proBNP", group:"Biochem", weight:[1,1,1], value:[1,2,3], title:"NT-proBNP", btnText:["NT-proBNP < 300 ng/l","NT-proBNP 300 - 1400 ng/l","NT-proBNP > 1400 ng/l"]};
params.push(proBNP);
//
const BNP = {name:"BNP", group:"Biochem", weight:[1,1,1], value:[1,2,3], title:"BNP", btnText:["BNP < 50 ng/l","BNP 50 - 300 ng/l","BNP > 300 ng/l"]};
params.push(BNP);
//
const RAarea = {name:"RAarea", group:"Imaging", weight:[1,0,1], value:[1,2,3], title:"RA area", btnText:["RA area < 18 cm<sup>2</sup>","RA area 18 - 26 cm<sup>2</sup>","RA area > 26 cm<sup>2</sup>"]};
params.push(RAarea);
//
const Pericardial_Effusion = {name:"Pericardial_Effusion", group:"Imaging", weight:[1,0,1], value:[1,2,3], title:"Pericardial effusion", btnText:["No pericardial effusion","Minimal pericardial effusion","Pericardial effusion"]};
params.push(Pericardial_Effusion);
//
const MRAP = {name:"MRAP", group:"Haemodynamics", weight:[1,1,1], value:[1,2,3], title:"MRAP", btnText:["RAP &leq; 8 mmHg","RAP 8 - 14 mmHg","RAP > 14 mmHg"]};
params.push(MRAP);
//
const CI = {name:"CI", group:"Haemodynamics", weight:[1,1,1], value:[1,2,3], title:"CI", btnText:["CI &GreaterEqual; 2.5 l/min/m<sup>2</sup>","CI 2.0 - 2.4 l/min/m<sup>2</sup>","CI < 2.0 l/min/m<sup>2</sup>"]};
params.push(CI);
//
const SvO2 = {name:"SvO2", group:"Haemodynamics", weight:[1,1,1], value:[1,2,3], title:"SvO2", btnText:["SvO<sub>2</sub> > 65%","SvO<sub>2</sub> 60% - 65%","SvO<sub>2</sub> < 60%"]};
params.push(SvO2);
// Set group titles
const groupTitle = {Cardiopulmonary:"Cardiopulmonary excercise training", Biochem:"Biochemical markers <sup>¤*</sup>", 
			Imaging:"Imaging <sup>¤</sup> <small>(echocardiography, cardiac magnetic resonance)</small>", Haemodynamics:"Haemodynamics <sup>¤</sup>"};


// Number of params in array
const numOfParams = params.length;

// Create array with test values
let testValue = new Array(numOfParams).fill(0);




// Update all risks
function updateRisk() {

	let sum = new Array(numOfRisks).fill(0);
	let w = new Array(numOfRisks).fill(0);
	let paramCount = new Array(numOfRisks).fill(0); // Count the number of used params
	const paramMin = 3; // The minimum number of params for which a value is displayed.
	
	// Add up the sum and weights of all params for each risk
	for (let i = 0; i < numOfRisks; i++) {
		for (let j = 0; j < numOfParams; j++) {
			sum[i] += params[j].weight[i]*testValue[j];
			w[i] += (testValue[j]!=0)*params[j].weight[i];
			paramCount[i] += (testValue[j]!=0)*(params[j].weight[i]!=0);		}
	}
	
	// Special code for BNP/proBNP hierarchy
	let BNP_index;
	let proBNP_index;
	for (let j = 0; j < numOfParams; j++) {
		if (params[j].name === "BNP") {
			BNP_index = j;
		} else if (params[j].name === "proBNP") {
			proBNP_index = j;
		}
	}
	if ( testValue[BNP_index] > 0 && testValue[proBNP_index] > 0 ) {
		for(let i = 0; i < numOfRisks; i++) {
			sum[i] -= testValue[BNP_index]*params[BNP_index].weight[i];
			w[i] -= params[BNP_index].weight[i];
			paramCount[i] -= (params[BNP_index].weight[i]!=0)
		}
	}

	// Calculate the average of all params
	for (let i = 0; i < numOfRisks; i++) {
		riskValue[i] = 0;
		if (w[i] !== 0) {
			riskValue[i] = sum[i]/w[i];
		}
	}



	// Update and display risk value if min. number of params are used.
	/*for (let i=0; i<numOfRisks; i++) {
		if (riskValue[i] && paramCount[i] >= paramMin ) {
			riskRate = [" (Low risk)", " (Intermediate risk)", " (High risk)"];
			document.getElementById(riskID[i]).innerHTML = riskValue[i].toFixed(2) + riskRate[Math.round(riskValue[i])-1];
			switch (Math.round(riskValue[i])) {
			case 1: // If riskValue rounds to 1
				document.getElementById(riskID[i]).style.backgroundColor = "var(--low-green)";		
			break
			case 2: // If riskValue rounds to 2
				document.getElementById(riskID[i]).style.backgroundColor = "var(--mid-yellow)";			
			break
			case 3: // If riskValue rounds to 3
				document.getElementById(riskID[i]).style.backgroundColor = "var(--high-red)";		
			break
			default:
				document.getElementById(riskID[i]).style.backgroundColor = "white";
		}
		} else { // Do if too few parameters were used.
			document.getElementById(riskID[i]).innerHTML = `Use &geq; ${paramMin} parameters`;
			document.getElementById(riskID[i]).style.backgroundColor = "white";
		}
		
	}*/
	for (let i=0; i<numOfRisks; i++) {
		if (riskValue[i] && paramCount[i] >= paramMin ) {
			const riskRate = [" (Low risk)", " (Low Intermediate)"," (High Intermediate)", " (High risk)"];
			if ( riskValue[i] <= 1.5 ) {
			// If riskValue rounds to 1
				document.getElementById(riskID[i]).style.backgroundColor = "var(--low-green)";
				document.getElementById(riskID[i]).innerHTML = riskValue[i].toFixed(2) + riskRate[0];		
			} else if ( riskValue[i] <= 2.0 ) {
			// If riskValue rounds to 2
				document.getElementById(riskID[i]).style.backgroundColor = "var(--mid-yellow)";
				document.getElementById(riskID[i]).innerHTML = riskValue[i].toFixed(2) + riskRate[1];			
			} else if ( riskValue[i] <= 2.5 ) {
			// If riskValue rounds to 2
				document.getElementById(riskID[i]).style.backgroundColor = "var(--mid-orange)";
				document.getElementById(riskID[i]).innerHTML = riskValue[i].toFixed(2) + riskRate[2];			
			} else if ( riskValue[i] <= 3 ) {
			// If riskValue rounds to 3
				document.getElementById(riskID[i]).style.backgroundColor = "var(--high-red)";
				document.getElementById(riskID[i]).innerHTML = riskValue[i].toFixed(2) + riskRate[3];		
			}
		} else { // Do if too few parameters were used.
			document.getElementById(riskID[i]).innerHTML = `Use &geq; ${paramMin} parameters`;
			document.getElementById(riskID[i]).style.backgroundColor = "white";
		}
		
	}
}

function inputButton(name, val) {
	//updateButton(id, testNum, btnNum);
	for (let i=0; i < numOfParams; i++) {
		if (name === params[i].name) {
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
	console.log(content.style.maxHeight);
	if (content.style.maxHeight) {
		content.style.maxHeight = null;
		console.log("Closed collapsible!");
	} else {
		content.style.maxHeight = content.scrollHeight + "px";
		console.log(`Opened collapsible! ${content.scrollHeight}`);
	}
}

function resetCalc() {
	
	for(let i = 0; i < numOfParams; i++) {
		var name = params[i].name;
		var radio;
		if( radio = document.querySelector(`input[type=radio][name=${name}]:checked`) ) {
			radio.checked = false;
		}
		testValue[i] = 0;
	}
	updateRisk();
}

function copyData() {
	let copyStr = `Risk score: ${riskValue[0]}`;
	for( let i = 0; i<numOfParams; i++ ) {
		copyStr += `\n${params[i].name}: ${testValue[i]}`;
	}
	navigator.clipboard.writeText(copyStr);
}

function createButton(name, value, btn_text) {
	// Creates cell for button
	var cell = document.createElement("TD")
	cell.setAttribute("class","btn-cell")
	// Create label with type radioButton
	var label = document.createElement("LABEL");
	label.setAttribute("class","radioButton");
	// Create radio button with name and val
	if (value) {
		var btn = document.createElement("INPUT");
		btn.setAttribute("type","radio");
		btn.setAttribute("name",name);
		btn.setAttribute("value",value);
		btn.setAttribute("onclick","inputButton(this.name, this.value)");
		label.appendChild(btn);
	}
	// Create span with type checkmark
	var span = document.createElement("SPAN");
	span.setAttribute("class","checkmark");
	span.innerHTML = btn_text;
	label.appendChild(span);
	// Add btn and span to label node
	cell.appendChild(label);
	
	return cell;
}

function createTitleCell( title, span = 1 ) {
	var title_cell = document.createElement("TD");
	title_cell.setAttribute("class","title-cell");
	title_cell.innerHTML = title;
	if ( span > 1 ) {
		title_cell.setAttribute("rowspan",span);
	}
	
	return title_cell;
}
function createTable() {
	let groups = ["misc"];
	let groupCount = {misc:0};
	var group_id;
	const max_btns = 3;
	for(let i=0; i < numOfParams; i++) {
		if (group_id = params[i].group) {	
			if ( groupCount[group_id] ) {
				groupCount[group_id] += 1;
			} else {
				var body = document.createElement("TBODY");
				body.setAttribute("class","solid-border");
				body.setAttribute("id",group_id);
				misc_body = document.getElementById("misc");
				document.getElementById("mainTable").insertBefore(body, misc_body);

				groupCount[group_id] = 1;
			}
		} else {
			groupCount["misc"] += 1;
		}
	}

	for(let i=0; i < numOfParams; i++) {
		param = params[i];
		var row = document.createElement("TR");
		row.setAttribute("class", "btn-row");
		
		if ( group_id = params[i].group ) {
			if ( !document.getElementById(group_id).hasChildNodes() && groupTitle[group_id] ) {
				row.appendChild(createTitleCell(groupTitle[group_id], groupCount[group_id]));
			}
		} else {
			group_id = "misc";
		}
		if ( !groupTitle[group_id] ) {
				row.appendChild(createTitleCell(params[i].title));
		}
		
		for(let j=0; j < max_btns; j++) {
			btnCell = createButton(params[i].name, params[i].value[j], params[i].btnText[j]);
			row.appendChild(btnCell);
		}
		document.getElementById(group_id).appendChild(row);
	}
}
function createTable_m() {
	let groups = ["misc"];
	let groupCount = {misc:0};
	var group_id;
	const max_btns = 3;
	for(let i=0; i < numOfParams; i++) {
		if (group_id = params[i].group) {	
			if ( groupCount[group_id] ) {
				groupCount[group_id] += 1;
			} else {
				var body = document.createElement("TBODY");
				body.setAttribute("class","solid-border");
				body.setAttribute("id",group_id);
				misc_body = document.getElementById("misc");
				document.getElementById("mainTable").insertBefore(body, misc_body);

				groupCount[group_id] = 1;
			}
		} else {
			groupCount["misc"] += 1;
		}
	}

	for(let i=0; i < numOfParams; i++) {
		param = params[i];
		var title_row = 0;
		
		if ( group_id = params[i].group ) {
			if ( !document.getElementById(group_id).hasChildNodes() && groupTitle[group_id] ) {
				var title_row = document.createElement("TR");
				title_row.setAttribute("class","btn-row");
				var title_cell = createTitleCell(groupTitle[group_id]);
				title_cell.setAttribute("colspan","3");
				title_row.appendChild(title_cell);
			}
		} else {
			group_id = "misc";
		}
		var btn_row = document.createElement("TR");
		btn_row.setAttribute("class", "btn-row");

		if ( !groupTitle[group_id] ) {
				var title_row = document.createElement("TR");
				title_row.setAttribute("class","btn-row");
				var title_cell = createTitleCell(param.title);
				title_cell.setAttribute("colspan","3");
				title_row.appendChild(title_cell);
		}
		
		for(let j=0; j < max_btns; j++) {
			btnCell = createButton(params[i].name, params[i].value[j], params[i].btnText[j]);
			btn_row.appendChild(btnCell);
		}
		if (title_row) {
			document.getElementById(group_id).appendChild(title_row);
		}
		document.getElementById(group_id).appendChild(btn_row);
	}
}