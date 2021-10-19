function rangeSliderValueUpdate(val) {
  document.getElementById('age_value').value = val;
}

function alertLoginBtnOnClick() {
  alert("Member login availble soon!");
}

// if it is not ready to submit, calculate member fee only, otherwise validate data
function registerValidateForm(isSubmit) {
  let firstname = document.forms["register-form"]["fname"].value;
  let lastname = document.forms["register-form"]["lname"].value;
  let email = document.forms["register-form"]["email"].value;
  let email2 = document.forms["register-form"]["email2"].value;
  let phone = document.forms["register-form"]["phone"].value;
  var age = parseInt(document.forms["register-form"]["age"].value);


  //Student Status
  let std_status_yes = document.forms["register-form"]["std_yes"].checked;
  let std_status_no = document.forms["register-form"]["std_no"].checked;

  //Employment Status
  let emp_status_yes = document.forms["register-form"]["emp_yes"].checked;
  let emp_status_no = document.forms["register-form"]["emp_no"].checked;

  if (isSubmit) {
    var emailRegex = new RegExp("^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+");
    let phoneRegex = /^\+61 4\d{2} \d{3} \d{3}$/;

    if (firstname == "") {
      alert("First Name must be filled out");
      return false;
    }

    if (lastname == "") {
      alert("Last Name must be filled out");
      return false;
    }

    if (email == "") {
      alert("Email must be filled out");
      return false;
    }

    //----- Email Format Validation -----
    if (emailRegex.test(email) == false) {
      alert("Please check your email. Email format incorrect.");
      return false;
    }

    //----- Email Confirmation Validation -----
    if (email != email2) {
      alert("Please check your email. Email and the confirmation is not match.");
      return false;
    }

    if (email2 == "") {
      alert("Email confirm must be filled out");
      return false;
    }

    if (phone == "") {
      alert("Phone must be filled out");
      return false;
    }

    //----- Tel Format Validation -----
    if (phoneRegex.test(phone) == false) {
      alert("Please check your mobile number. Phone number format incorrect.");
      return false;
    }

    if (age < 1) {
      alert("Age must be filled out");
      return false;
    }

    //----- Age Validation -----
    if (age < 16) {
      alert("You must be 16 years old or above");
      return false;
    }


    //Student Status: both empty means not input
    if (std_status_yes == "" && std_status_no == "") {
      alert("Student Status must be filled out");
      return false;
    }

    //Employment Status: both empty means not input	
    if (emp_status_yes == "" && emp_status_no == "") {
      alert("Employment Status must be filled out");
      return false;
    }
    return true;
  }
	
  registerMemberFeeCal(age, std_status_yes, emp_status_yes);
}


function registerMemberFeeCal(age, std_status_yes, emp_status_yes) {
  //set up a unchangable original fee and discount rate counter
  var rate = 10.00;
  var discountPercantage = 0.00;

  //if this user is 16-20 years old add 10% discount to discount rate counter
  if (age >= 16 && age <= 20) {
    discountPercantage += 0.10;
  }
	
  //if this user is student add 5% discount to discount rate counter
  if (std_status_yes == true) {
    discountPercantage += 0.05;
  }
	
  //if this user is unemployment add 40% discount to discount rate counter
  if (emp_status_yes == true) {
    discountPercantage += 0.40;
  }

  //finalise: if there are no rate return original fee otherwise calculate the discount rate
  if (discountPercantage != 0) {
	rate = rate * (1.00-discountPercantage);
  } 

  //update the rate to UI/return is for server side needed in future
  document.getElementById('memberFee_value').value = "AUD " + rate;
  return rate;


}
