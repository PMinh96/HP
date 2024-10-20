export class PaginationHelper {
    static async paginate<T extends Record<string, boolean>>(options: {
        page: number,
        itemsPerPage: number,
        keyword: string,
        prismaService: any,
        model: string,
        searchableFields: string[],
        fieldsToSelect: Record<string, boolean>
    }): Promise<any> {
        const { page, itemsPerPage, keyword, prismaService, model, searchableFields, fieldsToSelect } = options;
        const skip = (page - 1) * itemsPerPage;
        const searchConditions = searchableFields.map(field => ({
            [field]: {
                contains: keyword,
            },
        }));

        const where = {
            OR: searchConditions,
        };
        const totalCount = await prismaService[model].count();
        const data = await prismaService[model].findMany({
            select: fieldsToSelect,
            where,
            take: itemsPerPage,
            skip: skip,
            orderBy: {
                createdAt: 'desc',
            },
        });
        const lastPage = Math.ceil(totalCount / itemsPerPage);
        const nextPage = page + 1 > lastPage ? null : page + 1;
        const prevPage = page - 1 < 1 ? null : page - 1;
        return {
            data: data,
            totalCount,
            currentPage: page,
            nextPage,
            prevPage,
            lastPage
        };
    } 
}
