import { BiArchive, BiCog, BiHome, BiPackage, BiUser } from "react-icons/bi";

export default (S: any) =>
    S.list()
        .title("Innhold")
        .items([
            S.listItem()
                .title("Front Page")
                .icon(BiHome)
                .child(S.document().schemaType("frontPage").documentId("frontPage")),
            S.listItem()
                .title("About Page")
                .icon(BiUser)
                .child(S.document().schemaType("about").documentId("about")),
            ...S.documentTypeListItems()
                .filter((listItem: any) => ["subPage"].includes(listItem.getId())),
            S.divider(),
            S.listItem()
            .title("Article Landing Page")
            .icon(BiArchive)
            .child(S.document().schemaType("articleArchive").documentId("articleArchive")),
            ...S.documentTypeListItems()
            .filter((listItem: any) => ["article"].includes(listItem.getId())),
            S.divider(),
            S.listItem()
                .title("Creations Landing Page")
                .icon(BiPackage)
                .child(S.document().schemaType("creationArchive").documentId("creationArchive")),
            ...S.documentTypeListItems()
                .filter((listItem: any) => ["creation"].includes(listItem.getId())),
            S.divider(),
            ...S.documentTypeListItems()
                .filter((listItem: any) => ["tag"].includes(listItem.getId())),
            S.divider(),
            S.listItem()
                .title("Innstillinger")
                .icon(BiCog)
                .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            S.divider(),
        ]);