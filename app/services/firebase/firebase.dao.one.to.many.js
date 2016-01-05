(function() {

    'use strict';

    angular.module('services.module')
        .factory('firebaseDaoOneToMany', factoryFn);

    factoryFn.$inject = ['firebaseDao', '$log'];

    function factoryFn(firebaseDao, $log) {

        var dao = {
            remove: function(key, feedback) {
                var newData = {};

                // path to child keys in the parent object.
                var path = '/' + key + '/' + this.manyConstant.dao;

                var onNext = function(data) {
                    // add child path to remove.
                    var onChild = function(child) {
                        newData[this.manyConstant.dao + '/' + child.$id] = null;
                    }.bind(this);

                    // for each child path.
                    data.forEach(function(child) {
                        onChild(child);
                    });

                    // add parent path to remove.
                    newData[this.constant.dao + '/' + key] = null;

                    var onComplete = function(error) {
                        if (error) {
                            $log.error(error);
                            feedback.error('Error deleting ' + this.constant.title + '.');
                        } else {
                            feedback.success(this.constant.title + ' deleted successfully.');
                        }
                    }.bind(this);

                    // remove all objects in paths set.
                    this.ref().update(newData, onComplete);
                }.bind(this);

                // get all child objects to be removed.
                this.syncArray(path, feedback, onNext);
            }
        };

        // create the prototype.
        var objectDescriptor = {
            remove: {
                value: dao.remove
            }
        };
        return Object.create(firebaseDao, objectDescriptor);
    }
})();
