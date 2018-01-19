( function(){

    "use strict";

    $(function(){

        $.each( $( '.hero, .gratitude' ), function() {
            new Sliders ( $( this ) );
        } );

        $.each( $( '.schedule__month' ), function() {
            new Schedule ( $( this ) );
        } );

        $.each( $( '.subscribe' ), function() {
            new SubscribeForm ( $( this ) );
        } );

        $.each( $( '.popup__add' ), function() {
            new AddForm ( $( this ) );
        } );

        $.each( $( '.popup__event' ), function() {
            new EventForm ( $( this ) );
        } );

        $.each( $( '.popup__help' ), function() {
            new HelpForm ( $( this ) );
        } );

        $.each( $( '.popup__volunteer' ), function() {
            new VolunteerForm ( $( this ) );
        } );

    });

    var Schedule = function( obj ) {

        //private properties
        var _obj = obj,
            _now = new Date(),
            _currentYear = _now.getFullYear(),
            _currentMonth = _now.getMonth(),
            _options = { month: 'long' },
            _monthTitle = _obj.find( '.schedule__month-name' ),
            _monthDaysWrap = _obj.find( '.schedule__month-days' ),
            _monthDaysSlide = _monthDaysWrap.find( '.swiper-slide' ),
            _scrollDays = _monthDaysWrap.find( '.schedule__month-scrollbar' ),
            _schedulePlan = _obj.find( '.schedule__plan' ),
            _schedulePlanSlide = _schedulePlan.find( '.schedule__plan-slide' ),
            _scrollSchedule = _schedulePlan.find( '.schedule__plan-scrollbar' ),
            _dateBtn, _swiperSchedule, _swiperCalendar,
            _window = $( window ),
            _request = new XMLHttpRequest();

        //private methods
        var _ajaxRequest = function( year, month, date ) {

                _request = $.ajax( {
                    url: 'php/schedule.php',
                    data: {
                        year: year,
                        month: month,
                        date: date
                    },
                    dataType: 'json',
                    type: 'GET',
                    success: function ( data ) {

                        _loadData( data );

                    },
                    error: function ( XMLHttpRequest ) {
                        if ( XMLHttpRequest.statusText != "abort" ) {
                            console.log( 'err' );
                        }
                    }
                } );

            },
            _initCalendarScroll = function () {

                _swiperCalendar = new Swiper( _monthDaysWrap, {
                    direction: 'horizontal',
                    slidesPerView: 'auto',
                    freeMode: true,
                    scrollbar: _scrollDays,
                    mousewheel: true
                } );

            },
            _getLocalDay = function ( date ) {

                var day = date.getDay();

                if ( day == 0 ) {
                    day = 7;
                }

                return day;

            },
            _getLastDayOfMonth = function ( year, month ) {
                var date = new Date( year, month + 1, 0 );
                return date.getDate();
            },
            _setCalendar = function () {

                _monthTitle.text( _now.toLocaleString( "ru", _options ) );

                for ( var i = 1; i <= _getLastDayOfMonth( _currentYear, _currentMonth ); i++ ) {

                    var weekDay =  _getLocalDay( new Date( _currentYear, _currentMonth, i ) );

                    if ( weekDay == 6 || weekDay == 7 ) {
                        _monthDaysSlide.append( '<a href="#" class="weekend">'+ i +'</a>' );
                    } else {
                        _monthDaysSlide.append( '<a href="#">'+ i +'</a>' );
                    }

                }

                _dateBtn = _monthDaysSlide.find( 'a' );

                _onEvent();

                _dateBtn.eq( _now.getDate() ).addClass( 'today' ).trigger( 'click' );

                if ( _window.outerWidth() < 1170 ){

                    _initCalendarScroll();

                }

            },
            _loadData = function ( data ) {

                _schedulePlanSlide.empty();

                if ( _swiperSchedule != undefined ){
                    _schedulePlan[ 0 ].swiper.destroy( false, true );
                }

                var arr = data.items,
                    number = arr.length;

                if ( number > 0 ){

                    for ( var i = 0; i < number; i++ ){

                        _schedulePlanSlide.append( '<a href="'+ arr[i].link +'" class="schedule__plan-item">'+ arr[i].title +'</a>' );

                    }
                    _scrollSchedule.removeAttr( 'style' );
                    _initScheduleScroll();

                } else {

                    _schedulePlanSlide.html( '<div class="schedule__plan-item empty">Сегодня событий нет</div>' );
                    _scrollSchedule.css( 'visibility', 'hidden' )

                }

            },
            _initScheduleScroll = function () {

                _swiperSchedule = new Swiper( _schedulePlan, {
                    direction: 'horizontal',
                    slidesPerView: 'auto',
                    freeMode: true,
                    scrollbar: _scrollSchedule,
                    mousewheel: true
                } );

            },
            _onEvent = function() {

                _dateBtn.on( 'click', function () {

                    var curElem = $( this );

                    _dateBtn.removeClass( 'active' );
                    curElem.addClass( 'active' );

                    _ajaxRequest( _currentYear, _currentMonth, curElem.text() );

                    return false;

                } );

            },
            _init = function() {
                _setCalendar();
            };

        //public properties

        //public methods

        _init();
    };

    var Sliders = function( obj ) {

        //private properties
        var _obj = obj,
            _heroSlider = _obj.find( '.hero__slider' ),
            _gratitudeSlider = _obj.find( '.gratitude__list' ),
            _heroSlide = _heroSlider.find( '.hero__slide' ),
            _heroPagination = _obj.find( '.hero__pagination' ),
            _gratitudePagination = _obj.find( '.gratitude__pagination' ),
            _hero,
            _gratitude;

        //private methods
        var _initSlider = function() {

                if ( _heroSlide.length > 1 ) {

                    _hero = new Swiper ( _heroSlider, {
                        effect: 'slide',
                        autoplay: 2500,
                        speed: 500,
                        slidesPerView: 1,
                        loop: true,
                        pagination: _heroPagination,
                        paginationClickable: true
                    } );

                }

                _gratitude = new Swiper ( _gratitudeSlider, {
                    effect: 'fade',
                    autoplay: 2000,
                    speed: 500,
                    slidesPerView: 1,
                    loop: true,
                    pagination: _gratitudePagination,
                    paginationClickable: true
                } );

            },
            _init = function() {
                _initSlider();
            };

        //public properties

        //public methods

        _init();
    };

    var SubscribeForm = function( obj ){

        //private properties
        var _obj = obj,
            _emailFielder = _obj.find( 'input[type=email]' ),
            _btn = _obj.find( 'button' ),
            _successMessage = _obj.find( '.subscribe__success' ),
            _validation = new FormValidator( _obj );

        //private methods
        var _init = function(){
                _onEvent();
            },
            _onEvent = function(){

                _obj.on( 'submit', function () {

                    if ( _validation.valid == true ) {
                        _ajaxSend();
                    }

                    return false;

                } );

            },
            _ajaxSend = function(){

                $.ajax( {
                    url: 'php/sender.php',
                    dataType: 'html',
                    timeout: 20000,
                    type: "POST",
                    data: {
                        email: _emailFielder.val()
                    },
                    success: function () {

                        _showSuccessMessage();

                    },
                    error: function (XMLHttpRequest) {
                        if (XMLHttpRequest.statusText != 'abort') {
                            alert(XMLHttpRequest.statusText);
                        }
                    }
                } );
                return false;

            },
            _showSuccessMessage = function () {

                _successMessage.addClass( 'show' );

                _obj[0].reset();

                setTimeout( function () {
                    _successMessage.removeClass( 'show' );
                }, 4000 );

            };

        //public properties

        //public methods

        _init();

    };

    var AddForm = function( obj ){

        //private properties
        var _obj = obj,
            _emailFielder = _obj.find( 'input[type=email]' ),
            _urlFielder = _obj.find( 'input[type=text]' ),
            _messageFielder = _obj.find( 'textarea' ),
            _btn = _obj.find( 'button' ),
            _successMessage = _obj.find( '.popup__success' ),
            _validation = new FormValidator( _obj );

        //private methods
        var _init = function(){
                _onEvent();
            },
            _onEvent = function(){

                _obj.on( 'submit', function () {

                    if ( _validation.valid == true ) {
                        _ajaxSend();
                    }

                    return false;

                } );

            },
            _ajaxSend = function(){

                $.ajax( {
                    url: 'php/sender.php',
                    dataType: 'html',
                    timeout: 20000,
                    type: "POST",
                    data: {
                        email: _emailFielder.val(),
                        url: _urlFielder.val(),
                        message: _messageFielder.val()
                    },
                    success: function () {

                        _showSuccessMessage();

                    },
                    error: function (XMLHttpRequest) {
                        if (XMLHttpRequest.statusText != 'abort') {
                            alert(XMLHttpRequest.statusText);
                        }
                    }
                } );
                return false;

            },
            _showSuccessMessage = function () {

                _successMessage.addClass( 'show' );

                _obj[0].reset();

                setTimeout( function () {
                    $( '.popup' )[0].obj.close(0);

                    setTimeout( function () {
                        _successMessage.removeClass('show');
                    }, 300 );

                }, 2000 );

            };

        //public properties

        //public methods

        _init();

    };

    var EventForm = function( obj ){

        //private properties
        var _obj = obj,
            _emailFielder = _obj.find( 'input[type=email]' ),
            _urlFielder = _obj.find( 'input[type=text]' ),
            _messageFielder = _obj.find( 'textarea' ),
            _btn = _obj.find( 'button' ),
            _successMessage = _obj.find( '.popup__success' ),
            _validation = new FormValidator( _obj );

        //private methods
        var _init = function(){
                _onEvent();
            },
            _onEvent = function(){

                _obj.on( 'submit', function () {

                    if ( _validation.valid == true ) {
                        _ajaxSend();
                    }

                    return false;

                } );

            },
            _ajaxSend = function(){

                $.ajax( {
                    url: 'php/sender.php',
                    dataType: 'html',
                    timeout: 20000,
                    type: "POST",
                    data: {
                        email: _emailFielder.val(),
                        palce: _urlFielder.val(),
                        message: _messageFielder.val()
                    },
                    success: function () {

                        _showSuccessMessage();

                    },
                    error: function (XMLHttpRequest) {
                        if (XMLHttpRequest.statusText != 'abort') {
                            alert(XMLHttpRequest.statusText);
                        }
                    }
                } );
                return false;

            },
            _showSuccessMessage = function () {

                _successMessage.addClass( 'show' );

                _obj[0].reset();

                setTimeout( function () {
                    $( '.popup' )[0].obj.close(0);

                    setTimeout( function () {
                        _successMessage.removeClass('show');
                    }, 300 );

                }, 2000 );

            };

        //public properties

        //public methods

        _init();

    };

    var HelpForm = function( obj ){

        //private properties
        var _obj = obj,
            _emailFielder = _obj.find( 'input[type=email]' ),
            _urlFielder = _obj.find( 'input[type=text]' ),
            _messageFielder = _obj.find( 'textarea' ),
            _btn = _obj.find( 'button' ),
            _successMessage = _obj.find( '.popup__success' ),
            _validation = new FormValidator( _obj );

        //private methods
        var _init = function(){
                _onEvent();
            },
            _onEvent = function(){

                _obj.on( 'submit', function () {

                    if ( _validation.valid == true ) {
                        _ajaxSend();
                    }

                    return false;

                } );

            },
            _ajaxSend = function(){

                $.ajax( {
                    url: 'php/sender.php',
                    dataType: 'html',
                    timeout: 20000,
                    type: "POST",
                    data: {
                        email: _emailFielder.val(),
                        palce: _urlFielder.val(),
                        message: _messageFielder.val()
                    },
                    success: function () {

                        _showSuccessMessage();

                    },
                    error: function (XMLHttpRequest) {
                        if (XMLHttpRequest.statusText != 'abort') {
                            alert(XMLHttpRequest.statusText);
                        }
                    }
                } );
                return false;

            },
            _showSuccessMessage = function () {

                _successMessage.addClass( 'show' );

                _obj[0].reset();

                setTimeout( function () {
                    $( '.popup' )[0].obj.close(0);

                    setTimeout( function () {
                        _successMessage.removeClass('show');
                    }, 300 );

                }, 2000 );

            };

        //public properties

        //public methods

        _init();

    };

    var VolunteerForm = function( obj ){

        //private properties
        var _obj = obj,
            _emailFielder = _obj.find( 'input[type=email]' ),
            _urlFielder = _obj.find( 'input[type=text]' ),
            _messageFielder = _obj.find( 'textarea' ),
            _btn = _obj.find( 'button' ),
            _successMessage = _obj.find( '.popup__success' ),
            _validation = new FormValidator( _obj );

        //private methods
        var _init = function(){
                _onEvent();
            },
            _onEvent = function(){

                _obj.on( 'submit', function () {

                    if ( _validation.valid == true ) {
                        _ajaxSend();
                    }

                    return false;

                } );

            },
            _ajaxSend = function(){

                $.ajax( {
                    url: 'php/sender.php',
                    dataType: 'html',
                    timeout: 20000,
                    type: "POST",
                    data: {
                        email: _emailFielder.val(),
                        palce: _urlFielder.val(),
                        message: _messageFielder.val()
                    },
                    success: function () {

                        _showSuccessMessage();

                    },
                    error: function (XMLHttpRequest) {
                        if (XMLHttpRequest.statusText != 'abort') {
                            alert(XMLHttpRequest.statusText);
                        }
                    }
                } );
                return false;

            },
            _showSuccessMessage = function () {

                _successMessage.addClass( 'show' );

                _obj[0].reset();

                setTimeout( function () {
                    $( '.popup' )[0].obj.close(0);

                    setTimeout( function () {
                        _successMessage.removeClass('show');
                    }, 300 );

                }, 2000 );

            };

        //public properties

        //public methods

        _init();

    };

} )();