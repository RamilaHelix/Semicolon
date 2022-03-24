import { spawnSync } from 'child_process';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import * as path from 'path'
import { errorMessage } from 'src/error';

export const gcccompiler = (dir: string, body: any) => {
    const className = 'Solution'
    const fileName = path.join(dir, className)

    try {
        if (!existsSync(dir)) {
            mkdirSync(dir, { recursive: true });
        }
        if (existsSync(dir)) {
            writeFileSync(`${fileName}.c`, body?.script)
        }


        const inputs = body.inputs
        const outputs = [];

        let compileScript = spawnSync('gcc', [`${fileName}.c`, '-o', fileName], {
            timeout: 5000
        })

        if (compileScript.stderr.toString().length > 0)
            throw new Error(compileScript.stderr.toString())

        inputs.forEach(input => {
            const result = spawnSync(`${fileName}`, ["/", `${fileName}.out`], { input, timeout: 5000 })
            outputs.push({ message: result.stdout.toString().trim() })
        })
        return outputs


    } catch (error) {
        error = `${error}`.split(`${dir}\\`).join('')
        return errorMessage('NOT_ACCEPTABLE', `${error}`)
    }
}
/*let scriptExecution = spawnSync(fileName, {
            input: body?.inputs,
        })

        if (scriptExecution.status === 0) {
            return { message: scriptExecution.stdout.toString().trim() }
        } else {
            let error = scriptExecution.stderr;//.toString().split(`${dir}\\`).join('')
            return errorMessage('ACCEPTED', error)
        }
    } else {
        let error = scriptCompile.stderr//.toString().split(`${dir}\\`).join('')
        console.log(scriptCompile)
        return errorMessage('NOT_ACCEPTABLE', error)
    }*/