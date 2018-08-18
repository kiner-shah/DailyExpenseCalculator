month_arr = new Array();
month_arr[0] = "Jan";
month_arr[1] = "Feb";
month_arr[2] = "Mar";
month_arr[3] = "Apr";
month_arr[4] = "May";
month_arr[5] = "Jun";
month_arr[6] = "Jul";
month_arr[7] = "Aug";
month_arr[8] = "Sep";
month_arr[9] = "Oct";
month_arr[10] = "Nov";
month_arr[11] = "Dec";
canvasOffsetX = -1;
canvasOffsetY = -1;

function setOffsets(canvas) {
	// var bounding_rect = canvas.getClientBoundingRect();
	canvasOffsetX = canvas.offsetLeft; // bounding_rect.left;
	canvasOffsetY = canvas.offsetTop; // bounding_rect.top;
	// alert(canvasOffsetX + " " + canvasOffsetY);
}

function plotGraphOnCanvas(canvasPoints) {
	var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var widthx = c.width / 13;	// 12 equally separated sections for each month, each of length (canvas width / 13)

    // Set offset variables
    setOffsets(c);

    // Find out max and min Y-axis values
    var maxVal = 0;
    var minVal = 999999999;
    for(var i = 0; i < canvasPoints.length; i++) {
    	if(maxVal < canvasPoints[i][1]) maxVal = canvasPoints[i][1];
    	if(minVal > canvasPoints[i][1]) minVal = canvasPoints[i][1];
    }
    minVal = parseInt((minVal / 100)) * 100;
    maxVal = parseInt((maxVal / 100)) * 100 + 100;

    // Drawing settings
    ctx.lineWidth = 2;
  	ctx.strokeStyle = '#333';
  	ctx.font = '10pt sans-serif';
  	ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // First draw axes
    ctx.beginPath();
    var axisXPad = 20;
    var axisYPad = 20;

    // Draw X-axis and Y-axis
    ctx.moveTo(axisXPad, 0);
    ctx.lineTo(axisXPad, c.height);
    ctx.moveTo(0, c.height - axisYPad);
    ctx.lineTo(c.width, c.height - axisYPad);
    ctx.closePath();
    ctx.stroke();

    // Draw X-axis points
    ctx.beginPath();
    for(var i = 1; i <= 12; i++) {
	    ctx.moveTo(axisXPad + i * widthx, c.height - axisYPad - 3);
	    ctx.lineTo(axisXPad + i * widthx, c.height - axisYPad + 3);
	}
    ctx.closePath();
    ctx.stroke();

    // Put X-axis labels
    ctx.beginPath();
    for(var i = 0; i < canvasPoints.length; i++) {
	    ctx.fillText(canvasPoints[i][0], axisXPad + (i + 1) * widthx, c.height - axisYPad + 9);
	}
    ctx.closePath();
    ctx.stroke();

    // Plot points w. r. t. month
    var valDiff = maxVal - minVal;
    var canvasHeightDiff = c.height - axisYPad;

    ctx.beginPath();
    for(var i = 0; i < canvasPoints.length - 1; i++) {
    	var xPoint = axisXPad + (i + 2) * widthx;
    	var yPoint = ((maxVal - canvasPoints[i + 1][1]) * canvasHeightDiff) / valDiff;
    	// alert(xPoint + " " + yPoint + " " + (axisXPad + (i + 1) * widthx) + " " + ((maxVal - canvasPoints[i][1]) * canvasHeightDiff) / valDiff);
    	ctx.moveTo(axisXPad + (i + 1) * widthx, ((maxVal - canvasPoints[i][1]) * canvasHeightDiff) / valDiff);
    	ctx.lineTo(xPoint, yPoint);
    }

    // Make points as small circles
    for(var i = 0; i < canvasPoints.length; i++) {
    	ctx.moveTo(axisXPad + (i + 1) * widthx, ((maxVal - canvasPoints[i][1]) * canvasHeightDiff) / valDiff);
    	ctx.arc(axisXPad + (i + 1) * widthx, ((maxVal - canvasPoints[i][1]) * canvasHeightDiff) / valDiff, 2, 0, 2 * Math.PI);
    	ctx.fill();
    }
    ctx.closePath();
    ctx.stroke();

    // Add event listener for tooltip
    c.addEventListener("mousemove", function(event) {
    	var mouseX = event.clientX - canvasOffsetX;
    	var mouseY = event.clientY - canvasOffsetY;
    	// alert(mouseX + "," + mouseY);
    	for(var i = 0; i < canvasPoints.length; i++) {
    		var xPoint = axisXPad + (i + 1) * widthx;
    		var yPoint = ((maxVal - canvasPoints[i][1]) * canvasHeightDiff) / valDiff;
    		var radius_square = 4;
    		var dx = mouseX - xPoint;
    		var dy = mouseY - yPoint;
    		// alert(dx + " " + dy + " " + xPoint + " " + yPoint);
    		if(dx * dx + dy * dy < radius_square) {
    			// ctx.fillText(canvasPoints[i][1], xPoint - 25, yPoint);
    			document.getElementById("point-hovered").value = canvasPoints[i][0] + ": " + canvasPoints[i][1];
    			break;
    		}
    	}
    });
}
function generateCanvas() {
	document.getElementById("reference-text").style.display = "block";
	var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    // Canvas pre-processing
    // References: https://www.html5rocks.com/en/tutorials/canvas/hidpi/
    var devicePixelRatio = window.devicePixelRatio;
    var backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
                            ctx.mozBackingStorePixelRatio ||
                            ctx.msBackingStorePixelRatio ||
                            ctx.oBackingStorePixelRatio ||
                            ctx.backingStoreRatio || 1;
    var ratio = devicePixelRatio / backingStoreRatio;
    if(devicePixelRatio != backingStoreRatio) {
      var oldWidth = c.width;
      var oldHeight = c.height;
      c.width = oldWidth * ratio;
      c.height = oldHeight * ratio;

      c.style.width = oldWidth + 'px';
      c.style.height = oldHeight + 'px';
      ctx.scale(ratio, ratio);
    }
    // Get the XML data
    var date = new Date();
    var current_year = date.getFullYear();
    var xml_request = new XMLHttpRequest();
    xml_request.open("GET", "test" + current_year + ".xml", false);
    xml_request.send();
    var xml_file = xml_request.responseXML;
    var ele_months = xml_file.getElementsByTagName("months");
    var ele_individual_months = ele_months[0].getElementsByTagName("month");
    var jsonToCanvas = [];
    for(var i = 0; i < ele_individual_months.length; i++) {
    	var month = month_arr[parseInt(ele_individual_months[i].getAttribute("month_no"))];
    	var ele_monthly_total = ele_individual_months[i].getElementsByTagName("monthlytotal");
    	var monthly_total = ele_monthly_total[0].childNodes[0].nodeValue;
    	// alert(month + " " + monthly_total);
    	jsonToCanvas[i] = [month, monthly_total];
    }
    var jsonToCanvaslen = jsonToCanvas.length;
    // for(var i = 0; i < jsonToCanvaslen; i++) {
    // 	alert(jsonToCanvas[i][0] + "," + jsonToCanvas[i][1]);
    // }

    // Send XML data to plotter function
    plotGraphOnCanvas(jsonToCanvas);
}