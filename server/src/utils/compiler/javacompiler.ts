import { execSync } from "child_process";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import * as path from "path";
import { errorMessage } from "src/error";

export const javacompiler = (dir: string, body: any) => {
    const className = body?.script.slice(body?.script.indexOf("class") + 5, body?.script.indexOf("{")).trim()
    const fileName = path.join(dir, className)

    try {
        if (!existsSync(dir)) { mkdirSync(dir, { recursive: true }) }

        const { inputs } = body;
        const output = [];

        if (existsSync(dir)) { writeFileSync(`${fileName}.java`, body?.script) }

        execSync(`javac ${fileName}.java`)

        inputs.forEach(input => {
            writeFileSync(`${fileName}.txt`, input)
            let javaOutput = execSync(`java -classpath ${dir} ${className} <${fileName}.txt`, { timeout: 5000 })
            output.push({ message: javaOutput.toString().trim() })
        })
        return output
    }

    catch (erro) {
        let error = `${erro}`.split(dir + '\\').join('')
        if (error.includes('Exception in thread "main"')) { error = error.slice(error.indexOf('Exception in thread "main"')) }
        return errorMessage('NOT_ACCEPTABLE', `${error}`)
    }
}