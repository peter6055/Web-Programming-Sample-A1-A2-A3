function registerMemberFeeCal() {

    var age = parseInt(document.forms["register-form"]["age"].value);

    //Student Status
    var std_status_yes = document.forms["register-form"]["std_yes"].checked;
    var std_status_no = document.forms["register-form"]["std_no"].checked;

    //Employment Status
    var emp_status_yes = document.forms["register-form"]["emp_yes"].checked;
    var emp_status_no = document.forms["register-form"]["emp_no"].checked;

    //set up a unchangeable original fee and discount rate counter
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
    if (emp_status_no == true) {
        discountPercantage += 0.40;
    }

    //finalise: if there are no rate return original fee otherwise calculate the discount rate
    if (discountPercantage != 0) {
        rate = rate * (1.00-discountPercantage);
    }

    rate=rate*12

    //update the rate to UI/return is for server side needed in future
    document.getElementById('memberFee_value').value = "AUD " + rate;
    return rate*12;
}


function rangeSliderValueUpdate(val) {
    document.getElementById('age_value').value = val;
}