type method = "POST" | "GET" | "PUT";
export default function semicolonApi(endpoint: string, data: any, method: method) {

    const option: RequestInit = {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
    }
    if (method === "GET")
        delete option["body"]

    //option["body"] = JSON.stringify(data)

    return new Promise<any[] | number | string>((resolve, rejects) => {
        fetch(`${process.env.REACT_APP_URL}/${endpoint}`, option)
            .then(response => response.json())
            .then(json => {
                if (json.err || json.error || json.statusCode == 500) {
                    rejects(json.error ?? json.err ?? json.message)
                }
                console.log(json)
                resolve(json)
            }).catch(e => { rejects(e) })
    })

}
// return new Promise<any[]>((resolve, rejects) => {
    //     fetch(`http://localhost:8000/${endpoint}`, {
    //         method: method,
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': "application/json"
    //         },
    //         body: JSON.stringify(data)
    //     }).then(response => response.json())
    //         .then(json => {
    //             if (json.err) {
    //                 rejects(new Error('not found'))
    //             }
    //             console.log(json)
    //             resolve(json)

    //         }).catch(e => { rejects(e) })
    // })