// ractive-decorators-selectize tests
// ===============================================

(function () {

	var fixture;

	test( 'Ractive.decorators.selectize is loaded', function ( t ) {
		t.ok( typeof Ractive.decorators.selectize === 'function');
	});

	test( 'Ractive.decorators.selectize has types property', function ( t ) {
		t.ok( Ractive.decorators.selectize.types );
	});
}());
