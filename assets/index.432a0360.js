import { H as HemisphereLight, D as DirectionalLight, E as EffectComposer, R as RenderPass, S as SMAAPass, B as Box3, M as Mesh, G as Group, m as mergeBufferGeometries, a as MeshStandardMaterial, b as MeshBVH, c as MeshBVHVisualizer, d as Matrix4, L as Line3, V as Vector3, A as AnimationMixer, C as Clock, e as LoopOnce, f as SkeletonHelper, g as anime, h as GUI$1, i as Scene, W as WebGLRenderer, P as PerspectiveCamera, O as OrbitControls, j as PCFSoftShadowMap, k as Color, F as Fog, l as Stats, n as GLTFLoader, o as LoadingManager } from "./vendor.ddfd89fe.js";
const p = function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
};
p();
var style = "body {\n  margin: 0;\n  background: black\n}\n";
function addLights(scene2) {
  const ambientLight = new HemisphereLight(16777215, 2236962, 0.5);
  const mainLight = new DirectionalLight(16777215, 0.7);
  mainLight.position.set(1, 1.5, 1).multiplyScalar(100);
  mainLight.shadow.mapSize.setScalar(3072);
  mainLight.shadow.bias = -1e-3;
  mainLight.shadow.normalBias = 0.05;
  mainLight.castShadow = true;
  const shadowCam = mainLight.shadow.camera;
  shadowCam.bottom = shadowCam.left = -300;
  shadowCam.top = 300;
  shadowCam.right = 300;
  scene2.add(ambientLight, mainLight);
}
function postProduction(scene2, camera2, renderer2) {
  const composer = new EffectComposer(renderer2);
  const renderPass = new RenderPass(scene2, camera2);
  composer.addPass(renderPass);
  const pass = new SMAAPass(window.innerWidth * renderer2.getPixelRatio(), window.innerHeight * renderer2.getPixelRatio());
  composer.addPass(pass);
}
function addMap(loader2, scene2, objects2, mapPath, collisionMapPath) {
  loader2.load(mapPath, (gltf) => {
    const model = gltf.scene;
    const box = new Box3();
    box.setFromObject(model);
    box.getCenter(model.position).negate();
    model.updateMatrixWorld(true);
    const toMerge = {};
    model.traverse((child) => {
      if (child instanceof Mesh) {
        const hex = child.material.color.getHex();
        toMerge[hex] = toMerge[hex] || [];
        toMerge[hex].push(child);
        child.castShadow = true;
        child.receiveShadow = true;
        child.material.shadowSide = 2;
      }
    });
    const environment = new Group();
    for (const hex in toMerge) {
      const arr = toMerge[hex];
      const visualGeometries = [];
      arr.forEach((mesh) => {
        if (mesh.material.emissive.r !== 0) {
          environment.attach(mesh);
        } else {
          const geom = mesh.geometry.clone();
          geom.applyMatrix4(mesh.matrixWorld);
          visualGeometries.push(geom);
        }
      });
      if (visualGeometries.length) {
        const newGeom = mergeBufferGeometries(visualGeometries);
        const newMesh = new Mesh(newGeom, new MeshStandardMaterial({ color: 16777215, opacity: 0, transparent: true, depthWrite: false }));
        newMesh.castShadow = true;
        newMesh.receiveShadow = true;
        newMesh.material.shadowSide = 2;
        environment.add(newMesh);
      }
    }
    const geometries = [];
    environment.updateMatrixWorld(true);
    environment.traverse((child) => {
      if (child instanceof Mesh) {
        const cloned = child.geometry.clone();
        cloned.applyMatrix4(child.matrixWorld);
        for (const key in cloned.attributes) {
          if (key !== "position") {
            cloned.deleteAttribute(key);
          }
        }
        geometries.push(cloned);
      }
    });
    const mergedGeometry = mergeBufferGeometries(geometries, false);
    mergedGeometry.boundsTree = new MeshBVH(mergedGeometry, { lazyGeneration: false });
    const collider = new Mesh(mergedGeometry);
    collider.material.wireframe = true;
    collider.material.opacity = 0.5;
    collider.material.transparent = true;
    collider.userData.name = "collider";
    objects2[collider.userData.name] = collider;
    const visualizer = new MeshBVHVisualizer(collider, 1e3);
    visualizer.visible = true;
    scene2.add(model);
  }, void 0, function(error) {
    console.error(error);
  });
  loader2.load(collisionMapPath, (gltf) => {
    const model = gltf.scene;
    model.userData.name = "floor";
    model.visible = false;
    scene2.add(model);
    objects2[model.userData.name] = model;
  }, void 0, function(error) {
    console.error(error);
  });
}
function keysControls(pressedKeys2) {
  const keysFunctions2 = [];
  let gamepads2 = [];
  const keyUp = (e) => {
    pressedKeys2[e.code] = false;
  };
  const keyDown = (e) => {
    pressedKeys2[e.code] = true;
  };
  const connectGamepad = (e) => {
    console.log(e.gamepad.id, "pod\u0142\u0105czony");
  };
  const disconectGamepad = (e) => {
    console.log(e.gamepad.id, "od\u0142\u0105czony");
  };
  const checkPads2 = () => {
    gamepads2 = navigator.getGamepads();
  };
  const checkPressedKeys2 = () => {
    keysFunctions2.forEach((func) => {
      func();
    });
  };
  window.addEventListener("keydown", keyDown);
  window.addEventListener("keyup", keyUp);
  window.addEventListener("gamepadconnected", connectGamepad);
  window.addEventListener("gamepaddisconnected", disconectGamepad);
  const testAllKeys2 = (keysArray, exceptionKeysArray = null) => {
    const activeInArray = keysArray.every((e) => pressedKeys2[e] === true);
    if (exceptionKeysArray) {
      const exceptionInArray = exceptionKeysArray.every((e) => pressedKeys2[e] === false || pressedKeys2[e] === void 0);
      return activeInArray && exceptionInArray;
    }
    return activeInArray;
  };
  const testAnyKeys2 = (keysArray) => {
    return keysArray.some((e) => pressedKeys2[e] === true);
  };
  const testAllButtons2 = (buttonsArray, exceptionKeysArray = null) => {
    const activeInArray = buttonsArray.every((button) => {
      var _a;
      return (_a = gamepads2[0]) == null ? void 0 : _a.buttons[button].pressed;
    });
    if (exceptionKeysArray) {
      const exceptionInArray = exceptionKeysArray.every((button) => {
        var _a;
        return !((_a = gamepads2[0]) == null ? void 0 : _a.buttons[button].pressed);
      });
      return activeInArray && exceptionInArray;
    }
    return activeInArray;
  };
  const testAxis2 = () => {
    var _a, _b;
    if (gamepads2[0]) {
      const axisTolerance = 0.3;
      const a0 = (_a = gamepads2[0]) == null ? void 0 : _a.axes[0];
      const a1 = (_b = gamepads2[0]) == null ? void 0 : _b.axes[1];
      const angle = Math.atan2(a1, -a0) * 180 / Math.PI;
      const result = {
        angle: angle - 90,
        x: a0,
        z: a1
      };
      if (Math.abs(a0) > axisTolerance || Math.abs(a1) > axisTolerance)
        return result;
    }
  };
  const testAnyButton2 = (buttonsArray) => {
    return buttonsArray.some((button) => {
      var _a;
      return (_a = gamepads2[0]) == null ? void 0 : _a.buttons[button].pressed;
    });
  };
  return {
    testAllKeys: testAllKeys2,
    testAnyKeys: testAnyKeys2,
    keysFunctions: keysFunctions2,
    checkPressedKeys: checkPressedKeys2,
    testAllButtons: testAllButtons2,
    testAnyButton: testAnyButton2,
    testAxis: testAxis2,
    checkPads: checkPads2,
    gamepads: gamepads2
  };
}
function addCharacter(loader2, scene2, objects2, animations2, mixers2, pressedKeys2, testAllKeys2, testAnyKeys2, gamepads2, testAllButtons2, testAnyButton2, testAxis2, characterPath, controls2, camera2, position, cameraOffset2, animation, gameOver) {
  const clock2 = new Clock();
  let pauseOthersAnimations = false;
  const tempBox = new Box3();
  const tempMatrix = new Matrix4();
  const tempSegment = new Line3();
  const tempVector = new Vector3();
  const tempVector2 = new Vector3();
  const upVector = new Vector3(0, 1, 0);
  const gravity = -2;
  const lastSavePosition = new Vector3();
  let lifes2 = 3;
  const defaultPosition = new Vector3().copy(position);
  let currentAnimation = null;
  const playAnimation = (objectMixer, objectAnimations, animationName, acceleration = 1, loop = true) => {
    const clip = objectAnimations.find((el) => el.name === animationName);
    const animation2 = objectMixer.clipAction(clip);
    animation2.setEffectiveTimeScale(acceleration);
    if (!loop && animation2.time == animation2.getClip().duration) {
      animation2.reset();
    }
    if (!loop && animation2 != currentAnimation) {
      pauseOthersAnimations = true;
      animation2.setLoop(LoopOnce, 1);
      animation2.setEffectiveWeight(1).reset();
      currentAnimation == null ? void 0 : currentAnimation.fadeOut(getFadeTime(currentAnimation, animation2));
      currentAnimation = animation2;
    }
    if (pauseOthersAnimations) {
      if (currentAnimation && currentAnimation.time / currentAnimation.getClip().duration >= 0.75) {
        pauseOthersAnimations = false;
        animation2.fadeIn(getFadeTime(animation2, currentAnimation)).reset();
        currentAnimation = animation2;
      }
    } else {
      animation2.setEffectiveWeight(1);
      currentAnimation = animation2;
    }
  };
  const getFadeTime = (startAnimation, endAnimation) => {
    const startAnimationTime = startAnimation.getClip().duration / startAnimation.getEffectiveTimeScale();
    const endAnimationTime = endAnimation.getClip().duration / endAnimation.getEffectiveTimeScale();
    if (endAnimationTime * 0.25 > startAnimationTime) {
      return startAnimationTime;
    } else {
      return endAnimationTime * 0.25;
    }
  };
  const stopAnimation = (objectMixer, objectAnimations, animationName) => {
    const clip = objectAnimations.find((el) => el.name === animationName);
    const animation2 = objectMixer.clipAction(clip);
    animation2.setEffectiveWeight(0);
  };
  const updateCameraPosition = () => {
    anime({
      targets: controls2.target,
      easing: "easeOutCirc",
      duration: 2e3,
      complete: () => {
      },
      x: objects2["Robot"].position.x,
      y: objects2["Robot"].position.y,
      z: objects2["Robot"].position.z
    });
  };
  const resetGame2 = () => {
    lifes2 = 3;
    const player = objects2["Robot"];
    player.userData.velocity.set(0, 0, 0);
    player.position.set(defaultPosition.x, defaultPosition.y, defaultPosition.z);
    setTimeout(() => {
    }, 1e3);
  };
  const checkKeysState = () => {
    const collider = objects2["collider"];
    const delta = 0.1;
    const player = objects2["Robot"];
    if (player.userData.velocity.y == 0)
      lastSavePosition.set(player.position.x, player.position.y, player.position.z);
    let speed = player.userData.speed;
    player.userData.velocity.y += delta * gravity;
    player.position.addScaledVector(player.userData.velocity, delta);
    const oneLoop = (currentAnimation == null ? void 0 : currentAnimation.loop) == 2200;
    const angle = controls2.getAzimuthalAngle();
    const cameraAngle = angle * 180 / Math.PI;
    const robotRotation = objects2["Robot"].rotation.y * 180 / Math.PI;
    let robotAngle = robotRotation;
    if ((testAllKeys2(["ShiftLeft"]) || testAllButtons2([7])) && !oneLoop) {
      speed *= 2;
    }
    if (testAllKeys2(["KeyW"], ["KeyA", "KeyS", "KeyD"]) || testAllButtons2([12], [13, 14, 15])) {
      tempVector.set(0, 0, -1).applyAxisAngle(upVector, angle);
      player.position.addScaledVector(tempVector, speed * delta);
      robotAngle = 180 + cameraAngle;
    }
    if (testAllKeys2(["KeyA"], ["KeyW", "KeyS", "KeyD"]) || testAllButtons2([14], [12, 13, 15])) {
      tempVector.set(-1, 0, 0).applyAxisAngle(upVector, angle);
      player.position.addScaledVector(tempVector, speed * delta);
      robotAngle = -90 + cameraAngle;
    }
    if (testAllKeys2(["KeyS"], ["KeyW", "KeyA", "KeyD"]) || testAllButtons2([13], [12, 14, 15])) {
      tempVector.set(0, 0, 1).applyAxisAngle(upVector, angle);
      player.position.addScaledVector(tempVector, speed * delta);
      robotAngle = 0 + cameraAngle;
    }
    if (testAllKeys2(["KeyD"], ["KeyW", "KeyA", "KeyS"]) || testAllButtons2([15], [12, 13, 14])) {
      tempVector.set(1, 0, 0).applyAxisAngle(upVector, angle);
      player.position.addScaledVector(tempVector, speed * delta);
      robotAngle = 90 + cameraAngle;
    }
    if (testAllKeys2(["KeyW", "KeyA"]) || testAllButtons2([12, 14])) {
      tempVector.set(-1, 0, -1).applyAxisAngle(upVector, angle);
      player.position.addScaledVector(tempVector, speed * delta);
      robotAngle = -135 + cameraAngle;
    }
    if (testAllKeys2(["KeyW", "KeyD"]) || testAllButtons2([12, 15])) {
      tempVector.set(1, 0, -1).applyAxisAngle(upVector, angle);
      player.position.addScaledVector(tempVector, speed * delta);
      robotAngle = 135 + cameraAngle;
    }
    if (testAllKeys2(["KeyS", "KeyA"]) || testAllButtons2([13, 14])) {
      tempVector.set(-1, 0, 1).applyAxisAngle(upVector, angle);
      player.position.addScaledVector(tempVector, speed * delta);
      robotAngle = -45 + cameraAngle;
    }
    if (testAllKeys2(["KeyS", "KeyD"]) || testAllButtons2([13, 15])) {
      tempVector.set(1, 0, 1).applyAxisAngle(upVector, angle);
      player.position.addScaledVector(tempVector, speed * delta);
      robotAngle = 45 + cameraAngle;
    }
    player.rotation.y = robotAngle * (Math.PI / 180);
    player.updateMatrixWorld();
    const height = 4.5;
    const width = 2.35;
    const radius = height / 2;
    const skeletonExtremes = getSkeletonExtremes(objects2["Robot"]);
    skeletonExtremes.max.y - skeletonExtremes.min.y;
    new Box3().setFromObject(objects2["Robot"]);
    skeletonExtremes.min.lerp(skeletonExtremes.max, 0.5);
    const segment = new Line3(new Vector3(0, 0, 0), new Vector3(0, 0, 0));
    tempBox.makeEmpty();
    tempMatrix.copy(collider.matrixWorld).invert();
    tempSegment.copy(segment);
    tempSegment.start.applyMatrix4(player.matrixWorld).applyMatrix4(tempMatrix);
    tempSegment.end.applyMatrix4(player.matrixWorld).applyMatrix4(tempMatrix);
    tempBox.expandByPoint(tempSegment.start);
    tempBox.expandByPoint(tempSegment.end);
    tempBox.min.sub(new Vector3(width / 2, height / 2, width / 2));
    tempBox.max.sub(new Vector3(-width / 2, -height / 2, -width / 2));
    collider.geometry.boundsTree.shapecast(collider, {
      intersectsBounds: (box) => box.intersectsBox(tempBox),
      intersectsTriangle: (tri) => {
        const distance = tri.closestPointToSegment(tempSegment, tempVector, tempVector2);
        if (distance < radius) {
          const depth = radius - distance;
          const direction = tempVector2.sub(tempVector).normalize();
          tempSegment.start.addScaledVector(direction, depth);
          tempSegment.end.addScaledVector(direction, depth);
        }
      }
    });
    const newPosition = tempVector;
    newPosition.copy(tempSegment.start).applyMatrix4(collider.matrixWorld);
    const deltaVector = tempVector2;
    deltaVector.subVectors(newPosition, player.position);
    player.position.copy(newPosition);
    player.userData.isOnGround = deltaVector.y > Math.abs(delta * player.userData.velocity.y * 0.25);
    if (!player.userData.isOnGround) {
      deltaVector.normalize();
      player.userData.velocity.addScaledVector(deltaVector, -deltaVector.dot(player.userData.velocity));
    } else {
      player.userData.velocity.set(0, 0, 0);
    }
    if (player.position.y < -40) {
      player.userData.velocity.set(0, 0, 0);
      player.position.set(lastSavePosition.x, lastSavePosition.y, lastSavePosition.z);
      lifes2--;
    }
    updateCameraPosition();
  };
  const robotRunning2 = () => {
    if (mixers2["Robot"]) {
      if (testAnyKeys2(["KeyW", "KeyA", "KeyS", "KeyD"]) || testAnyButton2([12, 13, 14, 15]) || testAxis2()) {
        let acceleration = 1;
        if (testAllKeys2(["ShiftLeft"]) || testAllButtons2([7])) {
          acceleration = 2;
        }
        playAnimation(mixers2["Robot"], animations2["Robot"], "Robot_Running", acceleration);
      } else {
        stopAnimation(mixers2["Robot"], animations2["Robot"], "Robot_Running");
      }
      if (testAnyKeys2(["Space"]) || testAllButtons2([0])) {
        if (!pauseOthersAnimations) {
          if (objects2["Robot"].userData.velocity.y == 0)
            objects2["Robot"].userData.velocity.y = 5;
        }
      }
    }
  };
  const toAnimate2 = () => {
    for (const model in mixers2) {
      mixers2[model].update(clock2.getDelta());
    }
    if (objects2["Robot"] && objects2["collider"])
      checkKeysState();
    if (Object.values(pressedKeys2).includes(true) || pauseOthersAnimations || gamepads2[0]) {
      checkKeysState();
    }
  };
  const getSkeletonExtremes = (object) => {
    const skeleton = new SkeletonHelper(object);
    const bone_min = new Vector3(Infinity, Infinity, Infinity);
    const bone_max = new Vector3(-Infinity, -Infinity, -Infinity);
    for (let b = 0; b < skeleton.bones.length; b++) {
      const child = skeleton.bones[b];
      const position2 = new Vector3();
      child.getWorldPosition(position2);
      if (position2.x < bone_min.x)
        bone_min.x = position2.x;
      if (position2.y < bone_min.y)
        bone_min.y = position2.y;
      if (position2.z < bone_min.z)
        bone_min.z = position2.z;
      if (position2.x > bone_max.x)
        bone_max.x = position2.x;
      if (position2.y > bone_max.y)
        bone_max.y = position2.y;
      if (position2.z > bone_max.z)
        bone_max.z = position2.z;
    }
    return { min: bone_min, max: bone_max };
  };
  loader2.load(characterPath, (gltf) => {
    const model = gltf.scene;
    model.traverse((child) => {
      if (child instanceof Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material.shadowSide = 2;
      }
    });
    model.userData.name = "Robot";
    model.userData.isOnGround = false;
    model.userData.velocity = new Vector3(0, 0, 0);
    model.userData.speed = 1.5, model.position.set(position.x, position.y, position.z);
    scene2.add(model);
    objects2[model.userData.name] = model;
    animations2[model.userData.name] = gltf.animations;
    mixers2[model.userData.name] = new AnimationMixer(model);
    mixers2[model.userData.name].addEventListener("finished", function(e) {
      pauseOthersAnimations = false;
      robotRunning2();
    });
    animations2[model.userData.name].forEach((animation2) => {
      mixers2[model.userData.name].clipAction(animation2).setEffectiveWeight(0).play();
    });
  }, void 0, function(error) {
    console.error(error);
  });
  return {
    robotRunning: robotRunning2,
    toAnimate: toAnimate2,
    lifes: lifes2,
    resetGame: resetGame2
  };
}
const gui = new GUI$1();
const scene = new Scene();
const renderer = new WebGLRenderer({ antialias: true });
const camera = new PerspectiveCamera();
const animateFunctions = [];
const controls = new OrbitControls(camera, renderer.domElement);
const variables = {
  scaleFactor: 1,
  popup: false
};
let clientWidth = window.innerWidth;
let clientHeight = window.innerHeight;
const maxClientWidth = 1920;
const maxClientHeight = 1080;
const clock = new Clock();
const optFPS = 1 / 45;
const deoptFPS = 1 / 57;
let optLevel = 0;
const characterPosition = new Vector3(0, 0, 0);
const cameraOffset = new Vector3(2.5, 15, 25);
const onWindowResize = () => {
  clientWidth = window.innerWidth;
  clientHeight = window.innerHeight;
  calculateScaleFactor();
  camera.aspect = clientWidth / clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(clientWidth, clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2) * variables.scaleFactor);
};
const calculateScaleFactor = () => {
  if (clientWidth > maxClientWidth || clientHeight > maxClientHeight) {
    variables.scaleFactor = Math.min(maxClientWidth / clientWidth, maxClientHeight / clientHeight);
  }
};
calculateScaleFactor();
camera.fov = 60;
camera.aspect = clientWidth / clientHeight;
camera.near = 1;
camera.far = 300;
camera.position.set(characterPosition.x + cameraOffset.x, characterPosition.y + cameraOffset.y, characterPosition.z + cameraOffset.z);
camera.updateProjectionMatrix();
renderer.setSize(clientWidth, clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2) * variables.scaleFactor);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);
scene.background = new Color(4502015);
scene.fog = new Fog(4502015, 60, 300);
window.addEventListener("resize", onWindowResize);
const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 30;
controls.maxDistance = 30;
controls.maxPolarAngle = 75 * Math.PI / 180;
controls.enablePan = false;
controls.enableZoom = false;
controls.target = characterPosition;
const manager = new LoadingManager();
addLights(scene);
postProduction(scene, camera, renderer);
const loader = new GLTFLoader(manager);
const objects = {};
addMap(loader, scene, objects, `islands/islands.gltf`, `islands/islands_physics.gltf`);
const pressedKeys = {};
const { testAllKeys, testAnyKeys, keysFunctions, checkPressedKeys, testAllButtons, testAnyButton, testAxis, checkPads, gamepads } = keysControls(pressedKeys);
animateFunctions.push(checkPressedKeys, checkPads);
const animations = {};
const mixers = {};
const { robotRunning, toAnimate, lifes, resetGame } = addCharacter(loader, scene, objects, animations, mixers, pressedKeys, testAllKeys, testAnyKeys, gamepads, testAllButtons, testAnyButton, testAxis, `Robot_edited_centered.glb`, controls, camera, characterPosition);
animateFunctions.push(toAnimate);
keysFunctions.push(robotRunning);
const render = () => {
  renderer.render(scene, camera);
};
const guiTemp = {
  reset: () => {
    resetGame();
  }
};
const optimization = gui.addFolder("Optymalizacja");
optimization.open();
optimization.add(variables, "scaleFactor", 0.05, 1, 0.05).name("Scale\xA0Factor").onChange(onWindowResize);
optimization.add(renderer.shadowMap, "autoUpdate").name("Update\xA0shadows");
optimization.add(camera, "far", 60, 500, 10).name("Draw\xA0distance").setValue(300).onChange(() => {
  scene.fog.far = camera.far;
  scene.fog.near = camera.far / 3;
  camera.updateProjectionMatrix();
});
gui.add(variables, "popup").name("Poka\u017C sterowanie");
gui.add(guiTemp, "reset").name("Reset\xA0position");
const optymize = () => {
  switch (optLevel) {
    case 0:
      variables.scaleFactor = 0.75;
      onWindowResize();
      gui.updateDisplay();
      optLevel = 1;
      break;
    case 1:
      variables.scaleFactor = 0.5;
      onWindowResize();
      gui.updateDisplay();
      optLevel = 2;
      break;
  }
};
const deOptymize = () => {
  switch (optLevel) {
    case 1:
      variables.scaleFactor = 1;
      onWindowResize();
      gui.updateDisplay();
      optLevel = 0;
      break;
    case 2:
      variables.scaleFactor = 0.75;
      onWindowResize();
      gui.updateDisplay();
      optLevel = 1;
      break;
  }
};
const animate = () => {
  stats.begin();
  const delta = clock.getDelta();
  requestAnimationFrame(animate);
  if (delta > optFPS) {
    optymize();
  } else if (delta < deoptFPS) {
    deOptymize();
  }
  const ticks = Math.round(delta / (1 / 60));
  for (let i = 0; i < ticks; i++) {
    animateFunctions.forEach((func) => {
      func();
    });
    controls.update();
  }
  render();
  stats.end();
};
animate();
