import { BiCog, BiHome, BiUser } from "react-icons/bi";

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
            S.divider(),
            ...S.documentTypeListItems()
                .filter((listItem: any) => ["article"].includes(listItem.getId())),
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