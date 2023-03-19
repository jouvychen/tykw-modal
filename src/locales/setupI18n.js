import { createI18n } from 'vue-i18n';
import { setHtmlPageLang, setLoadLocalePool } from './helper';
import { localeSetting } from '@/setting/localeSetting';
import { useStoreApp } from '@/store';

const { fallback, availableLocales } = localeSetting;

// i18n实例，导出后外部调用
export let i18n = null;

// 创建i18基础配置
async function createI18nOptions() {
  const storeApp = useStoreApp();
  const locale = storeApp?.localInfo?.locale;
  const defaultLocal = await import(`./lang/${locale}.ts`);
  const message = defaultLocal.default?.message ?? {};

  setHtmlPageLang(locale);
  setLoadLocalePool(loadLocalePool => {
    loadLocalePool.push(locale);
  });

  return {
    legacy: false,
    locale,
    fallbackLocale: fallback,
    messages: {
      [locale]: message,
    },
    availableLocales: availableLocales,
    sync: true, // If you don’t want to inherit locale from global scope, you need to set sync of i18n component option to false.
    silentTranslationWarn: true, // true - warning off
    missingWarn: false,
    silentFallbackWarn: true,
  };
}

// vue注册i18
export async function setupI18n(app) {
  const options = await createI18nOptions();
  i18n = createI18n(options);
  app.use(i18n);
}
