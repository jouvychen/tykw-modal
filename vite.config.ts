import { UserConfigExport, ConfigEnv, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue'
import path from 'path'
// 自动引入插件
import AutoImport from 'unplugin-auto-import/vite'

// 自动导入组件
import Components from 'unplugin-vue-components/vite';
// ant按需加载
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

const CWD = process.cwd();
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  return {
    css: {
      // css预处理器
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          charset: false,
          additionalData: '@import "./src/assets/style/variables.less";',
          modifyVars: {
            'text-color': '#0B0F26', // 文字颜色
            'primary-color': '#0049B0', // 主题颜色
            'link-color': '#1DA57A', // 链接色
            'border-radius-base': '0px', // 圆角
            'border-color-base': '#D9D9D9', // 线框(按钮)颜色
            'heading-color': '0B0F26', // 标题色
          },
        },
      },
    },
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue'],
        dts: 'src/auto-import.d.ts'
      }),
      Components({
        dirs: ['src/components'], // 配置需要默认导入的自定义组件文件夹，该文件夹下的所有组件都会自动 import
        resolvers: [AntDesignVueResolver({ importStyle: 'less', resolveIcons: true })]
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      extensions: ['.vue', '.js', '.jsx', '.ts', '.tsx'],
    },
  }
};
