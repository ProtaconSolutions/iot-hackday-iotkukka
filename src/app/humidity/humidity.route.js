(function() {
  'use strict';

  /**
   * Specify run block for iot.humidity module.
   *
   * @namespace Routes
   */
  angular
    .module('iot.humidity')
    .run(moduleRun)
  ;

  /**
   * @desc      Run block for iot.humidity module.
   * @namespace humidity
   * @memberOf  Routes
   * @ngInject
   *
   * @param {Providers.RouterHelper}  routerHelper
   */
  function moduleRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  /**
   * @name      getStates
   * @desc      Getter method for iot.humidity module route definitions.
   * @memberOf  Routes.humidity
   *
   * @returns {*[]}
   */
  function getStates() {
    return [
      {
        state: 'humidity',
        config: {
          url: '/humidity',
          parent: 'iot',
          title: 'humidity',
          containerClass: 'humidity-container',
          views: {
            'content@': {
              templateUrl: '/iot/humidity/humidity.html',
              controller: 'humidityController',
              controllerAs: 'vm',
              resolve: {
                _messages: _messages,
                _latest: _latest
              }
            }
          }
        }
      }
    ];
  }

  /**
   * @name      _messages
   * @desc      '_messages' resolve function.
   * @memberOf  Routes.humidity
   * @ngInject
   *
   * @param   {AngularFireArrayService} $firebaseArray
   * @param   {Factories.Dataservice}   dataservice
   * @returns {ng.IPromise<TResult>}
   * @private
   */
  function _messages($firebaseArray, dataservice) {
    var ref = dataservice.getReference('humidity');

    // create a query for the most recent 25 messages on the server
    var query = ref.limitToLast(10);
    // the $firebaseArray service properly handles database queries as well
    return  $firebaseArray(query);
  }

  function _latest($firebaseArray, dataservice) {
    var ref = dataservice.getReference('humidity');

    // create a query for the most recent 25 messages on the server
    var query = ref.limitToLast(1);
    // the $firebaseArray service properly handles database queries as well
    return  $firebaseArray(query);
  }
})();
