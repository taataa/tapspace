/*jshint expr: true*/ // prevent error in ...be.a.Function

describe('taaspace', function () {

  it('should have submodules', function () {
    taaspace.should.have.keys('Taa', 'Space', 'SpaceView',
      'version',
      'Vector2D', 'Matrix2D');
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

  describe('SpaceTaa', function () {
    var space, view, taa;

    beforeEach(function (done) {
      var cont = document.getElementById('taaspace-sandbox');
      cont.innerHTML = '';
      space = new taaspace.Space();
      view = new taaspace.SpaceView(space, cont);
      taa = new taaspace.Taa('assets/taa.png', done);
    });

    it('should have an id', function () {
      var a = space.add(taa);
      var b = space.add(taa);
      a.should.have.property('id');
      a.id.should.be.a.String;
      b.id.should.be.a.String;
      a.id.should.not.equal(b.id);
    });

    it('should be able to return a SpacePoint', function () {
      var a = space.add(taa);
      var p = a.at(new taaspace.Vector2D(1, 1));
      var vp = p.projectTo(view);
      vp.xy.x.should.equal(256);
      vp.xy.y.should.equal(256);
    });
  });

});
