suite('Argle', function () {

    require('./argle.test');

    if (Number(process.versions.node.split('.')[0] || 0) > 4) {
        require('./argle.test.es6');
    }

});
