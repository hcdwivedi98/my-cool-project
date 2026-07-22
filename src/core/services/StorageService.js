class StorageService {

    get(key, defaultValue = null) {

        try {

            const value = localStorage.getItem(key);

            if (value === null) {

                return defaultValue;

            }

            return JSON.parse(value);

        }

        catch {

            return defaultValue;

        }

    }

    set(key, value) {

        localStorage.setItem(

            key,

            JSON.stringify(value)

        );

    }

    remove(key) {

        localStorage.removeItem(key);

    }

    clear() {

        localStorage.clear();

    }

    has(key) {

        return localStorage.getItem(key) !== null;

    }

}

export default new StorageService();