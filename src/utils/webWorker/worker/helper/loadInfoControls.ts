/*
 * @Author: hongbin
 * @Date: 2022-09-02 10:36:35
 * @LastEditors: hongbin
 * @LastEditTime: 2022-09-16 18:49:33
 * @Description: 加载进度控制器
 */

export interface ILoadInfoControls {
    info: Record<string, number | string>;
    complete: boolean;
    callback: (msg: string, progress: number | string) => void;
    onChange: (callback: ILoadInfoControls["callback"]) => void;
    addInfo: ILoadInfoControls["callback"];
}

/**
 * 加载调度器
 */
export const loadInfoControls: ILoadInfoControls = {
    info: {},
    complete: false,
    callback: function () {
        console.warn("未捕获的函数调用 ");
    },
    onChange: function (callback) {
        this.callback = callback;
        // window.render && window.render();
    },
    addInfo: function (msg, progress) {
        this.info[msg] = progress;
        const progressItems = Object.values(this.info).filter((val) => typeof val === "number");
        const complete = progressItems.length && progressItems.every((val) => val === 100);
        this.complete = !!complete;
        this.callback(msg, progress);
    },
};
