import { PRODUCT_PAGE_SIZE } from '@/constants';
import { fetchProducts, PRODUCT_KEY } from '@/lib/product';
import { useFilterStore } from '@/store/filter/useFilterStore';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useFetchProducts = ({ pageSize = PRODUCT_PAGE_SIZE }) => {
  const { minPrice, maxPrice, title, categoryId } = useFilterStore();
  const filter = { minPrice, maxPrice, title, categoryId };

  const queryKey = [PRODUCT_KEY, filter];

  return useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam = 1 }) => {
      try {
        return await fetchProducts(filter, pageSize, pageParam);
      } catch (error) {
        throw error;
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};
