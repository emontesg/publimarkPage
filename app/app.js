'use strict';

// Declare app level module which depends on views, and components
angular.module('publimark', [
    'ngRoute',
    'contentful',
    'slickCarousel',
    'djds4rce.angular-socialshare',
    'publimark.home',
    'publimark.knockouts',
    'publimark.nosotros',
    'publimark.retadores',
    'publimark.tinta',
    'publimark.hablemos',
    'publimark.knock',
    'publimark.tint'
]).
config(['$locationProvider', '$routeProvider', 'contentfulProvider', function($locationProvider,$routeProvider,contentfulProvider) {
  contentfulProvider.setOptions({
      accessToken: '33f990e8a01c558fbc294db6f9311418379c2438c7af88eb0e26bc6334390d96',
      space: 'j9xcq3o5quas'
  });
  //$locationProvider.hashPrefix('!');
  $locationProvider.html5Mode(true).hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/'});

}])
    .run(['$rootScope','contentful','$FB',function ($rootScope,contentful,$FB) {

          console.log('start');
          $FB.init('1674036709319756');
          $rootScope.openNav = function(){
            $('#toggle').toggleClass('active');
            $('#overlay').toggleClass('open');
          }
          $rootScope.toTop = function(){
            $('html,body').animate({
              scrollTop: $("body").offset().top},
              'slow');
          }
          angular.element(document).ready(function () {

          $('.slideTinta').slick({
            slidesToShow: 3,
            arrows: true,
            doots: true
          });
          $('.retadores').slick({
            slidesToShow: 5,
            arrows: true,
            doots: true,
            prevArrow: $('.prev'),
            nextArrow: $('.next')
          });
          });

      }]);
