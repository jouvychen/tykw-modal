/*
 * @Author: hongbin
 * @Date: 2022-08-29 15:28:17
 * @LastEditors: hongbin
 * @LastEditTime: 2022-09-15 10:24:46
 * @Description: 陷落检测
 */

import { Sphere, Vector3, Box3, BoxGeometry, Mesh, MeshBasicMaterial } from "three";
import { collideParams } from "../..";

/**
 * 地下物体 -- 人物万一掉帧到地下获知状态 将人物升起
 */
const homeUnderground = {
    name: "home",
    mesh: new Sphere(new Vector3(0, collideParams.homeFloorY + collideParams.homeFloorHeight, 0), 460 * 4),
    update: () => {},
    adaptation: new Box3(),
    _vector3: new Vector3(),
    check: function ({ min, max }: THREE.Box3) {
        this.adaptation.min = min;
        this.adaptation.max = max;
        return this.mesh.intersectsBox(this.adaptation);
    },
    checkByPoint: function ({ x, y, z }: THREE.Vector3) {
        this._vector3.set(x, y, z);
        return this.mesh.containsPoint(this._vector3);
    },
};

export const _undergroundMesh = new Mesh(
    new BoxGeometry(500, 600, 10),
    new MeshBasicMaterial({ color: 0x5511ff, side: 2 })
);
_undergroundMesh.rotateX(Math.PI / 2);
_undergroundMesh.position.x = -53;
_undergroundMesh.position.y = 1;

const forestUnderground = {
    name: "forest",
    _vector3: new Vector3(),
    mesh: new Box3().setFromObject(_undergroundMesh),
    update: function ({ position: { x, y, z } }: { position: Vector3 }) {
        _undergroundMesh.position.set(x, y, z);
        this.mesh.setFromObject(_undergroundMesh);
        postMessage({
            work_type: "log",
            p: _undergroundMesh.getWorldPosition(new Vector3()),
        });
    },
    check: function (box: THREE.Box3) {
        return this.mesh.intersectsBox(box);
    },
    checkByPoint: function ({ x, y, z }: THREE.Vector3) {
        this._vector3.set(x, y, z);
        return this.mesh.containsPoint(this._vector3);
    },
};

type TUndergrounds = Record<string, Omit<typeof forestUnderground, "mesh"> & { mesh: THREE.Box3 | THREE.Sphere }>;

const undergrounds: TUndergrounds = {
    home: homeUnderground,
    forest: forestUnderground,
};

// const check = (name: keyof typeof undergrounds, box: THREE.Box3) => {
//     const isFallIntoFloor = undergrounds[name].mesh.intersectsBox(box);
//     return isFallIntoFloor;
// };
/**
 * 陷入检测
 */
// export const undergroundsCheck = (name: keyof typeof undergrounds, box: THREE.Box3) => {
//     const isFallIntoFloor = undergrounds[name].check(box);
//     return isFallIntoFloor;
// };
export const undergroundsCheck = (name: keyof typeof undergrounds, point: THREE.Vector3) => {
    const isFallIntoFloor = undergrounds[name].checkByPoint(point);
    return isFallIntoFloor;
};

/**
 * Sphere 需要 新建box3对象 sphere内部会调用box3的intersectsSphere方法 只是主线程传过来的对象没有这一系列方法 需要生成一个box3对象用来检测
 * forest 需要 设置检测物体的位置 sphere在世界中样所以不需要设置位置 但是box3生成盒子时需要被生成物体的位置 来确定盒子的位置 否则一物体在世界中心来计算
 */
undergroundsCheck.update = (params: { [key: keyof typeof undergrounds]: { position: Vector3 } }) => {
    Object.values(undergrounds).forEach((u) => {
        u.update && u.update(params[u.name]);
    });
};
