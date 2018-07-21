var assert = require('assert');
var Api = require('../src/Api.js');
var MobilityProvider = require('../src/entities/mobilityProvider.js');
var MobileItem = require('../src/entities/mobileItem.js');

describe('ApiTest', function() {
    describe('init', function() {
        it('should return -1 when the value is not present', function() {
            var api = new Api();
            var proposals = api.getProposals(1,1,1,1);
        });
    });
});