export function paginationPageList(
  totalPages: number,
  currentPage: number,
  max: number = 5
) {
  const pages: number[] = [];
  const total = totalPages;
  const current = currentPage;

  let start = Math.max(1, current - Math.floor(max / 2));
  const end = Math.min(total, start + max - 1);

  if (end - start + 1 < max) {
    start = Math.max(1, end - max + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
}
