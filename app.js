(() => {
  var s = Object.defineProperty,
    i = (g, b, C) =>
      b in g
        ? s(g, b, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: C,
          })
        : (g[b] = C),
    r = (g, b, C) => (i(g, b + "", C), C),
    o = (g, b, C) => {
      if (!b.has(g)) throw TypeError("Cannot " + C);
    },
    e = (g, b, C) => (
      o(g, b, "read from private field"), C ? C.call(g) : b.get(g)
    ),
    n = (g, b, C) => {
      if (b.has(g))
        throw TypeError("Cannot add the same private member more than once");
      b instanceof WeakSet ? b.add(g) : b.set(g, C);
    },
    l = (g, b, C, I) => (o(g, b, "write to private field"), b.set(g, C), C),
    d = (g, b, C) => (o(g, b, "access private method"), C),
    p = class extends Set {
      dispatch(g) {
        for (let b of this) b(g);
      }
    },
    v,
    T,
    P,
    E,
    q,
    N,
    M,
    V = class extends p {
      constructor() {
        super(),
          n(this, q),
          n(this, T, void 0),
          n(this, P, void 0),
          n(this, E, void 0),
          n(this, M, () => {
            l(this, E, requestAnimationFrame(e(this, M))),
              l(this, T, window.performance.now()),
              (this.deltaTime = e(this, T) - e(this, P)),
              (this.smoothDeltatime +=
                (this.deltaTime - this.smoothDeltatime) * 0.05),
              (this.timeScale = this.deltaTime / e(V, v)),
              (this.smoothTimeScale = this.smoothDeltatime / e(V, v)),
              l(this, P, e(this, T)),
              this.dispatch();
          }),
          d(this, q, N).call(this),
          document.addEventListener("visibilitychange", () => {
            d(this, q, N).call(this);
          });
      }
      add(g) {
        return (
          this.size || (d(this, q, N).call(this), e(this, M).call(this)),
          super.add(g)
        );
      }
      delete(g) {
        let b = super.delete(g);
        return this.size || cancelAnimationFrame(e(this, E)), b;
      }
      clear() {
        cancelAnimationFrame(e(this, E)), super.clear();
      }
    },
    Y = V;
  (v = new WeakMap()),
    (T = new WeakMap()),
    (P = new WeakMap()),
    (E = new WeakMap()),
    (q = new WeakSet()),
    (N = function () {
      l(this, T, l(this, P, window.performance.now())),
        (this.deltaTime = e(V, v)),
        (this.smoothDeltatime = this.deltaTime),
        (this.timeScale = 1),
        (this.smoothTimeScale = this.timeScale);
    }),
    (M = new WeakMap()),
    n(Y, v, 1e3 / 60);
  var X = new Y(),
    z = 1,
    J = 2,
    K = 4,
    f = 8,
    Se = class extends HTMLElement {
      constructor() {
        super(),
          (this._updateBound = this.update.bind(this)),
          (this._pauseFlag = 0),
          new IntersectionObserver((g) => {
            let b = !1;
            for (let C of g) C.isIntersecting && (b = !0);
            b ? (this._pauseFlag &= ~J) : (this._pauseFlag |= J);
          }).observe(this),
          document.addEventListener("visibilitychange", () => {
            document.hidden ? (this._pauseFlag |= K) : (this._pauseFlag &= ~K);
          });
      }
      connectedCallback() {
        (this._pauseFlag &= ~f),
          document.hidden && (this._pauseFlag |= K),
          this._pauseFlag & z || this.update();
      }
      disconnectedCallback() {
        this._pauseFlag |= f;
      }
      get _pauseFlag() {
        return this.__pauseFlag;
      }
      set _pauseFlag(g) {
        this.__pauseFlag !== g &&
          ((this.__pauseFlag = g),
          this.__pauseFlag
            ? X.delete(this._updateBound)
            : X.add(this._updateBound));
      }
      play() {
        this._pauseFlag &= ~z;
      }
      pause() {
        this._pauseFlag |= z;
      }
      get paused() {
        return !!this._pauseFlag;
      }
      update() {}
    },
    ne = Se,
    Ee = typeof Float32Array < "u" ? Float32Array : Array;
  Math.hypot ||
    (Math.hypot = function () {
      for (var g = 0, b = arguments.length; b--; )
        g += arguments[b] * arguments[b];
      return Math.sqrt(g);
    });

  function Ge() {
    var g = new Ee(2);
    return Ee != Float32Array && ((g[0] = 0), (g[1] = 0)), g;
  }

  function $t(g, b) {
    return (g[0] = b[0]), (g[1] = b[1]), g;
  }

  function B(g, b, C) {
    return (g[0] = b), (g[1] = C), g;
  }

  function G(g, b, C) {
    return (g[0] = b[0] + C[0]), (g[1] = b[1] + C[1]), g;
  }

  function Z(g, b, C) {
    return (g[0] = b[0] - C[0]), (g[1] = b[1] - C[1]), g;
  }

  function ye(g, b, C) {
    return (g[0] = b[0] * C[0]), (g[1] = b[1] * C[1]), g;
  }

  function ie(g, b, C) {
    return (g[0] = b[0] * C), (g[1] = b[1] * C), g;
  }

  function Ae(g, b) {
    var C = b[0] - g[0],
      I = b[1] - g[1];
    return Math.hypot(C, I);
  }

  function je(g) {
    var b = g[0],
      C = g[1];
    return Math.hypot(b, C);
  }

  function Xe(g) {
    var b = g[0],
      C = g[1];
    return b * b + C * C;
  }

  function Ue(g, b) {
    return (g[0] = -b[0]), (g[1] = -b[1]), g;
  }

  function qe(g, b) {
    var C = b[0],
      I = b[1],
      ee = C * C + I * I;
    return (
      ee > 0 && (ee = 1 / Math.sqrt(ee)),
      (g[0] = b[0] * ee),
      (g[1] = b[1] * ee),
      g
    );
  }

  function Ot(g, b) {
    return g[0] * b[0] + g[1] * b[1];
  }

  function Je(g, b, C) {
    var I = b[0] * C[1] - b[1] * C[0];
    return (g[0] = g[1] = 0), (g[2] = I), g;
  }

  function jn(g, b, C, I) {
    var ee = b[0],
      re = b[1];
    return (g[0] = ee + I * (C[0] - ee)), (g[1] = re + I * (C[1] - re)), g;
  }

  function hr(g, b, C) {
    var I = b[0],
      ee = b[1];
    return (
      (g[0] = C[0] * I + C[3] * ee + C[6]),
      (g[1] = C[1] * I + C[4] * ee + C[7]),
      g
    );
  }

  function ti(g, b, C) {
    var I = b[0],
      ee = b[1];
    return (
      (g[0] = C[0] * I + C[4] * ee + C[12]),
      (g[1] = C[1] * I + C[5] * ee + C[13]),
      g
    );
  }

  function Yn(g, b, C, I) {
    var ee = b[0] - C[0],
      re = b[1] - C[1],
      ce = Math.sin(I),
      we = Math.cos(I);
    return (
      (g[0] = ee * we - re * ce + C[0]), (g[1] = ee * ce + re * we + C[1]), g
    );
  }

  function Dn(g, b) {
    return g[0] === b[0] && g[1] === b[1];
  }
  (function () {
    var g = Ge();
    return function (b, C, I, ee, re, ce) {
      var we, me;
      for (
        C || (C = 2),
          I || (I = 0),
          ee ? (me = Math.min(ee * C + I, b.length)) : (me = b.length),
          we = I;
        we < me;
        we += C
      )
        (g[0] = b[we]),
          (g[1] = b[we + 1]),
          re(g, g, ce),
          (b[we] = g[0]),
          (b[we + 1] = g[1]);
      return b;
    };
  })();
  var lt = class extends Float32Array {
      static distance(g, b) {
        return Ae(g, b);
      }
      constructor(g = [0, 0]) {
        return super(g), this;
      }
      get x() {
        return this[0];
      }
      set x(g) {
        this[0] = g;
      }
      get y() {
        return this[1];
      }
      set y(g) {
        this[1] = g;
      }
      set(g, b) {
        return B(this, g, b), this;
      }
      copy(g) {
        return $t(this, g), this;
      }
      add(g) {
        return G(this, this, g), this;
      }
      multiply(g) {
        return ye(this, this, g), this;
      }
      get size() {
        return je(this);
      }
      get squaredSize() {
        return Xe(this);
      }
      subtract(g) {
        return Z(this, this, g), this;
      }
      negate(g = this) {
        return Ue(this, g), this;
      }
      cross(g, b) {
        return Je(this, g, b), this;
      }
      scale(g) {
        return ie(this, this, g), this;
      }
      normalize() {
        return qe(this, this);
      }
      dot(g) {
        return Ot(this, g);
      }
      distance(g) {
        return lt.distance(this, g);
      }
      equals(g) {
        return Dn(this, g);
      }
      applyMatrix3(g) {
        return hr(this, this, g), this;
      }
      applyMatrix4(g) {
        return ti(this, this, g), this;
      }
      rotate(g, b) {
        Yn(this, this, g, b);
      }
      lerp(g, b) {
        jn(this, this, g, b);
      }
      clone() {
        return new lt(this);
      }
    },
    ni = class {
      constructor(g, { pointerLock: b = !1, pointerCapture: C = !1 } = {}) {
        (this.pointerLock = b),
          (this.pointerCapture = C),
          (this._elementsData = new Map()),
          (this._callback = g),
          (this._onPointerDownBound = this._onPointerDown.bind(this)),
          (this._onPointerMoveBound = this._onPointerMove.bind(this)),
          (this._onPointerUpBound = this._onPointerUp.bind(this));
      }
      observe(g) {
        this._elementsData.has(g) ||
          (g.addEventListener("pointerdown", this._onPointerDownBound),
          this._elementsData.set(g, {
            pointers: new Map(),
            gestureVector: new lt(),
            previousSize: 0,
            previousX: 0,
            previousY: 0,
            offsetX: 0,
            offsetY: 0,
            previousMovementX: 0,
            previousMovementY: 0,
            startTimeStamp: 0,
          }));
      }
      unobserve(g) {
        !this._elementsData.has(g) ||
          (g.removeEventListener("pointerdown", this._onPointerDownBound),
          g.removeEventListener("pointermove", this._onPointerMoveBound),
          this._elementsData.delete(g));
      }
      disconnect() {
        for (let g of this._elementsData.keys()) this.unobserve(g);
      }
      _resetElementPreviousData(g) {
        let b = this._elementsData.get(g);
        b.gestureVector.set(0, 0),
          (b.previousSize = 0),
          (b.previousX = 0),
          (b.previousY = 0),
          (b.previousRotation = 0);
      }
      _onPointerDown(g) {
        let b = g.currentTarget,
          C = this._elementsData.get(b);
        this.pointerLock
          ? b.requestPointerLock()
          : this.pointerCapture && b.setPointerCapture(g.pointerId),
          this._resetElementPreviousData(b),
          C.pointers.size ||
            (b.addEventListener("pointermove", this._onPointerMoveBound),
            b.addEventListener("pointerup", this._onPointerUpBound),
            b.addEventListener("pointerout", this._onPointerUpBound),
            (C.startTimeStamp = Date.now()),
            (C.offsetX = 0),
            (C.offsetY = 0)),
          C.pointers.set(g.pointerId, g);
      }
      _onPointerMove(g) {
        let b = this._elementsData.get(g.currentTarget);
        b.pointers.set(g.pointerId, g);
        let C = 0,
          I = 0,
          ee = 0;
        for (let pe of b.pointers.values())
          ee === 1 &&
            ((b.gestureVector.x = C - pe.screenX),
            (b.gestureVector.y = I - pe.screenY)),
            (C += pe.screenX),
            (I += pe.screenY),
            ee++;
        if (
          ((C /= b.pointers.size),
          (I /= b.pointers.size),
          !b.previousX && !b.previousY)
        ) {
          (b.previousX = C), (b.previousY = I);
          return;
        }
        let re = C - b.previousX,
          ce = I - b.previousY;
        (b.previousX = C),
          (b.previousY = I),
          (b.previousMovementX = re),
          (b.previousMovementY = ce);
        let we = b.gestureVector.size,
          me = b.previousSize ? we / b.previousSize : 1;
        b.previousSize = we;
        let fe = Math.atan2(b.gestureVector.y, b.gestureVector.x),
          oe = b.previousRotation ? fe - b.previousRotation : 0;
        oe > Math.PI
          ? (oe -= Math.PI * 2)
          : oe < -Math.PI && (oe += Math.PI * 2),
          (b.previousRotation = fe),
          (b.offsetX += re),
          (b.offsetY += ce),
          this._callback({
            target: g.currentTarget,
            movementX: this.pointerLock ? g.movementX / devicePixelRatio : re,
            movementY: this.pointerLock ? g.movementY / devicePixelRatio : ce,
            offsetX: b.offsetX,
            offsetY: b.offsetY,
            movementScale: me,
            movementRotation: oe,
            duration: Date.now() - b.startTimeStamp,
            finished: !1,
          });
      }
      _onPointerUp(g) {
        let b = g.currentTarget,
          C = this._elementsData.get(b);
        C.pointers.delete(g.pointerId),
          b.releasePointerCapture(g.pointerId),
          document.exitPointerLock && document.exitPointerLock(),
          (!C || !C.pointers.size) &&
            (this._callback({
              target: g.currentTarget,
              movementX: 0,
              movementY: 0,
              movementScale: 1,
              movementRotation: 0,
              offsetX: C.offsetX,
              offsetY: C.offsetY,
              duration: Date.now() - C.startTimeStamp,
              finished: !0,
            }),
            b.removeEventListener("pointermove", this._onPointerMoveBound),
            b.removeEventListener("pointerup", this._onPointerUpBound),
            b.removeEventListener("pointerout", this._onPointerUpBound)),
          this._resetElementPreviousData(b);
      }
    },
    ri = ni,
    Mn = document.createElement("br");
  (Mn.style.display = "none"), document.body.appendChild(Mn);
  var $e = class {
      static styleToRGBA(g) {
        Mn.style.color = g;
        let b =
          /rgba?\s*\(\s*(\d*),\s*(\d*)\s*,\s*(\d*)\s*(,\s*([.\d]*))?\s*\)/.exec(
            getComputedStyle(Mn).getPropertyValue("color")
          );
        return b
          ? [
              parseInt(b[1]) / 255,
              parseInt(b[2]) / 255,
              parseInt(b[3]) / 255,
              b[5] !== void 0 ? parseFloat(b[5]) : 1,
            ]
          : null;
      }
      static RGBToHSL(g, b = []) {
        let C = g[0],
          I = g[1],
          ee = g[2],
          re = Math.max(C, I, ee),
          ce = Math.min(C, I, ee),
          we,
          me,
          fe = (ce + re) / 2;
        if (ce === re) (we = 0), (me = 0);
        else {
          let oe = re - ce;
          switch (
            ((me = fe <= 0.5 ? oe / (re + ce) : oe / (2 - re - ce)), re)
          ) {
            case C:
              we = (I - ee) / oe + (I < ee ? 6 : 0);
              break;
            case I:
              we = (ee - C) / oe + 2;
              break;
            case ee:
              we = (C - I) / oe + 4;
              break;
          }
          we /= 6;
        }
        return (b[0] = we), (b[1] = me), (b[2] = fe), b;
      }
      static hexToRGB(g) {
        let b = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(g);
        return b
          ? [
              parseInt(b[1], 16) / 255,
              parseInt(b[2], 16) / 255,
              parseInt(b[3], 16) / 255,
            ]
          : null;
      }
      static rgbToHex(g) {
        let b = "#";
        for (let C of g) {
          let I = Math.floor(C * 255).toString(16);
          b += I.length == 1 ? "0" + I : I;
        }
        return b;
      }
    },
    rn = class {
      constructor({
        width: g = 1,
        height: b = 1,
        columns: C = 1,
        rows: I = 1,
        positions: ee = !0,
        normals: re = !0,
        uvs: ce = !0,
        indices: we = !0,
      } = {}) {
        let me = C + 1,
          fe = I + 1;
        ee && (this.positions = new Float32Array((C + 1) * (I + 1) * 3)),
          re && (this.normals = new Float32Array((C + 1) * (I + 1) * 3)),
          ce && (this.uvs = new Float32Array((C + 1) * (I + 1) * 2));
        for (let oe = 0; oe < fe; oe++) {
          let pe = 1 - oe / I,
            xe = (oe / I) * b - b * 0.5;
          for (let Ie = 0; Ie < me; Ie++) {
            let et = Ie / C,
              Ye = oe * me + Ie;
            ee &&
              ((this.positions[Ye * 3] = et * g - g * 0.5),
              (this.positions[Ye * 3 + 1] = xe)),
              re && (this.normals[Ye * 3 + 2] = 1),
              ce && ((this.uvs[Ye * 2] = et), (this.uvs[Ye * 2 + 1] = 1 - pe));
          }
        }
        if (we) {
          let oe = C * I * 6;
          oe < 2 ** 8
            ? (this.indices = new Uint8Array(oe))
            : oe < 2 ** 16
            ? (this.indices = new Uint16Array(oe))
            : (this.indices = new Uint32Array(oe));
          for (let pe = 0; pe < I; pe++)
            for (let xe = 0; xe < C; xe++) {
              let Ie = xe + me * pe,
                et = xe + me * (pe + 1),
                Ye = xe + 1 + me * (pe + 1),
                Mt = xe + 1 + me * pe,
                De = pe * C + xe;
              (this.indices[De * 6] = Ie),
                (this.indices[De * 6 + 1] = Mt),
                (this.indices[De * 6 + 2] = et),
                (this.indices[De * 6 + 3] = et),
                (this.indices[De * 6 + 4] = Mt),
                (this.indices[De * 6 + 5] = Ye);
            }
        }
      }
    },
    on = class {
      constructor({ gl: g, geometry: b = void 0, program: C = void 0 }) {
        this.gl = g;
        let I = g.getExtension("OES_vertex_array_object");
        I &&
          ((this.gl.createVertexArray = I.createVertexArrayOES.bind(I)),
          (this.gl.bindVertexArray = I.bindVertexArrayOES.bind(I))),
          (this._vertexArray = this.gl.createVertexArray()),
          b &&
            C &&
            this.add({
              geometry: b,
              program: C,
            });
      }
      add({ geometry: g = void 0, program: b = void 0 } = {}) {
        this.bind(),
          b.attributes.set(g.attributes),
          g.indices && g.indices.buffer.bind(),
          this.unbind();
      }
      bind() {
        this.gl.bindVertexArray(this._vertexArray);
      }
      unbind() {
        this.gl.bindVertexArray(null);
      }
    },
    le = class {
      constructor({
        gl: g,
        data: b = void 0,
        width: C = void 0,
        height: I = void 0,
        target: ee = g.TEXTURE_2D,
        level: re = 0,
        internalFormat: ce = g.RGBA8 || g.RGBA,
        format: we = g.RGBA,
        type: me = g.UNSIGNED_BYTE,
        autoGenerateMipmap: fe = !0,
        minFilter: oe = fe ? g.LINEAR_MIPMAP_LINEAR : g.LINEAR,
        magFilter: pe = g.LINEAR,
        wrapS: xe = g.CLAMP_TO_EDGE,
        wrapT: Ie = g.CLAMP_TO_EDGE,
        flipY: et = !1,
      }) {
        (this.gl = g),
          (this._texture = this.gl.createTexture()),
          (this._width = C),
          (this._height = I),
          (this._dataWidth = void 0),
          (this._dataHeight = void 0),
          (this._target = ee),
          (this._unit = 0),
          (this.autoGenerateMipmap = fe),
          (this.level = re),
          (this.internalFormat = ce),
          (this.format = we),
          (this.type = me),
          (this.minFilter = oe),
          (this.magFilter = pe),
          (this.wrapS = xe),
          (this.wrapT = Ie),
          (this.flipY = et),
          (this.data = b);
      }
      generateMipmap() {
        this.bind(), this.gl.generateMipmap(this._target), this.unbind();
      }
      set data(g) {
        (this._data = g),
          this._data &&
            this._data.length === void 0 &&
            ((this._dataWidth = this._data.width || this._data.videoWidth),
            (this._dataHeight = this._data.height || this._data.videoHeight)),
          this.bind(),
          this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, this.flipY),
          this.gl instanceof WebGLRenderingContext &&
          this._data &&
          this._data.length === void 0
            ? this.gl.texImage2D(
                this._target,
                this.level,
                this.internalFormat,
                this.format,
                this.type,
                this._data
              )
            : this.gl.texImage2D(
                this._target,
                this.level,
                this.internalFormat,
                this.width,
                this.height,
                0,
                this.format,
                this.type,
                this._data || null
              ),
          this.autoGenerateMipmap && this.gl.generateMipmap(this._target),
          this.unbind();
      }
      get data() {
        return this._data;
      }
      set width(g) {
        (this._width = g), (this.data = this.data);
      }
      get width() {
        return this._width || this._dataWidth;
      }
      set height(g) {
        (this._height = g), (this.data = this.data);
      }
      get height() {
        return this._height || this._dataHeight;
      }
      set minFilter(g) {
        this._minFilter !== g &&
          ((this._minFilter = g),
          this.bind(),
          this.gl.texParameteri(
            this._target,
            this.gl.TEXTURE_MIN_FILTER,
            this._minFilter
          ),
          this.unbind());
      }
      get minFilter() {
        return this._minFilter;
      }
      set magFilter(g) {
        this._magFilter !== g &&
          ((this._magFilter = g),
          this.bind(),
          this.gl.texParameteri(
            this._target,
            this.gl.TEXTURE_MAG_FILTER,
            this._magFilter
          ),
          this.unbind());
      }
      get magFilter() {
        return this._magFilter;
      }
      set wrapS(g) {
        this._wrapS !== g &&
          ((this._wrapS = g),
          this.bind(),
          this.gl.texParameteri(
            this._target,
            this.gl.TEXTURE_WRAP_S,
            this._wrapS
          ),
          this.unbind());
      }
      get wrapS() {
        return this._wrapS;
      }
      set wrapT(g) {
        this._wrapT !== g &&
          ((this._wrapT = g),
          this.bind(),
          this.gl.texParameteri(
            this._target,
            this.gl.TEXTURE_WRAP_T,
            this._wrapT
          ),
          this.unbind());
      }
      get wrapT() {
        return this._wrapT;
      }
      set flipY(g) {
        this._flipY !== g &&
          ((this._flipY = g),
          this.bind(),
          this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, this._flipY),
          this.unbind());
      }
      get flipY() {
        return this._flipY;
      }
      bind({ unit: g = 0 } = {}) {
        (this._unit = g),
          this.gl.activeTexture(this.gl.TEXTURE0 + g),
          this.gl.bindTexture(this._target, this._texture);
      }
      unbind({ unit: g = this._unit } = {}) {
        this.gl.activeTexture(this.gl.TEXTURE0 + g),
          this.gl.bindTexture(this._target, null);
      }
      clone() {
        return new le(this);
      }
    },
    Ke = class {
      constructor({ gl: g, geometry: b = void 0, program: C = void 0 }) {
        (this.gl = g),
          (this._vertexArrays = new Map()),
          (this._boundTextures = new Set()),
          (this.geometry = b),
          (this.program = C);
      }
      get program() {
        return this._program;
      }
      set program(g) {
        this._program = g;
        let b = this._vertexArrays.get(this.geometry);
        b.get(this._program) ||
          b.set(
            this._program,
            new on({
              gl: this.gl,
              geometry: this.geometry,
              program: this.program,
            })
          );
      }
      get geometry() {
        return this._geometry;
      }
      set geometry(g) {
        (this._geometry = g),
          this._vertexArrays.has(this.geometry) ||
            this._vertexArrays.set(this.geometry, new Map());
      }
      get vertexArray() {
        return this._vertexArrays.get(this.geometry).get(this.program);
      }
      bind() {
        this.program.use(), this.vertexArray.bind();
        for (let [g, b] of this.program.uniformTypes)
          if (b.startsWith("sampler")) {
            let C = this.program.uniforms.get(g);
            C instanceof le &&
              (C.bind({
                unit: this.program.textureUnits.get(g),
              }),
              this._boundTextures.add(C));
          }
      }
      draw(g = {}) {
        (g = Object.assign(
          {
            bind: !1,
            uniforms: {},
          },
          g
        )),
          this.program.use();
        for (let [b, C] of Object.entries(g.uniforms))
          this.program.uniforms.set(b, C);
        g.bind && this.bind(), this.geometry.draw(g), g.bind && this.unbind();
      }
      unbind() {
        this.vertexArray.unbind();
        for (let g of this._boundTextures)
          g.unbind(), this._boundTextures.delete(g);
      }
    },
    pr = class {
      constructor({
        gl: g,
        data: b = null,
        target: C = g.ARRAY_BUFFER,
        usage: I = g.STATIC_DRAW,
      }) {
        (this.gl = g),
          (this.target = C),
          (this.usage = I),
          (this._buffer = this.gl.createBuffer()),
          b && (this.data = b);
      }
      set data(g) {
        (this._data = g),
          this.bind(),
          this.gl.bufferData(this.target, this._data, this.usage),
          this.unbind();
      }
      get data() {
        return this._data;
      }
      bind({
        target: g = this.target,
        index: b = void 0,
        offset: C = 0,
        size: I = void 0,
      } = {}) {
        b === void 0
          ? this.gl.bindBuffer(g, this._buffer)
          : I === void 0
          ? this.gl.bindBufferBase(g, b, this._buffer)
          : this.gl.bindBufferRange(g, b, this._buffer, C, I);
      }
      unbind({
        target: g = this.target,
        index: b = void 0,
        offset: C = 0,
        size: I = void 0,
      } = {}) {
        b === void 0
          ? this.gl.bindBuffer(g, null)
          : I === void 0
          ? this.gl.bindBufferBase(g, b, null)
          : this.gl.bindBufferRange(g, b, null, C, I);
      }
    },
    ii = new Map([
      [WebGLRenderingContext.BYTE, Int8Array],
      [WebGLRenderingContext.UNSIGNED_BYTE, Uint8Array],
      [WebGLRenderingContext.SHORT, Int16Array],
      [WebGLRenderingContext.UNSIGNED_SHORT, Uint16Array],
      [WebGLRenderingContext.INT, Int32Array],
      [WebGLRenderingContext.UNSIGNED_INT, Uint32Array],
      [WebGLRenderingContext.FLOAT, Float32Array],
    ]),
    oi = new Map([
      [Int8Array, WebGLRenderingContext.BYTE],
      [Uint8Array, WebGLRenderingContext.UNSIGNED_BYTE],
      [Int16Array, WebGLRenderingContext.SHORT],
      [Uint16Array, WebGLRenderingContext.UNSIGNED_SHORT],
      [Int32Array, WebGLRenderingContext.INT],
      [Uint32Array, WebGLRenderingContext.UNSIGNED_INT],
      [Float32Array, WebGLRenderingContext.FLOAT],
      [Float64Array, WebGLRenderingContext.FLOAT],
    ]),
    Rt = class {
      constructor({
        gl: g,
        data: b = null,
        target: C = g.ARRAY_BUFFER,
        size: I = 1,
        componentType: ee = oi.get(b?.constructor),
        byteOffset: re = 0,
        normalized: ce = !1,
        byteStride: we = 0,
        count: me = b?.length / I || 1,
        divisor: fe = 0,
      }) {
        (this.gl = g),
          (this.data = b),
          (this.size = I),
          (this.componentType = ee),
          (this.byteOffset = re),
          (this.normalized = ce),
          (this.byteStride = we),
          (this.count = me),
          (this.divisor = fe),
          (this._buffer =
            b instanceof pr
              ? b
              : new pr({
                  gl: g,
                  data: b,
                  target: C,
                }));
      }
      get buffer() {
        return this._buffer;
      }
      get typedArray() {
        return new (ii.get(this.componentType))(
          this.buffer.data,
          this.byteOffset,
          this.count * this.size
        );
      }
    },
    gr = class {
      constructor({
        gl: g,
        positions: b = null,
        normals: C = null,
        uvs: I = null,
        attributes: ee = {},
        indices: re = null,
      }) {
        (this.gl = g),
          (this.indices = null),
          this.gl.getExtension("OES_element_index_uint"),
          (this._drawElementsInstanced = () => {}),
          (this._drawArraysInstanced = () => {});
        let ce = this.gl.getExtension("ANGLE_instanced_arrays");
        ce
          ? ((this._drawElementsInstanced =
              ce.drawElementsInstancedANGLE.bind(ce)),
            (this._drawArraysInstanced = ce.drawArraysInstancedANGLE.bind(ce)))
          : this.gl.drawElementsInstanced &&
            ((this._drawElementsInstanced = this.gl.drawElementsInstanced.bind(
              this.gl
            )),
            (this._drawArraysInstanced = this.gl.drawArraysInstanced.bind(
              this.gl
            ))),
          (this.attributes = new Map(
            ee instanceof Map ? ee : Object.entries(ee)
          )),
          b &&
            this.attributes.set(
              "position",
              new Rt({
                gl: g,
                data: b,
                size: 3,
              })
            ),
          C &&
            this.attributes.set(
              "normal",
              new Rt({
                gl: g,
                data: C,
                size: 3,
              })
            ),
          I &&
            this.attributes.set(
              "uv",
              new Rt({
                gl: g,
                data: I,
                size: 2,
              })
            );
        for (let [we, me] of this.attributes)
          me instanceof Rt ||
            this.attributes.set(
              we,
              new Rt(
                Object.assign(
                  {
                    gl: g,
                  },
                  me
                )
              )
            );
        re &&
          (this.indices = new Rt({
            gl: this.gl,
            target: this.gl.ELEMENT_ARRAY_BUFFER,
            ...(re.length !== void 0
              ? {
                  data: re,
                }
              : re),
          }));
      }
      draw({
        mode: g = this.gl.TRIANGLES,
        elements: b = !!this.indices,
        count: C = b
          ? this.indices.count
          : this.attributes.get("position").count,
        offset: I = this.indices ? this.indices.byteOffset : 0,
        type: ee = b ? this.indices.componentType : null,
        first: re = 0,
        instanceCount: ce = void 0,
      } = {}) {
        b
          ? ce !== void 0
            ? this._drawElementsInstanced(g, C, ee, I, ce)
            : this.gl.drawElements(g, C, ee, I)
          : ce !== void 0
          ? this._drawArraysInstanced(g, re, C, ce)
          : this.gl.drawArrays(g, re, C);
      }
    },
    ut = class {
      static addChunks(g = "void main() {}", b) {
        for (let [C, I] of b)
          switch (C) {
            case "start":
              g = g.replace(
                /^(#version .*?\n(\s*precision highp float;\s)?)?([\s\S]*)/,
                `$1
${I}
$3`
              );
              break;
            case "end":
              g = g.replace(
                /(}\s*$)/,
                `
${I}
$1`
              );
              break;
            case "main":
              g = g.replace(
                /(\bvoid\b +\bmain\b[\s\S]*?{\s*)/,
                `$1
${I}
`
              );
              break;
            default:
              g = g.replace(C, I);
          }
        return g;
      }
      constructor({
        vertex: g = `#version 300 es
      void main() {
        gl_Position = vec4(0., 0., 0., 1.);
      }
    `,
        fragment: b = `#version 300 es
      precision highp float;

      out vec4 fragColor;

      void main() {
        fragColor = vec4(1.);
      }
    `,
        vertexChunks: C = [],
        fragmentChunks: I = [],
        uniforms: ee = {},
        dataTypeConctructors: re = {
          Vector2: class extends Float32Array {
            constructor() {
              super(2);
            }
          },
          Vector3: class extends Float32Array {
            constructor() {
              super(3);
            }
          },
          Vector4: class extends Float32Array {
            constructor() {
              super(4);
            }
          },
          Matrix3: class extends Float32Array {
            constructor() {
              super([1, 0, 0, 0, 1, 0, 0, 0, 1]);
            }
          },
          Matrix4: class extends Float32Array {
            constructor() {
              super([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
            }
          },
          Texture: class {},
          TextureCube: class {},
        },
      } = {}) {
        (this.uniforms = ee),
          (this.uniformTypes = new Map()),
          (this._dataTypeConctructors = re),
          (this._vertex = ut.addChunks(g, C)),
          (this._fragment = ut.addChunks(b, I)),
          this._parseUniforms();
      }
      get vertex() {
        return this._vertex;
      }
      set vertex(g) {
        (this._vertex = g), this._parseUniforms();
      }
      get fragment() {
        return this._fragment;
      }
      set fragment(g) {
        (this._fragment = g), this._parseUniforms();
      }
      _createUniform(g, b, C) {
        if (!C) this.uniformTypes.set(g, b);
        else {
          this.uniformTypes.set(g, `${b}array`);
          for (let re = 0; re < C; re++)
            this.uniformTypes.set(`${g}[${re}]`, b);
        }
        let I, ee;
        if (/bool/.test(b)) isNaN(C) ? (I = !1) : (I = new Array(C).fill(!1));
        else if (/float|double/.test(b))
          isNaN(C) ? (I = 0) : (I = new Array(C).fill(0));
        else if (/int|uint/.test(b))
          isNaN(C) ? (I = 0) : (I = new Array(C).fill(0));
        else if (/sampler2D/.test(b))
          isNaN(C)
            ? (I = new this._dataTypeConctructors.Texture())
            : (I = new Array(C)
                .fill(void 0)
                .map((re) => new this._dataTypeConctructors.Texture()));
        else if (/samplerCube/.test(b))
          isNaN(C)
            ? (I = new this._dataTypeConctructors.TextureCube())
            : (I = new Array(C)
                .fill(void 0)
                .map((re) => new this._dataTypeConctructors.TextureCube()));
        else if ((ee = /(.?)vec(\d)/.exec(b))) {
          let re = ee[2];
          isNaN(C)
            ? (I = new this._dataTypeConctructors[`Vector${re}`]())
            : (I = new Array(C)
                .fill(void 0)
                .map((ce) => new this._dataTypeConctructors[`Vector${re}`]()));
        } else if ((ee = /mat(\d)/.exec(b))) {
          let re = ee[1];
          isNaN(C)
            ? (I = new this._dataTypeConctructors[`Matrix${re}`]())
            : (I = new Array(C)
                .fill(void 0)
                .map((ce) => new this._dataTypeConctructors[`Matrix${re}`]()));
        } else I = void 0;
        return I;
      }
      _parseUniforms() {
        let g = {};
        this.uniformTypes.clear();
        for (let b of [this.vertex, this.fragment]) {
          let C = new Map(),
            I = /struct\s*(.*)\s*{\s*([\s\S]*?)}/g,
            ee = /^\s*(.[^ ]+) (.[^ ;[\]]+)\[? *(\d+)? *\]?/gm,
            re;
          for (; (re = I.exec(b)); ) {
            let me = re[1],
              fe = re[2],
              oe = {},
              pe;
            for (; (pe = ee.exec(fe)); ) {
              let [, xe, Ie, et] = pe,
                Ye = parseInt(et);
              oe[Ie] = {
                type: xe,
                arrayLength: Ye,
              };
            }
            C.set(me, oe);
          }
          let ce =
              /^\s*uniform (highp|mediump|lowp)? *(.[^ ]+) (.[^ ;[\]]+)\[? *(\d+)? *\]?/gm,
            we;
          for (; (we = ce.exec(b)); ) {
            let [, , me, fe, oe] = we,
              pe = C.get(me);
            if (pe)
              for (let xe of Object.keys(pe))
                (fe = `${fe}.${xe}`),
                  (g[fe] = this._createUniform(
                    fe,
                    pe[xe].type,
                    pe[xe].arrayLength
                  ));
            else {
              let xe = parseInt(oe);
              g[fe] = this._createUniform(fe, me, xe);
            }
          }
        }
        for (let [b, C] of Object.entries(g))
          b in this.uniforms || (this.uniforms[b] = C);
        for (let b of Object.keys(this.uniforms))
          b in g || delete this.uniforms[b];
      }
    },
    gt = class {
      constructor({
        gl: g,
        shader: b = new ut(),
        transformFeedbackVaryings: C = void 0,
      }) {
        (this.gl = g),
          (this._webGL1 = this.gl
            .getParameter(this.gl.VERSION)
            .startsWith("WebGL 1.0")),
          (this._shader = b instanceof ut ? b : new ut(b)),
          (this._program = g.createProgram()),
          (this._attachedShaders = new Map()),
          (this._textureUnits = new Map()),
          (this._vertexAttribDivisor = () => {});
        let I = this.gl.getExtension("ANGLE_instanced_arrays");
        I
          ? (this._vertexAttribDivisor = I.vertexAttribDivisorANGLE.bind(I))
          : this.gl.vertexAttribDivisor &&
            (this._vertexAttribDivisor = this.gl.vertexAttribDivisor.bind(
              this.gl
            ));
        let ee = this;
        class re extends Map {
          set(
            fe,
            {
              buffer: oe = void 0,
              location: pe = ee._attributesLocations.get(fe),
              size: xe = 1,
              componentType: Ie = g.FLOAT,
              normalized: et = !1,
              byteStride: Ye = 0,
              byteOffset: Mt = 0,
              divisor: De = 0,
            } = {}
          ) {
            if (fe instanceof Map) {
              for (let [Jt, $n] of fe) this.set(Jt, $n);
              return;
            }
            oe.bind(),
              pe === void 0 &&
                ((pe = g.getAttribLocation(ee._program, fe)),
                ee._attributesLocations.set(fe, pe)),
              pe !== -1 &&
                (g.enableVertexAttribArray(pe),
                ee._webGL1 || Ie === g.FLOAT || Ie === g.HALF_FLOAT
                  ? (Ie === g.UNSIGNED_INT && (Ie = g.FLOAT),
                    g.vertexAttribPointer(pe, xe, Ie, et, Ye, Mt))
                  : g.vertexAttribIPointer(pe, xe, Ie, Ye, Mt),
                ee._vertexAttribDivisor(pe, De)),
              oe.unbind(),
              super.set(fe, {
                buffer: oe,
                size: xe,
                componentType: Ie,
                normalized: et,
                byteStride: Ye,
                byteOffset: Mt,
              });
          }
        }
        let ce = (me, fe) => {
          let oe = ee._uniformLocations.get(me);
          if (
            (oe === void 0 &&
              ((oe = g.getUniformLocation(ee._program, me)),
              ee._uniformLocations.set(me, oe)),
            oe === null)
          )
            return;
          let pe = ee.uniformTypes.get(me);
          if (pe === "float" || pe === "bool") g.uniform1f(oe, fe);
          else if (pe === "vec2") g.uniform2fv(oe, fe);
          else if (pe === "vec3") g.uniform3fv(oe, fe);
          else if (pe === "vec4") g.uniform4fv(oe, fe);
          else if (pe === "int") g.uniform1i(oe, fe);
          else if (pe === "ivec2") g.uniform2iv(oe, fe);
          else if (pe === "ivec3") g.uniform3iv(oe, fe);
          else if (pe === "ivec4") g.uniform4iv(oe, fe);
          else if (pe === "mat3") g.uniformMatrix3fv(oe, !1, fe);
          else if (pe === "mat4") g.uniformMatrix4fv(oe, !1, fe);
          else if (pe.startsWith("sampler"))
            g.uniform1i(oe, ee._textureUnits.get(me));
          else if (pe.endsWith("array"))
            for (let xe = 0; xe < fe.length; xe++) ce(`${me}[${xe}]`, fe[xe]);
          else if (fe instanceof Object)
            for (let xe of Object.keys(fe)) ce(`${me}.${xe}`, fe[xe]);
        };
        class we extends Map {
          set(fe, oe) {
            oe !== void 0 &&
              (ce(fe, oe), (ee._shader.uniforms[fe] = oe), super.set(fe, oe));
          }
        }
        C &&
          this.gl.transformFeedbackVaryings(
            this._program,
            C,
            g.INTERLEAVED_ATTRIBS
          ),
          (this.attributes = new re()),
          (this.uniforms = new we()),
          this._updateShader(this.gl.VERTEX_SHADER, this._shader.vertex),
          this._updateShader(this.gl.FRAGMENT_SHADER, this._shader.fragment);
      }
      set vertexShader(g) {
        (this._shader.vertex = g),
          this._updateShader(this.gl.VERTEX_SHADER, this._shader.vertex);
      }
      get vertexShader() {
        return this._shader.vertex;
      }
      set fragmentShader(g) {
        (this._shader.fragment = g),
          this._updateShader(this.gl.FRAGMENT_SHADER, this._shader.fragment);
      }
      get fragmentShader() {
        return this._shader.fragment;
      }
      get uniformTypes() {
        return this._shader.uniformTypes;
      }
      get textureUnits() {
        return this._textureUnits;
      }
      use() {
        this.gl.useProgram(this._program);
      }
      _updateShader(g, b) {
        if (!b) return;
        if (this._webGL1)
          if (
            ((b = b.replace(/#version.*?\n/g, "")),
            (b = b.replace(/\btexture\b/g, "texture2D")),
            (b = b.replace(/\buvec(.)\b/g, "vec$1")),
            (b = b.replace(/\bflat\b/g, "")),
            g === this.gl.VERTEX_SHADER)
          )
            (b = b.replace(/(^\s*)\bin\b/gm, "$1attribute")),
              (b = b.replace(/(^\s*)\bout\b/gm, "$1varying"));
          else {
            b = b.replace(/(^\s*)\bin\b/gm, "$1varying");
            let re = /out vec4 (.*?);/.exec(b);
            if (re) {
              let ce = re[1];
              (b = b.replace(/out.*?;/, "")),
                (b = b.replace(new RegExp(`\\b${ce}\\b`, "g"), "gl_FragColor"));
            }
          }
        let C = this.gl.createShader(g);
        this.gl.shaderSource(C, b), this.gl.compileShader(C);
        let I = this.gl.getShaderInfoLog(C);
        if (this.gl.getShaderParameter(C, this.gl.COMPILE_STATUS))
          I && console.warn(I);
        else {
          let re = /ERROR: 0:(\d+):/.exec(I);
          if (re) {
            let ce = parseFloat(re[1]),
              we = b.split(`
`),
              me =
                g === this.gl.VERTEX_SHADER
                  ? "Vertex Shader"
                  : "Fragment Shader";
            throw (
              (console.groupCollapsed(`${me} source`),
              console.warn(b),
              console.groupEnd(),
              new Error(`${me}: ${I}
at: ${we[ce - 1].replace(/^\s*/, "")}`))
            );
          } else throw new Error(I);
        }
        let ee = this._attachedShaders.get(g);
        if (
          (ee &&
            (this.gl.detachShader(this._program, ee), this.gl.deleteShader(ee)),
          this.gl.attachShader(this._program, C),
          this.gl.deleteShader(C),
          this._attachedShaders.set(g, C),
          this._attachedShaders.size === 2)
        ) {
          this.gl.linkProgram(this._program);
          let re = this.gl.getProgramInfoLog(this._program);
          if (this.gl.getProgramParameter(this._program, this.gl.LINK_STATUS))
            re && console.warn(re);
          else throw new Error(re);
          (this._attributesLocations = new Map()),
            (this._uniformLocations = new Map()),
            this.use(),
            this.uniforms.clear(),
            this._textureUnits.clear();
          let ce = 0;
          for (let [we, me] of Object.entries(this._shader.uniforms))
            this.uniformTypes.get(we).startsWith("sampler") &&
              (this._textureUnits.set(we, ce), ce++),
              this.uniforms.set(we, me);
        }
      }
    },
    Nt = class extends Ke {
      constructor({
        gl: g,
        width: b = void 0,
        height: C = void 0,
        columns: I = void 0,
        rows: ee = void 0,
        normals: re = !1,
        uvs: ce = !1,
        attributes: we = void 0,
        program: me = new gt({
          gl: g,
          shader: new ut({
            vertexChunks: [
              [
                "start",
                `
            in vec3 position;
          `,
              ],
              [
                "end",
                `
            gl_Position = vec4(position, 1.);
          `,
              ],
            ],
          }),
        }),
      }) {
        super({
          gl: g,
          geometry: new gr(
            Object.assign(
              {
                gl: g,
                attributes: we,
              },
              new rn({
                width: b,
                height: C,
                columns: I,
                rows: ee,
                normals: re,
                uvs: ce,
              })
            )
          ),
          program: me,
        });
      }
    },
    zt = ({
      hash: g = `
      p = fract(p * vec3(.1031, .1030, .0973));
      p += dot(p, p.yxz+33.33);
      return fract((p.xxy + p.yxx)*p.zyx);
    `,
    } = {}) => `
      // The MIT License
      // Copyright © 2017 Inigo Quilez
      // Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
      
      
      // Computes the analytic derivatives of a 3D Gradient Noise. This can be used for example to compute normals to a
      // 3d rocks based on Gradient Noise without approximating the gradient by having to take central differences. More
      // info here: http://iquilezles.org/www/articles/gradientnoise/gradientnoise.htm
      
      
      // Value    Noise 2D, Derivatives: https://www.shadertoy.com/view/4dXBRH
      // Gradient Noise 2D, Derivatives: https://www.shadertoy.com/view/XdXBRH
      // Value    Noise 3D, Derivatives: https://www.shadertoy.com/view/XsXfRH
      // Gradient Noise 3D, Derivatives: https://www.shadertoy.com/view/4dffRH
      // Value    Noise 2D             : https://www.shadertoy.com/view/lsf3WH
      // Value    Noise 3D             : https://www.shadertoy.com/view/4sfGzS
      // Gradient Noise 2D             : https://www.shadertoy.com/view/XdXGW8
      // Gradient Noise 3D             : https://www.shadertoy.com/view/Xsl3Dl
      // Simplex  Noise 2D             : https://www.shadertoy.com/view/Msf3WH
      
      
      vec3 gradientDerivativesNoise3DHash( vec3 p )
      {
        ${g}
      }
      
      // return value noise (in x) and its derivatives (in yzw)
      vec4 gradientDerivativesNoise3D( in vec3 x )
      {
          // grid
          vec3 p = floor(x);
          vec3 w = fract(x);
          
          #if 1
          // quintic interpolant
          vec3 u = w*w*w*(w*(w*6.0-15.0)+10.0);
          vec3 du = 30.0*w*w*(w*(w-2.0)+1.0);
          #else
          // cubic interpolant
          vec3 u = w*w*(3.0-2.0*w);
          vec3 du = 6.0*w*(1.0-w);
          #endif    
          
          // gradients
          vec3 ga = gradientDerivativesNoise3DHash( p+vec3(0.0,0.0,0.0) );
          vec3 gb = gradientDerivativesNoise3DHash( p+vec3(1.0,0.0,0.0) );
          vec3 gc = gradientDerivativesNoise3DHash( p+vec3(0.0,1.0,0.0) );
          vec3 gd = gradientDerivativesNoise3DHash( p+vec3(1.0,1.0,0.0) );
          vec3 ge = gradientDerivativesNoise3DHash( p+vec3(0.0,0.0,1.0) );
          vec3 gf = gradientDerivativesNoise3DHash( p+vec3(1.0,0.0,1.0) );
          vec3 gg = gradientDerivativesNoise3DHash( p+vec3(0.0,1.0,1.0) );
          vec3 gh = gradientDerivativesNoise3DHash( p+vec3(1.0,1.0,1.0) );
          
          // projections
          float va = dot( ga, w-vec3(0.0,0.0,0.0) );
          float vb = dot( gb, w-vec3(1.0,0.0,0.0) );
          float vc = dot( gc, w-vec3(0.0,1.0,0.0) );
          float vd = dot( gd, w-vec3(1.0,1.0,0.0) );
          float ve = dot( ge, w-vec3(0.0,0.0,1.0) );
          float vf = dot( gf, w-vec3(1.0,0.0,1.0) );
          float vg = dot( gg, w-vec3(0.0,1.0,1.0) );
          float vh = dot( gh, w-vec3(1.0,1.0,1.0) );
        
          // interpolations
          return vec4( va + u.x*(vb-va) + u.y*(vc-va) + u.z*(ve-va) + u.x*u.y*(va-vb-vc+vd) + u.y*u.z*(va-vc-ve+vg) + u.z*u.x*(va-vb-ve+vf) + (-va+vb+vc-vd+ve-vf-vg+vh)*u.x*u.y*u.z,    // value
                      ga + u.x*(gb-ga) + u.y*(gc-ga) + u.z*(ge-ga) + u.x*u.y*(ga-gb-gc+gd) + u.y*u.z*(ga-gc-ge+gg) + u.z*u.x*(ga-gb-ge+gf) + (-ga+gb+gc-gd+ge-gf-gg+gh)*u.x*u.y*u.z +   // derivatives
                      du * (vec3(vb,vc,ve) - va + u.yzx*vec3(va-vb-vc+vd,va-vc-ve+vg,va-vb-ve+vf) + u.zxy*vec3(va-vb-ve+vf,va-vb-vc+vd,va-vc-ve+vg) + u.yzx*u.zxy*(-va+vb+vc-vd+ve-vf-vg+vh) ));
      }
    `,
    sn,
    nt,
    an,
    ln,
    un,
    Bt = class {
      constructor() {
        n(this, sn, void 0),
          n(this, nt, void 0),
          n(this, an, void 0),
          n(this, ln, void 0),
          n(this, un, void 0);
      }
      resize(g = e(this, an), b = e(this, ln)) {
        var C, I;
        l(this, an, g),
          l(this, ln, b),
          (C = this.gl) == null ||
            C.viewport(
              0,
              0,
              this.gl.drawingBufferWidth,
              this.gl.drawingBufferHeight
            ),
          (I = e(this, un)) == null ||
            I.program.uniforms.set("viewportSize", [g, b]),
          this.draw();
      }
      draw({ canvas: g = e(this, nt), uniforms: b = e(this, sn) } = {}) {
        if (g) {
          if (e(this, nt) !== g) {
            l(this, nt, g);
            let C = {
              depth: !0,
              alpha: !1,
              antialias: !0,
              preserveDrawingBuffer: !0,
            };
            /\bforcewebgl1\b/.test(window.location.search) ||
              (this.gl = e(this, nt).getContext("webgl2", C)),
              this.gl ||
                (this.gl =
                  e(this, nt).getContext("webgl", C) ||
                  e(this, nt).getContext("experimental-webgl", C)),
              l(
                this,
                un,
                new Nt({
                  gl: this.gl,
                  width: 2,
                  height: 2,
                  program: new gt({
                    gl: this.gl,
                    shader: new ut({
                      uniforms: {
                        noiseSize: 0.5,
                        noiseIntensity: 0.04,
                      },
                      vertex: `#version 300 es
  
  in vec3 position;
  out vec2 vPosition;
  
  void main() {
    gl_Position = vec4(position, 1.);
    vPosition = position.xy;
  }
  `,
                      fragment: `#version 300 es
  precision highp float;
  
  uniform vec3 color1;
  uniform vec3 color2;
  uniform vec3 color3;
  uniform vec3 color4;
  uniform float colorSize;
  uniform float colorSpacing;
  uniform float colorRotation;
  uniform float colorSpread;
  uniform float displacement;
  uniform float zoom;
  uniform float spacing;
  uniform float seed;
  uniform vec2 viewportSize;
  uniform vec2 colorOffset;
  uniform vec2 transformPosition;
  uniform float noiseSize;
  uniform float noiseIntensity;
  
  in vec2 vPosition;
  
  out vec4 fragColor;
  
  ${zt()}
  
  float hash(vec2 p)
  {
    p = 50.0 * fract(p * 0.3183099 + vec2(0.71, 0.113));
    return -1.0 + 2.0 * fract(p.x * p.y * (p.x + p.y));
  }
  
  float computeNoise(in vec2 p)
  {
    vec2 i = floor(p);
    vec2 f = fract(p);
  
    vec2 u = f * f * (3.0 - 2.0 * f);
  
    return mix(mix(hash(i + vec2(0.0, 0.0)),
        hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)),
        hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  
  vec2 rotate(vec2 v, float a) {
    float s = sin(a);
    float c = cos(a);
    mat2 m = mat2(c, -s, s, c);
    return m * v;
  }
  
  void main() {
    vec2 position = vPosition;
    position.x *= min(1., viewportSize.x / viewportSize.y);
    position.y *= min(1., viewportSize.y / viewportSize.x);
    position /= zoom;
    position += transformPosition;
  
    vec2 noiseLocalPosition = position * .5 + .5;
    vec3 displacementNoise = gradientDerivativesNoise3D(vec3(noiseLocalPosition, seed)).xyz;
  
    float noise = computeNoise(vPosition * viewportSize / noiseSize);
  
    position += displacementNoise.xz * displacement;
  
    vec2 offsetedPosition = position;
    offsetedPosition -= colorOffset;
    offsetedPosition = mod(offsetedPosition - spacing, vec2(spacing * 2.)) - spacing;
    offsetedPosition = rotate(offsetedPosition, -colorRotation);
    offsetedPosition /= vec2(colorSize, colorSize);
    offsetedPosition *= vec2(1. / colorSpread, 1.);
    vec3 color = vec3(0.);
    color = mix(color1, color, smoothstep(0., 1., distance(offsetedPosition, vec2(0., colorSpacing * 1.5))));
    color = mix(color2, color, smoothstep(0., 1., distance(offsetedPosition, vec2(0., colorSpacing * .5))));
    color = mix(color3, color, smoothstep(0., 1., distance(offsetedPosition, vec2(0., -colorSpacing * .5))));
    color = mix(color4, color, smoothstep(0., 1., distance(offsetedPosition, vec2(0., -colorSpacing * 1.5))));
  
    color += noise * noiseIntensity;
    color = clamp(color, 0., 1.);
  
    fragColor = vec4(color, 1.);
  }
  `,
                    }),
                  }),
                })
              );
          }
          this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT),
            l(this, sn, b),
            e(this, un).draw({
              bind: !0,
              uniforms: e(this, sn),
            });
        }
      }
      dispose() {
        l(this, nt, null),
          this.gl.getExtension("WEBGL_lose_context").loseContext();
      }
    };
  (sn = new WeakMap()),
    (nt = new WeakMap()),
    (an = new WeakMap()),
    (ln = new WeakMap()),
    (un = new WeakMap());
  var Tt,
    Wt,
    Ut,
    Ve,
    ze,
    Vt,
    In,
    cn,
    fn,
    dn,
    Gt,
    mt,
    vt,
    hn,
    Lt,
    jt,
    Et,
    pn,
    Fn,
    St,
    Dt,
    gn,
    mn,
    Xt,
    Hn,
    ct,
    Yt,
    qn;
  window.customElements.define(
    "albana-gradient",
    ((qn = class extends ne {
      constructor() {
        super(),
          n(this, ct),
          n(this, Tt, "#00a537ff"),
          n(this, Wt, "#00970dff"),
          n(this, Ut, "#008643ff"),
          n(this, Ve, "#ffff00"),
          n(this, ze, $e.styleToRGBA(e(this, Tt)).slice(0, 3)),
          n(this, Vt, $e.styleToRGBA(e(this, Wt)).slice(0, 3)),
          n(this, In, $e.styleToRGBA(e(this, Ut)).slice(0, 3)),
          n(this, cn, $e.styleToRGBA(e(this, Ve)).slice(0, 3)),
          n(this, fn, 0.5),
          n(this, dn, 0.5),
          n(this, Gt, 1),
          n(this, mt, 0),
          n(this, vt, [0, 0]),
          n(this, hn, 2),
          n(this, Lt, 1),
          n(this, jt, 0),
          n(this, Et, 5),
          n(this, pn, [0, 0]),
          n(this, Fn, void 0),
          n(this, St, void 0),
          n(this, Dt, void 0),
          n(this, gn, void 0),
          n(this, mn, void 0),
          n(this, Xt, void 0),
          n(this, Hn, void 0),
          r(this, "pause", () => {
            super.pause();
          }),
          (this.attachShadow({
            mode: "open",
          }).innerHTML = `
      <style>
        :host {
          display: block;
          position: relative;
          contain: content;
          width: 300px;
          height: 150px;
        }

        :host([interactive]) {
          touch-action: none;
        }
        
        canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      </style>
      <canvas></canvas>
    `),
          l(this, St, this.shadowRoot.querySelector("canvas")),
          l(this, Dt, new Bt()),
          l(
            this,
            Hn,
            new ResizeObserver((g) => {
              l(this, gn, g[0].contentRect.width),
                l(this, mn, g[0].contentRect.height),
                d(this, ct, Yt).call(this);
            })
          ),
          e(this, Hn).observe(this),
          l(
            this,
            Xt,
            new ri((g) => {
              (this.position = [
                this.position[0] -
                  g.movementX / (e(this, gn) * 0.5) / e(this, Lt),
                this.position[1] +
                  g.movementY / (e(this, mn) * 0.5) / e(this, Lt),
              ]),
                g.movementScale !== 1 && (this.zoom *= g.movementScale),
                g.movementRotation &&
                  (this.colorRotation += g.movementRotation);
            })
          ),
          this.pause();
      }
      static get observedAttributes() {
        return [
          "interactive",
          "color1",
          "color2",
          "color3",
          "color4",
          "position",
          "colorsize",
          "colorspacing",
          "coloroffset",
          "colorrotation",
          "colorspread",
          "displacement",
          "zoom",
          "spacing",
          "seed",
          "noretina",
        ];
      }
      connectedCallback() {
        let g = document.createElement("canvas");
        e(this, St).replaceWith(g), l(this, St, g), this.update();
      }
      disconnectedCallback() {
        e(this, Dt).dispose();
      }
      attributeChangedCallback(g, b, C) {
        switch (g) {
          case "interactive":
            C !== null
              ? (this.addEventListener("wheel", this._onWheel),
                e(this, Xt).observe(this))
              : (this.removeEventListener("wheel", this._onWheel),
                e(this, Xt).unobserve(this));
            break;
          case "color1":
            l(this, Tt, C), l(this, ze, $e.styleToRGBA(C).slice(0, 3));
            break;
          case "color2":
            l(this, Wt, C), l(this, Vt, $e.styleToRGBA(C).slice(0, 3));
            break;
          case "color3":
            l(this, Ut, C), l(this, In, $e.styleToRGBA(C).slice(0, 3));
            break;
          case "color4":
            l(this, Ve, C), l(this, cn, $e.styleToRGBA(C).slice(0, 3));
            break;
          case "colorsize":
            l(this, fn, Number(C));
            break;
          case "colorspacing":
            l(this, dn, Number(C));
            break;
          case "colorspread":
            l(this, Gt, Number(C));
            break;
          case "colorrotation":
            l(this, mt, Number(C));
            break;
          case "coloroffset":
            l(this, vt, C.split(",").map(Number));
            break;
          case "position":
            l(this, pn, C.split(",").map(Number));
            break;
          case "zoom":
            l(this, Lt, Number(C));
            break;
          case "spacing":
            l(this, Et, Number(C));
            break;
          case "displacement":
            l(this, hn, Number(C));
            break;
          case "seed":
            l(this, jt, Number(C));
            break;
          case "noretina":
            d(this, ct, Yt).call(this);
            break;
        }
        this.play(),
          cancelAnimationFrame(e(this, Fn)),
          l(this, Fn, requestAnimationFrame(this.pause)),
          this.dispatchEvent(new Event("change"));
      }
      _onWheel(g) {
        g.deltaY < 0 ? (this.zoom *= 1.05) : (this.zoom *= 0.95);
      }
      get color1() {
        return e(this, Tt);
      }
      set color1(g) {
        this.setAttribute("color1", g);
      }
      get color2() {
        return e(this, Wt);
      }
      set color2(g) {
        this.setAttribute("color2", g);
      }
      get color3() {
        return e(this, Ut);
      }
      set color3(g) {
        this.setAttribute("color3", g);
      }
      get color4() {
        return e(this, Ve);
      }
      set color4(g) {
        this.setAttribute("color4", g);
      }
      get colorOffset() {
        return e(this, vt);
      }
      set colorOffset(g) {
        this.setAttribute("coloroffset", String(g));
      }
      get colorRotation() {
        return e(this, mt);
      }
      set colorRotation(g) {
        this.setAttribute("colorrotation", String(g));
      }
      get colorSpread() {
        return e(this, Gt);
      }
      set colorSpread(g) {
        this.setAttribute("colorspread", String(g));
      }
      get position() {
        return e(this, pn);
      }
      set position(g) {
        this.setAttribute("position", String(g));
      }
      get colorSize() {
        return e(this, fn);
      }
      set colorSize(g) {
        this.setAttribute("colorsize", String(g));
      }
      get colorSpacing() {
        return e(this, dn);
      }
      set colorSpacing(g) {
        this.setAttribute("colorspacing", String(g));
      }
      get displacement() {
        return e(this, hn);
      }
      set displacement(g) {
        this.setAttribute("displacement", String(g));
      }
      get spacing() {
        return e(this, Et);
      }
      set spacing(g) {
        this.setAttribute("spacing", String(g));
      }
      get zoom() {
        return e(this, Lt);
      }
      set zoom(g) {
        this.setAttribute("zoom", String(g));
      }
      get seed() {
        return e(this, jt);
      }
      set seed(g) {
        this.setAttribute("seed", String(g));
      }
      get noRetina() {
        return this.hasAttribute("noretina");
      }
      set noRetina(g) {
        this.toggleAttribute("noretina", g);
      }
      update() {
        e(this, Dt).draw({
          canvas: e(this, St),
          uniforms: {
            color1: e(this, ze),
            color2: e(this, Vt),
            color3: e(this, In),
            color4: e(this, cn),
            colorSize: e(this, fn),
            colorSpacing: e(this, dn),
            colorSpread: e(this, Gt),
            colorRotation: e(this, mt),
            colorOffset: e(this, vt),
            displacement: e(this, hn),
            zoom: e(this, Lt),
            seed: e(this, jt),
            spacing: e(this, Et),
            transformPosition: e(this, pn),
          },
        });
      }
      exportAsPNG({ width: g = 2048, height: b = 2048 } = {}) {
        d(this, ct, Yt).call(this, g, b, 1);
        let C = document.createElement("a");
        C.setAttribute("download", "albana-gradient.png"),
          e(this, St).toBlob((I) => {
            let ee = URL.createObjectURL(I);
            C.setAttribute("href", ee), C.click();
          }),
          d(this, ct, Yt).call(this);
      }
    }),
    (Tt = new WeakMap()),
    (Wt = new WeakMap()),
    (Ut = new WeakMap()),
    (Ve = new WeakMap()),
    (ze = new WeakMap()),
    (Vt = new WeakMap()),
    (In = new WeakMap()),
    (cn = new WeakMap()),
    (fn = new WeakMap()),
    (dn = new WeakMap()),
    (Gt = new WeakMap()),
    (mt = new WeakMap()),
    (vt = new WeakMap()),
    (hn = new WeakMap()),
    (Lt = new WeakMap()),
    (jt = new WeakMap()),
    (Et = new WeakMap()),
    (pn = new WeakMap()),
    (Fn = new WeakMap()),
    (St = new WeakMap()),
    (Dt = new WeakMap()),
    (gn = new WeakMap()),
    (mn = new WeakMap()),
    (Xt = new WeakMap()),
    (Hn = new WeakMap()),
    (ct = new WeakSet()),
    (Yt = function (
      g = e(this, gn),
      b = e(this, mn),
      C = this.noRetina ? 1 : window.devicePixelRatio
    ) {
      (e(this, St).width = g * C),
        (e(this, St).height = b * C),
        e(this, Dt).resize(g, b);
    }),
    qn)
  );
})();

function ja(s, i) {
  for (var r = 0; r < i.length; r++) {
    var o = i[r];
    (o.enumerable = o.enumerable || !1),
      (o.configurable = !0),
      "value" in o && (o.writable = !0),
      Object.defineProperty(s, o.key, o);
  }
}

function Bi(s, i, r) {
  return i && ja(s.prototype, i), s;
}

function En() {
  return (En =
    Object.assign ||
    function (s) {
      for (var i = 1; i < arguments.length; i++) {
        var r = arguments[i];
        for (var o in r)
          Object.prototype.hasOwnProperty.call(r, o) && (s[o] = r[o]);
      }
      return s;
    }).apply(this, arguments);
}

function Gr(s, i) {
  (s.prototype = Object.create(i.prototype)),
    (s.prototype.constructor = s),
    (s.__proto__ = i);
}

function Zo(s) {
  return (Zo = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function (i) {
        return i.__proto__ || Object.getPrototypeOf(i);
      })(s);
}

function Wi(s, i) {
  return (Wi =
    Object.setPrototypeOf ||
    function (r, o) {
      return (r.__proto__ = o), r;
    })(s, i);
}

function es(s, i, r) {
  return (es = (function () {
    if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
      return !1;
    if (typeof Proxy == "function") return !0;
    try {
      return (
        Date.prototype.toString.call(
          Reflect.construct(Date, [], function () {})
        ),
        !0
      );
    } catch {
      return !1;
    }
  })()
    ? Reflect.construct
    : function (o, e, n) {
        var l = [null];
        l.push.apply(l, e);
        var d = new (Function.bind.apply(o, l))();
        return n && Wi(d, n.prototype), d;
      }).apply(null, arguments);
}

function ts(s) {
  var i = typeof Map == "function" ? new Map() : void 0;
  return (ts = function (r) {
    if (r === null || Function.toString.call(r).indexOf("[native code]") === -1)
      return r;
    if (typeof r != "function")
      throw new TypeError("Super expression must either be null or a function");
    if (i !== void 0) {
      if (i.has(r)) return i.get(r);
      i.set(r, o);
    }

    function o() {
      return es(r, arguments, Zo(this).constructor);
    }
    return (
      (o.prototype = Object.create(r.prototype, {
        constructor: {
          value: o,
          enumerable: !1,
          writable: !0,
          configurable: !0,
        },
      })),
      Wi(o, r)
    );
  })(s);
}

function Bn(s, i) {
  try {
    var r = s();
  } catch (o) {
    return i(o);
  }
  return r && r.then ? r.then(void 0, i) : r;
}
typeof Symbol < "u" &&
  (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))),
  typeof Symbol < "u" &&
    (Symbol.asyncIterator ||
      (Symbol.asyncIterator = Symbol("Symbol.asyncIterator")));
var nn,
  Da = "2.9.7",
  Ma = function () {};
(function (s) {
  (s[(s.off = 0)] = "off"),
    (s[(s.error = 1)] = "error"),
    (s[(s.warning = 2)] = "warning"),
    (s[(s.info = 3)] = "info"),
    (s[(s.debug = 4)] = "debug");
})(nn || (nn = {}));
var Co = nn.off,
  An = (function () {
    function s(r) {
      this.t = r;
    }
    (s.getLevel = function () {
      return Co;
    }),
      (s.setLevel = function (r) {
        return (Co = nn[r]);
      });
    var i = s.prototype;
    return (
      (i.error = function () {
        for (var r = arguments.length, o = new Array(r), e = 0; e < r; e++)
          o[e] = arguments[e];
        this.i(console.error, nn.error, o);
      }),
      (i.warn = function () {
        for (var r = arguments.length, o = new Array(r), e = 0; e < r; e++)
          o[e] = arguments[e];
        this.i(console.warn, nn.warning, o);
      }),
      (i.info = function () {
        for (var r = arguments.length, o = new Array(r), e = 0; e < r; e++)
          o[e] = arguments[e];
        this.i(console.info, nn.info, o);
      }),
      (i.debug = function () {
        for (var r = arguments.length, o = new Array(r), e = 0; e < r; e++)
          o[e] = arguments[e];
        this.i(console.log, nn.debug, o);
      }),
      (i.i = function (r, o, e) {
        o <= s.getLevel() && r.apply(console, ["[" + this.t + "] "].concat(e));
      }),
      s
    );
  })(),
  xn = Gi,
  Ia = rs,
  Fa = Ui,
  Ha = is,
  qa = os,
  ns = "/",
  $a = new RegExp(
    [
      "(\\\\.)",
      "(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?",
    ].join("|"),
    "g"
  );

function Ui(s, i) {
  for (
    var r,
      o = [],
      e = 0,
      n = 0,
      l = "",
      d = (i && i.delimiter) || ns,
      p = (i && i.whitelist) || void 0,
      v = !1;
    (r = $a.exec(s)) !== null;

  ) {
    var T = r[0],
      P = r[1],
      E = r.index;
    if (((l += s.slice(n, E)), (n = E + T.length), P)) (l += P[1]), (v = !0);
    else {
      var q = "",
        N = r[2],
        M = r[3],
        V = r[4],
        Y = r[5];
      if (!v && l.length) {
        var X = l.length - 1,
          z = l[X];
        (!p || p.indexOf(z) > -1) && ((q = z), (l = l.slice(0, X)));
      }
      l && (o.push(l), (l = ""), (v = !1));
      var J = M || V,
        K = q || d;
      o.push({
        name: N || e++,
        prefix: q,
        delimiter: K,
        optional: Y === "?" || Y === "*",
        repeat: Y === "+" || Y === "*",
        pattern: J ? za(J) : "[^" + Ht(K === d ? K : K + d) + "]+?",
      });
    }
  }
  return (l || n < s.length) && o.push(l + s.substr(n)), o;
}

function rs(s, i) {
  return function (r, o) {
    var e = s.exec(r);
    if (!e) return !1;
    for (
      var n = e[0],
        l = e.index,
        d = {},
        p = (o && o.decode) || decodeURIComponent,
        v = 1;
      v < e.length;
      v++
    )
      if (e[v] !== void 0) {
        var T = i[v - 1];
        d[T.name] = T.repeat
          ? e[v].split(T.delimiter).map(function (P) {
              return p(P, T);
            })
          : p(e[v], T);
      }
    return {
      path: n,
      index: l,
      params: d,
    };
  };
}

function is(s, i) {
  for (var r = new Array(s.length), o = 0; o < s.length; o++)
    typeof s[o] == "object" &&
      (r[o] = new RegExp("^(?:" + s[o].pattern + ")$", Vi(i)));
  return function (e, n) {
    for (
      var l = "",
        d = (n && n.encode) || encodeURIComponent,
        p = !n || n.validate !== !1,
        v = 0;
      v < s.length;
      v++
    ) {
      var T = s[v];
      if (typeof T != "string") {
        var P,
          E = e ? e[T.name] : void 0;
        if (Array.isArray(E)) {
          if (!T.repeat)
            throw new TypeError(
              'Expected "' + T.name + '" to not repeat, but got array'
            );
          if (E.length === 0) {
            if (T.optional) continue;
            throw new TypeError('Expected "' + T.name + '" to not be empty');
          }
          for (var q = 0; q < E.length; q++) {
            if (((P = d(E[q], T)), p && !r[v].test(P)))
              throw new TypeError(
                'Expected all "' + T.name + '" to match "' + T.pattern + '"'
              );
            l += (q === 0 ? T.prefix : T.delimiter) + P;
          }
        } else if (
          typeof E != "string" &&
          typeof E != "number" &&
          typeof E != "boolean"
        ) {
          if (!T.optional)
            throw new TypeError(
              'Expected "' +
                T.name +
                '" to be ' +
                (T.repeat ? "an array" : "a string")
            );
        } else {
          if (((P = d(String(E), T)), p && !r[v].test(P)))
            throw new TypeError(
              'Expected "' +
                T.name +
                '" to match "' +
                T.pattern +
                '", but got "' +
                P +
                '"'
            );
          l += T.prefix + P;
        }
      } else l += T;
    }
    return l;
  };
}

function Ht(s) {
  return s.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}

function za(s) {
  return s.replace(/([=!:$/()])/g, "\\$1");
}

function Vi(s) {
  return s && s.sensitive ? "" : "i";
}

function os(s, i, r) {
  for (
    var o = (r = r || {}).strict,
      e = r.start !== !1,
      n = r.end !== !1,
      l = r.delimiter || ns,
      d = []
        .concat(r.endsWith || [])
        .map(Ht)
        .concat("$")
        .join("|"),
      p = e ? "^" : "",
      v = 0;
    v < s.length;
    v++
  ) {
    var T = s[v];
    if (typeof T == "string") p += Ht(T);
    else {
      var P = T.repeat
        ? "(?:" +
          T.pattern +
          ")(?:" +
          Ht(T.delimiter) +
          "(?:" +
          T.pattern +
          "))*"
        : T.pattern;
      i && i.push(T),
        (p += T.optional
          ? T.prefix
            ? "(?:" + Ht(T.prefix) + "(" + P + "))?"
            : "(" + P + ")?"
          : Ht(T.prefix) + "(" + P + ")");
    }
  }
  if (n)
    o || (p += "(?:" + Ht(l) + ")?"), (p += d === "$" ? "$" : "(?=" + d + ")");
  else {
    var E = s[s.length - 1],
      q = typeof E == "string" ? E[E.length - 1] === l : E === void 0;
    o || (p += "(?:" + Ht(l) + "(?=" + d + "))?"),
      q || (p += "(?=" + Ht(l) + "|" + d + ")");
  }
  return new RegExp(p, Vi(r));
}

function Gi(s, i, r) {
  return s instanceof RegExp
    ? (function (o, e) {
        if (!e) return o;
        var n = o.source.match(/\((?!\?)/g);
        if (n)
          for (var l = 0; l < n.length; l++)
            e.push({
              name: l,
              prefix: null,
              delimiter: null,
              optional: !1,
              repeat: !1,
              pattern: null,
            });
        return o;
      })(s, i)
    : Array.isArray(s)
    ? (function (o, e, n) {
        for (var l = [], d = 0; d < o.length; d++)
          l.push(Gi(o[d], e, n).source);
        return new RegExp("(?:" + l.join("|") + ")", Vi(n));
      })(s, i, r)
    : (function (o, e, n) {
        return os(Ui(o, n), e, n);
      })(s, i, r);
}
(xn.match = function (s, i) {
  var r = [];
  return rs(Gi(s, r, i), r);
}),
  (xn.regexpToFunction = Ia),
  (xn.parse = Fa),
  (xn.compile = function (s, i) {
    return is(Ui(s, i), i);
  }),
  (xn.tokensToFunction = Ha),
  (xn.tokensToRegExp = qa);
var Pt = {
    container: "container",
    history: "history",
    namespace: "namespace",
    prefix: "data-barba",
    prevent: "prevent",
    wrapper: "wrapper",
  },
  Pn = new ((function () {
    function s() {
      (this.o = Pt), (this.u = new DOMParser());
    }
    var i = s.prototype;
    return (
      (i.toString = function (r) {
        return r.outerHTML;
      }),
      (i.toDocument = function (r) {
        return this.u.parseFromString(r, "text/html");
      }),
      (i.toElement = function (r) {
        var o = document.createElement("div");
        return (o.innerHTML = r), o;
      }),
      (i.getHtml = function (r) {
        return r === void 0 && (r = document), this.toString(r.documentElement);
      }),
      (i.getWrapper = function (r) {
        return (
          r === void 0 && (r = document),
          r.querySelector("[" + this.o.prefix + '="' + this.o.wrapper + '"]')
        );
      }),
      (i.getContainer = function (r) {
        return (
          r === void 0 && (r = document),
          r.querySelector("[" + this.o.prefix + '="' + this.o.container + '"]')
        );
      }),
      (i.removeContainer = function (r) {
        document.body.contains(r) && r.parentNode.removeChild(r);
      }),
      (i.addContainer = function (r, o) {
        var e = this.getContainer();
        e ? this.s(r, e) : o.appendChild(r);
      }),
      (i.getNamespace = function (r) {
        r === void 0 && (r = document);
        var o = r.querySelector(
          "[" + this.o.prefix + "-" + this.o.namespace + "]"
        );
        return o
          ? o.getAttribute(this.o.prefix + "-" + this.o.namespace)
          : null;
      }),
      (i.getHref = function (r) {
        if (r.tagName && r.tagName.toLowerCase() === "a") {
          if (typeof r.href == "string") return r.href;
          var o = r.getAttribute("href") || r.getAttribute("xlink:href");
          if (o) return this.resolveUrl(o.baseVal || o);
        }
        return null;
      }),
      (i.resolveUrl = function () {
        for (var r = arguments.length, o = new Array(r), e = 0; e < r; e++)
          o[e] = arguments[e];
        var n = o.length;
        if (n === 0)
          throw new Error(
            "resolveUrl requires at least one argument; got none."
          );
        var l = document.createElement("base");
        if (((l.href = arguments[0]), n === 1)) return l.href;
        var d = document.getElementsByTagName("head")[0];
        d.insertBefore(l, d.firstChild);
        for (var p, v = document.createElement("a"), T = 1; T < n; T++)
          (v.href = arguments[T]), (l.href = p = v.href);
        return d.removeChild(l), p;
      }),
      (i.s = function (r, o) {
        o.parentNode.insertBefore(r, o.nextSibling);
      }),
      s
    );
  })())(),
  ss = new ((function () {
    function s() {
      (this.h = []), (this.v = -1);
    }
    var i = s.prototype;
    return (
      (i.init = function (r, o) {
        this.l = "barba";
        var e = {
          ns: o,
          scroll: {
            x: window.scrollX,
            y: window.scrollY,
          },
          url: r,
        };
        this.h.push(e), (this.v = 0);
        var n = {
          from: this.l,
          index: 0,
          states: [].concat(this.h),
        };
        window.history && window.history.replaceState(n, "", r);
      }),
      (i.change = function (r, o, e) {
        if (e && e.state) {
          var n = e.state,
            l = n.index;
          (o = this.m(this.v - l)), this.replace(n.states), (this.v = l);
        } else this.add(r, o);
        return o;
      }),
      (i.add = function (r, o) {
        var e = this.size,
          n = this.p(o),
          l = {
            ns: "tmp",
            scroll: {
              x: window.scrollX,
              y: window.scrollY,
            },
            url: r,
          };
        this.h.push(l), (this.v = e);
        var d = {
          from: this.l,
          index: e,
          states: [].concat(this.h),
        };
        switch (n) {
          case "push":
            window.history && window.history.pushState(d, "", r);
            break;
          case "replace":
            window.history && window.history.replaceState(d, "", r);
        }
      }),
      (i.update = function (r, o) {
        var e = o || this.v,
          n = En({}, this.get(e), {}, r);
        this.set(e, n);
      }),
      (i.remove = function (r) {
        r ? this.h.splice(r, 1) : this.h.pop(), this.v--;
      }),
      (i.clear = function () {
        (this.h = []), (this.v = -1);
      }),
      (i.replace = function (r) {
        this.h = r;
      }),
      (i.get = function (r) {
        return this.h[r];
      }),
      (i.set = function (r, o) {
        return (this.h[r] = o);
      }),
      (i.p = function (r) {
        var o = "push",
          e = r,
          n = Pt.prefix + "-" + Pt.history;
        return (
          e.hasAttribute && e.hasAttribute(n) && (o = e.getAttribute(n)), o
        );
      }),
      (i.m = function (r) {
        return Math.abs(r) > 1
          ? r > 0
            ? "forward"
            : "back"
          : r === 0
          ? "popstate"
          : r > 0
          ? "back"
          : "forward";
      }),
      Bi(s, [
        {
          key: "current",
          get: function () {
            return this.h[this.v];
          },
        },
        {
          key: "state",
          get: function () {
            return this.h[this.h.length - 1];
          },
        },
        {
          key: "previous",
          get: function () {
            return this.v < 1 ? null : this.h[this.v - 1];
          },
        },
        {
          key: "size",
          get: function () {
            return this.h.length;
          },
        },
      ]),
      s
    );
  })())(),
  jr = function (s, i) {
    try {
      var r = (function () {
        if (!i.next.html)
          return Promise.resolve(s).then(function (o) {
            var e = i.next;
            if (o) {
              var n = Pn.toElement(o);
              (e.namespace = Pn.getNamespace(n)),
                (e.container = Pn.getContainer(n)),
                (e.html = o),
                ss.update({
                  ns: e.namespace,
                });
              var l = Pn.toDocument(o);
              document.title = l.title;
            }
          });
      })();
      return Promise.resolve(r && r.then ? r.then(function () {}) : void 0);
    } catch (o) {
      return Promise.reject(o);
    }
  },
  as = xn,
  Ba = {
    __proto__: null,
    update: jr,
    nextTick: function () {
      return new Promise(function (s) {
        window.requestAnimationFrame(s);
      });
    },
    pathToRegexp: as,
  },
  ls = function () {
    return window.location.origin;
  },
  or = function (s) {
    return s === void 0 && (s = window.location.href), Dr(s).port;
  },
  Dr = function (s) {
    var i,
      r = s.match(/:\d+/);
    if (r === null) /^http/.test(s) && (i = 80), /^https/.test(s) && (i = 443);
    else {
      var o = r[0].substring(1);
      i = parseInt(o, 10);
    }
    var e,
      n = s.replace(ls(), ""),
      l = {},
      d = n.indexOf("#");
    d >= 0 && ((e = n.slice(d + 1)), (n = n.slice(0, d)));
    var p = n.indexOf("?");
    return (
      p >= 0 && ((l = us(n.slice(p + 1))), (n = n.slice(0, p))),
      {
        hash: e,
        path: n,
        port: i,
        query: l,
      }
    );
  },
  us = function (s) {
    return s.split("&").reduce(function (i, r) {
      var o = r.split("=");
      return (i[o[0]] = o[1]), i;
    }, {});
  },
  Ni = function (s) {
    return (
      s === void 0 && (s = window.location.href),
      s.replace(/(\/#.*|\/|#.*)$/, "")
    );
  },
  Wa = {
    __proto__: null,
    getHref: function () {
      return window.location.href;
    },
    getOrigin: ls,
    getPort: or,
    getPath: function (s) {
      return s === void 0 && (s = window.location.href), Dr(s).path;
    },
    parse: Dr,
    parseQuery: us,
    clean: Ni,
  };

function Ua(s, i, r) {
  return (
    i === void 0 && (i = 2e3),
    new Promise(function (o, e) {
      var n = new XMLHttpRequest();
      (n.onreadystatechange = function () {
        if (n.readyState === XMLHttpRequest.DONE) {
          if (n.status === 200) o(n.responseText);
          else if (n.status) {
            var l = {
              status: n.status,
              statusText: n.statusText,
            };
            r(s, l), e(l);
          }
        }
      }),
        (n.ontimeout = function () {
          var l = new Error("Timeout error [" + i + "]");
          r(s, l), e(l);
        }),
        (n.onerror = function () {
          var l = new Error("Fetch error");
          r(s, l), e(l);
        }),
        n.open("GET", s),
        (n.timeout = i),
        n.setRequestHeader(
          "Accept",
          "text/html,application/xhtml+xml,application/xml"
        ),
        n.setRequestHeader("x-barba", "yes"),
        n.send();
    })
  );
}
var Va = function (s) {
  return (
    !!s &&
    (typeof s == "object" || typeof s == "function") &&
    typeof s.then == "function"
  );
};

function Wn(s, i) {
  return (
    i === void 0 && (i = {}),
    function () {
      for (var r = arguments.length, o = new Array(r), e = 0; e < r; e++)
        o[e] = arguments[e];
      var n = !1,
        l = new Promise(function (d, p) {
          i.async = function () {
            return (
              (n = !0),
              function (T, P) {
                T ? p(T) : d(P);
              }
            );
          };
          var v = s.apply(i, o);
          n || (Va(v) ? v.then(d, p) : d(v));
        });
      return l;
    }
  );
}
var tn = new ((function (s) {
    function i() {
      var o;
      return (
        ((o = s.call(this) || this).logger = new An("@barba/core")),
        (o.all = [
          "ready",
          "page",
          "reset",
          "currentAdded",
          "currentRemoved",
          "nextAdded",
          "nextRemoved",
          "beforeOnce",
          "once",
          "afterOnce",
          "before",
          "beforeLeave",
          "leave",
          "afterLeave",
          "beforeEnter",
          "enter",
          "afterEnter",
          "after",
        ]),
        (o.registered = new Map()),
        o.init(),
        o
      );
    }
    Gr(i, s);
    var r = i.prototype;
    return (
      (r.init = function () {
        var o = this;
        this.registered.clear(),
          this.all.forEach(function (e) {
            o[e] ||
              (o[e] = function (n, l) {
                o.registered.has(e) || o.registered.set(e, new Set()),
                  o.registered.get(e).add({
                    ctx: l || {},
                    fn: n,
                  });
              });
          });
      }),
      (r.do = function (o) {
        for (
          var e = this,
            n = arguments.length,
            l = new Array(n > 1 ? n - 1 : 0),
            d = 1;
          d < n;
          d++
        )
          l[d - 1] = arguments[d];
        if (this.registered.has(o)) {
          var p = Promise.resolve();
          return (
            this.registered.get(o).forEach(function (v) {
              p = p.then(function () {
                return Wn(v.fn, v.ctx).apply(void 0, l);
              });
            }),
            p.catch(function (v) {
              e.logger.debug("Hook error [" + o + "]"), e.logger.error(v);
            })
          );
        }
        return Promise.resolve();
      }),
      (r.clear = function () {
        var o = this;
        this.all.forEach(function (e) {
          delete o[e];
        }),
          this.init();
      }),
      (r.help = function () {
        this.logger.info("Available hooks: " + this.all.join(","));
        var o = [];
        this.registered.forEach(function (e, n) {
          return o.push(n);
        }),
          this.logger.info("Registered hooks: " + o.join(","));
      }),
      i
    );
  })(Ma))(),
  cs = (function () {
    function s(i) {
      if (((this.P = []), typeof i == "boolean")) this.g = i;
      else {
        var r = Array.isArray(i) ? i : [i];
        this.P = r.map(function (o) {
          return as(o);
        });
      }
    }
    return (
      (s.prototype.checkHref = function (i) {
        if (typeof this.g == "boolean") return this.g;
        var r = Dr(i).path;
        return this.P.some(function (o) {
          return o.exec(r) !== null;
        });
      }),
      s
    );
  })(),
  Ga = (function (s) {
    function i(o) {
      var e;
      return ((e = s.call(this, o) || this).k = new Map()), e;
    }
    Gr(i, s);
    var r = i.prototype;
    return (
      (r.set = function (o, e, n) {
        return (
          this.k.set(o, {
            action: n,
            request: e,
          }),
          {
            action: n,
            request: e,
          }
        );
      }),
      (r.get = function (o) {
        return this.k.get(o);
      }),
      (r.getRequest = function (o) {
        return this.k.get(o).request;
      }),
      (r.getAction = function (o) {
        return this.k.get(o).action;
      }),
      (r.has = function (o) {
        return !this.checkHref(o) && this.k.has(o);
      }),
      (r.delete = function (o) {
        return this.k.delete(o);
      }),
      (r.update = function (o, e) {
        var n = En({}, this.k.get(o), {}, e);
        return this.k.set(o, n), n;
      }),
      i
    );
  })(cs),
  Xa = function () {
    return !window.history.pushState;
  },
  Ya = function (s) {
    return !s.el || !s.href;
  },
  Ja = function (s) {
    var i = s.event;
    return i.which > 1 || i.metaKey || i.ctrlKey || i.shiftKey || i.altKey;
  },
  Ka = function (s) {
    var i = s.el;
    return i.hasAttribute("target") && i.target === "_blank";
  },
  Qa = function (s) {
    var i = s.el;
    return (
      (i.protocol !== void 0 && window.location.protocol !== i.protocol) ||
      (i.hostname !== void 0 && window.location.hostname !== i.hostname)
    );
  },
  Za = function (s) {
    var i = s.el;
    return i.port !== void 0 && or() !== or(i.href);
  },
  el = function (s) {
    var i = s.el;
    return i.getAttribute && typeof i.getAttribute("download") == "string";
  },
  tl = function (s) {
    return s.el.hasAttribute(Pt.prefix + "-" + Pt.prevent);
  },
  nl = function (s) {
    return !!s.el.closest("[" + Pt.prefix + "-" + Pt.prevent + '="all"]');
  },
  rl = function (s) {
    var i = s.href;
    return Ni(i) === Ni() && or(i) === or();
  },
  il = (function (s) {
    function i(o) {
      var e;
      return (
        ((e = s.call(this, o) || this).suite = []),
        (e.tests = new Map()),
        e.init(),
        e
      );
    }
    Gr(i, s);
    var r = i.prototype;
    return (
      (r.init = function () {
        this.add("pushState", Xa),
          this.add("exists", Ya),
          this.add("newTab", Ja),
          this.add("blank", Ka),
          this.add("corsDomain", Qa),
          this.add("corsPort", Za),
          this.add("download", el),
          this.add("preventSelf", tl),
          this.add("preventAll", nl),
          this.add("sameUrl", rl, !1);
      }),
      (r.add = function (o, e, n) {
        n === void 0 && (n = !0), this.tests.set(o, e), n && this.suite.push(o);
      }),
      (r.run = function (o, e, n, l) {
        return this.tests.get(o)({
          el: e,
          event: n,
          href: l,
        });
      }),
      (r.checkLink = function (o, e, n) {
        var l = this;
        return this.suite.some(function (d) {
          return l.run(d, o, e, n);
        });
      }),
      i
    );
  })(cs),
  Si = (function (s) {
    function i(r, o) {
      var e;
      o === void 0 && (o = "Barba error");
      for (
        var n = arguments.length, l = new Array(n > 2 ? n - 2 : 0), d = 2;
        d < n;
        d++
      )
        l[d - 2] = arguments[d];
      return (
        ((e = s.call.apply(s, [this].concat(l)) || this).error = r),
        (e.label = o),
        Error.captureStackTrace &&
          Error.captureStackTrace(
            (function (p) {
              if (p === void 0)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                );
              return p;
            })(e),
            i
          ),
        (e.name = "BarbaError"),
        e
      );
    }
    return Gr(i, s), i;
  })(ts(Error)),
  ol = (function () {
    function s(r) {
      r === void 0 && (r = []),
        (this.logger = new An("@barba/core")),
        (this.all = []),
        (this.page = []),
        (this.once = []),
        (this.A = [
          {
            name: "namespace",
            type: "strings",
          },
          {
            name: "custom",
            type: "function",
          },
        ]),
        r && (this.all = this.all.concat(r)),
        this.update();
    }
    var i = s.prototype;
    return (
      (i.add = function (r, o) {
        switch (r) {
          case "rule":
            this.A.splice(o.position || 0, 0, o.value);
            break;
          case "transition":
          default:
            this.all.push(o);
        }
        this.update();
      }),
      (i.resolve = function (r, o) {
        var e = this;
        o === void 0 && (o = {});
        var n = o.once ? this.once : this.page;
        n = n.filter(
          o.self
            ? function (E) {
                return E.name && E.name === "self";
              }
            : function (E) {
                return !E.name || E.name !== "self";
              }
        );
        var l = new Map(),
          d = n.find(function (E) {
            var q = !0,
              N = {};
            return (
              !(!o.self || E.name !== "self") ||
              (e.A.reverse().forEach(function (M) {
                q &&
                  ((q = e.R(E, M, r, N)),
                  E.from &&
                    E.to &&
                    (q = e.R(E, M, r, N, "from") && e.R(E, M, r, N, "to")),
                  E.from && !E.to && (q = e.R(E, M, r, N, "from")),
                  !E.from && E.to && (q = e.R(E, M, r, N, "to")));
              }),
              l.set(E, N),
              q)
            );
          }),
          p = l.get(d),
          v = [];
        if ((v.push(o.once ? "once" : "page"), o.self && v.push("self"), p)) {
          var T,
            P = [d];
          Object.keys(p).length > 0 && P.push(p),
            (T = this.logger).info.apply(
              T,
              ["Transition found [" + v.join(",") + "]"].concat(P)
            );
        } else this.logger.info("No transition found [" + v.join(",") + "]");
        return d;
      }),
      (i.update = function () {
        var r = this;
        (this.all = this.all
          .map(function (o) {
            return r.T(o);
          })
          .sort(function (o, e) {
            return o.priority - e.priority;
          })
          .reverse()
          .map(function (o) {
            return delete o.priority, o;
          })),
          (this.page = this.all.filter(function (o) {
            return o.leave !== void 0 || o.enter !== void 0;
          })),
          (this.once = this.all.filter(function (o) {
            return o.once !== void 0;
          }));
      }),
      (i.R = function (r, o, e, n, l) {
        var d = !0,
          p = !1,
          v = r,
          T = o.name,
          P = T,
          E = T,
          q = T,
          N = l ? v[l] : v,
          M = l === "to" ? e.next : e.current;
        if (l ? N && N[T] : N[T]) {
          switch (o.type) {
            case "strings":
            default:
              var V = Array.isArray(N[P]) ? N[P] : [N[P]];
              M[P] && V.indexOf(M[P]) !== -1 && (p = !0),
                V.indexOf(M[P]) === -1 && (d = !1);
              break;
            case "object":
              var Y = Array.isArray(N[E]) ? N[E] : [N[E]];
              M[E]
                ? (M[E].name && Y.indexOf(M[E].name) !== -1 && (p = !0),
                  Y.indexOf(M[E].name) === -1 && (d = !1))
                : (d = !1);
              break;
            case "function":
              N[q](e) ? (p = !0) : (d = !1);
          }
          p && (l ? ((n[l] = n[l] || {}), (n[l][T] = v[l][T])) : (n[T] = v[T]));
        }
        return d;
      }),
      (i.O = function (r, o, e) {
        var n = 0;
        return (
          (r[o] || (r.from && r.from[o]) || (r.to && r.to[o])) &&
            ((n += Math.pow(10, e)),
            r.from && r.from[o] && (n += 1),
            r.to && r.to[o] && (n += 2)),
          n
        );
      }),
      (i.T = function (r) {
        var o = this;
        r.priority = 0;
        var e = 0;
        return (
          this.A.forEach(function (n, l) {
            e += o.O(r, n.name, l + 1);
          }),
          (r.priority = e),
          r
        );
      }),
      s
    );
  })(),
  sl = (function () {
    function s(r) {
      r === void 0 && (r = []),
        (this.logger = new An("@barba/core")),
        (this.S = !1),
        (this.store = new ol(r));
    }
    var i = s.prototype;
    return (
      (i.get = function (r, o) {
        return this.store.resolve(r, o);
      }),
      (i.doOnce = function (r) {
        var o = r.data,
          e = r.transition;
        try {
          var n = function () {
              l.S = !1;
            },
            l = this,
            d = e || {};
          l.S = !0;
          var p = Bn(
            function () {
              return Promise.resolve(l.j("beforeOnce", o, d)).then(function () {
                return Promise.resolve(l.once(o, d)).then(function () {
                  return Promise.resolve(l.j("afterOnce", o, d)).then(
                    function () {}
                  );
                });
              });
            },
            function (v) {
              (l.S = !1),
                l.logger.debug("Transition error [before/after/once]"),
                l.logger.error(v);
            }
          );
          return Promise.resolve(p && p.then ? p.then(n) : n());
        } catch (v) {
          return Promise.reject(v);
        }
      }),
      (i.doPage = function (r) {
        var o = r.data,
          e = r.transition,
          n = r.page,
          l = r.wrapper;
        try {
          var d = function (q) {
              if (p) return q;
              v.S = !1;
            },
            p = !1,
            v = this,
            T = e || {},
            P = T.sync === !0 || !1;
          v.S = !0;
          var E = Bn(
            function () {
              function q() {
                return Promise.resolve(v.j("before", o, T)).then(function () {
                  var M = !1;

                  function V(X) {
                    return M
                      ? X
                      : Promise.resolve(v.remove(o)).then(function () {
                          return Promise.resolve(v.j("after", o, T)).then(
                            function () {}
                          );
                        });
                  }
                  var Y = (function () {
                    if (P)
                      return Bn(
                        function () {
                          return Promise.resolve(v.add(o, l)).then(function () {
                            return Promise.resolve(
                              v.j("beforeLeave", o, T)
                            ).then(function () {
                              return Promise.resolve(
                                v.j("beforeEnter", o, T)
                              ).then(function () {
                                return Promise.resolve(
                                  Promise.all([v.leave(o, T), v.enter(o, T)])
                                ).then(function () {
                                  return Promise.resolve(
                                    v.j("afterLeave", o, T)
                                  ).then(function () {
                                    return Promise.resolve(
                                      v.j("afterEnter", o, T)
                                    ).then(function () {});
                                  });
                                });
                              });
                            });
                          });
                        },
                        function (K) {
                          if (v.M(K))
                            throw new Si(K, "Transition error [sync]");
                        }
                      );
                    var X = function (K) {
                        return M
                          ? K
                          : Bn(
                              function () {
                                var f = (function () {
                                  if (z !== !1)
                                    return Promise.resolve(v.add(o, l)).then(
                                      function () {
                                        return Promise.resolve(
                                          v.j("beforeEnter", o, T)
                                        ).then(function () {
                                          return Promise.resolve(
                                            v.enter(o, T, z)
                                          ).then(function () {
                                            return Promise.resolve(
                                              v.j("afterEnter", o, T)
                                            ).then(function () {});
                                          });
                                        });
                                      }
                                    );
                                })();
                                if (f && f.then) return f.then(function () {});
                              },
                              function (f) {
                                if (v.M(f))
                                  throw new Si(
                                    f,
                                    "Transition error [before/after/enter]"
                                  );
                              }
                            );
                      },
                      z = !1,
                      J = Bn(
                        function () {
                          return Promise.resolve(v.j("beforeLeave", o, T)).then(
                            function () {
                              return Promise.resolve(
                                Promise.all([v.leave(o, T), jr(n, o)]).then(
                                  function (K) {
                                    return K[0];
                                  }
                                )
                              ).then(function (K) {
                                return (
                                  (z = K),
                                  Promise.resolve(v.j("afterLeave", o, T)).then(
                                    function () {}
                                  )
                                );
                              });
                            }
                          );
                        },
                        function (K) {
                          if (v.M(K))
                            throw new Si(
                              K,
                              "Transition error [before/after/leave]"
                            );
                        }
                      );
                    return J && J.then ? J.then(X) : X(J);
                  })();
                  return Y && Y.then ? Y.then(V) : V(Y);
                });
              }
              var N = (function () {
                if (P) return Promise.resolve(jr(n, o)).then(function () {});
              })();
              return N && N.then ? N.then(q) : q();
            },
            function (q) {
              throw (
                ((v.S = !1),
                q.name && q.name === "BarbaError"
                  ? (v.logger.debug(q.label), v.logger.error(q.error), q)
                  : (v.logger.debug("Transition error [page]"),
                    v.logger.error(q),
                    q))
              );
            }
          );
          return Promise.resolve(E && E.then ? E.then(d) : d(E));
        } catch (q) {
          return Promise.reject(q);
        }
      }),
      (i.once = function (r, o) {
        try {
          return Promise.resolve(tn.do("once", r, o)).then(function () {
            return o.once ? Wn(o.once, o)(r) : Promise.resolve();
          });
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (i.leave = function (r, o) {
        try {
          return Promise.resolve(tn.do("leave", r, o)).then(function () {
            return o.leave ? Wn(o.leave, o)(r) : Promise.resolve();
          });
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (i.enter = function (r, o, e) {
        try {
          return Promise.resolve(tn.do("enter", r, o)).then(function () {
            return o.enter ? Wn(o.enter, o)(r, e) : Promise.resolve();
          });
        } catch (n) {
          return Promise.reject(n);
        }
      }),
      (i.add = function (r, o) {
        try {
          return (
            Pn.addContainer(r.next.container, o),
            tn.do("nextAdded", r),
            Promise.resolve()
          );
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (i.remove = function (r) {
        try {
          return (
            Pn.removeContainer(r.current.container),
            tn.do("currentRemoved", r),
            Promise.resolve()
          );
        } catch (o) {
          return Promise.reject(o);
        }
      }),
      (i.M = function (r) {
        return r.message
          ? !/Timeout error|Fetch error/.test(r.message)
          : !r.status;
      }),
      (i.j = function (r, o, e) {
        try {
          return Promise.resolve(tn.do(r, o, e)).then(function () {
            return e[r] ? Wn(e[r], e)(o) : Promise.resolve();
          });
        } catch (n) {
          return Promise.reject(n);
        }
      }),
      Bi(s, [
        {
          key: "isRunning",
          get: function () {
            return this.S;
          },
          set: function (r) {
            this.S = r;
          },
        },
        {
          key: "hasOnce",
          get: function () {
            return this.store.once.length > 0;
          },
        },
        {
          key: "hasSelf",
          get: function () {
            return this.store.all.some(function (r) {
              return r.name === "self";
            });
          },
        },
        {
          key: "shouldWait",
          get: function () {
            return this.store.all.some(function (r) {
              return (r.to && !r.to.route) || r.sync;
            });
          },
        },
      ]),
      s
    );
  })(),
  al = (function () {
    function s(i) {
      var r = this;
      (this.names = ["beforeLeave", "afterLeave", "beforeEnter", "afterEnter"]),
        (this.byNamespace = new Map()),
        i.length !== 0 &&
          (i.forEach(function (o) {
            r.byNamespace.set(o.namespace, o);
          }),
          this.names.forEach(function (o) {
            tn[o](r.L(o));
          }));
    }
    return (
      (s.prototype.L = function (i) {
        var r = this;
        return function (o) {
          var e = i.match(/enter/i) ? o.next : o.current,
            n = r.byNamespace.get(e.namespace);
          return n && n[i] ? Wn(n[i], n)(o) : Promise.resolve();
        };
      }),
      s
    );
  })();
Element.prototype.matches ||
  (Element.prototype.matches =
    Element.prototype.msMatchesSelector ||
    Element.prototype.webkitMatchesSelector),
  Element.prototype.closest ||
    (Element.prototype.closest = function (s) {
      var i = this;
      do {
        if (i.matches(s)) return i;
        i = i.parentElement || i.parentNode;
      } while (i !== null && i.nodeType === 1);
      return null;
    });
var ll = {
    container: null,
    html: "",
    namespace: "",
    url: {
      hash: "",
      href: "",
      path: "",
      port: null,
      query: {},
    },
  },
  ul = new ((function () {
    function s() {
      (this.version = Da),
        (this.schemaPage = ll),
        (this.Logger = An),
        (this.logger = new An("@barba/core")),
        (this.plugins = []),
        (this.hooks = tn),
        (this.dom = Pn),
        (this.helpers = Ba),
        (this.history = ss),
        (this.request = Ua),
        (this.url = Wa);
    }
    var i = s.prototype;
    return (
      (i.use = function (r, o) {
        var e = this.plugins;
        e.indexOf(r) > -1
          ? this.logger.warn("Plugin [" + r.name + "] already installed.")
          : typeof r.install == "function"
          ? (r.install(this, o), e.push(r))
          : this.logger.warn(
              "Plugin [" + r.name + '] has no "install" method.'
            );
      }),
      (i.init = function (r) {
        var o = r === void 0 ? {} : r,
          e = o.transitions,
          n = e === void 0 ? [] : e,
          l = o.views,
          d = l === void 0 ? [] : l,
          p = o.schema,
          v = p === void 0 ? Pt : p,
          T = o.requestError,
          P = o.timeout,
          E = P === void 0 ? 2e3 : P,
          q = o.cacheIgnore,
          N = q !== void 0 && q,
          M = o.prefetchIgnore,
          V = M !== void 0 && M,
          Y = o.preventRunning,
          X = Y !== void 0 && Y,
          z = o.prevent,
          J = z === void 0 ? null : z,
          K = o.debug,
          f = o.logLevel;
        if (
          (An.setLevel(
            (K !== void 0 && K) === !0 ? "debug" : f === void 0 ? "off" : f
          ),
          this.logger.info(this.version),
          Object.keys(v).forEach(function (Ee) {
            Pt[Ee] && (Pt[Ee] = v[Ee]);
          }),
          (this.$ = T),
          (this.timeout = E),
          (this.cacheIgnore = N),
          (this.prefetchIgnore = V),
          (this.preventRunning = X),
          (this._ = this.dom.getWrapper()),
          !this._)
        )
          throw new Error("[@barba/core] No Barba wrapper found");
        this._.setAttribute("aria-live", "polite"), this.q();
        var Se = this.data.current;
        if (!Se.container)
          throw new Error("[@barba/core] No Barba container found");
        if (
          ((this.cache = new Ga(N)),
          (this.prevent = new il(V)),
          (this.transitions = new sl(n)),
          (this.views = new al(d)),
          J !== null)
        ) {
          if (typeof J != "function")
            throw new Error("[@barba/core] Prevent should be a function");
          this.prevent.add("preventCustom", J);
        }
        this.history.init(Se.url.href, Se.namespace),
          (this.B = this.B.bind(this)),
          (this.U = this.U.bind(this)),
          (this.D = this.D.bind(this)),
          this.F(),
          this.plugins.forEach(function (Ee) {
            return Ee.init();
          });
        var ne = this.data;
        (ne.trigger = "barba"),
          (ne.next = ne.current),
          (ne.current = En({}, this.schemaPage)),
          this.hooks.do("ready", ne),
          this.once(ne),
          this.q();
      }),
      (i.destroy = function () {
        this.q(),
          this.H(),
          this.history.clear(),
          this.hooks.clear(),
          (this.plugins = []);
      }),
      (i.force = function (r) {
        window.location.assign(r);
      }),
      (i.go = function (r, o, e) {
        var n;
        if ((o === void 0 && (o = "barba"), this.transitions.isRunning))
          this.force(r);
        else if (
          !(n =
            o === "popstate"
              ? this.history.current &&
                this.url.getPath(this.history.current.url) ===
                  this.url.getPath(r)
              : this.prevent.run("sameUrl", null, null, r)) ||
          this.transitions.hasSelf
        )
          return (
            (o = this.history.change(r, o, e)),
            e && (e.stopPropagation(), e.preventDefault()),
            this.page(r, o, n)
          );
      }),
      (i.once = function (r) {
        try {
          var o = this;
          return Promise.resolve(o.hooks.do("beforeEnter", r)).then(
            function () {
              function e() {
                return Promise.resolve(o.hooks.do("afterEnter", r)).then(
                  function () {}
                );
              }
              var n = (function () {
                if (o.transitions.hasOnce) {
                  var l = o.transitions.get(r, {
                    once: !0,
                  });
                  return Promise.resolve(
                    o.transitions.doOnce({
                      transition: l,
                      data: r,
                    })
                  ).then(function () {});
                }
              })();
              return n && n.then ? n.then(e) : e();
            }
          );
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      (i.page = function (r, o, e) {
        try {
          var n = function () {
              var v = l.data;
              return Promise.resolve(l.hooks.do("page", v)).then(function () {
                var T = Bn(
                  function () {
                    var P = l.transitions.get(v, {
                      once: !1,
                      self: e,
                    });
                    return Promise.resolve(
                      l.transitions.doPage({
                        data: v,
                        page: d,
                        transition: P,
                        wrapper: l._,
                      })
                    ).then(function () {
                      l.q();
                    });
                  },
                  function () {
                    An.getLevel() === 0 && l.force(v.current.url.href);
                  }
                );
                if (T && T.then) return T.then(function () {});
              });
            },
            l = this;
          (l.data.next.url = En(
            {
              href: r,
            },
            l.url.parse(r)
          )),
            (l.data.trigger = o);
          var d = l.cache.has(r)
              ? l.cache.update(r, {
                  action: "click",
                }).request
              : l.cache.set(
                  r,
                  l.request(r, l.timeout, l.onRequestError.bind(l, o)),
                  "click"
                ).request,
            p = (function () {
              if (l.transitions.shouldWait)
                return Promise.resolve(jr(d, l.data)).then(function () {});
            })();
          return Promise.resolve(p && p.then ? p.then(n) : n());
        } catch (v) {
          return Promise.reject(v);
        }
      }),
      (i.onRequestError = function (r) {
        this.transitions.isRunning = !1;
        for (
          var o = arguments.length, e = new Array(o > 1 ? o - 1 : 0), n = 1;
          n < o;
          n++
        )
          e[n - 1] = arguments[n];
        var l = e[0],
          d = e[1],
          p = this.cache.getAction(l);
        return (
          this.cache.delete(l),
          !(
            (this.$ && this.$(r, p, l, d) === !1) ||
            (p === "click" && this.force(l), 1)
          )
        );
      }),
      (i.prefetch = function (r) {
        var o = this;
        this.cache.has(r) ||
          this.cache.set(
            r,
            this.request(
              r,
              this.timeout,
              this.onRequestError.bind(this, "barba")
            ).catch(function (e) {
              o.logger.error(e);
            }),
            "prefetch"
          );
      }),
      (i.F = function () {
        this.prefetchIgnore !== !0 &&
          (document.addEventListener("mouseover", this.B),
          document.addEventListener("touchstart", this.B)),
          document.addEventListener("click", this.U),
          window.addEventListener("popstate", this.D);
      }),
      (i.H = function () {
        this.prefetchIgnore !== !0 &&
          (document.removeEventListener("mouseover", this.B),
          document.removeEventListener("touchstart", this.B)),
          document.removeEventListener("click", this.U),
          window.removeEventListener("popstate", this.D);
      }),
      (i.B = function (r) {
        var o = this,
          e = this.I(r);
        if (e) {
          var n = this.dom.getHref(e);
          this.prevent.checkHref(n) ||
            this.cache.has(n) ||
            this.cache.set(
              n,
              this.request(
                n,
                this.timeout,
                this.onRequestError.bind(this, e)
              ).catch(function (l) {
                o.logger.error(l);
              }),
              "enter"
            );
        }
      }),
      (i.U = function (r) {
        var o = this.I(r);
        if (o)
          return this.transitions.isRunning && this.preventRunning
            ? (r.preventDefault(), void r.stopPropagation())
            : void this.go(this.dom.getHref(o), o, r);
      }),
      (i.D = function (r) {
        this.go(this.url.getHref(), "popstate", r);
      }),
      (i.I = function (r) {
        for (var o = r.target; o && !this.dom.getHref(o); ) o = o.parentNode;
        if (o && !this.prevent.checkLink(o, r, this.dom.getHref(o))) return o;
      }),
      (i.q = function () {
        var r = this.url.getHref(),
          o = {
            container: this.dom.getContainer(),
            html: this.dom.getHtml(),
            namespace: this.dom.getNamespace(),
            url: En(
              {
                href: r,
              },
              this.url.parse(r)
            ),
          };
        (this.C = {
          current: o,
          next: En({}, this.schemaPage),
          trigger: void 0,
        }),
          this.hooks.do("reset", this.data);
      }),
      Bi(s, [
        {
          key: "data",
          get: function () {
            return this.C;
          },
        },
        {
          key: "wrapper",
          get: function () {
            return this._;
          },
        },
      ]),
      s
    );
  })())(),
  cl =
    typeof globalThis < "u"
      ? globalThis
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : typeof self < "u"
      ? self
      : {};

function fl(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default")
    ? s.default
    : s;
}
var fs = {
  exports: {},
};
/*!
 * jQuery JavaScript Library v3.5.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2020-05-04T22:49Z
 */
(function (s) {
  (function (i, r) {
    s.exports = i.document
      ? r(i, !0)
      : function (o) {
          if (!o.document)
            throw new Error("jQuery requires a window with a document");
          return r(o);
        };
  })(typeof window < "u" ? window : cl, function (i, r) {
    var o = [],
      e = Object.getPrototypeOf,
      n = o.slice,
      l = o.flat
        ? function (t) {
            return o.flat.call(t);
          }
        : function (t) {
            return o.concat.apply([], t);
          },
      d = o.push,
      p = o.indexOf,
      v = {},
      T = v.toString,
      P = v.hasOwnProperty,
      E = P.toString,
      q = E.call(Object),
      N = {},
      M = function (a) {
        return typeof a == "function" && typeof a.nodeType != "number";
      },
      V = function (a) {
        return a != null && a === a.window;
      },
      Y = i.document,
      X = {
        type: !0,
        src: !0,
        nonce: !0,
        noModule: !0,
      };

    function z(t, a, u) {
      u = u || Y;
      var c,
        h,
        m = u.createElement("script");
      if (((m.text = t), a))
        for (c in X)
          (h = a[c] || (a.getAttribute && a.getAttribute(c))),
            h && m.setAttribute(c, h);
      u.head.appendChild(m).parentNode.removeChild(m);
    }

    function J(t) {
      return t == null
        ? t + ""
        : typeof t == "object" || typeof t == "function"
        ? v[T.call(t)] || "object"
        : typeof t;
    }
    var K = "3.5.1",
      f = function (t, a) {
        return new f.fn.init(t, a);
      };
    (f.fn = f.prototype =
      {
        jquery: K,
        constructor: f,
        length: 0,
        toArray: function () {
          return n.call(this);
        },
        get: function (t) {
          return t == null
            ? n.call(this)
            : t < 0
            ? this[t + this.length]
            : this[t];
        },
        pushStack: function (t) {
          var a = f.merge(this.constructor(), t);
          return (a.prevObject = this), a;
        },
        each: function (t) {
          return f.each(this, t);
        },
        map: function (t) {
          return this.pushStack(
            f.map(this, function (a, u) {
              return t.call(a, u, a);
            })
          );
        },
        slice: function () {
          return this.pushStack(n.apply(this, arguments));
        },
        first: function () {
          return this.eq(0);
        },
        last: function () {
          return this.eq(-1);
        },
        even: function () {
          return this.pushStack(
            f.grep(this, function (t, a) {
              return (a + 1) % 2;
            })
          );
        },
        odd: function () {
          return this.pushStack(
            f.grep(this, function (t, a) {
              return a % 2;
            })
          );
        },
        eq: function (t) {
          var a = this.length,
            u = +t + (t < 0 ? a : 0);
          return this.pushStack(u >= 0 && u < a ? [this[u]] : []);
        },
        end: function () {
          return this.prevObject || this.constructor();
        },
        push: d,
        sort: o.sort,
        splice: o.splice,
      }),
      (f.extend = f.fn.extend =
        function () {
          var t,
            a,
            u,
            c,
            h,
            m,
            y = arguments[0] || {},
            _ = 1,
            x = arguments.length,
            O = !1;
          for (
            typeof y == "boolean" && ((O = y), (y = arguments[_] || {}), _++),
              typeof y != "object" && !M(y) && (y = {}),
              _ === x && ((y = this), _--);
            _ < x;
            _++
          )
            if ((t = arguments[_]) != null)
              for (a in t)
                (c = t[a]),
                  !(a === "__proto__" || y === c) &&
                    (O && c && (f.isPlainObject(c) || (h = Array.isArray(c)))
                      ? ((u = y[a]),
                        h && !Array.isArray(u)
                          ? (m = [])
                          : !h && !f.isPlainObject(u)
                          ? (m = {})
                          : (m = u),
                        (h = !1),
                        (y[a] = f.extend(O, m, c)))
                      : c !== void 0 && (y[a] = c));
          return y;
        }),
      f.extend({
        expando: "jQuery" + (K + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function (t) {
          throw new Error(t);
        },
        noop: function () {},
        isPlainObject: function (t) {
          var a, u;
          return !t || T.call(t) !== "[object Object]"
            ? !1
            : ((a = e(t)),
              a
                ? ((u = P.call(a, "constructor") && a.constructor),
                  typeof u == "function" && E.call(u) === q)
                : !0);
        },
        isEmptyObject: function (t) {
          var a;
          for (a in t) return !1;
          return !0;
        },
        globalEval: function (t, a, u) {
          z(
            t,
            {
              nonce: a && a.nonce,
            },
            u
          );
        },
        each: function (t, a) {
          var u,
            c = 0;
          if (Se(t))
            for (u = t.length; c < u && a.call(t[c], c, t[c]) !== !1; c++);
          else for (c in t) if (a.call(t[c], c, t[c]) === !1) break;
          return t;
        },
        makeArray: function (t, a) {
          var u = a || [];
          return (
            t != null &&
              (Se(Object(t))
                ? f.merge(u, typeof t == "string" ? [t] : t)
                : d.call(u, t)),
            u
          );
        },
        inArray: function (t, a, u) {
          return a == null ? -1 : p.call(a, t, u);
        },
        merge: function (t, a) {
          for (var u = +a.length, c = 0, h = t.length; c < u; c++)
            t[h++] = a[c];
          return (t.length = h), t;
        },
        grep: function (t, a, u) {
          for (var c, h = [], m = 0, y = t.length, _ = !u; m < y; m++)
            (c = !a(t[m], m)), c !== _ && h.push(t[m]);
          return h;
        },
        map: function (t, a, u) {
          var c,
            h,
            m = 0,
            y = [];
          if (Se(t))
            for (c = t.length; m < c; m++)
              (h = a(t[m], m, u)), h != null && y.push(h);
          else for (m in t) (h = a(t[m], m, u)), h != null && y.push(h);
          return l(y);
        },
        guid: 1,
        support: N,
      }),
      typeof Symbol == "function" &&
        (f.fn[Symbol.iterator] = o[Symbol.iterator]),
      f.each(
        "Boolean Number String Function Array Date RegExp Object Error Symbol".split(
          " "
        ),
        function (t, a) {
          v["[object " + a + "]"] = a.toLowerCase();
        }
      );

    function Se(t) {
      var a = !!t && "length" in t && t.length,
        u = J(t);
      return M(t) || V(t)
        ? !1
        : u === "array" ||
            a === 0 ||
            (typeof a == "number" && a > 0 && a - 1 in t);
    }
    var ne = (function (t) {
      var a,
        u,
        c,
        h,
        m,
        y,
        _,
        x,
        O,
        j,
        U,
        L,
        F,
        se,
        be,
        ae,
        Be,
        He,
        ft,
        Oe = "sizzle" + 1 * new Date(),
        ve = t.document,
        rt = 0,
        Ce = 0,
        Me = br(),
        Zn = br(),
        vr = br(),
        dt = br(),
        wn = function (w, k) {
          return w === k && (U = !0), 0;
        },
        bn = {}.hasOwnProperty,
        it = [],
        Kt = it.pop,
        yt = it.push,
        Qt = it.push,
        vo = it.slice,
        Tn = function (w, k) {
          for (var A = 0, H = w.length; A < H; A++) if (w[A] === k) return A;
          return -1;
        },
        pi =
          "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        Pe = "[\\x20\\t\\r\\n\\f]",
        Sn =
          "(?:\\\\[\\da-fA-F]{1,6}" +
          Pe +
          "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
        yo =
          "\\[" +
          Pe +
          "*(" +
          Sn +
          ")(?:" +
          Pe +
          "*([*^$|!~]?=)" +
          Pe +
          `*(?:'((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)"|(` +
          Sn +
          "))|)" +
          Pe +
          "*\\]",
        gi =
          ":(" +
          Sn +
          `)(?:\\((('((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|` +
          yo +
          ")*)|.*)\\)|)",
        ba = new RegExp(Pe + "+", "g"),
        yr = new RegExp(
          "^" + Pe + "+|((?:^|[^\\\\])(?:\\\\.)*)" + Pe + "+$",
          "g"
        ),
        Ta = new RegExp("^" + Pe + "*," + Pe + "*"),
        wo = new RegExp("^" + Pe + "*([>+~]|" + Pe + ")" + Pe + "*"),
        Sa = new RegExp(Pe + "|>"),
        ka = new RegExp(gi),
        _a = new RegExp("^" + Sn + "$"),
        wr = {
          ID: new RegExp("^#(" + Sn + ")"),
          CLASS: new RegExp("^\\.(" + Sn + ")"),
          TAG: new RegExp("^(" + Sn + "|[*])"),
          ATTR: new RegExp("^" + yo),
          PSEUDO: new RegExp("^" + gi),
          CHILD: new RegExp(
            "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
              Pe +
              "*(even|odd|(([+-]|)(\\d*)n|)" +
              Pe +
              "*(?:([+-]|)" +
              Pe +
              "*(\\d+)|))" +
              Pe +
              "*\\)|)",
            "i"
          ),
          bool: new RegExp("^(?:" + pi + ")$", "i"),
          needsContext: new RegExp(
            "^" +
              Pe +
              "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
              Pe +
              "*((?:-\\d)?\\d*)" +
              Pe +
              "*\\)|)(?=[^-]|$)",
            "i"
          ),
        },
        xa = /HTML$/i,
        Ca = /^(?:input|select|textarea|button)$/i,
        Ea = /^h\d$/i,
        er = /^[^{]+\{\s*\[native \w/,
        Aa = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        mi = /[+~]/,
        It = new RegExp(
          "\\\\[\\da-fA-F]{1,6}" + Pe + "?|\\\\([^\\r\\n\\f])",
          "g"
        ),
        Ft = function (w, k) {
          var A = "0x" + w.slice(1) - 65536;
          return (
            k ||
            (A < 0
              ? String.fromCharCode(A + 65536)
              : String.fromCharCode((A >> 10) | 55296, (A & 1023) | 56320))
          );
        },
        bo = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
        To = function (w, k) {
          return k
            ? w === "\0"
              ? "�"
              : w.slice(0, -1) +
                "\\" +
                w.charCodeAt(w.length - 1).toString(16) +
                " "
            : "\\" + w;
        },
        So = function () {
          L();
        },
        Pa = Sr(
          function (w) {
            return w.disabled === !0 && w.nodeName.toLowerCase() === "fieldset";
          },
          {
            dir: "parentNode",
            next: "legend",
          }
        );
      try {
        Qt.apply((it = vo.call(ve.childNodes)), ve.childNodes),
          it[ve.childNodes.length].nodeType;
      } catch {
        Qt = {
          apply: it.length
            ? function (k, A) {
                yt.apply(k, vo.call(A));
              }
            : function (k, A) {
                for (var H = k.length, R = 0; (k[H++] = A[R++]); );
                k.length = H - 1;
              },
        };
      }

      function Re(w, k, A, H) {
        var R,
          $,
          W,
          Q,
          te,
          de,
          ue,
          ge = k && k.ownerDocument,
          ke = k ? k.nodeType : 9;
        if (
          ((A = A || []),
          typeof w != "string" || !w || (ke !== 1 && ke !== 9 && ke !== 11))
        )
          return A;
        if (!H && (L(k), (k = k || F), be)) {
          if (ke !== 11 && (te = Aa.exec(w)))
            if ((R = te[1])) {
              if (ke === 9)
                if ((W = k.getElementById(R))) {
                  if (W.id === R) return A.push(W), A;
                } else return A;
              else if (
                ge &&
                (W = ge.getElementById(R)) &&
                ft(k, W) &&
                W.id === R
              )
                return A.push(W), A;
            } else {
              if (te[2]) return Qt.apply(A, k.getElementsByTagName(w)), A;
              if (
                (R = te[3]) &&
                u.getElementsByClassName &&
                k.getElementsByClassName
              )
                return Qt.apply(A, k.getElementsByClassName(R)), A;
            }
          if (
            u.qsa &&
            !dt[w + " "] &&
            (!ae || !ae.test(w)) &&
            (ke !== 1 || k.nodeName.toLowerCase() !== "object")
          ) {
            if (((ue = w), (ge = k), ke === 1 && (Sa.test(w) || wo.test(w)))) {
              for (
                ge = (mi.test(w) && yi(k.parentNode)) || k,
                  (ge !== k || !u.scope) &&
                    ((Q = k.getAttribute("id"))
                      ? (Q = Q.replace(bo, To))
                      : k.setAttribute("id", (Q = Oe))),
                  de = y(w),
                  $ = de.length;
                $--;

              )
                de[$] = (Q ? "#" + Q : ":scope") + " " + Tr(de[$]);
              ue = de.join(",");
            }
            try {
              return Qt.apply(A, ge.querySelectorAll(ue)), A;
            } catch {
              dt(w, !0);
            } finally {
              Q === Oe && k.removeAttribute("id");
            }
          }
        }
        return x(w.replace(yr, "$1"), k, A, H);
      }

      function br() {
        var w = [];

        function k(A, H) {
          return (
            w.push(A + " ") > c.cacheLength && delete k[w.shift()],
            (k[A + " "] = H)
          );
        }
        return k;
      }

      function _t(w) {
        return (w[Oe] = !0), w;
      }

      function xt(w) {
        var k = F.createElement("fieldset");
        try {
          return !!w(k);
        } catch {
          return !1;
        } finally {
          k.parentNode && k.parentNode.removeChild(k), (k = null);
        }
      }

      function vi(w, k) {
        for (var A = w.split("|"), H = A.length; H--; ) c.attrHandle[A[H]] = k;
      }

      function ko(w, k) {
        var A = k && w,
          H =
            A &&
            w.nodeType === 1 &&
            k.nodeType === 1 &&
            w.sourceIndex - k.sourceIndex;
        if (H) return H;
        if (A) {
          for (; (A = A.nextSibling); ) if (A === k) return -1;
        }
        return w ? 1 : -1;
      }

      function Oa(w) {
        return function (k) {
          var A = k.nodeName.toLowerCase();
          return A === "input" && k.type === w;
        };
      }

      function Ra(w) {
        return function (k) {
          var A = k.nodeName.toLowerCase();
          return (A === "input" || A === "button") && k.type === w;
        };
      }

      function _o(w) {
        return function (k) {
          return "form" in k
            ? k.parentNode && k.disabled === !1
              ? "label" in k
                ? "label" in k.parentNode
                  ? k.parentNode.disabled === w
                  : k.disabled === w
                : k.isDisabled === w || (k.isDisabled !== !w && Pa(k) === w)
              : k.disabled === w
            : "label" in k
            ? k.disabled === w
            : !1;
        };
      }

      function kn(w) {
        return _t(function (k) {
          return (
            (k = +k),
            _t(function (A, H) {
              for (var R, $ = w([], A.length, k), W = $.length; W--; )
                A[(R = $[W])] && (A[R] = !(H[R] = A[R]));
            })
          );
        });
      }

      function yi(w) {
        return w && typeof w.getElementsByTagName < "u" && w;
      }
      (u = Re.support = {}),
        (m = Re.isXML =
          function (w) {
            var k = w.namespaceURI,
              A = (w.ownerDocument || w).documentElement;
            return !xa.test(k || (A && A.nodeName) || "HTML");
          }),
        (L = Re.setDocument =
          function (w) {
            var k,
              A,
              H = w ? w.ownerDocument || w : ve;
            return (
              H == F ||
                H.nodeType !== 9 ||
                !H.documentElement ||
                ((F = H),
                (se = F.documentElement),
                (be = !m(F)),
                ve != F &&
                  (A = F.defaultView) &&
                  A.top !== A &&
                  (A.addEventListener
                    ? A.addEventListener("unload", So, !1)
                    : A.attachEvent && A.attachEvent("onunload", So)),
                (u.scope = xt(function (R) {
                  return (
                    se.appendChild(R).appendChild(F.createElement("div")),
                    typeof R.querySelectorAll < "u" &&
                      !R.querySelectorAll(":scope fieldset div").length
                  );
                })),
                (u.attributes = xt(function (R) {
                  return (R.className = "i"), !R.getAttribute("className");
                })),
                (u.getElementsByTagName = xt(function (R) {
                  return (
                    R.appendChild(F.createComment("")),
                    !R.getElementsByTagName("*").length
                  );
                })),
                (u.getElementsByClassName = er.test(F.getElementsByClassName)),
                (u.getById = xt(function (R) {
                  return (
                    (se.appendChild(R).id = Oe),
                    !F.getElementsByName || !F.getElementsByName(Oe).length
                  );
                })),
                u.getById
                  ? ((c.filter.ID = function (R) {
                      var $ = R.replace(It, Ft);
                      return function (W) {
                        return W.getAttribute("id") === $;
                      };
                    }),
                    (c.find.ID = function (R, $) {
                      if (typeof $.getElementById < "u" && be) {
                        var W = $.getElementById(R);
                        return W ? [W] : [];
                      }
                    }))
                  : ((c.filter.ID = function (R) {
                      var $ = R.replace(It, Ft);
                      return function (W) {
                        var Q =
                          typeof W.getAttributeNode < "u" &&
                          W.getAttributeNode("id");
                        return Q && Q.value === $;
                      };
                    }),
                    (c.find.ID = function (R, $) {
                      if (typeof $.getElementById < "u" && be) {
                        var W,
                          Q,
                          te,
                          de = $.getElementById(R);
                        if (de) {
                          if (
                            ((W = de.getAttributeNode("id")),
                            W && W.value === R)
                          )
                            return [de];
                          for (
                            te = $.getElementsByName(R), Q = 0;
                            (de = te[Q++]);

                          )
                            if (
                              ((W = de.getAttributeNode("id")),
                              W && W.value === R)
                            )
                              return [de];
                        }
                        return [];
                      }
                    })),
                (c.find.TAG = u.getElementsByTagName
                  ? function (R, $) {
                      if (typeof $.getElementsByTagName < "u")
                        return $.getElementsByTagName(R);
                      if (u.qsa) return $.querySelectorAll(R);
                    }
                  : function (R, $) {
                      var W,
                        Q = [],
                        te = 0,
                        de = $.getElementsByTagName(R);
                      if (R === "*") {
                        for (; (W = de[te++]); ) W.nodeType === 1 && Q.push(W);
                        return Q;
                      }
                      return de;
                    }),
                (c.find.CLASS =
                  u.getElementsByClassName &&
                  function (R, $) {
                    if (typeof $.getElementsByClassName < "u" && be)
                      return $.getElementsByClassName(R);
                  }),
                (Be = []),
                (ae = []),
                (u.qsa = er.test(F.querySelectorAll)) &&
                  (xt(function (R) {
                    var $;
                    (se.appendChild(R).innerHTML =
                      "<a id='" +
                      Oe +
                      "'></a><select id='" +
                      Oe +
                      "-\r\\' msallowcapture=''><option selected=''></option></select>"),
                      R.querySelectorAll("[msallowcapture^='']").length &&
                        ae.push("[*^$]=" + Pe + `*(?:''|"")`),
                      R.querySelectorAll("[selected]").length ||
                        ae.push("\\[" + Pe + "*(?:value|" + pi + ")"),
                      R.querySelectorAll("[id~=" + Oe + "-]").length ||
                        ae.push("~="),
                      ($ = F.createElement("input")),
                      $.setAttribute("name", ""),
                      R.appendChild($),
                      R.querySelectorAll("[name='']").length ||
                        ae.push(
                          "\\[" + Pe + "*name" + Pe + "*=" + Pe + `*(?:''|"")`
                        ),
                      R.querySelectorAll(":checked").length ||
                        ae.push(":checked"),
                      R.querySelectorAll("a#" + Oe + "+*").length ||
                        ae.push(".#.+[+~]"),
                      R.querySelectorAll("\\\f"),
                      ae.push("[\\r\\n\\f]");
                  }),
                  xt(function (R) {
                    R.innerHTML =
                      "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                    var $ = F.createElement("input");
                    $.setAttribute("type", "hidden"),
                      R.appendChild($).setAttribute("name", "D"),
                      R.querySelectorAll("[name=d]").length &&
                        ae.push("name" + Pe + "*[*^$|!~]?="),
                      R.querySelectorAll(":enabled").length !== 2 &&
                        ae.push(":enabled", ":disabled"),
                      (se.appendChild(R).disabled = !0),
                      R.querySelectorAll(":disabled").length !== 2 &&
                        ae.push(":enabled", ":disabled"),
                      R.querySelectorAll("*,:x"),
                      ae.push(",.*:");
                  })),
                (u.matchesSelector = er.test(
                  (He =
                    se.matches ||
                    se.webkitMatchesSelector ||
                    se.mozMatchesSelector ||
                    se.oMatchesSelector ||
                    se.msMatchesSelector)
                )) &&
                  xt(function (R) {
                    (u.disconnectedMatch = He.call(R, "*")),
                      He.call(R, "[s!='']:x"),
                      Be.push("!=", gi);
                  }),
                (ae = ae.length && new RegExp(ae.join("|"))),
                (Be = Be.length && new RegExp(Be.join("|"))),
                (k = er.test(se.compareDocumentPosition)),
                (ft =
                  k || er.test(se.contains)
                    ? function (R, $) {
                        var W = R.nodeType === 9 ? R.documentElement : R,
                          Q = $ && $.parentNode;
                        return (
                          R === Q ||
                          !!(
                            Q &&
                            Q.nodeType === 1 &&
                            (W.contains
                              ? W.contains(Q)
                              : R.compareDocumentPosition &&
                                R.compareDocumentPosition(Q) & 16)
                          )
                        );
                      }
                    : function (R, $) {
                        if ($) {
                          for (; ($ = $.parentNode); ) if ($ === R) return !0;
                        }
                        return !1;
                      }),
                (wn = k
                  ? function (R, $) {
                      if (R === $) return (U = !0), 0;
                      var W =
                        !R.compareDocumentPosition - !$.compareDocumentPosition;
                      return (
                        W ||
                        ((W =
                          (R.ownerDocument || R) == ($.ownerDocument || $)
                            ? R.compareDocumentPosition($)
                            : 1),
                        W & 1 ||
                        (!u.sortDetached && $.compareDocumentPosition(R) === W)
                          ? R == F || (R.ownerDocument == ve && ft(ve, R))
                            ? -1
                            : $ == F || ($.ownerDocument == ve && ft(ve, $))
                            ? 1
                            : j
                            ? Tn(j, R) - Tn(j, $)
                            : 0
                          : W & 4
                          ? -1
                          : 1)
                      );
                    }
                  : function (R, $) {
                      if (R === $) return (U = !0), 0;
                      var W,
                        Q = 0,
                        te = R.parentNode,
                        de = $.parentNode,
                        ue = [R],
                        ge = [$];
                      if (!te || !de)
                        return R == F
                          ? -1
                          : $ == F
                          ? 1
                          : te
                          ? -1
                          : de
                          ? 1
                          : j
                          ? Tn(j, R) - Tn(j, $)
                          : 0;
                      if (te === de) return ko(R, $);
                      for (W = R; (W = W.parentNode); ) ue.unshift(W);
                      for (W = $; (W = W.parentNode); ) ge.unshift(W);
                      for (; ue[Q] === ge[Q]; ) Q++;
                      return Q
                        ? ko(ue[Q], ge[Q])
                        : ue[Q] == ve
                        ? -1
                        : ge[Q] == ve
                        ? 1
                        : 0;
                    })),
              F
            );
          }),
        (Re.matches = function (w, k) {
          return Re(w, null, null, k);
        }),
        (Re.matchesSelector = function (w, k) {
          if (
            (L(w),
            u.matchesSelector &&
              be &&
              !dt[k + " "] &&
              (!Be || !Be.test(k)) &&
              (!ae || !ae.test(k)))
          )
            try {
              var A = He.call(w, k);
              if (
                A ||
                u.disconnectedMatch ||
                (w.document && w.document.nodeType !== 11)
              )
                return A;
            } catch {
              dt(k, !0);
            }
          return Re(k, F, null, [w]).length > 0;
        }),
        (Re.contains = function (w, k) {
          return (w.ownerDocument || w) != F && L(w), ft(w, k);
        }),
        (Re.attr = function (w, k) {
          (w.ownerDocument || w) != F && L(w);
          var A = c.attrHandle[k.toLowerCase()],
            H =
              A && bn.call(c.attrHandle, k.toLowerCase())
                ? A(w, k, !be)
                : void 0;
          return H !== void 0
            ? H
            : u.attributes || !be
            ? w.getAttribute(k)
            : (H = w.getAttributeNode(k)) && H.specified
            ? H.value
            : null;
        }),
        (Re.escape = function (w) {
          return (w + "").replace(bo, To);
        }),
        (Re.error = function (w) {
          throw new Error("Syntax error, unrecognized expression: " + w);
        }),
        (Re.uniqueSort = function (w) {
          var k,
            A = [],
            H = 0,
            R = 0;
          if (
            ((U = !u.detectDuplicates),
            (j = !u.sortStable && w.slice(0)),
            w.sort(wn),
            U)
          ) {
            for (; (k = w[R++]); ) k === w[R] && (H = A.push(R));
            for (; H--; ) w.splice(A[H], 1);
          }
          return (j = null), w;
        }),
        (h = Re.getText =
          function (w) {
            var k,
              A = "",
              H = 0,
              R = w.nodeType;
            if (R) {
              if (R === 1 || R === 9 || R === 11) {
                if (typeof w.textContent == "string") return w.textContent;
                for (w = w.firstChild; w; w = w.nextSibling) A += h(w);
              } else if (R === 3 || R === 4) return w.nodeValue;
            } else for (; (k = w[H++]); ) A += h(k);
            return A;
          }),
        (c = Re.selectors =
          {
            cacheLength: 50,
            createPseudo: _t,
            match: wr,
            attrHandle: {},
            find: {},
            relative: {
              ">": {
                dir: "parentNode",
                first: !0,
              },
              " ": {
                dir: "parentNode",
              },
              "+": {
                dir: "previousSibling",
                first: !0,
              },
              "~": {
                dir: "previousSibling",
              },
            },
            preFilter: {
              ATTR: function (w) {
                return (
                  (w[1] = w[1].replace(It, Ft)),
                  (w[3] = (w[3] || w[4] || w[5] || "").replace(It, Ft)),
                  w[2] === "~=" && (w[3] = " " + w[3] + " "),
                  w.slice(0, 4)
                );
              },
              CHILD: function (w) {
                return (
                  (w[1] = w[1].toLowerCase()),
                  w[1].slice(0, 3) === "nth"
                    ? (w[3] || Re.error(w[0]),
                      (w[4] = +(w[4]
                        ? w[5] + (w[6] || 1)
                        : 2 * (w[3] === "even" || w[3] === "odd"))),
                      (w[5] = +(w[7] + w[8] || w[3] === "odd")))
                    : w[3] && Re.error(w[0]),
                  w
                );
              },
              PSEUDO: function (w) {
                var k,
                  A = !w[6] && w[2];
                return wr.CHILD.test(w[0])
                  ? null
                  : (w[3]
                      ? (w[2] = w[4] || w[5] || "")
                      : A &&
                        ka.test(A) &&
                        (k = y(A, !0)) &&
                        (k = A.indexOf(")", A.length - k) - A.length) &&
                        ((w[0] = w[0].slice(0, k)), (w[2] = A.slice(0, k))),
                    w.slice(0, 3));
              },
            },
            filter: {
              TAG: function (w) {
                var k = w.replace(It, Ft).toLowerCase();
                return w === "*"
                  ? function () {
                      return !0;
                    }
                  : function (A) {
                      return A.nodeName && A.nodeName.toLowerCase() === k;
                    };
              },
              CLASS: function (w) {
                var k = Me[w + " "];
                return (
                  k ||
                  ((k = new RegExp("(^|" + Pe + ")" + w + "(" + Pe + "|$)")) &&
                    Me(w, function (A) {
                      return k.test(
                        (typeof A.className == "string" && A.className) ||
                          (typeof A.getAttribute < "u" &&
                            A.getAttribute("class")) ||
                          ""
                      );
                    }))
                );
              },
              ATTR: function (w, k, A) {
                return function (H) {
                  var R = Re.attr(H, w);
                  return R == null
                    ? k === "!="
                    : k
                    ? ((R += ""),
                      k === "="
                        ? R === A
                        : k === "!="
                        ? R !== A
                        : k === "^="
                        ? A && R.indexOf(A) === 0
                        : k === "*="
                        ? A && R.indexOf(A) > -1
                        : k === "$="
                        ? A && R.slice(-A.length) === A
                        : k === "~="
                        ? (" " + R.replace(ba, " ") + " ").indexOf(A) > -1
                        : k === "|="
                        ? R === A || R.slice(0, A.length + 1) === A + "-"
                        : !1)
                    : !0;
                };
              },
              CHILD: function (w, k, A, H, R) {
                var $ = w.slice(0, 3) !== "nth",
                  W = w.slice(-4) !== "last",
                  Q = k === "of-type";
                return H === 1 && R === 0
                  ? function (te) {
                      return !!te.parentNode;
                    }
                  : function (te, de, ue) {
                      var ge,
                        ke,
                        Ne,
                        he,
                        We,
                        Qe,
                        ht = $ !== W ? "nextSibling" : "previousSibling",
                        Le = te.parentNode,
                        tr = Q && te.nodeName.toLowerCase(),
                        nr = !ue && !Q,
                        pt = !1;
                      if (Le) {
                        if ($) {
                          for (; ht; ) {
                            for (he = te; (he = he[ht]); )
                              if (
                                Q
                                  ? he.nodeName.toLowerCase() === tr
                                  : he.nodeType === 1
                              )
                                return !1;
                            Qe = ht = w === "only" && !Qe && "nextSibling";
                          }
                          return !0;
                        }
                        if (
                          ((Qe = [W ? Le.firstChild : Le.lastChild]), W && nr)
                        ) {
                          for (
                            he = Le,
                              Ne = he[Oe] || (he[Oe] = {}),
                              ke = Ne[he.uniqueID] || (Ne[he.uniqueID] = {}),
                              ge = ke[w] || [],
                              We = ge[0] === rt && ge[1],
                              pt = We && ge[2],
                              he = We && Le.childNodes[We];
                            (he =
                              (++We && he && he[ht]) ||
                              (pt = We = 0) ||
                              Qe.pop());

                          )
                            if (he.nodeType === 1 && ++pt && he === te) {
                              ke[w] = [rt, We, pt];
                              break;
                            }
                        } else if (
                          (nr &&
                            ((he = te),
                            (Ne = he[Oe] || (he[Oe] = {})),
                            (ke = Ne[he.uniqueID] || (Ne[he.uniqueID] = {})),
                            (ge = ke[w] || []),
                            (We = ge[0] === rt && ge[1]),
                            (pt = We)),
                          pt === !1)
                        )
                          for (
                            ;
                            (he =
                              (++We && he && he[ht]) ||
                              (pt = We = 0) ||
                              Qe.pop()) &&
                            !(
                              (Q
                                ? he.nodeName.toLowerCase() === tr
                                : he.nodeType === 1) &&
                              ++pt &&
                              (nr &&
                                ((Ne = he[Oe] || (he[Oe] = {})),
                                (ke =
                                  Ne[he.uniqueID] || (Ne[he.uniqueID] = {})),
                                (ke[w] = [rt, pt])),
                              he === te)
                            );

                          );
                        return (
                          (pt -= R), pt === H || (pt % H === 0 && pt / H >= 0)
                        );
                      }
                    };
              },
              PSEUDO: function (w, k) {
                var A,
                  H =
                    c.pseudos[w] ||
                    c.setFilters[w.toLowerCase()] ||
                    Re.error("unsupported pseudo: " + w);
                return H[Oe]
                  ? H(k)
                  : H.length > 1
                  ? ((A = [w, w, "", k]),
                    c.setFilters.hasOwnProperty(w.toLowerCase())
                      ? _t(function (R, $) {
                          for (var W, Q = H(R, k), te = Q.length; te--; )
                            (W = Tn(R, Q[te])), (R[W] = !($[W] = Q[te]));
                        })
                      : function (R) {
                          return H(R, 0, A);
                        })
                  : H;
              },
            },
            pseudos: {
              not: _t(function (w) {
                var k = [],
                  A = [],
                  H = _(w.replace(yr, "$1"));
                return H[Oe]
                  ? _t(function (R, $, W, Q) {
                      for (
                        var te, de = H(R, null, Q, []), ue = R.length;
                        ue--;

                      )
                        (te = de[ue]) && (R[ue] = !($[ue] = te));
                    })
                  : function (R, $, W) {
                      return (
                        (k[0] = R), H(k, null, W, A), (k[0] = null), !A.pop()
                      );
                    };
              }),
              has: _t(function (w) {
                return function (k) {
                  return Re(w, k).length > 0;
                };
              }),
              contains: _t(function (w) {
                return (
                  (w = w.replace(It, Ft)),
                  function (k) {
                    return (k.textContent || h(k)).indexOf(w) > -1;
                  }
                );
              }),
              lang: _t(function (w) {
                return (
                  _a.test(w || "") || Re.error("unsupported lang: " + w),
                  (w = w.replace(It, Ft).toLowerCase()),
                  function (k) {
                    var A;
                    do
                      if (
                        (A = be
                          ? k.lang
                          : k.getAttribute("xml:lang") ||
                            k.getAttribute("lang"))
                      )
                        return (
                          (A = A.toLowerCase()),
                          A === w || A.indexOf(w + "-") === 0
                        );
                    while ((k = k.parentNode) && k.nodeType === 1);
                    return !1;
                  }
                );
              }),
              target: function (w) {
                var k = t.location && t.location.hash;
                return k && k.slice(1) === w.id;
              },
              root: function (w) {
                return w === se;
              },
              focus: function (w) {
                return (
                  w === F.activeElement &&
                  (!F.hasFocus || F.hasFocus()) &&
                  !!(w.type || w.href || ~w.tabIndex)
                );
              },
              enabled: _o(!1),
              disabled: _o(!0),
              checked: function (w) {
                var k = w.nodeName.toLowerCase();
                return (
                  (k === "input" && !!w.checked) ||
                  (k === "option" && !!w.selected)
                );
              },
              selected: function (w) {
                return (
                  w.parentNode && w.parentNode.selectedIndex, w.selected === !0
                );
              },
              empty: function (w) {
                for (w = w.firstChild; w; w = w.nextSibling)
                  if (w.nodeType < 6) return !1;
                return !0;
              },
              parent: function (w) {
                return !c.pseudos.empty(w);
              },
              header: function (w) {
                return Ea.test(w.nodeName);
              },
              input: function (w) {
                return Ca.test(w.nodeName);
              },
              button: function (w) {
                var k = w.nodeName.toLowerCase();
                return (k === "input" && w.type === "button") || k === "button";
              },
              text: function (w) {
                var k;
                return (
                  w.nodeName.toLowerCase() === "input" &&
                  w.type === "text" &&
                  ((k = w.getAttribute("type")) == null ||
                    k.toLowerCase() === "text")
                );
              },
              first: kn(function () {
                return [0];
              }),
              last: kn(function (w, k) {
                return [k - 1];
              }),
              eq: kn(function (w, k, A) {
                return [A < 0 ? A + k : A];
              }),
              even: kn(function (w, k) {
                for (var A = 0; A < k; A += 2) w.push(A);
                return w;
              }),
              odd: kn(function (w, k) {
                for (var A = 1; A < k; A += 2) w.push(A);
                return w;
              }),
              lt: kn(function (w, k, A) {
                for (var H = A < 0 ? A + k : A > k ? k : A; --H >= 0; )
                  w.push(H);
                return w;
              }),
              gt: kn(function (w, k, A) {
                for (var H = A < 0 ? A + k : A; ++H < k; ) w.push(H);
                return w;
              }),
            },
          }),
        (c.pseudos.nth = c.pseudos.eq);
      for (a in {
        radio: !0,
        checkbox: !0,
        file: !0,
        password: !0,
        image: !0,
      })
        c.pseudos[a] = Oa(a);
      for (a in {
        submit: !0,
        reset: !0,
      })
        c.pseudos[a] = Ra(a);

      function xo() {}
      (xo.prototype = c.filters = c.pseudos),
        (c.setFilters = new xo()),
        (y = Re.tokenize =
          function (w, k) {
            var A,
              H,
              R,
              $,
              W,
              Q,
              te,
              de = Zn[w + " "];
            if (de) return k ? 0 : de.slice(0);
            for (W = w, Q = [], te = c.preFilter; W; ) {
              (!A || (H = Ta.exec(W))) &&
                (H && (W = W.slice(H[0].length) || W), Q.push((R = []))),
                (A = !1),
                (H = wo.exec(W)) &&
                  ((A = H.shift()),
                  R.push({
                    value: A,
                    type: H[0].replace(yr, " "),
                  }),
                  (W = W.slice(A.length)));
              for ($ in c.filter)
                (H = wr[$].exec(W)) &&
                  (!te[$] || (H = te[$](H))) &&
                  ((A = H.shift()),
                  R.push({
                    value: A,
                    type: $,
                    matches: H,
                  }),
                  (W = W.slice(A.length)));
              if (!A) break;
            }
            return k ? W.length : W ? Re.error(w) : Zn(w, Q).slice(0);
          });

      function Tr(w) {
        for (var k = 0, A = w.length, H = ""; k < A; k++) H += w[k].value;
        return H;
      }

      function Sr(w, k, A) {
        var H = k.dir,
          R = k.next,
          $ = R || H,
          W = A && $ === "parentNode",
          Q = Ce++;
        return k.first
          ? function (te, de, ue) {
              for (; (te = te[H]); )
                if (te.nodeType === 1 || W) return w(te, de, ue);
              return !1;
            }
          : function (te, de, ue) {
              var ge,
                ke,
                Ne,
                he = [rt, Q];
              if (ue) {
                for (; (te = te[H]); )
                  if ((te.nodeType === 1 || W) && w(te, de, ue)) return !0;
              } else
                for (; (te = te[H]); )
                  if (te.nodeType === 1 || W)
                    if (
                      ((Ne = te[Oe] || (te[Oe] = {})),
                      (ke = Ne[te.uniqueID] || (Ne[te.uniqueID] = {})),
                      R && R === te.nodeName.toLowerCase())
                    )
                      te = te[H] || te;
                    else {
                      if ((ge = ke[$]) && ge[0] === rt && ge[1] === Q)
                        return (he[2] = ge[2]);
                      if (((ke[$] = he), (he[2] = w(te, de, ue)))) return !0;
                    }
              return !1;
            };
      }

      function wi(w) {
        return w.length > 1
          ? function (k, A, H) {
              for (var R = w.length; R--; ) if (!w[R](k, A, H)) return !1;
              return !0;
            }
          : w[0];
      }

      function Na(w, k, A) {
        for (var H = 0, R = k.length; H < R; H++) Re(w, k[H], A);
        return A;
      }

      function kr(w, k, A, H, R) {
        for (var $, W = [], Q = 0, te = w.length, de = k != null; Q < te; Q++)
          ($ = w[Q]) && (!A || A($, H, R)) && (W.push($), de && k.push(Q));
        return W;
      }

      function bi(w, k, A, H, R, $) {
        return (
          H && !H[Oe] && (H = bi(H)),
          R && !R[Oe] && (R = bi(R, $)),
          _t(function (W, Q, te, de) {
            var ue,
              ge,
              ke,
              Ne = [],
              he = [],
              We = Q.length,
              Qe = W || Na(k || "*", te.nodeType ? [te] : te, []),
              ht = w && (W || !k) ? kr(Qe, Ne, w, te, de) : Qe,
              Le = A ? (R || (W ? w : We || H) ? [] : Q) : ht;
            if ((A && A(ht, Le, te, de), H))
              for (ue = kr(Le, he), H(ue, [], te, de), ge = ue.length; ge--; )
                (ke = ue[ge]) && (Le[he[ge]] = !(ht[he[ge]] = ke));
            if (W) {
              if (R || w) {
                if (R) {
                  for (ue = [], ge = Le.length; ge--; )
                    (ke = Le[ge]) && ue.push((ht[ge] = ke));
                  R(null, (Le = []), ue, de);
                }
                for (ge = Le.length; ge--; )
                  (ke = Le[ge]) &&
                    (ue = R ? Tn(W, ke) : Ne[ge]) > -1 &&
                    (W[ue] = !(Q[ue] = ke));
              }
            } else (Le = kr(Le === Q ? Le.splice(We, Le.length) : Le)), R ? R(null, Q, Le, de) : Qt.apply(Q, Le);
          })
        );
      }

      function Ti(w) {
        for (
          var k,
            A,
            H,
            R = w.length,
            $ = c.relative[w[0].type],
            W = $ || c.relative[" "],
            Q = $ ? 1 : 0,
            te = Sr(
              function (ge) {
                return ge === k;
              },
              W,
              !0
            ),
            de = Sr(
              function (ge) {
                return Tn(k, ge) > -1;
              },
              W,
              !0
            ),
            ue = [
              function (ge, ke, Ne) {
                var he =
                  (!$ && (Ne || ke !== O)) ||
                  ((k = ke).nodeType ? te(ge, ke, Ne) : de(ge, ke, Ne));
                return (k = null), he;
              },
            ];
          Q < R;
          Q++
        )
          if ((A = c.relative[w[Q].type])) ue = [Sr(wi(ue), A)];
          else {
            if (((A = c.filter[w[Q].type].apply(null, w[Q].matches)), A[Oe])) {
              for (H = ++Q; H < R && !c.relative[w[H].type]; H++);
              return bi(
                Q > 1 && wi(ue),
                Q > 1 &&
                  Tr(
                    w.slice(0, Q - 1).concat({
                      value: w[Q - 2].type === " " ? "*" : "",
                    })
                  ).replace(yr, "$1"),
                A,
                Q < H && Ti(w.slice(Q, H)),
                H < R && Ti((w = w.slice(H))),
                H < R && Tr(w)
              );
            }
            ue.push(A);
          }
        return wi(ue);
      }

      function La(w, k) {
        var A = k.length > 0,
          H = w.length > 0,
          R = function ($, W, Q, te, de) {
            var ue,
              ge,
              ke,
              Ne = 0,
              he = "0",
              We = $ && [],
              Qe = [],
              ht = O,
              Le = $ || (H && c.find.TAG("*", de)),
              tr = (rt += ht == null ? 1 : Math.random() || 0.1),
              nr = Le.length;
            for (
              de && (O = W == F || W || de);
              he !== nr && (ue = Le[he]) != null;
              he++
            ) {
              if (H && ue) {
                for (
                  ge = 0, !W && ue.ownerDocument != F && (L(ue), (Q = !be));
                  (ke = w[ge++]);

                )
                  if (ke(ue, W || F, Q)) {
                    te.push(ue);
                    break;
                  }
                de && (rt = tr);
              }
              A && ((ue = !ke && ue) && Ne--, $ && We.push(ue));
            }
            if (((Ne += he), A && he !== Ne)) {
              for (ge = 0; (ke = k[ge++]); ) ke(We, Qe, W, Q);
              if ($) {
                if (Ne > 0)
                  for (; he--; ) We[he] || Qe[he] || (Qe[he] = Kt.call(te));
                Qe = kr(Qe);
              }
              Qt.apply(te, Qe),
                de &&
                  !$ &&
                  Qe.length > 0 &&
                  Ne + k.length > 1 &&
                  Re.uniqueSort(te);
            }
            return de && ((rt = tr), (O = ht)), We;
          };
        return A ? _t(R) : R;
      }
      return (
        (_ = Re.compile =
          function (w, k) {
            var A,
              H = [],
              R = [],
              $ = vr[w + " "];
            if (!$) {
              for (k || (k = y(w)), A = k.length; A--; )
                ($ = Ti(k[A])), $[Oe] ? H.push($) : R.push($);
              ($ = vr(w, La(R, H))), ($.selector = w);
            }
            return $;
          }),
        (x = Re.select =
          function (w, k, A, H) {
            var R,
              $,
              W,
              Q,
              te,
              de = typeof w == "function" && w,
              ue = !H && y((w = de.selector || w));
            if (((A = A || []), ue.length === 1)) {
              if (
                (($ = ue[0] = ue[0].slice(0)),
                $.length > 2 &&
                  (W = $[0]).type === "ID" &&
                  k.nodeType === 9 &&
                  be &&
                  c.relative[$[1].type])
              ) {
                if (
                  ((k = (c.find.ID(W.matches[0].replace(It, Ft), k) || [])[0]),
                  k)
                )
                  de && (k = k.parentNode);
                else return A;
                w = w.slice($.shift().value.length);
              }
              for (
                R = wr.needsContext.test(w) ? 0 : $.length;
                R-- && ((W = $[R]), !c.relative[(Q = W.type)]);

              )
                if (
                  (te = c.find[Q]) &&
                  (H = te(
                    W.matches[0].replace(It, Ft),
                    (mi.test($[0].type) && yi(k.parentNode)) || k
                  ))
                ) {
                  if (($.splice(R, 1), (w = H.length && Tr($)), !w))
                    return Qt.apply(A, H), A;
                  break;
                }
            }
            return (
              (de || _(w, ue))(
                H,
                k,
                !be,
                A,
                !k || (mi.test(w) && yi(k.parentNode)) || k
              ),
              A
            );
          }),
        (u.sortStable = Oe.split("").sort(wn).join("") === Oe),
        (u.detectDuplicates = !!U),
        L(),
        (u.sortDetached = xt(function (w) {
          return w.compareDocumentPosition(F.createElement("fieldset")) & 1;
        })),
        xt(function (w) {
          return (
            (w.innerHTML = "<a href='#'></a>"),
            w.firstChild.getAttribute("href") === "#"
          );
        }) ||
          vi("type|href|height|width", function (w, k, A) {
            if (!A)
              return w.getAttribute(k, k.toLowerCase() === "type" ? 1 : 2);
          }),
        (!u.attributes ||
          !xt(function (w) {
            return (
              (w.innerHTML = "<input/>"),
              w.firstChild.setAttribute("value", ""),
              w.firstChild.getAttribute("value") === ""
            );
          })) &&
          vi("value", function (w, k, A) {
            if (!A && w.nodeName.toLowerCase() === "input")
              return w.defaultValue;
          }),
        xt(function (w) {
          return w.getAttribute("disabled") == null;
        }) ||
          vi(pi, function (w, k, A) {
            var H;
            if (!A)
              return w[k] === !0
                ? k.toLowerCase()
                : (H = w.getAttributeNode(k)) && H.specified
                ? H.value
                : null;
          }),
        Re
      );
    })(i);
    (f.find = ne),
      (f.expr = ne.selectors),
      (f.expr[":"] = f.expr.pseudos),
      (f.uniqueSort = f.unique = ne.uniqueSort),
      (f.text = ne.getText),
      (f.isXMLDoc = ne.isXML),
      (f.contains = ne.contains),
      (f.escapeSelector = ne.escape);
    var Ee = function (t, a, u) {
        for (var c = [], h = u !== void 0; (t = t[a]) && t.nodeType !== 9; )
          if (t.nodeType === 1) {
            if (h && f(t).is(u)) break;
            c.push(t);
          }
        return c;
      },
      Ge = function (t, a) {
        for (var u = []; t; t = t.nextSibling)
          t.nodeType === 1 && t !== a && u.push(t);
        return u;
      },
      $t = f.expr.match.needsContext;

    function B(t, a) {
      return t.nodeName && t.nodeName.toLowerCase() === a.toLowerCase();
    }
    var G = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

    function Z(t, a, u) {
      return M(a)
        ? f.grep(t, function (c, h) {
            return !!a.call(c, h, c) !== u;
          })
        : a.nodeType
        ? f.grep(t, function (c) {
            return (c === a) !== u;
          })
        : typeof a != "string"
        ? f.grep(t, function (c) {
            return p.call(a, c) > -1 !== u;
          })
        : f.filter(a, t, u);
    }
    (f.filter = function (t, a, u) {
      var c = a[0];
      return (
        u && (t = ":not(" + t + ")"),
        a.length === 1 && c.nodeType === 1
          ? f.find.matchesSelector(c, t)
            ? [c]
            : []
          : f.find.matches(
              t,
              f.grep(a, function (h) {
                return h.nodeType === 1;
              })
            )
      );
    }),
      f.fn.extend({
        find: function (t) {
          var a,
            u,
            c = this.length,
            h = this;
          if (typeof t != "string")
            return this.pushStack(
              f(t).filter(function () {
                for (a = 0; a < c; a++) if (f.contains(h[a], this)) return !0;
              })
            );
          for (u = this.pushStack([]), a = 0; a < c; a++) f.find(t, h[a], u);
          return c > 1 ? f.uniqueSort(u) : u;
        },
        filter: function (t) {
          return this.pushStack(Z(this, t || [], !1));
        },
        not: function (t) {
          return this.pushStack(Z(this, t || [], !0));
        },
        is: function (t) {
          return !!Z(
            this,
            typeof t == "string" && $t.test(t) ? f(t) : t || [],
            !1
          ).length;
        },
      });
    var ye,
      ie = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
      Ae = (f.fn.init = function (t, a, u) {
        var c, h;
        if (!t) return this;
        if (((u = u || ye), typeof t == "string"))
          if (
            (t[0] === "<" && t[t.length - 1] === ">" && t.length >= 3
              ? (c = [null, t, null])
              : (c = ie.exec(t)),
            c && (c[1] || !a))
          )
            if (c[1]) {
              if (
                ((a = a instanceof f ? a[0] : a),
                f.merge(
                  this,
                  f.parseHTML(
                    c[1],
                    a && a.nodeType ? a.ownerDocument || a : Y,
                    !0
                  )
                ),
                G.test(c[1]) && f.isPlainObject(a))
              )
                for (c in a) M(this[c]) ? this[c](a[c]) : this.attr(c, a[c]);
              return this;
            } else
              return (
                (h = Y.getElementById(c[2])),
                h && ((this[0] = h), (this.length = 1)),
                this
              );
          else
            return !a || a.jquery
              ? (a || u).find(t)
              : this.constructor(a).find(t);
        else {
          if (t.nodeType) return (this[0] = t), (this.length = 1), this;
          if (M(t)) return u.ready !== void 0 ? u.ready(t) : t(f);
        }
        return f.makeArray(t, this);
      });
    (Ae.prototype = f.fn), (ye = f(Y));
    var je = /^(?:parents|prev(?:Until|All))/,
      Xe = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0,
      };
    f.fn.extend({
      has: function (t) {
        var a = f(t, this),
          u = a.length;
        return this.filter(function () {
          for (var c = 0; c < u; c++) if (f.contains(this, a[c])) return !0;
        });
      },
      closest: function (t, a) {
        var u,
          c = 0,
          h = this.length,
          m = [],
          y = typeof t != "string" && f(t);
        if (!$t.test(t)) {
          for (; c < h; c++)
            for (u = this[c]; u && u !== a; u = u.parentNode)
              if (
                u.nodeType < 11 &&
                (y
                  ? y.index(u) > -1
                  : u.nodeType === 1 && f.find.matchesSelector(u, t))
              ) {
                m.push(u);
                break;
              }
        }
        return this.pushStack(m.length > 1 ? f.uniqueSort(m) : m);
      },
      index: function (t) {
        return t
          ? typeof t == "string"
            ? p.call(f(t), this[0])
            : p.call(this, t.jquery ? t[0] : t)
          : this[0] && this[0].parentNode
          ? this.first().prevAll().length
          : -1;
      },
      add: function (t, a) {
        return this.pushStack(f.uniqueSort(f.merge(this.get(), f(t, a))));
      },
      addBack: function (t) {
        return this.add(
          t == null ? this.prevObject : this.prevObject.filter(t)
        );
      },
    });

    function Ue(t, a) {
      for (; (t = t[a]) && t.nodeType !== 1; );
      return t;
    }
    f.each(
      {
        parent: function (t) {
          var a = t.parentNode;
          return a && a.nodeType !== 11 ? a : null;
        },
        parents: function (t) {
          return Ee(t, "parentNode");
        },
        parentsUntil: function (t, a, u) {
          return Ee(t, "parentNode", u);
        },
        next: function (t) {
          return Ue(t, "nextSibling");
        },
        prev: function (t) {
          return Ue(t, "previousSibling");
        },
        nextAll: function (t) {
          return Ee(t, "nextSibling");
        },
        prevAll: function (t) {
          return Ee(t, "previousSibling");
        },
        nextUntil: function (t, a, u) {
          return Ee(t, "nextSibling", u);
        },
        prevUntil: function (t, a, u) {
          return Ee(t, "previousSibling", u);
        },
        siblings: function (t) {
          return Ge((t.parentNode || {}).firstChild, t);
        },
        children: function (t) {
          return Ge(t.firstChild);
        },
        contents: function (t) {
          return t.contentDocument != null && e(t.contentDocument)
            ? t.contentDocument
            : (B(t, "template") && (t = t.content || t),
              f.merge([], t.childNodes));
        },
      },
      function (t, a) {
        f.fn[t] = function (u, c) {
          var h = f.map(this, a, u);
          return (
            t.slice(-5) !== "Until" && (c = u),
            c && typeof c == "string" && (h = f.filter(c, h)),
            this.length > 1 &&
              (Xe[t] || f.uniqueSort(h), je.test(t) && h.reverse()),
            this.pushStack(h)
          );
        };
      }
    );
    var qe = /[^\x20\t\r\n\f]+/g;

    function Ot(t) {
      var a = {};
      return (
        f.each(t.match(qe) || [], function (u, c) {
          a[c] = !0;
        }),
        a
      );
    }
    f.Callbacks = function (t) {
      t = typeof t == "string" ? Ot(t) : f.extend({}, t);
      var a,
        u,
        c,
        h,
        m = [],
        y = [],
        _ = -1,
        x = function () {
          for (h = h || t.once, c = a = !0; y.length; _ = -1)
            for (u = y.shift(); ++_ < m.length; )
              m[_].apply(u[0], u[1]) === !1 &&
                t.stopOnFalse &&
                ((_ = m.length), (u = !1));
          t.memory || (u = !1), (a = !1), h && (u ? (m = []) : (m = ""));
        },
        O = {
          add: function () {
            return (
              m &&
                (u && !a && ((_ = m.length - 1), y.push(u)),
                (function j(U) {
                  f.each(U, function (L, F) {
                    M(F)
                      ? (!t.unique || !O.has(F)) && m.push(F)
                      : F && F.length && J(F) !== "string" && j(F);
                  });
                })(arguments),
                u && !a && x()),
              this
            );
          },
          remove: function () {
            return (
              f.each(arguments, function (j, U) {
                for (var L; (L = f.inArray(U, m, L)) > -1; )
                  m.splice(L, 1), L <= _ && _--;
              }),
              this
            );
          },
          has: function (j) {
            return j ? f.inArray(j, m) > -1 : m.length > 0;
          },
          empty: function () {
            return m && (m = []), this;
          },
          disable: function () {
            return (h = y = []), (m = u = ""), this;
          },
          disabled: function () {
            return !m;
          },
          lock: function () {
            return (h = y = []), !u && !a && (m = u = ""), this;
          },
          locked: function () {
            return !!h;
          },
          fireWith: function (j, U) {
            return (
              h ||
                ((U = U || []),
                (U = [j, U.slice ? U.slice() : U]),
                y.push(U),
                a || x()),
              this
            );
          },
          fire: function () {
            return O.fireWith(this, arguments), this;
          },
          fired: function () {
            return !!c;
          },
        };
      return O;
    };

    function Je(t) {
      return t;
    }

    function jn(t) {
      throw t;
    }

    function hr(t, a, u, c) {
      var h;
      try {
        t && M((h = t.promise))
          ? h.call(t).done(a).fail(u)
          : t && M((h = t.then))
          ? h.call(t, a, u)
          : a.apply(void 0, [t].slice(c));
      } catch (m) {
        u.apply(void 0, [m]);
      }
    }
    f.extend({
      Deferred: function (t) {
        var a = [
            [
              "notify",
              "progress",
              f.Callbacks("memory"),
              f.Callbacks("memory"),
              2,
            ],
            [
              "resolve",
              "done",
              f.Callbacks("once memory"),
              f.Callbacks("once memory"),
              0,
              "resolved",
            ],
            [
              "reject",
              "fail",
              f.Callbacks("once memory"),
              f.Callbacks("once memory"),
              1,
              "rejected",
            ],
          ],
          u = "pending",
          c = {
            state: function () {
              return u;
            },
            always: function () {
              return h.done(arguments).fail(arguments), this;
            },
            catch: function (m) {
              return c.then(null, m);
            },
            pipe: function () {
              var m = arguments;
              return f
                .Deferred(function (y) {
                  f.each(a, function (_, x) {
                    var O = M(m[x[4]]) && m[x[4]];
                    h[x[1]](function () {
                      var j = O && O.apply(this, arguments);
                      j && M(j.promise)
                        ? j
                            .promise()
                            .progress(y.notify)
                            .done(y.resolve)
                            .fail(y.reject)
                        : y[x[0] + "With"](this, O ? [j] : arguments);
                    });
                  }),
                    (m = null);
                })
                .promise();
            },
            then: function (m, y, _) {
              var x = 0;

              function O(j, U, L, F) {
                return function () {
                  var se = this,
                    be = arguments,
                    ae = function () {
                      var He, ft;
                      if (!(j < x)) {
                        if (((He = L.apply(se, be)), He === U.promise()))
                          throw new TypeError("Thenable self-resolution");
                        (ft =
                          He &&
                          (typeof He == "object" || typeof He == "function") &&
                          He.then),
                          M(ft)
                            ? F
                              ? ft.call(He, O(x, U, Je, F), O(x, U, jn, F))
                              : (x++,
                                ft.call(
                                  He,
                                  O(x, U, Je, F),
                                  O(x, U, jn, F),
                                  O(x, U, Je, U.notifyWith)
                                ))
                            : (L !== Je && ((se = void 0), (be = [He])),
                              (F || U.resolveWith)(se, be));
                      }
                    },
                    Be = F
                      ? ae
                      : function () {
                          try {
                            ae();
                          } catch (He) {
                            f.Deferred.exceptionHook &&
                              f.Deferred.exceptionHook(He, Be.stackTrace),
                              j + 1 >= x &&
                                (L !== jn && ((se = void 0), (be = [He])),
                                U.rejectWith(se, be));
                          }
                        };
                  j
                    ? Be()
                    : (f.Deferred.getStackHook &&
                        (Be.stackTrace = f.Deferred.getStackHook()),
                      i.setTimeout(Be));
                };
              }
              return f
                .Deferred(function (j) {
                  a[0][3].add(O(0, j, M(_) ? _ : Je, j.notifyWith)),
                    a[1][3].add(O(0, j, M(m) ? m : Je)),
                    a[2][3].add(O(0, j, M(y) ? y : jn));
                })
                .promise();
            },
            promise: function (m) {
              return m != null ? f.extend(m, c) : c;
            },
          },
          h = {};
        return (
          f.each(a, function (m, y) {
            var _ = y[2],
              x = y[5];
            (c[y[1]] = _.add),
              x &&
                _.add(
                  function () {
                    u = x;
                  },
                  a[3 - m][2].disable,
                  a[3 - m][3].disable,
                  a[0][2].lock,
                  a[0][3].lock
                ),
              _.add(y[3].fire),
              (h[y[0]] = function () {
                return (
                  h[y[0] + "With"](this === h ? void 0 : this, arguments), this
                );
              }),
              (h[y[0] + "With"] = _.fireWith);
          }),
          c.promise(h),
          t && t.call(h, h),
          h
        );
      },
      when: function (t) {
        var a = arguments.length,
          u = a,
          c = Array(u),
          h = n.call(arguments),
          m = f.Deferred(),
          y = function (_) {
            return function (x) {
              (c[_] = this),
                (h[_] = arguments.length > 1 ? n.call(arguments) : x),
                --a || m.resolveWith(c, h);
            };
          };
        if (
          a <= 1 &&
          (hr(t, m.done(y(u)).resolve, m.reject, !a),
          m.state() === "pending" || M(h[u] && h[u].then))
        )
          return m.then();
        for (; u--; ) hr(h[u], y(u), m.reject);
        return m.promise();
      },
    });
    var ti = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    (f.Deferred.exceptionHook = function (t, a) {
      i.console &&
        i.console.warn &&
        t &&
        ti.test(t.name) &&
        i.console.warn("jQuery.Deferred exception: " + t.message, t.stack, a);
    }),
      (f.readyException = function (t) {
        i.setTimeout(function () {
          throw t;
        });
      });
    var Yn = f.Deferred();
    (f.fn.ready = function (t) {
      return (
        Yn.then(t).catch(function (a) {
          f.readyException(a);
        }),
        this
      );
    }),
      f.extend({
        isReady: !1,
        readyWait: 1,
        ready: function (t) {
          (t === !0 ? --f.readyWait : f.isReady) ||
            ((f.isReady = !0),
            !(t !== !0 && --f.readyWait > 0) && Yn.resolveWith(Y, [f]));
        },
      }),
      (f.ready.then = Yn.then);

    function Dn() {
      Y.removeEventListener("DOMContentLoaded", Dn),
        i.removeEventListener("load", Dn),
        f.ready();
    }
    Y.readyState === "complete" ||
    (Y.readyState !== "loading" && !Y.documentElement.doScroll)
      ? i.setTimeout(f.ready)
      : (Y.addEventListener("DOMContentLoaded", Dn),
        i.addEventListener("load", Dn));
    var lt = function (t, a, u, c, h, m, y) {
        var _ = 0,
          x = t.length,
          O = u == null;
        if (J(u) === "object") {
          h = !0;
          for (_ in u) lt(t, a, _, u[_], !0, m, y);
        } else if (
          c !== void 0 &&
          ((h = !0),
          M(c) || (y = !0),
          O &&
            (y
              ? (a.call(t, c), (a = null))
              : ((O = a),
                (a = function (j, U, L) {
                  return O.call(f(j), L);
                }))),
          a)
        )
          for (; _ < x; _++) a(t[_], u, y ? c : c.call(t[_], _, a(t[_], u)));
        return h ? t : O ? a.call(t) : x ? a(t[0], u) : m;
      },
      ni = /^-ms-/,
      ri = /-([a-z])/g;

    function Mn(t, a) {
      return a.toUpperCase();
    }

    function $e(t) {
      return t.replace(ni, "ms-").replace(ri, Mn);
    }
    var rn = function (t) {
      return t.nodeType === 1 || t.nodeType === 9 || !+t.nodeType;
    };

    function on() {
      this.expando = f.expando + on.uid++;
    }
    (on.uid = 1),
      (on.prototype = {
        cache: function (t) {
          var a = t[this.expando];
          return (
            a ||
              ((a = {}),
              rn(t) &&
                (t.nodeType
                  ? (t[this.expando] = a)
                  : Object.defineProperty(t, this.expando, {
                      value: a,
                      configurable: !0,
                    }))),
            a
          );
        },
        set: function (t, a, u) {
          var c,
            h = this.cache(t);
          if (typeof a == "string") h[$e(a)] = u;
          else for (c in a) h[$e(c)] = a[c];
          return h;
        },
        get: function (t, a) {
          return a === void 0
            ? this.cache(t)
            : t[this.expando] && t[this.expando][$e(a)];
        },
        access: function (t, a, u) {
          return a === void 0 || (a && typeof a == "string" && u === void 0)
            ? this.get(t, a)
            : (this.set(t, a, u), u !== void 0 ? u : a);
        },
        remove: function (t, a) {
          var u,
            c = t[this.expando];
          if (c !== void 0) {
            if (a !== void 0)
              for (
                Array.isArray(a)
                  ? (a = a.map($e))
                  : ((a = $e(a)), (a = (a in c) ? [a] : a.match(qe) || [])),
                  u = a.length;
                u--;

              )
                delete c[a[u]];
            (a === void 0 || f.isEmptyObject(c)) &&
              (t.nodeType
                ? (t[this.expando] = void 0)
                : delete t[this.expando]);
          }
        },
        hasData: function (t) {
          var a = t[this.expando];
          return a !== void 0 && !f.isEmptyObject(a);
        },
      });
    var le = new on(),
      Ke = new on(),
      pr = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      ii = /[A-Z]/g;

    function oi(t) {
      return t === "true"
        ? !0
        : t === "false"
        ? !1
        : t === "null"
        ? null
        : t === +t + ""
        ? +t
        : pr.test(t)
        ? JSON.parse(t)
        : t;
    }

    function Rt(t, a, u) {
      var c;
      if (u === void 0 && t.nodeType === 1)
        if (
          ((c = "data-" + a.replace(ii, "-$&").toLowerCase()),
          (u = t.getAttribute(c)),
          typeof u == "string")
        ) {
          try {
            u = oi(u);
          } catch {}
          Ke.set(t, a, u);
        } else u = void 0;
      return u;
    }
    f.extend({
      hasData: function (t) {
        return Ke.hasData(t) || le.hasData(t);
      },
      data: function (t, a, u) {
        return Ke.access(t, a, u);
      },
      removeData: function (t, a) {
        Ke.remove(t, a);
      },
      _data: function (t, a, u) {
        return le.access(t, a, u);
      },
      _removeData: function (t, a) {
        le.remove(t, a);
      },
    }),
      f.fn.extend({
        data: function (t, a) {
          var u,
            c,
            h,
            m = this[0],
            y = m && m.attributes;
          if (t === void 0) {
            if (
              this.length &&
              ((h = Ke.get(m)), m.nodeType === 1 && !le.get(m, "hasDataAttrs"))
            ) {
              for (u = y.length; u--; )
                y[u] &&
                  ((c = y[u].name),
                  c.indexOf("data-") === 0 &&
                    ((c = $e(c.slice(5))), Rt(m, c, h[c])));
              le.set(m, "hasDataAttrs", !0);
            }
            return h;
          }
          return typeof t == "object"
            ? this.each(function () {
                Ke.set(this, t);
              })
            : lt(
                this,
                function (_) {
                  var x;
                  if (m && _ === void 0)
                    return (
                      (x = Ke.get(m, t)),
                      x !== void 0 || ((x = Rt(m, t)), x !== void 0)
                        ? x
                        : void 0
                    );
                  this.each(function () {
                    Ke.set(this, t, _);
                  });
                },
                null,
                a,
                arguments.length > 1,
                null,
                !0
              );
        },
        removeData: function (t) {
          return this.each(function () {
            Ke.remove(this, t);
          });
        },
      }),
      f.extend({
        queue: function (t, a, u) {
          var c;
          if (t)
            return (
              (a = (a || "fx") + "queue"),
              (c = le.get(t, a)),
              u &&
                (!c || Array.isArray(u)
                  ? (c = le.access(t, a, f.makeArray(u)))
                  : c.push(u)),
              c || []
            );
        },
        dequeue: function (t, a) {
          a = a || "fx";
          var u = f.queue(t, a),
            c = u.length,
            h = u.shift(),
            m = f._queueHooks(t, a),
            y = function () {
              f.dequeue(t, a);
            };
          h === "inprogress" && ((h = u.shift()), c--),
            h &&
              (a === "fx" && u.unshift("inprogress"),
              delete m.stop,
              h.call(t, y, m)),
            !c && m && m.empty.fire();
        },
        _queueHooks: function (t, a) {
          var u = a + "queueHooks";
          return (
            le.get(t, u) ||
            le.access(t, u, {
              empty: f.Callbacks("once memory").add(function () {
                le.remove(t, [a + "queue", u]);
              }),
            })
          );
        },
      }),
      f.fn.extend({
        queue: function (t, a) {
          var u = 2;
          return (
            typeof t != "string" && ((a = t), (t = "fx"), u--),
            arguments.length < u
              ? f.queue(this[0], t)
              : a === void 0
              ? this
              : this.each(function () {
                  var c = f.queue(this, t, a);
                  f._queueHooks(this, t),
                    t === "fx" && c[0] !== "inprogress" && f.dequeue(this, t);
                })
          );
        },
        dequeue: function (t) {
          return this.each(function () {
            f.dequeue(this, t);
          });
        },
        clearQueue: function (t) {
          return this.queue(t || "fx", []);
        },
        promise: function (t, a) {
          var u,
            c = 1,
            h = f.Deferred(),
            m = this,
            y = this.length,
            _ = function () {
              --c || h.resolveWith(m, [m]);
            };
          for (
            typeof t != "string" && ((a = t), (t = void 0)), t = t || "fx";
            y--;

          )
            (u = le.get(m[y], t + "queueHooks")),
              u && u.empty && (c++, u.empty.add(_));
          return _(), h.promise(a);
        },
      });
    var gr = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
      ut = new RegExp("^(?:([+-])=|)(" + gr + ")([a-z%]*)$", "i"),
      gt = ["Top", "Right", "Bottom", "Left"],
      Nt = Y.documentElement,
      zt = function (t) {
        return f.contains(t.ownerDocument, t);
      },
      sn = {
        composed: !0,
      };
    Nt.getRootNode &&
      (zt = function (t) {
        return (
          f.contains(t.ownerDocument, t) ||
          t.getRootNode(sn) === t.ownerDocument
        );
      });
    var nt = function (t, a) {
      return (
        (t = a || t),
        t.style.display === "none" ||
          (t.style.display === "" && zt(t) && f.css(t, "display") === "none")
      );
    };

    function an(t, a, u, c) {
      var h,
        m,
        y = 20,
        _ = c
          ? function () {
              return c.cur();
            }
          : function () {
              return f.css(t, a, "");
            },
        x = _(),
        O = (u && u[3]) || (f.cssNumber[a] ? "" : "px"),
        j =
          t.nodeType &&
          (f.cssNumber[a] || (O !== "px" && +x)) &&
          ut.exec(f.css(t, a));
      if (j && j[3] !== O) {
        for (x = x / 2, O = O || j[3], j = +x || 1; y--; )
          f.style(t, a, j + O),
            (1 - m) * (1 - (m = _() / x || 0.5)) <= 0 && (y = 0),
            (j = j / m);
        (j = j * 2), f.style(t, a, j + O), (u = u || []);
      }
      return (
        u &&
          ((j = +j || +x || 0),
          (h = u[1] ? j + (u[1] + 1) * u[2] : +u[2]),
          c && ((c.unit = O), (c.start = j), (c.end = h))),
        h
      );
    }
    var ln = {};

    function un(t) {
      var a,
        u = t.ownerDocument,
        c = t.nodeName,
        h = ln[c];
      return (
        h ||
        ((a = u.body.appendChild(u.createElement(c))),
        (h = f.css(a, "display")),
        a.parentNode.removeChild(a),
        h === "none" && (h = "block"),
        (ln[c] = h),
        h)
      );
    }

    function Bt(t, a) {
      for (var u, c, h = [], m = 0, y = t.length; m < y; m++)
        (c = t[m]),
          c.style &&
            ((u = c.style.display),
            a
              ? (u === "none" &&
                  ((h[m] = le.get(c, "display") || null),
                  h[m] || (c.style.display = "")),
                c.style.display === "" && nt(c) && (h[m] = un(c)))
              : u !== "none" && ((h[m] = "none"), le.set(c, "display", u)));
      for (m = 0; m < y; m++) h[m] != null && (t[m].style.display = h[m]);
      return t;
    }
    f.fn.extend({
      show: function () {
        return Bt(this, !0);
      },
      hide: function () {
        return Bt(this);
      },
      toggle: function (t) {
        return typeof t == "boolean"
          ? t
            ? this.show()
            : this.hide()
          : this.each(function () {
              nt(this) ? f(this).show() : f(this).hide();
            });
      },
    });
    var Tt = /^(?:checkbox|radio)$/i,
      Wt = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
      Ut = /^$|^module$|\/(?:java|ecma)script/i;
    (function () {
      var t = Y.createDocumentFragment(),
        a = t.appendChild(Y.createElement("div")),
        u = Y.createElement("input");
      u.setAttribute("type", "radio"),
        u.setAttribute("checked", "checked"),
        u.setAttribute("name", "t"),
        a.appendChild(u),
        (N.checkClone = a.cloneNode(!0).cloneNode(!0).lastChild.checked),
        (a.innerHTML = "<textarea>x</textarea>"),
        (N.noCloneChecked = !!a.cloneNode(!0).lastChild.defaultValue),
        (a.innerHTML = "<option></option>"),
        (N.option = !!a.lastChild);
    })();
    var Ve = {
      thead: [1, "<table>", "</table>"],
      col: [2, "<table><colgroup>", "</colgroup></table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      _default: [0, "", ""],
    };
    (Ve.tbody = Ve.tfoot = Ve.colgroup = Ve.caption = Ve.thead),
      (Ve.th = Ve.td),
      N.option ||
        (Ve.optgroup = Ve.option =
          [1, "<select multiple='multiple'>", "</select>"]);

    function ze(t, a) {
      var u;
      return (
        typeof t.getElementsByTagName < "u"
          ? (u = t.getElementsByTagName(a || "*"))
          : typeof t.querySelectorAll < "u"
          ? (u = t.querySelectorAll(a || "*"))
          : (u = []),
        a === void 0 || (a && B(t, a)) ? f.merge([t], u) : u
      );
    }

    function Vt(t, a) {
      for (var u = 0, c = t.length; u < c; u++)
        le.set(t[u], "globalEval", !a || le.get(a[u], "globalEval"));
    }
    var In = /<|&#?\w+;/;

    function cn(t, a, u, c, h) {
      for (
        var m,
          y,
          _,
          x,
          O,
          j,
          U = a.createDocumentFragment(),
          L = [],
          F = 0,
          se = t.length;
        F < se;
        F++
      )
        if (((m = t[F]), m || m === 0))
          if (J(m) === "object") f.merge(L, m.nodeType ? [m] : m);
          else if (!In.test(m)) L.push(a.createTextNode(m));
          else {
            for (
              y = y || U.appendChild(a.createElement("div")),
                _ = (Wt.exec(m) || ["", ""])[1].toLowerCase(),
                x = Ve[_] || Ve._default,
                y.innerHTML = x[1] + f.htmlPrefilter(m) + x[2],
                j = x[0];
              j--;

            )
              y = y.lastChild;
            f.merge(L, y.childNodes), (y = U.firstChild), (y.textContent = "");
          }
      for (U.textContent = "", F = 0; (m = L[F++]); ) {
        if (c && f.inArray(m, c) > -1) {
          h && h.push(m);
          continue;
        }
        if (((O = zt(m)), (y = ze(U.appendChild(m), "script")), O && Vt(y), u))
          for (j = 0; (m = y[j++]); ) Ut.test(m.type || "") && u.push(m);
      }
      return U;
    }
    var fn = /^key/,
      dn = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
      Gt = /^([^.]*)(?:\.(.+)|)/;

    function mt() {
      return !0;
    }

    function vt() {
      return !1;
    }

    function hn(t, a) {
      return (t === Lt()) == (a === "focus");
    }

    function Lt() {
      try {
        return Y.activeElement;
      } catch {}
    }

    function jt(t, a, u, c, h, m) {
      var y, _;
      if (typeof a == "object") {
        typeof u != "string" && ((c = c || u), (u = void 0));
        for (_ in a) jt(t, _, u, c, a[_], m);
        return t;
      }
      if (
        (c == null && h == null
          ? ((h = u), (c = u = void 0))
          : h == null &&
            (typeof u == "string"
              ? ((h = c), (c = void 0))
              : ((h = c), (c = u), (u = void 0))),
        h === !1)
      )
        h = vt;
      else if (!h) return t;
      return (
        m === 1 &&
          ((y = h),
          (h = function (x) {
            return f().off(x), y.apply(this, arguments);
          }),
          (h.guid = y.guid || (y.guid = f.guid++))),
        t.each(function () {
          f.event.add(this, a, h, c, u);
        })
      );
    }
    f.event = {
      global: {},
      add: function (t, a, u, c, h) {
        var m,
          y,
          _,
          x,
          O,
          j,
          U,
          L,
          F,
          se,
          be,
          ae = le.get(t);
        if (rn(t))
          for (
            u.handler && ((m = u), (u = m.handler), (h = m.selector)),
              h && f.find.matchesSelector(Nt, h),
              u.guid || (u.guid = f.guid++),
              (x = ae.events) || (x = ae.events = Object.create(null)),
              (y = ae.handle) ||
                (y = ae.handle =
                  function (Be) {
                    return typeof f < "u" && f.event.triggered !== Be.type
                      ? f.event.dispatch.apply(t, arguments)
                      : void 0;
                  }),
              a = (a || "").match(qe) || [""],
              O = a.length;
            O--;

          )
            (_ = Gt.exec(a[O]) || []),
              (F = be = _[1]),
              (se = (_[2] || "").split(".").sort()),
              F &&
                ((U = f.event.special[F] || {}),
                (F = (h ? U.delegateType : U.bindType) || F),
                (U = f.event.special[F] || {}),
                (j = f.extend(
                  {
                    type: F,
                    origType: be,
                    data: c,
                    handler: u,
                    guid: u.guid,
                    selector: h,
                    needsContext: h && f.expr.match.needsContext.test(h),
                    namespace: se.join("."),
                  },
                  m
                )),
                (L = x[F]) ||
                  ((L = x[F] = []),
                  (L.delegateCount = 0),
                  (!U.setup || U.setup.call(t, c, se, y) === !1) &&
                    t.addEventListener &&
                    t.addEventListener(F, y)),
                U.add &&
                  (U.add.call(t, j),
                  j.handler.guid || (j.handler.guid = u.guid)),
                h ? L.splice(L.delegateCount++, 0, j) : L.push(j),
                (f.event.global[F] = !0));
      },
      remove: function (t, a, u, c, h) {
        var m,
          y,
          _,
          x,
          O,
          j,
          U,
          L,
          F,
          se,
          be,
          ae = le.hasData(t) && le.get(t);
        if (!(!ae || !(x = ae.events))) {
          for (a = (a || "").match(qe) || [""], O = a.length; O--; ) {
            if (
              ((_ = Gt.exec(a[O]) || []),
              (F = be = _[1]),
              (se = (_[2] || "").split(".").sort()),
              !F)
            ) {
              for (F in x) f.event.remove(t, F + a[O], u, c, !0);
              continue;
            }
            for (
              U = f.event.special[F] || {},
                F = (c ? U.delegateType : U.bindType) || F,
                L = x[F] || [],
                _ =
                  _[2] &&
                  new RegExp("(^|\\.)" + se.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                y = m = L.length;
              m--;

            )
              (j = L[m]),
                (h || be === j.origType) &&
                  (!u || u.guid === j.guid) &&
                  (!_ || _.test(j.namespace)) &&
                  (!c || c === j.selector || (c === "**" && j.selector)) &&
                  (L.splice(m, 1),
                  j.selector && L.delegateCount--,
                  U.remove && U.remove.call(t, j));
            y &&
              !L.length &&
              ((!U.teardown || U.teardown.call(t, se, ae.handle) === !1) &&
                f.removeEvent(t, F, ae.handle),
              delete x[F]);
          }
          f.isEmptyObject(x) && le.remove(t, "handle events");
        }
      },
      dispatch: function (t) {
        var a,
          u,
          c,
          h,
          m,
          y,
          _ = new Array(arguments.length),
          x = f.event.fix(t),
          O = (le.get(this, "events") || Object.create(null))[x.type] || [],
          j = f.event.special[x.type] || {};
        for (_[0] = x, a = 1; a < arguments.length; a++) _[a] = arguments[a];
        if (
          ((x.delegateTarget = this),
          !(j.preDispatch && j.preDispatch.call(this, x) === !1))
        ) {
          for (
            y = f.event.handlers.call(this, x, O), a = 0;
            (h = y[a++]) && !x.isPropagationStopped();

          )
            for (
              x.currentTarget = h.elem, u = 0;
              (m = h.handlers[u++]) && !x.isImmediatePropagationStopped();

            )
              (!x.rnamespace ||
                m.namespace === !1 ||
                x.rnamespace.test(m.namespace)) &&
                ((x.handleObj = m),
                (x.data = m.data),
                (c = (
                  (f.event.special[m.origType] || {}).handle || m.handler
                ).apply(h.elem, _)),
                c !== void 0 &&
                  (x.result = c) === !1 &&
                  (x.preventDefault(), x.stopPropagation()));
          return j.postDispatch && j.postDispatch.call(this, x), x.result;
        }
      },
      handlers: function (t, a) {
        var u,
          c,
          h,
          m,
          y,
          _ = [],
          x = a.delegateCount,
          O = t.target;
        if (x && O.nodeType && !(t.type === "click" && t.button >= 1)) {
          for (; O !== this; O = O.parentNode || this)
            if (
              O.nodeType === 1 &&
              !(t.type === "click" && O.disabled === !0)
            ) {
              for (m = [], y = {}, u = 0; u < x; u++)
                (c = a[u]),
                  (h = c.selector + " "),
                  y[h] === void 0 &&
                    (y[h] = c.needsContext
                      ? f(h, this).index(O) > -1
                      : f.find(h, this, null, [O]).length),
                  y[h] && m.push(c);
              m.length &&
                _.push({
                  elem: O,
                  handlers: m,
                });
            }
        }
        return (
          (O = this),
          x < a.length &&
            _.push({
              elem: O,
              handlers: a.slice(x),
            }),
          _
        );
      },
      addProp: function (t, a) {
        Object.defineProperty(f.Event.prototype, t, {
          enumerable: !0,
          configurable: !0,
          get: M(a)
            ? function () {
                if (this.originalEvent) return a(this.originalEvent);
              }
            : function () {
                if (this.originalEvent) return this.originalEvent[t];
              },
          set: function (u) {
            Object.defineProperty(this, t, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: u,
            });
          },
        });
      },
      fix: function (t) {
        return t[f.expando] ? t : new f.Event(t);
      },
      special: {
        load: {
          noBubble: !0,
        },
        click: {
          setup: function (t) {
            var a = this || t;
            return (
              Tt.test(a.type) && a.click && B(a, "input") && Et(a, "click", mt),
              !1
            );
          },
          trigger: function (t) {
            var a = this || t;
            return (
              Tt.test(a.type) && a.click && B(a, "input") && Et(a, "click"), !0
            );
          },
          _default: function (t) {
            var a = t.target;
            return (
              (Tt.test(a.type) &&
                a.click &&
                B(a, "input") &&
                le.get(a, "click")) ||
              B(a, "a")
            );
          },
        },
        beforeunload: {
          postDispatch: function (t) {
            t.result !== void 0 &&
              t.originalEvent &&
              (t.originalEvent.returnValue = t.result);
          },
        },
      },
    };

    function Et(t, a, u) {
      if (!u) {
        le.get(t, a) === void 0 && f.event.add(t, a, mt);
        return;
      }
      le.set(t, a, !1),
        f.event.add(t, a, {
          namespace: !1,
          handler: function (c) {
            var h,
              m,
              y = le.get(this, a);
            if (c.isTrigger & 1 && this[a]) {
              if (y.length)
                (f.event.special[a] || {}).delegateType && c.stopPropagation();
              else if (
                ((y = n.call(arguments)),
                le.set(this, a, y),
                (h = u(this, a)),
                this[a](),
                (m = le.get(this, a)),
                y !== m || h ? le.set(this, a, !1) : (m = {}),
                y !== m)
              )
                return (
                  c.stopImmediatePropagation(), c.preventDefault(), m.value
                );
            } else
              y.length &&
                (le.set(this, a, {
                  value: f.event.trigger(
                    f.extend(y[0], f.Event.prototype),
                    y.slice(1),
                    this
                  ),
                }),
                c.stopImmediatePropagation());
          },
        });
    }
    (f.removeEvent = function (t, a, u) {
      t.removeEventListener && t.removeEventListener(a, u);
    }),
      (f.Event = function (t, a) {
        if (!(this instanceof f.Event)) return new f.Event(t, a);
        t && t.type
          ? ((this.originalEvent = t),
            (this.type = t.type),
            (this.isDefaultPrevented =
              t.defaultPrevented ||
              (t.defaultPrevented === void 0 && t.returnValue === !1)
                ? mt
                : vt),
            (this.target =
              t.target && t.target.nodeType === 3
                ? t.target.parentNode
                : t.target),
            (this.currentTarget = t.currentTarget),
            (this.relatedTarget = t.relatedTarget))
          : (this.type = t),
          a && f.extend(this, a),
          (this.timeStamp = (t && t.timeStamp) || Date.now()),
          (this[f.expando] = !0);
      }),
      (f.Event.prototype = {
        constructor: f.Event,
        isDefaultPrevented: vt,
        isPropagationStopped: vt,
        isImmediatePropagationStopped: vt,
        isSimulated: !1,
        preventDefault: function () {
          var t = this.originalEvent;
          (this.isDefaultPrevented = mt),
            t && !this.isSimulated && t.preventDefault();
        },
        stopPropagation: function () {
          var t = this.originalEvent;
          (this.isPropagationStopped = mt),
            t && !this.isSimulated && t.stopPropagation();
        },
        stopImmediatePropagation: function () {
          var t = this.originalEvent;
          (this.isImmediatePropagationStopped = mt),
            t && !this.isSimulated && t.stopImmediatePropagation(),
            this.stopPropagation();
        },
      }),
      f.each(
        {
          altKey: !0,
          bubbles: !0,
          cancelable: !0,
          changedTouches: !0,
          ctrlKey: !0,
          detail: !0,
          eventPhase: !0,
          metaKey: !0,
          pageX: !0,
          pageY: !0,
          shiftKey: !0,
          view: !0,
          char: !0,
          code: !0,
          charCode: !0,
          key: !0,
          keyCode: !0,
          button: !0,
          buttons: !0,
          clientX: !0,
          clientY: !0,
          offsetX: !0,
          offsetY: !0,
          pointerId: !0,
          pointerType: !0,
          screenX: !0,
          screenY: !0,
          targetTouches: !0,
          toElement: !0,
          touches: !0,
          which: function (t) {
            var a = t.button;
            return t.which == null && fn.test(t.type)
              ? t.charCode != null
                ? t.charCode
                : t.keyCode
              : !t.which && a !== void 0 && dn.test(t.type)
              ? a & 1
                ? 1
                : a & 2
                ? 3
                : a & 4
                ? 2
                : 0
              : t.which;
          },
        },
        f.event.addProp
      ),
      f.each(
        {
          focus: "focusin",
          blur: "focusout",
        },
        function (t, a) {
          f.event.special[t] = {
            setup: function () {
              return Et(this, t, hn), !1;
            },
            trigger: function () {
              return Et(this, t), !0;
            },
            delegateType: a,
          };
        }
      ),
      f.each(
        {
          mouseenter: "mouseover",
          mouseleave: "mouseout",
          pointerenter: "pointerover",
          pointerleave: "pointerout",
        },
        function (t, a) {
          f.event.special[t] = {
            delegateType: a,
            bindType: a,
            handle: function (u) {
              var c,
                h = this,
                m = u.relatedTarget,
                y = u.handleObj;
              return (
                (!m || (m !== h && !f.contains(h, m))) &&
                  ((u.type = y.origType),
                  (c = y.handler.apply(this, arguments)),
                  (u.type = a)),
                c
              );
            },
          };
        }
      ),
      f.fn.extend({
        on: function (t, a, u, c) {
          return jt(this, t, a, u, c);
        },
        one: function (t, a, u, c) {
          return jt(this, t, a, u, c, 1);
        },
        off: function (t, a, u) {
          var c, h;
          if (t && t.preventDefault && t.handleObj)
            return (
              (c = t.handleObj),
              f(t.delegateTarget).off(
                c.namespace ? c.origType + "." + c.namespace : c.origType,
                c.selector,
                c.handler
              ),
              this
            );
          if (typeof t == "object") {
            for (h in t) this.off(h, a, t[h]);
            return this;
          }
          return (
            (a === !1 || typeof a == "function") && ((u = a), (a = void 0)),
            u === !1 && (u = vt),
            this.each(function () {
              f.event.remove(this, t, u, a);
            })
          );
        },
      });
    var pn = /<script|<style|<link/i,
      Fn = /checked\s*(?:[^=]|=\s*.checked.)/i,
      St = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

    function Dt(t, a) {
      return (
        (B(t, "table") &&
          B(a.nodeType !== 11 ? a : a.firstChild, "tr") &&
          f(t).children("tbody")[0]) ||
        t
      );
    }

    function gn(t) {
      return (t.type = (t.getAttribute("type") !== null) + "/" + t.type), t;
    }

    function mn(t) {
      return (
        (t.type || "").slice(0, 5) === "true/"
          ? (t.type = t.type.slice(5))
          : t.removeAttribute("type"),
        t
      );
    }

    function Xt(t, a) {
      var u, c, h, m, y, _, x;
      if (a.nodeType === 1) {
        if (le.hasData(t) && ((m = le.get(t)), (x = m.events), x)) {
          le.remove(a, "handle events");
          for (h in x)
            for (u = 0, c = x[h].length; u < c; u++) f.event.add(a, h, x[h][u]);
        }
        Ke.hasData(t) &&
          ((y = Ke.access(t)), (_ = f.extend({}, y)), Ke.set(a, _));
      }
    }

    function Hn(t, a) {
      var u = a.nodeName.toLowerCase();
      u === "input" && Tt.test(t.type)
        ? (a.checked = t.checked)
        : (u === "input" || u === "textarea") &&
          (a.defaultValue = t.defaultValue);
    }

    function ct(t, a, u, c) {
      a = l(a);
      var h,
        m,
        y,
        _,
        x,
        O,
        j = 0,
        U = t.length,
        L = U - 1,
        F = a[0],
        se = M(F);
      if (se || (U > 1 && typeof F == "string" && !N.checkClone && Fn.test(F)))
        return t.each(function (be) {
          var ae = t.eq(be);
          se && (a[0] = F.call(this, be, ae.html())), ct(ae, a, u, c);
        });
      if (
        U &&
        ((h = cn(a, t[0].ownerDocument, !1, t, c)),
        (m = h.firstChild),
        h.childNodes.length === 1 && (h = m),
        m || c)
      ) {
        for (y = f.map(ze(h, "script"), gn), _ = y.length; j < U; j++)
          (x = h),
            j !== L &&
              ((x = f.clone(x, !0, !0)), _ && f.merge(y, ze(x, "script"))),
            u.call(t[j], x, j);
        if (_)
          for (
            O = y[y.length - 1].ownerDocument, f.map(y, mn), j = 0;
            j < _;
            j++
          )
            (x = y[j]),
              Ut.test(x.type || "") &&
                !le.access(x, "globalEval") &&
                f.contains(O, x) &&
                (x.src && (x.type || "").toLowerCase() !== "module"
                  ? f._evalUrl &&
                    !x.noModule &&
                    f._evalUrl(
                      x.src,
                      {
                        nonce: x.nonce || x.getAttribute("nonce"),
                      },
                      O
                    )
                  : z(x.textContent.replace(St, ""), x, O));
      }
      return t;
    }

    function Yt(t, a, u) {
      for (var c, h = a ? f.filter(a, t) : t, m = 0; (c = h[m]) != null; m++)
        !u && c.nodeType === 1 && f.cleanData(ze(c)),
          c.parentNode &&
            (u && zt(c) && Vt(ze(c, "script")), c.parentNode.removeChild(c));
      return t;
    }
    f.extend({
      htmlPrefilter: function (t) {
        return t;
      },
      clone: function (t, a, u) {
        var c,
          h,
          m,
          y,
          _ = t.cloneNode(!0),
          x = zt(t);
        if (
          !N.noCloneChecked &&
          (t.nodeType === 1 || t.nodeType === 11) &&
          !f.isXMLDoc(t)
        )
          for (y = ze(_), m = ze(t), c = 0, h = m.length; c < h; c++)
            Hn(m[c], y[c]);
        if (a)
          if (u)
            for (
              m = m || ze(t), y = y || ze(_), c = 0, h = m.length;
              c < h;
              c++
            )
              Xt(m[c], y[c]);
          else Xt(t, _);
        return (
          (y = ze(_, "script")), y.length > 0 && Vt(y, !x && ze(t, "script")), _
        );
      },
      cleanData: function (t) {
        for (
          var a, u, c, h = f.event.special, m = 0;
          (u = t[m]) !== void 0;
          m++
        )
          if (rn(u)) {
            if ((a = u[le.expando])) {
              if (a.events)
                for (c in a.events)
                  h[c] ? f.event.remove(u, c) : f.removeEvent(u, c, a.handle);
              u[le.expando] = void 0;
            }
            u[Ke.expando] && (u[Ke.expando] = void 0);
          }
      },
    }),
      f.fn.extend({
        detach: function (t) {
          return Yt(this, t, !0);
        },
        remove: function (t) {
          return Yt(this, t);
        },
        text: function (t) {
          return lt(
            this,
            function (a) {
              return a === void 0
                ? f.text(this)
                : this.empty().each(function () {
                    (this.nodeType === 1 ||
                      this.nodeType === 11 ||
                      this.nodeType === 9) &&
                      (this.textContent = a);
                  });
            },
            null,
            t,
            arguments.length
          );
        },
        append: function () {
          return ct(this, arguments, function (t) {
            if (
              this.nodeType === 1 ||
              this.nodeType === 11 ||
              this.nodeType === 9
            ) {
              var a = Dt(this, t);
              a.appendChild(t);
            }
          });
        },
        prepend: function () {
          return ct(this, arguments, function (t) {
            if (
              this.nodeType === 1 ||
              this.nodeType === 11 ||
              this.nodeType === 9
            ) {
              var a = Dt(this, t);
              a.insertBefore(t, a.firstChild);
            }
          });
        },
        before: function () {
          return ct(this, arguments, function (t) {
            this.parentNode && this.parentNode.insertBefore(t, this);
          });
        },
        after: function () {
          return ct(this, arguments, function (t) {
            this.parentNode &&
              this.parentNode.insertBefore(t, this.nextSibling);
          });
        },
        empty: function () {
          for (var t, a = 0; (t = this[a]) != null; a++)
            t.nodeType === 1 && (f.cleanData(ze(t, !1)), (t.textContent = ""));
          return this;
        },
        clone: function (t, a) {
          return (
            (t = t ?? !1),
            (a = a ?? t),
            this.map(function () {
              return f.clone(this, t, a);
            })
          );
        },
        html: function (t) {
          return lt(
            this,
            function (a) {
              var u = this[0] || {},
                c = 0,
                h = this.length;
              if (a === void 0 && u.nodeType === 1) return u.innerHTML;
              if (
                typeof a == "string" &&
                !pn.test(a) &&
                !Ve[(Wt.exec(a) || ["", ""])[1].toLowerCase()]
              ) {
                a = f.htmlPrefilter(a);
                try {
                  for (; c < h; c++)
                    (u = this[c] || {}),
                      u.nodeType === 1 &&
                        (f.cleanData(ze(u, !1)), (u.innerHTML = a));
                  u = 0;
                } catch {}
              }
              u && this.empty().append(a);
            },
            null,
            t,
            arguments.length
          );
        },
        replaceWith: function () {
          var t = [];
          return ct(
            this,
            arguments,
            function (a) {
              var u = this.parentNode;
              f.inArray(this, t) < 0 &&
                (f.cleanData(ze(this)), u && u.replaceChild(a, this));
            },
            t
          );
        },
      }),
      f.each(
        {
          appendTo: "append",
          prependTo: "prepend",
          insertBefore: "before",
          insertAfter: "after",
          replaceAll: "replaceWith",
        },
        function (t, a) {
          f.fn[t] = function (u) {
            for (var c, h = [], m = f(u), y = m.length - 1, _ = 0; _ <= y; _++)
              (c = _ === y ? this : this.clone(!0)),
                f(m[_])[a](c),
                d.apply(h, c.get());
            return this.pushStack(h);
          };
        }
      );
    var qn = new RegExp("^(" + gr + ")(?!px)[a-z%]+$", "i"),
      g = function (t) {
        var a = t.ownerDocument.defaultView;
        return (!a || !a.opener) && (a = i), a.getComputedStyle(t);
      },
      b = function (t, a, u) {
        var c,
          h,
          m = {};
        for (h in a) (m[h] = t.style[h]), (t.style[h] = a[h]);
        c = u.call(t);
        for (h in a) t.style[h] = m[h];
        return c;
      },
      C = new RegExp(gt.join("|"), "i");
    (function () {
      function t() {
        if (O) {
          (x.style.cssText =
            "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0"),
            (O.style.cssText =
              "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%"),
            Nt.appendChild(x).appendChild(O);
          var j = i.getComputedStyle(O);
          (u = j.top !== "1%"),
            (_ = a(j.marginLeft) === 12),
            (O.style.right = "60%"),
            (m = a(j.right) === 36),
            (c = a(j.width) === 36),
            (O.style.position = "absolute"),
            (h = a(O.offsetWidth / 3) === 12),
            Nt.removeChild(x),
            (O = null);
        }
      }

      function a(j) {
        return Math.round(parseFloat(j));
      }
      var u,
        c,
        h,
        m,
        y,
        _,
        x = Y.createElement("div"),
        O = Y.createElement("div");
      O.style &&
        ((O.style.backgroundClip = "content-box"),
        (O.cloneNode(!0).style.backgroundClip = ""),
        (N.clearCloneStyle = O.style.backgroundClip === "content-box"),
        f.extend(N, {
          boxSizingReliable: function () {
            return t(), c;
          },
          pixelBoxStyles: function () {
            return t(), m;
          },
          pixelPosition: function () {
            return t(), u;
          },
          reliableMarginLeft: function () {
            return t(), _;
          },
          scrollboxSize: function () {
            return t(), h;
          },
          reliableTrDimensions: function () {
            var j, U, L, F;
            return (
              y == null &&
                ((j = Y.createElement("table")),
                (U = Y.createElement("tr")),
                (L = Y.createElement("div")),
                (j.style.cssText = "position:absolute;left:-11111px"),
                (U.style.height = "1px"),
                (L.style.height = "9px"),
                Nt.appendChild(j).appendChild(U).appendChild(L),
                (F = i.getComputedStyle(U)),
                (y = parseInt(F.height) > 3),
                Nt.removeChild(j)),
              y
            );
          },
        }));
    })();

    function I(t, a, u) {
      var c,
        h,
        m,
        y,
        _ = t.style;
      return (
        (u = u || g(t)),
        u &&
          ((y = u.getPropertyValue(a) || u[a]),
          y === "" && !zt(t) && (y = f.style(t, a)),
          !N.pixelBoxStyles() &&
            qn.test(y) &&
            C.test(a) &&
            ((c = _.width),
            (h = _.minWidth),
            (m = _.maxWidth),
            (_.minWidth = _.maxWidth = _.width = y),
            (y = u.width),
            (_.width = c),
            (_.minWidth = h),
            (_.maxWidth = m))),
        y !== void 0 ? y + "" : y
      );
    }

    function ee(t, a) {
      return {
        get: function () {
          if (t()) {
            delete this.get;
            return;
          }
          return (this.get = a).apply(this, arguments);
        },
      };
    }
    var re = ["Webkit", "Moz", "ms"],
      ce = Y.createElement("div").style,
      we = {};

    function me(t) {
      for (var a = t[0].toUpperCase() + t.slice(1), u = re.length; u--; )
        if (((t = re[u] + a), t in ce)) return t;
    }

    function fe(t) {
      var a = f.cssProps[t] || we[t];
      return a || (t in ce ? t : (we[t] = me(t) || t));
    }
    var oe = /^(none|table(?!-c[ea]).+)/,
      pe = /^--/,
      xe = {
        position: "absolute",
        visibility: "hidden",
        display: "block",
      },
      Ie = {
        letterSpacing: "0",
        fontWeight: "400",
      };

    function et(t, a, u) {
      var c = ut.exec(a);
      return c ? Math.max(0, c[2] - (u || 0)) + (c[3] || "px") : a;
    }

    function Ye(t, a, u, c, h, m) {
      var y = a === "width" ? 1 : 0,
        _ = 0,
        x = 0;
      if (u === (c ? "border" : "content")) return 0;
      for (; y < 4; y += 2)
        u === "margin" && (x += f.css(t, u + gt[y], !0, h)),
          c
            ? (u === "content" && (x -= f.css(t, "padding" + gt[y], !0, h)),
              u !== "margin" &&
                (x -= f.css(t, "border" + gt[y] + "Width", !0, h)))
            : ((x += f.css(t, "padding" + gt[y], !0, h)),
              u !== "padding"
                ? (x += f.css(t, "border" + gt[y] + "Width", !0, h))
                : (_ += f.css(t, "border" + gt[y] + "Width", !0, h)));
      return (
        !c &&
          m >= 0 &&
          (x +=
            Math.max(
              0,
              Math.ceil(
                t["offset" + a[0].toUpperCase() + a.slice(1)] - m - x - _ - 0.5
              )
            ) || 0),
        x
      );
    }

    function Mt(t, a, u) {
      var c = g(t),
        h = !N.boxSizingReliable() || u,
        m = h && f.css(t, "boxSizing", !1, c) === "border-box",
        y = m,
        _ = I(t, a, c),
        x = "offset" + a[0].toUpperCase() + a.slice(1);
      if (qn.test(_)) {
        if (!u) return _;
        _ = "auto";
      }
      return (
        ((!N.boxSizingReliable() && m) ||
          (!N.reliableTrDimensions() && B(t, "tr")) ||
          _ === "auto" ||
          (!parseFloat(_) && f.css(t, "display", !1, c) === "inline")) &&
          t.getClientRects().length &&
          ((m = f.css(t, "boxSizing", !1, c) === "border-box"),
          (y = x in t),
          y && (_ = t[x])),
        (_ = parseFloat(_) || 0),
        _ + Ye(t, a, u || (m ? "border" : "content"), y, c, _) + "px"
      );
    }
    f.extend({
      cssHooks: {
        opacity: {
          get: function (t, a) {
            if (a) {
              var u = I(t, "opacity");
              return u === "" ? "1" : u;
            }
          },
        },
      },
      cssNumber: {
        animationIterationCount: !0,
        columnCount: !0,
        fillOpacity: !0,
        flexGrow: !0,
        flexShrink: !0,
        fontWeight: !0,
        gridArea: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnStart: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowStart: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
      },
      cssProps: {},
      style: function (t, a, u, c) {
        if (!(!t || t.nodeType === 3 || t.nodeType === 8 || !t.style)) {
          var h,
            m,
            y,
            _ = $e(a),
            x = pe.test(a),
            O = t.style;
          if (
            (x || (a = fe(_)),
            (y = f.cssHooks[a] || f.cssHooks[_]),
            u !== void 0)
          ) {
            if (
              ((m = typeof u),
              m === "string" &&
                (h = ut.exec(u)) &&
                h[1] &&
                ((u = an(t, a, h)), (m = "number")),
              u == null || u !== u)
            )
              return;
            m === "number" &&
              !x &&
              (u += (h && h[3]) || (f.cssNumber[_] ? "" : "px")),
              !N.clearCloneStyle &&
                u === "" &&
                a.indexOf("background") === 0 &&
                (O[a] = "inherit"),
              (!y || !("set" in y) || (u = y.set(t, u, c)) !== void 0) &&
                (x ? O.setProperty(a, u) : (O[a] = u));
          } else
            return y && "get" in y && (h = y.get(t, !1, c)) !== void 0
              ? h
              : O[a];
        }
      },
      css: function (t, a, u, c) {
        var h,
          m,
          y,
          _ = $e(a),
          x = pe.test(a);
        return (
          x || (a = fe(_)),
          (y = f.cssHooks[a] || f.cssHooks[_]),
          y && "get" in y && (h = y.get(t, !0, u)),
          h === void 0 && (h = I(t, a, c)),
          h === "normal" && a in Ie && (h = Ie[a]),
          u === "" || u
            ? ((m = parseFloat(h)), u === !0 || isFinite(m) ? m || 0 : h)
            : h
        );
      },
    }),
      f.each(["height", "width"], function (t, a) {
        f.cssHooks[a] = {
          get: function (u, c, h) {
            if (c)
              return oe.test(f.css(u, "display")) &&
                (!u.getClientRects().length || !u.getBoundingClientRect().width)
                ? b(u, xe, function () {
                    return Mt(u, a, h);
                  })
                : Mt(u, a, h);
          },
          set: function (u, c, h) {
            var m,
              y = g(u),
              _ = !N.scrollboxSize() && y.position === "absolute",
              x = _ || h,
              O = x && f.css(u, "boxSizing", !1, y) === "border-box",
              j = h ? Ye(u, a, h, O, y) : 0;
            return (
              O &&
                _ &&
                (j -= Math.ceil(
                  u["offset" + a[0].toUpperCase() + a.slice(1)] -
                    parseFloat(y[a]) -
                    Ye(u, a, "border", !1, y) -
                    0.5
                )),
              j &&
                (m = ut.exec(c)) &&
                (m[3] || "px") !== "px" &&
                ((u.style[a] = c), (c = f.css(u, a))),
              et(u, c, j)
            );
          },
        };
      }),
      (f.cssHooks.marginLeft = ee(N.reliableMarginLeft, function (t, a) {
        if (a)
          return (
            (parseFloat(I(t, "marginLeft")) ||
              t.getBoundingClientRect().left -
                b(
                  t,
                  {
                    marginLeft: 0,
                  },
                  function () {
                    return t.getBoundingClientRect().left;
                  }
                )) + "px"
          );
      })),
      f.each(
        {
          margin: "",
          padding: "",
          border: "Width",
        },
        function (t, a) {
          (f.cssHooks[t + a] = {
            expand: function (u) {
              for (
                var c = 0,
                  h = {},
                  m = typeof u == "string" ? u.split(" ") : [u];
                c < 4;
                c++
              )
                h[t + gt[c] + a] = m[c] || m[c - 2] || m[0];
              return h;
            },
          }),
            t !== "margin" && (f.cssHooks[t + a].set = et);
        }
      ),
      f.fn.extend({
        css: function (t, a) {
          return lt(
            this,
            function (u, c, h) {
              var m,
                y,
                _ = {},
                x = 0;
              if (Array.isArray(c)) {
                for (m = g(u), y = c.length; x < y; x++)
                  _[c[x]] = f.css(u, c[x], !1, m);
                return _;
              }
              return h !== void 0 ? f.style(u, c, h) : f.css(u, c);
            },
            t,
            a,
            arguments.length > 1
          );
        },
      });

    function De(t, a, u, c, h) {
      return new De.prototype.init(t, a, u, c, h);
    }
    (f.Tween = De),
      (De.prototype = {
        constructor: De,
        init: function (t, a, u, c, h, m) {
          (this.elem = t),
            (this.prop = u),
            (this.easing = h || f.easing._default),
            (this.options = a),
            (this.start = this.now = this.cur()),
            (this.end = c),
            (this.unit = m || (f.cssNumber[u] ? "" : "px"));
        },
        cur: function () {
          var t = De.propHooks[this.prop];
          return t && t.get ? t.get(this) : De.propHooks._default.get(this);
        },
        run: function (t) {
          var a,
            u = De.propHooks[this.prop];
          return (
            this.options.duration
              ? (this.pos = a =
                  f.easing[this.easing](
                    t,
                    this.options.duration * t,
                    0,
                    1,
                    this.options.duration
                  ))
              : (this.pos = a = t),
            (this.now = (this.end - this.start) * a + this.start),
            this.options.step &&
              this.options.step.call(this.elem, this.now, this),
            u && u.set ? u.set(this) : De.propHooks._default.set(this),
            this
          );
        },
      }),
      (De.prototype.init.prototype = De.prototype),
      (De.propHooks = {
        _default: {
          get: function (t) {
            var a;
            return t.elem.nodeType !== 1 ||
              (t.elem[t.prop] != null && t.elem.style[t.prop] == null)
              ? t.elem[t.prop]
              : ((a = f.css(t.elem, t.prop, "")), !a || a === "auto" ? 0 : a);
          },
          set: function (t) {
            f.fx.step[t.prop]
              ? f.fx.step[t.prop](t)
              : t.elem.nodeType === 1 &&
                (f.cssHooks[t.prop] || t.elem.style[fe(t.prop)] != null)
              ? f.style(t.elem, t.prop, t.now + t.unit)
              : (t.elem[t.prop] = t.now);
          },
        },
      }),
      (De.propHooks.scrollTop = De.propHooks.scrollLeft =
        {
          set: function (t) {
            t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now);
          },
        }),
      (f.easing = {
        linear: function (t) {
          return t;
        },
        swing: function (t) {
          return 0.5 - Math.cos(t * Math.PI) / 2;
        },
        _default: "swing",
      }),
      (f.fx = De.prototype.init),
      (f.fx.step = {});
    var Jt,
      $n,
      Ks = /^(?:toggle|show|hide)$/,
      Qs = /queueHooks$/;

    function si() {
      $n &&
        (Y.hidden === !1 && i.requestAnimationFrame
          ? i.requestAnimationFrame(si)
          : i.setTimeout(si, f.fx.interval),
        f.fx.tick());
    }

    function io() {
      return (
        i.setTimeout(function () {
          Jt = void 0;
        }),
        (Jt = Date.now())
      );
    }

    function mr(t, a) {
      var u,
        c = 0,
        h = {
          height: t,
        };
      for (a = a ? 1 : 0; c < 4; c += 2 - a)
        (u = gt[c]), (h["margin" + u] = h["padding" + u] = t);
      return a && (h.opacity = h.width = t), h;
    }

    function oo(t, a, u) {
      for (
        var c,
          h = (kt.tweeners[a] || []).concat(kt.tweeners["*"]),
          m = 0,
          y = h.length;
        m < y;
        m++
      )
        if ((c = h[m].call(u, a, t))) return c;
    }

    function Zs(t, a, u) {
      var c,
        h,
        m,
        y,
        _,
        x,
        O,
        j,
        U = "width" in a || "height" in a,
        L = this,
        F = {},
        se = t.style,
        be = t.nodeType && nt(t),
        ae = le.get(t, "fxshow");
      u.queue ||
        ((y = f._queueHooks(t, "fx")),
        y.unqueued == null &&
          ((y.unqueued = 0),
          (_ = y.empty.fire),
          (y.empty.fire = function () {
            y.unqueued || _();
          })),
        y.unqueued++,
        L.always(function () {
          L.always(function () {
            y.unqueued--, f.queue(t, "fx").length || y.empty.fire();
          });
        }));
      for (c in a)
        if (((h = a[c]), Ks.test(h))) {
          if (
            (delete a[c],
            (m = m || h === "toggle"),
            h === (be ? "hide" : "show"))
          )
            if (h === "show" && ae && ae[c] !== void 0) be = !0;
            else continue;
          F[c] = (ae && ae[c]) || f.style(t, c);
        }
      if (((x = !f.isEmptyObject(a)), !(!x && f.isEmptyObject(F)))) {
        U &&
          t.nodeType === 1 &&
          ((u.overflow = [se.overflow, se.overflowX, se.overflowY]),
          (O = ae && ae.display),
          O == null && (O = le.get(t, "display")),
          (j = f.css(t, "display")),
          j === "none" &&
            (O
              ? (j = O)
              : (Bt([t], !0),
                (O = t.style.display || O),
                (j = f.css(t, "display")),
                Bt([t]))),
          (j === "inline" || (j === "inline-block" && O != null)) &&
            f.css(t, "float") === "none" &&
            (x ||
              (L.done(function () {
                se.display = O;
              }),
              O == null && ((j = se.display), (O = j === "none" ? "" : j))),
            (se.display = "inline-block"))),
          u.overflow &&
            ((se.overflow = "hidden"),
            L.always(function () {
              (se.overflow = u.overflow[0]),
                (se.overflowX = u.overflow[1]),
                (se.overflowY = u.overflow[2]);
            })),
          (x = !1);
        for (c in F)
          x ||
            (ae
              ? "hidden" in ae && (be = ae.hidden)
              : (ae = le.access(t, "fxshow", {
                  display: O,
                })),
            m && (ae.hidden = !be),
            be && Bt([t], !0),
            L.done(function () {
              be || Bt([t]), le.remove(t, "fxshow");
              for (c in F) f.style(t, c, F[c]);
            })),
            (x = oo(be ? ae[c] : 0, c, L)),
            c in ae ||
              ((ae[c] = x.start), be && ((x.end = x.start), (x.start = 0)));
      }
    }

    function ea(t, a) {
      var u, c, h, m, y;
      for (u in t)
        if (
          ((c = $e(u)),
          (h = a[c]),
          (m = t[u]),
          Array.isArray(m) && ((h = m[1]), (m = t[u] = m[0])),
          u !== c && ((t[c] = m), delete t[u]),
          (y = f.cssHooks[c]),
          y && "expand" in y)
        ) {
          (m = y.expand(m)), delete t[c];
          for (u in m) u in t || ((t[u] = m[u]), (a[u] = h));
        } else a[c] = h;
    }

    function kt(t, a, u) {
      var c,
        h,
        m = 0,
        y = kt.prefilters.length,
        _ = f.Deferred().always(function () {
          delete x.elem;
        }),
        x = function () {
          if (h) return !1;
          for (
            var U = Jt || io(),
              L = Math.max(0, O.startTime + O.duration - U),
              F = L / O.duration || 0,
              se = 1 - F,
              be = 0,
              ae = O.tweens.length;
            be < ae;
            be++
          )
            O.tweens[be].run(se);
          return (
            _.notifyWith(t, [O, se, L]),
            se < 1 && ae
              ? L
              : (ae || _.notifyWith(t, [O, 1, 0]), _.resolveWith(t, [O]), !1)
          );
        },
        O = _.promise({
          elem: t,
          props: f.extend({}, a),
          opts: f.extend(
            !0,
            {
              specialEasing: {},
              easing: f.easing._default,
            },
            u
          ),
          originalProperties: a,
          originalOptions: u,
          startTime: Jt || io(),
          duration: u.duration,
          tweens: [],
          createTween: function (U, L) {
            var F = f.Tween(
              t,
              O.opts,
              U,
              L,
              O.opts.specialEasing[U] || O.opts.easing
            );
            return O.tweens.push(F), F;
          },
          stop: function (U) {
            var L = 0,
              F = U ? O.tweens.length : 0;
            if (h) return this;
            for (h = !0; L < F; L++) O.tweens[L].run(1);
            return (
              U
                ? (_.notifyWith(t, [O, 1, 0]), _.resolveWith(t, [O, U]))
                : _.rejectWith(t, [O, U]),
              this
            );
          },
        }),
        j = O.props;
      for (ea(j, O.opts.specialEasing); m < y; m++)
        if (((c = kt.prefilters[m].call(O, t, j, O.opts)), c))
          return (
            M(c.stop) &&
              (f._queueHooks(O.elem, O.opts.queue).stop = c.stop.bind(c)),
            c
          );
      return (
        f.map(j, oo, O),
        M(O.opts.start) && O.opts.start.call(t, O),
        O.progress(O.opts.progress)
          .done(O.opts.done, O.opts.complete)
          .fail(O.opts.fail)
          .always(O.opts.always),
        f.fx.timer(
          f.extend(x, {
            elem: t,
            anim: O,
            queue: O.opts.queue,
          })
        ),
        O
      );
    }
    (f.Animation = f.extend(kt, {
      tweeners: {
        "*": [
          function (t, a) {
            var u = this.createTween(t, a);
            return an(u.elem, t, ut.exec(a), u), u;
          },
        ],
      },
      tweener: function (t, a) {
        M(t) ? ((a = t), (t = ["*"])) : (t = t.match(qe));
        for (var u, c = 0, h = t.length; c < h; c++)
          (u = t[c]),
            (kt.tweeners[u] = kt.tweeners[u] || []),
            kt.tweeners[u].unshift(a);
      },
      prefilters: [Zs],
      prefilter: function (t, a) {
        a ? kt.prefilters.unshift(t) : kt.prefilters.push(t);
      },
    })),
      (f.speed = function (t, a, u) {
        var c =
          t && typeof t == "object"
            ? f.extend({}, t)
            : {
                complete: u || (!u && a) || (M(t) && t),
                duration: t,
                easing: (u && a) || (a && !M(a) && a),
              };
        return (
          f.fx.off
            ? (c.duration = 0)
            : typeof c.duration != "number" &&
              (c.duration in f.fx.speeds
                ? (c.duration = f.fx.speeds[c.duration])
                : (c.duration = f.fx.speeds._default)),
          (c.queue == null || c.queue === !0) && (c.queue = "fx"),
          (c.old = c.complete),
          (c.complete = function () {
            M(c.old) && c.old.call(this), c.queue && f.dequeue(this, c.queue);
          }),
          c
        );
      }),
      f.fn.extend({
        fadeTo: function (t, a, u, c) {
          return this.filter(nt).css("opacity", 0).show().end().animate(
            {
              opacity: a,
            },
            t,
            u,
            c
          );
        },
        animate: function (t, a, u, c) {
          var h = f.isEmptyObject(t),
            m = f.speed(a, u, c),
            y = function () {
              var _ = kt(this, f.extend({}, t), m);
              (h || le.get(this, "finish")) && _.stop(!0);
            };
          return (
            (y.finish = y),
            h || m.queue === !1 ? this.each(y) : this.queue(m.queue, y)
          );
        },
        stop: function (t, a, u) {
          var c = function (h) {
            var m = h.stop;
            delete h.stop, m(u);
          };
          return (
            typeof t != "string" && ((u = a), (a = t), (t = void 0)),
            a && this.queue(t || "fx", []),
            this.each(function () {
              var h = !0,
                m = t != null && t + "queueHooks",
                y = f.timers,
                _ = le.get(this);
              if (m) _[m] && _[m].stop && c(_[m]);
              else for (m in _) _[m] && _[m].stop && Qs.test(m) && c(_[m]);
              for (m = y.length; m--; )
                y[m].elem === this &&
                  (t == null || y[m].queue === t) &&
                  (y[m].anim.stop(u), (h = !1), y.splice(m, 1));
              (h || !u) && f.dequeue(this, t);
            })
          );
        },
        finish: function (t) {
          return (
            t !== !1 && (t = t || "fx"),
            this.each(function () {
              var a,
                u = le.get(this),
                c = u[t + "queue"],
                h = u[t + "queueHooks"],
                m = f.timers,
                y = c ? c.length : 0;
              for (
                u.finish = !0,
                  f.queue(this, t, []),
                  h && h.stop && h.stop.call(this, !0),
                  a = m.length;
                a--;

              )
                m[a].elem === this &&
                  m[a].queue === t &&
                  (m[a].anim.stop(!0), m.splice(a, 1));
              for (a = 0; a < y; a++)
                c[a] && c[a].finish && c[a].finish.call(this);
              delete u.finish;
            })
          );
        },
      }),
      f.each(["toggle", "show", "hide"], function (t, a) {
        var u = f.fn[a];
        f.fn[a] = function (c, h, m) {
          return c == null || typeof c == "boolean"
            ? u.apply(this, arguments)
            : this.animate(mr(a, !0), c, h, m);
        };
      }),
      f.each(
        {
          slideDown: mr("show"),
          slideUp: mr("hide"),
          slideToggle: mr("toggle"),
          fadeIn: {
            opacity: "show",
          },
          fadeOut: {
            opacity: "hide",
          },
          fadeToggle: {
            opacity: "toggle",
          },
        },
        function (t, a) {
          f.fn[t] = function (u, c, h) {
            return this.animate(a, u, c, h);
          };
        }
      ),
      (f.timers = []),
      (f.fx.tick = function () {
        var t,
          a = 0,
          u = f.timers;
        for (Jt = Date.now(); a < u.length; a++)
          (t = u[a]), !t() && u[a] === t && u.splice(a--, 1);
        u.length || f.fx.stop(), (Jt = void 0);
      }),
      (f.fx.timer = function (t) {
        f.timers.push(t), f.fx.start();
      }),
      (f.fx.interval = 13),
      (f.fx.start = function () {
        $n || (($n = !0), si());
      }),
      (f.fx.stop = function () {
        $n = null;
      }),
      (f.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400,
      }),
      (f.fn.delay = function (t, a) {
        return (
          (t = (f.fx && f.fx.speeds[t]) || t),
          (a = a || "fx"),
          this.queue(a, function (u, c) {
            var h = i.setTimeout(u, t);
            c.stop = function () {
              i.clearTimeout(h);
            };
          })
        );
      }),
      (function () {
        var t = Y.createElement("input"),
          a = Y.createElement("select"),
          u = a.appendChild(Y.createElement("option"));
        (t.type = "checkbox"),
          (N.checkOn = t.value !== ""),
          (N.optSelected = u.selected),
          (t = Y.createElement("input")),
          (t.value = "t"),
          (t.type = "radio"),
          (N.radioValue = t.value === "t");
      })();
    var so,
      Jn = f.expr.attrHandle;
    f.fn.extend({
      attr: function (t, a) {
        return lt(this, f.attr, t, a, arguments.length > 1);
      },
      removeAttr: function (t) {
        return this.each(function () {
          f.removeAttr(this, t);
        });
      },
    }),
      f.extend({
        attr: function (t, a, u) {
          var c,
            h,
            m = t.nodeType;
          if (!(m === 3 || m === 8 || m === 2)) {
            if (typeof t.getAttribute > "u") return f.prop(t, a, u);
            if (
              ((m !== 1 || !f.isXMLDoc(t)) &&
                (h =
                  f.attrHooks[a.toLowerCase()] ||
                  (f.expr.match.bool.test(a) ? so : void 0)),
              u !== void 0)
            ) {
              if (u === null) {
                f.removeAttr(t, a);
                return;
              }
              return h && "set" in h && (c = h.set(t, u, a)) !== void 0
                ? c
                : (t.setAttribute(a, u + ""), u);
            }
            return h && "get" in h && (c = h.get(t, a)) !== null
              ? c
              : ((c = f.find.attr(t, a)), c ?? void 0);
          }
        },
        attrHooks: {
          type: {
            set: function (t, a) {
              if (!N.radioValue && a === "radio" && B(t, "input")) {
                var u = t.value;
                return t.setAttribute("type", a), u && (t.value = u), a;
              }
            },
          },
        },
        removeAttr: function (t, a) {
          var u,
            c = 0,
            h = a && a.match(qe);
          if (h && t.nodeType === 1)
            for (; (u = h[c++]); ) t.removeAttribute(u);
        },
      }),
      (so = {
        set: function (t, a, u) {
          return a === !1 ? f.removeAttr(t, u) : t.setAttribute(u, u), u;
        },
      }),
      f.each(f.expr.match.bool.source.match(/\w+/g), function (t, a) {
        var u = Jn[a] || f.find.attr;
        Jn[a] = function (c, h, m) {
          var y,
            _,
            x = h.toLowerCase();
          return (
            m ||
              ((_ = Jn[x]),
              (Jn[x] = y),
              (y = u(c, h, m) != null ? x : null),
              (Jn[x] = _)),
            y
          );
        };
      });
    var ta = /^(?:input|select|textarea|button)$/i,
      na = /^(?:a|area)$/i;
    f.fn.extend({
      prop: function (t, a) {
        return lt(this, f.prop, t, a, arguments.length > 1);
      },
      removeProp: function (t) {
        return this.each(function () {
          delete this[f.propFix[t] || t];
        });
      },
    }),
      f.extend({
        prop: function (t, a, u) {
          var c,
            h,
            m = t.nodeType;
          if (!(m === 3 || m === 8 || m === 2))
            return (
              (m !== 1 || !f.isXMLDoc(t)) &&
                ((a = f.propFix[a] || a), (h = f.propHooks[a])),
              u !== void 0
                ? h && "set" in h && (c = h.set(t, u, a)) !== void 0
                  ? c
                  : (t[a] = u)
                : h && "get" in h && (c = h.get(t, a)) !== null
                ? c
                : t[a]
            );
        },
        propHooks: {
          tabIndex: {
            get: function (t) {
              var a = f.find.attr(t, "tabindex");
              return a
                ? parseInt(a, 10)
                : ta.test(t.nodeName) || (na.test(t.nodeName) && t.href)
                ? 0
                : -1;
            },
          },
        },
        propFix: {
          for: "htmlFor",
          class: "className",
        },
      }),
      N.optSelected ||
        (f.propHooks.selected = {
          get: function (t) {
            var a = t.parentNode;
            return a && a.parentNode && a.parentNode.selectedIndex, null;
          },
          set: function (t) {
            var a = t.parentNode;
            a && (a.selectedIndex, a.parentNode && a.parentNode.selectedIndex);
          },
        }),
      f.each(
        [
          "tabIndex",
          "readOnly",
          "maxLength",
          "cellSpacing",
          "cellPadding",
          "rowSpan",
          "colSpan",
          "useMap",
          "frameBorder",
          "contentEditable",
        ],
        function () {
          f.propFix[this.toLowerCase()] = this;
        }
      );

    function vn(t) {
      var a = t.match(qe) || [];
      return a.join(" ");
    }

    function yn(t) {
      return (t.getAttribute && t.getAttribute("class")) || "";
    }

    function ai(t) {
      return Array.isArray(t)
        ? t
        : typeof t == "string"
        ? t.match(qe) || []
        : [];
    }
    f.fn.extend({
      addClass: function (t) {
        var a,
          u,
          c,
          h,
          m,
          y,
          _,
          x = 0;
        if (M(t))
          return this.each(function (O) {
            f(this).addClass(t.call(this, O, yn(this)));
          });
        if (((a = ai(t)), a.length)) {
          for (; (u = this[x++]); )
            if (((h = yn(u)), (c = u.nodeType === 1 && " " + vn(h) + " "), c)) {
              for (y = 0; (m = a[y++]); )
                c.indexOf(" " + m + " ") < 0 && (c += m + " ");
              (_ = vn(c)), h !== _ && u.setAttribute("class", _);
            }
        }
        return this;
      },
      removeClass: function (t) {
        var a,
          u,
          c,
          h,
          m,
          y,
          _,
          x = 0;
        if (M(t))
          return this.each(function (O) {
            f(this).removeClass(t.call(this, O, yn(this)));
          });
        if (!arguments.length) return this.attr("class", "");
        if (((a = ai(t)), a.length)) {
          for (; (u = this[x++]); )
            if (((h = yn(u)), (c = u.nodeType === 1 && " " + vn(h) + " "), c)) {
              for (y = 0; (m = a[y++]); )
                for (; c.indexOf(" " + m + " ") > -1; )
                  c = c.replace(" " + m + " ", " ");
              (_ = vn(c)), h !== _ && u.setAttribute("class", _);
            }
        }
        return this;
      },
      toggleClass: function (t, a) {
        var u = typeof t,
          c = u === "string" || Array.isArray(t);
        return typeof a == "boolean" && c
          ? a
            ? this.addClass(t)
            : this.removeClass(t)
          : M(t)
          ? this.each(function (h) {
              f(this).toggleClass(t.call(this, h, yn(this), a), a);
            })
          : this.each(function () {
              var h, m, y, _;
              if (c)
                for (m = 0, y = f(this), _ = ai(t); (h = _[m++]); )
                  y.hasClass(h) ? y.removeClass(h) : y.addClass(h);
              else
                (t === void 0 || u === "boolean") &&
                  ((h = yn(this)),
                  h && le.set(this, "__className__", h),
                  this.setAttribute &&
                    this.setAttribute(
                      "class",
                      h || t === !1 ? "" : le.get(this, "__className__") || ""
                    ));
            });
      },
      hasClass: function (t) {
        var a,
          u,
          c = 0;
        for (a = " " + t + " "; (u = this[c++]); )
          if (u.nodeType === 1 && (" " + vn(yn(u)) + " ").indexOf(a) > -1)
            return !0;
        return !1;
      },
    });
    var ra = /\r/g;
    f.fn.extend({
      val: function (t) {
        var a,
          u,
          c,
          h = this[0];
        return arguments.length
          ? ((c = M(t)),
            this.each(function (m) {
              var y;
              this.nodeType === 1 &&
                (c ? (y = t.call(this, m, f(this).val())) : (y = t),
                y == null
                  ? (y = "")
                  : typeof y == "number"
                  ? (y += "")
                  : Array.isArray(y) &&
                    (y = f.map(y, function (_) {
                      return _ == null ? "" : _ + "";
                    })),
                (a =
                  f.valHooks[this.type] ||
                  f.valHooks[this.nodeName.toLowerCase()]),
                (!a || !("set" in a) || a.set(this, y, "value") === void 0) &&
                  (this.value = y));
            }))
          : h
          ? ((a = f.valHooks[h.type] || f.valHooks[h.nodeName.toLowerCase()]),
            a && "get" in a && (u = a.get(h, "value")) !== void 0
              ? u
              : ((u = h.value),
                typeof u == "string" ? u.replace(ra, "") : u ?? ""))
          : void 0;
      },
    }),
      f.extend({
        valHooks: {
          option: {
            get: function (t) {
              var a = f.find.attr(t, "value");
              return a ?? vn(f.text(t));
            },
          },
          select: {
            get: function (t) {
              var a,
                u,
                c,
                h = t.options,
                m = t.selectedIndex,
                y = t.type === "select-one",
                _ = y ? null : [],
                x = y ? m + 1 : h.length;
              for (m < 0 ? (c = x) : (c = y ? m : 0); c < x; c++)
                if (
                  ((u = h[c]),
                  (u.selected || c === m) &&
                    !u.disabled &&
                    (!u.parentNode.disabled || !B(u.parentNode, "optgroup")))
                ) {
                  if (((a = f(u).val()), y)) return a;
                  _.push(a);
                }
              return _;
            },
            set: function (t, a) {
              for (
                var u, c, h = t.options, m = f.makeArray(a), y = h.length;
                y--;

              )
                (c = h[y]),
                  (c.selected = f.inArray(f.valHooks.option.get(c), m) > -1) &&
                    (u = !0);
              return u || (t.selectedIndex = -1), m;
            },
          },
        },
      }),
      f.each(["radio", "checkbox"], function () {
        (f.valHooks[this] = {
          set: function (t, a) {
            if (Array.isArray(a))
              return (t.checked = f.inArray(f(t).val(), a) > -1);
          },
        }),
          N.checkOn ||
            (f.valHooks[this].get = function (t) {
              return t.getAttribute("value") === null ? "on" : t.value;
            });
      }),
      (N.focusin = "onfocusin" in i);
    var ao = /^(?:focusinfocus|focusoutblur)$/,
      lo = function (t) {
        t.stopPropagation();
      };
    f.extend(f.event, {
      trigger: function (t, a, u, c) {
        var h,
          m,
          y,
          _,
          x,
          O,
          j,
          U,
          L = [u || Y],
          F = P.call(t, "type") ? t.type : t,
          se = P.call(t, "namespace") ? t.namespace.split(".") : [];
        if (
          ((m = U = y = u = u || Y),
          !(u.nodeType === 3 || u.nodeType === 8) &&
            !ao.test(F + f.event.triggered) &&
            (F.indexOf(".") > -1 &&
              ((se = F.split(".")), (F = se.shift()), se.sort()),
            (x = F.indexOf(":") < 0 && "on" + F),
            (t = t[f.expando] ? t : new f.Event(F, typeof t == "object" && t)),
            (t.isTrigger = c ? 2 : 3),
            (t.namespace = se.join(".")),
            (t.rnamespace = t.namespace
              ? new RegExp("(^|\\.)" + se.join("\\.(?:.*\\.|)") + "(\\.|$)")
              : null),
            (t.result = void 0),
            t.target || (t.target = u),
            (a = a == null ? [t] : f.makeArray(a, [t])),
            (j = f.event.special[F] || {}),
            !(!c && j.trigger && j.trigger.apply(u, a) === !1)))
        ) {
          if (!c && !j.noBubble && !V(u)) {
            for (
              _ = j.delegateType || F, ao.test(_ + F) || (m = m.parentNode);
              m;
              m = m.parentNode
            )
              L.push(m), (y = m);
            y === (u.ownerDocument || Y) &&
              L.push(y.defaultView || y.parentWindow || i);
          }
          for (h = 0; (m = L[h++]) && !t.isPropagationStopped(); )
            (U = m),
              (t.type = h > 1 ? _ : j.bindType || F),
              (O =
                (le.get(m, "events") || Object.create(null))[t.type] &&
                le.get(m, "handle")),
              O && O.apply(m, a),
              (O = x && m[x]),
              O &&
                O.apply &&
                rn(m) &&
                ((t.result = O.apply(m, a)),
                t.result === !1 && t.preventDefault());
          return (
            (t.type = F),
            !c &&
              !t.isDefaultPrevented() &&
              (!j._default || j._default.apply(L.pop(), a) === !1) &&
              rn(u) &&
              x &&
              M(u[F]) &&
              !V(u) &&
              ((y = u[x]),
              y && (u[x] = null),
              (f.event.triggered = F),
              t.isPropagationStopped() && U.addEventListener(F, lo),
              u[F](),
              t.isPropagationStopped() && U.removeEventListener(F, lo),
              (f.event.triggered = void 0),
              y && (u[x] = y)),
            t.result
          );
        }
      },
      simulate: function (t, a, u) {
        var c = f.extend(new f.Event(), u, {
          type: t,
          isSimulated: !0,
        });
        f.event.trigger(c, null, a);
      },
    }),
      f.fn.extend({
        trigger: function (t, a) {
          return this.each(function () {
            f.event.trigger(t, a, this);
          });
        },
        triggerHandler: function (t, a) {
          var u = this[0];
          if (u) return f.event.trigger(t, a, u, !0);
        },
      }),
      N.focusin ||
        f.each(
          {
            focus: "focusin",
            blur: "focusout",
          },
          function (t, a) {
            var u = function (c) {
              f.event.simulate(a, c.target, f.event.fix(c));
            };
            f.event.special[a] = {
              setup: function () {
                var c = this.ownerDocument || this.document || this,
                  h = le.access(c, a);
                h || c.addEventListener(t, u, !0),
                  le.access(c, a, (h || 0) + 1);
              },
              teardown: function () {
                var c = this.ownerDocument || this.document || this,
                  h = le.access(c, a) - 1;
                h
                  ? le.access(c, a, h)
                  : (c.removeEventListener(t, u, !0), le.remove(c, a));
              },
            };
          }
        );
    var Kn = i.location,
      uo = {
        guid: Date.now(),
      },
      li = /\?/;
    f.parseXML = function (t) {
      var a;
      if (!t || typeof t != "string") return null;
      try {
        a = new i.DOMParser().parseFromString(t, "text/xml");
      } catch {
        a = void 0;
      }
      return (
        (!a || a.getElementsByTagName("parsererror").length) &&
          f.error("Invalid XML: " + t),
        a
      );
    };
    var ia = /\[\]$/,
      co = /\r?\n/g,
      oa = /^(?:submit|button|image|reset|file)$/i,
      sa = /^(?:input|select|textarea|keygen)/i;

    function ui(t, a, u, c) {
      var h;
      if (Array.isArray(a))
        f.each(a, function (m, y) {
          u || ia.test(t)
            ? c(t, y)
            : ui(
                t + "[" + (typeof y == "object" && y != null ? m : "") + "]",
                y,
                u,
                c
              );
        });
      else if (!u && J(a) === "object")
        for (h in a) ui(t + "[" + h + "]", a[h], u, c);
      else c(t, a);
    }
    (f.param = function (t, a) {
      var u,
        c = [],
        h = function (m, y) {
          var _ = M(y) ? y() : y;
          c[c.length] =
            encodeURIComponent(m) + "=" + encodeURIComponent(_ ?? "");
        };
      if (t == null) return "";
      if (Array.isArray(t) || (t.jquery && !f.isPlainObject(t)))
        f.each(t, function () {
          h(this.name, this.value);
        });
      else for (u in t) ui(u, t[u], a, h);
      return c.join("&");
    }),
      f.fn.extend({
        serialize: function () {
          return f.param(this.serializeArray());
        },
        serializeArray: function () {
          return this.map(function () {
            var t = f.prop(this, "elements");
            return t ? f.makeArray(t) : this;
          })
            .filter(function () {
              var t = this.type;
              return (
                this.name &&
                !f(this).is(":disabled") &&
                sa.test(this.nodeName) &&
                !oa.test(t) &&
                (this.checked || !Tt.test(t))
              );
            })
            .map(function (t, a) {
              var u = f(this).val();
              return u == null
                ? null
                : Array.isArray(u)
                ? f.map(u, function (c) {
                    return {
                      name: a.name,
                      value: c.replace(
                        co,
                        `\r
`
                      ),
                    };
                  })
                : {
                    name: a.name,
                    value: u.replace(
                      co,
                      `\r
`
                    ),
                  };
            })
            .get();
        },
      });
    var aa = /%20/g,
      la = /#.*$/,
      ua = /([?&])_=[^&]*/,
      ca = /^(.*?):[ \t]*([^\r\n]*)$/gm,
      fa = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
      da = /^(?:GET|HEAD)$/,
      ha = /^\/\//,
      fo = {},
      ci = {},
      ho = "*/".concat("*"),
      fi = Y.createElement("a");
    fi.href = Kn.href;

    function po(t) {
      return function (a, u) {
        typeof a != "string" && ((u = a), (a = "*"));
        var c,
          h = 0,
          m = a.toLowerCase().match(qe) || [];
        if (M(u))
          for (; (c = m[h++]); )
            c[0] === "+"
              ? ((c = c.slice(1) || "*"), (t[c] = t[c] || []).unshift(u))
              : (t[c] = t[c] || []).push(u);
      };
    }

    function go(t, a, u, c) {
      var h = {},
        m = t === ci;

      function y(_) {
        var x;
        return (
          (h[_] = !0),
          f.each(t[_] || [], function (O, j) {
            var U = j(a, u, c);
            if (typeof U == "string" && !m && !h[U])
              return a.dataTypes.unshift(U), y(U), !1;
            if (m) return !(x = U);
          }),
          x
        );
      }
      return y(a.dataTypes[0]) || (!h["*"] && y("*"));
    }

    function di(t, a) {
      var u,
        c,
        h = f.ajaxSettings.flatOptions || {};
      for (u in a) a[u] !== void 0 && ((h[u] ? t : c || (c = {}))[u] = a[u]);
      return c && f.extend(!0, t, c), t;
    }

    function pa(t, a, u) {
      for (var c, h, m, y, _ = t.contents, x = t.dataTypes; x[0] === "*"; )
        x.shift(),
          c === void 0 &&
            (c = t.mimeType || a.getResponseHeader("Content-Type"));
      if (c) {
        for (h in _)
          if (_[h] && _[h].test(c)) {
            x.unshift(h);
            break;
          }
      }
      if (x[0] in u) m = x[0];
      else {
        for (h in u) {
          if (!x[0] || t.converters[h + " " + x[0]]) {
            m = h;
            break;
          }
          y || (y = h);
        }
        m = m || y;
      }
      if (m) return m !== x[0] && x.unshift(m), u[m];
    }

    function ga(t, a, u, c) {
      var h,
        m,
        y,
        _,
        x,
        O = {},
        j = t.dataTypes.slice();
      if (j[1]) for (y in t.converters) O[y.toLowerCase()] = t.converters[y];
      for (m = j.shift(); m; )
        if (
          (t.responseFields[m] && (u[t.responseFields[m]] = a),
          !x && c && t.dataFilter && (a = t.dataFilter(a, t.dataType)),
          (x = m),
          (m = j.shift()),
          m)
        ) {
          if (m === "*") m = x;
          else if (x !== "*" && x !== m) {
            if (((y = O[x + " " + m] || O["* " + m]), !y)) {
              for (h in O)
                if (
                  ((_ = h.split(" ")),
                  _[1] === m && ((y = O[x + " " + _[0]] || O["* " + _[0]]), y))
                ) {
                  y === !0
                    ? (y = O[h])
                    : O[h] !== !0 && ((m = _[0]), j.unshift(_[1]));
                  break;
                }
            }
            if (y !== !0)
              if (y && t.throws) a = y(a);
              else
                try {
                  a = y(a);
                } catch (U) {
                  return {
                    state: "parsererror",
                    error: y ? U : "No conversion from " + x + " to " + m,
                  };
                }
          }
        }
      return {
        state: "success",
        data: a,
      };
    }
    f.extend({
      active: 0,
      lastModified: {},
      etag: {},
      ajaxSettings: {
        url: Kn.href,
        type: "GET",
        isLocal: fa.test(Kn.protocol),
        global: !0,
        processData: !0,
        async: !0,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        accepts: {
          "*": ho,
          text: "text/plain",
          html: "text/html",
          xml: "application/xml, text/xml",
          json: "application/json, text/javascript",
        },
        contents: {
          xml: /\bxml\b/,
          html: /\bhtml/,
          json: /\bjson\b/,
        },
        responseFields: {
          xml: "responseXML",
          text: "responseText",
          json: "responseJSON",
        },
        converters: {
          "* text": String,
          "text html": !0,
          "text json": JSON.parse,
          "text xml": f.parseXML,
        },
        flatOptions: {
          url: !0,
          context: !0,
        },
      },
      ajaxSetup: function (t, a) {
        return a ? di(di(t, f.ajaxSettings), a) : di(f.ajaxSettings, t);
      },
      ajaxPrefilter: po(fo),
      ajaxTransport: po(ci),
      ajax: function (t, a) {
        typeof t == "object" && ((a = t), (t = void 0)), (a = a || {});
        var u,
          c,
          h,
          m,
          y,
          _,
          x,
          O,
          j,
          U,
          L = f.ajaxSetup({}, a),
          F = L.context || L,
          se = L.context && (F.nodeType || F.jquery) ? f(F) : f.event,
          be = f.Deferred(),
          ae = f.Callbacks("once memory"),
          Be = L.statusCode || {},
          He = {},
          ft = {},
          Oe = "canceled",
          ve = {
            readyState: 0,
            getResponseHeader: function (Ce) {
              var Me;
              if (x) {
                if (!m)
                  for (m = {}; (Me = ca.exec(h)); )
                    m[Me[1].toLowerCase() + " "] = (
                      m[Me[1].toLowerCase() + " "] || []
                    ).concat(Me[2]);
                Me = m[Ce.toLowerCase() + " "];
              }
              return Me == null ? null : Me.join(", ");
            },
            getAllResponseHeaders: function () {
              return x ? h : null;
            },
            setRequestHeader: function (Ce, Me) {
              return (
                x == null &&
                  ((Ce = ft[Ce.toLowerCase()] = ft[Ce.toLowerCase()] || Ce),
                  (He[Ce] = Me)),
                this
              );
            },
            overrideMimeType: function (Ce) {
              return x == null && (L.mimeType = Ce), this;
            },
            statusCode: function (Ce) {
              var Me;
              if (Ce)
                if (x) ve.always(Ce[ve.status]);
                else for (Me in Ce) Be[Me] = [Be[Me], Ce[Me]];
              return this;
            },
            abort: function (Ce) {
              var Me = Ce || Oe;
              return u && u.abort(Me), rt(0, Me), this;
            },
          };
        if (
          (be.promise(ve),
          (L.url = ((t || L.url || Kn.href) + "").replace(
            ha,
            Kn.protocol + "//"
          )),
          (L.type = a.method || a.type || L.method || L.type),
          (L.dataTypes = (L.dataType || "*").toLowerCase().match(qe) || [""]),
          L.crossDomain == null)
        ) {
          _ = Y.createElement("a");
          try {
            (_.href = L.url),
              (_.href = _.href),
              (L.crossDomain =
                fi.protocol + "//" + fi.host != _.protocol + "//" + _.host);
          } catch {
            L.crossDomain = !0;
          }
        }
        if (
          (L.data &&
            L.processData &&
            typeof L.data != "string" &&
            (L.data = f.param(L.data, L.traditional)),
          go(fo, L, a, ve),
          x)
        )
          return ve;
        (O = f.event && L.global),
          O && f.active++ === 0 && f.event.trigger("ajaxStart"),
          (L.type = L.type.toUpperCase()),
          (L.hasContent = !da.test(L.type)),
          (c = L.url.replace(la, "")),
          L.hasContent
            ? L.data &&
              L.processData &&
              (L.contentType || "").indexOf(
                "application/x-www-form-urlencoded"
              ) === 0 &&
              (L.data = L.data.replace(aa, "+"))
            : ((U = L.url.slice(c.length)),
              L.data &&
                (L.processData || typeof L.data == "string") &&
                ((c += (li.test(c) ? "&" : "?") + L.data), delete L.data),
              L.cache === !1 &&
                ((c = c.replace(ua, "$1")),
                (U = (li.test(c) ? "&" : "?") + "_=" + uo.guid++ + U)),
              (L.url = c + U)),
          L.ifModified &&
            (f.lastModified[c] &&
              ve.setRequestHeader("If-Modified-Since", f.lastModified[c]),
            f.etag[c] && ve.setRequestHeader("If-None-Match", f.etag[c])),
          ((L.data && L.hasContent && L.contentType !== !1) || a.contentType) &&
            ve.setRequestHeader("Content-Type", L.contentType),
          ve.setRequestHeader(
            "Accept",
            L.dataTypes[0] && L.accepts[L.dataTypes[0]]
              ? L.accepts[L.dataTypes[0]] +
                  (L.dataTypes[0] !== "*" ? ", " + ho + "; q=0.01" : "")
              : L.accepts["*"]
          );
        for (j in L.headers) ve.setRequestHeader(j, L.headers[j]);
        if (L.beforeSend && (L.beforeSend.call(F, ve, L) === !1 || x))
          return ve.abort();
        if (
          ((Oe = "abort"),
          ae.add(L.complete),
          ve.done(L.success),
          ve.fail(L.error),
          (u = go(ci, L, a, ve)),
          !u)
        )
          rt(-1, "No Transport");
        else {
          if (((ve.readyState = 1), O && se.trigger("ajaxSend", [ve, L]), x))
            return ve;
          L.async &&
            L.timeout > 0 &&
            (y = i.setTimeout(function () {
              ve.abort("timeout");
            }, L.timeout));
          try {
            (x = !1), u.send(He, rt);
          } catch (Ce) {
            if (x) throw Ce;
            rt(-1, Ce);
          }
        }

        function rt(Ce, Me, Zn, vr) {
          var dt,
            wn,
            bn,
            it,
            Kt,
            yt = Me;
          x ||
            ((x = !0),
            y && i.clearTimeout(y),
            (u = void 0),
            (h = vr || ""),
            (ve.readyState = Ce > 0 ? 4 : 0),
            (dt = (Ce >= 200 && Ce < 300) || Ce === 304),
            Zn && (it = pa(L, ve, Zn)),
            !dt &&
              f.inArray("script", L.dataTypes) > -1 &&
              (L.converters["text script"] = function () {}),
            (it = ga(L, it, ve, dt)),
            dt
              ? (L.ifModified &&
                  ((Kt = ve.getResponseHeader("Last-Modified")),
                  Kt && (f.lastModified[c] = Kt),
                  (Kt = ve.getResponseHeader("etag")),
                  Kt && (f.etag[c] = Kt)),
                Ce === 204 || L.type === "HEAD"
                  ? (yt = "nocontent")
                  : Ce === 304
                  ? (yt = "notmodified")
                  : ((yt = it.state),
                    (wn = it.data),
                    (bn = it.error),
                    (dt = !bn)))
              : ((bn = yt),
                (Ce || !yt) && ((yt = "error"), Ce < 0 && (Ce = 0))),
            (ve.status = Ce),
            (ve.statusText = (Me || yt) + ""),
            dt
              ? be.resolveWith(F, [wn, yt, ve])
              : be.rejectWith(F, [ve, yt, bn]),
            ve.statusCode(Be),
            (Be = void 0),
            O &&
              se.trigger(dt ? "ajaxSuccess" : "ajaxError", [
                ve,
                L,
                dt ? wn : bn,
              ]),
            ae.fireWith(F, [ve, yt]),
            O &&
              (se.trigger("ajaxComplete", [ve, L]),
              --f.active || f.event.trigger("ajaxStop")));
        }
        return ve;
      },
      getJSON: function (t, a, u) {
        return f.get(t, a, u, "json");
      },
      getScript: function (t, a) {
        return f.get(t, void 0, a, "script");
      },
    }),
      f.each(["get", "post"], function (t, a) {
        f[a] = function (u, c, h, m) {
          return (
            M(c) && ((m = m || h), (h = c), (c = void 0)),
            f.ajax(
              f.extend(
                {
                  url: u,
                  type: a,
                  dataType: m,
                  data: c,
                  success: h,
                },
                f.isPlainObject(u) && u
              )
            )
          );
        };
      }),
      f.ajaxPrefilter(function (t) {
        var a;
        for (a in t.headers)
          a.toLowerCase() === "content-type" &&
            (t.contentType = t.headers[a] || "");
      }),
      (f._evalUrl = function (t, a, u) {
        return f.ajax({
          url: t,
          type: "GET",
          dataType: "script",
          cache: !0,
          async: !1,
          global: !1,
          converters: {
            "text script": function () {},
          },
          dataFilter: function (c) {
            f.globalEval(c, a, u);
          },
        });
      }),
      f.fn.extend({
        wrapAll: function (t) {
          var a;
          return (
            this[0] &&
              (M(t) && (t = t.call(this[0])),
              (a = f(t, this[0].ownerDocument).eq(0).clone(!0)),
              this[0].parentNode && a.insertBefore(this[0]),
              a
                .map(function () {
                  for (var u = this; u.firstElementChild; )
                    u = u.firstElementChild;
                  return u;
                })
                .append(this)),
            this
          );
        },
        wrapInner: function (t) {
          return M(t)
            ? this.each(function (a) {
                f(this).wrapInner(t.call(this, a));
              })
            : this.each(function () {
                var a = f(this),
                  u = a.contents();
                u.length ? u.wrapAll(t) : a.append(t);
              });
        },
        wrap: function (t) {
          var a = M(t);
          return this.each(function (u) {
            f(this).wrapAll(a ? t.call(this, u) : t);
          });
        },
        unwrap: function (t) {
          return (
            this.parent(t)
              .not("body")
              .each(function () {
                f(this).replaceWith(this.childNodes);
              }),
            this
          );
        },
      }),
      (f.expr.pseudos.hidden = function (t) {
        return !f.expr.pseudos.visible(t);
      }),
      (f.expr.pseudos.visible = function (t) {
        return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
      }),
      (f.ajaxSettings.xhr = function () {
        try {
          return new i.XMLHttpRequest();
        } catch {}
      });
    var ma = {
        0: 200,
        1223: 204,
      },
      Qn = f.ajaxSettings.xhr();
    (N.cors = !!Qn && "withCredentials" in Qn),
      (N.ajax = Qn = !!Qn),
      f.ajaxTransport(function (t) {
        var a, u;
        if (N.cors || (Qn && !t.crossDomain))
          return {
            send: function (c, h) {
              var m,
                y = t.xhr();
              if (
                (y.open(t.type, t.url, t.async, t.username, t.password),
                t.xhrFields)
              )
                for (m in t.xhrFields) y[m] = t.xhrFields[m];
              t.mimeType &&
                y.overrideMimeType &&
                y.overrideMimeType(t.mimeType),
                !t.crossDomain &&
                  !c["X-Requested-With"] &&
                  (c["X-Requested-With"] = "XMLHttpRequest");
              for (m in c) y.setRequestHeader(m, c[m]);
              (a = function (_) {
                return function () {
                  a &&
                    ((a =
                      u =
                      y.onload =
                      y.onerror =
                      y.onabort =
                      y.ontimeout =
                      y.onreadystatechange =
                        null),
                    _ === "abort"
                      ? y.abort()
                      : _ === "error"
                      ? typeof y.status != "number"
                        ? h(0, "error")
                        : h(y.status, y.statusText)
                      : h(
                          ma[y.status] || y.status,
                          y.statusText,
                          (y.responseType || "text") !== "text" ||
                            typeof y.responseText != "string"
                            ? {
                                binary: y.response,
                              }
                            : {
                                text: y.responseText,
                              },
                          y.getAllResponseHeaders()
                        ));
                };
              }),
                (y.onload = a()),
                (u = y.onerror = y.ontimeout = a("error")),
                y.onabort !== void 0
                  ? (y.onabort = u)
                  : (y.onreadystatechange = function () {
                      y.readyState === 4 &&
                        i.setTimeout(function () {
                          a && u();
                        });
                    }),
                (a = a("abort"));
              try {
                y.send((t.hasContent && t.data) || null);
              } catch (_) {
                if (a) throw _;
              }
            },
            abort: function () {
              a && a();
            },
          };
      }),
      f.ajaxPrefilter(function (t) {
        t.crossDomain && (t.contents.script = !1);
      }),
      f.ajaxSetup({
        accepts: {
          script:
            "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
        },
        contents: {
          script: /\b(?:java|ecma)script\b/,
        },
        converters: {
          "text script": function (t) {
            return f.globalEval(t), t;
          },
        },
      }),
      f.ajaxPrefilter("script", function (t) {
        t.cache === void 0 && (t.cache = !1), t.crossDomain && (t.type = "GET");
      }),
      f.ajaxTransport("script", function (t) {
        if (t.crossDomain || t.scriptAttrs) {
          var a, u;
          return {
            send: function (c, h) {
              (a = f("<script>")
                .attr(t.scriptAttrs || {})
                .prop({
                  charset: t.scriptCharset,
                  src: t.url,
                })
                .on(
                  "load error",
                  (u = function (m) {
                    a.remove(),
                      (u = null),
                      m && h(m.type === "error" ? 404 : 200, m.type);
                  })
                )),
                Y.head.appendChild(a[0]);
            },
            abort: function () {
              u && u();
            },
          };
        }
      });
    var mo = [],
      hi = /(=)\?(?=&|$)|\?\?/;
    f.ajaxSetup({
      jsonp: "callback",
      jsonpCallback: function () {
        var t = mo.pop() || f.expando + "_" + uo.guid++;
        return (this[t] = !0), t;
      },
    }),
      f.ajaxPrefilter("json jsonp", function (t, a, u) {
        var c,
          h,
          m,
          y =
            t.jsonp !== !1 &&
            (hi.test(t.url)
              ? "url"
              : typeof t.data == "string" &&
                (t.contentType || "").indexOf(
                  "application/x-www-form-urlencoded"
                ) === 0 &&
                hi.test(t.data) &&
                "data");
        if (y || t.dataTypes[0] === "jsonp")
          return (
            (c = t.jsonpCallback =
              M(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback),
            y
              ? (t[y] = t[y].replace(hi, "$1" + c))
              : t.jsonp !== !1 &&
                (t.url += (li.test(t.url) ? "&" : "?") + t.jsonp + "=" + c),
            (t.converters["script json"] = function () {
              return m || f.error(c + " was not called"), m[0];
            }),
            (t.dataTypes[0] = "json"),
            (h = i[c]),
            (i[c] = function () {
              m = arguments;
            }),
            u.always(function () {
              h === void 0 ? f(i).removeProp(c) : (i[c] = h),
                t[c] && ((t.jsonpCallback = a.jsonpCallback), mo.push(c)),
                m && M(h) && h(m[0]),
                (m = h = void 0);
            }),
            "script"
          );
      }),
      (N.createHTMLDocument = (function () {
        var t = Y.implementation.createHTMLDocument("").body;
        return (
          (t.innerHTML = "<form></form><form></form>"),
          t.childNodes.length === 2
        );
      })()),
      (f.parseHTML = function (t, a, u) {
        if (typeof t != "string") return [];
        typeof a == "boolean" && ((u = a), (a = !1));
        var c, h, m;
        return (
          a ||
            (N.createHTMLDocument
              ? ((a = Y.implementation.createHTMLDocument("")),
                (c = a.createElement("base")),
                (c.href = Y.location.href),
                a.head.appendChild(c))
              : (a = Y)),
          (h = G.exec(t)),
          (m = !u && []),
          h
            ? [a.createElement(h[1])]
            : ((h = cn([t], a, m)),
              m && m.length && f(m).remove(),
              f.merge([], h.childNodes))
        );
      }),
      (f.fn.load = function (t, a, u) {
        var c,
          h,
          m,
          y = this,
          _ = t.indexOf(" ");
        return (
          _ > -1 && ((c = vn(t.slice(_))), (t = t.slice(0, _))),
          M(a)
            ? ((u = a), (a = void 0))
            : a && typeof a == "object" && (h = "POST"),
          y.length > 0 &&
            f
              .ajax({
                url: t,
                type: h || "GET",
                dataType: "html",
                data: a,
              })
              .done(function (x) {
                (m = arguments),
                  y.html(c ? f("<div>").append(f.parseHTML(x)).find(c) : x);
              })
              .always(
                u &&
                  function (x, O) {
                    y.each(function () {
                      u.apply(this, m || [x.responseText, O, x]);
                    });
                  }
              ),
          this
        );
      }),
      (f.expr.pseudos.animated = function (t) {
        return f.grep(f.timers, function (a) {
          return t === a.elem;
        }).length;
      }),
      (f.offset = {
        setOffset: function (t, a, u) {
          var c,
            h,
            m,
            y,
            _,
            x,
            O,
            j = f.css(t, "position"),
            U = f(t),
            L = {};
          j === "static" && (t.style.position = "relative"),
            (_ = U.offset()),
            (m = f.css(t, "top")),
            (x = f.css(t, "left")),
            (O =
              (j === "absolute" || j === "fixed") &&
              (m + x).indexOf("auto") > -1),
            O
              ? ((c = U.position()), (y = c.top), (h = c.left))
              : ((y = parseFloat(m) || 0), (h = parseFloat(x) || 0)),
            M(a) && (a = a.call(t, u, f.extend({}, _))),
            a.top != null && (L.top = a.top - _.top + y),
            a.left != null && (L.left = a.left - _.left + h),
            "using" in a
              ? a.using.call(t, L)
              : (typeof L.top == "number" && (L.top += "px"),
                typeof L.left == "number" && (L.left += "px"),
                U.css(L));
        },
      }),
      f.fn.extend({
        offset: function (t) {
          if (arguments.length)
            return t === void 0
              ? this
              : this.each(function (h) {
                  f.offset.setOffset(this, t, h);
                });
          var a,
            u,
            c = this[0];
          if (c)
            return c.getClientRects().length
              ? ((a = c.getBoundingClientRect()),
                (u = c.ownerDocument.defaultView),
                {
                  top: a.top + u.pageYOffset,
                  left: a.left + u.pageXOffset,
                })
              : {
                  top: 0,
                  left: 0,
                };
        },
        position: function () {
          if (this[0]) {
            var t,
              a,
              u,
              c = this[0],
              h = {
                top: 0,
                left: 0,
              };
            if (f.css(c, "position") === "fixed") a = c.getBoundingClientRect();
            else {
              for (
                a = this.offset(),
                  u = c.ownerDocument,
                  t = c.offsetParent || u.documentElement;
                t &&
                (t === u.body || t === u.documentElement) &&
                f.css(t, "position") === "static";

              )
                t = t.parentNode;
              t &&
                t !== c &&
                t.nodeType === 1 &&
                ((h = f(t).offset()),
                (h.top += f.css(t, "borderTopWidth", !0)),
                (h.left += f.css(t, "borderLeftWidth", !0)));
            }
            return {
              top: a.top - h.top - f.css(c, "marginTop", !0),
              left: a.left - h.left - f.css(c, "marginLeft", !0),
            };
          }
        },
        offsetParent: function () {
          return this.map(function () {
            for (
              var t = this.offsetParent;
              t && f.css(t, "position") === "static";

            )
              t = t.offsetParent;
            return t || Nt;
          });
        },
      }),
      f.each(
        {
          scrollLeft: "pageXOffset",
          scrollTop: "pageYOffset",
        },
        function (t, a) {
          var u = a === "pageYOffset";
          f.fn[t] = function (c) {
            return lt(
              this,
              function (h, m, y) {
                var _;
                if (
                  (V(h) ? (_ = h) : h.nodeType === 9 && (_ = h.defaultView),
                  y === void 0)
                )
                  return _ ? _[a] : h[m];
                _
                  ? _.scrollTo(u ? _.pageXOffset : y, u ? y : _.pageYOffset)
                  : (h[m] = y);
              },
              t,
              c,
              arguments.length
            );
          };
        }
      ),
      f.each(["top", "left"], function (t, a) {
        f.cssHooks[a] = ee(N.pixelPosition, function (u, c) {
          if (c)
            return (c = I(u, a)), qn.test(c) ? f(u).position()[a] + "px" : c;
        });
      }),
      f.each(
        {
          Height: "height",
          Width: "width",
        },
        function (t, a) {
          f.each(
            {
              padding: "inner" + t,
              content: a,
              "": "outer" + t,
            },
            function (u, c) {
              f.fn[c] = function (h, m) {
                var y = arguments.length && (u || typeof h != "boolean"),
                  _ = u || (h === !0 || m === !0 ? "margin" : "border");
                return lt(
                  this,
                  function (x, O, j) {
                    var U;
                    return V(x)
                      ? c.indexOf("outer") === 0
                        ? x["inner" + t]
                        : x.document.documentElement["client" + t]
                      : x.nodeType === 9
                      ? ((U = x.documentElement),
                        Math.max(
                          x.body["scroll" + t],
                          U["scroll" + t],
                          x.body["offset" + t],
                          U["offset" + t],
                          U["client" + t]
                        ))
                      : j === void 0
                      ? f.css(x, O, _)
                      : f.style(x, O, j, _);
                  },
                  a,
                  y ? h : void 0,
                  y
                );
              };
            }
          );
        }
      ),
      f.each(
        [
          "ajaxStart",
          "ajaxStop",
          "ajaxComplete",
          "ajaxError",
          "ajaxSuccess",
          "ajaxSend",
        ],
        function (t, a) {
          f.fn[a] = function (u) {
            return this.on(a, u);
          };
        }
      ),
      f.fn.extend({
        bind: function (t, a, u) {
          return this.on(t, null, a, u);
        },
        unbind: function (t, a) {
          return this.off(t, null, a);
        },
        delegate: function (t, a, u, c) {
          return this.on(a, t, u, c);
        },
        undelegate: function (t, a, u) {
          return arguments.length === 1
            ? this.off(t, "**")
            : this.off(a, t || "**", u);
        },
        hover: function (t, a) {
          return this.mouseenter(t).mouseleave(a || t);
        },
      }),
      f.each(
        "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(
          " "
        ),
        function (t, a) {
          f.fn[a] = function (u, c) {
            return arguments.length > 0
              ? this.on(a, null, u, c)
              : this.trigger(a);
          };
        }
      );
    var va = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    (f.proxy = function (t, a) {
      var u, c, h;
      if ((typeof a == "string" && ((u = t[a]), (a = t), (t = u)), !!M(t)))
        return (
          (c = n.call(arguments, 2)),
          (h = function () {
            return t.apply(a || this, c.concat(n.call(arguments)));
          }),
          (h.guid = t.guid = t.guid || f.guid++),
          h
        );
    }),
      (f.holdReady = function (t) {
        t ? f.readyWait++ : f.ready(!0);
      }),
      (f.isArray = Array.isArray),
      (f.parseJSON = JSON.parse),
      (f.nodeName = B),
      (f.isFunction = M),
      (f.isWindow = V),
      (f.camelCase = $e),
      (f.type = J),
      (f.now = Date.now),
      (f.isNumeric = function (t) {
        var a = f.type(t);
        return (a === "number" || a === "string") && !isNaN(t - parseFloat(t));
      }),
      (f.trim = function (t) {
        return t == null ? "" : (t + "").replace(va, "");
      });
    var ya = i.jQuery,
      wa = i.$;
    return (
      (f.noConflict = function (t) {
        return (
          i.$ === f && (i.$ = wa), t && i.jQuery === f && (i.jQuery = ya), f
        );
      }),
      typeof r > "u" && (i.jQuery = i.$ = f),
      f
    );
  });
})(fs);
var ds = fs.exports;
const S = fl(ds),
  Li = {
    popstate: !1,
  },
  Eo = {},
  dl = function (s) {
    const i = document.head,
      r = s.next.html.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0],
      o = document.createElement("head");
    o.innerHTML = r;
    const e = [
        "meta[name='keywords']",
        "meta[name='description']",
        "meta[property^='og']",
        "meta[name^='twitter']",
        "meta[itemprop]",
        "link[itemprop]",
        "link[rel='prev']",
        "link[rel='next']",
        "link[rel='canonical']",
      ].join(","),
      n = i.querySelectorAll(e);
    for (let d = 0; d < n.length; d++) i.removeChild(n[d]);
    const l = o.querySelectorAll(e);
    for (let d = 0; d < l.length; d++) i.appendChild(l[d]);
  };

function hl(s) {
  return (
    (s = s || 2e3),
    new Promise((i) => {
      setTimeout(() => {
        i();
      }, s);
    })
  );
}
window.addEventListener("popstate", () => {
  Li.popstate = !0;
});
S(document).on("click", "a", function (s) {
  s.currentTarget.href === window.location.href &&
    (s.preventDefault(), s.stopPropagation());
});
var _e = {
    displacement: 2.56,
    seed: 3915,
  },
  _r = {
    displacement: 2.56,
    seed: 3915,
  },
  Un = {
    displacement: 1.95,
    seed: 1,
  },
  Ao = {
    displacement: 3.97,
    seed: 0.43,
  },
  Mr = {
    displacement: 2.38,
    seed: 4767,
  },
  Po = {
    displacement: 2.56,
    seed: 3915,
  },
  Oo = {
    displacement: 5,
    seed: 2149,
  },
  Ir = {
    displacement: 4.26,
    seed: 0.62,
  },
  Ro = {
    displacement: 2.41,
    seed: -0.49,
  },
  Fr = {
    displacement: 2.25,
    seed: 0.7,
  },
  Zt = 0,
  ki = !1,
  en = 0,
  _i = !0;
let Hr = function (s) {
    let i = {},
      r = function () {
        s(), (i.id = requestAnimationFrame(r));
      };
    return (i.id = requestAnimationFrame(r)), i;
  },
  qr = function () {
    ki == !1 ? (Zt = Zt - 1 / 700) : (Zt = Zt + 1 / 700),
      Zt >= 1 ? (ki = !1) : Zt <= -1 && (ki = !0),
      _i == !1 ? (en = en - 1 / 800) : (en = en + 1 / 800),
      en >= 1 ? (_i = !1) : en <= -1 && (_i = !0),
      S("#gradient albana-gradient").attr({
        displacement: _e.displacement + Zt,
        seed: _e.seed + en,
      }),
      S(".js-hover_gradient_h albana-gradient").length &&
        S(".js-hover_gradient_h albana-gradient").attr({
          displacement: _e.displacement + Zt,
          seed: _e.seed + en,
        });
  };
window.interval = Hr(qr);

function hs() {
  S("#home").length
    ? (S("#gradient").addClass("home").removeClass("child nothing"),
      S("#gradient albana-gradient").attr({
        color1: "#ff0000ff",
        color2: "#c90000ff",
        color3: "#ff6600ff",
        color4: "#bebebeff",
        colorsize: 0.8,
        colorspacing: 0.33,
        colorrotation: 1.24840734641021,
        colorspread: 10,
        coloroffset: "-0.973876953125,-0.755390625",
        position: "-1.8283292510943407,1.3235562192065857",
        zoom: 0.75,
      }),
      (_e.displacement = _r.displacement),
      (_e.seed = _r.seed))
    : S("#team").length
    ? (S("#gradient").addClass("child").removeClass("home nothing"),
      S("#gradient albana-gradient").attr({
        color1: "#80f6ff",
        color2: "#3b488c",
        color3: "#f4ee4e",
        color4: "#d73c3c",
        colorsize: 0.69,
        colorspacing: 0.33,
        colorrotation: 1.45840734641021,
        colorspread: 10,
        coloroffset: "-0.973876953125,-0.755390625",
        position: "-1.3073040020693818,1.3468734838699397",
        zoom: 1.037533164737158,
      }),
      (_e.displacement = Un.displacement),
      (_e.seed = Un.seed))
    : S("#team_detail").length
    ? S("#gradient").addClass("nothing").removeClass("home child")
    : S("#news").length
    ? (S("#gradient").addClass("child").removeClass("home nothing"),
      S("#gradient albana-gradient").attr({
        color1: "#d6d6d6ff",
        color2: "#50535eff",
        color3: "#007896ff",
        color4: "#000653ff",
        colorsize: 0.69,
        colorspacing: 0.33,
        colorrotation: 1.24840734641021,
        colorspread: 10,
        coloroffset: "-0.973876953125,-0.755390625",
        position: "-1.8283292510943407,1.3235562192065857",
        zoom: 0.75,
      }),
      (_e.displacement = Un.displacement),
      (_e.seed = Un.seed))
    : S("#work").length
    ? (S("#gradient").addClass("child").removeClass("home nothing"),
      S("#gradient albana-gradient").attr({
        color1: "#f8f8ec",
        color2: "#066699",
        color3: "#3c769a",
        color4: "#0f4266",
        colorsize: 2.18,
        colorspacing: 0.37,
        colorrotation: 0.368407346410207,
        colorspread: 1.15,
        coloroffset: "-0.22426757812499998,1",
        position: "-161.201441254716,-15.25218097766221",
        zoom: 0.701439658706154,
      }),
      (_e.displacement = Ao.displacement),
      (_e.seed = Ao.seed))
    : S("#work_detail").length
    ? S("#gradient").addClass("nothing").removeClass("home child")
    : S("#contact").length || S("#brochure").length
    ? (S("#gradient").addClass("child").removeClass("home nothing"),
      S("#gradient albana-gradient").attr({
        color1: "#3c515d",
        color2: "#32ad7e",
        color3: "#EDDD8B",
        color4: "#DF5A3C",
        colorsize: 1.18,
        colorspacing: 0.4,
        colorrotation: 0.578407346410207,
        colorspread: 6.45,
        coloroffset: "1,-0.07539062500000004",
        position: "169.7682671327226,101.4535007333579",
        zoom: 0.4126831152023412,
      }),
      (_e.displacement = Mr.displacement),
      (_e.seed = Mr.seed))
    : S("#pp").length
    ? (S("#gradient").addClass("child").removeClass("home nothing"),
      S("#gradient albana-gradient").attr({
        color1: "#bfcff7",
        color2: "#dce4f7",
        color3: "#f8f3bf",
        color4: "#d34017",
        colorsize: 0.69,
        colorspacing: 0.33,
        colorrotation: 1.24840734641021,
        colorspread: 10,
        coloroffset: "-0.973876953125,-0.755390625",
        position: "-0.6185491585017477,-1.9266610328973315",
        zoom: 0.75,
      }),
      (_e.displacement = Po.displacement),
      (_e.seed = Po.seed))
    : S("#services").length
    ? (S("#gradient").addClass("child").removeClass("home nothing"),
      S("#gradient albana-gradient").attr({
        color1: "#000000",
        color2: "#94a2a8",
        color3: "#dbdbdb",
        color4: "#262626",
        colorsize: 1.42,
        colorspacing: 0.76,
        colorrotation: -0.891592653589793,
        colorspread: 3.1,
        coloroffset: "0.2901367187499999,1",
        position: "-118.62501803050195,59.61237369381399",
        zoom: 0.512940626531553,
      }),
      (_e.displacement = Oo.displacement),
      (_e.seed = Oo.seed))
    : S("#careers").length || S("#careers_detail").length
    ? (S("#gradient").addClass("child").removeClass("home nothing"),
      S("#gradient albana-gradient").attr({
        color1: "#595b5a",
        color2: "#14c3a2",
        color3: "#0de5a8",
        color4: "#2e3260",
        colorsize: 0.63,
        colorspacing: 0.51,
        colorrotation: 0.838407346410207,
        colorspread: 10,
        coloroffset: "-0.973876953125,-0.755390625",
        position: "0.09329361434031774,-2.5387530500027173",
        zoom: 1.3102575422323914,
      }),
      (_e.displacement = Ir.displacement),
      (_e.seed = Ir.seed))
    : S("#vision").length
    ? (S("#gradient").addClass("child").removeClass("home nothing"),
      S("#gradient albana-gradient").attr({
        color1: "#4b538b",
        color2: "#15191d",
        color3: "#f7a21b",
        color4: "#e45635",
        colorsize: 1.26,
        colorspacing: 0.37,
        colorrotation: -2.28159265358979,
        colorspread: 10,
        coloroffset: "-1,1",
        position: "-33.523577942202174,15.692794865900153",
        zoom: 0.5729023778708708,
      }),
      (_e.displacement = Ro.displacement),
      (_e.seed = Ro.seed))
    : S("#company").length
    ? (S("#gradient").addClass("child").removeClass("home nothing"),
      S("#gradient albana-gradient").attr({
        color1: "#a43737",
        color2: "#e28936",
        color3: "#d3ad55",
        color4: "#e9cfaa",
        colorsize: 1.55,
        colorspacing: 0.26,
        colorrotation: -0.441592653589793,
        colorspread: 3.03,
        coloroffset: "-1,1",
        position: "-1.8875392579061487,0.9385128228234387",
        zoom: 0.5993056145408869,
      }),
      (_e.displacement = Fr.displacement),
      (_e.seed = Fr.seed))
    : S("#not_found").length &&
      (S("#gradient").addClass("home").removeClass("child nothing"),
      S("#gradient albana-gradient").attr({
        color1: "#80f6ff",
        color2: "#3b488c",
        color3: "#884ef4",
        color4: "#d73c3c",
        colorsize: 0.8,
        colorspacing: 0.33,
        colorrotation: 1.24840734641021,
        colorspread: 10,
        coloroffset: "-0.973876953125,-0.755390625",
        position: "-1.8283292510943407,1.3235562192065857",
        zoom: 0.75,
      }),
      (_e.displacement = _r.displacement),
      (_e.seed = _r.seed));
}

function No(s) {
  s == "team"
    ? (S(".js-hover_gradient_h albana-gradient").attr({
        color1: "#80f6ff",
        color2: "#3b488c",
        color3: "#f4ee4e",
        color4: "#d73c3c",
        colorsize: 0.69,
        colorspacing: 0.33,
        colorrotation: 1.45840734641021,
        colorspread: 10,
        coloroffset: "-0.973876953125,-0.755390625",
        position: "-1.3073040020693818,1.3468734838699397",
        zoom: 1.037533164737158,
      }),
      (_e.displacement = Un.displacement),
      (_e.seed = Un.seed))
    : s == "contact"
    ? (S(".js-hover_gradient_h albana-gradient").attr({
        color1: "#3c515d",
        color2: "#32ad7e",
        color3: "#EDDD8B",
        color4: "#DF5A3C",
        colorsize: 1.18,
        colorspacing: 0.4,
        colorrotation: 0.578407346410207,
        colorspread: 6.45,
        coloroffset: "1,-0.07539062500000004",
        position: "169.7682671327226,101.4535007333579",
        zoom: 0.4126831152023412,
      }),
      (_e.displacement = Mr.displacement),
      (_e.seed = Mr.seed))
    : s == "careers"
    ? (S(".js-hover_gradient_h albana-gradient").attr({
        color1: "#595b5a",
        color2: "#14c3a2",
        color3: "#0de5a8",
        color4: "#2e3260",
        colorsize: 0.63,
        colorspacing: 0.51,
        colorrotation: 0.838407346410207,
        colorspread: 10,
        coloroffset: "-0.973876953125,-0.755390625",
        position: "0.09329361434031774,-2.5387530500027173",
        zoom: 1.3102575422323914,
      }),
      (_e.displacement = Ir.displacement),
      (_e.seed = Ir.seed))
    : s == "company" &&
      (S(".js-hover_gradient_h albana-gradient").attr({
        color1: "#a43737",
        color2: "#e28936",
        color3: "#d3ad55",
        color4: "#e9cfaa",
        colorsize: 1.55,
        colorspacing: 0.26,
        colorrotation: -0.441592653589793,
        colorspread: 3.03,
        coloroffset: "-1,1",
        position: "-1.8875392579061487,0.9385128228234387",
        zoom: 0.5993056145408869,
      }),
      (_e.displacement = Fr.displacement),
      (_e.seed = Fr.seed));
}
var xr = !1;

function Lo() {
  S(".js-hover_gradient").hover(
    function () {
      if (window.ww > bt) {
        var s = S(this).attr("data-page");
        let i = S(this).parents().next(".js-hover_gradient_h");
        xr == !1
          ? (i.addClass("active"), No(s), (window.interval = Hr(qr)), (xr = !0))
          : setTimeout(function () {
              i.addClass("active"),
                No(s),
                (window.interval = Hr(qr)),
                (xr = !0);
            }, 200);
      }
    },
    function () {
      window.ww > bt &&
        (S(this).parents().next(".js-hover_gradient_h").removeClass("active"),
        cancelAnimationFrame(window.interval.id),
        setTimeout(function () {
          xr = !1;
        }, 200));
    }
  );
}

function ps(s, i) {
  return function () {
    return s.apply(i, arguments);
  };
}
const { toString: pl } = Object.prototype,
  { getPrototypeOf: Xi } = Object,
  { iterator: Xr, toStringTag: gs } = Symbol,
  Yr = ((s) => (i) => {
    const r = pl.call(i);
    return s[r] || (s[r] = r.slice(8, -1).toLowerCase());
  })(Object.create(null)),
  Ct = (s) => ((s = s.toLowerCase()), (i) => Yr(i) === s),
  Jr = (s) => (i) => typeof i === s,
  { isArray: Gn } = Array,
  sr = Jr("undefined");

function ur(s) {
  return (
    s !== null &&
    !sr(s) &&
    s.constructor !== null &&
    !sr(s.constructor) &&
    st(s.constructor.isBuffer) &&
    s.constructor.isBuffer(s)
  );
}
const ms = Ct("ArrayBuffer");

function gl(s) {
  let i;
  return (
    typeof ArrayBuffer < "u" && ArrayBuffer.isView
      ? (i = ArrayBuffer.isView(s))
      : (i = s && s.buffer && ms(s.buffer)),
    i
  );
}
const ml = Jr("string"),
  st = Jr("function"),
  vs = Jr("number"),
  cr = (s) => s !== null && typeof s == "object",
  vl = (s) => s === !0 || s === !1,
  Ar = (s) => {
    if (Yr(s) !== "object") return !1;
    const i = Xi(s);
    return (
      (i === null ||
        i === Object.prototype ||
        Object.getPrototypeOf(i) === null) &&
      !(gs in s) &&
      !(Xr in s)
    );
  },
  yl = (s) => {
    if (!cr(s) || ur(s)) return !1;
    try {
      return (
        Object.keys(s).length === 0 &&
        Object.getPrototypeOf(s) === Object.prototype
      );
    } catch {
      return !1;
    }
  },
  wl = Ct("Date"),
  bl = Ct("File"),
  Tl = Ct("Blob"),
  Sl = Ct("FileList"),
  kl = (s) => cr(s) && st(s.pipe),
  _l = (s) => {
    let i;
    return (
      s &&
      ((typeof FormData == "function" && s instanceof FormData) ||
        (st(s.append) &&
          ((i = Yr(s)) === "formdata" ||
            (i === "object" &&
              st(s.toString) &&
              s.toString() === "[object FormData]"))))
    );
  },
  xl = Ct("URLSearchParams"),
  [Cl, El, Al, Pl] = ["ReadableStream", "Request", "Response", "Headers"].map(
    Ct
  ),
  Ol = (s) =>
    s.trim ? s.trim() : s.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");

function fr(s, i, { allOwnKeys: r = !1 } = {}) {
  if (s === null || typeof s > "u") return;
  let o, e;
  if ((typeof s != "object" && (s = [s]), Gn(s)))
    for (o = 0, e = s.length; o < e; o++) i.call(null, s[o], o, s);
  else {
    if (ur(s)) return;
    const n = r ? Object.getOwnPropertyNames(s) : Object.keys(s),
      l = n.length;
    let d;
    for (o = 0; o < l; o++) (d = n[o]), i.call(null, s[d], d, s);
  }
}

function ys(s, i) {
  if (ur(s)) return null;
  i = i.toLowerCase();
  const r = Object.keys(s);
  let o = r.length,
    e;
  for (; o-- > 0; ) if (((e = r[o]), i === e.toLowerCase())) return e;
  return null;
}
const On =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : global,
  ws = (s) => !sr(s) && s !== On;

function ji() {
  const { caseless: s } = (ws(this) && this) || {},
    i = {},
    r = (o, e) => {
      const n = (s && ys(i, e)) || e;
      Ar(i[n]) && Ar(o)
        ? (i[n] = ji(i[n], o))
        : Ar(o)
        ? (i[n] = ji({}, o))
        : Gn(o)
        ? (i[n] = o.slice())
        : (i[n] = o);
    };
  for (let o = 0, e = arguments.length; o < e; o++)
    arguments[o] && fr(arguments[o], r);
  return i;
}
const Rl = (s, i, r, { allOwnKeys: o } = {}) => (
    fr(
      i,
      (e, n) => {
        r && st(e) ? (s[n] = ps(e, r)) : (s[n] = e);
      },
      {
        allOwnKeys: o,
      }
    ),
    s
  ),
  Nl = (s) => (s.charCodeAt(0) === 65279 && (s = s.slice(1)), s),
  Ll = (s, i, r, o) => {
    (s.prototype = Object.create(i.prototype, o)),
      (s.prototype.constructor = s),
      Object.defineProperty(s, "super", {
        value: i.prototype,
      }),
      r && Object.assign(s.prototype, r);
  },
  jl = (s, i, r, o) => {
    let e, n, l;
    const d = {};
    if (((i = i || {}), s == null)) return i;
    do {
      for (e = Object.getOwnPropertyNames(s), n = e.length; n-- > 0; )
        (l = e[n]), (!o || o(l, s, i)) && !d[l] && ((i[l] = s[l]), (d[l] = !0));
      s = r !== !1 && Xi(s);
    } while (s && (!r || r(s, i)) && s !== Object.prototype);
    return i;
  },
  Dl = (s, i, r) => {
    (s = String(s)),
      (r === void 0 || r > s.length) && (r = s.length),
      (r -= i.length);
    const o = s.indexOf(i, r);
    return o !== -1 && o === r;
  },
  Ml = (s) => {
    if (!s) return null;
    if (Gn(s)) return s;
    let i = s.length;
    if (!vs(i)) return null;
    const r = new Array(i);
    for (; i-- > 0; ) r[i] = s[i];
    return r;
  },
  Il = (
    (s) => (i) =>
      s && i instanceof s
  )(typeof Uint8Array < "u" && Xi(Uint8Array)),
  Fl = (s, i) => {
    const o = (s && s[Xr]).call(s);
    let e;
    for (; (e = o.next()) && !e.done; ) {
      const n = e.value;
      i.call(s, n[0], n[1]);
    }
  },
  Hl = (s, i) => {
    let r;
    const o = [];
    for (; (r = s.exec(i)) !== null; ) o.push(r);
    return o;
  },
  ql = Ct("HTMLFormElement"),
  $l = (s) =>
    s.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (r, o, e) {
      return o.toUpperCase() + e;
    }),
  jo = (
    ({ hasOwnProperty: s }) =>
    (i, r) =>
      s.call(i, r)
  )(Object.prototype),
  zl = Ct("RegExp"),
  bs = (s, i) => {
    const r = Object.getOwnPropertyDescriptors(s),
      o = {};
    fr(r, (e, n) => {
      let l;
      (l = i(e, n, s)) !== !1 && (o[n] = l || e);
    }),
      Object.defineProperties(s, o);
  },
  Bl = (s) => {
    bs(s, (i, r) => {
      if (st(s) && ["arguments", "caller", "callee"].indexOf(r) !== -1)
        return !1;
      const o = s[r];
      if (st(o)) {
        if (((i.enumerable = !1), "writable" in i)) {
          i.writable = !1;
          return;
        }
        i.set ||
          (i.set = () => {
            throw Error("Can not rewrite read-only method '" + r + "'");
          });
      }
    });
  },
  Wl = (s, i) => {
    const r = {},
      o = (e) => {
        e.forEach((n) => {
          r[n] = !0;
        });
      };
    return Gn(s) ? o(s) : o(String(s).split(i)), r;
  },
  Ul = () => {},
  Vl = (s, i) => (s != null && Number.isFinite((s = +s)) ? s : i);

function Gl(s) {
  return !!(s && st(s.append) && s[gs] === "FormData" && s[Xr]);
}
const Xl = (s) => {
    const i = new Array(10),
      r = (o, e) => {
        if (cr(o)) {
          if (i.indexOf(o) >= 0) return;
          if (ur(o)) return o;
          if (!("toJSON" in o)) {
            i[e] = o;
            const n = Gn(o) ? [] : {};
            return (
              fr(o, (l, d) => {
                const p = r(l, e + 1);
                !sr(p) && (n[d] = p);
              }),
              (i[e] = void 0),
              n
            );
          }
        }
        return o;
      };
    return r(s, 0);
  },
  Yl = Ct("AsyncFunction"),
  Jl = (s) => s && (cr(s) || st(s)) && st(s.then) && st(s.catch),
  Ts = ((s, i) =>
    s
      ? setImmediate
      : i
      ? ((r, o) => (
          On.addEventListener(
            "message",
            ({ source: e, data: n }) => {
              e === On && n === r && o.length && o.shift()();
            },
            !1
          ),
          (e) => {
            o.push(e), On.postMessage(r, "*");
          }
        ))(`axios@${Math.random()}`, [])
      : (r) => setTimeout(r))(
    typeof setImmediate == "function",
    st(On.postMessage)
  ),
  Kl =
    typeof queueMicrotask < "u"
      ? queueMicrotask.bind(On)
      : (typeof process < "u" && process.nextTick) || Ts,
  Ql = (s) => s != null && st(s[Xr]),
  D = {
    isArray: Gn,
    isArrayBuffer: ms,
    isBuffer: ur,
    isFormData: _l,
    isArrayBufferView: gl,
    isString: ml,
    isNumber: vs,
    isBoolean: vl,
    isObject: cr,
    isPlainObject: Ar,
    isEmptyObject: yl,
    isReadableStream: Cl,
    isRequest: El,
    isResponse: Al,
    isHeaders: Pl,
    isUndefined: sr,
    isDate: wl,
    isFile: bl,
    isBlob: Tl,
    isRegExp: zl,
    isFunction: st,
    isStream: kl,
    isURLSearchParams: xl,
    isTypedArray: Il,
    isFileList: Sl,
    forEach: fr,
    merge: ji,
    extend: Rl,
    trim: Ol,
    stripBOM: Nl,
    inherits: Ll,
    toFlatObject: jl,
    kindOf: Yr,
    kindOfTest: Ct,
    endsWith: Dl,
    toArray: Ml,
    forEachEntry: Fl,
    matchAll: Hl,
    isHTMLForm: ql,
    hasOwnProperty: jo,
    hasOwnProp: jo,
    reduceDescriptors: bs,
    freezeMethods: Bl,
    toObjectSet: Wl,
    toCamelCase: $l,
    noop: Ul,
    toFiniteNumber: Vl,
    findKey: ys,
    global: On,
    isContextDefined: ws,
    isSpecCompliantForm: Gl,
    toJSONObject: Xl,
    isAsyncFn: Yl,
    isThenable: Jl,
    setImmediate: Ts,
    asap: Kl,
    isIterable: Ql,
  };

function Te(s, i, r, o, e) {
  Error.call(this),
    Error.captureStackTrace
      ? Error.captureStackTrace(this, this.constructor)
      : (this.stack = new Error().stack),
    (this.message = s),
    (this.name = "AxiosError"),
    i && (this.code = i),
    r && (this.config = r),
    o && (this.request = o),
    e && ((this.response = e), (this.status = e.status ? e.status : null));
}
D.inherits(Te, Error, {
  toJSON: function () {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: D.toJSONObject(this.config),
      code: this.code,
      status: this.status,
    };
  },
});
const Ss = Te.prototype,
  ks = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL",
].forEach((s) => {
  ks[s] = {
    value: s,
  };
});
Object.defineProperties(Te, ks);
Object.defineProperty(Ss, "isAxiosError", {
  value: !0,
});
Te.from = (s, i, r, o, e, n) => {
  const l = Object.create(Ss);
  return (
    D.toFlatObject(
      s,
      l,
      function (p) {
        return p !== Error.prototype;
      },
      (d) => d !== "isAxiosError"
    ),
    Te.call(l, s.message, i, r, o, e),
    (l.cause = s),
    (l.name = s.name),
    n && Object.assign(l, n),
    l
  );
};
const Zl = null;

function Di(s) {
  return D.isPlainObject(s) || D.isArray(s);
}

function _s(s) {
  return D.endsWith(s, "[]") ? s.slice(0, -2) : s;
}

function Do(s, i, r) {
  return s
    ? s
        .concat(i)
        .map(function (e, n) {
          return (e = _s(e)), !r && n ? "[" + e + "]" : e;
        })
        .join(r ? "." : "")
    : i;
}

function eu(s) {
  return D.isArray(s) && !s.some(Di);
}
const tu = D.toFlatObject(D, {}, null, function (i) {
  return /^is[A-Z]/.test(i);
});

function Kr(s, i, r) {
  if (!D.isObject(s)) throw new TypeError("target must be an object");
  (i = i || new FormData()),
    (r = D.toFlatObject(
      r,
      {
        metaTokens: !0,
        dots: !1,
        indexes: !1,
      },
      !1,
      function (M, V) {
        return !D.isUndefined(V[M]);
      }
    ));
  const o = r.metaTokens,
    e = r.visitor || T,
    n = r.dots,
    l = r.indexes,
    p = (r.Blob || (typeof Blob < "u" && Blob)) && D.isSpecCompliantForm(i);
  if (!D.isFunction(e)) throw new TypeError("visitor must be a function");

  function v(N) {
    if (N === null) return "";
    if (D.isDate(N)) return N.toISOString();
    if (D.isBoolean(N)) return N.toString();
    if (!p && D.isBlob(N))
      throw new Te("Blob is not supported. Use a Buffer instead.");
    return D.isArrayBuffer(N) || D.isTypedArray(N)
      ? p && typeof Blob == "function"
        ? new Blob([N])
        : Buffer.from(N)
      : N;
  }

  function T(N, M, V) {
    let Y = N;
    if (N && !V && typeof N == "object") {
      if (D.endsWith(M, "{}"))
        (M = o ? M : M.slice(0, -2)), (N = JSON.stringify(N));
      else if (
        (D.isArray(N) && eu(N)) ||
        ((D.isFileList(N) || D.endsWith(M, "[]")) && (Y = D.toArray(N)))
      )
        return (
          (M = _s(M)),
          Y.forEach(function (z, J) {
            !(D.isUndefined(z) || z === null) &&
              i.append(
                l === !0 ? Do([M], J, n) : l === null ? M : M + "[]",
                v(z)
              );
          }),
          !1
        );
    }
    return Di(N) ? !0 : (i.append(Do(V, M, n), v(N)), !1);
  }
  const P = [],
    E = Object.assign(tu, {
      defaultVisitor: T,
      convertValue: v,
      isVisitable: Di,
    });

  function q(N, M) {
    if (!D.isUndefined(N)) {
      if (P.indexOf(N) !== -1)
        throw Error("Circular reference detected in " + M.join("."));
      P.push(N),
        D.forEach(N, function (Y, X) {
          (!(D.isUndefined(Y) || Y === null) &&
            e.call(i, Y, D.isString(X) ? X.trim() : X, M, E)) === !0 &&
            q(Y, M ? M.concat(X) : [X]);
        }),
        P.pop();
    }
  }
  if (!D.isObject(s)) throw new TypeError("data must be an object");
  return q(s), i;
}

function Mo(s) {
  const i = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0",
  };
  return encodeURIComponent(s).replace(/[!'()~]|%20|%00/g, function (o) {
    return i[o];
  });
}

function Yi(s, i) {
  (this._pairs = []), s && Kr(s, this, i);
}
const xs = Yi.prototype;
xs.append = function (i, r) {
  this._pairs.push([i, r]);
};
xs.toString = function (i) {
  const r = i
    ? function (o) {
        return i.call(this, o, Mo);
      }
    : Mo;
  return this._pairs
    .map(function (e) {
      return r(e[0]) + "=" + r(e[1]);
    }, "")
    .join("&");
};

function nu(s) {
  return encodeURIComponent(s)
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+")
    .replace(/%5B/gi, "[")
    .replace(/%5D/gi, "]");
}

function Cs(s, i, r) {
  if (!i) return s;
  const o = (r && r.encode) || nu;
  D.isFunction(r) &&
    (r = {
      serialize: r,
    });
  const e = r && r.serialize;
  let n;
  if (
    (e
      ? (n = e(i, r))
      : (n = D.isURLSearchParams(i) ? i.toString() : new Yi(i, r).toString(o)),
    n)
  ) {
    const l = s.indexOf("#");
    l !== -1 && (s = s.slice(0, l)),
      (s += (s.indexOf("?") === -1 ? "?" : "&") + n);
  }
  return s;
}
class Io {
  constructor() {
    this.handlers = [];
  }
  use(i, r, o) {
    return (
      this.handlers.push({
        fulfilled: i,
        rejected: r,
        synchronous: o ? o.synchronous : !1,
        runWhen: o ? o.runWhen : null,
      }),
      this.handlers.length - 1
    );
  }
  eject(i) {
    this.handlers[i] && (this.handlers[i] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(i) {
    D.forEach(this.handlers, function (o) {
      o !== null && i(o);
    });
  }
}
const Es = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
  },
  ru = typeof URLSearchParams < "u" ? URLSearchParams : Yi,
  iu = typeof FormData < "u" ? FormData : null,
  ou = typeof Blob < "u" ? Blob : null,
  su = {
    isBrowser: !0,
    classes: {
      URLSearchParams: ru,
      FormData: iu,
      Blob: ou,
    },
    protocols: ["http", "https", "file", "blob", "url", "data"],
  },
  Ji = typeof window < "u" && typeof document < "u",
  Mi = (typeof navigator == "object" && navigator) || void 0,
  au =
    Ji &&
    (!Mi || ["ReactNative", "NativeScript", "NS"].indexOf(Mi.product) < 0),
  lu =
    typeof WorkerGlobalScope < "u" &&
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts == "function",
  uu = (Ji && window.location.href) || "http://localhost",
  cu = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        hasBrowserEnv: Ji,
        hasStandardBrowserEnv: au,
        hasStandardBrowserWebWorkerEnv: lu,
        navigator: Mi,
        origin: uu,
      },
      Symbol.toStringTag,
      {
        value: "Module",
      }
    )
  ),
  Ze = {
    ...cu,
    ...su,
  };

function fu(s, i) {
  return Kr(s, new Ze.classes.URLSearchParams(), {
    visitor: function (r, o, e, n) {
      return Ze.isNode && D.isBuffer(r)
        ? (this.append(o, r.toString("base64")), !1)
        : n.defaultVisitor.apply(this, arguments);
    },
    ...i,
  });
}

function du(s) {
  return D.matchAll(/\w+|\[(\w*)]/g, s).map((i) =>
    i[0] === "[]" ? "" : i[1] || i[0]
  );
}

function hu(s) {
  const i = {},
    r = Object.keys(s);
  let o;
  const e = r.length;
  let n;
  for (o = 0; o < e; o++) (n = r[o]), (i[n] = s[n]);
  return i;
}

function As(s) {
  function i(r, o, e, n) {
    let l = r[n++];
    if (l === "__proto__") return !0;
    const d = Number.isFinite(+l),
      p = n >= r.length;
    return (
      (l = !l && D.isArray(e) ? e.length : l),
      p
        ? (D.hasOwnProp(e, l) ? (e[l] = [e[l], o]) : (e[l] = o), !d)
        : ((!e[l] || !D.isObject(e[l])) && (e[l] = []),
          i(r, o, e[l], n) && D.isArray(e[l]) && (e[l] = hu(e[l])),
          !d)
    );
  }
  if (D.isFormData(s) && D.isFunction(s.entries)) {
    const r = {};
    return (
      D.forEachEntry(s, (o, e) => {
        i(du(o), e, r, 0);
      }),
      r
    );
  }
  return null;
}

function pu(s, i, r) {
  if (D.isString(s))
    try {
      return (i || JSON.parse)(s), D.trim(s);
    } catch (o) {
      if (o.name !== "SyntaxError") throw o;
    }
  return (r || JSON.stringify)(s);
}
const dr = {
  transitional: Es,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [
    function (i, r) {
      const o = r.getContentType() || "",
        e = o.indexOf("application/json") > -1,
        n = D.isObject(i);
      if ((n && D.isHTMLForm(i) && (i = new FormData(i)), D.isFormData(i)))
        return e ? JSON.stringify(As(i)) : i;
      if (
        D.isArrayBuffer(i) ||
        D.isBuffer(i) ||
        D.isStream(i) ||
        D.isFile(i) ||
        D.isBlob(i) ||
        D.isReadableStream(i)
      )
        return i;
      if (D.isArrayBufferView(i)) return i.buffer;
      if (D.isURLSearchParams(i))
        return (
          r.setContentType(
            "application/x-www-form-urlencoded;charset=utf-8",
            !1
          ),
          i.toString()
        );
      let d;
      if (n) {
        if (o.indexOf("application/x-www-form-urlencoded") > -1)
          return fu(i, this.formSerializer).toString();
        if ((d = D.isFileList(i)) || o.indexOf("multipart/form-data") > -1) {
          const p = this.env && this.env.FormData;
          return Kr(
            d
              ? {
                  "files[]": i,
                }
              : i,
            p && new p(),
            this.formSerializer
          );
        }
      }
      return n || e ? (r.setContentType("application/json", !1), pu(i)) : i;
    },
  ],
  transformResponse: [
    function (i) {
      const r = this.transitional || dr.transitional,
        o = r && r.forcedJSONParsing,
        e = this.responseType === "json";
      if (D.isResponse(i) || D.isReadableStream(i)) return i;
      if (i && D.isString(i) && ((o && !this.responseType) || e)) {
        const l = !(r && r.silentJSONParsing) && e;
        try {
          return JSON.parse(i);
        } catch (d) {
          if (l)
            throw d.name === "SyntaxError"
              ? Te.from(d, Te.ERR_BAD_RESPONSE, this, null, this.response)
              : d;
        }
      }
      return i;
    },
  ],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: Ze.classes.FormData,
    Blob: Ze.classes.Blob,
  },
  validateStatus: function (i) {
    return i >= 200 && i < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0,
    },
  },
};
D.forEach(["delete", "get", "head", "post", "put", "patch"], (s) => {
  dr.headers[s] = {};
});
const gu = D.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent",
  ]),
  mu = (s) => {
    const i = {};
    let r, o, e;
    return (
      s &&
        s
          .split(
            `
`
          )
          .forEach(function (l) {
            (e = l.indexOf(":")),
              (r = l.substring(0, e).trim().toLowerCase()),
              (o = l.substring(e + 1).trim()),
              !(!r || (i[r] && gu[r])) &&
                (r === "set-cookie"
                  ? i[r]
                    ? i[r].push(o)
                    : (i[r] = [o])
                  : (i[r] = i[r] ? i[r] + ", " + o : o));
          }),
      i
    );
  },
  Fo = Symbol("internals");

function rr(s) {
  return s && String(s).trim().toLowerCase();
}

function Pr(s) {
  return s === !1 || s == null ? s : D.isArray(s) ? s.map(Pr) : String(s);
}

function vu(s) {
  const i = Object.create(null),
    r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let o;
  for (; (o = r.exec(s)); ) i[o[1]] = o[2];
  return i;
}
const yu = (s) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(s.trim());

function xi(s, i, r, o, e) {
  if (D.isFunction(o)) return o.call(this, i, r);
  if ((e && (i = r), !!D.isString(i))) {
    if (D.isString(o)) return i.indexOf(o) !== -1;
    if (D.isRegExp(o)) return o.test(i);
  }
}

function wu(s) {
  return s
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (i, r, o) => r.toUpperCase() + o);
}

function bu(s, i) {
  const r = D.toCamelCase(" " + i);
  ["get", "set", "has"].forEach((o) => {
    Object.defineProperty(s, o + r, {
      value: function (e, n, l) {
        return this[o].call(this, i, e, n, l);
      },
      configurable: !0,
    });
  });
}
let at = class {
  constructor(i) {
    i && this.set(i);
  }
  set(i, r, o) {
    const e = this;

    function n(d, p, v) {
      const T = rr(p);
      if (!T) throw new Error("header name must be a non-empty string");
      const P = D.findKey(e, T);
      (!P || e[P] === void 0 || v === !0 || (v === void 0 && e[P] !== !1)) &&
        (e[P || p] = Pr(d));
    }
    const l = (d, p) => D.forEach(d, (v, T) => n(v, T, p));
    if (D.isPlainObject(i) || i instanceof this.constructor) l(i, r);
    else if (D.isString(i) && (i = i.trim()) && !yu(i)) l(mu(i), r);
    else if (D.isObject(i) && D.isIterable(i)) {
      let d = {},
        p,
        v;
      for (const T of i) {
        if (!D.isArray(T))
          throw TypeError("Object iterator must return a key-value pair");
        d[(v = T[0])] = (p = d[v])
          ? D.isArray(p)
            ? [...p, T[1]]
            : [p, T[1]]
          : T[1];
      }
      l(d, r);
    } else i != null && n(r, i, o);
    return this;
  }
  get(i, r) {
    if (((i = rr(i)), i)) {
      const o = D.findKey(this, i);
      if (o) {
        const e = this[o];
        if (!r) return e;
        if (r === !0) return vu(e);
        if (D.isFunction(r)) return r.call(this, e, o);
        if (D.isRegExp(r)) return r.exec(e);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(i, r) {
    if (((i = rr(i)), i)) {
      const o = D.findKey(this, i);
      return !!(o && this[o] !== void 0 && (!r || xi(this, this[o], o, r)));
    }
    return !1;
  }
  delete(i, r) {
    const o = this;
    let e = !1;

    function n(l) {
      if (((l = rr(l)), l)) {
        const d = D.findKey(o, l);
        d && (!r || xi(o, o[d], d, r)) && (delete o[d], (e = !0));
      }
    }
    return D.isArray(i) ? i.forEach(n) : n(i), e;
  }
  clear(i) {
    const r = Object.keys(this);
    let o = r.length,
      e = !1;
    for (; o--; ) {
      const n = r[o];
      (!i || xi(this, this[n], n, i, !0)) && (delete this[n], (e = !0));
    }
    return e;
  }
  normalize(i) {
    const r = this,
      o = {};
    return (
      D.forEach(this, (e, n) => {
        const l = D.findKey(o, n);
        if (l) {
          (r[l] = Pr(e)), delete r[n];
          return;
        }
        const d = i ? wu(n) : String(n).trim();
        d !== n && delete r[n], (r[d] = Pr(e)), (o[d] = !0);
      }),
      this
    );
  }
  concat(...i) {
    return this.constructor.concat(this, ...i);
  }
  toJSON(i) {
    const r = Object.create(null);
    return (
      D.forEach(this, (o, e) => {
        o != null && o !== !1 && (r[e] = i && D.isArray(o) ? o.join(", ") : o);
      }),
      r
    );
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([i, r]) => i + ": " + r).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(i) {
    return i instanceof this ? i : new this(i);
  }
  static concat(i, ...r) {
    const o = new this(i);
    return r.forEach((e) => o.set(e)), o;
  }
  static accessor(i) {
    const o = (this[Fo] = this[Fo] =
        {
          accessors: {},
        }).accessors,
      e = this.prototype;

    function n(l) {
      const d = rr(l);
      o[d] || (bu(e, l), (o[d] = !0));
    }
    return D.isArray(i) ? i.forEach(n) : n(i), this;
  }
};
at.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization",
]);
D.reduceDescriptors(at.prototype, ({ value: s }, i) => {
  let r = i[0].toUpperCase() + i.slice(1);
  return {
    get: () => s,
    set(o) {
      this[r] = o;
    },
  };
});
D.freezeMethods(at);

function Ci(s, i) {
  const r = this || dr,
    o = i || r,
    e = at.from(o.headers);
  let n = o.data;
  return (
    D.forEach(s, function (d) {
      n = d.call(r, n, e.normalize(), i ? i.status : void 0);
    }),
    e.normalize(),
    n
  );
}

function Ps(s) {
  return !!(s && s.__CANCEL__);
}

function Xn(s, i, r) {
  Te.call(this, s ?? "canceled", Te.ERR_CANCELED, i, r),
    (this.name = "CanceledError");
}
D.inherits(Xn, Te, {
  __CANCEL__: !0,
});

function Os(s, i, r) {
  const o = r.config.validateStatus;
  !r.status || !o || o(r.status)
    ? s(r)
    : i(
        new Te(
          "Request failed with status code " + r.status,
          [Te.ERR_BAD_REQUEST, Te.ERR_BAD_RESPONSE][
            Math.floor(r.status / 100) - 4
          ],
          r.config,
          r.request,
          r
        )
      );
}

function Tu(s) {
  const i = /^([-+\w]{1,25})(:?\/\/|:)/.exec(s);
  return (i && i[1]) || "";
}

function Su(s, i) {
  s = s || 10;
  const r = new Array(s),
    o = new Array(s);
  let e = 0,
    n = 0,
    l;
  return (
    (i = i !== void 0 ? i : 1e3),
    function (p) {
      const v = Date.now(),
        T = o[n];
      l || (l = v), (r[e] = p), (o[e] = v);
      let P = n,
        E = 0;
      for (; P !== e; ) (E += r[P++]), (P = P % s);
      if (((e = (e + 1) % s), e === n && (n = (n + 1) % s), v - l < i)) return;
      const q = T && v - T;
      return q ? Math.round((E * 1e3) / q) : void 0;
    }
  );
}

function ku(s, i) {
  let r = 0,
    o = 1e3 / i,
    e,
    n;
  const l = (v, T = Date.now()) => {
    (r = T), (e = null), n && (clearTimeout(n), (n = null)), s(...v);
  };
  return [
    (...v) => {
      const T = Date.now(),
        P = T - r;
      P >= o
        ? l(v, T)
        : ((e = v),
          n ||
            (n = setTimeout(() => {
              (n = null), l(e);
            }, o - P)));
    },
    () => e && l(e),
  ];
}
const $r = (s, i, r = 3) => {
    let o = 0;
    const e = Su(50, 250);
    return ku((n) => {
      const l = n.loaded,
        d = n.lengthComputable ? n.total : void 0,
        p = l - o,
        v = e(p),
        T = l <= d;
      o = l;
      const P = {
        loaded: l,
        total: d,
        progress: d ? l / d : void 0,
        bytes: p,
        rate: v || void 0,
        estimated: v && d && T ? (d - l) / v : void 0,
        event: n,
        lengthComputable: d != null,
        [i ? "download" : "upload"]: !0,
      };
      s(P);
    }, r);
  },
  Ho = (s, i) => {
    const r = s != null;
    return [
      (o) =>
        i[0]({
          lengthComputable: r,
          total: s,
          loaded: o,
        }),
      i[1],
    ];
  },
  qo =
    (s) =>
    (...i) =>
      D.asap(() => s(...i)),
  _u = Ze.hasStandardBrowserEnv
    ? ((s, i) => (r) => (
        (r = new URL(r, Ze.origin)),
        s.protocol === r.protocol &&
          s.host === r.host &&
          (i || s.port === r.port)
      ))(
        new URL(Ze.origin),
        Ze.navigator && /(msie|trident)/i.test(Ze.navigator.userAgent)
      )
    : () => !0,
  xu = Ze.hasStandardBrowserEnv
    ? {
        write(s, i, r, o, e, n) {
          const l = [s + "=" + encodeURIComponent(i)];
          D.isNumber(r) && l.push("expires=" + new Date(r).toGMTString()),
            D.isString(o) && l.push("path=" + o),
            D.isString(e) && l.push("domain=" + e),
            n === !0 && l.push("secure"),
            (document.cookie = l.join("; "));
        },
        read(s) {
          const i = document.cookie.match(
            new RegExp("(^|;\\s*)(" + s + ")=([^;]*)")
          );
          return i ? decodeURIComponent(i[3]) : null;
        },
        remove(s) {
          this.write(s, "", Date.now() - 864e5);
        },
      }
    : {
        write() {},
        read() {
          return null;
        },
        remove() {},
      };

function Cu(s) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(s);
}

function Eu(s, i) {
  return i ? s.replace(/\/?\/$/, "") + "/" + i.replace(/^\/+/, "") : s;
}

function Rs(s, i, r) {
  let o = !Cu(i);
  return s && (o || r == !1) ? Eu(s, i) : i;
}
const $o = (s) =>
  s instanceof at
    ? {
        ...s,
      }
    : s;

function Nn(s, i) {
  i = i || {};
  const r = {};

  function o(v, T, P, E) {
    return D.isPlainObject(v) && D.isPlainObject(T)
      ? D.merge.call(
          {
            caseless: E,
          },
          v,
          T
        )
      : D.isPlainObject(T)
      ? D.merge({}, T)
      : D.isArray(T)
      ? T.slice()
      : T;
  }

  function e(v, T, P, E) {
    if (D.isUndefined(T)) {
      if (!D.isUndefined(v)) return o(void 0, v, P, E);
    } else return o(v, T, P, E);
  }

  function n(v, T) {
    if (!D.isUndefined(T)) return o(void 0, T);
  }

  function l(v, T) {
    if (D.isUndefined(T)) {
      if (!D.isUndefined(v)) return o(void 0, v);
    } else return o(void 0, T);
  }

  function d(v, T, P) {
    if (P in i) return o(v, T);
    if (P in s) return o(void 0, v);
  }
  const p = {
    url: n,
    method: n,
    data: n,
    baseURL: l,
    transformRequest: l,
    transformResponse: l,
    paramsSerializer: l,
    timeout: l,
    timeoutMessage: l,
    withCredentials: l,
    withXSRFToken: l,
    adapter: l,
    responseType: l,
    xsrfCookieName: l,
    xsrfHeaderName: l,
    onUploadProgress: l,
    onDownloadProgress: l,
    decompress: l,
    maxContentLength: l,
    maxBodyLength: l,
    beforeRedirect: l,
    transport: l,
    httpAgent: l,
    httpsAgent: l,
    cancelToken: l,
    socketPath: l,
    responseEncoding: l,
    validateStatus: d,
    headers: (v, T, P) => e($o(v), $o(T), P, !0),
  };
  return (
    D.forEach(
      Object.keys({
        ...s,
        ...i,
      }),
      function (T) {
        const P = p[T] || e,
          E = P(s[T], i[T], T);
        (D.isUndefined(E) && P !== d) || (r[T] = E);
      }
    ),
    r
  );
}
const Ns = (s) => {
    const i = Nn({}, s);
    let {
      data: r,
      withXSRFToken: o,
      xsrfHeaderName: e,
      xsrfCookieName: n,
      headers: l,
      auth: d,
    } = i;
    (i.headers = l = at.from(l)),
      (i.url = Cs(
        Rs(i.baseURL, i.url, i.allowAbsoluteUrls),
        s.params,
        s.paramsSerializer
      )),
      d &&
        l.set(
          "Authorization",
          "Basic " +
            btoa(
              (d.username || "") +
                ":" +
                (d.password ? unescape(encodeURIComponent(d.password)) : "")
            )
        );
    let p;
    if (D.isFormData(r)) {
      if (Ze.hasStandardBrowserEnv || Ze.hasStandardBrowserWebWorkerEnv)
        l.setContentType(void 0);
      else if ((p = l.getContentType()) !== !1) {
        const [v, ...T] = p
          ? p
              .split(";")
              .map((P) => P.trim())
              .filter(Boolean)
          : [];
        l.setContentType([v || "multipart/form-data", ...T].join("; "));
      }
    }
    if (
      Ze.hasStandardBrowserEnv &&
      (o && D.isFunction(o) && (o = o(i)), o || (o !== !1 && _u(i.url)))
    ) {
      const v = e && n && xu.read(n);
      v && l.set(e, v);
    }
    return i;
  },
  Au = typeof XMLHttpRequest < "u",
  Pu =
    Au &&
    function (s) {
      return new Promise(function (r, o) {
        const e = Ns(s);
        let n = e.data;
        const l = at.from(e.headers).normalize();
        let { responseType: d, onUploadProgress: p, onDownloadProgress: v } = e,
          T,
          P,
          E,
          q,
          N;

        function M() {
          q && q(),
            N && N(),
            e.cancelToken && e.cancelToken.unsubscribe(T),
            e.signal && e.signal.removeEventListener("abort", T);
        }
        let V = new XMLHttpRequest();
        V.open(e.method.toUpperCase(), e.url, !0), (V.timeout = e.timeout);

        function Y() {
          if (!V) return;
          const z = at.from(
              "getAllResponseHeaders" in V && V.getAllResponseHeaders()
            ),
            K = {
              data:
                !d || d === "text" || d === "json"
                  ? V.responseText
                  : V.response,
              status: V.status,
              statusText: V.statusText,
              headers: z,
              config: s,
              request: V,
            };
          Os(
            function (Se) {
              r(Se), M();
            },
            function (Se) {
              o(Se), M();
            },
            K
          ),
            (V = null);
        }
        "onloadend" in V
          ? (V.onloadend = Y)
          : (V.onreadystatechange = function () {
              !V ||
                V.readyState !== 4 ||
                (V.status === 0 &&
                  !(V.responseURL && V.responseURL.indexOf("file:") === 0)) ||
                setTimeout(Y);
            }),
          (V.onabort = function () {
            V &&
              (o(new Te("Request aborted", Te.ECONNABORTED, s, V)), (V = null));
          }),
          (V.onerror = function () {
            o(new Te("Network Error", Te.ERR_NETWORK, s, V)), (V = null);
          }),
          (V.ontimeout = function () {
            let J = e.timeout
              ? "timeout of " + e.timeout + "ms exceeded"
              : "timeout exceeded";
            const K = e.transitional || Es;
            e.timeoutErrorMessage && (J = e.timeoutErrorMessage),
              o(
                new Te(
                  J,
                  K.clarifyTimeoutError ? Te.ETIMEDOUT : Te.ECONNABORTED,
                  s,
                  V
                )
              ),
              (V = null);
          }),
          n === void 0 && l.setContentType(null),
          "setRequestHeader" in V &&
            D.forEach(l.toJSON(), function (J, K) {
              V.setRequestHeader(K, J);
            }),
          D.isUndefined(e.withCredentials) ||
            (V.withCredentials = !!e.withCredentials),
          d && d !== "json" && (V.responseType = e.responseType),
          v && (([E, N] = $r(v, !0)), V.addEventListener("progress", E)),
          p &&
            V.upload &&
            (([P, q] = $r(p)),
            V.upload.addEventListener("progress", P),
            V.upload.addEventListener("loadend", q)),
          (e.cancelToken || e.signal) &&
            ((T = (z) => {
              V &&
                (o(!z || z.type ? new Xn(null, s, V) : z),
                V.abort(),
                (V = null));
            }),
            e.cancelToken && e.cancelToken.subscribe(T),
            e.signal &&
              (e.signal.aborted ? T() : e.signal.addEventListener("abort", T)));
        const X = Tu(e.url);
        if (X && Ze.protocols.indexOf(X) === -1) {
          o(new Te("Unsupported protocol " + X + ":", Te.ERR_BAD_REQUEST, s));
          return;
        }
        V.send(n || null);
      });
    },
  Ou = (s, i) => {
    const { length: r } = (s = s ? s.filter(Boolean) : []);
    if (i || r) {
      let o = new AbortController(),
        e;
      const n = function (v) {
        if (!e) {
          (e = !0), d();
          const T = v instanceof Error ? v : this.reason;
          o.abort(
            T instanceof Te ? T : new Xn(T instanceof Error ? T.message : T)
          );
        }
      };
      let l =
        i &&
        setTimeout(() => {
          (l = null), n(new Te(`timeout ${i} of ms exceeded`, Te.ETIMEDOUT));
        }, i);
      const d = () => {
        s &&
          (l && clearTimeout(l),
          (l = null),
          s.forEach((v) => {
            v.unsubscribe
              ? v.unsubscribe(n)
              : v.removeEventListener("abort", n);
          }),
          (s = null));
      };
      s.forEach((v) => v.addEventListener("abort", n));
      const { signal: p } = o;
      return (p.unsubscribe = () => D.asap(d)), p;
    }
  },
  Ru = function* (s, i) {
    let r = s.byteLength;
    if (r < i) {
      yield s;
      return;
    }
    let o = 0,
      e;
    for (; o < r; ) (e = o + i), yield s.slice(o, e), (o = e);
  },
  Nu = async function* (s, i) {
    for await (const r of Lu(s)) yield* Ru(r, i);
  },
  Lu = async function* (s) {
    if (s[Symbol.asyncIterator]) {
      yield* s;
      return;
    }
    const i = s.getReader();
    try {
      for (;;) {
        const { done: r, value: o } = await i.read();
        if (r) break;
        yield o;
      }
    } finally {
      await i.cancel();
    }
  },
  zo = (s, i, r, o) => {
    const e = Nu(s, i);
    let n = 0,
      l,
      d = (p) => {
        l || ((l = !0), o && o(p));
      };
    return new ReadableStream(
      {
        async pull(p) {
          try {
            const { done: v, value: T } = await e.next();
            if (v) {
              d(), p.close();
              return;
            }
            let P = T.byteLength;
            if (r) {
              let E = (n += P);
              r(E);
            }
            p.enqueue(new Uint8Array(T));
          } catch (v) {
            throw (d(v), v);
          }
        },
        cancel(p) {
          return d(p), e.return();
        },
      },
      {
        highWaterMark: 2,
      }
    );
  },
  Qr =
    typeof fetch == "function" &&
    typeof Request == "function" &&
    typeof Response == "function",
  Ls = Qr && typeof ReadableStream == "function",
  ju =
    Qr &&
    (typeof TextEncoder == "function"
      ? (
          (s) => (i) =>
            s.encode(i)
        )(new TextEncoder())
      : async (s) => new Uint8Array(await new Response(s).arrayBuffer())),
  js = (s, ...i) => {
    try {
      return !!s(...i);
    } catch {
      return !1;
    }
  },
  Du =
    Ls &&
    js(() => {
      let s = !1;
      const i = new Request(Ze.origin, {
        body: new ReadableStream(),
        method: "POST",
        get duplex() {
          return (s = !0), "half";
        },
      }).headers.has("Content-Type");
      return s && !i;
    }),
  Bo = 64 * 1024,
  Ii = Ls && js(() => D.isReadableStream(new Response("").body)),
  zr = {
    stream: Ii && ((s) => s.body),
  };
Qr &&
  ((s) => {
    ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((i) => {
      !zr[i] &&
        (zr[i] = D.isFunction(s[i])
          ? (r) => r[i]()
          : (r, o) => {
              throw new Te(
                `Response type '${i}' is not supported`,
                Te.ERR_NOT_SUPPORT,
                o
              );
            });
    });
  })(new Response());
const Mu = async (s) => {
    if (s == null) return 0;
    if (D.isBlob(s)) return s.size;
    if (D.isSpecCompliantForm(s))
      return (
        await new Request(Ze.origin, {
          method: "POST",
          body: s,
        }).arrayBuffer()
      ).byteLength;
    if (D.isArrayBufferView(s) || D.isArrayBuffer(s)) return s.byteLength;
    if ((D.isURLSearchParams(s) && (s = s + ""), D.isString(s)))
      return (await ju(s)).byteLength;
  },
  Iu = async (s, i) => {
    const r = D.toFiniteNumber(s.getContentLength());
    return r ?? Mu(i);
  },
  Fu =
    Qr &&
    (async (s) => {
      let {
        url: i,
        method: r,
        data: o,
        signal: e,
        cancelToken: n,
        timeout: l,
        onDownloadProgress: d,
        onUploadProgress: p,
        responseType: v,
        headers: T,
        withCredentials: P = "same-origin",
        fetchOptions: E,
      } = Ns(s);
      v = v ? (v + "").toLowerCase() : "text";
      let q = Ou([e, n && n.toAbortSignal()], l),
        N;
      const M =
        q &&
        q.unsubscribe &&
        (() => {
          q.unsubscribe();
        });
      let V;
      try {
        if (
          p &&
          Du &&
          r !== "get" &&
          r !== "head" &&
          (V = await Iu(T, o)) !== 0
        ) {
          let K = new Request(i, {
              method: "POST",
              body: o,
              duplex: "half",
            }),
            f;
          if (
            (D.isFormData(o) &&
              (f = K.headers.get("content-type")) &&
              T.setContentType(f),
            K.body)
          ) {
            const [Se, ne] = Ho(V, $r(qo(p)));
            o = zo(K.body, Bo, Se, ne);
          }
        }
        D.isString(P) || (P = P ? "include" : "omit");
        const Y = "credentials" in Request.prototype;
        N = new Request(i, {
          ...E,
          signal: q,
          method: r.toUpperCase(),
          headers: T.normalize().toJSON(),
          body: o,
          duplex: "half",
          credentials: Y ? P : void 0,
        });
        let X = await fetch(N, E);
        const z = Ii && (v === "stream" || v === "response");
        if (Ii && (d || (z && M))) {
          const K = {};
          ["status", "statusText", "headers"].forEach((Ee) => {
            K[Ee] = X[Ee];
          });
          const f = D.toFiniteNumber(X.headers.get("content-length")),
            [Se, ne] = (d && Ho(f, $r(qo(d), !0))) || [];
          X = new Response(
            zo(X.body, Bo, Se, () => {
              ne && ne(), M && M();
            }),
            K
          );
        }
        v = v || "text";
        let J = await zr[D.findKey(zr, v) || "text"](X, s);
        return (
          !z && M && M(),
          await new Promise((K, f) => {
            Os(K, f, {
              data: J,
              headers: at.from(X.headers),
              status: X.status,
              statusText: X.statusText,
              config: s,
              request: N,
            });
          })
        );
      } catch (Y) {
        throw (
          (M && M(),
          Y && Y.name === "TypeError" && /Load failed|fetch/i.test(Y.message)
            ? Object.assign(new Te("Network Error", Te.ERR_NETWORK, s, N), {
                cause: Y.cause || Y,
              })
            : Te.from(Y, Y && Y.code, s, N))
        );
      }
    }),
  Fi = {
    http: Zl,
    xhr: Pu,
    fetch: Fu,
  };
D.forEach(Fi, (s, i) => {
  if (s) {
    try {
      Object.defineProperty(s, "name", {
        value: i,
      });
    } catch {}
    Object.defineProperty(s, "adapterName", {
      value: i,
    });
  }
});
const Wo = (s) => `- ${s}`,
  Hu = (s) => D.isFunction(s) || s === null || s === !1,
  Ds = {
    getAdapter: (s) => {
      s = D.isArray(s) ? s : [s];
      const { length: i } = s;
      let r, o;
      const e = {};
      for (let n = 0; n < i; n++) {
        r = s[n];
        let l;
        if (
          ((o = r),
          !Hu(r) && ((o = Fi[(l = String(r)).toLowerCase()]), o === void 0))
        )
          throw new Te(`Unknown adapter '${l}'`);
        if (o) break;
        e[l || "#" + n] = o;
      }
      if (!o) {
        const n = Object.entries(e).map(
          ([d, p]) =>
            `adapter ${d} ` +
            (p === !1
              ? "is not supported by the environment"
              : "is not available in the build")
        );
        let l = i
          ? n.length > 1
            ? `since :
` +
              n.map(Wo).join(`
`)
            : " " + Wo(n[0])
          : "as no adapter specified";
        throw new Te(
          "There is no suitable adapter to dispatch the request " + l,
          "ERR_NOT_SUPPORT"
        );
      }
      return o;
    },
    adapters: Fi,
  };

function Ei(s) {
  if (
    (s.cancelToken && s.cancelToken.throwIfRequested(),
    s.signal && s.signal.aborted)
  )
    throw new Xn(null, s);
}

function Uo(s) {
  return (
    Ei(s),
    (s.headers = at.from(s.headers)),
    (s.data = Ci.call(s, s.transformRequest)),
    ["post", "put", "patch"].indexOf(s.method) !== -1 &&
      s.headers.setContentType("application/x-www-form-urlencoded", !1),
    Ds.getAdapter(s.adapter || dr.adapter)(s).then(
      function (o) {
        return (
          Ei(s),
          (o.data = Ci.call(s, s.transformResponse, o)),
          (o.headers = at.from(o.headers)),
          o
        );
      },
      function (o) {
        return (
          Ps(o) ||
            (Ei(s),
            o &&
              o.response &&
              ((o.response.data = Ci.call(s, s.transformResponse, o.response)),
              (o.response.headers = at.from(o.response.headers)))),
          Promise.reject(o)
        );
      }
    )
  );
}
const Ms = "1.11.0",
  Zr = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(
  (s, i) => {
    Zr[s] = function (o) {
      return typeof o === s || "a" + (i < 1 ? "n " : " ") + s;
    };
  }
);
const Vo = {};
Zr.transitional = function (i, r, o) {
  function e(n, l) {
    return (
      "[Axios v" +
      Ms +
      "] Transitional option '" +
      n +
      "'" +
      l +
      (o ? ". " + o : "")
    );
  }
  return (n, l, d) => {
    if (i === !1)
      throw new Te(
        e(l, " has been removed" + (r ? " in " + r : "")),
        Te.ERR_DEPRECATED
      );
    return (
      r &&
        !Vo[l] &&
        ((Vo[l] = !0),
        console.warn(
          e(
            l,
            " has been deprecated since v" +
              r +
              " and will be removed in the near future"
          )
        )),
      i ? i(n, l, d) : !0
    );
  };
};
Zr.spelling = function (i) {
  return (r, o) => (console.warn(`${o} is likely a misspelling of ${i}`), !0);
};

function qu(s, i, r) {
  if (typeof s != "object")
    throw new Te("options must be an object", Te.ERR_BAD_OPTION_VALUE);
  const o = Object.keys(s);
  let e = o.length;
  for (; e-- > 0; ) {
    const n = o[e],
      l = i[n];
    if (l) {
      const d = s[n],
        p = d === void 0 || l(d, n, s);
      if (p !== !0)
        throw new Te("option " + n + " must be " + p, Te.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (r !== !0) throw new Te("Unknown option " + n, Te.ERR_BAD_OPTION);
  }
}
const Or = {
    assertOptions: qu,
    validators: Zr,
  },
  At = Or.validators;
let Rn = class {
  constructor(i) {
    (this.defaults = i || {}),
      (this.interceptors = {
        request: new Io(),
        response: new Io(),
      });
  }
  async request(i, r) {
    try {
      return await this._request(i, r);
    } catch (o) {
      if (o instanceof Error) {
        let e = {};
        Error.captureStackTrace
          ? Error.captureStackTrace(e)
          : (e = new Error());
        const n = e.stack ? e.stack.replace(/^.+\n/, "") : "";
        try {
          o.stack
            ? n &&
              !String(o.stack).endsWith(n.replace(/^.+\n.+\n/, "")) &&
              (o.stack +=
                `
` + n)
            : (o.stack = n);
        } catch {}
      }
      throw o;
    }
  }
  _request(i, r) {
    typeof i == "string" ? ((r = r || {}), (r.url = i)) : (r = i || {}),
      (r = Nn(this.defaults, r));
    const { transitional: o, paramsSerializer: e, headers: n } = r;
    o !== void 0 &&
      Or.assertOptions(
        o,
        {
          silentJSONParsing: At.transitional(At.boolean),
          forcedJSONParsing: At.transitional(At.boolean),
          clarifyTimeoutError: At.transitional(At.boolean),
        },
        !1
      ),
      e != null &&
        (D.isFunction(e)
          ? (r.paramsSerializer = {
              serialize: e,
            })
          : Or.assertOptions(
              e,
              {
                encode: At.function,
                serialize: At.function,
              },
              !0
            )),
      r.allowAbsoluteUrls !== void 0 ||
        (this.defaults.allowAbsoluteUrls !== void 0
          ? (r.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls)
          : (r.allowAbsoluteUrls = !0)),
      Or.assertOptions(
        r,
        {
          baseUrl: At.spelling("baseURL"),
          withXsrfToken: At.spelling("withXSRFToken"),
        },
        !0
      ),
      (r.method = (r.method || this.defaults.method || "get").toLowerCase());
    let l = n && D.merge(n.common, n[r.method]);
    n &&
      D.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        (N) => {
          delete n[N];
        }
      ),
      (r.headers = at.concat(l, n));
    const d = [];
    let p = !0;
    this.interceptors.request.forEach(function (M) {
      (typeof M.runWhen == "function" && M.runWhen(r) === !1) ||
        ((p = p && M.synchronous), d.unshift(M.fulfilled, M.rejected));
    });
    const v = [];
    this.interceptors.response.forEach(function (M) {
      v.push(M.fulfilled, M.rejected);
    });
    let T,
      P = 0,
      E;
    if (!p) {
      const N = [Uo.bind(this), void 0];
      for (
        N.unshift(...d), N.push(...v), E = N.length, T = Promise.resolve(r);
        P < E;

      )
        T = T.then(N[P++], N[P++]);
      return T;
    }
    E = d.length;
    let q = r;
    for (P = 0; P < E; ) {
      const N = d[P++],
        M = d[P++];
      try {
        q = N(q);
      } catch (V) {
        M.call(this, V);
        break;
      }
    }
    try {
      T = Uo.call(this, q);
    } catch (N) {
      return Promise.reject(N);
    }
    for (P = 0, E = v.length; P < E; ) T = T.then(v[P++], v[P++]);
    return T;
  }
  getUri(i) {
    i = Nn(this.defaults, i);
    const r = Rs(i.baseURL, i.url, i.allowAbsoluteUrls);
    return Cs(r, i.params, i.paramsSerializer);
  }
};
D.forEach(["delete", "get", "head", "options"], function (i) {
  Rn.prototype[i] = function (r, o) {
    return this.request(
      Nn(o || {}, {
        method: i,
        url: r,
        data: (o || {}).data,
      })
    );
  };
});
D.forEach(["post", "put", "patch"], function (i) {
  function r(o) {
    return function (n, l, d) {
      return this.request(
        Nn(d || {}, {
          method: i,
          headers: o
            ? {
                "Content-Type": "multipart/form-data",
              }
            : {},
          url: n,
          data: l,
        })
      );
    };
  }
  (Rn.prototype[i] = r()), (Rn.prototype[i + "Form"] = r(!0));
});
let $u = class Is {
  constructor(i) {
    if (typeof i != "function")
      throw new TypeError("executor must be a function.");
    let r;
    this.promise = new Promise(function (n) {
      r = n;
    });
    const o = this;
    this.promise.then((e) => {
      if (!o._listeners) return;
      let n = o._listeners.length;
      for (; n-- > 0; ) o._listeners[n](e);
      o._listeners = null;
    }),
      (this.promise.then = (e) => {
        let n;
        const l = new Promise((d) => {
          o.subscribe(d), (n = d);
        }).then(e);
        return (
          (l.cancel = function () {
            o.unsubscribe(n);
          }),
          l
        );
      }),
      i(function (n, l, d) {
        o.reason || ((o.reason = new Xn(n, l, d)), r(o.reason));
      });
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(i) {
    if (this.reason) {
      i(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(i) : (this._listeners = [i]);
  }
  unsubscribe(i) {
    if (!this._listeners) return;
    const r = this._listeners.indexOf(i);
    r !== -1 && this._listeners.splice(r, 1);
  }
  toAbortSignal() {
    const i = new AbortController(),
      r = (o) => {
        i.abort(o);
      };
    return (
      this.subscribe(r),
      (i.signal.unsubscribe = () => this.unsubscribe(r)),
      i.signal
    );
  }
  static source() {
    let i;
    return {
      token: new Is(function (e) {
        i = e;
      }),
      cancel: i,
    };
  }
};

function zu(s) {
  return function (r) {
    return s.apply(null, r);
  };
}

function Bu(s) {
  return D.isObject(s) && s.isAxiosError === !0;
}
const Hi = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};
Object.entries(Hi).forEach(([s, i]) => {
  Hi[i] = s;
});

function Fs(s) {
  const i = new Rn(s),
    r = ps(Rn.prototype.request, i);
  return (
    D.extend(r, Rn.prototype, i, {
      allOwnKeys: !0,
    }),
    D.extend(r, i, null, {
      allOwnKeys: !0,
    }),
    (r.create = function (e) {
      return Fs(Nn(s, e));
    }),
    r
  );
}
const Fe = Fs(dr);
Fe.Axios = Rn;
Fe.CanceledError = Xn;
Fe.CancelToken = $u;
Fe.isCancel = Ps;
Fe.VERSION = Ms;
Fe.toFormData = Kr;
Fe.AxiosError = Te;
Fe.Cancel = Fe.CanceledError;
Fe.all = function (i) {
  return Promise.all(i);
};
Fe.spread = zu;
Fe.isAxiosError = Bu;
Fe.mergeConfig = Nn;
Fe.AxiosHeaders = at;
Fe.formToJSON = (s) => As(D.isHTMLForm(s) ? new FormData(s) : s);
Fe.getAdapter = Ds.getAdapter;
Fe.HttpStatusCode = Hi;
Fe.default = Fe;
const {
    Axios: xc,
    AxiosError: Cc,
    CanceledError: Ec,
    isCancel: Ac,
    CancelToken: Pc,
    VERSION: Oc,
    all: Rc,
    Cancel: Nc,
    isAxiosError: Lc,
    spread: jc,
    toFormData: Dc,
    AxiosHeaders: Mc,
    HttpStatusCode: Ic,
    formToJSON: Fc,
    getAdapter: Hc,
    mergeConfig: qc,
  } = Fe,
  Ki =
    "https://6xuarpfwryaosviagzxcfiu3eq0muyiq.lambda-url.ap-northeast-1.on.aws/",
  Qi = "6LdkXOskAAAAAHqg90E0myIvRZcQ58d0mL0vd65h",
  Zi = async ({
    apiurl: s,
    data: i,
    onSuccess: r,
    onFailed: o,
    onError: e,
  }) => {
    Fe.post(s, i, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (n) {
        n.status === 200 ? r() : (o(), console.log(n));
      })
      .catch(function (n) {
        console.error(n);
        const l = Object.keys(n.response.data.errors).filter(
          (d) => n.response.data.errors[d] !== ""
        );
        document.querySelectorAll(".form_group").forEach((d) => {
          d.classList.remove("error");
        }),
          e(),
          l.forEach((d) => {
            let p = document.querySelector(`.${d}`);
            p && p.classList.add("error");
          });
      });
  },
  Ai = (s = "en") => {
    to(!1);
    const i = document.getElementById("submit_button");
    document
      .getElementById("contact_form")
      .addEventListener("submit", async function (r) {
        i.classList.add("disabled"),
          r.preventDefault(),
          grecaptcha.ready(function () {
            grecaptcha
              .execute(Qi, {
                action: "submit",
              })
              .then(function (o) {
                const e = r.target,
                  n = {
                    recaptcha_token: o,
                    language: s,
                    form_type: "contact",
                    first_name: e.first_name.value,
                    first_name_kana: e.first_name_kana
                      ? e.first_name_kana.value
                      : "",
                    last_name: e.last_name.value,
                    last_name_kana: e.last_name_kana
                      ? e.last_name_kana.value
                      : "",
                    email: e.email.value,
                    phone_number: e.phone_number.value,
                    company_name: e.company_name.value,
                    reason_to_contact: e.reason_to_contact.value,
                    how_did_you_know_albana: e.how_did_you_know_albana.value,
                    inquiry: e.inquiry.value,
                  };
                Zi({
                  apiurl: Ki,
                  data: n,
                  onSuccess: () => {
                    eo(), i.classList.remove("disabled");
                  },
                  onFailed: () => {
                    i.classList.remove("disabled");
                  },
                  onError: () => {
                    i.classList.remove("disabled");
                  },
                });
              });
          });
      });
  },
  Wu = (s = "en") => {
    to(!1);
    const i = document.getElementById("submit_button");
    document
      .getElementById("contact_form")
      .addEventListener("submit", async function (r) {
        i.classList.add("disabled"),
          r.preventDefault(),
          grecaptcha.ready(function () {
            grecaptcha
              .execute(Qi, {
                action: "submit",
              })
              .then(function (o) {
                const e = r.target,
                  n = {
                    recaptcha_token: o,
                    language: s,
                    form_type: "brochure",
                    first_name: e.first_name.value,
                    first_name_kana: e.first_name_kana
                      ? e.first_name_kana.value
                      : "",
                    last_name: e.last_name.value,
                    last_name_kana: e.last_name_kana
                      ? e.last_name_kana.value
                      : "",
                    email: e.email.value,
                    phone_number: e.phone_number.value,
                    company_name: e.company_name.value,
                    reason_to_contact: e.reason_to_contact.value,
                    how_did_you_know_albana: e.how_did_you_know_albana.value,
                    inquiry: e.inquiry.value,
                  };
                Zi({
                  apiurl: Ki,
                  data: n,
                  onSuccess: () => {
                    eo(), i.classList.remove("disabled");
                  },
                  onFailed: () => {
                    i.classList.remove("disabled");
                  },
                  onError: () => {
                    i.classList.remove("disabled");
                  },
                });
              });
          });
      });
  },
  Uu = (s = "en") => {
    to(!0);
    const i = document.getElementById("submit_button");
    S(".form_area .only_internship").hide(),
      S(".form_area .only_collaborator").hide();
    let r = "fulltime";
    S(".form_area input[name='application_type']").change(function () {
      (r = S(this).val()),
        Go(r),
        (window.ajax_areaHeight = S("#ajax_area").outerHeight());
    }),
      document
        .getElementById("contact_form")
        .addEventListener("submit", async function (l) {
          i.classList.add("disabled"),
            l.preventDefault(),
            grecaptcha.ready(function () {
              grecaptcha
                .execute(Qi, {
                  action: "submit",
                })
                .then(function (d) {
                  const p = l.target,
                    v = {
                      recaptcha_token: d,
                      language: s,
                      form_type: "career",
                      application_type: p.application_type.value,
                      first_name: p.first_name.value,
                      first_name_kana: p.first_name_kana
                        ? p.first_name_kana.value
                        : "",
                      last_name: p.last_name.value,
                      last_name_kana: p.last_name_kana
                        ? p.last_name_kana.value
                        : "",
                      email: p.email.value,
                      phone_number: p.phone_number.value,
                      desired_positions: Array.from(p.desired_positions)
                        .filter((T) => T.checked)
                        .map((T) => T.value)
                        .join(","),
                      office: p.office.value,
                      cv: p.cv.value,
                      free_comment: p.free_comment.value,
                      sns: p.sns.value,
                      how_did_you_know_albana: p.how_did_you_know_albana.value,
                      subscribe_news_letter: p.subscribe_news_letter.value,
                      graduation_year: p.graduation_year?.value,
                      graduation_month: p.graduation_month?.value,
                      weekly_average: p.weekly_average?.value,
                      daily_average: p.daily_average?.value,
                    };
                  Zi({
                    apiurl: Ki,
                    data: v,
                    onSuccess: () => {
                      eo(), i.classList.remove("disabled");
                    },
                    onFailed: () => {
                      i.classList.remove("disabled");
                    },
                    onError: () => {
                      i.classList.remove("disabled"), Hs();
                    },
                  });
                });
            });
        });
    const o = new URLSearchParams(window.location.search),
      e = o.get("at");
    if (e && ["internship", "fulltime", "collaborator"].includes(e)) {
      const l = document.getElementById("contact_form");
      l && ((l.application_type.value = e), Go(e));
    }
    const n = o.get("dp");
    n &&
      document
        .querySelectorAll('input[name="desired_positions"]')
        .forEach((d) => {
          d.value === n && (d.checked = !0);
        });
  };

function eo() {
  if (
    (S(".form_area form, .col2_common .l p, .js-form_hide").hide(),
    S(".form_area .thx_area").show(),
    (window.ajax_areaHeight = S("#ajax_area").outerHeight()),
    S("#contact_footer").length)
  )
    var s = S("#contact_footer").offset().top;
  else var s = 0;
  document.getElementById("application_type-collaborator") &&
    (S(".form_area .thx_area .collaborator").show(),
    S(".form_area .thx_area .full-time").hide()),
    S("html,body").animate(
      {
        scrollTop: s,
      },
      300,
      function () {
        setTimeout(function () {
          S(".form_area .thx_area").addClass("active");
        }, 100);
      }
    );
}
const to = (s) => {
    const r = document
      .getElementById("contact_form")
      .querySelectorAll("[required]");
    document.getElementById("submit_button").addEventListener("click", (e) => {
      r.forEach((n) => {
        n.value === ""
          ? n.parentElement.classList.add("error")
          : n.parentElement.classList.remove("error");
      }),
        s && Hs();
    });
  },
  Hs = () => {
    const s = document.getElementById("contact_form");
    s.application_type.value === ""
      ? document.querySelector(".application_select").classList.add("error")
      : document.querySelector(".application_select").classList.remove("error");
    let i = !1;
    document.querySelectorAll(".desired_positions input").forEach((r) => {
      r.checked && (i = !0);
    }),
      i
        ? document.querySelector(".desired_positions").classList.remove("error")
        : document.querySelector(".desired_positions").classList.add("error"),
      s.office.value === ""
        ? document.querySelector(".office").classList.add("error")
        : document.querySelector(".office").classList.remove("error"),
      s.subscribe_news_letter.value === ""
        ? document
            .querySelector(".subscribe_news_letter")
            .classList.add("error")
        : document
            .querySelector(".subscribe_news_letter")
            .classList.remove("error");
  },
  Go = (s) => {
    document.querySelectorAll(".desired_positions input").forEach((i) => {
      i.checked = !1;
    }),
      s == "internship"
        ? (S(".form_area .only_fulltime").hide(),
          S(".form_area .only_collaborator").hide(),
          S(".form_area .only_internship").show())
        : s == "fulltime"
        ? (S(".form_area .only_internship").hide(),
          S(".form_area .only_collaborator").hide(),
          S(".form_area .only_fulltime").show())
        : (S(".form_area .only_internship").hide(),
          S(".form_area .only_fulltime").hide(),
          S(".form_area .only_collaborator").show());
  };

function Vu() {
  window.dataLayer = window.dataLayer || [];

  function s() {
    dataLayer.push(arguments);
  }
  var i = Xu("_modalFlg"),
    r = localStorage.getItem("_modalFlg");
  i == "1"
    ? (S("#cookie_check").hide(),
      s("consent", "default", {
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
        analytics_storage: "granted",
      }))
    : (r == "1" && S("#cookie_check").hide(),
      s("consent", "default", {
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        analytics_storage: "denied",
      })),
    S(document).on("click", ".js-cookie_accept, .js-cookie_close", function () {
      S("#cookie_check").fadeOut(200),
        Gu("_modalFlg", "1", 60),
        s("consent", "update", {
          ad_storage: "granted",
          ad_user_data: "granted",
          ad_personalization: "granted",
          analytics_storage: "granted",
        });
    }),
    S(document).on("click", ".js-cookie_reject", function () {
      S("#cookie_check").fadeOut(200),
        localStorage.setItem("_modalFlg", "1"),
        s("consent", "update", {
          ad_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied",
          analytics_storage: "denied",
        });
    });
}

function Gu(s, i, r) {
  let o = "";
  {
    const e = new Date();
    e.setTime(e.getTime() + r * 24 * 60 * 60 * 1e3),
      (o = "; expires=" + e.toUTCString());
  }
  document.cookie = s + "=" + i + o + "; path=/";
}

function Xu(s) {
  const i = s + "=",
    r = document.cookie.split(";");
  for (let o = 0; o < r.length; o++) {
    let e = r[o];
    for (; e.charAt(0) === " "; ) e = e.substring(1, e.length);
    if (e.indexOf(i) === 0) return e.substring(i.length, e.length);
  }
  return null;
}
var Yu = {
  exports: {},
};
(function (s, i) {
  (function (r) {
    s.exports = r(ds);
  })(function (r) {
    var o = window.Slick || {};
    (o = (function () {
      var e = 0;

      function n(l, d) {
        var p = this,
          v;
        (p.defaults = {
          accessibility: !0,
          adaptiveHeight: !1,
          appendArrows: r(l),
          appendDots: r(l),
          arrows: !0,
          asNavFor: null,
          prevArrow:
            '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
          nextArrow:
            '<button class="slick-next" aria-label="Next" type="button">Next</button>',
          autoplay: !1,
          autoplaySpeed: 3e3,
          centerMode: !1,
          centerPadding: "50px",
          cssEase: "ease",
          customPaging: function (T, P) {
            return r('<button type="button" />').text(P + 1);
          },
          dots: !1,
          dotsClass: "slick-dots",
          draggable: !0,
          easing: "linear",
          edgeFriction: 0.35,
          fade: !1,
          focusOnSelect: !1,
          focusOnChange: !1,
          infinite: !0,
          initialSlide: 0,
          lazyLoad: "ondemand",
          mobileFirst: !1,
          pauseOnHover: !0,
          pauseOnFocus: !0,
          pauseOnDotsHover: !1,
          respondTo: "window",
          responsive: null,
          rows: 1,
          rtl: !1,
          slide: "",
          slidesPerRow: 1,
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 500,
          swipe: !0,
          swipeToSlide: !1,
          touchMove: !0,
          touchThreshold: 5,
          useCSS: !0,
          useTransform: !0,
          variableWidth: !1,
          vertical: !1,
          verticalSwiping: !1,
          waitForAnimate: !0,
          zIndex: 1e3,
        }),
          (p.initials = {
            animating: !1,
            dragging: !1,
            autoPlayTimer: null,
            currentDirection: 0,
            currentLeft: null,
            currentSlide: 0,
            direction: 1,
            $dots: null,
            listWidth: null,
            listHeight: null,
            loadIndex: 0,
            $nextArrow: null,
            $prevArrow: null,
            scrolling: !1,
            slideCount: null,
            slideWidth: null,
            $slideTrack: null,
            $slides: null,
            sliding: !1,
            slideOffset: 0,
            swipeLeft: null,
            swiping: !1,
            $list: null,
            touchObject: {},
            transformsEnabled: !1,
            unslicked: !1,
          }),
          r.extend(p, p.initials),
          (p.activeBreakpoint = null),
          (p.animType = null),
          (p.animProp = null),
          (p.breakpoints = []),
          (p.breakpointSettings = []),
          (p.cssTransitions = !1),
          (p.focussed = !1),
          (p.interrupted = !1),
          (p.hidden = "hidden"),
          (p.paused = !0),
          (p.positionProp = null),
          (p.respondTo = null),
          (p.rowCount = 1),
          (p.shouldClick = !0),
          (p.$slider = r(l)),
          (p.$slidesCache = null),
          (p.transformType = null),
          (p.transitionType = null),
          (p.visibilityChange = "visibilitychange"),
          (p.windowWidth = 0),
          (p.windowTimer = null),
          (v = r(l).data("slick") || {}),
          (p.options = r.extend({}, p.defaults, d, v)),
          (p.currentSlide = p.options.initialSlide),
          (p.originalSettings = p.options),
          typeof document.mozHidden < "u"
            ? ((p.hidden = "mozHidden"),
              (p.visibilityChange = "mozvisibilitychange"))
            : typeof document.webkitHidden < "u" &&
              ((p.hidden = "webkitHidden"),
              (p.visibilityChange = "webkitvisibilitychange")),
          (p.autoPlay = r.proxy(p.autoPlay, p)),
          (p.autoPlayClear = r.proxy(p.autoPlayClear, p)),
          (p.autoPlayIterator = r.proxy(p.autoPlayIterator, p)),
          (p.changeSlide = r.proxy(p.changeSlide, p)),
          (p.clickHandler = r.proxy(p.clickHandler, p)),
          (p.selectHandler = r.proxy(p.selectHandler, p)),
          (p.setPosition = r.proxy(p.setPosition, p)),
          (p.swipeHandler = r.proxy(p.swipeHandler, p)),
          (p.dragHandler = r.proxy(p.dragHandler, p)),
          (p.keyHandler = r.proxy(p.keyHandler, p)),
          (p.instanceUid = e++),
          (p.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
          p.registerBreakpoints(),
          p.init(!0);
      }
      return n;
    })()),
      (o.prototype.activateADA = function () {
        var e = this;
        e.$slideTrack
          .find(".slick-active")
          .attr({
            "aria-hidden": "false",
          })
          .find("a, input, button, select")
          .attr({
            tabindex: "0",
          });
      }),
      (o.prototype.addSlide = o.prototype.slickAdd =
        function (e, n, l) {
          var d = this;
          if (typeof n == "boolean") (l = n), (n = null);
          else if (n < 0 || n >= d.slideCount) return !1;
          d.unload(),
            typeof n == "number"
              ? n === 0 && d.$slides.length === 0
                ? r(e).appendTo(d.$slideTrack)
                : l
                ? r(e).insertBefore(d.$slides.eq(n))
                : r(e).insertAfter(d.$slides.eq(n))
              : l === !0
              ? r(e).prependTo(d.$slideTrack)
              : r(e).appendTo(d.$slideTrack),
            (d.$slides = d.$slideTrack.children(this.options.slide)),
            d.$slideTrack.children(this.options.slide).detach(),
            d.$slideTrack.append(d.$slides),
            d.$slides.each(function (p, v) {
              r(v).attr("data-slick-index", p);
            }),
            (d.$slidesCache = d.$slides),
            d.reinit();
        }),
      (o.prototype.animateHeight = function () {
        var e = this;
        if (
          e.options.slidesToShow === 1 &&
          e.options.adaptiveHeight === !0 &&
          e.options.vertical === !1
        ) {
          var n = e.$slides.eq(e.currentSlide).outerHeight(!0);
          e.$list.animate(
            {
              height: n,
            },
            e.options.speed
          );
        }
      }),
      (o.prototype.animateSlide = function (e, n) {
        var l = {},
          d = this;
        d.animateHeight(),
          d.options.rtl === !0 && d.options.vertical === !1 && (e = -e),
          d.transformsEnabled === !1
            ? d.options.vertical === !1
              ? d.$slideTrack.animate(
                  {
                    left: e,
                  },
                  d.options.speed,
                  d.options.easing,
                  n
                )
              : d.$slideTrack.animate(
                  {
                    top: e,
                  },
                  d.options.speed,
                  d.options.easing,
                  n
                )
            : d.cssTransitions === !1
            ? (d.options.rtl === !0 && (d.currentLeft = -d.currentLeft),
              r({
                animStart: d.currentLeft,
              }).animate(
                {
                  animStart: e,
                },
                {
                  duration: d.options.speed,
                  easing: d.options.easing,
                  step: function (p) {
                    (p = Math.ceil(p)),
                      d.options.vertical === !1
                        ? ((l[d.animType] = "translate(" + p + "px, 0px)"),
                          d.$slideTrack.css(l))
                        : ((l[d.animType] = "translate(0px," + p + "px)"),
                          d.$slideTrack.css(l));
                  },
                  complete: function () {
                    n && n.call();
                  },
                }
              ))
            : (d.applyTransition(),
              (e = Math.ceil(e)),
              d.options.vertical === !1
                ? (l[d.animType] = "translate3d(" + e + "px, 0px, 0px)")
                : (l[d.animType] = "translate3d(0px," + e + "px, 0px)"),
              d.$slideTrack.css(l),
              n &&
                setTimeout(function () {
                  d.disableTransition(), n.call();
                }, d.options.speed));
      }),
      (o.prototype.getNavTarget = function () {
        var e = this,
          n = e.options.asNavFor;
        return n && n !== null && (n = r(n).not(e.$slider)), n;
      }),
      (o.prototype.asNavFor = function (e) {
        var n = this,
          l = n.getNavTarget();
        l !== null &&
          typeof l == "object" &&
          l.each(function () {
            var d = r(this).slick("getSlick");
            d.unslicked || d.slideHandler(e, !0);
          });
      }),
      (o.prototype.applyTransition = function (e) {
        var n = this,
          l = {};
        n.options.fade === !1
          ? (l[n.transitionType] =
              n.transformType +
              " " +
              n.options.speed +
              "ms " +
              n.options.cssEase)
          : (l[n.transitionType] =
              "opacity " + n.options.speed + "ms " + n.options.cssEase),
          n.options.fade === !1 ? n.$slideTrack.css(l) : n.$slides.eq(e).css(l);
      }),
      (o.prototype.autoPlay = function () {
        var e = this;
        e.autoPlayClear(),
          e.slideCount > e.options.slidesToShow &&
            (e.autoPlayTimer = setInterval(
              e.autoPlayIterator,
              e.options.autoplaySpeed
            ));
      }),
      (o.prototype.autoPlayClear = function () {
        var e = this;
        e.autoPlayTimer && clearInterval(e.autoPlayTimer);
      }),
      (o.prototype.autoPlayIterator = function () {
        var e = this,
          n = e.currentSlide + e.options.slidesToScroll;
        !e.paused &&
          !e.interrupted &&
          !e.focussed &&
          (e.options.infinite === !1 &&
            (e.direction === 1 && e.currentSlide + 1 === e.slideCount - 1
              ? (e.direction = 0)
              : e.direction === 0 &&
                ((n = e.currentSlide - e.options.slidesToScroll),
                e.currentSlide - 1 === 0 && (e.direction = 1))),
          e.slideHandler(n));
      }),
      (o.prototype.buildArrows = function () {
        var e = this;
        e.options.arrows === !0 &&
          ((e.$prevArrow = r(e.options.prevArrow).addClass("slick-arrow")),
          (e.$nextArrow = r(e.options.nextArrow).addClass("slick-arrow")),
          e.slideCount > e.options.slidesToShow
            ? (e.$prevArrow
                .removeClass("slick-hidden")
                .removeAttr("aria-hidden tabindex"),
              e.$nextArrow
                .removeClass("slick-hidden")
                .removeAttr("aria-hidden tabindex"),
              e.htmlExpr.test(e.options.prevArrow) &&
                e.$prevArrow.prependTo(e.options.appendArrows),
              e.htmlExpr.test(e.options.nextArrow) &&
                e.$nextArrow.appendTo(e.options.appendArrows),
              e.options.infinite !== !0 &&
                e.$prevArrow
                  .addClass("slick-disabled")
                  .attr("aria-disabled", "true"))
            : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
                "aria-disabled": "true",
                tabindex: "-1",
              }));
      }),
      (o.prototype.buildDots = function () {
        var e = this,
          n,
          l;
        if (e.options.dots === !0 && e.slideCount > e.options.slidesToShow) {
          for (
            e.$slider.addClass("slick-dotted"),
              l = r("<ul />").addClass(e.options.dotsClass),
              n = 0;
            n <= e.getDotCount();
            n += 1
          )
            l.append(
              r("<li />").append(e.options.customPaging.call(this, e, n))
            );
          (e.$dots = l.appendTo(e.options.appendDots)),
            e.$dots.find("li").first().addClass("slick-active");
        }
      }),
      (o.prototype.buildOut = function () {
        var e = this;
        (e.$slides = e.$slider
          .children(e.options.slide + ":not(.slick-cloned)")
          .addClass("slick-slide")),
          (e.slideCount = e.$slides.length),
          e.$slides.each(function (n, l) {
            r(l)
              .attr("data-slick-index", n)
              .data("originalStyling", r(l).attr("style") || "");
          }),
          e.$slider.addClass("slick-slider"),
          (e.$slideTrack =
            e.slideCount === 0
              ? r('<div class="slick-track"/>').appendTo(e.$slider)
              : e.$slides.wrapAll('<div class="slick-track"/>').parent()),
          (e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent()),
          e.$slideTrack.css("opacity", 0),
          (e.options.centerMode === !0 || e.options.swipeToSlide === !0) &&
            (e.options.slidesToScroll = 1),
          r("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"),
          e.setupInfinite(),
          e.buildArrows(),
          e.buildDots(),
          e.updateDots(),
          e.setSlideClasses(
            typeof e.currentSlide == "number" ? e.currentSlide : 0
          ),
          e.options.draggable === !0 && e.$list.addClass("draggable");
      }),
      (o.prototype.buildRows = function () {
        var e = this,
          n,
          l,
          d,
          p,
          v,
          T,
          P;
        if (
          ((p = document.createDocumentFragment()),
          (T = e.$slider.children()),
          e.options.rows > 0)
        ) {
          for (
            P = e.options.slidesPerRow * e.options.rows,
              v = Math.ceil(T.length / P),
              n = 0;
            n < v;
            n++
          ) {
            var E = document.createElement("div");
            for (l = 0; l < e.options.rows; l++) {
              var q = document.createElement("div");
              for (d = 0; d < e.options.slidesPerRow; d++) {
                var N = n * P + (l * e.options.slidesPerRow + d);
                T.get(N) && q.appendChild(T.get(N));
              }
              E.appendChild(q);
            }
            p.appendChild(E);
          }
          e.$slider.empty().append(p),
            e.$slider
              .children()
              .children()
              .children()
              .css({
                width: 100 / e.options.slidesPerRow + "%",
                display: "inline-block",
              });
        }
      }),
      (o.prototype.checkResponsive = function (e, n) {
        var l = this,
          d,
          p,
          v,
          T = !1,
          P = l.$slider.width(),
          E = window.innerWidth || r(window).width();
        if (
          (l.respondTo === "window"
            ? (v = E)
            : l.respondTo === "slider"
            ? (v = P)
            : l.respondTo === "min" && (v = Math.min(E, P)),
          l.options.responsive &&
            l.options.responsive.length &&
            l.options.responsive !== null)
        ) {
          p = null;
          for (d in l.breakpoints)
            l.breakpoints.hasOwnProperty(d) &&
              (l.originalSettings.mobileFirst === !1
                ? v < l.breakpoints[d] && (p = l.breakpoints[d])
                : v > l.breakpoints[d] && (p = l.breakpoints[d]));
          p !== null
            ? l.activeBreakpoint !== null
              ? (p !== l.activeBreakpoint || n) &&
                ((l.activeBreakpoint = p),
                l.breakpointSettings[p] === "unslick"
                  ? l.unslick(p)
                  : ((l.options = r.extend(
                      {},
                      l.originalSettings,
                      l.breakpointSettings[p]
                    )),
                    e === !0 && (l.currentSlide = l.options.initialSlide),
                    l.refresh(e)),
                (T = p))
              : ((l.activeBreakpoint = p),
                l.breakpointSettings[p] === "unslick"
                  ? l.unslick(p)
                  : ((l.options = r.extend(
                      {},
                      l.originalSettings,
                      l.breakpointSettings[p]
                    )),
                    e === !0 && (l.currentSlide = l.options.initialSlide),
                    l.refresh(e)),
                (T = p))
            : l.activeBreakpoint !== null &&
              ((l.activeBreakpoint = null),
              (l.options = l.originalSettings),
              e === !0 && (l.currentSlide = l.options.initialSlide),
              l.refresh(e),
              (T = p)),
            !e && T !== !1 && l.$slider.trigger("breakpoint", [l, T]);
        }
      }),
      (o.prototype.changeSlide = function (e, n) {
        var l = this,
          d = r(e.currentTarget),
          p,
          v,
          T;
        switch (
          (d.is("a") && e.preventDefault(),
          d.is("li") || (d = d.closest("li")),
          (T = l.slideCount % l.options.slidesToScroll !== 0),
          (p = T
            ? 0
            : (l.slideCount - l.currentSlide) % l.options.slidesToScroll),
          e.data.message)
        ) {
          case "previous":
            (v =
              p === 0 ? l.options.slidesToScroll : l.options.slidesToShow - p),
              l.slideCount > l.options.slidesToShow &&
                l.slideHandler(l.currentSlide - v, !1, n);
            break;
          case "next":
            (v = p === 0 ? l.options.slidesToScroll : p),
              l.slideCount > l.options.slidesToShow &&
                l.slideHandler(l.currentSlide + v, !1, n);
            break;
          case "index":
            var P =
              e.data.index === 0
                ? 0
                : e.data.index || d.index() * l.options.slidesToScroll;
            l.slideHandler(l.checkNavigable(P), !1, n),
              d.children().trigger("focus");
            break;
          default:
            return;
        }
      }),
      (o.prototype.checkNavigable = function (e) {
        var n = this,
          l,
          d;
        if (((l = n.getNavigableIndexes()), (d = 0), e > l[l.length - 1]))
          e = l[l.length - 1];
        else
          for (var p in l) {
            if (e < l[p]) {
              e = d;
              break;
            }
            d = l[p];
          }
        return e;
      }),
      (o.prototype.cleanUpEvents = function () {
        var e = this;
        e.options.dots &&
          e.$dots !== null &&
          (r("li", e.$dots)
            .off("click.slick", e.changeSlide)
            .off("mouseenter.slick", r.proxy(e.interrupt, e, !0))
            .off("mouseleave.slick", r.proxy(e.interrupt, e, !1)),
          e.options.accessibility === !0 &&
            e.$dots.off("keydown.slick", e.keyHandler)),
          e.$slider.off("focus.slick blur.slick"),
          e.options.arrows === !0 &&
            e.slideCount > e.options.slidesToShow &&
            (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide),
            e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide),
            e.options.accessibility === !0 &&
              (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler),
              e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))),
          e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler),
          e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler),
          e.$list.off("touchend.slick mouseup.slick", e.swipeHandler),
          e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler),
          e.$list.off("click.slick", e.clickHandler),
          r(document).off(e.visibilityChange, e.visibility),
          e.cleanUpSlideEvents(),
          e.options.accessibility === !0 &&
            e.$list.off("keydown.slick", e.keyHandler),
          e.options.focusOnSelect === !0 &&
            r(e.$slideTrack).children().off("click.slick", e.selectHandler),
          r(window).off(
            "orientationchange.slick.slick-" + e.instanceUid,
            e.orientationChange
          ),
          r(window).off("resize.slick.slick-" + e.instanceUid, e.resize),
          r("[draggable!=true]", e.$slideTrack).off(
            "dragstart",
            e.preventDefault
          ),
          r(window).off("load.slick.slick-" + e.instanceUid, e.setPosition);
      }),
      (o.prototype.cleanUpSlideEvents = function () {
        var e = this;
        e.$list.off("mouseenter.slick", r.proxy(e.interrupt, e, !0)),
          e.$list.off("mouseleave.slick", r.proxy(e.interrupt, e, !1));
      }),
      (o.prototype.cleanUpRows = function () {
        var e = this,
          n;
        e.options.rows > 0 &&
          ((n = e.$slides.children().children()),
          n.removeAttr("style"),
          e.$slider.empty().append(n));
      }),
      (o.prototype.clickHandler = function (e) {
        var n = this;
        n.shouldClick === !1 &&
          (e.stopImmediatePropagation(),
          e.stopPropagation(),
          e.preventDefault());
      }),
      (o.prototype.destroy = function (e) {
        var n = this;
        n.autoPlayClear(),
          (n.touchObject = {}),
          n.cleanUpEvents(),
          r(".slick-cloned", n.$slider).detach(),
          n.$dots && n.$dots.remove(),
          n.$prevArrow &&
            n.$prevArrow.length &&
            (n.$prevArrow
              .removeClass("slick-disabled slick-arrow slick-hidden")
              .removeAttr("aria-hidden aria-disabled tabindex")
              .css("display", ""),
            n.htmlExpr.test(n.options.prevArrow) && n.$prevArrow.remove()),
          n.$nextArrow &&
            n.$nextArrow.length &&
            (n.$nextArrow
              .removeClass("slick-disabled slick-arrow slick-hidden")
              .removeAttr("aria-hidden aria-disabled tabindex")
              .css("display", ""),
            n.htmlExpr.test(n.options.nextArrow) && n.$nextArrow.remove()),
          n.$slides &&
            (n.$slides
              .removeClass(
                "slick-slide slick-active slick-center slick-visible slick-current"
              )
              .removeAttr("aria-hidden")
              .removeAttr("data-slick-index")
              .each(function () {
                r(this).attr("style", r(this).data("originalStyling"));
              }),
            n.$slideTrack.children(this.options.slide).detach(),
            n.$slideTrack.detach(),
            n.$list.detach(),
            n.$slider.append(n.$slides)),
          n.cleanUpRows(),
          n.$slider.removeClass("slick-slider"),
          n.$slider.removeClass("slick-initialized"),
          n.$slider.removeClass("slick-dotted"),
          (n.unslicked = !0),
          e || n.$slider.trigger("destroy", [n]);
      }),
      (o.prototype.disableTransition = function (e) {
        var n = this,
          l = {};
        (l[n.transitionType] = ""),
          n.options.fade === !1 ? n.$slideTrack.css(l) : n.$slides.eq(e).css(l);
      }),
      (o.prototype.fadeSlide = function (e, n) {
        var l = this;
        l.cssTransitions === !1
          ? (l.$slides.eq(e).css({
              zIndex: l.options.zIndex,
            }),
            l.$slides.eq(e).animate(
              {
                opacity: 1,
              },
              l.options.speed,
              l.options.easing,
              n
            ))
          : (l.applyTransition(e),
            l.$slides.eq(e).css({
              opacity: 1,
              zIndex: l.options.zIndex,
            }),
            n &&
              setTimeout(function () {
                l.disableTransition(e), n.call();
              }, l.options.speed));
      }),
      (o.prototype.fadeSlideOut = function (e) {
        var n = this;
        n.cssTransitions === !1
          ? n.$slides.eq(e).animate(
              {
                opacity: 0,
                zIndex: n.options.zIndex - 2,
              },
              n.options.speed,
              n.options.easing
            )
          : (n.applyTransition(e),
            n.$slides.eq(e).css({
              opacity: 0,
              zIndex: n.options.zIndex - 2,
            }));
      }),
      (o.prototype.filterSlides = o.prototype.slickFilter =
        function (e) {
          var n = this;
          e !== null &&
            ((n.$slidesCache = n.$slides),
            n.unload(),
            n.$slideTrack.children(this.options.slide).detach(),
            n.$slidesCache.filter(e).appendTo(n.$slideTrack),
            n.reinit());
        }),
      (o.prototype.focusHandler = function () {
        var e = this;
        e.$slider
          .off("focus.slick blur.slick")
          .on("focus.slick blur.slick", "*", function (n) {
            n.stopImmediatePropagation();
            var l = r(this);
            setTimeout(function () {
              e.options.pauseOnFocus &&
                ((e.focussed = l.is(":focus")), e.autoPlay());
            }, 0);
          });
      }),
      (o.prototype.getCurrent = o.prototype.slickCurrentSlide =
        function () {
          var e = this;
          return e.currentSlide;
        }),
      (o.prototype.getDotCount = function () {
        var e = this,
          n = 0,
          l = 0,
          d = 0;
        if (e.options.infinite === !0)
          if (e.slideCount <= e.options.slidesToShow) ++d;
          else
            for (; n < e.slideCount; )
              ++d,
                (n = l + e.options.slidesToScroll),
                (l +=
                  e.options.slidesToScroll <= e.options.slidesToShow
                    ? e.options.slidesToScroll
                    : e.options.slidesToShow);
        else if (e.options.centerMode === !0) d = e.slideCount;
        else if (!e.options.asNavFor)
          d =
            1 +
            Math.ceil(
              (e.slideCount - e.options.slidesToShow) / e.options.slidesToScroll
            );
        else
          for (; n < e.slideCount; )
            ++d,
              (n = l + e.options.slidesToScroll),
              (l +=
                e.options.slidesToScroll <= e.options.slidesToShow
                  ? e.options.slidesToScroll
                  : e.options.slidesToShow);
        return d - 1;
      }),
      (o.prototype.getLeft = function (e) {
        var n = this,
          l,
          d,
          p = 0,
          v,
          T;
        return (
          (n.slideOffset = 0),
          (d = n.$slides.first().outerHeight(!0)),
          n.options.infinite === !0
            ? (n.slideCount > n.options.slidesToShow &&
                ((n.slideOffset = n.slideWidth * n.options.slidesToShow * -1),
                (T = -1),
                n.options.vertical === !0 &&
                  n.options.centerMode === !0 &&
                  (n.options.slidesToShow === 2
                    ? (T = -1.5)
                    : n.options.slidesToShow === 1 && (T = -2)),
                (p = d * n.options.slidesToShow * T)),
              n.slideCount % n.options.slidesToScroll !== 0 &&
                e + n.options.slidesToScroll > n.slideCount &&
                n.slideCount > n.options.slidesToShow &&
                (e > n.slideCount
                  ? ((n.slideOffset =
                      (n.options.slidesToShow - (e - n.slideCount)) *
                      n.slideWidth *
                      -1),
                    (p =
                      (n.options.slidesToShow - (e - n.slideCount)) * d * -1))
                  : ((n.slideOffset =
                      (n.slideCount % n.options.slidesToScroll) *
                      n.slideWidth *
                      -1),
                    (p = (n.slideCount % n.options.slidesToScroll) * d * -1))))
            : e + n.options.slidesToShow > n.slideCount &&
              ((n.slideOffset =
                (e + n.options.slidesToShow - n.slideCount) * n.slideWidth),
              (p = (e + n.options.slidesToShow - n.slideCount) * d)),
          n.slideCount <= n.options.slidesToShow &&
            ((n.slideOffset = 0), (p = 0)),
          n.options.centerMode === !0 && n.slideCount <= n.options.slidesToShow
            ? (n.slideOffset =
                (n.slideWidth * Math.floor(n.options.slidesToShow)) / 2 -
                (n.slideWidth * n.slideCount) / 2)
            : n.options.centerMode === !0 && n.options.infinite === !0
            ? (n.slideOffset +=
                n.slideWidth * Math.floor(n.options.slidesToShow / 2) -
                n.slideWidth)
            : n.options.centerMode === !0 &&
              ((n.slideOffset = 0),
              (n.slideOffset +=
                n.slideWidth * Math.floor(n.options.slidesToShow / 2))),
          n.options.vertical === !1
            ? (l = e * n.slideWidth * -1 + n.slideOffset)
            : (l = e * d * -1 + p),
          n.options.variableWidth === !0 &&
            (n.slideCount <= n.options.slidesToShow || n.options.infinite === !1
              ? (v = n.$slideTrack.children(".slick-slide").eq(e))
              : (v = n.$slideTrack
                  .children(".slick-slide")
                  .eq(e + n.options.slidesToShow)),
            n.options.rtl === !0
              ? v[0]
                ? (l =
                    (n.$slideTrack.width() - v[0].offsetLeft - v.width()) * -1)
                : (l = 0)
              : (l = v[0] ? v[0].offsetLeft * -1 : 0),
            n.options.centerMode === !0 &&
              (n.slideCount <= n.options.slidesToShow ||
              n.options.infinite === !1
                ? (v = n.$slideTrack.children(".slick-slide").eq(e))
                : (v = n.$slideTrack
                    .children(".slick-slide")
                    .eq(e + n.options.slidesToShow + 1)),
              n.options.rtl === !0
                ? v[0]
                  ? (l =
                      (n.$slideTrack.width() - v[0].offsetLeft - v.width()) *
                      -1)
                  : (l = 0)
                : (l = v[0] ? v[0].offsetLeft * -1 : 0),
              (l += (n.$list.width() - v.outerWidth()) / 2))),
          l
        );
      }),
      (o.prototype.getOption = o.prototype.slickGetOption =
        function (e) {
          var n = this;
          return n.options[e];
        }),
      (o.prototype.getNavigableIndexes = function () {
        var e = this,
          n = 0,
          l = 0,
          d = [],
          p;
        for (
          e.options.infinite === !1
            ? (p = e.slideCount)
            : ((n = e.options.slidesToScroll * -1),
              (l = e.options.slidesToScroll * -1),
              (p = e.slideCount * 2));
          n < p;

        )
          d.push(n),
            (n = l + e.options.slidesToScroll),
            (l +=
              e.options.slidesToScroll <= e.options.slidesToShow
                ? e.options.slidesToScroll
                : e.options.slidesToShow);
        return d;
      }),
      (o.prototype.getSlick = function () {
        return this;
      }),
      (o.prototype.getSlideCount = function () {
        var e = this,
          n,
          l,
          d;
        return (
          (d =
            e.options.centerMode === !0
              ? e.slideWidth * Math.floor(e.options.slidesToShow / 2)
              : 0),
          e.options.swipeToSlide === !0
            ? (e.$slideTrack.find(".slick-slide").each(function (p, v) {
                if (v.offsetLeft - d + r(v).outerWidth() / 2 > e.swipeLeft * -1)
                  return (l = v), !1;
              }),
              (n =
                Math.abs(r(l).attr("data-slick-index") - e.currentSlide) || 1),
              n)
            : e.options.slidesToScroll
        );
      }),
      (o.prototype.goTo = o.prototype.slickGoTo =
        function (e, n) {
          var l = this;
          l.changeSlide(
            {
              data: {
                message: "index",
                index: parseInt(e),
              },
            },
            n
          );
        }),
      (o.prototype.init = function (e) {
        var n = this;
        r(n.$slider).hasClass("slick-initialized") ||
          (r(n.$slider).addClass("slick-initialized"),
          n.buildRows(),
          n.buildOut(),
          n.setProps(),
          n.startLoad(),
          n.loadSlider(),
          n.initializeEvents(),
          n.updateArrows(),
          n.updateDots(),
          n.checkResponsive(!0),
          n.focusHandler()),
          e && n.$slider.trigger("init", [n]),
          n.options.accessibility === !0 && n.initADA(),
          n.options.autoplay && ((n.paused = !1), n.autoPlay());
      }),
      (o.prototype.initADA = function () {
        var e = this,
          n = Math.ceil(e.slideCount / e.options.slidesToShow),
          l = e.getNavigableIndexes().filter(function (v) {
            return v >= 0 && v < e.slideCount;
          });
        e.$slides
          .add(e.$slideTrack.find(".slick-cloned"))
          .attr({
            "aria-hidden": "true",
            tabindex: "-1",
          })
          .find("a, input, button, select")
          .attr({
            tabindex: "-1",
          }),
          e.$dots !== null &&
            (e.$slides
              .not(e.$slideTrack.find(".slick-cloned"))
              .each(function (v) {
                var T = l.indexOf(v);
                if (
                  (r(this).attr({
                    role: "tabpanel",
                    id: "slick-slide" + e.instanceUid + v,
                    tabindex: -1,
                  }),
                  T !== -1)
                ) {
                  var P = "slick-slide-control" + e.instanceUid + T;
                  r("#" + P).length &&
                    r(this).attr({
                      "aria-describedby": P,
                    });
                }
              }),
            e.$dots
              .attr("role", "tablist")
              .find("li")
              .each(function (v) {
                var T = l[v];
                r(this).attr({
                  role: "presentation",
                }),
                  r(this)
                    .find("button")
                    .first()
                    .attr({
                      role: "tab",
                      id: "slick-slide-control" + e.instanceUid + v,
                      "aria-controls": "slick-slide" + e.instanceUid + T,
                      "aria-label": v + 1 + " of " + n,
                      "aria-selected": null,
                      tabindex: "-1",
                    });
              })
              .eq(e.currentSlide)
              .find("button")
              .attr({
                "aria-selected": "true",
                tabindex: "0",
              })
              .end());
        for (var d = e.currentSlide, p = d + e.options.slidesToShow; d < p; d++)
          e.options.focusOnChange
            ? e.$slides.eq(d).attr({
                tabindex: "0",
              })
            : e.$slides.eq(d).removeAttr("tabindex");
        e.activateADA();
      }),
      (o.prototype.initArrowEvents = function () {
        var e = this;
        e.options.arrows === !0 &&
          e.slideCount > e.options.slidesToShow &&
          (e.$prevArrow.off("click.slick").on(
            "click.slick",
            {
              message: "previous",
            },
            e.changeSlide
          ),
          e.$nextArrow.off("click.slick").on(
            "click.slick",
            {
              message: "next",
            },
            e.changeSlide
          ),
          e.options.accessibility === !0 &&
            (e.$prevArrow.on("keydown.slick", e.keyHandler),
            e.$nextArrow.on("keydown.slick", e.keyHandler)));
      }),
      (o.prototype.initDotEvents = function () {
        var e = this;
        e.options.dots === !0 &&
          e.slideCount > e.options.slidesToShow &&
          (r("li", e.$dots).on(
            "click.slick",
            {
              message: "index",
            },
            e.changeSlide
          ),
          e.options.accessibility === !0 &&
            e.$dots.on("keydown.slick", e.keyHandler)),
          e.options.dots === !0 &&
            e.options.pauseOnDotsHover === !0 &&
            e.slideCount > e.options.slidesToShow &&
            r("li", e.$dots)
              .on("mouseenter.slick", r.proxy(e.interrupt, e, !0))
              .on("mouseleave.slick", r.proxy(e.interrupt, e, !1));
      }),
      (o.prototype.initSlideEvents = function () {
        var e = this;
        e.options.pauseOnHover &&
          (e.$list.on("mouseenter.slick", r.proxy(e.interrupt, e, !0)),
          e.$list.on("mouseleave.slick", r.proxy(e.interrupt, e, !1)));
      }),
      (o.prototype.initializeEvents = function () {
        var e = this;
        e.initArrowEvents(),
          e.initDotEvents(),
          e.initSlideEvents(),
          e.$list.on(
            "touchstart.slick mousedown.slick",
            {
              action: "start",
            },
            e.swipeHandler
          ),
          e.$list.on(
            "touchmove.slick mousemove.slick",
            {
              action: "move",
            },
            e.swipeHandler
          ),
          e.$list.on(
            "touchend.slick mouseup.slick",
            {
              action: "end",
            },
            e.swipeHandler
          ),
          e.$list.on(
            "touchcancel.slick mouseleave.slick",
            {
              action: "end",
            },
            e.swipeHandler
          ),
          e.$list.on("click.slick", e.clickHandler),
          r(document).on(e.visibilityChange, r.proxy(e.visibility, e)),
          e.options.accessibility === !0 &&
            e.$list.on("keydown.slick", e.keyHandler),
          e.options.focusOnSelect === !0 &&
            r(e.$slideTrack).children().on("click.slick", e.selectHandler),
          r(window).on(
            "orientationchange.slick.slick-" + e.instanceUid,
            r.proxy(e.orientationChange, e)
          ),
          r(window).on(
            "resize.slick.slick-" + e.instanceUid,
            r.proxy(e.resize, e)
          ),
          r("[draggable!=true]", e.$slideTrack).on(
            "dragstart",
            e.preventDefault
          ),
          r(window).on("load.slick.slick-" + e.instanceUid, e.setPosition),
          r(e.setPosition);
      }),
      (o.prototype.initUI = function () {
        var e = this;
        e.options.arrows === !0 &&
          e.slideCount > e.options.slidesToShow &&
          (e.$prevArrow.show(), e.$nextArrow.show()),
          e.options.dots === !0 &&
            e.slideCount > e.options.slidesToShow &&
            e.$dots.show();
      }),
      (o.prototype.keyHandler = function (e) {
        var n = this;
        e.target.tagName.match("TEXTAREA|INPUT|SELECT") ||
          (e.keyCode === 37 && n.options.accessibility === !0
            ? n.changeSlide({
                data: {
                  message: n.options.rtl === !0 ? "next" : "previous",
                },
              })
            : e.keyCode === 39 &&
              n.options.accessibility === !0 &&
              n.changeSlide({
                data: {
                  message: n.options.rtl === !0 ? "previous" : "next",
                },
              }));
      }),
      (o.prototype.lazyLoad = function () {
        var e = this,
          n,
          l,
          d,
          p;

        function v(N) {
          r("img[data-lazy]", N).each(function () {
            var M = r(this),
              V = r(this).attr("data-lazy"),
              Y = r(this).attr("data-srcset"),
              X = r(this).attr("data-sizes") || e.$slider.attr("data-sizes"),
              z = document.createElement("img");
            (z.onload = function () {
              M.animate(
                {
                  opacity: 0,
                },
                100,
                function () {
                  Y && (M.attr("srcset", Y), X && M.attr("sizes", X)),
                    M.attr("src", V).animate(
                      {
                        opacity: 1,
                      },
                      200,
                      function () {
                        M.removeAttr(
                          "data-lazy data-srcset data-sizes"
                        ).removeClass("slick-loading");
                      }
                    ),
                    e.$slider.trigger("lazyLoaded", [e, M, V]);
                }
              );
            }),
              (z.onerror = function () {
                M.removeAttr("data-lazy")
                  .removeClass("slick-loading")
                  .addClass("slick-lazyload-error"),
                  e.$slider.trigger("lazyLoadError", [e, M, V]);
              }),
              (z.src = V);
          });
        }
        if (
          (e.options.centerMode === !0
            ? e.options.infinite === !0
              ? ((d = e.currentSlide + (e.options.slidesToShow / 2 + 1)),
                (p = d + e.options.slidesToShow + 2))
              : ((d = Math.max(
                  0,
                  e.currentSlide - (e.options.slidesToShow / 2 + 1)
                )),
                (p = 2 + (e.options.slidesToShow / 2 + 1) + e.currentSlide))
            : ((d = e.options.infinite
                ? e.options.slidesToShow + e.currentSlide
                : e.currentSlide),
              (p = Math.ceil(d + e.options.slidesToShow)),
              e.options.fade === !0 &&
                (d > 0 && d--, p <= e.slideCount && p++)),
          (n = e.$slider.find(".slick-slide").slice(d, p)),
          e.options.lazyLoad === "anticipated")
        )
          for (
            var T = d - 1, P = p, E = e.$slider.find(".slick-slide"), q = 0;
            q < e.options.slidesToScroll;
            q++
          )
            T < 0 && (T = e.slideCount - 1),
              (n = n.add(E.eq(T))),
              (n = n.add(E.eq(P))),
              T--,
              P++;
        v(n),
          e.slideCount <= e.options.slidesToShow
            ? ((l = e.$slider.find(".slick-slide")), v(l))
            : e.currentSlide >= e.slideCount - e.options.slidesToShow
            ? ((l = e.$slider
                .find(".slick-cloned")
                .slice(0, e.options.slidesToShow)),
              v(l))
            : e.currentSlide === 0 &&
              ((l = e.$slider
                .find(".slick-cloned")
                .slice(e.options.slidesToShow * -1)),
              v(l));
      }),
      (o.prototype.loadSlider = function () {
        var e = this;
        e.setPosition(),
          e.$slideTrack.css({
            opacity: 1,
          }),
          e.$slider.removeClass("slick-loading"),
          e.initUI(),
          e.options.lazyLoad === "progressive" && e.progressiveLazyLoad();
      }),
      (o.prototype.next = o.prototype.slickNext =
        function () {
          var e = this;
          e.changeSlide({
            data: {
              message: "next",
            },
          });
        }),
      (o.prototype.orientationChange = function () {
        var e = this;
        e.checkResponsive(), e.setPosition();
      }),
      (o.prototype.pause = o.prototype.slickPause =
        function () {
          var e = this;
          e.autoPlayClear(), (e.paused = !0);
        }),
      (o.prototype.play = o.prototype.slickPlay =
        function () {
          var e = this;
          e.autoPlay(),
            (e.options.autoplay = !0),
            (e.paused = !1),
            (e.focussed = !1),
            (e.interrupted = !1);
        }),
      (o.prototype.postSlide = function (e) {
        var n = this;
        if (
          !n.unslicked &&
          (n.$slider.trigger("afterChange", [n, e]),
          (n.animating = !1),
          n.slideCount > n.options.slidesToShow && n.setPosition(),
          (n.swipeLeft = null),
          n.options.autoplay && n.autoPlay(),
          n.options.accessibility === !0 &&
            (n.initADA(), n.options.focusOnChange))
        ) {
          var l = r(n.$slides.get(n.currentSlide));
          l.attr("tabindex", 0).focus();
        }
      }),
      (o.prototype.prev = o.prototype.slickPrev =
        function () {
          var e = this;
          e.changeSlide({
            data: {
              message: "previous",
            },
          });
        }),
      (o.prototype.preventDefault = function (e) {
        e.preventDefault();
      }),
      (o.prototype.progressiveLazyLoad = function (e) {
        e = e || 1;
        var n = this,
          l = r("img[data-lazy]", n.$slider),
          d,
          p,
          v,
          T,
          P;
        l.length
          ? ((d = l.first()),
            (p = d.attr("data-lazy")),
            (v = d.attr("data-srcset")),
            (T = d.attr("data-sizes") || n.$slider.attr("data-sizes")),
            (P = document.createElement("img")),
            (P.onload = function () {
              v && (d.attr("srcset", v), T && d.attr("sizes", T)),
                d
                  .attr("src", p)
                  .removeAttr("data-lazy data-srcset data-sizes")
                  .removeClass("slick-loading"),
                n.options.adaptiveHeight === !0 && n.setPosition(),
                n.$slider.trigger("lazyLoaded", [n, d, p]),
                n.progressiveLazyLoad();
            }),
            (P.onerror = function () {
              e < 3
                ? setTimeout(function () {
                    n.progressiveLazyLoad(e + 1);
                  }, 500)
                : (d
                    .removeAttr("data-lazy")
                    .removeClass("slick-loading")
                    .addClass("slick-lazyload-error"),
                  n.$slider.trigger("lazyLoadError", [n, d, p]),
                  n.progressiveLazyLoad());
            }),
            (P.src = p))
          : n.$slider.trigger("allImagesLoaded", [n]);
      }),
      (o.prototype.refresh = function (e) {
        var n = this,
          l,
          d;
        (d = n.slideCount - n.options.slidesToShow),
          !n.options.infinite && n.currentSlide > d && (n.currentSlide = d),
          n.slideCount <= n.options.slidesToShow && (n.currentSlide = 0),
          (l = n.currentSlide),
          n.destroy(!0),
          r.extend(n, n.initials, {
            currentSlide: l,
          }),
          n.init(),
          e ||
            n.changeSlide(
              {
                data: {
                  message: "index",
                  index: l,
                },
              },
              !1
            );
      }),
      (o.prototype.registerBreakpoints = function () {
        var e = this,
          n,
          l,
          d,
          p = e.options.responsive || null;
        if (r.type(p) === "array" && p.length) {
          e.respondTo = e.options.respondTo || "window";
          for (n in p)
            if (((d = e.breakpoints.length - 1), p.hasOwnProperty(n))) {
              for (l = p[n].breakpoint; d >= 0; )
                e.breakpoints[d] &&
                  e.breakpoints[d] === l &&
                  e.breakpoints.splice(d, 1),
                  d--;
              e.breakpoints.push(l), (e.breakpointSettings[l] = p[n].settings);
            }
          e.breakpoints.sort(function (v, T) {
            return e.options.mobileFirst ? v - T : T - v;
          });
        }
      }),
      (o.prototype.reinit = function () {
        var e = this;
        (e.$slides = e.$slideTrack
          .children(e.options.slide)
          .addClass("slick-slide")),
          (e.slideCount = e.$slides.length),
          e.currentSlide >= e.slideCount &&
            e.currentSlide !== 0 &&
            (e.currentSlide = e.currentSlide - e.options.slidesToScroll),
          e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0),
          e.registerBreakpoints(),
          e.setProps(),
          e.setupInfinite(),
          e.buildArrows(),
          e.updateArrows(),
          e.initArrowEvents(),
          e.buildDots(),
          e.updateDots(),
          e.initDotEvents(),
          e.cleanUpSlideEvents(),
          e.initSlideEvents(),
          e.checkResponsive(!1, !0),
          e.options.focusOnSelect === !0 &&
            r(e.$slideTrack).children().on("click.slick", e.selectHandler),
          e.setSlideClasses(
            typeof e.currentSlide == "number" ? e.currentSlide : 0
          ),
          e.setPosition(),
          e.focusHandler(),
          (e.paused = !e.options.autoplay),
          e.autoPlay(),
          e.$slider.trigger("reInit", [e]);
      }),
      (o.prototype.resize = function () {
        var e = this;
        r(window).width() !== e.windowWidth &&
          (clearTimeout(e.windowDelay),
          (e.windowDelay = window.setTimeout(function () {
            (e.windowWidth = r(window).width()),
              e.checkResponsive(),
              e.unslicked || e.setPosition();
          }, 50)));
      }),
      (o.prototype.removeSlide = o.prototype.slickRemove =
        function (e, n, l) {
          var d = this;
          if (
            (typeof e == "boolean"
              ? ((n = e), (e = n === !0 ? 0 : d.slideCount - 1))
              : (e = n === !0 ? --e : e),
            d.slideCount < 1 || e < 0 || e > d.slideCount - 1)
          )
            return !1;
          d.unload(),
            l === !0
              ? d.$slideTrack.children().remove()
              : d.$slideTrack.children(this.options.slide).eq(e).remove(),
            (d.$slides = d.$slideTrack.children(this.options.slide)),
            d.$slideTrack.children(this.options.slide).detach(),
            d.$slideTrack.append(d.$slides),
            (d.$slidesCache = d.$slides),
            d.reinit();
        }),
      (o.prototype.setCSS = function (e) {
        var n = this,
          l = {},
          d,
          p;
        n.options.rtl === !0 && (e = -e),
          (d = n.positionProp == "left" ? Math.ceil(e) + "px" : "0px"),
          (p = n.positionProp == "top" ? Math.ceil(e) + "px" : "0px"),
          (l[n.positionProp] = e),
          n.transformsEnabled === !1
            ? n.$slideTrack.css(l)
            : ((l = {}),
              n.cssTransitions === !1
                ? ((l[n.animType] = "translate(" + d + ", " + p + ")"),
                  n.$slideTrack.css(l))
                : ((l[n.animType] = "translate3d(" + d + ", " + p + ", 0px)"),
                  n.$slideTrack.css(l)));
      }),
      (o.prototype.setDimensions = function () {
        var e = this;
        e.options.vertical === !1
          ? e.options.centerMode === !0 &&
            e.$list.css({
              padding: "0px " + e.options.centerPadding,
            })
          : (e.$list.height(
              e.$slides.first().outerHeight(!0) * e.options.slidesToShow
            ),
            e.options.centerMode === !0 &&
              e.$list.css({
                padding: e.options.centerPadding + " 0px",
              })),
          (e.listWidth = e.$list.width()),
          (e.listHeight = e.$list.height()),
          e.options.vertical === !1 && e.options.variableWidth === !1
            ? ((e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow)),
              e.$slideTrack.width(
                Math.ceil(
                  e.slideWidth * e.$slideTrack.children(".slick-slide").length
                )
              ))
            : e.options.variableWidth === !0
            ? e.$slideTrack.width(5e3 * e.slideCount)
            : ((e.slideWidth = Math.ceil(e.listWidth)),
              e.$slideTrack.height(
                Math.ceil(
                  e.$slides.first().outerHeight(!0) *
                    e.$slideTrack.children(".slick-slide").length
                )
              ));
        var n = e.$slides.first().outerWidth(!0) - e.$slides.first().width();
        e.options.variableWidth === !1 &&
          e.$slideTrack.children(".slick-slide").width(e.slideWidth - n);
      }),
      (o.prototype.setFade = function () {
        var e = this,
          n;
        e.$slides.each(function (l, d) {
          (n = e.slideWidth * l * -1),
            e.options.rtl === !0
              ? r(d).css({
                  position: "relative",
                  right: n,
                  top: 0,
                  zIndex: e.options.zIndex - 2,
                  opacity: 0,
                })
              : r(d).css({
                  position: "relative",
                  left: n,
                  top: 0,
                  zIndex: e.options.zIndex - 2,
                  opacity: 0,
                });
        }),
          e.$slides.eq(e.currentSlide).css({
            zIndex: e.options.zIndex - 1,
            opacity: 1,
          });
      }),
      (o.prototype.setHeight = function () {
        var e = this;
        if (
          e.options.slidesToShow === 1 &&
          e.options.adaptiveHeight === !0 &&
          e.options.vertical === !1
        ) {
          var n = e.$slides.eq(e.currentSlide).outerHeight(!0);
          e.$list.css("height", n);
        }
      }),
      (o.prototype.setOption = o.prototype.slickSetOption =
        function () {
          var e = this,
            n,
            l,
            d,
            p,
            v = !1,
            T;
          if (
            (r.type(arguments[0]) === "object"
              ? ((d = arguments[0]), (v = arguments[1]), (T = "multiple"))
              : r.type(arguments[0]) === "string" &&
                ((d = arguments[0]),
                (p = arguments[1]),
                (v = arguments[2]),
                arguments[0] === "responsive" &&
                r.type(arguments[1]) === "array"
                  ? (T = "responsive")
                  : typeof arguments[1] < "u" && (T = "single")),
            T === "single")
          )
            e.options[d] = p;
          else if (T === "multiple")
            r.each(d, function (P, E) {
              e.options[P] = E;
            });
          else if (T === "responsive")
            for (l in p)
              if (r.type(e.options.responsive) !== "array")
                e.options.responsive = [p[l]];
              else {
                for (n = e.options.responsive.length - 1; n >= 0; )
                  e.options.responsive[n].breakpoint === p[l].breakpoint &&
                    e.options.responsive.splice(n, 1),
                    n--;
                e.options.responsive.push(p[l]);
              }
          v && (e.unload(), e.reinit());
        }),
      (o.prototype.setPosition = function () {
        var e = this;
        e.setDimensions(),
          e.setHeight(),
          e.options.fade === !1
            ? e.setCSS(e.getLeft(e.currentSlide))
            : e.setFade(),
          e.$slider.trigger("setPosition", [e]);
      }),
      (o.prototype.setProps = function () {
        var e = this,
          n = document.body.style;
        (e.positionProp = e.options.vertical === !0 ? "top" : "left"),
          e.positionProp === "top"
            ? e.$slider.addClass("slick-vertical")
            : e.$slider.removeClass("slick-vertical"),
          (n.WebkitTransition !== void 0 ||
            n.MozTransition !== void 0 ||
            n.msTransition !== void 0) &&
            e.options.useCSS === !0 &&
            (e.cssTransitions = !0),
          e.options.fade &&
            (typeof e.options.zIndex == "number"
              ? e.options.zIndex < 3 && (e.options.zIndex = 3)
              : (e.options.zIndex = e.defaults.zIndex)),
          n.OTransform !== void 0 &&
            ((e.animType = "OTransform"),
            (e.transformType = "-o-transform"),
            (e.transitionType = "OTransition"),
            n.perspectiveProperty === void 0 &&
              n.webkitPerspective === void 0 &&
              (e.animType = !1)),
          n.MozTransform !== void 0 &&
            ((e.animType = "MozTransform"),
            (e.transformType = "-moz-transform"),
            (e.transitionType = "MozTransition"),
            n.perspectiveProperty === void 0 &&
              n.MozPerspective === void 0 &&
              (e.animType = !1)),
          n.webkitTransform !== void 0 &&
            ((e.animType = "webkitTransform"),
            (e.transformType = "-webkit-transform"),
            (e.transitionType = "webkitTransition"),
            n.perspectiveProperty === void 0 &&
              n.webkitPerspective === void 0 &&
              (e.animType = !1)),
          n.msTransform !== void 0 &&
            ((e.animType = "msTransform"),
            (e.transformType = "-ms-transform"),
            (e.transitionType = "msTransition"),
            n.msTransform === void 0 && (e.animType = !1)),
          n.transform !== void 0 &&
            e.animType !== !1 &&
            ((e.animType = "transform"),
            (e.transformType = "transform"),
            (e.transitionType = "transition")),
          (e.transformsEnabled =
            e.options.useTransform && e.animType !== null && e.animType !== !1);
      }),
      (o.prototype.setSlideClasses = function (e) {
        var n = this,
          l,
          d,
          p,
          v;
        if (
          ((d = n.$slider
            .find(".slick-slide")
            .removeClass("slick-active slick-center slick-current")
            .attr("aria-hidden", "true")),
          n.$slides.eq(e).addClass("slick-current"),
          n.options.centerMode === !0)
        ) {
          var T = n.options.slidesToShow % 2 === 0 ? 1 : 0;
          (l = Math.floor(n.options.slidesToShow / 2)),
            n.options.infinite === !0 &&
              (e >= l && e <= n.slideCount - 1 - l
                ? n.$slides
                    .slice(e - l + T, e + l + 1)
                    .addClass("slick-active")
                    .attr("aria-hidden", "false")
                : ((p = n.options.slidesToShow + e),
                  d
                    .slice(p - l + 1 + T, p + l + 2)
                    .addClass("slick-active")
                    .attr("aria-hidden", "false")),
              e === 0
                ? d
                    .eq(d.length - 1 - n.options.slidesToShow)
                    .addClass("slick-center")
                : e === n.slideCount - 1 &&
                  d.eq(n.options.slidesToShow).addClass("slick-center")),
            n.$slides.eq(e).addClass("slick-center");
        } else
          e >= 0 && e <= n.slideCount - n.options.slidesToShow
            ? n.$slides
                .slice(e, e + n.options.slidesToShow)
                .addClass("slick-active")
                .attr("aria-hidden", "false")
            : d.length <= n.options.slidesToShow
            ? d.addClass("slick-active").attr("aria-hidden", "false")
            : ((v = n.slideCount % n.options.slidesToShow),
              (p = n.options.infinite === !0 ? n.options.slidesToShow + e : e),
              n.options.slidesToShow == n.options.slidesToScroll &&
              n.slideCount - e < n.options.slidesToShow
                ? d
                    .slice(p - (n.options.slidesToShow - v), p + v)
                    .addClass("slick-active")
                    .attr("aria-hidden", "false")
                : d
                    .slice(p, p + n.options.slidesToShow)
                    .addClass("slick-active")
                    .attr("aria-hidden", "false"));
        (n.options.lazyLoad === "ondemand" ||
          n.options.lazyLoad === "anticipated") &&
          n.lazyLoad();
      }),
      (o.prototype.setupInfinite = function () {
        var e = this,
          n,
          l,
          d;
        if (
          (e.options.fade === !0 && (e.options.centerMode = !1),
          e.options.infinite === !0 &&
            e.options.fade === !1 &&
            ((l = null), e.slideCount > e.options.slidesToShow))
        ) {
          for (
            e.options.centerMode === !0
              ? (d = e.options.slidesToShow + 1)
              : (d = e.options.slidesToShow),
              n = e.slideCount;
            n > e.slideCount - d;
            n -= 1
          )
            (l = n - 1),
              r(e.$slides[l])
                .clone(!0)
                .attr("id", "")
                .attr("data-slick-index", l - e.slideCount)
                .prependTo(e.$slideTrack)
                .addClass("slick-cloned");
          for (n = 0; n < d + e.slideCount; n += 1)
            (l = n),
              r(e.$slides[l])
                .clone(!0)
                .attr("id", "")
                .attr("data-slick-index", l + e.slideCount)
                .appendTo(e.$slideTrack)
                .addClass("slick-cloned");
          e.$slideTrack
            .find(".slick-cloned")
            .find("[id]")
            .each(function () {
              r(this).attr("id", "");
            });
        }
      }),
      (o.prototype.interrupt = function (e) {
        var n = this;
        e || n.autoPlay(), (n.interrupted = e);
      }),
      (o.prototype.selectHandler = function (e) {
        var n = this,
          l = r(e.target).is(".slick-slide")
            ? r(e.target)
            : r(e.target).parents(".slick-slide"),
          d = parseInt(l.attr("data-slick-index"));
        if ((d || (d = 0), n.slideCount <= n.options.slidesToShow)) {
          n.slideHandler(d, !1, !0);
          return;
        }
        n.slideHandler(d);
      }),
      (o.prototype.slideHandler = function (e, n, l) {
        var d,
          p,
          v,
          T,
          P = null,
          E = this,
          q;
        if (
          ((n = n || !1),
          !(E.animating === !0 && E.options.waitForAnimate === !0) &&
            !(E.options.fade === !0 && E.currentSlide === e))
        ) {
          if (
            (n === !1 && E.asNavFor(e),
            (d = e),
            (P = E.getLeft(d)),
            (T = E.getLeft(E.currentSlide)),
            (E.currentLeft = E.swipeLeft === null ? T : E.swipeLeft),
            E.options.infinite === !1 &&
              E.options.centerMode === !1 &&
              (e < 0 || e > E.getDotCount() * E.options.slidesToScroll))
          ) {
            E.options.fade === !1 &&
              ((d = E.currentSlide),
              l !== !0 && E.slideCount > E.options.slidesToShow
                ? E.animateSlide(T, function () {
                    E.postSlide(d);
                  })
                : E.postSlide(d));
            return;
          } else if (
            E.options.infinite === !1 &&
            E.options.centerMode === !0 &&
            (e < 0 || e > E.slideCount - E.options.slidesToScroll)
          ) {
            E.options.fade === !1 &&
              ((d = E.currentSlide),
              l !== !0 && E.slideCount > E.options.slidesToShow
                ? E.animateSlide(T, function () {
                    E.postSlide(d);
                  })
                : E.postSlide(d));
            return;
          }
          if (
            (E.options.autoplay && clearInterval(E.autoPlayTimer),
            d < 0
              ? E.slideCount % E.options.slidesToScroll !== 0
                ? (p = E.slideCount - (E.slideCount % E.options.slidesToScroll))
                : (p = E.slideCount + d)
              : d >= E.slideCount
              ? E.slideCount % E.options.slidesToScroll !== 0
                ? (p = 0)
                : (p = d - E.slideCount)
              : (p = d),
            (E.animating = !0),
            E.$slider.trigger("beforeChange", [E, E.currentSlide, p]),
            (v = E.currentSlide),
            (E.currentSlide = p),
            E.setSlideClasses(E.currentSlide),
            E.options.asNavFor &&
              ((q = E.getNavTarget()),
              (q = q.slick("getSlick")),
              q.slideCount <= q.options.slidesToShow &&
                q.setSlideClasses(E.currentSlide)),
            E.updateDots(),
            E.updateArrows(),
            E.options.fade === !0)
          ) {
            l !== !0
              ? (E.fadeSlideOut(v),
                E.fadeSlide(p, function () {
                  E.postSlide(p);
                }))
              : E.postSlide(p),
              E.animateHeight();
            return;
          }
          l !== !0 && E.slideCount > E.options.slidesToShow
            ? E.animateSlide(P, function () {
                E.postSlide(p);
              })
            : E.postSlide(p);
        }
      }),
      (o.prototype.startLoad = function () {
        var e = this;
        e.options.arrows === !0 &&
          e.slideCount > e.options.slidesToShow &&
          (e.$prevArrow.hide(), e.$nextArrow.hide()),
          e.options.dots === !0 &&
            e.slideCount > e.options.slidesToShow &&
            e.$dots.hide(),
          e.$slider.addClass("slick-loading");
      }),
      (o.prototype.swipeDirection = function () {
        var e,
          n,
          l,
          d,
          p = this;
        return (
          (e = p.touchObject.startX - p.touchObject.curX),
          (n = p.touchObject.startY - p.touchObject.curY),
          (l = Math.atan2(n, e)),
          (d = Math.round((l * 180) / Math.PI)),
          d < 0 && (d = 360 - Math.abs(d)),
          (d <= 45 && d >= 0) || (d <= 360 && d >= 315)
            ? p.options.rtl === !1
              ? "left"
              : "right"
            : d >= 135 && d <= 225
            ? p.options.rtl === !1
              ? "right"
              : "left"
            : p.options.verticalSwiping === !0
            ? d >= 35 && d <= 135
              ? "down"
              : "up"
            : "vertical"
        );
      }),
      (o.prototype.swipeEnd = function (e) {
        var n = this,
          l,
          d;
        if (((n.dragging = !1), (n.swiping = !1), n.scrolling))
          return (n.scrolling = !1), !1;
        if (
          ((n.interrupted = !1),
          (n.shouldClick = !(n.touchObject.swipeLength > 10)),
          n.touchObject.curX === void 0)
        )
          return !1;
        if (
          (n.touchObject.edgeHit === !0 &&
            n.$slider.trigger("edge", [n, n.swipeDirection()]),
          n.touchObject.swipeLength >= n.touchObject.minSwipe)
        ) {
          switch (((d = n.swipeDirection()), d)) {
            case "left":
            case "down":
              (l = n.options.swipeToSlide
                ? n.checkNavigable(n.currentSlide + n.getSlideCount())
                : n.currentSlide + n.getSlideCount()),
                (n.currentDirection = 0);
              break;
            case "right":
            case "up":
              (l = n.options.swipeToSlide
                ? n.checkNavigable(n.currentSlide - n.getSlideCount())
                : n.currentSlide - n.getSlideCount()),
                (n.currentDirection = 1);
              break;
          }
          d != "vertical" &&
            (n.slideHandler(l),
            (n.touchObject = {}),
            n.$slider.trigger("swipe", [n, d]));
        } else
          n.touchObject.startX !== n.touchObject.curX &&
            (n.slideHandler(n.currentSlide), (n.touchObject = {}));
      }),
      (o.prototype.swipeHandler = function (e) {
        var n = this;
        if (
          !(
            n.options.swipe === !1 ||
            ("ontouchend" in document && n.options.swipe === !1)
          ) &&
          !(n.options.draggable === !1 && e.type.indexOf("mouse") !== -1)
        )
          switch (
            ((n.touchObject.fingerCount =
              e.originalEvent && e.originalEvent.touches !== void 0
                ? e.originalEvent.touches.length
                : 1),
            (n.touchObject.minSwipe = n.listWidth / n.options.touchThreshold),
            n.options.verticalSwiping === !0 &&
              (n.touchObject.minSwipe =
                n.listHeight / n.options.touchThreshold),
            e.data.action)
          ) {
            case "start":
              n.swipeStart(e);
              break;
            case "move":
              n.swipeMove(e);
              break;
            case "end":
              n.swipeEnd(e);
              break;
          }
      }),
      (o.prototype.swipeMove = function (e) {
        var n = this,
          l,
          d,
          p,
          v,
          T,
          P;
        if (
          ((T = e.originalEvent !== void 0 ? e.originalEvent.touches : null),
          !n.dragging || n.scrolling || (T && T.length !== 1))
        )
          return !1;
        if (
          ((l = n.getLeft(n.currentSlide)),
          (n.touchObject.curX = T !== void 0 ? T[0].pageX : e.clientX),
          (n.touchObject.curY = T !== void 0 ? T[0].pageY : e.clientY),
          (n.touchObject.swipeLength = Math.round(
            Math.sqrt(Math.pow(n.touchObject.curX - n.touchObject.startX, 2))
          )),
          (P = Math.round(
            Math.sqrt(Math.pow(n.touchObject.curY - n.touchObject.startY, 2))
          )),
          !n.options.verticalSwiping && !n.swiping && P > 4)
        )
          return (n.scrolling = !0), !1;
        if (
          (n.options.verticalSwiping === !0 && (n.touchObject.swipeLength = P),
          (d = n.swipeDirection()),
          e.originalEvent !== void 0 &&
            n.touchObject.swipeLength > 4 &&
            ((n.swiping = !0), e.preventDefault()),
          (v =
            (n.options.rtl === !1 ? 1 : -1) *
            (n.touchObject.curX > n.touchObject.startX ? 1 : -1)),
          n.options.verticalSwiping === !0 &&
            (v = n.touchObject.curY > n.touchObject.startY ? 1 : -1),
          (p = n.touchObject.swipeLength),
          (n.touchObject.edgeHit = !1),
          n.options.infinite === !1 &&
            ((n.currentSlide === 0 && d === "right") ||
              (n.currentSlide >= n.getDotCount() && d === "left")) &&
            ((p = n.touchObject.swipeLength * n.options.edgeFriction),
            (n.touchObject.edgeHit = !0)),
          n.options.vertical === !1
            ? (n.swipeLeft = l + p * v)
            : (n.swipeLeft = l + p * (n.$list.height() / n.listWidth) * v),
          n.options.verticalSwiping === !0 && (n.swipeLeft = l + p * v),
          n.options.fade === !0 || n.options.touchMove === !1)
        )
          return !1;
        if (n.animating === !0) return (n.swipeLeft = null), !1;
        n.setCSS(n.swipeLeft);
      }),
      (o.prototype.swipeStart = function (e) {
        var n = this,
          l;
        if (
          ((n.interrupted = !0),
          n.touchObject.fingerCount !== 1 ||
            n.slideCount <= n.options.slidesToShow)
        )
          return (n.touchObject = {}), !1;
        e.originalEvent !== void 0 &&
          e.originalEvent.touches !== void 0 &&
          (l = e.originalEvent.touches[0]),
          (n.touchObject.startX = n.touchObject.curX =
            l !== void 0 ? l.pageX : e.clientX),
          (n.touchObject.startY = n.touchObject.curY =
            l !== void 0 ? l.pageY : e.clientY),
          (n.dragging = !0);
      }),
      (o.prototype.unfilterSlides = o.prototype.slickUnfilter =
        function () {
          var e = this;
          e.$slidesCache !== null &&
            (e.unload(),
            e.$slideTrack.children(this.options.slide).detach(),
            e.$slidesCache.appendTo(e.$slideTrack),
            e.reinit());
        }),
      (o.prototype.unload = function () {
        var e = this;
        r(".slick-cloned", e.$slider).remove(),
          e.$dots && e.$dots.remove(),
          e.$prevArrow &&
            e.htmlExpr.test(e.options.prevArrow) &&
            e.$prevArrow.remove(),
          e.$nextArrow &&
            e.htmlExpr.test(e.options.nextArrow) &&
            e.$nextArrow.remove(),
          e.$slides
            .removeClass("slick-slide slick-active slick-visible slick-current")
            .attr("aria-hidden", "true")
            .css("width", "");
      }),
      (o.prototype.unslick = function (e) {
        var n = this;
        n.$slider.trigger("unslick", [n, e]), n.destroy();
      }),
      (o.prototype.updateArrows = function () {
        var e = this;
        Math.floor(e.options.slidesToShow / 2),
          e.options.arrows === !0 &&
            e.slideCount > e.options.slidesToShow &&
            !e.options.infinite &&
            (e.$prevArrow
              .removeClass("slick-disabled")
              .attr("aria-disabled", "false"),
            e.$nextArrow
              .removeClass("slick-disabled")
              .attr("aria-disabled", "false"),
            e.currentSlide === 0
              ? (e.$prevArrow
                  .addClass("slick-disabled")
                  .attr("aria-disabled", "true"),
                e.$nextArrow
                  .removeClass("slick-disabled")
                  .attr("aria-disabled", "false"))
              : ((e.currentSlide >= e.slideCount - e.options.slidesToShow &&
                  e.options.centerMode === !1) ||
                  (e.currentSlide >= e.slideCount - 1 &&
                    e.options.centerMode === !0)) &&
                (e.$nextArrow
                  .addClass("slick-disabled")
                  .attr("aria-disabled", "true"),
                e.$prevArrow
                  .removeClass("slick-disabled")
                  .attr("aria-disabled", "false")));
      }),
      (o.prototype.updateDots = function () {
        var e = this;
        e.$dots !== null &&
          (e.$dots.find("li").removeClass("slick-active").end(),
          e.$dots
            .find("li")
            .eq(Math.floor(e.currentSlide / e.options.slidesToScroll))
            .addClass("slick-active"));
      }),
      (o.prototype.visibility = function () {
        var e = this;
        e.options.autoplay &&
          (document[e.hidden] ? (e.interrupted = !0) : (e.interrupted = !1));
      }),
      (r.fn.slick = function () {
        var e = this,
          n = arguments[0],
          l = Array.prototype.slice.call(arguments, 1),
          d = e.length,
          p,
          v;
        for (p = 0; p < d; p++)
          if (
            (typeof n == "object" || typeof n > "u"
              ? (e[p].slick = new o(e[p], n))
              : (v = e[p].slick[n].apply(e[p].slick, l)),
            typeof v < "u")
          )
            return v;
        return e;
      });
  });
})(Yu);
/*! @vimeo/player v2.23.0 | (c) 2024 Vimeo | MIT License | https://github.com/vimeo/player.js */
function Xo(s, i) {
  var r = Object.keys(s);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(s);
    i &&
      (o = o.filter(function (e) {
        return Object.getOwnPropertyDescriptor(s, e).enumerable;
      })),
      r.push.apply(r, o);
  }
  return r;
}

function Yo(s) {
  for (var i = 1; i < arguments.length; i++) {
    var r = arguments[i] != null ? arguments[i] : {};
    i % 2
      ? Xo(Object(r), !0).forEach(function (o) {
          Rr(s, o, r[o]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(s, Object.getOwnPropertyDescriptors(r))
      : Xo(Object(r)).forEach(function (o) {
          Object.defineProperty(s, o, Object.getOwnPropertyDescriptor(r, o));
        });
  }
  return s;
}

function tt() {
  tt = function () {
    return s;
  };
  var s = {},
    i = Object.prototype,
    r = i.hasOwnProperty,
    o =
      Object.defineProperty ||
      function (B, G, Z) {
        B[G] = Z.value;
      },
    e = typeof Symbol == "function" ? Symbol : {},
    n = e.iterator || "@@iterator",
    l = e.asyncIterator || "@@asyncIterator",
    d = e.toStringTag || "@@toStringTag";

  function p(B, G, Z) {
    return (
      Object.defineProperty(B, G, {
        value: Z,
        enumerable: !0,
        configurable: !0,
        writable: !0,
      }),
      B[G]
    );
  }
  try {
    p({}, "");
  } catch {
    p = function (G, Z, ye) {
      return (G[Z] = ye);
    };
  }

  function v(B, G, Z, ye) {
    var ie = G && G.prototype instanceof E ? G : E,
      Ae = Object.create(ie.prototype),
      je = new Ee(ye || []);
    return (
      o(Ae, "_invoke", {
        value: K(B, Z, je),
      }),
      Ae
    );
  }

  function T(B, G, Z) {
    try {
      return {
        type: "normal",
        arg: B.call(G, Z),
      };
    } catch (ye) {
      return {
        type: "throw",
        arg: ye,
      };
    }
  }
  s.wrap = v;
  var P = {};

  function E() {}

  function q() {}

  function N() {}
  var M = {};
  p(M, n, function () {
    return this;
  });
  var V = Object.getPrototypeOf,
    Y = V && V(V(Ge([])));
  Y && Y !== i && r.call(Y, n) && (M = Y);
  var X = (N.prototype = E.prototype = Object.create(M));

  function z(B) {
    ["next", "throw", "return"].forEach(function (G) {
      p(B, G, function (Z) {
        return this._invoke(G, Z);
      });
    });
  }

  function J(B, G) {
    function Z(ie, Ae, je, Xe) {
      var Ue = T(B[ie], B, Ae);
      if (Ue.type !== "throw") {
        var qe = Ue.arg,
          Ot = qe.value;
        return Ot && typeof Ot == "object" && r.call(Ot, "__await")
          ? G.resolve(Ot.__await).then(
              function (Je) {
                Z("next", Je, je, Xe);
              },
              function (Je) {
                Z("throw", Je, je, Xe);
              }
            )
          : G.resolve(Ot).then(
              function (Je) {
                (qe.value = Je), je(qe);
              },
              function (Je) {
                return Z("throw", Je, je, Xe);
              }
            );
      }
      Xe(Ue.arg);
    }
    var ye;
    o(this, "_invoke", {
      value: function (ie, Ae) {
        function je() {
          return new G(function (Xe, Ue) {
            Z(ie, Ae, Xe, Ue);
          });
        }
        return (ye = ye ? ye.then(je, je) : je());
      },
    });
  }

  function K(B, G, Z) {
    var ye = "suspendedStart";
    return function (ie, Ae) {
      if (ye === "executing") throw new Error("Generator is already running");
      if (ye === "completed") {
        if (ie === "throw") throw Ae;
        return $t();
      }
      for (Z.method = ie, Z.arg = Ae; ; ) {
        var je = Z.delegate;
        if (je) {
          var Xe = f(je, Z);
          if (Xe) {
            if (Xe === P) continue;
            return Xe;
          }
        }
        if (Z.method === "next") Z.sent = Z._sent = Z.arg;
        else if (Z.method === "throw") {
          if (ye === "suspendedStart") throw ((ye = "completed"), Z.arg);
          Z.dispatchException(Z.arg);
        } else Z.method === "return" && Z.abrupt("return", Z.arg);
        ye = "executing";
        var Ue = T(B, G, Z);
        if (Ue.type === "normal") {
          if (((ye = Z.done ? "completed" : "suspendedYield"), Ue.arg === P))
            continue;
          return {
            value: Ue.arg,
            done: Z.done,
          };
        }
        Ue.type === "throw" &&
          ((ye = "completed"), (Z.method = "throw"), (Z.arg = Ue.arg));
      }
    };
  }

  function f(B, G) {
    var Z = G.method,
      ye = B.iterator[Z];
    if (ye === void 0)
      return (
        (G.delegate = null),
        (Z === "throw" &&
          B.iterator.return &&
          ((G.method = "return"),
          (G.arg = void 0),
          f(B, G),
          G.method === "throw")) ||
          (Z !== "return" &&
            ((G.method = "throw"),
            (G.arg = new TypeError(
              "The iterator does not provide a '" + Z + "' method"
            )))),
        P
      );
    var ie = T(ye, B.iterator, G.arg);
    if (ie.type === "throw")
      return (G.method = "throw"), (G.arg = ie.arg), (G.delegate = null), P;
    var Ae = ie.arg;
    return Ae
      ? Ae.done
        ? ((G[B.resultName] = Ae.value),
          (G.next = B.nextLoc),
          G.method !== "return" && ((G.method = "next"), (G.arg = void 0)),
          (G.delegate = null),
          P)
        : Ae
      : ((G.method = "throw"),
        (G.arg = new TypeError("iterator result is not an object")),
        (G.delegate = null),
        P);
  }

  function Se(B) {
    var G = {
      tryLoc: B[0],
    };
    1 in B && (G.catchLoc = B[1]),
      2 in B && ((G.finallyLoc = B[2]), (G.afterLoc = B[3])),
      this.tryEntries.push(G);
  }

  function ne(B) {
    var G = B.completion || {};
    (G.type = "normal"), delete G.arg, (B.completion = G);
  }

  function Ee(B) {
    (this.tryEntries = [
      {
        tryLoc: "root",
      },
    ]),
      B.forEach(Se, this),
      this.reset(!0);
  }

  function Ge(B) {
    if (B) {
      var G = B[n];
      if (G) return G.call(B);
      if (typeof B.next == "function") return B;
      if (!isNaN(B.length)) {
        var Z = -1,
          ye = function ie() {
            for (; ++Z < B.length; )
              if (r.call(B, Z)) return (ie.value = B[Z]), (ie.done = !1), ie;
            return (ie.value = void 0), (ie.done = !0), ie;
          };
        return (ye.next = ye);
      }
    }
    return {
      next: $t,
    };
  }

  function $t() {
    return {
      value: void 0,
      done: !0,
    };
  }
  return (
    (q.prototype = N),
    o(X, "constructor", {
      value: N,
      configurable: !0,
    }),
    o(N, "constructor", {
      value: q,
      configurable: !0,
    }),
    (q.displayName = p(N, d, "GeneratorFunction")),
    (s.isGeneratorFunction = function (B) {
      var G = typeof B == "function" && B.constructor;
      return (
        !!G && (G === q || (G.displayName || G.name) === "GeneratorFunction")
      );
    }),
    (s.mark = function (B) {
      return (
        Object.setPrototypeOf
          ? Object.setPrototypeOf(B, N)
          : ((B.__proto__ = N), p(B, d, "GeneratorFunction")),
        (B.prototype = Object.create(X)),
        B
      );
    }),
    (s.awrap = function (B) {
      return {
        __await: B,
      };
    }),
    z(J.prototype),
    p(J.prototype, l, function () {
      return this;
    }),
    (s.AsyncIterator = J),
    (s.async = function (B, G, Z, ye, ie) {
      ie === void 0 && (ie = Promise);
      var Ae = new J(v(B, G, Z, ye), ie);
      return s.isGeneratorFunction(G)
        ? Ae
        : Ae.next().then(function (je) {
            return je.done ? je.value : Ae.next();
          });
    }),
    z(X),
    p(X, d, "Generator"),
    p(X, n, function () {
      return this;
    }),
    p(X, "toString", function () {
      return "[object Generator]";
    }),
    (s.keys = function (B) {
      var G = Object(B),
        Z = [];
      for (var ye in G) Z.push(ye);
      return (
        Z.reverse(),
        function ie() {
          for (; Z.length; ) {
            var Ae = Z.pop();
            if (Ae in G) return (ie.value = Ae), (ie.done = !1), ie;
          }
          return (ie.done = !0), ie;
        }
      );
    }),
    (s.values = Ge),
    (Ee.prototype = {
      constructor: Ee,
      reset: function (B) {
        if (
          ((this.prev = 0),
          (this.next = 0),
          (this.sent = this._sent = void 0),
          (this.done = !1),
          (this.delegate = null),
          (this.method = "next"),
          (this.arg = void 0),
          this.tryEntries.forEach(ne),
          !B)
        )
          for (var G in this)
            G.charAt(0) === "t" &&
              r.call(this, G) &&
              !isNaN(+G.slice(1)) &&
              (this[G] = void 0);
      },
      stop: function () {
        this.done = !0;
        var B = this.tryEntries[0].completion;
        if (B.type === "throw") throw B.arg;
        return this.rval;
      },
      dispatchException: function (B) {
        if (this.done) throw B;
        var G = this;

        function Z(Ue, qe) {
          return (
            (Ae.type = "throw"),
            (Ae.arg = B),
            (G.next = Ue),
            qe && ((G.method = "next"), (G.arg = void 0)),
            !!qe
          );
        }
        for (var ye = this.tryEntries.length - 1; ye >= 0; --ye) {
          var ie = this.tryEntries[ye],
            Ae = ie.completion;
          if (ie.tryLoc === "root") return Z("end");
          if (ie.tryLoc <= this.prev) {
            var je = r.call(ie, "catchLoc"),
              Xe = r.call(ie, "finallyLoc");
            if (je && Xe) {
              if (this.prev < ie.catchLoc) return Z(ie.catchLoc, !0);
              if (this.prev < ie.finallyLoc) return Z(ie.finallyLoc);
            } else if (je) {
              if (this.prev < ie.catchLoc) return Z(ie.catchLoc, !0);
            } else {
              if (!Xe)
                throw new Error("try statement without catch or finally");
              if (this.prev < ie.finallyLoc) return Z(ie.finallyLoc);
            }
          }
        }
      },
      abrupt: function (B, G) {
        for (var Z = this.tryEntries.length - 1; Z >= 0; --Z) {
          var ye = this.tryEntries[Z];
          if (
            ye.tryLoc <= this.prev &&
            r.call(ye, "finallyLoc") &&
            this.prev < ye.finallyLoc
          ) {
            var ie = ye;
            break;
          }
        }
        ie &&
          (B === "break" || B === "continue") &&
          ie.tryLoc <= G &&
          G <= ie.finallyLoc &&
          (ie = null);
        var Ae = ie ? ie.completion : {};
        return (
          (Ae.type = B),
          (Ae.arg = G),
          ie
            ? ((this.method = "next"), (this.next = ie.finallyLoc), P)
            : this.complete(Ae)
        );
      },
      complete: function (B, G) {
        if (B.type === "throw") throw B.arg;
        return (
          B.type === "break" || B.type === "continue"
            ? (this.next = B.arg)
            : B.type === "return"
            ? ((this.rval = this.arg = B.arg),
              (this.method = "return"),
              (this.next = "end"))
            : B.type === "normal" && G && (this.next = G),
          P
        );
      },
      finish: function (B) {
        for (var G = this.tryEntries.length - 1; G >= 0; --G) {
          var Z = this.tryEntries[G];
          if (Z.finallyLoc === B)
            return this.complete(Z.completion, Z.afterLoc), ne(Z), P;
        }
      },
      catch: function (B) {
        for (var G = this.tryEntries.length - 1; G >= 0; --G) {
          var Z = this.tryEntries[G];
          if (Z.tryLoc === B) {
            var ye = Z.completion;
            if (ye.type === "throw") {
              var ie = ye.arg;
              ne(Z);
            }
            return ie;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function (B, G, Z) {
        return (
          (this.delegate = {
            iterator: Ge(B),
            resultName: G,
            nextLoc: Z,
          }),
          this.method === "next" && (this.arg = void 0),
          P
        );
      },
    }),
    s
  );
}

function Jo(s, i, r, o, e, n, l) {
  try {
    var d = s[n](l),
      p = d.value;
  } catch (v) {
    r(v);
    return;
  }
  d.done ? i(p) : Promise.resolve(p).then(o, e);
}

function Cn(s) {
  return function () {
    var i = this,
      r = arguments;
    return new Promise(function (o, e) {
      var n = s.apply(i, r);

      function l(p) {
        Jo(n, o, e, l, d, "next", p);
      }

      function d(p) {
        Jo(n, o, e, l, d, "throw", p);
      }
      l(void 0);
    });
  };
}

function qs(s, i) {
  if (!(s instanceof i))
    throw new TypeError("Cannot call a class as a function");
}

function Ju(s, i) {
  for (var r = 0; r < i.length; r++) {
    var o = i[r];
    (o.enumerable = o.enumerable || !1),
      (o.configurable = !0),
      "value" in o && (o.writable = !0),
      Object.defineProperty(s, Bs(o.key), o);
  }
}

function $s(s, i, r) {
  return (
    i && Ju(s.prototype, i),
    Object.defineProperty(s, "prototype", {
      writable: !1,
    }),
    s
  );
}

function Rr(s, i, r) {
  return (
    (i = Bs(i)),
    i in s
      ? Object.defineProperty(s, i, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (s[i] = r),
    s
  );
}

function Ku(s, i) {
  if (typeof i != "function" && i !== null)
    throw new TypeError("Super expression must either be null or a function");
  (s.prototype = Object.create(i && i.prototype, {
    constructor: {
      value: s,
      writable: !0,
      configurable: !0,
    },
  })),
    Object.defineProperty(s, "prototype", {
      writable: !1,
    }),
    i && lr(s, i);
}

function ar(s) {
  return (
    (ar = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }),
    ar(s)
  );
}

function lr(s, i) {
  return (
    (lr = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (o, e) {
          return (o.__proto__ = e), o;
        }),
    lr(s, i)
  );
}

function zs() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function") return !0;
  try {
    return (
      Boolean.prototype.valueOf.call(
        Reflect.construct(Boolean, [], function () {})
      ),
      !0
    );
  } catch {
    return !1;
  }
}

function Nr(s, i, r) {
  return (
    zs()
      ? (Nr = Reflect.construct.bind())
      : (Nr = function (e, n, l) {
          var d = [null];
          d.push.apply(d, n);
          var p = Function.bind.apply(e, d),
            v = new p();
          return l && lr(v, l.prototype), v;
        }),
    Nr.apply(null, arguments)
  );
}

function Qu(s) {
  return Function.toString.call(s).indexOf("[native code]") !== -1;
}

function qi(s) {
  var i = typeof Map == "function" ? new Map() : void 0;
  return (
    (qi = function (o) {
      if (o === null || !Qu(o)) return o;
      if (typeof o != "function")
        throw new TypeError(
          "Super expression must either be null or a function"
        );
      if (typeof i < "u") {
        if (i.has(o)) return i.get(o);
        i.set(o, e);
      }

      function e() {
        return Nr(o, arguments, ar(this).constructor);
      }
      return (
        (e.prototype = Object.create(o.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0,
          },
        })),
        lr(e, o)
      );
    }),
    qi(s)
  );
}

function Lr(s) {
  if (s === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  return s;
}

function Zu(s, i) {
  if (i && (typeof i == "object" || typeof i == "function")) return i;
  if (i !== void 0)
    throw new TypeError(
      "Derived constructors may only return object or undefined"
    );
  return Lr(s);
}

function ec(s) {
  var i = zs();
  return function () {
    var o = ar(s),
      e;
    if (i) {
      var n = ar(this).constructor;
      e = Reflect.construct(o, arguments, n);
    } else e = o.apply(this, arguments);
    return Zu(this, e);
  };
}

function tc(s, i) {
  if (typeof s != "object" || s === null) return s;
  var r = s[Symbol.toPrimitive];
  if (r !== void 0) {
    var o = r.call(s, i);
    if (typeof o != "object") return o;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(s);
}

function Bs(s) {
  var i = tc(s, "string");
  return typeof i == "symbol" ? i : String(i);
}
var Ws = typeof global < "u" && {}.toString.call(global) === "[object global]";

function Ko(s, i) {
  return s.indexOf(i.toLowerCase()) === 0
    ? s
    : ""
        .concat(i.toLowerCase())
        .concat(s.substr(0, 1).toUpperCase())
        .concat(s.substr(1));
}

function nc(s) {
  return !!(
    s &&
    s.nodeType === 1 &&
    "nodeName" in s &&
    s.ownerDocument &&
    s.ownerDocument.defaultView
  );
}

function rc(s) {
  return !isNaN(parseFloat(s)) && isFinite(s) && Math.floor(s) == s;
}

function Ln(s) {
  return /^(https?:)?\/\/((((player|www)\.)?vimeo\.com)|((player\.)?[a-zA-Z0-9-]+\.videoji\.hk))(?=$|\/)/.test(
    s
  );
}

function Us(s) {
  var i =
    /^https:\/\/player\.((vimeo\.com)|([a-zA-Z0-9-]+\.videoji\.hk))\/video\/\d+/;
  return i.test(s);
}

function ic(s) {
  var i = (s || "").match(/^(?:https?:)?(?:\/\/)?([^/?]+)/),
    r = ((i && i[1]) || "").replace("player.", "");
  return r.endsWith(".videoji.hk") ? r : "vimeo.com";
}

function Vs() {
  var s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
    i = s.id,
    r = s.url,
    o = i || r;
  if (!o)
    throw new Error(
      "An id or url must be passed, either in an options object or as a data-vimeo-id or data-vimeo-url attribute."
    );
  if (rc(o)) return "https://vimeo.com/".concat(o);
  if (Ln(o)) return o.replace("http:", "https:");
  throw i
    ? new TypeError("“".concat(i, "” is not a valid video id."))
    : new TypeError("“".concat(o, "” is not a vimeo.com url."));
}
var Qo = function (i, r, o) {
    var e =
        arguments.length > 3 && arguments[3] !== void 0
          ? arguments[3]
          : "addEventListener",
      n =
        arguments.length > 4 && arguments[4] !== void 0
          ? arguments[4]
          : "removeEventListener",
      l = typeof r == "string" ? [r] : r;
    return (
      l.forEach(function (d) {
        i[e](d, o);
      }),
      {
        cancel: function () {
          return l.forEach(function (p) {
            return i[n](p, o);
          });
        },
      }
    );
  },
  oc = typeof Array.prototype.indexOf < "u",
  sc = typeof window < "u" && typeof window.postMessage < "u";
if (!Ws && (!oc || !sc))
  throw new Error(
    "Sorry, the Vimeo Player API is not available in this browser."
  );
var Vn =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
    ? window
    : typeof global < "u"
    ? global
    : typeof self < "u"
    ? self
    : {};

function ac(s, i) {
  return (
    (i = {
      exports: {},
    }),
    s(i, i.exports),
    i.exports
  );
}
/*!
 * weakmap-polyfill v2.0.4 - ECMAScript6 WeakMap polyfill
 * https://github.com/polygonplanet/weakmap-polyfill
 * Copyright (c) 2015-2021 polygonplanet <polygon.planet.aqua@gmail.com>
 * @license MIT
 */
(function (s) {
  if (s.WeakMap) return;
  var i = Object.prototype.hasOwnProperty,
    r =
      Object.defineProperty &&
      (function () {
        try {
          return (
            Object.defineProperty({}, "x", {
              value: 1,
            }).x === 1
          );
        } catch {}
      })(),
    o = function (n, l, d) {
      r
        ? Object.defineProperty(n, l, {
            configurable: !0,
            writable: !0,
            value: d,
          })
        : (n[l] = d);
    };
  s.WeakMap = (function () {
    function n() {
      if (this === void 0)
        throw new TypeError("Constructor WeakMap requires 'new'");
      if ((o(this, "_id", d("_WeakMap")), arguments.length > 0))
        throw new TypeError("WeakMap iterable is not supported");
    }
    o(n.prototype, "delete", function (v) {
      if ((l(this, "delete"), !e(v))) return !1;
      var T = v[this._id];
      return T && T[0] === v ? (delete v[this._id], !0) : !1;
    }),
      o(n.prototype, "get", function (v) {
        if ((l(this, "get"), !!e(v))) {
          var T = v[this._id];
          if (T && T[0] === v) return T[1];
        }
      }),
      o(n.prototype, "has", function (v) {
        if ((l(this, "has"), !e(v))) return !1;
        var T = v[this._id];
        return !!(T && T[0] === v);
      }),
      o(n.prototype, "set", function (v, T) {
        if ((l(this, "set"), !e(v)))
          throw new TypeError("Invalid value used as weak map key");
        var P = v[this._id];
        return P && P[0] === v
          ? ((P[1] = T), this)
          : (o(v, this._id, [v, T]), this);
      });

    function l(v, T) {
      if (!e(v) || !i.call(v, "_id"))
        throw new TypeError(
          T + " method called on incompatible receiver " + typeof v
        );
    }

    function d(v) {
      return v + "_" + p() + "." + p();
    }

    function p() {
      return Math.random().toString().substring(2);
    }
    return o(n, "_polyfill", !0), n;
  })();

  function e(n) {
    return Object(n) === n;
  }
})(
  typeof globalThis < "u"
    ? globalThis
    : typeof self < "u"
    ? self
    : typeof window < "u"
    ? window
    : Vn
);
var wt = ac(function (s) {
    /*! Native Promise Only
    v0.8.1 (c) Kyle Simpson
    MIT License: http://getify.mit-license.org
*/
    (function (r, o, e) {
      (o[r] = o[r] || e()), s.exports && (s.exports = o[r]);
    })("Promise", Vn, function () {
      var r,
        o,
        e,
        n = Object.prototype.toString,
        l =
          typeof setImmediate < "u"
            ? function (z) {
                return setImmediate(z);
              }
            : setTimeout;
      try {
        Object.defineProperty({}, "x", {}),
          (r = function (z, J, K, f) {
            return Object.defineProperty(z, J, {
              value: K,
              writable: !0,
              configurable: f !== !1,
            });
          });
      } catch {
        r = function (J, K, f) {
          return (J[K] = f), J;
        };
      }
      e = (function () {
        var z, J, K;

        function f(Se, ne) {
          (this.fn = Se), (this.self = ne), (this.next = void 0);
        }
        return {
          add: function (ne, Ee) {
            (K = new f(ne, Ee)),
              J ? (J.next = K) : (z = K),
              (J = K),
              (K = void 0);
          },
          drain: function () {
            var ne = z;
            for (z = J = o = void 0; ne; ) ne.fn.call(ne.self), (ne = ne.next);
          },
        };
      })();

      function d(X, z) {
        e.add(X, z), o || (o = l(e.drain));
      }

      function p(X) {
        var z,
          J = typeof X;
        return (
          X != null && (J == "object" || J == "function") && (z = X.then),
          typeof z == "function" ? z : !1
        );
      }

      function v() {
        for (var X = 0; X < this.chain.length; X++)
          T(
            this,
            this.state === 1 ? this.chain[X].success : this.chain[X].failure,
            this.chain[X]
          );
        this.chain.length = 0;
      }

      function T(X, z, J) {
        var K, f;
        try {
          z === !1
            ? J.reject(X.msg)
            : (z === !0 ? (K = X.msg) : (K = z.call(void 0, X.msg)),
              K === J.promise
                ? J.reject(TypeError("Promise-chain cycle"))
                : (f = p(K))
                ? f.call(K, J.resolve, J.reject)
                : J.resolve(K));
        } catch (Se) {
          J.reject(Se);
        }
      }

      function P(X) {
        var z,
          J = this;
        if (!J.triggered) {
          (J.triggered = !0), J.def && (J = J.def);
          try {
            (z = p(X))
              ? d(function () {
                  var K = new N(J);
                  try {
                    z.call(
                      X,
                      function () {
                        P.apply(K, arguments);
                      },
                      function () {
                        E.apply(K, arguments);
                      }
                    );
                  } catch (f) {
                    E.call(K, f);
                  }
                })
              : ((J.msg = X), (J.state = 1), J.chain.length > 0 && d(v, J));
          } catch (K) {
            E.call(new N(J), K);
          }
        }
      }

      function E(X) {
        var z = this;
        z.triggered ||
          ((z.triggered = !0),
          z.def && (z = z.def),
          (z.msg = X),
          (z.state = 2),
          z.chain.length > 0 && d(v, z));
      }

      function q(X, z, J, K) {
        for (var f = 0; f < z.length; f++)
          (function (ne) {
            X.resolve(z[ne]).then(function (Ge) {
              J(ne, Ge);
            }, K);
          })(f);
      }

      function N(X) {
        (this.def = X), (this.triggered = !1);
      }

      function M(X) {
        (this.promise = X),
          (this.state = 0),
          (this.triggered = !1),
          (this.chain = []),
          (this.msg = void 0);
      }

      function V(X) {
        if (typeof X != "function") throw TypeError("Not a function");
        if (this.__NPO__ !== 0) throw TypeError("Not a promise");
        this.__NPO__ = 1;
        var z = new M(this);
        (this.then = function (K, f) {
          var Se = {
            success: typeof K == "function" ? K : !0,
            failure: typeof f == "function" ? f : !1,
          };
          return (
            (Se.promise = new this.constructor(function (Ee, Ge) {
              if (typeof Ee != "function" || typeof Ge != "function")
                throw TypeError("Not a function");
              (Se.resolve = Ee), (Se.reject = Ge);
            })),
            z.chain.push(Se),
            z.state !== 0 && d(v, z),
            Se.promise
          );
        }),
          (this.catch = function (K) {
            return this.then(void 0, K);
          });
        try {
          X.call(
            void 0,
            function (K) {
              P.call(z, K);
            },
            function (K) {
              E.call(z, K);
            }
          );
        } catch (J) {
          E.call(z, J);
        }
      }
      var Y = r({}, "constructor", V, !1);
      return (
        (V.prototype = Y),
        r(Y, "__NPO__", 0, !1),
        r(V, "resolve", function (z) {
          var J = this;
          return z && typeof z == "object" && z.__NPO__ === 1
            ? z
            : new J(function (f, Se) {
                if (typeof f != "function" || typeof Se != "function")
                  throw TypeError("Not a function");
                f(z);
              });
        }),
        r(V, "reject", function (z) {
          return new this(function (K, f) {
            if (typeof K != "function" || typeof f != "function")
              throw TypeError("Not a function");
            f(z);
          });
        }),
        r(V, "all", function (z) {
          var J = this;
          return n.call(z) != "[object Array]"
            ? J.reject(TypeError("Not an array"))
            : z.length === 0
            ? J.resolve([])
            : new J(function (f, Se) {
                if (typeof f != "function" || typeof Se != "function")
                  throw TypeError("Not a function");
                var ne = z.length,
                  Ee = Array(ne),
                  Ge = 0;
                q(
                  J,
                  z,
                  function (B, G) {
                    (Ee[B] = G), ++Ge === ne && f(Ee);
                  },
                  Se
                );
              });
        }),
        r(V, "race", function (z) {
          var J = this;
          return n.call(z) != "[object Array]"
            ? J.reject(TypeError("Not an array"))
            : new J(function (f, Se) {
                if (typeof f != "function" || typeof Se != "function")
                  throw TypeError("Not a function");
                q(
                  J,
                  z,
                  function (Ee, Ge) {
                    f(Ge);
                  },
                  Se
                );
              });
        }),
        V
      );
    });
  }),
  qt = new WeakMap();

function ir(s, i, r) {
  var o = qt.get(s.element) || {};
  i in o || (o[i] = []), o[i].push(r), qt.set(s.element, o);
}

function Br(s, i) {
  var r = qt.get(s.element) || {};
  return r[i] || [];
}

function Wr(s, i, r) {
  var o = qt.get(s.element) || {};
  if (!o[i]) return !0;
  if (!r) return (o[i] = []), qt.set(s.element, o), !0;
  var e = o[i].indexOf(r);
  return (
    e !== -1 && o[i].splice(e, 1),
    qt.set(s.element, o),
    o[i] && o[i].length === 0
  );
}

function lc(s, i) {
  var r = Br(s, i);
  if (r.length < 1) return !1;
  var o = r.shift();
  return Wr(s, i, o), o;
}

function uc(s, i) {
  var r = qt.get(s);
  qt.set(i, r), qt.delete(s);
}

function ei(s) {
  if (typeof s == "string")
    try {
      s = JSON.parse(s);
    } catch (i) {
      return console.warn(i), {};
    }
  return s;
}

function _n(s, i, r) {
  if (!(!s.element.contentWindow || !s.element.contentWindow.postMessage)) {
    var o = {
      method: i,
    };
    r !== void 0 && (o.value = r);
    var e = parseFloat(
      navigator.userAgent.toLowerCase().replace(/^.*msie (\d+).*$/, "$1")
    );
    e >= 8 && e < 10 && (o = JSON.stringify(o)),
      s.element.contentWindow.postMessage(o, s.origin);
  }
}

function cc(s, i) {
  i = ei(i);
  var r = [],
    o;
  if (i.event) {
    if (i.event === "error") {
      var e = Br(s, i.data.method);
      e.forEach(function (l) {
        var d = new Error(i.data.message);
        (d.name = i.data.name), l.reject(d), Wr(s, i.data.method, l);
      });
    }
    (r = Br(s, "event:".concat(i.event))), (o = i.data);
  } else if (i.method) {
    var n = lc(s, i.method);
    n && (r.push(n), (o = i.value));
  }
  r.forEach(function (l) {
    try {
      if (typeof l == "function") {
        l.call(s, o);
        return;
      }
      l.resolve(o);
    } catch {}
  });
}
var fc = [
  "airplay",
  "audio_tracks",
  "autopause",
  "autoplay",
  "background",
  "byline",
  "cc",
  "chapter_id",
  "chapters",
  "chromecast",
  "color",
  "colors",
  "controls",
  "dnt",
  "end_time",
  "fullscreen",
  "height",
  "id",
  "interactive_params",
  "keyboard",
  "loop",
  "maxheight",
  "maxwidth",
  "muted",
  "play_button_position",
  "playsinline",
  "portrait",
  "progress_bar",
  "quality_selector",
  "responsive",
  "speed",
  "start_time",
  "texttrack",
  "title",
  "transcript",
  "transparent",
  "url",
  "vimeo_logo",
  "volume",
  "watch_full_video",
  "width",
];

function Gs(s) {
  var i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return fc.reduce(function (r, o) {
    var e = s.getAttribute("data-vimeo-".concat(o));
    return (e || e === "") && (r[o] = e === "" ? 1 : e), r;
  }, i);
}

function no(s, i) {
  var r = s.html;
  if (!i) throw new TypeError("An element must be provided");
  if (i.getAttribute("data-vimeo-initialized") !== null)
    return i.querySelector("iframe");
  var o = document.createElement("div");
  return (
    (o.innerHTML = r),
    i.appendChild(o.firstChild),
    i.setAttribute("data-vimeo-initialized", "true"),
    i.querySelector("iframe")
  );
}

function Xs(s) {
  var i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    r = arguments.length > 2 ? arguments[2] : void 0;
  return new Promise(function (o, e) {
    if (!Ln(s)) throw new TypeError("“".concat(s, "” is not a vimeo.com url."));
    var n = ic(s),
      l = "https://"
        .concat(n, "/api/oembed.json?url=")
        .concat(encodeURIComponent(s));
    for (var d in i)
      i.hasOwnProperty(d) &&
        (l += "&".concat(d, "=").concat(encodeURIComponent(i[d])));
    var p =
      "XDomainRequest" in window ? new XDomainRequest() : new XMLHttpRequest();
    p.open("GET", l, !0),
      (p.onload = function () {
        if (p.status === 404) {
          e(new Error("“".concat(s, "” was not found.")));
          return;
        }
        if (p.status === 403) {
          e(new Error("“".concat(s, "” is not embeddable.")));
          return;
        }
        try {
          var v = JSON.parse(p.responseText);
          if (v.domain_status_code === 403) {
            no(v, r), e(new Error("“".concat(s, "” is not embeddable.")));
            return;
          }
          o(v);
        } catch (T) {
          e(T);
        }
      }),
      (p.onerror = function () {
        var v = p.status ? " (".concat(p.status, ")") : "";
        e(
          new Error(
            "There was an error fetching the embed code from Vimeo".concat(
              v,
              "."
            )
          )
        );
      }),
      p.send();
  });
}

function dc() {
  var s =
      arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : document,
    i = [].slice.call(s.querySelectorAll("[data-vimeo-id], [data-vimeo-url]")),
    r = function (e) {
      "console" in window &&
        console.error &&
        console.error("There was an error creating an embed: ".concat(e));
    };
  i.forEach(function (o) {
    try {
      if (o.getAttribute("data-vimeo-defer") !== null) return;
      var e = Gs(o),
        n = Vs(e);
      Xs(n, e, o)
        .then(function (l) {
          return no(l, o);
        })
        .catch(r);
    } catch (l) {
      r(l);
    }
  });
}

function hc() {
  var s =
    arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : document;
  if (!window.VimeoPlayerResizeEmbeds_) {
    window.VimeoPlayerResizeEmbeds_ = !0;
    var i = function (o) {
      if (Ln(o.origin) && !(!o.data || o.data.event !== "spacechange")) {
        for (var e = s.querySelectorAll("iframe"), n = 0; n < e.length; n++)
          if (e[n].contentWindow === o.source) {
            var l = e[n].parentElement;
            l.style.paddingBottom = "".concat(o.data.data[0].bottom, "px");
            break;
          }
      }
    };
    window.addEventListener("message", i);
  }
}

function pc() {
  var s =
    arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : document;
  if (!window.VimeoSeoMetadataAppended) {
    window.VimeoSeoMetadataAppended = !0;
    var i = function (o) {
      if (Ln(o.origin)) {
        var e = ei(o.data);
        if (!(!e || e.event !== "ready"))
          for (var n = s.querySelectorAll("iframe"), l = 0; l < n.length; l++) {
            var d = n[l],
              p = d.contentWindow === o.source;
            if (Us(d.src) && p) {
              var v = new ro(d);
              v.callMethod("appendVideoMetadata", window.location.href);
            }
          }
      }
    };
    window.addEventListener("message", i);
  }
}

function gc() {
  var s =
    arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : document;
  if (!window.VimeoCheckedUrlTimeParam) {
    window.VimeoCheckedUrlTimeParam = !0;
    var i = function (e) {
        "console" in window &&
          console.error &&
          console.error("There was an error getting video Id: ".concat(e));
      },
      r = function (e) {
        if (Ln(e.origin)) {
          var n = ei(e.data);
          if (!(!n || n.event !== "ready"))
            for (
              var l = s.querySelectorAll("iframe"),
                d = function () {
                  var T = l[p],
                    P = T.contentWindow === e.source;
                  if (Us(T.src) && P) {
                    var E = new ro(T);
                    E.getVideoId()
                      .then(function (q) {
                        var N = new RegExp(
                          "[?&]vimeo_t_".concat(q, "=([^&#]*)")
                        ).exec(window.location.href);
                        if (N && N[1]) {
                          var M = decodeURI(N[1]);
                          E.setCurrentTime(M);
                        }
                      })
                      .catch(i);
                  }
                },
                p = 0;
              p < l.length;
              p++
            )
              d();
        }
      };
    window.addEventListener("message", r);
  }
}

function mc() {
  var s = (function () {
      for (
        var o,
          e = [
            [
              "requestFullscreen",
              "exitFullscreen",
              "fullscreenElement",
              "fullscreenEnabled",
              "fullscreenchange",
              "fullscreenerror",
            ],
            [
              "webkitRequestFullscreen",
              "webkitExitFullscreen",
              "webkitFullscreenElement",
              "webkitFullscreenEnabled",
              "webkitfullscreenchange",
              "webkitfullscreenerror",
            ],
            [
              "webkitRequestFullScreen",
              "webkitCancelFullScreen",
              "webkitCurrentFullScreenElement",
              "webkitCancelFullScreen",
              "webkitfullscreenchange",
              "webkitfullscreenerror",
            ],
            [
              "mozRequestFullScreen",
              "mozCancelFullScreen",
              "mozFullScreenElement",
              "mozFullScreenEnabled",
              "mozfullscreenchange",
              "mozfullscreenerror",
            ],
            [
              "msRequestFullscreen",
              "msExitFullscreen",
              "msFullscreenElement",
              "msFullscreenEnabled",
              "MSFullscreenChange",
              "MSFullscreenError",
            ],
          ],
          n = 0,
          l = e.length,
          d = {};
        n < l;
        n++
      )
        if (((o = e[n]), o && o[1] in document)) {
          for (n = 0; n < o.length; n++) d[e[0][n]] = o[n];
          return d;
        }
      return !1;
    })(),
    i = {
      fullscreenchange: s.fullscreenchange,
      fullscreenerror: s.fullscreenerror,
    },
    r = {
      request: function (e) {
        return new Promise(function (n, l) {
          var d = function v() {
            r.off("fullscreenchange", v), n();
          };
          r.on("fullscreenchange", d), (e = e || document.documentElement);
          var p = e[s.requestFullscreen]();
          p instanceof Promise && p.then(d).catch(l);
        });
      },
      exit: function () {
        return new Promise(function (e, n) {
          if (!r.isFullscreen) {
            e();
            return;
          }
          var l = function p() {
            r.off("fullscreenchange", p), e();
          };
          r.on("fullscreenchange", l);
          var d = document[s.exitFullscreen]();
          d instanceof Promise && d.then(l).catch(n);
        });
      },
      on: function (e, n) {
        var l = i[e];
        l && document.addEventListener(l, n);
      },
      off: function (e, n) {
        var l = i[e];
        l && document.removeEventListener(l, n);
      },
    };
  return (
    Object.defineProperties(r, {
      isFullscreen: {
        get: function () {
          return !!document[s.fullscreenElement];
        },
      },
      element: {
        enumerable: !0,
        get: function () {
          return document[s.fullscreenElement];
        },
      },
      isEnabled: {
        enumerable: !0,
        get: function () {
          return !!document[s.fullscreenEnabled];
        },
      },
    }),
    r
  );
}
var vc = {
    role: "viewer",
    autoPlayMuted: !0,
    allowedDrift: 0.3,
    maxAllowedDrift: 1,
    minCheckInterval: 0.1,
    maxRateAdjustment: 0.2,
    maxTimeToCatchUp: 1,
  },
  yc = (function (s) {
    Ku(r, s);
    var i = ec(r);

    function r(o, e) {
      var n,
        l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
        d = arguments.length > 3 ? arguments[3] : void 0;
      return (
        qs(this, r),
        (n = i.call(this)),
        Rr(Lr(n), "logger", void 0),
        Rr(Lr(n), "speedAdjustment", 0),
        Rr(
          Lr(n),
          "adjustSpeed",
          (function () {
            var p = Cn(
              tt().mark(function v(T, P) {
                var E;
                return tt().wrap(function (N) {
                  for (;;)
                    switch ((N.prev = N.next)) {
                      case 0:
                        if (n.speedAdjustment !== P) {
                          N.next = 2;
                          break;
                        }
                        return N.abrupt("return");
                      case 2:
                        return (N.next = 4), T.getPlaybackRate();
                      case 4:
                        return (
                          (N.t0 = N.sent),
                          (N.t1 = n.speedAdjustment),
                          (N.t2 = N.t0 - N.t1),
                          (N.t3 = P),
                          (E = N.t2 + N.t3),
                          n.log("New playbackRate:  ".concat(E)),
                          (N.next = 12),
                          T.setPlaybackRate(E)
                        );
                      case 12:
                        n.speedAdjustment = P;
                      case 13:
                      case "end":
                        return N.stop();
                    }
                }, v);
              })
            );
            return function (v, T) {
              return p.apply(this, arguments);
            };
          })()
        ),
        (n.logger = d),
        n.init(e, o, Yo(Yo({}, vc), l)),
        n
      );
    }
    return (
      $s(r, [
        {
          key: "disconnect",
          value: function () {
            this.dispatchEvent(new Event("disconnect"));
          },
        },
        {
          key: "init",
          value: (function () {
            var o = Cn(
              tt().mark(function n(l, d, p) {
                var v = this,
                  T,
                  P,
                  E;
                return tt().wrap(
                  function (N) {
                    for (;;)
                      switch ((N.prev = N.next)) {
                        case 0:
                          return (
                            (N.next = 2), this.waitForTOReadyState(l, "open")
                          );
                        case 2:
                          if (p.role !== "viewer") {
                            N.next = 10;
                            break;
                          }
                          return (N.next = 5), this.updatePlayer(l, d, p);
                        case 5:
                          (T = Qo(l, "change", function () {
                            return v.updatePlayer(l, d, p);
                          })),
                            (P = this.maintainPlaybackPosition(l, d, p)),
                            this.addEventListener("disconnect", function () {
                              P.cancel(), T.cancel();
                            }),
                            (N.next = 14);
                          break;
                        case 10:
                          return (N.next = 12), this.updateTimingObject(l, d);
                        case 12:
                          (E = Qo(
                            d,
                            ["seeked", "play", "pause", "ratechange"],
                            function () {
                              return v.updateTimingObject(l, d);
                            },
                            "on",
                            "off"
                          )),
                            this.addEventListener("disconnect", function () {
                              return E.cancel();
                            });
                        case 14:
                        case "end":
                          return N.stop();
                      }
                  },
                  n,
                  this
                );
              })
            );

            function e(n, l, d) {
              return o.apply(this, arguments);
            }
            return e;
          })(),
        },
        {
          key: "updateTimingObject",
          value: (function () {
            var o = Cn(
              tt().mark(function n(l, d) {
                return tt().wrap(function (v) {
                  for (;;)
                    switch ((v.prev = v.next)) {
                      case 0:
                        return (v.t0 = l), (v.next = 3), d.getCurrentTime();
                      case 3:
                        return (v.t1 = v.sent), (v.next = 6), d.getPaused();
                      case 6:
                        if (!v.sent) {
                          v.next = 10;
                          break;
                        }
                        (v.t2 = 0), (v.next = 13);
                        break;
                      case 10:
                        return (v.next = 12), d.getPlaybackRate();
                      case 12:
                        v.t2 = v.sent;
                      case 13:
                        (v.t3 = v.t2),
                          (v.t4 = {
                            position: v.t1,
                            velocity: v.t3,
                          }),
                          v.t0.update.call(v.t0, v.t4);
                      case 16:
                      case "end":
                        return v.stop();
                    }
                }, n);
              })
            );

            function e(n, l) {
              return o.apply(this, arguments);
            }
            return e;
          })(),
        },
        {
          key: "updatePlayer",
          value: (function () {
            var o = Cn(
              tt().mark(function n(l, d, p) {
                var v, T, P;
                return tt().wrap(
                  function (q) {
                    for (;;)
                      switch ((q.prev = q.next)) {
                        case 0:
                          if (
                            ((v = l.query()),
                            (T = v.position),
                            (P = v.velocity),
                            typeof T == "number" && d.setCurrentTime(T),
                            typeof P != "number")
                          ) {
                            q.next = 25;
                            break;
                          }
                          if (P !== 0) {
                            q.next = 11;
                            break;
                          }
                          return (q.next = 6), d.getPaused();
                        case 6:
                          if (((q.t0 = q.sent), q.t0 !== !1)) {
                            q.next = 9;
                            break;
                          }
                          d.pause();
                        case 9:
                          q.next = 25;
                          break;
                        case 11:
                          if (!(P > 0)) {
                            q.next = 25;
                            break;
                          }
                          return (q.next = 14), d.getPaused();
                        case 14:
                          if (((q.t1 = q.sent), q.t1 !== !0)) {
                            q.next = 19;
                            break;
                          }
                          return (
                            (q.next = 18),
                            d.play().catch(
                              (function () {
                                var N = Cn(
                                  tt().mark(function M(V) {
                                    return tt().wrap(function (X) {
                                      for (;;)
                                        switch ((X.prev = X.next)) {
                                          case 0:
                                            if (
                                              !(
                                                V.name === "NotAllowedError" &&
                                                p.autoPlayMuted
                                              )
                                            ) {
                                              X.next = 5;
                                              break;
                                            }
                                            return (X.next = 3), d.setMuted(!0);
                                          case 3:
                                            return (
                                              (X.next = 5),
                                              d.play().catch(function (z) {
                                                return console.error(
                                                  "Couldn't play the video from TimingSrcConnector. Error:",
                                                  z
                                                );
                                              })
                                            );
                                          case 5:
                                          case "end":
                                            return X.stop();
                                        }
                                    }, M);
                                  })
                                );
                                return function (M) {
                                  return N.apply(this, arguments);
                                };
                              })()
                            )
                          );
                        case 18:
                          this.updatePlayer(l, d, p);
                        case 19:
                          return (q.next = 21), d.getPlaybackRate();
                        case 21:
                          if (((q.t2 = q.sent), (q.t3 = P), q.t2 === q.t3)) {
                            q.next = 25;
                            break;
                          }
                          d.setPlaybackRate(P);
                        case 25:
                        case "end":
                          return q.stop();
                      }
                  },
                  n,
                  this
                );
              })
            );

            function e(n, l, d) {
              return o.apply(this, arguments);
            }
            return e;
          })(),
        },
        {
          key: "maintainPlaybackPosition",
          value: function (e, n, l) {
            var d = this,
              p = l.allowedDrift,
              v = l.maxAllowedDrift,
              T = l.minCheckInterval,
              P = l.maxRateAdjustment,
              E = l.maxTimeToCatchUp,
              q = Math.min(E, Math.max(T, v)) * 1e3,
              N = (function () {
                var V = Cn(
                  tt().mark(function Y() {
                    var X, z, J, K, f;
                    return tt().wrap(function (ne) {
                      for (;;)
                        switch ((ne.prev = ne.next)) {
                          case 0:
                            if (((ne.t0 = e.query().velocity === 0), ne.t0)) {
                              ne.next = 6;
                              break;
                            }
                            return (ne.next = 4), n.getPaused();
                          case 4:
                            (ne.t1 = ne.sent), (ne.t0 = ne.t1 === !0);
                          case 6:
                            if (!ne.t0) {
                              ne.next = 8;
                              break;
                            }
                            return ne.abrupt("return");
                          case 8:
                            return (
                              (ne.t2 = e.query().position),
                              (ne.next = 11),
                              n.getCurrentTime()
                            );
                          case 11:
                            if (
                              ((ne.t3 = ne.sent),
                              (X = ne.t2 - ne.t3),
                              (z = Math.abs(X)),
                              d.log("Drift: ".concat(X)),
                              !(z > v))
                            ) {
                              ne.next = 22;
                              break;
                            }
                            return (ne.next = 18), d.adjustSpeed(n, 0);
                          case 18:
                            n.setCurrentTime(e.query().position),
                              d.log("Resync by currentTime"),
                              (ne.next = 29);
                            break;
                          case 22:
                            if (!(z > p)) {
                              ne.next = 29;
                              break;
                            }
                            return (
                              (J = z / E),
                              (K = P),
                              (f = J < K ? (K - J) / 2 : K),
                              (ne.next = 28),
                              d.adjustSpeed(n, f * Math.sign(X))
                            );
                          case 28:
                            d.log("Resync by playbackRate");
                          case 29:
                          case "end":
                            return ne.stop();
                        }
                    }, Y);
                  })
                );
                return function () {
                  return V.apply(this, arguments);
                };
              })(),
              M = setInterval(function () {
                return N();
              }, q);
            return {
              cancel: function () {
                return clearInterval(M);
              },
            };
          },
        },
        {
          key: "log",
          value: function (e) {
            var n;
            (n = this.logger) === null ||
              n === void 0 ||
              n.call(this, "TimingSrcConnector: ".concat(e));
          },
        },
        {
          key: "waitForTOReadyState",
          value: function (e, n) {
            return new Promise(function (l) {
              var d = function p() {
                e.readyState === n
                  ? l()
                  : e.addEventListener("readystatechange", p, {
                      once: !0,
                    });
              };
              d();
            });
          },
        },
      ]),
      r
    );
  })(qi(EventTarget)),
  zn = new WeakMap(),
  Pi = new WeakMap(),
  ot = {},
  ro = (function () {
    function s(i) {
      var r = this,
        o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      if (
        (qs(this, s),
        window.jQuery &&
          i instanceof jQuery &&
          (i.length > 1 &&
            window.console &&
            console.warn &&
            console.warn(
              "A jQuery object with multiple elements was passed, using the first element."
            ),
          (i = i[0])),
        typeof document < "u" &&
          typeof i == "string" &&
          (i = document.getElementById(i)),
        !nc(i))
      )
        throw new TypeError(
          "You must pass either a valid element or a valid id."
        );
      if (i.nodeName !== "IFRAME") {
        var e = i.querySelector("iframe");
        e && (i = e);
      }
      if (i.nodeName === "IFRAME" && !Ln(i.getAttribute("src") || ""))
        throw new Error("The player element passed isn’t a Vimeo embed.");
      if (zn.has(i)) return zn.get(i);
      (this._window = i.ownerDocument.defaultView),
        (this.element = i),
        (this.origin = "*");
      var n = new wt(function (d, p) {
        if (
          ((r._onMessage = function (P) {
            if (!(!Ln(P.origin) || r.element.contentWindow !== P.source)) {
              r.origin === "*" && (r.origin = P.origin);
              var E = ei(P.data),
                q = E && E.event === "error",
                N = q && E.data && E.data.method === "ready";
              if (N) {
                var M = new Error(E.data.message);
                (M.name = E.data.name), p(M);
                return;
              }
              var V = E && E.event === "ready",
                Y = E && E.method === "ping";
              if (V || Y) {
                r.element.setAttribute("data-ready", "true"), d();
                return;
              }
              cc(r, E);
            }
          }),
          r._window.addEventListener("message", r._onMessage),
          r.element.nodeName !== "IFRAME")
        ) {
          var v = Gs(i, o),
            T = Vs(v);
          Xs(T, v, i)
            .then(function (P) {
              var E = no(P, i);
              return (
                (r.element = E),
                (r._originalElement = i),
                uc(i, E),
                zn.set(r.element, r),
                P
              );
            })
            .catch(p);
        }
      });
      if (
        (Pi.set(this, n),
        zn.set(this.element, this),
        this.element.nodeName === "IFRAME" && _n(this, "ping"),
        ot.isEnabled)
      ) {
        var l = function () {
          return ot.exit();
        };
        (this.fullscreenchangeHandler = function () {
          ot.isFullscreen
            ? ir(r, "event:exitFullscreen", l)
            : Wr(r, "event:exitFullscreen", l),
            r.ready().then(function () {
              _n(r, "fullscreenchange", ot.isFullscreen);
            });
        }),
          ot.on("fullscreenchange", this.fullscreenchangeHandler);
      }
      return this;
    }
    return (
      $s(s, [
        {
          key: "callMethod",
          value: function (r) {
            var o = this,
              e =
                arguments.length > 1 && arguments[1] !== void 0
                  ? arguments[1]
                  : {};
            return new wt(function (n, l) {
              return o
                .ready()
                .then(function () {
                  ir(o, r, {
                    resolve: n,
                    reject: l,
                  }),
                    _n(o, r, e);
                })
                .catch(l);
            });
          },
        },
        {
          key: "get",
          value: function (r) {
            var o = this;
            return new wt(function (e, n) {
              return (
                (r = Ko(r, "get")),
                o
                  .ready()
                  .then(function () {
                    ir(o, r, {
                      resolve: e,
                      reject: n,
                    }),
                      _n(o, r);
                  })
                  .catch(n)
              );
            });
          },
        },
        {
          key: "set",
          value: function (r, o) {
            var e = this;
            return new wt(function (n, l) {
              if (((r = Ko(r, "set")), o == null))
                throw new TypeError("There must be a value to set.");
              return e
                .ready()
                .then(function () {
                  ir(e, r, {
                    resolve: n,
                    reject: l,
                  }),
                    _n(e, r, o);
                })
                .catch(l);
            });
          },
        },
        {
          key: "on",
          value: function (r, o) {
            if (!r) throw new TypeError("You must pass an event name.");
            if (!o) throw new TypeError("You must pass a callback function.");
            if (typeof o != "function")
              throw new TypeError("The callback must be a function.");
            var e = Br(this, "event:".concat(r));
            e.length === 0 &&
              this.callMethod("addEventListener", r).catch(function () {}),
              ir(this, "event:".concat(r), o);
          },
        },
        {
          key: "off",
          value: function (r, o) {
            if (!r) throw new TypeError("You must pass an event name.");
            if (o && typeof o != "function")
              throw new TypeError("The callback must be a function.");
            var e = Wr(this, "event:".concat(r), o);
            e &&
              this.callMethod("removeEventListener", r).catch(function (n) {});
          },
        },
        {
          key: "loadVideo",
          value: function (r) {
            return this.callMethod("loadVideo", r);
          },
        },
        {
          key: "ready",
          value: function () {
            var r =
              Pi.get(this) ||
              new wt(function (o, e) {
                e(new Error("Unknown player. Probably unloaded."));
              });
            return wt.resolve(r);
          },
        },
        {
          key: "addCuePoint",
          value: function (r) {
            var o =
              arguments.length > 1 && arguments[1] !== void 0
                ? arguments[1]
                : {};
            return this.callMethod("addCuePoint", {
              time: r,
              data: o,
            });
          },
        },
        {
          key: "removeCuePoint",
          value: function (r) {
            return this.callMethod("removeCuePoint", r);
          },
        },
        {
          key: "enableTextTrack",
          value: function (r, o) {
            if (!r) throw new TypeError("You must pass a language.");
            return this.callMethod("enableTextTrack", {
              language: r,
              kind: o,
            });
          },
        },
        {
          key: "disableTextTrack",
          value: function () {
            return this.callMethod("disableTextTrack");
          },
        },
        {
          key: "pause",
          value: function () {
            return this.callMethod("pause");
          },
        },
        {
          key: "play",
          value: function () {
            return this.callMethod("play");
          },
        },
        {
          key: "requestFullscreen",
          value: function () {
            return ot.isEnabled
              ? ot.request(this.element)
              : this.callMethod("requestFullscreen");
          },
        },
        {
          key: "exitFullscreen",
          value: function () {
            return ot.isEnabled ? ot.exit() : this.callMethod("exitFullscreen");
          },
        },
        {
          key: "getFullscreen",
          value: function () {
            return ot.isEnabled
              ? wt.resolve(ot.isFullscreen)
              : this.get("fullscreen");
          },
        },
        {
          key: "requestPictureInPicture",
          value: function () {
            return this.callMethod("requestPictureInPicture");
          },
        },
        {
          key: "exitPictureInPicture",
          value: function () {
            return this.callMethod("exitPictureInPicture");
          },
        },
        {
          key: "getPictureInPicture",
          value: function () {
            return this.get("pictureInPicture");
          },
        },
        {
          key: "remotePlaybackPrompt",
          value: function () {
            return this.callMethod("remotePlaybackPrompt");
          },
        },
        {
          key: "unload",
          value: function () {
            return this.callMethod("unload");
          },
        },
        {
          key: "destroy",
          value: function () {
            var r = this;
            return new wt(function (o) {
              if (
                (Pi.delete(r),
                zn.delete(r.element),
                r._originalElement &&
                  (zn.delete(r._originalElement),
                  r._originalElement.removeAttribute("data-vimeo-initialized")),
                r.element &&
                  r.element.nodeName === "IFRAME" &&
                  r.element.parentNode &&
                  (r.element.parentNode.parentNode &&
                  r._originalElement &&
                  r._originalElement !== r.element.parentNode
                    ? r.element.parentNode.parentNode.removeChild(
                        r.element.parentNode
                      )
                    : r.element.parentNode.removeChild(r.element)),
                r.element &&
                  r.element.nodeName === "DIV" &&
                  r.element.parentNode)
              ) {
                r.element.removeAttribute("data-vimeo-initialized");
                var e = r.element.querySelector("iframe");
                e &&
                  e.parentNode &&
                  (e.parentNode.parentNode &&
                  r._originalElement &&
                  r._originalElement !== e.parentNode
                    ? e.parentNode.parentNode.removeChild(e.parentNode)
                    : e.parentNode.removeChild(e));
              }
              r._window.removeEventListener("message", r._onMessage),
                ot.isEnabled &&
                  ot.off("fullscreenchange", r.fullscreenchangeHandler),
                o();
            });
          },
        },
        {
          key: "getAutopause",
          value: function () {
            return this.get("autopause");
          },
        },
        {
          key: "setAutopause",
          value: function (r) {
            return this.set("autopause", r);
          },
        },
        {
          key: "getBuffered",
          value: function () {
            return this.get("buffered");
          },
        },
        {
          key: "getCameraProps",
          value: function () {
            return this.get("cameraProps");
          },
        },
        {
          key: "setCameraProps",
          value: function (r) {
            return this.set("cameraProps", r);
          },
        },
        {
          key: "getChapters",
          value: function () {
            return this.get("chapters");
          },
        },
        {
          key: "getCurrentChapter",
          value: function () {
            return this.get("currentChapter");
          },
        },
        {
          key: "getColor",
          value: function () {
            return this.get("color");
          },
        },
        {
          key: "getColors",
          value: function () {
            return wt.all([
              this.get("colorOne"),
              this.get("colorTwo"),
              this.get("colorThree"),
              this.get("colorFour"),
            ]);
          },
        },
        {
          key: "setColor",
          value: function (r) {
            return this.set("color", r);
          },
        },
        {
          key: "setColors",
          value: function (r) {
            if (!Array.isArray(r))
              return new wt(function (n, l) {
                return l(new TypeError("Argument must be an array."));
              });
            var o = new wt(function (n) {
                return n(null);
              }),
              e = [
                r[0] ? this.set("colorOne", r[0]) : o,
                r[1] ? this.set("colorTwo", r[1]) : o,
                r[2] ? this.set("colorThree", r[2]) : o,
                r[3] ? this.set("colorFour", r[3]) : o,
              ];
            return wt.all(e);
          },
        },
        {
          key: "getCuePoints",
          value: function () {
            return this.get("cuePoints");
          },
        },
        {
          key: "getCurrentTime",
          value: function () {
            return this.get("currentTime");
          },
        },
        {
          key: "setCurrentTime",
          value: function (r) {
            return this.set("currentTime", r);
          },
        },
        {
          key: "getDuration",
          value: function () {
            return this.get("duration");
          },
        },
        {
          key: "getEnded",
          value: function () {
            return this.get("ended");
          },
        },
        {
          key: "getLoop",
          value: function () {
            return this.get("loop");
          },
        },
        {
          key: "setLoop",
          value: function (r) {
            return this.set("loop", r);
          },
        },
        {
          key: "setMuted",
          value: function (r) {
            return this.set("muted", r);
          },
        },
        {
          key: "getMuted",
          value: function () {
            return this.get("muted");
          },
        },
        {
          key: "getPaused",
          value: function () {
            return this.get("paused");
          },
        },
        {
          key: "getPlaybackRate",
          value: function () {
            return this.get("playbackRate");
          },
        },
        {
          key: "setPlaybackRate",
          value: function (r) {
            return this.set("playbackRate", r);
          },
        },
        {
          key: "getPlayed",
          value: function () {
            return this.get("played");
          },
        },
        {
          key: "getQualities",
          value: function () {
            return this.get("qualities");
          },
        },
        {
          key: "getQuality",
          value: function () {
            return this.get("quality");
          },
        },
        {
          key: "setQuality",
          value: function (r) {
            return this.set("quality", r);
          },
        },
        {
          key: "getRemotePlaybackAvailability",
          value: function () {
            return this.get("remotePlaybackAvailability");
          },
        },
        {
          key: "getRemotePlaybackState",
          value: function () {
            return this.get("remotePlaybackState");
          },
        },
        {
          key: "getSeekable",
          value: function () {
            return this.get("seekable");
          },
        },
        {
          key: "getSeeking",
          value: function () {
            return this.get("seeking");
          },
        },
        {
          key: "getTextTracks",
          value: function () {
            return this.get("textTracks");
          },
        },
        {
          key: "getVideoEmbedCode",
          value: function () {
            return this.get("videoEmbedCode");
          },
        },
        {
          key: "getVideoId",
          value: function () {
            return this.get("videoId");
          },
        },
        {
          key: "getVideoTitle",
          value: function () {
            return this.get("videoTitle");
          },
        },
        {
          key: "getVideoWidth",
          value: function () {
            return this.get("videoWidth");
          },
        },
        {
          key: "getVideoHeight",
          value: function () {
            return this.get("videoHeight");
          },
        },
        {
          key: "getVideoUrl",
          value: function () {
            return this.get("videoUrl");
          },
        },
        {
          key: "getVolume",
          value: function () {
            return this.get("volume");
          },
        },
        {
          key: "setVolume",
          value: function (r) {
            return this.set("volume", r);
          },
        },
        {
          key: "setTimingSrc",
          value: (function () {
            var i = Cn(
              tt().mark(function o(e, n) {
                var l = this,
                  d;
                return tt().wrap(
                  function (v) {
                    for (;;)
                      switch ((v.prev = v.next)) {
                        case 0:
                          if (e) {
                            v.next = 2;
                            break;
                          }
                          throw new TypeError(
                            "A Timing Object must be provided."
                          );
                        case 2:
                          return (v.next = 4), this.ready();
                        case 4:
                          return (
                            (d = new yc(this, e, n)),
                            _n(this, "notifyTimingObjectConnect"),
                            d.addEventListener("disconnect", function () {
                              return _n(l, "notifyTimingObjectDisconnect");
                            }),
                            v.abrupt("return", d)
                          );
                        case 8:
                        case "end":
                          return v.stop();
                      }
                  },
                  o,
                  this
                );
              })
            );

            function r(o, e) {
              return i.apply(this, arguments);
            }
            return r;
          })(),
        },
      ]),
      s
    );
  })();
Ws || ((ot = mc()), dc(), hc(), pc(), gc());
window.ww = window.innerWidth;
window.wh = window.innerHeight;
const bt = 767;
var Cr = !1,
  $i = !1,
  Ur = !1,
  Vr,
  Oi = [],
  Er,
  zi;
S(window).on("load", function () {
  S("#load").fadeOut(500, function () {
    S(window).scrollTop() > window.wh &&
      (S("body").addClass("fv_over"), S("#footer").css("opacity", 1)),
      S("body").addClass("loaded"),
      S(".js-load").addClass("on");
  }),
    window.ww > bt ? (Vr = "PC") : (Vr = "SP"),
    (window.ajax_areaHeight = S("#ajax_area").outerHeight()),
    (window.footerHeight = S("#footer").outerHeight());
});
S(function () {
  Vu(),
    document.querySelector("albana-gradient"),
    hs(),
    Ys(),
    Js(),
    S(document).on("click", ".js-cookie_accept", function () {
      S("#cookie_check").fadeOut(200);
    }),
    S(document).on("click", "#btn_menu", function () {
      tc(),
        S("#header").toggleClass("active"),
        S("#block_menu").hasClass("on")
          ? setTimeout(function () {
              S("#block_menu").removeClass("on");
            }, 300)
          : S("#block_menu").addClass("on");
    }),
    S(document).on("click", ".js-menu_close", function () {
      S("#header").removeClass("active"), S("#block_menu").removeClass("on");
    }),
    S(document).on("click", ".js-play_vimeo", function () {
      S(this).parents(".thum").addClass("on");
      var s = S(this).parents(".thum").next("iframe"),
        i = new ro(s[0]);
      i.play();
    }),
    S(document).on("click", ".js-play_yt", function () {
      S(this).parents(".thum").addClass("on"),
        ($playerWindow = S(this)
          .parents(".thum")
          .next("iframe")[0].contentWindow),
        wc("playVideo");
    }),
    S(document).on("click", ".js-modal_careers", function () {
      var s = S(this).attr("data-job");
      S("#header").fadeOut(300),
        S("#modal_careers ." + s).show(),
        S("#modal_careers").fadeIn(300),
        S("#modal_careers").addClass("on");
    }),
    S(document).on("click", ".js-modal_careers_close", function () {
      S("#modal_careers").fadeOut(300, function () {
        S("#modal_careers .in").hide(), S("#modal_careers").removeClass("on");
      }),
        S("#header").fadeIn(300);
    });
});

function wc(s) {
  $playerWindow.postMessage(
    '{"event":"command","func":"' + s + '","args":""}',
    "*"
  );
}
var Ri = !1;
S(window).resize(function () {
  Ri !== !1 && clearTimeout(Ri),
    (Ri = setTimeout(function () {
      (window.ww = window.innerWidth),
        (window.wh = window.innerHeight),
        (window.ajax_areaHeight = S("#ajax_area").outerHeight()),
        (window.footerHeight = S("#footer").outerHeight()),
        window.ww > bt
          ? Vr == "SP" && location.reload()
          : Vr == "PC" && location.reload(),
        S("#services").length &&
          S(".js-group_height_h").height(S(".js-group_height").height());
    }, 200));
});
S(window).scroll(function () {
  var s = S(window).scrollTop();
  if (
    (S(".js-sc").each(function () {
      var e = S(this).offset().top;
      s > e - window.wh && S(this).addClass("on");
    }),
    window.ww > bt)
  ) {
    if (
      (s > window.ajax_areaHeight - window.wh
        ? ((Er =
            (window.footerHeight - (s - window.ajax_areaHeight + window.wh)) /
            5),
          S("#footer").css({
            opacity: 1,
            transform: "translate3d(0," + Math.floor(Er) + "px,0)",
          }),
          S(".js-img_parallax").hide())
        : (S("#footer").css({
            opacity: 0,
            transform: "translate3d(0,0,0)",
          }),
          S(".js-img_parallax").show()),
      Ur == !0)
    ) {
      var i = S(".js-vision_txt_pc").offset().top;
      if (s > i - window.wh / 1.1) {
        var r = s + window.wh / 1.1 - i,
          o = r / 3;
        S(".js-vision_txt_pc p span").each(function (e) {
          var n = o - e * 20;
          if (n < 0) var n = 0;
          n <= 100 && S(this).css("transform", "translate3d(" + n + "vw,0,0)");
        });
      } else
        S(".js-vision_txt_pc p span").css("transform", "translate3d(0vw,0,0)");
    }
  } else if (Ur == !0) {
    var i = S(".js-vision_txt_sp").offset().top;
    if (s > i - window.wh / 1.05) {
      var r = s + window.wh / 1.05 - i,
        o = r / 3;
      S(".js-vision_txt_sp p span").each(function (d) {
        var p = o - d * 15;
        if (p < 0) var p = 0;
        p <= 100 && S(this).css("transform", "translate3d(" + p + "vw,0,0)");
      });
    } else
      S(".js-vision_txt_sp p span").css("transform", "translate3d(0vw,0,0)");
  }
  $i == !0 &&
    s < window.wh * 1.2 &&
    ((Er = s / zi),
    S(".js-img_parallax").css({
      transform: "translate3d(0,-" + Er + "px,0)",
    })),
    s > window.wh
      ? Cr == !1 &&
        (S("body").addClass("fv_over"),
        cancelAnimationFrame(window.interval.id),
        (Cr = !0))
      : Cr == !0 &&
        (S("body").removeClass("fv_over"),
        (window.interval = Hr(qr)),
        (Cr = !1));
});

function Ys() {
  bc(), S("body").attr("data-page", "");
  var s = location.pathname;
  if (
    (s.indexOf("/ja/") > -1
      ? (S("body").addClass("lang-ja").removeClass("lang-en"),
        S("#lang a").attr("href", "/" + s.split("/ja/")[1]))
      : (S("body").removeClass("lang-ja").addClass("lang-en"),
        S("#lang a").attr("href", "/ja" + s)),
    S(".js-img_parallax").length ? ($i = !0) : ($i = !1),
    S("#vision").length ? (Ur = !0) : (Ur = !1),
    S("#home").length)
  )
    S("body").attr("data-page", "home"), (zi = 1.5);
  else if (S("#team").length) {
    for (
      S("body").attr("data-page", "team"), i = 0;
      i < S("#team .base .img img").length;
      i++
    )
      Oi.push(S("#team .base .img img").eq(i).attr("src"));
    Sc(Oi);
    for (var i = 0; i < 12; i++)
      S("#team .slide_block .slide img").eq(i).attr("src", Oi[i]);
    S("#team .slide_block .s1 ul").clone(!0).appendTo(".s1"),
      S("#team .slide_block .s2 ul").clone(!0).appendTo(".s2");
  } else
    S("#team_detail").length
      ? S("body").attr("data-page", "team")
      : S("#news").length
      ? S("body").attr("data-page", "news")
      : S("#work").length
      ? S("body").attr("data-page", "work")
      : S("#work_detail").length
      ? (S("body").attr("data-page", "work"),
        (zi = 5),
        window.ww > bt
          ? S(".js-slide").each(function () {
              S(this).children("li").length > 4 &&
                (S(this).removeClass("flex"),
                S(this).slick({
                  dots: !1,
                  infinite: !1,
                  speed: 600,
                  slidesToShow: 4,
                  slidesToScroll: 1,
                }));
            })
          : S(".js-slide").each(function () {
              S(this).children("li").length > 1 &&
                (S(this).removeClass("flex"),
                S(this).slick({
                  dots: !1,
                  infinite: !1,
                  speed: 600,
                  slidesToShow: 1,
                  slidesToScroll: 1,
                }));
            }),
        Ai(s.indexOf("/ja/") > -1 ? "ja" : "en"))
      : S("#services").length
      ? (S("body").attr("data-page", "services"),
        window.ww > bt
          ? S(".js-slide").slick({
              dots: !1,
              infinite: !1,
              speed: 600,
              slidesToShow: 2,
              slidesToScroll: 1,
            })
          : S(".js-slide").slick({
              dots: !1,
              infinite: !1,
              speed: 600,
              slidesToShow: 1,
              slidesToScroll: 1,
            }),
        S(".js-group_height_h").height(S(".js-group_height").height()),
        Ai(s.indexOf("/ja/") > -1 ? "ja" : "en"))
      : S("#vision").length
      ? (S("body").attr("data-page", "vision"),
        window.ww > bt
          ? (S(".js-gallery").slick({
              dots: !1,
              infinite: !1,
              speed: 900,
              slidesToShow: 1,
              slidesToScroll: 1,
              asNavFor: ".js-gallery_nav",
            }),
            S(".js-gallery_nav").slick({
              dots: !1,
              infinite: !1,
              speed: 600,
              slidesToShow: 1,
              slidesToScroll: 1,
              asNavFor: ".js-gallery",
              arrows: !1,
            }))
          : (S(".js-slide").slick({
              dots: !1,
              infinite: !1,
              speed: 600,
              slidesToShow: 1,
              slidesToScroll: 1,
            }),
            S(".js-gallery").slick({
              dots: !1,
              infinite: !1,
              speed: 600,
              slidesToShow: 1,
              slidesToScroll: 1,
            })),
        Lo())
      : S("#careers").length
      ? (S("body").attr("data-page", "careers"),
        Uu(s.indexOf("/ja/") > -1 ? "ja" : "en"))
      : S("#careers_detail").length
      ? S("body").attr("data-page", "careers")
      : S("#brochure").length
      ? (S("body").attr("data-page", "brochure"),
        Wu(s.indexOf("/ja/") > -1 ? "ja" : "en"))
      : S("#contact").length
      ? (S("body").attr("data-page", "contact"),
        Ai(s.indexOf("/ja/") > -1 ? "ja" : "en"))
      : S("#company").length
      ? (S("body").attr("data-page", "company"),
        Lo(),
        window.ww > bt &&
          (S(".js-hover_snapshot").mousemove(function (r) {
            var o = S(this).attr("data-tar");
            S("." + o)
              .addClass("active")
              .css(
                "transform",
                "translate3d(" +
                  (20 + r.offsetX) +
                  "px," +
                  (20 + r.offsetY) +
                  "px,0)"
              );
          }),
          S(".js-hover_snapshot").mouseleave(function () {
            S(".hover_h").removeClass("active");
          })))
      : S("#not_found").length && S("body").attr("data-page", "not_found");
}

function Js() {
  S("#team").length
    ? window.ww > bt
      ? (S(".team ul li.js-sc").eq(0).addClass("on"),
        S(".team ul li.js-sc").eq(1).addClass("on"))
      : S(".team ul li.js-sc").eq(0).addClass("on")
    : S("#team_detail").length
    ? window.ww > bt &&
      (S(".works_list ul li").eq(0).addClass("on"),
      S(".works_list ul li").eq(1).addClass("on"))
    : S("#news").length
    ? S(".news_list ul li").eq(0).addClass("on")
    : S("#work").length &&
      (window.ww > bt
        ? (S(".work ul li.js-sc").eq(0).addClass("on"),
          S(".work ul li.js-sc").eq(1).addClass("on"),
          S(".work ul li.js-sc").eq(2).addClass("on"))
        : S(".work ul li.js-sc").eq(0).addClass("on"));
}

function bc() {
  S(".js-txt").length &&
    S(".js-txt").each(function () {
      if (!S(this).hasClass("done")) {
        S(this).addClass("done");
        var s = S(this).html().split(""),
          i = "";
        if (S(this).attr("data-delay")) var r = S(this).attr("data-delay");
        else var r = 0;
        for (var o = S(this).attr("data-tra"), e = 0; e < s.length; e++) {
          var n =
            "transform " +
            o +
            "ms cubic-bezier(0.190, 1.000, 0.220, 1.000) " +
            (e * 20 + parseInt(r)) +
            "ms";
          s[e] == " "
            ? (i += " ")
            : s[e] == "*"
            ? (i += "<br />")
            : s[e] == "%"
            ? (i +=
                '<p class="icn"><span style="transition: ' +
                n +
                '"></span></p>')
            : (i +=
                '<p><span style="transition: ' +
                n +
                '">' +
                s[e] +
                "</span></p>");
        }
        S(this).html(i);
      }
    }),
    S(".js-txt_word").length &&
      S(".js-txt_word").each(function () {
        if (!S(this).hasClass("done")) {
          S(this).addClass("done");
          var s = S(this).html().split(" "),
            i = "";
          if (S(this).attr("data-delay")) var r = S(this).attr("data-delay");
          else var r = 0;
          for (var o = S(this).attr("data-tra"), e = 0; e < s.length; e++) {
            var n =
              "transform " +
              o +
              "ms cubic-bezier(0.190, 1.000, 0.220, 1.000) " +
              (e * 40 + parseInt(r)) +
              "ms";
            i +=
              '<p><span style="transition: ' + n + '">' + s[e] + "</span></p>";
          }
          S(this).html(i);
        }
      });
}

function Sc(s) {
  for (let i = s.length - 1; 0 < i; i--) {
    let r = Math.floor(Math.random() * (i + 1)),
      o = s[i];
    (s[i] = s[r]), (s[r] = o);
  }
  return s;
}
window.barba = ul;
window.barba.init({
  transitions: [
    {
      name: "transition",
      async leave(s) {
        const i = this.async();
        S("body").addClass("wait"),
          S("#header").removeClass("active"),
          S("#block_menu").removeClass("on"),
          await hl(300),
          (Eo[s.current.url.path] = S(window).scrollTop()),
          i();
      },
      enter(s) {
        S("body").addClass("set"), S("body").removeClass("loaded");
      },
      after(s) {
        hs(),
          Ys(),
          (window.ajax_areaHeight = S("#ajax_area").outerHeight()),
          (window.footerHeight = S("#footer").outerHeight()),
          setTimeout(function () {
            if (Li.popstate == !1)
              S("html,body").animate(
                {
                  scrollTop: 0,
                },
                10,
                function () {
                  S(".js-sc").removeClass("on"), Js();
                }
              );
            else {
              S("html,body").animate(
                {
                  scrollTop: Eo[s.next.url.path],
                },
                10
              ),
                (Li.popstate = !1);
              var i = S(window).scrollTop();
              S(".js-sc").each(function () {
                var r = S(this).offset().top;
                i > r - window.wh && S(this).addClass("on");
              });
            }
          }, 10),
          setTimeout(function () {
            S("body").removeClass("wait set"),
              S("body").addClass("loaded"),
              S(".js-load").addClass("on");
          }, 150),
          dataLayer.push({
            newPageUrl: location.pathname,
            event: "pageLoaded",
          });
      },
    },
  ],
});
window.barba.hooks.beforeEnter((s) => {
  dl(s);
});
(function (s, i, r, o, e) {
  (s[o] = s[o] || []),
    s[o].push({
      "gtm.start": new Date().getTime(),
      event: "gtm.js",
    });
  var n = i.getElementsByTagName(r)[0],
    l = i.createElement(r),
    d = "";
  (l.async = !0),
    (l.src = "https://www.googletagmanager.com/gtm.js?id=" + e + d),
    n.parentNode.insertBefore(l, n);
})(window, document, "script", "dataLayer", "GTM-5X6S66M");
