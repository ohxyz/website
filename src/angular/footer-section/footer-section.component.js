/* START: Footer section */
angular.module( 'footerSection', [] );

angular
    .module( 'footerSection' )
    .component( 'footerSection', {
        
        template: 
        
            '<footer>' +
                '<section id="footer-content" class="section-box">' +
                    '<div class="like">Like Winston?</div>' +
                    '<div class="then">Join me in competitive play of Overwatch. Let\'s group up!</div>' +
                    '<div class="like">Like this website?</div>' +
                    '<div class="then">Email me about what you think and leave your phone number, I\'ll give you a call back.</div>' +
                    '<div id="email">ohxyzcom@gmail.com</div>' +
                    '<div id="address">Melbourne VIC Australia</div>' +
                    '<div id="winston-abilities">' +
                        '<div id="tesla-canon" class="ability"></div>' +
                        '<div id="jump-pack" class="ability"></div>' +
                        '<div id="barrier-projector" class="ability"></div>' +
                        '<div id="primal-rage" class="ability"></div>' +
                    '</div>' +
                '</section>' +
            '</footer>'

    } );
/* END: Footer section */