export function normalizeAsyncOptions(data = []) {

    return data.map(item => ({

        label:

            item.label ??

            item.name ??

            item.title,

        value:

            item.value ??

            item.id,

        data: item

    }));

}