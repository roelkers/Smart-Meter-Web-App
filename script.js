$( document ).ready(function() {

	const smOne = {
		name: "One",
		id: "SM00000001",
		allowedCurrent : 50,
		current : getCurrent(50),
		voltage : getVoltage(),
		imgSrc : "https://upload.wikimedia.org/wikipedia/commons/9/9a/Intelligenter_zaehler-_Smart_meter.jpg"
	}

	const smTwo = {
		name : "Two",
		id : "SM00000002",
		allowedCurrent : 100,
		current : getCurrent(100),
		voltage : getVoltage(),
		imgSrc : "http://www.nikkei.com/content/pic/20141028/96958A9F889DE5EAE6E5E0E6E4E2E3E4E3E2E0E2E3E6E2E2E2E2E2E2-DSXZZO7847265016102014000000-PN1-13.jpg"
	}

	function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
	}

	function getVoltage(){
		return round(220 + 20*Math.random(),1);
	}

	function getCurrent(allowedCurrent){
		return round(allowedCurrent + 5,1);
	}

	function getMeterHTML(meter){
		return(`<div>
			<h2>Smart Meter ${meter.name}</h2>
			<p><strong>Gerätekennung: </strong>${meter.id}</p>
			<p><strong>Maximale Belastung: ${meter.allowedCurrent}A</strong></p>
			<p><strong>Anliegende Stromstärke: ${meter.current}V</strong></p>
			<p><strong>Anliegende Spannung: ${meter.voltage}V</strong></p>
		</div>
		<img src="${meter.imgSrc}"
			height="250px">`);
	}

	function renderOverviewHTML(){
		$("#content").html(`<form>
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
				<button id="submit">Eintragen</button>
			</fieldset>
		</form>`);
	}

	$("#home").on("click",function(){
		renderOverviewHTML();
	});

	$("#link-sm-one").on("click",function(){
		smOne.voltage = getVoltage();
		$("#content").html(getMeterHTML(smOne));
	});

	$("#link-sm-two").on("click",function(){
		smTwo.voltage = getVoltage();
		$("#content").html(getMeterHTML(smTwo));
	});

	$("#submit").on("click"),function(e){
		e.preventDefault();
		
	}
	renderOverviewHTML();
});
