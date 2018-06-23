export default{
    restApiUrl: serverConnection('P')
};

function serverConnection(type: 'L' | 'P' | 'T') {
    switch (type) {
        case 'L': return 'http://localhost:8080/JamesBackend-web/api/v1/boarding'; // local
        case 'P': return 'http://10.60.64.72:80/JamesBackend-web/api/v1/boarding'; // produtkion
        case 'T': return 'http://10.60.64.72:8080/JamesBackend-web/api/v1/boarding'; // test
    }
}
