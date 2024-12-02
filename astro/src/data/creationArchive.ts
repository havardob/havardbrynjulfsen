import {client} from "./_sanityClient";

export const getCreationArchiveData = async function () {
    const query = `*[_id == "creationArchive"][0] {
        _id,
        title,
        "slug": slug.current,
        leading,
        creationList[]-> {
            _id
        }
    }`
    return await client.fetch(query);
}