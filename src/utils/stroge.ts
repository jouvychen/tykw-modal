import storage from 'store';
export const setStore = (name: string, content: any) => {
  storage.set(name, content);
};

export const getStore = (name: string) => {
  return storage.get(name);
};

export const removeStore = (name: string) => {
  return storage.remove(name);
};
