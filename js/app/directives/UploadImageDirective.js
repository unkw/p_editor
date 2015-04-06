/**
 * Created by kemal on 20.03.15.
 */
angular.module('editor').directive('uploadImage', function($http, $modal, $parse) {
    return {
        restrict: 'A',

        link: function ($scope, element, attrs) {
            var onHandler = $parse(attrs.uploadImage);

            element.on('click', function() {
                var modalInstance = $modal.open({
                    controller: UploadImageCtrl,
                    templateUrl: 'views/upload-image.html?' + Math.round(Math.random() * 1000000),
                    size: 'lg',
                    windowClass: 'modal-upload'
                });

                modalInstance.result.then(function(url) {
                    onHandler($scope, {url: url});
                });
            });
        }
    };
});

angular.module('editor').directive('uploadImagePreview', function() {
    return {
        restrict: 'A',
        link: function ($scope, element, attrs) {
            $scope.$on('preview:change', function() {
                element.on('load', function() {
                    $scope.cropper = element.imgAreaSelect({
                        x1: 0,
                        y1: 0,
                        x2: element.width(),
                        y2: element.height(),
                        handles: true,
                        onSelectEnd: function(image, selection) {
                            console.log(selection);
                        }
                    });
                    $scope.$apply();
                });
            });
        }
    };
});