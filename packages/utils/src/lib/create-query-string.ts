type QueryParams = Record<string, unknown>;

interface QueryOptions {
  arrayFormat?: 'json' | 'comma' | 'repeat';
  numberFormat?: 'string' | 'number';
  emptyValues?: boolean;
}

export function createQueryString(
  params: QueryParams,
  options: QueryOptions = {}
): URLSearchParams {
  const {
    arrayFormat = 'json',
    numberFormat = 'number',
    emptyValues = false,
  } = options;

  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      if (emptyValues) {
        queryParams.append(key, '');
      }
      return;
    }

    if (Array.isArray(value)) {
      if (value.length > 0) {
        if (arrayFormat === 'json') {
          queryParams.append(key, JSON.stringify(value));
        } else if (arrayFormat === 'comma') {
          queryParams.append(key, value.join(','));
        } else if (arrayFormat === 'repeat') {
          value.forEach((v) => queryParams.append(key, v.toString()));
        }
      }
    } else if (typeof value === 'number') {
      queryParams.append(
        key,
        numberFormat === 'string' ? value.toString() : value.toString()
      );
    } else {
      queryParams.append(key, value.toString());
    }
  });

  return queryParams;
}
