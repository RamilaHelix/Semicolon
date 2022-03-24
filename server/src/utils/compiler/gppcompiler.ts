import { spawnSync } from 'child_process';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import * as path from 'path'
import { errorMessage } from 'src/error';

export const gppcompiler = (dir: string, body: any) => {
    let className = 'Solution'
    let fileName = path.join(dir, className)

    try {
        if (!existsSync(dir)) {
            mkdirSync(dir, { recursive: true });
        }
        if (existsSync(dir)) {
            writeFileSync(`${fileName}.cpp`, body?.script)
        }

        const { inputs } = body;
        const outputs = []

        const compileScript = spawnSync('g++', [`${fileName}.cpp`, '-o', fileName], { shell: false, timeout: 5000 });
        if (compileScript.stderr.toString().length > 0)
            throw new Error(compileScript.stderr.toString())

        inputs.forEach(input => {
            const result = spawnSync(`${fileName}`, ["/", `${fileName}.out`], { input, timeout: 5000 })
            outputs.push({ message: result.stdout.toString().trim() })
        })
        return outputs
    }

    catch (error) {
        error = `${error}`.split(dir + '\\').join('')
        console.log("catch error :=> " + error.toString())
        return errorMessage('NOT_ACCEPTABLE', `${error}`)
    }
}

     // let scriptCompile = spawnSync('g++', [`${fileName}.cpp`, '-o', fileName], {
        //     timeout: 5000
        // })
/*var className = 'Solution'
        if (!existsSync(dir)) {
            mkdirSync(dir);
        }
        var fileName = path.join(dir, className)
        if (!existsSync(`${fileName}.cpp`)) {
            writeFileSync(`${fileName}.cpp`, body?.script)
        }
        let scriptCompile = spawnSync('gcc', [`${fileName}.cpp`, '-lstdc++', '-o', fileName], {
            timeout: 5000
        })
        if (scriptCompile.status === 0) {

            let scriptExecution = spawnSync(fileName, {
                input: body?.input,
            })

            if (scriptExecution.status === 0) {
                return { message: scriptExecution.stdout.toString().trim() }
            } else {
                let error = scriptExecution.stderr //.toString().split(`${dir}\\`).join('')
                console.log(error)
                return errorMessage('ACCEPTED', error)
            }
        } else {
            let error = scriptCompile.stderr //.toString().split(`${dir}\\`).join('')
            console.log(error)
            return errorMessage('ACCEPTED', error)
        }

    } catch (error) {
        // error = `${error}`.split(`${dir}\\`).join('')
        console.log(error)
        return errorMessage('INTERNAL_SERVER_ERROR', `${error}`)
    }*/
/*
    {
        try {
            let result = spawnSync(`${fileName}`, ["/", `${fileName}.out`], { input, stdio: ['inherit'] });
            //console.warn(result.stdout.toString())

            if (result.status === 0) {
                outputs.push({ message: result.stdout.toString().trim() })
            } else {
                console.log(result.stdout.toString());
                console.log(result.output.toString())
                throw result.stderr
            }
            return outputs
        }
        catch (error) {
            // error = `${error}`.split(dir + '\\').join('')
            console.log("==>", error)
        }*/

 // execSync(`g++ ${fileName}.cpp  -o ${fileName}`)

        // input.forEach(input => {

        //     //  let result = spawnSync(`${fileName}`, ["/", `${fileName}.out`], { input, stdio: ['inherit'] });
        //     execSync(`${fileName} / ${fileName}.out`, { input })
        // })

        //console.warn(result.error.toString())
        //return { message: result.stdout.toString().trim() }