/*jshint expr: true*/ // prevent error in ...be.a.Function

describe('taaspace', function () {

  function getEmptyContainer() {
    var cont = document.getElementById('taaspace-sandbox');
    cont.innerHTML = '';
    return cont;
  }

  it('should have submodules', function () {
    taaspace.should.have.keys('Taa', 'SpaceTaa', 'Space', 'HTMLSpaceView',
      'version', 'SpaceHTML');
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
      var spacetaa = new taaspace.SpaceTaa(space, taa);
      var el = $('img.taaspace-taa');
      el.should.exist;
      var st2 = view.getSpaceTaaByElementId(el.attr('id'));
      st2.should.equal(spacetaa);
    });

    it('should position the taa correctly', function (done) {
      var taa = new taaspace.Taa('assets/taa.png');
      var spacetaa = new taaspace.SpaceTaa(space, taa);
      spacetaa.at([0,0]).to(view).xy.should.eql([0,0]);
      spacetaa.atNorm([0.5,0.5]).to(view).xy.should.eql([128,128]);
      spacetaa.atNorm([1,1]).xy.should.eql([256,256]);
      spacetaa.translate(spacetaa.at([0,0]), view.at([256,256]));
      setTimeout(function () {
        spacetaa.atNorm([1,1]).to(view).xy.should.eql([512,512]);
        done();
      }, 200);
    });

    it('should be able to translate', function () {
      var taa = new taaspace.Taa('assets/taa.png');
      var spacetaa = new taaspace.SpaceTaa(space, taa);
      spacetaa.translate(spacetaa.atNorm([0,0]), spacetaa.atNorm([1,1]));
      var el1 = document.elementFromPoint(300, 300); // null if outside window
      var el2 = $('img.taaspace-taa')[0];
      el1.should.equal(el2);
    });

    it('should be able to present reparented taas', function () {
      var taa = new taaspace.Taa('assets/taa.png');
      var spacetaa = new taaspace.SpaceTaa(space, taa);
      spacetaa.translate(spacetaa.atNW(), spacetaa.atSE());
      spacetaa.setParent(view);
      // Let's see if spacetaa is still in place.
      var el1 = document.elementFromPoint(300, 300); // null if outside window
      el1.should.equal(view.getElementBySpaceTaa(spacetaa));
      // Let's see if spacetaa follows the view.
      view.translate(space.at([0,0]), space.at([1000,1000]));
      var el2 = document.elementFromPoint(300, 300); // null if outside window
      el2.should.equal(el1);
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
      var a = new taaspace.SpaceTaa(space, taa);
      var b = new taaspace.SpaceTaa(space, taa);
      a.should.have.property('id');
      a.id.should.be.a.String;
      b.id.should.be.a.String;
      a.id.should.not.equal(b.id);
    });

    it('should be removable', function () {
      var a = new taaspace.SpaceTaa(space, taa);
      a.remove();
      space._content.hasOwnProperty(a.id).should.equal(false);
    });

    it('should be able to return a SpacePoint', function () {
      var a = new taaspace.SpaceTaa(space, taa);
      var p = a.atNorm([1,1]);
      var vp = p.to(view);
      var epsilon = 0.01;
      var val = 256;
      vp.xy[0].should.be.within(val - epsilon, val + epsilon);
      vp.xy[1].should.be.within(val - epsilon, val + epsilon);
    });

    it('should be able to give and take Transform objects', function () {
      var a = new taaspace.SpaceTaa(space, taa);
      // Move to unit square.
      a.translateScale(
        [a.atNW(), a.atSE()],
        [space.at([0,0]), space.at([1,1])]
      );
      var t = a.getTransform();
      var rt = t.rotateBy(1);
      a.setTransform(rt);
      a.atSE().to(space).xy.should.not.eql([1,1]);
      a.setTransform(t);
      a.atSE().to(space).xy.should.eql([1,1]);
    });

    it('should allow children', function () {
      var a = new taaspace.SpaceTaa(space, taa);
      var b = new taaspace.SpaceTaa(a, taa);
      var c = new taaspace.SpaceTaa(b, taa);
      a.getChildren().should.eql([b]);
      a.getAllChildren()[0].should.equal(b);
      a.getAllChildren()[1].should.equal(c);
      c.getAllChildren().should.eql([]);
    });
  });

  describe('SpaceHTML', function () {
    var space, view, taa;

    beforeEach(function () {
      var cont = getEmptyContainer();
      space = new taaspace.Space();
      view = new taaspace.HTMLSpaceView(space, cont);
    });

    it('should allow creation', function () {
      var a = new taaspace.SpaceHTML(space, '<h1>Hello</h1>');
      var el = $('.taaspace-html');
      var h1 = el.find('h1');
      h1.should.exist;
      var b = view.getSpaceTaaByElementId(el.attr('id'));
      b.should.equal(a);
    });
  });

  describe('SpacePoint', function () {
    describe('#polarOffset', function () {
      var space, p;

      beforeEach(function () {
        space = new taaspace.Space();
        p = space.at([100, 100]);
      });

      it('should allow 0 and 2PI', function () {
        var a = p.polarOffset(100, 2 * Math.PI);
        var b = p.polarOffset(100, 0);
        a.xy.should.be.shallowDeepAlmostEqual(b.xy);
      });

      it('should allow 0 distance', function () {
        var a = p.polarOffset(0, Math.PI / 3);
        a.xy.should.eql(p.xy);
      });

      it('should allow angles outside [0, 2PI]', function () {
        var a = p.polarOffset(100, 2 * Math.PI + 1);
        var b = p.polarOffset(100, 1);
        a.xy.should.be.shallowDeepAlmostEqual(b.xy);
      });
    });
  });

});
