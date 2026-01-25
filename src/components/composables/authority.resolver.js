import { AUTHORITY_TITLE } from "@/ui/authority.titles";

export const resolveAuthorityTitle = (authority) => {
    if (authority && AUTHORITY_TITLE[authority]) {
        return AUTHORITY_TITLE[authority]
    } else if (authority) {
        return authority
    } else {
        return AUTHORITY_TITLE.UNKNOWN;
    }

}