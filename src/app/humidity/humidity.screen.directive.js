(function() {
  'use strict';

  // Module initialization
  angular
    .module('iot.humidity')
    .directive('humidityScreen', humidityScreen)
  ;

  // Directive dependencies
  humidityScreen.$inject = ['$window', '$timeout'];

  /**
   * Actual directive code.
   *
   * @param   {$window}   $window
   * @param   {$timeout}  $timeout
   * @returns {{
   *    link: function,
   *    restrict: string
   *  }}
   * @ngInject
   */
  function humidityScreen($window, $timeout) {
    return {
      link: link,
      restrict: 'A'
    };

    //noinspection JSUnusedLocalSymbols
    /**
     * Linker function for 'humidityScreen' directive.
     *
     * @param {$scope}    scope
     * @param {$element}  element
     */
    function link(scope, element) {
      // Initialize height values
      var heightHeader = 0;
      var heightFooter = 0;
      var heightTotal = 0;

      // Function to make actual humidity screen resize
      function resize() {
        $timeout(function onTimeout() {
          heightHeader = document.getElementById('header').offsetHeight;
          heightFooter = document.getElementById('footer').offsetHeight;
          heightTotal =  $window.innerHeight - heightHeader - heightFooter - 70;

          angular.element(element).css('height', heightTotal + 'px');
        });
      }

      // Bind resize to window resize event
      angular.element($window).bind('resize', function onEvent() {
        resize();
      });

      // And on initialize resize screen
      resize();
    }
  }
})();
