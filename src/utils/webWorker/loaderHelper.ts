/*
 * @Author: hongbin
 * @Date: 2022-09-04 22:01:04
 * @LastEditors: hongbin
 * @LastEditTime: 2022-09-07 19:38:06
 * @Description:加载器
 */
import THREE from "../";
import { TextGeometry, TextGeometryParameters } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import fontJSON from "../../assets/xsFont.json";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { loadInfoControls } from "./loadInfoControls";

export const manager = new THREE.LoadingManager();
export const dracoLoader = new DRACOLoader(manager);
dracoLoader.setDecoderConfig({ type: "js" });
// dracoLoader.setDecoderPath("https://api.hongbin.xyz:3002/kmyc/");
// const dracoLoader = new DRACOLoader(manager);
// dracoLoader.setDecoderPath("gltf/");
dracoLoader.setDecoderPath("api/draco/");

const gltfLoader = new GLTFLoader(manager);
gltfLoader.setDRACOLoader(dracoLoader);

const fontLoad = new FontLoader(manager);
const font = fontLoad.parse(fontJSON);

const defaultForward = 0xa030ff;
const defaultSide = 0x5511ff;

const defaultMaterials = [
    new THREE.MeshPhongMaterial({ color: defaultForward, flatShading: true }), // front
    new THREE.MeshPhongMaterial({ color: defaultSide, flatShading: true }), // side
];

/**
 * 创建一个像素风3D文本元素
 * @param {string} text 创建的文字
 * @param {TextGeometryParameters} parameters 字体的参数
 * @param {} materialsColor 字体的颜色 - 材料
 */
export function createText(
    text: string,
    /**
     * 字体的参数
     */
    parameters?: Omit<TextGeometryParameters, "font">,
    /**
     * 字体的颜色 - 材料
     */
    materialsColor?: {
        /**
         * 字体面向前面的颜色
         */
        forward?: number | string;
        /**
         * 字体侧面的颜色
         */
        side?: number | string;
    }
) {
    const textGeo = new TextGeometry(text, {
        size: 15,
        height: 4,
        curveSegments: 0.5,
        bevelThickness: 0.5,
        bevelSize: 0.5,
        bevelEnabled: true,
        ...parameters,
        font,
    });

    // let materials;
    let materials = defaultMaterials;

    if (materialsColor?.side || materialsColor?.forward) {
        materials = defaultMaterials.map((m) => m.clone());
        materials[0].color = new THREE.Color(materialsColor.forward || defaultForward);
        materials[1].color = new THREE.Color(materialsColor.side || defaultSide);
        // materials = [
        //     new MeshPhongMaterial({ color: materialsColor.forward, flatShading: true }),
        //     new MeshPhongMaterial({ color: materialsColor.side, flatShading: true }),
        // ];
    }
    // else materials = defaultMaterials;

    // materials.forEach((m) => {
    //     m.transparent = true;
    //     m.opacity = 0.3;
    // });
    const textMesh = new THREE.Mesh(textGeo, materials as THREE.Material[] | THREE.Material);
    return textMesh;
}

export const loadGltf = (url: string): Promise<GLTF> => {
    return new Promise((res, rej) => {
        gltfLoader.load(
            url,
            (gltf: GLTF) => {
                // console.log("gltf", gltf);
                res(gltf);
            },
            () => {},
            (err) => {
                // console.log("err", err);
                rej(err);
            }
        );
    });
};

manager.onStart = function (url, itemsLoaded, itemsTotal) {
    // console.log("开始加载文件: " + url + ".\nLoaded " + itemsLoaded + " of " + itemsTotal + " files.");
    loadInfoControls.addInfo("加载器初始化", "完成");
};

manager.onLoad = function () {
    console.log("加载完成!");
    // loadInfoControls.addInfo("主线程加载完成", 100);
    // window.loadFinish();
    window.render();
};

manager.onProgress = function (url, itemsLoaded, itemsTotal) {
    window.render();
    // console.log("load：", url);

    loadInfoControls.addInfo("主线程模型加载", Math.floor((itemsLoaded / itemsTotal) * 100));
    // console.log("加载中文件: " + url + ".\nLoaded " + itemsLoaded + " of " + itemsTotal + " files.");
    // window.updateProgress(Math.floor((itemsLoaded / itemsTotal) * 100));
};

manager.onError = function (url) {
    console.log("加载出错：" + url);
    loadInfoControls.addInfo("主线程加载出错", 0);
};

export const textureLoader = new THREE.TextureLoader(manager);
// export const cubeTextureLoader = new THREE.CubeTextureLoader(manager);
