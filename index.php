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
				//alert(targetData);
				var xmlhttp = new XMLHttpRequest();
				xmlhttp.onreadystatechange = function() {
					if(this.readyState == 4 && this.status == 200) {
						var responseJSONObj = eval(this.reponseText);
						if(responseJSONObj == true) {
							console.log("Successfully generated PDF");
						}
						else {
							console.log("Problem in generating PDF");	
						}
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
		<div class="entry-div">
			<input type="text" id="details-box" placeholder="E.g. Food">
			<input type="text" id="cost-box" placeholder="E.g. 200">
			<input type="button" id="spent-button" style="background-color: indianred" value="Spent">
			<input type="button" id="earned-button" style="background-color: forestgreen" value="Earned">
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
			<input type="button" id="generate-pdf" name='submit-button' value="Export to PDF" style="background-color: navy" onclick="generatePDFDocWithTable()">
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
	</body>
</html>
