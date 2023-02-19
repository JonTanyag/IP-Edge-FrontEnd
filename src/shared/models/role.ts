export class Role {
    id: number = 0;
    roleName: string = '';

    constructor(initializer?: any) {
        if(!initializer) return;
        if (initializer.id) this.id = initializer.id;
        if (initializer.roleName) this.roleName = initializer.roleName;
    }
}