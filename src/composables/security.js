export const useSecurity = ()=>{
    return {
        checkUserAccess,
        isInRoles,
        role : {
            isUserInRole             : isUserInRole,
            isUserInRoles            : isUserInRoles,
            is                       : is,
            isAdministrator          : isAdministrator,
            isPublishingAuthority    : isPublishingAuthority,
            isNationalAuthorizedUser : isNationalAuthorizedUser,
            isNationalFocalPoint     : isNationalFocalPoint,
            isUser                   : isUser,
            isNationalSchemaUser     : isNationalSchemaUser,
            isNationalUser           : isNationalUser,
            isSchemaUser             : isSchemaUser,
        }
    }
}