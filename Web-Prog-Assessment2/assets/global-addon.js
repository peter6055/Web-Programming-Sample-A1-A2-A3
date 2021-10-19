function storiesCarousel() {
    $(document).ready(function () {
        $('.multiple-items').slick({
            dots: true,
            infinite: true,
            slidesToShow: 2,
            slidesToScroll: 2
        });
    })
}


function contactValidation() {
    $(document).ready(function() {
        $("#contact").validate({
            rules: {
                firstname: {
                    required: true
                },
                lastname: {
                    required: true
                },
                phone: {
                    required: true,
                    minlength: 10,
                    maxlength: 10
                },
                email: {
                    required: true,
                    email: true
                },
                subject: {
                    required: true
                }
            },
            messages: {
                firstname: {
                    required: "Please enter your first name."
                },
                lastname: {
                    required: "Please enter your last name."
                },
                phone: {
                    required: "Please enter your phone number.",
                    minlength: "Your phone number should start with zero, and it is a 10 digits.",
                    maxlength: "Your phone number should start with zero, and it is a 10 digits."
                },
                email: {
                    required: "We need your email address to contact you",
                    email: "Your email address must be in the format of name@domain.com"
                },
                subject: {
                    required: "Please write some things!"
                }
            },
            submitHandler: function(form) {
                form.submit();
            }
        });
    });
}