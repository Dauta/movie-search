const isNonEmptyArray = (query: unknown): query is string[] => {
  return Array.isArray(query) && query.length > 0;
};

export const normalizeString = (input: string | string[] | undefined): string => {
  if (isNonEmptyArray(input)) {
    return input[0];
  }

  return input ?? "";
};