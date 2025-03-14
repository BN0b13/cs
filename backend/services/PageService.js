import { sequelize } from "../db.js";

export default class PageService {

    // Read

    searchPages = async ({ search = '', page, size, sortKey, sortDirection }) => {
        try {
            const getCount = await sequelize.query(`
            select *
            from  ${process.env.PG_SCHEMA_NAME}."Pages" as "Page"
            where ("Page"."type" ilike '%${search}%' or "Page"."url" ilike '%${search}%' or "Page"."title" ilike '%${search}%')
            `);

            const currentPage = page * size;
            const res = await sequelize.query(`
            SELECT *
            FROM  ${process.env.PG_SCHEMA_NAME}."Pages" AS "Page"
            WHERE ("Page"."type" ilike '%${search}%' OR "Page"."url" ilike '%${search}%' or "Page"."title" ilike '%${search}%')
            ORDER BY "Page"."${sortKey}" ${sortDirection}
            LIMIT ${size}
            OFFSET ${currentPage}
            `);

            return {
                count: getCount[1].rowCount,
                rows: res[0]
            };
        } catch (err) {
            console.log('Search Pages Error: ', err);
            throw Error('There was an error searching Pages');
        }
    }
}