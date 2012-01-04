$(function() {
  $('.error').hide();

  $("#contact-send").click(function() {
		// validate and process form
		// first hide any error messages
    $('.error').hide();
		
	  var body = $("#contact-textarea").val();
		if (body == "") {
      $("#contact-textarea").addClass('error');
      $("#contact-textarea").focus();
      return false;
    }
		
		var dataString = name;
		//alert (dataString);return false;
		
		$.ajax({
      type: "POST",
      url: "php/process.php",
      data: dataString,
      success: function() {
        alert("message sent");
      }
     });
    return false;
	});
});