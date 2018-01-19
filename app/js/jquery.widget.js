( function(){

    "use strict";

    window.onload = function () {
        new Widget();
    };

    var Widget = function( obj ) {

        //private properties
        var _body = $( 'body' ),
            _request = new XMLHttpRequest();

        //private methods
        var _ajaxRequest = function() {

                _request = $.ajax( {
                    url: 'php/widget.php',
                    dataType: 'html',
                    type: 'GET',
                    success: function ( data ) {
                        _constructWidget( data );
                    },
                    error: function ( XMLHttpRequest ) {
                        if ( XMLHttpRequest.statusText != "abort" ) {
                            console.log( 'err' );
                        }
                    }
                } );

            },
            _constructWidget = function ( data ) {
                _body.append( data );
                _onEvent();
                _initStyles();
                _initSwiper();

                var _obj = _body.find( '.widget' );

                setTimeout( function () {
                    _obj.removeAttr( 'style' );
                }, 500 );

            },
            _onEvent = function() {

                var _obj = _body.find( '.widget' ),
                    _minimizeBtn = _obj.find( '.widget__minimize' );

                _minimizeBtn.on( 'click', function () {
                    _minimizeWidget( _obj );
                } );

            },
            _minimizeWidget = function ( obj ) {
                obj.addClass( 'minimize' );
                _body.append( '<a href="#" class="widget-open__btn"></a>' );

                var showWidgetBtn = _body.find( '.widget-open__btn' );

                showWidgetBtn.on( 'click', function () {
                    _showWidget( obj, showWidgetBtn );
                } );

            },
            _showWidget = function ( obj, btn ) {
                obj.removeClass( 'minimize' );
                btn.remove();
            },
            _initStyles = function() {

                $( 'head' ).append( '<link rel="stylesheet" href="http://dev.cybers.pro/geroi/css/widget-herous.css" type="text/css" />' );

            },
            _initSwiper = function () {

                var _obj = _body.find( '.widget' ),
                    _widgetSlider = _obj.find( '.widget__slider' ),
                    _widgetPagination = _obj.find( '.widget__pagination' ),
                    _prevBtn = _obj.find( '.widget__prev' ),
                    _nextBtn = _obj.find( '.widget__next' ),
                    _widget;

                _widget = new Swiper ( _widgetSlider, {
                    effect: 'slide',
                    autoplay: 2500,
                    speed: 500,
                    width: 240,
                    slidesPerView: 1,
                    loop: true,
                    shortSwipes: false,
                    pagination: _widgetPagination,
                    paginationClickable: true,
                    prevButton: _prevBtn,
                    nextButton: _nextBtn
                } );

                setTimeout( function () {

                    var _widgetSlide = _widgetSlider.find( '.widget__slide' );

                    _widgetSlide.on( 'click', function () {
                        _ajaxPopupRequest( $( this ).data( 'id' ) );
                    } );

                }, 500 )
            },
            _ajaxPopupRequest = function( id ) {

                _request = $.ajax( {
                    url: 'php/widget-popup.php',
                    data: {
                        id: id
                    },
                    dataType: 'html',
                    type: 'GET',
                    success: function ( data ) {
                        _constructPopup( data );
                    },
                    error: function ( XMLHttpRequest ) {
                        if ( XMLHttpRequest.statusText != "abort" ) {
                            console.log( 'err' );
                        }
                    }
                } );

            },
            _constructPopup = function ( data ) {

                _body.append( data );

                var widgetPopup = _body.find( '.widget-popup' ),
                    widgetPopupCloseBtn = widgetPopup.find( '.widget-popup__close' ),
                    widgetPopupContent = widgetPopup.find( '.widget-popup__content' );

                setTimeout( function () {
                    widgetPopup.removeAttr( 'style' );
                }, 300 );

                widgetPopupContent.niceScroll( {
                    cursorcolor: "#cccaca",
                    cursorwidth: "4px",
                    cursorborder: "0",
                    background: "#e6e6e6",
                    autohidemode: false,
                    zindex: 1000000
                } );

                widgetPopupCloseBtn.on( 'click', function () {
                    widgetPopup.remove();
                } );

            },
            _init = function() {
                _ajaxRequest();
            };

        //public properties

        //public methods

        _init();
    };

} )();