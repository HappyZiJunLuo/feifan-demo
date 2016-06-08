/**
 * Created by qianduan on 2016/6/3.
 */
angular.module('homeApp',['ui.router'])

    .config(function($stateProvider,$urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
        $stateProvider
            
            .state('home', {
                url:'/home',
                templateUrl:'main.html'
            })

            .state('my-order', {
                url:'/my-order',
                templateUrl:'../my-order/my-order.html'
            })
            
            .state('information', {
                url:'/information/:id',
                templateUrl:'../information/information.html'
            })

            .state('information.menu', {
                url:'/menu',
                templateUrl:'../information/menu.html'
            })

            .state('information.comment', {
                url:'/comment',
                templateUrl:'../information/comment.html'
            })

            .state('information.message', {
                url:'/message',
                templateUrl:'../information/message.html'
            })
    })
    
    .filter('styleFilter',function() {
        return function(obj,_style) {
            var y = [];
            if(_style === 1){
               return obj;
            } else {
                angular.forEach(obj,function(item) {
                    if(item.type ===_style){
                        y.push(item);
                    }
                });
                return y;
            }
        }
    })

    .filter('iPayFilter',function() {
        return function(obj,_isCheck) {
            var newObj;
            if(_isCheck === false){
                return obj;
            } else {
                 newObj = obj.filter(function(item) {
                           return  item.iPay === true;
                        });
                return newObj;
            }
        }
    })

    .filter('iceTeaFilter',function() {
        return function(obj,_check) {
            var newObj;
            if(_check === false){
                return obj;
            } else {
                newObj = obj.filter(function(item) {
                    return  item.iceTea === true;
                });
                return newObj;
            }
        }
    })
        
    
    .controller('homeController',['$scope','$http',function ($scope,$http) {
        
        $http.get("../../resource/data.json").then(function(response){
            // $scope.listData = response.data.lists;
            $scope.showList = response.data.lists;
            $scope.orderData = response.data.orders;
            $scope.styleData = response.data.styles;
            $scope.data = response.data.init[0];
           
        });

         //点击每个餐厅时，切换显示每个餐厅的具体信息
        $scope.change = function(_id) {
            $scope.info = {};
            angular.forEach($scope.showList,function(obj) {
                if(obj.id === _id){
                    $scope.info = obj;
                }
            })
        };

        $scope.selectOrder = function(_way) {

            if (_way === 1) return 'id';
            else if (_way === 2) return '-sales';
            else if (_way === 3) return '-star';
            else if (_way === 4) return 'time';
            else if (_way === 5) return 'send';
        };

        $scope.isCheck = false;
        $scope.selectCanIPay = function () {
            $scope.isCheck = !$scope.isCheck;
        };

        $scope.check = false;
        $scope.selectIceTea = function () {
            $scope.check = !$scope.check;
        };
        
        //由评分数得到一个数组
        $scope.stars = function(_star){
            var array = [];
            for(var i = 0; i < _star; i++){
                 array.push(1);
            }
            // for(var i = _star; i < 5; i++){
            //     array.push(0);
            // }
           return array;
        }

}]);