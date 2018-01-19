var FormValidator = function (obj) {

    //private properties
    var _obj = obj,
        _self = this,
        _inputs = _obj.find( 'input, textarea' ),
        _fields = _obj.find( '[data-required]' ),
        _checkbox = _obj.find( 'input[type=checkbox]' );

    //private methods
    var _init = function () {
            _onEvents();
            _obj[ 0 ].obj = _self;
        },
        _addNotTouchedClass = function () {

            _fields.each( function() {

                var curItem = $(this);

                if( curItem.val() === '' || !curItem.is( ':checked' ) ){

                    curItem.addClass( 'not-touched' );

                    _validateField( curItem );

                }

                if ( curItem.hasClass( 'valid' ) ){
                    curItem.removeClass( 'not-touched' );
                }

            } );

        },
        _onEvents = function () {
            _fields.on( {
                focus: function() {

                    $( this ).removeClass( 'not-touched' );

                },
                focusout: function() {

                    var curItem = $(this);

                    _validateField( curItem );

                },
                keyup: function () {

                    var curItem = $(this);

                    if ( curItem.hasClass( 'not-valid' ) ){
                        _validateField( curItem );
                    }

                }
            } );
            _inputs.on( {
                focusout: function() {

                    var letterCounter = 0;

                    _inputs.each( function () {

                        var curItem = $(this);

                        if ( curItem.val().length > 0 ){
                            letterCounter = letterCounter + 1
                        }

                    } );

                    if ( letterCounter === 0 ) {
                        _inputs.removeClass( 'not-valid' );
                        _self.valid = false;
                    }

                }
            } );
            _obj.on( {
                submit: function() {

                    _addNotTouchedClass();

                    if( !(_fields.filter( '.not-valid' ).length === 0) ) {
                        _self.valid = false;
                    }

                    if( _fields.hasClass( 'not-touched' ) || _fields.hasClass( 'not-valid' ) ) {
                        _obj.find('.not-touched:first').focus();
                        _obj.find('.not-valid:first').focus();
                        _self.valid = false;
                        return false;
                    };

                }
            } );
            _checkbox.on( 'change', function () {

                $( this ).removeClass( 'not-valid not-touched' );

            } );
        },
        _makeNotValid = function ( field ) {
            field.addClass( 'not-valid' );
            field.removeClass( 'valid' );
        },
        _makeValid = function ( field ) {
            field.removeClass( 'not-valid' );
            field.addClass( 'valid' );
        },
        _validateEmail = function ( email ) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        _validateField = function ( field ) {

            var type = field.attr( 'type' ),
                tagName = field[0].tagName;

            if( type === 'email' || type === 'text'  || type === 'tel' ){

                if( field.val() === '' ){
                    _makeNotValid( field );
                    _self.valid = false;
                    return false;
                }

            }

            if( type === 'email' ){
                if( !_validateEmail( field.val() ) ){
                    _makeNotValid( field );
                    _self.valid = false;
                    return false;
                }
            }

            if( type === 'checkbox' ){

                if( !field.is( ':checked' ) ){
                    _makeNotValid( field );
                    _self.valid = false;
                    return false;
                }

            }

            if( tagName.toLocaleLowerCase() == 'textarea' ){

                if( field.val() === '' ){
                    _makeNotValid( field );
                    _self.valid = false;
                    return false;
                }

            }

            _makeValid( field );

            if( _fields.filter( '.not-valid' ).length === 0 ) {

                _self.valid = true;

            }

        };

    //public properties
    _self.valid = false;

    _init();
};