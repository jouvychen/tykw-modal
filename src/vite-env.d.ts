/// <reference types="vite/client" />
declare module '*.vue' {
    import { ComponentOptions } from 'vue'
    const componentOptions: ComponentOptions
    export default componentOptions
}
// declare module 'xxx'路径或者模块名, 解决引入js模块识别不到报红问题
declare module '@/locales/setupI18n'

declare module 'three/examples/jsm/libs/tween.module.min'
declare module 'three/examples/jsm/libs/lil-gui.module.min'

