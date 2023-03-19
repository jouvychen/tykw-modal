/*
 * @Author: hongbin
 * @Date: 2022-09-04 19:39:45
 * @LastEditors: hongbin
 * @LastEditTime: 2022-09-14 08:47:22
 * @Description:宇宙中固定的对象
 */
import { acterScaleMultiple } from "../constants";
import THREE from ".";
import starrySkyPng from "../assets/img/星空.png";
import { textureLoader } from "./helper/loaderHelper";
import { initGUI } from "./utils/gui";

export const acterWrap = new THREE.Group();
export const cameraWrap = new THREE.Group();
acterWrap.scale.set(acterScaleMultiple, acterScaleMultiple, acterScaleMultiple);
acterWrap.position.y += 10;

export const setActerPosition = (v: THREE.Vector3) => {
    acterWrap.position.copy(v);
    cameraWrap.position.copy(v);
};
export const setActerRotate = (angle: THREE.Vector3) => {
    acterWrap.rotation.setFromVector3(angle);
    cameraWrap.rotation.setFromVector3(angle);
};

export const initWebGLRenderer = (parameters?: THREE.WebGLRendererParameters) => {
    const renderer = new THREE.WebGLRenderer(parameters);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.outputEncoding = THREE.sRGBEncoding;
    window.renderer = renderer;
};

const initCamera = () => {
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);
    camera.name = "camera";
    camera.position.set(0, 10 * acterScaleMultiple, 40 * acterScaleMultiple);
    cameraWrap.add(camera);
    cameraWrap.position.set(0, 10, 0);
    return camera;
};

export const hemisphereLight = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
const initLights = () => {
    hemisphereLight.position.set(0.5, 1, 0.75);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    return [hemisphereLight, directionalLight];
};

/**
 * 出了星球外更大的Starry sky
 */
function sideStarrySky() {
    const geometry = new THREE.SphereGeometry(1500, 32, 32);
    const material = new THREE.MeshBasicMaterial({
        map: textureLoader.load(
            // starrySkyPng.blurDataURL,
            starrySkyPng.src
        ),
        side: THREE.DoubleSide,
    });
    const sphere = new THREE.Mesh(geometry, material);
    return sphere;
}

export const scene = new THREE.Scene();

export const intGlobalVariable = () => {
    window._vector3 = new THREE.Vector3();
    initGUI();
    window.acterWrap = acterWrap;
};

export const initScene = () => {
    const camera = initCamera();
    const lights = initLights();
    const starrySky = sideStarrySky();

    scene.add(...lights, cameraWrap, acterWrap, starrySky);

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        window.renderer.setSize(window.innerWidth, window.innerHeight);
        render();
    }

    window.addEventListener("resize", onWindowResize);

    function render(e?: number) {
        e && console.log(e);
        window.renderer?.render(scene, camera);
    }

    window.render = render;
};
