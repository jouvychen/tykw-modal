// 防抖函数
export const debounce = (fn:any, delay:number) => {
  let timer:any = null;
  return function () {
    if (timer) { clearTimeout(timer); }
    timer = setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line prefer-rest-params
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  };
};

// 节流函数
export const throttle = (fn:any, delay:number) => {
  let timer:any = null;
  let status = false;
  return function () {
    if (timer) { return; }
    if (!status) {
      status = true;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line prefer-rest-params
      fn.apply(this, arguments);
    }
    timer = setTimeout(() => {
      if (status) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line prefer-rest-params
        fn.apply(this, arguments);
        timer = null;
      }
    }, delay);
  };
};

export const getImageUrl = (name:string)=>{
  return new URL(`../../assets/images/home/${name}`, import.meta.url).href;
};

export const uuid = () => {
  const tempUrl = URL.createObjectURL(new Blob());
  const uuid = tempUrl.toString();
  URL.revokeObjectURL(tempUrl); // 释放这个url
  return uuid.substring(uuid.lastIndexOf('/') + 1);
};
