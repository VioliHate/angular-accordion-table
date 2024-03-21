export enum SortDirection {
  ASCENDING = 'asc',
  DESCENDING = 'desc',
  NONE = ''
}

export interface SortEvent {
  sortColumn: any;
  sortDirection: 'asc' | 'desc' | '';
}
