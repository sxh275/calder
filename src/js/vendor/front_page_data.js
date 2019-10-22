jQuery(document).ready(function($){

    // focus for form
    $("input[type='text']:first").focus();

    // remove quick links go button
    $("#quick_links_submit").hide();

    // @todo make quick links jump to proper place if go button removed

    $("#quick_links_jumpzzzzzzz").change(function() {
        var url = $(this).val();
        // and this is to add a bit of GA event tracking
        var stext = $("#quick_links option:selected").text();
        _gaq.push(['_trackEvent', 'QuickLink', 'Click', stext]);
        // off to desired location
        window.location.href = url;
    });

    $("#gifto_promo a").click(function() {
        _gaq.push(['_trackEvent', 'FeatureLink', 'Click', stext]);
    });

    $("#quick_links_jump").change(function() {
        var url = $(this).val();
        var stext = $("#quick_links option:selected").text();
        var pathname = window.location.pathname;
        // figure out where this GA data belongs
        /*switch (pathname) {
         case "/musiclib/":
         _gaq.push(['_trackEvent', 'QuickLink-Music', 'Click', stext]);
         break;
         case "/universityarchives/":
         _gaq.push(['_trackEvent', 'QuickLink-Archives', 'Click', stext]);
         break;
         default:
         _gaq.push(['_trackEvent', 'QuickLink', 'Click', stext]);

         }*/

        // off to desired location
        window.location.href = url;
    });

    // Add/remove search box when someone hovers over the image info area

    function addSearch(){
        $("#searchbox").fadeIn("medium");
    }

    function removeSearch(){
        $("#searchbox").fadeOut("medium");

    }

    var searchboxConfig = {
        interval: 50,
        sensitivity: 4,
        over: removeSearch,
        timeout: 100,
        out: addSearch
    };

    $("#bg_info_overlay").hoverIntent(searchboxConfig);


    // expand footer on home page
    //$("#wide_footer").height("12em");

    // set starting tab
    /*$("div[class*=search-]").hide();
     var holder = 'div[class*=search-2]';
     $(holder).show();*/

    // tabs on home page
    $("a[rel*=tc-]").click(function() {
        var tab_id = $(this).attr("rel").split("-");
        // fade out current tab

        $("div[class*=search-]").hide();
        // show desired tab
        var holder = 'div[class*=search-' + tab_id[1] + ']';
        $(holder).show();
        /*
         alert(tab_id);
         var holder = 'div[id=tc-' + tab_id[1] + ']';
         $(holder).delay();
         $(holder).load("includes/home_page_data.php", {tab_type_id: tab_id[1], tab_id: tab_id[2], tab_height: tab_id[3]}).fadeIn(800);
         */
        var unactivate = "#searchtabs li";
        $(unactivate).removeClass("active");
        $(this).parent().addClass("active");
        var this_box = 'input[class=searchinput-' + tab_id[1] + ']';
        $(this_box).focus();
        return false;

    });
       
    

    //Carousel for main site - full width default 
    function makeOwlCaro() { 

        var owl = $("#mini_features"); 

        var playBoolean = true;

        //Control auto-play for viewport onLoad
                var $window = $(window);
                var windowsize = $window.width();
                    
                if (windowsize <= 767) {
                    playBoolean = false; 
                    console.log("I stop onLoad");          
                }
                else {
                    playBoolean = true;
                    console.log("I play onLoad");
                }               

        //Owl carousel settings          

        owl.owlCarousel({
            itemsCustom : [
                [0, 1],
                [450, 1],
                [600, 1],
                [700, 3],
                [1000, 3]
            ],
            pagination: false,
            stopOnHover: true,
            autoPlay: playBoolean,
            afterUpdate: function(){

                //Control auto-play for viewport resizing
                var windowsize = $window.width();
                    
                if (windowsize <= 767) {
                    //play = false;
                     owl.trigger('owl.stop');
                     owl.trigger('owl.goTo', 0);
                     console.log("small- I stop");           
                }
                else {
                    //play = true;
                    owl.trigger('owl.play', 5000);
                    console.log("large- I play");
                }                
            }
             
        });

        // Custom Navigation Events for Owl Carousel
        $(".next").click(function(){
            owl.trigger('owl.next');
        });
        
        $(".prev").click(function(){
            owl.trigger('owl.prev');
        });

    } //end makeOwlCaro

    //Carousel for business or special collections  - 2 items default 
    function makeOwlCaro2() { 

        var owl = $("#mini_features"); 

        var playBoolean = true;

        //Control auto-play for viewport onLoad
                var $window = $(window);
                var windowsize = $window.width();
                    
                if (windowsize <= 767) {
                    playBoolean = false; 
                    console.log("I stop onLoad");          
                }
                else {
                    playBoolean = true;
                    console.log("I play onLoad");
                }               

        //Owl carousel settings          

        owl.owlCarousel({
            itemsCustom : [
                [0, 1],
                [450, 1],
                [600, 1],
                [700, 2],
                [1000, 2]
            ],
            pagination: false,
            stopOnHover: true,
            autoPlay: playBoolean,
            afterUpdate: function(){

                //Control auto-play for viewport resizing
                var windowsize = $window.width();
                    
                if (windowsize <= 767) {
                    //play = false;
                     owl.trigger('owl.stop');
                     owl.trigger('owl.goTo', 0);
                     console.log("small- I stop");           
                }
                else {
                    //play = true;
                    owl.trigger('owl.play', 5000);
                    console.log("large- I play");
                }                
            }
             
        });

        // Custom Navigation Events for Owl Carousel
        $(".next").click(function(){
            owl.trigger('owl.next');
        });
        
        $(".prev").click(function(){
            owl.trigger('owl.prev');
        });

    } //end makeOwlCaro2


    //Carousel for business on special occasions  - 1 item default 
    function makeOwlCaro3() { 

        var owl = $("#mini_features"); 

        var playBoolean = true;

        //Control auto-play for viewport onLoad
                var $window = $(window);
                var windowsize = $window.width();
                    
                if (windowsize <= 767) {
                    playBoolean = false; 
                    console.log("I stop onLoad");          
                }
                else {
                    playBoolean = true;
                    console.log("I play onLoad");
                }               

        //Owl carousel settings          

        owl.owlCarousel({
            itemsCustom : [
                [0, 1],
                [450, 1],
                [600, 1],
                [700, 1],
                [1000, 1]
            ],
            pagination: false,
            stopOnHover: true,
            autoPlay: playBoolean,
            afterUpdate: function(){

                //Control auto-play for viewport resizing
                var windowsize = $window.width();
                    
                if (windowsize <= 767) {
                    //play = false;
                     owl.trigger('owl.stop');
                     owl.trigger('owl.goTo', 0);
                     console.log("small- I stop");           
                }
                else {
                    //play = true;
                    owl.trigger('owl.play', 5000);
                    console.log("large- I play");
                }                
            }
             
        });

        // Custom Navigation Events for Owl Carousel
        $(".next").click(function(){
            owl.trigger('owl.next');
        });
        
        $(".prev").click(function(){
            owl.trigger('owl.prev');
        });

    } //end makeOwlCaro3


    // Depends on directory (main site or branch sites) how many news and events items will show     

    if( window.location.pathname != "/business/" ) {         
        //&& window.location.pathname != "/specialcollections/"
        //default for main, music, chc, archives, architecture and rsmas
        makeOwlCaro();
    } 

    else {
        //default for business and special collections
        makeOwlCaro2();
    }

    //If it is business and there is a sticky image, use Caro3, otherwise, keep commented out
    //if( window.location.pathname === "/business/") {
    //   makeOwlCaro3();
    //}

     //View more news
    function viewMoreNews() {
        var $window = $(window);
        var windowsize = $window.width();
             
            if (windowsize <= 700) { 

            $("#news-expand").show(); 
            $("#news-collapse").hide();
            $("#mini_features").css("height","320px");
            console.log("Run mobile default news view");         

                $("#news-expand").click(function(e) {
                     e.preventDefault();
                    $("#mini_features").css("height","1000px"); 
                    $("#news-expand").hide(); 
                    $("#news-collapse").show();
                    console.log("Expand to show all 9 items");    
                }); 


                $("#news-collapse").click(function(e) {
                     e.preventDefault();
                    $("#mini_features").css("height","320px");
                    $("#news-expand").show(); 
                    $("#news-collapse").hide();
                    console.log("Collapse to show 3 items"); 
                });
            } 
            else {
                $("#mini_features").css("height","120px"); 
                $("#news-expand").show(); 
                $("#news-collapse").hide();
                console.log("Run desktop default news view");
            } 

    } //end viewMoreNews()

    
    //load event
     viewMoreNews();

    //resize event
    $(window).on('resize', function() {
        viewMoreNews();
    });
    


   

});
