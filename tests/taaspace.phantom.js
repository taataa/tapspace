/*jshint expr: true*/ // prevent error in ...be.a.Function

describe('taaspace', function () {

  it('should have submodules', function () {
    taaspace.should.have.keys('Taa', 'Space', 'SpaceTaa', 'SpaceView',
      'version');
  });

  describe('Taa', function () {
    it('should fire load event', function (done) {
      var taa = new taaspace.Taa('assets/taa.png');
      taa.on('load', function (taa2) {
        taa2.img.should.equal(taa.img);
        done();
      });
    });
  });

  describe('SpaceView', function () {
    var space;
    var view;

    beforeEach(function () {
      var cont = document.getElementById('taaspace-sandbox');
      cont.innerHTML = '';
      space = new taaspace.Space();
      view = new taaspace.SpaceView(space, cont);
    });

    it('should be able to create an img element', function () {
      var taa = new taaspace.Taa('assets/taa.png');
      space.add(taa);
      $('img.taaspace-taa').should.exist;
    });
  });

  /*describe('SpaceTaa', function () {
    it('should have an id', function () {

      var a = new taaspace.SpaceTaa();
      var b = new taaspace.SpaceTaa();
      a.should.have.property('id');
      a.id.should.be.a.String;
      b.id.should.be.a.String;
      a.id.should.not.equal(b.id);
    });

    it('should be transformable', function () {
      var a = new taaspace.Taa('assets/taa.png');
      (function () {
        a.scale(1.4);
        a.rotate(Math.PI);
        a.translate(23, 20);
        a.transform(1, 2, 2, 1, 10, 20);
      }).should.not.throw();
    });
  });*/

});
