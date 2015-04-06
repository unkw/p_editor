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
                    controller: function($scope, $modalInstance) {
                        $scope.ok = function() {
                            $modalInstance.close($scope.previewImage);
                        };

                        $scope.cancel = function() {
                            $modalInstance.dismiss('cancel');
                        };

                        $scope.removeCropper = function() {
                            if ($scope.cropper) {
                                $scope.cropper.imgAreaSelect({remove: true});
                            }
                        };

                        $modalInstance.result.then(function() {
                            $scope.removeCropper();
                        }, function() {
                            $scope.removeCropper();
                        });
                    },
                    templateUrl: 'views/upload-image.html?' + Math.round(Math.random() * 1000000),
                    size: 'lg',
                    windowClass: 'modal-upload'
                });

                modalInstance.result.then(function(url) {
                    onHandler($scope, {url: url});
                });

                modalInstance.close();
            });
        }
    };
});

angular.module('editor').directive('uploadImagePreview', function() {
    return {
        restrict: 'A',
        scope: {
            preview: '=uploadImagePreview',
            cropper: '='
        },

        link: function ($scope, element, attrs) {

            function renderPreview(url) {
                input.remove();
                $scope.$apply(function($scope) {
                    $scope.preview = url;
                });

                image.on('load', function() {
                    $scope.cropper = image.imgAreaSelect({
                        x1: 0,
                        y1: 0,
                        x2: image.width(),
                        y2: image.height(),
                        handles: true,
                        onSelectEnd: function(img, selection) {
                            console.log(selection);
                        }
                    });
                    $scope.$apply();
                });
            }

            var image = element.find('img');
            var input = element.find('input').on('change', function() {
                var file = input.get(0).files[0];
                var reader = new FileReader();

                reader.onload = function() {
                    renderPreview(reader.result);
                    input.val('');
                };

                if (file) {
                    reader.readAsDataURL(file);
                }
            });

        }
    };
});