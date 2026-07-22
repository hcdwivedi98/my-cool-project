export function normalizeOptions(data = []) {

    return data.map(item => ({

        label:

            item.label ??

            item.name ??

            item.text ??

            item.title,

        value:

            item.value ??

            item.id

    }));

}