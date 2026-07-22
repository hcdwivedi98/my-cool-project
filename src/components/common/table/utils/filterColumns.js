export default function filterColumns(
    columns = [],
    selectedKeys = []
) {
    if (!selectedKeys.length) return columns;

    return columns.filter((column) => {

        if (column.fixed) return true;

        const key =
            column.key ||
            column.dataIndex;

        return selectedKeys.includes(key);

    });
}