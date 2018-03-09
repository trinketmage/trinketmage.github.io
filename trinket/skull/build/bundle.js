/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var geometry,
    material,
    skull,
    vertices = 47505,
    skullPositions,
    initPositions = [],
    positions = [],
    colors = [],
    curves = [],
    delta = {
  t: 1
};
var n = 100,
    n2 = n / 2; // particles spread in the cube

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 1);
document.querySelector('#root').appendChild(renderer.domElement);

var manager = new THREE.LoadingManager();
manager.onProgress = function (item, loaded, total) {
  console.log(item, loaded, total);
};

function loadModel() {
  var onProgress = function (xhr) {
    if (xhr.lengthComputable) {
      var percentComplete = xhr.loaded / xhr.total * 100;
      console.log(Math.round(percentComplete, 2) + '% downloaded');
    }
  };
  var onError = function (xhr) {};
  var loader = new THREE.ObjectLoader(manager);
  loader.load('assets/model.json', function (obj) {
    skullPositions = obj.geometry.attributes.position.array;
    bindAnimation();
  }, onProgress, onError);
}
let curveDatas = [{
  x: -Math.floor(Math.random() * 20) + 5,
  y: 10,
  z: -Math.floor(Math.random() * 20) + 5
}, {
  x: Math.floor(Math.random() * 20) + 5,
  y: -10,
  z: Math.floor(Math.random() * 20) + 5
}];
function bindAnimation() {
  geometry = new THREE.BufferGeometry();
  positions = [];
  colors = [];

  var color = new THREE.Color();
  color.setRGB(1.0, 1.0, 1.0);
  for (var i = 0, l = vertices; i < l; i++) {
    // geometry.attributes.position.array[index++] = x
    // geometry.attributes.position.array[index++] = y
    // geometry.attributes.position.array[index++] = z

    // x += (Math.random() - 0.5) * 1
    // y += (Math.random() - 0.5) * 1
    // z += (Math.random() - 0.5) * 1

    var x = Math.random() * n - n2;
    var y = Math.random() * n - n2;
    var z = Math.random() * -n;
    positions.push(x, y, z);
    initPositions.push(x, y, z);

    colors.push(color.r, color.g, color.b);

    let curve = new THREE.CubicBezierCurve3(new THREE.Vector3(skullPositions[i * 3], skullPositions[i * 3 + 1], skullPositions[i * 3 + 2]), new THREE.Vector3(curveDatas[0].x, curveDatas[0].y, curveDatas[0].z), new THREE.Vector3(curveDatas[1].x, curveDatas[1].y, curveDatas[1].z), new THREE.Vector3(x, y, z));

    curves.push(curve);
  }
  geometry.setDrawRange(0, vertices);
  geometry.addAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.addAttribute('position', new THREE.Float32BufferAttribute(positions, 3).setDynamic(true));

  var material = new THREE.PointsMaterial({
    size: 1.0,
    vertexColors: 0xffffff,
    blending: THREE.AdditiveBlending,
    transparent: true,
    sizeAttenuation: false
  });

  skull = new THREE.Points(geometry, material);
  scene.add(skull);
  requestAnimationFrame(render);
  var tween = new TWEEN.Tween(delta).easing(TWEEN.Easing.Sinusoidal.InOut).delay(1000).to({ t: 0 }, 3000).yoyo(true).repeat(Infinity).start();
}
function interpolatePositions() {
  for (var i = 0; i < vertices; i++) {
    var point = curves[i].getPointAt(delta.t);
    // geometry.attributes.position.array[i * 3] =
    //   skullPositions[i * 3] * delta.t + initPositions[i * 3] * (1 - delta.t)
    // geometry.attributes.position.array[i * 3 + 1] =
    //   skullPositions[i * 3 + 1] * delta.t +
    //   initPositions[i * 3 + 1] * (1 - delta.t)
    // geometry.attributes.position.array[i * 3 + 2] =
    //   skullPositions[i * 3 + 2] * delta.t +
    //   initPositions[i * 3 + 2] * (1 - delta.t)
    geometry.attributes.position.array[i * 3] = point.x;
    geometry.attributes.position.array[i * 3 + 1] = point.y;
    geometry.attributes.position.array[i * 3 + 2] = point.z;
  }
}
function init() {
  loadModel();
  camera.position.z = 11;
}

var render = function (time) {
  requestAnimationFrame(render);
  TWEEN.update(time);
  interpolatePositions();
  geometry.attributes.position.needsUpdate = true;
  skull.rotation.z += 0.00125;
  skull.rotation.x += 0.00125;
  renderer.render(scene, camera);
};

init();

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNmE0YjJmNTMxM2ZhZmVmM2YxNmEiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiXSwibmFtZXMiOlsiZ2VvbWV0cnkiLCJtYXRlcmlhbCIsInNrdWxsIiwidmVydGljZXMiLCJza3VsbFBvc2l0aW9ucyIsImluaXRQb3NpdGlvbnMiLCJwb3NpdGlvbnMiLCJjb2xvcnMiLCJjdXJ2ZXMiLCJkZWx0YSIsInQiLCJuIiwibjIiLCJzY2VuZSIsIlRIUkVFIiwiU2NlbmUiLCJjYW1lcmEiLCJQZXJzcGVjdGl2ZUNhbWVyYSIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsInJlbmRlcmVyIiwiV2ViR0xSZW5kZXJlciIsInNldFNpemUiLCJzZXRDbGVhckNvbG9yIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYXBwZW5kQ2hpbGQiLCJkb21FbGVtZW50IiwibWFuYWdlciIsIkxvYWRpbmdNYW5hZ2VyIiwib25Qcm9ncmVzcyIsIml0ZW0iLCJsb2FkZWQiLCJ0b3RhbCIsImNvbnNvbGUiLCJsb2ciLCJsb2FkTW9kZWwiLCJ4aHIiLCJsZW5ndGhDb21wdXRhYmxlIiwicGVyY2VudENvbXBsZXRlIiwiTWF0aCIsInJvdW5kIiwib25FcnJvciIsImxvYWRlciIsIk9iamVjdExvYWRlciIsImxvYWQiLCJvYmoiLCJhdHRyaWJ1dGVzIiwicG9zaXRpb24iLCJhcnJheSIsImJpbmRBbmltYXRpb24iLCJjdXJ2ZURhdGFzIiwieCIsImZsb29yIiwicmFuZG9tIiwieSIsInoiLCJCdWZmZXJHZW9tZXRyeSIsImNvbG9yIiwiQ29sb3IiLCJzZXRSR0IiLCJpIiwibCIsInB1c2giLCJyIiwiZyIsImIiLCJjdXJ2ZSIsIkN1YmljQmV6aWVyQ3VydmUzIiwiVmVjdG9yMyIsInNldERyYXdSYW5nZSIsImFkZEF0dHJpYnV0ZSIsIkZsb2F0MzJCdWZmZXJBdHRyaWJ1dGUiLCJzZXREeW5hbWljIiwiUG9pbnRzTWF0ZXJpYWwiLCJzaXplIiwidmVydGV4Q29sb3JzIiwiYmxlbmRpbmciLCJBZGRpdGl2ZUJsZW5kaW5nIiwidHJhbnNwYXJlbnQiLCJzaXplQXR0ZW51YXRpb24iLCJQb2ludHMiLCJhZGQiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJyZW5kZXIiLCJ0d2VlbiIsIlRXRUVOIiwiVHdlZW4iLCJlYXNpbmciLCJFYXNpbmciLCJTaW51c29pZGFsIiwiSW5PdXQiLCJkZWxheSIsInRvIiwieW95byIsInJlcGVhdCIsIkluZmluaXR5Iiwic3RhcnQiLCJpbnRlcnBvbGF0ZVBvc2l0aW9ucyIsInBvaW50IiwiZ2V0UG9pbnRBdCIsImluaXQiLCJ0aW1lIiwidXBkYXRlIiwibmVlZHNVcGRhdGUiLCJyb3RhdGlvbiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDN0RBLElBQUlBLFFBQUo7QUFBQSxJQUNFQyxRQURGO0FBQUEsSUFFRUMsS0FGRjtBQUFBLElBR0VDLFdBQVcsS0FIYjtBQUFBLElBSUVDLGNBSkY7QUFBQSxJQUtFQyxnQkFBZ0IsRUFMbEI7QUFBQSxJQU1FQyxZQUFZLEVBTmQ7QUFBQSxJQU9FQyxTQUFTLEVBUFg7QUFBQSxJQVFFQyxTQUFTLEVBUlg7QUFBQSxJQVNFQyxRQUFRO0FBQ05DLEtBQUc7QUFERyxDQVRWO0FBWUEsSUFBSUMsSUFBSSxHQUFSO0FBQUEsSUFDRUMsS0FBS0QsSUFBSSxDQURYLEMsQ0FDYTs7QUFFYixJQUFJRSxRQUFRLElBQUlDLE1BQU1DLEtBQVYsRUFBWjtBQUNBLElBQUlDLFNBQVMsSUFBSUYsTUFBTUcsaUJBQVYsQ0FDWCxFQURXLEVBRVhDLE9BQU9DLFVBQVAsR0FBb0JELE9BQU9FLFdBRmhCLEVBR1gsR0FIVyxFQUlYLElBSlcsQ0FBYjtBQU1BLElBQUlDLFdBQVcsSUFBSVAsTUFBTVEsYUFBVixFQUFmO0FBQ0FELFNBQVNFLE9BQVQsQ0FBaUJMLE9BQU9DLFVBQXhCLEVBQW9DRCxPQUFPRSxXQUEzQztBQUNBQyxTQUFTRyxhQUFULENBQXVCLFFBQXZCLEVBQWlDLENBQWpDO0FBQ0FDLFNBQVNDLGFBQVQsQ0FBdUIsT0FBdkIsRUFBZ0NDLFdBQWhDLENBQTRDTixTQUFTTyxVQUFyRDs7QUFFQSxJQUFJQyxVQUFVLElBQUlmLE1BQU1nQixjQUFWLEVBQWQ7QUFDQUQsUUFBUUUsVUFBUixHQUFxQixVQUFTQyxJQUFULEVBQWVDLE1BQWYsRUFBdUJDLEtBQXZCLEVBQThCO0FBQ2pEQyxVQUFRQyxHQUFSLENBQVlKLElBQVosRUFBa0JDLE1BQWxCLEVBQTBCQyxLQUExQjtBQUNELENBRkQ7O0FBSUEsU0FBU0csU0FBVCxHQUFxQjtBQUNuQixNQUFJTixhQUFhLFVBQVNPLEdBQVQsRUFBYztBQUM3QixRQUFJQSxJQUFJQyxnQkFBUixFQUEwQjtBQUN4QixVQUFJQyxrQkFBa0JGLElBQUlMLE1BQUosR0FBYUssSUFBSUosS0FBakIsR0FBeUIsR0FBL0M7QUFDQUMsY0FBUUMsR0FBUixDQUFZSyxLQUFLQyxLQUFMLENBQVdGLGVBQVgsRUFBNEIsQ0FBNUIsSUFBaUMsY0FBN0M7QUFDRDtBQUNGLEdBTEQ7QUFNQSxNQUFJRyxVQUFVLFVBQVNMLEdBQVQsRUFBYyxDQUFFLENBQTlCO0FBQ0EsTUFBSU0sU0FBUyxJQUFJOUIsTUFBTStCLFlBQVYsQ0FBdUJoQixPQUF2QixDQUFiO0FBQ0FlLFNBQU9FLElBQVAsQ0FDRSxtQkFERixFQUVFLFVBQVNDLEdBQVQsRUFBYztBQUNaM0MscUJBQWlCMkMsSUFBSS9DLFFBQUosQ0FBYWdELFVBQWIsQ0FBd0JDLFFBQXhCLENBQWlDQyxLQUFsRDtBQUNBQztBQUNELEdBTEgsRUFNRXBCLFVBTkYsRUFPRVksT0FQRjtBQVNEO0FBQ0QsSUFBSVMsYUFBYSxDQUNmO0FBQ0VDLEtBQUcsQ0FBQ1osS0FBS2EsS0FBTCxDQUFXYixLQUFLYyxNQUFMLEtBQWdCLEVBQTNCLENBQUQsR0FBa0MsQ0FEdkM7QUFFRUMsS0FBRyxFQUZMO0FBR0VDLEtBQUcsQ0FBQ2hCLEtBQUthLEtBQUwsQ0FBV2IsS0FBS2MsTUFBTCxLQUFnQixFQUEzQixDQUFELEdBQWtDO0FBSHZDLENBRGUsRUFNZjtBQUNFRixLQUFHWixLQUFLYSxLQUFMLENBQVdiLEtBQUtjLE1BQUwsS0FBZ0IsRUFBM0IsSUFBaUMsQ0FEdEM7QUFFRUMsS0FBRyxDQUFDLEVBRk47QUFHRUMsS0FBR2hCLEtBQUthLEtBQUwsQ0FBV2IsS0FBS2MsTUFBTCxLQUFnQixFQUEzQixJQUFpQztBQUh0QyxDQU5lLENBQWpCO0FBWUEsU0FBU0osYUFBVCxHQUF5QjtBQUN2Qm5ELGFBQVcsSUFBSWMsTUFBTTRDLGNBQVYsRUFBWDtBQUNBcEQsY0FBWSxFQUFaO0FBQ0FDLFdBQVMsRUFBVDs7QUFFQSxNQUFJb0QsUUFBUSxJQUFJN0MsTUFBTThDLEtBQVYsRUFBWjtBQUNBRCxRQUFNRSxNQUFOLENBQWEsR0FBYixFQUFrQixHQUFsQixFQUF1QixHQUF2QjtBQUNBLE9BQUssSUFBSUMsSUFBSSxDQUFSLEVBQVdDLElBQUk1RCxRQUFwQixFQUE4QjJELElBQUlDLENBQWxDLEVBQXFDRCxHQUFyQyxFQUEwQztBQUN4QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFFBQUlULElBQUlaLEtBQUtjLE1BQUwsS0FBZ0I1QyxDQUFoQixHQUFvQkMsRUFBNUI7QUFDQSxRQUFJNEMsSUFBSWYsS0FBS2MsTUFBTCxLQUFnQjVDLENBQWhCLEdBQW9CQyxFQUE1QjtBQUNBLFFBQUk2QyxJQUFJaEIsS0FBS2MsTUFBTCxLQUFnQixDQUFDNUMsQ0FBekI7QUFDQUwsY0FBVTBELElBQVYsQ0FBZVgsQ0FBZixFQUFrQkcsQ0FBbEIsRUFBcUJDLENBQXJCO0FBQ0FwRCxrQkFBYzJELElBQWQsQ0FBbUJYLENBQW5CLEVBQXNCRyxDQUF0QixFQUF5QkMsQ0FBekI7O0FBRUFsRCxXQUFPeUQsSUFBUCxDQUFZTCxNQUFNTSxDQUFsQixFQUFxQk4sTUFBTU8sQ0FBM0IsRUFBOEJQLE1BQU1RLENBQXBDOztBQUVBLFFBQUlDLFFBQVEsSUFBSXRELE1BQU11RCxpQkFBVixDQUNWLElBQUl2RCxNQUFNd0QsT0FBVixDQUNFbEUsZUFBZTBELElBQUksQ0FBbkIsQ0FERixFQUVFMUQsZUFBZTBELElBQUksQ0FBSixHQUFRLENBQXZCLENBRkYsRUFHRTFELGVBQWUwRCxJQUFJLENBQUosR0FBUSxDQUF2QixDQUhGLENBRFUsRUFNVixJQUFJaEQsTUFBTXdELE9BQVYsQ0FBa0JsQixXQUFXLENBQVgsRUFBY0MsQ0FBaEMsRUFBbUNELFdBQVcsQ0FBWCxFQUFjSSxDQUFqRCxFQUFvREosV0FBVyxDQUFYLEVBQWNLLENBQWxFLENBTlUsRUFPVixJQUFJM0MsTUFBTXdELE9BQVYsQ0FBa0JsQixXQUFXLENBQVgsRUFBY0MsQ0FBaEMsRUFBbUNELFdBQVcsQ0FBWCxFQUFjSSxDQUFqRCxFQUFvREosV0FBVyxDQUFYLEVBQWNLLENBQWxFLENBUFUsRUFRVixJQUFJM0MsTUFBTXdELE9BQVYsQ0FBa0JqQixDQUFsQixFQUFxQkcsQ0FBckIsRUFBd0JDLENBQXhCLENBUlUsQ0FBWjs7QUFXQWpELFdBQU93RCxJQUFQLENBQVlJLEtBQVo7QUFDRDtBQUNEcEUsV0FBU3VFLFlBQVQsQ0FBc0IsQ0FBdEIsRUFBeUJwRSxRQUF6QjtBQUNBSCxXQUFTd0UsWUFBVCxDQUFzQixPQUF0QixFQUErQixJQUFJMUQsTUFBTTJELHNCQUFWLENBQWlDbEUsTUFBakMsRUFBeUMsQ0FBekMsQ0FBL0I7QUFDQVAsV0FBU3dFLFlBQVQsQ0FDRSxVQURGLEVBRUUsSUFBSTFELE1BQU0yRCxzQkFBVixDQUFpQ25FLFNBQWpDLEVBQTRDLENBQTVDLEVBQStDb0UsVUFBL0MsQ0FBMEQsSUFBMUQsQ0FGRjs7QUFLQSxNQUFJekUsV0FBVyxJQUFJYSxNQUFNNkQsY0FBVixDQUF5QjtBQUN0Q0MsVUFBTSxHQURnQztBQUV0Q0Msa0JBQWMsUUFGd0I7QUFHdENDLGNBQVVoRSxNQUFNaUUsZ0JBSHNCO0FBSXRDQyxpQkFBYSxJQUp5QjtBQUt0Q0MscUJBQWlCO0FBTHFCLEdBQXpCLENBQWY7O0FBUUEvRSxVQUFRLElBQUlZLE1BQU1vRSxNQUFWLENBQWlCbEYsUUFBakIsRUFBMkJDLFFBQTNCLENBQVI7QUFDQVksUUFBTXNFLEdBQU4sQ0FBVWpGLEtBQVY7QUFDQWtGLHdCQUFzQkMsTUFBdEI7QUFDQSxNQUFJQyxRQUFRLElBQUlDLE1BQU1DLEtBQVYsQ0FBZ0IvRSxLQUFoQixFQUNUZ0YsTUFEUyxDQUNGRixNQUFNRyxNQUFOLENBQWFDLFVBQWIsQ0FBd0JDLEtBRHRCLEVBRVRDLEtBRlMsQ0FFSCxJQUZHLEVBR1RDLEVBSFMsQ0FHTixFQUFFcEYsR0FBRyxDQUFMLEVBSE0sRUFHSSxJQUhKLEVBSVRxRixJQUpTLENBSUosSUFKSSxFQUtUQyxNQUxTLENBS0ZDLFFBTEUsRUFNVEMsS0FOUyxFQUFaO0FBT0Q7QUFDRCxTQUFTQyxvQkFBVCxHQUFnQztBQUM5QixPQUFLLElBQUlyQyxJQUFJLENBQWIsRUFBZ0JBLElBQUkzRCxRQUFwQixFQUE4QjJELEdBQTlCLEVBQW1DO0FBQ2pDLFFBQUlzQyxRQUFRNUYsT0FBT3NELENBQVAsRUFBVXVDLFVBQVYsQ0FBcUI1RixNQUFNQyxDQUEzQixDQUFaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBVixhQUFTZ0QsVUFBVCxDQUFvQkMsUUFBcEIsQ0FBNkJDLEtBQTdCLENBQW1DWSxJQUFJLENBQXZDLElBQTRDc0MsTUFBTS9DLENBQWxEO0FBQ0FyRCxhQUFTZ0QsVUFBVCxDQUFvQkMsUUFBcEIsQ0FBNkJDLEtBQTdCLENBQW1DWSxJQUFJLENBQUosR0FBUSxDQUEzQyxJQUFnRHNDLE1BQU01QyxDQUF0RDtBQUNBeEQsYUFBU2dELFVBQVQsQ0FBb0JDLFFBQXBCLENBQTZCQyxLQUE3QixDQUFtQ1ksSUFBSSxDQUFKLEdBQVEsQ0FBM0MsSUFBZ0RzQyxNQUFNM0MsQ0FBdEQ7QUFDRDtBQUNGO0FBQ0QsU0FBUzZDLElBQVQsR0FBZ0I7QUFDZGpFO0FBQ0FyQixTQUFPaUMsUUFBUCxDQUFnQlEsQ0FBaEIsR0FBb0IsRUFBcEI7QUFDRDs7QUFFRCxJQUFJNEIsU0FBUyxVQUFTa0IsSUFBVCxFQUFlO0FBQzFCbkIsd0JBQXNCQyxNQUF0QjtBQUNBRSxRQUFNaUIsTUFBTixDQUFhRCxJQUFiO0FBQ0FKO0FBQ0FuRyxXQUFTZ0QsVUFBVCxDQUFvQkMsUUFBcEIsQ0FBNkJ3RCxXQUE3QixHQUEyQyxJQUEzQztBQUNBdkcsUUFBTXdHLFFBQU4sQ0FBZWpELENBQWYsSUFBb0IsT0FBcEI7QUFDQXZELFFBQU13RyxRQUFOLENBQWVyRCxDQUFmLElBQW9CLE9BQXBCO0FBQ0FoQyxXQUFTZ0UsTUFBVCxDQUFnQnhFLEtBQWhCLEVBQXVCRyxNQUF2QjtBQUNELENBUkQ7O0FBVUFzRixPIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDZhNGIyZjUzMTNmYWZlZjNmMTZhIiwidmFyIGdlb21ldHJ5LFxuICBtYXRlcmlhbCxcbiAgc2t1bGwsXG4gIHZlcnRpY2VzID0gNDc1MDUsXG4gIHNrdWxsUG9zaXRpb25zLFxuICBpbml0UG9zaXRpb25zID0gW10sXG4gIHBvc2l0aW9ucyA9IFtdLFxuICBjb2xvcnMgPSBbXSxcbiAgY3VydmVzID0gW10sXG4gIGRlbHRhID0ge1xuICAgIHQ6IDFcbiAgfVxudmFyIG4gPSAxMDAsXG4gIG4yID0gbiAvIDIgLy8gcGFydGljbGVzIHNwcmVhZCBpbiB0aGUgY3ViZVxuXG52YXIgc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKVxudmFyIGNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYShcbiAgNzUsXG4gIHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0LFxuICAwLjEsXG4gIDEwMDBcbilcbnZhciByZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKClcbnJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodClcbnJlbmRlcmVyLnNldENsZWFyQ29sb3IoMHgwMDAwMDAsIDEpXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcm9vdCcpLmFwcGVuZENoaWxkKHJlbmRlcmVyLmRvbUVsZW1lbnQpXG5cbnZhciBtYW5hZ2VyID0gbmV3IFRIUkVFLkxvYWRpbmdNYW5hZ2VyKClcbm1hbmFnZXIub25Qcm9ncmVzcyA9IGZ1bmN0aW9uKGl0ZW0sIGxvYWRlZCwgdG90YWwpIHtcbiAgY29uc29sZS5sb2coaXRlbSwgbG9hZGVkLCB0b3RhbClcbn1cblxuZnVuY3Rpb24gbG9hZE1vZGVsKCkge1xuICB2YXIgb25Qcm9ncmVzcyA9IGZ1bmN0aW9uKHhocikge1xuICAgIGlmICh4aHIubGVuZ3RoQ29tcHV0YWJsZSkge1xuICAgICAgdmFyIHBlcmNlbnRDb21wbGV0ZSA9IHhoci5sb2FkZWQgLyB4aHIudG90YWwgKiAxMDBcbiAgICAgIGNvbnNvbGUubG9nKE1hdGgucm91bmQocGVyY2VudENvbXBsZXRlLCAyKSArICclIGRvd25sb2FkZWQnKVxuICAgIH1cbiAgfVxuICB2YXIgb25FcnJvciA9IGZ1bmN0aW9uKHhocikge31cbiAgdmFyIGxvYWRlciA9IG5ldyBUSFJFRS5PYmplY3RMb2FkZXIobWFuYWdlcilcbiAgbG9hZGVyLmxvYWQoXG4gICAgJ2Fzc2V0cy9tb2RlbC5qc29uJyxcbiAgICBmdW5jdGlvbihvYmopIHtcbiAgICAgIHNrdWxsUG9zaXRpb25zID0gb2JqLmdlb21ldHJ5LmF0dHJpYnV0ZXMucG9zaXRpb24uYXJyYXlcbiAgICAgIGJpbmRBbmltYXRpb24oKVxuICAgIH0sXG4gICAgb25Qcm9ncmVzcyxcbiAgICBvbkVycm9yXG4gIClcbn1cbmxldCBjdXJ2ZURhdGFzID0gW1xuICB7XG4gICAgeDogLU1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIwKSArIDUsXG4gICAgeTogMTAsXG4gICAgejogLU1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIwKSArIDUsXG4gIH0sXG4gIHtcbiAgICB4OiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyMCkgKyA1LFxuICAgIHk6IC0xMCxcbiAgICB6OiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyMCkgKyA1XG4gIH1cbl1cbmZ1bmN0aW9uIGJpbmRBbmltYXRpb24oKSB7XG4gIGdlb21ldHJ5ID0gbmV3IFRIUkVFLkJ1ZmZlckdlb21ldHJ5KClcbiAgcG9zaXRpb25zID0gW11cbiAgY29sb3JzID0gW11cblxuICB2YXIgY29sb3IgPSBuZXcgVEhSRUUuQ29sb3IoKVxuICBjb2xvci5zZXRSR0IoMS4wLCAxLjAsIDEuMClcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSB2ZXJ0aWNlczsgaSA8IGw7IGkrKykge1xuICAgIC8vIGdlb21ldHJ5LmF0dHJpYnV0ZXMucG9zaXRpb24uYXJyYXlbaW5kZXgrK10gPSB4XG4gICAgLy8gZ2VvbWV0cnkuYXR0cmlidXRlcy5wb3NpdGlvbi5hcnJheVtpbmRleCsrXSA9IHlcbiAgICAvLyBnZW9tZXRyeS5hdHRyaWJ1dGVzLnBvc2l0aW9uLmFycmF5W2luZGV4KytdID0gelxuXG4gICAgLy8geCArPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAxXG4gICAgLy8geSArPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAxXG4gICAgLy8geiArPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAxXG5cbiAgICB2YXIgeCA9IE1hdGgucmFuZG9tKCkgKiBuIC0gbjJcbiAgICB2YXIgeSA9IE1hdGgucmFuZG9tKCkgKiBuIC0gbjJcbiAgICB2YXIgeiA9IE1hdGgucmFuZG9tKCkgKiAtblxuICAgIHBvc2l0aW9ucy5wdXNoKHgsIHksIHopXG4gICAgaW5pdFBvc2l0aW9ucy5wdXNoKHgsIHksIHopXG5cbiAgICBjb2xvcnMucHVzaChjb2xvci5yLCBjb2xvci5nLCBjb2xvci5iKVxuXG4gICAgbGV0IGN1cnZlID0gbmV3IFRIUkVFLkN1YmljQmV6aWVyQ3VydmUzKFxuICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoXG4gICAgICAgIHNrdWxsUG9zaXRpb25zW2kgKiAzXSxcbiAgICAgICAgc2t1bGxQb3NpdGlvbnNbaSAqIDMgKyAxXSxcbiAgICAgICAgc2t1bGxQb3NpdGlvbnNbaSAqIDMgKyAyXVxuICAgICAgKSxcbiAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKGN1cnZlRGF0YXNbMF0ueCwgY3VydmVEYXRhc1swXS55LCBjdXJ2ZURhdGFzWzBdLnopLFxuICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoY3VydmVEYXRhc1sxXS54LCBjdXJ2ZURhdGFzWzFdLnksIGN1cnZlRGF0YXNbMV0ueiksXG4gICAgICBuZXcgVEhSRUUuVmVjdG9yMyh4LCB5LCB6KVxuICAgIClcblxuICAgIGN1cnZlcy5wdXNoKGN1cnZlKVxuICB9XG4gIGdlb21ldHJ5LnNldERyYXdSYW5nZSgwLCB2ZXJ0aWNlcylcbiAgZ2VvbWV0cnkuYWRkQXR0cmlidXRlKCdjb2xvcicsIG5ldyBUSFJFRS5GbG9hdDMyQnVmZmVyQXR0cmlidXRlKGNvbG9ycywgMykpXG4gIGdlb21ldHJ5LmFkZEF0dHJpYnV0ZShcbiAgICAncG9zaXRpb24nLFxuICAgIG5ldyBUSFJFRS5GbG9hdDMyQnVmZmVyQXR0cmlidXRlKHBvc2l0aW9ucywgMykuc2V0RHluYW1pYyh0cnVlKVxuICApXG5cbiAgdmFyIG1hdGVyaWFsID0gbmV3IFRIUkVFLlBvaW50c01hdGVyaWFsKHtcbiAgICBzaXplOiAxLjAsXG4gICAgdmVydGV4Q29sb3JzOiAweGZmZmZmZixcbiAgICBibGVuZGluZzogVEhSRUUuQWRkaXRpdmVCbGVuZGluZyxcbiAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICBzaXplQXR0ZW51YXRpb246IGZhbHNlXG4gIH0pXG5cbiAgc2t1bGwgPSBuZXcgVEhSRUUuUG9pbnRzKGdlb21ldHJ5LCBtYXRlcmlhbClcbiAgc2NlbmUuYWRkKHNrdWxsKVxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKVxuICB2YXIgdHdlZW4gPSBuZXcgVFdFRU4uVHdlZW4oZGVsdGEpXG4gICAgLmVhc2luZyhUV0VFTi5FYXNpbmcuU2ludXNvaWRhbC5Jbk91dClcbiAgICAuZGVsYXkoMTAwMClcbiAgICAudG8oeyB0OiAwIH0sIDMwMDApXG4gICAgLnlveW8odHJ1ZSlcbiAgICAucmVwZWF0KEluZmluaXR5KVxuICAgIC5zdGFydCgpXG59XG5mdW5jdGlvbiBpbnRlcnBvbGF0ZVBvc2l0aW9ucygpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB2ZXJ0aWNlczsgaSsrKSB7XG4gICAgdmFyIHBvaW50ID0gY3VydmVzW2ldLmdldFBvaW50QXQoZGVsdGEudClcbiAgICAvLyBnZW9tZXRyeS5hdHRyaWJ1dGVzLnBvc2l0aW9uLmFycmF5W2kgKiAzXSA9XG4gICAgLy8gICBza3VsbFBvc2l0aW9uc1tpICogM10gKiBkZWx0YS50ICsgaW5pdFBvc2l0aW9uc1tpICogM10gKiAoMSAtIGRlbHRhLnQpXG4gICAgLy8gZ2VvbWV0cnkuYXR0cmlidXRlcy5wb3NpdGlvbi5hcnJheVtpICogMyArIDFdID1cbiAgICAvLyAgIHNrdWxsUG9zaXRpb25zW2kgKiAzICsgMV0gKiBkZWx0YS50ICtcbiAgICAvLyAgIGluaXRQb3NpdGlvbnNbaSAqIDMgKyAxXSAqICgxIC0gZGVsdGEudClcbiAgICAvLyBnZW9tZXRyeS5hdHRyaWJ1dGVzLnBvc2l0aW9uLmFycmF5W2kgKiAzICsgMl0gPVxuICAgIC8vICAgc2t1bGxQb3NpdGlvbnNbaSAqIDMgKyAyXSAqIGRlbHRhLnQgK1xuICAgIC8vICAgaW5pdFBvc2l0aW9uc1tpICogMyArIDJdICogKDEgLSBkZWx0YS50KVxuICAgIGdlb21ldHJ5LmF0dHJpYnV0ZXMucG9zaXRpb24uYXJyYXlbaSAqIDNdID0gcG9pbnQueFxuICAgIGdlb21ldHJ5LmF0dHJpYnV0ZXMucG9zaXRpb24uYXJyYXlbaSAqIDMgKyAxXSA9IHBvaW50LnlcbiAgICBnZW9tZXRyeS5hdHRyaWJ1dGVzLnBvc2l0aW9uLmFycmF5W2kgKiAzICsgMl0gPSBwb2ludC56XG4gIH1cbn1cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIGxvYWRNb2RlbCgpXG4gIGNhbWVyYS5wb3NpdGlvbi56ID0gMTFcbn1cblxudmFyIHJlbmRlciA9IGZ1bmN0aW9uKHRpbWUpIHtcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcilcbiAgVFdFRU4udXBkYXRlKHRpbWUpXG4gIGludGVycG9sYXRlUG9zaXRpb25zKClcbiAgZ2VvbWV0cnkuYXR0cmlidXRlcy5wb3NpdGlvbi5uZWVkc1VwZGF0ZSA9IHRydWVcbiAgc2t1bGwucm90YXRpb24ueiArPSAwLjAwMTI1XG4gIHNrdWxsLnJvdGF0aW9uLnggKz0gMC4wMDEyNVxuICByZW5kZXJlci5yZW5kZXIoc2NlbmUsIGNhbWVyYSlcbn1cblxuaW5pdCgpXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFpbi5qcyJdLCJzb3VyY2VSb290IjoiIn0=