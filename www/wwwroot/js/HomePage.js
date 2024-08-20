token = sessionStorage.getItem('token');

if (token == null || token == "")
    window.location.href = '/Index'

const urlAPI = "https://localhost:44353/";