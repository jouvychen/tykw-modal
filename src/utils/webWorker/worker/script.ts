/*
 * @Author: hongbin
 * @Date: 2022-09-04 11:46:18
 * @LastEditors: hongbin
 * @LastEditTime: 2022-09-15 18:32:36
 * @Description:web worker 中做的工作
 */
import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { manager } from "./helper/manager";
import { genAnimations, genGroupStruct } from "./helper/parseModel";
const dracoLoader = new DRACOLoader(manager);
dracoLoader.setDecoderConfig({ type: "js" });
dracoLoader.setDecoderPath("/draco/");
const gltfLoader = new GLTFLoader(manager);
gltfLoader.setDRACOLoader(dracoLoader);


function modelLoad(modelName: string) {
    gltfLoader.load(
        `/models/${modelName}`,
        (gltf) => {
            return postMessage({
                modelName,
                work_type: "parseModel",
                ...genGroupStruct(gltf.scene),
                sceneAnimations: genAnimations(gltf.animations),
            });
        },
        undefined,
        () => {
            postMessage({ msg: "Worker 模型加载错误！" + modelName });
        }
    );
}

/**
 * 监听主线程发来的数信息
 */
onmessage = function (e) {
    switch (e.data.work_type) {
        case "test_connect":
            postMessage({
                msg: "连接成功",
                THREE: new THREE.Vector3(),
            });
            break;
        case "start":
            postMessage({
                msg: "初始化",
                work_type: "log",
                undergroundParams: e.data.undergroundParams,
            });
            break;
        case "modelParse":
            modelLoad(e.data.name);
            break;
    }
};

export { };
