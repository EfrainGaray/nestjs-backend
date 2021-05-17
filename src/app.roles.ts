import {RolesBuilder} from "nest-access-control";

export enum AppRoles {
    AUTHOR = 'AUTHOR',
    ADMIN = 'ADMIN'
}
export enum AppResource {
    USER = 'USER'
}

export const roles: RolesBuilder = new RolesBuilder();

roles
    // AUTHOR ROLES
    .grant(AppRoles.AUTHOR)
    .readAny([AppResource.USER])
    .updateOwn([AppResource.USER])

    // ADMIN ROLES
    .grant(AppRoles.ADMIN)

    .readAny([AppResource.USER])
    .createAny([AppResource.USER])
    .updateAny([AppResource.USER])
    .deleteAny([AppResource.USER]);