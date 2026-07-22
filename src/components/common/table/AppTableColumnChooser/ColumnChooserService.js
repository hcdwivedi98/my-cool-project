import StorageService from "./StorageService";

const PREFIX = "erp_column_layout";

class ColumnChooserService {

    getKey(moduleName) {

        return `${PREFIX}_${moduleName}`;

    }

    save(moduleName, columns) {

        StorageService.set(

            this.getKey(moduleName),

            columns

        );

    }

    load(moduleName, defaultColumns = []) {

        return StorageService.get(

            this.getKey(moduleName),

            defaultColumns

        );

    }

    reset(moduleName) {

        StorageService.remove(

            this.getKey(moduleName)

        );

    }

    hasLayout(moduleName) {

        return StorageService.has(

            this.getKey(moduleName)

        );

    }

}

export default new ColumnChooserService();