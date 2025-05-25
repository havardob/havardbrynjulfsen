export function groqGetSlug() {
    return `select(
        _type == "frontPage" => "/",
        _type == "article" => "/" + *[_type == "articleArchive"][0].slug.current + "/" + slug.current,
        _type == "creation" => "/" + *[_type == "creationArchive"][0].slug.current + "/" + slug.current,
        _type == "tag" && type == "article" => "/" + *[_type == "articleArchive"][0].slug.current + "/" + slug.current,
        _type == "tag" && type == "creation" => "/" + *[_type == "creationArchive"][0].slug.current + "/" + slug.current,
        _type == "creationArchive" => "/" + slug.current,
        _type == "articleArchive" => "/" + slug.current,
        _type == "aboutPage" => "/" + slug.current,
        _type == "subPage" => "/" + slug.current,
        null
  )`
}

export function groqGetBody(key: string) {
    return `${key}[] {
        ...,
        _type == "imageBlock" => {
            "imageFileRaw": imageFile,
            "imageFile": imageFile.asset->url,
        },
        _type == "reviewBlock" => {
            "imageFileRaw": imageFile,
            "imageFile": imageFile.asset->url,
        },
        markDefs[] {
            ...,
            _type == "internalLink" => {
                internalDocument-> { "href": ${groqGetSlug()} }
            }
        }
    }`
}

export function groqGetGrandparent() {
    return `{ 
        "slug": select(
            _type == "article" => "/" + *[_type == "articleArchive"][0].slug.current,
            _type == "creation" => "/" + *[_type == "creationArchive"][0].slug.current,
            null
        ),
        "title": select(
            _type == "article" => *[_type == "articleArchive"][0].title,
            _type == "creation" => *[_type == "creationArchive"][0].title,
            null
        )
    }`
}