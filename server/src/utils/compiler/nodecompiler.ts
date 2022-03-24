import { spawnSync } from "child_process";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { errorMessage } from "src/error";
import * as precise from 'precise'
import * as path from 'path'

export const nodecompiler = (dir: string, body: any) => {

    let vid: "Solution";
    const fileName = path.join(dir, "Solution.js")
    try {
        if (!existsSync(dir)) {
            mkdirSync(dir, { recursive: true });
        }
        if (existsSync(dir)) {
            writeFileSync(fileName, body.script)
        }

        const inputs = body.inputs//.toString();
        const outputs = []

        inputs.forEach(input => {
            input = input.replace(" ", "\n")
            const scriptExecution = spawnSync('node', [fileName], { input, timeout: 5000 })
            if (scriptExecution.status === 0) {
                let message = scriptExecution.stdout.toString().trim();
                if (message.includes(dir))
                    message = message.split(dir + '\\').join('')
                outputs.push({ message })
            } else {
                let error = scriptExecution.stderr.toString().trim().replace(`${dir}\\${vid}`, 'index')
                throw error
            }
        })
        return outputs;


    } catch (error) {
        // console.log(error)
        let err = `${error}`.split(dir + '\\').join('')
        return errorMessage('NOT_ACCEPTABLE', err)
    }
}
// const scriptExecution = spawnSync('node', [fileName], { input, timeout: 5000 })
        // if (scriptExecution.status === 0) {
        //     let message = scriptExecution.stdout.toString().trim();
        //     if (message.includes(dir))
        //         message = message.split(dir + '\\').join('')
        //     outputs.push(message)
        //     console.log(outputs)
        // } else {
        //     let error = scriptExecution.stderr.toString().trim().replace(`${dir}\\${vid}`, 'index')
        //     throw error
        // }