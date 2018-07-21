var assert = require('assert');
var Api = require('../src/Api.js');
var MobilityProvider = require('../src/entities/mobilityProvider.js');
var MobileItem = require('../src/entities/mobileItem.js');

describe('ApiTest', function() {
    describe('init', function() {
        var provider1 = new MobilityProvider("abc");
        var provider2 = new MobilityProvider("abc");

        for(var i = 1; i <= 2; i++) {
            for(var j = 1; j <= 2; j++) {
                var lat = i;
                var long = j;
                var mobileItem = new MobileItem(1+1/(lat*10), 1+1/(long*10));

                if(j % 2 == 0) {
                    provider1.addMobileItem(mobileItem);
                } else {
                    provider2.addMobileItem(mobileItem);
                }
            }
        }

        it('It works', function() {
            var api = new Api();
            api.mobilityProviders = [provider1, provider2];
            var proposals = api.getProposals(1,1,1.1,1.1);
        });
    });
});