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

// Format angka ke Rupiah
export function formatToRupiah(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value);
}

// Kapitalisasi huruf pertama
export function capitalizeFirstLetter(text: string): string {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

