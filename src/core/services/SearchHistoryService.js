import StorageService from "./StorageService";

const STORAGE_KEY = "erp_search_history";

class SearchHistoryService {

    getHistory(max = 10) {

        const history =

            StorageService.get(

                STORAGE_KEY,

                []

            );

        return history.slice(0, max);

    }

    save(keyword, max = 10) {

        if (!keyword?.trim()) {

            return;

        }

        let history =

            this.getHistory(max);

        history = [

            keyword,

            ...history.filter(

                x => x !== keyword

            ),

        ];

        history =

            history.slice(0, max);

        StorageService.set(

            STORAGE_KEY,

            history

        );

    }

    clear() {

        StorageService.remove(

            STORAGE_KEY

        );

    }

}

export default new SearchHistoryService();