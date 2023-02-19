export class AddEmployeeCommand {
    id: number = 0;
    employeeNumber: number = 0;
    firstName: string = '';
    lastName: string = '';
    dateJoined: string = '';
    extension: number = 0;
    roleId: number = 0;

constructor(initializer?: any) {
    if(!initializer) return;
    if (initializer.id) this.id = initializer.id;
    if (initializer.employeeNumber) this.employeeNumber = initializer.employeeNumber;
    if (initializer.firstName) this.firstName = initializer.firstName;
    if (initializer.lastName) this.lastName = initializer.lastName;
    if (initializer.dateJoined) this.dateJoined = initializer.dateJoined;
    if (initializer.extension) this.extension = initializer.extension;
    if (initializer.roleId) this.roleId = initializer.roleId;
}
}