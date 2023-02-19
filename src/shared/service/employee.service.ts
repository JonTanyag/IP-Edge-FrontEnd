
const baseUrl = 'https://localhost:7291/api/';
const url = `${baseUrl}Employee`


const getEmployeeService = async (page: number = 1, pageSize: number = 20) => {
    const data = await fetch(`${url}?page=${page}&pageSize=${pageSize}`);
    return await data.json();
}

export {getEmployeeService}

const deleteEmployeeService = async (id: number) => {
    await fetch(`${url}/`+id, {
        method: 'DELETE'
    }).catch((error) => {
        console.log(error);
    });
}

export {deleteEmployeeService}