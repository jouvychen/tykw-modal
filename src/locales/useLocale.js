/**
 * Multi-language related operations
 */
import { i18n } from './setupI18n';
import { unref, computed } from 'vue';
import { loadLocalePool, setHtmlPageLang } from './helper';
import { useStoreApp } from '@/store';

// 设置当前语言
function setI18nLanguage(locale) {
  const storeApp = useStoreApp();

  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale;
  } else {
    i18n.global.locale.value = locale;
  }
  storeApp.changeLocalInfo({ locale });
  setHtmlPageLang(locale);
}

export function useLocale() {
  const storeApp = useStoreApp();
  const getLocale = computed(() => storeApp.localInfo.locale);

  const getAntdLocale = computed(() => {
    return i18n.global.getLocaleMessage(unref(getLocale))?.antdLocale ?? {};
  });

  // 切换语言将更改useI18n的区域设置
  // 并提交配置修改
  async function changeLocale(locale) {
    const globalI18n = i18n.global;
    const currentLocale = unref(globalI18n.locale);
    if (currentLocale === locale) {
      return locale;
    }
    // 判断该语言映射对象是否加载过，已加载直接切换
    if (loadLocalePool.includes(locale)) {
      setI18nLanguage(locale);
      return locale;
    }
    // 如果没有加载，加载语言映射对象文件
    const langModule = await import(`./lang/${locale}.ts`);
    if (!langModule?.default) {
      return;
    }

    const { message } = langModule.default;

    globalI18n.setLocaleMessage(locale, message);
    loadLocalePool.push(locale);

    setI18nLanguage(locale);
    return locale;
  }

  return {
    getLocale,
    changeLocale,
    getAntdLocale,
  };
}
