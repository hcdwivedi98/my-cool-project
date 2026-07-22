import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function exportPDF(
    fileName,
    columns,
    data
) {

    const pdf = new jsPDF();

    autoTable(pdf, {

        head: [
            columns.map(c => c.title)
        ],

        body: data.map(row =>
            columns.map(
                c => row[c.dataIndex]
            )
        )

    });

    pdf.save(`${fileName}.pdf`);

}