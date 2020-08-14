<?php
/**********************************************************************************
 * Author: 	Kiner Shah
 * Date: 	26-Jan-2018
 **********************************************************************************/
	session_start();
	error_reporting(E_ERROR | E_PARSE);
?>
<!DOCTYPE html>
<html>
	<head>
		<link type="text/css" rel="stylesheet" href="design.css">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
		<script src="logic.js"></script>
		<script src="canvas_logic.js"></script>
		<script>
			function generatePDFDocWithTable() {
				var tablevar = document.getElementById("table-one");
				var balancevar = document.getElementById("total-value").innerHTML;
				var jsonObj = [];
				for(var i = 0; i < tablevar.rows.length; i++) {
					jsonObj[i] = [];
					for(var j = 0; j < tablevar.rows[i].cells.length; j++) {
						jsonObj[i][j] = tablevar.rows[i].cells[j].innerHTML;
					}
				}
				var targetURL = "pdf_generator.php?";
				var targetData = "generatePDF=" + encodeURIComponent(jsonObj)+"&generatePDFData=" + encodeURIComponent(balancevar);
				alert(targetData);
				var xmlhttp = new XMLHttpRequest();
				xmlhttp.onreadystatechange = function() {
					if(this.readyState == 4 && this.status == 200) {
						/*var responseJSONObj = eval(this.responseText);
						if(responseJSONObj == true) {
							console.log("Successfully generated PDF");
							<?php
								$_SESSION = array();
								session_destroy();
							?>
						}
						else {
							console.log("Problem in generating PDF");
							<?php
								$_SESSION = array();
								session_destroy();
							?>
						}*/
						var responseJSONObj = JSON.parse(this.responseText);
						//window.open(responseJSONObj.url, '_blank');
						var link = document.createElement('a');
					    link.href = responseJSONObj.url;
					    link.download = responseJSONObj.url;
					    link.target = "_blank";
					    link.click();
					}
				}
				xmlhttp.open("POST", targetURL, true);
				xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				xmlhttp.send(targetData);
			}
		</script>
	</head>
	<body>
		<div class="top-header">
			<img src="logo.png" class="inline-display" style="width: 80px; height: 80px;">
			<h1 class="inline-display">Daily Expense Calculator</h1>
		</div>
		<div id="daily-entry-div">
			<div class="entry-div">
				<input type="text" id="details-box" placeholder="E.g. Food">
				<input type="text" id="cost-box" placeholder="E.g. 200">
				<input type="button" id="spent-button" style="background-color: indianred" value="Spent">
				<input type="button" id="earned-button" style="background-color: forestgreen" value="Earned">
				<input type="button" id="show-graph" style="background-color: navy; margin-left: 30px; width: max-content" value="Show overall stats">
				<p id="error-message"></p>
			</div>
			<div class="balance-div">
				<p class="inline-display">Total: </p>
				<p class="inline-display" id="total-value"></p>
			</div>
			<div class="export-div">
				<!--<form align="center" method="get" action="pdf_generator.php">
					<input type="submit" id="generate-pdf" name='submit-button' style="background-color: gray" value="Export to PDF" onclick="generatePDFDocWithTable()">
					<p id="loading-message"></p>
				</form>-->
				<input type="button" id="generate-pdf" name='submit-button' value="Update & Export to PDF" style="background-color: navy" onclick="generatePDFDocWithTable()">
				<!--<input type="button" id="monthly-report" name='monthly-report-button' value="Monthly report" style="background-color: navy" onclick="generateMonthlyReport()">-->
				<p><!-- Blank paragraph --></p>
			</div>
			<div class="table-div" name="target-table">
				<table id="table-one" align="center">
					<thead id="table-one-head">
						<th>Description</th>
						<th>Amount</th>
					</thead>
					<tbody id="table-one-body">
					</tbody>
				</table>
			</div>
		</div>
		<div id="overall-stats-div">
			<div class="click-generate-button-div">
				<input type="button" id="canvas-generate" name='canvas-generate-button' value="Generate Graph" style="height:30px; background-color: navy;color: white" onclick="generateCanvas()">
				<p id="reference-text" style="display: none">Place your mouse pointer over a point in graph to see value in the box</p>
			</div>
			<div class="canvas-graph-div">
				<canvas id="myCanvas" width="800" height="300" style="position: relative; top: 5px; border:1px solid #d3d3d3;"></canvas>
				<p><!-- Blank paragraph --></p>
				<label for="point-hovered">Graph point (Month: value)</label>
				<input type="text" id="point-hovered" disabled>
			</div>
			<div class="back-button-div">
				<input type="button" id="back-button-to-entry-div" style="background-color: navy" value="Back">
			</div>
		</div>
	</body>
</html>
