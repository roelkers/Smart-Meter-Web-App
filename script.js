$( document ).ready(function() {
	/*
	Initiliasiert die beiden Smart Meter als JavaScript Objekte.
	Properties: Name, Kennziffer, erlaubte Stromstärke, anliegende Stromstärke, angliegende
	Spannung, Ablesungen und zugehöriges Bild.
	*/
	const smOne = {
		name: "One",
		id: "SM00000001",
		allowedCurrent : 50,
		current : getCurrent(50),
		voltage : getVoltage(),
		//readings : [{date : 'Sun May 21 2017 17:06:50 GMT+0200 (CEST)', id:"Rufus12", value: 12345},{date : 'Sun May 21 2017 17:06:50 GMT+0200 (CEST)', id:"Rufus12", value: 12345}],
		reading : [],
		imgSrc : "https://upload.wikimedia.org/wikipedia/commons/9/9a/Intelligenter_zaehler-_Smart_meter.jpg"
	}

	const smTwo = {
		name : "Two",
		id : "SM00000002",
		allowedCurrent : 100,
		current : getCurrent(100),
		voltage : getVoltage(),
		readings : [],
		imgSrc : "http://www.nikkei.com/content/pic/20141028/96958A9F889DE5EAE6E5E0E6E4E2E3E4E3E2E0E2E3E6E2E2E2E2E2E2-DSXZZO7847265016102014000000-PN1-13.jpg"
	}
	/*Hilfsfunktion zum Runden*/
	function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
	}
	/*
	Berechnet die zulässige Spannung für ein Smart Meter
	*/
	function getVoltage(){
		return round(220 + 20*Math.random(),1);
	}
	/*
	Berechnet die anliegende Stromstärke in Abhängigkeit der erlaubten Stromstärke
	*/
	function getCurrent(allowedCurrent){
		return round(allowedCurrent + 5,1);
	}
	/*
	Gibt HTML für ein Smart Meter zurück
	*/
	function renderMeterHTML(meter){
		/* HTML für die Ablesungen des Smart Meters */
		const readings = $.map(smOne.readings ,function(reading,i){
			return `<li><span>${reading.id}, </span><span>${reading.date} </span><span><strong>${reading.value} kwH</strong></span></li>`;
		});
		const readingsHTML = readings.join("");
		/*Smart Meter HTML */
		return(`
		 <div class="specs">
			<div>
				<h2>Smart Meter ${meter.name}</h2>
				<p><strong>Gerätekennung: </strong>${meter.id}</p>
				<p><strong>Maximale Belastung: ${meter.allowedCurrent}A</strong></p>
				<p><strong>Anliegende Stromstärke: ${meter.current}V</strong></p>
				<p><strong>Anliegende Spannung: ${meter.voltage}V</strong></p>
			</div>
			<img src="${meter.imgSrc}"
			height="250px">
		</div>
		<h2>Ablesungen</h2>
		<ul class="readings">
			${readingsHTML}
		</ul>`
		);

	}
	/*
	Gibt HTML für die Übersicht zurück
	*/
	function renderOverviewHTML(){
		$("#content").html(`<form id="submit-form">
			<fieldset>
				<legend>Verbrauchswert eintragen und ablesen lassen:</legend>
				<div>
					<label for="Name">Nutzerkennung</label>
					<input type="text" placeholder="Name + letzte zwei Ziffern der Mat.nummer" name="Name">
				</div>
				<div>
					<label for="Value">Verbrauchswert</label>
					<input type="number" placeholder="Anzahl der Kilowattstunden" min="0" name="Value">
				</div>
				<div>
					<input type="radio" name="meter" value="sm-one" checked>
					<label for="sm-one">Smart Meter One</label>
					<input type="radio" name="meter" value="sm-one">
					<label for="sm-one">Smart Meter Two</label>
				</div>
				<button id="submit">Eintragen</button>
			</fieldset>
		</form>`);
	}
	/* Zeigt beim Klicken auf Navigations-Link Übersicht an */
	$("#home").on("click",function(){
		renderOverviewHTML();
	});
	/*
	Berechnet zufällige Spannung für Smart Meter 1 und zeigt dessen Daten an
	*/
	$("#link-sm-one").on("click",function(){
		smOne.voltage = getVoltage();
		$("#content").html(renderMeterHTML(smOne));
	});
	/*
	Berechnet zufällige Spannung für Smart Meter 2 und zeigt dessen Daten an
	*/
	$("#link-sm-two").on("click",function(){
		smTwo.voltage = getVoltage();
		$("#content").html(renderMeterHTML(smTwo));
	});
	/*
	Event Listener für das Formular. Sobald es abgeschickt wird, wird in das zugehörige
	Smart Meter Objekt ein neuer Eintrag eingefügt mit Datum, Nutzerkennung und kwH-Zahl.
	*/
	$(document).on("submit", function(e){
		const formData = $('#submit-form').serializeArray();
		const id = formData[0].value;
		const value = formData[1].value;
		const meter = formData[2].value;
		const dateString = new Date().toString();

		(meter === "sm-one") ?
			smOne.readings.push({date : dateString,value :value, id: id}):
		 	smTwo.readings.push({date : dateString,value :value, id: id});
		return false
	})
	/* zeigt standardmäßig die Übersicht an*/
	renderOverviewHTML();
});
