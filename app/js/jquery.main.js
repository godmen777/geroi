( function(){

    "use strict";

    $(function(){

        $.each( $( '.menu' ), function() {
            new Menu ( $( this ) );
        } );

        $.each( $( '.site__header' ), function() {
            new Header ( $( this ) );
        } );

        $.each( $( '.place' ), function() {
            new Place ( $( this ) );
        } );

    } );

    var Menu = function( obj ) {

        //private properties
        var _obj = obj,
            _mobileBtn = $( '.menu-mobile-btn' ),
            _closeBtn = _obj.find( '.menu-close-btn' ),
            _body = $( 'body' ),
            _site = _body.find( '.site' ),
            _siteHead = _site.find( '.site__header' ),
            _window = $( window ),
            _position = 0;

        //private methods
        var _onEvent = function() {

                _mobileBtn.on( 'click', function () {
                    _showMobileMenu();
                    return false;
                } );

                _closeBtn.on( 'click', function () {
                    _hideMobileMenu();
                    return false;
                } );

            },
            _hideMobileMenu = function () {

                _obj.removeClass( 'show' );

                _body.removeAttr( 'style' );
                _site.removeAttr( 'style' );
                _siteHead.removeClass( 'open-menu' );

                _window.scrollTop( _position );

            },
            _showMobileMenu = function () {

                _obj.addClass( 'show' );

                _position = _window.scrollTop();

                _body.css( 'overflow-y', 'hidden' );

                _site.css( {
                    'position': 'relative',
                    'top': _position * -1
                } );

                _siteHead.addClass( 'open-menu' );

            },
            _init = function() {
                _onEvent();
            };

        //public properties

        //public methods

        _init();
    };

    var Header = function( obj ) {

        //private properties
        var _obj = obj,
            _hero = $( '.hero' ),
            _heroBottomSet = 0,
            _headerBottomSet = 0,
            _window = $( window );

            if ( _hero.length > 0 ){

                _heroBottomSet = _hero.offset().top + _hero.outerHeight();
                _headerBottomSet = _obj.offset().top + _obj.outerHeight();

            }

        //private methods
        var _onEvent = function() {

                _window.on( 'scroll', function () {
                    _checkScroll();
                } );

            },
            _checkScroll = function () {

                if ( _headerBottomSet * 5 < _window.scrollTop() && _window.scrollTop() < _heroBottomSet ){
                    _hideHeader();
                } else if ( _window.scrollTop() > _heroBottomSet ) {
                    _fixedHeader();
                } else {
                    _headerOnTop();
                }

            },
            _hideHeader = function () {
                _obj.addClass( 'hide' );
            },
            _fixedHeader = function () {
                _obj.addClass( 'fixed' );
                _obj.removeClass( 'hide' );
            },
            _headerOnTop = function () {
                _obj.removeClass( 'hide' );
                _obj.removeClass( 'fixed' );
            },
            _init = function() {
                _onEvent();
                _checkScroll();
            };

        //public properties

        //public methods

        _init();
    };

    var Place = function( obj ) {

        //private properties
        var _obj = obj,
            _curCity = _obj.find( '.place__current' ),
            _citiesPopup = _obj.find( '.place__popup' ),
            _citiesWrap = _citiesPopup.find( '.place__cities' ),
            _listCountries = _citiesPopup.find( '.place__countries' ),
            _countriesSlide = _listCountries.find( '.swiper-slide' ),
            _listCountryItem = _listCountries.find( '.place__countries-item' ),
            _closePopup = _citiesPopup.find( '.place__popup-close' ),
            _body = $( 'body' ),
            _site = $( '.site' ),
            _siteHead = _site.find( '.site__header' ),
            _window = $( window ),
            _position = 0,
            _swiperCountries,
            _request = new XMLHttpRequest();

        //private methods
        var _onEvent = function() {

                _site.on( 'click', function ( e ) {
                    if ( _obj.hasClass( 'show' ) && $( e.target ).closest( _obj ).length == 0 && _window.width() <= 1200 ){
                        _hidePopupOnMobile();
                    }
                } );

                _curCity.on( 'click', function () {

                    if ( !_siteHead.hasClass( 'open-menu' ) ) {
                        _showPopupOnMobile();
                    }

                } );

                _closePopup.on( 'click', function () {
                    _hidePopupOnMobile();
                    return false;
                } );

                _listCountryItem.on( 'click', function () {

                    var cutCountry = $( this );

                    _ajaxRequest( cutCountry );

                    _listCountryItem.removeClass( 'active' );
                    cutCountry.addClass( 'active' );

                    return false;
                } );

            },
            _ajaxRequest = function( countryObj ) {

                var cutCountry = countryObj,
                    cutCountryId = cutCountry.data( 'country' );

                _request = $.ajax( {
                    url: 'php/city.geo.php',
                    data: {
                        country_id: cutCountryId
                    },
                    dataType: 'json',
                    type: 'GET',
                    success: function ( data ) {
                        _constructData( data );
                    },
                    error: function ( XMLHttpRequest ) {
                        if ( XMLHttpRequest.statusText != "abort" ) {
                            console.log( 'err' );
                        }
                    }
                } );

            },
            _checkActiveTab = function () {

                if ( _listCountryItem.filter( 'active' ).length == 0 ){

                    _listCountryItem.eq( 0 ).trigger( 'click' );

                }

            },
            _constructData = function ( data ) {

                _citiesWrap.empty();

                $.each( data, function ( i ) {

                    var list = $( '<dl></dl>' );

                    for ( var n = 0; n < data.length; n++ ) {

                        list.append( '<dt>'+ data[ i ][ n ].group +'</dt>' );
                        list.append( _appendCities( data[ i ][ n ].city ) );

                    };

                    _citiesWrap.append( list );

                } );

            },
            _appendCities = function ( data ) {

                var list = $( '<dd></dd>' );

                for ( var i = 0; i < data.length; i++ ) {

                    list.append( '<a href="'+ data[ i ].link +'">'+ data[ i ].name  +'</a>' );

                };

                return list;

            },
            _getScrollWidth = function (){
                var scrollDiv = document.createElement( 'div'),
                    scrollBarWidth;

                scrollDiv.className = 'place__scrollbar-measure';

                document.body.appendChild( scrollDiv );

                scrollBarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

                document.body.removeChild(scrollDiv);

                return scrollBarWidth;
            },
            _showPopupOnMobile = function () {

                _obj.addClass( 'show' );

                _position = _window.scrollTop();

                var headerRightPadding = +( _siteHead.css( 'padding-right' ).replace( 'px', '' ) ),
                    headerLeftPadding = +( _siteHead.css( 'padding-left' ).replace( 'px', '' ) );

                _body.css( 'overflow-y', 'hidden' );

                _site.css( {
                    'position': 'relative',
                    'top': _position * -1
                } );

                _siteHead.addClass( 'open-menu' );

                if ( _window.outerWidth() >= 768 ){

                    _siteHead.css( {
                        'padding-left': headerLeftPadding,
                        'padding-right': headerRightPadding + _getScrollWidth()
                    } );

                    _citiesPopup.css( {
                        'padding-left': headerLeftPadding,
                        'padding-right': headerRightPadding + _getScrollWidth() + 17
                    } );

                    _closePopup.css( 'right', headerRightPadding + _getScrollWidth() );

                }

                _citiesWrap.niceScroll( {
                    cursorcolor: "#2f2f2f",
                    cursorwidth: "4px",
                    cursorborder: "0",
                    background: "#1a1a1a",
                    autohidemode: false
                } );

            },
            _hidePopupOnMobile = function () {

                _obj.removeClass( 'show' );

                _body.removeAttr( 'style' );
                _site.removeAttr( 'style' );
                _siteHead.removeClass( 'open-menu' );
                _siteHead.removeAttr( 'style' );

                console.log( _position )

                _window.scrollTop( _position );

                _citiesWrap.niceScroll( 'destroy' );

            },
            _initScheduleScroll = function () {

                if ( _countriesSlide.outerWidth() > _listCountries.outerWidth() ) {

                    _swiperCountries = new Swiper( _listCountries, {
                        direction: 'horizontal',
                        slidesPerView: 'auto',
                        freeMode: true,
                        mousewheel: true
                    } );

                }

            },
            _init = function() {
                _onEvent();
                _checkActiveTab();
                _initScheduleScroll();
            };

        //public properties

        //public methods

        _init();
    };

} )();