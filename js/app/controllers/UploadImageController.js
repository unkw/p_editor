/**
 * Created by kemal on 06.04.15.
 */
function UploadImageCtrl($scope, $modalInstance) {
    $scope.ok = function() {
        $modalInstance.close($scope.previewUrl);
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };

    $scope.removeCropper = function() {
        if ($scope.cropper) {
            $scope.cropper.imgAreaSelect({remove: true});
        }
    };

    $scope.setPreview = function(url) {
        $scope.$apply(function($scope) {
            $scope.previewUrl = url;
        });

        $scope.$broadcast('preview:change');
    };

    $modalInstance.result.then(function() {
        $scope.removeCropper();
    }, function() {
        $scope.removeCropper();
    });
}
