angular.module('editor').directive('shortcut', [
    '$document',
    function($document) {
        return {
            restrict: 'A',
            link: function($scope) {
                $document.on('keydown', function(e) {
                    console.log('keydown: ' + e.which);
                    switch (e.which) {
                        // Escape
                        case 27:
                            $scope.discardSelected();
                            break;
                        // Delete
                        case 46:
                            $scope.removeSelected();
                            break;
                        default:
                    }
                });
            }
        };
    }
]);