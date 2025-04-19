export function createUrlWithQueryParams(
    path: string,
    queryParams: Record<
      string,
      string | string[] | number | null | undefined | boolean
    >,
  ): string {
    const urlParams = new URLSearchParams();
  
    Object.entries(queryParams).forEach(([k, v]) => {
      if (Array.isArray(v)) {
        v.forEach((val) => {
          urlParams.append(k, val.toString());
        });
      } else if (v !== null && v !== undefined) {
        urlParams.append(k, v.toString());
      }
    });
  
    const queryString = urlParams.toString();
  
    return queryString ? `${path}?${queryString}` : path;
  }