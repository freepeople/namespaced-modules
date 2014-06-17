'use strict';

describe("DOM Test", function () {
    var el = $('<div></div>');
    var copy = 'Hello World!';
    el.attr('id', 'myDiv').html(copy);
    $('body').append(el);
    var myEl = $('#myDiv');
    it("has the right text", function () {
        (myEl.html()).should.equal("Hello World!");
    });
});