'use strict';

describe('Tooltip Module', function () {
    describe("Instantiation Test", function () {
        var $selector = $('#hoverTip');
        var Tooltip = window.FP.Tooltip;
        var tt = new Tooltip($selector);
        it("should be an instance of Tooltip", function () {
            (tt).should.be.an.instanceOf(Tooltip);
        });
    });

    describe("Settings Test", function () {
        var $selector = $('#clickTip');
        var Tooltip = window.FP.Tooltip;
        var tt = new Tooltip($selector);
        var originalSettings = tt.settings;
        tt.getSettings();
        var mergedSettings = tt.settings;
        it("original settings should not equal merged settings", function () {
            (originalSettings).should.not.equal(mergedSettings);
        });
    });

    describe("Create Tip Test", function () {
        var $selector = $('#clickTip');
        var Tooltip = window.FP.Tooltip;
        var tt = new Tooltip($selector);
        tt.getSettings();
        tt.createTip();
        it("body should have a tooltip child element", function () {
            ($('.tooltip').length).should.equal(1);
        });
    });

    describe("Tooltip Open Test", function () {
        var $selector = $('#hoverTip');
        var Tooltip = window.FP.Tooltip;
        var tt = new Tooltip($selector);
        tt.getSettings();
        tt.openTip();
        it("Tooltip should have .is-open class", function () {
            ($('.tooltip').hasClass('is-open')).should.equal(true);
        });
    });

    describe("Tooltip Close Test", function () {
        var $selector = $('#hoverTip');
        var Tooltip = window.FP.Tooltip;
        var tt = new Tooltip($selector);
        tt.getSettings();
        tt.openTip();
        it("Tooltip should NOT have .is-open class", function () {
            tt.closeTip();
            (!$('.tooltip').hasClass('is-open')).should.equal(true);
        });
    });
});