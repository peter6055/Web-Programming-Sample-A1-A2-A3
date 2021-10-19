<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Home | Life - Living It Fully Everyday</title>
    <?php require_once('includes/resources.php'); ?>
    <link rel="stylesheet" href="assets/home.css">

    <!-- Slick CDN css -->
    <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
    <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css"/>

</head>

<body onload="storiesCarousel()">
<div class="flex-container">

    <!--Nav Bar-->
    <?php require_once('includes/header.php'); ?>

    <!--To avoid sticky nav bar block content-->
    <div class="sticky-protect-bar"></div>

    <!--Banner Bar-->
    <div class="banner">
        <div class="content-container">
            <div id="banner-1"><span
                        class="inpage-head1">This is a2!! Stressed About COVID-19? Here's What Can Help</span> <span
                        class="inpage-head2">The COVID-19 pandemic and the resulting economic recession have negatively affected many people’s mental health and created new barriers for people already suffering from mental illness and substance use disorders.</span>
                <div class="inpara-btn" onclick="location.href='index.php#section-event-life'">Get Started</div>
            </div>
            <div id="banner-2" style="background-image: url(assets/images/home-1.svg);"></div>
        </div>
    </div>

    <!--Main Content Area-->
    <div class="content">
        <div class="home-content-container">
            <div id="cases-story-title">
                <span class="inpage-head1">Our Clients' Rating</span>
            </div>
            <div class="multiple-items" id="cases-story-content">
                <!-- Story -->
                <div class="cases-story" id="store1">
                    <div class="cover cover-round-radius" style="background-image: url(assets/images/rose.jpg);"></div>
                    <br>
                    <h1 class="title">Rose Wang</h1>
                    <h2 class="sub-title">Join Yoga Session Since 2019</h2>
                    <div class="rating">
                        <img src="assets/images/icons8-star-48.png" width="20px">
                        <img src="assets/images/icons8-star-48.png" width="20px">
                        <img src="assets/images/icons8-star-48.png" width="20px">
                        <img src="assets/images/icons8-star-48.png" width="20px">
                        <img src="assets/images/icons8-star-48.png" width="20px">
                    </div>
                    <span class="article">I absolutely love Seed yoga. I've been a member for a couple of years now. I love the uniqueness and different teaching styles of every instructor.</span>
                </div>


                <!-- Story -->
                <div class="cases-story" id="store2">
                    <div class="cover cover-round-radius" style="background-image: url(assets/images/gaynor.jpg);"></div>
                    <br>
                    <h1 class="title">Gaynor Long</h1>
                    <h2 class="sub-title">Join Health Habits Session Since 2020</h2>
                    <div class="rating">
                        <img src="assets/images/icons8-star-48.png" width="20px">
                        <img src="assets/images/icons8-star-48.png" width="20px">
                        <img src="assets/images/icons8-star-48.png" width="20px">
                        <img src="assets/images/icons8-star-48.png" width="20px">
                        <img src="assets/images/icons8-star-48.png" width="20px">
                    </div>
                    <span class="article">I just love yin yoga with Lisa. After class you feel totally relaxed and extremely peaceful. She truly is a very special teacher and shares her knowledge of the practice with grace and humour. Highly recommended</span>
                </div>


                <!-- Story -->
                <div class="cases-story" id="store3">
                    <div class="cover cover-round-radius" style="background-image: url(assets/images/lainey.jpg);"></div>
                    <br>
                    <h1 class="title">Lainey Kwok</h1>
                    <h2 class="sub-title">Join Yoga, Meditation Session in 2021</h2>
                    <div class="rating">
                        <img src="assets/images/icons8-star-48.png" width="20px">
                        <img src="assets/images/icons8-star-48.png" width="20px">
                        <img src="assets/images/icons8-star-48.png" width="20px">
                        <img src="assets/images/icons8-star-48.png" width="20px">
                        <img src="assets/images/icons8-star-48.png" width="20px">
                    </div>
                    <span class="article">Today was my first yoga session followed by meditation. Diane was calm, relaxed and was able to help individuals during the session. highly recommend to visit and experience the feel of a mini escape from our crazy daily lives 🙏🏼
                    </span>
                </div>


                <!-- Story -->
                <div class="cases-story" id="store4">
                    <div class="cover cover-round-radius" style="background-image: url(assets/images/ian.jpg);"></div>
                    <br>
                    <h1 class="title">Ian Moreton</h1>
                    <h2 class="sub-title">Join free online sessions regularly</h2>
                    <div class="rating">
                        <img src="assets/images/icons8-star-48.png" width="20px">
                        <img src="assets/images/icons8-star-48.png" width="20px">
                        <img src="assets/images/icons8-star-48.png" width="20px">
                        <img src="assets/images/icons8-star-48.png" width="20px">
                        <img src="assets/images/icons8-star-48.png" width="20px">
                    </div>
                    <span class="article">The practice is very professional and friendly. The chiropractors make you feel very relaxed and have a great bedside manner.  The admin staff are always courteous, friendly and accommodating with my needs.
</span>
                </div>
            </div>

        </div>
    </div>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <!--  Laatest new from life -->
    <span class="inpage-head1" id="section-event-life"
          style="text-align: center;">Popular Event & News from LIFE.COM</span>
    <div class="content">
        <div class="home-content-container">
            <div class="yellow-container">
                <h2 class="inpara-head2 inpara-container-head inpara-container-yellow-icon">&nbsp; &nbsp; &nbsp; &nbsp;
                    &nbsp; Eat Healthy Planner </h2>
                <span class="inpara-article inpara-container-article">Eating a healthy diet is very important during the COVID-19 pandemic. It can affect our body’s ability to prevent, fight and recover from infections</span>
                <div class="inpara-container-btn" onClick="location.href='myServices.php'">Take a look!</div>
            </div>
            <div class="yellow-container">
                <h2 class="inpara-head2 inpara-container-head inpara-container-yellow-icon">&nbsp; &nbsp; &nbsp; &nbsp;
                    &nbsp; Yoga Class</h2>
                <span class="inpara-article inpara-container-article">Yoga Practice Is Beneficial for Maintaining Healthy Lifestyle and Endurance Under Restrictions and Stress Imposed by Lockdown During COVID-19 Pandemic.</span>
                <div class="inpara-container-btn" onClick="location.href='myServices.php'">Take a look!</div>
            </div>
            <div class="yellow-container">
                <h2 class="inpara-head2 inpara-container-head inpara-container-yellow-icon">&nbsp; &nbsp; &nbsp; &nbsp;
                    &nbsp; Home-based Stretching</h2>
                <span class="inpara-article inpara-container-article">Physical activity has many health benefits, one of which is to boost the immune system and its fight against respiratory viral infections.</span>
                <div class="inpara-container-btn" onClick="location.href='myServices.php'">Take a look!</div>
            </div>
        </div>
    </div>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>

    <!--  Laatest new from government -->
    <span class="inpage-head1" style="text-align: center;">Popular News from Governments</span>
    <div class="content" id="section-event-gov">
        <div class="home-content-container">
            <div class="purple-container">
                <h2 class="inpara-head2 inpara-container-head inpara-container-purple-icon">&nbsp; &nbsp; &nbsp; &nbsp;
                    &nbsp; Small Business COVID Hardship Fund</h2>
                <span class="inpara-article inpara-container-article">Providing $10,000 grants for eligible small and medium businesses that have experienced a reduction in turnover of at least 70%.</span>
                <div class="inpara-container-btn"
                     onClick="location.href='https://business.vic.gov.au/grants-and-programs/small-business-covid-hardship-fund'">
                    Claim the money
                </div>
            </div>
            <div class="purple-container">
                <h2 class="inpara-head2 inpara-container-head inpara-container-purple-icon">&nbsp; &nbsp; &nbsp; &nbsp;
                    &nbsp; COVID-19 Disaster Payment - Victoria</h2>
                <span class="inpara-article inpara-container-article">This is a lump-sum payment for people who lost work and income due to a Victoria COVID-19 public health order.</span>
                <div class="inpara-container-btn"
                     onClick="location.href='https://www.servicesaustralia.gov.au/individuals/services/centrelink/covid-19-disaster-payment'">
                    Claim the money
                </div>
            </div>
            <div class="purple-container">
                <h2 class="inpara-head2 inpara-container-head inpara-container-purple-icon">&nbsp; &nbsp; &nbsp; &nbsp;
                    &nbsp; Business recovery and resilience mentoring</h2>
                <span class="inpara-article inpara-container-article">Eligible business owners will be matched with an experienced professional who will provide them with up to four one-on-one mentoring sessions.</span>
                <div class="inpara-container-btn"
                     onClick="location.href='https://business.vic.gov.au/grants-and-programs/business-recovery-and-resilience-mentoring'">
                    Take a look!
                </div>
            </div>
        </div>
    </div>
    <br>
    <br>
    <br>
    <br>

    <!--  how can we help -->
    <div class="content" id="section-images-1"
         style="background-image: url(assets/images/home-bg.jpeg); height: 500px; background-size: 100% auto;"></div>

    <!--  how can we help -->
    <div class="content" id="section-what-cana-we-help-title">
        <div class="home-content-container" style="margin-bottom: 0px !important;">
            <div style="width: 50%"><span class="inpage-head1"
                                          style="font-size: 40px; letter-spacing: -1px !important;">Get the right track for you life. Here is how we provides</span>
            </div>
            <div style="width: 40%"></div>
        </div>
    </div>
    <div class="content" id="section-what-cana-we-help">
        <div class="home-content-container" style="margin-top: 0px !important;">
            <div class="col-service"><img class="inpage-icon-img" src="assets/images/hch-icon-1.svg" alt="life"
                                          width="100" height="auto"> <span class="inpage-head3 inpage-center">Wellbeing Activaity and Support</span><br>
                <span class="inpara-article inpage-article inpage-center">These are unprecedented times. We need to work extra hard to manage our emotions well.</span>
            </div>
            <div class="col-service"><img class="inpage-icon-img" src="assets/images/hch-icon-2.svg" alt="life"
                                          width="100" height="auto"> <span
                        class="inpage-head3 inpage-center">Hello</span><br>
                <span class="inpara-article inpage-article inpage-center">For lots of Victorians, this year has been hard, and you aren’t alone if exercise has dropped off your priority. </span>
            </div>
            <div class="col-service"><img class="inpage-icon-img" src="assets/images/hch-icon-3.svg" alt="life"
                                          width="100" height="auto"> <span class="inpage-head3 inpage-center">Talk to our Agents</span><br>
                <span class="inpara-article inpage-article inpage-center">However the pandemic is affecting your mental wellbeing, you can talk it through with one of our counsellors. We’ll provide advice and support based on your specific needs. </span>
            </div>
        </div>
    </div>

    <!--  how can we help -->
    <div class="content" id="section-images-2"
         style="background-image: url(assets/images/home-bg2.jpg); height: 800px; background-repeat: no-repeat; width: 100%;background-size: 100% auto;"></div>

    <!--  how can we help -->
    <div class="content" id="section-pricing">
        <div class="home-content-container" style="margin-bottom: 100px !important; width: 60% !important;">
            <div id="pricing-container-left"><span class="inpage-head1"
                                                   style="font-size: 40px; letter-spacing: -1px !important;">Join LIFE Membership</span>
                <br>
                <span class="inpage-head3">Membership Price and Benefits</span>
                <br>
                <br>
                <span class="inpara-article">• Enjoy Free Event and Activity.</span><br>
                <br>
                <span class="inpara-article">• 10% Discount for Melbourne Fitness Center.</span><br>
                <br>
                <span class="inpara-article">• Free entry for online session.</span><br>
                <br>
                <span class="inpara-article">• Be the first one to enrol our activity.</span><br>
                <br>
                <span class="inpara-article">• Get first priority support.</span><br>
                <br>
            </div>
            <div id="pricing-container-mid"></div>
            <div id="pricing-container-right"><br>
                <br>
                <span class="inpage-head2 head-white-color">One Year</span><br>
                <span class="inpage-head1 head-white-color">AUD $10</span><br>
                <br>
                <br>
                <br>
                <span class="inpage-head2 head-white-color">Student 5% off</span><br>
                <br>
                <span class="inpage-head2 head-white-color">16-20 years old 10% off</span><br>
                <br>
                <span class="inpage-head2 head-white-color">Unemployment 40% off</span><br>
                <br>
                <button type="button" class="inpara-btn membership-btn" onclick="location.href='register.php'">Get
                    Started
                </button>
            </div>
        </div>
    </div>
    <!--Footer Area-->
    <?php require_once('includes/footer.php'); ?>
</div>

<!-- Slick CDN CSS-->
<script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>

</body>
</html>
