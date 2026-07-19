$(function() {

    var siteSticky = function() {
        $(".js-sticky-header").sticky({topSpacing:0});
    };
    siteSticky();

    var siteMenuClone = function() {

        $('.js-clone-nav').each(function() {
            var $this = $(this);
            // এখানে মেইন মেনু ক্লোন হয়ে মোবাইল মেনুতে যাচ্ছে
            $this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
        });

        // ১ সেকেন্ড পর মোবাইল মেনুর ড্রপডাউন সেটআপ করা হচ্ছে
        setTimeout(function() {
            var counter = 0;
            // ভুল সংশোধন: .site-mobile-menu-body ব্যবহার করা হয়েছে
            $('.site-mobile-menu-body .has-children').each(function(){
                var $this = $(this);
                
                // ড্রপডাউন চেনার জন্য একটি অ্যারো (arrow) স্প্যান যোগ করা হচ্ছে
                $this.prepend('<span class="arrow-collapse collapsed"></span>');

                // সাব-মেনু (ul) ডিফল্টভাবে লুকিয়ে রাখা হচ্ছে
                $this.find('> ul').attr({
                    'class' : 'collapse',
                    'id' : 'collapseItem' + counter,
                }).hide(); // ডিফল্ট হাইড

                counter++;
            });
        }, 1000);

        // অ্যারো বা মেনুতে ক্লিক করলে ড্রপডাউন টগল করার ফাংশন
        $('body').on('click', '.arrow-collapse', function(e) {
            var $this = $(this);
            var $dropdown = $this.closest('li').find('> ul');
            
            e.preventDefault(); 
            
            if ( $dropdown.is(':visible') ) {
                $this.removeClass('active');
                $dropdown.slideUp(); // বন্ধ হবে
            } else {
                $this.addClass('active');
                $dropdown.slideDown(); // খুলবে
            }
        });

        $(window).resize(function() {
            var $this = $(this),
                w = $this.width();

            if ( w > 768 ) {
                if ( $('body').hasClass('offcanvas-menu') ) {
                    $('body').removeClass('offcanvas-menu');
                }
            }
        });

        $('body').on('click', '.js-menu-toggle', function(e) {
            var $this = $(this);
            e.preventDefault();

            if ( $('body').hasClass('offcanvas-menu') ) {
                $('body').removeClass('offcanvas-menu');
                $this.removeClass('active');
            } else {
                $('body').addClass('offcanvas-menu');
                $this.addClass('active');
            }
        });

        // মেনুর বাইরে ক্লিক করলে মেনু বন্ধ হওয়া
        $(document).mouseup(function(e) {
            var container = $(".site-mobile-menu");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ( $('body').hasClass('offcanvas-menu') ) {
                    $('body').removeClass('offcanvas-menu');
                }
            }
        });
    }; 
    siteMenuClone();

});