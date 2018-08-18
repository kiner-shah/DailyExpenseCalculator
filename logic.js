var total_balance = 0;
$(document).ready(function() {
	$('#total-value').append(total_balance);
	$('#total-value').css('float', 'right');
	$('#total-value').css('padding-right', '10px');
	$('#table-one').hide();
	$('#generate-pdf').hide();
	$('#monthly-report').hide();
	$('#overall-stats-div').hide();
	$('#spent-button').click(function() {
		var details_box = $('#details-box').val();
		var cost_box = $('#cost-box').val();
		if(!details_box || details_box.length == 0) {
			$('#error-message').append("Error: blank description");
			$('#error-message').css('color', 'red');
			$('#error-message').css('font-family', 'sans-serif');
			$('#details-box').css('border', '2px solid red');
		}
		else {
			$('#error-message').empty();
			$('#details-box').css('border', '1px solid gray');

			if(!cost_box || cost_box.length == 0) {
				$('#error-message').append("Error: no amount entered");
				$('#error-message').css('color', 'red');
				$('#error-message').css('font-family', 'sans-serif');
				$('#cost-box').css('border', '2px solid red');
			}
			else {
				$('#error-message').empty();
				$('#cost-box').css('border', '1px solid gray');

				var cost_regex = new RegExp(/^[0-9]+([.][0-9]+)?$/);
				if(cost_regex.test(cost_box) == true) {
					if($('#table-one').css('display') == 'none') {
						$('#table-one').show();
						$('#generate-pdf').show();
						$('#generate-pdf').css('background-color', 'navy');
						$('#monthly-report').show();
						$('#monthly-report').css('background-color', 'navy');
					}
					$('#table-one').append('<tr class="spent-row"><td>' + details_box + '</td><td>-' + cost_box + '</td></tr>');
					total_balance = total_balance - parseFloat(cost_box);
					$('#total-value').empty();
					$('#total-value').append(total_balance.toFixed(2));
				}
				else {
					$('#error-message').append("Error: invalid amount entered. Make sure there are no + or - signs and the value is proper");
					$('#error-message').css('color', 'red');
					$('#error-message').css('font-family', 'sans-serif');
					$('#cost-box').css('border', '2px solid red');
				}
			}
		}
	});
	$('#earned-button').click(function() {
		var details_box = $('#details-box').val();
		var cost_box = $('#cost-box').val();
		if(!details_box || details_box.length == 0) {
			$('#error-message').append("Error: blank description");
			$('#error-message').css('color', 'red');
			$('#error-message').css('font-family', 'sans-serif');
			$('#details-box').css('border', '2px solid red');
		}
		else {
			$('#error-message').empty();
			$('#details-box').css('border', '1px solid gray');

			if(!cost_box || cost_box.length == 0) {
				$('#error-message').append("Error: no amount entered");
				$('#error-message').css('color', 'red');
				$('#error-message').css('font-family', 'sans-serif');
				$('#cost-box').css('border', '2px solid red');
			}
			else {
				$('#error-message').empty();
				$('#cost-box').css('border', '1px solid gray');
				var cost_regex = new RegExp(/^[0-9]+([.][0-9]+)?$/);
				if(cost_regex.test(cost_box) == true) {
					if($('#table-one').css('display') == 'none') {
						$('#table-one').show();
						$('#generate-pdf').show();
						$('#generate-pdf').css('background-color', 'navy');
						$('#monthly-report').show();
						$('#monthly-report').css('background-color', 'navy');
					}
					$('#table-one').append('<tr class="earned-row"><td>' + details_box + '</td><td>' + cost_box + '</td></tr>');
					total_balance = total_balance + parseFloat(cost_box);
					$('#total-value').empty();
					$('#total-value').append(total_balance.toFixed(2));
				}
				else {
					$('#error-message').append("Error: invalid amount entered. Make sure there are no + or - signs and the value is proper");
					$('#error-message').css('color', 'red');
					$('#error-message').css('font-family', 'sans-serif');
					$('#cost-box').css('border', '2px solid red');
				}
			}
		}
	});
	$('#show-graph').click(function() {
		$('#daily-entry-div').hide();
		$('#overall-stats-div').show();
	});
	$('#back-button-to-entry-div').click(function() {
		$('#daily-entry-div').show();
		$('#overall-stats-div').hide();
	});
});
