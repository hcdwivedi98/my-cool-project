import ExcelService from "./ExcelService";
import PdfService from "./PdfService";
import PrintService from "./PrintService";

class ExportService {

    excel(data, fileName) {

        ExcelService.export(

            data,

            fileName

        );

    }

    pdf(data, columns, fileName) {

        PdfService.export(

            data,

            columns,

            fileName

        );

    }

    print() {

        PrintService.print();

    }

    csv(data, fileName) {

        if (!data?.length) {

            return;

        }

        const headers = Object.keys(data[0]);

        const csv = [

            headers.join(","),

            ...data.map(row =>

                headers

                    .map(

                        h => `"${row[h] ?? ""}"`

                    )

                    .join(",")

            ),

        ].join("\n");

        const blob = new Blob(

            [csv],

            {

                type: "text/csv",

            }

        );

        const link =

            document.createElement("a");

        link.href =

            URL.createObjectURL(blob);

        link.download =

            `${fileName}.csv`;

        link.click();

    }

}

export default new ExportService();