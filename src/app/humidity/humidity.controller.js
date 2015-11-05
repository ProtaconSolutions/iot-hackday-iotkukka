(function() {
  'use strict';

  /**
   * Specify controller for iot.humidity module.
   *
   * @namespace Controllers
   */
  angular
    .module('iot.humidity')
    .controller('humidityController', humidityController)
  ;

  /**
   * @desc      Controller implementation for /humidity route.
   * @namespace humidity
   * @memberOf  Controllers
   * @ngInject
   *
   * @constructor
   */
  function humidityController(_messages, _latest, $scope) {
    var vm = this;

    vm.messages = _messages;
      vm.latest = _latest;
    vm.data = [];
      var firstValue = true;

      var ploo = function(valueNew) {
          angular.forEach(valueNew, function(value){
              console.log(value.humidity);

              vm.data.push(
                  parseInt(value.humidity)
              );
          });
      };

      _messages.$loaded(function (data) {
          ploo(data);
                $scope.$watch('vm.latest', function (valueNew, valueOld) {
                    if (firstValue != true) {
                    ploo(valueNew);
                    vm.data.shift();
                    }
                    firstValue = false;
                }, true);
      });

    //This is not a highcharts object. It just looks a little like one!
    vm.chartConfig = {

      options: {
        //This is the Main Highcharts chart config. Any Highchart options are valid here.
        //will be overriden by values specified below.
        chart: {
          type: 'line'
        },
        tooltip: {
          style: {
            padding: 10,
            fontWeight: 'bold'
          }
        }
      },
      //The below properties are watched separately for changes.

      //Series object (optional) - a list of series using normal highcharts series options.
      series: [{
        data: vm.data //[10, 15, 12, 8, 7]
      }],
      //Title configuration (optional)
      title: {
        text: 'Hello'
      },
      //Boolean to control showng loading status on chart (optional)
      //Could be a string if you want to show specific loading text.
      loading: false,
      //Configuration for the xAxis (optional). Currently only one x axis can be dynamically controlled.
      //properties currentMin and currentMax provied 2-way binding to the chart's maximum and minimum
      xAxis: {
        //currentMin: 0,
        //currentMax: 20,
        title: {text: 'values'}
      },
      //Whether to use HighStocks instead of HighCharts (optional). Defaults to false.
      useHighStocks: false,
      //size (optional) if left out the chart will default to size of the div or something sensible.
      size: {
        width: 400,
        height: 300
      },
      turboThreshold: true,
      //function (optional)
      func: function (chart) {
        //setup some logic for the chart
      }
    };
  }
})();
