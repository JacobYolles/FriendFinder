var config = {
  '.chosen-select': {},
  '.chosen-select-deselect': {
    allow_single_deselect: true
  },
  '.chosen-select-no-single': {
    disable_search_threshold: 10
  },
  '.chosen-select-no-results': {
    no_results_text: 'Oops, nothing found!'
  },
  '.chosen-select-width': {
    width: "100%"
  }
}
  for (var selector in config) {
    $(selector).chosen(config[selector]);
  }
// Capture the form inputs 
$("#submit").on("click", function() {
  // Form validation
  event.preventDefault();
  function validateForm() {
    var isValid = true;
    $('.form-control').each(function() {
      if ($(this).val() === '')
        isValid = false;
    });
    $('.chosen-select').each(function() {
      if ($(this).val() === "")
        isValid = false
    })
    return isValid;
  }
  // If all required fields are filled
  if (validateForm() == true) {
    // Create an object for the user's data
    var data = {
                name: $("#name").val().trim(),
                photo: $("#photo").val().trim(),
                scores: [
                    $("#q1").val().trim(),
                    $("#q2").val().trim(),
                    $("#q3").val().trim(),
                    $("#q4").val().trim(),
                    $("#q5").val().trim(),
                    $("#q6").val().trim(),
                    $("#q7").val().trim(),
                    $("#q8").val().trim(),
                    $("#q9").val().trim(),
                    $("#q10").val().trim(),
                ]
            };
            console.log(data)
            $.ajax({
                method: "POST",
                url: "/api/friends",
                data: JSON.stringify(data),
                contentType: "application/json",
                success: function (response) {
                    $("#matchName").text(response.name)
                    $("#matchPicture").attr("src", response.photo)
                    $("#matchModal").modal("toggle")
                    console.log(response)
                }
            })
        } else {
            alert("Please answer all of the questions before submitting!");
        }
    });