import Papa from "papaparse";

export default function upLoadFunction(e: any) {
    const keys: string[] = [];
    const arr: any[] = [];
    const file = e.target.files[0]
    return new Promise<any[]>(resolve => {
        Papa.parse(file, {
            dynamicTyping: true,
            complete: function (results) {
                (results.data[0] as Array<string>).map(key => {
                    keys.push(key);
                })
                for (let i = 1; i < results.data.length; i++) {
                    let field: { [key: string]: any } = {};
                    (results.data[i] as Array<string>).map((data, index) => {
                        if (data !== null)
                            field[keys[index]] = data;
                    })
                    arr.push(field)
                }
                arr.pop();
                resolve(arr);
            }
        })
    })
}
