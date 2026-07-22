import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

class PdfService {

    export(

        data,

        columns,

        fileName

    ) {

        const doc = new jsPDF();

        autoTable(doc, {

            head: [

                columns.map(

                    x => x.title

                ),

            ],

            body: data.map(row =>

                columns.map(

                    c => row[c.dataIndex]

                )

            ),

        });

        doc.save(

            `${fileName}.pdf`

        );

    }

}

export default new PdfService();