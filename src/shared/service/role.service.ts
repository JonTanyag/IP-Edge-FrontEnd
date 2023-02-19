const baseUrl = 'https://localhost:7291/api/';
const url = `${baseUrl}Role`

const roleService = async () =>{
    const data = await fetch(url);
    return await data.json();
}

export {roleService}