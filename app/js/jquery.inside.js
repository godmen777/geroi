( function(){

    "use strict";

    $(function(){

        $.each( $( '.quote' ), function() {
            new Sliders ( $( this ) );
        } );

        $.each( $( '.navigation' ), function() {
            new Navigation ( $( this ) );
        } );

    } );

    var Navigation = function( obj ){

        //private properties
        var _obj = obj,
            _subCatalog = _obj.find( '.navigation__item' ),
            _subBtn = _subCatalog.find( 'a' ),
            _site = $( '.site' ),
            _siteHeader = _site.find( '.site__header' ),
            _siteAside = _site.find( '.site__aside' ),
            _featsWrap = _site.find( '.feats' ),
            _navTop = _siteAside.offset().top,
            _window = $( window ),
            _body = $( 'body' );

        //private methods
        var _init = function(){
                _onEvent();
            },
            _onEvent = function(){

                _site.on( 'click', function ( e ) {

                    if ( _subCatalog.hasClass( 'show' )&& $( e.target ).closest( _subCatalog ).length == 0 ){

                        _hideSubMenu();

                    }

                } );

                _subBtn.on( 'click', function () {

                    var curBtn = $( this );

                    if ( curBtn.next().is( 'ul' ) ){

                        var curMenu = curBtn.parents( '.navigation__item' );

                        if ( curMenu.hasClass( 'show' ) ){

                            _hideSubMenu();

                        } else {

                            curMenu.addClass( 'show' );

                            if ( _window.outerWidth() < 768 || _window.outerWidth() >= 1200 ){
                                curMenu.css( 'height', curMenu.outerHeight() + curBtn.next( 'ul' ).outerHeight() )
                            }

                        }

                        return false;

                    }

                } );

                _window.on( 'scroll', function ( ) {

                    if ( _window.outerWidth() >= 1200 ){
                        _checkScroll();
                    }

                } );

            },
            _checkScroll = function( ){

                if ( _window.scrollTop() + _siteHeader.outerHeight() + 10 >= _navTop ){

                    _siteAside.css( {
                        'position': 'fixed',
                        'top': _siteHeader.outerHeight() + 10,
                        'left': _obj.offset().left,
                        'bottom': 'auto',
                        'right': 'auto'
                    } );

                    if ( _featsWrap.offset().top + _featsWrap.outerHeight() <= _siteAside.offset().top + _siteAside.outerHeight() ){
                        _siteAside.css( {
                            'position': 'absolute',
                            'top': 'auto',
                            'bottom': 0,
                            'left': -329,
                            'right': 'auto'
                        } );
                    }

                } else if ( _window.scrollTop() + _siteHeader.outerHeight() + 10 <= _navTop ) {
                    _siteAside.removeAttr( 'style' );
                }

            },
            _hideSubMenu = function () {

                _subCatalog.removeClass( 'show' );

                if ( _window.outerWidth() < 768 || _window.outerWidth() >= 1200 ) {
                    _subCatalog.css('height', 59)
                }

            };

        //public properties

        //public methods

        _init();

    };

    var Sliders = function( obj ) {

        //private properties
        var _obj = obj,
            _quoteSlider = _obj.find( '.quote__slider' ),
            _quoteSlide = _obj.find( '.quote__slide' ),
            _quotePagination = _obj.find( '.quote__pagination' ),
            _quote;

        //private methods
        var _initSlider = function() {

                if ( _quoteSlide.length > 1 ) {

                    _quote = new Swiper ( _quoteSlider, {
                        effect: 'fade',
                        autoplay: 2500,
                        speed: 500,
                        slidesPerView: 1,
                        loop: true,
                        pagination: _quotePagination,
                        paginationClickable: true
                    } );

                }

            },
            _init = function() {
                _initSlider();
            };

        //public properties

        //public methods

        _init();
    };

} )();