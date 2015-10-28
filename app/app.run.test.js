// describe("On routeChangeError", function() {

// 	var $rootScope;
// 	var $location;

// 	beforeEach(function() {
// 		module('app', ['ngMock']);
// 	});

// 	beforeEach(inject(function(_$rootScope_, _$location_) {
// 		$rootScope = _$rootScope_;
// 		$location = _$location_;
// 	}));

// 	describe("If error is AUTH_REQUIRED", function() {
// 		it("show login page", function() {});
// 	});
// });

describe("A suite", function() {
	// beforeEach(module('app'));
	// beforeEach(module('app', ['home.module']));
	// beforeEach(module('home.module'));
	beforeEach(module('app', ['ngMaterial',
		'ngMock',
		'templates',
		'rx',
		'components.module',
		'home.module',
		'login.module',
		'services.module',
		'settings.module',
		'vendor.module'
	]));

	it("contains spec with an expectation", function() {
		expect(true).toBe(true);
	});
});
