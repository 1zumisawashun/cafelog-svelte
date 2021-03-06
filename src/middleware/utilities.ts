import type { firebasePath } from '../@types/firebase';

export const scrollTop = (): number => {
  let scrollingElementTop: number = 0;

  if (document.scrollingElement) {
    scrollingElementTop = document.scrollingElement.scrollTop;
  }

  return Math.max(
    window.scrollY,
    window.pageYOffset,
    document.body.scrollTop,
    document.documentElement.scrollTop,
    scrollingElementTop,
  );
};

export const delay = (t: number) => new Promise((r) => setTimeout(r, t));

export const convertedPath = (path: string): firebasePath => {
  const result = path.split('/');
  return {
    collection: result[1] ?? '',
    document: result[2] ?? '',
    subCollection: result[3] ?? '',
    subDocument: result[4] ?? '',
  };
};

// NOTE:お店が投稿されてから5日経っているか判定する
export const checkNewShop = (date: Date): boolean => {
  if (!date) {
    return false;
  }
  const postDate = date.getTime();
  const today = new Date();
  const fiveDaysBefore = today.setDate(today.getDate() - 5);
  if (postDate > fiveDaysBefore) {
    return true;
  }
  return false;
};
