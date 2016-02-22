/*jshint expr: true*/ // prevent error in ...be.a.Function

describe('taaspace', function () {

  function getEmptyContainer() {
    var cont = document.getElementById('taaspace-sandbox');
    cont.innerHTML = '';
    return cont;
  }

  it('should have submodules', function () {
    taaspace.should.have.keys('Taa', 'Space', 'HTMLSpaceView',
      'version');
  });

  describe('Taa', function () {
    it('should fire "loaded" event', function (done) {
      var taa = new taaspace.Taa('assets/taa.png');
      taa.on('loaded', function (err, taa2) {
        should.equal(err, null);
        taa2.image.should.equal(taa.image);
        done();
      });
    });
  });

  describe('HTMLSpaceView', function () {
    var space;
    var view;

    beforeEach(function () {
      var cont = getEmptyContainer();
      space = new taaspace.Space();
      view = new taaspace.HTMLSpaceView(space, cont);
    });

    // Easier to debug
    afterEach(function () {
      if (this.currentTest.state === 'failed') {
        takeScreenshot();
      }
    });

    it('should be able to create an img element immediately', function () {
      // Without need to wait for the image to load
      var taa = new taaspace.Taa('assets/taa.png');
      var spacetaa = space.add(taa);
      var el = $('img.taaspace-taa');
      el.should.exist;
      var st2 = view.getSpaceTaaByElementId(el.attr('id'));
      st2.should.equal(spacetaa);
    });

    it('should position the taa correctly', function (done) {
      var taa = new taaspace.Taa('assets/taa.png');
      var spacetaa = space.add(taa);
      spacetaa.at([0,0]).to(view).xy.should.eql([0,0]);
      spacetaa.atNorm([1,1]).to(view).xy.should.eql([256,256]);
      spacetaa.atNorm([1,1]).xy.should.eql([256,256]);
      spacetaa.translate(spacetaa.at([0,0]), view.at([256,256]));
      setTimeout(function () {
        spacetaa.at([0,0]).to(view).xy.should.eql([256,256]);
        done();
      }, 200);
    });

    it('should be able to translate', function () {
      var taa = new taaspace.Taa('assets/taa.png');
      var spacetaa = space.add(taa);
      spacetaa.translate(spacetaa.atNorm([0,0]), spacetaa.atNorm([1,1]));
      var el1 = document.elementFromPoint(300, 300); // null if outside window
      //console.log('elem', el1);
      var el2 = $('img.taaspace-taa')[0];
      el1.should.equal(el2);
    });
  });



  describe('SpaceTaa', function () {
    var space, view, taa;

    beforeEach(function (done) {
      var cont = getEmptyContainer();
      space = new taaspace.Space();
      view = new taaspace.HTMLSpaceView(space, cont);
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

    it('should be removable', function () {
      var a = space.add(taa);
      a.remove();
      space.content.hasOwnProperty(a.id).should.equal(false);
    });

    it('should be able to return a SpacePoint', function () {
      var a = space.add(taa);
      var p = a.atNorm([1,1]);
      var vp = p.to(view);
      var epsilon = 0.01;
      var val = 256;
      vp.xy[0].should.be.within(val - epsilon, val + epsilon);
      vp.xy[1].should.be.within(val - epsilon, val + epsilon);
    });
  });

});
