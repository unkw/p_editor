/**
 * Created by kemal on 20.03.15.
 */
angular.module('editor').directive('uploader', function($http, $parse) {
    return {
        restrict: 'A',

        link: function ($scope, element, attrs) {
            var onloadHandler = $parse(attrs.uploader);

            element.children('input').on('change', function() {
                var file = element.children('input').get(0).files[0];
                var reader = new FileReader();

                reader.onload = function() {
                    onloadHandler($scope, {url: reader.result});
                };

                if (file) {
                    reader.readAsDataURL(file);
                }
            });
        }
    };
});