import { existsSync, mkdirSync, writeFileSync } from "fs";
import { spawnSync } from 'child_process';
import { errorMessage } from 'src/error';
import { v4 as v4uuid } from 'uuid';
import * as path from 'path'
export const pythoncompiler = (dir: string, body: any) => {
    const fileName = path.join(dir, `Solution.py`)

    try {
        if (!existsSync(dir)) {
            mkdirSync(dir, { recursive: true });
        }

        if (existsSync(dir)) {
            writeFileSync(fileName, body?.script)
        }

        const inputs = body.inputs;
        const outputs = []
        inputs.forEach(input => {
            input = input.replace(" ", "\n")
            const scriptExecution = spawnSync('python', [fileName], { input, timeout: 5000 })
            if (scriptExecution.status === 0) {
                outputs.push({ message: scriptExecution.stdout.toString().trim() })
            } else {
                let error = scriptExecution.stderr.toString().trim();
                throw error
            }
        })
        return outputs;
    } catch (error) {
        let err = `${error}`.split(dir + '\\').join('')
        return errorMessage("NOT_ACCEPTABLE", err)
    }
}