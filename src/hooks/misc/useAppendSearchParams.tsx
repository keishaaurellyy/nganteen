import { useCallback } from "react";
import { useRouter } from "next/router";
import { createUrlWithQueryParams } from "@/utils/formatter.utils";

export default function useAppendSearchParams() {
  const router = useRouter();

  const appendSearchParams = useCallback(
    (key: Record<string, string | number | undefined | null | string[]>) => {
      router.replace(
        createUrlWithQueryParams(router.pathname, {
          ...router.query,
          ...key,
        }),
        undefined,
        {
          shallow: true,
        }
      );
    },
    [router]
  );

  return {
    router,
    appendSearchParams,
  };
}
