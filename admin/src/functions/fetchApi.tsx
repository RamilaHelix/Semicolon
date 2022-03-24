type method = "POST" | "GET" | "PUT";
export default function semicolonApi(endpoint: string, data: any, method: method): any | any[] {

    const option = {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': "application/json"
        }
    }
    if (method !== "GET")
        option["body"] = JSON.stringify(data)

    return new Promise<any[]>((resolve, rejects) => {
        fetch(`${process.env.REACT_APP_URL}${endpoint}`, option)
            .then(response => response.json())
            .then(json => {
                if (json.error) {
                    rejects(new Error(json.message))
                }
                console.log(json)
                resolve(json)
            }).catch(e => { rejects(e) })
    })
}