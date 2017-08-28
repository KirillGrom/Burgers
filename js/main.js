// slider
$(function() {



    $(".slider__button").on("click", function(e) {
        e.preventDefault();
        var $this = $(this);
        slider($this);

    });


    function slider($this) {

        var controller = $this.closest(".slide__controller");
        var continer = controller.siblings(".slider_content");
        var item = continer.find(".slider_item");
        var itemActive = item.filter(".active-slide");
        var listSlider = continer.find(".slide_list");



        if ($this.hasClass("slider_btn-next")) {

            var nextItem = itemActive.next();
            if (nextItem.length) {
                var itemIndex = nextItem.index();

            } else {
                itemIndex = item.first().addClass("active-slide").index();

            }


        } else {
            var prevItem = itemActive.prev();
            if (prevItem.length) {
                itemIndex = prevItem.index();
            } else {
                itemIndex = item.last().addClass("active-slide").index();
            }

        }

        var position = (itemIndex * -100) + '%';

        nextSlide(position, nextItem);

        function nextSlide(position, nextItem) {
            listSlider.css({
                'transform': 'translateX(' + position + ')',
                '-webkit-transform': 'translateX(' + position + ')'

            });

            if (nextItem) {
                itemActive.removeClass("active-slide");
                nextItem.addClass("active-slide");

            } else {
                itemActive.removeClass("active-slide");
                prevItem.addClass("active-slide");
            }
        }




    }

});
// horizont accordion
$(function() {


    $(".stuff_trigger ").on("click", function(e) {
        e.preventDefault();
        var target = $(e.target);

        var item = target.closest(".team__items");
        var stuffHeight = item.find(".stuff").outerHeight();
        var stuffBlock = item.find(".wrapp_stuff");
        var listItem = item.siblings(".team__items");
        var listBlcoks = listItem.find(".wrapp_stuff");
        if (!item.hasClass("active")) {
            listItem.removeClass("active");
            item.addClass("active");
            listBlcoks.css({
                'height': 0
            })
            stuffBlock.css({
                'height': stuffHeight
            });

        } else {
            item.removeClass("active");
            stuffBlock.css({
                'height': 0
            });

        }




    });


});
//vertical accordion
$(function() {
    $(".accordeon_trigger").on("click", function(e) {
        e.preventDefault();
        var elem = $(e.target);

        var item = elem.closest(".accordeon__item");
        var itemList = item.siblings(".accordeon__item");
        var descList = itemList.find(".accordeon_desc");
        var blockDesc = item.find(".accordeon_desc");
        var btnAccord = item.find(".accordeon_btn");
        var widthWind = $(window).width();


        if (widthWind > 1000) {
            var widthDesc = widthWind / 1.5 - btnAccord.width() * 3;
        } else {
            var widthDesc = widthWind - btnAccord.width() * 3;
        }


        if (!item.hasClass("open")) {
            item.addClass("open");
            itemList.removeClass("open");
            blockDesc.css({
                'width': widthDesc
            })

            descList.css({
                'width': 0
            })

        } else {
            item.removeClass("open");
            blockDesc.css({
                'width': 0
            })
        }
    });
});
// ajax 
$(function() {




    var submitFrom = function submitFrom(e) {
        e.preventDefault();
        e.target
        var form = $(e.target);
        var url = form.attr("action");
        var data = form.serialize();
        console.log
        var query = $.ajax({
            type: "POST",
            url: url,
            data: data

        })
        query.done(function() {
            var erro = $(".sent");
            sent.css({
                "display": "block"
            });

            $(".model_close").on("click", function() {
                sent.css({
                    "display": "none"
                })
            });
        });
        query.fail(function() {
            var erro = $(".erro");
            erro.css({
                "display": "block"
            });

            $(".model_close").on("click", function() {
                erro.css({
                    "display": "none"
                })
            });



        });
    };
    $("#form_order").on("submit", submitFrom);

});










// hamburger menu
$(document).ready(function() {



    $(".button__hamburger__menu").on('click', function(e) {
        e.target;
        var buttonMenu = $(e.target);

        var burgeMenu = $(".hamburger");


        buttonMenu.css({
            opacity: 0
        })
        burgeMenu.css({
            display: "flex"
        });

        if (buttonMenu.hasClass("close_btn")) {
            burgeMenu.fadeOut();
        }


    });






});
// PopUp
$(function() {
    $("[data-fancybox]").fancybox({

    });

});
//  yandex map 
$(function() {
    ymaps.ready(init);
    var myMap,
        Mymarker;

    function init() {
        myMap = new ymaps.Map("map", {
            center: [59.896133564219205, 30.42461799999993],
            zoom: 17
        });
        myMap.behaviors.disable('scrollZoom');
        Mymarker = new ymaps.Placemark(
                [59.896133564219205, 30.424628728835984], {
                    balloonContent: 'Burger'
                }, {
                    iconLayout: 'default#imageWithContent',
                    iconImageHref: './img/icons/map-marker.svg',
                    iconImageSize: [46, 57],
                    iconImageOffset: [-46, -77]

                }),





            myMap.geoObjects.add(Mymarker);

    }
});
// scroll page
$(function() {

    var notSkroll = false;


    var scroll = function(numbSection) {
        if (notSkroll) {
            return;
        }
        notSkroll = true;
        var continer = $(".main-container");
        var section = continer.find(".section");
        var postElement = (numbSection * -100) + "%";
        continer.css({
            'transform': 'translateY(' + postElement + ')',
            '-webkit-transform': 'translateY(' + postElement + ')',
        });
        section.eq(numbSection).addClass("active").siblings().removeClass("active");



        setTimeout(function() {
            notSkroll = false;

            $(".item__scroll").eq(numbSection).addClass("scroll_active").siblings().removeClass("scroll_active");
        }, 2300);
    };


    function sectionItem(section) {

        var sectActiv = section.filter(".active");
        return {
            sectActiv: sectActiv,
            sectNext: sectActiv.next(),
            sectPrev: sectActiv.prev()
        }



    }
    $(".main-container").on('wheel', function(e) {

        var deltaY = e.originalEvent.deltaY;
        var direction;


        if (deltaY > 0) {
            direction = "up";
            scrollTo(direction);
        }

        if (deltaY < 0) {
            direction = "down";
            scrollTo(direction);
        }

    })

    function scrollTo(direction) {
        var continer = $(".main-container");
        var section = continer.find(".section");
        var sectionActiv = sectionItem(section);


        if (direction === "up" && sectionActiv.sectNext.length) { //скролим вниз
            scroll(sectionActiv.sectNext.index());
        }
        //скролим вверх
        if (direction === "down" && sectionActiv.sectPrev.length) {
            scroll(sectionActiv.sectPrev.index());
        }

    }





    $("[data-skroll-btn]").on("click touchstart", function(e) {
        e.preventDefault();
        var elem = $(e.target);

        scroll(elem.attr("data-skroll-btn"));
    });
    $(window).swipe({

        swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
            scrollTo(direction);
        }
    });



});
$(function() {
    $("").on("tap", function() {
        $(this).hide();
    });

});