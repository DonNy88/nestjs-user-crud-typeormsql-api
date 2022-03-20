export type SortDirectionType = 'ASC' | 'DESC' | 'asc' | 'desc'

export interface SortQuery<SortFieldType> {
	sortField: SortFieldType
	sortDirection: SortDirectionType
}
