export default function exportCSV(
    fileName,
    columns,
    data
) {

    const headers = columns.map(c => c.title);

    const keys = columns.map(
        c => c.dataIndex
    );

    const rows = data.map(row =>
        keys.map(k => row[k])
    );

    const csv = [
        headers.join(","),
        ...rows.map(r => r.join(","))
    ].join("\n");

    const blob = new Blob(
        [csv],
        {
            type: "text/csv;charset=utf-8;"
        }
    );

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;

    link.download =
        `${fileName}.csv`;

    link.click();

    URL.revokeObjectURL(url);
}