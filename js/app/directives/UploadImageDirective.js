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
                    },
                    templateUrl: 'views/upload-image.html',
                    size: 'lg'
                });

                modalInstance.result.then(function(url) {
                    onHandler($scope, {url: url});
                });
            });
        }
    };
});

angular.module('editor').directive('uploadImagePreview', function($rootScope) {
    return {
        restrict: 'A',
        scope: {
            preview: "=uploadImagePreview"
        },

        link: function ($scope, element, attrs) {

            function renderPreview(url) {
                input.remove();
                $scope.$apply(function($scope) {
                    $scope.preview = url;
                });
            }

            $scope.preview = null;

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