import { handleParseGrove } from "./Forest";
import { parseModel } from "./worker";
import { loadInfoControls } from "./worker/helper/loadInfoControls";

let myWorker: Worker;

export const initWebWorker = () => {
    myWorker = new Worker(new URL("./worker/script.ts", import.meta.url), { type: "module" } as any);
    myWorker.onmessage = function (e) {
        const { work_type } = e.data;
        switch (work_type) {
            case "parseModel":
                // console.log("接收到解析的模型结构:", e.data);
                const object = parseModel(e.data);
                debugger
                switch (e.data.modelName) {
                    case "车展台压缩.glb":
                        handleParseGrove(object);
                        break;
                    case "兰博基尼碳纤维大牛压缩.glb":
                        handleParseGrove(object);
                        break;
                    default:
                        throw new Error("未设置的接收程序的模型");
                }
                break;
            case "model_load_start":
                loadInfoControls.addInfo("Web Worker 初始化", "完成");
                break;
            case "model_load":
                loadInfoControls.addInfo("Web Worker 模型加载", e.data.progress);
                break;
            case "model_load_complete":
                loadInfoControls.addInfo("Web Worker 加载", "完成");
                break;
        }
    };
    myWorker.onerror = (err) => {
        console.error("work出错：", err, err.message);
    };

    myWorker.postMessage({ work_type: "test_connect" });
    myWorker.postMessage({ work_type: "modelParse", name: "车展台压缩.glb" });
    myWorker.postMessage({ work_type: "modelParse", name: "兰博基尼碳纤维大牛压缩.glb" });
};

